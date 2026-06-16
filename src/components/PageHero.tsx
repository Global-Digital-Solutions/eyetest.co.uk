/**
 * Shared hero component for all content pages.
 *
 * Renders a full-width hero with a background photo of an eye test,
 * a dark overlay for text contrast, and teal accent glows.
 * Pass any content (breadcrumbs, headings, search forms) as children.
 */

import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type Breadcrumb = {
  label: string;
  href?: string; // omit href for the current (last) crumb
};

type PageHeroProps = {
  /** Breadcrumb trail — last item is the current page (no link) */
  breadcrumbs?: Breadcrumb[];
  /** Page content rendered inside the hero */
  children: React.ReactNode;
  /** Slightly reduce vertical padding for secondary pages */
  compact?: boolean;
  /** Custom background image URL (defaults to Unsplash medical photo) */
  backgroundImage?: string;
  /** Overlay intensity — "dark" (default), "medium", or "light" */
  overlay?: "dark" | "medium" | "light";
};

/* ------------------------------------------------------------------ */
/*  Search form — reusable postcode search bar for hero sections      */
/* ------------------------------------------------------------------ */

export function HeroSearchForm({
  placeholder = "Enter your postcode, e.g. SW1A 1AA",
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <form action="/search" method="GET" className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white sm:rounded-full sm:p-1.5 sm:shadow-xl sm:shadow-black/10">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            type="text"
            name="postcode"
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 sm:py-3 text-base sm:text-lg text-[var(--color-navy)] bg-white sm:bg-transparent rounded-xl sm:rounded-full border border-gray-200 sm:border-none focus:outline-none placeholder:text-gray-400"
            aria-label="Enter your postcode"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 sm:py-3 rounded-xl sm:rounded-full transition-all hover:shadow-lg cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const OVERLAY_CLASSES = {
  dark: "from-[var(--color-navy)]/92 via-[#112247]/88 to-[var(--color-navy-light)]/92",
  medium: "from-[var(--color-navy)]/78 via-[#112247]/72 to-[var(--color-navy-light)]/78",
  light: "from-[var(--color-navy)]/65 via-[#112247]/58 to-[var(--color-navy-light)]/65",
};

export function PageHero({ breadcrumbs, children, compact, backgroundImage, overlay = "dark" }: PageHeroProps) {
  const bgUrl =
    backgroundImage ??
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      />

      {/* Overlay for text contrast */}
      <div className={`absolute inset-0 bg-gradient-to-br ${OVERLAY_CLASSES[overlay]}`} />

      {/* Teal accent glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-[0.07] blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-[0.04] blur-3xl" />

      <div
        className={`relative max-w-7xl mx-auto px-4 ${
          compact
            ? "py-12 sm:py-16 lg:py-20"
            : "py-16 sm:py-20 lg:py-24"
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
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

          {/* Page-specific content (headings, badges, search forms, etc.) */}
          {children}
        </div>
      </div>
    </section>
  );
}
