import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  eyeTests,
  getTestBySlug,
  getAllSlugs,
  type EyeTest,
} from "@/data/eye-tests";

// ---------------------------------------------------------------------------
// Icon helper — maps data icon strings to emoji
// ---------------------------------------------------------------------------

const iconMap: Record<string, string> = {
  eye: "👁️",
  shield: "🛡️",
  child: "👶",
  "contact-lens": "👓",
  scan: "🩻",
  grid: "🟦",
  camera: "📷",
  droplet: "💧",
  palette: "🎨",
  car: "🚗",
  alert: "🚨",
  home: "🏠",
  pressure: "🌡️",
  eyelid: "🪴",
  trending: "📈",
  lens: "🔍",
  target: "🎯",
};

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
  const test = getTestBySlug(slug);

  if (!test) {
    return { title: "Eye Test Not Found | eyetest.co.uk" };
  }

  const title = `${test.name} — What to Expect, Cost & Where to Book | eyetest.co.uk`;
  const description = `${test.shortDescription} Learn what a ${test.name.toLowerCase()} involves, who needs one, how much it costs (${test.cost.split(".")[0]}), and where to book in the UK.`;

  return {
    title,
    description,
    keywords: [
      test.name.toLowerCase(),
      `${test.name.toLowerCase()} UK`,
      `${test.name.toLowerCase()} cost`,
      `${test.name.toLowerCase()} near me`,
      `what is a ${test.name.toLowerCase()}`,
      "eye test",
      "optician",
      ...(test.nhsCovered ? [`NHS ${test.name.toLowerCase()}`] : []),
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/eye-tests/${test.slug}`,
      siteName: "eyetest.co.uk",
      type: "article",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/eye-tests/${test.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function EyeTestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = getTestBySlug(slug);

  if (!test) {
    notFound();
  }

  // Resolve related tests
  const relatedTests: EyeTest[] = test.relatedTests
    .map((relSlug) => getTestBySlug(relSlug))
    .filter((t): t is EyeTest => t !== undefined);

  // Build FAQ data for this specific test
  const testFaqs = [
    {
      q: `What is a ${test.name.toLowerCase()}?`,
      a: test.shortDescription,
    },
    {
      q: `How long does a ${test.name.toLowerCase()} take?`,
      a: `A ${test.name.toLowerCase()} typically takes ${test.duration}.`,
    },
    {
      q: `How much does a ${test.name.toLowerCase()} cost?`,
      a: test.cost,
    },
    {
      q: `How often should I have a ${test.name.toLowerCase()}?`,
      a: test.frequency,
    },
    {
      q: `Is a ${test.name.toLowerCase()} available on the NHS?`,
      a: test.nhsCovered
        ? `Yes, a ${test.name.toLowerCase()} is available on the NHS for eligible patients. Check with your local optician for specific eligibility criteria.`
        : `A ${test.name.toLowerCase()} is not routinely funded by the NHS and is typically available as a private service. Some opticians may include elements of this test within a standard NHS-funded sight test where clinically indicated.`,
    },
  ];

  // Structured data — MedicalWebPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: test.name,
    description: test.shortDescription,
    url: `https://eyetest.co.uk/eye-tests/${test.slug}`,
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "article",
    },
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
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
          name: "Eye Tests",
          item: "https://eyetest.co.uk/eye-tests",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: test.name,
          item: `https://eyetest.co.uk/eye-tests/${test.slug}`,
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: testFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // Split fullDescription into paragraphs
  const descriptionParagraphs = test.fullDescription
    .split("\n\n")
    .filter((p) => p.trim());

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)] via-[#112247] to-[var(--color-navy-light)]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white/80 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
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
                  </li>
                  <li>
                    <Link
                      href="/eye-tests"
                      className="hover:text-white/80 transition-colors"
                    >
                      Eye Tests
                    </Link>
                  </li>
                  <li>
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
                  </li>
                  <li className="text-white/80">{test.name}</li>
                </ol>
              </nav>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-3xl mb-6">
                {iconMap[test.icon] || "👁️"}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {test.name}
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                {test.shortDescription}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-white/90">
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {test.duration}
                </div>
                {test.nhsCovered && (
                  <div className="flex items-center gap-2 bg-[var(--color-nhs-blue)]/20 border border-[var(--color-nhs-blue)]/30 rounded-full px-4 py-2 text-sm text-white font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    NHS covered
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main article */}
              <article className="lg:col-span-2">
                {/* Full description */}
                <div className="mb-12">
                  <h2
                    className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    What is a {test.name.toLowerCase()}?
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {descriptionParagraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-600 leading-relaxed mb-4"
                      >
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Who needs this test */}
                <div className="mb-12">
                  <h2
                    className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Who needs a {test.name.toLowerCase()}?
                  </h2>
                  <ul className="space-y-3">
                    {test.whoNeeds.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to expect */}
                <div className="mb-12">
                  <h2
                    className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    What to expect during a {test.name.toLowerCase()}
                  </h2>
                  <ol className="space-y-4">
                    {test.whatToExpect.map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-sm font-bold shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-600 pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Cost section */}
                <div className="mb-12 bg-gray-50 rounded-2xl p-8">
                  <h2
                    className="text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    How much does it cost?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{test.cost}</p>
                </div>

                {/* How often */}
                <div className="mb-12 bg-gray-50 rounded-2xl p-8">
                  <h2
                    className="text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    How often should you have this test?
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {test.frequency}
                  </p>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                {/* Key facts card */}
                <div className="sticky top-8">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Key facts
                    </h3>
                    <dl className="space-y-4">
                      {/* Duration */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
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
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                            Duration
                          </dt>
                          <dd className="text-sm font-medium text-[var(--color-navy)]">
                            {test.duration}
                          </dd>
                        </div>
                      </div>

                      {/* Cost */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
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
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                            Cost
                          </dt>
                          <dd className="text-sm font-medium text-[var(--color-navy)]">
                            {test.cost}
                          </dd>
                        </div>
                      </div>

                      {/* Frequency */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
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
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                            />
                          </svg>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                            Frequency
                          </dt>
                          <dd className="text-sm font-medium text-[var(--color-navy)]">
                            {test.frequency}
                          </dd>
                        </div>
                      </div>

                      {/* NHS coverage */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            test.nhsCovered
                              ? "bg-[var(--color-nhs-blue)]/10"
                              : "bg-gray-100"
                          }`}
                        >
                          <svg
                            className={`w-5 h-5 ${
                              test.nhsCovered
                                ? "text-[var(--color-nhs-blue)]"
                                : "text-gray-400"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                            />
                          </svg>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                            NHS coverage
                          </dt>
                          <dd className="text-sm font-medium text-[var(--color-navy)]">
                            {test.nhsCovered ? (
                              <span className="inline-flex items-center gap-1">
                                <span className="text-[var(--color-nhs-blue)]">
                                  Available on NHS
                                </span>
                              </span>
                            ) : (
                              "Private only"
                            )}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>

                  {/* CTA card */}
                  <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-2xl p-6 mb-6">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Book a {test.name.toLowerCase()}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Search for opticians near you that offer this test. Compare
                      prices and book online.
                    </p>
                    <Link
                      href="/search"
                      className="inline-flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
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
                      Find Opticians
                    </Link>
                  </div>

                  {/* Browse all tests link */}
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Browse all eye tests
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore all {eyeTests.length} types of eye tests available
                      in the UK.
                    </p>
                    <Link
                      href="/eye-tests"
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
                      View all eye test types
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {test.name} — frequently asked questions
              </h2>
            </div>

            <div className="space-y-6">
              {testFaqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors">
                    <span>{faq.q}</span>
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
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related tests */}
        {relatedTests.length > 0 && (
          <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Related eye tests
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These tests are often recommended alongside or as an
                  alternative to a {test.name.toLowerCase()}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedTests.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/eye-tests/${related.slug}`}
                    className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">
                      {iconMap[related.icon] || "👁️"}
                    </div>
                    <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                      {related.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full">
                        {related.duration}
                      </span>
                      {related.nhsCovered && (
                        <span className="inline-flex items-center text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                          NHS
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Find opticians offering this test
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Search by postcode to find opticians near you that offer a{" "}
              {test.name.toLowerCase()}. Compare prices, check availability, and
              book online for free.
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
              Search Opticians Near You
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
