// ---------------------------------------------------------------------------
// SEO landing page data — common UK eye test search queries
// ---------------------------------------------------------------------------

export type SearchQuery = {
  slug: string;
  keyword: string;
  title: string;
  category:
    | "cost"
    | "nhs"
    | "availability"
    | "brand"
    | "specialist"
    | "general"
    | "concern";
  shortDescription: string;
  content: string;
  faqs: { question: string; answer: string }[];
  relatedQueries: string[];
  ctaText: string;
  /** Optional overrides and richer content, used by the rebuilt hub pages */
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  dateModified?: string;
  keyFacts?: { label: string; value: string }[];
  sections?: QuerySection[];
  showTownIndex?: boolean;
  disclaimer?: string;
  sources?: { label: string; url: string }[];
  /** When set, the page lives at this path instead of /find/{slug} (which redirects there) */
  canonicalPath?: string;
  /** Breadcrumb parents shown before the page title when canonicalPath is used */
  parentCrumbs?: { label: string; href: string }[];
};

export type QuerySection = {
  heading: string;
  body?: string;
  items?: string[];
  table?: { headers: string[]; rows: string[][]; caption?: string };
  links?: { label: string; href: string }[];
};

/** Shared wording for pages that mention prices, offers or free tests */
export const PRICE_DISCLAIMER =
  "Prices, offers and NHS rules change from time to time. Promotions such as free or discounted eye tests are time-limited, subject to availability and may only apply at some locations. Always check with the optician or the official NHS website for your country before you book.";

// ---------------------------------------------------------------------------
// Category display metadata
// ---------------------------------------------------------------------------

export const categoryLabels: Record<SearchQuery["category"], string> = {
  cost: "Cost & Pricing",
  nhs: "NHS & Free Eye Tests",
  availability: "Availability & Booking",
  brand: "Optician Brands",
  specialist: "Specialist Tests",
  general: "General Information",
  concern: "Vision Concerns",
};

export const categoryDescriptions: Record<SearchQuery["category"], string> = {
  cost: "How much eye tests cost across the UK, from free NHS tests to private options.",
  nhs: "Who qualifies for free NHS-funded eye tests and optical vouchers.",
  availability: "Same-day, walk-in, weekend, and home visit eye test options.",
  brand: "Compare eye tests from Specsavers, Boots, Vision Express, and independent opticians.",
  specialist: "Specialist eye tests for driving, contact lenses, children, and specific conditions.",
  general: "Everything you need to know about booking and preparing for an eye test.",
  concern: "Common vision symptoms and when to seek professional help.",
};

// ---------------------------------------------------------------------------
// Search queries data
// ---------------------------------------------------------------------------

