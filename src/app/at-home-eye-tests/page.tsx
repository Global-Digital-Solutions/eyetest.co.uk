import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero, HeroSearchForm } from "@/components/PageHero";
import { AtHomeBookingForm } from "@/components/AtHomeBookingForm";

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "At-Home Eye Tests UK — Free NHS Home Visits & How to Book",
  description:
    "Everything you need to know about at-home eye tests in the UK. Find out who qualifies for free NHS domiciliary eye tests, what happens during a home visit, how to book a mobile optician, and compare providers near you.",
  keywords: [
    "at home eye test",
    "home eye test",
    "domiciliary eye test",
    "mobile optician",
    "eye test at home near me",
    "free home eye test",
    "NHS home eye test",
    "eye test for elderly at home",
    "home visit eye test",
    "domiciliary eye care",
    "at home eye test UK",
    "home visit optician",
    "eye test at home for elderly",
    "mobile eye test",
    "home eye examination",
  ],
  openGraph: {
    title: "At-Home Eye Tests UK — Free NHS Home Visits & How to Book",
    description:
      "Complete guide to at-home eye tests in the UK. Learn who qualifies for free NHS home visits, what to expect, and how to book a mobile optician near you.",
    url: "https://eyetest.co.uk/at-home-eye-tests",
    siteName: "eyetest.co.uk",
    type: "website",
  },
  alternates: {
    canonical: "https://eyetest.co.uk/at-home-eye-tests",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: "Do I need a GP referral for a home eye test?",
    a: "No. You do not need a referral from your GP or any other healthcare professional to arrange a home eye test. You, a family member, carer, or care home manager can contact a domiciliary optician directly by phone or online. The optometrist will confirm your eligibility for a free NHS-funded visit when they take the booking.",
  },
  {
    q: "How long does a home eye test take?",
    a: "A home eye test typically takes between 20 and 40 minutes. This is often slightly longer than an in-practice appointment because the optometrist allows extra time for setting up portable equipment and discussing your results at a relaxed pace. If you also want to choose new glasses frames during the visit, allow an additional 10 to 15 minutes.",
  },
  {
    q: "Is a home eye test as good as going to an optician?",
    a: "Yes. A domiciliary eye test is a full NHS sight test carried out by a GOC-registered optometrist using professional, portable equipment. It includes all the same checks as an in-practice examination — visual acuity, refraction, eye health assessment, and intraocular pressure measurement. The standard of care is identical, and the optometrist can detect conditions such as glaucoma, cataracts, macular degeneration, and diabetic eye disease just as effectively.",
  },
  {
    q: "Can someone else arrange a home eye test for me?",
    a: "Absolutely. A family member, friend, carer, social worker, GP, or care home manager can arrange a home eye test on your behalf. This is very common — many home visits are booked by relatives who are concerned about a loved one's eyesight. The person booking simply needs to provide basic details such as name, address, and any relevant health information.",
  },
  {
    q: "What if I need new glasses after my home eye test?",
    a: "If your prescription has changed or you need glasses for the first time, the optometrist will help you choose frames from a portable selection during your visit. You can try on different styles at home in your own time. Once you have chosen, the lenses are made up in a UK laboratory and the finished glasses are posted directly to your door — usually within two to three weeks. If you are eligible for an NHS optical voucher, this will be applied to reduce the cost.",
  },
  {
    q: "How often can I have a free NHS home eye test?",
    a: "The NHS recommends a sight test every two years for most adults, but your optometrist may recommend more frequent checks depending on your circumstances. People with diabetes, glaucoma, or other eye conditions may need annual tests. There is no strict limit on how often you can have a free NHS home eye test, provided you meet the eligibility criteria and your optometrist considers the test clinically necessary.",
  },
  {
    q: "Can I have an at-home eye test if I live in a care home?",
    a: "Yes. Domiciliary opticians regularly visit residential care homes, nursing homes, and supported living facilities across the UK. Care home managers can arrange visits for multiple residents at once. Each resident receives an individual eye test, and results can be shared with the care home staff and GP with the patient's consent. Providers such as OutsideClinic offer dedicated care home visiting programmes.",
  },
  {
    q: "What equipment does the optometrist bring?",
    a: "The optometrist brings a full set of portable diagnostic equipment, including a trial lens set or portable phoropter for measuring your prescription, a retinoscope, a direct ophthalmoscope for examining the back of your eye, a handheld slit lamp for detailed eye examination, a tonometer for measuring eye pressure (glaucoma screening), a visual acuity chart, and an ophthalmoscopy lens. All equipment is cleaned and sterilised between patients.",
  },
  {
    q: "Do I need to prepare anything for the visit?",
    a: "Very little preparation is needed. It helps to have a well-lit room available with a comfortable chair and enough space for the optometrist to set up. Have your current glasses or contact lenses to hand, along with a list of any medications you are taking. If you have a previous prescription or NHS exemption documentation, keep that accessible too. The optometrist will bring everything else they need.",
  },
  {
    q: "What happens if the optometrist finds a problem?",
    a: "If the optometrist detects any signs of an eye condition that needs further investigation — such as cataracts, glaucoma, macular degeneration, or diabetic eye changes — they will write a referral letter to your GP or directly to the hospital eye service. They will explain their findings clearly and discuss next steps with you and anyone else present, such as a family member or carer. Urgent conditions can be referred as an emergency on the same day.",
  },
  {
    q: "Can I have a contact lens fitting at home?",
    a: "Some domiciliary opticians offer contact lens assessments and fittings during home visits, but this service is less widely available than standard sight tests. Contact lens fittings require additional equipment and a follow-up appointment, so it is worth asking your chosen provider whether they offer this service when you book. If not, they may be able to refer you to a local practice that does.",
  },
  {
    q: "Are at-home eye tests available at weekends?",
    a: "Availability varies by provider and region. Some domiciliary opticians offer Saturday appointments, and a smaller number offer Sunday visits. OutsideClinic and several independent providers offer weekend slots in many areas. It is best to ask about weekend availability when you book, as these appointments tend to fill up quickly. Weekday appointments are generally easier to arrange at short notice.",
  },
];

