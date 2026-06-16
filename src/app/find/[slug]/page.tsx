import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import {
  searchQueries,
  getQueryBySlug,
  getAllSlugs,
  categoryLabels,
  type SearchQuery,
} from "@/data/search-queries";

// ---------------------------------------------------------------------------
// Category badge colours
// ---------------------------------------------------------------------------

const categoryColours: Record<
  SearchQuery["category"],
  { bg: string; text: string }
> = {
  cost: { bg: "bg-amber-50", text: "text-amber-700" },
  nhs: { bg: "bg-[var(--color-nhs-blue)]/10", text: "text-[var(--color-nhs-blue)]" },
  availability: { bg: "bg-emerald-50", text: "text-emerald-700" },
  brand: { bg: "bg-violet-50", text: "text-violet-700" },
  specialist: { bg: "bg-rose-50", text: "text-rose-700" },
  general: { bg: "bg-sky-50", text: "text-sky-700" },
  concern: { bg: "bg-orange-50", text: "text-orange-700" },
};

// ---------------------------------------------------------------------------
// Key facts per category — shown as a callout on each page
// ---------------------------------------------------------------------------

function getKeyFacts(query: SearchQuery): { label: string; value: string }[] {
  switch (query.category) {
    case "cost":
      return [
        { label: "Specsavers", value: "~£25" },
        { label: "Boots Opticians", value: "~£29.95" },
        { label: "Vision Express", value: "~£30" },
        { label: "NHS funded", value: "Free for eligible" },
      ];
    case "nhs":
      return [
        { label: "NHS test cost", value: "Free" },
        { label: "Over 60s", value: "Always eligible" },
        { label: "Under 16s", value: "Always eligible" },
        { label: "Optical voucher", value: "£39.10–£215.50" },
      ];
    case "availability":
      return [
        { label: "Same-day slots", value: "Widely available" },
        { label: "Weekend testing", value: "Saturday + many Sundays" },
        { label: "Online booking", value: "All major chains" },
        { label: "NHS urgent care", value: "Free MECS scheme" },
      ];
    case "brand":
      return [
        { label: "Specsavers stores", value: "900+ UK" },
        { label: "Boots stores", value: "~500 UK" },
        { label: "Vision Express", value: "~400 UK" },
        { label: "All NHS accredited", value: "Yes" },
      ];
    case "specialist":
      return [
        { label: "OCT scan", value: "£10–£39 add-on" },
        { label: "Driving standard", value: "6/12 visual acuity" },
        { label: "Contact lens fitting", value: "£30–£60" },
        { label: "Children's tests", value: "Free on NHS" },
      ];
    case "general":
      return [
        { label: "Standard test duration", value: "20–30 minutes" },
        { label: "Recommended frequency", value: "Every 2 years" },
        { label: "Average cost", value: "£25–£45" },
        { label: "NHS eligible", value: "14m+ people" },
      ];
    case "concern":
      return [
        { label: "Urgent symptoms", value: "Call optician same day" },
        { label: "Emergency care", value: "Free via MECS" },
        { label: "NHS 111", value: "24/7 advice line" },
        { label: "Eye test", value: "From £25 or free" },
      ];
  }
}

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
  const query = getQueryBySlug(slug);

  if (!query) {
    return { title: "Page Not Found | eyetest.co.uk" };
  }

  return {
    title: `${query.title} | eyetest.co.uk`,
    description: query.shortDescription,
    keywords: [
      query.keyword,
      `${query.keyword} UK`,
      `${query.keyword} near me`,
      `${query.keyword} 2026`,
      "eye test",
      "optician",
      "book eye test",
    ],
    openGraph: {
      title: query.title,
      description: query.shortDescription,
      url: `https://eyetest.co.uk/find/${query.slug}`,
      siteName: "eyetest.co.uk",
      type: "article",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/find/${query.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SearchQueryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = getQueryBySlug(slug);

  if (!query) {
    notFound();
  }

  // Resolve related queries
  const relatedQueries: SearchQuery[] = query.relatedQueries
    .map((relSlug) => getQueryBySlug(relSlug))
    .filter((q): q is SearchQuery => q !== undefined);

  // Split content into paragraphs
  const contentParagraphs = query.content.split("\n\n").filter((p) => p.trim());

  // Key facts for this category
  const keyFacts = getKeyFacts(query);

  // Category colour
  const catColour = categoryColours[query.category];

  // ---------------------------------------------------------------------------
  // Structured data
  // ---------------------------------------------------------------------------

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: query.title,
    description: query.shortDescription,
    url: `https://eyetest.co.uk/find/${query.slug}`,
    author: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    dateModified: "2026-06-16",
    breadcrumb: {
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
        {
          "@type": "ListItem",
          position: 3,
          name: query.title,
          item: `https://eyetest.co.uk/find/${query.slug}`,
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: query.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Find", href: "/find" },
            { label: query.keyword },
          ]}
          compact
        >
              {/* Category badge */}
              <div
                className={`inline-flex items-center gap-2 ${catColour.bg} ${catColour.text} text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6`}
              >
                {categoryLabels[query.category]}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {query.keyword
                  .split(" ")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                {query.shortDescription}
              </p>

              {/* Postcode search form */}
              <HeroSearchForm />
        </PageHero>

        {/* ── Content ────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main article */}
              <article className="lg:col-span-2">
                <div className="prose prose-gray max-w-none">
                  {contentParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-600 leading-relaxed mb-5 text-base"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Key facts card */}
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Key facts
                    </h3>
                    <dl className="space-y-4">
                      {keyFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="flex items-start gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                            <svg
                              className="w-5 h-5 text-[var(--color-primary)]"
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
                          <div>
                            <dt className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                              {fact.label}
                            </dt>
                            <dd className="text-sm font-medium text-[var(--color-navy)]">
                              {fact.value}
                            </dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* CTA card */}
                  <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-2xl p-6">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {query.ctaText}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Enter your postcode to compare opticians, check
                      availability, and book your appointment online.
                    </p>
                    <form action="/search" method="GET">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="postcode"
                          placeholder="Postcode"
                          className="flex-1 px-4 py-2.5 text-sm text-[var(--color-navy)] bg-white border border-gray-200 rounded-full focus:outline-none focus:border-[var(--color-primary)] placeholder:text-gray-400"
                          aria-label="Enter your postcode"
                        />
                        <button
                          type="submit"
                          className="flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:shadow-lg cursor-pointer"
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
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Browse all link */}
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Browse all guides
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore all {searchQueries.length} eye test guides
                      covering cost, NHS eligibility, availability, and more.
                    </p>
                    <Link
                      href="/find"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      View all guides
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-6">
              {query.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors">
                    <span>{faq.question}</span>
                    <svg
                      className="w-5 h-5 shrink-0 text-gray-400 group-open:rotate-180 transition-transform"
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
                  <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related queries ─────────────────────────────────────────── */}
        {relatedQueries.length > 0 && (
          <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Related guides
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  People who searched for &ldquo;{query.keyword}&rdquo; also
                  found these guides helpful.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedQueries.map((related) => {
                  const relCatColour = categoryColours[related.category];
                  return (
                    <Link
                      key={related.slug}
                      href={`/find/${related.slug}`}
                      className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                    >
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${relCatColour.bg} ${relCatColour.text}`}
                      >
                        {categoryLabels[related.category]}
                      </span>
                      <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-2 leading-snug">
                        {related.keyword
                          .split(" ")
                          .map(
                            (w) => w.charAt(0).toUpperCase() + w.slice(1)
                          )
                          .join(" ")}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {query.ctaText}
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Enter your postcode to compare opticians near you. Check
              real-time availability and book your appointment online for free.
            </p>
            <form
              action="/search"
              method="GET"
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white/10 sm:backdrop-blur-sm sm:rounded-full sm:p-1.5 sm:border sm:border-white/10">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
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
                  </div>
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Your postcode"
                    className="w-full pl-12 pr-4 py-3 text-base text-white bg-white/10 sm:bg-transparent rounded-xl sm:rounded-full border border-white/20 sm:border-none focus:outline-none placeholder:text-white/40"
                    aria-label="Enter your postcode"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-3 rounded-xl sm:rounded-full transition-all hover:shadow-lg cursor-pointer"
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
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
