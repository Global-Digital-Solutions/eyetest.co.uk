// ---------------------------------------------------------------------------
// UK optician chains — brand data for eyetest.co.uk
// Independent and smaller chains show real availability; Specsavers, Vision
// Express, and Optical Express are listed but marked unavailable until
// commercial deals are signed.
// ---------------------------------------------------------------------------

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
    description:
      "Boots Opticians is one of the UK's largest and most recognised optical chains, operating from Boots pharmacy stores across the country. They offer a full range of eye care services including NHS and private eye tests, designer and own-brand glasses, contact lenses, and hearing care. With their convenient high-street locations and integration with Boots Advantage Card loyalty points, they remain a popular choice for routine eye care.",
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
    storeCount: 600,
    website: "https://www.boots-opticians.co.uk",
    priceRange: "Free NHS / From £25 private",
    nhsAvailable: true,
    available: true,
    highlights: [
      "Earn and spend Boots Advantage Card points on eye care",
      "Wide selection of designer frames from brands like Ray-Ban, Oakley, and Prada",
      "Enhanced eye tests with OCT scanning available at most locations",
      "Convenient locations inside Boots pharmacy stores nationwide",
    ],
    founded: "1983",
  },

  // ─── Specsavers ─────────────────────────────────────────────────────
  {
    slug: "specsavers",
    name: "Specsavers Optical Group",
    shortName: "Specsavers",
    brandColor: "#1b5e20",
    description:
      "Specsavers is the UK's largest optical retailer, founded in Guernsey by Doug and Dame Mary Perkins. Known for their value-for-money approach and iconic advertising campaigns, they operate a joint-venture partnership model where each store is co-owned by local optometrists. They provide comprehensive eye care, hearing services, and home visit testing across the UK and internationally.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Hearing Tests",
      "Home Visits",
      "Children's Eye Tests",
      "OCT Scan",
      "Diabetic Screening",
    ],
    storeCount: 900,
    website: "https://www.specsavers.co.uk",
    priceRange: "Free NHS / From £25 private",
    nhsAvailable: true,
    available: false,
    highlights: [
      "UK's largest optical chain with over 900 stores",
      "Two-for-one offers on a wide range of glasses",
      "Home visit service available for those unable to attend a store",
      "Joint-venture model means each store is part-owned by its optometrists",
    ],
    founded: "1984",
  },

  // ─── Vision Express ─────────────────────────────────────────────────
  {
    slug: "vision-express",
    name: "Vision Express",
    shortName: "Vision Express",
    brandColor: "#e65100",
    description:
      "Vision Express is a major UK optical chain owned by the EssilorLuxottica group, one of the world's largest eyewear companies. They offer a comprehensive range of eye tests, glasses, sunglasses, and contact lenses, with a strong emphasis on clinical excellence. Many of their stores are located in prominent high-street and retail park locations, and they carry an extensive portfolio of premium and designer frames.",
    services: [
      "NHS Eye Tests",
      "Private Eye Tests",
      "Contact Lenses",
      "Glasses",
      "Children's Eye Tests",
      "OCT Scan",
      "Diabetic Screening",
    ],
    storeCount: 400,
    website: "https://www.visionexpress.com",
    priceRange: "Free NHS / From £30 private",
    nhsAvailable: true,
    available: false,
    highlights: [
      "Part of the EssilorLuxottica group with access to exclusive frame brands",
      "Advanced clinical technology including OCT and digital retinal photography",
      "Price match guarantee on identical products",
      "30-day satisfaction guarantee on all glasses purchases",
    ],
    founded: "1988",
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
    website: "https://www.asda.com/opticians",
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
    website: "https://www.bayfields.com",
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
