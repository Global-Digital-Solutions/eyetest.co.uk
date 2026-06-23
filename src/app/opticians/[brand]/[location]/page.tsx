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
  nameWithCounty,
  countyArea,
  type UKLocation,
} from "@/data/locations";
import { eyeTests } from "@/data/eye-tests";
import { articles } from "@/data/articles";
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
    ? `${optician.name} ${loc.name} — Eye Test Booking`
    : `${optician.name} ${loc.name} — Alternatives & Availability`;

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
      `${optician.shortName} opticians ${loc.name}`,
      `eye test cost ${loc.name}`,
      `free eye test ${loc.name}`,
      `${optician.shortName} eye test cost`,
      `${loc.name} opticians`,
      `${loc.name} eye care`,
      `${optician.shortName} ${loc.county}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://www.eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://www.eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
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

  // Eye test slugs for internal linking
  const eyeTestLinks = eyeTests.slice(0, 6);
  // Article slugs for internal linking
  const articleLinks = articles.slice(0, 4);

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
        item: "https://www.eyetest.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Opticians",
        item: "https://www.eyetest.co.uk/opticians",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: optician.name,
        item: `https://www.eyetest.co.uk/opticians/${optician.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: loc.name,
        item: `https://www.eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${optician.name} ${loc.name}`,
    description: optician.description,
    url: `https://www.eyetest.co.uk/opticians/${optician.slug}/${loc.slug}`,
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: loc.name,
    },
  };

  const faqItems = optician.available
    ? [
        {
          q: `How much does an eye test cost at ${optician.shortName} in ${loc.name}?`,
          a: `${optician.shortName} eye tests in ${loc.name} are priced at ${optician.priceRange}. Many patients qualify for free NHS-funded eye tests. You can compare prices and book online through eyetest.co.uk.`,
        },
        {
          q: `Can I get a free NHS eye test at ${optician.shortName} in ${loc.name}?`,
          a: optician.nhsAvailable
            ? `Yes, ${optician.shortName} in ${loc.name} offers NHS-funded eye tests for eligible patients. Eligibility includes being under 16, over 60, on certain benefits, or having specific medical conditions. In Scotland, all residents qualify for free NHS eye tests regardless of age or income.`
            : `${optician.shortName} in ${loc.name} primarily offers private eye tests. Check eyetest.co.uk for NHS-registered opticians near ${loc.postcode}.`,
        },
        {
          q: `How do I book an eye test at ${optician.shortName} ${loc.name}?`,
          a: `You can book a ${optician.shortName} eye test in ${loc.name} by entering the postcode ${loc.postcode} on eyetest.co.uk. You will see available appointment slots, compare prices, and book online instantly. You can also call your local ${optician.shortName} branch directly.`,
        },
        {
          q: `How long does an eye test take at ${optician.shortName}?`,
          a: `A standard eye test at ${optician.shortName} typically takes between 20 and 30 minutes. If you opt for an enhanced test with OCT scanning, allow around 35 to 45 minutes. Contact lens consultations may take 30 to 45 minutes as they involve additional measurements and a trial fitting.`,
        },
        {
          q: `Do I need to bring anything to my eye test at ${optician.shortName}?`,
          a: `Yes, bring your current glasses or contact lenses, any NHS exemption evidence if you qualify for a free test, and a list of any medications you take. If you have a previous prescription from another optician, bringing that along can be helpful for comparison.`,
        },
        {
          q: `What happens if I need glasses after my ${optician.shortName} eye test?`,
          a: `After your eye test at ${optician.shortName} in ${loc.name}, your optometrist will provide a written prescription. You can choose glasses from ${optician.shortName}'s range, or take your prescription to any other optician. If you qualify for an NHS optical voucher, this can be put towards the cost of your glasses.`,
        },
        {
          q: `Can children have eye tests at ${optician.shortName} in ${loc.name}?`,
          a: `Yes, ${optician.shortName} in ${loc.name} offers eye tests for children of all ages. All children under 16 are entitled to free NHS-funded eye tests. ${optician.shortName} optometrists use age-appropriate techniques including picture charts and matching games for younger children who cannot yet read letters.`,
        },
        {
          q: `How often should I have an eye test?`,
          a: `The recommended frequency is every two years for most adults. However, you should have annual eye tests if you are over 70, have diabetes, have a family history of glaucoma, or have been advised by your optometrist. Children should have their eyes tested annually. Book your next eye test at ${optician.shortName} in ${loc.name} through eyetest.co.uk.`,
        },
        {
          q: `What services does ${optician.shortName} offer in ${loc.name}?`,
          a: `${optician.shortName} in ${loc.name} offers: ${optician.services.join(", ")}. Book your appointment through eyetest.co.uk to check real-time availability.`,
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
          q: `How do I book an eye test in ${loc.name}?`,
          a: `Enter the postcode ${loc.postcode} on eyetest.co.uk to see all available opticians in the ${loc.name} area. You can compare prices, services, and appointment availability, then book online in seconds. Both NHS and private eye tests are available.`,
        },
        {
          q: `How long does an eye test take?`,
          a: `A standard eye test typically takes between 20 and 30 minutes at most opticians in ${loc.name}. Enhanced examinations with OCT scanning take around 35 to 45 minutes. Contact lens consultations may take 30 to 45 minutes. Allow extra time if you want to browse frames afterwards.`,
        },
        {
          q: `Can I get a free NHS eye test in ${loc.name}?`,
          a: `Yes, many opticians in ${loc.name} offer free NHS-funded eye tests for eligible patients. You qualify if you are under 16, over 60, on certain benefits, or have specific medical conditions such as diabetes or glaucoma. In Scotland, all residents qualify for free NHS eye tests.`,
        },
        {
          q: `Do I need to bring anything to my eye test?`,
          a: `Bring your current glasses or contact lenses, any NHS exemption evidence if applicable, and a list of medications you take. If you have a previous prescription from another optician, that can be useful for comparison. Arrive a few minutes early to complete any registration forms.`,
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
          q: `Can children have eye tests in ${loc.name}?`,
          a: `Yes, all opticians in ${loc.name} offer eye tests for children. All children under 16 qualify for free NHS-funded eye tests. Optometrists use child-friendly techniques including picture charts and matching games for younger children. Regular eye tests are recommended annually for all school-age children.`,
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
                {optician.name}{" "}
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
            eyeTestLinks={eyeTestLinks}
            articleLinks={articleLinks}
            nearbyLocations={nearbyLocations}
            otherBrands={otherBrands}
          />
        ) : (
          <UnavailableBrandContent
            optician={optician}
            location={loc}
            alternatives={availableOpticians}
            faqItems={faqItems}
            eyeTestLinks={eyeTestLinks}
            articleLinks={articleLinks}
            nearbyLocations={nearbyLocations}
            otherBrands={otherBrands}
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
        {/* ── Subtle external website reference ─────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-400">
            Visit {optician.name} directly:{" "}
            <a
              href={optician.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 underline"
            >
              {optician.website.replace(/^https?:\/\//, "")}
            </a>
          </p>
        </div>
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
  eyeTestLinks,
  articleLinks,
  nearbyLocations,
  otherBrands,
}: {
  optician: OpticianBrand;
  location: UKLocation;
  alternatives: OpticianBrand[];
  faqItems: { q: string; a: string }[];
  eyeTestLinks: { slug: string; name: string }[];
  articleLinks: { slug: string; title: string }[];
  nearbyLocations: UKLocation[];
  otherBrands: OpticianBrand[];
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
            <p className="text-gray-600 leading-relaxed text-base mb-4">
              {optician.description}
            </p>
            <p className="text-gray-600 leading-relaxed text-base mb-4">
              {optician.name} in {nameWithCounty(location)} is one of {optician.storeCount.toLocaleString()} {optician.shortName} branches across the United Kingdom. Whether you need a routine NHS sight test, a private eye examination, or a more advanced health screening such as an OCT scan, {optician.shortName} in {location.name} can help you keep your vision clear and your eyes healthy. The {location.name} area, covered by the postcode {location.postcode}, is well served by {optician.shortName} and other leading opticians, giving local patients a wide choice of eye care providers.
            </p>
            <p className="text-gray-600 leading-relaxed text-base mb-4">
              Finding the right optician in {location.name} can be straightforward when you compare services, prices, and availability on eyetest.co.uk. {optician.shortName} is known for offering {optician.services.slice(0, 4).join(", ").toLowerCase()}, and more. Patients visiting {optician.shortName} in {location.name} benefit from {optician.nhsAvailable ? "both NHS-funded and private eye tests" : "private eye tests"}, professional optometrists registered with the General Optical Council, and a convenient location within the {location.name} area.
            </p>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              {optician.shortName} was founded in {optician.founded} and has grown to become one of the most recognised names in UK eye care. Patients in {location.name} choose {optician.shortName} for a variety of reasons, including {optician.highlights[0]?.toLowerCase() ?? "quality service"} and {optician.highlights[1]?.toLowerCase() ?? "professional care"}. If you are looking for an eye test near {location.postcode}, {optician.shortName} in {location.name} is an excellent choice for comprehensive eye care in {location.name}.
            </p>

            {/* Services */}
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              Services available at {optician.shortName} in {location.name}
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

            {/* Postcode search form */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)] mb-2">
                Book an eye test
              </h4>
              <form action="/search" method="GET">
                <input
                  type="text"
                  name="postcode"
                  defaultValue={location.postcode}
                  placeholder="Enter postcode"
                  aria-label="Enter your postcode"
                  className="w-full px-3 py-2 text-sm text-[var(--color-navy)] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] placeholder:text-gray-400 mb-2"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  style={{ backgroundColor: "var(--color-primary)" }}
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
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Eye Test Cost & Pricing Section ──────────────────────── */}
      <EyeTestPricingSection optician={optician} location={location} />

      {/* ── What to Expect at Your Appointment ───────────────────── */}
      <WhatToExpectSection optician={optician} location={location} />

      {/* ── NHS Eligibility Section ──────────────────────────────── */}
      <NHSEligibilitySection optician={optician} location={location} />

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

      {/* ── Eye Health Tips ───────────────────────────────────────── */}
      <EyeHealthTipsSection optician={optician} location={location} />

      {/* ── Getting There ────────────────────────────────────────── */}
      <GettingThereSection optician={optician} location={location} />

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

      {/* ── Explore More (Internal Linking Block) ────────────────── */}
      <ExploreMoreSection
        optician={optician}
        location={location}
        eyeTestLinks={eyeTestLinks}
        articleLinks={articleLinks}
        nearbyLocations={nearbyLocations}
        otherBrands={otherBrands}
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
  eyeTestLinks,
  articleLinks,
  nearbyLocations,
  otherBrands,
}: {
  optician: OpticianBrand;
  location: UKLocation;
  alternatives: OpticianBrand[];
  faqItems: { q: string; a: string }[];
  eyeTestLinks: { slug: string; name: string }[];
  articleLinks: { slug: string; title: string }[];
  nearbyLocations: UKLocation[];
  otherBrands: OpticianBrand[];
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

          {/* Expanded brand description */}
          <div className="mb-4">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-3">
              About {optician.name} in {location.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {optician.description}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {optician.name} has {optician.storeCount.toLocaleString()} branches across the UK and has been providing eye care services since {optician.founded}. While {optician.shortName} eye tests in {nameWithCounty(location)} are not currently available for online booking through eyetest.co.uk, patients in the {location.postcode} area have access to {alternatives.length} other opticians that offer instant online booking. These alternative opticians in {location.name} provide the same professional standard of care, with services including NHS eye tests, private examinations, contact lens fittings, and advanced screenings.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you specifically need a {optician.shortName} appointment in {location.name}, you may wish to visit their website directly or call your local branch. Otherwise, explore the excellent alternative opticians available in {location.name} below, many of which offer same-day or next-day appointments with shorter waiting times.
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

      {/* ── Eye Test Cost & Pricing Section ──────────────────────── */}
      <EyeTestPricingSection optician={optician} location={location} />

      {/* ── What to Expect at Your Appointment ───────────────────── */}
      <WhatToExpectSection optician={optician} location={location} />

      {/* ── NHS Eligibility Section ──────────────────────────────── */}
      <NHSEligibilitySection optician={optician} location={location} />

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

      {/* ── Eye Health Tips ───────────────────────────────────────── */}
      <EyeHealthTipsSection optician={optician} location={location} />

      {/* ── Getting There ────────────────────────────────────────── */}
      <GettingThereSection optician={optician} location={location} />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <FAQSection
        title={`${optician.shortName} ${location.name} FAQs`}
        items={faqItems}
      />

      {/* ── Explore More (Internal Linking Block) ────────────────── */}
      <ExploreMoreSection
        optician={optician}
        location={location}
        eyeTestLinks={eyeTestLinks}
        articleLinks={articleLinks}
        nearbyLocations={nearbyLocations}
        otherBrands={otherBrands}
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
// SHARED CONTENT SECTIONS
// =============================================================================

/** Eye Test Cost & Pricing breakdown */
function EyeTestPricingSection({
  optician,
  location,
}: {
  optician: OpticianBrand;
  location: UKLocation;
}) {
  // Extract pricing from detailedServices if available
  const nhsTest = optician.detailedServices.find(
    (s) => s.name.toLowerCase().includes("nhs") && s.name.toLowerCase().includes("eye")
  );
  const privateTest = optician.detailedServices.find(
    (s) => s.name.toLowerCase().includes("private") && s.name.toLowerCase().includes("eye")
  );
  const octTest = optician.detailedServices.find(
    (s) => s.name.toLowerCase().includes("oct") || s.name.toLowerCase().includes("enhanced") || s.name.toLowerCase().includes("ultimate")
  );
  const contactTest = optician.detailedServices.find(
    (s) => s.name.toLowerCase().includes("contact")
  );

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4">
            Eye Test Cost at {optician.shortName} in {location.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Understanding the cost of your eye test at {optician.shortName} in {location.name} helps you plan your visit and budget accordingly. {optician.shortName} offers a range of eye test options at different price points, from free NHS-funded tests to premium enhanced examinations. Here is a detailed breakdown of what you can expect to pay at {optician.shortName} in the {nameWithCounty(location)} area.
          </p>

          {/* Pricing cards */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {/* NHS Eye Test */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                  NHS
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)]">
                  NHS Eye Test
                </h3>
              </div>
              <p className="text-2xl font-bold text-[var(--color-success)] mb-2">
                {nhsTest?.price ?? "Free (if eligible)"}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {nhsTest?.duration ?? "20-25 minutes"}. Available to eligible patients including children under 16, over-60s, benefit recipients, and those with specific medical conditions.
              </p>
            </div>

            {/* Private Eye Test */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] mb-3">
                Private Eye Test
              </h3>
              <p className="text-2xl font-bold text-[var(--color-navy)] mb-2">
                {privateTest?.price ?? optician.priceRange}
              </p>
              <p className="text-sm text-gray-600">
                Duration: {privateTest?.duration ?? "20-30 minutes"}. A comprehensive examination for patients who do not qualify for NHS funding. Includes vision and eye health assessment.
              </p>
            </div>

            {/* Enhanced/OCT Test */}
            {octTest && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-1 rounded-full font-medium">
                    Enhanced
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)]">
                    {octTest.name}
                  </h3>
                </div>
                <p className="text-2xl font-bold text-[var(--color-navy)] mb-2">
                  {octTest.price}
                </p>
                <p className="text-sm text-gray-600">
                  Duration: {octTest.duration}. Includes advanced OCT scanning for early detection of conditions such as glaucoma, macular degeneration, and diabetic retinopathy.
                </p>
              </div>
            )}

            {/* Contact Lens Check */}
            {contactTest && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] mb-3">
                  {contactTest.name}
                </h3>
                <p className="text-2xl font-bold text-[var(--color-navy)] mb-2">
                  {contactTest.price}
                </p>
                <p className="text-sm text-gray-600">
                  Duration: {contactTest.duration}. Includes corneal measurements, tear film assessment, and trial lens fitting to find the best contact lenses for your eyes.
                </p>
              </div>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">
            Prices at {optician.shortName} in {location.name} are competitive with other opticians in the {location.name} area. When comparing eye test costs across different opticians in {location.name}, bear in mind that the clinical quality of a standard eye test is the same regardless of which optician you visit, as all UK optometrists are qualified to the same professional standard and regulated by the General Optical Council. The main differences between providers tend to be in the additional technology offered, the range of frames and lenses available, and the time allocated to each appointment.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Many patients in {location.name} are eligible for free NHS-funded eye tests and do not need to pay anything at all. Even if you are not eligible, a private eye test at {optician.shortName} represents excellent value for one of the most important health checks available. Use eyetest.co.uk to compare prices across all opticians near {location.postcode} and find the best deal for your needs.
          </p>
        </div>
      </div>
    </section>
  );
}

