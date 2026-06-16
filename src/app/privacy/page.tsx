import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Privacy Policy | eyetest.co.uk",
  description:
    "Read the eyetest.co.uk privacy policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR and the Data Protection Act 2018.",
  keywords: [
    "privacy policy",
    "eyetest.co.uk privacy",
    "data protection",
    "UK GDPR",
    "cookie policy",
    "personal data",
  ],
  openGraph: {
    title: "Privacy Policy | eyetest.co.uk",
    description:
      "How eyetest.co.uk collects, uses, and protects your personal data. UK GDPR compliant.",
    url: "https://eyetest.co.uk/privacy",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/privacy",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Read the eyetest.co.uk privacy policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR and the Data Protection Act 2018.",
    url: "https://eyetest.co.uk/privacy",
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
        name: "Privacy Policy",
        item: "https://eyetest.co.uk/privacy",
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
              <span className="text-white/80">Privacy Policy</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-display)]"
            >
              Privacy Policy
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
                Welcome to eyetest.co.uk (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website at eyetest.co.uk (the &quot;Site&quot;).
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                eyetest.co.uk is operated by Global Digital Solutions. We have been operating since 2019 and are dedicated to providing a transparent, trustworthy service for comparing and booking eye tests across the United Kingdom.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This policy is provided in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Please read it carefully to understand our views and practices regarding your personal data and how we will treat it.
              </p>
            </div>

            {/* Data controller */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                2. Data Controller
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The data controller responsible for your personal data is:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700">
                <p className="font-semibold text-[var(--color-navy)]">Global Digital Solutions</p>
                <p>Trading as eyetest.co.uk</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:butlerdarin@gmail.com"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    butlerdarin@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Data we collect */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                3. Data We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect and process the following categories of personal data:
              </p>

              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-3 font-[family-name:var(--font-display)]">
                3.1 Information you provide to us
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Name, email address, and contact details when you submit an enquiry or contact us</li>
                <li>Postcode or location data when you search for opticians near you</li>
                <li>Any feedback, reviews, or correspondence you send to us</li>
                <li>Newsletter subscription details, if you choose to subscribe</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-3 font-[family-name:var(--font-display)]">
                3.2 Information collected automatically
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited, time spent on the Site, and navigation paths</li>
                <li>Referring website or search engine and keywords used</li>
                <li>Device information including screen resolution and device type</li>
                <li>Cookie and similar tracking technology data (see Section 6 below)</li>
              </ul>

              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-3 font-[family-name:var(--font-display)]">
                3.3 Information from third parties
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Analytics data from services such as Google Analytics</li>
                <li>Information from advertising partners when you arrive via a paid advertisement</li>
              </ul>
            </div>

            {/* How we use data */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                4. How We Use Your Data
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the data we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide, operate, and improve the eyetest.co.uk comparison and booking service</li>
                <li>To display relevant opticians and eye test results based on your location</li>
                <li>To respond to your enquiries and provide customer support</li>
                <li>To send you marketing communications (only with your explicit consent)</li>
                <li>To analyse website usage and improve user experience</li>
                <li>To detect, prevent, and address technical issues or fraudulent activity</li>
                <li>To comply with our legal obligations under applicable UK law</li>
              </ul>
            </div>

            {/* Legal basis */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                5. Legal Basis for Processing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under the UK GDPR, we rely on the following lawful bases to process your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose (e.g., marketing emails or non-essential cookies)
                </li>
                <li>
                  <strong>Legitimate interests:</strong> Where processing is necessary for our legitimate business interests, such as improving our services and understanding how our Site is used, provided these interests do not override your rights
                </li>
                <li>
                  <strong>Legal obligation:</strong> Where we need to process your data to comply with a legal requirement
                </li>
                <li>
                  <strong>Contractual necessity:</strong> Where processing is necessary to fulfil a contract with you or to take steps at your request before entering into a contract
                </li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Site uses cookies and similar technologies to enhance your browsing experience and to collect information about how you use the Site.
              </p>

              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-3 font-[family-name:var(--font-display)]">
                Types of cookies we use
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Strictly necessary cookies:</strong> Essential for the operation of our Site. They enable you to navigate and use its features.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Allow us to recognise and count visitors and to see how visitors move around the Site. This helps us improve the way the Site works.
                </li>
                <li>
                  <strong>Functionality cookies:</strong> Used to recognise you when you return to our Site, enabling us to personalise content and remember your preferences.
                </li>
                <li>
                  <strong>Advertising cookies:</strong> Used to deliver advertisements relevant to you and to measure the effectiveness of advertising campaigns.
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                You can control and manage cookies through your browser settings. Please note that removing or blocking certain cookies may affect the functionality of the Site.
              </p>
            </div>

            {/* Third party services */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                7. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may use the following third-party services that collect, monitor, and analyse data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Web analytics service that tracks and reports website traffic. Google&apos;s privacy policy can be found at{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    policies.google.com/privacy
                  </a>
                </li>
                <li>
                  <strong>Google Ads:</strong> Online advertising platform used for remarketing and conversion tracking
                </li>
                <li>
                  <strong>Optician booking partners:</strong> When you click through to book an appointment with an optician, you will be directed to that optician&apos;s own website, which will be governed by their own privacy policy
                </li>
                <li>
                  <strong>Hosting providers:</strong> Our website hosting infrastructure, which may process data on our behalf in accordance with strict data processing agreements
                </li>
              </ul>
            </div>

            {/* Data sharing */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                8. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell your personal data to third parties. We may share your data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>With service providers who assist in operating our website and conducting our business, under strict data processing agreements</li>
                <li>With optician partners when you choose to book an appointment through our platform</li>
                <li>When required by law, regulation, or legal process</li>
                <li>To protect the rights, property, or safety of eyetest.co.uk, our users, or others</li>
                <li>In connection with a business transfer, merger, or acquisition, where your data may be transferred as part of the business assets</li>
              </ul>
            </div>

            {/* Data retention */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                9. Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. Analytics data is typically retained for 26 months, after which it is automatically deleted or anonymised.
              </p>
            </div>

            {/* Data security */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                10. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised or unlawful processing, accidental loss, destruction, or damage. These measures include the use of HTTPS encryption across the entire Site, regular security assessments, and access controls limiting who within our organisation can access personal data. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* International transfers */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                11. International Data Transfers
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Some of our third-party service providers are based outside the United Kingdom. Where we transfer your personal data to a country outside the UK, we ensure that appropriate safeguards are in place, such as standard contractual clauses approved by the Information Commissioner&apos;s Office (ICO), or transfers to countries that have been deemed to provide an adequate level of data protection.
              </p>
            </div>

            {/* Your rights */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                12. Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under the UK GDPR, you have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Right of access:</strong> You have the right to request a copy of the personal data we hold about you
                </li>
                <li>
                  <strong>Right to rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal data
                </li>
                <li>
                  <strong>Right to erasure:</strong> You have the right to request that we delete your personal data in certain circumstances
                </li>
                <li>
                  <strong>Right to restrict processing:</strong> You have the right to request that we limit the processing of your personal data in certain circumstances
                </li>
                <li>
                  <strong>Right to data portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format
                </li>
                <li>
                  <strong>Right to object:</strong> You have the right to object to the processing of your personal data for direct marketing purposes or where we are relying on legitimate interests
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> Where we rely on your consent to process your personal data, you have the right to withdraw that consent at any time
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:butlerdarin@gmail.com"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  butlerdarin@gmail.com
                </a>
                . We will respond to your request within one month, as required by law.
              </p>
            </div>

            {/* Children's privacy */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                13. Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our Site is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13. If you become aware that a child has provided us with personal information, please contact us at{" "}
                <a
                  href="mailto:butlerdarin@gmail.com"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  butlerdarin@gmail.com
                </a>
                , and we will take steps to delete such information.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                14. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically for the latest information on our privacy practices. Continued use of the Site after any changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Complaints */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                15. Complaints
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK&apos;s supervisory authority for data protection. You can contact the ICO at{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  ico.org.uk
                </a>{" "}
                or by telephone on 0303 123 1113.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                16. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700">
                <p className="font-semibold text-[var(--color-navy)]">eyetest.co.uk</p>
                <p>Operated by Global Digital Solutions</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:butlerdarin@gmail.com"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    butlerdarin@gmail.com
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
