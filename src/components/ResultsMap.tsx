"use client";

import { useEffect, useRef } from "react";
import type { Optician } from "./ResultCard";

export function ResultsMap({
  opticians,
  onSelectOptician,
}: {
  opticians: Optician[];
  onSelectOptician?: (id: string) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

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

      // Compute center from opticians
      const avgLat =
        opticians.reduce((sum, o) => sum + o.lat, 0) / (opticians.length || 1);
      const avgLng =
        opticians.reduce((sum, o) => sum + o.lng, 0) / (opticians.length || 1);

      const m = new mb.default.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [avgLng || -0.3, avgLat || 51.41],
        zoom: 11.5,
        attributionControl: false,
      });

      m.addControl(
        new mb.default.NavigationControl({ showCompass: false }),
        "top-right"
      );
      m.addControl(
        new mb.default.AttributionControl({ compact: true }),
        "bottom-right"
      );

      mapRef.current = m;

      m.on("load", () => {
        opticians.forEach((optician) => {
          const el = document.createElement("div");
          el.style.cssText = `
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            background: ${optician.available ? optician.brandColor : "#9ca3af"};
            transform: rotate(-45deg);
            border: 2.5px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            cursor: pointer;
            transition: transform 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          `;

          const inner = document.createElement("div");
          inner.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            transform: rotate(45deg);
          `;
          el.appendChild(inner);

          el.addEventListener("mouseenter", () => {
            el.style.transform = "rotate(-45deg) scale(1.2)";
            el.style.zIndex = "10";
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "rotate(-45deg) scale(1)";
            el.style.zIndex = "1";
          });

          const popup = new mb.default.Popup({
            offset: 20,
            closeButton: false,
            maxWidth: "240px",
          }).setHTML(`
            <div style="font-family: Inter, system-ui, sans-serif; padding: 4px 0;">
              <div style="font-size: 10px; font-weight: 600; color: ${optician.brandColor}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">
                ${optician.brand}
              </div>
              <div style="font-size: 13px; font-weight: 600; color: #0d1b3e; margin-bottom: 4px; line-height: 1.3;">
                ${optician.name}
              </div>
              <div style="font-size: 11px; color: #6b7280; margin-bottom: 6px;">
                ${optician.distance} miles away
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="
                  font-size: 11px;
                  font-weight: 600;
                  color: ${optician.available ? "#22c55e" : "#9ca3af"};
                  background: ${optician.available ? "#f0fdf4" : "#f3f4f6"};
                  padding: 2px 8px;
                  border-radius: 99px;
                ">
                  ${optician.available ? "&#10003; Available" : "No slots"}
                </span>
                ${optician.nextSlot ? `<span style="font-size: 10px; color: #6b7280;">${optician.nextSlot}</span>` : ""}
              </div>
            </div>
          `);

          const marker = new mb.default.Marker({ element: el })
            .setLngLat([optician.lng, optician.lat])
            .setPopup(popup)
            .addTo(m);

          el.addEventListener("click", () => {
            onSelectOptician?.(optician.id);
          });

          markersRef.current.push(marker);
        });

        // Fit bounds to all markers
        if (opticians.length > 1) {
          const bounds = new mb.default.LngLatBounds();
          opticians.forEach((o) => bounds.extend([o.lng, o.lat]));
          m.fitBounds(bounds, { padding: 50, maxZoom: 14 });
        }
      });
    })();

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [opticians, onSelectOptician]);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="aspect-[4/5] bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
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
      className="w-full h-full min-h-[400px]"
      style={{ aspectRatio: "4/5" }}
    />
  );
}
