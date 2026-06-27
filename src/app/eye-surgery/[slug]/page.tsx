import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SurgeryCallout } from "@/components/SurgeryCallout";
import {
  getAllConditionSlugs,
  getConditionBySlug,
} from "@/data/surgery-conditions";
import { getProviderBySlug } from "@/data/surgery-providers";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string }[] {
  return getAllConditionSlugs().map((slug) => ({ slug }));
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
  const condition = getConditionBySlug(slug);

  if (!condition) {
    return { title: "Condition Not Found | eyetest.co.uk" };
  }

  const title = condition.metaTitle;
  const description = condition.metaDescription;

  return {
    title,
    description,
    keywords: [
      condition.name.toLowerCase(),
      `${condition.name.toLowerCase()} surgery`,
      `${condition.name.toLowerCase()} surgery UK`,
      `${condition.name.toLowerCase()} treatment`,
      `${condition.name.toLowerCase()} NHS`,
      `${condition.name.toLowerCase()} private`,
      "eye surgery",
      "eye surgery UK",
    ],
    openGraph: {
      title,
      description,
      url: `https://www.eyetest.co.uk/eye-surgery/${condition.slug}`,
      siteName: "eyetest.co.uk",
      type: "article",
    },
    alternates: {
      canonical: `https://www.eyetest.co.uk/eye-surgery/${condition.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SurgeryConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);

  if (!condition) {
    notFound();
  }

  // Resolve related conditions
  const relatedConditions = condition.relatedConditions
    .map((s) => getConditionBySlug(s))
    .filter(Boolean);

  // Resolve providers that treat this condition
  const providers = condition.providers
    .map((s) => getProviderBySlug(s))
    .filter(Boolean);

  // ---------------------------------------------------------------------------
  // JSON-LD schemas
  // ---------------------------------------------------------------------------

  const medicalWebPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: condition.metaTitle,
    description: condition.metaDescription,
    url: `https://www.eyetest.co.uk/eye-surgery/${condition.slug}`,
    about: {
      "@type": "MedicalCondition",
      name: condition.name,
      signOrSymptom: condition.symptoms.map((symptom) => ({
        "@type": "MedicalSymptom",
        name: symptom,
      })),
    },
    author: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
    },
    dateModified: "2026-06-27",
    lastReviewed: "2026-06-27",
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
        name: condition.name,
        item: `https://www.eyetest.co.uk/eye-surgery/${condition.slug}`,
      },
    ],
  };

  const faqJsonLd =
    condition.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: condition.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalWebPageJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}

        {/* Hero */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Eye Surgery", href: "/eye-surgery" },
            { label: condition.name },
          ]}
          compact
        >
          <div className="inline-flex items-center text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6 bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            Eye Surgery
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {condition.name}
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
            Surgery types, recovery, NHS vs private options, and FAQs
          </p>
        </PageHero>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Overview */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Overview
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-p:mb-4 prose-strong:text-[var(--color-navy)]"
                    dangerouslySetInnerHTML={{ __html: condition.overview }}
                  />
                </div>

                {/* Symptoms */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Symptoms
                  </h2>
                  <ul className="space-y-3">
                    {condition.symptoms.map((symptom) => (
                      <li
                        key={symptom}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5"
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
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When Surgery is Needed */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    When Surgery is Needed
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-p:mb-4 prose-li:mb-1 prose-strong:text-[var(--color-navy)]"
                    dangerouslySetInnerHTML={{
                      __html: condition.whenSurgeryNeeded,
                    }}
                  />
                </div>

                {/* Surgery Types */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Types of Surgery
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {condition.surgeryTypes.map((surgeryType) => (
                      <div
                        key={surgeryType.name}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
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
                                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                              />
                            </svg>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-[var(--color-navy)]">
                            {surgeryType.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {surgeryType.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery */}
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Recovery
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-p:mb-4 prose-strong:text-[var(--color-navy)]"
                    dangerouslySetInnerHTML={{ __html: condition.recovery }}
                  />
                </div>

                {/* NHS vs Private */}
                <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
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
                          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-lg font-bold text-[var(--color-navy)] mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        NHS vs Private
                      </h3>
                      <div
                        className="text-gray-700 leading-relaxed prose prose-p:mb-4 prose-strong:text-[var(--color-navy)]"
                        dangerouslySetInnerHTML={{
                          __html: condition.nhsOrPrivate,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* FAQs Accordion */}
                {condition.faqs.length > 0 && (
                  <div>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-6"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {condition.faqs.map((faq) => (
                        <details
                          key={faq.question}
                          className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                        >
                          <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-[var(--color-navy)] hover:bg-gray-50 transition-colors">
                            <span className="text-sm sm:text-base">
                              {faq.question}
                            </span>
                            <svg
                              className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
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
                          <div className="px-6 pb-5 text-sm text-gray-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Providers for this condition */}
                {providers.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Surgery Providers
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Specialists offering{" "}
                      {condition.name.toLowerCase()} treatment:
                    </p>
                    <ul className="space-y-3">
                      {providers.map(
                        (provider) =>
                          provider && (
                            <li key={provider.slug}>
                              <Link
                                href={`/eye-surgery/providers/${provider.slug}`}
                                className="flex items-center gap-3 group"
                              >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-primary)]/10">
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
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">
                                    {provider.name}
                                  </span>
                                  <span className="block text-xs text-gray-400">
                                    {provider.storeCount} clinics
                                  </span>
                                </div>
                                {provider.isPreferredPartner && (
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                    Preferred
                                  </span>
                                )}
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )}

                {/* Book an eye test CTA */}
                <div className="bg-[var(--color-navy)] rounded-2xl p-6 text-center">
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
                    Considering surgery?
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    Start with an eye test to assess your options. Book yours
                    today.
                  </p>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg w-full justify-center"
                  >
                    Book an Eye Test
                  </Link>
                </div>

                {/* Related conditions */}
                {relatedConditions.length > 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h3
                      className="text-lg font-bold text-[var(--color-navy)] mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Related Conditions
                    </h3>
                    <ul className="space-y-3">
                      {relatedConditions.map(
                        (related) =>
                          related && (
                            <li key={related.slug}>
                              <Link
                                href={`/eye-surgery/${related.slug}`}
                                className="flex items-center gap-3 group"
                              >
                                <span className="w-2 h-2 rounded-full shrink-0 bg-[var(--color-primary)]" />
                                <span className="text-sm text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">
                                  {related.name}
                                </span>
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SurgeryCallout */}
        <SurgeryCallout />

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
