import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/data/articles";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Articles — Eye Care Guides & Advice | eyetest.co.uk",
  description:
    "Browse expert articles on eye tests, eye health, prescriptions, and NHS entitlements. Practical, evidence-based guides written for UK patients.",
  keywords: [
    "eye test articles",
    "eye care guides",
    "eye health advice",
    "NHS eye test guide",
    "eye test UK",
    "eye prescription explained",
    "children eye test",
    "optician advice",
  ],
  openGraph: {
    title: "Articles — Eye Care Guides & Advice | eyetest.co.uk",
    description:
      "Browse expert articles on eye tests, eye health, prescriptions, and NHS entitlements. Practical, evidence-based guides written for UK patients.",
    url: "https://www.eyetest.co.uk/articles",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/articles",
  },
};

// ---------------------------------------------------------------------------
// Category badge colours
// ---------------------------------------------------------------------------

const categoryColors: Record<string, string> = {
  "Eye Health": "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  Guides: "bg-indigo-100 text-indigo-700",
  NHS: "bg-[var(--color-nhs-blue,#005eb8)]/10 text-[var(--color-nhs-blue,#005eb8)]",
};

function getCategoryColor(category: string): string {
  return categoryColors[category] ?? "bg-gray-100 text-gray-700";
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ArticlesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles — Eye Care Guides & Advice",
    description:
      "Browse expert articles on eye tests, eye health, prescriptions, and NHS entitlements.",
    url: "https://www.eyetest.co.uk/articles",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.eyetest.co.uk/articles/${article.slug}`,
        name: article.title,
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
        name: "Articles",
        item: "https://www.eyetest.co.uk/articles",
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
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Articles" }]}
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <span>{articles.length} articles</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eye Care{" "}
            <span className="text-[var(--color-primary-light)]">Articles</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Practical, evidence-based guides covering everything from how often
            to have an eye test to understanding your prescription and NHS
            eligibility.
          </p>
        </PageHero>

        {/* Article listing */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-lg">
                      {article.title}
                    </h2>
                    <span
                      className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(article.category)}`}
                    >
                      {article.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{article.readTime}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Read article
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
              Ready to book your eye test?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Find trusted opticians near you, compare prices, and book an
              appointment online in seconds.
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
              Find an Optician
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
