"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { StoreResult } from "@/lib/types";

const StoreMap = dynamic(() => import("@/components/StoreMap"), { ssr: false });

/** Stable ID for cross-component hover tracking — must match StoreMap.getStoreId */
function getStoreId(store: StoreResult): string {
  return `${store.provider}|${store.storeName}`;
}

/* ------------------------------------------------------------------ */
/*  Provider badge colors                                              */
/* ------------------------------------------------------------------ */

const PROVIDER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Boots Opticians": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "ASDA Opticians": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "Vision Express": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

const PROVIDER_BRANDS: Record<string, { color: string; initial: string }> = {
  "Boots Opticians": { color: "#0064d2", initial: "B" },
  "ASDA Opticians": { color: "#78be20", initial: "A" },
  "Vision Express": { color: "#6b21a8", initial: "V" },
  "M&S Opticians": { color: "#007a33", initial: "M" },
  "Ace & Tate": { color: "#2f26dd", initial: "A" },
  "Leightons": { color: "#a8228e", initial: "L" },
  "Rawlings Opticians": { color: "#ff6900", initial: "R" },
  "Duncan & Todd": { color: "#1a3a5c", initial: "D" },
  "Bayfields Opticians": { color: "#2d5a27", initial: "B" },
};

/* ------------------------------------------------------------------ */
/*  Brand logos — static paths in /public/logos/ (Apify later)         */
/* ------------------------------------------------------------------ */

const BRAND_LOGOS: Record<string, string> = {
  "Vision Express": "/logos/vision-express.svg",
  "ASDA Opticians": "/logos/asda-opticians.svg",
  "M&S Opticians": "/logos/mands-opticians.png",
  "Ace & Tate": "/logos/ace-and-tate.png",
  "Boots Opticians": "/logos/boots-opticians.svg",
  "Leightons": "/logos/leightons.png",
  "Rawlings Opticians": "/logos/rawlings.svg",
  "Duncan & Todd": "/logos/duncan-and-todd.svg",
};

/** Default services taglines for demo mode + fallback */
const BRAND_SERVICES: Record<string, string> = {
  "Vision Express": "NHS & private eye tests • Designer frames • Contact lenses",
  "ASDA Opticians": "Affordable NHS eye tests • Budget-friendly frames • Free parking",
  "M&S Opticians": "NHS & private eye tests • Same-day appointments • Contact lens fitting",
  "Ace & Tate": "Style-led eye tests • In-house frame design • Home try-on",
  "Boots Opticians": "NHS & private eye tests • Advantage Card points • Contact lenses",
  "Duncan & Todd": "NHS & private eye tests • Contact lenses • Hearing care",
  "Leightons": "NHS & private eye tests • Hearing care • Premium eyewear",
  "Rawlings Opticians": "Family opticians since 1895 • NHS & private eye tests",
  "Bayfields Opticians": "Independent opticians • NHS & private eye tests • Contact lenses",
};

/* ------------------------------------------------------------------ */
/*  Brand-level average Google ratings (until per-store scraping)      */
/* ------------------------------------------------------------------ */

const PROVIDER_RATINGS: Record<string, { rating: number; count: number }> = {
  "Boots Opticians": { rating: 4.3, count: 2800 },
  "ASDA Opticians": { rating: 4.1, count: 1400 },
  "Vision Express": { rating: 4.4, count: 3200 },
  "M&S Opticians": { rating: 4.5, count: 680 },
  "Duncan & Todd": { rating: 4.7, count: 340 },
  "Leightons": { rating: 4.6, count: 280 },
  "Rawlings Opticians": { rating: 4.8, count: 190 },
  "Bayfields Opticians": { rating: 4.5, count: 220 },
  "Ace & Tate": { rating: 4.6, count: 520 },
};

/** Get rating for a store — prefer store-level, fall back to brand average */
function getStoreRating(store: StoreResult): { rating: number; count: number } | null {
  if (store.googleRating && store.googleReviewCount) {
    return { rating: store.googleRating, count: store.googleReviewCount };
  }
  // Check provider name directly
  if (PROVIDER_RATINGS[store.provider]) return PROVIDER_RATINGS[store.provider];
  // MySight independents: use a generic independent rating
  if (store.provider.endsWith(".mysight.uk")) return { rating: 4.7, count: 85 };
  return null;
}

/** Render star rating with count */
function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`full-${i}`} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalf && (
          <svg className="w-3 h-3" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`empty-${i}`} className="w-3 h-3 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-[10px] font-semibold text-amber-600">{rating.toFixed(1)}</span>
      <span className="text-[10px] text-gray-400">({count.toLocaleString()})</span>
    </div>
  );
}

