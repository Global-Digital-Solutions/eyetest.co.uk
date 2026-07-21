import { haversine } from "../haversine";
import { getStaticThreeDayDates } from "../dates";
import type { StoreResult } from "../types";

/* ------------------------------------------------------------------ */
/*  M&S Opticians — Static provider (37 UK stores)                     */
/*  M&S uses a custom Magento booking backend (Hroc_Booking module)    */
/*  that requires session cookies, so we can't fetch live availability.*/
/*  Instead we return count=-1 ("available but count unknown") and     */
/*  link directly to their booking page with store_id pre-selected.    */
/* ------------------------------------------------------------------ */

interface MandSStore {
  slug: string;
  storeId: string;
  address: string;
  postcode: string;
  town: string;
  phone: string;
  lat: number;
  lng: number;
}

export const MANDS_STORES: MandSStore[] = [
  { slug: "argyle", storeId: "664", address: "2-12 Argyle Street, Glasgow, G2 8AA", postcode: "G2 8AA", town: "Glasgow", phone: "0141 260 5226", lat: 55.857745, lng: -4.249795 },
  { slug: "banbury-gateway", storeId: "661", address: "Banbury Gateway Shopping Park, Banbury, OX16 3ER", postcode: "OX16 3ER", town: "Banbury", phone: "01295 234 570", lat: 52.076036, lng: -1.319244 },
  { slug: "bluewater", storeId: "632", address: "Bluewater, Greenhithe, DA9 9SD", postcode: "DA9 9SD", town: "Greenhithe", phone: "01322 918085", lat: 51.43827, lng: 0.274018 },
  { slug: "braehead", storeId: "663", address: "Braehead Shopping Centre, Kings Inch Road, Glasgow, G51 4BP", postcode: "G51 4BP", town: "Glasgow", phone: "0141 260 5225", lat: 55.876062, lng: -4.36521 },
  { slug: "camberley", storeId: "668", address: "The Meadows, Marshall Road, Sandhurst, GU47 0FD", postcode: "GU47 0FD", town: "Sandhurst", phone: "01276 733039", lat: 51.336126, lng: -0.775469 },
  { slug: "canterbury", storeId: "641", address: "4 St Georges Street, Canterbury, CT1 2SR", postcode: "CT1 2SR", town: "Canterbury", phone: "01227 936 464", lat: 51.277718, lng: 1.081707 },
  { slug: "castlepoint", storeId: "640", address: "Yeomans Way, Bournemouth, BH8 9UL", postcode: "BH8 9UL", town: "Bournemouth", phone: "01202 059 316", lat: 50.754005, lng: -1.842247 },
  { slug: "cheshire-oaks", storeId: "662", address: "Cheshire Oaks, Stanney Woods Ave, Cheshire, CH65 9GZ", postcode: "CH65 9GZ", town: "Cheshire", phone: "0151 351 7665", lat: 53.262301, lng: -2.891973 },
  { slug: "cheshunt", storeId: "651", address: "Brookfield Centre, Halfhide Lane, Cheshunt, EN8 0TZ", postcode: "EN8 0TZ", town: "Cheshunt", phone: "01992 660 864", lat: 51.716652, lng: -0.037738 },
  { slug: "colliers-wood", storeId: "659", address: "1 Merton High Street, Colliers Wood, London, SW19 1DD", postcode: "SW19 1DD", town: "London", phone: "020 8016 6465", lat: 51.415189, lng: -0.18153 },
  { slug: "culverhouse-cross", storeId: "635", address: "Copthorne Way, Culverhouse Cross, Cardiff, CF5 6YZ", postcode: "CF5 6YZ", town: "Cardiff", phone: "029 2274 4087", lat: 51.466208, lng: -3.276061 },
  { slug: "derby", storeId: "627", address: "10 London Road, Derby, DE1 2NS", postcode: "DE1 2NS", town: "Derby", phone: "01332 947 603", lat: 52.91865, lng: -1.473275 },
  { slug: "ealing-broadway", storeId: "649", address: "69-79 The Broadway Ealing, London, W5 5JW", postcode: "W5 5JW", town: "London", phone: "020 8016 9602", lat: 51.513021, lng: -0.303973 },
  { slug: "exeter", storeId: "644", address: "211-219 High Street, Exeter, EX4 3QA", postcode: "EX4 3QA", town: "Exeter", phone: "01392 301 019", lat: 50.72381, lng: -3.531249 },
  { slug: "gemini", storeId: "666", address: "Europa Boulevard, Warrington, WA5 7WG", postcode: "WA5 7WG", town: "Warrington", phone: "01925 594239", lat: 53.417035, lng: -2.63157 },
  { slug: "harrogate", storeId: "658", address: "18-20 Cambridge St, Harrogate, HG1 1RX", postcode: "HG1 1RX", town: "Harrogate", phone: "01423 802 696", lat: 53.993351, lng: -1.539671 },
  { slug: "hedge-end", storeId: "633", address: "Tollbar Way, Hedge End, Southampton, SO30 2UH", postcode: "SO30 2UH", town: "Southampton", phone: "01489 358 849", lat: 50.922466, lng: -1.311714 },
  { slug: "high-wycombe-eden", storeId: "660", address: "1 Eden Place, The Eden Centre, High Wycombe, HP11 2DH", postcode: "HP11 2DH", town: "High Wycombe", phone: "01494 321 717", lat: 51.630699, lng: -0.755156 },
  { slug: "kingston", storeId: "656", address: "26 Clarence Street, Kingston Upon Thames, KT1 1NU", postcode: "KT1 1NU", town: "Kingston Upon Thames", phone: "0208 150 0154", lat: 51.410647, lng: -0.303767 },
  { slug: "leeds-white-rose", storeId: "665", address: "White Rose Shopping Centre, Dewsbury Road, Leeds, LS11 8LX", postcode: "LS11 8LX", town: "Leeds", phone: "0113 322 8968", lat: 53.75787, lng: -1.574143 },
  { slug: "llanelli", storeId: "655", address: "Unit 2C and 3 Parc Trostre, Llanelli, SA14 9UY", postcode: "SA14 9UY", town: "Llanelli", phone: "01554 701 450", lat: 51.676314, lng: -4.138921 },
  { slug: "london-colney", storeId: "628", address: "Barnet Road, London Colney, St Albans, AL2 1AB", postcode: "AL2 1AB", town: "St Albans", phone: "01727 638 009", lat: 51.716797, lng: -0.282939 },
  { slug: "longbridge", storeId: "638", address: "20 High Street, Longbridge, Birmingham, B31 2UQ", postcode: "B31 2UQ", town: "Birmingham", phone: "0121 803 7708", lat: 52.395065, lng: -1.985002 },
  { slug: "manchester", storeId: "631", address: "7 Market Street, Manchester, M1 1WT", postcode: "M1 1WT", town: "Manchester", phone: "0161 871 0717", lat: 53.48339, lng: -2.24402 },
  { slug: "meadowhall", storeId: "637", address: "The Arcade, Meadowhall, Sheffield, S91EH", postcode: "S91EH", town: "Sheffield", phone: "0114 553 7678", lat: 53.414616, lng: -1.411206 },
  { slug: "metro-centre", storeId: "636", address: "93-97 Cameron Walk, Gateshead, NE11 9YD", postcode: "NE11 9YD", town: "Gateshead", phone: "0191 933 6993", lat: 54.95577, lng: -1.66535 },
  { slug: "milton-keynes", storeId: "657", address: "2 Sunset Walk Saxon Gate East, Central Milton Keynes, MK9 3PD", postcode: "MK9 3PD", town: "Central Milton Keynes", phone: "01908 012 960", lat: 52.042124, lng: -0.759083 },
  { slug: "newcastle", storeId: "643", address: "77-87 Northumberland Street, Newcastle-Upon-Tyne, NE1 7AS", postcode: "NE1 7AS", town: "Newcastle-Upon-Tyne", phone: "0191 338 5559", lat: 54.976043, lng: -1.613612 },
  { slug: "norwich", storeId: "639", address: "Rampant Horse Street, Norwich, NR2 1QR", postcode: "NR2 1QR", town: "Norwich", phone: "01603 576 344", lat: 52.626173, lng: 1.293155 },
  { slug: "oxford", storeId: "642", address: "13-18 Queen Street, Oxford, OX1 1AB", postcode: "OX1 1AB", town: "Oxford", phone: "01865 419 984", lat: 51.751028, lng: -1.258818 },
  { slug: "plymouth", storeId: "645", address: "1 Cornwall Street, Plymouth, PL1 1DH", postcode: "PL1 1DH", town: "Plymouth", phone: "01752 279 756", lat: 50.372196, lng: -4.140073 },
  { slug: "pudsey", storeId: "647", address: "The Owlcotes Centre, Varley Street, Stanningley, LS28 6AR", postcode: "LS28 6AR", town: "Stanningley", phone: "0113 323 7678", lat: 53.803258, lng: -1.67121 },
  { slug: "shoreham", storeId: "648", address: "Holmbush Centre, Upper Shoreham Road, Shoreham-by-Sea, BN43 6TD", postcode: "BN43 6TD", town: "Shoreham-by-Sea", phone: "01273 007 871", lat: 50.841814, lng: -0.251321 },
  { slug: "stevenage", storeId: "650", address: "5 Roaring Meg Retail Park, Stevenage, SG1 1XN", postcode: "SG1 1XN", town: "Stevenage", phone: "01438 576 301", lat: 51.892511, lng: -0.198179 },
  { slug: "torbay", storeId: "654", address: "The Willows, Scotts Bridge, Torbay, TQ2 7XA", postcode: "TQ2 7XA", town: "Torbay", phone: "01803 220 700", lat: 50.489403, lng: -3.5548 },
  { slug: "wolstanton", storeId: "667", address: "Wolstanton Retail Park, Wolstanton, ST5 0AP", postcode: "ST5 0AP", town: "Wolstanton", phone: "01782 390806", lat: 53.027904, lng: -2.209922 },
  { slug: "york", storeId: "626", address: "Vangarde Retail Park, Monks Cross, York, YO32 9AE", postcode: "YO32 9AE", town: "York", phone: "01904 221 387", lat: 53.982854, lng: -1.049327 },
];

