import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  locations,
  getLocationBySlug,
  getAllSlugs,
  getLocationsByRegion,
} from "@/data/locations";
import {
  getAvailableOpticians,
  getUnavailableOpticians,
} from "@/data/opticians";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { city: string }[] {
  return getAllSlugs().map((slug) => ({ city: slug }));
}

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return { title: "Location Not Found | eyetest.co.uk" };
  }

  const title = `Eye Tests in ${location.name} — Compare & Book | eyetest.co.uk`;
  const description = `Compare eye test appointments in ${location.name}, ${location.county}. Find NHS and private opticians, check same-day availability, and book online for free.`;

  return {
    title,
    description,
    keywords: [
      `eye test ${location.name}`,
      `opticians ${location.name}`,
      `eye test near me ${location.name}`,
      `NHS eye test ${location.name}`,
      `book eye test ${location.name}`,
      `${location.name} opticians`,
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/locations/${location.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/locations/${location.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const availableOpticians = getAvailableOpticians();
  const unavailableOpticians = getUnavailableOpticians();
  const nearbyLocations = location.nearbyAreas
    .map((slug) => getLocationBySlug(slug))
    .filter(Boolean);
  const regionSiblings = getLocationsByRegion(location.region).filter(
    (l) => l.slug !== location.slug
  );

  // Structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Eye Tests in ${location.name}`,
    description: location.description,
    url: `https://eyetest.co.uk/locations/${location.slug}`,
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    about: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.county,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Where can I get an eye test in ${location.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can compare and book eye tests from multiple opticians in ${location.name} through eyetest.co.uk. We list both NHS and private providers, including high-street chains and independent practices in the ${location.county} area.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does an eye test cost in ${location.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Eye test prices in ${location.name} typically range from free (NHS-funded) to around £39 for a private examination. Many people qualify for free NHS eye tests, including those over 60, under 16, or on certain benefits. Use eyetest.co.uk to compare prices from different opticians in ${location.name}.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I get a same-day eye test in ${location.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, many opticians in ${location.name} offer same-day or next-day appointments. Search on eyetest.co.uk with the postcode ${location.postcode} to see current availability across all local opticians.`,
        },
      },
      {
        "@type": "Question",
        name: `Are NHS eye tests available in ${location.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Most opticians in ${location.name} offer NHS-funded eye tests for eligible patients. You can filter by NHS availability on eyetest.co.uk to find providers near ${location.postcode}.`,
        },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)] via-[#112247] to-[var(--color-navy-light)]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-white/50">
                  <li>
                    <Link href="/" className="hover:text-white/80 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/locations" className="hover:text-white/80 transition-colors">
                      Locations
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li className="text-white/80">{location.name}</li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <svg className="w-4 h-4 text-[var(--color-primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {location.county} &middot; {location.region}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Eye tests in{" "}
                <span className="text-[var(--color-primary-light)]">
                  {location.name}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                {location.description}
              </p>

              {/* Search form pre-filled with postcode */}
              <form
                action="/search"
                method="GET"
                className="max-w-xl mx-auto"
              >
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
                      defaultValue={location.postcode}
                      placeholder="Enter your postcode"
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

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% free
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  NHS &amp; private
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Same-day slots
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Available opticians */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Opticians in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compare these optician brands available in the {location.name}{" "}
                area. Book directly through eyetest.co.uk.
              </p>
            </div>

            {/* Available brands */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {availableOpticians.map((optician) => (
                <Link
                  key={optician.slug}
                  href={`/opticians/${optician.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ backgroundColor: optician.brandColor }}
                    >
                      {optician.shortName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                        {optician.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {optician.storeCount}+ stores nationwide
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs bg-[var(--color-success)]/10 text-[var(--color-success)] px-2.5 py-1 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
                      Book online
                    </span>
                    {optician.nhsAvailable && (
                      <span className="inline-flex items-center text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                        NHS
                      </span>
                    )}
                    <span className="text-xs text-gray-500 px-2.5 py-1">
                      {optician.priceRange}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {optician.highlights.slice(0, 2).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <svg className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>

            {/* Coming soon brands */}
            {unavailableOpticians.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-4">
                  Coming soon
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {unavailableOpticians.map((optician) => (
                    <div
                      key={optician.slug}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 opacity-60"
                        style={{ backgroundColor: optician.brandColor }}
                      >
                        {optician.shortName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {optician.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {optician.storeCount}+ stores &middot; Coming soon
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why book through eyetest.co.uk */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why book through eyetest.co.uk?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We help people in {location.name} find great local opticians
                they didn&apos;t know existed. Save hours searching and book
                instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                  title: "Instant comparison",
                  desc: `See every optician near ${location.postcode} on one page. Compare prices, services, and real-time availability without visiting multiple websites.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "Trusted & independent",
                  desc: `We're not owned by any optician chain. Our ${location.name} results show genuine availability from both independent and high-street opticians.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  ),
                  title: "Completely free",
                  desc: "Our service costs nothing to use. No registration, no hidden fees. Just search, compare, and book.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Same-day appointments",
                  desc: `Need an urgent eye test in ${location.name}? Many opticians offer same-day and next-day slots. We show you who has availability right now.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  ),
                  title: "Discover local gems",
                  desc: `${location.name} has brilliant independent opticians beyond the big chains. We help you discover practices with more personal service and specialist expertise.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                  title: "NHS eligibility check",
                  desc: "Not sure if you qualify for a free NHS eye test? We help you check eligibility and find NHS-registered opticians near you.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Eye test FAQs for {location.name}
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: `Where can I get an eye test in ${location.name}?`,
                  a: `You can compare and book eye tests from multiple opticians in ${location.name} through eyetest.co.uk. We list both NHS and private providers, including high-street chains like Boots Opticians and ASDA, as well as independent practices in the ${location.county} area. Simply search with the postcode ${location.postcode} to see all available options.`,
                },
                {
                  q: `How much does an eye test cost in ${location.name}?`,
                  a: `Eye test prices in ${location.name} typically range from free (NHS-funded) to around £39 for a private examination. Many people qualify for free NHS eye tests, including those over 60, under 16, those on certain benefits, and people with specific medical conditions. Use eyetest.co.uk to compare prices from different opticians in your area.`,
                },
                {
                  q: `Can I get a same-day eye test in ${location.name}?`,
                  a: `Yes, many opticians in ${location.name} offer same-day or next-day appointments, especially during weekdays. Availability varies, so we recommend searching on eyetest.co.uk with the postcode ${location.postcode} to see real-time appointment slots across all local opticians.`,
                },
                {
                  q: `Are NHS eye tests available in ${location.name}?`,
                  a: `Yes, most opticians in ${location.name} offer NHS-funded eye tests for eligible patients. Eligibility includes being under 16 (or under 19 in full-time education), aged 60 or over, receiving certain benefits, being diagnosed with diabetes or glaucoma, or being at risk of glaucoma. You can filter for NHS availability on eyetest.co.uk.`,
                },
                {
                  q: `How often should I have an eye test?`,
                  a: `The NHS recommends an eye test every two years for most adults. However, you may need more frequent tests if you are over 70, have diabetes, have a family history of glaucoma, or wear contact lenses. Children should have annual eye tests. Your optician in ${location.name} can advise on the right frequency for you.`,
                },
              ].map((faq) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to book an eye test in {location.name}?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Compare opticians, check real-time availability, and book your
              appointment online in seconds. It&apos;s free.
            </p>
            <Link
              href={`/search?postcode=${encodeURIComponent(location.postcode)}`}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search {location.name} Opticians
            </Link>
          </div>
        </section>

        {/* Nearby locations */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Nearby areas */}
            {nearbyLocations.length > 0 && (
              <div className="mb-12">
                <h2
                  className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Nearby locations
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {nearbyLocations.map((loc) =>
                    loc ? (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        className="group flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)] shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                          {loc.name}
                        </span>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Other locations in the same region */}
            {regionSiblings.length > 0 && (
              <div>
                <h2
                  className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  More locations in {location.region}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {regionSiblings.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] bg-gray-50 hover:bg-[var(--color-primary)]/5 px-4 py-2 rounded-full border border-gray-100 hover:border-[var(--color-primary)]/20 transition-all"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to all locations */}
            <div className="mt-12 text-center">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                View all UK locations
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
