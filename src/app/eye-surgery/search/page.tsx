"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SurgeryCallout } from "@/components/SurgeryCallout";
import { surgeryProviders } from "@/data/surgery-providers";
import type { SurgeryClinic } from "@/data/surgery-providers";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ClinicResult = SurgeryClinic & {
  providerName: string;
  providerSlug: string;
  distanceMiles: number;
};

type SearchResponse = {
  postcode: string;
  lat: number;
  lng: number;
  nearby: ClinicResult[];
  alsoAvailable: ClinicResult[];
  totalClinics: number;
};

type SearchError = {
  error: string;
};

// ---------------------------------------------------------------------------
// Provider lookup helpers
// ---------------------------------------------------------------------------

const providerMap = new Map(
  surgeryProviders.map((p) => [p.slug, p]),
);

function getProviderBrandColor(slug: string): string {
  return providerMap.get(slug)?.brandColor ?? "#0ea5a0";
}

function getProviderGoogleReview(slug: string) {
  return providerMap.get(slug)?.googleReview ?? null;
}

function isPreferredPartner(slug: string): boolean {
  return providerMap.get(slug)?.isPreferredPartner ?? false;
}

// ---------------------------------------------------------------------------
// Star rating component
// ---------------------------------------------------------------------------

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) {
            return (
              <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
          if (i === fullStars && hasHalf) {
            return (
              <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                <path fill={`url(#half-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          }
          return (
            <svg key={i} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
      <span className="text-sm font-semibold text-gray-700">{rating}</span>
      <span className="text-xs text-gray-500">({count.toLocaleString()} reviews)</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Clinic card component
// ---------------------------------------------------------------------------

function ClinicCard({ clinic, muted = false }: { clinic: ClinicResult; muted?: boolean }) {
  const brandColor = getProviderBrandColor(clinic.providerSlug);
  const review = getProviderGoogleReview(clinic.providerSlug);
  const preferred = isPreferredPartner(clinic.providerSlug);

  return (
    <div
      className={`relative rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow ${
        muted ? "border-gray-200 opacity-80" : "border-gray-200"
      }`}
    >
      {/* Preferred Partner badge */}
      {preferred && (
        <div className="absolute -top-2.5 right-4 z-10">
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 shadow-sm">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            Preferred Partner
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Provider name with brand color bar */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-1 h-10 rounded-full flex-shrink-0"
            style={{ backgroundColor: brandColor }}
          />
          <div className="flex-1 min-w-0">
            <p
              className="text-xs font-bold uppercase tracking-wide mb-0.5"
              style={{ color: brandColor }}
            >
              {clinic.providerName}
            </p>
            <h3
              className="text-base sm:text-lg font-bold text-[var(--color-navy)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {clinic.name}
            </h3>
          </div>
          {/* Distance badge */}
          <div className="flex-shrink-0 text-right">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {clinic.distanceMiles} mi
            </span>
          </div>
        </div>

        {/* Address */}
        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
          {clinic.address}
          {clinic.postcode && `, ${clinic.postcode}`}
        </p>

        {/* Phone */}
        {clinic.phone && (
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-medium text-gray-700">Tel:</span>{" "}
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="text-[var(--color-primary)] hover:underline"
            >
              {clinic.phone}
            </a>
          </p>
        )}

        {/* Google rating */}
        {review && (
          <div className="mb-4">
            <StarRating rating={review.rating} count={review.reviewCount} />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <Link
            href={`/eye-surgery/providers/${clinic.providerSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            View Provider
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function SurgerySearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const postcodeParam = searchParams.get("postcode") ?? "";

  const [inputValue, setInputValue] = useState(postcodeParam);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResponse | null>(null);

  // ---- Fetch results when postcode is present ----
  const fetchResults = useCallback(async (pc: string) => {
    if (!pc.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(
        `/api/surgery-search?postcode=${encodeURIComponent(pc.trim())}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setError((data as SearchError).error || "Something went wrong.");
        return;
      }

      setResults(data as SearchResponse);
    } catch {
      setError("Failed to search. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount if postcode is in URL
  useEffect(() => {
    if (postcodeParam) {
      setInputValue(postcodeParam);
      fetchResults(postcodeParam);
    }
  }, [postcodeParam, fetchResults]);

  // Set page title
  useEffect(() => {
    document.title = results
      ? `Eye Surgery Clinics near ${results.postcode} — eyetest.co.uk`
      : "Find Eye Surgery Clinics — eyetest.co.uk";
  }, [results]);

  // ---- Form submit handler ----
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const pc = inputValue.trim();
    if (!pc) return;

    // Update URL without full navigation
    router.push(`/eye-surgery/search?postcode=${encodeURIComponent(pc)}`, {
      scroll: false,
    });
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Search form section */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
            <h1
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-2 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Find Eye Surgery Clinics
            </h1>
            <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
              Search {surgeryProviders.reduce((s, p) => s + p.storeCount, 0)}+ clinics across {surgeryProviders.length} providers to find eye surgery near you.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
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
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your postcode..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-colors"
                  aria-label="Postcode"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base transition-colors disabled:opacity-60"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
        </section>

        {/* Results section */}
        <section className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Searching clinics near you...</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <svg
                className="w-10 h-10 text-red-400 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && !loading && (
            <>
              {/* Results summary */}
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Showing clinics near{" "}
                  <span className="font-semibold text-[var(--color-navy)]">
                    {results.postcode}
                  </span>
                  {" "}from {results.totalClinics} clinics nationwide
                </p>
              </div>

              {/* Nearby clinics */}
              {results.nearby.length > 0 && (
                <div className="mb-10">
                  <h2
                    className="text-lg sm:text-xl font-bold text-[var(--color-navy)] mb-4 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <svg
                      className="w-5 h-5 text-[var(--color-success)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
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
                    Clinics Near You
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      ({results.nearby.length} within 30 miles)
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {results.nearby.map((clinic, i) => (
                      <ClinicCard key={`nearby-${i}`} clinic={clinic} />
                    ))}
                  </div>
                </div>
              )}

              {/* No nearby results */}
              {results.nearby.length === 0 && (
                <div className="mb-10 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                  <p className="text-amber-700 font-medium text-sm mb-1">
                    No clinics found within 30 miles of {results.postcode}
                  </p>
                  <p className="text-amber-600 text-xs">
                    The closest clinics are shown below under &ldquo;Also Available&rdquo;.
                  </p>
                </div>
              )}

              {/* Also available */}
              {results.alsoAvailable.length > 0 && (
                <div className="mb-10">
                  <h2
                    className="text-lg sm:text-xl font-bold text-[var(--color-navy)] mb-4 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Also Available
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      (further afield)
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {results.alsoAvailable.map((clinic, i) => (
                      <ClinicCard key={`also-${i}`} clinic={clinic} muted />
                    ))}
                  </div>
                </div>
              )}

              {/* No results at all */}
              {results.nearby.length === 0 && results.alsoAvailable.length === 0 && (
                <div className="bg-gray-100 rounded-2xl p-8 text-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                  <p className="text-gray-600 font-medium">
                    No eye surgery clinics found. Please try a different postcode.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Empty state (no search yet) */}
          {!loading && !error && !results && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <h2
                className="text-xl font-bold text-[var(--color-navy)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Enter your postcode to find clinics
              </h2>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                We&rsquo;ll show you the nearest eye surgery clinics from leading providers including
                Newmedica, SpaMedica, Optical Express, and more.
              </p>
            </div>
          )}
        </section>

        {/* Surgery callout */}
        <SurgeryCallout />
      </main>
      <Footer />
    </>
  );
}
