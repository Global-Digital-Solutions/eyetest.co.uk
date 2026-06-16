import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { OffersTicker } from "@/components/OffersTicker";
import { HowItWorks } from "@/components/HowItWorks";
import { NHSBanner } from "@/components/NHSBanner";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { AtHomeCallout } from "@/components/AtHomeCallout";
import { ArticlesBlock } from "@/components/ArticlesBlock";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "eyetest.co.uk — Find & Book Eye Tests Near You",
  description:
    "Compare 1,000+ opticians across the UK. Find eye test appointments near you from Boots, Specsavers, Vision Express, ASDA and independents. Book online free.",
  keywords: [
    "eye test",
    "book eye test",
    "eye test near me",
    "opticians near me",
    "eye test appointment",
    "NHS eye test",
    "free eye test",
    "compare opticians",
    "eye test UK",
  ],
  openGraph: {
    title: "eyetest.co.uk — Find & Book Eye Tests Near You",
    description:
      "Compare 1,000+ opticians across the UK. Find available appointments and book online in seconds.",
    url: "https://eyetest.co.uk",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk",
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "eyetest.co.uk",
    url: "https://eyetest.co.uk",
    description:
      "Compare 1,000+ opticians across the UK. Find eye test appointments near you and book online free.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://eyetest.co.uk/search?postcode={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "eyetest.co.uk",
    url: "https://eyetest.co.uk",
    logo: "https://eyetest.co.uk/logo.png",
    description:
      "The UK's dedicated eye test comparison platform. Helping you find, compare, and book eye tests since 2019.",
    foundingDate: "2019",
    sameAs: [],
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <Hero />
        <Partners />
        <OffersTicker />
        <HowItWorks />
        <NHSBanner />
        <AtHomeCallout />
        <Benefits />
        <Testimonials />
        <ArticlesBlock />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
