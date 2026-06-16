import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  opticians,
  getOpticianBySlug,
  getAllSlugs,
  getAvailableOpticians,
  type OpticianBrand,
} from "@/data/opticians";
import {
  getLocationBySlug,
  regions,
  type Region,
} from "@/data/locations";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const optician = getOpticianBySlug(slug);

  if (!optician) {
    return { title: "Optician Not Found | eyetest.co.uk" };
  }

  const title = `${optician.name} — Eye Tests, Prices, Services & Book Online | eyetest.co.uk`;
  const description = `${optician.name}: ${optician.storeCount} UK stores. ${optician.priceRange}. Full service breakdown, pros & cons, NHS availability, booking guide, FAQs, and store locations. Compare and book your eye test online.`;

  return {
    title,
    description,
    keywords: [
      optician.name,
      `${optician.shortName} eye test`,
      `${optician.shortName} opticians`,
      `${optician.shortName} eye test price`,
      `${optician.shortName} NHS eye test`,
      `book ${optician.shortName} eye test`,
      `${optician.shortName} eye test cost`,
      `${optician.shortName} services`,
      `${optician.shortName} reviews`,
      `${optician.shortName} near me`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.eyetest.co.uk/opticians/${optician.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://www.eyetest.co.uk/opticians/${optician.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function OpticianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const optician = getOpticianBySlug(slug);

  if (!optician) {
    notFound();
  }

  // Related opticians: other available brands (exclude current)
  const related = getAvailableOpticians()
    .filter((o) => o.slug !== optician.slug)
    .slice(0, 3);

  // Group store locations by region
  const locationsByRegion: Record<string, { slug: string; name: string }[]> = {};
  if (optician.storeLocations && optician.storeLocations.length > 0) {
    for (const locSlug of optician.storeLocations) {
      const loc = getLocationBySlug(locSlug);
      if (loc) {
        if (!locationsByRegion[loc.region]) {
          locationsByRegion[loc.region] = [];
        }
        locationsByRegion[loc.region].push({ slug: loc.slug, name: loc.name });
      }
    }
  }

  // Order regions by the canonical order from locations data
  const orderedRegions = regions.filter((r) => locationsByRegion[r]);

  // Build FAQ items from the faqs field
  const faqItems = optician.faqs ?? [];

  // ---------------------------------------------------------------------------
  // JSON-LD schemas
  // ---------------------------------------------------------------------------

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: optician.name,
    url: optician.website,
    description: optician.description,
    foundingDate: optician.founded,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      name: "UK stores",
      value: optician.storeCount,
    },
    sameAs: [optician.website],
    parentOrganization: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.eyetest.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Opticians",
        item: "https://www.eyetest.co.uk/opticians",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: optician.name,
        item: `https://www.eyetest.co.uk/opticians/${optician.slug}`,
      },
    ],
  };

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((faq: { q: string; a: string }) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd),
            }}
          />
        )}

        {/* ── 1. Brand Hero ────────────────────────────────────────────── */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Opticians", href: "/opticians" },
            { label: optician.name },
          ]}
          compact
        >
          {/* Brand accent pill */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: optician.brandColor }}
            />
            <span className="text-sm font-medium text-white/60">
              Est. {optician.founded}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {optician.name}
          </h1>

          <div className="flex items-center justify-center gap-6 text-white/70 text-sm sm:text-base flex-wrap">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5"
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
              {optician.storeCount.toLocaleString()} UK stores
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              {optician.priceRange}
            </span>
            {optician.nhsAvailable && (
              <span className="flex items-center gap-1.5 text-[var(--color-nhs-blue)]">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                NHS Available
              </span>
            )}
          </div>
        </PageHero>

        {/* ── 2. About + 3. Quick Facts ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* About — spans 2 cols */}
            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6">
                About {optician.name}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>{optician.description}</p>
                {optician.history && (
                  <>
                    {optician.history
                      .split("\n\n")
                      .filter((p: string) => p.trim())
                      .map((paragraph: string, i: number) => (
                        <p key={i}>{paragraph.trim()}</p>
                      ))}
                  </>
                )}
              </div>
            </div>

            {/* Quick facts card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-fit">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
                Quick Facts
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Founded</dt>
                  <dd className="font-medium text-[var(--color-navy)]">
                    {optician.founded}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">UK Stores</dt>
                  <dd className="font-medium text-[var(--color-navy)]">
                    {optician.storeCount.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Price Range</dt>
                  <dd className="font-medium text-[var(--color-navy)]">
                    {optician.priceRange}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">NHS Eye Tests</dt>
                  <dd className="font-medium text-[var(--color-navy)]">
                    {optician.nhsAvailable ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Services Offered</dt>
                  <dd className="font-medium text-[var(--color-navy)]">
                    {optician.services.length}
                  </dd>
                </div>
                {optician.storeLocations &&
                  optician.storeLocations.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Locations Listed</dt>
                      <dd className="font-medium text-[var(--color-navy)]">
                        {optician.storeLocations.length}
                      </dd>
                    </div>
                  )}
                {optician.detailedServices &&
                  optician.detailedServices.length > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Avg. Eye Test</dt>
                      <dd className="font-medium text-[var(--color-navy)]">
                        {
                          optician.detailedServices.find(
                            (s: { name: string }) =>
                              s.name.toLowerCase().includes("eye test") &&
                              !s.name.toLowerCase().includes("nhs")
                          )?.duration ?? "30 min"
                        }
                      </dd>
                    </div>
                  )}
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)] mb-2">
                    Book an eye test
                  </h4>
                  <form action="/search" method="GET">
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Enter postcode"
                      aria-label="Enter your postcode"
                      className="w-full px-3 py-2 text-sm text-[var(--color-navy)] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] placeholder:text-gray-400 mb-2"
                    />
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Search
                    </button>
                  </form>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ── 4. Store Locations by Region ───────────────────────────────── */}
        {orderedRegions.length > 0 && (
          <section className="bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
              <div className="text-center mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
                  {optician.shortName} Eye Test Locations Across the UK
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Find your nearest {optician.shortName} and book an eye test.
                  We list {optician.shortName} locations in{" "}
                  {orderedRegions.length} regions across the United Kingdom.
                </p>
              </div>

              <div className="space-y-10">
                {orderedRegions.map((region) => (
                  <div key={region}>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] mb-4 flex items-center gap-2">
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
                      {region}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {locationsByRegion[region].map((loc) => (
                        <Link
                          key={loc.slug}
                          href={`/opticians/${optician.slug}/${loc.slug}`}
                          className="group flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all"
                        >
                          <div
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${optician.brandColor}15`,
                            }}
                          >
                            <svg
                              className="w-4 h-4"
                              style={{ color: optician.brandColor }}
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
                          <span className="text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                            {optician.shortName} in {loc.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 5. Detailed Services Table ─────────────────────────────────── */}
        {optician.detailedServices &&
          optician.detailedServices.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
              <div className="text-center mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
                  {optician.shortName} Services &amp; Pricing
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  A full breakdown of eye care services available at{" "}
                  {optician.name}, including prices, duration, and NHS
                  coverage information.
                </p>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-navy)]">
                        Service
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-navy)]">
                        Description
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-navy)]">
                        Price
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-navy)]">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-navy)] text-center">
                        NHS Covered
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {optician.detailedServices.map(
                      (
                        service: {
                          name: string;
                          description: string;
                          price: string;
                          duration: string;
                          nhsCovered: boolean;
                        },
                        i: number
                      ) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-[var(--color-navy)]">
                              {service.name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-500">
                              {service.description}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-[var(--color-navy)]">
                              {service.price}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-500">
                              {service.duration}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {service.nhsCovered ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-success)]/10">
                                <svg
                                  className="w-4 h-4 text-[var(--color-success)]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                                <svg
                                  className="w-4 h-4 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-4">
                {optician.detailedServices.map(
                  (
                    service: {
                      name: string;
                      description: string;
                      price: string;
                      duration: string;
                      nhsCovered: boolean;
                    },
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-gray-200 p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-sm font-semibold text-[var(--color-navy)]">
                          {service.name}
                        </h4>
                        {service.nhsCovered && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-nhs-blue)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-nhs-blue)]">
                            NHS
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-semibold text-[var(--color-navy)]">
                          {service.price}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

        {/* ── Services grid (fallback when no detailedServices) ───────── */}
        {(!optician.detailedServices ||
          optician.detailedServices.length === 0) && (
          <section className="bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-8 text-center">
                Services Offered
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {optician.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${optician.brandColor}15`,
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{ color: optician.brandColor }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-navy)]">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 6. Pros and Cons ───────────────────────────────────────────── */}
        {optician.prosAndCons && (
          <section
            className={
              optician.detailedServices &&
              optician.detailedServices.length > 0
                ? "bg-gray-50 border-y border-gray-200"
                : ""
            }
          >
            <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
              <div className="text-center mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
                  {optician.shortName} Pros &amp; Cons
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  An honest look at the advantages and disadvantages of
                  choosing {optician.name} for your eye care.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {/* Pros */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-[var(--color-success)]/5 px-6 py-4 border-b border-[var(--color-success)]/10">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-[var(--color-success)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Advantages
                    </h3>
                  </div>
                  <ul className="p-6 space-y-3">
                    {optician.prosAndCons.pros.map(
                      (pro: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <svg
                            className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-600 leading-relaxed">
                            {pro}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Considerations
                    </h3>
                  </div>
                  <ul className="p-6 space-y-3">
                    {optician.prosAndCons.cons.map(
                      (con: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <svg
                            className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-600 leading-relaxed">
                            {con}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 7. How to Book ─────────────────────────────────────────────── */}
        {optician.bookingProcess &&
          optician.bookingProcess.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
              <div className="text-center mb-10">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
                  How to Book an Eye Test at {optician.shortName}
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Follow these simple steps to book your next eye test with{" "}
                  {optician.name}.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Vertical line connecting steps */}
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200" />

                  <div className="space-y-6">
                    {optician.bookingProcess.map(
                      (step: string, i: number) => (
                        <div key={i} className="relative flex gap-5">
                          <div
                            className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                            style={{
                              backgroundColor: optician.brandColor,
                            }}
                          >
                            {i + 1}
                          </div>
                          <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1 shadow-sm">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {step}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* ── 8. Highlights (Why Choose) ─────────────────────────────────── */}
        <section
          className={
            optician.bookingProcess && optician.bookingProcess.length > 0
              ? "bg-gray-50 border-y border-gray-200"
              : ""
          }
        >
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
              Why Choose {optician.shortName}?
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {optician.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-white border border-gray-200"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: optician.brandColor }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-2">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. NHS Availability ─────────────────────────────────────────── */}
        {optician.nhsAvailable && (
          <section className="bg-[var(--color-nhs-blue)]/5 border-y border-[var(--color-nhs-blue)]/10">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--color-nhs-blue)]/10 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-[var(--color-nhs-blue)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)] mb-2">
                      NHS Eye Tests at {optician.shortName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {optician.name} offers free NHS-funded eye tests for
                      eligible patients. You may qualify if you&apos;re under
                      16, over 60, on certain benefits, or have specific medical
                      conditions. Check eligibility and book through
                      eyetest.co.uk.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[var(--color-nhs-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Under 16 or in full-time education (under 19)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[var(--color-nhs-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Aged 60 or over
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[var(--color-nhs-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Diagnosed with diabetes or glaucoma
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[var(--color-nhs-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Receiving certain benefits (e.g. Income Support)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[var(--color-nhs-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        At risk of glaucoma (close relative diagnosed)
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 text-[var(--color-nhs-blue)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Registered blind or partially sighted
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 10. Brand FAQs ─────────────────────────────────────────────── */}
        {faqItems.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center mb-10">
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
                Frequently Asked Questions About {optician.shortName}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Common questions about eye tests, services, and booking at{" "}
                {optician.name}.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq: { q: string; a: string }, i: number) => (
                <details
                  key={i}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-semibold text-[var(--color-navy)] text-left">
                      {faq.q}
                    </h3>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── 11. Compare with Other Brands ──────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-8 text-center">
                Compare {optician.shortName} with Other Opticians
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/opticians/${rel.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: rel.brandColor }}
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                          {rel.name}
                        </h3>
                        {rel.nhsAvailable && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-nhs-blue)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-nhs-blue)]">
                            NHS
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {rel.storeCount.toLocaleString()} stores &middot;{" "}
                        {rel.priceRange}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-3 transition-all">
                        Compare
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 12. CTA — available vs coming soon ─────────────────────────── */}
        <section className="relative overflow-hidden">
          {optician.available ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[#0b8a86]" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl" />
              <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-4">
                  Find a {optician.shortName} Near You
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Enter your postcode to check availability and book an eye test
                  at your nearest {optician.shortName} store.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[var(--color-primary)] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Find a {optician.shortName} Opticians Near You
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
              <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-300/30 mb-6">
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                  {optician.shortName} &mdash; Coming Soon
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto mb-8">
                  We&apos;re working on adding {optician.name} to
                  eyetest.co.uk. Once available, you&apos;ll be able to compare
                  prices and book appointments at their{" "}
                  {optician.storeCount.toLocaleString()} UK locations directly
                  through our platform.
                </p>
                <Link
                  href="/opticians"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Browse Available Opticians
                </Link>
              </div>
            </>
          )}
        </section>
        {/* ── Subtle external website reference ─────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-400">
            Visit {optician.name} directly:{" "}
            <a
              href={optician.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 underline"
            >
              {optician.website.replace(/^https?:\/\//, "")}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
