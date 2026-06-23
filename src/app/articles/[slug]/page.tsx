import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getAllArticles,
} from "@/data/articles";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllArticleSlugs().map((slug) => ({ slug }));
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
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | eyetest.co.uk" };
  }

  const title = article.title;
  const description = article.excerpt;

  return {
    title,
    description,
    keywords: [
      article.title.toLowerCase(),
      "eye test",
      "eye health",
      "optician",
      "UK eye test",
      article.category.toLowerCase(),
    ],
    openGraph: {
      title,
      description,
      url: `https://www.eyetest.co.uk/articles/${article.slug}`,
      siteName: "eyetest.co.uk",
      type: "article",
      images: [
        {
          url: `https://www.eyetest.co.uk${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    alternates: {
      canonical: `https://www.eyetest.co.uk/articles/${article.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Category badge colours
// ---------------------------------------------------------------------------

const categoryColors: Record<string, string> = {
  "Eye Health": "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  Guides: "bg-indigo-100 text-indigo-700",
  NHS: "bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)]",
};

// ---------------------------------------------------------------------------
// Content renderer — splits on \n\n and handles ## headings
// ---------------------------------------------------------------------------

function renderContent(content: string) {
  const blocks = content.split("\n\n").filter((b) => b.trim());

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mt-10 mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    return (
      <p key={i} className="text-gray-700 leading-relaxed mb-5">
        {trimmed}
      </p>
    );
  });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Other articles for the "More articles" grid at the bottom
  const otherArticles = getAllArticles().filter((a) => a.slug !== slug);

  // Formatted publish date
  const publishDate = new Date(article.publishDate);
  const formattedDate = publishDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `https://www.eyetest.co.uk${article.image}`,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    url: `https://www.eyetest.co.uk/articles/${article.slug}`,
    author: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
      logo: {
        "@type": "ImageObject",
        url: "https://www.eyetest.co.uk/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.eyetest.co.uk/articles/${article.slug}`,
    },
    articleSection: article.category,
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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://www.eyetest.co.uk/articles/${article.slug}`,
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
            { label: "Articles", href: "/articles" },
            { label: article.title },
          ]}
          compact
        >
          {/* Category badge */}
          <div
            className={`inline-flex items-center text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-4 ${
              categoryColors[article.category] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {article.category}
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-6">
            {article.excerpt}
          </p>

          {/* Meta line */}
          <div className="flex items-center justify-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {formattedDate}
            </span>
            <span className="w-px h-3.5 bg-white/20" />
            <span className="flex items-center gap-1.5">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {article.readTime}
            </span>
          </div>
        </PageHero>

        {/* Content + sidebar */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2">
                {/* Hero image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <article className="prose prose-gray max-w-none">
                  {renderContent(article.content)}
                </article>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Search CTA */}
                <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-2xl p-6">
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Find an optician near you
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Compare prices, check availability, and book an eye test
                    online in seconds.
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
                    Search Opticians
                  </Link>
                </div>

                {/* Related articles */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Related Articles
                  </h3>
                  <ul className="space-y-3">
                    {otherArticles.slice(0, 4).map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/articles/${other.slug}`}
                          className="flex items-start gap-3 group"
                        >
                          <span className="w-2 h-2 rounded-full shrink-0 mt-2 bg-[var(--color-primary)]" />
                          <span className="text-sm text-gray-700 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                            {other.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
              </aside>
            </div>
          </div>
        </section>

        {/* More articles grid */}
        {otherArticles.length > 0 && (
          <section className="py-16 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  More articles
                </h2>
                <p className="text-gray-500 max-w-lg mx-auto">
                  Continue reading our expert guides on eye tests and eye health
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {otherArticles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/articles/${other.slug}`}
                    className="group card-lift flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full"
                  >
                    <div className="relative aspect-[16/10] img-zoom">
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <span
                        className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${
                          categoryColors[other.category] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {other.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <h3
                        className="text-base sm:text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {other.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {other.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {other.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                          Read more
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
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Protect your vision with a regular eye test
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Regular eye tests are the best way to detect problems early.
              Compare opticians and book online for free.
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
