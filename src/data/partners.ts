/**
 * Paid practice partners promoted on location pages near them.
 *
 * This only affects location pages (/locations/[city]). Search results come
 * from the admin listings and are not changed by this file.
 *
 * Facts come from each practice's own website, checked on the date shown.
 * Remove a partner here when their subscription ends.
 */
export type Partner = {
  /** optician_listings id in the admin */
  listingId: string;
  name: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  bookingUrl: string;
  /** Location pages within this distance show the partner */
  radiusKm: number;
  summary: string;
  highlights: string[];
  priceFrom?: string;
  hours?: string;
  checked: string;
  source: string;
};

export const PARTNER_LABEL = "Featured partner";

export const PARTNERS: Partner[] = [
  {
    listingId: "1703b899-4e96-497c-9d8f-0e26c0d20794",
    name: "Aristone Optical",
    address: "356 North End Road, Fulham, London",
    postcode: "SW6 1LY",
    lat: 51.481159,
    lng: -0.199503,
    phone: "020 7385 9772",
    website: "https://www.aristoneopticians.com/",
    bookingUrl: "https://www.aristoneopticians.com/contact",
    radiusKm: 4,
    summary:
      "An independent, family-run optician that has served Fulham for 70 years, offering NHS and private eye tests for all ages.",
    highlights: [
      "NHS and private eye tests for all ages",
      "OCT scans and digital retinal photography",
      "Same-day glasses from their on-site lab, often ready within a few hours",
      "Contact lenses and myopia management for children",
    ],
    priceFrom: "Private eye test from £65",
    hours: "Mon to Fri 9:30 to 18:00, Sat 10:00 to 16:00",
    checked: "November 2026",
    source: "aristoneopticians.com",
  },
];
