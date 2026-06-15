import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  opticians,
  getOpticianBySlug,
  getAllSlugs,
  getAvailableOpticians,
  type OpticianBrand,
} from "@/data/opticians";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
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
  const optician = getOpticianBySlug(slug);

  if (!optician) {
    return { title: "Optician Not Found | eyetest.co.uk" };
  }

  const title = `${optician.name} — Eye Tests, Services & Book Online | eyetest.co.uk`;
  const description = `${optician.name}: ${optician.storeCount} UK stores. ${optician.priceRange}. Compare services, check NHS availability, and book your eye test online.`;

  return {
    title,
    description,
    keywords: [
      optician.name,
      `${optician.shortName} eye test`,
      `${optician.shortName} opticians`,
      `${optician.shortName} eye test price`,
      `${optician.shortName} NHS eye test`,
      `book ${optician.shortName} eye test`,
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/opticians/${optician.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/opticians/${optician.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function OpticianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const optician = getOpticianBySlug(slug);

  if (!optician) {
    notFound();
  }

  // Related opticians: other available brands (exclude current)
  const related = getAvailableOpticians()
    .filter((o) => o.slug !== optician.slug)
    .slice(0, 3);

  // JSON-LD Organization schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: optician.name,
    url: optician.website,
    description: optician.description,
    foundingDate: optician.founded,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      name: "UK stores",
      value: optician.storeCount,
    },
    sameAs: [optician.website],
    parentOrganization: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
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

        {/* ── Brand hero ──────────────────────────────────────────────── */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Opticians", href: "/opticians" },
            { label: optician.name },
          ]}
          compact
        >
              {/* Brand accent pill */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: optician.brandColor }}
                />
                <span className="text-sm font-medium text-white/60">
                  Est. {optician.founded}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {optician.name}
              </h1>

              <div className="flex items-center justify-center gap-6 text-white/70 text-sm sm:text-base">
                <span className="flex items-center gap-1.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {optician.storeCount.toLocaleString()} UK stores
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {optician.priceRange}
                </span>
                {optician.nhsAvailable && (
                  <span className="flex items-center gap-1.5 text-[var(--color-nhs-blue)]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    NHS Available
                  </span>
                )}
              </div>
        </PageHero>

        {/* ── Brand info ──────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Description — spans 2 cols */}
            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-4">
                About {optician.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {optician.description}
              </p>
            </div>

            {/* Quick facts card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
                Quick Facts
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Founded</dt>
                  <dd className="font-medium text-[var(--color-navy)]">{optician.founded}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">UK Stores</dt>
                  <dd className="font-medium text-[var(--color-navy)]">{optician.storeCount.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Price Range</dt>
                  <dd className="font-medium text-[var(--color-navy)]">{optician.priceRange}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">NHS Eye Tests</dt>
                  <dd className="font-medium text-[var(--color-navy)]">{optician.nhsAvailable ? "Yes" : "No"}</dd>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <dt className="text-gray-500 mb-1">Website</dt>
                  <dd>
                    <a
                      href={optician.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-primary)] hover:underline font-medium text-sm break-all"
                    >
                      {optician.website.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ── Services grid ───────────────────────────────────────────── */}
        <section className="bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-8 text-center">
              Services Offered
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {optician.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200"
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${optician.brandColor}15` }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: optician.brandColor }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-navy)]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Highlights ──────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-8 text-center">
            Why Choose {optician.shortName}?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {optician.highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl bg-white border border-gray-200"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: optician.brandColor }}
                >
                  {i + 1}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pt-2">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NHS availability ────────────────────────────────────────── */}
        {optician.nhsAvailable && (
          <section className="bg-[var(--color-nhs-blue)]/5 border-y border-[var(--color-nhs-blue)]/10">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
              <div className="flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto text-center sm:text-left">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--color-nhs-blue)]/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[var(--color-nhs-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] mb-1">
                    NHS Eye Tests Available
                  </h3>
                  <p className="text-sm text-gray-600">
                    {optician.name} offers free NHS-funded eye tests for
                    eligible patients. You may qualify if you&apos;re under 16,
                    over 60, on certain benefits, or have specific medical
                    conditions. Check eligibility and book through
                    eyetest.co.uk.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA — available vs coming soon ─────────────────────────── */}
        <section className="relative overflow-hidden">
          {optician.available ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[#0b8a86]" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl" />
              <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-4">
                  Find a {optician.shortName} Near You
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Enter your postcode to check availability and book an eye test
                  at your nearest {optician.shortName} store.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[var(--color-primary)] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find a {optician.shortName} Opticians Near You
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
              <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-300/30 mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                  {optician.shortName} &mdash; Coming Soon
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto mb-8">
                  We&apos;re working on adding {optician.name} to
                  eyetest.co.uk. Once available, you&apos;ll be able to compare
                  prices and book appointments at their{" "}
                  {optician.storeCount.toLocaleString()} UK locations directly
                  through our platform.
                </p>
                <Link
                  href="/opticians"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Browse Available Opticians
                </Link>
              </div>
            </>
          )}
        </section>

        {/* ── Related opticians ───────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-8 text-center">
              Other Opticians to Compare
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/opticians/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: rel.brandColor }}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                        {rel.name}
                      </h3>
                      {rel.nhsAvailable && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-nhs-blue)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-nhs-blue)]">
                          NHS
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {rel.storeCount.toLocaleString()} stores &middot;{" "}
                      {rel.priceRange}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-3 transition-all">
                      Compare
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
