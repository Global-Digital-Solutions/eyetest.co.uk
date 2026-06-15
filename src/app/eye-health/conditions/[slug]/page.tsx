import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  eyeConditions,
  getConditionBySlug,
  getAllConditionSlugs,
  type EyeConditionCategory,
} from "@/data/eye-health";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllConditionSlugs().map((slug) => ({ slug }));
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
  const condition = getConditionBySlug(slug);

  if (!condition) {
    return { title: "Condition Not Found | eyetest.co.uk" };
  }

  const title = `${condition.name} — Symptoms, Causes & Treatment | eyetest.co.uk`;
  const description = `Learn about ${condition.name.toLowerCase()}: symptoms, causes, treatment options, and prevention. Evidence-based information from UK eye care professionals.`;

  return {
    title,
    description,
    keywords: [
      condition.name.toLowerCase(),
      `${condition.name.toLowerCase()} symptoms`,
      `${condition.name.toLowerCase()} treatment`,
      `${condition.name.toLowerCase()} causes`,
      `${condition.name.toLowerCase()} UK`,
      "eye condition",
      "eye health",
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/eye-health/conditions/${condition.slug}`,
      siteName: "eyetest.co.uk",
      type: "article",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/eye-health/conditions/${condition.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const categoryLabels: Record<EyeConditionCategory, string> = {
  common: "Common condition",
  "age-related": "Age-related condition",
  refractive: "Refractive error",
  urgent: "Urgent condition",
};

const categoryColors: Record<EyeConditionCategory, string> = {
  common: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  "age-related": "bg-amber-100 text-amber-700",
  refractive: "bg-indigo-100 text-indigo-700",
  urgent: "bg-red-100 text-red-700",
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);

  if (!condition) {
    notFound();
  }

  // Related conditions
  const relatedConditions = condition.relatedConditions
    .map((s) => getConditionBySlug(s))
    .filter(Boolean);

  // JSON-LD MedicalCondition schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.name,
    description: condition.overview,
    url: `https://eyetest.co.uk/eye-health/conditions/${condition.slug}`,
    signOrSymptom: condition.symptoms.map((symptom) => ({
      "@type": "MedicalSymptom",
      name: symptom,
    })),
    possibleTreatment: {
      "@type": "MedicalTherapy",
      description: condition.treatment.slice(0, 300),
    },
    riskFactor: condition.causes.map((cause) => ({
      "@type": "MedicalRiskFactor",
      name: cause,
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
        name: condition.name,
        item: `https://eyetest.co.uk/eye-health/conditions/${condition.slug}`,
      },
    ],
  };

  // Split treatment text into paragraphs
  const treatmentParagraphs = condition.treatment
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Hero */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Eye Health", href: "/eye-health" },
            { label: condition.name },
          ]}
          compact
        >
              {/* Category badge */}
              <div
                className={`inline-flex items-center text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6 ${categoryColors[condition.category]}`}
              >
                {categoryLabels[condition.category]}
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {condition.name}
              </h1>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                Symptoms, causes, treatment, and when to see an optician
              </p>
        </PageHero>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Overview */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {condition.overview}
                  </p>
                </div>

                {/* Symptoms */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Symptoms
                  </h2>
                  <ul className="space-y-3">
                    {condition.symptoms.map((symptom) => (
                      <li
                        key={symptom}
                        className="flex items-start gap-3 text-gray-700"
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Causes */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Causes &amp; Risk Factors
                  </h2>
                  <ul className="space-y-3">
                    {condition.causes.map((cause) => (
                      <li
                        key={cause}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Treatment Options
                  </h2>
                  <div className="space-y-4">
                    {treatmentParagraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Prevention */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Prevention Tips
                  </h2>
                  <ul className="space-y-3">
                    {condition.prevention.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to see an optician */}
                <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
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
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold text-[var(--color-navy)] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        When to See an Optician
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {condition.whenToSeeOptician}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Key Facts */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Key Facts
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Category
                      </dt>
                      <dd>
                        <span
                          className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[condition.category]}`}
                        >
                          {categoryLabels[condition.category]}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Typically Affects
                      </dt>
                      <dd className="text-sm text-gray-700">
                        {condition.affectedAge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Key Symptoms
                      </dt>
                      <dd className="text-sm text-gray-700">
                        {condition.symptoms.length} identified symptoms
                      </dd>
                    </div>
                  </dl>
                </div>

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
                    Concerned about {condition.name.toLowerCase()}?
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    An eye test can detect early signs. Book yours today.
                  </p>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg w-full justify-center"
                  >
                    Book an Eye Test
                  </Link>
                </div>

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
                        (related) =>
                          related && (
                            <li key={related.slug}>
                              <Link
                                href={`/eye-health/conditions/${related.slug}`}
                                className="flex items-center gap-3 group"
                              >
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    categoryColors[related.category].includes(
                                      "primary"
                                    )
                                      ? "bg-[var(--color-primary)]"
                                      : categoryColors[
                                            related.category
                                          ].includes("amber")
                                        ? "bg-amber-500"
                                        : categoryColors[
                                              related.category
                                            ].includes("indigo")
                                          ? "bg-indigo-500"
                                          : "bg-red-500"
                                  }`}
                                />
                                <span className="text-sm text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">
                                  {related.name}
                                </span>
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )}

                {/* Related eye tests */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Detecting {condition.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The following eye tests can help detect signs of{" "}
                    {condition.name.toLowerCase()}:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
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
                      Standard eye test
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
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
                      OCT retinal scan
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
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
                      Visual field test
                    </li>
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
              Early detection is key. A routine eye test can identify signs of{" "}
              {condition.name.toLowerCase()} before symptoms become noticeable.
              Book yours today.
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
