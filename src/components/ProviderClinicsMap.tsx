"use client";

import { useEffect, useRef, useState } from "react";

export type ProviderClinic = {
  name: string;
  slug: string;
  address: string;
  postcode: string | null;
  phone: string | null;
  lat: number;
  lng: number;
};

export function ProviderClinicsMap({
  clinics,
  providerName,
  brandColor,
}: {
  clinics: ProviderClinic[];
  providerName: string;
  brandColor: string;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, { marker: any; el: HTMLDivElement }>>(
    new Map(),
  );
  const [highlightedClinic, setHighlightedClinic] = useState<string | null>(
    null,
  );

  // ── Initialise Mapbox ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    let cancelled = false;

    (async () => {
      const mb = await import("mapbox-gl");
      if (cancelled) return;

      // Stylesheet
      if (!document.getElementById("mapbox-gl-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-gl-css";
        link.rel = "stylesheet";
        link.href =
          "https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css";
        document.head.appendChild(link);
      }

      (mb.default as unknown as { accessToken: string }).accessToken = token;

      const avgLat =
        clinics.reduce((s, c) => s + c.lat, 0) / (clinics.length || 1);
      const avgLng =
        clinics.reduce((s, c) => s + c.lng, 0) / (clinics.length || 1);

      const m = new mb.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [avgLng || -1.5, avgLat || 52.5],
        zoom: 6,
        attributionControl: false,
      });

      m.addControl(
        new mb.default.NavigationControl({ showCompass: false }),
        "top-right",
      );
      m.addControl(
        new mb.default.AttributionControl({ compact: true }),
        "bottom-right",
      );

      mapRef.current = m;

      m.on("load", () => {
        clinics.forEach((clinic) => {
          const el = document.createElement("div");
          const size = 28;

          el.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border-radius: 50% 50% 50% 0;
            background: ${brandColor};
            transform: rotate(-45deg);
            border: 2.5px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            cursor: pointer;
            transition: transform 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          `;

          const inner = document.createElement("div");
          inner.style.cssText = `
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
            transform: rotate(45deg);
          `;
          el.appendChild(inner);

          el.addEventListener("mouseenter", () => {
            el.style.transform = "rotate(-45deg) scale(1.25)";
            el.style.zIndex = "20";
          });
          el.addEventListener("mouseleave", () => {
            if (highlightedClinic !== clinic.slug) {
              el.style.transform = "rotate(-45deg) scale(1)";
              el.style.zIndex = "1";
            }
          });

          const popup = new mb.default.Popup({
            offset: 18,
            closeButton: false,
            maxWidth: "240px",
          }).setHTML(`
            <div style="font-family: Inter, system-ui, sans-serif; padding: 4px 2px;">
              <div style="font-size: 13px; font-weight: 700; color: #0d1b3e; margin-bottom: 3px; line-height: 1.3;">
                ${clinic.name}
              </div>
              <div style="font-size: 11px; color: #6b7280; line-height: 1.4;">
                ${clinic.address}
              </div>
              ${clinic.postcode ? `<div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">${clinic.postcode}</div>` : ""}
              ${clinic.phone ? `<a href="tel:${clinic.phone.replace(/\s/g, "")}" style="display:inline-flex;align-items:center;gap:3px;margin-top:6px;font-size:11px;font-weight:600;color:${brandColor};text-decoration:none;">${clinic.phone}</a>` : ""}
            </div>
          `);

          const marker = new mb.default.Marker({ element: el })
            .setLngLat([clinic.lng, clinic.lat])
            .setPopup(popup)
            .addTo(m);

          el.addEventListener("click", () => {
            // Scroll the clinic card into view
            const card = document.getElementById(`prov-clinic-${clinic.slug}`);
            card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            setHighlightedClinic(clinic.slug);
          });

          markersRef.current.set(clinic.slug, { marker, el });
        });

        // Fit bounds
        if (clinics.length > 1) {
          const bounds = new mb.default.LngLatBounds();
          clinics.forEach((c) => bounds.extend([c.lng, c.lat]));
          m.fitBounds(bounds, { padding: 50, maxZoom: 12 });
        } else if (clinics.length === 1) {
          m.setCenter([clinics[0].lng, clinics[0].lat]);
          m.setZoom(12);
        }
      });
    })();

    return () => {
      cancelled = true;
      markersRef.current.forEach(({ marker }) => marker.remove());
      markersRef.current.clear();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinics, brandColor]);

  // ── Highlight sync ─────────────────────────────────────────────────────
  useEffect(() => {
    markersRef.current.forEach(({ el }, slug) => {
      if (slug === highlightedClinic) {
        el.style.transform = "rotate(-45deg) scale(1.3)";
        el.style.zIndex = "20";
        el.style.boxShadow = `0 3px 12px rgba(0,0,0,0.35)`;
      } else {
        el.style.transform = "rotate(-45deg) scale(1)";
        el.style.zIndex = "1";
        el.style.boxShadow = `0 2px 6px rgba(0,0,0,0.25)`;
      }
    });
  }, [highlightedClinic]);

  // ── Fly to clinic when card is hovered ─────────────────────────────────
  const handleCardHover = (slug: string | null) => {
    setHighlightedClinic(slug);
    if (slug && mapRef.current) {
      const clinic = clinics.find((c) => c.slug === slug);
      if (clinic) {
        mapRef.current.flyTo({
          center: [clinic.lng, clinic.lat],
          zoom: Math.max(mapRef.current.getZoom(), 10),
          duration: 600,
        });
      }
    }
  };

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div>
      {/* Section heading */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-xl sm:text-2xl font-bold text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Clinic Locations
        </h2>
        <span className="text-sm text-gray-500">
          {clinics.length} {clinics.length === 1 ? "clinic" : "clinics"} across
          the UK
        </span>
      </div>

      {/* Map + List split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="order-2 lg:order-1">
          {token ? (
            <div
              ref={mapContainer}
              className="w-full rounded-2xl border border-gray-100 shadow-sm"
              style={{ height: "480px" }}
            />
          ) : (
            <div className="w-full rounded-2xl border border-gray-100 bg-gray-50 flex flex-col items-center justify-center text-gray-400 p-8 text-center"
              style={{ height: "480px" }}
            >
              <svg
                className="w-12 h-12 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p className="text-sm font-medium">Map view</p>
              <p className="text-xs mt-1">
                Set NEXT_PUBLIC_MAPBOX_TOKEN to enable
              </p>
            </div>
          )}
        </div>

        {/* Clinic cards list */}
        <div
          className="order-1 lg:order-2 space-y-3 overflow-y-auto pr-1"
          style={{ maxHeight: "480px" }}
        >
          {clinics.map((clinic) => (
            <div
              key={clinic.slug}
              id={`prov-clinic-${clinic.slug}`}
              className={`rounded-xl border p-4 transition-all duration-150 cursor-pointer ${
                highlightedClinic === clinic.slug
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md"
                  : "border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200"
              }`}
              onMouseEnter={() => handleCardHover(clinic.slug)}
              onMouseLeave={() => handleCardHover(null)}
            >
              <h3 className="text-sm font-bold text-[var(--color-navy)] mb-1.5">
                {clinic.name}
              </h3>
              <div className="space-y-1">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span className="text-xs leading-relaxed">
                    {clinic.address}
                    {clinic.postcode ? `, ${clinic.postcode}` : ""}
                  </span>
                </div>
                {clinic.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <a
                      href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                      className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors"
                    >
                      {clinic.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
