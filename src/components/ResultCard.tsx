"use client";

import Link from "next/link";

export type Optician = {
  id: string;
  name: string;
  brand: string;
  distance: number;
  rating: number;
  reviewCount: number;
  services: string[];
  available: boolean;
  nextSlot: string | null;
  phone: string;
  address: string;
  brandColor: string;
};

export type ComingSoonOptician = {
  id: string;
  name: string;
  brand: string;
  brandColor: string;
};

const starDisplay = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
};

export function ResultCard({ optician }: { optician: Optician }) {
  const stars = starDisplay(optician.rating);

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderLeftWidth: "4px", borderLeftColor: optician.brandColor }}
    >
      <div className="p-4 sm:p-5">
        {/* Top row: brand badge + distance */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5"
              style={{
                backgroundColor: optician.brandColor + "18",
                color: optician.brandColor,
              }}
            >
              {optician.brand}
            </span>
            <h3
              className="text-base sm:text-lg font-semibold text-[var(--color-navy)] leading-snug truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {optician.name}
            </h3>
          </div>
          <span className="flex-shrink-0 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md whitespace-nowrap">
            {optician.distance} miles
          </span>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-500 mb-2.5 truncate">
          {optician.address}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center" aria-label={`${optician.rating} out of 5 stars`}>
            {Array.from({ length: stars.full }).map((_, i) => (
              <svg
                key={`full-${i}`}
                className="w-4 h-4 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {stars.half && (
              <svg
                className="w-4 h-4 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id={`half-${optician.id}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${optician.id})`}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            )}
            {Array.from({ length: stars.empty }).map((_, i) => (
              <svg
                key={`empty-${i}`}
                className="w-4 h-4 text-gray-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-[var(--color-navy)]">
            {optician.rating}
          </span>
          <span className="text-xs text-gray-400">
            ({optician.reviewCount} reviews)
          </span>
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {optician.services.map((service) => (
            <span
              key={service}
              className={`text-xs px-2 py-0.5 rounded-full ${
                service === "NHS"
                  ? "bg-blue-50 text-[var(--color-nhs-blue)] font-medium"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {service}
            </span>
          ))}
        </div>

        {/* Availability + Next slot */}
        <div className="flex items-center gap-3 mb-4">
          {optician.available ? (
            <>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-success)] bg-green-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
                Available
              </span>
              {optician.nextSlot && (
                <span className="text-xs text-gray-600">
                  Next:{" "}
                  <span className="font-medium text-[var(--color-navy)]">
                    {optician.nextSlot}
                  </span>
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              No slots
            </span>
          )}
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-3">
          <Link
            href={`/book/${optician.id}`}
            className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg transition-colors ${
              optician.available
                ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                : "bg-gray-100 text-gray-400 pointer-events-none"
            }`}
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Book Now
          </Link>
          <a
            href={`tel:${optician.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-colors"
            aria-label={`Call ${optician.name}`}
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden sm:inline">{optician.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function ComingSoonCard({ optician }: { optician: ComingSoonOptician }) {
  return (
    <div
      className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden opacity-60"
      style={{ borderLeftWidth: "4px", borderLeftColor: optician.brandColor }}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span
              className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5"
              style={{
                backgroundColor: optician.brandColor + "18",
                color: optician.brandColor,
              }}
            >
              {optician.brand}
            </span>
            <h3
              className="text-base font-semibold text-[var(--color-navy)] leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {optician.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Coming soon — availability not yet connected
          </span>
        </div>
      </div>
    </div>
  );
}