/** What to Expect at Your Appointment */
function WhatToExpectSection({
  optician,
  location,
}: {
  optician: OpticianBrand;
  location: UKLocation;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4">
            What to Expect at Your {optician.shortName} Eye Test in {location.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            If you are visiting {optician.shortName} in {location.name} for an eye test, knowing what to expect can help you feel prepared and get the most from your appointment. Whether this is your first eye test or you are a regular patient, here is a step-by-step guide to what happens before, during, and after your eye examination at {optician.shortName} in {nameWithCounty(location)}.
          </p>

          {/* Before your visit */}
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)] mb-3">
            Before your visit
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Preparing for your {optician.shortName} eye test in {location.name} is straightforward. To make the most of your appointment, remember to bring:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-6 space-y-1">
            <li>Your current glasses or contact lenses (including reading glasses and sunglasses with prescription lenses)</li>
            <li>Any NHS exemption evidence if you believe you qualify for a free eye test</li>
            <li>A list of any medications you are taking, as some can affect your vision or eye health</li>
            <li>Details of your family eye health history, especially any relatives with glaucoma, macular degeneration, or diabetes</li>
            <li>Your previous prescription from another optician, if you have one</li>
            <li>Notes about any changes in your vision, such as blurriness, headaches, or difficulty reading</li>
          </ul>

          {/* During the test */}
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)] mb-3">
            During your eye test
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            A standard eye test at {optician.shortName} in {location.name} typically lasts between 20 and 30 minutes. Your optometrist will carry out a series of checks to assess both your vision and the health of your eyes:
          </p>
          <div className="space-y-4 mb-6">
            {[
              {
                step: "History and symptoms discussion",
                desc: `Your optometrist will start by asking about your general health, any medications you take, your daily visual demands (such as screen work or driving), and any specific symptoms or concerns. This conversation helps tailor the examination to your individual needs.`,
              },
              {
                step: "Visual acuity test",
                desc: `You will read letters from a chart to measure how clearly each eye can see at various distances. This is the familiar "reading the letters" part of the eye test. Each eye is tested separately to identify any difference between them.`,
              },
              {
                step: "Refraction",
                desc: `Your optometrist will determine your exact prescription using a combination of an autorefractor (a machine that provides an initial measurement) and a subjective refraction, where you look through different lenses and say which option gives the clearest view. This is the "which is better, one or two?" part of the test.`,
              },
              {
                step: "Eye health examination",
                desc: `Using a slit lamp microscope and ophthalmoscope, your optometrist will examine the front and back of your eyes. This checks for conditions including cataracts, glaucoma, macular degeneration, and signs of diabetes or high blood pressure. The back of the eye is the only place in the body where blood vessels can be observed directly, making this an important health check.`,
              },
              {
                step: "Eye pressure check",
                desc: `A tonometry test measures the pressure inside your eyes. Elevated eye pressure is a key risk factor for glaucoma. This is often done using a non-contact method (a gentle puff of air) or, at some practices, with a contact method after numbing drops are applied.`,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-navy)] mb-1">{item.step}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* OCT scan note */}
          {optician.services.some((s) => s.toLowerCase().includes("oct")) && (
            <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 rounded-xl p-5 mb-6">
              <h4 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] mb-2">
                OCT scanning at {optician.shortName} in {location.name}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {optician.shortName} in {location.name} offers OCT (Optical Coherence Tomography) scanning as part of their enhanced eye examination. This advanced, painless scan takes detailed 3D images of the layers beneath the surface of your retina, allowing your optometrist to detect conditions such as glaucoma, macular degeneration, and diabetic retinopathy at the very earliest stage, often years before symptoms appear. While not included in a standard NHS eye test, OCT scanning is widely recommended as a valuable addition, particularly for patients over 25 or those with a family history of eye disease.
              </p>
            </div>
          )}

          {/* After the test */}
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)] mb-3">
            After your eye test
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            At the end of your {optician.shortName} eye test in {location.name}, your optometrist will:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4 space-y-1">
            <li>Explain all their findings in plain, easy-to-understand language</li>
            <li>Provide you with a written prescription that you are entitled to take to any optician</li>
            <li>Discuss whether you need new glasses or an update to your current prescription</li>
            <li>Recommend when you should return for your next eye test (typically in one to two years)</li>
            <li>If any concerns are identified, refer you to a specialist or the hospital eye service for further investigation</li>
          </ul>
          <p className="text-gray-600 leading-relaxed">
            If you need new glasses, you can browse {optician.shortName}&apos;s frame range in {location.name} after your appointment. Remember that your prescription belongs to you and you are free to purchase glasses from any optician or online retailer. If you are eligible for an NHS optical voucher, this can be applied towards the cost of your glasses or contact lenses at {optician.shortName} in {location.name}.
          </p>
        </div>
      </div>
    </section>
  );
}

