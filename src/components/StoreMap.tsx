"use client";

import { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { StoreResult } from "@/lib/types";

interface Props {
  stores: StoreResult[];
  center: [number, number]; // [lat, lng]
}

/** Check availability accounting for static providers (dailySlots count=-1) */
function hasAvailability(store: StoreResult) {
  return store.dailySlots
    ? store.dailySlots.some((s) => s.count !== 0)
    : Boolean(store.slotsAvailable);
}

/** Compact dot marker — shows store name on hover via CSS */
function Pin({ store }: { store: StoreResult }) {
  const featured = store.featured;
  const available = hasAvailability(store);

  const bg = featured ? "#f59e0b" : available ? "#16a34a" : "#9ca3af";

  return (
    <div className="group/pin" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Hover label — appears above the dot */}
      <div
        className="hidden group-hover/pin:block"
        style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: 4,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            backgroundColor: bg,
            color: "#fff",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            lineHeight: 1.3,
          }}
        >
          {featured && <span style={{ marginRight: 3 }}>★</span>}
          {store.storeName}
        </div>
        {/* Tooltip arrow */}
        <div
          style={{
            width: 0,
            height: 0,
            margin: "0 auto",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: `5px solid ${bg}`,
          }}
        />
      </div>

      {/* Dot marker — always visible */}
      <div
        style={{
          width: featured ? 18 : 14,
          height: featured ? 18 : 14,
          borderRadius: "50%",
          backgroundColor: bg,
          border: "2.5px solid white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          transition: "transform 0.15s ease",
        }}
        className="group-hover/pin:scale-[1.4]"
      />
    </div>
  );
}

export default function StoreMap({ stores, center }: Props) {
  const [popup, setPopup] = useState<StoreResult | null>(null);
  const mapped = stores.filter((s) => s.lat && s.lng);

  // Render featured pins last so they sit on top
  const sorted = [
    ...mapped.filter((s) => !s.featured && !hasAvailability(s)),
    ...mapped.filter((s) => !s.featured && hasAvailability(s)),
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
          offset={[0, 2]}
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
          maxWidth="240px"
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
            {hasAvailability(popup) ? (
              <p style={{ fontSize: 11, color: "#15803d", marginBottom: 8, lineHeight: 1.4 }}>
                ✓ {popup.slotsAvailable ?? "Appointments available"}
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
                backgroundColor: hasAvailability(popup) ? "#16a34a" : "#4b5563",
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
