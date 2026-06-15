"use client";

import { useState, useMemo, useCallback } from "react";
import { ResultCard, ComingSoonCard } from "./ResultCard";
import { ResultsMap } from "./ResultsMap";
import type { Optician, ComingSoonOptician } from "./ResultCard";

// ---------------------------------------------------------------------------
// Mock data — realistic opticians near KT1 1BL (Kingston upon Thames)
// ---------------------------------------------------------------------------

const mockOpticians: Optician[] = [
  {
    id: "boots-kingston",
    name: "Boots Opticians — Kingston upon Thames",
    brand: "Boots",
    distance: 0.3,
    rating: 4.3,
    reviewCount: 214,
    services: ["NHS", "Private", "Contact Lenses", "Children's Eye Tests"],
    available: true,
    nextSlot: "Today at 14:30",
    phone: "020 8546 1122",
    address: "23-25 Clarence Street, Kingston upon Thames KT1 1RB",
    brandColor: "#0064d2",
    lat: 51.4103,
    lng: -0.3065,
  },
  {
    id: "rawlings-kingston",
    name: "Rawlings Opticians — Kingston",
    brand: "Rawlings",
    distance: 0.5,
    rating: 4.7,
    reviewCount: 89,
    services: ["NHS", "Private", "Contact Lenses", "Home Visits"],
    available: true,
    nextSlot: "Tomorrow at 09:15",
    phone: "020 8546 3082",
    address: "15 Castle Street, Kingston upon Thames KT1 1ST",
    brandColor: "#8b2252",
    lat: 51.4120,
    lng: -0.3040,
  },
  {
    id: "kingston-vision-care",
    name: "Kingston Vision Care",
    brand: "Independent",
    distance: 0.6,
    rating: 4.9,
    reviewCount: 63,
    services: ["NHS", "Private", "Children's Eye Tests", "Emergency Eye Care"],
    available: true,
    nextSlot: "Today at 16:00",
    phone: "020 8549 0404",
    address: "8 Fife Road, Kingston upon Thames KT1 1SZ",
    brandColor: "#0ea5a0",
    lat: 51.4112,
    lng: -0.3020,
  },
  {
    id: "asda-kingston",
    name: "ASDA Opticians — Kingston Superstore",
    brand: "ASDA",
    distance: 1.2,
    rating: 4.0,
    reviewCount: 156,
    services: ["NHS", "Private", "Contact Lenses"],
    available: true,
    nextSlot: "Today at 17:45",
    phone: "020 8974 5522",
    address: "ASDA Kingston, London Road, Kingston upon Thames KT2 6PY",
    brandColor: "#78b530",
    lat: 51.4180,
    lng: -0.2920,
  },
  {
    id: "leightons-kingston",
    name: "Leightons Opticians & Hearing Care — Kingston",
    brand: "Leightons",
    distance: 0.4,
    rating: 4.6,
    reviewCount: 97,
    services: ["NHS", "Private", "Contact Lenses", "Children's Eye Tests", "Hearing Tests"],
    available: true,
    nextSlot: "Tomorrow at 10:30",
    phone: "020 8546 3116",
    address: "34 Market Place, Kingston upon Thames KT1 1JH",
    brandColor: "#1e3a5f",
    lat: 51.4095,
    lng: -0.3075,
  },
  {
    id: "boots-surbiton",
    name: "Boots Opticians — Surbiton",
    brand: "Boots",
    distance: 1.8,
    rating: 4.1,
    reviewCount: 142,
    services: ["NHS", "Private", "Contact Lenses"],
    available: true,
    nextSlot: "Wed 18 Jun at 11:00",
    phone: "020 8399 2233",
    address: "45 Victoria Road, Surbiton KT6 4JL",
    brandColor: "#0064d2",
    lat: 51.3940,
    lng: -0.3020,
  },
  {
    id: "thames-eye-centre",
    name: "Thames Eye Centre",
    brand: "Independent",
    distance: 0.8,
    rating: 4.8,
    reviewCount: 41,
    services: ["Private", "Contact Lenses", "Children's Eye Tests", "DVLA Screening"],
    available: true,
    nextSlot: "Today at 15:15",
    phone: "020 8541 1730",
    address: "12 Thames Street, Kingston upon Thames KT1 1PE",
    brandColor: "#0ea5a0",
    lat: 51.4088,
    lng: -0.3100,
  },
  {
    id: "scrivens-new-malden",
    name: "Scrivens Opticians & Hearing Care — New Malden",
    brand: "Scrivens",
    distance: 2.4,
    rating: 4.2,
    reviewCount: 78,
    services: ["NHS", "Private", "Hearing Tests", "Home Visits"],
    available: true,
    nextSlot: "Thu 19 Jun at 09:00",
    phone: "020 8942 3366",
    address: "128 High Street, New Malden KT3 4EU",
    brandColor: "#c62828",
    lat: 51.4030,
    lng: -0.2580,
  },
  {
    id: "bayfields-richmond",
    name: "Bayfields Opticians — Richmond",
    brand: "Bayfields",
    distance: 3.7,
    rating: 4.4,
    reviewCount: 112,
    services: ["NHS", "Private", "Contact Lenses", "Children's Eye Tests"],
    available: false,
    nextSlot: null,
    phone: "020 8940 5544",
    address: "22 The Quadrant, Richmond TW9 1BP",
    brandColor: "#4a148c",
    lat: 51.4613,
    lng: -0.3037,
  },
  {
    id: "duncan-todd-twickenham",
    name: "Duncan & Todd Opticians — Twickenham",
    brand: "Duncan & Todd",
    distance: 4.2,
    rating: 4.5,
    reviewCount: 66,
    services: ["NHS", "Private", "Contact Lenses"],
    available: true,
    nextSlot: "Fri 20 Jun at 14:00",
    phone: "020 8892 7788",
    address: "9 King Street, Twickenham TW1 3SD",
    brandColor: "#00695c",
    lat: 51.4491,
    lng: -0.3283,
  },
  {
    id: "boots-richmond",
    name: "Boots Opticians — Richmond",
    brand: "Boots",
    distance: 3.9,
    rating: 4.2,
    reviewCount: 189,
    services: ["NHS", "Private", "Contact Lenses", "Children's Eye Tests"],
    available: true,
    nextSlot: "Tomorrow at 13:45",
    phone: "020 8940 0011",
    address: "6-8 George Street, Richmond TW9 1JY",
    brandColor: "#0064d2",
    lat: 51.4610,
    lng: -0.3050,
  },
  {
    id: "surbiton-eye-care",
    name: "Surbiton Eye Care",
    brand: "Independent",
    distance: 2.0,
    rating: 4.6,
    reviewCount: 34,
    services: ["NHS", "Private", "Home Visits", "Children's Eye Tests"],
    available: false,
    nextSlot: null,
    phone: "020 8390 5511",
    address: "71 Brighton Road, Surbiton KT6 5LX",
    brandColor: "#0ea5a0",
    lat: 51.3885,
    lng: -0.2980,
  },
  {
    id: "leightons-wimbledon",
    name: "Leightons Opticians — Wimbledon",
    brand: "Leightons",
    distance: 5.1,
    rating: 4.5,
    reviewCount: 131,
    services: ["NHS", "Private", "Contact Lenses", "Hearing Tests"],
    available: true,
    nextSlot: "Wed 18 Jun at 15:30",
    phone: "020 8944 2244",
    address: "60 High Street, Wimbledon Village SW19 5EE",
    brandColor: "#1e3a5f",
    lat: 51.4340,
    lng: -0.2130,
  },
  {
    id: "rawlings-esher",
    name: "Rawlings Opticians — Esher",
    brand: "Rawlings",
    distance: 6.3,
    rating: 4.4,
    reviewCount: 55,
    services: ["NHS", "Private", "Contact Lenses", "Children's Eye Tests"],
    available: true,
    nextSlot: "Thu 19 Jun at 11:30",
    phone: "01372 462288",
    address: "82 High Street, Esher KT10 9QS",
    brandColor: "#8b2252",
    lat: 51.3695,
    lng: -0.3650,
  },
  {
    id: "asda-roehampton",
    name: "ASDA Opticians — Roehampton Vale",
    brand: "ASDA",
    distance: 4.8,
    rating: 3.8,
    reviewCount: 92,
    services: ["NHS", "Private"],
    available: false,
    nextSlot: null,
    phone: "020 8780 1199",
    address: "ASDA Roehampton, Roehampton Vale SW15 3DX",
    brandColor: "#78b530",
    lat: 51.4395,
    lng: -0.2480,
  },
];

