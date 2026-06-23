/**
 * Shared hero component for all content pages on hearingtest.co.uk.
 *
 * Two usage patterns:
 *  1. Pass title + description as props (listing pages)
 *  2. Pass children as JSX (detail pages with compact flag)
 */

import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type Breadcrumb = {
  label: string;
  href?: string; // omit href for the current (last) crumb
};

/** Hero background variants mapped to image files (WebP with JPG fallback) */
const heroImages: Record<string, { webp: string; jpg: string }> = {
  tests: { webp: "/images/heroes/hero-tests.webp", jpg: "/images/heroes/hero-tests.jpg" },
  audiologists: { webp: "/images/heroes/hero-audiologists.webp", jpg: "/images/heroes/hero-audiologists.jpg" },
  health: { webp: "/images/heroes/hero-health.webp", jpg: "/images/heroes/hero-health.jpg" },
  locations: { webp: "/images/heroes/hero-locations.webp", jpg: "/images/heroes/hero-locations.jpg" },
  general: { webp: "/images/heroes/hero-general.webp", jpg: "/images/heroes/hero-general.jpg" },
};

type PageHeroProps = {
  /** Page title displayed with display font (pattern 1) */
  title?: string;
  /** Supporting description text (pattern 1) */
  description?: string;
  /** Breadcrumb trail — last item is the current page (no link) */
  breadcrumbs: { label: string; href?: string }[];
  /** Smaller padding for detail pages */
  compact?: boolean;
  /** Custom children content (pattern 2 — overrides title/description) */
  children?: React.ReactNode;
  /** Background image variant: "tests" | "audiologists" | "health" | "locations" | "general" */
  variant?: keyof typeof heroImages;
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function PageHero({ title, description, breadcrumbs, compact, children, variant = "general" }: PageHeroProps) {
  const images = heroImages[variant] || heroImages.general;

  return (
    <section className="relative overflow-hidden">
      {/* Background image — WebP with JPG fallback via <picture> */}
      <picture className="absolute inset-0">
        <source srcSet={images.webp} type="image/webp" />
        <img
          src={images.jpg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      </picture>
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/50 via-[var(--color-navy)]/30 to-[var(--color-navy)]/60" />

      {/* Accent glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-[0.07] blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-[0.04] blur-3xl" />

      <div className={`relative max-w-7xl mx-auto px-4 ${compact ? "py-8 sm:py-12 lg:py-14" : "py-12 sm:py-16 lg:py-20"}`}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center justify-center gap-2 text-sm text-white/50 flex-wrap">
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {i > 0 && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-white/80 transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/80">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Content: either children or title+description */}
          {children ? (
            children
          ) : (
            <>
              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
