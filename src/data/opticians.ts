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
  /** Optional page heading; defaults to the brand name */
  h1?: string;
  /** Short price answer shown first on the page (the answer to "how much is an eye test at X") */
  priceAnswer?: {
    heading: string;
    summary: string;
    rows: { label: string; price: string }[];
  };
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
    seoTitle: "Boots Eye Test Price 2026: From £29.95, OCT & Free NHS Tests",
    h1: "Boots Opticians Eye Test Price and Cost (2026)",
    priceAnswer: {
      heading: "How much is an eye test at Boots?",
      summary: "Boots says its Essential Eye Test costs from £29.95, including a Dry Eye Evaluation, and is free if you qualify for an NHS-funded test.",
      rows: [
        { label: "Essential Eye Test", price: "From £29.95" },
        { label: "NHS-funded eye test", price: "Free if you qualify" },
        { label: "Advanced Eye Test with OCT", price: "From £25 extra" },
        { label: "Ultimate Eye Test (optomap and OCT)", price: "From £50 extra, selected stores" },
        { label: "Contact lens check", price: "£50" },
      ],
    },
    seoDescription:
      "Boots Opticians eye tests cost from £29.95 with a dry eye check included. OCT adds from £25, the Ultimate test from £50, and NHS tests are free if you qualify.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description:
      "Boots Opticians is one of the UK's best-known and largest optician chains, with around 637 practices according to Boots UK, about 30% of them inside Boots stores. Its Essential Eye Test costs from £29.95 and includes a Dry Eye Evaluation. The Advanced Eye Test adds an OCT scan from £25 extra, and the Ultimate Eye Test adds an optomap and OCT scan from £50 extra in selected stores. NHS-funded eye tests are free for anyone who qualifies.",
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
        "Every adult sight test includes a Dry Eye Evaluation as standard",
        "A choice of three eye test levels, up to the Ultimate Eye Test with optomap and OCT imaging",
        "Experienced optometrists across around 637 practices, many inside Boots stores",
        "Free contact lens trials for new wearers and free hearing tests through Boots Hearingcare",
        "Earn Advantage Card points when you spend at Boots Opticians",
      ],
      cons: [
        "Prices may vary across regional stores, so check your local practice's fee when you book",
        "OCT is an optional upgrade with the Advanced Eye Test, so you can choose whether to add it",
        "The Ultimate Eye Test is available in selected stores",
        "Advantage Card points are earned at Boots Opticians rather than spent there",
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
    seoTitle: "Specsavers Eye Test Price 2026: £20 to £25, Free NHS Tests & OCT",
    h1: "Specsavers Eye Test Price and Cost (2026)",
    priceAnswer: {
      heading: "How much is an eye test at Specsavers?",
      summary: "Specsavers says a routine eye test costs £20 to £25 depending on the store, and is free if you qualify for an NHS-funded test.",
      rows: [
        { label: "Routine eye test", price: "£20 to £25" },
        { label: "NHS-funded eye test", price: "Free if you qualify" },
        { label: "OCT scan", price: "Up to £10 extra in most stores" },
        { label: "Private home eye test", price: "£60" },
        { label: "Hearing test", price: "Free" },
      ],
    },
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
        "You book directly with Specsavers online, by phone or in store",
        "OCT is an optional extra, available in most stores",
        "Glasses bought on a home visit usually include a £30 home visit fee",
        "Prices can vary by store and offers change from time to time, so check when you book",
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
    seoTitle: "Vision Express Eye Test Price 2026: £30 with OCT, Free NHS Tests",
    h1: "Vision Express Eye Test Price and Cost (2026)",
    priceAnswer: {
      heading: "How much is an eye test at Vision Express?",
      summary: "Vision Express says its Advanced Eye Test costs £30 and includes an OCT 3D eye scan. NHS-funded eye tests are free if you qualify, with an upgrade to the Advanced Eye Test from £6.",
      rows: [
        { label: "Advanced Eye Test (OCT included)", price: "£30" },
        { label: "NHS-funded eye test", price: "Free if you qualify" },
        { label: "NHS upgrade to the Advanced Eye Test", price: "From £6" },
        { label: "Children's eye test", price: "Free (NHS funded)" },
      ],
    },
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
        "An OCT scan is included in the £30 Advanced Eye Test, along with UV and dry eye assessments",
        "NHS patients can upgrade to the Advanced Eye Test from £6",
        "100 days free returns and free lifetime service on purchases",
        "Over 550 stores, on high streets and inside Tesco",
      ],
      cons: [
        "Frame brands vary from store to store, so check what your local store stocks",
        "You book directly with Vision Express online or in store",
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
    name: "Asda Opticians",
    shortName: "Asda",
    brandColor: "#78b530",
    seoTitle: "Asda Eye Test Price 2026: £24, Free NHS Tests & Glasses from £15",
    h1: "Asda Opticians Eye Test Price and Cost (2026)",
    priceAnswer: {
      heading: "How much is an eye test at Asda?",
      summary: "Asda Opticians says an eye test costs £24 and takes about 30 minutes, and is free if you qualify for an NHS-funded test.",
      rows: [
        { label: "Private eye test", price: "£24" },
        { label: "NHS-funded eye test", price: "Free if you qualify" },
        { label: "Enhanced eye test with OCT", price: "Ask your store (selected stores)" },
        { label: "Complete glasses", price: "From £15 single vision" },
      ],
    },
    seoDescription: "Asda Opticians eye tests cost £24 and take about 30 minutes, with free NHS tests, free kids' glasses with an NHS voucher and single vision glasses from £15.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Asda Opticians runs opticians in over 157 Asda stores across the UK and Northern Ireland, with qualified optometrists, dispensing opticians and optical advisors in every practice. A private eye test costs £24 and takes about 30 minutes, NHS-funded tests are free for anyone who qualifies, and enhanced eye tests with OCT are available at selected stores. Glasses come at a complete price, from £15 for single vision.",
    services: ["NHS Eye Tests", "Private Eye Tests", "OCT Scan", "Children's Eye Tests", "Contact Lenses", "Glasses", "Myopia Management"],
    storeCount: 157,
    website: "https://opticians.asda.com",
    priceRange: "Free NHS / £24 private",
    nhsAvailable: true,
    available: true,
    highlights: ["A private eye test for £24, taking about 30 minutes", "Free prescription glasses for children from selected frames with an NHS voucher", "Complete-price glasses from £15 for single vision and £45 for varifocals", "Open 7 days a week with late evenings in many stores"],
    founded: "2000",
    storeLocations: ["london", "croydon", "bromley", "kingston-upon-thames", "ealing", "brighton", "reading", "southampton", "portsmouth", "milton-keynes", "slough", "crawley", "basingstoke", "bristol", "bath", "exeter", "plymouth", "bournemouth", "swindon", "gloucester", "cheltenham", "taunton", "cambridge", "norwich", "ipswich", "colchester", "chelmsford", "luton", "peterborough", "southend-on-sea", "bedford", "birmingham", "coventry", "wolverhampton", "stoke-on-trent", "worcester", "nottingham", "leicester", "derby", "northampton", "manchester", "liverpool", "chester", "warrington", "preston", "blackpool", "bolton", "newcastle", "sunderland", "middlesbrough", "leeds", "sheffield", "bradford", "hull", "doncaster", "cardiff", "swansea", "newport"],
    history: "Asda opened its first opticians in 2000 as part of its commitment to a professional, community-based eye care service at great value prices. Asda Opticians is now in over 157 Asda stores across the United Kingdom and Northern Ireland.\n\nEvery practice has a team of qualified optometrists, dispensing opticians and optical advisors, and Asda accepts prescriptions from other opticians, so you can have your eye test elsewhere and buy your glasses at Asda.\n\nAsda Opticians uses complete pricing on glasses, so frames, lenses and standard coatings are included in the price you see.",
    detailedServices: [
      { name: "NHS-funded eye test", description: "A free eye test for anyone who qualifies for NHS funding, including children under 16, people aged 60 or over and people with diabetes or glaucoma. In Scotland, NHS eye examinations are free for all UK residents.", price: "Free (if eligible)", duration: "About 30 minutes", nhsCovered: true },
      { name: "Private eye test", description: "Asda's eye test includes eye pressure (tonometry), an auto-refractor reading and visual field screening before the optometrist checks your vision and eye health and gives you a health report.", price: "£24", duration: "About 30 minutes", nhsCovered: false },
      { name: "Enhanced eye test with OCT", description: "An eye test using OCT technology, available at selected stores. Ask your local store for the price.", price: "Ask in store", duration: "Varies", nhsCovered: false },
      { name: "Children's eye test and glasses", description: "Free NHS eye tests for children, with free prescription glasses from selected frames when you use an NHS voucher.", price: "Free (NHS funded)", duration: "Varies", nhsCovered: true },
      { name: "Contact lenses", description: "Contact lens fittings and supply, with free UK mainland delivery on online orders. If you buy lenses from Asda you get one free aftercare appointment in the first 12 months.", price: "Ask in store", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Asda Opticians by postcode, here on eyetest.co.uk or at opticians.asda.com", "Book online, by phone or in store", "Tell the team if you think you qualify for an NHS-funded eye test", "Bring your current glasses or contact lenses and any proof of NHS entitlement"],
    prosAndCons: { pros: ["One of the lowest published private eye test prices on the high street, at £24", "Free prescription glasses for children from selected frames with an NHS voucher", "Clear complete pricing on glasses, from £15 single vision", "Convenient opening hours inside Asda stores, including evenings and weekends"], cons: ["OCT is available at selected stores, so check with your local practice", "Opticians are in larger Asda stores, so use the store finder to check for one near you"] },
    faqs: [
      { q: "How much is an eye test at Asda?", a: "Asda Opticians says an eye test is £24, or free if you qualify for an NHS-funded test. In Scotland, NHS eye examinations are free for all UK residents." },
      { q: "How long does an Asda eye test take?", a: "Asda says your eye test will usually last about 30 minutes." },
      { q: "Does Asda do OCT scans?", a: "Yes. Asda says enhanced eye tests using OCT technology are available at selected stores. Ask your local store for details and price." },
      { q: "Are children's glasses free at Asda?", a: "Asda Opticians offers free prescription glasses for children from selected frames when you use an NHS voucher." },
      { q: "How much are glasses at Asda Opticians?", a: "Asda's complete-price glasses start from £15 for single vision and £45 for varifocals, with frames, lenses and standard coatings included." },
      { q: "Can I use a prescription from another optician at Asda?", a: "Yes. Asda Opticians accepts prescriptions from other opticians, so you can order glasses with a prescription from elsewhere." },
    ],
    sources: [
      { label: "Asda Opticians: Having an eye test", url: "https://opticians.asda.com/having-an-eye-test" },
      { label: "Asda Opticians: Home page", url: "https://opticians.asda.com/" },
      { label: "Asda Opticians: Our complete price on glasses", url: "https://opticians.asda.com/our-complete-price-on-glasses" },
      { label: "Asda Opticians: About us", url: "https://opticians.asda.com/about" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Leightons ──────────────────────────────────────────────────────
  {
    slug: "leightons",
    name: "Leightons Opticians & Hearing Care",
    shortName: "Leightons",
    brandColor: "#1e3a5f",
    seoTitle: "Leightons Eye Test: £39, Enhanced £69, Ultimate £99 | Opticians & Hearing",
    seoDescription: "Leightons Opticians & Hearing Care eye tests cost £39, with an Enhanced test at £69 and an Ultimate test with optomap and OCT at £99. 37 branches across the South.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Leightons Opticians & Hearing Care has 37 branches across the South and South East of England, from Hampshire and Surrey to London, Berkshire and Dorset. It offers three levels of eye test: a private eye test for £39, an Enhanced eye test with optomap or OCT imaging for £69 and an Ultimate eye exam with both for £99. NHS-funded eye tests are free for anyone who qualifies, and every branch offers hearing care too.",
    services: ["NHS Eye Tests", "Private Eye Tests", "OCT Scan", "Optomap", "Children's Eye Tests", "Contact Lenses", "Glasses", "Hearing Tests"],
    storeCount: 37,
    website: "https://www.leightons.co.uk",
    priceRange: "Free NHS / From £39 private",
    nhsAvailable: true,
    available: true,
    highlights: ["Three levels of eye test, from £39 to the £99 Ultimate eye exam with optomap and OCT", "A 30-minute appointment with your optometrist at every level", "Eye and hearing care in the same branches", "MyLeightons care plans from £14 a month, including the Ultimate eye exam"],
    founded: "1928",
    storeLocations: ["london", "basingstoke", "reading", "southampton", "st-albans", "swindon", "tunbridge-wells", "epsom"],
    history: "Leightons has been looking after eyesight in the south of England since 1928 and today operates as Leightons Opticians & Hearing Care, with 37 branches across Berkshire, Buckinghamshire, Dorset, Gloucestershire, Hampshire, Hertfordshire, Kent, London, Somerset, Surrey, Sussex and Wiltshire.\n\nEvery eye test includes 30 minutes with an optometrist. Leightons' Enhanced and Ultimate eye tests add pre-appointment imaging, including optomap and OCT scans, for a more detailed view of your eye health.\n\nAlongside eye care, Leightons branches offer hearing tests and hearing aids, and the MyLeightons care plans bundle regular eye examinations with discounts on glasses and contact lenses.",
    detailedServices: [
      { name: "NHS-funded eye test", description: "A free eye test for anyone who qualifies for NHS funding, including children under 16, people aged 60 or over and people with diabetes or glaucoma.", price: "Free (if eligible)", duration: "30 minutes", nhsCovered: true },
      { name: "Leightons private eye test", description: "A routine eye examination checking vision at multiple distances, eye movement and coordination, internal and external eye health and your prescription.", price: "£39", duration: "30 minutes", nhsCovered: false },
      { name: "Leightons enhanced eye test", description: "The private eye test plus about 10 minutes of pre-appointment imaging with optomap or OCT, for more detailed screening.", price: "£69", duration: "30 minutes plus 10 minutes imaging", nhsCovered: false },
      { name: "Leightons ultimate eye exam", description: "Leightons' most advanced assessment, with optomap and OCT imaging, available at selected practices.", price: "£99", duration: "30 minutes plus 15 minutes imaging", nhsCovered: false },
      { name: "Hearing care", description: "Hearing tests and hearing aids are available at Leightons branches. Book a hearing appointment online or by phone.", price: "Ask in branch", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Leightons branch by postcode, here on eyetest.co.uk or at leightons.co.uk", "Choose the private, Enhanced or Ultimate eye test, or a hearing appointment", "Book online, call 0800 40 20 20 or visit your local branch", "Tell the team if you think you qualify for an NHS-funded eye test"],
    prosAndCons: { pros: ["A choice of three eye test levels, up to the Ultimate eye exam with optomap and OCT", "Every test includes a 30-minute appointment with an optometrist", "Eye and hearing care in the same branches", "A long-established business, caring for eyes in the south of England since 1928"], cons: ["Branches are in the South and South East of England", "The Ultimate eye exam is available at selected practices"] },
    faqs: [
      { q: "How much is an eye test at Leightons?", a: "Leightons says its private eye test costs £39, the Enhanced eye test with optomap or OCT costs £69 and the Ultimate eye exam with both costs £99. NHS-funded eye tests are free if you qualify." },
      { q: "What is the Leightons Ultimate eye exam?", a: "The Ultimate eye exam is Leightons' most comprehensive assessment, combining optomap and OCT imaging with a 30-minute optometrist appointment. It is available at selected practices." },
      { q: "Where are Leightons branches?", a: "Leightons has 37 branches, including Basingstoke, Reading, Southampton, St Albans, Swindon, Tunbridge Wells, Winchester, Windsor and three in London (Leadenhall Street, Putney and Sutton)." },
      { q: "Does Leightons do hearing tests?", a: "Yes. Leightons Opticians & Hearing Care offers hearing appointments at its branches, which you can book online or by phone." },
      { q: "How do I book a Leightons eye test?", a: "You can book online, call 0800 40 20 20 or visit your local branch." },
    ],
    sources: [
      { label: "Leightons: Eye tests", url: "https://www.leightons.co.uk/pages/eye-tests" },
      { label: "Leightons: Find a branch", url: "https://www.leightons.co.uk/pages/find-a-branch" },
      { label: "Leightons: MyLeightons care plan", url: "https://www.leightons.co.uk/myleightons" },
      { label: "Leightons: Ultimate eye examination", url: "https://www.leightons.co.uk/eye-care/eye-examinations/optomap" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Rawlings ───────────────────────────────────────────────────────
  {
    slug: "rawlings",
    name: "Rawlings Opticians",
    shortName: "Rawlings",
    brandColor: "#8b2252",
    seoTitle: "Rawlings Opticians Eye Test Prices: From £55, OCT, NHS & Hearing Care",
    seoDescription: "Rawlings Opticians & Hearing Care eye tests cost £55 with retinal photography, or £95 with OCT, NHS tests are free if you qualify, and hearing tests are free. 12 branches in Hampshire and Surrey.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Rawlings Opticians & Hearing Care is a long-established independent business with 12 branches in Hampshire and Surrey. Its private 30-minute eye examination with retinal photography costs £55, or £95 with an OCT scan, and NHS patients can have an enhanced examination with OCT for £70. NHS sight tests are free for anyone who qualifies, and hearing tests are free.",
    services: ["NHS Eye Tests", "Private Eye Tests", "OCT Scan", "Children's Eye Tests", "Contact Lenses", "Glasses", "Hearing Tests", "Ear Wax Removal"],
    storeCount: 12,
    website: "https://rawlingsopticians.co.uk",
    priceRange: "Free NHS / From £55 private",
    nhsAvailable: true,
    available: true,
    highlights: ["Private eye examination with retinal photography for £55, or £95 with OCT", "Enhanced NHS eye examination with OCT and retinal photography for £70", "Free hearing tests, plus wax removal for £70", "Rawlings Vision Plan from £12 a month, with 25% off frames and up to 40% off lenses"],
    founded: "1898",
    storeLocations: ["croydon", "southampton"],
    history: "Rawlings is a long-established independent opticians serving twelve towns in Hampshire and Surrey: Alresford, Alton, Banstead, Bookham, Caterham, Chandler's Ford, Croydon, Hedge End, Lymington, Purley, Stockbridge and Winchester.\n\nAlongside eye examinations, Rawlings offers hearing care, contact lenses, myopia management and specialist services such as glaucoma referral refinement, and it publishes its full professional fees on its website.\n\nThe Rawlings Vision Plan and Rawlings Hearing Plan spread the cost of care with a monthly fee.",
    detailedServices: [
      { name: "NHS sight test", description: "Free for anyone who qualifies for NHS funding, including all children under 16. Retinal photography and OCT are not included but can be added.", price: "Free (if eligible)", duration: "Varies", nhsCovered: true },
      { name: "Private eye examination with retinal photography", description: "A private 30-minute eye examination including retinal fundus photography.", price: "£55", duration: "30 minutes", nhsCovered: false },
      { name: "Private eye examination with OCT", description: "The private eye examination with retinal photography plus an OCT scan and digital storage.", price: "£95", duration: "Varies", nhsCovered: false },
      { name: "Enhanced NHS eye examination", description: "For NHS patients, an enhanced examination including retinal photography, an OCT scan and digital storage.", price: "£70", duration: "Varies", nhsCovered: false },
      { name: "Contact lens consultation or fitting", description: "An initial contact lens consultation or fitting. Contact lens care is included in the Rawlings Vision Plan Plus with contact lenses.", price: "From £95", duration: "Varies", nhsCovered: false },
      { name: "Hearing test", description: "A free hearing test, with an enhanced hearing test (£35) and wax removal (£70) also available.", price: "Free", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Rawlings branch, here on eyetest.co.uk or at rawlingsopticians.co.uk", "Choose an eye examination, contact lens appointment or hearing appointment", "Book online or contact your local branch", "Tell the team if you think you qualify for an NHS sight test"],
    prosAndCons: { pros: ["Clear, fully published professional fees", "OCT and retinal photography available for both private and NHS patients", "Free hearing tests alongside eye care", "Free adjustments for the lifetime of glasses bought from Rawlings"], cons: ["Branches are in Hampshire and Surrey", "Some specialist services are only offered at particular branches"] },
    faqs: [
      { q: "How much is an eye test at Rawlings?", a: "Rawlings says its private 30-minute eye examination with retinal photography costs £55, or £95 with an OCT scan. NHS sight tests are free if you qualify, and NHS patients can upgrade to an enhanced examination with OCT for £70." },
      { q: "Where are Rawlings branches?", a: "Rawlings has 12 branches in Hampshire and Surrey: Alresford, Alton, Banstead, Bookham, Caterham, Chandler's Ford, Croydon, Hedge End, Lymington, Purley, Stockbridge and Winchester." },
      { q: "Does Rawlings do hearing tests?", a: "Yes. Rawlings offers free hearing tests, plus an enhanced hearing test for £35 and wax removal for £70." },
      { q: "What is the Rawlings Vision Plan?", a: "A monthly plan from £12 that covers your eye care and gives 25% off frames and up to 40% off lenses, with options that include contact lenses or myopia management." },
    ],
    sources: [
      { label: "Rawlings: Professional fees", url: "https://rawlingsopticians.co.uk/professional-fees/" },
      { label: "Rawlings: Home page", url: "https://rawlingsopticians.co.uk/" },
      { label: "Rawlings: Find a branch", url: "https://rawlingsopticians.co.uk/find-a-branch/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Scrivens ───────────────────────────────────────────────────────
  {
    slug: "scrivens",
    name: "Scrivens Opticians & Hearing Care",
    shortName: "Scrivens",
    brandColor: "#c62828",
    seoTitle: "Scrivens Eye Test: £30, OCT £10 Extra, Free NHS Tests & Hearing Care",
    seoDescription: "Scrivens Opticians & Hearing Care eye tests cost £30 and take about half an hour, with OCT £10 extra and free NHS tests. Around 160 branches across England and Wales.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Scrivens Opticians & Hearing Care is a family-run business with around 160 branches, from the Midlands and the North to London, the South and East Anglia. A Scrivens eye test costs £30 and typically takes about half an hour, an OCT scan costs £10 extra, and NHS-funded eye tests are free for anyone who qualifies. Hearing care is available too.",
    services: ["NHS Eye Tests", "Private Eye Tests", "OCT Scan", "Children's Eye Tests", "Contact Lenses", "Glasses", "Hearing Tests"],
    storeCount: 160,
    website: "https://scrivens.com",
    priceRange: "Free NHS / £30 private",
    nhsAvailable: true,
    available: true,
    highlights: ["A £30 eye test, taking around half an hour", "OCT scans for just £10 extra, including with an NHS-funded test", "Eye and hearing care from a family-run business", "Around 160 branches"],
    founded: "1938",
    storeLocations: ["london", "birmingham", "wolverhampton", "leeds", "sheffield", "huddersfield", "doncaster", "bolton", "blackpool", "norwich", "peterborough", "milton-keynes", "exeter", "southampton", "bristol", "stoke-on-trent", "bournemouth", "reading"],
    history: "Scrivens is a family-run business that has been putting customers at the heart of everything it does for over 85 years. Its head office is in Edgbaston, Birmingham.\n\nToday Scrivens Opticians & Hearing Care has around 160 branches, including Birmingham, Wolverhampton, Leeds, Sheffield, Huddersfield, Doncaster, Bolton, Blackpool, Norwich, Peterborough, Milton Keynes and Exeter, and many in London, Southampton and Bristol.\n\nScrivens recommends an eye test every two years for adults, and every year for children aged 16 and under and adults over 70.",
    detailedServices: [
      { name: "NHS-funded eye test", description: "A free eye test for anyone who qualifies for NHS funding, with NHS optical vouchers accepted towards glasses or contact lenses.", price: "Free (if eligible)", duration: "About 30 minutes", nhsCovered: true },
      { name: "Private eye test", description: "Your optician checks your vision and overall eye health, looking to spot any potential eye conditions.", price: "£30", duration: "About 30 minutes", nhsCovered: false },
      { name: "OCT scan", description: "A 3D scan of the back of the eye, added to a standard or NHS-funded eye test. Scrivens recommends an OCT scan every time you have an eye test.", price: "£10 extra", duration: "A few seconds", nhsCovered: false },
      { name: "Children's eye test", description: "Free on the NHS for children. Scrivens recommends children have an eye test before they start school.", price: "Free (NHS funded)", duration: "Varies", nhsCovered: true },
      { name: "Hearing care", description: "Hearing tests and hearing aids at Scrivens Opticians & Hearing Care.", price: "Ask in branch", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Scrivens branch by postcode, here on eyetest.co.uk or at scrivens.com", "Book online, call or visit your local branch", "Tell the team if you think you qualify for an NHS-funded eye test", "Ask about adding an OCT scan for £10"],
    prosAndCons: { pros: ["A £30 eye test with clear published pricing", "OCT is just £10 extra, including with an NHS-funded test", "Eye and hearing care from a family-run business", "A wide network of around 160 branches"], cons: ["Prices and offers can change, so check scrivens.com for current offers"] },
    faqs: [
      { q: "How much is an eye test at Scrivens?", a: "Scrivens says its eye tests are £30, or free if you qualify for an NHS-funded test. Scrivens also runs time-limited offers from time to time." },
      { q: "How much is an OCT scan at Scrivens?", a: "Scrivens says an OCT scan costs £10 extra on top of a standard or NHS-funded eye test." },
      { q: "How long does a Scrivens eye test take?", a: "Scrivens says its eye tests typically take around half an hour." },
      { q: "Does Scrivens accept NHS vouchers?", a: "Yes. Scrivens accepts NHS optical vouchers towards the cost of glasses or contact lenses." },
      { q: "Does Scrivens do hearing tests?", a: "Yes. Scrivens Opticians & Hearing Care offers hearing care alongside eye care." },
    ],
    sources: [
      { label: "Scrivens: How much is an eye test?", url: "https://scrivens.com/faqs/how-much-is-an-eye-test/" },
      { label: "Scrivens: OCT scans", url: "https://scrivens.com/opticians/oct/" },
      { label: "Scrivens: Eye health", url: "https://scrivens.com/opticians/eye-health/" },
      { label: "Scrivens: All branches", url: "https://scrivens.com/all-branches/" },
      { label: "Scrivens: Home page", url: "https://scrivens.com/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Bayfields ──────────────────────────────────────────────────────
  {
    slug: "bayfields",
    name: "Bayfields Opticians & Audiologists",
    shortName: "Bayfields",
    brandColor: "#4a148c",
    seoTitle: "Bayfields Opticians Eye Test: 45-Minute Tests, Advanced £64, Ultimate £77",
    seoDescription: "Bayfields Opticians & Audiologists offers 45-minute eye tests, with an Advanced Eye Test with OCT for £64 and an Ultimate Eye Test for £77. 55 practices.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Bayfields Opticians & Audiologists has been caring for eyes and ears since 2004 and now has 55 practices across England. Every eye test is a comprehensive 45-minute appointment. At practices with OCT, the Advanced Eye Test costs £64, and the Ultimate Eye Test with an optomap scan costs £77. NHS patients can upgrade, and hearing care is available too.",
    services: ["NHS Eye Tests", "Private Eye Tests", "OCT Scan", "Optomap", "Children's Eye Tests", "Contact Lenses", "Glasses", "Hearing Tests", "Ear Wax Removal"],
    storeCount: 55,
    website: "https://www.bayfieldsopticians.com",
    priceRange: "Free NHS / Advanced £64 (OCT)",
    nhsAvailable: true,
    available: true,
    highlights: ["Comprehensive 45-minute eye test appointments", "Advanced Eye Test with OCT for £64 and Ultimate Eye Test with optomap for £77 at selected practices", "NHS patients can add OCT for £39 or the Ultimate scans for £49", "Eye and hearing care, including hearing tests and wax removal"],
    founded: "2004",
    storeLocations: ["london", "canterbury", "chester", "guildford", "harrogate", "huddersfield", "maidstone", "woking", "york", "leeds", "oxford", "bristol", "milton-keynes", "wolverhampton"],
    history: "Bayfields has been building practices since 2004 where clients can take their time, explain their concerns and feel cared for. It now has 55 practices across England, including Canterbury, Chester, Guildford, Harrogate, Huddersfield, Maidstone, Woking and York, as well as practices in London and around Leeds and Oxford.\n\nBayfields is known for longer eye examinations, with every eye test a 45-minute appointment, and offers advanced imaging such as OCT and optomap at selected practices.\n\nAs Bayfields Opticians & Audiologists, it also provides hearing tests, hearing aids and ear wax removal.",
    detailedServices: [
      { name: "NHS-funded eye test", description: "A free eye test for anyone who qualifies for NHS funding. NHS patients can upgrade to include OCT for £39, or the Ultimate scans for £49.", price: "Free (if eligible)", duration: "45 minutes", nhsCovered: true },
      { name: "Advanced Eye Test", description: "A comprehensive 45-minute eye examination plus an OCT scan, available at selected practices with OCT technology.", price: "£64", duration: "45 minutes", nhsCovered: false },
      { name: "Ultimate Eye Test", description: "A 45-minute eye examination with an optomap ultra-widefield retinal scan, plus an OCT scan where available, at selected practices.", price: "£77", duration: "45 minutes", nhsCovered: false },
      { name: "Hearing care", description: "Hearing tests, hearing aids, tinnitus support and ear wax removal.", price: "Ask in practice", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Bayfields practice, here on eyetest.co.uk or at bayfieldsopticians.com", "Book your eye test online or call the practice", "Tell the team if you think you qualify for an NHS-funded eye test", "Ask whether your practice offers OCT or optomap"],
    prosAndCons: { pros: ["Every eye test is a comprehensive 45-minute appointment", "Advanced imaging with OCT and optomap at selected practices", "Eye and hearing care under one roof", "A friendly, unhurried approach to eye care"], cons: ["Advanced and Ultimate tests are offered at practices with the right technology, so check with your local practice", "Practices are in England"] },
    faqs: [
      { q: "How much is an eye test at Bayfields?", a: "Bayfields says its Advanced Eye Test with OCT costs £64 and its Ultimate Eye Test with optomap costs £77, at selected practices. NHS-funded eye tests are free if you qualify, with an OCT upgrade for £39." },
      { q: "How long is a Bayfields eye test?", a: "Bayfields says every eye test is a comprehensive 45-minute appointment." },
      { q: "Does Bayfields do hearing tests?", a: "Yes. Bayfields Opticians & Audiologists offers hearing tests, hearing aids and ear wax removal." },
      { q: "Where are Bayfields practices?", a: "Bayfields has 55 practices across England, including Canterbury, Chester, Guildford, Harrogate, Huddersfield, Maidstone, Woking, York and several in London." },
    ],
    sources: [
      { label: "Bayfields: Eye tests", url: "https://www.bayfieldsopticians.com/eye-care/eye-tests/" },
      { label: "Bayfields: About Bayfields", url: "https://www.bayfieldsopticians.com/about-bayfields/" },
      { label: "Bayfields: Practices", url: "https://www.bayfieldsopticians.com/practices/" },
      { label: "Bayfields: Hearing care", url: "https://www.bayfieldsopticians.com/hearing-care/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Duncan & Todd ──────────────────────────────────────────────────
  {
    slug: "duncan-and-todd",
    name: "Duncan & Todd Group",
    shortName: "Duncan & Todd",
    brandColor: "#00695c",
    seoTitle: "Duncan and Todd Opticians: Free NHS Eye Tests in Scotland & Hearing Care",
    seoDescription: "Duncan and Todd Sight and Hearing Care has served communities across Scotland since 1972, with free NHS eye examinations, OCT, hearing care and 2 for 1 on glasses.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Duncan and Todd Sight and Hearing Care has provided local sight and hearing care across Scotland since 1972, with stores in Aberdeen, Aberdeenshire, Moray, Dundee, Angus, the Highlands, Perth and Stirling. NHS eye examinations in Scotland are free for everyone who is ordinarily resident in the UK, and Duncan and Todd also offers OCT, contact lenses, hearing care and a 2 for 1 offer on glasses.",
    services: ["NHS Eye Tests", "OCT Scan", "Children's Eye Tests", "Contact Lenses", "Glasses", "Hearing Tests"],
    storeCount: 23,
    website: "https://www.duncanandtoddgroup.com/duncan-and-todd",
    priceRange: "Free NHS eye examinations in Scotland",
    nhsAvailable: true,
    available: true,
    highlights: ["Free NHS eye examinations for everyone ordinarily resident in the UK, as in all Scottish opticians", "Local sight and hearing care across north-east and central Scotland since 1972", "OCT scans available", "2 for 1 on glasses"],
    founded: "1972",
    storeLocations: ["aberdeen", "dundee", "perth", "stirling"],
    history: "Duncan and Todd Sight and Hearing Care has been providing professional, accessible local sight and hearing care since 1972. It is part of the Duncan and Todd Group, which includes sister brands in the Highlands and Central Belt.\n\nDuncan and Todd stores serve communities in Aberdeen (including Belmont Street, Union Street, Dyce and Westhill), Aberdeenshire (Banchory, Banff, Ellon, Fraserburgh, Inverurie, Keith, Peterhead and Stonehaven), Elgin, Dundee and Broughty Ferry, Arbroath, Forfar, Montrose, Wick, Nairn, Thurso, Perth and Stirling.",
    detailedServices: [
      { name: "NHS eye examination", description: "In Scotland, NHS eye examinations are free for everyone ordinarily resident in the UK.", price: "Free", duration: "Varies", nhsCovered: true },
      { name: "OCT scan", description: "An OCT scan for a more detailed view of the back of the eye. Ask your local store for availability and price.", price: "Ask in store", duration: "Varies", nhsCovered: false },
      { name: "Hearing care", description: "Hearing tests and hearing aids at Duncan and Todd.", price: "Ask in store", duration: "Varies", nhsCovered: false },
      { name: "Contact lenses", description: "Contact lens fittings and aftercare.", price: "Ask in store", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Duncan and Todd store, here on eyetest.co.uk or at duncanandtoddgroup.com", "Book online or call 01224 937111", "Bring your current glasses or contact lenses"],
    prosAndCons: { pros: ["Free NHS eye examinations in Scotland", "Over 50 years of local sight and hearing care", "OCT scans available", "2 for 1 on glasses"], cons: ["Stores are in north-east and central Scotland, with sister brands elsewhere in Scotland"] },
    faqs: [
      { q: "Are eye tests free at Duncan and Todd?", a: "Yes. In Scotland, NHS eye examinations are free for everyone who is ordinarily resident in the UK, so your eye test at Duncan and Todd is free." },
      { q: "Where are Duncan and Todd stores?", a: "Duncan and Todd has stores in Aberdeen, Aberdeenshire, Elgin, Dundee and Broughty Ferry, Angus, Wick, Nairn, Thurso, Perth and Stirling." },
      { q: "Does Duncan and Todd do hearing tests?", a: "Yes. Duncan and Todd Sight and Hearing Care offers hearing care alongside eye care." },
      { q: "How do I book with Duncan and Todd?", a: "Book online at duncanandtoddgroup.com or call 01224 937111." },
    ],
    sources: [
      { label: "Duncan and Todd: Home page", url: "https://www.duncanandtoddgroup.com/duncan-and-todd" },
      { label: "Duncan and Todd: Find a store", url: "https://www.duncanandtoddgroup.com/duncan-and-todd/find-a-store" },
      { label: "NHS Inform: Eye examinations in Scotland", url: "https://www.nhsinform.scot/care-support-and-rights/nhs-services/ophthalmics/your-entitlements-to-nhs-ophthalmic-services" },
    ],
  },

  // ─── Optical Express ────────────────────────────────────────────────
  {
    slug: "optical-express",
    name: "Optical Express",
    shortName: "Optical Express",
    brandColor: "#1565c0",
    seoTitle: "Optical Express Eye Test: Essential £25, Advanced £50 with OCT",
    seoDescription: "Optical Express eye tests cost £25 for the Essential Eye Test and £50 for the Advanced Eye Test with OCT. NHS patients can upgrade for £25. Over 120 UK clinics.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Optical Express has over 120 clinics across Scotland, England, Wales and Northern Ireland, offering eye tests, glasses and contact lenses alongside laser eye surgery, lens replacement and cataract surgery. Its Essential Eye Test costs £25 and its Advanced Eye Test costs £50. Patients entitled to an NHS-funded sight test can upgrade to the Advanced Eye Test for £25.",
    services: ["NHS Eye Tests", "Private Eye Tests", "OCT Scan", "Contact Lenses", "Glasses", "Laser Eye Surgery", "Lens Replacement", "Cataract Surgery"],
    storeCount: 120,
    website: "https://www.opticalexpress.co.uk",
    priceRange: "Free NHS / From £25 private",
    nhsAvailable: true,
    available: false,
    highlights: ["Essential Eye Test £25 and Advanced Eye Test £50", "NHS patients can upgrade to the Advanced Eye Test for £25", "Over 120 clinics across all four UK nations", "Laser eye surgery, lens replacement and cataract surgery as well as eye tests"],
    founded: "1991",
    storeLocations: ["london", "croydon", "bromley", "kingston-upon-thames", "brighton", "reading", "oxford", "guildford", "southampton", "portsmouth", "milton-keynes", "crawley", "basingstoke", "bristol", "bath", "exeter", "plymouth", "bournemouth", "swindon", "cambridge", "norwich", "chelmsford", "luton", "peterborough", "birmingham", "coventry", "wolverhampton", "nottingham", "leicester", "derby", "northampton", "manchester", "liverpool", "chester", "preston", "leeds", "sheffield", "york", "bradford", "newcastle", "sunderland", "middlesbrough", "cardiff", "swansea", "edinburgh", "glasgow", "aberdeen", "dundee", "belfast"],
    history: "Optical Express provides eye care and vision correction across the UK, with over 120 clinics in Scotland, England, Wales and Northern Ireland. Its registered office is in Glasgow.\n\nAs well as eye tests, glasses and contact lenses, Optical Express offers laser eye surgery, refractive lens replacement and cataract surgery, and describes itself as the UK's number one provider of laser eye surgery.",
    detailedServices: [
      { name: "NHS-funded eye test", description: "A free Essential Eye Test for anyone who qualifies for NHS funding. You can upgrade to the Advanced Eye Test for £25.", price: "Free (if eligible)", duration: "Varies", nhsCovered: true },
      { name: "Essential Eye Test", description: "Includes an online health and lifestyle assessment, a detailed discussion and a full visual assessment.", price: "£25", duration: "Varies", nhsCovered: false },
      { name: "Advanced Eye Test", description: "The Essential Eye Test plus advanced imaging, available at selected clinics.", price: "£50", duration: "Varies", nhsCovered: false },
      { name: "Laser eye surgery consultation", description: "A consultation to see whether laser eye surgery or lens replacement is suitable for you.", price: "Free consultation", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Optical Express clinic at opticalexpress.co.uk", "Book an eye test online or call 0800 023 2020", "Tell the team if you qualify for an NHS-funded eye test"],
    prosAndCons: { pros: ["Clear published prices: Essential £25, Advanced £50", "An affordable £25 upgrade to the Advanced Eye Test for NHS patients", "Over 120 clinics across all four UK nations", "Eye tests and vision correction surgery from one provider"], cons: ["The Advanced Eye Test is available at selected clinics", "You book directly with Optical Express"] },
    faqs: [
      { q: "How much is an eye test at Optical Express?", a: "Optical Express says its Essential Eye Test costs £25 and its Advanced Eye Test costs £50. NHS-funded eye tests are free if you qualify." },
      { q: "Can NHS patients upgrade at Optical Express?", a: "Yes. Patients entitled to an NHS-funded sight test can upgrade from the Essential to the Advanced Eye Test for £25." },
      { q: "How many Optical Express clinics are there?", a: "Optical Express says it has over 120 clinics across the UK." },
      { q: "Does Optical Express do laser eye surgery?", a: "Yes. Optical Express offers laser eye surgery, lens replacement and cataract surgery, starting with a consultation." },
    ],
    sources: [
      { label: "Optical Express: Eye tests", url: "https://www.opticalexpress.co.uk/eye-tests" },
      { label: "Optical Express: NHS entitlement", url: "https://www.opticalexpress.co.uk/eye-health/nhs-entitlement" },
      { label: "Optical Express: About", url: "https://www.opticalexpress.co.uk/about" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
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
        "An OCT scan is included in every eye test at no extra cost",
        "Free hearing checks alongside eye care",
        "Inside M&S stores, so easy to combine with shopping",
        "Named a Which? Recommended Opticians provider for 2026",
      ],
      cons: [
        "There are 37 stores, so use the M&S store finder to check for one near you",
        "Stores are inside larger M&S shops and retail parks",
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
    seoTitle: "Ace & Tate Eye Test: Free with Glasses, 17 UK Stores",
    seoDescription: "Ace & Tate eye tests are free when you buy glasses, or £25 refunded as a gift code. Tests take about 20 minutes at 17 UK stores in London, Manchester, Bristol and more.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Ace & Tate is an Amsterdam-born eyewear brand with 17 UK stores in London, Brighton, Bristol, Cardiff, Glasgow, Leeds, Manchester and Oxford. Its eye tests are free when you buy glasses. If you are not ready to choose, the test costs £25, which Ace & Tate gives back as a gift code to use on glasses or sunglasses within 12 months. Tests take about 20 minutes with a GOC-registered optometrist.",
    services: ["Private Eye Tests", "Glasses", "Sunglasses", "Contact Lenses"],
    storeCount: 17,
    website: "https://www.aceandtate.com/gb",
    priceRange: "Free with glasses / £25 refunded as a gift code",
    nhsAvailable: false,
    available: true,
    highlights: ["Eye tests free when you buy glasses", "£25 test fee given back as a gift code if you buy later", "About 20 minutes with a GOC-registered optometrist", "Free frame adjustments and style advice"],
    founded: "2013",
    storeLocations: ["london", "brighton", "bristol", "cardiff", "glasgow", "leeds", "manchester", "oxford"],
    history: "Ace & Tate is an eyewear brand that began in Amsterdam and now has stores across Europe, including 17 in the UK.\n\nUK stores are in London, Brighton, Bristol, Cardiff, Glasgow, Leeds, Manchester and Oxford. Each offers eye tests with GOC-registered optometrists, alongside frame styling and adjustments.",
    detailedServices: [
      { name: "Eye test", description: "An eye test with a GOC-registered optometrist, free with the purchase of glasses. Otherwise £25, reimbursed as a gift code for glasses or sunglasses within 12 months.", price: "Free with glasses / £25", duration: "About 20 minutes", nhsCovered: false },
      { name: "Frame adjustments and style advice", description: "Free adjustments and style advice in store.", price: "Free", duration: "Varies", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Ace & Tate store at aceandtate.com", "Book your eye test online or in store", "Remove soft contact lenses at least 30 minutes before your test"],
    prosAndCons: { pros: ["Eye tests free when you buy glasses", "The £25 test fee comes back as a gift code", "Quick 20-minute eye tests", "Free adjustments and style advice"], cons: ["Eye tests are for adults and young people aged 16 and over outside Scotland", "Contact lenses are for experienced wearers who already have a contact lens prescription"] },
    faqs: [
      { q: "Are Ace & Tate eye tests free?", a: "Ace & Tate says your eye test is free with the purchase of glasses. If you are not ready to choose, the test costs £25, reimbursed as a gift code to use within 12 months." },
      { q: "How long does an Ace & Tate eye test take?", a: "Ace & Tate says the eye test usually takes about 20 minutes." },
      { q: "Where are Ace & Tate stores in the UK?", a: "Ace & Tate has 17 UK stores in London, Brighton, Bristol, Cardiff, Glasgow, Leeds, Manchester and Oxford." },
      { q: "Can children have an eye test at Ace & Tate?", a: "In the UK outside Scotland, Ace & Tate does not offer eye tests for under 16s." },
    ],
    sources: [
      { label: "Ace & Tate: Eye test and prescription FAQ", url: "https://www.aceandtate.com/gb/faq/eye-test-and-prescription" },
      { label: "Ace & Tate: UK stores", url: "https://www.aceandtate.com/gb/stores/united-kingdom" },
      { label: "Ace & Tate: Pricing", url: "https://aceandtate.com/gb/about/pricing" },
    ],
  },

  // ─── Jimmy Fairly ─────────────────────────────────────────────────
  {
    slug: "jimmy-fairly",
    name: "Jimmy Fairly",
    shortName: "Jimmy Fairly",
    brandColor: "#e8b923",
    seoTitle: "Jimmy Fairly Eye Test: Free with a Frame, 30 Minutes, 18 UK Stores",
    seoDescription: "Jimmy Fairly eye tests are free when you buy a frame the same day, or £25 redeemable on a later order. 30-minute tests in London, Bath, Brighton, Bristol, Cambridge, Edinburgh, Kingston and Leeds.",
    lastReviewed: "November 2026",
    dateModified: "2026-11-11",
    description: "Jimmy Fairly is an eyewear brand founded in 2010 that designs its own frames and lenses, with UK stores across London and in Bath, Brighton, Bristol, Cambridge, Edinburgh, Kingston and Leeds. Its 30-minute eye tests are free if you buy a frame on the day of your test. Otherwise they cost £25, which you can redeem against a future frame order.",
    services: ["Private Eye Tests", "Glasses", "Sunglasses"],
    storeCount: 18,
    website: "https://www.jimmyfairly.com/en-gb",
    priceRange: "Free with a frame / £25 redeemable",
    nhsAvailable: false,
    available: true,
    highlights: ["Eye tests free when you buy a frame on the day", "£25 test fee redeemable against a future frame order", "30-minute eye tests that also check your eye health", "Frames and lenses designed by Jimmy Fairly"],
    founded: "2010",
    storeLocations: ["london", "kingston-upon-thames", "brighton"],
    history: "Jimmy Fairly has been designing eyewear since 2010, creating, assembling and checking its own collections and developing its own lenses.\n\nIn the UK, Jimmy Fairly has stores across London, including Angel, Chelsea, Covent Garden, Hampstead, Portobello, Soho and Wimbledon, as well as in Bath, Brighton, Bristol, Cambridge, Edinburgh, Kingston and Leeds.",
    detailedServices: [
      { name: "Eye test", description: "A 30-minute eye test with an optometrist, checking your vision and eye health. Free if you buy a frame on the day; otherwise £25, redeemable against a later frame order.", price: "Free with a frame / £25", duration: "30 minutes", nhsCovered: false },
    ],
    bookingProcess: ["Find your nearest Jimmy Fairly store at jimmyfairly.com", "Book online or in store; some stores accept walk-ins", "Bring your current glasses and remove contact lenses before your test as advised"],
    prosAndCons: { pros: ["Eye tests free when you buy a frame on the day", "The £25 test fee is redeemable on a future order", "30-minute tests that check eye health as well as vision", "Own-design frames and lenses"], cons: ["Jimmy Fairly does not offer contact lens checks or fittings", "Some stores only test adults, and prescriptions above plus or minus 10 dioptres are not tested"] },
    faqs: [
      { q: "Are Jimmy Fairly eye tests free?", a: "Jimmy Fairly says its eye tests are free if a frame is purchased on the day of your test. If not, they cost £25, which is redeemable against a future frame order." },
      { q: "How long does a Jimmy Fairly eye test take?", a: "Jimmy Fairly says each eye test takes 30 minutes." },
      { q: "Where are Jimmy Fairly stores in the UK?", a: "Jimmy Fairly has UK stores across London, including Angel, Chelsea, Covent Garden, Hampstead, Portobello, Soho and Wimbledon, plus Bath, Brighton, Bristol, Cambridge, Edinburgh, Kingston and Leeds." },
      { q: "Does Jimmy Fairly do contact lens checks?", a: "No. Jimmy Fairly says it does not offer contact lens checks or fittings." },
    ],
    sources: [
      { label: "Jimmy Fairly: Eye tests", url: "https://jimmyfairly.com/en-gb/pages/eye-test" },
      { label: "Jimmy Fairly: Angel store", url: "https://www.jimmyfairly.com/en-gb/pages/jimmy-fairly-angel" },
      { label: "Jimmy Fairly: Chiswick store", url: "https://www.jimmyfairly.com/pages/jimmy-fairly-chiswick" },
      { label: "Jimmy Fairly: Brighton store", url: "https://www.jimmyfairly.com/en-gb/pages/stores/brighton" },
      { label: "Jimmy Fairly: Leeds store", url: "https://www.jimmyfairly.com/en-gb/pages/stores/leeds" },
      { label: "Jimmy Fairly: Edinburgh store", url: "https://www.jimmyfairly.com/en-gb/pages/stores/edinburgh" },
    ],
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
