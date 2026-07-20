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
              Find an Eye Health Clinic{" "}
              <span className="text-[var(--color-primary)]">Near You</span>
            </h1>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Compare {providerCount} specialist providers across {totalClinics}{" "}
              clinics. Search by postcode to find NHS and private eye health
              clinics in your area.
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

        {/* ── Provider Comparison Cards ────────────────────────────────── */}
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
                Compare the UK&apos;s leading eye surgery providers side by side.
                View ratings, pricing, and clinic locations.
              </p>
            </div>

            {/* Provider comparison cards */}
            <div className="space-y-5">
              {surgeryProviders.map((provider) => (
                <Link
                  key={provider.slug}
                  href={`/eye-surgery/providers/${provider.slug}`}
                  className={`group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    provider.isPreferredPartner
                      ? "ring-2 ring-amber-300/60 shadow-md"
                      : "border border-gray-100 hover:border-gray-200"
                  }`}
                >
                  {/* Preferred partner top banner */}
                  {provider.isPreferredPartner && (
                    <div className="bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-white text-xs font-bold tracking-wide uppercase">
                        Preferred Partner
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row">
                    {/* Image section — left side */}
                    <div className="relative lg:w-64 h-48 lg:h-auto shrink-0 overflow-hidden">
                      <Image
                        src={
                          providerImages[provider.slug] ??
                          "/images/retinal-scan-lg.jpg"
                        }
                        alt={`${provider.name} eye surgery clinics`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 256px"
                      />
                      {/* Brand colour overlay gradient */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `linear-gradient(135deg, ${provider.brandColor} 0%, transparent 60%)`,
                        }}
                      />
                      {/* Clinic count badge on image */}
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                        <svg
                          className="w-3.5 h-3.5"
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
                        {provider.storeCount} clinics across the UK
                      </div>
                    </div>

                    {/* Content section — right side */}
                    <div className="flex-1 p-5 lg:p-6">
                      {/* Top row: name + rating */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                        <div>
                          <h3
                            className="text-xl font-bold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-1"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {provider.name}
                          </h3>
                          {/* NHS / Private / Cataract badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            {provider.nhsFunded && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)]">
                                <svg
                                  className="w-3 h-3"
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
                                NHS Funded
                              </span>
                            )}
                            {provider.privateSelfPay && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                                <svg
                                  className="w-3 h-3"
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
                                Private
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                              Cataracts: {getCataractPrice(provider)}
                            </span>
                          </div>
                        </div>

                        {/* Google review score */}
                        <div className="flex items-center gap-2 shrink-0 bg-gray-50 rounded-xl px-3 py-2">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                              <span className="text-2xl font-bold text-[var(--color-navy)]">
                                {provider.googleReview.rating}
                              </span>
                              <svg
                                className="w-5 h-5 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {provider.googleReview.reviewCount.toLocaleString()} reviews
                            </span>
                          </div>
                          {/* Rating bar */}
                          <div className="hidden sm:flex flex-col gap-0.5 ml-2">
                            {[5, 4, 3, 2, 1].map((level) => (
                              <div
                                key={level}
                                className="flex items-center gap-1"
                              >
                                <span className="text-[9px] text-gray-400 w-2 text-right">
                                  {level}
                                </span>
                                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${level <= Math.round(provider.googleReview.rating) ? (level === Math.round(provider.googleReview.rating) ? 80 : 100) : level === Math.round(provider.googleReview.rating) + 1 ? 30 : 8}%`,
                                      backgroundColor:
                                        level >= 4
                                          ? "#22c55e"
                                          : level === 3
                                            ? "#eab308"
                                            : "#ef4444",
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Key facts */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                        {provider.keyFacts.slice(0, 3).map((fact) => (
                          <div
                            key={fact}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <svg
                              className="w-4 h-4 mt-0.5 shrink-0"
                              style={{ color: provider.brandColor }}
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
                            <span className="leading-snug">{fact}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
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
                          <span className="text-xs text-gray-400 ml-1">
                            Google Reviews
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-full transition-all group-hover:gap-2.5"
                          style={{
                            backgroundColor: `${provider.brandColor}10`,
                            color: provider.brandColor,
                          }}
                        >
                          View clinics &amp; book
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA below cards */}
            <div className="text-center mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h3
                className="text-lg font-bold text-[var(--color-navy)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Not sure which provider?
              </h3>
              <p className="text-sm text-gray-500 mb-4 max-w-lg mx-auto">
                Search by postcode and we&apos;ll show you the nearest clinics
                from all providers, sorted by distance, with direct booking
                links.
              </p>
              <Link
                href="/eye-surgery/search"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
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
                Search by postcode
              </Link>
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
