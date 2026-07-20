"use client";

import { useEffect, useRef } from "react";

export type SurgeryMapClinic = {
  id: string;
  name: string;
  providerName: string;
  providerSlug: string;
  brandColor: string;
  lat: number;
  lng: number;
  distanceMiles: number;
  preferred: boolean;
  rating?: number;
  postcode?: string;
};

export function SurgeryResultsMap({
  clinics,
  highlightedId,
  onSelectClinic,
}: {
  clinics: SurgeryMapClinic[];
  highlightedId?: string | null;
  onSelectClinic?: (id: string) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());
  // Stable ref for onSelectClinic so map init doesn't depend on it
  const onSelectRef = useRef(onSelectClinic);
  onSelectRef.current = onSelectClinic;

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    let cancelled = false;

    (async () => {
      const mb = await import("mapbox-gl");
      if (cancelled) return;

      // Load the stylesheet
      if (!document.getElementById("mapbox-gl-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-gl-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css";
        document.head.appendChild(link);
      }

      (mb.default as unknown as { accessToken: string }).accessToken = token;

      // Compute center from clinics
      const avgLat =
        clinics.reduce((sum, c) => sum + c.lat, 0) / (clinics.length || 1);
      const avgLng =
        clinics.reduce((sum, c) => sum + c.lng, 0) / (clinics.length || 1);

      const m = new mb.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [avgLng || -1.5, avgLat || 52.5],
        zoom: 7,
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
          const isPreferred = clinic.preferred;
          const size = isPreferred ? 36 : 30;

          el.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border-radius: 50% 50% 50% 0;
            background: ${clinic.brandColor};
            transform: rotate(-45deg);
            border: ${isPreferred ? "3px" : "2.5px"} solid ${isPreferred ? "#f59e0b" : "white"};
            box-shadow: 0 2px 8px rgba(0,0,0,${isPreferred ? "0.35" : "0.25"});
            cursor: pointer;
            transition: transform 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: ${isPreferred ? "5" : "1"};
          `;

          const inner = document.createElement("div");
          inner.style.cssText = `
            width: ${isPreferred ? 12 : 9}px;
            height: ${isPreferred ? 12 : 9}px;
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
            el.style.transform = "rotate(-45deg) scale(1)";
            el.style.zIndex = isPreferred ? "5" : "1";
          });

          const ratingHtml = clinic.rating
            ? `<div style="display:flex;align-items:center;gap:4px;margin-top:4px;">
                <span style="color:#f59e0b;font-size:12px;">★</span>
                <span style="font-size:11px;font-weight:600;color:#374151;">${clinic.rating}</span>
               </div>`
            : "";

          const preferredBadge = isPreferred
            ? `<div style="display:inline-flex;align-items:center;gap:3px;background:#fffbeb;color:#b45309;font-size:9px;font-weight:700;padding:2px 6px;border-radius:99px;border:1px solid #fde68a;margin-top:6px;">
                <span style="font-size:10px;">★</span> PREFERRED
               </div>`
            : "";

          const popup = new mb.default.Popup({
            offset: 20,
            closeButton: false,
            maxWidth: "260px",
          }).setHTML(`
            <div style="font-family: Inter, system-ui, sans-serif; padding: 6px 2px;">
              <div style="font-size: 10px; font-weight: 700; color: ${clinic.brandColor}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">
                ${clinic.providerName}
              </div>
              <div style="font-size: 13px; font-weight: 700; color: #0d1b3e; margin-bottom: 2px; line-height: 1.3;">
                ${clinic.name}
              </div>
              <div style="font-size: 11px; color: #6b7280;">
                ${clinic.distanceMiles} miles away
              </div>
              ${ratingHtml}
              ${preferredBadge}
              <a href="/eye-surgery/providers/${clinic.providerSlug}" style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;font-size:11px;font-weight:600;color:#0ea5a0;text-decoration:none;">
                View Provider →
              </a>
            </div>
          `);

          const marker = new mb.default.Marker({ element: el })
            .setLngLat([clinic.lng, clinic.lat])
            .setPopup(popup)
            .addTo(m);

          el.addEventListener("click", () => {
            onSelectRef.current?.(clinic.id);
          });

          markersRef.current.set(clinic.id, { marker, el });
        });

        // Fit bounds to markers
        if (clinics.length > 1) {
          const bounds = new mb.default.LngLatBounds();
          clinics.forEach((c) => bounds.extend([c.lng, c.lat]));
          m.fitBounds(bounds, { padding: 60, maxZoom: 13 });
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
  }, [clinics]);

  // Highlight effect
  useEffect(() => {
    markersRef.current.forEach(({ el }, id) => {
      if (id === highlightedId) {
        el.style.transform = "rotate(-45deg) scale(1.3)";
        el.style.zIndex = "20";
      } else {
        const isPreferred =
          clinics.find((c) => c.id === id)?.preferred ?? false;
        el.style.transform = "rotate(-45deg) scale(1)";
        el.style.zIndex = isPreferred ? "5" : "1";
      }
    });
  }, [highlightedId, clinics]);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="w-full h-full min-h-[400px] bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 text-center rounded-2xl">
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
        <p className="text-xs mt-1 text-gray-400">
          Set NEXT_PUBLIC_MAPBOX_TOKEN to enable
        </p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className="w-full h-full min-h-[400px] rounded-2xl"
    />
  );
}
