import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  opticians,
  getOpticianBySlug,
  getAllSlugs as getAllOpticianSlugs,
  getAvailableOpticians,
  getUnavailableOpticians,
  type OpticianBrand,
} from "@/data/opticians";
import {
  locations,
  getLocationBySlug,
  getAllSlugs as getAllLocationSlugs,
  type UKLocation,
} from "@/data/locations";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static generation — every brand x location combination
// ---------------------------------------------------------------------------

export function generateStaticParams(): { brand: string; location: string }[] {
  const brandSlugs = getAllOpticianSlugs();
  const locationSlugs = getAllLocationSlugs();

  return brandSlugs.flatMap((brand) =>
    locationSlugs.map((location) => ({ brand, location }))
  );
}

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; location: string }>;
}): Promise<Metadata> {
  const { brand, location } = await params;
  const optician = getOpticianBySlug(brand);
  const loc = getLocationBySlug(location);

  if (!optician || !loc) {
    return { title: "Not Found | eyetest.co.uk" };
  }

  const title = optician.available
    ? `${optician.name} Eye Test ${loc.name} — Book Your Eye Test | eyetest.co.uk`
    : `${optician.shortName} Eye Test ${loc.name} — Alternatives & Availability | eyetest.co.uk`;

  const description = optician.available
    ? `Book a ${optician.shortName} eye test in ${loc.name}. ${optician.priceRange}. NHS tests available. Compare availability and book online through eyetest.co.uk.`
    : `${optician.shortName} eye tests in ${loc.name} are not available online. Compare ${getAvailableOpticians().length} alternative opticians in ${loc.name} with instant online booking.`;

  return {
    title,
    description,
    keywords: [
      `${optician.shortName} eye test ${loc.name}`,
      `${optician.shortName} ${loc.name}`,
      `${optician.name} ${loc.name}`,
      `eye test ${loc.name}`,
      `opticians ${loc.name}`,
      `${optician.shortName} eye test near me`,
      `book eye test ${loc.name}`,
      `NHS eye test ${loc.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BrandLocationPage({
  params,
}: {
  params: Promise<{ brand: string; location: string }>;
}) {
  const { brand, location } = await params;
  const optician = getOpticianBySlug(brand);
  const loc = getLocationBySlug(location);

  if (!optician || !loc) {
    notFound();
  }

  const availableOpticians = getAvailableOpticians().filter(
    (o) => o.slug !== optician.slug
  );
  const unavailableOpticians = getUnavailableOpticians().filter(
    (o) => o.slug !== optician.slug
  );

  // Nearby locations with valid data
  const nearbyLocations = loc.nearbyAreas
    .map((slug) => getLocationBySlug(slug))
    .filter(Boolean) as UKLocation[];

  // Other brands in same location (mix of available and unavailable)
  const otherBrands = opticians.filter((o) => o.slug !== optician.slug);

  // ---------------------------------------------------------------------------
  // JSON-LD structured data
  // ---------------------------------------------------------------------------

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
        name: "Opticians",
        item: "https://eyetest.co.uk/opticians",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: optician.name,
        item: `https://eyetest.co.uk/opticians/${optician.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: loc.name,
        item: `https://eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${optician.name} ${loc.name}`,
    description: optician.description,
    url: `https://eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: loc.name,
      addressRegion: loc.county,
      addressCountry: "GB",
      postalCode: loc.postcode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.lat,
      longitude: loc.lng,
    },
    parentOrganization: {
      "@type": "Organization",
      name: optician.name,
      url: optician.website,
    },
    priceRange: optician.priceRange,
  };

  const faqItems = optician.available
    ? [
        {
          q: `How much does a ${optician.shortName} eye test cost in ${loc.name}?`,
          a: `${optician.shortName} eye tests in ${loc.name} are priced at ${optician.priceRange}. Many patients qualify for free NHS-funded eye tests. You can compare prices and book online through eyetest.co.uk.`,
        },
        {
          q: `Does ${optician.shortName} in ${loc.name} offer NHS eye tests?`,
          a: optician.nhsAvailable
            ? `Yes, ${optician.shortName} in ${loc.name} offers NHS-funded eye tests for eligible patients. Eligibility includes being under 16, over 60, on certain benefits, or having specific medical conditions.`
            : `${optician.shortName} in ${loc.name} primarily offers private eye tests. Check eyetest.co.uk for NHS-registered opticians near ${loc.postcode}.`,
        },
        {
          q: `What services does ${optician.shortName} offer in ${loc.name}?`,
          a: `${optician.shortName} in ${loc.name} offers: ${optician.services.join(", ")}. Book your appointment through eyetest.co.uk to check real-time availability.`,
        },
        {
          q: `Can I book a same-day eye test at ${optician.shortName} in ${loc.name}?`,
          a: `Same-day appointments may be available at ${optician.shortName} in ${loc.name}. Search on eyetest.co.uk with the postcode ${loc.postcode} to see current appointment availability.`,
        },
        {
          q: `Are there other opticians near ${optician.shortName} in ${loc.name}?`,
          a: `Yes, there are ${availableOpticians.length} other opticians available to book in ${loc.name}, including ${availableOpticians.slice(0, 3).map((o) => o.name).join(", ")}. Compare them all on eyetest.co.uk.`,
        },
      ]
    : [
        {
          q: `Why can't I book a ${optician.shortName} eye test through eyetest.co.uk?`,
          a: `${optician.shortName} is not currently available for online booking through eyetest.co.uk. However, there are ${availableOpticians.length} excellent alternative opticians in ${loc.name} that you can book with instantly, including ${availableOpticians.slice(0, 3).map((o) => o.name).join(", ")}.`,
        },
        {
          q: `Are there alternatives to ${optician.shortName} in ${loc.name}?`,
          a: `Yes! ${loc.name} has ${availableOpticians.length} opticians available to book online right now. These include both well-known high-street brands and trusted independent practices. Many offer the same services as ${optician.shortName}, often with shorter waiting times and more personal service.`,
        },
        {
          q: `Do independent opticians offer the same tests as ${optician.shortName}?`,
          a: `Yes. Independent and smaller-chain opticians use the same professional equipment and follow the same clinical standards as ${optician.shortName}. Many actually invest in more advanced diagnostic technology like OCT scanning. All optometrists in the UK are regulated by the General Optical Council to the same standards regardless of where they practise.`,
        },
        {
          q: `How much do eye tests cost at alternatives to ${optician.shortName} in ${loc.name}?`,
          a: `Eye test prices at alternative opticians in ${loc.name} typically range from free (NHS-funded) to around £39 for a private examination. Many offer free NHS eye tests for eligible patients. Compare prices across all available opticians on eyetest.co.uk.`,
        },
        {
          q: `Is ${optician.shortName} in ${loc.name} permanently closed?`,
          a: `${optician.shortName} stores in ${loc.name} may still be open for walk-in appointments. However, online booking through eyetest.co.uk is not currently available for ${optician.shortName}. We recommend trying one of the ${availableOpticians.length} alternative opticians in ${loc.name} that offer instant online booking.`,
        },
      ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Opticians", href: "/opticians" },
            { label: optician.name, href: "/opticians/" + optician.slug },
            { label: loc.name },
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
                  {optician.shortName} &middot; {loc.name},{" "}
                  {loc.county}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {optician.shortName} Eye Test in{" "}
                <span className="text-[var(--color-primary-light)]">
                  {loc.name}
                </span>
              </h1>

              {/* Status notice */}
              {optician.available ? (
                <div className="inline-flex items-center gap-2 bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 text-[var(--color-success)] text-sm font-medium px-5 py-2.5 rounded-full mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-success)]" />
                  </span>
                  Available to book online
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium px-5 py-2.5 rounded-full mb-6">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  No online availability
                </div>
              )}

              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                {optician.available
                  ? `Compare prices and book your ${optician.shortName} eye test in ${loc.name}. NHS and private appointments available.`
                  : `${optician.shortName} eye tests in ${loc.name} are not currently available for online booking. See ${availableOpticians.length} alternative opticians below.`}
              </p>
        </PageHero>

        {/* ── Conditional content based on availability ───────────── */}
        {optician.available ? (
          <AvailableBrandContent
            optician={optician}
            location={loc}
            alternatives={availableOpticians}
            faqItems={faqItems}
          />
        ) : (
          <UnavailableBrandContent
            optician={optician}
            location={loc}
            alternatives={availableOpticians}
            faqItems={faqItems}
          />
        )}

        {/* ── Related links ──────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Same brand in nearby locations */}
            {nearbyLocations.length > 0 && (
              <div className="mb-12">
                <h2
                  className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {optician.shortName} in nearby areas
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {nearbyLocations.map((nearby) => (
                    <Link
                      key={nearby.slug}
                      href={`/opticians/${optician.slug}/${nearby.slug}`}
                      className="group flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                    >
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                        {nearby.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other brands in same location */}
            <div className="mb-12">
              <h2
                className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Other opticians in {loc.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherBrands.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/opticians/${other.slug}/${loc.slug}`}
                    className="text-sm text-gray-600 hover:text-[var(--color-primary)] bg-gray-50 hover:bg-[var(--color-primary)]/5 px-4 py-2 rounded-full border border-gray-100 hover:border-[var(--color-primary)]/20 transition-all flex items-center gap-2"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: other.brandColor }}
                    />
                    {other.shortName}
                    {other.available && (
                      <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Back links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href={`/opticians/${optician.slug}`}
                className="inline-flex items-center gap-2 font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
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
                All {optician.shortName} locations
              </Link>
              <Link
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center gap-2 font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
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
                Eye tests in {loc.name}
              </Link>
              <Link
                href="/opticians"
                className="inline-flex items-center gap-2 font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
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
                All opticians
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// =============================================================================
// AVAILABLE BRAND CONTENT
// =============================================================================

function AvailableBrandContent({
  optician,
  location,
  alternatives,
  faqItems,
}: {
  optician: OpticianBrand;
  location: UKLocation;
  alternatives: OpticianBrand[];
  faqItems: { q: string; a: string }[];
}) {
  return (
    <>
      {/* ── Brand info card ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-4">
              About {optician.name} in {location.name}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              {optician.description}
            </p>

            {/* Services */}
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              Services available in {location.name}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {optician.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
                >
                  <svg
                    className="w-4 h-4 text-[var(--color-success)] shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-[var(--color-navy)]">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick facts card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-fit">
            <div
              className="h-1.5 w-full rounded-full mb-5"
              style={{ backgroundColor: optician.brandColor }}
            />
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              {optician.shortName} {location.name}
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Price Range</dt>
                <dd className="font-medium text-[var(--color-navy)]">
                  {optician.priceRange}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">NHS Eye Tests</dt>
                <dd className="font-medium text-[var(--color-navy)]">
                  {optician.nhsAvailable ? "Yes" : "No"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">UK Stores</dt>
                <dd className="font-medium text-[var(--color-navy)]">
                  {optician.storeCount.toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Founded</dt>
                <dd className="font-medium text-[var(--color-navy)]">
                  {optician.founded}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Area Postcode</dt>
                <dd className="font-medium text-[var(--color-navy)]">
                  {location.postcode}
                </dd>
              </div>
            </dl>

            {/* Book CTA */}
            <Link
              href={`/search?postcode=${encodeURIComponent(location.postcode)}`}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
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
              Book eye test in {location.name}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Book now CTA ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[#0b8a86]" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mb-4">
            Book your {optician.shortName} eye test in {location.name}
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Enter your postcode to check appointment availability and book
            online.
          </p>
          <form action="/search" method="GET" className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white sm:rounded-full sm:p-1.5 sm:shadow-xl sm:shadow-black/10">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="postcode"
                  defaultValue={location.postcode}
                  placeholder="Enter your postcode"
                  className="w-full pl-12 pr-4 py-4 sm:py-3 text-base sm:text-lg text-[var(--color-navy)] bg-white sm:bg-transparent rounded-xl sm:rounded-full border border-gray-200 sm:border-none focus:outline-none placeholder:text-gray-400"
                  aria-label="Enter your postcode"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 sm:py-3 rounded-xl sm:rounded-full transition-all hover:shadow-lg cursor-pointer sm:bg-[var(--color-navy)] sm:hover:bg-[var(--color-navy-light)]"
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
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Other available opticians ─────────────────────────────── */}
      {alternatives.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Other opticians in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compare other opticians available in the {location.name} area
                and find the best fit for your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alternatives.slice(0, 6).map((alt) => (
                <OpticianCard
                  key={alt.slug}
                  optician={alt}
                  location={location}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <FAQSection
        title={`${optician.shortName} ${location.name} FAQs`}
        items={faqItems}
      />
    </>
  );
}

// =============================================================================
// UNAVAILABLE BRAND CONTENT
// =============================================================================

function UnavailableBrandContent({
  optician,
  location,
  alternatives,
  faqItems,
}: {
  optician: OpticianBrand;
  location: UKLocation;
  alternatives: OpticianBrand[];
  faqItems: { q: string; a: string }[];
}) {
  return (
    <>
      {/* ── No availability notice + brand description ────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Unavailability notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-amber-900 mb-2">
                  {optician.shortName} eye tests in {location.name} &mdash; No
                  online availability
                </h2>
                <p className="text-sm text-amber-800 leading-relaxed">
                  {optician.name} is not currently available for online booking
                  through eyetest.co.uk. This may be because they manage
                  appointments through their own website, or because their{" "}
                  {location.name} location has limited online availability.
                  Don&apos;t worry &mdash; there are{" "}
                  <strong>{alternatives.length} excellent alternatives</strong>{" "}
                  in {location.name} ready to book right now.
                </p>
              </div>
            </div>
          </div>

          {/* Brief brand description */}
          <div className="mb-4">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-3">
              About {optician.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {optician.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Alternative opticians (the main attraction) ───────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[var(--color-success)]/10 text-[var(--color-success)] text-sm font-medium px-4 py-2 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              {alternatives.length} opticians available to book
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alternative opticians in {location.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These opticians in the {location.name} area are available for
              instant online booking. Same professional service, often with
              shorter waiting times.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alternatives.map((alt) => (
              <OpticianCard
                key={alt.slug}
                optician={alt}
                location={location}
                featured
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose an independent optician? ──────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why choose an independent optician?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Independent and smaller-chain opticians in {location.name} often
              offer advantages over the major chains.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                ),
                title: "Personal service",
                desc: "See the same optometrist each visit. Independent practices build genuine relationships with their patients, learning your eye health history and preferences.",
              },
              {
                icon: (
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Shorter waits",
                desc: "Independent opticians typically offer quicker appointments, shorter waiting times in-store, and more flexible scheduling than the busier chain stores.",
              },
              {
                icon: (
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
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                ),
                title: "Same equipment",
                desc: "Independent opticians use the same professional-grade equipment as the big chains. Many invest in advanced technology like OCT scanners that some chains don't offer as standard.",
              },
              {
                icon: (
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                ),
                title: "Local knowledge",
                desc: `Independent opticians in ${location.name} know the local community. They can recommend specialist services, hospital eye departments, and complementary healthcare professionals nearby.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <FAQSection
        title={`${optician.shortName} ${location.name} FAQs`}
        items={faqItems}
      />

      {/* ── CTA with postcode search ─────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find available opticians in {location.name}
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Don&apos;t wait for {optician.shortName}. Compare{" "}
            {alternatives.length} opticians with instant online booking in the{" "}
            {location.name} area.
          </p>
          <form action="/search" method="GET" className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white/10 sm:backdrop-blur-sm sm:rounded-full sm:p-1.5 sm:border sm:border-white/10">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="postcode"
                  defaultValue={location.postcode}
                  placeholder="Enter your postcode"
                  className="w-full pl-12 pr-4 py-4 sm:py-3 text-base text-white bg-white/10 sm:bg-transparent rounded-xl sm:rounded-full border border-white/20 sm:border-none focus:outline-none placeholder:text-white/40"
                  aria-label="Enter your postcode"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 sm:py-3 rounded-xl sm:rounded-full transition-all hover:shadow-lg cursor-pointer"
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
                Search alternatives
              </button>
            </div>
          </form>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              100% free
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              NHS &amp; private
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-[var(--color-success)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Same-day slots
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

// =============================================================================
// SHARED COMPONENTS
// =============================================================================

/** Optician card used in both available and unavailable brand pages */
function OpticianCard({
  optician,
  location,
  featured = false,
}: {
  optician: OpticianBrand;
  location: UKLocation;
  featured?: boolean;
}) {
  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
        featured
          ? "border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40"
          : "border-gray-100 hover:border-[var(--color-primary)]/20"
      }`}
    >
      {/* Brand accent bar */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: optician.brandColor }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ backgroundColor: optician.brandColor }}
          >
            {optician.shortName.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)]">
              {optician.name}
            </h3>
            <p className="text-sm text-gray-500">
              {optician.storeCount}+ stores nationwide
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-xs bg-[var(--color-success)]/10 text-[var(--color-success)] px-2.5 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
            Available to book
          </span>
          {optician.nhsAvailable && (
            <span className="inline-flex items-center text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
              NHS
            </span>
          )}
        </div>

        {/* Services preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {optician.services.slice(0, 4).map((service) => (
            <span
              key={service}
              className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
            >
              {service}
            </span>
          ))}
          {optician.services.length > 4 && (
            <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
              +{optician.services.length - 4} more
            </span>
          )}
        </div>

        {/* Price range */}
        <p className="text-sm text-gray-500 mb-5">
          {optician.priceRange}
        </p>

        {/* CTA */}
        <Link
          href={`/search?postcode=${encodeURIComponent(location.postcode)}`}
          className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
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
          Book eye test
        </Link>
      </div>
    </div>
  );
}

/** FAQ accordion section used by both variants */
function FAQSection({
  title,
  items,
}: {
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white border border-gray-100 rounded-2xl shadow-sm"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors">
                <span>{faq.q}</span>
                <svg
                  className="w-5 h-5 shrink-0 text-gray-400 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
