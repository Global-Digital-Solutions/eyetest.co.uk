import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GetListedForm } from "@/components/GetListedForm";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    "For Opticians — Get Your Practice Listed on eyetest.co.uk",
  description:
    "Partner with the UK's dedicated eye test comparison platform. Get your optician practice listed on eyetest.co.uk and reach thousands of patients searching for eye tests every month. Free to apply.",
  keywords: [
    "list optician practice",
    "optician listing UK",
    "eyetest.co.uk partner",
    "get listed optician",
    "optician marketing",
    "eye test platform",
    "optician partnership",
    "for opticians",
  ],
  openGraph: {
    title:
      "For Opticians — Get Your Practice Listed on eyetest.co.uk",
    description:
      "Partner with the UK's dedicated eye test comparison platform. Reach thousands of patients searching for eye tests every month.",
    url: "https://eyetest.co.uk/get-listed",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/get-listed",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: "Is there a cost to be listed?",
    a: "We offer a range of listing options, including free basic listings. Our team will discuss the available plans with you during the application review process. There is no obligation and no payment is required to apply.",
  },
  {
    q: "How long does the setup process take?",
    a: "Once your application is approved, we typically have your listing live within 5 business days. This includes creating your practice profile, verifying your details, and setting up your store locations on our platform.",
  },
  {
    q: "What information do I need to provide?",
    a: "To get started, we just need your practice name, contact details, number of locations, and the services you offer. Once approved, our team will work with you to gather additional information such as store addresses, opening hours, pricing, and any images or branding you would like to include.",
  },
  {
    q: "Can I update my listing after it goes live?",
    a: "Absolutely. You can request updates to your listing at any time, whether it is adding new services, updating pricing, changing opening hours, or adding new store locations. We aim to process all update requests within 2 business days.",
  },
  {
    q: "Do you list practices outside England?",
    a: "Yes. eyetest.co.uk covers the entire United Kingdom, including England, Scotland, Wales, and Northern Ireland. We welcome applications from practices across all four nations. We currently feature opticians in over 93 cities across the UK.",
  },
];

// ---------------------------------------------------------------------------
// Benefits data
// ---------------------------------------------------------------------------

