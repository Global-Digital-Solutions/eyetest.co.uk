import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SurgeryEnquiryForm } from "@/components/SurgeryEnquiryForm";
import { SurgeryCallout } from "@/components/SurgeryCallout";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title:
    "Eye Surgery Enquiry — Get Matched With a Specialist | eyetest.co.uk",
  description:
    "Submit an eye surgery enquiry and our team will help connect you with the right specialist ophthalmic surgeon. NHS and private options available for cataracts, glaucoma, laser eye surgery, and more.",
  openGraph: {
    title:
      "Eye Surgery Enquiry — Get Matched With a Specialist | eyetest.co.uk",
    description:
      "Submit an eye surgery enquiry and our team will help connect you with the right specialist ophthalmic surgeon.",
    url: "https://www.eyetest.co.uk/eye-surgery/enquiry",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://www.eyetest.co.uk/eye-surgery/enquiry",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function SurgeryEnquiryPage() {
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Enquiry",
        item: "https://www.eyetest.co.uk/eye-surgery/enquiry",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <PageHero
        compact
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Eye Surgery", href: "/eye-surgery" },
          { label: "Enquiry" },
        ]}
      >
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Eye Surgery Enquiry
        </h1>
        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Complete the form below and our team will help connect you with the
          right eye surgery provider.
        </p>
      </PageHero>

      <main className="bg-gray-50">
        {/* Enquiry form section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <SurgeryEnquiryForm />

            <p className="text-center text-xs text-gray-400 mt-6">
              Our team reviews every enquiry and connects you with a qualified
              ophthalmic surgeon. We&rsquo;ll be in touch within 24 hours.
            </p>
          </div>
        </section>

        {/* Surgery callout (compact) */}
        <SurgeryCallout compact />
      </main>

      <Footer />
    </>
  );
}
