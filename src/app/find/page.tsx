import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import {
  searchQueries,
  getQueriesByCategory,
  categoryLabels,
  categoryDescriptions,
  type SearchQuery,
} from "@/data/search-queries";

// ---------------------------------------------------------------------------
// Category visual config
// ---------------------------------------------------------------------------

const categoryConfig: Record<
  SearchQuery["category"],
  { bg: string; text: string; icon: string }
> = {
  cost: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  nhs: {
    bg: "bg-[var(--color-nhs-blue)]/10",
    text: "text-[var(--color-nhs-blue)]",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
  availability: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  },
  brand: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    icon: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V6.999",
  },
  specialist: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  general: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    icon: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  },
  concern: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
};

// ---------------------------------------------------------------------------
// Popular queries (hand-picked for above-the-fold visibility)
// ---------------------------------------------------------------------------

const popularSlugs = [
  "eye-test-near-me",
  "free-eye-test",
  "eye-test-cost",
  "nhs-eye-test",
  "specsavers-eye-test",
  "book-eye-test-online",
  "same-day-eye-test",
  "eye-test-what-to-expect",
];

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    "Find Eye Tests — Guides on Cost, NHS Eligibility, Booking & More | eyetest.co.uk",
  description:
    "Browse our comprehensive guides covering eye test costs, NHS eligibility, same-day availability, optician comparisons, specialist tests, and common vision concerns. Find answers to the most searched eye test questions in the UK.",
  keywords: [
    "eye test cost",
    "free eye test",
    "NHS eye test",
    "eye test near me",
    "book eye test",
    "Specsavers eye test",
    "Boots eye test",
    "same day eye test",
    "eye test guide UK",
  ],
  openGraph: {
    title: "Find Eye Tests — Comprehensive UK Guides | eyetest.co.uk",
    description:
      "Guides covering eye test costs, NHS eligibility, booking, optician comparisons, and vision concerns.",
    url: "https://eyetest.co.uk/find",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/find",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function FindPage() {
  const categories = Object.keys(categoryLabels) as SearchQuery["category"][];

  // Structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Find Eye Tests — Comprehensive UK Guides",
    description:
      "Browse guides covering eye test costs, NHS eligibility, booking, optician comparisons, specialist tests, and vision concerns.",
    url: "https://eyetest.co.uk/find",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: searchQueries.length,
      itemListElement: searchQueries.map((q, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: q.title,
        url: `https://eyetest.co.uk/find/${q.slug}`,
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
        item: "https://eyetest.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Find",
        item: "https://eyetest.co.uk/find",
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

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Find" }]}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <svg
              className="w-4 h-4 text-[var(--color-primary-light)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{searchQueries.length} guides available</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find{" "}
            <span className="text-[var(--color-primary-light)]">
              Eye Tests
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Answers to the most common eye test questions in the UK.
            Costs, NHS eligibility, where to book, and what to expect.
          </p>

          <HeroSearchForm placeholder="Enter your postcode to find appointments" />
        </PageHero>

        {/* ── Popular queries ────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Most popular guides
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The most-searched eye test topics in the UK. Click any guide
                for detailed information.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularSlugs.map((slug) => {
                const q = searchQueries.find((sq) => sq.slug === slug);
                if (!q) return null;
                const catConf = categoryConfig[q.category];
                return (
                  <Link
                    key={q.slug}
                    href={`/find/${q.slug}`}
                    className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                  >
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${catConf.bg} ${catConf.text}`}
                    >
                      {categoryLabels[q.category]}
                    </span>
                    <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-2 leading-snug">
                      {q.keyword
                        .split(" ")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {q.shortDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Categories grid ────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Browse by category
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find the information you need, organised by topic.
              </p>
            </div>

            <div className="space-y-16">
              {categories.map((category) => {
                const queries = getQueriesByCategory(category);
                const catConf = categoryConfig[category];

                return (
                  <div key={category}>
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`w-10 h-10 rounded-xl ${catConf.bg} flex items-center justify-center`}
                      >
                        <svg
                          className={`w-5 h-5 ${catConf.text}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={catConf.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold text-[var(--color-navy)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {categoryLabels[category]}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {categoryDescriptions[category]}
                        </p>
                      </div>
                    </div>

                    {/* Query links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {queries.map((q) => (
                        <Link
                          key={q.slug}
                          href={`/find/${q.slug}`}
                          className="group flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                        >
                          <svg
                            className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                          <div>
                            <h4 className="font-medium text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-sm leading-snug">
                              {q.keyword
                                .split(" ")
                                .map(
                                  (w) =>
                                    w.charAt(0).toUpperCase() + w.slice(1)
                                )
                                .join(" ")}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {q.shortDescription}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to book your eye test?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Search by postcode to compare opticians, check real-time
              availability, and book your appointment online. It&apos;s
              completely free.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg"
            >
              <svg
                className="w-5 h-5"
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
              Find Opticians Near You
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
