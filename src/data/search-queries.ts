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
          { label: "Home eye tests", href: "/find/eye-test-at-home" },
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
    title: "Same-Day Eye Tests — Find Last-Minute Appointments Near You",
    category: "availability",
    shortDescription:
      "Need an eye test today? Many opticians offer same-day appointments. Find available slots near you and book online.",
    content: `If you need an eye test urgently, many opticians across the UK offer same-day appointments. Whether you have noticed a change in your vision, need an updated prescription quickly, or simply want to get your test done without waiting, same-day booking is widely available.

Major chains like Specsavers, Boots Opticians, and Vision Express typically have same-day slots available, particularly during quieter periods such as weekday mornings and early afternoons. Independent opticians may also be able to fit you in at short notice. The easiest way to find same-day availability is to search online — many opticians allow you to see available appointment times on their website and book instantly.

If your need is genuinely urgent — for example, sudden vision loss, flashes of light, a shower of new floaters, a painful red eye, or an eye injury — you should seek emergency eye care rather than a routine eye test. Many opticians are accredited to provide urgent eye care through the NHS Minor Eye Conditions Service (MECS), and can see you the same day for these urgent symptoms, often at no cost. This is typically faster and more appropriate than going to A&E.

For routine same-day appointments, it is worth calling your preferred optician first thing in the morning to ask about availability. Cancellations and no-shows mean that slots often open up throughout the day. If one practice cannot see you today, try another nearby — with multiple opticians in most town centres, there is usually someone who can help at short notice.

Same-day appointments are subject to the same standards as any other eye test. You will receive a full sight test covering your vision, prescription, and eye health. If you need glasses, you can order them the same day, with some opticians offering same-day collection on selected frames and lenses.`,
    faqs: [
      {
        question: "Can I get an eye test today?",
        answer:
          "Yes, many opticians offer same-day appointments. Search online for available slots or call your local optician to ask about today's availability. Weekday mornings and early afternoons are usually the easiest times to get a same-day appointment.",
      },
      {
        question: "Do I need to book or can I walk in?",
        answer:
          "Most opticians prefer bookings but many accept walk-ins when slots are available. Walk-in availability varies by location and how busy the practice is. Calling ahead is recommended to avoid a wasted journey.",
      },
      {
        question: "Is a same-day eye test more expensive?",
        answer:
          "No. A same-day eye test costs the same as any other appointment. There is no premium for short-notice booking. If you qualify for a free NHS test, it is still free regardless of when you book.",
      },
    ],
    relatedQueries: [
      "walk-in-eye-test",
      "emergency-eye-test-near-me",
      "weekend-eye-test",
    ],
    ctaText: "Find same-day eye test appointments",
  },
  {
    slug: "walk-in-eye-test",
    keyword: "walk in eye test",
    title: "Walk-In Eye Tests — No Appointment Needed at These Opticians",
    category: "availability",
    shortDescription:
      "Find opticians near you that accept walk-in eye test appointments without the need to book in advance.",
    content: `While most UK opticians prefer advance bookings, many will accept walk-in patients when appointment slots are available. If you need an eye test but have not booked, it is often possible to be seen the same day by simply walking into your local optician.

Walk-in availability depends heavily on how busy the practice is. You are most likely to be seen without an appointment during quieter periods — typically weekday mornings, early afternoons, and outside school holiday periods. Major chains like Specsavers, Boots, and Vision Express tend to have more optometrists on duty and therefore more flexibility to accommodate walk-ins. Smaller independent practices with a single optometrist may have less walk-in capacity.

For genuine emergencies — sudden vision loss, flashes, floaters, red or painful eyes, or eye injuries — many opticians offer urgent walk-in services through the NHS Minor Eye Conditions Service (MECS). These emergency appointments do not need to be pre-booked and are usually free. Call your optician before walking in so they can triage your symptoms and ensure the right clinician is available.

For routine walk-in requests, it is sensible to call ahead if possible. The receptionist can tell you whether there are any available slots and the likely wait time, saving you a potentially wasted trip. Even a five-minute phone call can make the difference between being seen promptly and being told the diary is full.

If you want to guarantee being seen without a long wait, online booking is the most reliable option. Most major chains allow you to see real-time availability and book a specific time slot online in just a few clicks. This gives you the convenience of choosing when to attend while ensuring a slot is reserved for you.`,
    faqs: [
      {
        question: "Which opticians accept walk-ins?",
        answer:
          "Most opticians will try to accommodate walk-ins when slots are available, but none guarantee it. Specsavers, Boots, and Vision Express are more likely to have walk-in capacity due to having multiple optometrists. Always call ahead to check.",
      },
      {
        question: "Is there an extra charge for a walk-in eye test?",
        answer:
          "No. Walk-in eye tests are priced the same as pre-booked appointments. There is no walk-in surcharge. NHS-funded tests remain free regardless of how you book.",
      },
      {
        question: "Can I walk in for an emergency eye problem?",
        answer:
          "Yes. Many opticians provide urgent eye care through the NHS MECS scheme and can see you on the same day for emergency symptoms such as sudden vision changes, eye pain, or injuries. Call first so they can prepare for your visit.",
      },
    ],
    relatedQueries: [
      "same-day-eye-test",
      "emergency-eye-test-near-me",
    ],
    ctaText: "Find walk-in eye tests near you",
  },
  {
    slug: "weekend-eye-test",
    keyword: "weekend eye test",
    title: "Weekend Eye Tests — Saturday & Sunday Appointments Near You",
    category: "availability",
    shortDescription:
      "Many UK opticians offer Saturday and some Sunday eye test appointments. Find weekend availability near you.",
    content: `If you struggle to attend an eye test during the working week, weekend appointments are widely available across the UK. Most high-street opticians are open on Saturdays, and an increasing number also offer Sunday appointments.

Saturday eye tests are available at virtually all Specsavers, Boots Opticians, and Vision Express stores. Most open from around 9am and close between 5pm and 6pm, though hours vary by location. Saturday is typically one of the busiest days for opticians, so booking in advance is strongly recommended. Many practices fill their Saturday appointments a week or more ahead, so the earlier you book, the more choice of times you will have.

Sunday appointments are less universally available but are offered at many larger stores, particularly those in shopping centres or retail parks. Specsavers and Boots stores in major retail locations commonly offer Sunday testing, typically from 10am or 11am to 4pm or 5pm. Vision Express also opens many stores on Sundays. Independent opticians are less likely to open on Sundays, though some in busy urban areas do.

Weekend appointments cost the same as weekday ones — there is no premium for out-of-hours testing. NHS-funded tests are also available at weekends for those who qualify. The test itself is identical to a weekday appointment, covering all the same clinical checks.

To find weekend availability, the easiest approach is to search online. Most chain opticians show real-time appointment availability on their websites, allowing you to filter by date and see exactly which Saturday and Sunday slots are open near you. Alternatively, call your preferred optician and ask for the next available weekend appointment.`,
    faqs: [
      {
        question: "Are opticians open on Sundays?",
        answer:
          "Many larger Specsavers, Boots, and Vision Express stores open on Sundays, particularly those in shopping centres and retail parks. Typical Sunday hours are 10am to 4pm or 11am to 5pm. Independent opticians rarely open on Sundays.",
      },
      {
        question: "Do weekend eye tests cost more?",
        answer:
          "No. Weekend eye test appointments are priced the same as weekday ones. There is no extra charge for Saturday or Sunday appointments. NHS-funded tests remain free at weekends.",
      },
      {
        question: "How far in advance should I book a Saturday eye test?",
        answer:
          "Saturday is the busiest day for most opticians. Booking at least one to two weeks in advance gives you the best choice of times. For peak periods like school holidays, book even earlier.",
      },
    ],
    relatedQueries: [
      "same-day-eye-test",
      "walk-in-eye-test",
    ],
    ctaText: "Find weekend eye test appointments",
  },
  {
    slug: "emergency-eye-test-near-me",
    keyword: "emergency eye test near me",
    title: "Emergency Eye Test Near Me — Urgent Same-Day Eye Care in the UK",
    category: "availability",
    shortDescription:
      "Find urgent eye care near you for sudden vision changes, eye pain, injuries, and other emergency eye symptoms.",
    content: `If you are experiencing a sudden eye problem, getting seen quickly is essential. Many opticians across the UK are accredited to provide emergency and urgent eye care, often through the NHS Minor Eye Conditions Service (MECS) or similar local schemes. This is usually faster and more appropriate than going to A&E.

Symptoms that require urgent eye care include: sudden loss of vision in one or both eyes, a sudden increase in floaters (especially with flashes of light), a shadow or dark curtain spreading across your vision, sudden severe eye pain, a red and painful eye with sensitivity to light, something stuck in your eye, a chemical splash in your eye, sudden double vision, or a recent eye injury. If you experience any of these, call your local optician immediately — many can see you the same day.

The NHS MECS scheme allows accredited opticians to assess and manage a wide range of urgent eye conditions without you needing a GP referral or A&E visit. The service is free where available (it is commissioned locally, so coverage varies). Common conditions managed through MECS include conjunctivitis, foreign bodies, corneal abrasions, dry eye flare-ups, subconjunctival haemorrhages, and suspected acute glaucoma. If the optician identifies something that needs hospital treatment, they can refer you directly to the hospital eye service as an urgent case.

To find urgent eye care near you, call your regular optician first. If they cannot see you or are not accredited for urgent care, they can usually direct you to the nearest practice that is. You can also call NHS 111 for advice on where to go. Only attend A&E for eye problems if your optician is unavailable and you are experiencing sight-threatening symptoms such as sudden vision loss, chemical burns, or a penetrating eye injury.`,
    faqs: [
      {
        question: "Should I go to A&E for an eye emergency?",
        answer:
          "For most eye emergencies, your local optician or an NHS urgent eye care service (MECS) is faster and better equipped than A&E. Only go to A&E if your optician is unavailable and you have severe symptoms such as sudden vision loss, chemical burns, or a penetrating eye injury. Call NHS 111 for advice.",
      },
      {
        question: "Is emergency eye care free?",
        answer:
          "Emergency eye care through the NHS MECS scheme is free where available. Even private emergency appointments are typically affordable at £30 to £60. Do not delay seeking help because of cost — most emergency eye care will not cost you anything.",
      },
      {
        question: "What is the MECS scheme?",
        answer:
          "The Minor Eye Conditions Service (MECS) is an NHS-funded scheme that allows accredited opticians to assess and manage urgent eye conditions. It provides same-day or next-day care for conditions that might otherwise end up in A&E. Coverage varies by area.",
      },
    ],
    relatedQueries: [
      "same-day-eye-test",
      "sudden-vision-changes",
      "floaters-in-vision",
      "blurry-vision-causes",
    ],
    ctaText: "Find urgent eye care near you",
  },
  {
    slug: "eye-test-at-home",
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
    title: "Online Eye Tests — Can You Test Your Eyes Online? (UK Guide)",
    category: "availability",
    shortDescription:
      "Can you do a reliable eye test online? Understand the limitations and when you still need to visit an optician in person.",
    content: `Online eye tests have grown in popularity, but it is important to understand their limitations. While digital tools can provide a rough indication of your visual acuity, they cannot replace a comprehensive in-person eye examination carried out by a qualified optometrist.

Online vision screening tools typically test how well you can read letters or shapes on your screen from a set distance. Some more advanced services use your smartphone camera and algorithms to estimate your glasses prescription. These can be useful as a quick check — for example, if you are wondering whether your vision has changed since your last test — but they have significant limitations. They cannot measure eye pressure (critical for glaucoma screening), examine the health of the retina and optic nerve, detect conditions like cataracts or macular degeneration, or assess your binocular vision (how your eyes work together).

In the UK, a valid glasses prescription can only be issued by a registered optometrist or ophthalmic medical practitioner following an in-person sight test. Online tools cannot legally provide a prescription, and no reputable UK optician will dispense glasses based solely on an online test result. The General Optical Council (GOC), which regulates the optical profession in the UK, has been clear that online tests do not meet the clinical standards required for a sight test.

That said, some legitimate services offer remote consultations where an optometrist reviews your results and provides guidance via video call. These are more credible than fully automated tools but still cannot replace the physical examination of your eyes. They may be useful for follow-up consultations or advice between in-person tests.

The best approach is to use online tools as a rough check and conversation starter, but always book a proper in-person eye test for your definitive assessment. With eye tests costing as little as £20 to £25 (or free if you qualify for an NHS test), the cost of an in-person test is minimal compared to the value of a thorough examination.`,
    faqs: [
      {
        question: "Can I get a glasses prescription online?",
        answer:
          "No. In the UK, a valid glasses prescription can only be issued by a registered optometrist or ophthalmic medical practitioner after an in-person sight test. Online tools cannot legally provide a prescription.",
      },
      {
        question: "Are online eye tests accurate?",
        answer:
          "Online eye tests can give a rough indication of your visual acuity, but they cannot assess eye health, measure eye pressure, or detect conditions like glaucoma or cataracts. They should not be used as a substitute for an in-person eye test.",
      },
      {
        question: "When should I use an online eye test?",
        answer:
          "Online vision screening tools can be useful as a quick check between regular eye tests, for example if you suspect your vision has changed. However, they should always be followed up with an in-person test for a proper assessment.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
      "do-i-need-an-eye-test",
      "eye-test-at-home",
    ],
    ctaText: "Book a proper eye test near you",
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
          { label: "Home eye tests", href: "/find/eye-test-at-home" },
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
          { label: "Children's eye tests", href: "/find/childrens-eye-test-guide" },
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
          { label: "Floaters in vision", href: "/find/floaters-in-vision" },
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
          { label: "Children's eye tests", href: "/find/childrens-eye-test-guide" },
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
    keyword: "eye test failed driving",
    title: "Failed the Eye Test Part of Your Driving Test? What to Do Next",
    category: "general",
    shortDescription:
      "What happens if you fail the number plate reading test during your driving test, and the steps to take to get back on the road safely.",
    content: `If you failed the number plate reading test at the start of your driving practical test, your test was terminated immediately. This is disappointing, but the legal eyesight standard exists for a very important reason — safe driving requires clear vision. Here is what to do next.

Your first step should be to book an eye test with an optician as soon as possible. Tell them you failed the driving test eyesight check so they can specifically assess whether your vision meets the DVLA standard. The legal requirement is that you must be able to read a number plate from 20 metres. In clinical terms, this broadly equates to a visual acuity of 6/12 (or 0.5 on the decimal scale) with both eyes open, using glasses or contact lenses if you need them.

If the optometrist finds you need glasses or contact lenses to meet the driving standard, they will prescribe them, and you must wear them every time you drive — this is a legal requirement, not optional. Once you have your new glasses or contacts, you can rebook your practical driving test. There is no special waiting period or additional requirement beyond having corrected vision that meets the standard.

If the optometrist finds that your vision cannot be corrected to the driving standard even with glasses or contact lenses, you must inform the DVLA. Driving with vision below the legal standard is an offence that can result in a fine of up to £1,000, three penalty points, and potentially criminal charges if you cause an accident. Your optometrist will advise you on the next steps, which may include referral to a hospital eye specialist for further investigation.

It is worth noting that many people who fail the number plate test simply need glasses they did not know they needed. A straightforward prescription for distance vision can often solve the problem completely, allowing you to rebook your test and pass with confidence. The cost of an eye test and basic glasses is minimal compared to the importance of safe driving.`,
    faqs: [
      {
        question: "Can I retake my driving test after failing the eye test?",
        answer:
          "Yes. Book an eye test with an optician, get glasses or contact lenses if needed, and then rebook your driving test. There is no special waiting period. You must wear your correction every time you drive.",
      },
      {
        question: "Do I need to tell the DVLA I failed the eye test?",
        answer:
          "If you simply need glasses and your corrected vision meets the standard, you do not need to inform the DVLA. If your vision cannot be corrected to the driving standard, you must inform them. Your optometrist will advise you.",
      },
      {
        question: "Can I practise driving if I failed the eye test?",
        answer:
          "You should not drive or practise driving until you have had your vision corrected. Once you have the right glasses or contact lenses and your optometrist confirms your corrected vision meets the standard, you can resume practice.",
      },
      {
        question: "What is the legal eyesight standard for driving?",
        answer:
          "You must be able to read a number plate from 20 metres, which equates to approximately 6/12 visual acuity. You must also have an adequate field of vision of at least 120 degrees horizontally. Glasses or contact lenses can be worn to meet these standards.",
      },
    ],
    relatedQueries: [
      "eye-test-for-driving",
      "eye-test-cost",
      "book-eye-test",
      "blurry-vision-causes",
    ],
    ctaText: "Book an urgent eye test",
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
    title: "Eye Test for Driving — DVLA Standards & Where to Get Tested",
    category: "specialist",
    shortDescription:
      "What the DVLA eyesight standard is for driving in the UK, where to get tested, and what happens if your vision does not meet the requirements.",
    content: `If you drive in the UK, you are legally required to meet minimum eyesight standards. Whether you are a learner preparing for your practical test, an experienced driver, or a professional HGV or PSV driver, understanding and meeting these requirements is essential for your safety and legal compliance.

The DVLA requires that you can read a modern number plate (with a font height of 79mm) from a distance of 20 metres. For older-style number plates, the distance is 20.5 metres. In clinical terms, this broadly equates to a visual acuity of 6/12 or better (measured on a Snellen chart) using both eyes together, with glasses or contact lenses if you normally wear them. You must also have a field of vision of at least 120 degrees horizontally with no significant defects within the central 20 degrees.

Your optometrist can carry out a driving vision assessment to confirm whether you meet these standards. This typically involves a number plate reading test at 20 metres, a visual acuity test on a letter chart, and a visual field assessment. Many opticians include these checks as part of a standard eye test at no extra cost. If a standalone driving vision test is needed, it typically costs £15 to £30.

For professional drivers — those holding HGV (Category C) or PSV (Category D) licences — the visual acuity standard is higher. You need at least 6/7.5 visual acuity in your best eye and at least 6/60 in the other eye, plus a wider field of vision requirement. If you hold a Group 2 licence, regular vision checks are part of your medical renewal process.

If your vision does not meet the driving standard, you must stop driving and inform the DVLA. If glasses or contact lenses can correct your vision to the required level, you can drive wearing them — but you must wear them every time. Driving without adequate eyesight is a serious offence.`,
    faqs: [
      {
        question: "What is the DVLA eyesight standard for driving?",
        answer:
          "You must be able to read a number plate from 20 metres with both eyes open (using glasses or contact lenses if needed). This equates to approximately 6/12 visual acuity. You also need an adequate visual field of at least 120 degrees horizontally.",
      },
      {
        question: "Do I need to tell the DVLA if I need glasses for driving?",
        answer:
          "If you only need glasses for driving and your corrected vision meets the standard, you do not need to inform the DVLA. However, you must wear your glasses every time you drive. If you have an eye condition that could affect your driving, you must inform the DVLA.",
      },
      {
        question: "How often should I have my driving vision checked?",
        answer:
          "There is no legal requirement for regular driving vision checks (except for professional drivers). However, having your vision checked every two years as part of a routine eye test ensures you continue to meet the standard.",
      },
    ],
    relatedQueries: [
      "eye-test-failed-driving",
      "book-eye-test",
      "eye-test-cost",
      "blurry-vision-causes",
    ],
    ctaText: "Book a driving vision assessment",
  },
  {
    slug: "contact-lens-eye-test",
    keyword: "contact lens eye test",
    title: "Contact Lens Eye Test — Fitting, Check-ups & Cost (UK Guide)",
    category: "specialist",
    shortDescription:
      "Everything about contact lens fittings and check-ups in the UK, including costs, what to expect, and how often you need them.",
    content: `If you want to wear contact lenses, you need a contact lens fitting in addition to your regular sight test. This is a specialist appointment that ensures your lenses fit correctly, provide clear vision, and are safe for your eyes. Contact lens check-ups are also legally required at least once a year.

A contact lens fitting typically costs £30 to £60 at most UK opticians. This covers detailed measurements of your eye surface, assessment of your tear film, selection of the appropriate lens type and material, trial lenses to check fit and vision, and a teach session for new wearers (how to insert, remove, and care for lenses). Many opticians include the fitting fee as part of a monthly contact lens plan, so you may not need to pay it separately.

Annual contact lens check-ups are essential and legally required. Your contact lens prescription (specification) is only valid while your check-ups are up to date. During a check-up, your optician will assess the fit of your current lenses, check the health of the surface of your eyes, update your prescription if needed, and ensure you are not experiencing any complications. Check-ups typically take 15 to 30 minutes and are often included in monthly lens plans.

Monthly contact lens plans at the major chains start from around £8 to £12 per month for daily disposable lenses, and typically include the lenses themselves, solutions (for reusable lenses), annual check-ups, and sometimes a sight test. These plans offer convenience and often work out cheaper than buying lenses and appointments separately.

It is important to understand that a sight test and a contact lens appointment are separate services. Your sight test checks your overall vision and eye health and provides a glasses prescription. The contact lens appointment determines your contact lens prescription, which includes additional measurements specific to lenses. You need both — a glasses prescription cannot be used to order contact lenses.`,
    faqs: [
      {
        question: "Can I get contact lenses without a fitting?",
        answer:
          "No. In the UK, you need a contact lens fitting and a valid, in-date contact lens specification (prescription) to obtain contact lenses. Reputable suppliers will verify your specification before dispensing lenses.",
      },
      {
        question: "How much do contact lenses cost per month?",
        answer:
          "Monthly plans at major chains start from around £8 to £12 per month for daily disposable lenses. Premium lenses (such as multifocal or toric lenses for astigmatism) cost more. Plans typically include lenses, check-ups, and solutions.",
      },
      {
        question: "How often do I need a contact lens check-up?",
        answer:
          "At least once a year. Some lens types or individual circumstances may require six-monthly checks. Your contact lens practitioner will advise on the right frequency for you. Your specification is only valid while check-ups are current.",
      },
    ],
    relatedQueries: [
      "eye-test-cost",
    ],
    ctaText: "Find contact lens appointments near you",
  },
  {
    slug: "childrens-eye-test-guide",
    keyword: "children's eye test",
    title: "Children's Eye Tests — Complete Parent's Guide (UK)",
    category: "specialist",
    shortDescription:
      "A comprehensive guide for parents on children's eye tests in the UK, including when to book, what to expect, and signs of vision problems.",
    content: `Regular eye tests are essential for children's development, learning, and wellbeing. All children in the UK are entitled to free NHS eye tests, and the first test should happen before your child starts school, ideally around age three or four.

Good vision is critical for learning. Around 80% of what children learn comes through their eyes, and undetected vision problems can significantly affect their progress at school. Common childhood eye conditions include amblyopia (lazy eye), which affects around 1 in 50 children and is most effectively treated before age seven; squint (strabismus), where the eyes do not look in the same direction; long-sightedness, short-sightedness, and astigmatism; and colour vision deficiency.

Signs that your child may have a vision problem include sitting too close to the television or holding books very close, squinting or tilting their head to see, rubbing their eyes frequently, one eye turning inward or outward, difficulty concentrating or completing tasks, avoiding reading or close work, complaining of headaches, and poor performance at school. However, many children with vision problems show no obvious signs — which is why regular testing is so important.

During a children's eye test, the optometrist uses age-appropriate techniques. For younger children, this includes picture matching games, shape recognition, and objective measurement techniques that do not require verbal responses. For older children, standard letter charts are used. The optometrist will also check how well the eyes work together (binocular vision), look for squint or lazy eye, and examine the general health of the eyes. The appointment typically takes 20 to 40 minutes.

Children should have annual eye tests throughout their school years. If glasses are prescribed, an NHS optical voucher is provided to help with the cost. Most opticians offer a dedicated range of children's frames that are durable, flexible, and designed for active young wearers — many are fully covered by the voucher value.`,
    faqs: [
      {
        question: "At what age should my child have their first eye test?",
        answer:
          "Before starting school, ideally at age three or four. However, if you have any concerns about your baby's or toddler's vision — such as a squint, unusual eye movements, or a white reflection in the pupil — seek advice immediately, regardless of age.",
      },
      {
        question: "My child passed their school vision screening — do they still need an eye test?",
        answer:
          "Yes. School screenings are basic checks that can miss many conditions. They are not a substitute for a full eye examination. Regular optician eye tests are recommended even if a school screening result was normal.",
      },
      {
        question: "How do I prepare my child for an eye test?",
        answer:
          "Explain that it is a fun visit where someone will look at their eyes and ask them about shapes and pictures. Reassure them it will not hurt. Bring their current glasses if they have any. The optometrist is experienced with children and will put them at ease.",
      },
    ],
    relatedQueries: [
      "free-eye-test-children",
      "eye-test-what-to-expect",
      "nhs-optical-voucher",
    ],
    ctaText: "Book a free children's eye test",
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
          { label: "Eye test for driving", href: "/find/eye-test-for-driving" },
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
    keyword: "floaters in vision",
    title: "Floaters in Vision — Causes, When to Worry & What to Do",
    category: "concern",
    shortDescription:
      "What eye floaters are, when they are harmless, and when a sudden increase in floaters means you need urgent attention.",
    content: `Eye floaters are small shapes that drift across your vision — they may appear as dots, threads, cobwebs, or squiggly lines. Most people notice them when looking at a plain bright background such as a white wall or blue sky. They move as you move your eyes and tend to drift away when you try to look directly at them.

Most floaters are harmless and are caused by natural age-related changes in the vitreous — the clear, gel-like substance that fills the inside of your eye. As you age, the vitreous becomes more liquid and small fibres within it clump together, casting tiny shadows on your retina. These are what you see as floaters. They are extremely common, particularly in people over 50, those who are short-sighted, or after eye surgery.

However, a sudden increase in floaters — particularly if accompanied by flashes of light or a shadow or curtain spreading across your vision — can indicate a serious condition that requires urgent attention. The most concerning possibility is a retinal detachment or retinal tear, where the vitreous pulls away from the retina and damages it. Retinal detachment is a sight-threatening emergency that requires prompt treatment (usually surgery) to prevent permanent vision loss.

If you experience a sudden shower of new floaters, new or increasing flashes of light (especially in your peripheral vision), a dark shadow or curtain spreading across your vision, or a sudden loss of vision, you should contact your optician urgently for a same-day appointment, or call NHS 111 if your optician is unavailable. Many opticians provide emergency eye care through the NHS MECS scheme and can see you the same day.

If your floaters are longstanding, have not changed, and are not accompanied by flashes or shadows, they are almost certainly harmless. Mention them at your next routine eye test so your optometrist can confirm. Most people learn to live with mild floaters, and the brain often learns to ignore them over time.`,
    faqs: [
      {
        question: "Are floaters serious?",
        answer:
          "Longstanding, unchanging floaters are usually harmless. However, a sudden increase in floaters, new flashes of light, or a shadow across your vision can indicate a retinal tear or detachment and requires urgent assessment within 24 hours.",
      },
      {
        question: "Can floaters go away on their own?",
        answer:
          "Some floaters settle or become less noticeable over time as the brain adapts. They do not usually disappear entirely. Treatment (vitrectomy) is available for severe cases that significantly affect quality of life, but this is rarely needed.",
      },
      {
        question: "When should I go to A&E for floaters?",
        answer:
          "Seek immediate help if you have a sudden shower of new floaters with flashes of light and/or a shadow or curtain across your vision. Try your optician first (many offer same-day emergency care), or go to A&E if you cannot be seen urgently elsewhere.",
      },
    ],
    relatedQueries: [
      "sudden-vision-changes",
      "emergency-eye-test-near-me",
      "do-i-need-an-eye-test",
      "blurry-vision-causes",
    ],
    ctaText: "Find urgent eye care near you",
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
