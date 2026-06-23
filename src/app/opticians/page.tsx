import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  getAvailableOpticians,
  getUnavailableOpticians,
} from "@/data/opticians";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Compare UK Opticians — Find the Best Eye Test Near You | eyetest.co.uk",
  description:
    "Compare leading UK optician chains side by side. See services, prices, NHS availability, and store locations for Boots, ASDA, Leightons, Scrivens, and more. Book your eye test online.",
  keywords: [
    "UK opticians",
    "compare opticians",
    "best opticians UK",
    "eye test near me",
    "NHS eye test",
    "Boots Opticians",
    "ASDA Opticians",
    "Leightons Opticians",
    "Scrivens Opticians",
    "Bayfields Opticians",
  ],
  openGraph: {
    title: "Compare UK Opticians — Find the Best Eye Test Near You",
    description:
      "Compare leading UK optician chains side by side. See services, prices, NHS availability, and book your eye test online.",
    url: "https://www.eyetest.co.uk/opticians",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/opticians",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function OpticiansPage() {
  const available = getAvailableOpticians();
  const unavailable = getUnavailableOpticians();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Compare UK Opticians — Find the Best Eye Test Near You",
    description:
      "Compare leading UK optician chains side by side. See services, prices, NHS availability, and book your eye test online.",
    url: "https://www.eyetest.co.uk/opticians",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: available.map((o, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Organization",
          name: o.name,
          url: `https://www.eyetest.co.uk/opticians/${o.slug}`,
          numberOfEmployees: {
            "@type": "QuantitativeValue",
            name: "UK stores",
            value: o.storeCount,
          },
          ...(o.rating && o.reviewCount
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: o.rating,
                  reviewCount: o.reviewCount,
                  bestRating: 5,
                  worstRating: 1,
                },
              }
            : {}),
        },
      })),
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
    ],
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Opticians" }]}>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Compare UK Opticians
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Find the best eye test near you. Compare services, prices, and
            NHS availability across leading optician chains, then book
            online in seconds.
          </p>
        </PageHero>

        {/* ── Available opticians grid ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
              Featured Opticians
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book appointments with these opticians directly through
              eyetest.co.uk. Compare prices and availability in your area.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((optician) => (
              <Link
                key={optician.slug}
                href={`/opticians/${optician.slug}`}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Brand accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: optician.brandColor }}
                />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                        {optician.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Est. {optician.founded}
                      </p>
                    </div>
                    {optician.nhsAvailable && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-nhs-blue)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-nhs-blue)]">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        NHS
                      </span>
                    )}
                  </div>

                  {/* Rating row */}
                  {optician.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const fill = optician.rating! >= star ? 1 : optician.rating! >= star - 0.5 ? 0.5 : 0;
                          return (
                            <svg key={star} className="w-4 h-4" viewBox="0 0 20 20">
                              <defs>
                                <linearGradient id={`star-${optician.slug}-${star}`}>
                                  <stop offset={`${fill * 100}%`} stopColor="#f59e0b" />
                                  <stop offset={`${fill * 100}%`} stopColor="#d1d5db" />
                                </linearGradient>
                              </defs>
                              <path
                                fill={`url(#star-${optician.slug}-${star})`}
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          );
                        })}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{optician.rating}</span>
                      {optician.reviewCount && (
                        <span className="text-xs text-gray-400">({optician.reviewCount.toLocaleString()} reviews)</span>
                      )}
                    </div>
                  )}

                  {/* Stats row */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {optician.storeCount.toLocaleString()} stores
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {optician.priceRange}
                    </span>
                  </div>

                  {/* Services preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {optician.services.slice(0, 4).map((service) => (
                      <span
                        key={service}
                        className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                      >
                        {service}
                      </span>
                    ))}
                    {optician.services.length > 4 && (
                      <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                        +{optician.services.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Top highlight */}
                  <p className="text-sm text-gray-500 mb-5 line-clamp-2">
                    {optician.highlights[0]}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-3 transition-all">
                    Find nearby
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Coming soon ─────────────────────────────────────────────── */}
        <section className="bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We&apos;re working on adding these major optician chains to
                eyetest.co.uk. Check back soon for availability.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {unavailable.map((optician) => (
                <Link
                  key={optician.slug}
                  href={`/opticians/${optician.slug}`}
                  className="relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
                >
                  {/* Greyed accent bar */}
                  <div className="h-1.5 w-full bg-gray-300" />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-gray-400">
                          {optician.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {optician.storeCount.toLocaleString()} stores across the UK
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-400">
                        Coming soon
                      </span>
                    </div>

                    <p className="text-sm text-gray-400">
                      No availability &mdash; check back soon
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison features ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3">
              Why Compare on eyetest.co.uk?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make finding the right optician simple, fast, and free.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Side-by-Side Pricing",
                description:
                  "Compare NHS and private eye test prices across multiple opticians in one place. No hidden fees.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Find Stores Near You",
                description:
                  "Search by postcode to see which opticians have locations nearby, with real-time availability.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "NHS Availability",
                description:
                  "Instantly see which opticians offer free NHS eye tests and check if you qualify.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Book Online Instantly",
                description:
                  "Choose your preferred date and time, and book your eye test appointment in seconds.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: "Trusted Reviews",
                description:
                  "Read honest details about each optician&apos;s services, technology, and patient experience.",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Same-Day Appointments",
                description:
                  "Filter for same-day or next-day availability when you need an urgent eye test.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[#0b8a86]" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl" />

          <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Find Your Optician?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Enter your postcode to compare prices and availability from
              opticians near you.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[var(--color-primary)] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search by Postcode
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