const comingSoonOpticians: ComingSoonOptician[] = [
  {
    id: "specsavers-kingston",
    name: "Specsavers — Kingston upon Thames",
    brand: "Specsavers",
    brandColor: "#1b5e20",
  },
  {
    id: "vision-express-kingston",
    name: "Vision Express — Kingston upon Thames",
    brand: "Vision Express",
    brandColor: "#e65100",
  },
];

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

type FilterKey = "all" | "available" | "nhs" | "distance";

const filterLabels: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "available", label: "Available Now" },
  { key: "nhs", label: "NHS" },
  { key: "distance", label: "By Distance" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SearchResults({ postcode }: { postcode: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [showMobileMap, setShowMobileMap] = useState(false);

  const filtered = useMemo(() => {
    let results = [...mockOpticians];

    switch (activeFilter) {
      case "available":
        results = results.filter((o) => o.available);
        break;
      case "nhs":
        results = results.filter((o) => o.services.includes("NHS"));
        break;
      case "distance":
        // Already sorted by distance in mock data, but enforce
        results.sort((a, b) => a.distance - b.distance);
        break;
      default:
        break;
    }

    return results;
  }, [activeFilter]);

  const availableCount = mockOpticians.filter((o) => o.available).length;

  const handleSelectOptician = useCallback((id: string) => {
    const el = document.getElementById(`optician-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-[var(--color-primary)]");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[var(--color-primary)]");
      }, 2000);
    }
  }, []);

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
    <div className="max-w-[1400px] mx-auto px-4 py-5 sm:py-6">
      {/* Results summary */}
      <div className="mb-4">
        <h1
          className="text-lg sm:text-xl font-bold text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {mockOpticians.length} opticians near{" "}
          <span className="text-[var(--color-primary)]">{postcode}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {availableCount} with available appointments
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filterLabels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`flex-shrink-0 text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer ${
              activeFilter === key
                ? "bg-[var(--color-primary)] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Map toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowMobileMap((v) => !v)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          {showMobileMap ? "Hide map" : "Show map"}
        </button>
        {showMobileMap && (
          <div className="mt-3 rounded-xl overflow-hidden shadow-sm border border-gray-100" style={{ height: "280px" }}>
            <ResultsMap opticians={filtered} onSelectOptician={handleSelectOptician} />
          </div>
        )}
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-500 text-sm">
            No opticians match the current filter. Try a different option.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((optician) => (
            <div key={optician.id} id={`optician-${optician.id}`} className="transition-all duration-300 rounded-xl">
              <ResultCard optician={optician} />
            </div>
          ))}
        </div>
      )}

      {/* Other opticians section */}
      <div className="pt-6">
        <h2
          className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3"
        >
          Other opticians in your area
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {comingSoonOpticians.map((optician) => (
            <ComingSoonCard key={optician.id} optician={optician} />
          ))}
        </div>
      </div>
    </div>
  );
}
