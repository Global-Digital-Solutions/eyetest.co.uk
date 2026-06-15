import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { regions, getLocationsByRegion } from "@/data/locations";

export const metadata: Metadata = {
  title: "Eye Test Locations Across the UK | eyetest.co.uk",
  description:
    "Find and compare eye test appointments in every major UK city and town. Browse opticians by region, check availability, and book online in seconds.",
  keywords: [
    "eye test near me",
    "opticians near me",
    "eye test locations UK",
    "book eye test",
    "local opticians",
    "NHS eye test",
  ],
  openGraph: {
    title: "Eye Test Locations Across the UK | eyetest.co.uk",
    description:
      "Find and compare eye test appointments in every major UK city and town. Browse opticians by region and book online.",
    url: "https://eyetest.co.uk/locations",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/locations",
  },
};

export default function LocationsPage() {
  const regionData = regions.map((region) => ({
    name: region,
    locations: getLocationsByRegion(region),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Eye Test Locations Across the UK",
    description:
      "Find and compare eye test appointments in every major UK city and town.",
    url: "https://eyetest.co.uk/locations",
    publisher: {
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
                  <li className="text-white/80">Locations</li>
                </ol>
              </nav>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Find eye tests{" "}
                <span className="text-[var(--color-primary-light)]">
                  anywhere in the UK
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                Browse opticians in your area, compare prices and availability,
                and book your next eye test online.
              </p>

              {/* Postcode search */}
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
                      placeholder="Enter your postcode, e.g. SW1A 1AA"
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
            </div>
          </div>
        </section>

        {/* Regions grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Browse by region
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We cover every major city and town across the UK. Select a
                region below to find opticians near you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionData.map(({ name, locations }) => (
                <div
                  key={name}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)]"
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
                    <h3
                      className="text-lg font-semibold text-[var(--color-navy)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {name}
                    </h3>
                  </div>

                  <ul className="space-y-1.5">
                    {locations.slice(0, 6).map((loc) => (
                      <li key={loc.slug}>
                        <Link
                          href={`/locations/${loc.slug}`}
                          className="flex items-center justify-between text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors py-1 group"
                        >
                          <span>{loc.name}</span>
                          <svg
                            className="w-4 h-4 text-gray-300 group-hover:text-[var(--color-primary)] transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {locations.length > 6 && (
                    <p className="mt-3 text-xs text-gray-400">
                      +{locations.length - 6} more location
                      {locations.length - 6 !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why use eyetest.co.uk */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why search with eyetest.co.uk?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We help you find great local opticians you didn&apos;t know
                existed. Save hours searching and book instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  title: "Compare instantly",
                  desc: "See prices, availability, and services from every optician near you in one search.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Same-day slots",
                  desc: "Find appointments available today, tomorrow, or at a time that suits you.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "NHS & private",
                  desc: "Filter by NHS-funded and private eye tests. See who offers free tests.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "100% free",
                  desc: "Our service is completely free. No hidden charges, no sign-up required.",
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

        {/* Bottom CTA */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to book your eye test?
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your postcode to compare opticians, check live availability,
              and book an appointment online.
            </p>
            <Link
              href="/#search"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Eye Tests Near You
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
