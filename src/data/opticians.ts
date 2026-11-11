// ---------------------------------------------------------------------------
// UK optician chains — brand data for eyetest.co.uk
// Independent and smaller chains show real availability; Specsavers, Vision
// Express, and Optical Express are listed but marked unavailable until
// commercial deals are signed.
// ---------------------------------------------------------------------------

export type DetailedService = {
  name: string;
  description: string;
  price: string;
  duration: string;
  nhsCovered: boolean;
};

export type OpticianBrand = {
  slug: string;
  name: string;
  shortName: string;
  brandColor: string;
  description: string;
  services: string[];
  storeCount: number;
  website: string;
  priceRange: string;
  nhsAvailable: boolean;
  available: boolean;
  highlights: string[];
  founded: string;
  storeLocations: string[];
  history: string;
  detailedServices: DetailedService[];
  bookingProcess: string[];
  prosAndCons: { pros: string[]; cons: string[] };
  faqs: { q: string; a: string }[];
  rating?: number;
  reviewCount?: number;
  /** Optional page title / meta description overriding the generic template */
  seoTitle?: string;
  seoDescription?: string;
  /** When the facts on this page were last checked against the sources */
  lastReviewed?: string;
  /** Sources the page's facts were checked against, shown on the page */
  sources?: { label: string; url: string }[];
  /** ISO date the page content last changed (used in sitemap and schema) */
  dateModified?: string;
  /** Extra content blocks rendered after the services table */
  extraSections?: {
    heading: string;
    intro?: string;
    items: { title: string; text: string }[];
  }[];
  /** Third-party review summary shown as text with its source (never as schema) */
  externalRating?: { source: string; url: string; score: string; count: string; checked: string };
};

// ---------------------------------------------------------------------------
// Brand catalogue
// ---------------------------------------------------------------------------

