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

function formatDistance(m: number): string {
  const miles = m / 1609.344;
  if (miles < 0.1) return `${Math.round(m * 1.09361)} yds`;
  return `${miles.toFixed(1)} mi`;
}

/** Teardrop-shaped map pin using inline SVG */
function Pin({ store }: { store: StoreResult }) {
  const featured = store.featured;
  const available = hasAvailability(store);

  const fill = featured ? "#f59e0b" : available ? "#0ea5a0" : "#9ca3af";
  const size = featured ? 36 : 30;

  return (
    <div
      className="group/pin"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: `drop-shadow(0 2px 3px rgba(0,0,0,0.3))`,
      }}
    >
      {/* Hover label — store name tooltip */}
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
            backgroundColor: "#1e293b",
            color: "#fff",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            lineHeight: 1.3,
          }}
        >
          {store.storeName}
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            margin: "0 auto",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #1e293b",
          }}
        />
      </div>

      {/* Teardrop pin */}
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 30 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-150 group-hover/pin:scale-110"
      >
        <path
          d="M15 0C6.716 0 0 6.716 0 15c0 10.969 13.256 22.748 13.82 23.254a1.8 1.8 0 002.36 0C16.744 37.748 30 25.969 30 15 30 6.716 23.284 0 15 0z"
          fill={fill}
        />
        <circle cx="15" cy="14" r="6" fill="white" fillOpacity="0.9" />
        {featured && (
          <text x="15" y="18" textAnchor="middle" fontSize="12" fill={fill} fontWeight="bold">★</text>
        )}
        {!featured && available && (
          <path d="M11.5 14l2.5 2.5 4.5-4.5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        )}
      </svg>
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

  const popupAvailable = popup ? hasAvailability(popup) : false;

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
          onClick={(e: { originalEvent: MouseEvent }) => {
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
          offset={[0, -36]}
          maxWidth="280px"
        >
          <div style={{ padding: "8px 4px", fontFamily: "inherit" }}>
            {/* Featured badge */}
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
                  marginBottom: 8,
                }}
              >
                ★ {popup.featuredLabel ?? "Recommended"}
              </div>
            )}

            {/* Store name + distance */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e", lineHeight: 1.3, margin: 0 }}>
                {popup.storeName}
              </p>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>
                {formatDistance(popup.distanceM)}
              </span>
            </div>

            {/* Address */}
            {(popup.address || popup.town || popup.postcode) && (
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px", lineHeight: 1.4 }}>
                {[popup.address, popup.town, popup.postcode].filter(Boolean).join(", ")}
              </p>
            )}

            {/* Phone */}
            {popup.phone && (
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>
                {popup.phone}
              </p>
            )}

            {/* Availability */}
            <div style={{ marginBottom: 10 }}>
              {popupAvailable ? (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 11, fontWeight: 600, color: "#16a34a",
                  backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: 12, padding: "3px 10px",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#16a34a" }} />
                  {popup.slotsAvailable ?? "Appointments available"}
                </span>
              ) : (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 11, fontWeight: 500, color: "#9ca3af",
                  backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
                  borderRadius: 12, padding: "3px 10px",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#d1d5db" }} />
                  No available slots
                </span>
              )}
            </div>

            {/* Book Now CTA */}
            <a
              href={popup.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                width: "100%",
                backgroundColor: popupAvailable ? "#0ea5a0" : "#6b7280",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                borderRadius: 8,
                padding: "8px 16px",
                textDecoration: "none",
                textAlign: "center",
                boxSizing: "border-box",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.9"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Now
            </a>

            {/* Phone link */}
            {popup.phone && (
              <a
                href={`tel:${popup.phone.replace(/\s/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  width: "100%",
                  marginTop: 6,
                  color: "#0d1b3e",
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 8,
                  padding: "6px 16px",
                  textDecoration: "none",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                  backgroundColor: "#f9fafb",
                  boxSizing: "border-box",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call {popup.phone}
              </a>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
