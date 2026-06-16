import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Medical Disclaimer | eyetest.co.uk",
  description:
    "Important medical disclaimer for eyetest.co.uk. The information on this site is for general educational purposes only and does not constitute medical advice. Always consult a qualified optometrist or ophthalmologist.",
  keywords: [
    "medical disclaimer",
    "eye health disclaimer",
    "eyetest.co.uk disclaimer",
    "not medical advice",
    "optometrist advice",
    "GOC regulated",
  ],
  openGraph: {
    title: "Medical Disclaimer | eyetest.co.uk",
    description:
      "Important medical disclaimer. eyetest.co.uk does not provide medical advice. Always consult a qualified eye care professional.",
    url: "https://www.eyetest.co.uk/disclaimer",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/disclaimer",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function DisclaimerPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Medical Disclaimer",
    description:
      "Important medical disclaimer for eyetest.co.uk. The information on this site is for general educational purposes only and does not constitute medical advice.",
    url: "https://www.eyetest.co.uk/disclaimer",
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://www.eyetest.co.uk",
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
        item: "https://www.eyetest.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Medical Disclaimer",
        item: "https://www.eyetest.co.uk/disclaimer",
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
              <span className="text-white/80">Medical Disclaimer</span>
            </nav>

            <h1
              className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-display)]"
            >
              Medical Disclaimer
            </h1>
            <p className="mt-4 text-white/60 text-sm">
              Last updated: 15 June 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 prose prose-gray max-w-none">
            {/* Important notice */}
            <div className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <div>
                  <h2 className="text-lg font-bold text-amber-800 mb-2 font-[family-name:var(--font-display)]">
                    Important Notice
                  </h2>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    The information provided on eyetest.co.uk is for general informational and educational purposes only. It is not intended as, and should not be understood or construed as, medical advice, diagnosis, or treatment. Always seek the advice of a qualified optometrist, ophthalmologist, or other qualified health care provider with any questions you may have regarding your eye health or a medical condition.
                  </p>
                </div>
              </div>
            </div>

            {/* Not medical advice */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                1. Not Medical Advice
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                eyetest.co.uk is a comparison and information platform. We are not a medical practice, opticians, or healthcare provider. The content on this Site, including but not limited to articles about eye conditions, guides about eye tests, and general eye health information, is provided for educational and informational purposes only.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                No content on this Site should be relied upon as a substitute for professional medical advice, diagnosis, or treatment. The information on this Site does not cover all possible uses, directions, precautions, drug interactions, or adverse effects, and should not be used to diagnose or treat any eye condition or disease without the guidance of a qualified professional.
              </p>
              <p className="text-gray-600 leading-relaxed">
                If you think you may have a medical emergency involving your eyes or vision, call your doctor, go to your nearest Accident and Emergency department, or call 999 immediately.
              </p>
            </div>

            {/* Consult a qualified professional */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                2. Consult a Qualified Optometrist
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strongly recommend that you consult with a qualified, registered optometrist or ophthalmologist for any concerns about your eye health or vision. All optometrists and dispensing opticians in the United Kingdom must be registered with the General Optical Council (GOC), the regulatory body for the optical profession.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                You should seek professional eye care advice:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Before making any decisions about your eye health or vision based on information found on this Site</li>
                <li>If you experience any sudden changes in your vision, including flashes, floaters, loss of peripheral vision, or sudden blurred vision</li>
                <li>If you experience eye pain, redness, swelling, or discharge</li>
                <li>If you have a family history of eye conditions such as glaucoma, macular degeneration, or retinal detachment</li>
                <li>If you have a systemic condition that can affect your eyes, such as diabetes, high blood pressure, or autoimmune disorders</li>
                <li>For routine eye examinations at intervals recommended by your eye care professional (typically every two years for most adults)</li>
              </ul>
            </div>

            {/* Professional standards */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                3. Professional Standards and Regulation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The opticians listed on eyetest.co.uk are regulated by the General Optical Council (GOC). The GOC sets standards of practice, conduct, and performance for registrants and ensures they are met. This includes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Optometrists, who are qualified to examine eyes, test sight, and detect eye disease</li>
                <li>Dispensing opticians, who are qualified to fit and supply optical appliances</li>
                <li>Student optometrists and student dispensing opticians who are training under supervision</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                You can verify that an optometrist or dispensing optician is registered with the GOC by visiting{" "}
                <a
                  href="https://www.optical.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  optical.org
                </a>
                . We encourage you to check the registration of any practitioner before receiving care.
              </p>
            </div>

            {/* Information accuracy */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                4. Information Accuracy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                While we strive to provide accurate, current, and reliable information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Site.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Medical knowledge and guidelines evolve constantly. Information on this Site may not reflect the most recent medical research, clinical guidelines, or NHS policy changes. Specific areas where information may change include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>NHS eligibility criteria for free eye tests</li>
                <li>Clinical guidelines for screening intervals and diagnostic procedures</li>
                <li>Treatment options and their availability on the NHS</li>
                <li>Pricing and availability of eye tests at specific opticians</li>
                <li>Descriptions of eye conditions, symptoms, and risk factors</li>
              </ul>
            </div>

            {/* Emergency situations */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                5. Emergency Situations
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-base font-bold text-red-800 mb-2 font-[family-name:var(--font-display)]">
                      If you are experiencing an eye emergency
                    </h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      Do not use this website to seek emergency medical assistance. If you experience sudden vision loss, severe eye pain, a chemical burn to the eye, a foreign object embedded in the eye, or any other eye emergency, contact emergency services immediately by calling 999 or go to your nearest Accident and Emergency department.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Symptoms that may indicate an eye emergency include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Sudden loss of vision in one or both eyes</li>
                <li>Sudden appearance of a large number of floaters or flashing lights</li>
                <li>A shadow or curtain appearing over part of your vision</li>
                <li>Severe eye pain, especially if accompanied by nausea or vomiting</li>
                <li>Chemical exposure to the eye</li>
                <li>A penetrating injury to the eye</li>
                <li>Double vision that comes on suddenly</li>
              </ul>
            </div>

            {/* No patient-practitioner relationship */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                6. No Patient-Practitioner Relationship
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Use of this Site does not create a patient-practitioner or patient-doctor relationship between you and eyetest.co.uk, Global Digital Solutions, or any of the opticians or practitioners listed on the Site. Such a relationship is only formed when you attend an appointment with a registered practitioner and they undertake to provide you with clinical care.
              </p>
            </div>

            {/* External links */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                7. External Links and Resources
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This Site may contain links to external websites, including NHS resources, medical charities, and optical professional bodies. These links are provided for informational purposes only and do not imply endorsement. We are not responsible for the content, accuracy, or practices of any external website. We encourage you to read the privacy policy and terms of use of any external site you visit.
              </p>
            </div>

            {/* Limitation of liability */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, eyetest.co.uk and Global Digital Solutions shall not be liable for any injury, loss, or damage arising from your reliance on the information provided on this Site. Any reliance you place on such information is strictly at your own risk. We are not liable for any decisions you make, or actions you take or fail to take, based on the content of this Site.
              </p>
            </div>

            {/* Updates */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                9. Updates to This Disclaimer
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Medical Disclaimer from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated revision date. We encourage you to review this disclaimer periodically.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-4 font-[family-name:var(--font-display)]">
                10. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Medical Disclaimer, please contact us:
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
