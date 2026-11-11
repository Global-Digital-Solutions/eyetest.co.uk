import type { Metadata } from "next";
import Link from "next/link";
import { OpticianOptions, NO_OPTICIAN_BLOCK } from "@/components/OpticianOptions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import {
  searchQueries,
  getQueryBySlug,
  queryHref,
  categoryLabels,
  PRICE_DISCLAIMER,
  type SearchQuery,
} from "@/data/search-queries";
import { locations, regions } from "@/data/locations";

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
        { label: "Specsavers", value: "£20 to £25" },
        { label: "Boots Opticians", value: "From £29.95" },
        { label: "Vision Express", value: "£30 (includes OCT)" },
        { label: "NHS funded", value: "Free if eligible" },
      ];
    case "nhs":
      return [
        { label: "NHS test cost", value: "Free" },
        { label: "Over 60s", value: "Always eligible" },
        { label: "Under 16s", value: "Always eligible" },
        { label: "Optical voucher (England)", value: "£42.40 to £233.56" },
      ];
    case "availability":
      return [
        { label: "Online booking", value: "All major chains" },
        { label: "Weekend testing", value: "Most chains, varies by store" },
        { label: "Urgent eye problem", value: "Call an optician or NHS 111" },
        { label: "Scotland", value: "Free for all UK residents" },
      ];
    case "brand":
      return [
        { label: "Specsavers", value: "£20 to £25" },
        { label: "Boots Opticians", value: "From £29.95" },
        { label: "Vision Express", value: "£30 (includes OCT)" },
        { label: "NHS tests", value: "Offered by all major chains" },
      ];
    case "specialist":
      return [
        { label: "OCT scan", value: "Included or extra, varies by chain" },
        { label: "Driving standard", value: "Read a number plate at 20 metres" },
        { label: "Children under 16", value: "Free NHS eye test" },
        { label: "Scotland", value: "Free for all UK residents" },
      ];
    case "general":
      return [
        { label: "Typical test length", value: "20 to 30 minutes" },
        { label: "NHS advice", value: "Every 2 years, or as advised" },
        { label: "Major chains", value: "£20 to £40 private" },
        { label: "NHS funded", value: "Free if eligible" },
      ];
    case "concern":
      return [
        { label: "Urgent symptoms", value: "Call an optician the same day" },
        { label: "Sudden loss of sight", value: "Go to A&E or call 999" },
        { label: "NHS 111", value: "24/7 advice line" },
        { label: "Eye test", value: "Free if eligible, or about £20 to £40" },
      ];
  }
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export function queryMetadata(query: SearchQuery): Metadata {
  const url = `https://www.eyetest.co.uk${queryHref(query)}`;
  return {
    title: query.seoTitle ?? query.title,
    description: query.seoDescription ?? query.shortDescription,
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
      title: query.seoTitle ?? query.title,
      description: query.seoDescription ?? query.shortDescription,
      url,
      siteName: "eyetest.co.uk",
      type: "article",
    },
    alternates: {
      canonical: url,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export function QueryPageView({ query }: { query: SearchQuery }) {
  const url = `https://www.eyetest.co.uk${queryHref(query)}`;
  const parents = query.parentCrumbs ?? [{ label: "Find", href: "/find" }];

  // Resolve related queries
  const relatedQueries: SearchQuery[] = query.relatedQueries
    .map((relSlug) => getQueryBySlug(relSlug))
    .filter((q): q is SearchQuery => q !== undefined);

  // Split content into paragraphs
  const contentParagraphs = query.content.split("\n\n").filter((p) => p.trim());

  // Key facts for this category
  const keyFacts = query.keyFacts ?? getKeyFacts(query);
  const showDisclaimer =
    query.disclaimer !== undefined ||
    query.category === "cost" ||
    query.category === "nhs" ||
    query.category === "brand";
  const disclaimerText = query.disclaimer ?? PRICE_DISCLAIMER;
  const sections = query.sections ?? [];
  const townsByRegion = query.showTownIndex
    ? regions
        .map((region) => ({
          region,
          towns: locations
            .filter((l) => l.region === region)
            .sort((a, b) => a.name.localeCompare(b.name)),
        }))
        .filter((g) => g.towns.length > 0)
    : [];

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
    url,
    author: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    dateModified: query.dateModified ?? "2026-06-16",
    ...(query.sources && query.sources.length > 0
      ? {
          citation: query.sources.map((src) => ({
            "@type": "CreativeWork",
            name: src.label,
            url: src.url,
          })),
        }
      : {}),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.eyetest.co.uk",
        },
        ...parents.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: crumb.label,
          item: `https://www.eyetest.co.uk${crumb.href}`,
        })),
        {
          "@type": "ListItem",
          position: parents.length + 2,
          name: query.title,
          item: url,
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
            ...parents,
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
                {query.h1 ??
                  query.keyword
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                {query.shortDescription}
              </p>
              {query.dateModified && (
                <p className="text-sm text-white/60 -mt-6 mb-8">
                  Information last checked:{" "}
                  {new Date(query.dateModified).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}

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

                {sections.map((section) => (
                  <section key={section.heading} className="mt-10">
                    <h2
                      className="text-2xl font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {section.heading}
                    </h2>
                    {section.body &&
                      section.body
                        .split("\n\n")
                        .filter((p) => p.trim())
                        .map((p, i) => (
                          <p
                            key={i}
                            className="text-gray-600 leading-relaxed mb-4 text-base"
                          >
                            {p.trim()}
                          </p>
                        ))}
                    {section.items && section.items.length > 0 && (
                      <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.table && (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm text-left border border-gray-100 rounded-xl overflow-hidden">
                          {section.table.caption && (
                            <caption className="text-xs text-gray-500 text-left mb-2">
                              {section.table.caption}
                            </caption>
                          )}
                          <thead className="bg-gray-50 text-[var(--color-navy)]">
                            <tr>
                              {section.table.headers.map((h) => (
                                <th key={h} scope="col" className="px-4 py-3 font-semibold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row) => (
                              <tr key={row.join("|")} className="border-t border-gray-100">
                                {row.map((cell, ci) => (
                                  <td key={ci} className="px-4 py-3 text-gray-600 align-top">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {section.links && section.links.length > 0 && (
                      <ul className="flex flex-wrap gap-2 mb-4">
                        {section.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              className="inline-block text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-full transition-colors"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {townsByRegion.length > 0 && (
                  <section className="mt-10" id="towns">
                    <h2
                      className="text-2xl font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Opticians and eye tests by town
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-base">
                      Choose your town to see opticians, NHS eye test details and
                      local prices.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {townsByRegion.map((group) => (
                        <div key={group.region}>
                          <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                            {group.region}
                          </h3>
                          <ul className="space-y-1">
                            {group.towns.map((town) => (
                              <li key={town.slug}>
                                <Link
                                  href={`/locations/${town.slug}`}
                                  className="text-sm text-[var(--color-primary)] hover:underline"
                                >
                                  Opticians in {town.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {showDisclaimer && (
                  <div className="mt-10 bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-amber-900 leading-relaxed">
                    <strong className="font-semibold">Please note: </strong>
                    {query.dateModified
                      ? `This information was last checked on ${new Date(query.dateModified).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. `
                      : ""}
                    {disclaimerText}
                  </div>
                )}

                {query.sources && query.sources.length > 0 && (
                  <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <h2 className="text-base font-semibold text-[var(--color-navy)] mb-2">
                      Sources
                    </h2>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {query.sources.map((src) => (
                        <li key={src.url}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-primary)] hover:underline"
                          >
                            {src.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {query.dateModified && (
                      <p className="text-xs text-gray-500 mt-3">
                        Last checked:{" "}
                        {new Date(query.dateModified).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                )}
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

        {/* ── Optician options ───────────────────────────────────────── */}
        {!NO_OPTICIAN_BLOCK.has(query.slug) && (
          <section className="bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
              <OpticianOptions />
            </div>
          </section>
        )}

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
                      href={queryHref(related)}
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
