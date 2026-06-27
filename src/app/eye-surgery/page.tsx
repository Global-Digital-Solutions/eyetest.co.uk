import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SurgeryCallout } from "@/components/SurgeryCallout";
import { surgeryProviders } from "@/data/surgery-providers";
import { surgeryConditions } from "@/data/surgery-conditions";

// Provider card images keyed by slug
const providerImages: Record<string, string> = {
  "new-medica": "/images/surgery/new-medica.jpg",
  "spa-medica": "/images/surgery/spa-medica.jpg",
  optegra: "/images/surgery/optegra.jpg",
  chec: "/images/surgery/chec.jpg",
  "moorfields-private": "/images/surgery/moorfields-private.jpg",
};

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    "Eye Surgery in the UK — Find Specialist Ophthalmic Surgeons | eyetest.co.uk",
  description:
    "Find and compare eye surgery providers across the UK. Compare NHS and private ophthalmic surgeons, read patient reviews, and book consultations for cataract surgery, laser eye surgery, glaucoma treatment, and more.",
  keywords: [
    "eye surgery UK",
    "ophthalmic surgeon",
    "cataract surgery",
    "laser eye surgery",
    "glaucoma surgery",
    "eye surgery near me",
    "NHS eye surgery",
    "private eye surgery",
    "eye surgery cost",
    "eye surgeon UK",
  ],
  openGraph: {
    title:
      "Eye Surgery in the UK — Find Specialist Ophthalmic Surgeons | eyetest.co.uk",
    description:
      "Find and compare eye surgery providers across the UK. Compare NHS and private ophthalmic surgeons, read patient reviews, and book consultations.",
    url: "https://www.eyetest.co.uk/eye-surgery",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/eye-surgery",
  },
};

// ---------------------------------------------------------------------------
// Static FAQ data
// ---------------------------------------------------------------------------

