import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import { AtHomeCallout } from "@/components/AtHomeCallout";
import { eyeTests } from "@/data/eye-tests";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Types of Eye Tests — Complete UK Guide | eyetest.co.uk",
  description:
    "Explore all 18 types of eye tests available in the UK, including NHS eye tests, OCT scans, visual field tests, and specialist screenings. Learn what each test involves, who needs it, costs, and how to book.",
  keywords: [
    "types of eye tests",
    "eye test types UK",
    "OCT scan",
    "visual field test",
    "NHS eye test",
    "diabetic eye screening",
    "glaucoma test",
    "children's eye test",
    "contact lens fitting",
    "dry eye assessment",
    "eye test guide",
  ],
  openGraph: {
    title: "Types of Eye Tests — Complete UK Guide | eyetest.co.uk",
    description:
      "Explore all types of eye tests available in the UK. Learn what each test involves, who needs it, and how much it costs.",
    url: "https://www.eyetest.co.uk/eye-tests",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/eye-tests",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: "How often should I have an eye test?",
    a: "The NHS recommends that most adults have a routine eye test at least every two years. If you are over 70, have diabetes, a family history of glaucoma, or wear contact lenses, you may need more frequent tests — typically once a year. Children should have annual eye tests throughout their school years.",
  },
  {
    q: "Are eye tests free on the NHS?",
    a: "Many people qualify for free NHS-funded eye tests. Eligible groups include children under 16 (or under 19 in full-time education), adults aged 60 and over, people with diabetes or glaucoma, those receiving qualifying benefits such as Universal Credit or Income Support, and people aged 40+ with an immediate family member diagnosed with glaucoma.",
  },
  {
    q: "What is the difference between an eye test and an eye examination?",
    a: "In the UK, the terms are generally used interchangeably. A standard eye test (or sight test) includes both a check of your vision and an examination of the health of your eyes. Some opticians offer enhanced examinations with additional technology such as OCT scans or retinal photography, which provide a more detailed assessment.",
  },
  {
    q: "How long does an eye test take?",
    a: "A standard eye test typically takes 20 to 30 minutes. Specialist tests such as contact lens fittings, dry eye assessments, or myopia management consultations may take longer — usually 30 to 60 minutes. Quick add-on tests like retinal photography or OCT scans only add a few extra minutes.",
  },
  {
    q: "What should I bring to my eye test?",
    a: "Bring your current glasses or contact lenses, a list of any medications you take, and your NHS exemption certificate or benefit documentation if you qualify for a free test. If you have had a previous prescription, bring that along too so your optometrist can track changes over time.",
  },
  {
    q: "Can I drive after an eye test?",
    a: "After a standard eye test you can usually drive home immediately. However, if your optometrist uses dilating drops (common in diabetic eye screening, some children’s eye tests, and cataract assessments), your vision will be blurry for several hours afterwards and you should not drive until it clears. Ask your optician in advance whether drops will be used so you can arrange alternative transport if needed.",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function EyeTestsPage() {
  // Filter out home-visit-eye-test (redirects to /at-home-eye-tests)
  const visibleTests = eyeTests.filter(t => t.slug !== "home-visit-eye-test");

  // Structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Types of Eye Tests — Complete UK Guide",
    description:
      "A comprehensive guide to all types of eye tests available in the UK, including NHS eye tests, OCT scans, visual field tests, and specialist screenings.",
    url: "https://www.eyetest.co.uk/eye-tests",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: visibleTests.length,
      itemListElement: visibleTests.map((test, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: test.name,
        url: `https://www.eyetest.co.uk/eye-tests/${test.slug}`,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
        name: "Eye Tests",
        item: "https://www.eyetest.co.uk/eye-tests",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Hero */}
        <PageHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Eye Tests" }]}
          backgroundImage="/images/eye-test-phoropter-lg.jpg"
          overlay="medium"
        >
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
            <span>{visibleTests.length} test types covered</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Types of{" "}
            <span className="text-[var(--color-primary-light)]">
              Eye Tests
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            From routine NHS sight tests to advanced OCT scans and specialist
            screenings, discover every type of eye test available in the UK
            and find out which ones you need.
          </p>

          <HeroSearchForm placeholder="Enter your postcode to find appointments" />
        </PageHero>

        {/* Test type cards grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                All eye test types
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse every type of eye test available in the UK. Click any card
                to learn more about what the test involves, who needs it, and how
                much it costs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTests.map((test) => (
                <Link
                  key={test.slug}
                  href={`/eye-tests/${test.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  {/* Title */}
                  <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-3">
                    {test.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {test.shortDescription}
                  </p>

                  {/* Meta badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Duration */}
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {test.duration}
                    </span>

                    {/* NHS badge */}
                    {test.nhsCovered && (
                      <span className="inline-flex items-center text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                        NHS
                      </span>
                    )}
                  </div>

                  {/* Cost */}
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Cost:</span>{" "}
                    {test.cost.length > 80
                      ? test.cost.slice(0, 80) + "…"
                      : test.cost}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick comparison table */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Quick comparison
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compare duration, cost, and NHS coverage at a glance.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[var(--color-navy)] text-white">
                    <th className="px-6 py-4 font-semibold">Test</th>
                    <th className="px-6 py-4 font-semibold">Duration</th>
                    <th className="px-6 py-4 font-semibold">NHS covered</th>
                    <th className="px-6 py-4 font-semibold">Frequency</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {visibleTests.map((test) => (
                    <tr
                      key={test.slug}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/eye-tests/${test.slug}`}
                          className="font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {test.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {test.duration}
                      </td>
                      <td className="px-6 py-4">
                        {test.nhsCovered ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Yes
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Private only
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-xs max-w-xs">
                        {test.frequency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently asked questions about eye tests
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
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

        {/* CTA */}
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
              availability, and book your appointment online. It&apos;s completely
              free.
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
        <AtHomeCallout compact />
      </main>
      <Footer />
    </>
  );
}