function getProviderStyle(provider: string) {
  if (PROVIDER_COLORS[provider]) return PROVIDER_COLORS[provider];
  // MySight sites get indigo (independent)
  if (provider.endsWith(".mysight.uk")) {
    return { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" };
  }
  return { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" };
}

/** Chain providers — brands with many branches */
const CHAIN_PROVIDERS = new Set([
  "Boots Opticians",
  "ASDA Opticians",
  "Vision Express",
  "M&S Opticians",
  "Ace & Tate",
]);

function isIndependent(provider: string): boolean {
  return provider.endsWith(".mysight.uk");
}

function isChain(provider: string): boolean {
  return CHAIN_PROVIDERS.has(provider);
}

/* ------------------------------------------------------------------ */
/*  Friendly MySight provider names (slugs → proper display names)    */
/* ------------------------------------------------------------------ */

const MYSIGHT_NAMES: Record<string, string> = {
  "2020opticians": "2020 Opticians",
  alldersopticians: "Allders Opticians",
  barracloughs: "Barracloughs",
  batemanopticians: "Bateman Opticians",
  bayfieldsopticians: "Bayfields Opticians",
  "cameron-davies": "Cameron Davies",
  chalmersopticians: "Chalmers Opticians",
  classiceyes: "Classic Eyes",
  cranfordopticians: "Cranford Opticians",
  duncanandtodd: "Duncan & Todd",
  "exmouth-eyecare": "Exmouth Eyecare",
  eyecollective: "Eye Collective",
  eyelink: "Eyelink",
  eyesentials: "Eyesentials",
  eyesite: "Eyesite",
  harroldopticians: "Harrold Opticians",
  houghtonopticians: "Houghton Opticians",
  johnhigheyecare: "John High Eyecare",
  johnroseeyecare: "John Rose Eyecare",
  leightons: "Leightons",
  lynnefernandes: "Lynne Fernandes",
  millicansopticians: "Millicans Opticians",
  "norville-opticians": "Norville Opticians",
  oakwoodeyecare: "Oakwood Eyecare",
  observatoryopticians: "Observatory Opticians",
  optimaopticians: "Optima Opticians",
  peterbowersopticians: "Peter Bowers Opticians",
  rawlingsopticians: "Rawlings Opticians",
  reynoldsopticians: "Reynolds Opticians",
  seoptom: "SE Optom",
  suzannedennisoptometrist: "Suzanne Dennis Optometrist",
  "the-eye-place": "The Eye Place",
  viewpoint: "Viewpoint",
  woodingopticians: "Wooding Opticians",
};

function displayProviderName(p: string): string {
  if (p.endsWith(".mysight.uk")) {
    const slug = p.replace(".mysight.uk", "");
    if (MYSIGHT_NAMES[slug]) return MYSIGHT_NAMES[slug];
    // Fallback: split known suffixes, capitalize
    return slug
      .replace(/-/g, " ")
      .replace(/(opticians|optometrists?|eyecare|eyes)$/i, " $1")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return p;
}

function formatDistance(m: number): string {
  const miles = m / 1609.344;
  if (miles < 0.1) return `${Math.round(m * 1.09361)} yds`;
  return `${miles.toFixed(1)} mi`;
}

/* ------------------------------------------------------------------ */
/*  Departure overlay — branded handoff before external redirect       */
/* ------------------------------------------------------------------ */

const DEPARTURE_DELAY_MS = 2500;

type DepartureInfo = {
  providerName: string;
  storeName: string;
  url: string;
};

function DepartureOverlay({
  info,
  onClose,
}: {
  info: DepartureInfo;
  onClose: () => void;
}) {
  const brand = PROVIDER_BRANDS[info.providerName];
  const brandColor = brand?.color ?? "#374151";
  const brandInitial = brand?.initial ?? info.providerName.charAt(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = info.url;
    }, DEPARTURE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [info.url]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden animate-in">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-[var(--color-primary)] rounded-r-full"
            style={{ animation: `departure-progress ${DEPARTURE_DELAY_MS}ms linear forwards` }}
          />
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10">
          {/* Logo handoff: eyetest.co.uk -> Provider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* eyetest.co.uk logo */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(180deg, #0d1b3e 0%, #0ea5a0 100%)" }}>
                <svg viewBox="0 0 32 32" className="w-9 h-9">
                  <text x="7" y="22" fontFamily="system-ui,-apple-system,sans-serif" fontWeight="800" fontSize="18" fill="white">e</text>
                  <text x="18" y="22" fontFamily="system-ui,-apple-system,sans-serif" fontWeight="800" fontSize="18" fill="#5eead4">t</text>
                </svg>
              </div>
              <span className="text-[10px] font-medium text-gray-400">eyetest.co.uk</span>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* Provider logo */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: brandColor }}>
                <span className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>{brandInitial}</span>
              </div>
              <span className="text-[10px] font-medium text-gray-400 max-w-[80px] text-center leading-tight">{info.providerName}</span>
            </div>
          </div>

          {/* Message */}
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--color-navy)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Booking with {info.providerName}
            </h3>
            <p className="text-sm text-gray-500 mb-1 leading-relaxed">
              You&apos;re being connected to <strong className="text-[var(--color-navy)]">{info.storeName}</strong> to
              complete your eye test booking.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              This is a completely free service — no fees, no sign-up.
            </p>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 mb-6">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                100% free
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Direct booking
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Secure
              </span>
            </div>

            {/* Skip button */}
            <a href={info.url} rel="noopener noreferrer"
              className="inline-block text-xs text-gray-400 hover:text-[var(--color-primary)] transition-colors cursor-pointer">
              Go now &rarr;
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-3 text-center">
          <p className="text-[10px] text-gray-400">
            Found by <strong className="text-[var(--color-primary)]">eyetest.co.uk</strong> — the UK&apos;s free eye test comparison service
          </p>
        </div>
      </div>

      <style>{`
        @keyframes departure-progress { from { width: 0%; } to { width: 100%; } }
        .animate-in { animation: overlay-in 0.25s ease-out; }
        @keyframes overlay-in { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Deduplication — merge stores with similar names at the same spot  */
/* ------------------------------------------------------------------ */

function normaliseBrand(store: StoreResult): string {
  return store.storeName
    .toLowerCase()
    .replace(/\bopticians\b|\boptometrists?\b|\beyecare\b|\beye care\b|\boptical\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function deduplicateStores(stores: StoreResult[]): StoreResult[] {
  const result: StoreResult[] = [];
  const consumed = new Set<number>();

  for (let i = 0; i < stores.length; i++) {
    if (consumed.has(i)) continue;
    let best = stores[i];
    const bestName = normaliseBrand(best);

    for (let j = i + 1; j < stores.length; j++) {
      if (consumed.has(j)) continue;
      const other = stores[j];
      const otherName = normaliseBrand(other);

      // Name check: one must contain the other (handles "Leightons" vs "Leightons Opticians" etc.)
      const nameMatch =
        bestName === otherName ||
        bestName.startsWith(otherName) ||
        otherName.startsWith(bestName);
      if (!nameMatch) continue;

      // Location check: both must have coords and be within 500 m
      if (!best.lat || !best.lng || !other.lat || !other.lng) continue;
      const dLat = (best.lat - other.lat) * 111_000;
      const dLng =
        (best.lng - other.lng) * 111_000 * Math.cos((best.lat * Math.PI) / 180);
      if (Math.sqrt(dLat * dLat + dLng * dLng) > 500) continue;

      // It's a duplicate — keep whichever has better availability data
      consumed.add(j);
      const bestHasSlots = best.dailySlots?.some((s) => s.count !== 0) ?? Boolean(best.slotsAvailable);
      const otherHasSlots = other.dailySlots?.some((s) => s.count !== 0) ?? Boolean(other.slotsAvailable);
      if (otherHasSlots && !bestHasSlots) best = other;
    }
    result.push(best);
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  StoreCard                                                          */
/* ------------------------------------------------------------------ */

function getDayLabels() {
  const todayStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
  const tom = new Date();
  tom.setDate(tom.getDate() + 1);
  const tomorrowStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(tom);
  return { todayStr, tomorrowStr };
}

function DayLabel({ date }: { date: string }) {
  const { todayStr, tomorrowStr } = getDayLabels();
  if (date === todayStr) return <>Today</>;
  if (date === tomorrowStr) return <>Tomorrow</>;
  const dt = new Date(date + "T12:00:00");
  const day = dt.toLocaleDateString("en-GB", { weekday: "short" });
  return <>{day}&nbsp;{dt.getDate()}</>;
}

/** Check whether a store's dailySlots have been shifted beyond today */
function isShiftedWindow(dailySlots: { date: string }[] | undefined): boolean {
  if (!dailySlots || dailySlots.length === 0) return false;
  const { todayStr } = getDayLabels();
  return dailySlots[0].date > todayStr;
}

const HIDE_ACTIONS_PROVIDERS = /vision express|specsavers/i;

/* ------------------------------------------------------------------ */
/*  MobileStoreCard — compact 2-line card for small screens            */
/* ------------------------------------------------------------------ */

function getAvailabilitySummary(store: StoreResult): { text: string; available: boolean } {
  if (!store.dailySlots || store.dailySlots.length === 0) {
    if (store.slotsAvailable) return { text: "Available", available: true };
    return { text: "No appointments", available: false };
  }

  const firstAvail = store.dailySlots.find((s) => s.count !== 0);
  if (!firstAvail) return { text: "No appointments", available: false };

  const { todayStr, tomorrowStr } = getDayLabels();
  const shifted = isShiftedWindow(store.dailySlots);

  if (firstAvail.date === todayStr) return { text: "Available today", available: true };
  if (firstAvail.date === tomorrowStr) return { text: "Available tomorrow", available: true };

  const dt = new Date(firstAvail.date + "T12:00:00");
  const dayName = dt.toLocaleDateString("en-GB", { weekday: "short" });
  const dayNum = dt.getDate();
  const monthName = dt.toLocaleDateString("en-GB", { month: "short" });
  const dateLabel = `${dayName} ${dayNum} ${monthName}`;

  if (shifted) return { text: `Earliest: ${dateLabel}`, available: true };
  return { text: `Available ${dateLabel}`, available: true };
}

function MobileStoreCard({ store, highlighted, onBook }: { store: StoreResult; highlighted?: boolean; onBook?: (e: React.MouseEvent, store: StoreResult) => void }) {
  const hasSlots = store.dailySlots
    ? store.dailySlots.some((s) => s.count !== 0)
    : Boolean(store.slotsAvailable);
  const style = getProviderStyle(store.provider);
  const hideActions = !hasSlots && HIDE_ACTIONS_PROVIDERS.test(store.provider);
  const { text: availText, available: isAvail } = getAvailabilitySummary(store);

  const borderColor = store.featured ? "#f59e0b" : isIndependent(store.provider) ? "#6366f1" : hasSlots ? "#22c55e" : "#d1d5db";

  return (
    <div
      className={`rounded-lg bg-white shadow-sm overflow-hidden ${
        store.featured ? "ring-1 ring-amber-300" : isIndependent(store.provider) ? "ring-1 ring-indigo-300" : ""
      } ${highlighted ? "ring-2 ring-[var(--color-primary)] shadow-md bg-teal-50/30" : ""}`}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="px-3 py-2.5">
        {/* Line 1: badge + store name + distance */}
        <div className="flex items-center gap-1.5 min-w-0">
          {(store.featured || isIndependent(store.provider)) && (
            isIndependent(store.provider) ? (
              <svg className="w-3 h-3 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            ) : store.featured ? (
              <svg className="w-3 h-3 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : null
          )}
          <span
            className={`inline-block rounded-full px-1.5 py-px text-[9px] font-semibold flex-shrink-0 ${style.bg} ${style.text}`}
          >
            {displayProviderName(store.provider)}
          </span>
          <span
            className="text-xs font-semibold text-[var(--color-navy)] truncate min-w-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {store.storeName}
          </span>
          <span className="flex-shrink-0 text-[10px] text-gray-400 ml-auto whitespace-nowrap">
            {formatDistance(store.distanceM)}
          </span>
        </div>

        {/* Line 2: availability dot + text + rating + Book button */}
        <div className="flex items-center gap-1.5 mt-1 min-w-0">
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              isAvail ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <span
            className={`text-[11px] font-medium truncate min-w-0 ${
              isAvail ? "text-green-600" : "text-gray-400"
            }`}
          >
            {availText}
          </span>
          {/* Compact rating for mobile */}
          {(() => {
            const rd = getStoreRating(store);
            return rd ? (
              <span className="flex-shrink-0 inline-flex items-center gap-0.5 text-[10px] text-amber-500">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{rd.rating.toFixed(1)}</span>
              </span>
            ) : null;
          })()}
          {!hideActions && (
            <a
              href={store.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onBook ? (e) => onBook(e, store) : undefined}
              className={`flex-shrink-0 ml-auto inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors ${
                hasSlots
                  ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              Book&nbsp;&rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function StoreCard({ store, highlighted, onBook }: { store: StoreResult; highlighted?: boolean; onBook?: (e: React.MouseEvent, store: StoreResult) => void }) {
  const hasSlots = store.dailySlots
    ? store.dailySlots.some((s) => s.count !== 0)
    : Boolean(store.slotsAvailable);
  const style = getProviderStyle(store.provider);
  const hideActions = !hasSlots && HIDE_ACTIONS_PROVIDERS.test(store.provider);

  return (
    <div
      className={`rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
        store.featured ? "ring-1 ring-amber-300" : isIndependent(store.provider) ? "ring-1 ring-indigo-300" : ""
      } ${highlighted ? "ring-2 ring-[var(--color-primary)] shadow-lg bg-teal-50/30" : ""}`}
      style={{
        borderLeft: `4px solid ${
          store.featured ? "#f59e0b" : isIndependent(store.provider) ? "#6366f1" : hasSlots ? "#22c55e" : "#d1d5db"
        }`,
      }}
    >
      <div className="p-4">
        {/* Featured / Independent badge */}
        {(store.featured || isIndependent(store.provider)) && (
          <div className="mb-2">
            {isIndependent(store.provider) ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                {store.featured && store.featuredLabel === "Independent" ? store.featuredLabel : "Independent"}
              </span>
            ) : store.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {store.featuredLabel ?? "Recommended"}
              </span>
            ) : null}
          </div>
        )}

        {/* Top row: provider badge + distance */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}
          >
            {displayProviderName(store.provider)}
          </span>
          <span className="flex-shrink-0 text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded whitespace-nowrap">
            {formatDistance(store.distanceM)}
          </span>
        </div>

        {/* Store name — with small logo for Gold tier */}
        <div className="flex items-center gap-2 mb-1">
          {store.tier === "gold" && (store.logoUrl || BRAND_LOGOS[store.provider]) && (
            <BrandLogo src={store.logoUrl || BRAND_LOGOS[store.provider]} name={displayProviderName(store.provider)} size={26} />
          )}
          <h3
            className="text-sm font-semibold text-[var(--color-navy)] leading-snug line-clamp-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {store.storeName}
          </h3>
        </div>

        {/* Address */}
        {(store.address || store.town || store.postcode) && (
          <p className="text-[11px] text-gray-400 mb-1.5 truncate">
            {[store.address, store.town, store.postcode]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}

        {/* Phone */}
        {store.phone && (
          <p className="text-[11px] text-gray-400 mb-2">{store.phone}</p>
        )}

        {/* Google review rating */}
        {(() => {
          const ratingData = getStoreRating(store);
          return ratingData ? (
            <div className="mb-2">
              <StarRating rating={ratingData.rating} count={ratingData.count} />
            </div>
          ) : null;
        })()}

        {/* 3-day availability calendar */}
        {store.dailySlots && store.dailySlots.length > 0 ? (
          <div className="mb-3">
            {/* Shifted-window indicator */}
            {isShiftedWindow(store.dailySlots) && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Earliest availability
                </span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-1.5">
            {store.dailySlots.map((slot) => {
              const avail = slot.count !== 0;
              return (
                <div
                  key={slot.date}
                  className={`rounded-lg py-2 text-center ${
                    avail
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div
                    className={`text-[9px] font-semibold uppercase tracking-wide ${
                      avail ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <DayLabel date={slot.date} />
                  </div>
                  <div
                    className={`text-base font-bold leading-tight mt-0.5 ${
                      avail ? "text-green-700" : "text-gray-300"
                    }`}
                  >
                    {slot.count > 0
                      ? slot.count
                      : slot.count === -1
                        ? "✓"
                        : "—"}
                  </div>
                  <div
                    className={`text-[8px] mt-0.5 ${
                      avail ? "text-green-500" : "text-gray-300"
                    }`}
                  >
                    {slot.count > 0
                      ? `slot${slot.count !== 1 ? "s" : ""}`
                      : slot.count === -1
                        ? "available"
                        : "none"}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-3">
            {hasSlots ? (
              <>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-success)] bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
                  Available
                </span>
                <span className="text-[10px] text-gray-500 truncate">
                  {store.slotsAvailable}
                </span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                No slots found
              </span>
            )}
          </div>
        )}

        {/* Actions — hidden for Specsavers/Vision Express when no slots */}
        {!hideActions && (
          <div className="flex items-center gap-2">
            <a
              href={store.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onBook ? (e) => onBook(e, store) : undefined}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-colors ${
                hasSlots
                  ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
              }`}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book Now
            </a>
            {store.phone && (
              <a
                href={`tel:${store.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center text-xs font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                aria-label={`Call ${store.storeName}`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Platinum store card — premium visual treatment                     */
/* ------------------------------------------------------------------ */

function BrandLogo({ src, name, size = 38 }: { src?: string; name: string; size?: number }) {
  const brand = PROVIDER_BRANDS[name];
  const color = brand?.color ?? "#374151";
  const initial = brand?.initial ?? name.charAt(0);

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} logo`}
        className="rounded-xl object-contain bg-white"
        style={{ width: size, height: size, flexShrink: 0 }}
        onError={(e) => {
          // Fallback to initial on load error
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
    );
  }

  return (
    <div
      className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.42, fontFamily: "var(--font-display)" }}>{initial}</span>
    </div>
  );
}

function PlatinumStoreCard({ store, highlighted, onBook }: { store: StoreResult; highlighted?: boolean; onBook?: (e: React.MouseEvent, store: StoreResult) => void }) {
  const hasSlots = store.dailySlots
    ? store.dailySlots.some((s) => s.count !== 0)
    : Boolean(store.slotsAvailable);
  const ratingData = getStoreRating(store);

  return (
    <div
      className={`rounded-xl bg-gradient-to-b from-teal-50/60 to-white shadow-md overflow-hidden ${
        highlighted ? "ring-2 ring-[var(--color-primary)] shadow-lg" : ""
      }`}
      style={{ border: "2px solid #0ea5a0", borderLeft: "5px solid #0d1b3e" }}
    >
      <div className="p-5">
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: "#0d1b3e", color: "#5eead4" }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            {store.featuredLabel ?? "Featured Partner"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] font-semibold text-green-700">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        </div>

        {/* Logo + store info */}
        <div className="flex items-center gap-3 mb-3">
          <BrandLogo src={store.logoUrl} name={displayProviderName(store.provider)} size={42} />
          {/* Fallback div (hidden by default, shown if img errors) */}
          {store.logoUrl && (
            <div
              className="rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ width: 42, height: 42, backgroundColor: PROVIDER_BRANDS[store.provider]?.color ?? "#374151", display: "none" }}
            >
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                {PROVIDER_BRANDS[store.provider]?.initial ?? store.provider.charAt(0)}
              </span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-[var(--color-navy)] leading-snug line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
              {store.storeName}
            </h3>
            {(store.address || store.town || store.postcode) && (
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                {[store.address, store.town, store.postcode].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
          <span className="flex-shrink-0 text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded whitespace-nowrap self-start">
            {formatDistance(store.distanceM)}
          </span>
        </div>

        {/* Rating — larger for platinum */}
        {ratingData && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center" aria-label={`${ratingData.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.round(ratingData.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-amber-600">{ratingData.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({ratingData.count.toLocaleString()} reviews)</span>
          </div>
        )}

        {/* Services tagline */}
        {store.services && (
          <p className="text-[11px] text-gray-600 leading-relaxed px-3 py-2 bg-gray-50 rounded-lg mb-3">
            {store.services}
          </p>
        )}

        {/* Phone */}
        {store.phone && (
          <p className="text-[11px] text-gray-400 mb-3">{store.phone}</p>
        )}

        {/* 3-day availability calendar */}
        {store.dailySlots && store.dailySlots.length > 0 ? (
          <div className="mb-4">
            {isShiftedWindow(store.dailySlots) && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Earliest availability
                </span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-1.5">
              {store.dailySlots.map((slot) => {
                const avail = slot.count !== 0;
                return (
                  <div
                    key={slot.date}
                    className={`rounded-lg py-2 text-center ${
                      avail ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <div className={`text-[9px] font-semibold uppercase tracking-wide ${avail ? "text-green-600" : "text-gray-400"}`}>
                      <DayLabel date={slot.date} />
                    </div>
                    <div className={`text-base font-bold leading-tight mt-0.5 ${avail ? "text-green-700" : "text-gray-300"}`}>
                      {slot.count > 0 ? slot.count : slot.count === -1 ? "✓" : "—"}
                    </div>
                    <div className={`text-[8px] mt-0.5 ${avail ? "text-green-500" : "text-gray-300"}`}>
                      {slot.count > 0 ? `slot${slot.count !== 1 ? "s" : ""}` : slot.count === -1 ? "available" : "none"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4">
            {hasSlots ? (
              <>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-success)] bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
                  Available
                </span>
                <span className="text-[10px] text-gray-500 truncate">{store.slotsAvailable}</span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                No slots found
              </span>
            )}
          </div>
        )}

        {/* CTA buttons — navy for platinum */}
        <div className="flex items-center gap-2">
          <a
            href={store.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onBook ? (e) => onBook(e, store) : undefined}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-lg transition-colors ${
              hasSlots
                ? "bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Now
          </a>
          {store.phone && (
            <a
              href={`tel:${store.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-colors border border-gray-200"
              aria-label={`Call ${store.storeName}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Platinum card — compact but still premium                   */
/* ------------------------------------------------------------------ */

function MobilePlatinumStoreCard({ store, highlighted, onBook }: { store: StoreResult; highlighted?: boolean; onBook?: (e: React.MouseEvent, store: StoreResult) => void }) {
  const hasSlots = store.dailySlots
    ? store.dailySlots.some((s) => s.count !== 0)
    : Boolean(store.slotsAvailable);
  const { text: availText, available: isAvail } = getAvailabilitySummary(store);
  const ratingData = getStoreRating(store);

  return (
    <div
      className={`rounded-lg bg-gradient-to-b from-teal-50/60 to-white shadow-sm overflow-hidden ${
        highlighted ? "ring-2 ring-[var(--color-primary)] shadow-md" : ""
      }`}
      style={{ border: "1.5px solid #0ea5a0", borderLeft: "4px solid #0d1b3e" }}
    >
      <div className="px-3 py-2.5">
        {/* Badges */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ backgroundColor: "#0d1b3e", color: "#5eead4" }}>
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            {store.featuredLabel ?? "Featured Partner"}
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-1.5 py-px text-[8px] font-semibold text-green-700">
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        </div>

        {/* Logo + name + distance */}
        <div className="flex items-center gap-2 mb-1.5">
          <BrandLogo src={store.logoUrl} name={displayProviderName(store.provider)} size={28} />
          {store.logoUrl && (
            <div
              className="rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ width: 28, height: 28, backgroundColor: PROVIDER_BRANDS[store.provider]?.color ?? "#374151", display: "none" }}
            >
              <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-display)" }}>
                {PROVIDER_BRANDS[store.provider]?.initial ?? store.provider.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-xs font-semibold text-[var(--color-navy)] truncate min-w-0" style={{ fontFamily: "var(--font-display)" }}>
            {store.storeName}
          </span>
          <span className="flex-shrink-0 text-[10px] text-gray-400 ml-auto whitespace-nowrap">
            {formatDistance(store.distanceM)}
          </span>
        </div>

        {/* Availability + rating + book */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isAvail ? "bg-green-500" : "bg-gray-300"}`} />
          <span className={`text-[11px] font-medium truncate min-w-0 ${isAvail ? "text-green-600" : "text-gray-400"}`}>
            {availText}
          </span>
          {ratingData && (
            <span className="flex-shrink-0 inline-flex items-center gap-0.5 text-[10px] text-amber-500">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{ratingData.rating.toFixed(1)}</span>
            </span>
          )}
          {!hasSlots ? null : (
            <a
              href={store.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onBook ? (e) => onBook(e, store) : undefined}
              className="flex-shrink-0 ml-auto inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors bg-[var(--color-navy)] text-white"
            >
              Book&nbsp;&rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading skeleton                                                   */
/* ------------------------------------------------------------------ */

function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden animate-pulse" style={{ borderLeft: "4px solid #e5e7eb" }}>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded-full" />
          <div className="h-4 w-12 bg-gray-100 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-100 rounded" />
        <div className="h-4 w-20 bg-gray-100 rounded-full" />
        <div className="h-8 w-full bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Enhanced search progress panel                                     */
/* ------------------------------------------------------------------ */

const CHAIN_INFO: Record<string, { name: string; color: string }> = {
  "Boots Opticians": { name: "Boots Opticians", color: "#0460a9" },
  "ASDA Opticians": { name: "ASDA Opticians", color: "#78b83e" },
  "Vision Express": { name: "Vision Express", color: "#7b2d8e" },
};

function SearchProgressPanel({
  postcode,
  district,
  activeProviders,
  loadingProviders,
  resultsCount,
  independentsFoundCount,
}: {
  postcode: string;
  district: string | null;
  activeProviders: string[];
  loadingProviders: string[];
  resultsCount: number;
  independentsFoundCount: number;
}) {
  const chains = activeProviders.filter((p) => !p.endsWith(".mysight.uk"));
  const independents = activeProviders.filter((p) => p.endsWith(".mysight.uk"));
  const independentsDone = independents.every((p) => !loadingProviders.includes(p));
  const totalProviders = activeProviders.length;
  const completedCount = totalProviders - loadingProviders.length;
  const progress =
    totalProviders > 0 ? (completedCount / totalProviders) * 100 : 0;

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-navy)] to-[#1a2d5a] p-4 sm:p-7 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl" />

      <div className="relative">
        {/* Headline */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[var(--color-primary-light)] animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h3
              className="text-sm sm:text-lg font-bold mb-0.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Relax &mdash; we&apos;re doing the hard work
            </h3>
            <p className="text-sm text-white/60">
              Searching{" "}
              <strong className="text-white">{totalProviders} opticians</strong>{" "}
              near{" "}
              <strong className="text-[var(--color-primary-light)]">
                {postcode}
              </strong>{" "}
              so you don&apos;t have to
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[11px] text-white/40 mb-1.5">
            <span>
              {completedCount} of {totalProviders} checked
            </span>
            {resultsCount > 0 && (
              <span className="text-[var(--color-success)]">
                {resultsCount} found so far
              </span>
            )}
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progress, 3)}%` }}
            />
          </div>
        </div>

        {/* Provider badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {/* Major chains */}
          {chains.map((provider) => {
            const info = CHAIN_INFO[provider];
            const done = !loadingProviders.includes(provider);
            return (
              <div
                key={provider}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  done
                    ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                    : "bg-white/10 text-white/80"
                }`}
              >
                {done ? (
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-current" />
                )}
                {info?.name ?? provider}
              </div>
            );
          })}

          {/* Independent opticians — grouped as one badge */}
          {independents.length > 0 && (
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                independentsDone
                  ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                  : "bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]"
              }`}
            >
              {independentsDone ? (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-current" />
              )}
              {independentsDone
                ? `${independentsFoundCount} Independent Optician${independentsFoundCount !== 1 ? "s" : ""}${district ? ` near ${district}` : ""}`
                : `Checking ${independents.length} Independent Brands`}
            </div>
          )}
        </div>

        {/* Value proposition — hidden on mobile */}
        <p className="hidden sm:block mt-4 text-[11px] text-white/30 leading-relaxed">
          The average person spends up to 2 hours arranging an eye test. We
          check real-time availability across every major chain and your local
          independents in seconds.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stream state                                                       */
/* ------------------------------------------------------------------ */

interface StreamState {
  postcode: string | null;
  district: string | null;
  center: [number, number] | null;
  results: StoreResult[];
  errors: { provider: string; message: string }[];
  activeProviders: string[];
  loadingProviders: string[];
  done: boolean;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Demo mode brand slug → provider matching                           */
/* ------------------------------------------------------------------ */

const DEMO_SLUGS: Record<string, string[]> = {
  "vision-express": ["Vision Express"],
  "asda-opticians": ["ASDA Opticians"],
  "asda": ["ASDA Opticians"],
  "mands-opticians": ["M&S Opticians"],
  "mands": ["M&S Opticians"],
  "ms-opticians": ["M&S Opticians"],
  "ace-and-tate": ["Ace & Tate"],
  "boots-opticians": ["Boots Opticians"],
  "boots": ["Boots Opticians"],
  "leightons": ["leightons.mysight.uk"],
  "bayfields": ["bayfieldsopticians.mysight.uk"],
  "rawlings": ["rawlingsopticians.mysight.uk"],
  "scrivens": ["scrivens"],
  "duncan-and-todd": ["duncanandtodd.mysight.uk"],
};

function isDemoMatch(provider: string, demoSlug: string): boolean {
  const targets = DEMO_SLUGS[demoSlug];
  if (targets) return targets.some((t) => provider === t || provider.includes(t));
  // Fallback: fuzzy match on slug within provider name
  const slug = demoSlug.replace(/-/g, " ").toLowerCase();
  return provider.toLowerCase().includes(slug);
}

export function SearchResults({ postcode, demoProvider }: { postcode: string; demoProvider?: string }) {
  const [searching, setSearching] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [stream, setStream] = useState<StreamState | null>(null);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const hasSearched = useRef(false);
  const [departure, setDeparture] = useState<DepartureInfo | null>(null);
  const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);
  const handleBookingClick = useCallback(
    (e: React.MouseEvent, store: StoreResult) => {
      e.preventDefault();
      const provName = displayProviderName(store.provider);
      setDeparture({
        providerName: provName,
        storeName: store.storeName,
        url: store.bookingUrl,
      });
    },
    []
  );

  const handleSearch = useCallback(async (q: string) => {
    if (!q) return;

    setSearching(true);
    setGlobalError(null);
    setStream({
      postcode: null,
      district: null,
      center: null,
      results: [],
      errors: [],
      activeProviders: [],
      loadingProviders: [],
      done: false,
    });

    try {
      const res = await fetch(`/api/search?postcode=${encodeURIComponent(q)}`);

      if (!res.ok) {
        const json = await res.json();
        setGlobalError(json.error ?? "Search failed");
        setSearching(false);
        setStream(null);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const event = JSON.parse(trimmed) as Record<string, unknown>;

            if (event.type === "meta") {
              const active = event.activeProviders as string[];
              setStream((s) =>
                s
                  ? {
                      ...s,
                      postcode: event.postcode as string,
                      district: (event.district as string) || null,
                      center: [event.lat as number, event.lng as number],
                      activeProviders: active,
                      loadingProviders: active,
                    }
                  : s
              );
            } else if (event.type === "results") {
              const provider = event.provider as string;
              const incoming = event.results as StoreResult[];
              setStream((s) =>
                s
                  ? {
                      ...s,
                      results: [...s.results, ...incoming],
                      loadingProviders: s.loadingProviders.filter(
                        (p) => p !== provider
                      ),
                    }
                  : s
              );
            } else if (event.type === "error") {
              const provider = event.provider as string;
              setStream((s) =>
                s
                  ? {
                      ...s,
                      errors: [
                        ...s.errors,
                        {
                          provider,
                          message: event.message as string,
                        },
                      ],
                      loadingProviders: s.loadingProviders.filter(
                        (p) => p !== provider
                      ),
                    }
                  : s
              );
            } else if (event.type === "done") {
              setStream((s) =>
                s ? { ...s, done: true, loadingProviders: [] } : s
              );
            }
          } catch {
            // ignore malformed line
          }
        }
      }
    } catch {
      setGlobalError("Network error -- please try again");
      setStream(null);
    } finally {
      setSearching(false);
    }
  }, []);

  // Auto-search on page load if postcode param exists
  useEffect(() => {
    if (postcode && !hasSearched.current) {
      hasSearched.current = true;
      handleSearch(postcode);
    }
  }, [postcode, handleSearch]);

  const rawResults = stream?.results ?? [];
  const deduped = deduplicateStores(rawResults);

  // Demo mode: promote matching provider results to featured with Platinum treatment
  // Usage: /search?postcode=SW1A1AA&demo=vision-express
  const results = demoProvider
    ? deduped.map((r) => {
        if (!isDemoMatch(r.provider, demoProvider)) return r;
        const name = displayProviderName(r.provider);
        return {
          ...r,
          featured: true,
          featuredLabel: r.featuredLabel ?? "Featured Partner",
          tier: (r.tier ?? "platinum") as "gold" | "platinum",
          logoUrl: r.logoUrl ?? BRAND_LOGOS[name] ?? BRAND_LOGOS[r.provider],
          services: r.services ?? BRAND_SERVICES[name] ?? BRAND_SERVICES[r.provider],
        };
      })
    : deduped;

  // Sort: featured first, then available (by next date), then unavailable (by distance)
  const featured = results
    .filter((r) => r.featured)
    .sort((a, b) => {
      if (a.nextAvailable && b.nextAvailable)
        return a.nextAvailable.localeCompare(b.nextAvailable);
      if (a.nextAvailable) return -1;
      if (b.nextAvailable) return 1;
      return a.distanceM - b.distanceM;
    });

  // Static providers (M&S, Ace & Tate) set slotsAvailable=null but have
  // dailySlots with count=-1 meaning "available, count unknown". Check both.
  const hasAvailability = (r: StoreResult) =>
    r.dailySlots
      ? r.dailySlots.some((s) => s.count !== 0)
      : Boolean(r.slotsAvailable);

  // Separate primary vs additional for chain providers
  // Primary = closest store per chain + all independents
  // Additional = remaining chain locations
  const nonFeatured = results.filter((r) => !r.featured);

  function getChainKey(store: StoreResult): string | null {
    if (isIndependent(store.provider)) return null; // independents are never grouped
    if (isChain(store.provider)) return store.provider;
    return null;
  }

  function splitPrimaryAdditional(stores: StoreResult[]) {
    const sorted = [...stores].sort((a, b) => {
      if (a.nextAvailable && b.nextAvailable)
        return a.nextAvailable.localeCompare(b.nextAvailable);
      if (a.nextAvailable) return -1;
      if (b.nextAvailable) return 1;
      return a.distanceM - b.distanceM;
    });

    const seenChains = new Set<string>();
    const primary: StoreResult[] = [];
    const additional: StoreResult[] = [];

    for (const store of sorted) {
      const chain = getChainKey(store);
      if (chain === null) {
        // Independent or non-chain — always primary
        primary.push(store);
      } else if (!seenChains.has(chain)) {
        // First (best) result from this chain
        seenChains.add(chain);
        primary.push(store);
      } else {
        // Additional location from same chain
        additional.push(store);
      }
    }

    return { primary, additional };
  }

  // Run chain split ONCE across all non-featured stores so each chain
  // only gets one primary entry (the best available, or closest if none).
  // Splitting available/unavailable separately would give each chain TWO
  // primary entries — one available and one unavailable.
  const { primary, additional } = splitPrimaryAdditional(nonFeatured);

  const primaryAvailable = primary.filter(hasAvailability);
  const primaryUnavailable = primary.filter((r) => !hasAvailability(r));
  const additionalAvailable = additional.filter(hasAvailability);
  const additionalUnavailable = additional.filter((r) => !hasAvailability(r));

  // Keep available/unavailable as computed values for count/map calculations
  const available = [...primaryAvailable, ...additionalAvailable];
  const unavailable = [...primaryUnavailable, ...additionalUnavailable];

  const stillLoading = stream !== null && !stream.done;
  const allWithSlots = [...featured, ...available];
  const totalWithSlots =
    allWithSlots.length +
    featured.filter((r) => !r.slotsAvailable).length * -1; // featured without slots don't count
  const availableWithCoords = [...featured, ...available].filter(
    (s) => s.lat && s.lng
  );
  const allStoresForMap = results.filter((s) => s.lat && s.lng);

  // No postcode: empty state
  if (!postcode) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2
            className="text-xl font-semibold text-[var(--color-navy)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Enter a postcode to find opticians
          </h2>
          <p className="text-sm text-gray-500">
            Use the search bar above to find eye test appointments near you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6">
      {/* Error state */}
      {globalError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                We need your full postcode
              </p>
              <p className="text-sm text-amber-700 leading-relaxed">
                {globalError}
              </p>
              <p className="text-xs text-amber-500 mt-2">
                A full UK postcode looks like <strong>SW1A 1AA</strong> or <strong>TW11 8AB</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {stream && (
        <>
          {/* Results summary */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2
                className="text-lg sm:text-xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {results.length > 0 ? (
                  <>
                    {results.length} store{results.length !== 1 ? "s" : ""} found
                    {stream.postcode && (
                      <>
                        {" "}near{" "}
                        <span className="text-[var(--color-primary)]">
                          {stream.postcode}
                        </span>
                      </>
                    )}
                  </>
                ) : stillLoading ? (
                  <>
                    Searching near{" "}
                    <span className="text-[var(--color-primary)]">
                      {stream.postcode ?? postcode}
                    </span>
                    ...
                  </>
                ) : (
                  "No results"
                )}
              </h2>
              {(available.length + featured.filter((r) => hasAvailability(r)).length) > 0 && (
                <p className="text-sm text-gray-500 mt-0.5">
                  <span className="font-medium text-[var(--color-success)]">
                    {available.length + featured.filter((r) => hasAvailability(r)).length}
                  </span>{" "}
                  with available appointments
                </p>
              )}
            </div>

            {/* Mobile map toggle */}
            <button
              onClick={() => setShowMobileMap((v) => !v)}
              className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              {showMobileMap ? "Hide Map" : "Show Map"}
            </button>
          </div>

          {/* Enhanced search progress panel — visible while searching */}
          {stillLoading && stream.activeProviders.length > 0 && (
            <SearchProgressPanel
              postcode={stream.postcode ?? postcode}
              district={stream.district}
              activeProviders={stream.activeProviders}
              loadingProviders={stream.loadingProviders}
              resultsCount={results.length}
              independentsFoundCount={
                new Set(
                  results
                    .filter((r) => r.provider.endsWith(".mysight.uk"))
                    .map((r) => r.provider)
                ).size
              }
            />
          )}

          {/* Compact trust line — shows after search finishes */}
          {!stillLoading && stream.done && results.length > 0 && (() => {
            const brandsChecked = new Set(results.map((r) => r.provider)).size;
            const indepCount = new Set(
              results
                .filter((r) => r.provider.endsWith(".mysight.uk"))
                .map((r) => r.provider)
            ).size;

            return (
              <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-[var(--color-success)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Checked <span className="font-medium text-[var(--color-navy)]">{brandsChecked} brand{brandsChecked !== 1 ? "s" : ""}</span>
                  {indepCount > 0 && <> incl. {indepCount} independent{indepCount !== 1 ? "s" : ""}</>}
                  {stream.district ? ` near ${stream.district}` : ""}
                </span>
              </div>
            );
          })()}

          {/* Mobile map */}
          {showMobileMap && stream.center && (
            <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-100 lg:hidden" style={{ height: "280px" }}>
              <StoreMap stores={allStoresForMap} center={stream.center} hoveredStoreId={hoveredStoreId} onHoverStore={setHoveredStoreId} />
            </div>
          )}

          {/* Split layout: results + map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Results list */}
            <div className="lg:col-span-5 space-y-3">
              {/* Loading skeleton while waiting for first results */}
              {stillLoading && results.length === 0 && (
                <div className="space-y-3">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}

              {/* No results after search completes */}
              {results.length === 0 && stream.done && (
                <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  No stores found within 5 miles of{" "}
                  <span className="font-medium">
                    {stream.postcode ?? postcode}
                  </span>
                  . Try a different postcode.
                </div>
              )}

              {/* Featured results — Platinum gets premium card, Gold gets standard featured */}
              {featured.map((store, i) => {
                const sid = getStoreId(store);
                const isPlatinum = store.tier === "platinum";
                return (
                  <div
                    key={`feat-${i}-${store.storeName}`}
                    onMouseEnter={() => setHoveredStoreId(sid)}
                    onMouseLeave={() => setHoveredStoreId(null)}
                  >
                    {isPlatinum ? (
                      <>
                        <div className="sm:hidden">
                          <MobilePlatinumStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                        <div className="hidden sm:block">
                          <PlatinumStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="sm:hidden">
                          <MobileStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                        <div className="hidden sm:block">
                          <StoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {/* Primary available results (one per chain + all independents) */}
              {primaryAvailable.map((store, i) => {
                const sid = getStoreId(store);
                return (
                  <div
                    key={`avail-${i}-${store.storeName}`}
                    onMouseEnter={() => setHoveredStoreId(sid)}
                    onMouseLeave={() => setHoveredStoreId(null)}
                  >
                    <div className="sm:hidden">
                      <MobileStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                    </div>
                    <div className="hidden sm:block">
                      <StoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                    </div>
                  </div>
                );
              })}

              {/* Separator for unavailable primary */}
              {primaryUnavailable.length > 0 &&
                (featured.length > 0 || primaryAvailable.length > 0) &&
                stream.done && (
                  <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    No slots found
                  </p>
                )}

              {/* Primary unavailable results */}
              {stream.done &&
                primaryUnavailable.map((store, i) => {
                  const sid = getStoreId(store);
                  return (
                    <div
                      key={`unavail-${i}-${store.storeName}`}
                      onMouseEnter={() => setHoveredStoreId(sid)}
                      onMouseLeave={() => setHoveredStoreId(null)}
                    >
                      <div className="sm:hidden">
                        <MobileStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                      </div>
                      <div className="hidden sm:block">
                        <StoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                      </div>
                    </div>
                  );
                })}

              {/* Additional chain locations section */}
              {stream.done && (additionalAvailable.length > 0 || additionalUnavailable.length > 0) && (
                <>
                  <div className="pt-4 pb-2 border-t border-gray-100 mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      More locations from these opticians
                    </p>
                  </div>
                  {additionalAvailable.map((store, i) => {
                    const sid = getStoreId(store);
                    return (
                      <div
                        key={`add-avail-${i}-${store.storeName}`}
                        onMouseEnter={() => setHoveredStoreId(sid)}
                        onMouseLeave={() => setHoveredStoreId(null)}
                      >
                        <div className="sm:hidden">
                          <MobileStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                        <div className="hidden sm:block">
                          <StoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                      </div>
                    );
                  })}
                  {additionalUnavailable.map((store, i) => {
                    const sid = getStoreId(store);
                    return (
                      <div
                        key={`add-unavail-${i}-${store.storeName}`}
                        onMouseEnter={() => setHoveredStoreId(sid)}
                        onMouseLeave={() => setHoveredStoreId(null)}
                      >
                        <div className="sm:hidden">
                          <MobileStoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                        <div className="hidden sm:block">
                          <StoreCard store={store} highlighted={hoveredStoreId === sid} onBook={handleBookingClick} />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {/* Still loading indicator */}
              {stillLoading && results.length > 0 && (
                <div className="flex items-center justify-center py-4 gap-2 text-sm text-gray-400">
                  <svg
                    className="animate-spin h-4 w-4 text-[var(--color-primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Still searching &mdash; {stream.loadingProviders.length} more optician{stream.loadingProviders.length !== 1 ? "s" : ""} to check
                </div>
              )}

              {/* Provider errors */}
              {stream.errors.length > 0 && (
                <details className="mt-4 text-xs text-gray-400">
                  <summary className="cursor-pointer hover:text-gray-500">
                    {stream.errors.length} provider error
                    {stream.errors.length !== 1 ? "s" : ""}
                  </summary>
                  <ul className="mt-2 space-y-1 pl-4">
                    {stream.errors.map((e, i) => (
                      <li key={i}>
                        <span className="font-medium">
                          {displayProviderName(e.provider)}:
                        </span>{" "}
                        {e.message}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            {/* Sticky map + featured partner badge (desktop only) */}
            <div className="hidden lg:block lg:col-span-7">
              <div
                className="sticky"
                style={{
                  top: "calc(var(--header-height, 6.5rem) + 4.5rem)",
                }}
              >
              {/* Featured partner badge */}
              {(() => {
                const featured = results.find((r) => r.featured && r.tier === "platinum");
                if (!featured) return null;
                const name = displayProviderName(featured.provider);
                const logo = featured.logoUrl ?? BRAND_LOGOS[name] ?? BRAND_LOGOS[featured.provider];
                const rating = PROVIDER_RATINGS[name] ?? PROVIDER_RATINGS[featured.provider];
                return (
                  <div className="mb-3 rounded-xl bg-white border border-[var(--color-primary)]/15 px-4 py-3 flex items-center gap-3">
                    {logo && (
                      <img src={logo} alt={name} className="h-7 w-auto object-contain flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[var(--color-navy)]">{name}</span>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-primary)]">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                          Recommended
                        </span>
                      </div>
                      {rating && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-2.5 h-2.5 ${i < Math.floor(rating.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-500">{rating.rating} ({rating.count.toLocaleString()})</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              <div
                className="rounded-xl overflow-hidden shadow-sm border border-gray-100"
                style={{
                  height: `calc(100vh - var(--header-height, 6.5rem) - ${results.some((r) => r.featured && r.tier === "platinum") ? "10rem" : "6rem"})`,
                }}
              >
                {stream.center ? (
                  <StoreMap stores={allStoresForMap} center={stream.center} hoveredStoreId={hoveredStoreId} onHoverStore={setHoveredStoreId} />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-400">
                    Loading map...
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>

          {/* Bottom links section */}
          {stream.done && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/find"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group min-w-0"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-teal-50)] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[var(--color-primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                      Browse by location
                    </p>
                    <p className="text-xs text-gray-500">
                      Find opticians in your city or town
                    </p>
                  </div>
                </Link>
                <Link
                  href="/opticians"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group min-w-0"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-teal-50)] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[var(--color-primary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                      Browse by optician
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Compare Boots, ASDA, Vision Express and more
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* Initial loading state (before stream starts) */}
      {searching && !stream && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
            <svg
              className="animate-spin h-6 w-6 text-[var(--color-primary)]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p
            className="text-base font-semibold text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Finding opticians near you&hellip;
          </p>
          <p className="text-sm text-gray-400">
            Hang tight &mdash; we&apos;re about to save you hours of searching
          </p>
        </div>
      )}

      {departure && (
        <DepartureOverlay info={departure} onClose={() => setDeparture(null)} />
      )}
    </div>
  );
}
