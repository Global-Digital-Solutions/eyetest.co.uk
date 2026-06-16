import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerItem } from "./ScrollReveal";
import { getAllArticles } from "@/data/articles";

/* ------------------------------------------------------------------ */
/*  Category badge colour map                                         */
/* ------------------------------------------------------------------ */

const categoryColors: Record<string, string> = {
  "Eye Health": "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  Guides: "bg-indigo-100 text-indigo-700",
  NHS: "bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)]",
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function ArticlesBlock() {
  const articles = getAllArticles();

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Latest Guides &amp; Advice
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Expert advice on eye tests, eye health, and finding the right
              optician
            </p>
          </div>
        </ScrollReveal>

        {/* Card grid */}
        <ScrollReveal
          stagger={100}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {articles.map((article) => (
            <StaggerItem key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="group card-lift flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] img-zoom">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {/* Category badge */}
                  <span
                    className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${
                      categoryColors[article.category] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Text content */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <h3
                    className="text-base sm:text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Footer: read time + link */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {article.readTime}
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
            </StaggerItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
