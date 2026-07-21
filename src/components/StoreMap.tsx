"use client";

import { useState, useEffect, useRef } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { StoreResult } from "@/lib/types";

/** Stable ID for cross-component hover tracking */
export function getStoreId(store: StoreResult): string {
  return `${store.provider}|${store.storeName}`;
}

interface Props {
  stores: StoreResult[];
  center: [number, number]; // [lat, lng]
  hoveredStoreId?: string | null;
  onHoverStore?: (id: string | null) => void;
}

/** Check availability accounting for static providers (dailySlots count=-1) */
function hasAvailability(store: StoreResult) {
  return store.dailySlots
    ? store.dailySlots.some((s) => s.count !== 0)
    : Boolean(store.slotsAvailable);
}

/* ------------------------------------------------------------------ */
/*  Brand colours for map pins                                         */
/*  Featured/platinum providers get their brand colour on the pin      */
/*  instead of the generic amber. Keyed by provider name as it        */
/*  appears on StoreResult.provider.                                   */
/* ------------------------------------------------------------------ */
const PIN_BRAND_COLORS: Record<string, string> = {
  // Main chains
  "Boots Opticians": "#0460a9",
  "ASDA Opticians": "#78b83e",
  "Vision Express": "#7b2d8e",
  "M&S Opticians": "#007a33",
  "Ace & Tate": "#1a1a1a",
  "scrivens": "#c62828",
  "Jimmy Fairly": "#e8b923",
  // MySight independents — keyed by exact siteHost from MYSIGHT_SITES
  "duncanandtodd.mysight.uk": "#1a1a1a",       // Duncan & Todd — black
  "leightons.mysight.uk": "#1b3a6b",            // Leightons — navy
  "rawlingsopticians.mysight.uk": "#003d6b",    // Rawlings — dark blue
  "bayfieldsopticians.mysight.uk": "#004d3d",   // Bayfields — dark teal
  "harroldopticians.mysight.uk": "#2c3e50",     // Harrold Opticians — charcoal
  "cranfordopticians.mysight.uk": "#4a2c82",    // Cranford — purple
  "lynnefernandes.mysight.uk": "#6b2c5e",       // Lynne Fernandes — plum
  "eyesite.mysight.uk": "#1565c0",              // Eyesite — blue
  "classiceyes.mysight.uk": "#8b5e3c",          // Classic Eyes — brown
  "eyecollective.mysight.uk": "#2e7d32",        // Eye Collective — green
  "optimaopticians.mysight.uk": "#0277bd",      // Optima — light blue
  "viewpoint.mysight.uk": "#d84315",            // Viewpoint — burnt orange
};

/** Return the brand colour for a featured store's pin, with a fallback */
function getFeaturedPinColor(store: StoreResult): string {
  // Check explicit brand map first
  const brandColor = PIN_BRAND_COLORS[store.provider];
  if (brandColor) return brandColor;
  // Fallback: amber for any other featured provider
  return "#f59e0b";
}

function formatDistance(m: number): string {
  const miles = m / 1609.344;
  if (miles < 0.1) return `${Math.round(m * 1.09361)} yds`;
  return `${miles.toFixed(1)} mi`;
}