const BOOKING_BASE = "https://mandsopticians.com/book-appointment";

export async function fetchMandS(
  lat: number,
  lng: number,
  radius = 8047,
  limit = 10
): Promise<StoreResult[]> {
  const threeDays = getStaticThreeDayDates();

  const nearby = MANDS_STORES
    .map((store) => {
      const distM = haversine(lat, lng, store.lat, store.lng);
      if (distM > radius) return null;
      return { ...store, distanceM: Math.round(distM) };
    })
    .filter(Boolean)
    .sort((a, b) => a!.distanceM - b!.distanceM)
    .slice(0, limit) as (MandSStore & { distanceM: number })[];

  // Static provider — no live availability, so show count=-1
  // ("available but count unknown") for all 3 days
  return nearby.map((store) => ({
    provider: "M&S Opticians",
    storeName: `M&S Opticians ${store.town}`,
    address: store.address,
    postcode: store.postcode,
    town: store.town,
    phone: store.phone,
    distanceM: store.distanceM,
    slotsAvailable: null,
    nextAvailable: null,
    bookingUrl: `${BOOKING_BASE}?store_id=${store.storeId}`,
    lat: store.lat,
    lng: store.lng,
    dailySlots: threeDays.map((date) => ({ date, count: -1 })),
  }));
}