/** NHS Eligibility Section */
function NHSEligibilitySection({
  optician,
  location,
}: {
  optician: OpticianBrand;
  location: UKLocation;
}) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4">
            Free NHS Eye Tests in {location.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {optician.nhsAvailable
              ? `${optician.shortName} in ${location.name} is registered to provide free NHS-funded eye tests for eligible patients. Understanding your NHS eligibility could save you the cost of your eye test entirely. Here is a comprehensive guide to who qualifies for free NHS eye tests at ${optician.shortName} and other opticians in ${nameWithCounty(location)}.`
              : `While ${optician.shortName} primarily offers private eye tests, many opticians in ${location.name} provide free NHS-funded eye tests for eligible patients. Here is a comprehensive guide to who qualifies for free NHS eye tests in ${nameWithCounty(location)}.`}
          </p>

          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)] mb-3">
            Who qualifies for a free NHS eye test?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            You are entitled to a free NHS sight test in {location.name} if you fall into any of the following categories:
          </p>

          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {[
              { group: "Children under 16", detail: "All children qualify for free NHS eye tests. Annual testing is recommended for school-age children." },
              { group: "Young people 16-18", detail: "If in full-time education, you qualify for free NHS eye tests until your 19th birthday." },
              { group: "Adults aged 60 and over", detail: "Everyone aged 60 or over is entitled to a free NHS sight test, regardless of income." },
              { group: "People with diabetes", detail: "If you have been diagnosed with Type 1 or Type 2 diabetes, you qualify for free annual NHS eye tests." },
              { group: "Glaucoma patients", detail: "Anyone diagnosed with glaucoma is entitled to free NHS eye tests for ongoing monitoring." },
              { group: "Glaucoma family history", detail: "If you are aged 40+ and have a parent, sibling, or child diagnosed with glaucoma, you qualify for free NHS testing." },
              { group: "Benefit recipients", detail: "People receiving Income Support, income-based JSA, income-related ESA, Pension Credit, or qualifying Universal Credit." },
              { group: "Registered blind or partially sighted", detail: "Anyone registered as sight-impaired or severely sight-impaired qualifies for free NHS eye tests." },
              { group: "Complex lens prescriptions", detail: "Patients who hold a valid NHS complex lens voucher are entitled to free sight tests." },
              { group: "Prisoners on release", detail: "People on leave from prison or on probation are eligible for free NHS eye tests." },
            ].map((item) => (
              <div key={item.group} className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-semibold text-[var(--color-navy)] text-sm mb-1">{item.group}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)] mb-3">
            NHS optical vouchers
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you qualify for a free NHS eye test and need glasses, you may also be entitled to an NHS optical voucher. This voucher provides a contribution towards the cost of your spectacles or contact lenses. The value of the voucher depends on your prescription, ranging from around {"£"}39 for a simple prescription to over {"£"}215 for complex lenses. At {optician.shortName} in {location.name}, the NHS voucher can be applied directly to reduce the cost of your chosen frames and lenses. For many children and adults on qualifying benefits, the voucher covers the full cost of a basic pair of glasses.
          </p>

          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)] mb-3">
            How to claim your free NHS eye test at {optician.shortName} in {location.name}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Claiming your free NHS eye test at {optician.shortName} in {location.name} is straightforward. Simply let the receptionist know that you believe you are eligible when you book your appointment, and bring your proof of eligibility to the appointment. Acceptable evidence includes your NHS exemption certificate, benefits letter, birth certificate (for age-related eligibility), medical card, or a valid HC2 certificate. If you are unsure whether you qualify, {optician.shortName} staff in {location.name} can check your eligibility when you arrive.
          </p>

          {/* Scotland note */}
          {location.region === "Scotland" && (
            <div className="bg-[var(--color-nhs-blue)]/5 border border-[var(--color-nhs-blue)]/15 rounded-xl p-5 mb-4">
              <h4 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] mb-2">
                Free eye tests for all Scottish residents
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                As {location.name} is in Scotland, all residents are entitled to a free NHS eye test regardless of age, income, or medical history. This universal provision was introduced in 2006 and applies at all registered opticians, including {optician.shortName} in {location.name}. You do not need to provide any proof of eligibility beyond your Scottish address.
              </p>
            </div>
          )}

          {location.region === "Wales" && (
            <div className="bg-[var(--color-nhs-blue)]/5 border border-[var(--color-nhs-blue)]/15 rounded-xl p-5 mb-4">
              <h4 className="font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] mb-2">
                Free eye tests for Welsh residents
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Residents of Wales, including those in {location.name}, benefit from free NHS eye tests for everyone. The Welsh Government provides universal access to sight tests at all registered opticians. You simply need to confirm your Welsh address when booking at {optician.shortName} in {location.name}.
              </p>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed">
            Remember that NHS eligibility applies equally at all registered opticians in {location.name}, not just {optician.shortName}. If you are having difficulty getting an appointment at {optician.shortName}, you can use your NHS entitlement at any of the other opticians in the {location.name} area. Use eyetest.co.uk to compare NHS availability at opticians near {location.postcode}.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Eye Health Tips Section */
function EyeHealthTipsSection({
  optician,
  location,
}: {
  optician: OpticianBrand;
  location: UKLocation;
}) {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4">
            Eye Health Tips for {location.name} Residents
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Maintaining good eye health goes beyond having regular eye tests at {optician.shortName} in {location.name}. Here are practical steps you can take between appointments to protect your vision and support the long-term health of your eyes.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-2">
                Why regular eye tests matter
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Regular eye tests at {optician.shortName} in {location.name} are one of the most important health checks available. Many serious eye conditions, including glaucoma, macular degeneration, and diabetic retinopathy, develop gradually without noticeable symptoms in their early stages. By the time you notice a change in your vision, significant and potentially irreversible damage may have already occurred. A routine eye test can detect these conditions early, when treatment is most effective. The College of Optometrists recommends eye tests every two years for most adults, or annually if you are over 70, diabetic, or have a family history of eye disease.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-2">
                Warning signs to watch for
              </h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Between your regular eye tests at {optician.shortName} in {location.name}, be alert to these warning signs that warrant an urgent visit to your optician:
              </p>
              <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1">
                <li>Sudden changes in vision, including blurriness, distortion, or loss of vision</li>
                <li>Flashes of light or a sudden increase in floaters</li>
                <li>A shadow or curtain appearing across part of your vision</li>
                <li>Persistent headaches, especially after reading or screen work</li>
                <li>Red, painful, or swollen eyes that do not improve within a day or two</li>
                <li>Double vision or difficulty focusing</li>
              </ul>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-2">
                Screen time and digital eye strain
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With increasing screen use in both work and leisure, digital eye strain is a common concern for patients visiting {optician.shortName} in {location.name}. To reduce strain, follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for at least 20 seconds. Ensure your screen is positioned at arm&apos;s length and slightly below eye level, and adjust the brightness and text size for comfortable viewing. If you experience persistent discomfort, your optometrist at {optician.shortName} in {location.name} can advise on specialised computer glasses or lens coatings designed to reduce digital eye strain.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              For more detailed information about protecting your eyes, visit our{" "}
              <Link href="/eye-health" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium underline">
                eye health hub
              </Link>{" "}
              or browse our{" "}
              <Link href="/eye-health/conditions" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium underline">
                eye conditions guide
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Getting to [Brand] in [Location] */
function GettingThereSection({
  optician,
  location,
}: {
  optician: OpticianBrand;
  location: UKLocation;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4">
            Getting to {optician.shortName} in {location.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {optician.shortName} in {nameWithCounty(location)} is located in the {location.postcode} postcode area, making it accessible to patients across {location.name} and the surrounding area. Whether you are travelling by car, public transport, or on foot, getting to your {optician.shortName} eye test appointment in {location.name} should be straightforward.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {location.name} is generally well served by public transport, with bus and rail connections to the town centre where many opticians, including {optician.shortName}, are typically located. If you are driving, there are usually a variety of parking options in the {location.name} area, including pay-and-display car parks and, in some cases, free supermarket parking nearby. It is worth checking the specific parking arrangements for your chosen {optician.shortName} branch before your visit, particularly if you are attending during busy shopping hours.
          </p>
          <p className="text-gray-600 leading-relaxed">
            If you have mobility requirements or accessibility needs, contact the {optician.shortName} branch in {location.name} before your appointment to ensure they can accommodate you comfortably. Many {optician.shortName} stores offer step-free access, and staff are trained to assist patients with disabilities. For patients who cannot travel to a branch at all, some opticians in the {location.name} area offer{" "}
            <Link href="/at-home-eye-tests" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium underline">
              home visit eye tests
            </Link>{" "}
            for housebound or elderly patients.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Explore More (Internal Linking Block) */
function ExploreMoreSection({
  optician,
  location,
  eyeTestLinks,
  articleLinks,
  nearbyLocations,
  otherBrands,
}: {
  optician: OpticianBrand;
  location: UKLocation;
  eyeTestLinks: { slug: string; name: string }[];
  articleLinks: { slug: string; title: string }[];
  nearbyLocations: UKLocation[];
  otherBrands: OpticianBrand[];
}) {
  const availableBrands = otherBrands.filter((b) => b.available);
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-8 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Explore More
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Compare with other brands in same location */}
          {availableBrands.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
                Compare opticians in {location.name}
              </h3>
              <ul className="space-y-2">
                {availableBrands.slice(0, 5).map((brand) => (
                  <li key={brand.slug}>
                    <Link
                      href={`/opticians/${brand.slug}/${location.slug}`}
                      className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: brand.brandColor }}
                      />
                      {brand.shortName} in {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Same brand in nearby locations */}
          {nearbyLocations.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
                {optician.shortName} nearby
              </h3>
              <ul className="space-y-2">
                {nearbyLocations.slice(0, 5).map((nearby) => (
                  <li key={nearby.slug}>
                    <Link
                      href={`/opticians/${optician.slug}/${nearby.slug}`}
                      className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {optician.shortName} in {nearby.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eye test types */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              Types of eye tests
            </h3>
            <ul className="space-y-2">
              {eyeTestLinks.map((test) => (
                <li key={test.slug}>
                  <Link
                    href={`/eye-tests/${test.slug}`}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {test.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Eye health conditions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              Eye health conditions
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/eye-health/conditions"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Browse all eye conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/eye-health"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Eye health hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Articles */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              Helpful articles
            </h3>
            <ul className="space-y-2">
              {articleLinks.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location page link */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-4">
              {location.name} eye care
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/locations/${location.slug}`}
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  All opticians in {location.name}
                </Link>
              </li>
              <li>
                <Link
                  href={`/opticians/${optician.slug}`}
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  All {optician.shortName} locations
                </Link>
              </li>
              <li>
                <Link
                  href="/opticians"
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  Compare all UK opticians
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
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
