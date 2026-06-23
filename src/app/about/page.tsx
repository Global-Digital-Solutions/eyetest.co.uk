import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "About Us — The UK's Eye Test Comparison Platform | eyetest.co.uk",
  description:
    "Learn about eyetest.co.uk, the UK's dedicated eye test comparison platform. Founded in 2019, we help you compare 2,400+ opticians across 97 UK cities. 100% free to use.",
  keywords: [
    "about eyetest.co.uk",
    "eye test comparison",
    "UK opticians comparison",
    "book eye test online",
    "compare opticians",
    "Global Digital Solutions",
  ],
  openGraph: {
    title: "About Us — The UK's Eye Test Comparison Platform | eyetest.co.uk",
    description:
      "Founded in 2019, eyetest.co.uk helps you compare 2,400+ opticians across the UK. Free, transparent, and independent.",
    url: "https://www.eyetest.co.uk/about",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/about",
  },
};

// ---------------------------------------------------------------------------
// Stats data
// ---------------------------------------------------------------------------

const stats = [
  { value: "2,400+", label: "Opticians compared" },
  { value: "97", label: "UK cities covered" },
  { value: "100%", label: "Free to use" },
  { value: "Since 2019", label: "Serving the UK" },
];

// ---------------------------------------------------------------------------
// Values data
// ---------------------------------------------------------------------------

const values = [
  {
    title: "Accessibility",
    description:
      "Everyone deserves access to quality eye care. We make it easy to find and compare opticians near you, whether you are looking for an NHS-funded test or a specialist private screening.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description:
      "No hidden fees, no bias. We show you clear, honest information about eye test types, costs, and what to expect so you can make informed decisions about your eye care.",
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
  {
    title: "Quality",
    description:
      "We only list opticians regulated by the General Optical Council (GOC). Our content is researched, reviewed, and kept up to date so you get reliable, trustworthy information.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AboutPage() {
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About eyetest.co.uk",
    description:
      "Learn about eyetest.co.uk, the UK's dedicated eye test comparison platform. Founded in 2019, we help you compare 2,400+ opticians across 97 UK cities.",
    url: "https://www.eyetest.co.uk/about",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
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
        item: "https://www.eyetest.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: "https://www.eyetest.co.uk/about",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Header section */}
        <section className="bg-[var(--color-navy)] py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-white/80">About Us</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-display)]"
            >
              About{" "}
              <span className="text-[var(--color-primary-light)]">
                eyetest.co.uk
              </span>
            </h1>
            <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl">
              The UK&apos;s dedicated eye test comparison platform. Helping you find, compare, and book eye tests since 2019.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] font-[family-name:var(--font-display)]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our story */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6 font-[family-name:var(--font-display)]">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                eyetest.co.uk was founded in 2019 with a simple idea: booking an eye test in the UK should be easier, faster, and more transparent. We noticed that most people found it surprisingly difficult to compare opticians, understand the different types of eye tests available, or figure out whether they qualified for a free NHS eye test.
              </p>
              <p>
                We set out to change that. Starting as a small comparison site, we have grown into the UK&apos;s most comprehensive eye test comparison platform, covering over 2,400 opticians across 97 cities. From high-street brands like Boots Opticians and Specsavers to trusted independent practices, we bring them all together in one place so you can find the right optician for your needs.
              </p>
              <p>
                Today, eyetest.co.uk is operated by Global Digital Solutions and remains committed to its founding mission: making eye care accessible and understandable for everyone in the United Kingdom.
              </p>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6 font-[family-name:var(--font-display)]">
              What We Do
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                eyetest.co.uk is a free comparison platform that helps you find and book eye tests across the United Kingdom. We are completely free to use and always will be.
              </p>
              <p>
                Here is what you can do on our platform:
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2 font-[family-name:var(--font-display)]">
                  Compare Opticians
                </h3>
                <p className="text-sm text-gray-600">
                  Search by postcode to find and compare over 2,400 opticians near you. See services offered, test types available, and whether they accept NHS patients.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
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
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2 font-[family-name:var(--font-display)]">
                  Understand Eye Tests
                </h3>
                <p className="text-sm text-gray-600">
                  Browse our comprehensive guides covering 18 types of eye tests, from routine NHS sight tests to specialist OCT scans and diabetic eye screenings.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
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
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2 font-[family-name:var(--font-display)]">
                  Find by Location
                </h3>
                <p className="text-sm text-gray-600">
                  Discover opticians in 97 cities across England, Scotland, Wales, and Northern Ireland. Local results tailored to your area.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-4">
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2 font-[family-name:var(--font-display)]">
                  Learn About Eye Health
                </h3>
                <p className="text-sm text-gray-600">
                  Access trusted, easy-to-understand information about eye conditions, symptoms, and preventive care to help you look after your vision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our values */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-8 font-[family-name:var(--font-display)]">
              Our Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {values.map((value) => (
                <div key={value.title} className="text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-navy)]/5 flex items-center justify-center text-[var(--color-primary)] mx-auto sm:mx-0 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-2 font-[family-name:var(--font-display)]">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Team */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6 font-[family-name:var(--font-display)]">
              Get in Touch
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                We would love to hear from you. Whether you have a question about our service, feedback on your experience, or a partnership enquiry, our team is here to help.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-[var(--color-navy)] mb-3 font-[family-name:var(--font-display)]">
                    General Enquiries
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    For questions, feedback, or support:
                  </p>
                  <a
                    href="mailto:hello@eyetest.co.uk"
                    className="text-sm text-[var(--color-primary)] hover:underline font-medium"
                  >
                    hello@eyetest.co.uk
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-navy)] mb-3 font-[family-name:var(--font-display)]">
                    For Opticians
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Interested in listing your practice on eyetest.co.uk?
                  </p>
                  <Link
                    href="/get-listed"
                    className="text-sm text-[var(--color-primary)] hover:underline font-medium"
                  >
                    Learn about partnering with us
                  </Link>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  eyetest.co.uk is operated by Global Digital Solutions. Registered in England and Wales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4 font-[family-name:var(--font-display)]"
            >
              Ready to find your nearest optician?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Search by postcode to compare opticians, check services, and book your eye test online. It&apos;s completely free.
            </p>
            <Link
              href="/#search"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg"
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
              Find Eye Tests Near You
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