/** Teardrop-shaped map pin using inline SVG */
function Pin({ store, highlighted }: { store: StoreResult; highlighted?: boolean }) {
  const featured = store.featured;
  const isPlatinum = store.tier === "platinum";
  const available = hasAvailability(store);

  // Featured pins use provider brand colour; others use teal/grey
  const baseFill = featured
    ? getFeaturedPinColor(store)
    : available ? "#0ea5a0" : "#9ca3af";
  // Brighter fill when highlighted from card hover
  const fill = highlighted && !featured ? (available ? "#0d8a86" : "#6b7280") : baseFill;
  const size = highlighted ? 40 : isPlatinum ? 38 : featured ? 36 : 30;

  return (
    <div
      className="group/pin"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: highlighted
          ? "drop-shadow(0 0 8px rgba(14,165,160,0.6))"
          : "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
      }}
    >
      {/* Hover label — store name tooltip (shown on pin hover OR when highlighted from card) */}
      <div
        className={highlighted ? "block" : "hidden group-hover/pin:block"}
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
            backgroundColor: highlighted ? "#0ea5a0" : "#1e293b",
            color: "#fff",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            boxShadow: highlighted
              ? "0 2px 12px rgba(14,165,160,0.4)"
              : "0 2px 8px rgba(0,0,0,0.2)",
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
            borderTop: `5px solid ${highlighted ? "#0ea5a0" : "#1e293b"}`,
          }}
        />
      </div>

      {/* Pulse ring when highlighted */}
      {highlighted && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: "50%",
            border: "2px solid #0ea5a0",
            opacity: 0.5,
            transform: "translate(-50%, -60%)",
            animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
      )}

      {/* Teardrop pin */}
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 30 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "transform 0.15s ease",
          transform: highlighted ? "scale(1.25)" : "scale(1)",
        }}
        className="group-hover/pin:scale-110"
      >
        {/* Platinum outer glow ring */}
        {isPlatinum && (
          <path
            d="M15 0C6.716 0 0 6.716 0 15c0 10.969 13.256 22.748 13.82 23.254a1.8 1.8 0 002.36 0C16.744 37.748 30 25.969 30 15 30 6.716 23.284 0 15 0z"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeOpacity="0.3"
            style={{ filter: "blur(2px)" }}
          />
        )}
        <path
          d="M15 0C6.716 0 0 6.716 0 15c0 10.969 13.256 22.748 13.82 23.254a1.8 1.8 0 002.36 0C16.744 37.748 30 25.969 30 15 30 6.716 23.284 0 15 0z"
          fill={fill}
        />
        {/* White border for platinum pins to help them stand out */}
        {isPlatinum && (
          <path
            d="M15 0C6.716 0 0 6.716 0 15c0 10.969 13.256 22.748 13.82 23.254a1.8 1.8 0 002.36 0C16.744 37.748 30 25.969 30 15 30 6.716 23.284 0 15 0z"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        )}
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

export default function StoreMap({ stores, center, hoveredStoreId, onHoverStore }: Props) {
  const [popup, setPopup] = useState<StoreResult | null>(null);
  const mapped = stores.filter((s) => s.lat && s.lng);

  /* Track marker wrapper elements for direct DOM z-index manipulation.
     react-map-gl's Marker is wrapped in React.memo and uses portals —
     directly setting z-index on the .mapboxgl-marker container is more
     reliable than passing it through the Marker style prop. */
  const markerEls = useRef<Record<string, HTMLDivElement>>({});

  useEffect(() => {
    for (const [id, wrapper] of Object.entries(markerEls.current)) {
      const container = wrapper.closest(".mapboxgl-marker") as HTMLElement | null;
      if (!container) continue;
      if (id === hoveredStoreId) {
        container.style.zIndex = "100";
      } else {
        container.style.zIndex = "";
      }
    }
  }, [hoveredStoreId]);

  // Stable render order — unavailable → available → featured.
  // Never reorder based on hover state: reordering the React element
  // array causes react-map-gl to reconcile Marker portals, which can
  // swallow the highlight update.
  const renderOrder = [
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

      <style>{`@keyframes ping { 75%, 100% { transform: translate(-50%, -60%) scale(2); opacity: 0; } }`}</style>

      {renderOrder.map((store) => {
        const storeId = getStoreId(store);
        const isHighlighted = storeId === hoveredStoreId;
        return (
          <Marker
            key={storeId}
            latitude={store.lat!}
            longitude={store.lng!}
            anchor="bottom"
            onClick={(e: { originalEvent: MouseEvent }) => {
              e.originalEvent.stopPropagation();
              setPopup(store);
            }}
          >
            <div
              ref={(el) => {
                if (el) markerEls.current[storeId] = el;
                else delete markerEls.current[storeId];
              }}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onHoverStore?.(storeId)}
              onMouseLeave={() => onHoverStore?.(null)}
            >
              <Pin store={store} highlighted={isHighlighted} />
            </div>
          </Marker>
        );
      })}

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
            {/* Featured badge — uses provider brand colour */}
            {popup.featured && (() => {
              const brandCol = getFeaturedPinColor(popup);
              return (
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: brandCol + "18",
                    color: brandCol,
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 12,
                    padding: "2px 8px",
                    marginBottom: 8,
                    border: `1px solid ${brandCol}30`,
                  }}
                >
                  ★ {popup.featuredLabel ?? "Recommended"}
                </div>
              );
            })()}

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
