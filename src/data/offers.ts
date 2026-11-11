/**
 * Optician offers, checked against each optician's own website.
 * Last checked 11 November 2026. Offers are time-limited and change often.
 */

export interface Offer {
  title: string;
  description: string;
  /** Short label shown in the badge, e.g. "2 for 1", "Free", "Save 25%" */
  badge?: string;
  /** Category for filtering */
  category: "glasses" | "eye-test" | "contact-lenses" | "sunglasses" | "membership" | "nhs" | "discount";
  /** Optional expiry date (YYYY-MM-DD). Omit for ongoing offers */
  expires?: string;
  /** Terms / fine print */
  terms?: string;
}

export interface ProviderOffers {
  slug: string;
  name: string;
  /** Short tagline for the provider */
  tagline: string;
  /** Brand primary colour (hex) */
  color: string;
  /** URL to provider website */
  website: string;
  /** Private eye test price */
  eyeTestPrice: string;
  /** Whether NHS eye tests are available */
  nhsFree: boolean;
  offers: Offer[];
  /** Last verified date */
  lastVerified: string;
}

export const providerOffers: ProviderOffers[] = [
  {
    slug: "specsavers",
    name: "Specsavers",
    tagline: "Over 900 UK stores",
    color: "#1b5e20",
    website: "https://www.specsavers.co.uk/offers",
    eyeTestPrice: "£20 to £25",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "2 for 1 glasses from £70", description: "Buy a pair of glasses from the £70 range or above and get a second pair free, with single vision lenses to the same prescription.", badge: "2 for 1", category: "glasses" },
      { title: "2 for 1 designer glasses", description: "Choose any two pairs from the £100 to £170 designer ranges and pay for one, with single vision lenses to the same prescription.", badge: "2 for 1", category: "glasses" },
      { title: "2 for 1 including sunglasses", description: "With 2 for 1 from £70, choose prescription sunglasses as your second pair.", badge: "2 for 1", category: "sunglasses" },
      { title: "Free varifocal lenses", description: "Standard varifocal lenses fitted free with any glasses from the £70 range or above.", badge: "Free", category: "glasses" },
      { title: "£40 off lenses", description: "£40 off lenses with glasses from the £70 range or above.", badge: "£40 off", category: "glasses" },
      { title: "Complete glasses from £15", description: "Complete glasses, frames and lenses, from £15 a pair.", badge: "From £15", category: "glasses" },
      { title: "20% off for over 60s", description: "20% off a pair of glasses from the £70 range or above if you are over 60.", badge: "20% off", category: "discount" },
      { title: "25% student discount", description: "25% off any pair of glasses from the £70 range and above for students.", badge: "25% off", category: "discount" },
      { title: "Polarising lenses £70", description: "Polarising lenses for £70.", badge: "£70", category: "sunglasses" },
      { title: "Offers for kids", description: "Free glasses for kids, plus lens upgrades and designer glasses for kids and teens.", badge: "Kids", category: "nhs" },
    ],
  },
  {
    slug: "boots-opticians",
    name: "Boots Opticians",
    tagline: "Eye care, glasses and hearing across the UK",
    color: "#0d6efd",
    website: "https://www.bootsopticians.com/offers/",
    eyeTestPrice: "From £29.95",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "2nd pair half price", description: "Buy any pair of glasses or prescription sunglasses and get your second pair half price.", badge: "Half price", category: "glasses", terms: "Boots terms and conditions apply." },
      { title: "2 for £75", description: "Two pairs from the £50 range, including essential single vision lenses, for £75.", badge: "2 for £75", category: "glasses" },
      { title: "Over 60s savings", description: "10% off your first pair of glasses or prescription sunglasses, plus free NHS eye tests.", badge: "10% off", category: "discount" },
      { title: "Student savings", description: "20% off glasses and prescription sunglasses, plus contact lens savings.", badge: "20% off", category: "discount" },
      { title: "Free contact lens trial", description: "Try contact lenses before you buy.", badge: "Free trial", category: "contact-lenses" },
      { title: "Contact Lens Reward Plan", description: "Extra savings for contact lens wearers on the Contact Lens Reward Plan.", badge: "Rewards", category: "contact-lenses" },
      { title: "Free NHS eye tests", description: "Free NHS eye tests if you qualify, with help towards glasses or contact lenses through an NHS optical voucher.", badge: "NHS", category: "nhs" },
      { title: "10% off hearing aids", description: "Book a free hearing test and get 10% off the Gold, Platinum and Platinum Plus hearing aid ranges.", badge: "10% off", category: "discount" },
    ],
  },
  {
    slug: "vision-express",
    name: "Vision Express",
    tagline: "Over 550 stores, including in Tesco",
    color: "#7c3aed",
    website: "https://www.visionexpress.com/offers",
    eyeTestPrice: "£30 with OCT",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "50% off a 2nd pair", description: "Buy two pairs of glasses, prescription sunglasses or sunglasses and get the cheaper pair half price, in store or online with code 2NDPAIR.", badge: "50% off", category: "glasses" },
      { title: "20% student discount", description: "20% off prescription glasses, prescription sunglasses or contact lenses for students.", badge: "20% off", category: "discount" },
      { title: "20% off for NHS and key workers", description: "20% off for NHS and other key workers once your status is verified online.", badge: "20% off", category: "discount" },
      { title: "20% off with Blue Light Card", description: "20% off glasses, sunglasses and contact lenses for Blue Light Card holders.", badge: "20% off", category: "discount" },
      { title: "Free contact lens trial", description: "A free contact lens assessment and trial.", badge: "Free trial", category: "contact-lenses" },
    ],
  },
  {
    slug: "asda-opticians",
    name: "Asda Opticians",
    tagline: "In over 157 Asda stores",
    color: "#16a34a",
    website: "https://opticians.asda.com/",
    eyeTestPrice: "£24",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "Eye test £24", description: "A private eye test for £24, or free if you qualify for an NHS-funded test.", badge: "£24", category: "eye-test" },
      { title: "Complete price glasses from £15", description: "Frames, lenses and standard coatings in one price, from £15 for single vision and £45 for varifocals.", badge: "From £15", category: "glasses" },
      { title: "Free children's glasses", description: "Free prescription glasses for children from selected frames with an NHS voucher.", badge: "Free", category: "nhs" },
      { title: "Free contact lens delivery", description: "Free UK mainland delivery on online contact lens orders.", badge: "Free delivery", category: "contact-lenses" },
    ],
  },
  {
    slug: "leightons",
    name: "Leightons Opticians & Hearing Care",
    tagline: "37 branches across the South",
    color: "#1e3a5f",
    website: "https://www.leightons.co.uk/pages/offers",
    eyeTestPrice: "From £39",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "Free NHS eye tests", description: "Free eye examinations for anyone eligible for an NHS-funded test.", badge: "NHS", category: "nhs" },
      { title: "Free hearing tests", description: "Complimentary hearing tests in branch.", badge: "Free", category: "discount" },
      { title: "See Now, Pay Later", description: "Spread the cost of new glasses over 10 months, interest free.", badge: "0% finance", category: "glasses" },
      { title: "Hear Now, Pay Later", description: "Spread the cost of hearing aids over 10 months, interest free.", badge: "0% finance", category: "discount" },
      { title: "Free contact lens comfort trial", description: "Try contact lenses for free before you commit.", badge: "Free trial", category: "contact-lenses" },
      { title: "MyLeightons", description: "Eye and hearing care with advanced eye examinations and discounts on glasses, sunglasses, contact lenses and hearing aids, for £14 a month (£24 for families).", badge: "£14/month", category: "membership" },
      { title: "Recommend A Friend", description: "Discounts for you and your friend when you recommend Leightons.", badge: "Rewards", category: "discount" },
    ],
  },
  {
    slug: "scrivens",
    name: "Scrivens Opticians & Hearing Care",
    tagline: "Around 160 branches",
    color: "#b91c1c",
    website: "https://scrivens.com/our-offers/",
    eyeTestPrice: "£30",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "Second pair half price", description: "Get a second pair of glasses half price.", badge: "Half price", category: "glasses" },
      { title: "Kids' second pair for £15", description: "A second pair of children's glasses for £15.", badge: "£15", category: "glasses" },
      { title: "Complete sunglasses from £95", description: "Complete prescription sunglasses from £95.", badge: "From £95", category: "sunglasses" },
      { title: "15% off for students", description: "15% student discount.", badge: "15% off", category: "discount" },
      { title: "Free varifocals with NHS voucher", description: "Free varifocals when you use an NHS optical voucher.", badge: "Free", category: "nhs" },
      { title: "Free contact lens demonstration", description: "A free demonstration if you are thinking about contact lenses.", badge: "Free", category: "contact-lenses" },
      { title: "Free hearing health check", description: "A free check of your hearing health.", badge: "Free", category: "discount" },
    ],
  },
  {
    slug: "duncan-and-todd",
    name: "Duncan and Todd",
    tagline: "Sight and hearing care in Scotland since 1972",
    color: "#0369a1",
    website: "https://www.duncanandtoddgroup.com/duncan-and-todd",
    eyeTestPrice: "Free (NHS Scotland)",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "Free eye examinations in Scotland", description: "NHS eye examinations are free for everyone ordinarily resident in the UK.", badge: "Free", category: "nhs" },
      { title: "2 for 1 on glasses", description: "Duncan and Todd's 2 for 1 offer on glasses.", badge: "2 for 1", category: "glasses" },
      { title: "Student offer", description: "A student offer is available; ask in store for details.", badge: "Students", category: "discount" },
    ],
  },
  {
    slug: "bayfields",
    name: "Bayfields Opticians & Audiologists",
    tagline: "55 practices across England",
    color: "#0d9488",
    website: "https://www.bayfieldsopticians.com/offers/",
    eyeTestPrice: "Advanced £64",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "Second pair half price", description: "Buy one pair of glasses and get a second pair half price.", badge: "Half price", category: "glasses", terms: "Bayfields terms and conditions apply." },
      { title: "Prescription sunglasses from £129", description: "Prescription sunglasses with single vision lenses from £129.", badge: "From £129", category: "sunglasses" },
      { title: "Connect Membership", description: "£12 a month for a free eye exam, free earwax removal and hearing checks, plus product discounts.", badge: "£12/month", category: "membership" },
      { title: "£50 voucher with Refer a Friend", description: "A £50 Amazon voucher when you introduce a friend or family member.", badge: "£50", category: "discount" },
      { title: "60-day money back guarantee", description: "A 60-day money back guarantee on eyewear and hearing aids.", badge: "60 days", category: "glasses" },
      { title: "10% off hearing aids", description: "10% off eligible Widex and Signia hearing aids during the offer period.", badge: "10% off", category: "discount" },
    ],
  },
  {
    slug: "rawlings",
    name: "Rawlings Opticians & Hearing Care",
    tagline: "12 branches in Hampshire and Surrey",
    color: "#4338ca",
    website: "https://rawlingsopticians.co.uk/",
    eyeTestPrice: "From £55",
    nhsFree: true,
    lastVerified: "2026-11-11",
    offers: [
      { title: "Rawlings Vision Plan", description: "From £12 a month, covering your eye care with 25% off frames and up to 40% off lenses.", badge: "From £12/month", category: "membership" },
      { title: "Free hearing tests", description: "A free hearing test at Rawlings.", badge: "Free", category: "discount" },
      { title: "Free lifetime adjustments", description: "Free adjustments for the lifetime of glasses bought from Rawlings.", badge: "Free", category: "glasses" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Category helpers
// ---------------------------------------------------------------------------

export const OFFER_CATEGORIES = [
  { key: "all", label: "All Offers" },
  { key: "glasses", label: "Glasses" },
  { key: "eye-test", label: "Eye Tests" },
  { key: "contact-lenses", label: "Contact Lenses" },
  { key: "sunglasses", label: "Sunglasses" },
  { key: "discount", label: "Discounts" },
  { key: "membership", label: "Memberships" },
  { key: "nhs", label: "NHS" },
] as const;

export type OfferCategoryKey = (typeof OFFER_CATEGORIES)[number]["key"];
