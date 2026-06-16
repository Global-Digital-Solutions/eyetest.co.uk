import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import { providerOffers, OFFER_CATEGORIES } from "@/data/offers";
import { OffersGrid } from "./OffersGrid";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    "Eye Test Offers & Deals — Compare UK Optician Promotions | eyetest.co.uk",
  description:
    "Compare the latest offers and deals from Specsavers, Boots Opticians, Vision Express, ASDA and independent opticians. Find 2-for-1 glasses, free eye tests, student discounts, and contact lens deals — updated fortnightly.",
  keywords: [
    "optician offers",
    "eye test deals",
    "glasses offers UK",
    "2 for 1 glasses",
    "free eye test",
    "specsavers offers",
    "boots opticians deals",
    "vision express offers",
    "student discount opticians",
    "cheap eye test",
    "contact lens offers",
    "prescription sunglasses deals",
  ],
  openGraph: {
    title:
      "Eye Test Offers & Deals — Compare UK Optician Promotions | eyetest.co.uk",
    description:
      "Compare the latest offers from 9 major UK opticians. 2-for-1 glasses, free eye tests, student discounts, and more — all in one place.",
    url: "https://www.eyetest.co.uk/offers",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/offers",
  },
};

// ---------------------------------------------------------------------------
// Price comparison table data
// ---------------------------------------------------------------------------

const priceData = providerOffers.map((p) => ({
  name: p.name,
  slug: p.slug,
  price: p.eyeTestPrice,
  nhs: p.nhsFree,
  color: p.color,
  website: p.website,
}));

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function OffersPage() {
  const totalOffers = providerOffers.reduce(
    (sum, p) => sum + p.offers.length,
    0
  );

  const now = new Date().toISOString().slice(0, 10);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Eye Test Offers & Deals — UK Optician Promotions",
    description:
      "Compare the latest offers and deals from major UK optician chains including Specsavers, Boots Opticians, Vision Express, and ASDA.",
    url: "https://www.eyetest.co.uk/offers",
    publisher: {
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
        name: "Offers",
        item: "https://www.eyetest.co.uk/offers",
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

        {/* Hero */}
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
          overlay="medium"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white/90 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            Updated June 2026
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Optician Offers & Deals
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Compare <strong className="text-white">{totalOffers}+ offers</strong>{" "}
            from {providerOffers.length} major UK opticians. From 2-for-1 glasses to
            free eye tests and student discounts — find the best deal near you.
          </p>
          <HeroSearchForm placeholder="Enter your postcode to find offers near you" />
        </PageHero>

        {/* Eye test price comparison */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] text-center mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Eye Test Price Comparison
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
              How much does an eye test cost at each optician? Here&apos;s a
              quick comparison of private eye test prices across the UK.
            </p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-navy)]">
                      Optician
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-[var(--color-navy)]">
                      Private Eye Test
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-[var(--color-navy)]">
                      NHS Free
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-[var(--color-navy)]">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((p, i) => (
                    <tr
                      key={p.slug}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-teal-50/30 transition-colors`}
                    >
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[var(--color-navy)]">
                          {p.name}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="font-bold text-[var(--color-navy)]">
                          {p.price}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        {p.nhs ? (
                          <span className="inline-flex items-center gap-1 text-[var(--color-success)] text-xs font-semibold">
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Eligible
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="text-right py-3 px-4">
                        <a
                          href={`#${p.slug}`}
                          className="text-xs font-medium text-[var(--color-primary)] hover:underline"
                        >
                          View offers →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              Prices verified June 2026. NHS eye tests are free for eligible
              groups including over 60s, under 16s, and benefit recipients.
            </p>
          </div>
        </section>

        {/* Interactive offers grid (client component) */}
        <OffersGrid providers={providerOffers} />

        {/* NHS eligibility callout */}
        <section className="py-12 sm:py-16 bg-[#f0f7ff]">
          <div className="max-w-4xl mx-auto px-4">
            <div className="rounded-2xl bg-white border border-[#005eb8]/10 p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#005eb8] flex items-center justify-center">
                  <span className="text-white text-lg font-bold">NHS</span>
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-[var(--color-navy)] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Are you eligible for a free NHS eye test?
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Many people qualify for completely free NHS-funded eye tests.
                    You may be eligible if you&apos;re under 16, over 60, have
                    diabetes, receive certain benefits, or have a family history
                    of glaucoma. In Scotland, eye tests are free for everyone.
                  </p>
                  <Link
                    href="/eye-health/guides/understanding-nhs-eye-test-eligibility"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#005eb8] hover:underline"
                  >
                    Check your eligibility
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Last updated note */}
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-400">
              Offers are sourced directly from each optician&apos;s website and
              verified fortnightly. Last updated:{" "}
              <strong>June 2026</strong>. Prices and promotions may vary by
              branch. Always confirm details with your local optician before
              booking.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
