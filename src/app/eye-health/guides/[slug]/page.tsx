import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  getGuideBySlug,
  getConditionBySlug,
  getAllGuideSlugs,
  type EyeHealthGuideCategory,
} from "@/data/eye-health";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllGuideSlugs().map((slug) => ({ slug }));
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
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide Not Found | eyetest.co.uk" };
  }

  const title = `${guide.title} | eyetest.co.uk`;
  const description = guide.summary;

  return {
    title,
    description,
    keywords: [
      guide.title.toLowerCase(),
      "eye health guide",
      "eye care advice",
      "eye test UK",
      "optician advice",
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/eye-health/guides/${guide.slug}`,
      siteName: "eyetest.co.uk",
      type: "article",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/eye-health/guides/${guide.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const guideCategoryLabels: Record<EyeHealthGuideCategory, string> = {
  "how-to": "How-to Guide",
  advice: "Expert Advice",
  nhs: "NHS Information",
  lifestyle: "Lifestyle",
};

const guideCategoryColors: Record<EyeHealthGuideCategory, string> = {
  "how-to": "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  advice: "bg-indigo-100 text-indigo-700",
  nhs: "bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)]",
  lifestyle: "bg-emerald-100 text-emerald-700",
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  // Related conditions
  const relatedConditions = guide.relatedConditions
    .map((s) => getConditionBySlug(s))
    .filter(Boolean);

  // Split content into paragraphs
  const contentParagraphs = guide.content
    .split("\n\n")
    .filter((p) => p.trim());

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    url: `https://eyetest.co.uk/eye-health/guides/${guide.slug}`,
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://eyetest.co.uk/eye-health/guides/${guide.slug}`,
    },
    articleSection: "Eye Health",
    about: guide.relatedConditions.map((condSlug) => ({
      "@type": "MedicalCondition",
      name: condSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
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
        item: "https://eyetest.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Eye Health",
        item: "https://eyetest.co.uk/eye-health",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `https://eyetest.co.uk/eye-health/guides/${guide.slug}`,
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
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Eye Health", href: "/eye-health" },
            { label: guide.title },
          ]}
          compact
        >
              {/* Category badge */}
              <div
                className={`inline-flex items-center text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6 ${guideCategoryColors[guide.category]}`}
              >
                {guideCategoryLabels[guide.category]}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {guide.title}
              </h1>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                {guide.summary}
              </p>
        </PageHero>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2">
                <article className="prose prose-gray max-w-none">
                  {contentParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-5"
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Book an eye test CTA */}
                <div className="bg-[var(--color-navy)] rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center text-[var(--color-primary-light)] mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Book your eye test
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    Compare opticians, check availability, and book online in
                    seconds. It&apos;s free.
                  </p>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg w-full justify-center"
                  >
                    Book an Eye Test
                  </Link>
                </div>

                {/* Related tests */}
                {guide.relatedTests.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Related Eye Tests
                    </h3>
                    <ul className="space-y-3">
                      {guide.relatedTests.map((test) => (
                        <li key={test} className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-[var(--color-primary)] shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">
                            {test
                              .split("-")
                              .map(
                                (w) =>
                                  w.charAt(0).toUpperCase() + w.slice(1)
                              )
                              .join(" ")}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/eye-tests"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] mt-4 transition-colors"
                    >
                      View all eye tests
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
                )}

                {/* Related conditions */}
                {relatedConditions.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Related Conditions
                    </h3>
                    <ul className="space-y-3">
                      {relatedConditions.map(
                        (condition) =>
                          condition && (
                            <li key={condition.slug}>
                              <Link
                                href={`/eye-health/conditions/${condition.slug}`}
                                className="flex items-center gap-3 group"
                              >
                                <span className="w-2 h-2 rounded-full shrink-0 bg-[var(--color-primary)]" />
                                <span className="text-sm text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">
                                  {condition.name}
                                </span>
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                    <Link
                      href="/eye-health#conditions"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] mt-4 transition-colors"
                    >
                      View all conditions
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
                )}
              </div>
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
              Protect your vision with a regular eye test
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Regular eye tests are the best way to detect problems early. Compare
              opticians and book online for free.
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
              Book an Eye Test
            </Link>
          </div>
        </section>

        {/* Back to Eye Health */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link
              href="/eye-health"
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
              Back to Eye Health
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