export const opticians: OpticianBrand[] = [
  // ─── Boots Opticians ────────────────────────────────────────────────
  {
    slug: "boots-opticians",
    name: "Boots Opticians",
    shortName: "Boots",
    brandColor: "#0064d2",
    seoTitle: "Boots Eye Test Cost 2026: From £29.95, OCT Scans & Free NHS Tests",
    seoDescription:
      "Boots Opticians eye tests cost from £29.95 with a dry eye check included. OCT adds from £25, the Ultimate test from £50, and NHS tests are free if you qualify.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description:
      "Boots Opticians is one of the UK's largest optician chains, with around 637 practices according to Boots UK, about 30% of them inside Boots stores. Its Essential Eye Test costs from £29.95 and includes a Dry Eye Evaluation. The Advanced Eye Test adds an OCT scan from £25 extra, and the Ultimate Eye Test adds an optomap and OCT scan from £50 extra in selected stores. NHS-funded eye tests are free for anyone who qualifies.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "OCT Scan",
      "Children's Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
    ],
    storeCount: 637,
    website: "https://www.bootsopticians.com",
    priceRange: "Free NHS / From £29.95 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Essential Eye Test from £29.95, with a Dry Eye Evaluation included in every adult sight test",
      "Advanced Eye Test with an OCT scan from £25 extra, and an Ultimate Eye Test with optomap and OCT from £50 extra in selected stores",
      "Free NHS-funded eye tests for anyone who qualifies, including all children under 16",
      "Earn 1 Advantage Card point for every £1 spent at Boots Opticians",
    ],
    founded: "1983",
    storeLocations: [
      "london", "croydon", "bromley", "kingston-upon-thames", "richmond", "ealing",
      "brighton", "reading", "oxford", "guildford", "canterbury", "southampton",
      "portsmouth", "maidstone", "milton-keynes", "slough", "crawley",
      "tunbridge-wells", "basingstoke", "chichester", "worthing", "bristol", "bath",
      "exeter", "plymouth", "bournemouth", "swindon", "gloucester", "cheltenham",
      "taunton", "torquay", "truro", "cambridge", "norwich", "ipswich", "colchester",
      "chelmsford", "luton", "peterborough", "southend-on-sea", "bedford", "st-albans",
      "birmingham", "coventry", "wolverhampton", "stoke-on-trent", "worcester",
      "hereford", "nottingham", "leicester", "derby", "northampton", "lincoln",
      "manchester", "liverpool", "chester", "warrington", "preston", "blackpool",
      "bolton", "lancaster", "carlisle", "newcastle", "sunderland", "durham",
      "middlesbrough", "darlington", "leeds", "sheffield", "york", "bradford", "hull",
      "huddersfield", "doncaster", "harrogate", "cardiff", "swansea", "newport",
      "wrexham", "aberystwyth", "bangor", "edinburgh", "glasgow", "aberdeen",
      "dundee", "inverness", "stirling", "perth", "belfast", "derry", "newry",
    ],
    history:
      "Boots began trading in the UK optical market in 1983 in Nottingham, and Boots Opticians Ltd was formed as a subsidiary of Boots in 1987. It is part of Boots UK, the health and beauty retailer.\n\nBoots UK says Boots Opticians has around 637 practices, of which about 177 operate on a franchise basis, and that around 30% are located inside Boots stores, with the rest standalone optical practices (figures as at February 2026). Boots Opticians now has its own website, bootsopticians.com.\n\nHearing care is provided by Boots Hearingcare, a separate Boots business that offers free hearing tests for adults at 400 plus locations.",
    detailedServices: [
      {
        name: "NHS-funded eye test",
        description:
          "A free eye test for anyone who qualifies for NHS funding, such as children under 16, under 19s in full-time education, people aged 60 or over, people with diabetes or glaucoma and people on certain benefits. In Scotland, NHS eye examinations are free for all UK residents.",
        price: "Free (if eligible)",
        duration: "Varies",
        nhsCovered: true,
      },
      {
        name: "Essential Eye Test",
        description:
          "Boots' routine eye test, checking how clearly you see and the health of your eyes, with a Dry Eye Evaluation included in every adult sight test. Preliminary checks may include an eye pressure test, a visual field test and a digital retinal photograph.",
        price: "From £29.95",
        duration: "Up to 1 hour 30 minutes in store, including choosing glasses",
        nhsCovered: false,
      },
      {
        name: "Advanced Eye Test (with OCT)",
        description:
          "The Essential Eye Test plus an OCT (optical coherence tomography) scan, which gives a detailed view of the layers of the retina. Boots says its OCT scan can help spot over 10 health conditions. You can ask to upgrade at your appointment.",
        price: "From £25 extra",
        duration: "Varies",
        nhsCovered: false,
      },
      {
        name: "Ultimate Eye Test (optomap and OCT)",
        description:
          "Boots' most comprehensive eye test, combining an ultra-wide optomap scan, an OCT scan and the Essential Eye Test. Available in selected stores.",
        price: "From £50 extra",
        duration: "Varies",
        nhsCovered: false,
      },
      {
        name: "Contact lens check",
        description:
          "A separate appointment that checks the fit of your contact lenses and your vision with them. It is included in the Boots Contact Lens Rewards Plan. A free contact lens trial is available for new wearers.",
        price: "£50",
        duration: "Varies",
        nhsCovered: false,
      },
      {
        name: "Children's eye test",
        description:
          "Free on the NHS for all children under 16 and under 19s in full-time education. Boots recommends checks at about age three, then at least every two years until 16, or as your optometrist advises.",
        price: "Free (NHS funded)",
        duration: "Varies",
        nhsCovered: true,
      },
      {
        name: "Hearing test (Boots Hearingcare)",
        description:
          "Free hearing tests for adults aged 18 and over at Boots Hearingcare locations. Boots Hearingcare does not provide NHS hearing services.",
        price: "Free",
        duration: "About 15 minutes for a hearing check",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Find your nearest Boots Opticians by postcode, here on eyetest.co.uk or at bootsopticians.com",
      "Choose your appointment: an eye test, an eye test with contact lens check, or a contact lens check",
      "Tell Boots if you think you qualify for an NHS-funded eye test",
      "Book online, call 0345 125 3752 or visit the store, and ask about upgrading to an Advanced or Ultimate Eye Test",
      "Bring your current glasses or contact lenses and any proof of NHS entitlement",
    ],
    prosAndCons: {
      pros: [
        "Every adult sight test includes a Dry Eye Evaluation",
        "A choice of three test levels, from Essential to Ultimate with optomap and OCT",
        "Around 637 practices, many inside Boots stores",
        "Earn Advantage Card points at Boots Opticians",
      ],
      cons: [
        "The Essential Eye Test price (from £29.95) is higher than Specsavers' published price (£20 to £25)",
        "OCT costs extra, whereas Vision Express and M&S Opticians include it in their private test price",
        "The Ultimate Eye Test is only available in selected stores",
        "Advantage Card points cannot be spent at Boots Opticians",
      ],
    },
    faqs: [
      {
        q: "How much is an eye test at Boots?",
        a: "Boots says its Essential Eye Test costs from £29.95 and includes a Dry Eye Evaluation. Prices may vary across regional stores. If you qualify for an NHS-funded eye test, it is free.",
      },
      {
        q: "How much is an OCT scan at Boots?",
        a: "Boots' Advanced Eye Test adds an OCT scan to the Essential Eye Test, with extra charges from £25. The Ultimate Eye Test, which adds an optomap scan and OCT, costs from £50 extra and is available in selected stores.",
      },
      {
        q: "Does Boots do free eye tests?",
        a: "Yes, for anyone who qualifies for an NHS-funded eye test, including children under 16, under 19s in full-time education, people aged 60 or over and people with diabetes or glaucoma. Boots also runs time-limited offers from time to time, which are subject to availability and may only apply at some stores.",
      },
      {
        q: "How much is a contact lens check at Boots?",
        a: "Boots says a contact lens check normally costs £50, on top of the eye test if you need both. The contact lens check is included in the Boots Contact Lens Rewards Plan, and new wearers can have a free contact lens trial.",
      },
      {
        q: "Can I use my Advantage Card at Boots Opticians?",
        a: "You earn 1 Advantage Card point for every £1 you spend at Boots Opticians. Boots' terms say Advantage Card points cannot be spent at Boots Opticians.",
      },
      {
        q: "How long does an eye test take at Boots?",
        a: "Boots says you could spend up to 1 hour 30 minutes in total in store, including pre-screening, the eye test and choosing glasses or contact lenses. The time depends on the test you choose and your needs.",
      },
      {
        q: "Does Boots do hearing tests?",
        a: "Yes, through Boots Hearingcare, which offers free hearing tests for adults aged 18 and over at its stores. Boots Hearingcare does not provide NHS hearing services.",
      },
      {
        q: "Does Boots accept NHS optical vouchers?",
        a: "Yes. You can put an NHS optical voucher towards glasses or contact lenses at Boots Opticians, and Boots says its second pair half price offer can be used with an NHS voucher.",
      },
    ],
    sources: [
      { label: "Boots Opticians: Your eye test explained", url: "https://www.bootsopticians.com/eye-health/advice/your-eye-test-explained/" },
      { label: "Boots: Book an eye test (appointment types and contact lens check)", url: "https://boots.com/opticians/opticians-offers/eye-health-test" },
      { label: "Boots: Buying contact lenses (plans and Advantage Card terms)", url: "https://www.boots.com/contactlenses/buying-contact-lenses-" },
      { label: "Boots: Opticians offers (Advantage Card points)", url: "https://boots.com/opticians-offers" },
      { label: "Boots: Opticians FAQs", url: "https://www.boots.com/opticians-faqs" },
      { label: "Boots UK: Boots Opticians practice numbers (February 2026)", url: "https://www.boots-uk.com/newsroom/features/mp-stephen-mcpartland-visits-boots-opticians-to-learn-all-about-eye-health-and-community-optometry/" },
      { label: "Boots Hearingcare: Free hearing test", url: "https://www.bootshearingcare.com/hearing-test/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Specsavers ─────────────────────────────────────────────────────
  // Facts checked against specsavers.co.uk and NHS guidance, November 2026.
  // Prices and offers change: recheck the sources below before editing.
  {
    slug: "specsavers",
    name: "Specsavers",
    shortName: "Specsavers",
    brandColor: "#1b5e20",
    seoTitle: "Specsavers Eye Test: Prices, Free NHS Tests & OCT Costs",
    seoDescription:
      "Specsavers eye tests cost £20 to £25, OCT scans up to £10 extra, and NHS-funded tests are free if you qualify. Home visits, hearing tests and how to book.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-10",
    description:
      "Specsavers is a family-run optical and hearing care business with more than 900 locations across the UK. A routine Specsavers eye test costs £20 to £25 depending on the store, an OCT scan can be added for up to £10 in most stores, and NHS-funded eye tests are free for anyone who qualifies. Specsavers also offers free hearing tests, home eye tests for people who cannot get to a store unaccompanied, and eyecare for employers.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "OCT Scan",
      "Children's Eye Tests",
      "Home Visits",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Corporate Eyecare",
    ],
    storeCount: 900,
    website: "https://www.specsavers.co.uk",
    priceRange: "Free NHS / £20 to £25 private",
    nhsAvailable: true,
    available: false,
    highlights: [
      "Routine eye tests from £20 to £25, and free for anyone eligible for an NHS-funded test",
      "Free hearing tests at participating stores, with no obligation to buy a hearing aid",
      "Home eye tests for people who cannot leave home unaccompanied, free if NHS-eligible",
      "More than 900 locations across the UK, so most people have a store nearby",
    ],
    founded: "1984",
    storeLocations: [
      "london", "croydon", "bromley", "kingston-upon-thames", "richmond", "ealing",
      "brighton", "reading", "oxford", "guildford", "canterbury", "southampton",
      "portsmouth", "maidstone", "milton-keynes", "slough", "crawley",
      "tunbridge-wells", "basingstoke", "chichester", "worthing", "bristol", "bath",
      "exeter", "plymouth", "bournemouth", "swindon", "gloucester", "cheltenham",
      "taunton", "torquay", "truro", "cambridge", "norwich", "ipswich", "colchester",
      "chelmsford", "luton", "peterborough", "southend-on-sea", "bedford", "st-albans",
      "birmingham", "coventry", "wolverhampton", "stoke-on-trent", "worcester",
      "hereford", "nottingham", "leicester", "derby", "northampton", "lincoln",
      "manchester", "liverpool", "chester", "warrington", "preston", "blackpool",
      "bolton", "lancaster", "carlisle", "newcastle", "sunderland", "durham",
      "middlesbrough", "darlington", "leeds", "sheffield", "york", "bradford", "hull",
      "huddersfield", "doncaster", "harrogate", "cardiff", "swansea", "newport",
      "wrexham", "aberystwyth", "bangor", "edinburgh", "glasgow", "aberdeen",
      "dundee", "inverness", "stirling", "perth", "belfast", "derry", "newry",
    ],
    history:
      "Specsavers was founded in Guernsey in 1984 by Doug and Mary Perkins, both optometrists, who had moved to the island to be close to Mary's retired parents. At the time, high prices and limited choice were the norm in UK optics. The Perkinses set out to offer affordable, fashionable eyecare to everyone, and built the business around a joint venture partnership model they pioneered.\n\nUnder that model, Specsavers stores are part-owned and run by their own directors, typically the optometrists and other professionals who work in them, while Specsavers provides the brand, buying, training and support behind them. It is the same model the business uses for its home visits and hearing services today.\n\nMore than 40 years on, Specsavers is still family-run. It operates in the UK, Ireland, the Netherlands, Norway, Sweden, Denmark, Finland, Australia, New Zealand, Canada and North America, and employs more than 45,000 people. Alongside eye tests, glasses and contact lenses, its stores provide audiology, and Specsavers is accredited by the NHS to provide hearing services in over half of England.",
    detailedServices: [
      {
        name: "NHS-funded eye test",
        description:
          "In England you qualify for a free NHS sight test if you are under 16, aged 16 to 18 and in full-time education, aged 60 or over, or meet other criteria such as having diabetes or glaucoma, being at risk of glaucoma, being registered sight impaired, or receiving certain benefits. In Scotland, NHS eye examinations are free for everyone. Let the store know you qualify when you book, and bring proof to your appointment.",
        price: "Free (if eligible)",
        duration: "Ask your store",
        nhsCovered: true,
      },
      {
        name: "Private eye test (comprehensive)",
        description:
          "Specsavers' standard eye test for anyone who does not qualify for an NHS-funded test. It includes a discussion of your history and symptoms, pre-tests such as the air-puff eye pressure check, a vision test with a letter chart to work out your prescription, and a detailed check of the health of your eyes. Specsavers says a routine test costs £25, though some stores charge less and promotional vouchers are sometimes available.",
        price: "£20 to £25",
        duration: "Ask your store",
        nhsCovered: false,
      },
      {
        name: "OCT scan",
        description:
          "An add-on to your eye test. OCT (optical coherence tomography) is a 3D scan of the back of the eye that looks beneath the surface of the retina, and Specsavers says it can help spot signs of conditions such as glaucoma and diabetic retinopathy up to four years earlier than traditional methods. Not every store offers it, so check with your local store when you book.",
        price: "Up to £10 extra in most stores (may vary in Scotland)",
        duration: "A few seconds (on top of your eye test)",
        nhsCovered: false,
      },
      {
        name: "Home eye test",
        description:
          "For people who cannot leave home unaccompanied because of a physical or mental illness or disability, including care home residents. A visiting optometrist carries out a full eye test with portable equipment and brings a selection of frames. Glasses are made to your prescription and should be ready within 21 days, then delivered and fitted at home. Most glasses sales on a home visit carry a £30 non-refundable home visit fee, which does not apply to the free NHS eye test itself or to fully funded NHS glasses.",
        price: "Free (if NHS-eligible) / £60 private",
        duration: "Ask when you book",
        nhsCovered: true,
      },
      {
        name: "Hearing test",
        description:
          "A free hearing check with an audiologist at participating stores, with no obligation to buy a hearing aid. The audiologist examines your ear canals and eardrums with a small camera, then plays sounds at different pitches to measure the quietest sounds you can hear. If you qualify for NHS hearing aids in an area where Specsavers provides NHS hearing services, the test, two digital hearing aids and aftercare are free.",
        price: "Free",
        duration: "Around an hour for a first appointment",
        nhsCovered: false,
      },
      {
        name: "Children's eye test",
        description:
          "Children under 16 qualify for a free NHS-funded eye test, and Specsavers recommends children have one every year as their eyes develop. You can book a child's test online, or call your local store to book a family appointment so an adult and child are seen together.",
        price: "Free (NHS-funded)",
        duration: "Ask your store",
        nhsCovered: true,
      },
      {
        name: "Corporate eyecare",
        description:
          "If your employer is registered with Specsavers' corporate eyecare scheme, you can use an employer voucher for an eye test. The scheme covers screen users, company drivers and industrial roles, including prescription safety glasses.",
        price: "Covered by employer voucher",
        duration: "Ask your store",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Check whether you qualify for a free NHS-funded eye test before you book. Use our free eye test guide if you are not sure.",
      "Find your nearest Specsavers using the store finder on specsavers.co.uk, or pick your town from the Specsavers locations listed on this page.",
      "Book online at specsavers.co.uk or call the store. Children's tests can be booked online, and family appointments by phone.",
      "If you would like an OCT scan, add it when you book and check that your store offers it. It costs up to £10 extra in most stores.",
      "On the day, bring your current glasses or contact lenses, a list of any medicines you take, and proof if you qualify for an NHS-funded test.",
      "If you cannot get to a store unaccompanied, request a home visit through specsavers.co.uk or call the Specsavers home visits team on 0800 198 1132.",
    ],
    prosAndCons: {
      pros: [
        "Clear published pricing: a routine eye test is £20 to £25, and an OCT scan is up to £10 extra in most stores",
        "Free NHS-funded eye tests for anyone who qualifies, and free eye examinations for everyone in Scotland",
        "Free hearing tests with no obligation to buy",
        "Home eye tests for people who cannot leave home unaccompanied",
        "More than 900 UK locations, so most people have a store nearby",
      ],
      cons: [
        "Not yet bookable through eyetest.co.uk, so you book directly with Specsavers",
        "OCT scans cost extra and are not available in every store",
        "Glasses bought on a home visit usually carry a £30 home visit fee",
        "Prices vary by store, and offers change regularly",
      ],
    },
    faqs: [
      {
        q: "How much is an eye test at Specsavers?",
        a: "Specsavers says a routine eye test costs £25, with prices between £20 and £25 depending on the store. Adding an OCT scan costs up to £10 extra in most stores, though this may vary in Scotland. A private home eye test costs £60. If you qualify for an NHS-funded eye test, your test is free.",
      },
      {
        q: "Can I get a free eye test at Specsavers?",
        a: "Yes, if you qualify for an NHS-funded eye test. In England that includes children under 16, 16 to 18 year olds in full-time education, people aged 60 or over, and people who meet other criteria such as having diabetes or glaucoma or receiving certain benefits. Everyone in Scotland is entitled to a free NHS eye examination. You can also have a free test with a valid employer eyecare voucher. Specsavers also runs time-limited free or discounted eye test offers at certain times of the year, which are subject to availability and may only apply at some stores, so check specsavers.co.uk for current offers.",
      },
      {
        q: "What is an OCT scan and how much does it cost at Specsavers?",
        a: "OCT stands for optical coherence tomography. It is a 3D scan of the back of your eye, added to your normal eye test, that lets the optometrist see beneath the surface of the retina. Specsavers says it can help spot signs of conditions such as glaucoma and diabetic retinopathy up to four years earlier than traditional methods. It costs up to £10 extra in most stores, and not every store offers it.",
      },
      {
        q: "Can Specsavers do an eye test at home?",
        a: "Yes. Specsavers offers home eye tests for people who cannot leave home unaccompanied because of a physical or mental illness or disability, including people in care homes. The test is free if you qualify for an NHS-funded home eye test; otherwise a private home test costs £60. Glasses ordered at home should be ready within 21 days and are delivered and fitted at home.",
      },
      {
        q: "Are Specsavers hearing tests free?",
        a: "Yes. A hearing check with a Specsavers audiologist is free at participating stores, and there is no obligation to buy a hearing aid. A first appointment usually takes around an hour. Specsavers notes that a fuller hearing assessment may be chargeable, so ask in store.",
      },
      {
        q: "What is the Specsavers 2 for 1 offer?",
        a: "At the time of writing, Specsavers offers 2 for 1 glasses from £70, where you get a second pair free from the same price range or below with single-vision lenses to the same prescription, and 2 for 1 designer glasses from £100 to £170. There are also 2 for 1 offers on varifocals (with varifocal lenses from £39) and on glasses with sunglasses. Offers change regularly, so check specsavers.co.uk for current terms.",
      },
      {
        q: "How often should I have an eye test?",
        a: "Specsavers recommends an eye test at least every two years for adults and every year for children. People with a family history of glaucoma, and those aged 40 or over or 60 or over, may need more frequent tests, so ask your optometrist. If your vision changes, book a test straight away.",
      },
      {
        q: "How can I get money off at Specsavers?",
        a: "Specsavers does not run a general 50% off offer, but there are several ways to pay less. At the time of writing these include 2 for 1 glasses from £70 (a second pair free from the same price range or below), 25% off glasses from the £70 range for students, 20% off glasses from the £70 range for people over 60, complete glasses from £15, and free standard varifocal lenses with glasses from the £70 range. If you qualify for an NHS optical voucher it can go towards your glasses, and some employers provide Specsavers corporate eyecare vouchers. Offers change regularly, so check specsavers.co.uk for current terms.",
      },
      {
        q: "Can I walk into Specsavers for an eye test?",
        a: "Specsavers asks you to book eye tests online at specsavers.co.uk or by calling your local store, and many stores show same-week availability online. If you have an urgent eye problem such as pain, a red eye or a sudden change in vision, call your nearest Specsavers. In some areas Specsavers provides NHS urgent eye care that you can self-refer to without seeing your GP, and elsewhere it offers private Eye Health Clinic appointments.",
      },
      {
        q: "How long does a Specsavers eye test take?",
        a: "Specsavers does not publish a fixed time for UK eye tests. Its Irish site says a test for a young, healthy person with no apparent problems takes around 20 minutes, but it can take longer depending on your needs and on whether you add an OCT scan. Allow extra time if you plan to choose glasses afterwards.",
      },
      {
        q: "Are Specsavers opticians properly qualified?",
        a: "Yes. Eye tests at Specsavers are carried out by optometrists, and every optometrist and dispensing optician practising in the UK must be registered with the General Optical Council, the same as at any other optician. Specsavers stores are part-owned and run by their own directors, who are often the optometrists working in the store.",
      },
      {
        q: "How much are hearing aids at Specsavers?",
        a: "Specsavers says its Advance range of digital hearing aids starts at £500, which includes two hearing aids, four years' worth of batteries and a four-year guarantee, with free aftercare. If you qualify for NHS hearing aids and live in an area where Specsavers provides NHS hearing services, the hearing test, two digital hearing aids and aftercare are free.",
      },
      {
        q: "Is Specsavers or an independent optician better?",
        a: "It depends on what matters to you. All UK opticians follow the same professional regulation, and NHS-funded eye tests are the same examination wherever you go. Specsavers offers published prices, a large network and regular offers, while independent opticians may offer longer appointments, specialist services or a different frame range. If you want to compare opticians near you that you can book online, enter your postcode on eyetest.co.uk.",
      },
      {
        q: "Can I book a Specsavers appointment through eyetest.co.uk?",
        a: "Not yet. Specsavers appointments are not currently bookable through eyetest.co.uk, so book directly at specsavers.co.uk or by calling your local store. If you would like to compare other opticians near you that you can book through us, enter your postcode in the search box.",
      },
    ],
    extraSections: [
      {
        heading: "Specsavers glasses, contact lenses and hearing aids",
        intro:
          "Beyond the eye test, this is what Specsavers sells and how its main ranges are priced. Prices were checked on specsavers.co.uk in November 2026 and can change.",
        items: [
          {
            title: "Glasses",
            text: "Complete glasses start from £15 a pair, and the main 2 for 1 offer applies from the £70 range, with a second pair free from the same price range or below with single-vision lenses to the same prescription. Designer glasses are offered 2 for 1 across the £100 to £170 ranges, and the second pair can be prescription sunglasses instead.",
          },
          {
            title: "Varifocals and lens options",
            text: "Standard varifocal lenses are fitted free with glasses from the £70 range, and 2 for 1 varifocal glasses are available from the £70 to £170 ranges with varifocal lenses from £39. Elite varifocal glasses start from £170, polarising lenses are £70, and there is £40 off lenses with glasses from the £70 range.",
          },
          {
            title: "Contact lenses",
            text: "You need an up-to-date contact lens prescription, which means an eye test and a contact lens consultation if you have not worn lenses before. Specsavers offers a free contact lens trial with one month's free lenses for new wearers, its own easyvision lenses alongside brands such as Acuvue and Alcon, and an easycare subscription. Existing wearers can reorder in store or online in 3 to 12 month supplies.",
          },
          {
            title: "Hearing tests and hearing aids",
            text: "Hearing checks are free with no obligation to buy. The Advance range of digital hearing aids starts at £500 for two hearing aids, including four years of batteries and a four-year guarantee, and Specsavers also sells rechargeable, Bluetooth and invisible in-ear models. NHS hearing aids are free in areas where Specsavers is accredited to provide NHS hearing services.",
          },
          {
            title: "Urgent eye care",
            text: "If you have a sudden eye problem, call your nearest Specsavers. Where Specsavers holds an NHS contract for urgent eye care you can self-refer without seeing your GP, and in Wales, London, Scotland and Northern Ireland the appointment may be NHS-funded. Elsewhere Specsavers offers private Eye Health Clinic appointments.",
          },
          {
            title: "Discounts",
            text: "Students get 25% off glasses from the £70 range, people over 60 get 20% off glasses from the £70 range, and children qualify for free glasses with an NHS voucher, with offers on a second pair. Time-limited promotions also run, such as 25% off designer frames during Black Friday 2026.",
          },
        ],
      },
    ],
    externalRating: {
      source: "Trustpilot",
      url: "https://uk.trustpilot.com/review/www.specsavers.co.uk",
      score: "4.5 out of 5",
      count: "around 194,000 reviews",
      checked: "November 2026",
    },
    sources: [
      { label: "Specsavers: How much is an eye test?", url: "https://www.specsavers.co.uk/help-and-faqs/how-much-is-an-eye-test" },
      { label: "Specsavers: Book an eye test", url: "https://www.specsavers.co.uk/eye-test" },
      { label: "Specsavers: Home eye tests", url: "https://www.specsavers.co.uk/home-visits/home-eye-tests" },
      { label: "Specsavers: Hearing test", url: "https://www.specsavers.co.uk/hearing/hearing-test" },
      { label: "Specsavers: About Specsavers", url: "https://www.specsavers.co.uk/about" },
      { label: "Specsavers: UK tax strategy (company history)", url: "https://www.specsavers.co.uk/about/uk-tax-strategy" },
      { label: "Specsavers: 2 for 1 glasses from £70", url: "https://www.specsavers.co.uk/offers/2-for-1-glasses-from-gbp70" },
      { label: "Specsavers: Offers", url: "https://www.specsavers.co.uk/offers" },
      { label: "Specsavers: Contact lenses", url: "https://www.specsavers.co.uk/contact-lenses" },
      { label: "Specsavers: Hearing aids", url: "https://www.specsavers.co.uk/hearing/hearing-aids" },
      { label: "Specsavers: Urgent eye care", url: "https://www.specsavers.co.uk/community-health-care/optical-services" },
      { label: "Specsavers Ireland: How long should an eye test take?", url: "https://www.specsavers.ie/help-and-faqs/how-long-should-an-eye-test-take" },
      { label: "Trustpilot: Specsavers reviews", url: "https://uk.trustpilot.com/review/www.specsavers.co.uk" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Vision Express ─────────────────────────────────────────────────
  {
    slug: "vision-express",
    name: "Vision Express",
    shortName: "Vision Express",
    brandColor: "#e65100",
    seoTitle: "Vision Express Eye Test: £30 with OCT, NHS Upgrade from £6",
    seoDescription:
      "The Vision Express Advanced Eye Test costs £30 with an OCT scan included. NHS-funded tests are free if you qualify, with an upgrade to Advanced from £6.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description:
      "Vision Express has over 550 stores across the UK and Ireland, on high streets and inside Tesco stores, and is part of the EssilorLuxottica group. Its Advanced Eye Test costs £30 and includes an OCT 3D eye scan, a UV protection assessment and a dry eye assessment. NHS-funded eye tests are free for anyone who qualifies, and NHS patients can upgrade to the Advanced Eye Test from £6.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "OCT Scan",
      "Children's Eye Tests",
      "Contact Lenses",
      "Glasses",
    ],
    storeCount: 550,
    website: "https://www.visionexpress.com",
    priceRange: "Free NHS / £30 private (OCT included)",
    nhsAvailable: true,
    available: false,
    highlights: [
      "Advanced Eye Test for £30, with an OCT 3D eye scan, UV protection assessment and dry eye assessment included",
      "Free NHS-funded eye tests, with an upgrade to the Advanced Eye Test from £6",
      "100 days free returns and free lifetime service on purchases",
      "Over 550 stores in the UK and Ireland, including inside Tesco stores",
    ],
    founded: "1988",
    storeLocations: [
      "london", "croydon", "bromley", "kingston-upon-thames", "richmond", "ealing",
      "brighton", "reading", "oxford", "guildford", "canterbury", "southampton",
      "portsmouth", "maidstone", "milton-keynes", "slough", "crawley",
      "tunbridge-wells", "basingstoke", "chichester", "worthing", "bristol", "bath",
      "exeter", "plymouth", "bournemouth", "swindon", "gloucester", "cheltenham",
      "taunton", "torquay", "cambridge", "norwich", "ipswich", "colchester",
      "chelmsford", "luton", "peterborough", "southend-on-sea", "st-albans",
      "birmingham", "coventry", "wolverhampton", "stoke-on-trent", "worcester",
      "nottingham", "leicester", "derby", "northampton", "lincoln",
      "manchester", "liverpool", "chester", "warrington", "preston", "blackpool",
      "bolton", "newcastle", "sunderland", "middlesbrough",
      "leeds", "sheffield", "york", "bradford", "hull", "huddersfield", "doncaster",
      "cardiff", "swansea", "newport",
      "edinburgh", "glasgow", "aberdeen", "dundee",
      "belfast",
    ],
    history:
      "Vision Express opened its first store in Gateshead in 1988. It grew on the high street and, in 2017, took over Tesco Opticians, which added more than 200 practices inside Tesco stores.\n\nToday Vision Express says it has over 550 stores across the UK and Ireland, on local high streets and inside Tesco stores, and that every store offers the same eye test service, while the frame brands on offer vary by location.\n\nVision Express is part of the EssilorLuxottica group, which operates in more than 40 countries and gives Vision Express access to the group's frame and lens brands.",
    detailedServices: [
      {
        name: "NHS-funded eye test",
        description:
          "A free eye test for anyone who qualifies for NHS funding, such as children under 16, people aged 60 or over, people with diabetes or glaucoma and people on certain benefits. It includes a standard eye health screening, a vision test and a personal recommendation. NHS patients can upgrade to the Advanced Eye Test from £6.",
        price: "Free (if eligible)",
        duration: "Varies",
        nhsCovered: true,
      },
      {
        name: "Advanced Eye Test",
        description:
          "Vision Express's private eye test, including an eye health screening with an OCT 3D eye scan, a UV protection assessment and a dry eye assessment, followed by a vision test and a personal recommendation.",
        price: "£30",
        duration: "Varies",
        nhsCovered: false,
      },
      {
        name: "Children's eye test",
        description:
          "Free on the NHS for children under 16. Vision Express recommends regular checks so that any problems are picked up early.",
        price: "Free (NHS funded)",
        duration: "Varies",
        nhsCovered: true,
      },
      {
        name: "Contact lens appointments",
        description:
          "Contact lens assessments and check-ups, which Vision Express recommends at least every 12 months for existing wearers. Ask in store for prices and contact lens plan options.",
        price: "Ask in store",
        duration: "Varies",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Find your nearest Vision Express by postcode, here on eyetest.co.uk or at visionexpress.com",
      "Choose your appointment: Advanced Eye Test, NHS-funded eye test, children's eye test or contact lens appointment",
      "Tell Vision Express if you think you qualify for an NHS-funded eye test",
      "Book online or talk to the team in store",
      "Bring your current glasses or contact lenses and any proof of NHS entitlement",
    ],
    prosAndCons: {
      pros: [
        "An OCT scan is included in the £30 private Advanced Eye Test",
        "NHS patients can upgrade to the Advanced Eye Test from £6",
        "100 days free returns and free lifetime service on purchases",
        "Over 550 stores, including inside Tesco",
      ],
      cons: [
        "The £30 private price is higher than Specsavers' published price (£20 to £25)",
        "Frame brands vary from store to store",
        "Not currently available for booking through eyetest.co.uk",
      ],
    },
    faqs: [
      {
        q: "How much is an eye test at Vision Express?",
        a: "Vision Express says its Advanced Eye Test costs £30 and includes an OCT 3D eye scan, a UV protection assessment and a dry eye assessment. If you qualify for an NHS-funded eye test, it is free, and you can upgrade to the Advanced Eye Test from £6.",
      },
      {
        q: "Does Vision Express include an OCT scan?",
        a: "Yes. The OCT 3D eye scan is part of the £30 Advanced Eye Test, so there is no separate OCT charge. NHS patients can upgrade to the Advanced Eye Test from £6.",
      },
      {
        q: "Does Vision Express do free eye tests?",
        a: "Yes, for anyone who qualifies for an NHS-funded eye test, including children under 16, people aged 60 or over and people with diabetes or glaucoma. Vision Express also runs time-limited offers from time to time, which are subject to availability and may only apply at some stores.",
      },
      {
        q: "Who owns Vision Express?",
        a: "Vision Express is part of the EssilorLuxottica group, a global eyewear company operating in more than 40 countries.",
      },
      {
        q: "Is there a Vision Express in Tesco?",
        a: "Yes. Vision Express runs opticians inside many Tesco stores as well as on high streets, with over 550 stores across the UK and Ireland.",
      },
      {
        q: "What is Vision Express's returns policy?",
        a: "Vision Express says it offers 100 days free returns and free lifetime service on purchases. Check the terms in store or on its website before you buy.",
      },
      {
        q: "Can I book a Vision Express appointment through eyetest.co.uk?",
        a: "Vision Express is not currently available for direct booking through eyetest.co.uk. You can compare it here and then book online at visionexpress.com or in store.",
      },
    ],
    sources: [
      { label: "Vision Express: Book an eye test (prices and what is included)", url: "https://www.visionexpress.com/eye-test" },
      { label: "Vision Express: About us", url: "https://www.visionexpress.com/about-us" },
      { label: "Vision Express: Eye test for contact lenses", url: "https://www.visionexpress.com/contact-lenses/check-up-advice" },
      { label: "CMA: Vision Express acquisition of Tesco Opticians", url: "https://assets.publishing.service.gov.uk/media/59e9b28aed915d6aadcdaf2d/final_decision_vision_express_tesco.pdf" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── ASDA Opticians ─────────────────────────────────────────────────
  {
    slug: "asda-opticians",
    name: "ASDA Opticians",
    shortName: "ASDA",
    brandColor: "#78b530",
    description:
      "ASDA Opticians operates from within ASDA supermarkets across the UK, offering affordable eye care with the convenience of supermarket shopping. They are known for their straightforward pricing and competitive rates on both eye tests and eyewear. As part of the ASDA brand, they focus on delivering value without compromising on clinical quality, making eye care accessible to budget-conscious families.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Children's Eye Tests",
    ],
    storeCount: 200,
    website: "https://opticians.asda.com",
    priceRange: "Free NHS / From £20 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Among the most affordable high-street options for glasses in the UK",
      "Convenient locations inside ASDA supermarkets with free parking",
      "Straightforward pricing with no hidden extras",
      "Good selection of budget and mid-range frames for all ages",
    ],
    founded: "2002",
    storeLocations: [
      "london", "croydon", "bromley", "kingston-upon-thames", "ealing",
      "brighton", "reading", "southampton", "portsmouth", "milton-keynes", "slough",
      "crawley", "basingstoke", "bristol", "bath", "exeter", "plymouth",
      "bournemouth", "swindon", "gloucester", "cheltenham", "taunton",
      "cambridge", "norwich", "ipswich", "colchester", "chelmsford", "luton",
      "peterborough", "southend-on-sea", "bedford",
      "birmingham", "coventry", "wolverhampton", "stoke-on-trent", "worcester",
      "nottingham", "leicester", "derby", "northampton",
      "manchester", "liverpool", "chester", "warrington", "preston", "blackpool",
      "bolton", "newcastle", "sunderland", "middlesbrough",
      "leeds", "sheffield", "bradford", "hull", "doncaster",
      "cardiff", "swansea", "newport",
    ],
    history:
      "ASDA Opticians launched in 2002 as part of ASDA's broader strategy to offer a full range of health and lifestyle services within its supermarket stores. The concept followed the success of ASDA's pharmacy business, which had already demonstrated that customers were receptive to receiving healthcare services during their regular supermarket shop. By locating optical practices inside ASDA stores, the company was able to offer significantly lower prices than traditional high-street opticians, benefiting from shared premises, lower rent, and the supermarket's enormous footfall.\n\nThe optical business grew steadily through the 2000s and 2010s, expanding to around 200 locations across the UK. ASDA's parent company Walmart — which acquired ASDA in 1999 — brought considerable retail expertise and buying power, enabling the optical division to negotiate competitive prices on both frames and lenses. In 2021, ASDA was sold by Walmart to the Issa brothers and private equity firm TDR Capital, but the optical business continued to operate on the same value-focused model.\n\nToday, ASDA Opticians is known primarily for being one of the most affordable places to buy glasses on the UK high street. Their pricing is transparent and straightforward, with complete glasses packages starting from as little as £15 for basic frames with single-vision lenses. While they do not carry the designer brand ranges found at chains like Boots or Vision Express, they offer a solid selection of own-brand and mid-range frames, and their clinical services meet the same regulatory standards as any other registered optician. Free parking at ASDA supermarkets is an added convenience that many customers value.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A full NHS-funded eye examination for eligible patients. The test covers visual acuity, refraction, intraocular pressure measurement, and a health examination of the eyes. ASDA optometrists are fully qualified and registered with the General Optical Council, providing the same standard of clinical care as any high-street optician.",
        price: "Free (if eligible)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A comprehensive eye examination for patients who do not qualify for the NHS-funded test. ASDA offers one of the lowest-priced private eye tests on the high street. The examination includes refraction, eye health checks, and a prescription for glasses or contact lenses if needed.",
        price: "From £20",
        duration: "20-25 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Consultation",
        description:
          "An initial assessment to determine your suitability for contact lenses. Includes corneal measurements, tear film assessment, and a trial fitting with appropriate lenses. ASDA offers a range of contact lenses from major manufacturers at competitive prices, and can set up a regular supply plan for ongoing wearers.",
        price: "From £25",
        duration: "25-35 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "A free NHS eye test for children under 16, adapted for younger patients. ASDA optometrists use age-appropriate techniques and charts to assess children's vision, and the store stocks a range of children's frames available free or at a low cost with the NHS voucher.",
        price: "Free (NHS funded)",
        duration: "20-30 minutes",
        nhsCovered: true,
      },
      {
        name: "Glasses Dispensing",
        description:
          "Once you have your prescription, ASDA's dispensing opticians will help you choose frames and lenses. ASDA is known for extremely competitive pricing, with complete pairs of glasses starting from £15 for basic frames with single-vision lenses. Lens upgrades such as anti-reflection coatings and thinner lenses are available at additional cost but remain competitively priced.",
        price: "From £15 (complete pair)",
        duration: "15-20 minutes",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Search for your nearest ASDA Opticians by entering your postcode on eyetest.co.uk",
      "View available appointment types and compare prices with other local opticians",
      "Choose a date and time that fits your schedule — evening and weekend slots are available at most stores",
      "Enter your details and confirm your booking",
      "Receive confirmation by email with directions and parking information for your ASDA store",
      "Attend your appointment — combine your eye test with your regular supermarket shop for convenience",
    ],
    prosAndCons: {
      pros: [
        "Among the lowest prices for glasses on the UK high street, with complete pairs from £15",
        "Free parking at ASDA supermarket locations makes visits easy and stress-free",
        "Transparent, straightforward pricing with no pressure to upsell",
        "Convenient to combine eye care with your regular weekly shop",
      ],
      cons: [
        "Limited designer and premium frame selection compared to dedicated opticians",
        "No OCT scanning or advanced eye health screening available at most locations",
        "No hearing care services offered",
      ],
    },
    faqs: [
      {
        q: "How much do glasses cost at ASDA Opticians?",
        a: "ASDA Opticians offers some of the most competitive prices on the high street. Complete glasses — frames with single-vision lenses — start from as little as £15. Mid-range frames typically cost between £30 and £80, and lens upgrades such as anti-reflection coatings, thinner high-index lenses, and varifocals are available at additional cost but remain cheaper than most competitors. NHS vouchers can be applied to reduce costs further for eligible patients.",
      },
      {
        q: "Are ASDA eye tests as good as other opticians?",
        a: "Yes. All ASDA optometrists are fully qualified and registered with the General Optical Council, which is the same regulatory body that governs every optician in the UK. The clinical quality of the eye test is the same standard as you would receive at any other registered opticians. The main difference is that ASDA offers fewer premium add-on services such as OCT scanning, and the frame selection focuses more on value than designer brands.",
      },
      {
        q: "Can I get free glasses at ASDA with an NHS voucher?",
        a: "Yes, ASDA Opticians accepts NHS optical vouchers. If you are eligible for an NHS voucher — which includes children under 16, people on qualifying benefits, and those with complex prescriptions — it can be applied towards the cost of your glasses. Because ASDA's frame prices are very competitive, many patients find that the NHS voucher covers the full cost of a basic pair of glasses.",
      },
      {
        q: "Does ASDA Opticians offer contact lenses?",
        a: "Yes, ASDA Opticians provides contact lens assessments, fittings, and ongoing supply. They stock lenses from major manufacturers at competitive prices. Monthly supply plans are available for regular contact lens wearers, though the range may be narrower than at specialist contact lens providers.",
      },
      {
        q: "Is there free parking at ASDA Opticians?",
        a: "Yes, one of the significant advantages of ASDA Opticians is free parking. All ASDA stores provide free car parking for customers, which means you can drive to your eye test without worrying about parking charges or time limits. This is a notable benefit compared to high-street opticians in town centres where parking can be expensive and difficult to find.",
      },
      {
        q: "Does ASDA Opticians do home visits?",
        a: "No, ASDA Opticians does not currently offer a home visit eye testing service. All eye tests are carried out at ASDA supermarket locations. If you or a family member cannot travel to a store for an eye test, you may want to consider opticians that do offer home visits, such as Specsavers or Scrivens.",
      },
      {
        q: "How often should I visit ASDA Opticians for an eye test?",
        a: "The general recommendation is an eye test every two years for most adults, or annually if you are over 70, diabetic, have a family history of glaucoma, or have been advised by your optometrist to come back sooner. Children should have their eyes tested annually. Regular tests are important not just for keeping your prescription up to date but for detecting eye health issues early.",
      },
      {
        q: "What are the opening hours for ASDA Opticians?",
        a: "ASDA Opticians generally follow the opening hours of the ASDA supermarket they are located in, which typically means long opening hours including evenings and weekends. Most stores are open Monday to Saturday from around 9am to 8pm or 9pm, and Sunday from around 10am to 4pm. Hours may vary by location, so check your local store's specific times when booking.",
      },
    ],
    rating: 4.2,
    reviewCount: 1500,
  },

  // ─── Leightons ──────────────────────────────────────────────────────
  {
    slug: "leightons",
    name: "Leightons Opticians & Hearing Care",
    shortName: "Leightons",
    brandColor: "#1e3a5f",
    description:
      "Leightons is a family-owned opticians and hearing care provider established in 1928, operating primarily across southern England. They are known for their premium, personalised service and investment in the latest clinical technology, including advanced OCT scanning and myopia management for children. Leightons holds a reputation for thorough eye examinations that go well beyond the standard NHS sight test.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Children's Eye Tests",
      "OCT Scan",
      "Diabetic Screening",
      "Home Visits",
    ],
    storeCount: 35,
    website: "https://www.leightons.co.uk",
    priceRange: "Free NHS / From £39 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Family-owned since 1928 with a strong reputation for clinical excellence",
      "Ultimate Eye Examination includes OCT, visual fields, and detailed health screening",
      "Specialist myopia management service for children",
      "Combined opticians and hearing care under one roof",
    ],
    founded: "1928",
    storeLocations: [
      "london", "croydon", "bromley", "kingston-upon-thames", "richmond", "ealing",
      "brighton", "reading", "oxford", "guildford", "canterbury", "southampton",
      "portsmouth", "basingstoke", "chichester", "worthing", "tunbridge-wells",
      "crawley", "slough", "chelmsford", "st-albans",
    ],
    history:
      "Leightons Opticians was founded in 1928 by Henry Oscar Leighton in the town of Marlow, Buckinghamshire. From its earliest days, the practice distinguished itself through meticulous attention to patient care and a commitment to investing in the best available clinical equipment. The business remained in the Leighton family for decades, gradually expanding across the Home Counties and southern England while maintaining the personal, community-focused ethos that had defined the original practice.\n\nThroughout the latter half of the twentieth century, Leightons grew steadily, opening new branches in affluent towns across Surrey, Hampshire, Berkshire, and Sussex. The company was an early adopter of new optical technology, introducing computerised eye testing equipment and OCT scanning before many of its competitors. In the 2000s, Leightons expanded its services to include hearing care, recognising the overlap between vision and hearing health in its predominantly older patient demographic. The combined opticians-and-audiologists model allowed patients to manage both aspects of their sensory health in a single appointment.\n\nToday, Leightons operates approximately 35 practices across southern England and remains privately owned and family-run. The company has developed a strong reputation for its \"Ultimate Eye Examination\" — a comprehensive assessment that includes OCT scanning, visual field testing, digital retinal photography, and a detailed consultation that typically lasts 45 minutes to an hour. Leightons also offers a specialist myopia management service for children, using the latest evidence-based interventions to slow the progression of short-sightedness. The brand positions itself firmly at the premium end of the market, prioritising clinical depth and personalised care over volume and price competition.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A standard NHS-funded sight test for eligible patients. Leightons provides a thorough examination within the NHS framework, including visual acuity assessment, refraction, and eye health checks. Even within the NHS test, Leightons optometrists take time to discuss findings and answer questions fully.",
        price: "Free (if eligible)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A comprehensive private eye examination that allows more time for discussion and assessment than the standard NHS test. Leightons' private test includes detailed refraction, binocular vision assessment, and a thorough examination of eye health using slit lamp biomicroscopy.",
        price: "From £39",
        duration: "30 minutes",
        nhsCovered: false,
      },
      {
        name: "Ultimate Eye Examination",
        description:
          "Leightons' flagship eye examination — a thorough, technology-led assessment that goes far beyond a standard sight test. It includes OCT scanning of the retina and optic nerve, wide-field digital retinal photography, visual field testing, and a detailed discussion of your eye health and visual needs. This examination is designed to detect conditions such as glaucoma, macular degeneration, and diabetic retinopathy at the earliest possible stage.",
        price: "From £79",
        duration: "45-60 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Consultation",
        description:
          "A specialist appointment for patients considering contact lenses or those wanting to switch types. Leightons offers a wide range of contact lenses including daily disposables, monthly lenses, toric lenses for astigmatism, and multifocal lenses. The consultation includes detailed corneal mapping, tear film analysis, and a comprehensive trial fitting.",
        price: "From £50",
        duration: "40-50 minutes",
        nhsCovered: false,
      },
      {
        name: "Myopia Management for Children",
        description:
          "A specialist service designed to slow the progression of myopia (short-sightedness) in children. Leightons uses evidence-based interventions including MiSight contact lenses, Miyosmart spectacle lenses, and orthokeratology (overnight corneal reshaping lenses). The service includes an initial assessment, ongoing monitoring, and regular reviews to track progression.",
        price: "From £60 (initial assessment)",
        duration: "45 minutes (initial), 30 minutes (follow-up)",
        nhsCovered: false,
      },
      {
        name: "Hearing Assessment",
        description:
          "A comprehensive hearing test carried out by a qualified audiologist at selected Leightons branches. The assessment includes an ear health check, pure tone audiometry, and speech-in-noise testing. If hearing loss is detected, the audiologist will discuss hearing aid options from leading manufacturers including Phonak, Oticon, and Widex.",
        price: "Free",
        duration: "45 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "A specialist eye test for children, using age-appropriate techniques and a gentle, patient approach. Leightons optometrists are experienced in working with young children and will check for common childhood vision issues including lazy eye, squint, and focusing difficulties. All children under 16 qualify for a free NHS eye test.",
        price: "Free (NHS funded)",
        duration: "25-30 minutes",
        nhsCovered: true,
      },
      {
        name: "Diabetic Eye Check",
        description:
          "A specialist eye examination for patients with diabetes, incorporating OCT scanning and digital retinal photography to closely monitor the health of the blood vessels at the back of the eye. Leightons recommends this annually for all patients with type 1 or type 2 diabetes, as early detection of diabetic retinopathy is essential for preserving vision.",
        price: "From £45",
        duration: "30 minutes",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Find your nearest Leightons branch by searching with your postcode on eyetest.co.uk",
      "Browse available services — from standard NHS tests to the Ultimate Eye Examination and myopia management",
      "Select your preferred appointment type, date, and time",
      "Provide your details and any relevant medical history or special requirements",
      "Receive a confirmation email with directions to your branch and guidance on what to bring",
      "Attend your appointment — allow extra time if you wish to browse the frame collection afterwards",
    ],
    prosAndCons: {
      pros: [
        "Exceptionally thorough Ultimate Eye Examination with advanced OCT and visual field testing",
        "Family-owned since 1928 with a genuine focus on patient relationships and continuity of care",
        "Specialist myopia management programme for children using the latest interventions",
        "Combined opticians and hearing care for convenient single-location appointments",
        "Premium frame selection including independent and niche designers not found at chain opticians",
      ],
      cons: [
        "Higher prices than budget and mainstream chain opticians",
        "Limited geographic coverage — branches only in southern England",
        "Smaller scale means fewer available appointment slots at busy times",
      ],
    },
    faqs: [
      {
        q: "What is the Ultimate Eye Examination at Leightons?",
        a: "The Ultimate Eye Examination is Leightons' most comprehensive eye health assessment. It goes well beyond a standard sight test, incorporating OCT (Optical Coherence Tomography) scanning, wide-field digital retinal photography, visual field testing, and an extended consultation with your optometrist. The examination typically lasts between 45 minutes and an hour and is designed to detect eye conditions at the earliest possible stage. It is particularly recommended for patients with a family history of eye disease, those over 40, and anyone wanting the most thorough possible check of their eye health.",
      },
      {
        q: "Does Leightons offer myopia management for children?",
        a: "Yes, Leightons is one of the leading providers of myopia management for children in the UK. Their programme uses evidence-based treatments to slow the progression of short-sightedness, including MiSight daily contact lenses, Miyosmart spectacle lenses, and orthokeratology (overnight corneal reshaping lenses). The service begins with a detailed assessment of the child's myopia and risk factors, followed by a tailored treatment plan with regular monitoring appointments to track progress.",
      },
      {
        q: "Where are Leightons branches located?",
        a: "Leightons operates approximately 35 branches across southern England, concentrated in the Home Counties and along the south coast. You will find Leightons practices in areas including London, Surrey, Hampshire, Berkshire, Sussex, Kent, and Buckinghamshire. They do not currently have branches in the Midlands, the North of England, Scotland, Wales, or Northern Ireland.",
      },
      {
        q: "Is Leightons more expensive than Specsavers or Boots?",
        a: "Leightons is positioned at the premium end of the market, and their prices are generally higher than mainstream chains like Specsavers, Boots, or ASDA. However, the higher cost reflects longer appointment times, more advanced diagnostic technology, and a greater depth of clinical assessment. Many patients who have switched to Leightons report that the difference in the thoroughness and quality of the examination justifies the additional cost. NHS eye tests are available free to eligible patients, just as at any other optician.",
      },
      {
        q: "Does Leightons offer hearing aids?",
        a: "Yes, many Leightons branches provide a full audiology service alongside their optical care. They work with leading hearing aid manufacturers including Phonak, Oticon, Widex, and Signia, offering a range of devices from discreet in-ear models to powerful behind-the-ear aids. Hearing assessments are free, and audiologists will explain all available options, including the differences between NHS-funded and private hearing aids.",
      },
      {
        q: "Can I get an NHS eye test at Leightons?",
        a: "Yes, Leightons provides free NHS-funded eye tests for all eligible patients. This includes children under 16, adults over 60, people receiving certain means-tested benefits, and patients with specific medical conditions such as diabetes or glaucoma. If you also want the enhanced tests included in the Ultimate Eye Examination — such as OCT scanning and visual fields — these are available at an additional cost.",
      },
      {
        q: "How do I book an appointment at Leightons through eyetest.co.uk?",
        a: "You can search for your nearest Leightons branch by entering your postcode on eyetest.co.uk. The results will show you available appointment types, prices, and time slots. Select the service you want, pick a convenient date and time, enter your details, and confirm the booking. You will receive an email confirmation with all the information you need for your visit.",
      },
      {
        q: "What frame brands does Leightons stock?",
        a: "Leightons carries a curated selection of premium and independent frame brands that you are unlikely to find at the larger chain opticians. Their collections typically include brands such as Tom Ford, Lindberg, Mykita, Etnia Barcelona, and Face a Face, alongside more widely available names like Ray-Ban and Oliver Peoples. Each branch has its own carefully chosen selection, so the range may vary between locations.",
      },
    ],
    rating: 4.6,
    reviewCount: 280,
  },

  // ─── Rawlings ───────────────────────────────────────────────────────
  {
    slug: "rawlings",
    name: "Rawlings Opticians",
    shortName: "Rawlings",
    brandColor: "#8b2252",
    description:
      "Rawlings Opticians is a long-established independent chain based in South East England, known for its community-focused approach and dedicated patient care. With around ten practices, they offer a more personal alternative to the larger chains, combining traditional optometry values with modern diagnostic equipment. Rawlings has built a loyal patient base through consistently high standards of clinical care and customer service.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Children's Eye Tests",
      "OCT Scan",
      "Diabetic Screening",
    ],
    storeCount: 10,
    website: "https://www.rawlings.co.uk",
    priceRange: "Free NHS / From £30 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Independent, community-focused practices in South East England",
      "Personal service with longer appointment times than larger chains",
      "Modern diagnostic technology including OCT retinal scanning",
      "Strong patient loyalty with a focus on continuity of care",
    ],
    founded: "1898",
    storeLocations: [
      "london", "bromley", "croydon", "maidstone", "tunbridge-wells", "crawley",
      "chichester", "worthing", "canterbury", "brighton",
    ],
    history:
      "Rawlings Opticians was founded in 1898, making it one of the oldest optical practices still operating in the United Kingdom. The business began as a single practice in the South East of England at a time when optometry was still a relatively young profession, and spectacles were only beginning to become widely available to the general public. From the outset, the Rawlings name became associated with careful, unhurried patient care and a deep commitment to clinical standards — values that have remained at the heart of the business for over 125 years.\n\nThroughout the twentieth century, Rawlings expanded gradually, opening additional practices across Kent, Sussex, and South London. Unlike many optical businesses that pursued aggressive national expansion, Rawlings chose to grow slowly and organically, ensuring that each new practice maintained the same standards of care that had defined the original. This measured approach to growth meant that Rawlings practices developed strong roots in their local communities, with many patients returning for decades and bringing successive generations of their families.\n\nToday, Rawlings operates approximately ten practices across the South East of England. The business has invested in modern clinical technology, including OCT scanning and digital retinal photography, while preserving the longer appointment times and personal attention that distinguish it from the high-volume national chains. Rawlings remains an independent group, and its optometrists take pride in knowing their patients by name and maintaining detailed records that allow genuine continuity of care from one appointment to the next. In an era of corporate consolidation in the optical industry, Rawlings represents an increasingly rare example of a truly independent, heritage opticians group.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A comprehensive NHS-funded eye examination for eligible patients. Rawlings optometrists provide a thorough assessment including visual acuity, refraction, eye pressure measurement, and a detailed examination of the health of your eyes. The longer appointment times at Rawlings mean that even NHS tests are unhurried and thorough.",
        price: "Free (if eligible)",
        duration: "25-30 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A detailed private eye examination for patients not eligible for NHS funding. The test includes a comprehensive refraction, binocular vision assessment, eye health examination, and a discussion of your visual needs. Rawlings' private tests benefit from longer appointment slots, allowing the optometrist to take extra time with each patient.",
        price: "From £30",
        duration: "30-35 minutes",
        nhsCovered: false,
      },
      {
        name: "Enhanced Eye Examination with OCT",
        description:
          "A premium eye examination incorporating OCT (Optical Coherence Tomography) scanning to provide a detailed view of the layers of the retina and optic nerve head. This scan can detect early signs of glaucoma, macular degeneration, and other conditions before they cause noticeable symptoms. Rawlings recommends this test as a baseline for all patients over 25.",
        price: "From £55",
        duration: "35-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Fitting",
        description:
          "A specialist appointment for patients wanting to start wearing contact lenses or switch to a different type. The fitting includes corneal topography, tear film assessment, and a trial lens fitting. Rawlings optometrists take the time to ensure you are fully comfortable with lens insertion and removal before leaving the practice.",
        price: "From £40",
        duration: "35-45 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "A gentle, child-friendly eye examination using age-appropriate techniques. Rawlings optometrists are experienced with children of all ages and create a relaxed environment to help young patients feel at ease. The test checks for common childhood vision issues including amblyopia (lazy eye), squint, and refractive errors. All children under 16 receive a free NHS-funded test.",
        price: "Free (NHS funded)",
        duration: "25-30 minutes",
        nhsCovered: true,
      },
      {
        name: "Diabetic Eye Examination",
        description:
          "A specialist examination for patients with diabetes, using digital retinal photography and OCT scanning to examine the blood vessels at the back of the eye. Rawlings recommends this annually for all diabetic patients to monitor for signs of diabetic retinopathy, which can be treated effectively if caught early.",
        price: "From £40",
        duration: "25-30 minutes",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Search for your nearest Rawlings practice by entering your postcode on eyetest.co.uk",
      "Compare available appointments and services at nearby Rawlings branches",
      "Select your preferred eye test type, date, and time from available slots",
      "Enter your personal details and any relevant medical information",
      "Receive an email confirmation with your appointment details and practice directions",
      "Attend your appointment — Rawlings practices have a relaxed atmosphere, so there is no need to rush",
    ],
    prosAndCons: {
      pros: [
        "Over 125 years of heritage and a strong reputation for clinical excellence",
        "Longer appointment times than chain opticians allow for genuinely thorough examinations",
        "Community-focused independent practices where staff know patients by name",
        "Modern diagnostic technology including OCT scanning in a traditional, personal setting",
      ],
      cons: [
        "Very limited geographic coverage — only available in parts of South East England",
        "Smaller frame selection than the large national chains",
        "Fewer appointment slots available due to longer appointment durations",
      ],
    },
    faqs: [
      {
        q: "How old is Rawlings Opticians?",
        a: "Rawlings Opticians was founded in 1898, making it one of the oldest optical practices still operating in the UK. The business has been providing eye care for over 125 years, spanning the entire modern history of optometry in Britain. This heritage is a source of considerable pride for the company, and long-standing patient relationships — sometimes spanning three or four generations of the same family — are a hallmark of the Rawlings experience.",
      },
      {
        q: "Where are Rawlings Opticians located?",
        a: "Rawlings operates approximately ten practices across South East England, concentrated in Kent, Sussex, Surrey, and South London. Specific locations include Bromley, Croydon, Maidstone, Tunbridge Wells, Crawley, Chichester, Worthing, Canterbury, and Brighton. They do not have branches outside the South East of England.",
      },
      {
        q: "Is Rawlings an independent opticians?",
        a: "Yes, Rawlings is an independent opticians group. Unlike the large national chains that are owned by multinational corporations, Rawlings operates as a standalone business. This independence allows them to make decisions based on what is best for their patients rather than corporate targets, and to curate their own selection of frames and lenses. Their independent status is a key part of their identity and appeal.",
      },
      {
        q: "Do Rawlings appointments take longer than other opticians?",
        a: "Yes, Rawlings is known for allocating longer appointment times than most chain opticians. A standard eye test at Rawlings typically takes 25 to 35 minutes, compared to 20 to 25 minutes at most chains. This extra time allows the optometrist to carry out a more thorough examination and to discuss findings and recommendations in greater detail. Many patients who have moved to Rawlings from chain opticians specifically cite the longer appointments as a reason for switching.",
      },
      {
        q: "Does Rawlings offer OCT scanning?",
        a: "Yes, Rawlings offers OCT (Optical Coherence Tomography) scanning at their practices. This advanced imaging technology produces detailed cross-section images of the retina, allowing early detection of conditions such as glaucoma and macular degeneration. The OCT scan is available as part of the enhanced eye examination and is recommended as a baseline for patients over 25.",
      },
      {
        q: "Can I get an NHS eye test at Rawlings?",
        a: "Yes, Rawlings provides free NHS-funded eye tests for all eligible patients. Eligibility includes children under 16, adults over 60, people on qualifying benefits, and those with certain medical conditions. Even within the NHS-funded test, Rawlings optometrists provide a thorough and unhurried examination. If you would like additional screening such as OCT, this can be added for an extra fee.",
      },
    ],
    rating: 4.8,
    reviewCount: 190,
  },

  // ─── Scrivens ───────────────────────────────────────────────────────
  {
    slug: "scrivens",
    name: "Scrivens Opticians & Hearing Care",
    shortName: "Scrivens",
    brandColor: "#c62828",
    description:
      "Scrivens is a well-established family-run opticians and hearing care group with around 100 branches across the Midlands, South West, and South of England. Founded in 1938, they combine the reach of a national chain with the personal touch of a family business. Scrivens is particularly well regarded for their hearing care services alongside traditional optical care, and they have been a trusted name in communities across their regions for decades.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Home Visits",
      "Children's Eye Tests",
      "OCT Scan",
    ],
    storeCount: 100,
    website: "https://www.scrivens.com",
    priceRange: "Free NHS / From £25 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Family-run business since 1938 with genuine community presence",
      "Combined opticians and hearing care across all branches",
      "Home visit service for elderly or housebound patients",
      "Consistently rated highly for personal service and patient care",
    ],
    founded: "1938",
    storeLocations: [
      "birmingham", "coventry", "wolverhampton", "stoke-on-trent", "worcester",
      "nottingham", "leicester", "derby", "northampton", "hereford",
      "bristol", "bath", "exeter", "plymouth", "gloucester", "cheltenham",
      "swindon", "bournemouth", "taunton", "torquay",
      "southampton", "portsmouth", "reading", "oxford",
      "london", "slough", "luton", "bedford", "milton-keynes",
      "cambridge",
    ],
    history:
      "Scrivens Opticians was founded in 1938 by Douglas Scrivens, who opened his first optical practice in the West Midlands. The business began modestly, offering eye tests and spectacles to the local community, but the quality of care and personal attention it provided quickly built a loyal customer base. Even during the difficult years of the Second World War, the practice continued to serve its patients, and by the post-war period, Douglas Scrivens had established a reputation that extended well beyond his immediate neighbourhood.\n\nThe company expanded steadily through the second half of the twentieth century, opening new branches across the Midlands, the South West, and the South of England. In the 1980s, Scrivens made the strategic decision to add hearing care services to its optical practices, recognising the natural overlap between the two areas of sensory health. This dual-service model proved popular with patients, particularly older customers who could have both their eyes and hearing checked in a single visit. The hearing care division grew to become a significant part of the business, and today Scrivens is one of the largest independent providers of hearing aids in the UK.\n\nScrivens remains a family-run business to this day, with the founding family maintaining an active role in the company. With around 100 branches, the group is large enough to invest in modern clinical equipment and professional training, yet small enough that individual branches retain a genuine sense of community. Scrivens is also one of the few optical groups in the UK to offer a comprehensive domiciliary (home visit) service, sending optometrists and audiologists to patients who are unable to travel to a branch. This service is particularly valued by elderly and housebound patients in the communities Scrivens serves.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A full NHS-funded eye examination carried out by a qualified Scrivens optometrist. The test includes visual acuity assessment, refraction, intraocular pressure measurement, and a thorough examination of the internal and external health of the eyes. Scrivens is known for providing unhurried, personal attention even within the NHS test framework.",
        price: "Free (if eligible)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A comprehensive eye examination for patients who do not qualify for NHS-funded testing. The test covers refraction, binocular vision assessment, eye pressure, and eye health examination. Scrivens' private test is competitively priced and provides the same thorough clinical assessment as the NHS test.",
        price: "From £25",
        duration: "25-30 minutes",
        nhsCovered: false,
      },
      {
        name: "Enhanced Eye Examination with OCT",
        description:
          "An extended eye examination that includes OCT (Optical Coherence Tomography) scanning, providing detailed cross-section images of the retina and optic nerve. This advanced scan can reveal early signs of conditions such as glaucoma, macular degeneration, and diabetic retinopathy. Available at most Scrivens branches equipped with OCT technology.",
        price: "From £35",
        duration: "30-35 minutes",
        nhsCovered: false,
      },
      {
        name: "Home Visit Eye Test",
        description:
          "A full eye test carried out in the patient's own home by a Scrivens domiciliary optometrist. This service is available for patients who cannot travel to a branch due to illness, disability, or mobility issues. The optometrist brings portable equipment and a selection of frames, so glasses can be ordered during the visit. NHS-funded home visits are free for eligible patients.",
        price: "Free (NHS eligible) / From £25 (private)",
        duration: "30-40 minutes",
        nhsCovered: true,
      },
      {
        name: "Hearing Assessment",
        description:
          "A comprehensive hearing test carried out by a qualified Scrivens audiologist. The assessment includes an ear examination, pure tone audiometry, and speech discrimination testing. If hearing loss is detected, the audiologist will discuss hearing aid options, including both NHS-funded and private digital hearing aids from leading manufacturers.",
        price: "Free",
        duration: "30-45 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Fitting",
        description:
          "An initial assessment for patients considering contact lenses, including corneal measurements, tear film evaluation, and a trial fitting. Scrivens offers a range of contact lens types from major manufacturers, and ongoing supply plans are available for regular wearers.",
        price: "From £30",
        duration: "30-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "A friendly, age-appropriate eye test for children using picture charts, matching tests, and retinoscopy. All children under 16 are entitled to a free NHS eye test, and Scrivens stocks a range of children's frames available under the NHS voucher scheme. Scrivens staff are experienced in working with young children to make the experience comfortable and positive.",
        price: "Free (NHS funded)",
        duration: "20-30 minutes",
        nhsCovered: true,
      },
    ],
    bookingProcess: [
      "Enter your postcode on eyetest.co.uk to find Scrivens branches in your area",
      "Compare services and availability — Scrivens offers eye tests, hearing tests, and home visits",
      "Select your preferred appointment type and choose a convenient date and time",
      "Provide your personal details and let us know if you have mobility or accessibility requirements",
      "Receive a confirmation email with your appointment details and branch address",
      "Attend your appointment — if you need a home visit, a Scrivens optometrist will come to you at the booked time",
    ],
    prosAndCons: {
      pros: [
        "Family-run business with a genuine personal touch and strong community roots",
        "Combined optical and hearing care means you can address both in one visit",
        "Comprehensive home visit service for housebound and elderly patients",
        "Competitive pricing with a focus on value rather than aggressive upselling",
        "Over 80 years of experience in eye care and decades of hearing care expertise",
      ],
      cons: [
        "Geographic coverage is limited to the Midlands, South West, and South of England",
        "Designer frame selection is smaller than at chains like Boots or Vision Express",
        "Some branches may not yet have OCT scanning equipment installed",
      ],
    },
    faqs: [
      {
        q: "Does Scrivens offer home eye tests?",
        a: "Yes, Scrivens provides a comprehensive home visit service for patients who are unable to travel to a branch due to illness, disability, or mobility issues. A qualified Scrivens optometrist will visit your home with portable testing equipment and a selection of frames, so you can have your eyes tested and order glasses without leaving the house. If you qualify for an NHS-funded eye test, the home visit is also free. This is one of Scrivens' most valued services, particularly for elderly patients.",
      },
      {
        q: "Is Scrivens a family business?",
        a: "Yes, Scrivens was founded in 1938 by Douglas Scrivens and remains family-run to this day. The founding family continues to be actively involved in the management of the business. This family ownership is reflected in the culture of the company, which prioritises personal relationships with patients and a community-focused approach to eye care and hearing care.",
      },
      {
        q: "Does Scrivens do hearing tests?",
        a: "Yes, hearing care is a core part of the Scrivens service. Every Scrivens branch offers hearing assessments, which are provided free of charge by qualified audiologists. If hearing loss is detected, Scrivens can supply both NHS-funded hearing aids (where eligible) and private digital hearing aids from leading manufacturers. The combination of optical and hearing care under one roof is a significant convenience for patients.",
      },
      {
        q: "Where are Scrivens branches located?",
        a: "Scrivens operates approximately 100 branches across the Midlands, the South West, and the South of England. Concentrations include the West Midlands (Birmingham, Coventry, Wolverhampton), the East Midlands (Nottingham, Leicester, Derby), the South West (Bristol, Bath, Exeter, Plymouth), and parts of southern England (Southampton, Portsmouth, Reading, Oxford). They do not currently have branches in the North of England, Scotland, Wales, or Northern Ireland.",
      },
      {
        q: "How much do glasses cost at Scrivens?",
        a: "Scrivens offers a range of frames at competitive prices. Complete glasses — frames with single-vision lenses — start from around £49. The selection includes a mix of own-brand frames and recognised mid-range brands. Lens upgrades such as anti-reflection coatings, varifocals, and thinner lenses are available at additional cost. NHS optical vouchers are accepted and can be put towards the cost of glasses for eligible patients.",
      },
      {
        q: "Can I get an NHS eye test at Scrivens?",
        a: "Yes, Scrivens provides free NHS-funded eye tests for all eligible patients. Eligibility is the same as at any UK optician — children under 16, adults over 60, those on qualifying benefits, and patients with certain medical conditions. Scrivens also provides NHS-funded home visits for eligible patients who cannot attend a branch in person.",
      },
      {
        q: "Does Scrivens offer hearing aids on the NHS?",
        a: "Yes, Scrivens is contracted to provide NHS hearing aids at many of its branches. If you are referred by your GP or if a Scrivens audiologist identifies hearing loss, you may be eligible for a free NHS digital hearing aid. Private hearing aids are also available for patients who want a wider choice of styles and technology levels, with prices starting from around £395 per aid.",
      },
      {
        q: "How do I book a home visit with Scrivens?",
        a: "You can arrange a Scrivens home visit by searching for your nearest branch on eyetest.co.uk and selecting the home visit option when booking, or by contacting your local Scrivens branch directly. You will need to confirm that you or the person requiring the test is unable to attend the branch unaccompanied. Home visits are available for both eye tests and hearing assessments.",
      },
    ],
    rating: 4.5,
    reviewCount: 450,
  },

  // ─── Bayfields ──────────────────────────────────────────────────────
  {
    slug: "bayfields",
    name: "Bayfields Opticians & Audiologists",
    shortName: "Bayfields",
    brandColor: "#4a148c",
    description:
      "Bayfields is a growing group of independent opticians and audiologists with practices across England and Wales. They have expanded steadily by acquiring established independent practices and retaining their local character, staff, and patient relationships. Bayfields focuses on clinical excellence and offers enhanced eye examinations alongside standard NHS sight tests, with a commitment to investing in advanced diagnostic technology across their network.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Children's Eye Tests",
      "OCT Scan",
      "Diabetic Screening",
    ],
    storeCount: 60,
    website: "https://www.bayfieldsopticians.com",
    priceRange: "Free NHS / From £30 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Growing network that preserves the identity of acquired independent practices",
      "Enhanced eye examinations with the latest diagnostic equipment",
      "Combined optical and audiology services at many locations",
      "Strong focus on staff retention and continuity of patient care",
    ],
    founded: "2015",
    storeLocations: [
      "london", "croydon", "brighton", "reading", "oxford", "guildford",
      "southampton", "portsmouth", "milton-keynes", "basingstoke",
      "bristol", "bath", "exeter", "plymouth", "bournemouth", "swindon",
      "gloucester", "cheltenham",
      "cambridge", "norwich", "ipswich", "colchester", "chelmsford", "luton",
      "birmingham", "coventry", "wolverhampton", "worcester",
      "nottingham", "leicester", "derby", "northampton",
      "cardiff", "swansea", "newport",
    ],
    history:
      "Bayfields Opticians & Audiologists was established in 2015 as a new kind of optical group with a distinctive acquisition strategy. Rather than building new stores from scratch, Bayfields set out to acquire well-established independent opticians practices across England and Wales, preserving their local identities, retaining their experienced staff, and maintaining the patient relationships that had been built up over years or even decades. The founding vision was that independent opticians offered a level of care and personal attention that patients valued highly, but that many independent owners were reaching retirement age and needed a viable succession plan.\n\nThe group grew rapidly through the late 2010s and into the 2020s, acquiring practices in a wide range of towns and cities across England and Wales. Each acquired practice continued to operate under its existing name in many cases, with Bayfields providing back-office support, group purchasing power, and investment in clinical technology. This model allowed the group to maintain the trusted local feel of each practice while bringing the benefits of scale — including access to the latest OCT scanners, staff training programmes, and audiological equipment.\n\nToday, Bayfields operates approximately 60 practices and continues to grow. The group has invested heavily in adding audiology services to practices that previously offered only optical care, creating a combined opticians-and-audiologists model similar to that of Scrivens and Leightons. Bayfields positions itself as a clinically focused group that prioritises patient outcomes over volume, and its acquisition model has made it an important player in the consolidation of the UK independent optical sector.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A standard NHS-funded eye examination for eligible patients. Bayfields optometrists conduct a thorough assessment including visual acuity, refraction, eye pressure measurement, and a detailed examination of eye health. The unhurried, personal approach that characterised each practice before it joined the Bayfields group is maintained.",
        price: "Free (if eligible)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A comprehensive private eye examination that includes refraction, binocular vision assessment, and a thorough evaluation of the internal and external health of the eyes. Bayfields private tests offer more time for discussion of your visual needs and lifestyle requirements than the NHS-funded test.",
        price: "From £30",
        duration: "25-30 minutes",
        nhsCovered: false,
      },
      {
        name: "Enhanced Eye Examination with OCT",
        description:
          "An advanced eye examination incorporating OCT (Optical Coherence Tomography) scanning. This non-invasive scan produces detailed images of the retina and optic nerve, enabling early detection of conditions such as glaucoma, macular degeneration, and diabetic retinopathy. Bayfields has invested in OCT technology across its network, making this service available at most practices.",
        price: "From £40",
        duration: "30-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Assessment",
        description:
          "An initial appointment to assess your suitability for contact lenses. Includes corneal topography, tear film analysis, and a trial fitting with the most appropriate lens type for your eyes and lifestyle. Bayfields practices stock a full range of contact lenses from daily disposables to specialist toric and multifocal options.",
        price: "From £35",
        duration: "30-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Hearing Assessment",
        description:
          "A comprehensive hearing evaluation carried out by a qualified audiologist at Bayfields practices with audiology services. The assessment includes an ear health check using an otoscope, pure tone audiometry, and speech-in-noise testing. If hearing loss is identified, the audiologist will recommend appropriate hearing aids from a range of leading manufacturers.",
        price: "Free",
        duration: "30-45 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "A child-friendly eye examination using age-appropriate techniques, carried out by optometrists experienced in paediatric vision assessment. All children under 16 receive a free NHS-funded test. Bayfields practices typically offer a good range of children's frames, including options covered by the NHS voucher.",
        price: "Free (NHS funded)",
        duration: "20-30 minutes",
        nhsCovered: true,
      },
      {
        name: "Diabetic Eye Check",
        description:
          "A specialist examination for diabetic patients incorporating digital retinal photography and, where available, OCT scanning. This check focuses on detecting signs of diabetic retinopathy and other diabetes-related changes in the eye. Bayfields recommends annual diabetic eye checks in addition to the national NHS diabetic eye screening programme.",
        price: "From £35",
        duration: "25-30 minutes",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Search for your nearest Bayfields practice by entering your postcode on eyetest.co.uk",
      "Browse available services — many Bayfields locations offer both optical and hearing care",
      "Choose your preferred appointment type, date, and time from the available slots",
      "Provide your contact details and any relevant health information",
      "Receive a booking confirmation email with directions to your local practice",
      "Attend your appointment at the local Bayfields practice — you will be seen by staff who know the practice and community well",
    ],
    prosAndCons: {
      pros: [
        "Retains the personal, community-focused character of each acquired independent practice",
        "Investment in OCT and other advanced diagnostic technology across the network",
        "Combined optical and audiology services at many locations for convenience",
        "Staff continuity ensures patients see familiar faces year after year",
        "Competitive pricing that balances quality with accessibility",
      ],
      cons: [
        "Relatively new group, so brand recognition is lower than established chains",
        "Services and equipment may vary between practices as the network standardises",
        "Frame selection depends on the individual practice and may be more limited than large chains",
      ],
    },
    faqs: [
      {
        q: "What is Bayfields Opticians?",
        a: "Bayfields is a group of independent opticians and audiologists that has grown by acquiring established independent practices across England and Wales. Founded in 2015, the group preserves the local character, staff, and patient relationships of each practice while investing in advanced clinical technology and adding audiology services. The result is a network of practices that feel like your trusted local optician but benefit from the resources of a larger group.",
      },
      {
        q: "Will my local practice change now that it has joined Bayfields?",
        a: "Bayfields' acquisition model is specifically designed to minimise disruption. The staff you know will typically remain, and the practice continues to operate in the same location with the same commitment to personal care. What changes behind the scenes includes investment in new equipment such as OCT scanners, improved staff training programmes, and group purchasing power that can lead to better value for patients. Many patients notice an improvement in available technology without any loss of the personal touch.",
      },
      {
        q: "Does Bayfields offer hearing tests?",
        a: "Yes, many Bayfields practices now offer hearing assessments alongside their optical services. This is part of Bayfields' strategy to create combined opticians-and-audiologists practices. Hearing tests are free, and if hearing loss is identified, a range of private hearing aids is available from leading manufacturers. The availability of audiology services varies by practice, so check when booking.",
      },
      {
        q: "Where are Bayfields practices located?",
        a: "Bayfields operates approximately 60 practices across England and Wales. Locations span southern England, the Midlands, East Anglia, and parts of Wales. The group continues to grow by acquiring additional independent practices. You can search for your nearest Bayfields practice by entering your postcode on eyetest.co.uk.",
      },
      {
        q: "Is Bayfields an independent opticians?",
        a: "Bayfields describes itself as a group of independent practices. While the individual practices are now part of the Bayfields group rather than being independently owned, the group's philosophy is to preserve the independent character of each practice. Staff, clinical approaches, and patient relationships are maintained, and each practice retains its community focus. Bayfields is not part of a large multinational corporation like some chain opticians.",
      },
      {
        q: "How much does an eye test cost at Bayfields?",
        a: "NHS-funded eye tests are free for all eligible patients at Bayfields practices, just as at any other UK optician. Private eye tests start from around £30, and enhanced examinations with OCT scanning are available from approximately £40. Prices may vary slightly between practices. Contact lens assessments start from £35.",
      },
      {
        q: "Does Bayfields offer OCT scanning?",
        a: "Yes, Bayfields has invested in OCT (Optical Coherence Tomography) technology across its network, and this scanning is available at most of its practices. OCT provides detailed 3D images of the retina and optic nerve head, enabling early detection of conditions such as glaucoma and macular degeneration. It is available as part of the enhanced eye examination for an additional fee.",
      },
      {
        q: "Can I book a Bayfields appointment through eyetest.co.uk?",
        a: "Yes, Bayfields practices are available for booking through eyetest.co.uk. Simply enter your postcode to find your nearest practice, choose your appointment type, and select a convenient date and time. You will receive an email confirmation with all the details you need for your visit.",
      },
    ],
    rating: 4.5,
    reviewCount: 220,
  },

  // ─── Duncan & Todd ──────────────────────────────────────────────────
  {
    slug: "duncan-and-todd",
    name: "Duncan & Todd Group",
    shortName: "Duncan & Todd",
    brandColor: "#00695c",
    description:
      "Duncan & Todd is a leading Scottish opticians group headquartered in Aberdeen, with practices across Scotland and the north of England. Originally established as a single practice, they have grown into one of Scotland's most respected optical groups through a combination of organic growth and acquisitions. They are known for their clinical expertise, wide range of premium eyewear, and strong ties to the communities they serve.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Children's Eye Tests",
      "OCT Scan",
    ],
    storeCount: 30,
    website: "https://www.duncanandtodd.com",
    priceRange: "Free NHS (Scotland) / From £25 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Scotland's leading independent opticians group",
      "Free NHS eye tests available to all residents in Scotland",
      "Premium eyewear selection including exclusive brands",
      "Strong heritage and community involvement across northern UK",
    ],
    founded: "1972",
    storeLocations: [
      "edinburgh", "glasgow", "aberdeen", "dundee", "inverness", "stirling", "perth",
      "newcastle", "sunderland", "durham", "middlesbrough", "darlington",
      "carlisle", "leeds", "york",
    ],
    history:
      "Duncan & Todd was founded in 1972 by Ian Todd, who opened his first optical practice in Aberdeen. The business was built on a foundation of clinical excellence and personal service, quickly establishing a reputation as one of the north-east of Scotland's most trusted opticians. Aberdeen's thriving economy, driven by the North Sea oil industry, provided a strong base of patients who valued quality eyewear and thorough eye care, and the practice flourished.\n\nThroughout the 1980s, 1990s, and 2000s, Duncan & Todd expanded across Scotland, opening new practices in Edinburgh, Glasgow, Dundee, Inverness, Stirling, and Perth. The group also grew through the acquisition of well-established local practices, a strategy that allowed it to enter new communities with an existing patient base and experienced staff. A key advantage for Duncan & Todd in Scotland is the Scottish NHS system, which provides free eye tests to all Scottish residents regardless of age or income — a policy that has been in place since 2006 and has increased the frequency of eye testing across the country.\n\nMore recently, Duncan & Todd has extended its reach south of the border into the north of England, acquiring practices in Newcastle, Sunderland, Durham, and other northern English towns. This expansion has made Duncan & Todd a truly cross-border optical group, and the company now operates around 30 practices. The group has invested in modern clinical technology across its network, including OCT scanning and digital retinal photography, while maintaining the personal, community-focused approach that defined its founding practice in Aberdeen over five decades ago. Duncan & Todd also operates several audiology clinics, offering hearing tests and hearing aids alongside its optical services.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A comprehensive eye examination funded by the NHS. In Scotland, all residents are entitled to a free NHS eye test regardless of age or income. In England, standard NHS eligibility criteria apply. The test includes visual acuity assessment, refraction, eye pressure measurement, and a detailed examination of the health of the eyes.",
        price: "Free (all Scottish residents / eligible English patients)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A full eye examination for patients in England who do not qualify for NHS-funded testing. The test covers all aspects of vision and eye health, including refraction, binocular vision, and a thorough internal and external examination of the eyes. Private eye tests at Duncan & Todd are competitively priced and include a detailed report of findings.",
        price: "From £25",
        duration: "25-30 minutes",
        nhsCovered: false,
      },
      {
        name: "Enhanced Eye Examination with OCT",
        description:
          "An advanced eye test that includes OCT (Optical Coherence Tomography) scanning, producing detailed 3D images of the retina and optic nerve. This technology enables early detection of conditions such as glaucoma, macular degeneration, and diabetic retinopathy — often years before symptoms appear. Duncan & Todd recommends this as a baseline scan for patients over 25.",
        price: "From £35",
        duration: "30-35 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Fitting",
        description:
          "A specialist appointment for patients wanting to try or change contact lenses. The consultation includes corneal curvature measurements, tear film evaluation, and a trial fitting with the most suitable lens type. Duncan & Todd offers a wide range of contact lenses, including daily disposables, monthly lenses, toric lenses for astigmatism, and multifocal options.",
        price: "From £30",
        duration: "30-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Hearing Assessment",
        description:
          "A comprehensive hearing test provided at selected Duncan & Todd practices with audiology clinics. The assessment includes an ear examination, pure tone audiometry, and speech discrimination testing. If hearing loss is identified, the audiologist will discuss hearing aid options from leading manufacturers.",
        price: "Free",
        duration: "30 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "A child-friendly eye examination using age-appropriate techniques. In Scotland, all children receive free NHS eye tests, and Duncan & Todd optometrists are experienced in making the experience relaxed and enjoyable for younger patients. The test checks for common childhood vision issues including amblyopia, squint, and refractive errors.",
        price: "Free (NHS funded)",
        duration: "20-30 minutes",
        nhsCovered: true,
      },
    ],
    bookingProcess: [
      "Find your nearest Duncan & Todd practice by entering your postcode on eyetest.co.uk",
      "Review available services and appointment types — including free NHS eye tests for Scottish residents",
      "Choose a convenient date and time from the available slots",
      "Enter your personal details and any relevant medical information",
      "Receive an email confirmation with your appointment details and practice directions",
      "Attend your appointment — bring your current glasses or contact lenses and any NHS exemption evidence (England only)",
    ],
    prosAndCons: {
      pros: [
        "Scotland's leading independent optical group with over 50 years of heritage",
        "All Scottish residents receive free NHS eye tests at Duncan & Todd",
        "Premium eyewear selection including brands not widely available at chain opticians",
        "Community-focused practices with strong local ties and experienced staff",
        "Investment in modern clinical technology including OCT scanning",
      ],
      cons: [
        "Geographic coverage is limited to Scotland and the north of England",
        "Not all practices have audiology services — availability varies by location",
        "Fewer locations than national chains, meaning longer travel for some patients",
      ],
    },
    faqs: [
      {
        q: "Are eye tests free at Duncan & Todd in Scotland?",
        a: "Yes, all residents of Scotland are entitled to a free NHS eye test, regardless of age, income, or medical history. This applies at all Duncan & Todd practices in Scotland. The Scottish Government has provided universal free eye tests since 2006 as part of its commitment to preventive healthcare. If you live in England and visit a Duncan & Todd practice south of the border, standard NHS eligibility criteria apply.",
      },
      {
        q: "Where does Duncan & Todd have practices?",
        a: "Duncan & Todd operates approximately 30 practices across Scotland and the north of England. In Scotland, you will find practices in Edinburgh, Glasgow, Aberdeen, Dundee, Inverness, Stirling, and Perth. In England, the group has practices in Newcastle, Sunderland, Durham, Middlesbrough, Darlington, Carlisle, Leeds, and York. The group continues to expand, particularly in northern England.",
      },
      {
        q: "Is Duncan & Todd an independent opticians?",
        a: "Yes, Duncan & Todd is an independent optical group. It is not part of a multinational corporation like Boots (EssilorLuxottica) or Specsavers. The company was founded in Aberdeen in 1972 and has grown through a combination of organic expansion and acquisition of local practices. Its independent status allows it to choose its own range of frames, invest in the technology it considers most important, and maintain a distinctive approach to patient care.",
      },
      {
        q: "What frame brands does Duncan & Todd stock?",
        a: "Duncan & Todd carries a curated selection of premium, designer, and independent frame brands. The range typically includes names such as Tom Ford, Gucci, Saint Laurent, Lindberg, and Silhouette, alongside more widely available brands like Ray-Ban and Hugo Boss. Each practice may have a slightly different selection, and staff can help you find frames that suit your face shape, prescription, and budget.",
      },
      {
        q: "Does Duncan & Todd offer hearing care?",
        a: "Yes, Duncan & Todd provides hearing assessments and hearing aid services at selected practices. Hearing tests are free, and if hearing loss is identified, the audiologist will discuss a range of hearing aid options from leading manufacturers. Not all Duncan & Todd locations have audiology clinics, so check availability when booking.",
      },
      {
        q: "Can I book a Duncan & Todd appointment through eyetest.co.uk?",
        a: "Yes, Duncan & Todd practices are available for booking through eyetest.co.uk. Enter your postcode to find your nearest practice, choose your appointment type, and select a date and time that suits you. You will receive a confirmation email with everything you need to know before your visit.",
      },
      {
        q: "How does the NHS optical voucher scheme work in Scotland?",
        a: "In Scotland, all residents receive free NHS eye tests, and NHS optical vouchers are available to help with the cost of glasses. The voucher values are set by NHS Scotland and depend on your prescription and personal circumstances. Children, people on qualifying benefits, and those with complex prescriptions receive higher-value vouchers. Your Duncan & Todd dispensing optician will explain exactly how much the voucher covers and what, if anything, you will need to pay on top.",
      },
      {
        q: "Does Duncan & Todd offer contact lenses?",
        a: "Yes, Duncan & Todd offers a full contact lens service including initial assessments, trial fittings, and ongoing supply. They stock a wide range of lenses from major manufacturers. Regular supply plans are available for daily and monthly wearers, and Duncan & Todd optometrists can fit specialist lenses including toric lenses for astigmatism and multifocal lenses for presbyopia.",
      },
    ],
    rating: 4.7,
    reviewCount: 85,
  },

  // ─── Optical Express ────────────────────────────────────────────────
  {
    slug: "optical-express",
    name: "Optical Express",
    shortName: "Optical Express",
    brandColor: "#1565c0",
    description:
      "Optical Express is a major UK optical and laser eye surgery provider, offering both traditional optician services and specialist refractive surgery. With clinics across the UK and Ireland, they are one of the country's largest providers of laser eye surgery and lens replacement procedures, while also offering standard high-street optical services including eye tests, glasses, and contact lenses.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Children's Eye Tests",
      "OCT Scan",
    ],
    storeCount: 100,
    website: "https://www.opticalexpress.co.uk",
    priceRange: "Free NHS / From £25 private",
    nhsAvailable: true,
    available: false,
    highlights: [
      "One of the UK's largest providers of laser eye surgery",
      "Combines high-street optician services with specialist surgical clinics",
      "Advanced diagnostic technology across all clinics",
      "Nationwide network of clinics in major cities and towns",
    ],
    founded: "1991",
    storeLocations: [
      "london", "croydon", "bromley", "kingston-upon-thames", "brighton", "reading",
      "oxford", "guildford", "southampton", "portsmouth", "milton-keynes",
      "crawley", "basingstoke",
      "bristol", "bath", "exeter", "plymouth", "bournemouth", "swindon",
      "cambridge", "norwich", "chelmsford", "luton", "peterborough",
      "birmingham", "coventry", "wolverhampton", "nottingham", "leicester",
      "derby", "northampton",
      "manchester", "liverpool", "chester", "preston", "leeds", "sheffield",
      "york", "bradford",
      "newcastle", "sunderland", "middlesbrough",
      "cardiff", "swansea",
      "edinburgh", "glasgow", "aberdeen", "dundee",
      "belfast",
    ],
    history:
      "Optical Express was founded in 1991 in Glasgow, Scotland, initially as a traditional high-street opticians chain. The company grew quickly during the 1990s, opening stores across Scotland and then expanding into England, Wales, and Northern Ireland. What distinguished Optical Express from many competitors was its early recognition of the commercial potential of laser eye surgery, which was emerging as a viable alternative to glasses and contact lenses during the same period. By the mid-1990s, Optical Express had begun investing in laser and refractive surgery services, positioning itself as both a conventional optician and a specialist surgical provider.\n\nThe laser eye surgery division of the business grew rapidly through the 2000s, and Optical Express became one of the UK's largest providers of LASIK, LASEK, and other refractive procedures. The company invested heavily in the latest laser technology and recruited experienced ophthalmic surgeons, building a network of dedicated surgical clinics alongside its standard opticians stores. This dual model — combining everyday optical services with specialist surgery — was unusual in the UK market and gave Optical Express a distinctive niche. The company also expanded into lens replacement surgery, offering implantable contact lenses and refractive lens exchange for patients who were not suitable candidates for laser treatment.\n\nToday, Optical Express operates approximately 100 clinics and stores across the United Kingdom and Ireland. The business is privately owned by its founder, David Moulsdale, and employs around 2,000 people. While the laser eye surgery division generates significant revenue and attention, Optical Express continues to operate standard optician services — including NHS eye tests, glasses dispensing, and contact lens fitting — at many of its locations. The company's clinics are typically located in city centres and major towns, and it has invested in advanced diagnostic equipment including OCT scanning, corneal topography, and wavefront aberrometry across its network.",
    detailedServices: [
      {
        name: "NHS Eye Test",
        description:
          "A standard NHS-funded eye examination for eligible patients. Optical Express optometrists carry out a full assessment of visual acuity, refraction, and eye health using modern diagnostic equipment. In Scotland, all residents receive free NHS eye tests. In England, Wales, and Northern Ireland, standard NHS eligibility criteria apply.",
        price: "Free (if eligible)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
      {
        name: "Private Eye Test",
        description:
          "A comprehensive eye examination for patients not eligible for NHS funding. The test includes detailed refraction, binocular vision assessment, and a thorough examination of the internal and external health of the eyes. Optical Express uses advanced clinical equipment and digital imaging across its clinics.",
        price: "From £25",
        duration: "25 minutes",
        nhsCovered: false,
      },
      {
        name: "Advanced Eye Examination with OCT",
        description:
          "An enhanced eye examination that includes OCT (Optical Coherence Tomography) scanning and digital retinal photography. This combination of technologies provides a comprehensive picture of the health of the retina, optic nerve, and macular area, enabling early detection of conditions such as glaucoma, macular degeneration, and diabetic retinopathy.",
        price: "From £40",
        duration: "30-35 minutes",
        nhsCovered: false,
      },
      {
        name: "Laser Eye Surgery Consultation",
        description:
          "A comprehensive initial consultation for patients considering laser eye surgery. The appointment includes a detailed eye examination, corneal topography mapping, wavefront aberrometry, pupil size measurement, and a tear film assessment. An ophthalmic surgeon will review the results and discuss whether you are a suitable candidate for LASIK, LASEK, or another refractive procedure.",
        price: "Free (no obligation)",
        duration: "60-90 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Fitting",
        description:
          "A specialist consultation for patients wanting to start wearing contact lenses or explore different options. Includes corneal topography, tear film analysis, and a trial fitting with appropriate lenses. Optical Express offers a range of lens types from leading manufacturers, and monthly supply plans are available.",
        price: "From £30",
        duration: "30-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's Eye Test",
        description:
          "An age-appropriate eye examination for children, checking for common childhood vision issues including lazy eye, squint, and refractive errors. All children under 16 qualify for a free NHS-funded eye test. Optical Express offers a selection of children's frames suitable for younger patients.",
        price: "Free (NHS funded)",
        duration: "20-25 minutes",
        nhsCovered: true,
      },
    ],
    bookingProcess: [
      "Search for your nearest Optical Express clinic by entering your postcode on eyetest.co.uk",
      "Compare available services — from standard eye tests to laser eye surgery consultations",
      "Select your preferred appointment type and choose a date and time",
      "Enter your personal details and any relevant medical or prescription information",
      "Receive a confirmation email with your appointment details, clinic location, and what to expect",
      "Attend your appointment — for laser surgery consultations, allow up to 90 minutes for the comprehensive assessment",
    ],
    prosAndCons: {
      pros: [
        "One of the UK's largest and most experienced providers of laser eye surgery",
        "Combines standard optician services with specialist surgical clinics under one brand",
        "Advanced diagnostic technology including OCT, corneal topography, and wavefront aberrometry",
        "Free, no-obligation laser eye surgery consultations to assess your suitability",
        "Nationwide presence in major UK cities with modern, well-equipped clinics",
      ],
      cons: [
        "Not currently available for booking through eyetest.co.uk",
        "The brand's strong association with laser surgery can overshadow its standard optician services",
        "No hearing care services offered",
      ],
    },
    faqs: [
      {
        q: "Is Optical Express only for laser eye surgery?",
        a: "No, Optical Express offers a full range of standard optician services alongside its laser eye surgery business. You can get NHS and private eye tests, buy glasses and sunglasses, and have contact lenses fitted at many of their locations. However, their reputation and marketing are heavily focused on refractive surgery, so many people are unaware that they also function as a conventional high-street optician.",
      },
      {
        q: "How much does laser eye surgery cost at Optical Express?",
        a: "Laser eye surgery prices at Optical Express vary depending on the type of procedure and the complexity of your prescription. Prices typically start from around £595 per eye for standard LASEK and from £1,195 per eye for bladeless LASIK. More advanced procedures using wavefront-guided technology cost more. Optical Express offers free initial consultations and interest-free finance options to help spread the cost.",
      },
      {
        q: "Is laser eye surgery safe?",
        a: "Laser eye surgery is one of the most commonly performed elective procedures in the world and has a high safety record. The vast majority of patients achieve excellent results, with many reaching 20/20 vision or better. However, like any surgical procedure, there are risks, including dry eyes, halos around lights, and, rarely, undercorrection or overcorrection. Optical Express will carry out a thorough assessment to determine whether you are a suitable candidate and will explain all potential risks before you decide to proceed.",
      },
      {
        q: "Can I get a free eye test at Optical Express?",
        a: "Yes, Optical Express provides free NHS-funded eye tests for all eligible patients. In Scotland, all residents qualify for free NHS eye tests regardless of age or income. In England, Wales, and Northern Ireland, eligibility includes children under 16, adults over 60, those on qualifying benefits, and people with specific medical conditions. Laser eye surgery consultations are also free and carry no obligation.",
      },
      {
        q: "Where are Optical Express clinics located?",
        a: "Optical Express operates approximately 100 clinics across the United Kingdom and Ireland, located in major cities and towns including London, Birmingham, Manchester, Leeds, Edinburgh, Glasgow, Aberdeen, Cardiff, Belfast, and many more. Their clinics are typically in city centre locations for easy access.",
      },
      {
        q: "Can I book an Optical Express appointment through eyetest.co.uk?",
        a: "Optical Express is not currently available for direct booking through eyetest.co.uk. We list Optical Express on our platform so that customers can compare their services and prices with other opticians. To book an eye test or laser surgery consultation, visit opticalexpress.co.uk or call their booking line directly. We hope to offer Optical Express booking through our platform in the future.",
      },
      {
        q: "Does Optical Express offer finance for laser eye surgery?",
        a: "Yes, Optical Express offers a range of finance options for laser eye surgery, including interest-free credit for qualifying patients. Monthly payment plans allow you to spread the cost of treatment over 12 to 60 months. Finance is subject to credit approval, and full details are discussed during the initial consultation.",
      },
      {
        q: "What is the difference between LASIK and LASEK at Optical Express?",
        a: "LASIK and LASEK are both types of laser eye surgery, but they differ in how the laser accesses the cornea. LASIK involves creating a thin flap in the corneal surface before reshaping the underlying tissue with a laser — recovery is typically faster, with most patients seeing well within 24 hours. LASEK does not involve a flap; instead, the surface layer of the cornea is gently moved aside, and the laser reshapes the surface directly. LASEK recovery takes a few days longer, but it may be more suitable for patients with thinner corneas. Your Optical Express surgeon will recommend the best option based on your individual assessment.",
      },
    ],
    rating: 4.1,
    reviewCount: 3500,
  },

  // ─── M&S Opticians ──────────────────────────────────────────────────
  {
    slug: "mands-opticians",
    name: "M&S Opticians",
    shortName: "M&S",
    brandColor: "#00573f",
    seoTitle: "M&S Opticians Eye Test: £40 with OCT Scan, NHS Tests & Stores",
    seoDescription:
      "M&S Opticians eye tests cost £40 with an OCT scan included, NHS-funded tests are free if you qualify, and hearing checks are free. 37 stores, how to book and what to expect.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-10",
    description:
      "M&S Opticians runs eye care and hearing care inside 37 Marks & Spencer stores, mostly in England with stores in Scotland and Wales. It is operated by Owl Optical Ltd on behalf of Marks & Spencer. A private M&S eye test costs £40 and includes an OCT scan at no extra cost, NHS-funded eye tests are free for anyone who qualifies, and hearing checks are free. M&S Opticians was named a Which? Recommended Opticians provider for 2026.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "OCT Scan",
      "Children's Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Hearing Aids",
    ],
    storeCount: 37,
    website: "https://mandsopticians.com",
    priceRange: "Free NHS / £40 private (OCT included)",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Private eye tests cost £40 with an OCT scan included at no extra cost",
      "Free NHS-funded eye tests for anyone who qualifies, including all children under 16",
      "Free hearing checks in store, with hearing aids available",
      "Named a Which? Recommended Opticians provider for 2026, for the second time",
    ],
    founded: "2019",
    storeLocations: [
      "birmingham", "bournemouth", "canterbury", "cardiff", "chester", "derby",
      "ealing", "exeter", "glasgow", "harrogate", "kingston-upon-thames", "leeds",
      "london", "manchester", "milton-keynes", "newcastle", "norwich", "oxford",
      "plymouth", "sheffield", "southampton", "st-albans", "stoke-on-trent",
      "torquay", "warrington", "york",
    ],
    history:
      "M&S Opticians launched in 2019 in Marks & Spencer stores, with York Vangarde the first to open. After a trial in Bolton, Derby, London Colney, Manchester and York, Marks & Spencer announced in November 2021 that it would roll the service out to more of its larger stores, run in partnership with Owl Optical.\n\nToday there are 37 M&S Opticians stores. Most are in England, including Bluewater, Cheshire Oaks, Meadowhall, the Metro Centre, Kingston, Ealing Broadway and Colliers Wood, with stores at Glasgow Argyle Street and Braehead in Scotland and Culverhouse Cross (Cardiff) and Llanelli in Wales. Each practice sits inside an M&S store and offers eye tests, glasses, contact lenses and hearing care.\n\nM&S Opticians is operated by Owl Optical Ltd on behalf of Marks & Spencer plc. In 2026 it was named a Which? Recommended Opticians provider for the second time, with customers singling out the quality and thoroughness of its eye tests.",
    detailedServices: [
      {
        name: "NHS-funded eye test",
        description:
          "A free eye test for anyone who qualifies for NHS funding, such as children under 16, people aged 60 or over, people with diabetes or glaucoma and people on certain benefits. In Scotland, NHS eye examinations are free for all UK residents.",
        price: "Free (if eligible)",
        duration: "About 30 minutes",
        nhsCovered: true,
      },
      {
        name: "Private eye test with OCT scan",
        description:
          "M&S says its eye tests cost £40 and include an OCT scan at no extra cost. Before the main examination, the team carries out screening tests including the OCT scan and a visual fields test, then the optometrist checks your vision and the health of your eyes and explains the results.",
        price: "£40",
        duration: "About 30 minutes",
        nhsCovered: false,
      },
      {
        name: "Children's eye test",
        description:
          "Free on the NHS for all under 16s and under 19s in full-time education. Children do not need to be able to read, write or talk, as M&S uses specially designed charts. M&S says a child's NHS voucher can be used for free glasses from its £50 kids range, or as £50 off other ranges.",
        price: "Free (NHS funded)",
        duration: "Varies with age",
        nhsCovered: true,
      },
      {
        name: "Hearing check",
        description:
          "A free hearing health check in store. If you need a hearing aid, M&S Opticians offers a range of options, with costs and finance explained in store.",
        price: "Free",
        duration: "Ask in store",
        nhsCovered: false,
      },
      {
        name: "Contact lenses",
        description:
          "Contact lens fittings and aftercare, including the Lensplan monthly scheme. Ask in store for prices.",
        price: "Ask in store",
        duration: "Varies",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Find your nearest M&S Opticians by postcode, here on eyetest.co.uk or at mandsopticians.com",
      "Choose an eye test, a hearing check or both",
      "Tell the team if you think you qualify for an NHS-funded eye test",
      "Pick a date and time online, by phone on 0330 135 5330 or in store",
      "Bring your current glasses or contact lenses and any proof of NHS entitlement",
    ],
    prosAndCons: {
      pros: [
        "An OCT scan is included in the £40 private eye test rather than charged as an extra",
        "Free hearing checks alongside eye care",
        "Inside M&S stores, so easy to combine with shopping",
        "Named a Which? Recommended Opticians provider for 2026",
      ],
      cons: [
        "Only 37 stores, so many towns do not have one",
        "The £40 private price is higher than the headline price at Specsavers, Asda, Boots or Vision Express",
        "Stores are inside larger M&S shops and retail parks rather than on every high street",
      ],
    },
    faqs: [
      {
        q: "How much is an eye test at M&S Opticians?",
        a: "M&S Opticians says its eye tests cost £40 and include an OCT scan at no extra cost. If you qualify for an NHS-funded eye test, it is free, and in Scotland NHS eye examinations are free for all UK residents.",
      },
      {
        q: "Does M&S Opticians do free eye tests?",
        a: "Yes, for anyone who qualifies for an NHS-funded eye test, including children under 16, people aged 60 or over and people with diabetes or glaucoma. M&S Opticians also runs time-limited offers from time to time, which are subject to availability and may only apply at some stores.",
      },
      {
        q: "Where are M&S Opticians stores?",
        a: "There are 37 M&S Opticians stores inside Marks & Spencer shops. They include Bluewater, Cheshire Oaks, Meadowhall, the Metro Centre, Kingston, Ealing Broadway, Oxford, Norwich, Exeter and Plymouth, plus Glasgow Argyle Street and Braehead in Scotland and Culverhouse Cross and Llanelli in Wales. Use the store finder at mandsopticians.com for the full list.",
      },
      {
        q: "Does M&S Opticians do hearing tests?",
        a: "Yes. M&S Opticians offers a free hearing health check in store, and hearing aids if you need them.",
      },
      {
        q: "Who runs M&S Opticians?",
        a: "M&S Opticians is operated by Owl Optical Ltd on behalf of Marks & Spencer plc.",
      },
      {
        q: "Is M&S Opticians good?",
        a: "M&S Opticians was named a Which? Recommended Opticians provider for 2026, for the second time. On Trustpilot it was rated 4.5 out of 5 from around 530 reviews when we checked in November 2026.",
      },
      {
        q: "How do I book an M&S Opticians eye test?",
        a: "You can book online at mandsopticians.com, call 0330 135 5330 or ask in store. Tell the team if you think you qualify for an NHS-funded test.",
      },
    ],
    externalRating: {
      source: "Trustpilot",
      url: "https://uk.trustpilot.com/review/mandsopticians.com",
      score: "4.5 out of 5",
      count: "around 530 reviews",
      checked: "November 2026",
    },
    sources: [
      { label: "M&S Opticians: Eye test FAQs", url: "https://mandsopticians.com/eye-care/help/" },
      { label: "M&S Opticians: Your M&S eye test", url: "https://mandsopticians.com/eye-care/eye-care-at-ms-opticians/your-ms-eye-test/" },
      { label: "M&S Opticians: Store finder", url: "https://mandsopticians.com/stores/" },
      { label: "M&S Opticians: FAQ (operator details)", url: "https://mandsopticians.com/faq/" },
      { label: "M&S Opticians: Home page (Which? Recommended 2026)", url: "https://mandsopticians.com/" },
      { label: "M&S Opticians: Why work for M&S Opticians", url: "https://mandsopticians.teamtailor.com/pages/why-work-for-m-s-opticians" },
      { label: "Marks & Spencer: M&S to roll out opticians service (November 2021)", url: "https://corporate.marksandspencer.com/newsroom/press-releases/more-reasons-visit-ms-roll-out-popular-opticians-service-55-stores" },
      { label: "Trustpilot: M&S Opticians reviews", url: "https://uk.trustpilot.com/review/mandsopticians.com" },
    ],
  },

  // ─── Ace & Tate ─────────────────────────────────────────────────────
  {
    slug: "ace-and-tate",
    name: "Ace & Tate",
    shortName: "Ace & Tate",
    brandColor: "#1a1a1a",
    description:
      "Ace & Tate is a Dutch eyewear brand founded in Amsterdam in 2013, known for making designer-quality glasses accessible and affordable. By cutting out traditional middlemen and designing frames in-house, they offer stylish prescription glasses with lenses included from around £98. With 17 stores across the UK — including 10 in London — Ace & Tate has become a go-to destination for fashion-conscious customers who want distinctive eyewear without the luxury price tag. Their stores are designed as welcoming, gallery-like spaces where trying on frames feels like a curated experience.",
    services: [
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Style Consultation",
    ],
    storeCount: 17,
    website: "https://www.aceandtate.com/gb",
    priceRange: "From £98 (frames + lenses)",
    nhsAvailable: false,
    available: true,
    highlights: [
      "Affordable designer-quality frames designed in-house in Amsterdam",
      "Trendy, gallery-inspired store experiences in prime city locations",
      "Transparent all-in pricing — frames with prescription lenses from £98",
      "Commitment to sustainability with recycled acetate and B-Corp certification",
    ],
    founded: "2013",
    storeLocations: [
      "brighton", "bristol", "cardiff", "glasgow", "leeds", "london", "manchester",
      "oxford",
    ],
    history:
      "Ace & Tate was founded in Amsterdam in 2013 by Mark de Lange, who set out to disrupt the traditional optical industry by offering high-quality, design-led eyewear at a fraction of the price charged by established luxury brands. The premise was simple but powerful: by designing frames in-house, manufacturing directly with trusted factories, and selling through their own stores and website, Ace & Tate could cut out the layers of middlemen that inflate eyewear prices across the industry. The brand quickly gained a following in the Netherlands and Belgium, attracting customers who wanted stylish, well-made glasses without paying hundreds of pounds for a designer label.\n\nAce & Tate expanded rapidly across Europe throughout the mid-2010s, entering the UK market with its first London stores. The brand became known not just for its products but for its retail experience — stores are designed as bright, minimalist spaces with a gallery-like aesthetic, often located in trendy neighbourhoods alongside independent boutiques and cafés. This positioning, combined with strong social media marketing and collaborations with artists and designers, helped Ace & Tate build a distinctive identity that resonated with a younger, design-aware audience. The brand also invested in an online try-at-home service, allowing customers to order frames to try before committing.\n\nToday, Ace & Tate operates 17 stores across the UK, with 10 in London and additional locations in Brighton, Bristol, Cardiff, Glasgow, Leeds, Manchester, and Oxford. The brand positions itself as the accessible alternative to luxury eyewear — offering frames with prescription lenses from around £98, with no hidden costs for standard single-vision lenses. Ace & Tate has also made sustainability a core part of its identity, using recycled acetate and bio-based materials, and achieving B-Corp certification. While they do not offer NHS-funded eye tests, their private eye test service and all-in pricing model make them a compelling choice for customers who value design, transparency, and ethical production.",
    detailedServices: [
      {
        name: "Eye Test",
        description:
          "A private eye examination carried out by a qualified optometrist at an Ace & Tate store. The test includes a thorough assessment of your vision and eye health, covering visual acuity, refraction, eye pressure, and an examination of the front and back of the eye. Results are used to provide an up-to-date prescription for glasses or contact lenses.",
        price: "From £25",
        duration: "20-25 minutes",
        nhsCovered: false,
      },
      {
        name: "Comprehensive Eye Test",
        description:
          "A more in-depth eye examination that includes additional diagnostic checks beyond the standard test. This may include digital retinal imaging, extended health screening, and a more detailed discussion of your visual needs. Recommended for patients who want a thorough assessment or who have a family history of eye conditions.",
        price: "From £50",
        duration: "30-35 minutes",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Fitting",
        description:
          "An assessment and fitting for contact lenses, including corneal measurements, tear film evaluation, and a trial with your recommended lens type. Your optician will discuss options including daily disposables and monthly lenses, and advise on insertion, removal, and care. A follow-up appointment is included to check fit and comfort.",
        price: "From £50",
        duration: "30-40 minutes",
        nhsCovered: false,
      },
      {
        name: "Frame Styling Session",
        description:
          "A complimentary one-to-one session with an Ace & Tate stylist to help you find frames that suit your face shape, skin tone, and personal style. The team will guide you through the collection, explain frame materials and lens options, and help you narrow down your choices. No appointment needed — just walk in.",
        price: "Free",
        duration: "15-20 minutes",
        nhsCovered: false,
      },
      {
        name: "Glasses Adjustment",
        description:
          "A complimentary service to adjust and tighten your Ace & Tate glasses for a perfect fit. Whether your frames have become loose, uneven, or uncomfortable, the in-store team can make adjustments on the spot. This service is available for all Ace & Tate frames and is free of charge, no appointment required.",
        price: "Free",
        duration: "10 minutes",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Search for your nearest Ace & Tate store by entering your postcode on eyetest.co.uk",
      "Find the nearest Ace & Tate location and check available services",
      "Select the type of appointment you need — eye test, comprehensive test, or contact lens fitting",
      "Choose your preferred date and time from the available slots",
      "Enter your personal details to confirm your booking",
      "Attend your appointment at the Ace & Tate store and browse frames before or after your test",
    ],
    prosAndCons: {
      pros: [
        "Transparent all-in pricing with frames and prescription lenses from £98 — no hidden extras",
        "Design-led, stylish frames created by an in-house team in Amsterdam",
        "Sustainable materials including recycled acetate, with B-Corp certification",
        "Trendy, welcoming stores with a gallery-like atmosphere and helpful stylists",
      ],
      cons: [
        "Very limited UK coverage with only 17 stores, mostly concentrated in London",
        "No NHS-funded eye tests — all services are private",
        "No hearing care or clinical specialist services beyond standard eye care",
      ],
    },
    faqs: [
      {
        q: "How much are Ace & Tate glasses?",
        a: "Ace & Tate offers prescription glasses starting from £98, which includes the frame and standard single-vision lenses — there are no hidden costs for basic prescriptions. Prices increase for more complex prescriptions, progressive (varifocal) lenses, and premium lens coatings such as blue-light filtering or extra-thin options. Sunglasses with prescription lenses start from a similar price point. The transparent pricing model means you know exactly what you are paying before you commit, with no surprise add-ons at the till.",
      },
      {
        q: "Where are Ace & Tate stores in the UK?",
        a: "Ace & Tate operates 17 stores across the UK. Ten of these are in London, spread across popular neighbourhoods including Soho, Shoreditch, Covent Garden, Notting Hill, and King's Cross. Outside London, you will find stores in Brighton, Bristol, Cardiff, Glasgow, Leeds, Manchester, and Oxford. The stores are typically located in trendy, walkable areas alongside independent shops and cafés. If there is no store near you, Ace & Tate also offers a home try-on service where you can order up to four frames to try at home for free.",
      },
      {
        q: "Do Ace & Tate offer NHS eye tests?",
        a: "No, Ace & Tate does not offer NHS-funded eye tests. All eye tests at Ace & Tate are private, starting from £25 for a standard examination and from £50 for a comprehensive test. They do not participate in the NHS optical voucher scheme for glasses either. If you are looking for a free NHS eye test, you would need to visit an optician that participates in the NHS scheme, such as Boots Opticians or Specsavers. You can use eyetest.co.uk to compare NHS and private options near you.",
      },
      {
        q: "Are Ace & Tate frames good quality?",
        a: "Ace & Tate frames are designed in-house at their Amsterdam studio and manufactured using high-quality materials including Italian Mazzucchelli acetate, lightweight stainless steel, and increasingly, recycled and bio-based acetate. The brand puts significant emphasis on design and build quality, with frames that feel solid and well-finished. Hinges, nose pads, and temple tips are designed for comfort and durability. As a certified B-Corp, Ace & Tate also meets verified standards for social and environmental performance, which extends to their material sourcing and production processes.",
      },
      {
        q: "Can I book an Ace & Tate eye test online?",
        a: "Yes, you can book an eye test at your nearest Ace & Tate store through eyetest.co.uk. Simply enter your postcode, find the nearest location, and select an available appointment slot. You can also book directly through the Ace & Tate website or by contacting the store. Booking through eyetest.co.uk lets you compare availability and prices across multiple opticians in your area, making it easy to find the best option for your needs and schedule.",
      },
      {
        q: "What makes Ace & Tate different from other opticians?",
        a: "Ace & Tate operates on a direct-to-consumer model that cuts out the traditional middlemen in the eyewear industry — the brand designs its own frames, works directly with manufacturers, and sells through its own stores and website. This means they can offer designer-quality glasses at a significantly lower price than traditional opticians selling third-party designer labels. Their transparent pricing — frames with lenses from £98 — their design-first approach, sustainability commitments, and curated retail experience set them apart from both high-street chains and luxury boutiques.",
      },
    ],
    rating: 4.6,
    reviewCount: 520,
  },

  // ─── Jimmy Fairly ─────────────────────────────────────────────────
  {
    slug: "jimmy-fairly",
    name: "Jimmy Fairly",
    shortName: "Jimmy Fairly",
    brandColor: "#e8b923",
    description:
      "Jimmy Fairly is a French eyewear brand founded in Paris in 2010 with a mission to make high-quality, stylish glasses accessible and socially responsible. For every pair of glasses sold, a pair is donated to someone in need through their 'Buy One, Give One' programme. Jimmy Fairly designs all frames in-house at their Paris atelier, offering a curated collection of fashion-forward eyewear at transparent prices. With 17 UK stores — including 11 in London — they have quickly become a popular choice for style-conscious customers who want distinctive frames with a social conscience.",
    services: [
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Style Consultation",
    ],
    storeCount: 17,
    website: "https://www.jimmyfairly.com/en-gb",
    priceRange: "From £89 (frames + lenses)",
    nhsAvailable: false,
    available: true,
    highlights: [
      "Buy One, Give One — a pair donated to someone in need with every purchase",
      "Frames designed in-house at their Paris atelier",
      "Transparent pricing with frames and prescription lenses from £89",
      "17 UK stores including 11 across London",
    ],
    founded: "2010",
    storeLocations: [
      "london", "edinburgh", "bath", "bristol", "brighton", "cambridge", "leeds",
    ],
    history:
      "Jimmy Fairly was founded in Paris in 2010 by Sacha Bostoni and Antonin Chartier, two friends who believed that quality eyewear should not come with an outrageous price tag. Inspired by the direct-to-consumer model and driven by a desire to make a positive social impact, they built the brand around a simple promise: for every pair sold, a pair is given to someone who cannot afford glasses. The brand expanded rapidly across France before launching in the UK, where they have opened 17 stores in premium high-street locations. Each store is designed to feel warm and inviting, with a distinctive French aesthetic that sets them apart from typical opticians.",
    detailedServices: [
      {
        name: "Eye Test",
        description:
          "A private eye examination carried out by a qualified optometrist at a Jimmy Fairly store. The test includes a comprehensive assessment of your vision and eye health, with results used to provide an up-to-date prescription for glasses or contact lenses.",
        price: "From £30",
        duration: "20-25 minutes",
        nhsCovered: false,
      },
      {
        name: "Glasses",
        description:
          "A wide selection of fashion-forward frames designed in Paris, available with single-vision or progressive prescription lenses. All frames come with anti-reflective, anti-scratch lenses included in the price. Premium options include blue-light filtering and photochromic lenses.",
        price: "From £89",
        duration: "Frame selection + fitting",
        nhsCovered: false,
      },
      {
        name: "Contact Lens Fitting",
        description:
          "A professional contact lens fitting and assessment to find the best lenses for your eyes and lifestyle. Includes a trial of lenses and guidance on insertion, removal, and care.",
        price: "From £50",
        duration: "30 minutes",
        nhsCovered: false,
      },
    ],
    bookingProcess: [
      "Search for your nearest Jimmy Fairly store by entering your postcode on eyetest.co.uk",
      "Find the nearest location and check available appointment types",
      "Click through to book directly on the Jimmy Fairly website",
      "Select your preferred date and time from the available slots",
      "Attend your appointment and browse the frame collection before or after your test",
    ],
    prosAndCons: {
      pros: [
        "Socially responsible — every purchase donates a pair of glasses to someone in need",
        "Stylish, Paris-designed frames that stand out from mainstream high-street options",
        "Transparent all-in pricing with frames and lenses from £89",
        "Welcoming, well-designed stores with a distinctive French aesthetic",
      ],
      cons: [
        "No NHS-funded eye tests — all services are private",
        "Limited UK presence with 17 stores concentrated in London and select cities",
        "Smaller frame selection compared to large chains like Specsavers or Boots",
        "Not available in most towns outside London and a few major cities",
      ],
    },
    faqs: [
      {
        q: "How much are Jimmy Fairly glasses?",
        a: "Jimmy Fairly glasses start from £89 for frames with single-vision prescription lenses included. This transparent pricing means no hidden extras for standard lenses. Progressive lenses and premium lens options such as blue-light filtering or photochromic lenses are available at additional cost. Sunglasses and non-prescription frames are also available. All frames are designed in-house at their Paris atelier.",
      },
      {
        q: "Where are Jimmy Fairly stores in the UK?",
        a: "Jimmy Fairly has 17 stores across the UK. Eleven are in London, located in Chelsea, Covent Garden, Battersea, Soho, Hampstead, Wimbledon, Stoke Newington, Kingston, Angel, Portobello, and Soho Carnaby. Outside London, you can find stores in Edinburgh, Bath, Bristol, Brighton, Cambridge, and Leeds. You can search for your nearest store on eyetest.co.uk by entering your postcode.",
      },
      {
        q: "Do Jimmy Fairly offer NHS eye tests?",
        a: "No, Jimmy Fairly does not offer NHS-funded eye tests. All eye tests at Jimmy Fairly are private. If you are looking for a free NHS eye test, you would need to visit an optician that participates in the NHS scheme, such as Boots Opticians or Vision Express. You can use eyetest.co.uk to compare NHS and private options near you.",
      },
      {
        q: "What is Jimmy Fairly's Buy One Give One programme?",
        a: "For every pair of glasses sold, Jimmy Fairly donates a pair to someone in need through their Buy One, Give One programme. Since launching in 2010, they have donated hundreds of thousands of pairs of glasses to communities around the world. This social mission is central to the brand's identity and is one of the key reasons customers choose Jimmy Fairly over other opticians.",
      },
      {
        q: "Can I book a Jimmy Fairly eye test online?",
        a: "Yes, you can book an eye test at your nearest Jimmy Fairly store through eyetest.co.uk. Simply enter your postcode, find the nearest location, and click through to book directly. You can also book through the Jimmy Fairly website. Booking through eyetest.co.uk lets you compare availability and prices across multiple opticians in your area.",
      },
    ],
    rating: 4.7,
    reviewCount: 380,
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Look up a single brand by its URL slug. */
export function getOpticianBySlug(
  slug: string,
): OpticianBrand | undefined {
  return opticians.find((o) => o.slug === slug);
}

/** Return every slug in the catalogue (useful for static-path generation). */
export function getAllSlugs(): string[] {
  return opticians.map((o) => o.slug);
}

/** Brands with real availability — the independents and smaller chains. */
export function getAvailableOpticians(): OpticianBrand[] {
  return opticians.filter((o) => o.available);
}

/** Brands listed but not yet bookable (pending commercial agreements). */
export function getUnavailableOpticians(): OpticianBrand[] {
  return opticians.filter((o) => !o.available);
}

/** Return all brands that have a store in the given location slug. */
export function getOpticiansByLocation(locationSlug: string): OpticianBrand[] {
  return opticians.filter((o) => o.storeLocations.includes(locationSlug));
}

/** Return all unique location slugs across all brands. */
export function getAllLocations(): string[] {
  const locations = new Set<string>();
  for (const o of opticians) {
    for (const loc of o.storeLocations) {
      locations.add(loc);
    }
  }
  return Array.from(locations).sort();
}