const benefits = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: "Reach More Patients",
    description:
      "Connect with patients actively searching for eye tests in your area. Our platform drives targeted traffic from people ready to book.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
    title: "Featured Placement",
    description:
      "Get prominent placement in search results for your local area. Stand out to patients comparing opticians near them.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Free NHS Visibility",
    description:
      "Showcase your NHS services to eligible patients. We highlight NHS availability, helping patients find free eye tests near them.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
    ),
    title: "Online Booking",
    description:
      "Let patients book directly through our platform, reducing phone calls and filling your appointment book even outside office hours.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 013.006-2.599h11.988A2.999 2.999 0 0121 9.349"
        />
      </svg>
    ),
    title: "Brand Profile",
    description:
      "Get a dedicated brand page showcasing your services, pricing, store locations, and opening hours to build trust with new patients.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
    title: "Review Integration",
    description:
      "Display your Google reviews directly on your listing to build trust and credibility with new patients browsing our platform.",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function GetListedPage() {
  /* ---- Structured data ---- */
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Get Your Practice Listed on eyetest.co.uk",
    description:
      "Join the UK's dedicated eye test comparison platform. Get your optician practice listed on eyetest.co.uk and reach thousands of patients.",
    url: "https://eyetest.co.uk/get-listed",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    inLanguage: "en-GB",
  };

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
        name: "Get Listed",
        item: "https://eyetest.co.uk/get-listed",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* ================================================================ */}
        {/* 1. HERO                                                         */}
        {/* ================================================================ */}
        <section className="relative bg-gradient-to-br from-[var(--color-navy)] via-[#0f2342] to-[var(--color-navy)] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <svg
                className="w-4 h-4 text-[var(--color-primary-light)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span>Since 2019 — The UK&rsquo;s Eye Test Authority</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get Your Practice Listed on{" "}
              <span className="text-[var(--color-primary-light)]">
                eyetest.co.uk
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join the UK&rsquo;s dedicated eye test comparison platform and
              reach thousands of patients searching for eye tests every month
            </p>

            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
            >
              Apply to Get Listed
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. WHY GET LISTED — Benefits grid                               */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why get listed on eyetest.co.uk?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We help opticians across the UK connect with patients who are
                actively looking for eye tests. Here&rsquo;s what a listing gives
                you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
                    {b.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. STATS ROW                                                    */}
        {/* ================================================================ */}
        <section className="py-12 sm:py-16 bg-[var(--color-navy)]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "1,000+", label: "Opticians" },
                { value: "93", label: "UK Cities" },
                { value: "Since 2019", label: "Established" },
                { value: "100%", label: "Free for Patients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl sm:text-4xl font-bold text-[var(--color-primary-light)] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. HOW IT WORKS                                                 */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How it works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Getting your practice listed is straightforward. Here&rsquo;s the
                process from application to going live.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Apply",
                  description:
                    "Fill out the form below with your practice details. It takes less than 2 minutes and there is no commitment.",
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  ),
                },
                {
                  step: 2,
                  title: "We Verify",
                  description:
                    "Our team reviews your application, verifies your practice details, and sets up your profile with all your services and locations.",
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
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  ),
                },
                {
                  step: 3,
                  title: "Go Live",
                  description:
                    "Start receiving bookings from patients in your area. Your listing goes live within 5 business days of approval.",
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
                        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                      />
                    </svg>
                  ),
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
                    <div className="text-[var(--color-primary)]">{s.icon}</div>
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                    Step {s.step}
                  </div>
                  <h3
                    className="text-lg font-bold text-[var(--color-navy)] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. WHO CAN APPLY                                                */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Who can apply?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We welcome applications from a wide range of eye care providers
                across the UK.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <ul className="space-y-4">
                {[
                  {
                    title: "Independent opticians",
                    description:
                      "Single-location and multi-branch independent practices",
                  },
                  {
                    title: "Small and regional chains",
                    description:
                      "Regional groups with locations across one or more areas",
                  },
                  {
                    title: "NHS-registered practices",
                    description:
                      "Practices offering NHS-funded eye tests and optical vouchers",
                  },
                  {
                    title: "Private eye care clinics",
                    description:
                      "Specialist clinics offering private eye examinations and advanced diagnostics",
                  },
                  {
                    title: "Domiciliary (at-home) eye test providers",
                    description:
                      "Mobile opticians and home visit eye test services",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
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
                      <h3 className="font-semibold text-[var(--color-navy)]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. TESTIMONIAL / SOCIAL PROOF                                   */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 shadow-sm">
              {/* Quote marks */}
              <svg
                className="w-10 h-10 text-[var(--color-primary)]/20 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>

              <blockquote className="text-lg sm:text-xl text-[var(--color-navy)] leading-relaxed mb-6">
                Being listed on eyetest.co.uk has been brilliant for our
                practice. We&rsquo;ve seen a noticeable increase in new patient
                bookings, especially for NHS eye tests. The team were easy to
                work with and had our profile up within a week.
              </blockquote>

              <div>
                <p className="font-semibold text-[var(--color-navy)]">
                  Sarah Mitchell
                </p>
                <p className="text-sm text-gray-500">
                  Practice Manager, Clear Vision Opticians, Birmingham
                </p>
              </div>

              {/* Star rating */}
              <div className="flex justify-center gap-0.5 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. APPLICATION FORM                                             */}
        {/* ================================================================ */}
        <section id="apply" className="py-16 sm:py-20 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Apply Now
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Submit your application
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Tell us about your practice and we&rsquo;ll be in touch to get
                your listing set up. No commitment required.
              </p>
            </div>

            <GetListedForm />
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. FAQ                                                          */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently asked questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about getting listed on
                eyetest.co.uk. Can&rsquo;t find your answer? Get in touch with
                our team.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
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

        {/* ================================================================ */}
        {/* 9. BOTTOM CTA                                                   */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to reach more patients?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Join over 1,000 opticians already listed on eyetest.co.uk. Apply
              today and start connecting with patients in your area.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
            >
              Apply to Get Listed
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <p className="text-white/40 text-sm mt-6">
              Or email us directly at{" "}
              <a
                href="mailto:hello@eyetest.co.uk"
                className="text-[var(--color-primary-light)] hover:underline"
              >
                hello@eyetest.co.uk
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