const faqs = [
  {
    question: "How much does eye surgery cost in the UK?",
    answer:
      "Eye surgery costs vary depending on the procedure and whether you choose NHS or private treatment. Cataract surgery is available free on the NHS when clinically needed, or from around £2,000–£3,500 per eye privately. Laser eye surgery (LASIK/LASEK) typically costs £1,000–£2,500 per eye. Glaucoma surgery ranges from £800 for SLT laser to £3,000+ for trabeculectomy. Many clinics offer interest-free finance plans.",
  },
  {
    question: "Is eye surgery available on the NHS?",
    answer:
      "Yes, many eye surgery procedures are available on the NHS, including cataract surgery, glaucoma surgery, retinal detachment repair, and some eyelid procedures when medically necessary. However, cosmetic procedures and laser eye surgery for refractive errors (short-sightedness, long-sightedness) are generally not covered. Your GP or optometrist can refer you to an NHS ophthalmologist.",
  },
  {
    question: "How do I choose the right eye surgeon?",
    answer:
      "Look for a surgeon who is a Fellow of the Royal College of Ophthalmologists (FRCOphth) and is registered with the General Medical Council. Check their experience with your specific procedure, read patient reviews, and ask about their complication rates. CQC-rated clinics provide an additional layer of assurance. We recommend booking a consultation with at least two providers to compare approaches and costs.",
  },
  {
    question: "What should I expect during an eye surgery consultation?",
    answer:
      "During your initial consultation, the ophthalmologist will perform a comprehensive eye examination including visual acuity tests, eye pressure measurements, and detailed scans of your eye. They will discuss your diagnosis, explain treatment options (including non-surgical alternatives), outline the risks and benefits of surgery, and answer your questions. Most consultations last 30–60 minutes. Some providers offer free initial consultations.",
  },
  {
    question: "How long does recovery take after eye surgery?",
    answer:
      "Recovery times vary by procedure. Cataract surgery: most patients see improvement within 1–2 days and fully recover in 4–6 weeks. Laser eye surgery (LASIK): vision usually stabilises within 24–48 hours, with full healing in 3–6 months. Glaucoma surgery: 2–6 weeks for initial recovery. Retinal detachment: 2–4 weeks, with full recovery in 2–3 months. Your surgeon will provide personalised aftercare instructions.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get a representative cataract price string for the comparison table */
function getCataractPrice(provider: (typeof surgeryProviders)[number]): string {
  const catService = provider.services.find(
    (s) => s.slug === "cataracts" || s.slug === "cataract-surgery"
  );
  if (!catService) return "—";
  const pricing = catService.pricing;
  // Extract first price mention
  if (pricing.toLowerCase().includes("free")) return "Free (NHS)";
  const match = pricing.match(/£[\d,]+/);
  return match ? `from ${match[0]}/eye` : pricing.split(".")[0];
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function EyeSurgeryPage() {
  const totalClinics = surgeryProviders.reduce(
    (sum, p) => sum + p.storeCount,
    0
  );
  const providerCount = surgeryProviders.length;

  // JSON-LD: CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Eye Surgery in the UK — Find Specialist Ophthalmic Surgeons",
    description:
      "Find and compare eye surgery providers across the UK. Compare NHS and private ophthalmic surgeons, read patient reviews, and book consultations.",
    url: "https://www.eyetest.co.uk/eye-surgery",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: surgeryConditions.map((condition, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.eyetest.co.uk/eye-surgery/${condition.slug}`,
        name: condition.name,
      })),
    },
  };

  // JSON-LD: BreadcrumbList
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
    ],
  };

  // JSON-LD: FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ── Search-First Hero ──────────────────────────────────────── */}
        <section className="pt-8 pb-12 sm:pt-12 sm:pb-16">
          <div className="max-w-3xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--color-navy)] font-medium">
                Eye Surgery
              </span>
            </nav>

            {/* Heading */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-navy)] leading-tight mb-3 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Find Eye Surgery{" "}
              <span className="text-[var(--color-primary)]">Near You</span>
            </h1>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Compare {providerCount} specialist providers across {totalClinics}{" "}
              clinics. Search by postcode to find NHS and private eye surgeons in
              your area.
            </p>

            {/* Postcode search */}
            <form
              action="/eye-surgery/search"
              method="get"
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="text"
                name="postcode"
                placeholder="Enter your postcode"
                autoComplete="postal-code"
                required
                className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 text-base text-[var(--color-navy)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all shadow-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-3.5 rounded-full transition-all hover:shadow-lg cursor-pointer"
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
            </form>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[var(--color-primary)]"
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
                {totalClinics} clinics
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[var(--color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {providerCount} providers
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[var(--color-nhs-blue)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                NHS &amp; Private
              </span>
            </div>
          </div>
        </section>

        {/* ── Provider Comparison Table ────────────────────────────────── */}
        <section id="providers" className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Compare Eye Surgery Providers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Side-by-side comparison of the UK&apos;s leading eye surgery
                providers. Click any row to view full details and clinic
                locations.
              </p>
            </div>

            {/* Desktop table — hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Clinics
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Google Rating
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      NHS
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Private
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Cataracts From
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {surgeryProviders.map((provider) => (
                    <tr
                      key={provider.slug}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors group"
                    >
                      {/* Provider name with brand strip */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1 h-10 rounded-full shrink-0"
                            style={{ backgroundColor: provider.brandColor }}
                          />
                          <div>
                            <Link
                              href={`/eye-surgery/providers/${provider.slug}`}
                              className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors"
                            >
                              {provider.name}
                            </Link>
                            {provider.isPreferredPartner && (
                              <span className="ml-2 inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                PREFERRED
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* Clinic count */}
                      <td className="text-center px-4 py-4 text-sm font-medium text-[var(--color-navy)]">
                        {provider.storeCount}
                      </td>
                      {/* Google rating */}
                      <td className="text-center px-4 py-4">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <=
                                  Math.round(provider.googleReview.rating)
                                    ? "text-amber-400"
                                    : "text-gray-200"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </span>
                          <span className="text-sm font-semibold text-[var(--color-navy)]">
                            {provider.googleReview.rating}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({provider.googleReview.reviewCount.toLocaleString()})
                          </span>
                        </div>
                      </td>
                      {/* NHS */}
                      <td className="text-center px-4 py-4">
                        {provider.nhsFunded ? (
                          <svg
                            className="w-5 h-5 text-[var(--color-success)] mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      {/* Private */}
                      <td className="text-center px-4 py-4">
                        {provider.privateSelfPay ? (
                          <svg
                            className="w-5 h-5 text-[var(--color-success)] mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      {/* Cataract price */}
                      <td className="text-center px-4 py-4 text-sm text-gray-600">
                        {getCataractPrice(provider)}
                      </td>
                      {/* CTA */}
                      <td className="text-center px-4 py-4">
                        <Link
                          href={`/eye-surgery/providers/${provider.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                        >
                          View
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
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile provider cards — shown on small screens */}
            <div className="md:hidden space-y-4">
              {surgeryProviders.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/eye-surgery/providers/${provider.slug}`}
                  className="group block bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-1 h-12 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: provider.brandColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                          {provider.name}
                        </h3>
                        {provider.isPreferredPartner && (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            PREFERRED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <=
                              Math.round(provider.googleReview.rating)
                                ? "text-amber-400"
                                : "text-gray-200"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-sm font-semibold text-[var(--color-navy)] ml-1">
                          {provider.googleReview.rating}
                        </span>
                        <span className="text-xs text-gray-400 ml-0.5">
                          ({provider.googleReview.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-gray-500 text-xs">Clinics</span>
                      <p className="font-semibold text-[var(--color-navy)]">
                        {provider.storeCount}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-gray-500 text-xs">Cataracts</span>
                      <p className="font-semibold text-[var(--color-navy)] text-xs mt-0.5">
                        {getCataractPrice(provider)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {provider.nhsFunded && (
                      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)]">
                        NHS
                      </span>
                    )}
                    {provider.privateSelfPay && (
                      <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                        Private
                      </span>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                      View
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
                </Link>
              ))}
            </div>

            {/* CTA below table */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 mb-3">
                Not sure which provider? Search by postcode and we&apos;ll show you
                the nearest clinics from all providers.
              </p>
              <a
                href="/eye-surgery/search"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search by postcode
              </a>
            </div>
          </div>
        </section>

        {/* ── Provider Cards with Images ──────────────────────────────── */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Surgery Providers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore each provider in detail — view clinic locations, read
                patient reviews, and compare services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {surgeryProviders.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/eye-surgery/providers/${provider.slug}`}
                  className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-[var(--color-primary)]/20 transition-all overflow-hidden"
                >
                  {/* Image header */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={
                        providerImages[provider.slug] ??
                        "/images/retinal-scan-lg.jpg"
                      }
                      alt={`${provider.name} eye surgery`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Brand colour strip at bottom of image */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ backgroundColor: provider.brandColor }}
                    />
                    {/* Preferred Partner badge overlaying the image */}
                    {provider.isPreferredPartner && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Preferred Partner
                      </span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-lg mb-2">
                      {provider.name}
                    </h3>

                    {/* Store count + Google rating */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                        {provider.storeCount} clinics
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(provider.googleReview.rating)
                                  ? "text-amber-400"
                                  : "text-gray-200"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </span>
                        <span className="ml-1">
                          {provider.googleReview.rating}
                        </span>
                      </span>
                    </div>

                    {/* NHS / Private badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {provider.nhsFunded && (
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)]">
                          NHS
                        </span>
                      )}
                      {provider.privateSelfPay && (
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                          Private
                        </span>
                      )}
                    </div>

                    {/* Key facts (first 3) */}
                    <ul className="text-sm text-gray-600 leading-relaxed mb-4 space-y-1.5">
                      {provider.keyFacts.slice(0, 3).map((fact) => (
                        <li key={fact} className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-[var(--color-success)] mt-0.5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                      View clinics
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conditions Grid ─────────────────────────────────────────── */}
        <section id="conditions" className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Conditions Treated
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn about common eye conditions that may require surgical
                treatment, including symptoms to watch for and the procedures
                available.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {surgeryConditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/eye-surgery/${condition.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors text-lg mb-3">
                    {condition.name}
                  </h3>

                  <ul className="text-sm text-gray-600 leading-relaxed mb-4 space-y-1.5">
                    {condition.symptoms.slice(0, 2).map((symptom) => (
                      <li key={symptom} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"
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
                        <span className="line-clamp-2">{symptom}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Learn more
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
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Surgery Callout ──────────────────────────────────────────── */}
        <SurgeryCallout />

        {/* ── FAQ Section ──────────────────────────────────────────────── */}
        <section id="faqs" className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common questions about eye surgery in the UK, including costs,
                NHS availability, and what to expect.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 text-left font-semibold text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0"
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
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