export const searchQueries: SearchQuery[] = [
  // ─── Cost / Price ────────────────────────────────────────────────────
  {
    slug: "eye-test-cost",
    keyword: "eye test cost",
    title: "How Much Does an Eye Test Cost in the UK? (2026 Prices)",
    seoTitle: "Eye Test Cost UK 2026: Specsavers, Boots, Vision Express Prices",
    seoDescription:
      "Eye test prices at Specsavers, Boots, Vision Express, Asda and M&S, checked November 2026, plus who gets a free NHS eye test.",
    h1: "How Much Does an Eye Test Cost?",
    dateModified: "2026-11-10",
    category: "cost",
    shortDescription:
      "Eye test prices at the main UK opticians, checked against each brand's own website, plus who gets a free NHS-funded eye test.",
    content: `A private eye test at the main UK high-street opticians costs between about £20 and £40, and many people pay nothing at all because they qualify for a free NHS-funded sight test. Prices below come from each optician's own website and were checked in November 2026.

The biggest difference between opticians is what the price includes. Some include an OCT scan (a 3D scan of the back of the eye), while others charge extra for it or offer it as a separate, higher-priced test. Prices can also vary from store to store, so confirm the fee with your local practice when you book.`,
    sections: [
      {
        heading: "Eye test prices at the main UK opticians",
        table: {
          caption: "Private eye test prices published by each optician, checked November 2026",
          headers: ["Optician", "Private eye test", "OCT scan", "Source"],
          rows: [
            ["Specsavers", "£20 to £25, depending on the store", "Up to £10 extra in most stores", "specsavers.co.uk"],
            ["Asda Opticians", "£24", "Ask in store", "opticians.asda.com"],
            ["Boots Opticians", "From £29.95 (Essential Eye Test)", "From £25 extra (Advanced Eye Test)", "bootsopticians.com"],
            ["Vision Express", "£30 (Advanced Eye Test)", "Included in the Advanced Eye Test", "visionexpress.com"],
            ["M&S Opticians", "£40", "Included at no extra cost", "mandsopticians.com"],
          ],
        },
        links: [
          { label: "Specsavers eye test price", href: "/opticians/specsavers" },
          { label: "Boots eye test price", href: "/opticians/boots-opticians" },
          { label: "Vision Express eye test price", href: "/opticians/vision-express" },
          { label: "Asda eye test price", href: "/opticians/asda-opticians" },
          { label: "M&S Opticians", href: "/opticians/mands-opticians" },
        ],
      },
      {
        heading: "Who gets a free NHS eye test?",
        body: `In England you get a free NHS sight test if you are under 16, aged 16 to 18 and in full-time education, aged 60 or over, registered as sight impaired or blind, have diabetes or glaucoma, are 40 or over with a parent, sibling or child who has glaucoma, have been told by an ophthalmologist you are at risk of glaucoma, or receive certain benefits or hold an HC2 certificate. Rules in Wales and Northern Ireland are similar, and in Scotland NHS eye examinations are free for everyone who is ordinarily resident in the UK.`,
        links: [
          { label: "Full free eye test guide", href: "/find/free-eye-test" },
          { label: "Over 60s", href: "/find/free-eye-test-over-60" },
          { label: "Universal Credit", href: "/find/free-eye-test-universal-credit" },
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
        ],
      },
      {
        heading: "Free and discounted eye test offers",
        body: `The NHS is the main route to a free eye test. As well as that, Specsavers and other chains run time-limited free or discounted eye test offers at certain times of the year, and some employers provide eyecare vouchers. Offers like these are subject to availability, may only apply at some stores and change often, so check the optician's website before you book.`,
      },
      {
        heading: "Extra tests and what they cost",
        body: `An OCT scan is the most common optional extra. Specsavers says it costs up to £10 extra in most stores, Boots charges from £25 extra for its Advanced Eye Test, Vision Express includes it in its £30 Advanced Eye Test, and M&S Opticians includes it at no extra cost. A contact lens check is a separate appointment from a sight test; Boots, for example, lists its contact lens check at £50 on top of the eye test.`,
        links: [
          { label: "OCT scan cost", href: "/find/oct-scan-cost" },
          { label: "Contact lens eye test", href: "/find/contact-lens-eye-test" },
          { label: "Cheapest eye tests", href: "/find/cheap-eye-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "How much is an eye test at Specsavers?",
        answer:
          "Specsavers says a routine eye test costs £25, with prices between £20 and £25 depending on the store, and an OCT scan costs up to £10 extra in most stores. If you qualify for an NHS-funded eye test, it is free. Specsavers also runs time-limited offers, so check its website for current deals.",
      },
      {
        question: "How much is an eye test at Boots?",
        answer:
          "Boots says its Essential Eye Test costs from £29.95 and includes a Dry Eye Evaluation. The Advanced Eye Test with an OCT scan costs from £25 extra, the Ultimate Eye Test from £50 extra in selected stores, and a contact lens check is £50. NHS-funded eye tests are free if you qualify.",
      },
      {
        question: "How much is an eye test at Vision Express?",
        answer:
          "Vision Express says its Advanced Eye Test costs £30 and includes an OCT 3D eye scan, a UV protection assessment and a dry eye assessment. If you qualify for an NHS-funded test, you can upgrade to the Advanced Eye Test from £6.",
      },
      {
        question: "What is the cheapest eye test in the UK?",
        answer:
          "Of the main chains, Specsavers (£20 to £25, depending on the store) and Asda Opticians (£24) have the lowest published prices. The cheapest option is a free NHS-funded test if you qualify, and in Scotland NHS eye examinations are free for all UK residents.",
      },
      {
        question: "Can I get a free eye test if I'm on Universal Credit?",
        answer:
          "Yes, if you have no earnings or your take-home pay in your last assessment period was £435 or less (£935 or less if your award includes a child element or you have limited capability for work). You also get an NHS optical voucher towards glasses. If your income is higher, you may still get help through the NHS Low Income Scheme.",
      },
      {
        question: "Do I need to pay for an eye test if I wear contact lenses?",
        answer:
          "A sight test and a contact lens check are separate appointments, and the contact lens check is not covered by the NHS. Many opticians include contact lens checks in their monthly lens plans; otherwise there is a separate fee, such as £50 at Boots.",
      },
    ],
    relatedQueries: [
      "free-eye-test",
      "cheap-eye-test",
      "private-eye-test-cost",
      "oct-scan-cost",
    ],
    ctaText: "Compare eye test prices near you",
    sources: [
      { label: "Specsavers: How much is an eye test?", url: "https://www.specsavers.co.uk/help-and-faqs/how-much-is-an-eye-test" },
      { label: "Boots Opticians: Your eye test explained", url: "https://www.bootsopticians.com/eye-health/advice/your-eye-test-explained/" },
      { label: "Boots: Book an eye test (appointment types and contact lens check)", url: "https://boots.com/opticians/opticians-offers/eye-health-test" },
      { label: "Vision Express: Book an eye test", url: "https://www.visionexpress.com/eye-test" },
      { label: "Asda Opticians: Having an eye test", url: "https://opticians.asda.com/having-an-eye-test" },
      { label: "M&S Opticians: Eye test FAQs", url: "https://mandsopticians.com/eye-care/help/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
      { label: "NHSBSA: HC12 quick guide to help with health costs (April 2026)", url: "https://www.nhsbsa.nhs.uk/sites/default/files/2026-04/HC12%20(V24)%2004.2026.pdf" },
    ],
  },
  {
    slug: "free-eye-test",
    keyword: "free eye test",
    title: "Free Eye Tests in the UK: Who Qualifies and How to Book",
    seoTitle: "Free Eye Test: Who Gets a Free NHS Eye Test? (2026 Guide)",
    seoDescription:
      "Check if you get a free NHS eye test in England, Scotland, Wales or Northern Ireland, what proof to bring, and when opticians run free test offers.",
    h1: "Free Eye Tests: Who Qualifies?",
    dateModified: "2026-11-10",
    category: "nhs",
    shortDescription:
      "Who gets a free NHS-funded eye test in each UK nation, what proof to bring, help with glasses, and how opticians' free test offers work.",
    content: `Millions of people in the UK can have an eye test without paying. The main route is an NHS-funded sight test, which is free if you meet the rules for the country you live in. In Scotland, NHS eye examinations are free for everyone who is ordinarily resident in the UK. In England, Wales and Northern Ireland they are free for specific groups, including children, people aged 60 or over, people with diabetes or glaucoma and people on certain benefits.

An NHS-funded test checks your vision and the health of your eyes and is carried out by a qualified optometrist, just like a private test. You can have it at almost any high-street optician, including Specsavers, Boots, Vision Express, Asda and M&S Opticians, as well as many independent practices.`,
    sections: [
      {
        heading: "Who gets a free NHS eye test in England",
        body: `You are entitled to a free NHS sight test if any of these apply:`,
        items: [
          "You are under 16",
          "You are 16, 17 or 18 and in full-time education",
          "You are 60 or over",
          "You are registered as sight impaired (partially sighted) or severely sight impaired (blind)",
          "You have diabetes or glaucoma",
          "You are 40 or over and your mother, father, brother, sister, son or daughter has glaucoma",
          "An ophthalmologist has told you that you are at risk of glaucoma",
          "You are eligible for an NHS complex lens voucher",
          "You are a prisoner on leave from prison",
          "You or your partner receive income-based Jobseeker's Allowance, income-related Employment and Support Allowance or Pension Credit Guarantee Credit",
          "You or your partner receive Universal Credit with no earnings, or take-home pay of £435 or less in your last assessment period (£935 or less with a child element or limited capability for work)",
          "You are named on a valid HC2 certificate (full help with health costs)",
        ],
        links: [
          { label: "Over 60s", href: "/find/free-eye-test-over-60" },
          { label: "Children", href: "/find/free-eye-test-children" },
          { label: "Diabetes", href: "/find/free-eye-test-diabetes" },
          { label: "Universal Credit", href: "/find/free-eye-test-universal-credit" },
        ],
      },
      {
        heading: "Scotland, Wales and Northern Ireland",
        table: {
          headers: ["Country", "Who gets a free NHS eye test"],
          rows: [
            ["Scotland", "Everyone ordinarily resident in the UK. Routine tests are every two years for ages 16 to 59, and every year for under 16s, people aged 60 or over, people with diabetes and people who are sight impaired."],
            ["Wales", "Similar groups to England, including under 16s, under 19s in full-time education and people aged 60 or over, plus some extra groups such as people with sight in one eye, people with a hearing impairment and people assessed as at risk of eye disease. Examinations for urgent eye problems are also free at most practices."],
            ["Northern Ireland", "Similar groups to England. HSC sight tests are free for those who qualify, and optical voucher values are set separately."],
          ],
        },
      },
      {
        heading: "What proof to bring",
        body: `When you book, tell the optician you think you qualify for an NHS sight test. You may be asked for proof, such as your date of birth for age-based entitlement, an award letter for benefits, or your HC2 certificate number. Children under 16 do not need proof of benefits, and the optician can tell you what they need to see.`,
      },
      {
        heading: "Help with the cost of glasses",
        body: `If you get a free sight test because of your age alone (60 or over), that does not automatically include help with glasses. You do get an NHS optical voucher if you are under 16, 16 to 18 in full-time education, on a qualifying benefit, named on an HC2 certificate, or need complex lenses. In England voucher values range from £42.40 to £233.56 depending on your prescription. HC3 certificate holders may get partial help.`,
        links: [
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
        ],
      },
      {
        heading: "Low income? Check the NHS Low Income Scheme",
        body: `If you do not qualify through a benefit but your income is low, you can apply to the NHS Low Income Scheme. If you are awarded an HC2 certificate you get free NHS sight tests and help with glasses. An HC3 certificate gives partial help. You can apply online in some cases or by post using form HC1.`,
      },
      {
        heading: "Free eye tests through your employer",
        body: `If you use a computer or other display screen as a significant part of your job, your employer must arrange and pay for an eye test if you ask for one, and pay for basic glasses if you need them only for screen work. Many employers do this with an eyecare voucher from a chain such as Specsavers, Boots or Vision Express.`,
      },
      {
        heading: "Free eye test offers from opticians",
        body: `Outside the NHS, Specsavers and other opticians run time-limited free or discounted eye test offers at certain times of the year, for example through vouchers, app offers or seasonal promotions. These offers are subject to availability, may only apply at some stores and change often, so check the optician's own website for current terms before you book.`,
        links: [
          { label: "Eye test prices", href: "/find/eye-test-cost" },
          { label: "Cheapest eye tests", href: "/find/cheap-eye-test" },
          { label: "Home eye tests", href: "/at-home-eye-tests" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is a free NHS eye test the same as a paid one?",
        answer:
          "An NHS-funded sight test checks your vision and eye health and is carried out by a qualified optometrist, just like a private test. Some opticians offer optional extras at a cost, such as an OCT scan, which are not part of the NHS test.",
      },
      {
        question: "Do you get a free eye test at 60?",
        answer:
          "Yes. Everyone aged 60 or over is entitled to a free NHS sight test in England, Wales and Northern Ireland, and in Scotland NHS eye examinations are free for all UK residents.",
      },
      {
        question: "How often can I have a free NHS eye test?",
        answer:
          "The NHS recommends an eye test every two years for most adults. Some people can have free tests more often, for example children and people with certain conditions, if the optometrist says it is clinically needed. In Scotland, routine tests are every two years for ages 16 to 59 and every year for under 16s and people aged 60 or over.",
      },
      {
        question: "Can I get a free eye test on Universal Credit?",
        answer:
          "Yes, if you have no earnings or your take-home pay in your last assessment period was £435 or less, or £935 or less if your award includes a child element or you have limited capability for work. You also get an NHS optical voucher towards glasses.",
      },
      {
        question: "Do Specsavers do free eye tests?",
        answer:
          "Yes, if you qualify for an NHS-funded test, and everyone in Scotland gets a free NHS eye examination. Specsavers also runs time-limited free or discounted eye test offers at certain times of the year, subject to availability and location, and accepts employer eyecare vouchers.",
      },
      {
        question: "Are eye tests free in Scotland?",
        answer:
          "Yes. NHS eye examinations in Scotland are free for everyone who is ordinarily resident in the UK, as well as refugees, asylum seekers and some eligible overseas visitors.",
      },
      {
        question: "Can my employer pay for my eye test?",
        answer:
          "If you use a screen as a significant part of your work, your employer must arrange and pay for an eye test if you ask, and pay for basic glasses if you need them only for screen work.",
      },
    ],
    relatedQueries: [
      "free-eye-test-over-60",
      "free-eye-test-children",
      "free-eye-test-diabetes",
      "free-eye-test-universal-credit",
      "nhs-optical-voucher",
      "eye-test-cost",
    ],
    ctaText: "Find a free NHS eye test near you",
    keyFacts: [
      { label: "Over 60s", value: "Free NHS eye test" },
      { label: "Under 16s", value: "Free NHS eye test and voucher" },
      { label: "Scotland", value: "Free for all UK residents" },
      { label: "Optical voucher (England)", value: "£42.40 to £233.56" },
    ],
    sources: [
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
      { label: "NHSBSA: HC12 quick guide to help with health costs (April 2026)", url: "https://www.nhsbsa.nhs.uk/sites/default/files/2026-04/HC12%20(V24)%2004.2026.pdf" },
      { label: "NHSBSA: NHS Low Income Scheme", url: "https://www.nhsbsa.nhs.uk/nhs-low-income-scheme" },
      { label: "NHS Inform: Eye examinations in Scotland", url: "https://www.nhsinform.scot/care-support-and-rights/nhs-services/ophthalmics/your-entitlements-to-nhs-ophthalmic-services" },
      { label: "NHS Wales: Wales General Ophthalmic Services", url: "https://www.nhs.wales/sa/eye-care-wales/wgos/member-of-the-public" },
      { label: "GOV.WALES: Get help with NHS eye care costs", url: "https://www.gov.wales/get-help-nhs-eye-care-costs" },
      { label: "HSC Business Services Organisation: Optical voucher values (Northern Ireland)", url: "https://bso.hscni.net/directorates/operations/family-practitioner-services/ophthalmic-services/general-public-information/current-optical-voucher-values-sight-test-prices/" },
      { label: "HSE: Eye tests for display screen equipment users", url: "https://www.hse.gov.uk/msd/dse/eye-tests.htm" },
    ],
  },
  {
    slug: "cheap-eye-test",
    keyword: "cheap eye test",
    title: "Cheapest Eye Tests in the UK (2026 Price Comparison)",
    seoTitle: "Cheapest Eye Test UK 2026: Prices Compared and How to Pay Less",
    seoDescription:
      "Where to get the cheapest eye test in the UK: published prices at Specsavers, Asda, Boots, Vision Express and M&S, free NHS tests and current ways to pay less.",
    dateModified: "2026-11-10",
    category: "cost",
    shortDescription:
      "The cheapest private eye tests at the main UK opticians, plus free NHS tests and other ways to pay less.",
    content: `The cheapest eye test is a free one, and many people qualify for a free NHS-funded sight test without realising. If you do need to pay, the lowest published prices at the main high-street chains are at Specsavers (£20 to £25, depending on the store) and Asda Opticians (£24). Prices below were checked on each optician's own website in November 2026.

A lower price does not mean a less thorough sight test, since every test is carried out by a qualified optometrist. The difference is usually in the extras. Some opticians include an OCT scan in the price, while others charge for it separately, so compare what is included as well as the headline fee.`,
    sections: [
      {
        heading: "Cheapest eye tests at the main chains",
        table: {
          caption: "Published private eye test prices, lowest first, checked November 2026",
          headers: ["Optician", "Private eye test", "OCT scan"],
          rows: [
            ["Specsavers", "£20 to £25, depending on the store", "Up to £10 extra in most stores"],
            ["Asda Opticians", "£24", "Ask in store"],
            ["Boots Opticians", "From £29.95 (Essential Eye Test)", "From £25 extra (Advanced Eye Test)"],
            ["Vision Express", "£30 (Advanced Eye Test)", "Included"],
            ["M&S Opticians", "£40", "Included"],
          ],
        },
      },
      {
        heading: "Ways to pay less",
        items: [
          "Check whether you qualify for a free NHS-funded eye test before you book",
          "Live in Scotland? NHS eye examinations are free for all UK residents",
          "Ask your employer: screen users are entitled to an employer-paid eye test",
          "Look for time-limited free or discounted eye test offers, which Specsavers and other chains run at certain times of the year",
          "Compare what is included: an OCT scan included in the price can be better value than a cheaper test plus a paid scan",
          "If you need glasses, check whether you qualify for an NHS optical voucher",
        ],
        links: [
          { label: "Free eye test guide", href: "/find/free-eye-test" },
          { label: "Full eye test price guide", href: "/find/eye-test-cost" },
          { label: "OCT scan cost", href: "/find/oct-scan-cost" },
        ],
      },
    ],
    faqs: [
      {
        question: "Where is the cheapest place to get an eye test?",
        answer:
          "Of the main chains, Specsavers (£20 to £25, depending on the store) and Asda Opticians (£24) have the lowest published prices. The cheapest option of all is a free NHS-funded test if you qualify. Time-limited offers can also reduce the price, subject to availability and location.",
      },
      {
        question: "Is it worth paying more for an eye test?",
        answer:
          "Every sight test is carried out by a qualified optometrist. Higher-priced tests usually add extras such as an OCT scan, which gives a detailed 3D view of the back of the eye. Your optometrist can advise whether an extra scan is useful for you.",
      },
      {
        question: "Can I use an NHS voucher at any optician?",
        answer:
          "You can take an NHS optical voucher to any supplier that accepts NHS vouchers, which includes most high-street opticians. If your glasses cost more than the voucher, you pay the difference.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
      "free-eye-test",
      "opticians-near-me",
    ],
    ctaText: "Find the cheapest eye test near you",
    keyFacts: [
      { label: "Specsavers", value: "£20 to £25" },
      { label: "Asda Opticians", value: "£24" },
      { label: "Boots Opticians", value: "From £29.95" },
      { label: "Vision Express", value: "£30 (includes OCT)" },
    ],
    sources: [
      { label: "Specsavers: How much is an eye test?", url: "https://www.specsavers.co.uk/help-and-faqs/how-much-is-an-eye-test" },
      { label: "Asda Opticians: Having an eye test", url: "https://opticians.asda.com/having-an-eye-test" },
      { label: "Boots Opticians: Your eye test explained", url: "https://www.bootsopticians.com/eye-health/advice/your-eye-test-explained/" },
      { label: "Vision Express: Book an eye test", url: "https://www.visionexpress.com/eye-test" },
      { label: "M&S Opticians: Eye test FAQs", url: "https://mandsopticians.com/eye-care/help/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },
  {
    slug: "private-eye-test-cost",
    dateModified: "2026-11-11",
    keyword: "private eye test cost",
    title: "Private Eye Test Cost UK — What to Expect to Pay (2026)",
    category: "cost",
    shortDescription:
      "How much a private eye test costs across the UK in 2026, from basic sight tests to enhanced examinations with OCT scans.",
    content: `A private eye test in the UK is any sight test that is not funded by the NHS. If you do not qualify for a free NHS test, you will need to pay privately — but the good news is that private eye tests are generally very affordable, with most costing between £20 and £45.

Published private eye test prices at the main chains, checked in November 2026, are: Specsavers £20 to £25 depending on the store, Asda Opticians £24, Boots Opticians from £29.95, Vision Express £30 (including an OCT scan) and M&S Opticians £40 (including an OCT scan). Independent opticians set their own prices, so check with the practice.

Many opticians also offer enhanced tests with extra scans. Specsavers charges up to £10 extra for an OCT scan in most stores, Boots charges from £25 extra for its Advanced Eye Test with OCT and from £50 extra for its Ultimate Eye Test with optomap and OCT, while Vision Express and M&S Opticians include OCT in their private test price. Some independent opticians also include these extras as standard.

Specialist private tests carry their own pricing. A private contact lens fitting typically costs £30 to £60. A dry eye assessment at a dedicated clinic may cost £50 to £100. A private glaucoma assessment can range from £30 to £60. These specialist services are rarely covered by the NHS unless you are referred by your GP or optometrist for a clinical reason.

Keep in mind that even if you are paying privately, many opticians run regular promotions. Free eye test offers, two-for-one deals, and discounts through employer schemes are common. It is always worth asking about current offers when you book.`,
    faqs: [
      {
        question: "What is included in a private eye test?",
        answer:
          "A standard private eye test includes a visual acuity test, a refraction to determine your glasses prescription, an eye pressure check, and an examination of the internal and external health of your eyes. Some opticians include retinal photography or OCT scans in their standard fee, while others offer these as paid extras.",
      },
      {
        question: "Is a private eye test better than an NHS one?",
        answer:
          "The standard clinical examination is the same. The difference is in extras — private enhanced packages may include OCT scans and retinal photography that are not routinely part of an NHS sight test. The core assessment of your vision and eye health is identical.",
      },
      {
        question: "Can I claim back the cost of a private eye test?",
        answer:
          "You may be able to claim through your employer if you use display screen equipment at work. Some private health insurance plans and health cash plans also cover eye tests. Check your policy or ask your HR department.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
      "oct-scan-cost",
      "free-eye-test",
    ],
    ctaText: "Compare private eye test prices near you",
  },

  // ─── NHS ──────────────────────────────────────────────────────────────
  {
    slug: "free-eye-test-over-60",
    dateModified: "2026-11-10",
    keyword: "free eye test over 60",
    title: "Free Eye Tests for Over 60s — How to Book Your NHS Test",
    category: "nhs",
    shortDescription:
      "If you are aged 60 or over, you are entitled to a free NHS eye test. Here is how to book and what to expect.",
    content: `Everyone aged 60 or over is entitled to a free NHS-funded sight test in England, Wales and Northern Ireland, regardless of income, and in Scotland NHS eye examinations are free for all UK residents. This is one of the most important health benefits available to older adults, as the risk of developing sight-threatening conditions increases significantly with age.

Conditions that become more common after 60 include cataracts (clouding of the lens), age-related macular degeneration (the leading cause of sight loss in the UK), glaucoma (damage to the optic nerve), and diabetic retinopathy (if you have diabetes). All of these can be detected through a routine eye test, often before you notice any symptoms. Early detection is critical because many of these conditions can be treated effectively if caught early, but may cause irreversible damage if left undiagnosed.

Booking your free test is straightforward. Contact any optician — Specsavers, Boots, Vision Express, or your local independent — and tell them you are over 60 and would like to book an NHS eye test. No GP referral is needed. The only proof required is your date of birth, which the optician can verify from your identification. The test itself is identical to a private eye test and typically takes 20 to 30 minutes.

The NHS recommends an eye test at least every two years, and your optometrist may advise more frequent tests if you have diabetes, glaucoma or a family history of glaucoma. In Scotland, people aged 60 or over can have a free routine eye examination every year. If you notice any sudden changes in your vision — such as flashes of light, a shower of new floaters, a shadow or curtain across your vision, or sudden loss of sight — seek urgent help from your optician or NHS 111 immediately, as these can indicate serious conditions requiring prompt treatment.

Being 60 or over gives you a free sight test but not, on its own, an NHS optical voucher for glasses. You get a voucher if you also receive a qualifying benefit such as Pension Credit Guarantee Credit, hold an HC2 certificate through the NHS Low Income Scheme, or need complex lenses. Some chains also offer over-60s discounts on glasses, which change from time to time.`,
    faqs: [
      {
        question: "How often should I have an eye test if I'm over 60?",
        answer:
          "The NHS recommends an eye test at least every two years, and your optometrist may recommend more frequent tests depending on your eye health. In Scotland, people aged 60 or over can have a free routine eye examination every year.",
      },
      {
        question: "Do I get help with the cost of glasses if I'm over 60?",
        answer:
          "Not automatically. Being 60 or over gives you a free sight test, but you only get an NHS optical voucher if you also receive a qualifying benefit such as Pension Credit Guarantee Credit, hold an HC2 certificate, or need complex lenses.",
      },
      {
        question: "Can I have a home visit eye test if I can't get to an optician?",
        answer:
          "If you cannot leave home unaccompanied because of a physical or mental illness or disability and you qualify for an NHS sight test, you can ask for an NHS-funded home visit. Several chains, including Specsavers, offer home eye tests, and in Scotland home examinations are free for those who need them.",
      },
    ],
    relatedQueries: [
      "nhs-optical-voucher",
      "eye-test-at-home",
      "glaucoma-test",
    ],
    ctaText: "Book your free over-60s eye test",
  },
  {
    slug: "free-eye-test-children",
    dateModified: "2026-11-10",
    keyword: "free eye test children",
    title: "Free Eye Tests for Children — NHS Entitlement & When to Book",
    category: "nhs",
    shortDescription:
      "All children under 16 qualify for free NHS eye tests. Learn when to book your child's first test and what to expect.",
    content: `All children under 16 in the UK are entitled to free NHS-funded eye tests, and young people aged 16 to 18 also qualify if they are in full-time education. There is no means test, and children in both groups also get an NHS optical voucher if they need glasses.

The NHS recommends that children have their first eye test before starting school, ideally around age three or four. Many parents assume their child's vision must be fine if they have not complained, but children often do not recognise that their vision is abnormal because they have nothing to compare it to. Conditions such as amblyopia (lazy eye) and squint are most effectively treated in early childhood, and delayed detection can lead to permanent visual impairment.

You do not need to wait until your child can read to book an eye test. Optometrists use age-appropriate methods including picture matching tests, shape recognition, and objective measurement techniques that do not require any verbal response from your child. The appointment typically takes 20 to 40 minutes depending on the child's age and cooperation.

After the initial test, children should have annual eye tests throughout their school years. If your child wears glasses, annual checks ensure their prescription stays up to date — children's eyes change rapidly. If a problem such as lazy eye is being treated, more frequent visits may be recommended.

When a child needs glasses following their NHS eye test, they receive an NHS optical voucher towards the cost. In England vouchers are worth between £42.40 and £233.56 depending on the prescription, and many opticians have a children's range that the voucher covers in full. NHS Wales also provides free glasses for children who need them.`,
    faqs: [
      {
        question: "At what age should a child have their first eye test?",
        answer:
          "The NHS recommends a first eye test before starting school, ideally at age three or four. However, if you have any concerns about your baby's or toddler's vision — such as a squint or a white reflection in the pupil — seek advice from your GP or optician immediately, regardless of age.",
      },
      {
        question: "How often should children have eye tests?",
        answer:
          "Children should have annual eye tests throughout their school years. If a condition is being monitored or treated, more frequent appointments may be needed. All children's eye tests are free on the NHS.",
      },
      {
        question: "Will my child get free glasses on the NHS?",
        answer:
          "If your child needs glasses, they will receive an NHS optical voucher towards the cost. The voucher value depends on the prescription. Most opticians offer a range of children's frames that are fully covered by the voucher.",
      },
      {
        question: "My child's school did a vision screening — do they still need an eye test?",
        answer:
          "Yes. School vision screenings are basic checks that can miss many conditions. They are not a substitute for a full eye examination with a qualified optometrist. Even if your child passed a school screening, regular eye tests are still recommended.",
      },
    ],
    relatedQueries: [
      "childrens-eye-test-guide",
      "eye-test-what-to-expect",
      "nhs-optical-voucher",
    ],
    ctaText: "Book a free children's eye test near you",
  },
  {
    slug: "free-eye-test-diabetes",
    dateModified: "2026-11-10",
    keyword: "free eye test diabetes",
    title: "Free Eye Tests for People with Diabetes — NHS Entitlement",
    category: "nhs",
    shortDescription:
      "If you have Type 1 or Type 2 diabetes, you are entitled to free NHS eye tests. Learn about your entitlement and the separate diabetic eye screening programme.",
    content: `Everyone diagnosed with diabetes (type 1 or type 2) is entitled to a free NHS-funded sight test in England, Wales and Northern Ireland, and in Scotland NHS eye examinations are free for all UK residents, with people with diabetes able to have one every year. This is in addition to the separate NHS Diabetic Eye Screening Programme, which specifically checks for diabetic retinopathy using retinal photography. Both are essential, and you should attend both.

Diabetes can affect the eyes in several ways. The most well-known complication is diabetic retinopathy, where high blood sugar damages the tiny blood vessels in the retina. Left untreated, this can lead to sight loss. But diabetes also increases the risk of cataracts, glaucoma, and dry eye. A routine eye test at your optician checks your overall vision and eye health, while the separate diabetic eye screening specifically photographs the retina to look for signs of retinopathy.

Your optometrist will advise how often you need a sight test, which for many people with diabetes is once a year. Your optometrist will check your vision, update your glasses prescription if needed, measure your eye pressure, and examine the health of your eyes. They may detect signs of diabetic eye disease during this examination, but the test covers far more than just diabetes-related changes.

The NHS Diabetic Eye Screening Programme is a separate service. You should receive an automatic invitation once your GP has recorded your diabetes diagnosis. A trained screener takes detailed photographs of your retina after applying pupil-dilating drops. The images are graded by specialists, and you receive your results by post. If changes are found, you will be referred to a hospital eye clinic. You should attend both your annual optician's eye test and your annual diabetic eye screening — they are complementary, not interchangeable.

If you have not received a diabetic eye screening invitation, contact your GP practice to ensure your diabetes is recorded in their system and that you are registered with the local screening programme.`,
    faqs: [
      {
        question: "Is diabetic eye screening the same as an eye test?",
        answer:
          "No. They are different and complementary. An eye test at your optician checks your overall vision and eye health. Diabetic eye screening specifically photographs your retina to check for diabetic retinopathy. You should attend both, typically once a year each.",
      },
      {
        question: "How often should I have an eye test if I have diabetes?",
        answer:
          "At least once a year. Your optometrist may recommend more frequent tests if changes are detected. You should also attend your annual NHS Diabetic Eye Screening appointment.",
      },
      {
        question: "Can diabetes affect my eyesight even if I control my blood sugar well?",
        answer:
          "Yes. While good blood sugar control significantly reduces the risk, anyone with diabetes can develop eye complications. Regular eye tests and diabetic eye screening are essential regardless of how well your diabetes is managed.",
      },
    ],
    relatedQueries: [
      "free-eye-test",
      "oct-scan-cost",
      "blurry-vision-causes",
    ],
    ctaText: "Book your free diabetes eye test",
  },
  {
    slug: "free-eye-test-universal-credit",
    keyword: "free eye test universal credit",
    title: "Free Eye Tests on Universal Credit: Who Qualifies",
    seoTitle: "Free Eye Test on Universal Credit: Earnings Limits and Vouchers (2026)",
    seoDescription:
      "Universal Credit can give you a free NHS eye test and optical voucher if your take-home pay is £435 or less (£935 with a child element or LCW). Here is how it works.",
    dateModified: "2026-11-10",
    category: "nhs",
    shortDescription:
      "When Universal Credit gives you a free NHS eye test and an optical voucher, the earnings limits, and what to do if you earn more.",
    content: `If you get Universal Credit you can get a free NHS sight test and an NHS optical voucher towards glasses or contact lenses, as long as your earnings are under the limit. The NHSBSA guide for April 2026 says you qualify if you, or someone in your award, get Universal Credit and had no earnings, or take-home pay of £435 or less, in your last assessment period. The limit is £935 or less if your award includes a child element or you have limited capability for work.

You do not need to apply separately for this. Tell the optician you get Universal Credit when you book and they will ask you to confirm your entitlement. If you are under 20 and a dependant of someone who qualifies, you are covered too.`,
    sections: [
      {
        heading: "Universal Credit earnings limits",
        table: {
          headers: ["Your Universal Credit award", "Take-home pay in your last assessment period"],
          rows: [
            ["Standard award", "No earnings, or £435 or less"],
            ["Includes a child element, or you have limited capability for work", "£935 or less"],
          ],
        },
      },
      {
        heading: "If you earn more than the limit",
        body: `If your earnings are above the limit, you can still apply to the NHS Low Income Scheme. If you are awarded an HC2 certificate you get free NHS sight tests and help with glasses. An HC3 certificate gives partial help. You can apply online in some cases or by post using form HC1. You may also qualify for a free test for another reason, such as being 60 or over or having diabetes.`,
        links: [
          { label: "Who else gets a free eye test", href: "/find/free-eye-test" },
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
        ],
      },
    ],
    faqs: [
      {
        question: "Do I get a free eye test on Universal Credit?",
        answer:
          "Yes, if you had no earnings or take-home pay of £435 or less in your last assessment period, or £935 or less if your award includes a child element or you have limited capability for work. You also get an NHS optical voucher.",
      },
      {
        question: "Do I need an HC2 certificate if I'm on Universal Credit?",
        answer:
          "Not if your earnings are under the Universal Credit limit, as you qualify through Universal Credit itself. If you earn more, you can apply for an HC2 or HC3 certificate through the NHS Low Income Scheme.",
      },
      {
        question: "Can I get free glasses on Universal Credit?",
        answer:
          "If you qualify, you get an NHS optical voucher towards the cost of glasses or contact lenses. In England the voucher is worth between £42.40 and £233.56 depending on your prescription. If your glasses cost more, you pay the difference.",
      },
    ],
    relatedQueries: [
      "free-eye-test",
      "nhs-optical-voucher",
      "cheap-eye-test",
      "eye-test-cost",
    ],
    ctaText: "Find a free eye test near you",
    sources: [
      { label: "NHSBSA: HC12 quick guide to help with health costs (April 2026)", url: "https://www.nhsbsa.nhs.uk/sites/default/files/2026-04/HC12%20(V24)%2004.2026.pdf" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
      { label: "NHSBSA: NHS Low Income Scheme", url: "https://www.nhsbsa.nhs.uk/nhs-low-income-scheme" },
    ],
  },
  {
    slug: "nhs-optical-voucher",
    keyword: "NHS optical voucher",
    title: "NHS Optical Voucher Values 2026: Who Qualifies and How to Use It",
    seoTitle: "NHS Optical Voucher Values 2026: Bands A to H and Who Qualifies",
    seoDescription:
      "NHS optical voucher values in England range from £42.40 to £233.56. See every band, the supplements, who qualifies and how to use your voucher.",
    dateModified: "2026-11-10",
    category: "nhs",
    shortDescription:
      "What NHS optical vouchers are worth, who qualifies and how to use one towards glasses or contact lenses.",
    content: `An NHS optical voucher is a contribution towards the cost of glasses or contact lenses. The value depends on your prescription, not on the frame you choose, and you can take it to any supplier that accepts NHS vouchers. If your glasses cost more than the voucher, you pay the difference.

The values below are for England and come from the NHSBSA guide for April 2026. Scotland, Wales and Northern Ireland set their own values; Northern Ireland's, for example, run from £46.42 to £255.81.`,
    sections: [
      {
        heading: "NHS optical voucher values in England",
        table: {
          headers: ["Voucher", "Lens type", "Maximum value"],
          rows: [
            ["A", "Single vision, lower prescriptions", "£42.40"],
            ["B", "Single vision, medium prescriptions", "£64.26"],
            ["C", "Single vision, higher prescriptions", "£94.14"],
            ["D", "Single vision, very high prescriptions", "£212.40"],
            ["E", "Bifocal, lower prescriptions", "£73.10"],
            ["F", "Bifocal, medium prescriptions", "£92.72"],
            ["G", "Bifocal, higher prescriptions", "£120.48"],
            ["H", "Bifocal, very high or prism-controlled", "£233.56"],
          ],
        },
        body: `Supplements are added where clinically needed, for example for prisms (£13.67 per single vision lens) and tints or photochromic lenses (£4.77 per single vision lens).`,
      },
      {
        heading: "Who gets an NHS optical voucher",
        items: [
          "Children under 16",
          "Young people aged 16, 17 or 18 in full-time education",
          "People who need complex lenses",
          "People receiving, or included in an award of, income-based Jobseeker's Allowance, income-related Employment and Support Allowance or Pension Credit Guarantee Credit",
          "People receiving Universal Credit with no earnings or take-home pay of £435 or less (£935 or less with a child element or limited capability for work)",
          "People named on a valid HC2 certificate (HC3 holders may get partial help)",
          "Prisoners on leave from prison",
        ],
        body: `Being 60 or over gives you a free sight test but not, on its own, a voucher.`,
        links: [
          { label: "Free eye test guide", href: "/find/free-eye-test" },
          { label: "Universal Credit", href: "/find/free-eye-test-universal-credit" },
          { label: "Children", href: "/find/free-eye-test-children" },
        ],
      },
    ],
    faqs: [
      {
        question: "How much is an NHS optical voucher worth?",
        answer:
          "In England, the main voucher bands are worth between £42.40 (band A, single vision) and £233.56 (band H, complex bifocals), according to the NHSBSA guide for April 2026. Your optometrist tells you which band applies to your prescription.",
      },
      {
        question: "Can I use my NHS voucher at any optician?",
        answer:
          "You can take your voucher to any supplier that accepts NHS optical vouchers, which includes most high-street opticians. They will ask you to show proof of your entitlement.",
      },
      {
        question: "Can I use an NHS optical voucher for contact lenses?",
        answer:
          "Yes. The voucher can go towards contact lenses instead of glasses. If the lenses cost more than the voucher, you pay the difference.",
      },
    ],
    relatedQueries: [
      "free-eye-test",
      "free-eye-test-universal-credit",
      "free-eye-test-children",
      "cheap-eye-test",
    ],
    ctaText: "Find an optician that accepts NHS vouchers",
    keyFacts: [
      { label: "Lowest value (band A)", value: "£42.40" },
      { label: "Highest value (band H)", value: "£233.56" },
      { label: "Children under 16", value: "Always eligible" },
      { label: "Over 60s", value: "Free test, voucher only if otherwise eligible" },
    ],
    sources: [
      { label: "NHSBSA: HC12 quick guide to help with health costs (April 2026)", url: "https://www.nhsbsa.nhs.uk/sites/default/files/2026-04/HC12%20(V24)%2004.2026.pdf" },
      { label: "NHS: NHS voucher values for glasses and lenses", url: "https://www.nhs.uk/nhs-services/opticians/nhs-voucher-values-for-glasses-and-lenses" },
      { label: "HSC Business Services Organisation: Optical voucher values (Northern Ireland)", url: "https://bso.hscni.net/directorates/operations/family-practitioner-services/ophthalmic-services/general-public-information/current-optical-voucher-values-sight-test-prices/" },
    ],
  },

  // ─── Availability ─────────────────────────────────────────────────────
  {
    slug: "same-day-eye-test",
    keyword: "same day eye test",
    title: "Same-Day Eye Test: How to Find an Appointment Today",
    seoTitle: "Same-Day Eye Test Near Me: Find an Appointment Today (UK)",
    seoDescription:
      "How to find a same-day eye test near you. See the next available appointment at opticians near you and book direct. Free if you qualify for an NHS eye test.",
    h1: "Same-Day Eye Test: Find an Appointment Today",
    dateModified: "2026-11-11",
    category: "availability",
    shortDescription:
      "Find an eye test today. See the next available appointment at opticians near you and book direct.",
    content: `Enter your postcode at the top of this page to see opticians near you. Where an optician publishes its appointment times, we show the next available slot, so you can spot a same-day or weekend appointment and book direct with the optician.

Availability changes through the day as people book and cancel, so if nothing suits, check again later or call the practice. A same-day eye test is the same test as any other appointment, and it is free if you qualify for a free NHS eye test.

If you have a sudden eye problem, such as a red or painful eye, new flashes or floaters, or a sudden change in your sight, this is not a routine eye test. See the emergency eye care page for where to go.`,
    keyFacts: [
      { label: "Find a slot", value: "Search by postcode" },
      { label: "Book", value: "Direct with the optician" },
      { label: "Free", value: "If you qualify for the NHS" },
      { label: "Urgent problem?", value: "See emergency eye care" },
    ],
    sections: [
      {
        heading: "Tips for getting seen today",
        items: [
          "Search by postcode and look at the next available appointment for each optician",
          "Call the practice if you can't see a slot online, as cancellations come up during the day",
          "Bring your glasses, contact lenses and proof of entitlement if you qualify for a free NHS test",
        ],
        links: [
          { label: "Walk-in eye tests", href: "/find/walk-in-eye-test" },
          { label: "Weekend eye tests", href: "/find/weekend-eye-test" },
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
        ],
      },
      {
        heading: "Urgent eye problems",
        body: `In many parts of England, accredited opticians provide free NHS urgent eye care through the Community Urgent Eyecare Service (CUES). It is not an eye test, and you need to phone first. For a serious eye injury, such as a chemical in the eye or something that has pierced the eye, the NHS says go to A&E or call 999.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I get an eye test today?",
        answer:
          "Often, yes. Search by postcode to see the next available appointment at opticians near you, or call a practice to ask about cancellations.",
      },
      {
        question: "Does a same-day eye test cost more?",
        answer:
          "You pay the optician's normal price for the test you book. If you qualify for a free NHS eye test, it is free whenever you book it.",
      },
      {
        question: "Is a same-day eye test the right choice for a sudden eye problem?",
        answer:
          "No. A red or painful eye, new flashes or floaters, or a sudden change in sight needs urgent eye care, not a routine test. Phone an optician that provides urgent care, or call NHS 111.",
      },
    ],
    relatedQueries: [
      "walk-in-eye-test",
      "weekend-eye-test",
      "emergency-eye-test-near-me",
    ],
    ctaText: "See today's appointments near you",
    disclaimer:
      "Appointment availability changes quickly and is shown only where the optician publishes it. Always check with the optician.",
    sources: [
      { label: "Primary Eyecare Services: Community Urgent Eyecare Service", url: "https://primaryeyecare.co.uk/services/community-urgent-eyecare-service/" },
      { label: "NHS: Eye injuries", url: "https://www.nhs.uk/conditions/eye-injuries/" },
    ],
  },
  {
    slug: "walk-in-eye-test",
    keyword: "walk in eye test",
    title: "Walk-In Eye Test: Can You Get Seen Without an Appointment?",
    seoTitle: "Walk-In Eye Test Near Me: Get Seen Without Booking (UK)",
    seoDescription:
      "Can you walk in for an eye test? Most opticians work by appointment, so check the next available slot near you and book direct, even for today.",
    h1: "Walk-In Eye Tests",
    dateModified: "2026-11-11",
    category: "availability",
    shortDescription:
      "Most opticians work by appointment. Here is the quickest way to get seen without a long wait.",
    content: `Most opticians run eye tests by appointment, and whether they can see someone who walks in depends on how busy they are that day. Rather than turning up and hoping, it is usually quicker to check availability first.

Enter your postcode at the top of this page to see opticians near you. Where an optician publishes its appointment times, we show the next available slot, so you can spot a same-day or weekend appointment and book direct with the optician.

If you have a sudden eye problem, such as a red or painful eye, new flashes or floaters, or a sudden change in your sight, this is not a routine eye test. See the emergency eye care page for where to go.`,
    keyFacts: [
      { label: "Most opticians", value: "Work by appointment" },
      { label: "Quickest route", value: "Check the next slot, book direct" },
      { label: "Urgent NHS eye care", value: "Phone first, not walk-in" },
      { label: "Free", value: "If you qualify for the NHS" },
    ],
    sections: [
      {
        heading: "Urgent eye care is not a walk-in service",
        body: `In many parts of England, accredited opticians provide free NHS urgent eye care through the Community Urgent Eyecare Service (CUES). Primary Eyecare Services, which runs it, says you must phone first because it is not a walk-in service, and it is not an eye test. For a serious eye injury, the NHS says go to A&E or call 999.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I walk into an optician for an eye test?",
        answer:
          "Sometimes, if a practice has a free slot, but most work by appointment. Check the next available appointment near you, or call ahead, to avoid a wasted trip.",
      },
      {
        question: "Is a walk-in eye test more expensive?",
        answer:
          "You pay the optician's normal price for the test. If you qualify for a free NHS eye test, it is free however you book.",
      },
      {
        question: "Can I walk in for an urgent eye problem?",
        answer:
          "Phone first. NHS urgent eye care at opticians in England (CUES) is not a walk-in service. For a serious eye injury, go to A&E or call 999.",
      },
    ],
    relatedQueries: [
      "same-day-eye-test",
      "weekend-eye-test",
      "emergency-eye-test-near-me",
    ],
    ctaText: "See the next available appointment near you",
    disclaimer:
      "Appointment availability changes quickly and is shown only where the optician publishes it. Always check with the optician.",
    sources: [
      { label: "Primary Eyecare Services: CUES service summary", url: "https://primaryeyecare.co.uk/for-professionals/commissioners/service-summaries/community-urgent-eyecare-service-cues" },
      { label: "NHS: Eye injuries", url: "https://www.nhs.uk/conditions/eye-injuries/" },
    ],
  },
  {
    slug: "weekend-eye-test",
    keyword: "weekend eye test",
    title: "Weekend Eye Test: Saturday and Sunday Appointments",
    seoTitle: "Saturday and Sunday Eye Test Near Me: Weekend Appointments (UK)",
    seoDescription:
      "Find a Saturday or Sunday eye test near you. Opening hours vary by store, so check the next available weekend appointment and book direct with the optician.",
    h1: "Weekend Eye Tests: Saturday and Sunday",
    dateModified: "2026-11-11",
    category: "availability",
    shortDescription:
      "Find a Saturday or Sunday eye test near you. Weekend hours vary by store, so check before you go.",
    content: `Many opticians open on Saturdays, and some open on Sundays, but hours vary from store to store, even within the same chain. Weekend slots also tend to book up, so it helps to look ahead.

Enter your postcode at the top of this page to see opticians near you. Where an optician publishes its appointment times, we show the next available slot, so you can spot a same-day or weekend appointment and book direct with the optician.

Store pages on eyetest.co.uk show opening hours where the optician publishes them. A weekend eye test is the same test as a weekday one, and it is free if you qualify for a free NHS eye test.`,
    keyFacts: [
      { label: "Saturday", value: "Many opticians open" },
      { label: "Sunday", value: "Some stores open, check hours" },
      { label: "Book", value: "Ahead, weekend slots go fast" },
      { label: "Free", value: "If you qualify for the NHS" },
    ],
    sections: [
      {
        heading: "Urgent problems at the weekend",
        body: `NHS urgent eye care at opticians varies by area and some services do not run on Sundays. If you have a sudden eye problem outside opening hours, call NHS 111. For a serious eye injury, such as a chemical in the eye, the NHS says go to A&E or call 999.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are opticians open on Sundays?",
        answer:
          "Some are, mainly larger stores, but hours vary by store. Check the store's opening hours or the next available appointment before you go.",
      },
      {
        question: "Do weekend eye tests cost more?",
        answer:
          "You pay the optician's normal price for the test you book. If you qualify for a free NHS eye test, it is free at the weekend too.",
      },
      {
        question: "How far ahead should I book a Saturday eye test?",
        answer:
          "As early as you can, as weekend appointments are popular. Checking the next available slot near you shows what is free.",
      },
    ],
    relatedQueries: [
      "same-day-eye-test",
      "walk-in-eye-test",
      "book-eye-test",
    ],
    ctaText: "See weekend appointments near you",
    disclaimer:
      "Opening hours and appointment availability change and are shown only where the optician publishes them. Always check with the optician.",
    sources: [
      { label: "NHS: Eye injuries", url: "https://www.nhs.uk/conditions/eye-injuries/" },
    ],
  },
  {
    slug: "emergency-eye-test-near-me",
    keyword: "emergency eye test near me",
    title: "Emergency Eye Care Near Me: Where to Go for an Urgent Eye Problem",
    seoTitle: "Emergency Eye Care Near Me: Urgent Optician, NHS 111 or A&E?",
    seoDescription:
      "Where to go for an urgent eye problem in the UK: free NHS urgent eye care at opticians (CUES), NHS 111, or A&E for serious eye injuries. What the NHS advises.",
    h1: "Emergency Eye Care: Where to Go",
    dateModified: "2026-11-11",
    category: "availability",
    shortDescription:
      "Where to go for a sudden eye problem: an urgent eye care optician, NHS 111, or A&E for serious injuries, based on NHS advice.",
    content: `Where you should go depends on how serious the problem is. For a serious eye injury, go to A&E or call 999. For other sudden eye problems, many opticians in England provide free NHS urgent eye care, and NHS 111 can tell you where to go.`,
    keyFacts: [
      { label: "Serious injury", value: "A&E or call 999" },
      { label: "Sudden eye problem", value: "Urgent care optician (phone first)" },
      { label: "Not sure", value: "Call NHS 111" },
      { label: "Cost", value: "NHS urgent eye care is free" },
    ],
    sections: [
      {
        heading: "Go to A&E or call 999 if",
        body: `The NHS says go to A&E or call 999 if:`,
        items: [
          "A strong chemical, such as oven cleaner or bleach, is in your eye. Keep rinsing with water while you wait",
          "A sharp object has pierced your eye",
          "Something has hit your eye at high speed, for example from power tools or a lawnmower",
          "Your sight has changed after an eye injury",
          "You have severe eye pain, a headache or sensitivity to light, or you feel or are sick after an eye injury",
          "You cannot move your eye or keep it open, or blood or pus is coming from it",
        ],
      },
      {
        heading: "Urgent eye care at opticians (CUES)",
        body: `In many parts of England, accredited opticians provide the Community Urgent Eyecare Service (CUES), a free NHS service for sudden eye problems such as a red or painful eye, something in your eye, a sudden change in vision, or new flashes and floaters. It is not an eye test, and you need to phone first rather than walk in. Your own optician may provide it, or can tell you who does. Availability varies by area.`,
        links: [
          { label: "Floaters in vision", href: "/eye-health/conditions/floaters-and-flashes" },
          { label: "Sudden vision changes", href: "/find/sudden-vision-changes" },
        ],
      },
      {
        heading: "Call NHS 111 if",
        body: `The NHS says ask for an urgent GP appointment or get help from NHS 111 if an eye injury is not getting better after 24 hours, if it is very painful, or if you are worried about it, particularly if a child is injured. You could also visit an optician for advice. Always call 111 if you need help for a child under 5.`,
      },
      {
        heading: "What to do while you get help",
        body: `If something is in your eye, the NHS advises washing it with clean, cool water, holding the eye open and running water over it for at least 20 minutes. Do not try to remove anything that has pierced the eye, do not rub it, and do not wear contact lenses or eye make-up until it is better. Do not drive yourself to A&E.`,
      },
    ],
    faqs: [
      {
        question: "Should I go to A&E or an optician for an eye problem?",
        answer:
          "Go to A&E or call 999 for serious injuries, such as a chemical in the eye, something piercing the eye, or changes to your sight after an injury. For other sudden problems, phone an optician that provides NHS urgent eye care, or call NHS 111.",
      },
      {
        question: "Is emergency eye care free?",
        answer:
          "NHS urgent eye care at accredited opticians in England (CUES) is free where it is available. A&E and NHS 111 are free.",
      },
      {
        question: "Can I walk in to an optician for urgent eye care?",
        answer:
          "Phone first. CUES is not a walk-in service, and the optician will check whether you need to be seen and how soon.",
      },
      {
        question: "What counts as an urgent eye problem?",
        answer:
          "Examples include a red or painful eye, something in your eye that won't come out, a sudden change in vision, and new flashes or floaters.",
      },
    ],
    relatedQueries: [
      "sudden-vision-changes",
      "floaters-in-vision",
      "same-day-eye-test",
    ],
    ctaText: "Find opticians near you",
    disclaimer:
      "This page is general information based on NHS advice, not medical advice. If in doubt, call NHS 111, or 999 in an emergency.",
    sources: [
      { label: "NHS: Eye injuries", url: "https://www.nhs.uk/conditions/eye-injuries/" },
      { label: "Primary Eyecare Services: Community Urgent Eyecare Service", url: "https://primaryeyecare.co.uk/services/community-urgent-eyecare-service/" },
      { label: "Primary Eyecare Services: CUES service summary", url: "https://primaryeyecare.co.uk/for-professionals/commissioners/service-summaries/community-urgent-eyecare-service-cues" },
    ],
  },
  {
    slug: "eye-test-at-home",
    canonicalPath: "/at-home-eye-tests",
    keyword: "eye test at home",
    title: "Eye Tests at Home — Domiciliary Eye Care in the UK",
    category: "availability",
    shortDescription:
      "If you cannot visit an optician, a qualified optometrist can carry out a full eye test in your own home. Learn about domiciliary eye care.",
    content: `Domiciliary eye tests — also known as home visit eye tests — are available for people who cannot easily travel to an optician's practice. A qualified optometrist visits your home with portable equipment and carries out a full clinical eye test to the same standard you would receive in a high-street practice.

You are eligible for a free NHS-funded home visit eye test if you cannot leave your home unaccompanied due to a physical or mental health condition or disability. This includes many elderly or housebound individuals, people in care homes or nursing homes, those with severe mobility issues, and people with conditions such as advanced dementia, agoraphobia, or severe disability. If you can get to an optician with help (for example, if a family member drives you), you may not qualify for a home visit — but the eligibility criteria are interpreted generously, and your optician can advise.

To arrange a home visit, you can contact a domiciliary optical practice directly (search online for domiciliary opticians in your area), ask your GP for a recommendation, or call NHS 111 for guidance. Many standard high-street opticians also offer home visit services for qualifying patients. The appointment typically takes 30 to 45 minutes, and the optometrist will bring all necessary equipment including portable vision charts, a trial lens set, slit lamp, and often a portable fundus camera.

If you need new glasses, the optometrist can help you choose frames during the visit and arrange for the finished glasses to be delivered to your home. You may receive an NHS optical voucher towards the cost, just as you would at a practice-based appointment.

Private home visit eye tests are also available for anyone who simply prefers the convenience of testing at home, regardless of mobility. These typically cost between £40 and £80 and can be arranged through domiciliary optical services in most areas.`,
    faqs: [
      {
        question: "How do I arrange a home visit eye test?",
        answer:
          "Contact a domiciliary optical practice in your area, ask your GP for a recommendation, or call NHS 111. Many high-street opticians also provide home visits for eligible patients. Your optician can check whether you qualify for a free NHS home visit.",
      },
      {
        question: "Is a home eye test as thorough as an in-practice test?",
        answer:
          "Yes. A domiciliary eye test meets the same clinical standards as a practice-based test. The optometrist uses portable versions of the same equipment and carries out all the same checks on your vision and eye health.",
      },
      {
        question: "Can someone in a care home have an eye test?",
        answer:
          "Yes. Care home residents are typically eligible for free NHS home visit eye tests. Many domiciliary optical practices regularly visit care homes in their area. The care home manager or staff can arrange visits on behalf of residents.",
      },
    ],
    relatedQueries: [
      "free-eye-test-over-60",
    ],
    ctaText: "Find home visit eye tests near you",
  },
  {
    slug: "online-eye-test",
    keyword: "online eye test",
    title: "Online Eye Test: What It Can and Can't Tell You",
    seoTitle: "Online Eye Test UK: Can It Replace a Proper Eye Test?",
    seoDescription:
      "Online eye tests can give a rough idea of how well you see, but in the UK only a registered optometrist or doctor can carry out a sight test. What online checks miss.",
    h1: "Online Eye Tests: What They Can and Can't Do",
    dateModified: "2026-11-11",
    category: "availability",
    shortDescription:
      "What an online eye test can tell you, what it can't, and why you still need a sight test with an optometrist.",
    content: `Online eye tests can give you a rough idea of how clearly you see, for example by reading letters on your screen. They cannot check the health of your eyes.

In the UK, the Opticians Act 1989 says a sight test can only be carried out by a registered optometrist or a registered medical practitioner. A full eye examination also checks the inside and outside of your eyes, your eye movements and, if you are at risk, tests for glaucoma, according to the College of Optometrists. An online check cannot do these things.`,
    keyFacts: [
      { label: "Online check", value: "A rough idea of your vision" },
      { label: "Eye health", value: "Not checked online" },
      { label: "Sight test", value: "Registered optometrist or doctor" },
      { label: "Free", value: "If you qualify for the NHS" },
    ],
    sections: [
      {
        heading: "What an online check misses",
        body: `The College of Optometrists says an eye examination includes:`,
        items: [
          "Questions about your health, eyes, family history, work and hobbies",
          "Distance and near vision checks",
          "Eye movement and coordination checks",
          "A detailed look at the outside and inside of your eyes",
          "Glaucoma tests if you are in a group at risk",
        ],
        links: [
          { label: "What happens during an eye test", href: "/articles/what-happens-during-an-eye-test" },
        ],
      },
      {
        heading: "Colour vision and online tests",
        body: `Online colour blind tests can suggest whether you might have a colour vision deficiency, but screens show colours differently, so the NHS advises getting checked at an optician.`,
        links: [
          { label: "Colour blind test", href: "/find/colour-blind-test" },
        ],
      },
      {
        heading: "Getting a proper eye test",
        body: `You can get a free NHS eye test if you qualify, for example if you are under 16, 60 or over, or have diabetes. Otherwise, see what the main opticians charge before you book.`,
        links: [
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
          { label: "Eye test prices", href: "/find/eye-test-cost" },
          { label: "Eye tests at home", href: "/at-home-eye-tests" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I get a glasses prescription from an online eye test?",
        answer:
          "No. In the UK a sight test can only be carried out by a registered optometrist or a registered medical practitioner, and a prescription comes from that sight test.",
      },
      {
        question: "Are online eye tests accurate?",
        answer:
          "They can give a rough idea of how clearly you see, but they cannot check your eye health or test for conditions such as glaucoma.",
      },
      {
        question: "What if I can't get to an optician?",
        answer:
          "If you can't leave home unaccompanied because of illness or disability and you qualify for a free NHS eye test, an optometrist may be able to visit you at home.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
      "free-eye-test",
      "do-i-need-an-eye-test",
    ],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information, not medical advice. If you notice a change in your sight, see an optician.",
    sources: [
      { label: "legislation.gov.uk: Opticians Act 1989, section 24", url: "https://www.legislation.gov.uk/ukpga/1989/44/section/24" },
      { label: "College of Optometrists: The eye examination", url: "https://lookafteryoureyes.org/eye-examinations/the-eye-examination/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Brand ─────────────────────────────────────────────────────────────
  {
    slug: "specsavers-vs-boots",
    dateModified: "2026-11-11",
    keyword: "Specsavers vs Boots eye test",
    title: "Specsavers vs Boots Eye Test Comparison (2026)",
    category: "brand",
    shortDescription:
      "A side-by-side look at eye tests at Specsavers and Boots Opticians: prices, what is included and the extras each offers, checked against their own websites in November 2026.",
    content: `Specsavers and Boots Opticians are two of the UK's best-known optician chains, and both provide a high standard of eye care from qualified, GOC-registered optometrists. Here is how their eye tests compare, using the information each publishes on its own website.

On price, Specsavers says a routine eye test costs £20 to £25 depending on the store. Boots says its Essential Eye Test costs from £29.95, and that price includes a Dry Eye Evaluation as part of the test. Both chains run time-limited offers from time to time, such as free or discounted eye tests, which are subject to availability and location.

For a more detailed look at your eye health, Specsavers offers an OCT scan for up to £10 extra in most stores. Boots offers an Advanced Eye Test with OCT from £25 extra, and in selected stores an Ultimate Eye Test with both optomap and OCT imaging from £50 extra, one of the most comprehensive eye health checks on the high street.

Both chains provide free NHS-funded eye tests if you qualify, along with children's eye tests, contact lens services and a wide choice of frames. Boots Opticians is known for its quality, its designer frame ranges and the convenience of practices across the country, while Specsavers has over 900 stores and a strong focus on value. Both are excellent choices, so the best one for you often comes down to the test you want, where is most convenient and any offer running at the time.`,
    faqs: [
      {
        question: "Is Specsavers or Boots cheaper for eye tests?",
        answer:
          "Specsavers publishes a price of £20 to £25 depending on the store. Boots publishes a price from £29.95 for its Essential Eye Test, which includes a Dry Eye Evaluation. Both chains run time-limited offers, and both provide free NHS-funded eye tests if you qualify.",
      },
      {
        question: "Is one better than the other for eye test quality?",
        answer:
          "Both provide a high standard of care from qualified, GOC-registered optometrists using professional equipment, and both cover the essential checks of your vision and eye health.",
      },
      {
        question: "Which has better OCT scanning?",
        answer:
          "Both offer OCT scanning. Specsavers charges up to £10 extra in most stores. Boots offers an Advanced Eye Test with OCT from £25 extra, and an Ultimate Eye Test with optomap and OCT from £50 extra in selected stores.",
      },
    ],
    relatedQueries: [
    ],
    ctaText: "Compare Specsavers and Boots near you",
  },

  // ─── General ──────────────────────────────────────────────────────────
  {
    slug: "book-eye-test",
    keyword: "book eye test",
    title: "Book an Eye Test Online: How to Book with Any UK Optician",
    seoTitle: "Book an Eye Test Online: Specsavers, Boots, Vision Express and More",
    seoDescription:
      "How to book an eye test online or by phone with Specsavers, Boots, Vision Express, Asda, M&S and independents, what to bring and how to book a free NHS test.",
    h1: "Book an Eye Test",
    dateModified: "2026-11-10",
    category: "availability",
    shortDescription:
      "How to book an eye test online or by phone with the main UK opticians, what to bring and how to book a free NHS-funded test.",
    content: `You can book an eye test online with all the main UK opticians, including Specsavers, Boots, Vision Express, Asda and M&S Opticians, or by phoning or visiting your local practice. Enter your postcode above to find opticians near you, then choose the one that suits you.

If you think you qualify for a free NHS-funded eye test, say so when you book. The optician will check your entitlement and may ask you to bring proof, such as a benefit award letter or HC2 certificate.`,
    sections: [
      {
        heading: "How to book",
        items: [
          "Find an optician near you by postcode or town",
          "Choose the type of appointment: a sight test, a contact lens check or both",
          "Say whether you qualify for an NHS-funded test",
          "Pick a time; many chains show same-week and weekend slots online",
          "Bring your current glasses or contact lenses, a list of any medicines and any proof of NHS entitlement",
        ],
      },
      {
        heading: "Book with the main opticians",
        links: [
          { label: "Specsavers eye test price", href: "/opticians/specsavers" },
          { label: "Boots eye test price", href: "/opticians/boots-opticians" },
          { label: "Vision Express eye test price", href: "/opticians/vision-express" },
          { label: "Asda eye test price", href: "/opticians/asda-opticians" },
          { label: "M&S Opticians", href: "/opticians/mands-opticians" },
          { label: "Opticians near me", href: "/find/opticians-near-me" },
        ],
      },
      {
        heading: "Urgent eye problems",
        body: `Do not wait for a routine appointment if you have sudden changes in your vision, eye pain, a red eye, flashing lights or a shower of new floaters. Call an optician the same day or contact NHS 111. For a sudden loss of vision, go to A&E or call 999.`,
        links: [
          { label: "Emergency eye test", href: "/find/emergency-eye-test-near-me" },
          { label: "Same-day eye test", href: "/find/same-day-eye-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I book an eye test online?",
        answer:
          "Yes. Specsavers, Boots, Vision Express, Asda and M&S Opticians all let you book online, and many independent opticians do too. You can also phone or visit your local practice.",
      },
      {
        question: "How do I book a free NHS eye test?",
        answer:
          "Book with any optician that offers NHS sight tests and tell them you think you qualify. They will check your entitlement and may ask for proof such as your date of birth, a benefit award letter or an HC2 certificate.",
      },
      {
        question: "How long does an eye test take?",
        answer:
          "Most eye tests take around 20 to 30 minutes. Vision Express, for example, says its tests usually take 25 minutes. Allow extra time if you are also choosing glasses or having a contact lens check.",
      },
    ],
    relatedQueries: [
      "opticians-near-me",
      "eye-test-cost",
      "free-eye-test",
      "same-day-eye-test",
      "eye-test-what-to-expect",
    ],
    ctaText: "Book an eye test near you",
    disclaimer:
      "Appointment availability, opening hours and prices vary between stores and change from time to time. Check with the optician when you book.",
  },
  {
    slug: "opticians-near-me",
    keyword: "opticians near me",
    title: "Opticians Near Me: Find and Compare Local Opticians",
    seoTitle: "Opticians Near Me: Find an Eye Test Near You by Postcode or Town",
    seoDescription:
      "Find opticians and eye tests near you. Search by postcode or choose your town to compare Specsavers, Boots, Vision Express, Asda, M&S and independents, with NHS details.",
    h1: "Opticians and Eye Tests Near You",
    dateModified: "2026-11-10",
    category: "availability",
    shortDescription:
      "Search by postcode or choose your town to find opticians near you, compare the main chains and independents, and check NHS eye test details.",
    content: `Enter your postcode above to see opticians near you, or choose your town from the list below. Each town page lists the opticians in the area, from Specsavers, Boots, Vision Express, Asda and M&S Opticians to local independent practices, with details on NHS-funded eye tests and typical prices.

Almost every high-street optician offers NHS-funded eye tests for people who qualify, and in Scotland NHS eye examinations are free for all UK residents. If you cannot leave home unaccompanied, you may be able to have an eye test at home.`,
    sections: [
      {
        heading: "Choosing an optician near you",
        items: [
          "Check the price and what it includes, such as an OCT scan",
          "Check whether you qualify for a free NHS-funded eye test",
          "Look at opening hours and weekend appointments",
          "If you need an urgent appointment for a sudden eye problem, call the optician rather than booking online",
          "If you wear contact lenses, book a contact lens check as well as a sight test",
        ],
        links: [
          { label: "Eye test prices", href: "/find/eye-test-cost" },
          { label: "Free eye test guide", href: "/find/free-eye-test" },
          { label: "Book an eye test", href: "/find/book-eye-test" },
          { label: "Home eye tests", href: "/at-home-eye-tests" },
          { label: "Emergency eye test", href: "/find/emergency-eye-test-near-me" },
        ],
      },
      {
        heading: "Opticians by brand",
        links: [
          { label: "Specsavers eye test price", href: "/opticians/specsavers" },
          { label: "Boots eye test price", href: "/opticians/boots-opticians" },
          { label: "Vision Express eye test price", href: "/opticians/vision-express" },
          { label: "Asda eye test price", href: "/opticians/asda-opticians" },
          { label: "M&S Opticians", href: "/opticians/mands-opticians" },
          { label: "All opticians", href: "/opticians" },
        ],
      },
    ],
    showTownIndex: true,
    faqs: [
      {
        question: "How do I find an optician near me?",
        answer:
          "Enter your postcode at the top of this page, or choose your town from the list. Town pages list local opticians with NHS details and prices.",
      },
      {
        question: "Do all opticians offer NHS eye tests?",
        answer:
          "Most high-street opticians, including Specsavers, Boots, Vision Express, Asda and M&S Opticians, offer NHS-funded eye tests for people who qualify. Some independent practices are private only, so check when you book.",
      },
      {
        question: "Can I get an eye test today?",
        answer:
          "Many opticians show same-day or same-week appointments online. If you have a sudden eye problem such as pain, a red eye, flashes or new floaters, call an optician straight away or contact NHS 111.",
      },
    ],
    relatedQueries: [
      "book-eye-test",
      "eye-test-cost",
      "free-eye-test",
      "same-day-eye-test",
      "emergency-eye-test-near-me",
    ],
    ctaText: "Find opticians near you",
    disclaimer:
      "Opening hours, prices, services and appointment availability vary between stores and change from time to time. Check with the optician before you visit.",
  },
  {
    slug: "eye-test-what-to-expect",
    keyword: "what happens during an eye test",
    title: "What Happens During an Eye Test? Step-by-Step UK Guide",
    seoTitle: "What Happens During an Eye Test? Step by Step (UK, 2026)",
    seoDescription:
      "What happens at a UK eye test, step by step: the questions you are asked, vision and eye health checks, glaucoma tests, how long it takes and what to bring.",
    h1: "What Happens During an Eye Test?",
    dateModified: "2026-11-11",
    canonicalPath: "/articles/what-happens-during-an-eye-test",
    parentCrumbs: [{ label: "Articles", href: "/articles" }],
    category: "general",
    shortDescription:
      "A step-by-step guide to a UK eye test: what the optometrist checks, how long it takes, what to bring and what you get at the end.",
    content: `An eye test, also called an eye examination or sight test, checks whether you need glasses or contact lenses and looks at the health of your eyes. The College of Optometrists says it usually takes around 20 to 30 minutes, and it is painless.

Your optometrist will explain each part as they go. Some opticians also offer extra scans, such as retinal photographs or an OCT scan, which may cost extra. You can choose whether to have them.`,
    keyFacts: [
      { label: "Usual length", value: "Around 20 to 30 minutes" },
      { label: "Painless", value: "Nothing touches your eye in most checks" },
      { label: "At the end", value: "A prescription or a statement" },
      { label: "Glasses", value: "Buy them anywhere you like" },
    ],
    sections: [
      {
        heading: "What happens, step by step",
        body: `According to the College of Optometrists, during an eye examination the optometrist will:`,
        items: [
          "Ask about your general health, any problems with your eyes or vision, close relatives with eye problems, and your work and hobbies",
          "Check your distance vision (for TV and driving) and near vision (for reading and close work), usually by reading letters on a chart",
          "Check your eye movements and coordination, to make sure both eyes are working together",
          "Examine the outside and inside of your eyes in detail. They may take a photograph or scan to help, which may carry a charge that you can choose not to pay",
          "Carry out tests for glaucoma if you are in a group at risk of it, such as an eye pressure check (often a puff of air) or a visual field test",
        ],
        links: [
          { label: "OCT scan cost", href: "/find/oct-scan-cost" },
          { label: "Glaucoma test", href: "/find/glaucoma-test" },
        ],
      },
      {
        heading: "What to bring to your eye test",
        body: `The College of Optometrists suggests taking:`,
        items: [
          "Your current glasses and contact lenses",
          "Any previous prescriptions, if you have them",
          "Letters about previous visits to a hospital eye department",
          "A list of any medicines you take, even if they are not for your eyes",
          "Your GP's contact details and your NHS number",
          "Proof of entitlement, if you think you qualify for a free NHS eye test",
        ],
        links: [
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
        ],
      },
      {
        heading: "What happens after the eye test",
        body: `The NHS says your optometrist is legally required to give you your prescription, or a statement saying you have been referred for further tests. If you need glasses you will get a prescription, otherwise a statement that you do not need them. If you are entitled to an NHS optical voucher, it is issued straight away. You do not have to buy glasses where you had your test: the NHS says you should never feel obliged to, so you can shop around. If your optometrist finds something that needs a closer look, they may refer you to your GP or a hospital eye clinic.`,
        links: [
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
        ],
      },
      {
        heading: "Eye tests for children",
        body: `Children's eye tests follow the same steps but are adapted to the child's age. The RNIB notes that instead of reading letters you may be asked to match symbols, which helps with children who cannot read yet. Children under 16 are entitled to a free NHS sight test.`,
        links: [
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "How long does an eye test take?",
        answer:
          "The College of Optometrists says an eye examination usually takes around 20 to 30 minutes. Extra scans can add a little time.",
      },
      {
        question: "Does an eye test hurt?",
        answer:
          "No. An eye test is painless. The eye pressure check, often a short puff of air, can make you blink but does not hurt.",
      },
      {
        question: "Will I get eye drops during an eye test?",
        answer:
          "Not always. Some tests use drops to widen your pupils. If you are given them, your sight may be blurry for a few hours, so ask the optician whether you should avoid driving afterwards.",
      },
      {
        question: "Can I drive after an eye test?",
        answer:
          "Usually yes, unless you have been given drops to widen your pupils. Check with the optician when you book if you are unsure.",
      },
      {
        question: "Do I have to buy glasses where I had my eye test?",
        answer:
          "No. The NHS says you should never feel obliged to buy glasses or use an optical voucher where you had your eye test. Your prescription is yours to take anywhere.",
      },
      {
        question: "What should I bring to an eye test?",
        answer:
          "Your glasses or contact lenses, any old prescriptions, a list of your medicines, your GP details and NHS number, and proof of entitlement if you qualify for a free NHS test.",
      },
    ],
    relatedQueries: [
      "how-long-does-eye-test-take",
      "how-often-eye-test",
      "eye-test-cost",
      "book-eye-test",
    ],
    ctaText: "Find an optician near you and book an eye test",
    disclaimer:
      "This page is general information, not medical advice. The checks you have can vary by optician and by your own eyes.",
    sources: [
      { label: "College of Optometrists: The eye examination", url: "https://lookafteryoureyes.org/eye-examinations/the-eye-examination/" },
      { label: "NHS: Visiting an optician", url: "https://www.nhs.uk/nhs-services/opticians/visiting-an-optician/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
      { label: "RNIB: During your eye examination", url: "https://www.rnib.org.uk/your-eyes/eye-tests-explained/during-your-eye-examination/" },
    ],
  },
  {
    slug: "how-long-does-eye-test-take",
    keyword: "how long does an eye test take",
    title: "How Long Does an Eye Test Take? (UK Appointment Guide)",
    category: "general",
    shortDescription:
      "Find out how long an eye test takes in the UK, from a standard 20-minute sight test to specialist assessments.",
    content: `A standard eye test in the UK typically takes 20 to 30 minutes. This includes time for the optometrist to discuss your history, test your vision, check your prescription, measure eye pressure, and examine your eye health. Most people are in and out within half an hour.

If you are having additional tests, allow more time. An OCT scan adds approximately 5 to 10 minutes. Retinal photography takes 2 to 5 minutes. A visual field test adds 5 to 15 minutes per eye. If you are having a comprehensive package that includes all of these, budget around 45 minutes for the full appointment.

Specialist appointments take longer. A contact lens fitting typically takes 30 to 60 minutes, particularly if you are a new wearer and need to learn how to insert and remove lenses. A dry eye assessment can take 20 to 40 minutes. Children's eye tests may take 20 to 40 minutes depending on the child's age and cooperation. A glaucoma assessment or cataract assessment usually takes 20 to 40 minutes.

At many opticians, you may also spend time with a dispensing optician after your eye test if you need new glasses. This is a separate process where you choose frames, discuss lens options, and have measurements taken for your new glasses. Allow an additional 15 to 30 minutes if you plan to look at frames on the same visit.

If you are short on time, let the receptionist know when you book. They can advise on the minimum appointment length needed and schedule your test accordingly. For the most efficient experience, have your current glasses and any relevant documents ready when you arrive, and arrive a few minutes early to complete any paperwork.`,
    faqs: [
      {
        question: "Can an eye test be done in 15 minutes?",
        answer:
          "A thorough eye test needs at least 20 minutes. Beware of any appointment that feels rushed. However, the actual clinical testing may take around 15 minutes, with the rest being discussion and paperwork.",
      },
      {
        question: "Why do some eye tests take longer than others?",
        answer:
          "Length varies based on your age, eye health, complexity of your prescription, and any additional tests performed. First-time patients, people with complex needs, and those having OCT scans or visual field tests will have longer appointments.",
      },
      {
        question: "Do I need to allow time for choosing glasses after the test?",
        answer:
          "If you plan to look at glasses on the same visit, allow an additional 15 to 30 minutes. You are not obliged to choose glasses immediately — you can take your prescription away and return later or visit a different optician.",
      },
    ],
    relatedQueries: [
      "eye-test-what-to-expect",
      "book-eye-test",
      "eye-test-cost",
    ],
    ctaText: "Book your eye test appointment",
  },
  {
    slug: "how-often-eye-test",
    keyword: "how often should you have an eye test",
    title: "How Often Should You Have an Eye Test? UK Guidance",
    seoTitle: "How Often Should You Have an Eye Test? UK Guidance (2026)",
    seoDescription:
      "The NHS recommends an eye test every 2 years, or more often if your optometrist advises. Who gets free NHS eye tests, diabetic eye screening and when to go sooner.",
    h1: "How Often Should You Have an Eye Test?",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/guides/how-often-should-you-have-an-eye-test",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "general",
    shortDescription:
      "The NHS recommends an eye test every 2 years, or more often if your optometrist advises. Here is who should go more often, who gets free tests and when not to wait.",
    content: `The NHS recommends that you have your eyes tested every 2 years, or more often if your optometrist advises it. The College of Optometrists gives the same guidance: most people should have an eye examination at least every two years, depending on their clinical circumstances.

Your optometrist will tell you when to come back. They may suggest a shorter gap if you have an eye condition that needs monitoring, a family history of eye disease, diabetes, or a prescription that is changing. Follow their advice, because it is based on your own eyes rather than a general rule.

Your eyes rarely hurt when something is wrong with them, which is why the NHS says regular eye tests are important. An eye test checks the health of your eyes as well as whether you need glasses, and can pick up conditions such as glaucoma before you notice any change in your sight.`,
    keyFacts: [
      { label: "Most people", value: "Every 2 years" },
      { label: "More often", value: "If your optometrist advises" },
      { label: "Diabetes (12+)", value: "Screening every 1 or 2 years" },
      { label: "Sight changes", value: "Don't wait, book now" },
    ],
    sections: [
      {
        heading: "How often to have an eye test",
        table: {
          caption: "General guidance from the NHS and the College of Optometrists, checked November 2026",
          headers: ["Who", "How often", "Notes"],
          rows: [
            ["Most adults and children", "Every 2 years", "Or more often if your optometrist advises"],
            ["People with an eye condition being monitored", "As your optometrist advises", "Often more frequent than every 2 years"],
            ["People with diabetes aged 12 or over", "Diabetic eye screening every 1 or 2 years, plus regular eye tests", "Screening is not the same as an eye test"],
            ["Anyone with new eye problems or changes in sight", "Straight away", "Do not wait for your next scheduled test"],
          ],
        },
      },
      {
        heading: "When to book an eye test sooner",
        body: `The College of Optometrists advises contacting your optometrist if you notice any changes in your sight or are having problems with your eyes, rather than waiting for your next scheduled examination. That includes blurred vision, trouble reading or seeing at a distance, or new symptoms such as floaters.`,
        items: [
          "Your vision has changed or become blurry",
          "You are struggling to read, drive or use a screen comfortably",
          "You have noticed new floaters or flashes",
          "Your optometrist asked you to come back earlier",
        ],
        links: [
          { label: "Blurry vision causes", href: "/find/blurry-vision-causes" },
          { label: "Floaters in vision", href: "/eye-health/conditions/floaters-and-flashes" },
          { label: "Sudden vision changes", href: "/find/sudden-vision-changes" },
        ],
      },
      {
        heading: "Diabetes: eye tests and diabetic eye screening",
        body: `If you have diabetes and are aged 12 or over, the NHS invites you for diabetic eye screening every 1 or 2 years to check for diabetic retinopathy. You are usually invited every year, or every 2 years if your last 2 screenings found no changes. The NHS is clear that screening is not the same as a regular eye test with an optician, so keep having eye tests as well. People diagnosed with diabetes are entitled to a free NHS sight test.`,
        links: [
          { label: "Free eye test with diabetes", href: "/find/free-eye-test-diabetes" },
        ],
      },
      {
        heading: "Who gets a free NHS eye test",
        body: `In England you are entitled to a free NHS sight test if, for example, you are under 16, are 16 to 18 and in full-time education, are 60 or over, have diabetes or glaucoma, or are 40 or over with a parent, brother, sister or child who has glaucoma. Certain benefits also qualify. The NHS says the test is free if you are eligible and it is clinically necessary. Eye examinations are free for everyone in Scotland, and Wales and Northern Ireland have their own rules.`,
        links: [
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
          { label: "Free eye test over 60", href: "/find/free-eye-test-over-60" },
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
      {
        heading: "What an eye test costs if you pay",
        body: `The College of Optometrists says an eye examination in England, Wales and Northern Ireland usually costs between £25 and £40, but prices vary between practices. Check with the optician before you book.`,
        links: [
          { label: "Eye test prices at the main opticians", href: "/find/eye-test-cost" },
          { label: "Find an optician near you", href: "/locations" },
        ],
      },
    ],
    faqs: [
      {
        question: "How often should you have an eye test in the UK?",
        answer:
          "The NHS recommends an eye test every 2 years, or more often if your optometrist advises. If you notice any change in your sight, book sooner.",
      },
      {
        question: "Can I have an eye test before 2 years are up?",
        answer:
          "Yes. You can book an eye test at any time. If you are eligible for a free NHS test, it is free when it is clinically necessary, so ask the optician whether an earlier test qualifies.",
      },
      {
        question: "How often should over-60s have an eye test?",
        answer:
          "The general NHS guidance is every 2 years, or more often if your optometrist advises. People aged 60 or over are entitled to a free NHS sight test.",
      },
      {
        question: "How often should children have an eye test?",
        answer:
          "Follow your optometrist's advice, which is often more frequent for children whose eyes are still changing. Children under 16 are entitled to a free NHS sight test.",
      },
      {
        question: "Is diabetic eye screening the same as an eye test?",
        answer:
          "No. The NHS says diabetic eye screening is not the same as a regular eye test with an optician, so people with diabetes should have both.",
      },
      {
        question: "What happens if I have not had an eye test for years?",
        answer:
          "Book one. Many eye conditions cause no symptoms at first, so a test can pick up problems you have not noticed. Your optometrist will then advise when to come back.",
      },
    ],
    relatedQueries: [
      "eye-test-what-to-expect",
      "free-eye-test",
      "eye-test-cost",
      "do-i-need-an-eye-test",
    ],
    ctaText: "Find an optician near you and book your next eye test",
    disclaimer:
      "This page is general information, not medical advice. Always follow your optometrist's advice on when to have your next eye test.",
    sources: [
      { label: "NHS: Visiting an optician", url: "https://www.nhs.uk/nhs-services/opticians/visiting-an-optician/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
      { label: "NHS: Diabetic eye screening", url: "https://www.nhs.uk/tests-and-treatments/diabetic-eye-screening/" },
      { label: "College of Optometrists: The eye examination", url: "https://lookafteryoureyes.org/eye-examinations/the-eye-examination/" },
    ],
  },
  {
    slug: "do-i-need-an-eye-test",
    keyword: "do I need an eye test",
    title: "Do I Need an Eye Test? Signs You Should Book One Now",
    category: "general",
    shortDescription:
      "Not sure if you need an eye test? Here are the signs that you should book an appointment, and why regular testing matters even if your vision seems fine.",
    content: `The short answer is: almost certainly yes. If you have not had an eye test in the last two years, you are overdue. But beyond the standard recommendation, there are specific signs that mean you should book an appointment as soon as possible.

You should book an eye test promptly if you are experiencing any of the following: difficulty reading or seeing things close up, blurry vision at any distance, headaches (particularly after reading or screen use), eye strain or tired eyes, difficulty seeing at night or in low light, squinting to see things clearly, double vision, trouble judging distances, or if you find yourself holding books or your phone further away than usual.

Even if your vision seems perfectly fine, regular eye tests are important because many eye conditions develop without noticeable symptoms in their early stages. Glaucoma, for example, can destroy peripheral vision gradually over years without you being aware of it. High eye pressure, early cataracts, and changes to the retina can all be present long before you notice any difference in your sight.

Eye tests also check for signs of general health conditions. Your optometrist may detect early indicators of diabetes (changes to retinal blood vessels), high blood pressure (narrowed or damaged blood vessels in the eye), high cholesterol (deposits in the eye), and even some brain tumours (through changes to the optic nerve or visual field). These findings can prompt early investigation and treatment of conditions you might not otherwise have known about.

Certain life events should also trigger an eye test: starting a new job that involves significant screen use, learning to drive, pregnancy (which can temporarily change your prescription), starting a new medication that lists eye-related side effects, or any family member being diagnosed with an eye condition.

Do not put it off. Eye tests are quick, painless, widely available, and may be free. Regular testing is one of the simplest and most effective things you can do to protect your long-term health.`,
    faqs: [
      {
        question: "I can see fine — do I still need an eye test?",
        answer:
          "Yes. Many eye conditions develop silently without affecting your vision in the early stages. An eye test checks not only your visual acuity but also the health of your eyes, including screening for glaucoma, cataracts, and retinal problems.",
      },
      {
        question: "Can an eye test detect health problems?",
        answer:
          "Yes. Eye tests can reveal early signs of diabetes, high blood pressure, high cholesterol, and some neurological conditions. The blood vessels and nerves in the eye provide a unique window into your overall health.",
      },
      {
        question: "I'm young and healthy — do I need regular eye tests?",
        answer:
          "Yes. Eye conditions can affect people of all ages, and establishing a baseline record of your eye health when young makes it easier to detect changes over time. Testing every two years is the recommended minimum for all adults.",
      },
    ],
    relatedQueries: [
      "how-often-eye-test",
      "eye-test-what-to-expect",
      "book-eye-test",
      "blurry-vision-causes",
      "headaches-and-vision",
    ],
    ctaText: "Book an eye test now",
  },
  {
    slug: "eye-test-failed-driving",
    keyword: "failed driving test eyesight check",
    title: "Failed the Eyesight Check on Your Driving Test? What Happens Next",
    seoTitle: "Failed the Driving Test Eyesight Check? What Happens Next (UK)",
    seoDescription:
      "If you can't read the number plate at the start of your driving test, you fail, the DVLA is told and your licence is revoked. How to reapply and the DVSA eyesight test.",
    h1: "Failed the Eyesight Check on Your Driving Test?",
    dateModified: "2026-11-11",
    category: "general",
    shortDescription:
      "What happens if you can't read the number plate at the start of your practical driving test, and the steps to get back on the road.",
    content: `At the start of your practical driving test you have to correctly read a number plate on a parked vehicle. GOV.UK says that if you cannot, you fail the driving test and it does not continue. The DVLA is told and your licence is revoked.

When you reapply for your driving licence, the DVLA will ask you to have an eyesight test with the DVSA at a driving test centre. If you pass that, you will still have to pass the standard eyesight check at the start of your next practical driving test.`,
    keyFacts: [
      { label: "Test", value: "Stops, counts as a fail" },
      { label: "Licence", value: "Revoked, DVLA is told" },
      { label: "Reapplying", value: "DVSA eyesight test at a test centre" },
      { label: "First step", value: "Book an optician eye test" },
    ],
    sections: [
      {
        heading: "What to do next",
        items: [
          "Book an eye test at an optician and tell them you failed the driving test eyesight check",
          "If you need glasses or contact lenses to meet the standard, get them and wear them every time you drive",
          "Reapply for your driving licence. The DVLA will ask you to have an eyesight test with the DVSA at a driving test centre",
          "Once you pass that, book your practical test again. You will read a number plate again at the start",
        ],
        links: [
          { label: "Find an optician near you", href: "/locations" },
          { label: "Eye test prices", href: "/find/eye-test-cost" },
        ],
      },
      {
        heading: "The eyesight standard you need to meet",
        body: `GOV.UK says you must be able to read a number plate from 20 metres away, have visual acuity of at least 6/12 using both eyes together, and have an adequate field of vision. You can wear glasses or contact lenses to meet the standard.`,
        links: [
          { label: "DVLA eyesight rules for driving", href: "/eye-tests/dvla-driving-vision-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "What happens if I fail the number plate test?",
        answer:
          "You fail the driving test and it does not continue. GOV.UK says the DVLA is told and your licence is revoked.",
      },
      {
        question: "How do I get my licence back?",
        answer:
          "Reapply for your driving licence. The DVLA will ask you to have an eyesight test with the DVSA at a driving test centre. If you pass, you can book your practical test again.",
      },
      {
        question: "Should I see an optician first?",
        answer:
          "Yes. An eye test will show whether glasses or contact lenses would help you meet the standard. If you need them for driving, you must wear them every time you drive.",
      },
      {
        question: "Can I keep driving after failing the eyesight check?",
        answer:
          "No. Your licence is revoked, so you cannot drive until you have reapplied and been given a licence again.",
      },
    ],
    relatedQueries: [
      "eye-test-for-driving",
      "book-eye-test",
      "eye-test-cost",
    ],
    ctaText: "Find an optician near you and get your eyes checked",
    disclaimer:
      "This page is general information based on GOV.UK guidance, not legal advice. Check GOV.UK or the DVLA for your own circumstances.",
    sources: [
      { label: "GOV.UK: Driving eyesight rules", url: "https://www.gov.uk/driving-eyesight-rules" },
    ],
  },

  // ─── Specialist ────────────────────────────────────────────────────────
  {
    slug: "oct-scan-cost",
    keyword: "OCT scan cost",
    title: "OCT Scan Cost UK: How Much Is an OCT Eye Scan? (2026 Prices)",
    seoTitle: "OCT Scan Cost UK 2026: Specsavers, Boots, Vision Express and M&S",
    seoDescription:
      "How much an OCT eye scan costs at Specsavers, Boots, Vision Express and M&S Opticians, checked November 2026, what it shows and whether you need one.",
    dateModified: "2026-11-11",
    category: "specialist",
    shortDescription:
      "What an OCT eye scan costs at the main UK opticians, what it shows and whether to add one to your eye test.",
    content: `An OCT (optical coherence tomography) scan takes a detailed 3D image of the layers at the back of your eye. At UK high-street opticians it is either included in the eye test price or added for a fee, depending on the optician. Prices below come from each optician's own website and were checked in November 2026.

The scan is quick, painless and does not touch your eye. You rest your chin on a support and look at a target for a few seconds. Opticians use OCT alongside the standard eye test to look more closely at the retina and optic nerve, which can help with spotting conditions such as glaucoma, macular degeneration and diabetic eye disease.`,
    sections: [
      {
        heading: "OCT scan prices at the main opticians",
        table: {
          caption: "Published prices, checked November 2026",
          headers: ["Optician", "OCT scan", "Eye test price"],
          rows: [
            ["Specsavers", "Up to £10 extra in most stores", "£20 to £25, depending on the store"],
            ["Boots Opticians", "From £25 extra (Advanced Eye Test); Ultimate with optomap from £50 extra", "From £29.95"],
            ["Vision Express", "Included in the Advanced Eye Test", "£30 (NHS upgrade from £6)"],
            ["M&S Opticians", "Included at no extra cost", "£40"],
          ],
        },
        links: [
          { label: "Specsavers eye test price", href: "/opticians/specsavers" },
          { label: "Boots eye test price", href: "/opticians/boots-opticians" },
          { label: "Vision Express eye test price", href: "/opticians/vision-express" },
          { label: "M&S Opticians", href: "/opticians/mands-opticians" },
          { label: "All eye test prices", href: "/find/eye-test-cost" },
        ],
      },
      {
        heading: "Is OCT part of an NHS eye test?",
        body: `OCT is not part of a standard NHS-funded sight test at the high-street chains, so it is usually offered as a paid extra. Some opticians let NHS patients upgrade: Vision Express, for example, offers an upgrade to its Advanced Eye Test with OCT from £6. Hospital eye services use OCT to monitor people with certain eye conditions.`,
      },
      {
        heading: "Do you need an OCT scan?",
        body: `OCT is optional for most people. Your optometrist can advise whether it is useful for you, for example if you have a family history of glaucoma, have diabetes, or have changes that need a closer look. If you have one, keeping the images lets your optician compare them at future tests.`,
      },
    ],
    faqs: [
      {
        question: "How much is an OCT scan at Specsavers?",
        answer:
          "Specsavers says an OCT scan costs up to £10 extra in most stores, on top of its £20 to £25 eye test.",
      },
      {
        question: "How much is an OCT scan at Boots?",
        answer:
          "Boots charges from £25 extra for its Advanced Eye Test, which adds an OCT scan to the Essential Eye Test (from £29.95). Its Ultimate Eye Test, with optomap and OCT, costs from £50 extra in selected stores.",
      },
      {
        question: "Which opticians include OCT in the eye test price?",
        answer:
          "Vision Express includes an OCT scan in its £30 Advanced Eye Test, and M&S Opticians includes OCT at no extra cost in its £40 eye test.",
      },
      {
        question: "Is an OCT scan available on the NHS?",
        answer:
          "OCT is not part of a standard NHS-funded sight test at high-street opticians, but some offer an upgrade, such as Vision Express from £6. Hospital eye services use OCT for people being monitored for specific conditions.",
      },
      {
        question: "Is an OCT scan worth it?",
        answer:
          "It depends on your eye health and risk factors. Your optometrist can advise whether an OCT scan is useful for you.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
      "glaucoma-test",
      "private-eye-test-cost",
    ],
    ctaText: "Find opticians offering OCT scans near you",
    disclaimer:
      "Prices, offers and services change from time to time and can vary by store. Check with the optician before you book.",
    keyFacts: [
      { label: "Specsavers", value: "Up to £10 extra" },
      { label: "Boots", value: "From £25 extra" },
      { label: "Vision Express", value: "Included (£30 test)" },
      { label: "M&S Opticians", value: "Included (£40 test)" },
    ],
    sources: [
      { label: "Specsavers: How much is an eye test?", url: "https://www.specsavers.co.uk/help-and-faqs/how-much-is-an-eye-test" },
      { label: "Boots Opticians: Your eye test explained", url: "https://www.bootsopticians.com/eye-health/advice/your-eye-test-explained/" },
      { label: "Vision Express: Book an eye test", url: "https://www.visionexpress.com/eye-test" },
      { label: "M&S Opticians: Eye test FAQs", url: "https://mandsopticians.com/eye-care/help/" },
    ],
  },
  {
    slug: "eye-test-for-driving",
    keyword: "eye test for driving",
    title: "Eye Test for Driving: DVLA Eyesight Rules and Where to Get Tested",
    seoTitle: "Driving Eye Test UK 2026: DVLA Eyesight Rules and Standards",
    seoDescription:
      "The DVLA eyesight standard for driving: read a number plate at 20 metres, 6/12 vision and an adequate field of vision. Lorry and bus rules, and when to tell the DVLA.",
    h1: "Eye Test for Driving: The DVLA Eyesight Rules",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-tests/dvla-driving-vision-test",
    parentCrumbs: [{ label: "Eye Tests", href: "/eye-tests" }],
    category: "specialist",
    shortDescription:
      "The legal eyesight standard for driving in the UK, the stricter rules for lorry and bus drivers, when to tell the DVLA and how an optician can check your vision.",
    content: `To drive in the UK you must meet the standards of vision for driving set out by GOV.UK. You must be able to read a number plate from 20 metres away, have visual acuity of at least 6/12 using both eyes together, and have an adequate field of vision. You can wear glasses or contact lenses to meet the standard, but if you need them you must wear them every time you drive.

GOV.UK says you could be prosecuted if you drive without meeting the standards of vision for driving. A regular eye test at an optician checks your vision and can tell you whether you meet the standard, including your field of vision.`,
    keyFacts: [
      { label: "Number plate", value: "Read it from 20 metres" },
      { label: "Visual acuity", value: "At least 6/12 (decimal 0.5)" },
      { label: "Field of vision", value: "Must be adequate" },
      { label: "Lorry and bus", value: "6/7.5 best eye, 6/60 other" },
    ],
    sections: [
      {
        heading: "The DVLA eyesight standard for car and motorcycle drivers",
        table: {
          caption: "Standards of vision for driving, from GOV.UK, checked November 2026",
          headers: ["Requirement", "Standard"],
          rows: [
            ["Number plate", "Read a number plate from 20 metres away (about the length of 5 parked cars), with glasses or contact lenses if you use them"],
            ["Visual acuity", "At least decimal 0.5 (6/12) on the Snellen scale, using both eyes together, or the one eye if you have sight in one eye only"],
            ["Field of vision", "Must be adequate. Your optician can test this and tell you"],
          ],
        },
      },
      {
        heading: "Lorry and bus drivers",
        body: `The standard is higher for lorry and bus drivers. GOV.UK says you need visual acuity of at least 0.8 (6/7.5) in your best eye and at least 0.1 (6/60) in the other eye. You can reach this with glasses of corrective power no more than (+) 8 dioptres, or with contact lenses. You also need an uninterrupted horizontal field of vision of at least 160 degrees, with at least 70 degrees left and right and 30 degrees up and down, and no defects within the central 30 degrees. Lorry and bus drivers must tell the DVLA about any eyesight problem that affects either eye.`,
      },
      {
        heading: "When to tell the DVLA about your eyesight",
        body: `Car and motorcycle drivers must tell the DVLA about any eyesight problem that affects both eyes, or the remaining eye if you only have one eye. GOV.UK says this does not include being short or long sighted or colour blind, and you do not need to tell the DVLA if you have had surgery to correct short sightedness and can meet the standard. If you report a condition, the DVLA may refer you for an eyesight test with its contracted optician, which you do not pay for. You can send results from another optician if they include an Esterman visual field test, but the DVLA does not guarantee to accept them and you pay for that test yourself.`,
        links: [
          { label: "Colour blind test", href: "/find/colour-blind-test" },
        ],
      },
      {
        heading: "The eyesight check at the start of your driving test",
        body: `At the start of the practical driving test you have to read a number plate on a parked vehicle. If you cannot, you fail the test, it does not continue, and your licence is revoked.`,
        links: [
          { label: "Failed the driving test eyesight check?", href: "/find/eye-test-failed-driving" },
        ],
      },
      {
        heading: "Getting your eyes checked for driving",
        body: `A routine eye test at an optician checks your vision with and without your glasses and can include a visual field test. If you are not sure you meet the driving standard, tell the optician when you book. The NHS recommends an eye test every 2 years, or more often if your optometrist advises.`,
        links: [
          { label: "How often to have an eye test", href: "/eye-health/guides/how-often-should-you-have-an-eye-test" },
          { label: "Eye test prices", href: "/find/eye-test-cost" },
          { label: "Find an optician near you", href: "/locations" },
        ],
      },
    ],
    faqs: [
      {
        question: "What is the eyesight standard for driving in the UK?",
        answer:
          "You must be able to read a number plate from 20 metres, have visual acuity of at least 6/12 using both eyes together, and have an adequate field of vision. Glasses or contact lenses can be worn to meet the standard.",
      },
      {
        question: "Do I need to tell the DVLA if I wear glasses for driving?",
        answer:
          "No, not for being short or long sighted. GOV.UK says you must tell the DVLA about an eyesight problem affecting both eyes (or your remaining eye), but this does not include being short or long sighted or colour blind. You must wear your glasses every time you drive if you need them to meet the standard.",
      },
      {
        question: "Can I drive if I am colour blind?",
        answer:
          "Yes. GOV.UK says you do not need to tell the DVLA if you are colour blind.",
      },
      {
        question: "What happens if I can't read the number plate in my driving test?",
        answer:
          "You fail the test, it does not continue, the DVLA is told and your licence is revoked. When you reapply, you will need to pass an eyesight test with the DVSA at a driving test centre.",
      },
      {
        question: "What eyesight do lorry and bus drivers need?",
        answer:
          "At least 6/7.5 in the best eye and 6/60 in the other, with a horizontal field of vision of at least 160 degrees, according to GOV.UK.",
      },
      {
        question: "Is a driving eye test free?",
        answer:
          "If the DVLA refers you to its contracted optician, you do not pay. A routine eye test at an optician is free if you qualify for a free NHS eye test, otherwise the optician's normal price applies.",
      },
    ],
    relatedQueries: [
      "eye-test-failed-driving",
      "how-often-eye-test",
      "eye-test-cost",
      "book-eye-test",
    ],
    ctaText: "Find an optician near you and check your vision for driving",
    disclaimer:
      "This page is general information based on GOV.UK guidance, not legal or medical advice. Check GOV.UK or the DVLA for your own circumstances.",
    sources: [
      { label: "GOV.UK: Driving eyesight rules", url: "https://www.gov.uk/driving-eyesight-rules" },
      { label: "NHS: Visiting an optician", url: "https://www.nhs.uk/nhs-services/opticians/visiting-an-optician/" },
    ],
  },
  {
    slug: "contact-lens-eye-test",
    keyword: "contact lens eye test",
    title: "Contact Lens Eye Test: Fittings, Check-Ups and Your Specification",
    seoTitle: "Contact Lens Eye Test UK: Fittings, Check-Ups and Specifications",
    seoDescription:
      "How contact lens fittings and check-ups work in the UK, why you need an in-date contact lens specification, and how it differs from a glasses eye test.",
    h1: "Contact Lens Eye Tests and Fittings",
    dateModified: "2026-11-11",
    category: "specialist",
    shortDescription:
      "How contact lens fittings and check-ups work, and why you need an in-date contact lens specification to buy lenses.",
    content: `A contact lens fitting is separate from a sight test. Your sight test checks your vision and eye health and gives you a glasses prescription. A contact lens fitting checks how lenses sit on your eyes and gives you a contact lens specification.

The General Optical Council says that to be supplied with prescription contact lenses, you must have an in-date contact lens specification issued after a contact lens fitting. The specification includes an expiry date, set by the practitioner who fits your lenses, and you need a check-up before it runs out to keep buying lenses.`,
    keyFacts: [
      { label: "Fitting", value: "Separate from a sight test" },
      { label: "To buy lenses", value: "In-date specification needed" },
      { label: "Specification", value: "Has an expiry date" },
      { label: "Who fits lenses", value: "Optometrist, contact lens optician or doctor" },
    ],
    sections: [
      {
        heading: "Sight test vs contact lens fitting",
        table: {
          headers: ["", "Sight test", "Contact lens fitting or check-up"],
          rows: [
            ["What it checks", "Your vision and eye health", "How lenses fit and how your eyes cope with them"],
            ["What you get", "A glasses prescription, or a statement", "A contact lens specification with an expiry date"],
            ["Free on the NHS", "If you qualify", "Not usually"],
          ],
        },
      },
      {
        heading: "Who can fit contact lenses",
        body: `The General Optical Council says contact lenses can only be fitted by an optometrist, a contact lens optician or a registered medical practitioner. Ask the optician what is included in their fitting and check-up fees, and whether they offer a monthly lens plan.`,
        links: [
          { label: "Eye test prices", href: "/find/eye-test-cost" },
          { label: "Find an optician near you", href: "/locations" },
        ],
      },
      {
        heading: "Problems with your contact lenses",
        body: `If you have a problem with your contact lenses, contact the optician that supplies them first. If you have a painful red eye, take your lenses out. The NHS advises not wearing contact lenses after an eye injury until your eye is better.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I buy contact lenses without a fitting?",
        answer:
          "Not prescription lenses. The General Optical Council says you need an in-date contact lens specification issued after a contact lens fitting.",
      },
      {
        question: "How often do I need a contact lens check-up?",
        answer:
          "Before your specification expires. The practitioner who fits your lenses sets the expiry date, and you need a check-up to get a new specification.",
      },
      {
        question: "Is a contact lens check-up the same as an eye test?",
        answer:
          "No. A sight test checks your vision and eye health. A contact lens check-up looks at how your lenses fit and how your eyes are coping with them. You may need both.",
      },
      {
        question: "Are contact lens fittings free on the NHS?",
        answer:
          "A sight test is free if you qualify for the NHS. Contact lens fittings and check-ups are usually charged by the optician, so ask what is included.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
      "free-eye-test",
      "nhs-optical-voucher",
    ],
    ctaText: "Find contact lens appointments near you",
    disclaimer:
      "This page is general information, not medical advice. Fees and plans vary by optician, so check with the optician before you book.",
    sources: [
      { label: "General Optical Council: Verification of contact lens specifications", url: "https://optical.org/resource/goc-publishes-new-statement-on-verification-of-contact-lens-specifications.html" },
      { label: "General Optical Council: Contact lens legislation FAQ", url: "https://optical.org/en/publications/contact-lens-legislation-frequently-asked-questions-faq/" },
      { label: "NHS: Eye injuries", url: "https://www.nhs.uk/conditions/eye-injuries/" },
    ],
  },
  {
    slug: "childrens-eye-test-guide",
    keyword: "children's eye test",
    title: "Children's Eye Test UK: Free NHS Tests, When to Book and What Happens",
    seoTitle: "Children's Eye Test UK 2026: Free on the NHS, Ages and What to Expect",
    seoDescription:
      "Children's eye tests are free on the NHS for under 16s. When your child's eyes are checked, school vision screening, what happens at the optician and signs to look for.",
    h1: "Children's Eye Tests: A Parent's Guide",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-tests/childrens-eye-test",
    parentCrumbs: [{ label: "Eye Tests", href: "/eye-tests" }],
    category: "specialist",
    shortDescription:
      "Free NHS eye tests for children, when your child's eyes are checked, what happens at the optician and the signs that mean you should book.",
    content: `Free NHS sight tests are available at opticians for children under 16 and for young people under 19 in full-time education. If you qualify, the NHS pays for the test, so there is nothing to pay at the optician.

Children may not realise they have a vision problem, so the NHS says routine checks matter: without them a problem may not be spotted, which can affect a child's development and education. The sooner a problem is found, the sooner your child can get treatment.

Children can have an eye test at any age. The NHS says they do not need to be able to read, or even speak. A test is particularly important if there is a family history of childhood eye problems such as a squint or lazy eye.`,
    keyFacts: [
      { label: "Cost", value: "Free on the NHS for under 16s" },
      { label: "16 to 18", value: "Free in full-time education" },
      { label: "Age to start", value: "Any age, no reading needed" },
      { label: "Glasses", value: "NHS optical voucher for under 16s" },
    ],
    sections: [
      {
        heading: "When your child's eyes are checked",
        body: `The NHS checks children's eyes at several points as they grow:`,
        table: {
          caption: "NHS eye checks for babies and children, checked November 2026",
          headers: ["Age", "Check"],
          rows: [
            ["Within 72 hours of birth", "Eyes checked for obvious problems in the newborn physical examination"],
            ["6 to 8 weeks", "Follow-up physical examination"],
            ["Around 1 year, or 2 to 2½ years", "You may be asked about your child's eyesight at health and development reviews"],
            ["Around 4 or 5 years", "Vision screening, usually at school, though not in every area"],
          ],
        },
      },
      {
        heading: "School vision screening is not a full eye test",
        body: `Vision screening around age 4 or 5 checks for reduced vision in one or both eyes. The NHS says it does not happen in all areas, and if your child's vision is not checked at school you should take them to an optician for an eye examination. You can book a free NHS eye test at an optician at any time if you have concerns.`,
        links: [
          { label: "Find an optician near you", href: "/locations" },
        ],
      },
      {
        heading: "What happens at a children's eye test",
        body: `The tests depend on your child's age. The NHS describes:`,
        items: [
          "Following an object with their eyes, for babies and children who cannot speak yet",
          "Pictures or symbols instead of letters, for children who cannot recognise letters",
          "A letter chart (Snellen or LogMAR) once your child can read or match letters",
          "Range of movement tests, to check how well the eye muscles work",
          "A refraction test by an optometrist to see if your child needs glasses. Your child may be given eye drops first to widen their pupils",
          "A colour vision test, usually in older children if a problem is suspected",
        ],
        links: [
          { label: "What happens during an eye test", href: "/articles/what-happens-during-an-eye-test" },
          { label: "Colour blind test", href: "/find/colour-blind-test" },
        ],
      },
      {
        heading: "Signs your child may need an eye test",
        body: `The NHS lists signs of a possible eye problem in older children:`,
        items: [
          "Eyes not pointing in the same direction",
          "Complaining of headaches or eye strain",
          "Problems reading, such as holding books close or losing their place",
          "Problems with hand-eye coordination, such as ball games",
          "Being unusually clumsy",
          "Rubbing their eyes regularly",
          "Sitting too close to the TV",
        ],
      },
      {
        heading: "Eye problems a test can find",
        body: `Eye tests can pick up short-sightedness, long-sightedness and astigmatism, as well as lazy eye (amblyopia), squint (strabismus), childhood cataracts and colour vision deficiency, according to the NHS.`,
        links: [
          { label: "Squint (strabismus)", href: "/eye-health/conditions/strabismus" },
          { label: "Colour blindness", href: "/eye-health/conditions/colour-blindness" },
        ],
      },
      {
        heading: "Free glasses help: NHS optical vouchers",
        body: `Children under 16, and young people aged 16 to 18 in full-time education, are also entitled to an NHS optical voucher towards the cost of glasses or contact lenses. Many opticians have ranges of children's glasses that the voucher covers in full. Ask the optician what is included.`,
        links: [
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
          { label: "Free eye tests for children", href: "/find/free-eye-test-children" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are children's eye tests free?",
        answer:
          "Yes. Free NHS sight tests are available at opticians for children under 16 and for young people under 19 in full-time education.",
      },
      {
        question: "What age can a child have an eye test?",
        answer:
          "Any age. The NHS says children do not need to be able to read, or even speak, to have an eye test.",
      },
      {
        question: "Does my child need an eye test if they had school vision screening?",
        answer:
          "Screening checks for reduced vision but is not a full eye examination, and it does not happen in every area. If you have any concerns, book an eye test at an optician.",
      },
      {
        question: "How often should my child have an eye test?",
        answer:
          "Follow your optometrist's advice. The NHS recommends eye tests every 2 years for most people, and children's eyes may need checking more often while they are still developing.",
      },
      {
        question: "Will my child have eye drops?",
        answer:
          "Sometimes. The NHS says a child may be given drops to widen their pupils before a refraction test, so the back of the eye can be seen more clearly.",
      },
      {
        question: "Can I get free glasses for my child?",
        answer:
          "Children under 16 are entitled to an NHS optical voucher towards glasses or contact lenses. Many opticians offer children's frames fully covered by the voucher.",
      },
    ],
    relatedQueries: [
      "free-eye-test-children",
      "nhs-optical-voucher",
      "colour-blind-test",
      "eye-test-what-to-expect",
    ],
    ctaText: "Find an optician near you for a free children's eye test",
    disclaimer:
      "This page is general information, not medical advice. If you are worried about your child's eyes, see a GP or an optician.",
    sources: [
      { label: "NHS: Eye tests for children", url: "https://www.nhs.uk/tests-and-treatments/eye-tests-in-children/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
      { label: "NHS: Visiting an optician", url: "https://www.nhs.uk/nhs-services/opticians/visiting-an-optician/" },
    ],
  },
  {
    slug: "glaucoma-test",
    keyword: "glaucoma test",
    title: "Glaucoma Test — What It Involves, Cost & Where to Get Tested",
    category: "specialist",
    shortDescription:
      "How to get tested for glaucoma in the UK, what the tests involve, who should be tested, and whether it is covered by the NHS.",
    content: `Glaucoma is the leading cause of irreversible blindness worldwide, affecting around 700,000 people in the UK. Because it typically develops slowly and without symptoms in its early stages, regular testing is essential for early detection and treatment.

A glaucoma assessment involves three key tests: tonometry (measuring the pressure inside your eyes), visual field testing (checking for blind spots in your peripheral vision), and examination of the optic nerve head (either directly or using an OCT scan). These tests are often included as part of a routine eye test, particularly for patients with risk factors.

You are at higher risk of glaucoma if you are aged 40 or over with a first-degree relative (parent, sibling, or child) who has glaucoma, of African-Caribbean descent, over 60, very short-sighted, have diabetes, or use long-term steroid medications. If you fall into any of these groups, regular screening is particularly important.

If you are aged 40 or over and have a close relative with glaucoma, you are entitled to a free NHS eye test every year. This is one of the most important NHS entitlements to take advantage of, as early detection can preserve your sight. The NHS test includes all the necessary glaucoma screening checks.

A private glaucoma assessment, if needed, typically costs £30 to £60 and includes tonometry, visual field testing, and often an OCT scan of the optic nerve. Many opticians offer this as part of an enhanced or premium eye test package. If your optometrist identifies signs of possible glaucoma, you will be referred to a hospital eye clinic for further investigation and, if confirmed, treatment — usually daily eye drops that lower eye pressure.`,
    faqs: [
      {
        question: "How do I know if I have glaucoma?",
        answer:
          "You may not know — glaucoma often has no symptoms until significant vision loss has occurred. This is why regular eye tests with pressure checks and optic nerve examination are essential. Your optometrist can detect glaucoma at a very early stage during a routine eye test.",
      },
      {
        question: "Is the glaucoma puff test accurate?",
        answer:
          "The air-puff test (non-contact tonometry) gives a useful screening measurement of eye pressure, but it is not the most accurate method. If your pressure reading is elevated, your optometrist may use contact tonometry (Goldmann) for a more precise measurement.",
      },
      {
        question: "Can glaucoma be cured?",
        answer:
          "Glaucoma cannot be reversed, but it can be effectively managed to prevent further vision loss. Treatment usually involves daily eye drops that lower eye pressure. In some cases, laser treatment or surgery may be recommended. Early detection is key.",
      },
    ],
    relatedQueries: [
      "oct-scan-cost",
      "eye-test-cost",
    ],
    ctaText: "Find glaucoma testing near you",
  },
  {
    slug: "colour-blind-test",
    keyword: "colour blind test",
    title: "Colour Blind Test UK: How to Get Tested for Colour Vision Deficiency",
    seoTitle: "Colour Blind Test UK 2026: How to Get Tested at an Optician",
    seoDescription:
      "How to get a colour blind test in the UK, what the Ishihara and colour arrangement tests involve, signs in children, and what colour blindness means for driving and work.",
    h1: "Colour Blind Test: How to Get Your Colour Vision Checked in the UK",
    dateModified: "2026-11-11",
    category: "specialist",
    shortDescription:
      "How to get tested for colour blindness at a UK optician, what the tests involve, signs to look for in children, and what it means for driving and careers.",
    content: `Colour blindness, or colour vision deficiency, means you see colours differently from most people and may find it hard to tell certain colours apart. Colour Blind Awareness estimates that it affects about 1 in 12 men and 1 in 200 women, around 3 million people in the UK.

The NHS says colour vision testing is not part of the routine NHS eye test, but you can ask your optician for it. So if you want your colour vision checked, mention it when you book. Most opticians can carry out a quick colour vision check during an appointment.

Online colour blind tests can give you an idea of whether you might have a colour vision deficiency, but they are not a diagnosis. Screens show colours differently, so if an online test or everyday life suggests a problem, the NHS advises getting checked at an optician.`,
    keyFacts: [
      { label: "Affects", value: "About 1 in 12 men, 1 in 200 women" },
      { label: "UK total", value: "Around 3 million people" },
      { label: "Routine NHS eye test", value: "Not included, ask for it" },
      { label: "Driving (car)", value: "No need to tell the DVLA" },
    ],
    sections: [
      {
        heading: "How opticians test for colour blindness",
        body: `The NHS describes two main types of colour vision test. Your optician may use one or both.`,
        items: [
          "Ishihara test: you look at a series of plates made of coloured dots and say what number or pattern you can see in each one. It mainly picks up red-green colour vision deficiency, the most common type.",
          "Colour arrangement test: you put a set of coloured objects or caps in order of shade. This helps show the type and severity of a colour vision deficiency.",
        ],
        links: [
          { label: "Find an optician near you", href: "/locations" },
          { label: "Eye test prices", href: "/find/eye-test-cost" },
        ],
      },
      {
        heading: "Is a colour blind test free?",
        body: `Colour vision testing is not part of the routine NHS sight test, according to the NHS, but you can ask your optician to check your colour vision. If you qualify for a free NHS eye test, ask the optician when you book whether they can include a colour vision check. If you pay for your eye test, ask whether a colour vision check is included or costs extra, as this can vary between opticians and stores.`,
        links: [
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
        ],
      },
      {
        heading: "Signs of colour blindness in children",
        body: `Colour Blind Awareness estimates that around 40% of colour blind pupils leave school without knowing they are colour blind. The NHS lists signs that a child may be colour blind, including:`,
        items: [
          "Using the wrong colours, for example drawing purple leaves on a tree",
          "Finding it hard to sort or pick out coloured objects",
          "Showing little interest in colouring activities",
          "Smelling food before eating it",
        ],
      },
      {
        heading: "What causes colour blindness?",
        body: `Most colour blindness is inherited and present from birth. The NHS says it can also be caused by eye conditions such as glaucoma, by diabetes, liver disease and multiple sclerosis, by an eye or head injury or a stroke, and by some medicines. If your colour vision changes later in life, see an optician.`,
        links: [
          { label: "Colour blindness explained", href: "/eye-health/conditions/colour-blindness" },
          { label: "Glaucoma test", href: "/find/glaucoma-test" },
        ],
      },
      {
        heading: "Colour blindness, driving and work",
        body: `GOV.UK says you do not need to tell the DVLA if you are colour blind when driving a car or motorcycle. The NHS notes that colour blindness may affect some careers, such as becoming a pilot or a train driver. If you are applying for a role with colour vision standards, check the employer's requirements and ask your optician about a colour vision check before you apply.`,
        links: [
          { label: "Eye test for driving", href: "/eye-tests/dvla-driving-vision-test" },
        ],
      },
      {
        heading: "Can colour blindness be treated?",
        body: `The NHS says there is no treatment for inherited colour blindness, and most people adapt to it. If your child is colour blind, the NHS suggests telling their school so teachers can support them. Colour blindness caused by another condition may improve if that condition is treated.`,
      },
    ],
    faqs: [
      {
        question: "Can I get a colour blind test at an optician?",
        answer:
          "Yes. Colour vision testing is not part of the routine NHS eye test, but the NHS says you can ask your optician for it. Mention it when you book so they can include a colour vision check.",
      },
      {
        question: "Is a colour blind test part of a normal eye test?",
        answer:
          "Not routinely. The NHS says colour vision testing is not part of the routine NHS eye test, but you can ask your optician to check your colour vision.",
      },
      {
        question: "Are online colour blind tests accurate?",
        answer:
          "Online tests can suggest whether you might be colour blind, but they are not a diagnosis because screens display colours differently. If you are concerned, get your colour vision checked at an optician.",
      },
      {
        question: "Do I need to tell the DVLA if I am colour blind?",
        answer:
          "No. GOV.UK says you do not need to tell the DVLA if you are colour blind when driving a car or motorcycle.",
      },
      {
        question: "How common is colour blindness?",
        answer:
          "Colour Blind Awareness estimates that about 1 in 12 men and 1 in 200 women are colour blind, around 3 million people in the UK.",
      },
      {
        question: "Can colour blindness be cured?",
        answer:
          "There is no treatment for inherited colour blindness, according to the NHS, and most people adapt. If it is caused by another condition, treating that condition may help.",
      },
    ],
    relatedQueries: [
      "childrens-eye-test-guide",
      "eye-test-for-driving",
      "free-eye-test",
      "eye-test-what-to-expect",
    ],
    ctaText: "Find an optician near you and ask for a colour vision check",
    disclaimer:
      "This page is general information, not medical advice. Services vary between opticians, so check with the optician when you book.",
    sources: [
      { label: "NHS: Colour vision deficiency (colour blindness)", url: "https://www.nhs.uk/conditions/colour-vision-deficiency/" },
      { label: "GOV.UK: Driving eyesight rules", url: "https://www.gov.uk/driving-eyesight-rules" },
      { label: "Colour Blind Awareness: Colour blindness", url: "https://www.colourblindawareness.org/colour-blindness/" },
    ],
  },

  // ─── Concern ──────────────────────────────────────────────────────────
  {
    slug: "blurry-vision-causes",
    keyword: "blurry vision causes",
    title: "Blurry Vision Causes — When to See an Optician (UK Guide)",
    category: "concern",
    shortDescription:
      "The most common causes of blurry vision and when you should book an urgent eye test to get it checked.",
    content: `Blurry vision is one of the most common reasons people visit an optician. While it is often caused by a straightforward need for glasses, blurry vision can sometimes indicate more serious conditions that require prompt attention.

The most common cause of blurry vision is refractive error — meaning your eyes do not focus light correctly. This includes short-sightedness (myopia, where distance vision is blurry), long-sightedness (hypermetropia, where close-up vision is blurry), astigmatism (where vision is blurry at all distances due to irregular corneal shape), and presbyopia (age-related difficulty with close-up focus, typically starting around age 40). All of these are easily corrected with glasses or contact lenses.

Other common causes of blurry vision include dry eye disease (the tear film breaks up and causes intermittent blurriness), prolonged screen use and digital eye strain, cataracts (gradual clouding of the lens, common over age 60), and medication side effects (some drugs list blurred vision as a side effect).

More serious causes that require urgent attention include retinal detachment (blurriness or a shadow spreading across your vision, often preceded by flashes and floaters), acute glaucoma (sudden severe blurring with eye pain, headache, and sometimes nausea), stroke or TIA (sudden blurring or loss of vision, especially in one eye), optic neuritis (blurring with eye pain, sometimes associated with multiple sclerosis), and wet macular degeneration (central vision becomes distorted or blurry).

As a general rule: gradual blurriness that has developed over weeks or months is likely a prescription change and should be checked at a routine eye test. Sudden blurriness that develops over hours or days, particularly in one eye, with pain, or with other symptoms such as flashes, floaters, or headache, should be assessed urgently — call your optician, NHS 111, or attend A&E if you cannot be seen the same day.`,
    faqs: [
      {
        question: "When should I worry about blurry vision?",
        answer:
          "Seek urgent help if blurriness is sudden, affects one eye, is accompanied by pain, flashes of light, floaters, headache, or a curtain-like shadow across your vision. These can indicate serious conditions requiring immediate treatment.",
      },
      {
        question: "Can screen use cause blurry vision?",
        answer:
          "Yes. Prolonged screen use can cause digital eye strain, leading to temporary blurry vision, dry eyes, and headaches. The 20-20-20 rule helps: every 20 minutes, look at something 20 feet away for 20 seconds. If blurriness persists, book an eye test.",
      },
      {
        question: "Can stress cause blurry vision?",
        answer:
          "Stress can contribute to eye strain and temporary visual changes. However, if you are experiencing persistent blurry vision, it is important to have it checked by an optometrist to rule out other causes.",
      },
    ],
    relatedQueries: [
      "do-i-need-an-eye-test",
      "headaches-and-vision",
      "floaters-in-vision",
      "sudden-vision-changes",
    ],
    ctaText: "Book an eye test to check your vision",
  },
  {
    slug: "headaches-and-vision",
    keyword: "headaches and vision",
    title: "Headaches and Vision — Could Your Eyes Be the Cause?",
    category: "concern",
    shortDescription:
      "Understanding the link between headaches and vision problems, and why an eye test should be one of your first steps.",
    content: `Headaches are extremely common, and in many cases, an undetected vision problem is the underlying cause. If you are experiencing frequent headaches — particularly after reading, using a screen, or concentrating on close work — an eye test should be one of your first investigations.

The most common vision-related cause of headaches is uncorrected refractive error. If you are slightly long-sighted (hypermetropic), your eyes work harder to focus, especially on close-up tasks. This effort can cause eye strain headaches that tend to build during the day and are worst after sustained concentration. Similarly, astigmatism (where the cornea has an irregular shape) causes your eyes to struggle to form a sharp image, leading to strain and headaches. Even a mild prescription that you did not know you needed can be enough to cause persistent headaches.

An outdated or incorrect glasses prescription can also cause headaches. If your prescription has changed since your last test, your current glasses may no longer be providing optimal correction, forcing your eyes to compensate and causing strain. This is particularly common in people who have not had an eye test for several years.

Digital eye strain (also known as computer vision syndrome) is another major cause of headaches related to vision. Prolonged screen use reduces your blink rate, leading to dry eyes and strain, while the constant focusing effort on a screen causes muscular fatigue around the eyes. Symptoms typically include headaches at the front of the head or around the eyes, dry or watery eyes, blurry vision, and neck or shoulder tension.

Less commonly, headaches can be associated with more serious eye conditions. Acute angle-closure glaucoma causes sudden severe headache with eye pain and blurred vision — this is a medical emergency. Raised intracranial pressure can cause headaches with visual disturbances such as temporary blackouts or double vision. If your headaches are severe, sudden, or accompanied by visual symptoms, seek immediate medical advice.

An eye test is a quick, painless, and inexpensive first step in investigating headaches. Many people find that a simple pair of glasses resolves headaches they have been experiencing for months or even years.`,
    faqs: [
      {
        question: "Can needing glasses cause headaches?",
        answer:
          "Yes, absolutely. Uncorrected long-sightedness, astigmatism, or presbyopia (age-related difficulty with close focus) can all cause persistent headaches, particularly after reading or screen use. An eye test can determine whether you need glasses.",
      },
      {
        question: "Should I see an optician or a doctor for headaches?",
        answer:
          "If your headaches are related to visual tasks (reading, screens, driving), start with an eye test. If your optician finds no visual cause, or if your headaches are severe, sudden, or accompanied by other symptoms, see your GP.",
      },
      {
        question: "Can new glasses cause headaches?",
        answer:
          "It is normal to experience mild headaches or discomfort when adjusting to new glasses, especially if there is a significant prescription change. This usually settles within a few days to two weeks. If headaches persist beyond two weeks, return to your optician to check the prescription.",
      },
    ],
    relatedQueries: [
      "do-i-need-an-eye-test",
      "blurry-vision-causes",
      "book-eye-test",
      "eye-test-what-to-expect",
    ],
    ctaText: "Book an eye test to check for vision problems",
  },
  {
    slug: "floaters-in-vision",
    keyword: "eye floaters",
    title: "Floaters and Flashes in the Eyes: Causes and When to Get Help",
    seoTitle: "Eye Floaters and Flashes: Causes and When They Are Urgent (NHS)",
    seoDescription:
      "Floaters and flashes are common and usually harmless. When new or sudden floaters, flashes or a shadow in your vision need an urgent optician appointment.",
    h1: "Floaters and Flashes in the Eyes",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/floaters-and-flashes",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Floaters and flashes are common and usually harmless. When they need an urgent optician appointment.",
    content: `Dots and lines (floaters) or flashes of light in your vision are common. The NHS says they are not usually serious, especially if you have had them a long time, they are not getting worse and your vision is not affected.

Floaters can look like small dark dots, squiggly lines, rings or cobwebs. Flashes may eventually stop, and floaters often become less noticeable as you get used to them. But some changes need checking quickly, because they can be a sign of a problem at the back of the eye.`,
    keyFacts: [
      { label: "Usually", value: "Harmless" },
      { label: "New or sudden", value: "Urgent optician or NHS 111" },
      { label: "Common cause", value: "Posterior vitreous detachment" },
      { label: "Shadow or curtain", value: "Get help urgently" },
    ],
    sections: [
      {
        heading: "Get an urgent optician appointment or call NHS 111 if",
        items: [
          "You have floaters or flashes for the first time",
          "You suddenly get floaters or flashes",
          "The number of floaters or flashes suddenly increases",
          "A dark curtain or shadow moves across your vision",
          "You also have blurred vision or eye pain",
          "Floaters start after eye surgery or an eye injury",
        ],
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
      {
        heading: "What happens at the optician",
        body: `The NHS says your eyes will be checked at an optician to see whether you need to see an eye doctor (ophthalmologist) for more tests or treatment. You usually only need treatment if there is a problem that could affect your vision.`,
      },
      {
        heading: "Causes",
        body: `Lots of people, particularly older people, get floaters and flashes. They are usually caused by a harmless process called posterior vitreous detachment, where the gel inside the eye changes. Sometimes they are caused by retinal detachment, which is serious and can lead to permanent vision loss if not treated. They can also happen for no obvious reason.`,
        links: [
          { label: "Retinal detachment treatment", href: "/eye-surgery/retinal-detachment" },
        ],
      },
    ],
    faqs: [
      {
        question: "Are eye floaters serious?",
        answer:
          "Usually not, especially if you have had them a long time and they are not getting worse. New or sudden floaters need an urgent optician appointment.",
      },
      {
        question: "What causes floaters?",
        answer:
          "Usually a harmless change in the gel inside the eye called posterior vitreous detachment. Sometimes a retinal detachment, which is serious.",
      },
      {
        question: "When are flashes in the eye an emergency?",
        answer:
          "If they are new or sudden, increase suddenly, or come with a shadow across your vision, blurred vision or pain, get an urgent optician appointment or call NHS 111.",
      },
      {
        question: "Do floaters go away?",
        answer: "Flashes may eventually stop, and floaters often become less noticeable as you get used to them.",
      },
    ],
    relatedQueries: ["sudden-vision-changes", "emergency-eye-test-near-me", "blurry-vision-causes"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. New or sudden floaters or flashes need urgent help.",
    sources: [
      { label: "NHS: Floaters and flashes in the eyes", url: "https://www.nhs.uk/symptoms/floaters-and-flashes-in-the-eyes/" },
    ],
  },
  {
    slug: "sudden-vision-changes",
    keyword: "sudden vision changes",
    title: "Sudden Vision Changes — When to Seek Urgent Help (UK Guide)",
    category: "concern",
    shortDescription:
      "What to do if you experience sudden changes in your vision, including which symptoms are medical emergencies.",
    content: `Sudden changes in your vision should always be taken seriously. While some causes are benign, sudden visual symptoms can indicate sight-threatening or life-threatening conditions that require immediate attention. Knowing what to look for and where to go for help could save your sight.

Symptoms that require urgent same-day assessment include: a sudden increase in floaters (especially with flashes of light), a shadow or curtain spreading across your vision (possible retinal detachment), sudden loss of vision in one or both eyes (possible retinal artery or vein occlusion, or other serious conditions), sudden severe eye pain with blurred vision and headache (possible acute glaucoma), sudden double vision, and distortion of straight lines or a central blind spot (possible wet macular degeneration).

Symptoms that require emergency assessment (A&E or 999) include: sudden complete vision loss, a chemical burn to the eye, a penetrating eye injury, sudden vision loss accompanied by weakness, numbness, or difficulty speaking (possible stroke), and sudden severe headache with vision loss or changes (possible stroke or other neurological emergency).

For urgent but non-emergency symptoms, your first call should be to your local optician. Many opticians provide same-day emergency eye care through the NHS MECS scheme and have the specialist equipment needed to examine your eyes thoroughly. This is usually faster and more appropriate than A&E for eye-specific problems. If your optician cannot see you, call NHS 111 for advice on where to go.

Time matters with many of these conditions. Retinal detachment is best treated within 24 hours. Acute glaucoma can cause permanent damage within hours. Retinal artery occlusion (an eye stroke) has a very narrow treatment window. Do not wait and see if symptoms improve — seek help immediately. It is always better to be assessed and reassured than to delay and risk permanent damage.`,
    faqs: [
      {
        question: "Should I go to A&E for sudden vision loss?",
        answer:
          "If your optician cannot see you urgently, yes. Sudden vision loss can indicate a retinal detachment, eye stroke, or neurological emergency. If the vision loss is accompanied by weakness, numbness, or difficulty speaking, call 999 immediately as it could be a stroke.",
      },
      {
        question: "What should I do if I see flashes of light?",
        answer:
          "Occasional flashes are common and often harmless. However, if you see new or increasing flashes, particularly with new floaters or a shadow across your vision, contact your optician urgently for a same-day assessment. This could indicate a retinal tear or detachment.",
      },
      {
        question: "Can stress cause sudden vision changes?",
        answer:
          "Stress can cause temporary visual disturbances such as blurring or light sensitivity. However, sudden significant vision changes should always be assessed urgently to rule out serious conditions. Do not assume sudden symptoms are stress-related without professional evaluation.",
      },
    ],
    relatedQueries: [
      "emergency-eye-test-near-me",
      "floaters-in-vision",
      "blurry-vision-causes",
      "same-day-eye-test",
    ],
    ctaText: "Find urgent eye care now",
  },
  // ─── Condition pages (rendered at /eye-health/conditions/{slug}) ──────
  {
    slug: "conjunctivitis",
    keyword: "conjunctivitis",
    title: "Conjunctivitis (Pink Eye): Symptoms, Treatment and When to Get Help",
    seoTitle: "Conjunctivitis (Pink Eye): Symptoms, Treatment and Is It Contagious?",
    seoDescription:
      "Conjunctivitis, or pink eye, makes eyes red, gritty, itchy and sticky. How to treat it at home, when a pharmacist can help, if it is contagious and when to see a GP.",
    h1: "Conjunctivitis (Pink Eye)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/conjunctivitis",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Conjunctivitis, also called pink eye, makes eyes red, gritty and sticky. How to treat it, when it is contagious and when to get help.",
    content: `Conjunctivitis, also known as red eye or pink eye, usually affects both eyes. The NHS says it makes eyes red, burn or feel gritty, itch, water and produce pus that sticks to the lashes.

Conjunctivitis that produces sticky pus is contagious, and if eyes are red and feel gritty it is also usually contagious. Conjunctivitis caused by an allergy, such as hay fever, makes eyes red and watery but is not contagious.

Most conjunctivitis can be eased at home, and a pharmacist can help. See the section below on when to see a GP or get urgent help, as some symptoms can be a sign of a more serious eye problem.`,
    keyFacts: [
      { label: "Also called", value: "Pink eye or red eye" },
      { label: "Contagious", value: "If sticky or gritty, usually yes" },
      { label: "First help", value: "A pharmacist" },
      { label: "Work or school", value: "No need to stay off unless very unwell" },
    ],
    sections: [
      {
        heading: "Symptoms of conjunctivitis",
        body: `According to the NHS, conjunctivitis usually affects both eyes and makes them:`,
        items: ["Red", "Burn or feel gritty", "Produce pus that sticks to the lashes", "Itch", "Water"],
      },
      {
        heading: "How to treat conjunctivitis yourself",
        items: [
          "Wash your eyelids with clean water. Boil it and let it cool, then gently wipe your lashes with a clean cotton wool pad, one for each eye",
          "Hold a cold flannel on your eyes for a few minutes to cool them",
          "Do not wear contact lenses until your eyes are better",
        ],
      },
      {
        heading: "A pharmacist can help",
        body: `The NHS says a pharmacist can give advice and suggest eye drops or antihistamines to help with symptoms. Children under 2 need a prescription from a GP for treatment.`,
      },
      {
        heading: "Stop conjunctivitis spreading",
        items: [
          "Wash your hands regularly with warm soapy water",
          "Wash pillowcases and face cloths in hot water and detergent",
          "Do not share towels or pillows",
          "Do not rub your eyes",
        ],
      },
      {
        heading: "When to see a GP or get urgent help",
        body: `See a GP if your baby has red, sticky eyes (get an urgent appointment if your baby is less than 30 days old), if you wear contact lenses and have conjunctivitis symptoms with spots on your eyelids, or if your symptoms have not cleared within 7 days. Ask for an urgent GP appointment or get help from NHS 111 if you have pain in your eyes, sensitivity to light, changes in your vision such as wavy lines or flashing, or very red eyes. The NHS says these can be signs of a more serious eye problem.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
          { label: "Blepharitis", href: "/eye-health/conditions/blepharitis" },
        ],
      },
      {
        heading: "Treatment",
        body: `Treatment depends on the cause. If it is a bacterial infection, you might be prescribed antibiotics, but these do not work for conjunctivitis caused by a virus or an allergy.`,
      },
    ],
    faqs: [
      {
        question: "Is conjunctivitis contagious?",
        answer:
          "Conjunctivitis that produces sticky pus is contagious, and red, gritty eyes are usually contagious too. Conjunctivitis caused by an allergy such as hay fever is not contagious.",
      },
      {
        question: "Do I need to stay off work or school with conjunctivitis?",
        answer:
          "No. The NHS says you do not need to stay away from work or school unless you or your child are feeling very unwell.",
      },
      {
        question: "Can a pharmacist treat conjunctivitis?",
        answer:
          "A pharmacist can give advice and suggest eye drops or antihistamines. Children under 2 need a prescription from a GP.",
      },
      {
        question: "How long does conjunctivitis last?",
        answer:
          "If your symptoms have not cleared up within 7 days, the NHS advises seeing a GP.",
      },
      {
        question: "Can I wear contact lenses with conjunctivitis?",
        answer: "No. Do not wear contact lenses until your eyes are better.",
      },
    ],
    relatedQueries: ["blepharitis", "emergency-eye-test-near-me", "eye-test-what-to-expect"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If you are worried about your eyes, speak to a pharmacist, optician, GP or NHS 111.",
    sources: [
      { label: "NHS: Conjunctivitis", url: "https://www.nhs.uk/conditions/conjunctivitis/" },
    ],
  },
  {
    slug: "blepharitis",
    keyword: "blepharitis",
    title: "Blepharitis: Symptoms, Eyelid Cleaning and Treatment",
    seoTitle: "Blepharitis: Symptoms, How to Clean Your Eyelids and Treatment (NHS)",
    seoDescription:
      "Blepharitis causes sore, itchy eyelids with flakes or crusts on the lashes. How to clean your eyelids, when a pharmacist or GP can help, and what causes it.",
    h1: "Blepharitis",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/blepharitis",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Blepharitis makes eyelids sore and itchy with crusts on the lashes. How to clean your eyelids and when to get help.",
    content: `Blepharitis is inflammation of the eyelids. The NHS says its symptoms often come and go, and include sore eyelids, itchy eyes, a gritty feeling, flakes or crusts around the roots of the eyelashes, and eyelids sticking together in the morning.

Cleaning your eyelids every day is the main way to treat and prevent it. Blepharitis cannot be spread to other people.`,
    keyFacts: [
      { label: "Main treatment", value: "Clean your eyelids twice a day" },
      { label: "Contagious", value: "No" },
      { label: "First help", value: "A pharmacist" },
      { label: "Symptoms", value: "Often come and go" },
    ],
    sections: [
      {
        heading: "Symptoms of blepharitis",
        items: [
          "Sore eyelids",
          "Itchy eyes",
          "A gritty feeling in the eyes",
          "Flakes or crusts around the roots of the eyelashes",
          "Eyelids sticking together when you wake up",
        ],
      },
      {
        heading: "How to clean your eyelids",
        body: `The NHS advises cleaning your eyelids twice a day, and carrying on even when symptoms clear:`,
        items: [
          "Soak a clean flannel or cotton wool in warm water and hold it on your closed eyelid for 5 to 10 minutes",
          "Gently massage your eyelids for around 30 seconds",
          "Clean along the edge of your eyelids with cotton wool or a cotton bud to remove flakes or crusts. A little baby shampoo in water may help",
        ],
      },
      {
        heading: "While you have symptoms",
        items: [
          "Do not wear contact lenses",
          "Do not use eye make-up, especially eyeliner and mascara",
        ],
      },
      {
        heading: "Pharmacist and GP treatment",
        body: `A pharmacist may suggest eye pads, wipes or eye drops to help keep your eyelids clean. See a GP if your symptoms do not improve or get worse. A GP might suggest an antibiotic cream or ointment, antibiotic eye drops or tablets if blepharitis has caused other problems such as a cyst, or refer you to an eye specialist if it is severe. Ask for an urgent GP appointment or get help from NHS 111 if you have eye pain, changes to your vision or very red eyes.`,
        links: [
          { label: "Dry eye assessment", href: "/eye-tests/dry-eye-assessment" },
          { label: "Conjunctivitis", href: "/eye-health/conditions/conjunctivitis" },
        ],
      },
      {
        heading: "Causes of blepharitis",
        body: `The NHS says blepharitis can be caused by a type of bacteria that lives on the skin, a skin condition such as seborrhoeic dermatitis, or the glands inside the eyelids not producing enough oil.`,
      },
    ],
    faqs: [
      {
        question: "Is blepharitis contagious?",
        answer: "No. The NHS says blepharitis cannot be spread to other people.",
      },
      {
        question: "How do you get rid of blepharitis?",
        answer:
          "Clean your eyelids twice a day with a warm compress, a gentle massage and cleaning along the lid edges, and keep doing it even when symptoms clear. See a GP if it does not improve.",
      },
      {
        question: "Can a pharmacist help with blepharitis?",
        answer: "Yes. A pharmacist might suggest eye pads, wipes or eye drops to help keep your eyelids clean.",
      },
      {
        question: "Can I wear make-up with blepharitis?",
        answer: "Avoid eye make-up, especially eyeliner and mascara, while you have symptoms.",
      },
    ],
    relatedQueries: ["conjunctivitis", "emergency-eye-test-near-me", "eye-test-what-to-expect"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If you are worried about your eyes, speak to a pharmacist, optician, GP or NHS 111.",
    sources: [
      { label: "NHS: Blepharitis", url: "https://www.nhs.uk/conditions/blepharitis/" },
    ],
  },
  {
    slug: "astigmatism",
    keyword: "astigmatism",
    title: "Astigmatism: Symptoms, Eye Tests and Treatment Options",
    seoTitle: "Astigmatism: What It Is, Symptoms and Treatment (Glasses, Lenses, Surgery)",
    seoDescription:
      "Astigmatism means your eye is shaped more like a rugby ball than a football. Symptoms, why eye tests matter, and the pros and cons of glasses, contact lenses and surgery.",
    h1: "Astigmatism",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/astigmatism",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Astigmatism means light focuses at more than one place in the eye. Symptoms, eye tests and the pros and cons of each treatment.",
    content: `The NHS describes astigmatism as your eye being shaped more like a rugby ball than a football, so light is focused at more than one place in the eye. It normally happens alongside short-sightedness or long-sightedness.

The main symptoms are blurred vision, headaches and eye strain, which you may notice after concentrating for a long time, for example on a computer. An optician can check for astigmatism during a routine eye test.`,
    keyFacts: [
      { label: "Main symptoms", value: "Blurred vision, headaches, eye strain" },
      { label: "Found by", value: "A routine eye test" },
      { label: "Treatment", value: "Not always needed" },
      { label: "Options", value: "Glasses, contact lenses, surgery" },
    ],
    sections: [
      {
        heading: "Why astigmatism matters for children",
        body: `Astigmatism in one eye may cause lazy eye, where vision does not develop properly, so it is important it is spotted early. The NHS says astigmatism may also affect a child's reading or concentration.`,
        links: [
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
      {
        heading: "When to go to an optician",
        body: `The NHS advises going to an optician if you or your child have symptoms of astigmatism, or have not had an eye test for 2 years. Astigmatism can be linked to an eye condition called keratoconus, so regular eye tests are important.`,
        links: [
          { label: "How often to have an eye test", href: "/eye-health/guides/how-often-should-you-have-an-eye-test" },
          { label: "Keratoconus", href: "/eye-health/conditions/keratoconus" },
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
        ],
      },
      {
        heading: "Treatment options",
        body: `Astigmatism does not always need treatment. The NHS compares the options:`,
        table: {
          caption: "Pros and cons of astigmatism treatments, from the NHS, checked November 2026",
          headers: ["Treatment", "Pros", "Cons"],
          rows: [
            ["Glasses", "Cheapest option. May be free or discounted on the NHS", "Can get lost or broken"],
            ["Contact lenses", "Soft or hard lenses. Can suit active people. May be free or discounted on the NHS", "Not suitable for everyone. Risk of eye infection with poor lens hygiene"],
            ["Laser eye or lens surgery", "May be permanent. May suit more severe vision problems", "Risk of complications and side effects. Not available on the NHS. Can be expensive"],
          ],
        },
        links: [
          { label: "Contact lens fittings", href: "/find/contact-lens-eye-test" },
          { label: "Laser eye surgery", href: "/eye-surgery" },
        ],
      },
    ],
    faqs: [
      {
        question: "What is astigmatism?",
        answer:
          "Astigmatism means your eye is shaped more like a rugby ball than a football, so light is focused at more than one place in the eye. It usually happens alongside short- or long-sightedness.",
      },
      {
        question: "What are the symptoms of astigmatism?",
        answer: "The main symptoms are blurred vision, headaches and eye strain.",
      },
      {
        question: "Does astigmatism need treatment?",
        answer:
          "Not always. When it does, the options include glasses, contact lenses and laser eye or lens surgery.",
      },
      {
        question: "Is laser surgery for astigmatism available on the NHS?",
        answer: "No. The NHS says laser eye or lens surgery is not available on the NHS and can be expensive.",
      },
      {
        question: "Can astigmatism cause a lazy eye?",
        answer:
          "Astigmatism in one eye may cause lazy eye, so it is important it is spotted early with an eye test.",
      },
    ],
    relatedQueries: ["how-often-eye-test", "contact-lens-eye-test", "free-eye-test"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Your optometrist can tell you whether you need treatment.",
    sources: [
      { label: "NHS: Astigmatism", url: "https://www.nhs.uk/conditions/astigmatism/" },
    ],
  },
  {
    slug: "glaucoma",
    keyword: "glaucoma",
    title: "Glaucoma: Symptoms, Risk Factors, Eye Tests and Treatment",
    seoTitle: "Glaucoma: Symptoms, Who Is at Risk, Tests and Treatment (NHS Guide)",
    seoDescription:
      "Glaucoma usually has no symptoms and is picked up at routine eye tests. Who is at higher risk, free NHS eye tests, treatment, and when sudden symptoms mean A&E.",
    h1: "Glaucoma",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/glaucoma",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Glaucoma usually has no symptoms and is found at routine eye tests. Who is at risk, free NHS tests, treatment and when it is an emergency.",
    content: `Glaucoma damages the nerve that connects the eye to the brain (the optic nerve), usually because of a build-up of pressure in the eye. The NHS says it does not usually have symptoms and most people do not realise they have it. It develops slowly over many years and is usually picked up during routine eye tests.

There is currently no cure, but treatment can slow the damage and help stop your vision getting worse, which is why regular eye tests matter.`,
    keyFacts: [
      { label: "Symptoms", value: "Usually none at first" },
      { label: "Found by", value: "Routine eye tests" },
      { label: "Eye tests", value: "At least every 2 years" },
      { label: "Sudden symptoms", value: "Call 999 or go to A&E" },
    ],
    sections: [
      {
        heading: "Who is at higher risk",
        body: `The NHS says your risk may be higher if:`,
        items: [
          "You are over 50",
          "You have a brother, sister or parent with glaucoma",
          "You are from a Black African, Caribbean or Asian background",
          "You have other conditions such as short-sightedness, long-sightedness or diabetes",
        ],
      },
      {
        heading: "Eye tests and free NHS tests",
        body: `Everyone should have regular eye tests, at least every 2 years, and people at higher risk may be advised to go more often. You are entitled to a free NHS sight test if you have glaucoma, if you are 40 or over and your mother, father, brother, sister or child has glaucoma, or if an ophthalmologist has advised you are at risk of it.`,
        links: [
          { label: "Glaucoma test", href: "/find/glaucoma-test" },
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
          { label: "How often to have an eye test", href: "/eye-health/guides/how-often-should-you-have-an-eye-test" },
        ],
      },
      {
        heading: "Sudden glaucoma is an emergency",
        body: `Sometimes glaucoma develops suddenly. The NHS lists symptoms including intense eye pain, a red eye, tenderness around the eyes, rainbow-coloured circles around bright lights, blurred vision, feeling or being sick, and a headache. Call 999 or go to A&E if these develop suddenly, and do not drive yourself.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
      {
        heading: "Treatment for glaucoma",
        body: `If you are told you have glaucoma, you should be referred to an ophthalmologist. Treatment depends on the type and how your sight is affected, and may include:`,
        items: [
          "Eye drops to decrease the fluid in the eye and help it drain",
          "Laser treatment to decrease the fluid in the eye",
          "Surgery, with several types of operation",
        ],
        links: [
          { label: "Glaucoma surgery", href: "/eye-surgery" },
        ],
      },
      {
        heading: "Types of glaucoma",
        items: [
          "Primary glaucoma, the most common type, usually develops slowly over many years",
          "Secondary glaucoma is usually caused by another condition or an eye injury",
          "Childhood glaucoma is a rare type that affects young children",
        ],
      },
      {
        heading: "Support",
        body: `Glaucoma UK and the RNIB offer information and support for people with glaucoma and sight loss.`,
      },
    ],
    faqs: [
      {
        question: "What are the first signs of glaucoma?",
        answer:
          "Usually there are none. Glaucoma develops slowly and is usually picked up at a routine eye test before you notice anything.",
      },
      {
        question: "Is a glaucoma test free?",
        answer:
          "It is part of a routine NHS eye test, which is free if you qualify, including if you are 40 or over with a parent, sibling or child who has glaucoma.",
      },
      {
        question: "Can glaucoma be cured?",
        answer:
          "There is currently no cure, but eye drops, laser treatment and surgery can slow the damage and help stop your vision getting worse.",
      },
      {
        question: "When is glaucoma an emergency?",
        answer:
          "If symptoms such as intense eye pain, a red eye, blurred vision, rainbow circles around lights, sickness or a headache come on suddenly, call 999 or go to A&E.",
      },
      {
        question: "Who is most at risk of glaucoma?",
        answer:
          "People over 50, those with a close family member with glaucoma, people from Black African, Caribbean or Asian backgrounds, and people with conditions such as diabetes or short- or long-sightedness.",
      },
    ],
    relatedQueries: ["glaucoma-test", "free-eye-test", "how-often-eye-test", "oct-scan-cost"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If symptoms come on suddenly, call 999 or go to A&E.",
    sources: [
      { label: "NHS: Glaucoma", url: "https://www.nhs.uk/conditions/glaucoma/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },
  {
    slug: "cataracts",
    keyword: "cataracts",
    title: "Cataracts: Symptoms, Causes, Surgery and Driving",
    seoTitle: "Cataracts: Symptoms, Who Gets Them, Cataract Surgery and Driving (NHS)",
    seoDescription:
      "Cataracts cause blurred vision, glare and faded colours, and usually develop slowly. Symptoms, who is more likely to get them, cataract surgery and driving rules.",
    h1: "Cataracts",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/cataracts",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Cataracts make vision blurry and colours faded, and usually develop slowly. Symptoms, risk factors, surgery and driving.",
    content: `Cataracts are cloudy patches in the lens of the eye. The NHS says symptoms usually develop slowly, you will often have cataracts in both eyes, and the symptoms may differ between eyes.

Cataracts do not usually need treatment straight away. Over time they get worse, and you will need cataract surgery if you want to improve your sight. If you think you have symptoms, the NHS advises seeing an optician, who can refer you to an eye specialist.`,
    keyFacts: [
      { label: "Develop", value: "Usually slowly" },
      { label: "First step", value: "See an optician" },
      { label: "Treatment", value: "Cataract surgery" },
      { label: "Surgery", value: "Usually same-day, local anaesthetic" },
    ],
    sections: [
      {
        heading: "Symptoms of cataracts",
        items: [
          "Blurred vision",
          "Difficulty seeing at night",
          "Difficulty reading and watching television",
          "Eyes uncomfortable in, or sensitive to, light and glare",
          "Double vision, seeing two of one object",
          "Glowing rings (halos) around lights",
          "Colours looking faded, especially blue",
          "Needing to change your glasses prescription more often than usual",
        ],
      },
      {
        heading: "Who is more likely to get cataracts",
        body: `The NHS says you may be more likely to get cataracts if you are 60 or over, have had an eye injury or eye surgery, have another eye condition such as uveitis or being very short-sighted, have taken steroid medicines for a long time, smoke, have a parent, brother or sister who has had cataracts, are a woman, or your eyes have had a lot of sun without protection. Type 2 diabetes, severe dermatitis and high blood pressure can also increase the risk.`,
        links: [
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
        ],
      },
      {
        heading: "Cataract surgery",
        body: `A GP or eye specialist will talk to you about whether you want surgery, depending on how cataracts affect your daily life and whether they are in one or both eyes. The NHS says surgery is done under local anaesthetic, so you are awake but do not feel pain. The cloudy lens is replaced with an artificial one and you should be able to go home the same day. If both eyes need treatment, they are done on separate days. There may be a wait, so ask your eye specialist how long.`,
        links: [
          { label: "Cataract surgery providers", href: "/eye-surgery/cataracts" },
        ],
      },
      {
        heading: "Driving with cataracts",
        body: `You may still be able to drive if your vision is good enough. You must tell the DVLA if your eyesight does not meet the minimum standard for driving. Ask an optician if you are not sure.`,
        links: [
          { label: "DVLA eyesight rules", href: "/eye-tests/dvla-driving-vision-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "What are the first signs of cataracts?",
        answer:
          "Blurred vision, difficulty seeing at night, glare from lights, faded colours and needing to change your glasses more often are common early signs.",
      },
      {
        question: "Do cataracts need treating straight away?",
        answer:
          "Not usually. They get worse over time, and surgery is the treatment if you want to improve your sight.",
      },
      {
        question: "Is cataract surgery painful?",
        answer:
          "It is done under local anaesthetic, so you are awake but should not feel pain. Most people go home the same day.",
      },
      {
        question: "Can I drive with cataracts?",
        answer:
          "You may be able to if your vision meets the driving standard. You must tell the DVLA if it does not. Ask an optician if you are unsure.",
      },
    ],
    relatedQueries: ["how-often-eye-test", "free-eye-test", "eye-test-for-driving"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Speak to an optician or GP about your own eyes.",
    sources: [
      { label: "NHS: Cataracts in adults", url: "https://www.nhs.uk/conditions/cataracts/" },
    ],
  },
  {
    slug: "macular-degeneration",
    keyword: "macular degeneration",
    title: "Macular Degeneration (AMD): Symptoms, Wet and Dry AMD, Treatment",
    seoTitle: "Macular Degeneration (AMD): Symptoms, Wet vs Dry and Treatment (NHS)",
    seoDescription:
      "Age-related macular degeneration affects the middle of your vision, usually from your 50s. Symptoms, when to get urgent help, and treatment for wet and dry AMD.",
    h1: "Age-Related Macular Degeneration (AMD)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/age-related-macular-degeneration",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "AMD affects the middle part of your vision and usually first affects people in their 50s. Symptoms, urgent signs and treatment.",
    content: `Age-related macular degeneration (AMD) is a common condition that affects the middle part of your vision. The NHS says it usually first affects people in their 50s. It does not cause total blindness, but it can make reading and recognising faces difficult.

Without treatment, vision may get worse, gradually over several years and then sometimes quickly over weeks or months. Sometimes AMD is found at a routine eye test before you have any symptoms.`,
    keyFacts: [
      { label: "Affects", value: "The middle of your vision" },
      { label: "Usually starts", value: "In your 50s or later" },
      { label: "Pain", value: "AMD is not painful" },
      { label: "Wet AMD", value: "Treatable with injections" },
    ],
    sections: [
      {
        heading: "Symptoms of AMD",
        body: `The first symptom is often a blurred or distorted area in the centre of your vision. You can get it in one eye or both. Other symptoms the NHS lists include:`,
        items: [
          "Straight lines looking wavy or crooked",
          "Being sensitive to bright light",
          "Seeing flickering or flashing lights",
          "Seeing things that are not there (hallucinations)",
          "Difficulty reading, watching TV, driving or recognising faces",
        ],
      },
      {
        heading: "When to get help",
        body: `See an optician if you are worried about your vision, as early diagnosis and treatment may help stop it getting worse. Get an urgent optician appointment or help from NHS 111 if your vision suddenly gets worse, you have a dark curtain or shadow moving across your vision, or your eye is red and painful.`,
        links: [
          { label: "Who gets a free NHS eye test", href: "/find/free-eye-test" },
          { label: "OCT scan cost", href: "/find/oct-scan-cost" },
        ],
      },
      {
        heading: "Wet and dry AMD treatment",
        body: `There is no cure, but the NHS says treatment and support can help slow changes in your vision. Treatment depends on whether you have wet or dry AMD:`,
        table: {
          headers: ["Type", "Treatment"],
          rows: [
            ["Wet AMD", "Anti-VEGF medicine injected into the eye, or light treatment to destroy the blood vessels causing it"],
            ["Dry AMD", "No treatment currently, but support with low vision and lifestyle changes"],
          ],
        },
        links: [
          { label: "Macular degeneration treatment providers", href: "/eye-surgery/macular-degeneration" },
        ],
      },
      {
        heading: "Causes",
        body: `The exact cause is unknown. The NHS says it has been linked to ageing, smoking, high blood pressure, being overweight and a family history of AMD.`,
      },
    ],
    faqs: [
      {
        question: "What is macular degeneration?",
        answer:
          "Age-related macular degeneration is a common condition that affects the middle part of your vision. It usually first affects people in their 50s.",
      },
      {
        question: "Does AMD cause blindness?",
        answer:
          "It does not cause total blindness, but it can make things like reading and recognising faces difficult.",
      },
      {
        question: "What is the difference between wet and dry AMD?",
        answer:
          "Wet AMD can be treated with injections into the eye or light treatment. There is currently no treatment for dry AMD, but support is available.",
      },
      {
        question: "When is AMD urgent?",
        answer:
          "Get an urgent optician appointment or help from NHS 111 if your vision suddenly gets worse, a shadow moves across your vision, or your eye is red and painful.",
      },
    ],
    relatedQueries: ["oct-scan-cost", "how-often-eye-test", "free-eye-test-over-60"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If your vision suddenly gets worse, get urgent help.",
    sources: [
      { label: "NHS: Age-related macular degeneration", url: "https://www.nhs.uk/conditions/age-related-macular-degeneration-amd/" },
      { label: "NHS: AMD symptoms", url: "https://www.nhs.uk/conditions/age-related-macular-degeneration-amd/symptoms/" },
      { label: "NHS: AMD treatments", url: "https://www.nhs.uk/conditions/age-related-macular-degeneration-amd/treatment/" },
    ],
  },
  {
    slug: "keratoconus",
    keyword: "keratoconus",
    title: "Keratoconus: Symptoms, Causes and Treatment",
    seoTitle: "Keratoconus: Symptoms, Causes and Cross-Linking Treatment",
    seoDescription:
      "Keratoconus thins the cornea into a cone shape, usually starting in the teens or twenties. Symptoms, causes, and corneal cross-linking to stop it getting worse.",
    h1: "Keratoconus",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/keratoconus",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Keratoconus thins the cornea into a cone shape. Symptoms, causes and treatment, from Moorfields Eye Hospital.",
    content: `Keratoconus is an eye condition in which the cornea, the clear dome-shaped window at the front of the eye, gets thinner and weaker and develops a cone-shaped bulge. Moorfields Eye Hospital says it normally develops in teenagers or people in their twenties and often gradually gets worse.

Early keratoconus can be detected by your local optometrist, and vision is often unaffected in the very early stages. Moorfields says keratoconus does not cause blindness, and even in advanced cases vision can usually be corrected with contact lenses.`,
    keyFacts: [
      { label: "Usually starts", value: "Teens or twenties" },
      { label: "Detected by", value: "Your optometrist" },
      { label: "Blindness", value: "Does not cause it" },
      { label: "Treatment", value: "Cross-linking can stop it worsening" },
    ],
    sections: [
      {
        heading: "Symptoms of keratoconus",
        items: [
          "Worsening vision and frequent changes to your prescription",
          "Blurring or clouding of vision",
          "Sensitivity and glare from bright lights",
        ],
        links: [
          { label: "Astigmatism", href: "/eye-health/conditions/astigmatism" },
        ],
      },
      {
        heading: "How it affects vision",
        body: `Because the front of the eye is no longer smooth and round, keratoconus causes short sight and astigmatism. In advanced stages some people develop scarring of the cornea. A small number get a sudden, painful loss of vision called hydrops, which Moorfields says settles with time. Sudden painful vision loss always needs urgent help.`,
      },
      {
        heading: "Treatment",
        body: `Glasses or contact lenses correct vision. Corneal cross-linking is a treatment that can stop keratoconus getting worse, and is offered at specialist NHS eye hospitals such as Moorfields.`,
        links: [
          { label: "Contact lens fittings", href: "/find/contact-lens-eye-test" },
          { label: "Corneal treatment providers", href: "/eye-surgery/corneal-conditions" },
        ],
      },
      {
        heading: "Causes",
        body: `The exact cause is unknown, but genetic and environmental factors are thought to play a part. Moorfields estimates around 1 in 10 people with keratoconus have a parent, brother, sister or child with it. It is more common in people with allergic conditions such as asthma and eczema.`,
      },
    ],
    faqs: [
      {
        question: "What is keratoconus?",
        answer:
          "A condition where the cornea thins and weakens and develops a cone-shaped bulge, which affects how the eye focuses.",
      },
      {
        question: "Can keratoconus cause blindness?",
        answer:
          "No. Moorfields Eye Hospital says keratoconus does not cause blindness, and vision can usually be corrected with contact lenses even in advanced cases.",
      },
      {
        question: "How is keratoconus treated?",
        answer:
          "Glasses or contact lenses correct vision, and corneal cross-linking can stop the condition getting worse.",
      },
      {
        question: "Who gets keratoconus?",
        answer:
          "It usually develops in teenagers or people in their twenties, and is more common in people with allergic conditions such as asthma and eczema.",
      },
    ],
    relatedQueries: ["astigmatism", "contact-lens-eye-test", "how-often-eye-test"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information from Moorfields Eye Hospital NHS Foundation Trust, not medical advice. Speak to your optometrist about your own eyes.",
    sources: [
      { label: "Moorfields Eye Hospital: Keratoconus", url: "https://www.moorfields.nhs.uk/eye-conditions/keratoconus" },
      { label: "Moorfields Eye Hospital: Corneal cross-linking", url: "https://moorfields.nhs.uk/eye-conditions/keratoconus/corneal-cross-linking" },
    ],
  },
  {
    slug: "dry-eyes",
    keyword: "dry eyes",
    title: "Dry Eyes: Symptoms, Causes and Treatment",
    seoTitle: "Dry Eyes: Symptoms, Causes and How to Treat Them (NHS Guide)",
    seoDescription:
      "Dry eyes can be itchy, sore, gritty, red or watery. What causes them, how to treat dry eyes yourself, when a pharmacist can help and when to see an optician.",
    h1: "Dry Eyes",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/dry-eye-syndrome",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Dry eyes can be itchy, sore, gritty or watery. Causes, self-care and when to see a pharmacist, optician or GP.",
    content: `You can get dry eyes if you do not make enough tears or your tears dry up quickly. The NHS says dry eyes may be itchy, sore, gritty, red, blurry, sensitive to light, or more watery than normal.

Most people can ease dry eyes with simple changes, and a pharmacist can help. If dry eyes continue after a few weeks of home treatment, see an optician or GP.`,
    keyFacts: [
      { label: "Feels", value: "Itchy, sore, gritty or watery" },
      { label: "First help", value: "A pharmacist" },
      { label: "After a few weeks", value: "See an optician or GP" },
      { label: "Screens", value: "Take regular breaks" },
    ],
    sections: [
      {
        heading: "What makes dry eyes more likely",
        items: [
          "Being over 50",
          "Wearing contact lenses",
          "Looking at screens for a long time without a break",
          "Air-conditioned or heated rooms, or windy, dry or dusty weather",
          "Smoking, smoky places or drinking alcohol",
          "Some medicines, such as some antidepressants or blood pressure medicines",
          "Conditions such as blepharitis, Sjögren's syndrome or lupus",
        ],
        links: [
          { label: "Blepharitis", href: "/eye-health/conditions/blepharitis" },
        ],
      },
      {
        heading: "How to treat dry eyes yourself",
        items: [
          "Clean your eyelids every day",
          "Take breaks when watching TV or using a screen",
          "Keep your computer screen just below eye level",
          "Use a humidifier to stop the air getting dry",
          "If you wear contact lenses, swap to glasses to rest your eyes",
          "Do not stop a prescribed medicine without medical advice, even if you think it is causing symptoms",
        ],
      },
      {
        heading: "When to get help",
        body: `A pharmacist can suggest eye drops, gels or ointments and tell you if you need to see an optician or GP. See an optician or GP if you still have dry eyes after a few weeks of home treatment, or the shape of your eyelids changes. Ask for an urgent GP appointment or help from NHS 111 if your eye is painful and red, or you have a red eye and wear contact lenses. Call 999 or go to A&E if you have changes to your sight, it hurts to look at light, or you have a red eye with a severe headache and feel sick.`,
        links: [
          { label: "Dry eye assessment", href: "/eye-tests/dry-eye-assessment" },
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "What causes dry eyes?",
        answer:
          "Not making enough tears, or tears drying up quickly. Screens, heating, air conditioning, contact lenses, age, some medicines and conditions such as blepharitis can all play a part.",
      },
      {
        question: "Can a pharmacist help with dry eyes?",
        answer:
          "Yes. A pharmacist can suggest eye drops, gels or ointments and tell you whether you need to see an optician or GP.",
      },
      {
        question: "When should I see an optician about dry eyes?",
        answer:
          "If you still have dry eyes after a few weeks of home treatment, or the shape of your eyelids changes.",
      },
      {
        question: "Can screens cause dry eyes?",
        answer:
          "Looking at screens for a long time without a break makes dry eyes more likely. Take regular breaks and keep the screen just below eye level.",
      },
    ],
    relatedQueries: ["blepharitis", "contact-lens-eye-test", "eye-test-what-to-expect"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If your eye is painful and red, get help from NHS 111.",
    sources: [
      { label: "NHS: Dry eyes", url: "https://www.nhs.uk/symptoms/dry-eyes/" },
    ],
  },
  {
    slug: "diabetic-retinopathy",
    keyword: "diabetic retinopathy",
    title: "Diabetic Retinopathy: Symptoms, Screening, Stages and Treatment",
    seoTitle: "Diabetic Retinopathy: Symptoms, Eye Screening, Stages and Treatment",
    seoDescription:
      "Diabetic retinopathy usually has no symptoms at first and is found at diabetic eye screening. The 3 stages, treatment, and how to reduce your risk.",
    h1: "Diabetic Retinopathy",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/diabetic-retinopathy",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Diabetic retinopathy usually has no symptoms at first. Screening, the 3 stages, treatment and how to lower your risk.",
    content: `Diabetic retinopathy happens when high blood glucose damages the blood vessels in the retina at the back of the eye. The NHS says it does not usually have symptoms at first and is usually found at diabetic eye screening.

If you have diabetes and are 12 or over, you are invited for diabetic eye screening every 1 or 2 years. You also need regular eye tests at an optician to check for other problems linked to diabetes, such as glaucoma. People with diabetes are entitled to a free NHS sight test.`,
    keyFacts: [
      { label: "Early symptoms", value: "Usually none" },
      { label: "Screening", value: "Every 1 or 2 years, age 12+" },
      { label: "Eye tests", value: "Free on the NHS with diabetes" },
      { label: "Stages", value: "3" },
    ],
    sections: [
      {
        heading: "Symptoms in later stages",
        items: [
          "Eyesight getting worse",
          "Blurred vision",
          "Dots and lines (floaters) in your vision",
          "Finding it harder to see in the dark or low light",
        ],
      },
      {
        heading: "When to get help",
        body: `Contact a GP, your diabetes care team or an optician if you have diabetes and your eyesight is getting worse, you notice floaters, or you find it hard to see in low light. Ask for an urgent GP appointment or help from NHS 111 if your eyesight suddenly gets worse or you get blurred vision.`,
        links: [
          { label: "Free eye test with diabetes", href: "/find/free-eye-test-diabetes" },
        ],
      },
      {
        heading: "The 3 stages",
        table: {
          caption: "Stages of diabetic retinopathy, from the NHS, checked November 2026",
          headers: ["Stage", "What it means"],
          rows: [
            ["Background", "Some signs of damage to blood vessels, but vision is not affected"],
            ["Pre-proliferative", "More signs of damage and a risk to vision in future. No treatment yet, but more frequent screening"],
            ["Proliferative", "More serious changes that could affect vision. You will need specialist treatment"],
          ],
        },
      },
      {
        heading: "Treatment",
        body: `Treatment aims to stop vision getting worse. Background and pre-proliferative retinopathy are monitored at screening. For proliferative retinopathy, the main treatments are laser treatment, anti-VEGF eye injections, a steroid implant in the eye, or eye surgery.`,
        links: [
          { label: "Diabetic eye disease treatment", href: "/eye-surgery/diabetic-eye-disease" },
        ],
      },
      {
        heading: "Reducing your risk",
        items: [
          "Manage your blood glucose as well as possible",
          "Lower high blood pressure and high cholesterol",
          "Do not smoke",
          "Go to every diabetic eye screening appointment",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the first signs of diabetic retinopathy?",
        answer:
          "Usually there are none at first. It is usually found at diabetic eye screening, which is why going to every appointment matters.",
      },
      {
        question: "How often is diabetic eye screening?",
        answer:
          "If you have diabetes and are 12 or over, you are invited every 1 or 2 years.",
      },
      {
        question: "Is diabetic eye screening the same as an eye test?",
        answer:
          "No. You also need regular eye tests at an optician, which are free on the NHS if you have diabetes.",
      },
      {
        question: "Can diabetic retinopathy be cured?",
        answer:
          "Sight loss from it cannot be cured, but treatment can help stop your vision getting worse.",
      },
    ],
    relatedQueries: ["free-eye-test-diabetes", "how-often-eye-test", "oct-scan-cost"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If your eyesight suddenly gets worse, get urgent help.",
    sources: [
      { label: "NHS: Diabetic retinopathy", url: "https://www.nhs.uk/conditions/diabetic-retinopathy/" },
      { label: "NHS: Diabetic eye screening", url: "https://www.nhs.uk/tests-and-treatments/diabetic-eye-screening/" },
    ],
  },
  {
    slug: "myopia",
    keyword: "short sighted",
    title: "Short-Sightedness (Myopia): Signs, Eye Tests and Treatment",
    seoTitle: "Short-Sightedness (Myopia): Signs in Children, Treatment and Myopia Control",
    seoDescription:
      "Short-sightedness (myopia) usually starts between ages 6 and 13. Signs to look for, free NHS eye tests, glasses and contact lenses, and myopia management.",
    h1: "Short-Sightedness (Myopia)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/myopia",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Short-sightedness usually starts in childhood. Signs, free NHS eye tests, treatment and ways to slow it down.",
    content: `Short-sightedness (myopia) means distant things look blurred. The NHS says it usually starts in children aged 6 to 13, can also happen in adults, often runs in families, and can get worse until the eye stops growing at around age 20.

An optician can check for it with an eye test, and it can usually be corrected with glasses or contact lenses. Eye tests are free on the NHS for children under 16.`,
    keyFacts: [
      { label: "Usually starts", value: "Age 6 to 13" },
      { label: "Found by", value: "An eye test" },
      { label: "Treatment", value: "Glasses or contact lenses" },
      { label: "Children", value: "Free NHS eye tests" },
    ],
    sections: [
      {
        heading: "Signs of short-sightedness",
        items: [
          "Difficulty reading words from a distance, such as the whiteboard at school",
          "Sitting close to the TV or holding a phone or tablet close to the face",
          "Headaches",
          "Rubbing the eyes a lot",
        ],
        links: [
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
      {
        heading: "Treatment",
        body: `Glasses suit children and adults, and contact lenses suit adults and some children. If you need glasses you will get a prescription you can take to any optician. Laser or lens surgery can improve sight in some adults, but the NHS says it is not available on the NHS and can be expensive.`,
        links: [
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
          { label: "Laser eye surgery", href: "/eye-surgery/laser-eye-surgery" },
        ],
      },
      {
        heading: "Slowing it down in children",
        body: `Spending more time outdoors can help stop short-sightedness getting worse, especially for children. An optometrist may talk to you about specially designed glasses or contact lenses for your child, known as myopia management or myopia control. The NHS says this is not available on the NHS as more research is needed.`,
      },
      {
        heading: "Why correcting it matters",
        body: `Young children with uncorrected short-sightedness may be more likely to get a squint or lazy eye. Some adults with severe short-sightedness are more likely to develop glaucoma, a detached retina, cataracts or macular degeneration, so regular eye tests are important.`,
        links: [
          { label: "Glaucoma", href: "/eye-health/conditions/glaucoma" },
          { label: "How often to have an eye test", href: "/eye-health/guides/how-often-should-you-have-an-eye-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "What age does short-sightedness start?",
        answer: "It usually starts in children aged 6 to 13, but can also happen in adults.",
      },
      {
        question: "Can short-sightedness be cured?",
        answer:
          "It can usually be corrected with glasses or contact lenses. Laser or lens surgery can improve sight in some adults but is not available on the NHS.",
      },
      {
        question: "Can you stop a child's myopia getting worse?",
        answer:
          "Spending more time outdoors can help. Myopia management glasses or contact lenses are available from some opticians but not on the NHS.",
      },
      {
        question: "Are children's eye tests free?",
        answer: "Yes. NHS eye tests are free for children under 16 and for 16 to 18 year olds in full-time education.",
      },
    ],
    relatedQueries: ["childrens-eye-test-guide", "how-often-eye-test", "contact-lens-eye-test"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Your optometrist can advise on the best option for you or your child.",
    sources: [
      { label: "NHS: Short-sightedness (myopia)", url: "https://www.nhs.uk/conditions/short-sightedness/" },
    ],
  },
  {
    slug: "colour-blindness",
    keyword: "colour blindness",
    title: "Colour Blindness (Colour Vision Deficiency): Signs, Causes and Living With It",
    seoTitle: "Colour Blindness: Signs, Causes, Tests and Living With It (UK)",
    seoDescription:
      "Colour blindness affects about 1 in 12 men and 1 in 200 women in the UK. Signs in children, causes, how it is tested, and what it means for school, work and driving.",
    h1: "Colour Blindness (Colour Vision Deficiency)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/colour-blindness",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Colour blindness means seeing colours differently. Signs in children, causes, testing and what it means for daily life.",
    content: `Colour vision deficiency, often called colour blindness, means you see colours differently from most people and may find it hard to tell some colours apart. Colour Blind Awareness estimates it affects about 1 in 12 men and 1 in 200 women, around 3 million people in the UK.

Most colour blindness is inherited and present from birth. The NHS says there is no treatment for inherited colour blindness, but most people adapt. If you want your colour vision checked, ask your optician, as it is not part of the routine NHS eye test.`,
    keyFacts: [
      { label: "Affects", value: "About 1 in 12 men, 1 in 200 women" },
      { label: "Usually", value: "Inherited, from birth" },
      { label: "Testing", value: "Ask your optician" },
      { label: "Driving a car", value: "No need to tell the DVLA" },
    ],
    sections: [
      {
        heading: "Signs in children",
        body: `Colour Blind Awareness estimates around 40% of colour blind pupils leave school without knowing. The NHS lists signs including using the wrong colours (such as purple leaves on a tree), finding it hard to sort coloured objects, little interest in colouring, and smelling food before eating it. If your child is colour blind, the NHS suggests telling their school.`,
        links: [
          { label: "Colour blind test", href: "/find/colour-blind-test" },
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
      {
        heading: "Causes",
        body: `As well as being inherited, the NHS says colour vision problems can be caused by eye conditions such as glaucoma, by diabetes, liver disease or multiple sclerosis, by an eye or head injury or a stroke, and by some medicines. If your colour vision changes later in life, see an optician.`,
        links: [
          { label: "Glaucoma", href: "/eye-health/conditions/glaucoma" },
        ],
      },
      {
        heading: "Work and driving",
        body: `GOV.UK says you do not need to tell the DVLA if you are colour blind when driving a car or motorcycle. The NHS notes colour blindness may affect some careers, such as pilot or train driver, so check any colour vision standards before you apply.`,
        links: [
          { label: "DVLA eyesight rules", href: "/eye-tests/dvla-driving-vision-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "How common is colour blindness?",
        answer:
          "Colour Blind Awareness estimates about 1 in 12 men and 1 in 200 women are colour blind, around 3 million people in the UK.",
      },
      {
        question: "Can colour blindness be cured?",
        answer:
          "There is no treatment for inherited colour blindness, according to the NHS, and most people adapt. If it is caused by another condition, treating that may help.",
      },
      {
        question: "How do I get tested for colour blindness?",
        answer:
          "Ask your optician. Colour vision testing is not part of the routine NHS eye test, but you can ask for it.",
      },
      {
        question: "Can you drive if you are colour blind?",
        answer: "Yes. You do not need to tell the DVLA if you are colour blind.",
      },
    ],
    relatedQueries: ["colour-blind-test", "childrens-eye-test-guide", "eye-test-for-driving"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information, not medical advice. If your colour vision changes, see an optician.",
    sources: [
      { label: "NHS: Colour vision deficiency", url: "https://www.nhs.uk/conditions/colour-vision-deficiency/" },
      { label: "Colour Blind Awareness: Colour blindness", url: "https://www.colourblindawareness.org/colour-blindness/" },
      { label: "GOV.UK: Driving eyesight rules", url: "https://www.gov.uk/driving-eyesight-rules" },
    ],
  },
  {
    slug: "squint",
    keyword: "squint",
    title: "Squint (Strabismus): Signs, When to Get Advice and Treatment",
    seoTitle: "Squint (Strabismus) in Children and Adults: Signs and Treatment (NHS)",
    seoDescription:
      "A squint is where the eyes point in different directions. When to get advice for a baby or child, why early treatment matters, and glasses, patches and surgery.",
    h1: "Squint (Strabismus)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/strabismus",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A squint is where the eyes point in different directions. When to get advice and how it is treated.",
    content: `A squint, also called strabismus, is where the eyes point in different directions. One eye may turn in, out, up or down while the other looks ahead, all the time or on and off. The NHS says it is particularly common in young children but can happen at any age.

Treatment is usually recommended, as a squint is unlikely to get better on its own and could cause further problems if not treated early. A GP, health visitor or optician can refer you to an eye specialist.`,
    keyFacts: [
      { label: "Common in", value: "Young children" },
      { label: "Babies", value: "On-and-off squints common under 3 months" },
      { label: "Referral", value: "GP, health visitor or optician" },
      { label: "Treatment", value: "Glasses, patches, exercises, surgery" },
    ],
    sections: [
      {
        heading: "When to get advice",
        items: [
          "Your child has a squint all the time",
          "Your child is older than 3 months and has a squint that comes and goes",
          "You are worried about your child's vision, for example they often turn their head to one side or close one eye to look at things",
          "You develop a squint or double vision later in life",
        ],
        links: [
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
      {
        heading: "Treatment",
        body: `The NHS describes the main treatments:`,
        items: [
          "Glasses, if the squint is caused by a sight problem such as long-sightedness",
          "Eye exercises, which may sometimes help the eyes work together",
          "Surgery to move the eye muscles so the eyes line up, if glasses are not enough on their own",
          "Injections into the eye muscles, though the effect usually lasts less than 3 months",
        ],
      },
      {
        heading: "Why early treatment matters",
        body: `Left untreated, a squint can lead to blurred or double vision, a lazy eye where the brain ignores the affected eye, and embarrassment or low self-esteem. If a child has a lazy eye, it may be treated first, usually with a patch over the stronger eye. A squint can rarely be a sign of a childhood eye cancer called retinoblastoma, so the NHS advises taking a child with a squint to a GP.`,
      },
      {
        heading: "Causes",
        body: `The exact cause is not always known. In children, a squint is often the eye trying to overcome a sight problem such as short-sightedness, long-sightedness or astigmatism. Squints can run in families.`,
        links: [
          { label: "Long-sightedness", href: "/eye-health/conditions/hyperopia" },
          { label: "Short-sightedness", href: "/eye-health/conditions/myopia" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is a squint normal in babies?",
        answer:
          "A squint that comes and goes is common in babies younger than 3 months. Get advice if it is there all the time or continues after 3 months.",
      },
      {
        question: "Will a squint go away on its own?",
        answer: "It is unlikely to. Treatment is usually recommended so it does not cause further problems.",
      },
      {
        question: "How is a squint treated?",
        answer:
          "With glasses, eye exercises, surgery on the eye muscles, or injections into the eye muscles. A lazy eye may be treated first with a patch.",
      },
      {
        question: "Can adults get a squint?",
        answer: "Yes. If you develop a squint or double vision later in life, get medical advice.",
      },
    ],
    relatedQueries: ["childrens-eye-test-guide", "free-eye-test-children", "eye-test-what-to-expect"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If you are worried about your child's eyes, see a GP, health visitor or optician.",
    sources: [
      { label: "NHS: Squint", url: "https://www.nhs.uk/conditions/squint/" },
    ],
  },
  {
    slug: "long-sighted",
    keyword: "long sighted",
    title: "Long-Sightedness (Hyperopia): Symptoms and Treatment",
    seoTitle: "Long-Sightedness (Hyperopia): Symptoms, Eye Tests and Treatment (NHS)",
    seoDescription:
      "Long-sightedness makes nearby things blurry while distant things look clear. Symptoms, free NHS eye tests, glasses, contact lenses and surgery options.",
    h1: "Long-Sightedness (Hyperopia)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/hyperopia",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Long-sightedness makes nearby things blurry. Symptoms, eye tests and treatment options.",
    content: `Long-sightedness, also called hypermetropia or hyperopia, is where you find it hard to see things nearby but can see things far away clearly. The NHS says it is common, can happen at any age but often affects people over 40, and glasses or contact lenses can usually correct it.

It is often passed on from parents and cannot be prevented. An optometrist can check for it with a routine eye test.`,
    keyFacts: [
      { label: "Hard to see", value: "Nearby things" },
      { label: "Often affects", value: "People over 40" },
      { label: "Treatment", value: "Glasses or contact lenses" },
      { label: "Surgery", value: "Not usually on the NHS" },
    ],
    sections: [
      {
        heading: "Symptoms",
        items: [
          "Nearby things, such as words on a page or screen, look fuzzy",
          "Seeing things more clearly when you move them further away",
          "Tired eyes after reading or computer work",
          "Headaches",
        ],
      },
      {
        heading: "Treatment",
        body: `Glasses or contact lenses usually correct long-sightedness. Contact lenses are usually only suitable for adults. Some people may be able to have laser eye surgery or lens replacement surgery, both done under local anaesthetic, but the NHS says these are not usually available on the NHS.`,
        links: [
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
          { label: "Laser eye surgery", href: "/eye-surgery/laser-eye-surgery" },
        ],
      },
      {
        heading: "Causes and complications",
        body: `Long-sightedness happens when the eyes cannot focus properly, because of the shape of the eye or cornea, or the lens becoming stiffer with age (presbyopia). Young children with severe long-sightedness are more likely to develop a lazy eye or squint, so children's eye tests matter.`,
        links: [
          { label: "Presbyopia", href: "/eye-health/conditions/presbyopia" },
          { label: "Squint", href: "/eye-health/conditions/strabismus" },
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "What is long-sightedness?",
        answer: "Finding it hard to see things nearby while things far away look clear.",
      },
      {
        question: "Can long-sightedness be corrected?",
        answer: "Yes. Glasses or contact lenses usually correct it. Laser or lens surgery may suit some adults but is not usually available on the NHS.",
      },
      {
        question: "Is long-sightedness the same as presbyopia?",
        answer:
          "Not quite. Presbyopia is the lens becoming stiffer with age, which is one cause of finding close things hard to see.",
      },
      {
        question: "Who gets a free NHS eye test?",
        answer:
          "Including children under 16, 16 to 18 year olds in full-time education, people aged 60 or over, and people with diabetes or glaucoma.",
      },
    ],
    relatedQueries: ["presbyopia", "free-eye-test", "how-often-eye-test"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Your optometrist can advise on the best option for you.",
    sources: [
      { label: "NHS: Long-sightedness", url: "https://www.nhs.uk/conditions/long-sightedness/" },
    ],
  },
  {
    slug: "presbyopia",
    keyword: "presbyopia",
    title: "Presbyopia: Why Reading Gets Harder With Age",
    seoTitle: "Presbyopia: Why Close-Up Vision Changes With Age and How to Correct It",
    seoDescription:
      "Presbyopia makes it harder to focus on close things like phones and menus, usually from your late 30s or 40s. How reading glasses, varifocals and contact lenses help.",
    h1: "Presbyopia",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/presbyopia",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Presbyopia makes close-up focusing harder with age. Signs and how glasses and contact lenses correct it.",
    content: `Presbyopia is when you can no longer focus on things at normal reading distance, such as your phone or the print on packaging. The College of Optometrists says it is a natural part of ageing as the lens in your eye loses its elasticity, and it happens to everyone, even people who have never had a problem with their eyesight.

It usually becomes noticeable in your late 30s or early 40s. An eye test will show whether you need reading glasses or a different prescription.`,
    keyFacts: [
      { label: "Usually noticed", value: "Late 30s or early 40s" },
      { label: "Affects", value: "Everyone eventually" },
      { label: "Correction", value: "Reading glasses, bifocals or varifocals" },
      { label: "Free NHS eye test", value: "From age 60" },
    ],
    sections: [
      {
        heading: "Signs of presbyopia",
        items: [
          "Difficulty focusing on close things like menus, phone screens and books, especially in dim light",
          "Over time, things further away such as computer screens becoming blurry too",
          "Taking longer to change focus between near and far",
        ],
      },
      {
        heading: "How it is corrected",
        body: `The College of Optometrists says presbyopia is usually managed with glasses or contact lenses:`,
        items: [
          "Single vision reading glasses",
          "Bifocal or varifocal glasses, if you also need glasses for distance and do not want to swap",
          "Bifocal or varifocal contact lenses, which work well for some people",
          "Monovision, with one eye corrected for distance and the other for reading",
        ],
        links: [
          { label: "Contact lens fittings", href: "/find/contact-lens-eye-test" },
          { label: "Eye test prices", href: "/find/eye-test-cost" },
        ],
      },
    ],
    faqs: [
      {
        question: "What age does presbyopia start?",
        answer: "It usually becomes noticeable in your late 30s or early 40s.",
      },
      {
        question: "Can presbyopia be prevented?",
        answer: "No. It is a natural part of ageing and happens to everyone.",
      },
      {
        question: "Do I need reading glasses or varifocals?",
        answer:
          "Reading glasses help with close work. If you also need glasses for distance, bifocals or varifocals save swapping. An optician can advise after an eye test.",
      },
      {
        question: "Can contact lenses correct presbyopia?",
        answer:
          "Yes for some people, with bifocal or varifocal contact lenses or monovision, where one eye is corrected for distance and the other for reading.",
      },
    ],
    relatedQueries: ["long-sighted", "contact-lens-eye-test", "free-eye-test-over-60"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information from the College of Optometrists, not medical advice. Your optometrist can advise on the best option for you.",
    sources: [
      { label: "College of Optometrists: Presbyopia", url: "https://lookafteryoureyes.org/eye-conditions/presbyopia/" },
    ],
  },
  {
    slug: "red-eye",
    keyword: "red eye",
    title: "Red Eye: Common Causes and When to Get Help",
    seoTitle: "Red Eye: Common Causes, What to Do and When It Is Urgent (NHS)",
    seoDescription:
      "A red eye is often caused by an infection or dry eyes. Common causes, what to do at home, when to see a pharmacist, optician or GP, and when to go to A&E.",
    h1: "Red Eye",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/red-eye",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A red eye is often caused by an infection or dry eyes. Causes, self-care and when it is urgent.",
    content: `A red eye is often caused by an infection or dry eyes, but there are lots of possible causes, and the NHS advises not trying to diagnose it yourself.

If your eye does not hurt, your sight is not affected and you do not feel sick or unwell, it is probably nothing serious and may get better on its own in a few days. Until then, try not to touch or rub your eye, and do not wear contact lenses.`,
    keyFacts: [
      { label: "Common causes", value: "Infection or dry eyes" },
      { label: "No pain, sight fine", value: "Probably not serious" },
      { label: "First help", value: "A pharmacist" },
      { label: "Contact lens wearer", value: "Get an urgent appointment" },
    ],
    sections: [
      {
        heading: "Common causes of a red eye",
        table: {
          caption: "Common causes of red eyes, from the NHS, checked November 2026",
          headers: ["Symptoms", "Possible cause"],
          rows: [
            ["Bright red area in the white of the eye", "Burst blood vessel"],
            ["Gritty or burning feeling, sticky eyes", "Conjunctivitis"],
            ["Sore, blurry or watery eyes", "Dry eyes"],
            ["Itchy, sore or red crusted eyelids", "Blepharitis"],
            ["Feels like something is in your eye, or an eyelash problem", "Ingrowing eyelash"],
            ["Swollen, drooping or twitching eyelid, or a lump on the eyelid", "Eyelid problems"],
          ],
        },
        links: [
          { label: "Conjunctivitis", href: "/eye-health/conditions/conjunctivitis" },
          { label: "Dry eyes", href: "/eye-health/conditions/dry-eye-syndrome" },
          { label: "Blepharitis", href: "/eye-health/conditions/blepharitis" },
        ],
      },
      {
        heading: "When to see a GP or optician",
        items: [
          "Your child is under 2 and has a red eye",
          "You have red eyes with a sticky discharge",
          "You have red patches in your eye or a problem with your eyelids or lashes for more than a few days",
          "You are worried about your eyes",
        ],
      },
      {
        heading: "When it is urgent",
        body: `Ask for an urgent GP or optician appointment, or get help from NHS 111, if your baby is less than 28 days old and has red eyes, your eye is very painful and red, or you have a red eye and wear contact lenses. Call 999 or go to A&E if you have a red eye and any change to your sight, it hurts to look at light, you have a severe headache and feel sick, your eye is very dark red, you have injured your eye or something is stuck in it, a chemical caused it, or one pupil is bigger than the other.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is a red eye serious?",
        answer:
          "Usually not if it does not hurt, your sight is fine and you feel well. It may get better in a few days. Pain, sight changes or a red eye with contact lenses need urgent help.",
      },
      {
        question: "What causes a red eye?",
        answer:
          "Common causes include a burst blood vessel, conjunctivitis, dry eyes, blepharitis, an ingrowing eyelash and eyelid problems.",
      },
      {
        question: "Can a pharmacist help with a red eye?",
        answer:
          "Yes. A pharmacist can suggest cleaning solutions, eye drops or medicines and tell you if you need to see a GP or optician.",
      },
      {
        question: "Should I wear contact lenses with a red eye?",
        answer: "No. If you wear contact lenses and have a red eye, get an urgent GP or optician appointment as it could be an infection.",
      },
    ],
    relatedQueries: ["conjunctivitis", "dry-eyes", "emergency-eye-test-near-me"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. A painful red eye or changes to your sight need urgent help.",
    sources: [
      { label: "NHS: Red eye", url: "https://www.nhs.uk/symptoms/red-eye/" },
    ],
  },
  {
    slug: "stye",
    keyword: "stye",
    title: "Stye: Symptoms, Home Treatment and When to See a GP",
    seoTitle: "Stye on the Eye: Symptoms, How to Treat It and When to Get Help (NHS)",
    seoDescription:
      "A stye is a small, painful lump on the eyelid. How to treat a stye at home with a warm compress, why not to burst it, when to see a GP and how to prevent styes.",
    h1: "Stye",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/stye",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A stye is a small, painful lump on the eyelid. Home treatment, when to see a GP and how to prevent them.",
    content: `A stye is a small, painful lump on or inside the eyelid or around the eye. The NHS says the skin around it may be swollen and red, the stye may be filled with yellow pus, and your eye may be red and watery, but your vision should not be affected. A stye usually only affects one eye.

Most styes can be treated at home. If there is no lump, it is more likely to be conjunctivitis or blepharitis, and a hard lump that is not very painful is more likely to be a chalazion.`,
    keyFacts: [
      { label: "What it is", value: "A small, painful eyelid lump" },
      { label: "Treatment", value: "Warm compress 2 to 4 times a day" },
      { label: "Do not", value: "Burst it yourself" },
      { label: "Not better in a few weeks", value: "See a GP" },
    ],
    sections: [
      {
        heading: "How to treat a stye yourself",
        items: [
          "Soak a clean flannel in warm water and hold it against your eye for 5 to 10 minutes",
          "Repeat 2 to 4 times a day",
          "Take paracetamol or ibuprofen for pain (do not give aspirin to children under 16)",
          "Avoid contact lenses and eye make-up until the stye has burst and healed",
          "Do not try to burst a stye or remove an eyelash yourself, as this can spread the infection",
        ],
      },
      {
        heading: "When to get help",
        body: `See a GP if a stye does not get better within a few weeks. Ask for an urgent GP appointment or get help from NHS 111 if it is very painful or swollen, affects your vision, your eye is producing pus, or the infection has spread to your eye or eyelid. A GP may burst the stye with a sterile needle, remove the nearest eyelash, or refer you to an eye specialist.`,
        links: [
          { label: "Chalazion", href: "/eye-health/conditions/chalazion" },
          { label: "Swollen eyelid", href: "/eye-health/conditions/swollen-eyelid" },
        ],
      },
      {
        heading: "Preventing styes",
        body: `Styes are often caused by bacteria infecting an eyelash follicle or eyelid gland, and are more likely if you have long-term blepharitis or rosacea.`,
        items: [
          "Wash your face and remove eye make-up before bed",
          "Keep your eyelids and lashes clean, especially if you have blepharitis",
          "Wash your hands before touching contact lenses",
          "Do not share towels or flannels with someone who has a stye",
        ],
        links: [
          { label: "Blepharitis", href: "/eye-health/conditions/blepharitis" },
        ],
      },
    ],
    faqs: [
      {
        question: "How do you get rid of a stye?",
        answer:
          "Hold a warm, clean flannel against your eye for 5 to 10 minutes, 2 to 4 times a day. Do not try to burst it.",
      },
      {
        question: "Should I pop a stye?",
        answer: "No. Bursting a stye or pulling out an eyelash yourself can spread the infection.",
      },
      {
        question: "What is the difference between a stye and a chalazion?",
        answer:
          "A stye is usually painful. A hard lump that is not very painful is more likely to be a chalazion.",
      },
      {
        question: "When should I see a GP about a stye?",
        answer:
          "If it does not get better within a few weeks. Get urgent help if it is very painful or swollen, affects your vision or the infection spreads.",
      },
    ],
    relatedQueries: ["chalazion", "blepharitis", "swollen-eyelid"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If a stye affects your vision, get urgent help.",
    sources: [
      { label: "NHS: Stye", url: "https://www.nhs.uk/conditions/stye/" },
    ],
  },
  {
    slug: "chalazion",
    keyword: "chalazion",
    title: "Chalazion (Eyelid Cyst): Symptoms, Treatment and Stye vs Chalazion",
    seoTitle: "Chalazion: Eyelid Cyst Symptoms, Treatment and How It Differs From a Stye",
    seoDescription:
      "A chalazion is a harmless lump in the eyelid caused by a blocked oil gland. Symptoms, home treatment, when surgery is used, and how it differs from a stye.",
    h1: "Chalazion (Meibomian Cyst)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/chalazion",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A chalazion is a harmless eyelid lump from a blocked oil gland. Symptoms, treatment and how it differs from a stye.",
    content: `A chalazion is a harmless cyst in the eyelid caused by a blocked meibomian gland, one of the glands that make oil to keep the eye moist. Moorfields Eye Hospital says the oil builds up into a small lump, which can become irritated and red and occasionally infected.

Chalazions tend to last a few weeks, are typically not painful, do not affect your sight, and can often be treated at home.`,
    keyFacts: [
      { label: "What it is", value: "A blocked eyelid oil gland" },
      { label: "Painful", value: "Usually not" },
      { label: "Lasts", value: "Usually a few weeks" },
      { label: "Sight", value: "Not affected" },
    ],
    sections: [
      {
        heading: "Chalazion vs stye",
        table: {
          headers: ["", "Stye", "Chalazion"],
          rows: [
            ["Pain", "Usually painful and sore", "Typically painless"],
            ["Cause", "Infection in a hair follicle or oil gland", "A blocked oil gland"],
          ],
        },
        links: [
          { label: "Stye", href: "/eye-health/conditions/stye" },
        ],
      },
      {
        heading: "Treatment",
        body: `Many chalazions can be treated at home with warm compresses and eyelid cleaning. A doctor may occasionally prescribe antibiotic ointment or drops for irritation, or antibiotics by mouth if infection spreads, though Moorfields notes medicine does not make the cyst disappear. If a large cyst does not respond, it can be drained under local anaesthetic through a small cut on the inside of the eyelid, usually as a day case.`,
        links: [
          { label: "Blepharitis", href: "/eye-health/conditions/blepharitis" },
          { label: "Eyelid surgery", href: "/eye-surgery/eyelid-surgery" },
        ],
      },
      {
        heading: "Causes",
        body: `A chalazion commonly happens because of inflammation around the openings of the oil glands at the base of the lashes, called blepharitis. Rosacea is another risk factor.`,
      },
      {
        heading: "Chalazion in children",
        body: `Most cysts in children go away with time, which can take weeks or months, and are usually safe to leave. Moorfields says surgery in children is usually not medically necessary. Seek advice if your child has increasing redness and soreness of the eye, very blurred vision, or spreading redness with a lot of eyelid swelling.`,
      },
    ],
    faqs: [
      {
        question: "Is a chalazion serious?",
        answer: "No. A chalazion is a harmless cyst caused by a blocked oil gland, and usually goes within a few weeks.",
      },
      {
        question: "How do I get rid of a chalazion?",
        answer:
          "Warm compresses and eyelid cleaning help many chalazions at home. Large ones that do not settle can be drained under local anaesthetic.",
      },
      {
        question: "Is a chalazion the same as a stye?",
        answer: "No. A stye is usually painful and caused by infection; a chalazion is usually painless and caused by a blocked gland.",
      },
      {
        question: "Does a chalazion affect your sight?",
        answer: "No. Sight is not usually affected.",
      },
    ],
    relatedQueries: ["stye", "blepharitis", "swollen-eyelid"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information from Moorfields Eye Hospital NHS Foundation Trust, not medical advice. See a pharmacist, optician or GP if you are worried.",
    sources: [
      { label: "Moorfields Eye Hospital: Chalazion", url: "https://www.moorfields.nhs.uk/eye-conditions/chalazion" },
      { label: "NHS: Eyelid problems", url: "https://www.nhs.uk/symptoms/eyelid-problems/" },
    ],
  },
  {
    slug: "eye-twitching",
    keyword: "eye twitching",
    title: "Eye Twitching: Causes and When to See a GP",
    seoTitle: "Eye Twitching: Why It Happens, How to Stop It and When to See a GP",
    seoDescription:
      "Eye twitches are common and very rarely serious. Common triggers like stress, tiredness and caffeine, how to help stop a twitch, and when to see a GP.",
    h1: "Eye Twitching",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/eye-twitching",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Eye twitches are common and very rarely serious. Triggers, self-help and when to see a GP.",
    content: `Twitches are common and very rarely a sign of anything serious. The NHS says twitches in the eyes are particularly common, often go away on their own, and normally stop within a few days or weeks.

There is not usually any treatment, but a few changes can help. See a GP if a twitch lasts more than 2 weeks.`,
    keyFacts: [
      { label: "Serious", value: "Very rarely" },
      { label: "Usually stops", value: "In days or weeks" },
      { label: "Common triggers", value: "Stress, tiredness, caffeine" },
      { label: "More than 2 weeks", value: "See a GP" },
    ],
    sections: [
      {
        heading: "Common causes",
        items: [
          "Stress and anxiety",
          "Tiredness and exhaustion",
          "Caffeine or alcohol",
          "Some medicines (check the leaflet for side effects)",
        ],
      },
      {
        heading: "How to help stop a twitch",
        items: [
          "Get plenty of rest",
          "Find ways to relax",
          "Cut down on tea, coffee and alcohol",
          "Try not to worry, as worrying can make it worse",
          "Do not stop a prescribed medicine without medical advice",
        ],
      },
      {
        heading: "When to see a GP",
        body: `See a GP if a twitch lasts more than 2 weeks, you have twitches in more than one place, the area feels weak or stiff, or you think a prescribed medicine might be causing it. A GP may look for causes such as stress or medicines and, if it does not stop, refer you to a neurologist.`,
        links: [
          { label: "Eye strain and screens", href: "/eye-health/guides/screen-time-and-eye-health" },
        ],
      },
    ],
    faqs: [
      {
        question: "Why is my eye twitching?",
        answer: "Eye twitches are often linked to stress, tiredness, caffeine, alcohol or some medicines.",
      },
      {
        question: "Is eye twitching serious?",
        answer: "Very rarely. Most twitches stop on their own within days or weeks.",
      },
      {
        question: "How do I stop my eye twitching?",
        answer: "Rest, relax, and cut down on caffeine and alcohol. There is not usually any treatment.",
      },
      {
        question: "When should I see a doctor about eye twitching?",
        answer:
          "If it lasts more than 2 weeks, happens in more than one place, or the area feels weak or stiff.",
      },
    ],
    relatedQueries: ["headaches-and-vision", "dry-eyes", "eye-test-what-to-expect"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. See a GP if a twitch lasts more than 2 weeks.",
    sources: [
      { label: "NHS: Twitching eyes and muscles", url: "https://www.nhs.uk/symptoms/twitching-eyes-and-muscles/" },
    ],
  },
  {
    slug: "uveitis",
    keyword: "uveitis",
    title: "Uveitis: Symptoms, Causes and Urgent Treatment",
    seoTitle: "Uveitis: Symptoms, Causes and Why It Needs Urgent Treatment (NHS)",
    seoDescription:
      "Uveitis is inflammation inside the eye causing pain, redness, blurred vision and light sensitivity. Why it needs urgent treatment, causes and how it is treated.",
    h1: "Uveitis",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/uveitis",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Uveitis is inflammation inside the eye. Symptoms, why it needs urgent treatment, causes and treatment.",
    content: `Uveitis is inflammation inside the eye. The NHS says it is important to get it treated early to avoid long-term complications such as vision loss. It usually gets better quickly with treatment but can come back.

It usually affects one eye but can affect both. Symptoms can come on over hours or days, or more gradually, and sometimes there are none.`,
    keyFacts: [
      { label: "What it is", value: "Inflammation inside the eye" },
      { label: "Symptoms", value: "Get urgent advice" },
      { label: "Loss of vision", value: "Go to A&E or call 999" },
      { label: "Specialist", value: "Usually seen within 24 hours" },
    ],
    sections: [
      {
        heading: "Symptoms of uveitis",
        items: [
          "Eye pain, which may feel worse when reading",
          "Red or watery eyes",
          "Reduced or blurred vision",
          "Sensitivity to light",
          "Flashes and floaters",
        ],
        links: [
          { label: "Red eye", href: "/eye-health/conditions/red-eye" },
          { label: "Floaters and flashes", href: "/eye-health/conditions/floaters-and-flashes" },
        ],
      },
      {
        heading: "When to get help",
        body: `Ask for an urgent GP appointment or get help from NHS 111 if you have eye pain, sensitivity to light, changes in your vision such as flashing or blurring, or very red eyes. Go to A&E or call 999 if you cannot see. If a GP thinks you have uveitis, they will refer you to an eye specialist, and you will usually be seen within 24 hours.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
      {
        heading: "Causes",
        body: `In most cases the cause is unknown. The NHS says it can be caused by autoimmune conditions such as multiple sclerosis and ankylosing spondylitis, some infections including herpes viruses and toxoplasmosis, an eye injury, or rarely a growth in the eye.`,
      },
      {
        heading: "Treatment",
        body: `You will usually be prescribed medicines to clear any infection, reduce inflammation, and relax the eye to ease pain. If uveitis is severe or keeps coming back, other treatments include medicines that calm the immune system, laser light treatment, cryotherapy or surgery. An ophthalmologist will check how treatment is working.`,
      },
    ],
    faqs: [
      {
        question: "Is uveitis serious?",
        answer:
          "It needs treating early to avoid complications such as vision loss. It usually gets better quickly with treatment.",
      },
      {
        question: "What are the symptoms of uveitis?",
        answer:
          "Eye pain, red or watery eyes, blurred vision, sensitivity to light, and flashes or floaters.",
      },
      {
        question: "What causes uveitis?",
        answer:
          "Often the cause is unknown. It can be linked to autoimmune conditions, some infections or an eye injury.",
      },
      {
        question: "Where should I go with uveitis symptoms?",
        answer:
          "Ask for an urgent GP appointment or call NHS 111. If you cannot see, go to A&E or call 999.",
      },
    ],
    relatedQueries: ["red-eye", "emergency-eye-test-near-me", "floaters-in-vision"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Uveitis symptoms need urgent advice.",
    sources: [
      { label: "NHS: Uveitis", url: "https://www.nhs.uk/conditions/uveitis/" },
    ],
  },
  {
    slug: "swollen-eyelid",
    keyword: "swollen eyelid",
    title: "Swollen Eyelid: Common Causes and When It Is Urgent",
    seoTitle: "Swollen Eyelid: Causes, What to Do and When to Get Urgent Help (NHS)",
    seoDescription:
      "A swollen eyelid is often caused by a stye, chalazion, allergy or blepharitis. Common causes, when a pharmacist can help and when swelling needs urgent advice.",
    h1: "Swollen Eyelid",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/swollen-eyelid",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A swollen eyelid is often caused by a stye, allergy or blepharitis. Causes and when it is urgent.",
    content: `Many eyelid problems are not serious. The NHS says it is fairly common to have a lump that goes away by itself, mildly itchy or sticky eyelids that clear up, or swelling from an insect bite, injury or operation that goes within a week or so.

The NHS advises not diagnosing it yourself. A pharmacist, GP or optician can help, and some symptoms need urgent advice.`,
    keyFacts: [
      { label: "Often", value: "Not serious" },
      { label: "First help", value: "A pharmacist" },
      { label: "Red, hot and painful", value: "Get urgent advice" },
      { label: "Sudden droop", value: "Get urgent advice" },
    ],
    sections: [
      {
        heading: "Common causes",
        table: {
          caption: "Common eyelid problems, from the NHS, checked November 2026",
          headers: ["Eyelid problem", "Possible cause"],
          rows: [
            ["Lump or swelling on the eyelid", "Stye or chalazion"],
            ["Itchy, flaky, sticky or swollen eyelid", "Allergy, blepharitis or conjunctivitis"],
            ["Yellow lump or patch", "Xanthelasma (sometimes linked to high cholesterol)"],
            ["Eyelid turning outwards or inwards", "Ectropion or entropion"],
            ["Hot, painful and swollen eyelid", "Cellulitis"],
          ],
        },
        links: [
          { label: "Stye", href: "/eye-health/conditions/stye" },
          { label: "Chalazion", href: "/eye-health/conditions/chalazion" },
          { label: "Blepharitis", href: "/eye-health/conditions/blepharitis" },
        ],
      },
      {
        heading: "When to see a GP",
        body: `See a GP if you are worried, your symptoms are not improving or are lasting a long time, or you have yellow lumps or patches around your eyes. A pharmacist can advise on treating common problems like a stye or conjunctivitis yourself.`,
      },
      {
        heading: "When it is urgent",
        body: `Ask for an urgent GP or optician appointment, or get help from NHS 111, if your swollen eyelid is red, hot, painful, tender or blistered, your eyelid droops suddenly, you cannot open your eye, the pain is in your eye rather than the eyelid, the white of your eye is very red, you have a headache or feel sick, your sight changes, you have a high temperature or feel unwell, or you think it is an allergic reaction.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
    ],
    faqs: [
      {
        question: "Why is my eyelid swollen?",
        answer:
          "Common causes include a stye or chalazion, an allergy, blepharitis, conjunctivitis, or an insect bite or injury.",
      },
      {
        question: "Is a swollen eyelid serious?",
        answer:
          "Often not. Get urgent advice if it is red, hot and painful, droops suddenly, affects your sight or you feel unwell.",
      },
      {
        question: "Can a pharmacist help with a swollen eyelid?",
        answer: "Yes, for common problems like a stye or conjunctivitis, and they can tell you if you need a GP or optician.",
      },
    ],
    relatedQueries: ["stye", "chalazion", "blepharitis"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. A red, hot, painful eyelid needs urgent advice.",
    sources: [
      { label: "NHS: Eyelid problems", url: "https://www.nhs.uk/symptoms/eyelid-problems/" },
    ],
  },
  {
    slug: "lazy-eye",
    keyword: "lazy eye",
    title: "Lazy Eye (Amblyopia): Signs, Eye Tests and Treatment",
    seoTitle: "Lazy Eye in Children: Signs, Patches, Glasses and When to Treat (NHS)",
    seoDescription:
      "A lazy eye is where vision does not develop properly in one eye. Signs to look for in children, free NHS eye tests, and treatment with glasses, patches or drops.",
    h1: "Lazy Eye (Amblyopia)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/lazy-eye",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A lazy eye is where vision does not develop properly in one eye. Signs, eye tests and treatment.",
    content: `A lazy eye is where the vision in one eye does not develop properly. The NHS says it does not always cause symptoms and is often first found during an eye test. Many children do not notice anything wrong with their vision.

Treatment aims to improve vision in the weaker eye and should ideally start before the age of 7, while vision is still developing. Eye tests are free on the NHS for children under 16.`,
    keyFacts: [
      { label: "Often found at", value: "An eye test" },
      { label: "Best treated", value: "Before age 7" },
      { label: "Treatment", value: "Glasses, patches or drops" },
      { label: "Children's eye tests", value: "Free on the NHS" },
    ],
    sections: [
      {
        heading: "Signs of a lazy eye",
        items: [
          "Shutting one eye or squinting when looking at things",
          "Eyes pointing in different directions (a squint)",
          "Not being able to follow an object or person with the eyes",
          "Tilting the head when looking at something",
          "Tired eyes, rubbing the eyes a lot, or headaches",
          "Difficulty catching or throwing, or tripping over a lot",
          "Blinking a lot",
        ],
      },
      {
        heading: "A simple check at home",
        body: `The NHS suggests checking a younger child's eyes by covering each eye with your hand, one at a time. They may complain if you cover their good eye. Older children may say they cannot see as well with one eye. Go to an optician if you are worried, or if you or your child have not had an eye test for 2 years.`,
        links: [
          { label: "Children's eye tests", href: "/eye-tests/childrens-eye-test" },
        ],
      },
      {
        heading: "Treatment",
        body: `Treatment depends on the cause and may include:`,
        items: [
          "Glasses to correct vision",
          "An eye patch over the stronger eye for a few hours a day for several months, usually with glasses",
          "Eye drops that temporarily blur vision in the stronger eye",
          "Surgery if the lazy eye is caused by cataracts or a drooping eyelid, or to straighten a squint",
        ],
        links: [
          { label: "Squint", href: "/eye-health/conditions/strabismus" },
          { label: "NHS optical vouchers", href: "/find/nhs-optical-voucher" },
        ],
      },
    ],
    faqs: [
      {
        question: "What age should a lazy eye be treated?",
        answer: "Ideally before age 7, while vision is still developing.",
      },
      {
        question: "How is a lazy eye treated?",
        answer: "With glasses, a patch over the stronger eye, or eye drops that blur the stronger eye. Sometimes surgery is needed.",
      },
      {
        question: "Can I check my child for a lazy eye?",
        answer: "Cover each eye one at a time. If your child complains when you cover their good eye, book an eye test.",
      },
      {
        question: "Are children's eye tests free?",
        answer: "Yes, for children under 16, and 16 to 18 year olds in full-time education.",
      },
    ],
    relatedQueries: ["squint", "childrens-eye-test-guide", "free-eye-test-children"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. If you are worried about your child's eyes, see an optician.",
    sources: [
      { label: "NHS: Lazy eye", url: "https://www.nhs.uk/conditions/lazy-eye/" },
    ],
  },
  {
    slug: "retinal-detachment",
    keyword: "retinal detachment",
    title: "Detached Retina: Symptoms, Urgent Help and Surgery",
    seoTitle: "Detached Retina (Retinal Detachment): Symptoms and Urgent Treatment",
    seoDescription:
      "A detached retina needs treating quickly to protect your sight. Warning signs like sudden floaters, flashes or a shadow, surgery, recovery and who is more at risk.",
    h1: "Detached Retina (Retinal Detachment)",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/retinal-detachment",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "A detached retina needs treating quickly. Warning signs, surgery, recovery and risk factors.",
    content: `A detached retina is when the thin layer at the back of your eye, the retina, becomes loose. The NHS says it needs to be treated quickly to stop it permanently affecting your sight.

If you notice sudden floaters, flashes of light, a dark curtain or shadow across your vision, or suddenly blurred vision, get help from NHS 111 straight away.`,
    keyFacts: [
      { label: "Urgency", value: "Needs treating quickly" },
      { label: "Warning signs", value: "Floaters, flashes, a shadow" },
      { label: "Get help", value: "NHS 111 straight away" },
      { label: "Treatment", value: "Surgery in hospital" },
    ],
    sections: [
      {
        heading: "Get help from NHS 111 if",
        items: [
          "Floaters suddenly appear or suddenly increase in number",
          "You get flashes of light in your vision",
          "A dark curtain or shadow moves across your vision",
          "Your vision suddenly gets blurred",
        ],
        links: [
          { label: "Floaters and flashes", href: "/eye-health/conditions/floaters-and-flashes" },
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
      {
        heading: "Treatment and recovery",
        body: `If tests show your retina may be detached or torn, you will be referred to hospital for surgery, which usually stops your vision getting worse. For 2 to 6 weeks afterwards your vision may be blurry, your eye may be sore and red, and you may need time off work, not be able to drive, and need to avoid flying if a gas bubble was put in your eye. Most people return to normal activities. Call the hospital or go to A&E if pain, redness or blurriness gets worse after surgery.`,
        links: [
          { label: "Retinal detachment treatment providers", href: "/eye-surgery/retinal-detachment" },
        ],
      },
      {
        heading: "Causes and risk",
        body: `A detached retina is usually caused by age-related changes to the jelly inside the eye, called posterior vitreous detachment. The NHS says it is more likely if you are short-sighted, have had an eye operation such as cataract surgery, have had an eye injury, or have a family history of retinal detachment. You can get it more than once, so get help quickly if symptoms come back.`,
        links: [
          { label: "Short-sightedness", href: "/eye-health/conditions/myopia" },
        ],
      },
    ],
    faqs: [
      {
        question: "What are the warning signs of a detached retina?",
        answer: "Sudden floaters, flashes of light, a dark curtain or shadow across your vision, or suddenly blurred vision.",
      },
      {
        question: "Is a detached retina an emergency?",
        answer: "Yes. It needs treating quickly to protect your sight. Get help from NHS 111 straight away.",
      },
      {
        question: "How is a detached retina treated?",
        answer: "With surgery in hospital, which usually stops your vision getting worse.",
      },
      {
        question: "How long is recovery after retinal detachment surgery?",
        answer: "As a guide, 2 to 6 weeks, during which you may not be able to drive or fly. Most people return to normal activities.",
      },
    ],
    relatedQueries: ["floaters-in-vision", "emergency-eye-test-near-me", "sudden-vision-changes"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Warning signs of a detached retina need urgent help.",
    sources: [
      { label: "NHS: Detached retina", url: "https://www.nhs.uk/conditions/detached-retina-retinal-detachment/" },
    ],
  },
  {
    slug: "watery-eyes",
    keyword: "watery eyes",
    title: "Watery Eyes: Causes, Treatment and When to See a GP",
    seoTitle: "Watery Eyes: Common Causes and How They Are Treated (NHS)",
    seoDescription:
      "Watering eyes are common and often get better on their own. Causes such as cold, wind, blocked tear ducts, allergies and dry eyes, and when to get help.",
    h1: "Watery Eyes",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/watery-eyes",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Watering eyes are common and often get better on their own. Causes, treatment and when to get help.",
    content: `Watering eyes are common and often get better on their own. The NHS says treatment may be needed if the watering affects your daily activities.

It is normal for eyes to water in smoke, cold or wind, or if something like an eyelash or grit is in your eye. Babies sometimes have watering eyes because their tear ducts have not fully developed, which usually gets better within a few weeks.`,
    keyFacts: [
      { label: "Often", value: "Gets better on its own" },
      { label: "First help", value: "A pharmacist" },
      { label: "Babies", value: "Usually clears in weeks" },
      { label: "Pain or sight changes", value: "Get urgent advice" },
    ],
    sections: [
      {
        heading: "Common causes",
        items: [
          "Smoke, cold or wind",
          "Something in your eye, such as an eyelash or grit",
          "Blocked tear ducts",
          "An allergy or infection such as conjunctivitis",
          "Eyelid problems, such as the eyelid drooping away from the eye",
          "Dry eyes, which can make the eyes produce too many tears",
          "Bell's palsy, and some medicines and cancer treatments",
        ],
        links: [
          { label: "Dry eyes", href: "/eye-health/conditions/dry-eye-syndrome" },
          { label: "Conjunctivitis", href: "/eye-health/conditions/conjunctivitis" },
        ],
      },
      {
        heading: "Treatment",
        body: `Treatment may not be needed if the watering is not causing problems. Otherwise it depends on the cause: eye drops or gels for dry eyes, antibiotic drops for an infection, medicines for an allergy, removing anything in the eye, or a small operation for eyelid problems or blocked tear ducts.`,
      },
      {
        heading: "When to get help",
        body: `A pharmacist can suggest cleaning solutions, eye drops or allergy medicines. See a GP if your eyes keep watering and it stops you doing everyday activities, your eyelid is turning inwards or drooping away from your eye, or you have lumps or swelling around the eyes that have not improved. Ask for an urgent GP appointment or get help from NHS 111 if you have changes to your vision or severe eye pain.`,
      },
    ],
    faqs: [
      {
        question: "Why do my eyes keep watering?",
        answer: "Common causes include cold, wind or smoke, blocked tear ducts, allergies, infections, eyelid problems and dry eyes.",
      },
      {
        question: "Can dry eyes cause watery eyes?",
        answer: "Yes. Dry eyes can make your eyes produce too many tears.",
      },
      {
        question: "When should I see a GP about watery eyes?",
        answer: "If the watering stops you doing everyday things, your eyelid turns in or droops, or lumps around the eye do not improve.",
      },
      {
        question: "Why does my baby have watery eyes?",
        answer: "Babies' tear ducts may not be fully developed. It usually gets better within a few weeks.",
      },
    ],
    relatedQueries: ["dry-eyes", "conjunctivitis", "swollen-eyelid"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Sight changes or severe eye pain need urgent advice.",
    sources: [
      { label: "NHS: Watering eyes", url: "https://www.nhs.uk/symptoms/watering-eyes/" },
    ],
  },
  {
    slug: "double-vision",
    keyword: "double vision",
    title: "Double Vision: Causes, Urgent Signs and Driving",
    seoTitle: "Double Vision: Causes, When It Is Urgent and Telling the DVLA (NHS)",
    seoDescription:
      "Double vision is not usually serious but always needs checking. A simple test to tell which kind you have, when it is urgent, causes and the DVLA rule.",
    h1: "Double Vision",
    dateModified: "2026-11-11",
    canonicalPath: "/eye-health/conditions/double-vision",
    parentCrumbs: [{ label: "Eye Health", href: "/eye-health" }],
    category: "concern",
    shortDescription:
      "Double vision always needs checking. Causes, urgent signs and the DVLA rule.",
    content: `Double vision (diplopia) is when you look at one object but see two images. The NHS says it is not usually serious, but it is important to get it checked, even if it comes and goes. An optician or GP can do some simple, painless tests and refer you if needed.

Children often cannot tell that they have double vision. Signs include squinting, closing or covering one eye, tilting the head, or looking at things sideways.`,
    keyFacts: [
      { label: "Usually", value: "Not serious, but get it checked" },
      { label: "Sudden onset", value: "Get urgent advice" },
      { label: "After a head injury", value: "Call 999 or go to A&E" },
      { label: "Driving", value: "Stop and tell the DVLA" },
    ],
    sections: [
      {
        heading: "When it is urgent",
        body: `Ask for an urgent GP appointment or get help from NHS 111 if you have eye pain with double vision, or double vision that started suddenly. Call 999 or go to A&E if you have a severe headache or an enlarged pupil with blurred or double vision, or double vision after a head injury.`,
        links: [
          { label: "Emergency eye care", href: "/find/emergency-eye-test-near-me" },
        ],
      },
      {
        heading: "A simple check",
        body: `The NHS suggests covering one eye at a time. If the double vision goes away with one eye covered, it is probably affecting both eyes (binocular), which is usually a symptom of a squint. If you still see double in the uncovered eye, it is probably affecting just that eye (monocular), which is usually caused by an eye problem such as dry eyes, astigmatism, cataracts or keratoconus.`,
        links: [
          { label: "Squint", href: "/eye-health/conditions/strabismus" },
          { label: "Cataracts", href: "/eye-health/conditions/cataracts" },
          { label: "Astigmatism", href: "/eye-health/conditions/astigmatism" },
        ],
      },
      {
        heading: "Treatment",
        body: `Treatment depends on the cause. It may be simple, such as eye exercises, an eye patch, or glasses or contact lenses, or some causes may need eye surgery.`,
      },
      {
        heading: "Driving",
        body: `The NHS says you must stop driving and tell the DVLA if you are diagnosed with double vision. You can drive again if a doctor tells the DVLA it is safe.`,
        links: [
          { label: "DVLA eyesight rules", href: "/eye-tests/dvla-driving-vision-test" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is double vision serious?",
        answer: "Not usually, but it always needs checking. Sudden double vision, or double vision with pain, needs urgent advice.",
      },
      {
        question: "What causes double vision?",
        answer: "In both eyes it is usually a squint. In one eye it is usually an eye problem such as dry eyes, astigmatism, cataracts or keratoconus.",
      },
      {
        question: "Can I drive with double vision?",
        answer: "No. You must stop driving and tell the DVLA if you are diagnosed with it, until a doctor confirms it is safe.",
      },
      {
        question: "Who should I see about double vision?",
        answer: "An optician or GP, who can do simple tests and refer you to a specialist if needed.",
      },
    ],
    relatedQueries: ["squint", "eye-test-for-driving", "sudden-vision-changes"],
    ctaText: "Find an optician near you",
    disclaimer:
      "This page is general information based on NHS guidance, not medical advice. Sudden double vision needs urgent advice.",
    sources: [
      { label: "NHS: Double vision", url: "https://www.nhs.uk/symptoms/double-vision/" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Find a single search query by its URL-friendly slug.
 * Returns `undefined` if no match is found.
 */
export function getQueryBySlug(slug: string): SearchQuery | undefined {
  return searchQueries.find((q) => q.slug === slug);
}

/**
 * Return an array of all available query slugs.
 * Useful for generating static paths and sitemap entries.
 */
export function getAllSlugs(): string[] {
  return searchQueries.filter((q) => !q.canonicalPath).map((q) => q.slug);
}

/** The live URL path of a query page */
export function queryHref(q: Pick<SearchQuery, "slug" | "canonicalPath">): string {
  return q.canonicalPath ?? `/find/${q.slug}`;
}

export function getQueryByCanonicalPath(path: string): SearchQuery | undefined {
  return searchQueries.find((q) => q.canonicalPath === path);
}

/** /find/{slug} URLs that now live elsewhere, for next.config redirects */
export function movedQueryRedirects(): { source: string; destination: string }[] {
  return searchQueries
    .filter((q) => q.canonicalPath)
    .map((q) => ({ source: `/find/${q.slug}`, destination: q.canonicalPath as string }));
}

/**
 * Return all queries belonging to a specific category.
 */
export function getQueriesByCategory(
  category: SearchQuery["category"]
): SearchQuery[] {
  return searchQueries.filter((q) => q.category === category);
}
