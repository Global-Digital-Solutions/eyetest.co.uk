import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getAllProviderSlugs,
  getProviderBySlug,
} from "@/data/surgery-providers";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllProviderSlugs().map((slug) => ({ slug }));
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
  const provider = getProviderBySlug(slug);

  if (!provider) {
    return { title: "Provider Not Found | eyetest.co.uk" };
  }

  const title = `${provider.name} — Eye Surgery, Prices & Clinic Locations`;
  const description = `${provider.name}: ${provider.storeCount} UK clinics. ${provider.nhsFunded ? "NHS-funded and private" : "Private"} eye surgery including ${provider.services.map((s) => s.name).slice(0, 3).join(", ")}. ${provider.googleReview.rating}★ Google rating from ${provider.googleReview.reviewCount.toLocaleString()}+ reviews. Compare services and book online.`;

  return {
    title,
    description,
    keywords: [
      provider.name,
      `${provider.name} eye surgery`,
      `${provider.name} reviews`,
      `${provider.name} clinics`,
      `${provider.name} prices`,
      `${provider.name} NHS`,
      "eye surgery UK",
      "eye surgery near me",
    ],
    openGraph: {
      title,
      description,
      url: `https://www.eyetest.co.uk/eye-surgery/providers/${provider.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://www.eyetest.co.uk/eye-surgery/providers/${provider.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Star rating helper
// ---------------------------------------------------------------------------

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-5 h-5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className="w-5 h-5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Provider hero background images — high-quality clinical/medical photos
// ---------------------------------------------------------------------------

const HERO_BACKGROUNDS: Record<string, string> = {
  "new-medica":
    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1920&q=80",
  "spa-medica":
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
  optegra:
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?auto=format&fit=crop&w=1920&q=80",
  chec:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
  "moorfields-private":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
};

const DEFAULT_HERO_BG =
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1920&q=80";

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SurgeryProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const heroBg = HERO_BACKGROUNDS[provider.slug] ?? DEFAULT_HERO_BG;

  // ---------------------------------------------------------------------------
  // JSON-LD schemas
  // ---------------------------------------------------------------------------

  const medicalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: provider.name,
    description: provider.about,
    url: provider.website,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    numberOfLocations: provider.storeCount,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.googleReview.rating,
      reviewCount: provider.googleReview.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    medicalSpecialty: "Ophthalmology",
    availableService: provider.services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service.name,
      description: service.description,
    })),
    parentOrganization: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
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
        name: "Eye Surgery",
        item: "https://www.eyetest.co.uk/eye-surgery",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Providers",
        item: "https://www.eyetest.co.uk/eye-surgery/providers",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: provider.name,
        item: `https://www.eyetest.co.uk/eye-surgery/providers/${provider.slug}`,
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* ================================================================ */}
        {/* Custom provider hero — full-width photo with overlay + stats     */}
        {/* ================================================================ */}
        <section className="relative overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroBg}')` }}
          />

          {/* Dark gradient overlay with brand colour tint */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(13,27,62,0.92) 0%, ${provider.brandColor}33 50%, rgba(13,27,62,0.88) 100%)`,
            }}
          />

          {/* Decorative glow using provider brand colour */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.12] blur-[100px]"
            style={{ backgroundColor: provider.brandColor }}
          />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-[0.06] blur-[80px]" />

          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-white/50 flex-wrap">
                {[
                  { label: "Home", href: "/" },
                  { label: "Eye Surgery", href: "/eye-surgery" },
                  { label: "Providers" },
                  { label: provider.name },
                ].map((crumb, i) => (
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

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              {/* Left: Provider name + badge */}
              <div className="max-w-2xl">
                {/* Preferred partner badge */}
                {provider.isPreferredPartner && (
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-full mb-6"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "white",
                      boxShadow: "0 4px 15px rgba(245, 158, 11, 0.35)",
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                    Preferred Partner
                  </div>
                )}

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {provider.name}
                </h1>

                <p className="text-lg sm:text-xl text-white/60 max-w-lg">
                  {provider.nhsFunded ? "NHS & Private" : "Private"} eye surgery
                  at {provider.storeCount} clinics across the UK
                </p>
              </div>

              {/* Right: Floating stat cards */}
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {/* Rating card */}
                <div className="bg-white/[0.1] backdrop-blur-md border border-white/[0.12] rounded-2xl px-5 py-4 text-center min-w-[100px]">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <svg className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-2xl font-bold text-white">{provider.googleReview.rating}</span>
                  </div>
                  <p className="text-xs text-white/50 font-medium">{provider.googleReview.reviewCount.toLocaleString()} reviews</p>
                </div>

                {/* Clinics card */}
                <div className="bg-white/[0.1] backdrop-blur-md border border-white/[0.12] rounded-2xl px-5 py-4 text-center min-w-[100px]">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <svg className="w-5 h-5 text-[var(--color-primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-2xl font-bold text-white">{provider.storeCount}</span>
                  </div>
                  <p className="text-xs text-white/50 font-medium">UK clinics</p>
                </div>

                {/* NHS badge */}
                {provider.nhsFunded && (
                  <div className="bg-white/[0.1] backdrop-blur-md border border-white/[0.12] rounded-2xl px-5 py-4 text-center min-w-[100px]">
                    <div className="flex items-center justify-center mb-1">
                      <svg className="w-6 h-6 text-[var(--color-primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <p className="text-xs text-white/50 font-medium">NHS funded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Preferred partner recommendation bar */}
        {provider.isPreferredPartner && (
          <section
            className="border-b"
            style={{
              background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)",
              borderColor: "#fbbf24",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5 sm:py-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-amber-900">
                    {provider.name} is an eyetest.co.uk Preferred Partner
                  </p>
                  <p className="text-xs sm:text-sm text-amber-800/70">
                    We recommend {provider.name} for their outstanding patient
                    care, clinical expertise, and transparent pricing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* About */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    About {provider.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {provider.about}
                  </p>
                </div>

                {/* Key Facts */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Key Facts
                  </h2>
                  <ul className="space-y-3">
                    {provider.keyFacts.map((fact) => (
                      <li
                        key={fact}
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
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services & Pricing */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Services &amp; Pricing
                  </h2>
                  <div className="space-y-4">
                    {provider.services.map((service) => (
                      <div
                        key={service.slug}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-base sm:text-lg font-bold text-[var(--color-navy)]">
                            {service.name}
                          </h3>
                          <Link
                            href={`/eye-surgery/${service.slug}`}
                            className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] whitespace-nowrap transition-colors"
                          >
                            Learn more
                          </Link>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Pricing
                          </p>
                          <p className="text-sm text-[var(--color-navy)] font-medium">
                            {service.pricing}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinic Locations */}
                {provider.clinics.length > 0 && (
                  <div>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-6"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Clinic Locations
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {provider.name} operates {provider.clinics.length} clinics
                      across the UK.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {provider.clinics.map((clinic) => (
                        <div
                          key={clinic.slug}
                          className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-sm font-bold text-[var(--color-navy)] mb-2">
                            {clinic.name}
                          </h3>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <svg
                                className="w-4 h-4 text-gray-400 shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                              </svg>
                              <span>{clinic.address}</span>
                            </div>
                            {clinic.postcode && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <svg
                                  className="w-4 h-4 text-gray-400 shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                  />
                                </svg>
                                <span>{clinic.postcode}</span>
                              </div>
                            )}
                            {clinic.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <svg
                                  className="w-4 h-4 text-gray-400 shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                  />
                                </svg>
                                <a
                                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                                  className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors"
                                >
                                  {clinic.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Google Review Badge */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-500">
                      Google Reviews
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-[var(--color-navy)] mb-1">
                    {provider.googleReview.rating}
                  </div>
                  <div className="flex justify-center mb-2">
                    <StarRating rating={provider.googleReview.rating} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Based on{" "}
                    {provider.googleReview.reviewCount.toLocaleString()} reviews
                  </p>
                </div>

                {/* NHS / Private badges */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Funding Options
                  </h3>
                  <div className="space-y-3">
                    {provider.nhsFunded && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-nhs-blue)]/10 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-[var(--color-nhs-blue)]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[var(--color-navy)]">
                            NHS-Funded
                          </span>
                          <p className="text-xs text-gray-500">
                            Free via GP/optometrist referral
                          </p>
                        </div>
                      </div>
                    )}
                    {provider.privateSelfPay && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                          <svg
                            className="w-4 h-4 text-[var(--color-primary)]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[var(--color-navy)]">
                            Private Self-Pay
                          </span>
                          <p className="text-xs text-gray-500">
                            Self-funded or insurance
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    At a Glance
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        UK Clinics
                      </dt>
                      <dd className="text-sm text-gray-700 font-medium">
                        {provider.storeCount}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Services
                      </dt>
                      <dd className="text-sm text-gray-700">
                        {provider.services.map((s) => s.name).join(", ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Website
                      </dt>
                      <dd>
                        <a
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors"
                        >
                          {provider.website.replace(/^https?:\/\//, "")}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Book CTA */}
                <div
                  className="rounded-2xl p-6 text-center overflow-hidden relative"
                  style={{
                    background: `linear-gradient(135deg, #0d1b3e 0%, ${provider.brandColor}88 100%)`,
                  }}
                >
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
                    style={{ backgroundColor: provider.brandColor }}
                  />
                  <div className="relative">
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
                      Book with {provider.name}
                    </h3>
                    <p className="text-sm text-white/70 mb-4">
                      Visit {provider.name}&apos;s website to book a consultation
                      or find your nearest clinic.
                    </p>
                    <a
                      href={provider.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg w-full justify-center"
                    >
                      Book with {provider.name}
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
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Eye Surgery */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Link
              href="/eye-surgery"
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
              Back to Eye Surgery
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
