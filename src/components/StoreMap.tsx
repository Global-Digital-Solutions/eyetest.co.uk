"use client";

import { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { StoreResult } from "@/lib/types";

interface Props {
  stores: StoreResult[];
  center: [number, number]; // [lat, lng]
}

const MAX_LABEL = 22;
function truncate(s: string) {
  return s.length > MAX_LABEL ? s.slice(0, MAX_LABEL).trimEnd() + "…" : s;
}

function Pin({ store }: { store: StoreResult }) {
  const featured = store.featured;
  const available = !!store.slotsAvailable;

  const bg = featured ? "#f59e0b" : available ? "#16a34a" : "#6b7280";
  const shadow = featured
    ? "0 2px 8px rgba(245,158,11,0.5)"
    : available
    ? "0 2px 8px rgba(22,163,74,0.4)"
    : "0 1px 4px rgba(0,0,0,0.2)";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Label pill */}
      <div
        style={{
          backgroundColor: bg,
          color: "#fff",
          borderRadius: 20,
          padding: featured ? "4px 10px" : "3px 8px",
          fontSize: featured ? 12 : 11,
          fontWeight: featured ? 700 : 500,
          whiteSpace: "nowrap",
          boxShadow: shadow,
          lineHeight: 1.3,
          userSelect: "none",
        }}
      >
        {featured && <span style={{ marginRight: 4 }}>★</span>}
        {truncate(store.storeName)}
      </div>

      {/* Pointer triangle */}
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: `7px solid ${bg}`,
        }}
      />
    </div>
  );
}

export default function StoreMap({ stores, center }: Props) {
  const [popup, setPopup] = useState<StoreResult | null>(null);
  const mapped = stores.filter((s) => s.lat && s.lng);

  // Render featured pins last so they sit on top
  const sorted = [
    ...mapped.filter((s) => !s.featured && !s.slotsAvailable),
    ...mapped.filter((s) => !s.featured && s.slotsAvailable),
    ...mapped.filter((s) => s.featured),
  ];

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        latitude: center[0],
        longitude: center[1],
        zoom: 11,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <NavigationControl position="top-right" />

      {sorted.map((store, i) => (
        <Marker
          key={i}
          latitude={store.lat!}
          longitude={store.lng!}
          anchor="bottom"
          offset={[0, -2]}
          onClick={(e: {originalEvent: MouseEvent}) => {
            e.originalEvent.stopPropagation();
            setPopup(store);
          }}
        >
          <div style={{ cursor: "pointer" }}>
            <Pin store={store} />
          </div>
        </Marker>
      ))}

      {popup && (
        <Popup
          latitude={popup.lat!}
          longitude={popup.lng!}
          onClose={() => setPopup(null)}
          closeOnClick={false}
          offset={20}
          maxWidth="220px"
        >
          <div style={{ padding: "6px 4px", fontFamily: "inherit" }}>
            {popup.featured && (
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#fef3c7",
                  color: "#92400e",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 12,
                  padding: "2px 8px",
                  marginBottom: 6,
                }}
              >
                ★ {popup.featuredLabel ?? "Recommended"}
              </div>
            )}
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 4, lineHeight: 1.4 }}>
              {popup.storeName}
            </p>
            {popup.slotsAvailable ? (
              <p style={{ fontSize: 11, color: "#15803d", marginBottom: 8, lineHeight: 1.4 }}>
                ✓ {popup.slotsAvailable}
              </p>
            ) : (
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>No available slots</p>
            )}
            <a
              href={popup.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: popup.slotsAvailable ? "#16a34a" : "#4b5563",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 8,
                padding: "5px 12px",
                textDecoration: "none",
              }}
            >
              Book →
            </a>
          </div>
        </Popup>
      )}
    </Map>
  );
}