// ---------------------------------------------------------------------------
// Provider comparison data
// ---------------------------------------------------------------------------

const providers = [
  {
    name: "OutsideClinic",
    since: "1987",
    rating: "4.8",
    nhs: true,
    coverage: "England, Scotland & Wales",
    notes: "Largest UK home eye test provider. Also offers hearing tests.",
  },
  {
    name: "Specsavers Home Visits",
    since: "2020",
    rating: "4.5",
    nhs: true,
    coverage: "Many areas across England & Scotland",
    notes: "Available where Specsavers stores offer the service locally.",
  },
  {
    name: "Vision Express",
    since: "—",
    rating: "—",
    nhs: true,
    coverage: "Limited areas",
    notes: "Home visit service available in selected regions only.",
  },
  {
    name: "Local independent opticians",
    since: "Varies",
    rating: "Varies",
    nhs: true,
    coverage: "Regional",
    notes:
      "Many independent high-street opticians offer domiciliary visits. Ask your local optician.",
  },
  {
    name: "NHS community optometry",
    since: "—",
    rating: "—",
    nhs: true,
    coverage: "Varies by NHS region",
    notes:
      "NHS-commissioned schemes vary by area. Your local Integrated Care Board can advise.",
  },
];

// ---------------------------------------------------------------------------
// NHS optical voucher values
// ---------------------------------------------------------------------------

const voucherValues = [
  { band: "A", value: "£39.10", description: "Single-vision, low prescription" },
  { band: "B", value: "£67.40", description: "Single-vision, higher prescription" },
  { band: "C", value: "£89.00", description: "Bifocal lenses" },
  { band: "D", value: "£215.50", description: "Complex or high-powered lenses" },
];

// ---------------------------------------------------------------------------
// Benefits data
// ---------------------------------------------------------------------------

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "No travel or waiting rooms",
    description:
      "There is no need to arrange transport, navigate busy high streets, or sit in a waiting room. The optometrist comes to you.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Familiar, relaxed environment",
    description:
      "Being tested at home can feel less stressful, especially for people with dementia, anxiety, or mobility issues who find unfamiliar settings difficult.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "More time with the optometrist",
    description:
      "Home visits are often less rushed than high-street appointments. The optometrist can take the time to explain your results thoroughly and answer all your questions.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Family and carers can be present",
    description:
      "Loved ones can sit in during the test, ask questions, and help remember the advice given. This can be reassuring for everyone involved.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Same clinical quality as in-practice",
    description:
      "The test is carried out by a fully qualified, GOC-registered optometrist using professional portable equipment. The clinical standard is identical to a high-street eye test.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Glasses delivered to your door",
    description:
      "After choosing frames during your visit, your custom-made glasses are manufactured in a UK laboratory and posted directly to your home — no second trip needed.",
  },
];

