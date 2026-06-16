import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Terms of Service | eyetest.co.uk",
  description:
    "Terms and conditions for using eyetest.co.uk. Understand your rights and responsibilities when using our eye test comparison and booking platform.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "eyetest.co.uk terms",
    "user agreement",
    "website terms",
  ],
  openGraph: {
    title: "Terms of Service | eyetest.co.uk",
    description:
      "Terms and conditions for using the eyetest.co.uk eye test comparison and booking platform.",
    url: "https://eyetest.co.uk/terms",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/terms",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function TermsOfServicePage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description:
      "Terms and conditions for using eyetest.co.uk. Understand your rights and responsibilities when using our eye test comparison and booking platform.",
    url: "https://eyetest.co.uk/terms",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    dateModified: "2025-06-15",
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
        name: "Terms of Service",
        item: "https://eyetest.co.uk/terms",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
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
              <span className="text-white/80">Terms of Service</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-display)]"
            >
              Terms of Service
            </h1>
            <p className="mt-4 text-white/60 text-sm">
              Last updated: 15 June 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 prose prose-gray max-w-none">
            {/* Introduction */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service (&quot;Terms&quot;) govern your use of the eyetest.co.uk website (the &quot;Site&quot;) and the services provided through it. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Site.
              </p>
              <p className="text-gray-600 leading-relaxed">
                eyetest.co.uk is operated by Global Digital Solutions. References to &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; in these Terms refer to Global Digital Solutions trading as eyetest.co.uk.
              </p>
            </div>

            {/* Service description */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                2. Service Description
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                eyetest.co.uk is a comparison and booking platform that enables users to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Search for and compare opticians across the United Kingdom</li>
                <li>View information about different types of eye tests, including costs, duration, and NHS coverage</li>
                <li>Access educational content about eye health conditions and guides</li>
                <li>Find opticians by location, brand, and service type</li>
                <li>Click through to optician websites to book appointments</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                The Site is a comparison and information service. We are not an opticians practice and do not provide eye tests, optical services, or medical advice. When you book an appointment through a link on our Site, you enter into a direct relationship with the relevant optician, and their own terms and conditions will apply.
              </p>
            </div>

            {/* Eligibility */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                3. Eligibility
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Site is intended for use by individuals who are at least 16 years of age. By using the Site, you represent and warrant that you are at least 16 years old. If you are under 16, you may only use the Site with the involvement and consent of a parent or guardian.
              </p>
            </div>

            {/* User responsibilities */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                4. User Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When using the Site, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Use the Site only for lawful purposes and in accordance with these Terms</li>
                <li>Provide accurate and truthful information when submitting enquiries or forms</li>
                <li>Not use the Site in any way that could damage, disable, overburden, or impair it</li>
                <li>Not attempt to gain unauthorised access to any part of the Site, its servers, or any systems connected to it</li>
                <li>Not use any automated tools, bots, scrapers, or similar technology to access or collect data from the Site without our express written permission</li>
                <li>Not transmit any viruses, malware, or other harmful code</li>
                <li>Not use the Site to send unsolicited communications or spam</li>
                <li>Not reproduce, duplicate, copy, sell, or otherwise exploit any part of the Site for commercial purposes without our prior written consent</li>
              </ul>
            </div>

            {/* Intellectual property */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content on the Site, including but not limited to text, graphics, logos, icons, images, data compilations, and software, is the property of Global Digital Solutions or its content licensors and is protected by United Kingdom and international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The eyetest.co.uk name, logo, and all related marks are trademarks of Global Digital Solutions. You may not use these marks without our prior written permission.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You are granted a limited, non-exclusive, non-transferable licence to access and use the Site for personal, non-commercial purposes. This licence does not include the right to modify, reproduce, distribute, or create derivative works from any content on the Site.
              </p>
            </div>

            {/* Third-party links */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                6. Third-Party Links and Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Site contains links to third-party websites, including optician booking pages, NHS resources, and other external services. These links are provided for your convenience and information only.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites. When you follow a link to a third-party site, you do so at your own risk and are subject to that site&apos;s own terms and conditions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may receive referral fees or commissions from optician partners when you book an appointment through our Site. This does not affect the price you pay for any eye test or service.
              </p>
            </div>

            {/* Accuracy of information */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                7. Accuracy of Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We make reasonable efforts to ensure the information on the Site is accurate and up to date. However, we do not guarantee the accuracy, completeness, or reliability of any content on the Site, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Eye test prices, which may vary by optician and location</li>
                <li>Appointment availability, which is subject to change</li>
                <li>Optician opening hours and service offerings</li>
                <li>NHS eligibility criteria, which may be updated by the UK Government</li>
                <li>Medical and health information, which is provided for general educational purposes only</li>
              </ul>
            </div>

            {/* Disclaimers */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                8. Disclaimers
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>The Site will be available at all times or without interruption</li>
                <li>The Site will be free from errors, viruses, or other harmful components</li>
                <li>Any defects will be corrected in a timely manner</li>
                <li>The results obtained from using the Site will be accurate or reliable</li>
              </ul>
            </div>

            {/* Limitation of liability */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To the fullest extent permitted by applicable law, Global Digital Solutions and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Loss of profits, revenue, or data</li>
                <li>Loss of goodwill or reputation</li>
                <li>Costs of substitute services</li>
                <li>Any damages arising from your use of or inability to use the Site</li>
                <li>Any damages arising from any service provided by a third-party optician booked through the Site</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                10. Indemnification
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Global Digital Solutions and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the Site, your violation of these Terms, or your violation of any rights of another party.
              </p>
            </div>

            {/* Modifications */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                11. Modifications to the Site and Terms
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to modify, suspend, or discontinue any part of the Site at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Site.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may revise these Terms from time to time. The most current version will always be posted on this page with an updated revision date. By continuing to use the Site after any revisions become effective, you agree to be bound by the revised Terms.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                12. Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your access to the Site immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Site will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>

            {/* Governing law */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                13. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Any disputes arising out of or in connection with these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales. However, if you are a consumer resident in another part of the United Kingdom (Scotland or Northern Ireland), you may also bring proceedings in the courts of that jurisdiction.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                14. Severability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>
            </div>

            {/* Entire agreement */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                15. Entire Agreement
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms, together with our{" "}
                <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/disclaimer" className="text-[var(--color-primary)] hover:underline">
                  Medical Disclaimer
                </Link>
                , constitute the entire agreement between you and Global Digital Solutions regarding your use of the Site, and supersede all prior agreements, understandings, and representations.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                16. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700">
                <p className="font-semibold text-[var(--color-navy)]">eyetest.co.uk</p>
                <p>Operated by Global Digital Solutions</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:hello@eyetest.co.uk"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    hello@eyetest.co.uk
                  </a>
                </p>
                <p>Website: eyetest.co.uk</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
