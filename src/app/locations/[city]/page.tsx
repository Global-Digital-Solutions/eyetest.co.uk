import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import { AtHomeCallout } from "@/components/AtHomeCallout";
import {
  locations,
  getLocationBySlug,
  getAllSlugs,
  getLocationsByRegion,
} from "@/data/locations";
import {
  getAvailableOpticians,
  getUnavailableOpticians,
  getOpticiansByLocation,
} from "@/data/opticians";
import { eyeTests } from "@/data/eye-tests";
import { eyeConditions } from "@/data/eye-health";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export function generateStaticParams(): { city: string }[] {
  return getAllSlugs().map((slug) => ({ city: slug }));
}

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return { title: "Location Not Found | eyetest.co.uk" };
  }

  const title = `Eye Tests in ${location.name} — Compare & Book | eyetest.co.uk`;
  const description = `Compare eye test appointments in ${location.name}, ${location.county}. Find NHS and private opticians, check same-day availability, and book online for free.`;

  return {
    title,
    description,
    keywords: [
      `eye test ${location.name}`,
      `opticians ${location.name}`,
      `eye test near me ${location.name}`,
      `NHS eye test ${location.name}`,
      `book eye test ${location.name}`,
      `${location.name} opticians`,
      `free eye test ${location.name}`,
      `eye test cost ${location.name}`,
      `opticians near me ${location.name}`,
      `${location.name} eye care`,
      `private eye test ${location.name}`,
      `children's eye test ${location.name}`,
      `contact lens fitting ${location.name}`,
      `OCT scan ${location.name}`,
      `eye health ${location.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://eyetest.co.uk/locations/${location.slug}`,
      siteName: "eyetest.co.uk",
      type: "website",
    },
    alternates: {
      canonical: `https://eyetest.co.uk/locations/${location.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const availableOpticians = getAvailableOpticians();
  const unavailableOpticians = getUnavailableOpticians();
  const localOpticians = getOpticiansByLocation(location.slug);
  const localAvailable = localOpticians.filter((o) => o.available);
  const localUnavailable = localOpticians.filter((o) => !o.available);
  const nearbyLocations = location.nearbyAreas
    .map((slug) => getLocationBySlug(slug))
    .filter(Boolean);
  const regionSiblings = getLocationsByRegion(location.region).filter(
    (l) => l.slug !== location.slug
  );

  // Eye test types for internal linking
  const popularEyeTests = eyeTests.slice(0, 8);

  // Eye conditions for internal linking
  const commonConditions = eyeConditions.slice(0, 6);

  // FAQ data
  const faqItems = [
    {
      q: `Where can I get an eye test in ${location.name}?`,
      a: `You can compare and book eye tests from multiple opticians in ${location.name} through eyetest.co.uk. We list both NHS and private providers, including high-street chains like Boots Opticians and ASDA Opticians, as well as independent practices in the ${location.county} area. Simply enter the postcode ${location.postcode} to see all available options near you, compare prices, and book an appointment online in seconds.`,
    },
    {
      q: `How much does an eye test cost in ${location.name}?`,
      a: `Eye test prices in ${location.name} typically range from free (NHS-funded) to around £39 for a private examination. Many people qualify for free NHS eye tests, including those over 60, under 16, those on certain benefits, and people with specific medical conditions. Budget opticians such as ASDA offer private tests from £20, while premium independent opticians may charge up to £79 for enhanced examinations with OCT scanning.`,
    },
    {
      q: `Can I get a free eye test in ${location.name}?`,
      a: `Yes, free NHS-funded eye tests are available at most opticians in ${location.name}. You qualify if you are under 16 (or under 19 in full-time education), aged 60 or over, receiving certain means-tested benefits such as Universal Credit or Income Support, diagnosed with diabetes or glaucoma, or aged 40 or over with a close family member who has glaucoma. Use eyetest.co.uk to find NHS-registered opticians near ${location.postcode}.`,
    },
    {
      q: `Which opticians in ${location.name} offer NHS eye tests?`,
      a: `Most opticians in ${location.name} accept NHS patients, including Boots Opticians, ASDA Opticians, and many independent practices. You can filter for NHS availability when searching on eyetest.co.uk. All NHS-registered opticians must provide the same standard of clinical care, so the quality of your eye test will be consistent regardless of which practice you choose.`,
    },
    {
      q: `How often should I have an eye test?`,
      a: `The NHS and the College of Optometrists recommend an eye test every two years for most adults. However, you may need more frequent tests if you are over 70, have diabetes, have a family history of glaucoma or other eye conditions, wear contact lenses, or have been advised by your optometrist to return sooner. Children should have their eyes tested annually. Your optician in ${location.name} can advise on the right frequency for your individual circumstances.`,
    },
    {
      q: `Can I book an eye test online in ${location.name}?`,
      a: `Yes, eyetest.co.uk makes it easy to book eye tests online in ${location.name}. Simply enter your postcode or the postcode ${location.postcode}, compare available appointments from multiple opticians, and book your preferred slot instantly. You will receive a confirmation email with all the details you need, including the practice address and what to bring to your appointment.`,
    },
    {
      q: `Do I need a referral for an eye test?`,
      a: `No, you do not need a GP referral to have an eye test in the UK. You can book directly with any optician in ${location.name} through eyetest.co.uk or by contacting the practice. Eye tests are provided by qualified optometrists who are registered with the General Optical Council. If your optometrist finds anything that needs further investigation, they can refer you directly to a hospital eye specialist.`,
    },
    {
      q: `What should I bring to my eye test?`,
      a: `When attending your eye test in ${location.name}, bring your current glasses or contact lenses, any previous prescription you have, a list of medications you take, and your NHS exemption certificate or proof of benefits if you are claiming a free NHS test. If you wear contact lenses, you may be asked to remove them before certain tests, so bringing your glasses case is useful. Arrive a few minutes early to complete any registration paperwork.`,
    },
  ];

  // Structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Eye Tests in ${location.name}`,
    description: location.description,
    url: `https://eyetest.co.uk/locations/${location.slug}`,
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    about: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.county,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
        name: "Locations",
        item: "https://eyetest.co.uk/locations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `https://eyetest.co.uk/locations/${location.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Eye Test Services in ${location.name}`,
    description: `Compare and book eye tests from opticians in ${location.name}, ${location.county}. NHS and private eye tests available.`,
    url: `https://eyetest.co.uk/locations/${location.slug}`,
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.county,
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    medicalSpecialty: "Optometry",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        {/* Hero */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Locations", href: "/locations" },
            { label: location.name },
          ]}
          compact
        >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <svg className="w-4 h-4 text-[var(--color-primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {location.county} &middot; {location.region}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Eye tests in{" "}
                <span className="text-[var(--color-primary-light)]">
                  {location.name}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                {location.description}
              </p>

              {/* Search form pre-filled with postcode */}
              <HeroSearchForm defaultValue={location.postcode} />

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% free
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  NHS &amp; private
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Same-day slots
                </span>
              </div>
        </PageHero>

        {/* ================================================================= */}
        {/* SECTION 1: Rich Introduction */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Finding the right eye test in {location.name}, {location.county}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4 mb-10">
              <p>
                Whether you need a routine sight test, a specialist contact lens fitting, or an advanced OCT scan to check for conditions like glaucoma and macular degeneration, {location.name} offers a wide range of eye care services from both national chains and trusted independent practices. With {localOpticians.length} optician brands serving the {location.name} area, residents of {location.county} have plenty of choice when it comes to looking after their vision.
              </p>
              <p>
                Eye care in {location.name} spans the full spectrum, from affordable NHS-funded sight tests available at no cost to eligible patients, through to premium private examinations that incorporate the latest diagnostic technology. Major high-street names such as Boots Opticians and ASDA Opticians operate alongside smaller, community-focused independent practices that many locals prefer for their longer appointment times and more personal service. Each offers a slightly different experience, and eyetest.co.uk is here to help you compare them all in one place.
              </p>
            </div>

            {/* Visual highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-navy)] to-[#0f2342] p-6 text-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary)]/10 rounded-full -translate-y-8 translate-x-8" />
                <svg className="w-8 h-8 text-[var(--color-primary-light)] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <h3 className="font-semibold mb-1 text-sm">Early Detection</h3>
                <p className="text-xs text-white/70">Eye tests detect glaucoma, cataracts, and macular degeneration years before symptoms appear</p>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#0a8a86] p-6 text-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <svg className="w-8 h-8 text-white/90 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold mb-1 text-sm">Every 2 Years</h3>
                <p className="text-xs text-white/80">The College of Optometrists recommends eye tests at least every two years for adults</p>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#005eb8] to-[#003d7a] p-6 text-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <svg className="w-8 h-8 text-blue-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <h3 className="font-semibold mb-1 text-sm">Beyond Glasses</h3>
                <p className="text-xs text-white/80">Eye tests also detect high blood pressure, diabetes, and other general health issues</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                Regular eye tests are one of the most important health checks available, yet millions of people across the UK skip them or leave it too long between appointments. For residents of {location.name} and the surrounding {location.county} area, booking an eye test has never been easier. You can search by the postcode {location.postcode} on eyetest.co.uk to see every available optician near you, compare prices and services side by side, check real-time appointment availability, and book online in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: Eye Test Costs in [Location] */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--color-navy)] via-[#0f2342] to-[var(--color-navy)] relative overflow-hidden">
          {/* Dot pattern decoration */}
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="max-w-4xl mx-auto px-4 relative">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Eye test costs in {location.name}
            </h2>
            <div className="prose prose-lg max-w-none text-white/70 space-y-4">
              <p>
                The cost of an eye test in {location.name} depends on the type of examination you choose and whether you qualify for a free NHS-funded test. Here is what you can expect to pay at opticians across {location.county}:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider bg-[var(--color-nhs-blue)] text-white px-2.5 py-1 rounded-full">NHS</span>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[var(--color-primary-light)] mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">NHS eye test</h3>
                <p className="text-2xl font-bold text-[var(--color-success)] mb-2">Free</p>
                <p className="text-sm text-white/60">Available to eligible patients including under-16s, over-60s, those on qualifying benefits, and people with diabetes or glaucoma.</p>
              </div>

              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider bg-[var(--color-primary)] text-white px-2.5 py-1 rounded-full">Standard</span>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[var(--color-primary-light)] mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">Private eye test</h3>
                <p className="text-2xl font-bold text-white mb-2">£20 &ndash; £39</p>
                <p className="text-sm text-white/60">Standard private examinations at high-street opticians. ASDA offers from £20, Boots from £25, and independents typically from £30&ndash;£39.</p>
              </div>

              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider bg-purple-500 text-white px-2.5 py-1 rounded-full">Enhanced</span>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-purple-300 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">Enhanced with OCT scan</h3>
                <p className="text-2xl font-bold text-white mb-2">£35 &ndash; £79</p>
                <p className="text-sm text-white/60">Advanced examinations including Optical Coherence Tomography for early detection of glaucoma, macular degeneration, and diabetic eye disease.</p>
              </div>
            </div>

            <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex gap-4">
              <svg className="w-6 h-6 text-[var(--color-primary-light)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-sm text-white/70 leading-relaxed">
                Many residents of {location.name} qualify for a free NHS-funded eye test without realising it. If you receive Universal Credit, Income Support, Pension Credit, or other qualifying benefits, your eye test is fully covered. The NHS also provides optical vouchers towards the cost of glasses for eligible patients, which can mean a basic pair is entirely free. Even if you do not qualify for NHS funding, comparing prices across opticians in {location.name} on eyetest.co.uk can save you money, as prices vary significantly between providers.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: Available Opticians Comparison */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Opticians in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compare {localOpticians.length} optician brands available in the {location.name} area. View services, pricing, and NHS availability, then book directly through eyetest.co.uk.
              </p>
            </div>

            {/* Available brands */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {localAvailable.map((optician) => (
                <Link
                  key={optician.slug}
                  href={`/opticians/${optician.slug}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                  style={{ borderLeft: `4px solid ${optician.brandColor}` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ backgroundColor: optician.brandColor }}
                    >
                      {optician.shortName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors">
                        {optician.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {optician.storeCount}+ stores nationwide
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {optician.description.slice(0, 150)}...
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs bg-[var(--color-success)]/10 text-[var(--color-success)] px-2.5 py-1 rounded-full font-medium">
                      <span className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full" />
                      Book online
                    </span>
                    {optician.nhsAvailable && (
                      <span className="inline-flex items-center text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                        NHS
                      </span>
                    )}
                    <span className="text-xs text-gray-500 px-2.5 py-1">
                      {optician.priceRange}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {optician.highlights.slice(0, 2).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <svg className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)] transition-colors flex items-center gap-1">
                      View details &amp; book
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Coming soon brands */}
            {localUnavailable.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-4">
                  Coming soon to eyetest.co.uk
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {localUnavailable.map((optician) => (
                    <div
                      key={optician.slug}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 opacity-60"
                        style={{ backgroundColor: optician.brandColor }}
                      >
                        {optician.shortName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          {optician.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {optician.storeCount}+ stores &middot; Coming soon
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: What to Expect from an Eye Test */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-[var(--color-primary)]/5 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What to expect from an eye test in {location.name}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                If it has been a while since your last eye test, or if this is your first visit to an optician in {location.name}, it helps to know what to expect. A standard eye test typically lasts between 20 and 30 minutes, though enhanced examinations with additional tests such as OCT scanning may take up to 45 minutes. Here is a step-by-step guide to what happens during a typical appointment:
              </p>
            </div>

            <div className="mt-8 space-y-6 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[27px] top-[40px] bottom-[40px] w-0.5 bg-[var(--color-primary)]/20 hidden sm:block" />
              {[
                {
                  step: "1",
                  title: "Health and lifestyle discussion",
                  desc: `Your optometrist will begin by asking about your general health, any medications you take, your family history of eye conditions, and any specific concerns you have about your vision. This helps them tailor the examination to your individual needs.`,
                },
                {
                  step: "2",
                  title: "Visual acuity test",
                  desc: `You will be asked to read letters on a chart at a distance, typically using one eye at a time and then both together. This measures how clearly you can see and whether your current prescription (if you have one) is still accurate.`,
                },
                {
                  step: "3",
                  title: "Refraction test",
                  desc: `Using a trial frame or automated refractor, your optometrist will determine your exact prescription by asking you to compare different lens options. This is the "which is clearer, one or two?" part of the test that most people are familiar with.`,
                },
                {
                  step: "4",
                  title: "Eye pressure check",
                  desc: `A tonometry test measures the pressure inside your eyes, which is an important screening tool for glaucoma. This may involve a gentle puff of air or a small probe touching the surface of your eye (after numbing drops are applied).`,
                },
                {
                  step: "5",
                  title: "Internal and external eye examination",
                  desc: `Your optometrist will examine the front of your eyes using a slit lamp microscope and the back of your eyes (retina, optic nerve, and blood vessels) using an ophthalmoscope or retinal camera. This checks for signs of disease and damage.`,
                },
                {
                  step: "6",
                  title: "Results and recommendations",
                  desc: `At the end of the appointment, your optometrist will explain their findings, provide your prescription if you need glasses or contact lenses, and advise when you should have your next test. If they detect anything that needs further investigation, they can refer you directly to a specialist.`,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative flex gap-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-base shrink-0 relative z-10">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-navy)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                Many opticians in {location.name} also offer advanced tests that go beyond the standard examination. OCT scanning, for example, uses light waves to create detailed 3D images of the retina and optic nerve, detecting conditions like glaucoma and macular degeneration years before symptoms appear. Visual field testing maps your peripheral vision to identify blind spots. These tests are typically available as optional add-ons, and your optometrist can advise whether they would be beneficial based on your age, health, and risk factors.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: NHS Eye Tests in [Location] */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NHS eye tests in {location.name}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                The NHS provides free eye tests to a wide range of people, and most opticians in {location.name} are registered to offer NHS-funded sight tests. If you are eligible, you pay nothing for your eye test and may also receive an NHS optical voucher to help with the cost of glasses or contact lenses. Understanding who qualifies and how the system works can save you money and ensure you are getting the eye care you are entitled to.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-navy)] mt-8 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Who qualifies for a free NHS eye test?
              </h3>
              <p>You are entitled to a free NHS-funded sight test if you meet any of the following criteria:</p>
            </div>

            <div className="mt-4 border-l-4 border-[var(--color-nhs-blue)] bg-[var(--color-nhs-blue)]/5 rounded-r-2xl p-6">
              <ul className="space-y-3">
                {[
                  "You are under 16 years of age",
                  "You are under 19 and in full-time education",
                  "You are aged 60 or over",
                  "You have been diagnosed with diabetes or glaucoma",
                  "You are aged 40 or over and have a close relative (parent, sibling, or child) with glaucoma",
                  "You are registered blind or partially sighted",
                  "You receive Income Support, income-based Jobseeker's Allowance, Pension Credit Guarantee Credit, or Universal Credit (and meet the criteria)",
                  "You are named on a valid NHS tax credit exemption certificate (HC2) or entitled to partial help (HC3)",
                  "You are a prisoner on leave from prison",
                  "You have been prescribed complex lenses",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-nhs-blue)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 prose prose-lg max-w-none text-gray-600 space-y-4">
              <h3 className="text-xl font-semibold text-[var(--color-navy)] mt-8 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                How to book an NHS eye test in {location.name}
              </h3>
              <p>
                Booking an NHS eye test in {location.name} is straightforward. Simply search on eyetest.co.uk using the postcode {location.postcode} and filter for opticians that accept NHS patients. When you book your appointment, let the practice know you would like an NHS-funded test, and bring your proof of eligibility (such as your benefits letter, HC2 certificate, or proof of age) with you on the day.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-navy)] mt-8 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                NHS optical vouchers
              </h3>
              <p>
                If you are eligible for a free NHS eye test and you need glasses or contact lenses, you may also receive an NHS optical voucher. This voucher provides a fixed amount towards the cost of your eyewear, with the value depending on your prescription strength. For many people, particularly children and those with straightforward prescriptions, the voucher can cover the full cost of a basic pair of glasses. Your optician in {location.name} will apply the voucher automatically and let you know if there is any remaining balance to pay.
              </p>

              <h3 className="text-xl font-semibold text-[var(--color-navy)] mt-8 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Which opticians in {location.name} accept NHS patients?
              </h3>
              <p>
                The majority of opticians in {location.name} are registered to provide NHS-funded eye tests. This includes major chains such as Boots Opticians and ASDA Opticians, as well as most independent practices. When comparing opticians on eyetest.co.uk, look for the NHS badge to confirm that a practice accepts NHS patients. If you are unsure about your eligibility, any optician can check for you when you call to book.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: Types of Eye Tests Available */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Types of eye tests available in {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Opticians across {location.county} offer a range of eye tests to suit different needs, ages, and health conditions. Here are the main types available:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularEyeTests.map((test) => (
                <Link
                  key={test.slug}
                  href={`/eye-tests/${test.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 border-t-2 border-t-transparent hover:border-t-[var(--color-primary)] shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 transition-all"
                >
                  <h3 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                    {test.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {test.shortDescription}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{test.duration}</span>
                    <span className="font-medium text-[var(--color-primary)]">
                      Learn more &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 max-w-4xl mx-auto prose prose-lg text-gray-600 space-y-4">
              <p>
                Beyond these standard offerings, many opticians in {location.name} also provide specialist services such as{" "}
                <Link href="/eye-tests/dry-eye-assessment" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">dry eye assessments</Link>,{" "}
                <Link href="/eye-tests/myopia-management" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">myopia management for children</Link>, and{" "}
                <Link href="/eye-tests/cataract-assessment" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">cataract assessments</Link>. If you are unsure which type of eye test is right for you, your optician can advise based on your age, medical history, and any symptoms you are experiencing.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: Eye Health in [Location] */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--color-navy)] to-[#0f2342] relative overflow-hidden">
          {/* Dot pattern decoration */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="max-w-4xl mx-auto px-4 relative">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Eye health in {location.name}
            </h2>
            <div className="prose prose-lg max-w-none text-white/70 space-y-4">
              <p>
                Protecting your eye health starts with regular eye tests, but it is also important to be aware of common conditions that can affect your vision. Many eye conditions develop gradually without obvious symptoms, which is why routine screening is so valuable. Opticians in {location.name} are equipped to detect and manage a wide range of eye health issues, and can refer you to specialist hospital services when needed.
              </p>
              <p>
                Some of the most common eye conditions seen by optometrists in the {location.county} area include age-related macular degeneration, glaucoma, cataracts, dry eye syndrome, and diabetic retinopathy. Early detection through regular eye tests is the best way to protect your sight, as many of these conditions can be treated or managed effectively if caught early enough.
              </p>
              <p>
                If you experience any sudden changes in your vision, such as flashes of light, a sudden increase in floaters, loss of vision, or a painful red eye, you should seek urgent attention from your optician or visit A&amp;E. Many opticians in {location.name} participate in the NHS Minor Eye Conditions Service (MECS), which provides free urgent eye care for conditions that do not require a hospital visit.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonConditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/eye-health/conditions/${condition.slug}`}
                  className="group flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all"
                >
                  <svg className="w-5 h-5 text-[var(--color-primary-light)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-white group-hover:text-[var(--color-primary-light)] transition-colors">
                    {condition.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* Why book through eyetest.co.uk */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Why book through eyetest.co.uk?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We help people in {location.name} find great local opticians
                they didn&apos;t know existed. Save hours searching and book
                instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                  title: "Instant comparison",
                  desc: `See every optician near ${location.postcode} on one page. Compare prices, services, and real-time availability without visiting multiple websites.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "Trusted & independent",
                  desc: `We're not owned by any optician chain. Our ${location.name} results show genuine availability from both independent and high-street opticians.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  ),
                  title: "Completely free",
                  desc: "Our service costs nothing to use. No registration, no hidden fees. Just search, compare, and book.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Same-day appointments",
                  desc: `Need an urgent eye test in ${location.name}? Many opticians offer same-day and next-day slots. We show you who has availability right now.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  ),
                  title: "Discover local gems",
                  desc: `${location.name} has brilliant independent opticians beyond the big chains. We help you discover practices with more personal service and specialist expertise.`,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  ),
                  title: "NHS eligibility check",
                  desc: "Not sure if you qualify for a free NHS eye test? We help you check eligibility and find NHS-registered opticians near you.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 ${index < 3 ? 'bg-gradient-to-br from-[var(--color-primary)] to-[#0a8a86]' : 'bg-gradient-to-br from-[var(--color-navy)] to-[#0f2342]'}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: FAQ */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Eye test FAQs for {location.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Common questions about booking and attending eye tests in {location.name}, {location.county}.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white border border-gray-100 rounded-2xl shadow-sm border-l-4 border-l-[var(--color-primary)]/30 group-open:border-l-[var(--color-primary)]"
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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

        {/* ================================================================= */}
        {/* CTA */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to book an eye test in {location.name}?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Compare opticians, check real-time availability, and book your
              appointment online in seconds. It&apos;s free.
            </p>
            <Link
              href={`/search?postcode=${encodeURIComponent(location.postcode)}`}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search {location.name} Opticians
            </Link>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 9: Nearby Locations (enhanced) */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Nearby areas */}
            {nearbyLocations.length > 0 && (
              <div className="mb-12">
                <h2
                  className="text-2xl font-bold text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Nearby locations
                </h2>
                <p className="text-gray-600 mb-6">
                  Looking for eye tests outside {location.name}? Browse opticians in these nearby areas across {location.county} and the wider {location.region} region.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyLocations.map((loc) =>
                    loc ? (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        className="group flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/20 hover:scale-[1.02] transition-all"
                      >
                        <svg
                          className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <span className="text-sm font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-primary)] transition-colors block mb-1">
                            Eye tests in {loc.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {loc.county} &middot; {loc.postcode}
                          </span>
                        </div>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Other locations in the same region */}
            {regionSiblings.length > 0 && (
              <div>
                <h2
                  className="text-2xl font-bold text-[var(--color-navy)] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  More locations in {location.region}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {regionSiblings.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/locations/${loc.slug}`}
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] bg-gray-50 hover:bg-[var(--color-primary)]/5 px-4 py-2 rounded-full border border-gray-100 hover:border-[var(--color-primary)]/20 transition-all"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to all locations */}
            <div className="mt-12 text-center">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                View all UK locations
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 10: Internal Links / Explore More */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Explore more on eyetest.co.uk
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn more about eye tests, opticians, and eye health across the UK.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Optician brands */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-[var(--color-primary)] rounded-t-2xl" />
                <div className="p-6">
                <h3 className="font-semibold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
                  </svg>
                  Optician brands
                </h3>
                <ul className="space-y-2">
                  {localAvailable.slice(0, 5).map((optician) => (
                    <li key={optician.slug}>
                      <Link
                        href={`/opticians/${optician.slug}`}
                        className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {optician.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/opticians"
                      className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                    >
                      View all opticians &rarr;
                    </Link>
                  </li>
                </ul>
                </div>
              </div>

              {/* Eye test types */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-[var(--color-nhs-blue)]" />
                <div className="p-6">
                <h3 className="font-semibold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Eye test types
                </h3>
                <ul className="space-y-2">
                  {popularEyeTests.slice(0, 5).map((test) => (
                    <li key={test.slug}>
                      <Link
                        href={`/eye-tests/${test.slug}`}
                        className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {test.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/eye-tests"
                      className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                    >
                      View all eye tests &rarr;
                    </Link>
                  </li>
                </ul>
                </div>
              </div>

              {/* Eye conditions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-purple-500" />
                <div className="p-6">
                <h3 className="font-semibold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  Eye conditions
                </h3>
                <ul className="space-y-2">
                  {commonConditions.slice(0, 5).map((condition) => (
                    <li key={condition.slug}>
                      <Link
                        href={`/eye-health/conditions/${condition.slug}`}
                        className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {condition.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/eye-health"
                      className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                    >
                      View all conditions &rarr;
                    </Link>
                  </li>
                </ul>
                </div>
              </div>

              {/* Helpful guides */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 bg-amber-500" />
                <div className="p-6">
                <h3 className="font-semibold text-[var(--color-navy)] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Helpful articles
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/articles/how-often-should-you-have-an-eye-test"
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                    >
                      How often should you have an eye test?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/articles/what-happens-during-an-eye-test"
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                    >
                      What happens during an eye test?
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/articles/nhs-vs-private-eye-tests"
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                    >
                      NHS vs private eye tests
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/articles/signs-you-need-an-eye-test"
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                    >
                      Signs you need an eye test
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/articles/childrens-eye-tests-parents-guide"
                      className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                    >
                      Children&apos;s eye tests: parent&apos;s guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/articles"
                      className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                    >
                      View all articles &rarr;
                    </Link>
                  </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AtHomeCallout location={location.name} compact />
      </main>
      <Footer />
    </>
  );
}