// ---------------------------------------------------------------------------
// Steps data
// ---------------------------------------------------------------------------

const steps = [
  {
    step: 1,
    title: "Booking your appointment",
    description:
      "Contact a domiciliary eye care provider by phone or through their website. You do not need a GP referral. A family member, carer, or care home manager can book on your behalf. The provider will ask a few questions to confirm eligibility for a free NHS-funded home visit.",
  },
  {
    step: 2,
    title: "Pre-visit confirmation",
    description:
      "The optometrist or their team will call to confirm your appointment date and time. They will ask about your medical history, current medications, any existing eye conditions, and whether you have any specific concerns about your vision. This helps them prepare the right equipment for your visit.",
  },
  {
    step: 3,
    title: "The eye test (20–40 minutes)",
    description:
      "The optometrist will carry out a full sight test in a comfortable room in your home. This includes checking your visual acuity (how clearly you can see at different distances), refraction (measuring your prescription using a trial lens set), an examination of the health of your eyes using an ophthalmoscope, and an intraocular pressure check to screen for glaucoma.",
  },
  {
    step: 4,
    title: "Discussion of results",
    description:
      "After the test, the optometrist will explain your results in plain language. They will tell you whether your prescription has changed, discuss any signs of eye conditions they may have found, and answer any questions you or your family members may have. If a referral is needed, they will explain the process clearly.",
  },
  {
    step: 5,
    title: "Choosing your frames",
    description:
      "If you need new glasses, the optometrist will bring a portable selection of frames for you to try on at home. You can take your time choosing a style you like, with input from family members if you wish. The optometrist will advise on the best lens options for your prescription and lifestyle.",
  },
  {
    step: 6,
    title: "Glasses delivered to your door",
    description:
      "Once you have chosen your frames, the lenses are custom-made in a UK optical laboratory. Your finished glasses are then posted directly to your home, typically within two to three weeks. If any adjustments are needed, the provider will arrange a follow-up visit.",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AtHomeEyeTestsPage() {
  /* ---- Structured data ---- */

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "At-Home Eye Tests UK — Free NHS Home Visits & How to Book",
    description:
      "A comprehensive guide to at-home eye tests in the UK, covering NHS eligibility, what happens during a domiciliary eye test, how to book, provider comparisons, costs, and frequently asked questions.",
    url: "https://eyetest.co.uk/at-home-eye-tests",
    about: {
      "@type": "MedicalCondition",
      name: "Domiciliary eye test",
      alternateName: ["At-home eye test", "Home visit eye test", "Mobile eye test"],
    },
    author: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "eyetest.co.uk",
      url: "https://eyetest.co.uk",
    },
    lastReviewed: "2026-06-16",
    dateModified: "2026-06-16",
    inLanguage: "en-GB",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 18,
      healthCondition: {
        "@type": "MedicalCondition",
        name: "Reduced mobility or housebound status",
      },
    },
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
        name: "At-Home Eye Tests",
        item: "https://eyetest.co.uk/at-home-eye-tests",
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
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "At-Home Eye Tests" },
          ]}
        >
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>NHS-funded home visits available</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            At-Home{" "}
            <span className="text-[var(--color-primary-light)]">Eye Tests</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Professional eye care brought to your door. If you or a loved one
            finds it difficult to visit a high-street optician, a qualified
            optometrist can carry out a full NHS sight test in the comfort of
            your own home.
          </p>

          <HeroSearchForm placeholder="Enter your postcode to find home visit opticians" />
        </PageHero>

        {/* ================================================================ */}
        {/* 2. WHAT IS AN AT-HOME EYE TEST?                                 */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What is an at-home eye test?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                An at-home eye test &mdash; also known as a{" "}
                <strong>domiciliary eye test</strong> or{" "}
                <strong>home visit eye test</strong> &mdash; is a full NHS sight
                test carried out in your own home by a qualified, GOC-registered
                (General Optical Council) optometrist. It is exactly the same
                standard of examination you would receive at a high-street
                optician, but delivered in the comfort and familiarity of your
                living room, bedroom, or care home.
              </p>

              <p>
                Domiciliary eye care has been part of the NHS since its earliest
                days, recognising that not everyone can travel to an optician&rsquo;s
                practice. Today, thousands of people across the UK benefit from
                home eye tests every year, from elderly residents in care homes
                to younger people recovering from surgery or living with
                conditions that make leaving the house difficult.
              </p>

              <p>
                The visiting optometrist brings a complete set of professional,
                portable diagnostic equipment. This typically includes:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Trial lens set or portable phoropter</strong> &mdash;
                  for measuring your prescription accurately
                </li>
                <li>
                  <strong>Retinoscope</strong> &mdash; a handheld instrument that
                  shines a light into the eye to objectively measure refractive
                  error
                </li>
                <li>
                  <strong>Direct ophthalmoscope</strong> &mdash; used to examine
                  the retina, optic nerve, and blood vessels at the back of your
                  eye
                </li>
                <li>
                  <strong>Handheld slit lamp</strong> &mdash; provides a
                  magnified, detailed view of the front of your eye, including
                  the cornea, iris, and lens
                </li>
                <li>
                  <strong>Tonometer</strong> &mdash; measures the pressure
                  inside your eye, an important screening test for glaucoma
                </li>
                <li>
                  <strong>Visual acuity chart</strong> &mdash; the familiar
                  letter chart used to measure how clearly you can see at
                  different distances
                </li>
              </ul>

              <p>
                The entire examination is thorough and unhurried. Because the
                optometrist is visiting you at home, they often have more time to
                discuss your results, answer questions, and address any concerns
                you or your family may have. If you need new glasses, you can
                choose frames from a portable selection during the same visit,
                and your finished glasses will be delivered directly to your
                door.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. WHO QUALIFIES FOR A FREE NHS HOME EYE TEST?                  */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who qualifies for a free NHS home eye test?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-10">
              <p>
                You are eligible for a <strong>free NHS-funded</strong>{" "}
                domiciliary eye test if you{" "}
                <strong>
                  cannot leave your home unaccompanied due to a physical or
                  mental health condition
                </strong>
                . This is the key criterion &mdash; it is about your ability to
                get to an optician&rsquo;s practice, not your age alone.
              </p>
            </div>

            {/* Eligibility callout card */}
            <div className="bg-white border-l-4 border-[var(--color-nhs-blue)] rounded-2xl p-6 sm:p-8 shadow-sm mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-nhs-blue)]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--color-nhs-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>
                  You may qualify if you:
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Have mobility issues, use a wheelchair, or are unable to walk unaided",
                  "Are recovering from surgery or an illness that keeps you housebound",
                  "Live with dementia or Alzheimer’s disease",
                  "Experience severe anxiety, agoraphobia, or other mental health conditions that prevent you from leaving home",
                  "Have a terminal illness",
                  "Have severe learning disabilities",
                  "Are registered blind or partially sighted and cannot travel unaccompanied",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-success)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-10">
              <p>
                <strong>Important:</strong> Age alone does not automatically
                qualify you for a home visit. A fit and healthy 85-year-old who
                can get to the high street would not meet the eligibility
                criteria, whereas a 40-year-old recovering from major surgery
                would. The determining factor is whether you can reasonably
                travel to an optician&rsquo;s practice without assistance.
              </p>

              <p>
                A family member, carer, social worker, or care home manager can
                arrange a home eye test on someone else&rsquo;s behalf &mdash;
                you do not need the patient themselves to make the call. No GP
                referral is required.
              </p>
            </div>

            {/* Additional NHS eligibility */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-10">
              <h3 className="text-lg font-bold text-[var(--color-navy)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Free NHS sight test eligibility (same as in-practice)
              </h3>
              <p className="text-gray-600 mb-4">
                In addition to qualifying for a home visit, you may also be
                entitled to a free NHS sight test if you fall into any of these
                groups:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Aged 60 or over",
                  "Aged under 16 (or under 19 in full-time education)",
                  "Diagnosed with diabetes or glaucoma",
                  "Aged 40+ with a close relative diagnosed with glaucoma",
                  "Registered blind or partially sighted",
                  "Receiving Income Support, Universal Credit, Pension Credit Guarantee, or Employment and Support Allowance",
                  "Named on a valid NHS tax credit exemption certificate (HC2/HC3)",
                  "A prisoner on leave from a penal institution",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <svg className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scotland callout */}
            <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)] mb-1">
                    Scotland: universal free eye tests
                  </p>
                  <p className="text-sm text-gray-700">
                    If you live in Scotland, all NHS sight tests are free
                    regardless of age or income. This applies to domiciliary
                    (home visit) eye tests too, provided you meet the mobility
                    criteria for a home visit.
                  </p>
                </div>
              </div>
            </div>

            {/* Private option note */}
            <div className="mt-6 prose prose-lg max-w-none text-gray-700">
              <p>
                <strong>Not eligible for a free home visit?</strong> If you do
                not meet the NHS criteria but would still prefer to be tested at
                home, some providers offer private domiciliary eye tests. These
                typically cost between{" "}
                <strong>&pound;50 and &pound;60</strong> as a call-out fee, plus
                the cost of any glasses you choose. This can be a good option
                for people who value the convenience of a home visit but do not
                have a medical reason that prevents them from leaving the house.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. WHAT HAPPENS DURING A HOME EYE TEST?                         */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What happens during a home eye test?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A home eye test follows a straightforward process from booking to
                receiving your new glasses. Here is what to expect at each stage.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="flex gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-lg font-bold text-[var(--color-primary)] shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Referral note */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <p className="font-semibold text-amber-800 mb-1">
                    If a problem is detected
                  </p>
                  <p className="text-sm text-amber-700">
                    If the optometrist finds any signs of an eye condition
                    that needs further investigation &mdash; such as cataracts,
                    glaucoma, macular degeneration, or diabetic eye changes
                    &mdash; they will write a referral to your GP or directly to
                    the hospital eye service. Urgent conditions can be referred
                    the same day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. PROVIDER COMPARISON — OutsideClinic 2026 Recommended         */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Who provides at-home eye tests in the UK?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Several organisations offer domiciliary eye care across the UK.
                We&rsquo;ve compared the main providers to help you choose the
                right one for your needs.
              </p>
            </div>

            {/* ---- OutsideClinic — 2026 Recommended Provider ---- */}
            <div className="relative mb-8">
              {/* Recommended badge */}
              <div className="absolute -top-4 left-6 sm:left-8 z-10">
                <span className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-[var(--color-primary)]/25 uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                  2026 Recommended Provider
                </span>
              </div>

              <div className="bg-white rounded-2xl border-2 border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/5 overflow-hidden">
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                    {/* Left: Provider info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-4 mt-2">
                        <h3
                          className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          OutsideClinic
                        </h3>
                        <span className="text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-3 py-1 rounded-full font-semibold">
                          NHS-funded
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        The UK&rsquo;s largest and longest-established home eye
                        test provider, OutsideClinic has been bringing
                        professional eye care to people&rsquo;s homes since
                        1987. With a team of GOC-registered optometrists
                        covering England, Scotland and Wales, they&rsquo;ve
                        carried out over a million home visits and maintain a
                        4.8-star Trustpilot rating.
                      </p>

                      {/* Stats row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        {[
                          { value: "4.8★", label: "Trustpilot" },
                          { value: "Since 1987", label: "Established" },
                          { value: "1M+", label: "Home visits" },
                          { value: "GB-wide", label: "Coverage" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-[var(--color-primary)]/5 rounded-xl px-4 py-3 text-center"
                          >
                            <div className="text-lg font-bold text-[var(--color-primary)]">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Key features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          "Free NHS-funded home eye tests",
                          "Also offers home hearing tests",
                          "Care home visiting programmes",
                          "Glasses delivered to your door",
                          "Weekend appointments available",
                          "No GP referral needed",
                        ].map((feat) => (
                          <div key={feat} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[var(--color-success)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA card */}
                    <div className="lg:w-72 xl:w-80 shrink-0">
                      <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 rounded-xl p-6 text-center">
                        <div className="text-3xl font-bold text-[var(--color-primary)] mb-1">
                          FREE
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          for NHS-eligible patients
                        </div>
                        <div className="text-xs text-gray-400 mb-5">
                          or &pound;60 private call-out fee
                        </div>

                        <a
                          href="#book-at-home-test"
                          className="block w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all hover:shadow-lg mb-3"
                        >
                          Book a home eye test
                        </a>
                        <a
                          href="https://www.outsideclinic.co.uk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[var(--color-primary)] hover:underline"
                        >
                          Visit outsideclinic.co.uk &rarr;
                        </a>

                        {/* Trustpilot mini review */}
                        <div className="mt-5 pt-5 border-t border-[var(--color-primary)]/10">
                          <div className="flex justify-center gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-yellow-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 italic">
                            &ldquo;Outstanding service. The optometrist was
                            wonderful with Dad.&rdquo;
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            — Trustpilot review
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Other providers comparison table ---- */}
            <h3
              className="text-lg font-bold text-[var(--color-navy)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Other at-home eye test providers
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3.5 font-semibold text-[var(--color-navy)]">Provider</th>
                    <th className="px-6 py-3.5 font-semibold text-[var(--color-navy)]">NHS-funded</th>
                    <th className="px-6 py-3.5 font-semibold text-[var(--color-navy)]">Coverage</th>
                    <th className="px-6 py-3.5 font-semibold text-[var(--color-navy)]">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {providers
                    .filter((p) => p.name !== "OutsideClinic")
                    .map((p) => (
                      <tr
                        key={p.name}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-[var(--color-navy)] whitespace-nowrap">
                          {p.name}
                        </td>
                        <td className="px-6 py-4">
                          {p.nhs ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-[var(--color-nhs-blue)]/10 text-[var(--color-nhs-blue)] px-2.5 py-1 rounded-full font-medium">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Yes
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-xs">
                          {p.coverage}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-xs max-w-xs">
                          {p.notes}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm text-gray-500 text-center">
              eyetest.co.uk is an independent comparison site. Provider rankings
              reflect editorial assessment of service quality, coverage, and
              patient reviews. Use our postcode search to find all available home
              visit opticians in your area.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. AT-HOME EYE TESTS FOR CARE HOMES                            */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              At-home eye tests for care homes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Regular scheduled visits
                </h3>
                <p className="text-sm text-gray-600">
                  Domiciliary opticians can set up a regular visiting schedule
                  with your care home, ensuring all residents have their eye
                  health monitored consistently. Many providers visit the same
                  care homes every year, building a relationship with staff and
                  residents.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Multiple residents tested in one visit
                </h3>
                <p className="text-sm text-gray-600">
                  Providers can test several residents during a single visit to
                  the care home, making it efficient for both staff and the
                  optometrist. Each resident receives an individual, confidential
                  eye test with personalised results.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Results shared with care team
                </h3>
                <p className="text-sm text-gray-600">
                  With the patient&rsquo;s consent, test results and any
                  recommendations can be shared with care home staff and the
                  resident&rsquo;s GP. This ensures everyone involved in their
                  care is aware of any eye health issues or changes.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Easy booking for care managers
                </h3>
                <p className="text-sm text-gray-600">
                  Care home managers can arrange visits for all residents with a
                  single phone call or online booking. The provider handles all
                  scheduling and will work around the care home&rsquo;s routine
                  to minimise disruption.
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Good vision is closely linked to quality of life in care
                settings. Research shows that undiagnosed sight problems in care
                home residents are associated with an increased risk of falls,
                social withdrawal, and reduced independence. Regular eye tests
                can help identify issues early and ensure residents have the
                right glasses, contributing to their comfort, safety, and
                wellbeing.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. COST OF AT-HOME EYE TESTS                                    */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How much does an at-home eye test cost?
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-10">
              <p>
                If you are eligible for an NHS-funded home visit, the eye test
                itself is{" "}
                <strong>completely free</strong>. You will not be charged for the
                optometrist&rsquo;s time, travel, or the use of their equipment.
                If you also qualify for a free NHS sight test (for example, you
                are aged 60 or over, or have diabetes), there is truly no cost
                at all.
              </p>
            </div>

            {/* Cost comparison */}
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[var(--color-navy)] text-white">
                    <th className="px-6 py-4 font-semibold">Service</th>
                    <th className="px-6 py-4 font-semibold">NHS-eligible</th>
                    <th className="px-6 py-4 font-semibold">Private (not eligible)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[var(--color-navy)]">
                      Home eye test
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-success)]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        FREE
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      &pound;50 &ndash; &pound;60
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[var(--color-navy)]">
                      In-practice eye test (comparison)
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-success)]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        FREE
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      &pound;25 &ndash; &pound;35
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-[var(--color-navy)]">
                      Glasses (with NHS optical voucher)
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Voucher value applied (see below)
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Full price
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* NHS optical voucher bands */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-[var(--color-navy)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
                NHS optical voucher values
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you are eligible for an NHS optical voucher, its value depends
                on the complexity of your prescription. The voucher is applied
                towards the cost of your glasses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {voucherValues.map((v) => (
                  <div
                    key={v.band}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Band {v.band}
                    </div>
                    <div className="text-xl font-bold text-[var(--color-primary)]">
                      {v.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {v.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Reputable home visit providers do not charge hidden fees or
                call-out charges for NHS-eligible patients. If you are unsure
                whether you qualify for free NHS eye care, speak to the provider
                when you book &mdash; they will be able to confirm your
                eligibility over the phone.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. BENEFITS OF AT-HOME EYE TESTS                                */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Benefits of at-home eye tests
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A home visit takes the stress out of eye care for people who
                find it difficult to get to a high-street optician. Here are the
                key advantages.
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
        {/* 9. HOW TO ARRANGE AN AT-HOME EYE TEST                           */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How to arrange an at-home eye test
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-10">
              <p>
                Arranging a home eye test is simpler than many people expect.
                There is no lengthy referral process or complicated paperwork.
                Here is how to get started:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)] mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Check eligibility
                </h3>
                <p className="text-sm text-gray-600">
                  Review the eligibility criteria above to see if you or your
                  loved one qualifies for a free NHS-funded home visit. Remember,
                  the key question is whether the person can leave home
                  unaccompanied to visit an optician.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)] mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Contact a provider
                </h3>
                <p className="text-sm text-gray-600">
                  Get in touch with a domiciliary eye care provider directly by
                  phone or through their website. You can also ask your GP,
                  social worker, or local council for a recommendation. No
                  referral is needed &mdash; just call and book.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)] mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                  Or search on eyetest.co.uk
                </h3>
                <p className="text-sm text-gray-600">
                  Enter your postcode on eyetest.co.uk to find home visit
                  opticians in your area. We show you all available providers so
                  you can compare services and get in touch with the one that
                  suits you best.
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If you are booking on behalf of someone else &mdash; perhaps an
                elderly parent, a relative in a care home, or a friend who is
                recovering from surgery &mdash; you can provide all the necessary
                details yourself. The provider will just need the patient&rsquo;s
                name, address, date of birth, and any relevant medical
                information. Many families find it reassuring to know that
                arranging professional eye care for a loved one is this
                straightforward.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 10. FREQUENTLY ASKED QUESTIONS                                  */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Frequently asked questions about at-home eye tests
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We have answered the most common questions people ask about
                domiciliary eye tests. If you cannot find what you are looking
                for, please get in touch.
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
        {/* 11. BOOKING FORM                                                */}
        {/* ================================================================ */}
        <section id="book-at-home-test" className="py-16 sm:py-20 bg-gray-50 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
                2026 Recommended Provider
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Book an at-home eye test with{" "}
                <span className="text-[var(--color-primary)]">OutsideClinic</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Complete the form below and a member of the OutsideClinic team
                will be in touch to arrange your home appointment. No GP
                referral needed.
              </p>
            </div>

            <AtHomeBookingForm />

            <p className="text-center text-xs text-gray-400 mt-6">
              Prefer to call? OutsideClinic&rsquo;s booking line is open
              Mon&ndash;Thu 08:00&ndash;18:00, Fri 08:00&ndash;17:30, Sat
              09:00&ndash;13:00
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 12. CTA SECTION                                                 */}
        {/* ================================================================ */}
        <section className="py-16 sm:py-20 bg-[var(--color-navy)]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Find at-home eye tests{" "}
              <span className="text-[var(--color-primary-light)]">near you</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Enter your postcode to find domiciliary opticians offering home
              visit eye tests in your area. Whether you need an NHS-funded test
              or a private appointment, we will help you find the right
              provider.
            </p>

            <HeroSearchForm placeholder="Enter your postcode, e.g. SW1A 1AA" />

            <p className="text-white/40 text-sm mt-6">
              Or call your chosen provider directly &mdash; no referral needed.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
