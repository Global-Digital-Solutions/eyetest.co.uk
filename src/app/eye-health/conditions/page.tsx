import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  eyeConditions,
  type EyeConditionCategory,
} from "@/data/eye-health";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Eye Conditions — Symptoms, Causes & Treatments | eyetest.co.uk",
  description:
    "Browse all 15 eye conditions with symptoms, causes, and treatment options. From common conditions like dry eye and conjunctivitis to age-related conditions such as cataracts and glaucoma. Evidence-based advice from UK eye care professionals.",
  keywords: [
    "eye conditions",
    "eye conditions list",
    "eye problems",
    "eye disease symptoms",
    "eye conditions UK",
    "glaucoma",
    "cataracts",
    "dry eye syndrome",
    "macular degeneration",
    "conjunctivitis",
    "myopia",
    "astigmatism",
  ],
  openGraph: {
    title: "Eye Conditions — Symptoms, Causes & Treatments | eyetest.co.uk",
    description:
      "Browse all 15 eye conditions with symptoms, causes, and treatment options. Evidence-based information from UK eye care professionals.",
    url: "https://www.eyetest.co.uk/eye-health/conditions",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/eye-health/conditions",
  },
};

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

export default function ConditionsListingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Eye Conditions — Symptoms, Causes & Treatments",
    description:
      "Browse all eye conditions with symptoms, causes, and treatment options. Evidence-based information from UK eye care professionals.",
    url: "https://www.eyetest.co.uk/eye-health/conditions",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: eyeConditions.length,
      itemListElement: eyeConditions.map((condition, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: condition.name,
        url: `https://www.eyetest.co.uk/eye-health/conditions/${condition.slug}`,
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
        name: "Eye Health",
        item: "https://www.eyetest.co.uk/eye-health",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Conditions",
        item: "https://www.eyetest.co.uk/eye-health/conditions",
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
            { label: "Conditions" },
          ]}
          compact
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{eyeConditions.length} conditions covered</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eye{" "}
            <span className="text-[var(--color-primary-light)]">
              Conditions
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Learn about common eye conditions, their symptoms, causes, and
            treatment options. Early detection through regular eye tests is
            the best way to protect your vision.
          </p>
        </PageHero>

        {/* Conditions grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eyeConditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/eye-health/conditions/${condition.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-lg">
                      {condition.name}
                    </h2>
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
