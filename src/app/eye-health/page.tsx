import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  eyeConditions,
  eyeHealthGuides,
  type EyeConditionCategory,
  type EyeHealthGuideCategory,
} from "@/data/eye-health";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Eye Health — Conditions, Guides & Expert Advice | eyetest.co.uk",
  description:
    "Learn about common eye conditions, their symptoms and treatments, plus expert guides on eye health, NHS eye tests, and when to see an optician. Evidence-based advice from UK eye care professionals.",
  keywords: [
    "eye health",
    "eye conditions",
    "eye health guide",
    "eye symptoms",
    "eye care UK",
    "glaucoma",
    "cataracts",
    "dry eye",
    "macular degeneration",
    "eye test advice",
  ],
  openGraph: {
    title: "Eye Health — Conditions, Guides & Expert Advice | eyetest.co.uk",
    description:
      "Learn about common eye conditions, their symptoms and treatments, plus expert guides on eye health, NHS eye tests, and when to see an optician.",
    url: "https://eyetest.co.uk/eye-health",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/eye-health",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const categoryLabels: Record<EyeConditionCategory, string> = {
  common: "Common",
  "age-related": "Age-related",
  refractive: "Refractive",
  urgent: "Urgent",
};

const categoryColors: Record<EyeConditionCategory, string> = {
  common: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  "age-related": "bg-amber-100 text-amber-700",
  refractive: "bg-indigo-100 text-indigo-700",
  urgent: "bg-red-100 text-red-700",
};

const guideCategoryLabels: Record<EyeHealthGuideCategory, string> = {
  "how-to": "How-to",
  advice: "Advice",
  nhs: "NHS",
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

export default function EyeHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Eye Health — Conditions, Guides & Expert Advice",
    description:
      "Learn about common eye conditions, their symptoms and treatments, plus expert guides on eye health, NHS eye tests, and when to see an optician.",
    url: "https://eyetest.co.uk/eye-health",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: eyeConditions.map((condition, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://eyetest.co.uk/eye-health/conditions/${condition.slug}`,
        name: condition.name,
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
        name: "Eye Health",
        item: "https://eyetest.co.uk/eye-health",
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
        <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Eye Health" }]}>
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              {eyeConditions.length} conditions &middot;{" "}
              {eyeHealthGuides.length} guides
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eye Health{" "}
            <span className="text-[var(--color-primary-light)]">
              Information
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Evidence-based information about eye conditions, symptoms, and
            treatments, plus expert guides to help you look after your sight.
            Written by UK eye care professionals.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#conditions"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all"
            >
              Eye Conditions
            </a>
            <a
              href="#guides"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all"
            >
              Guides &amp; Advice
            </a>
          </div>
        </PageHero>

        {/* Eye Conditions */}
        <section id="conditions" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Eye Conditions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn about common eye conditions, their symptoms, causes, and
                treatment options. Early detection through regular eye tests is
                the best way to protect your vision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eyeConditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/eye-health/conditions/${condition.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-lg">
                      {condition.name}
                    </h3>
                    <span
                      className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[condition.category]}`}
                    >
                      {categoryLabels[condition.category]}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {condition.overview.slice(0, 180)}
                    {condition.overview.length > 180 ? "..." : ""}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{condition.affectedAge}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Learn more
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
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Guides & Advice */}
        <section id="guides" className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Guides &amp; Advice
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Practical, expert-written guides covering everything from how
                often to have an eye test to understanding your prescription and
                NHS eligibility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eyeHealthGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/eye-health/guides/${guide.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-lg">
                      {guide.title}
                    </h3>
                    <span
                      className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${guideCategoryColors[guide.category]}`}
                    >
                      {guideCategoryLabels[guide.category]}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {guide.summary}
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Read guide
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
                  </span>
                </Link>
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
              Protect your vision with a regular eye test
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Many serious eye conditions develop without noticeable symptoms.
              A routine eye test can detect problems early, when treatment is
              most effective. Book yours today.
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
      </main>
      <Footer />
    </>
  );
}
