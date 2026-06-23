import { haversine } from "../haversine";
import { getStaticThreeDayDates } from "../dates";
import type { StoreResult } from "../types";

/* ------------------------------------------------------------------ */
/*  Ace & Tate — Static provider (17 UK stores)                        */
/*  Ace & Tate uses Acuity Scheduling for bookings. Each store has a   */
/*  unique appointmentId that pre-selects the store on the Acuity form.*/
/*  No live availability — we link directly to the booking page.       */
/* ------------------------------------------------------------------ */

interface AceAndTateStore {
  city: string;
  address: string;
  slug: string;
  universalStoreId: string;
  appointmentId: number;
  lat: number;
  lng: number;
}

const STORES: AceAndTateStore[] = [
  { city: "London", address: "Earlham Street 10", slug: "london-earlham-street", universalStoreId: "GBLON01", appointmentId: 4670991, lat: 51.513539692185816, lng: -0.1280083294477663 },
  { city: "Bristol", address: "Park Street 86", slug: "bristol-parkstreet", universalStoreId: "GBBRI01", appointmentId: 6794949, lat: 51.455597685362946, lng: -2.6039087668647865 },
  { city: "Manchester", address: "Oldham Street 21", slug: "manchester-oldham-street", universalStoreId: "GBMAN01", appointmentId: 6794972, lat: 53.48215155138749, lng: -2.2365019441803002 },
  { city: "London", address: "Brewer Street 15", slug: "london-brewer-street", universalStoreId: "GBLON02", appointmentId: 8137383, lat: 51.51217159999999, lng: -0.1340817 },
  { city: "London", address: "Hanbury Street 27", slug: "london-hanbury-street", universalStoreId: "GBLON03", appointmentId: 8137358, lat: 51.52046764221553, lng: -0.07263042883540738 },
  { city: "Glasgow", address: "Byres Road 221", slug: "glasgow-byres-road", universalStoreId: "GBGLA01", appointmentId: 9645446, lat: 55.8749014, lng: -4.294298800000001 },
  { city: "Oxford", address: "High Street 135", slug: "oxford-high-street", universalStoreId: "GBOXF01", appointmentId: 12628065, lat: 51.751967102398346, lng: -1.2569143136408911 },
  { city: "Brighton", address: "Bond Street 12", slug: "brighton-bond-street", universalStoreId: "GBBNH01", appointmentId: 12813111, lat: 50.823860973209214, lng: -0.1402154343586517 },
  { city: "London", address: "Upper Street 140", slug: "london-upper-street", universalStoreId: "GBLON04", appointmentId: 17356360, lat: 51.53977004295945, lng: -0.10267400859832243 },
  { city: "London", address: "Coal Drops Yard Unit 55", slug: "london-coal-drops-yard", universalStoreId: "GBLON06", appointmentId: 27408080, lat: 51.5360471, lng: -0.1269414 },
  { city: "London", address: "Northcote Road 13", slug: "london-northcote-road", universalStoreId: "GBLON07", appointmentId: 36774950, lat: 51.460256471538045, lng: -0.16649950650071021 },
  { city: "London", address: "Portobello Road 327", slug: "london-portobello-road", universalStoreId: "GBLON09", appointmentId: 42403449, lat: 51.52104945187128, lng: -0.2098684625829783 },
  { city: "London", address: "Dirty Lane 7", slug: "london-dirty-lane", universalStoreId: "GBLON10", appointmentId: 43608219, lat: 51.50584610432134, lng: -0.09233200494549007 },
  { city: "London", address: "Duke Street 43", slug: "london-duke-street", universalStoreId: "GBLON11", appointmentId: 45176045, lat: 51.51452361572597, lng: -0.1513688895492571 },
  { city: "Leeds", address: "King Edward Street 7", slug: "leeds-king-edward-street", universalStoreId: "GBLDS01", appointmentId: 49842816, lat: 53.79785915583041, lng: -1.5415844293053937 },
  { city: "Cardiff", address: "The Hayes 4", slug: "cardiff-the-hayes", universalStoreId: "GBCRF01", appointmentId: 51421052, lat: 51.47960769079885, lng: -3.1770140290198956 },
  { city: "London", address: "Broadway Market 74", slug: "london-broadwaymarket", universalStoreId: "GBLON12", appointmentId: 88128556, lat: 51.53742753808535, lng: -0.060993912170219655 },
];

const ACUITY_BASE = "https://aceandtate-en.as.me/";

export async function fetchAceAndTate(
  lat: number,
  lng: number,
  radius = 8047,
  limit = 10
): Promise<StoreResult[]> {
  const threeDays = getStaticThreeDayDates();

  const nearby = STORES
    .map((store) => {
      const distM = haversine(lat, lng, store.lat, store.lng);
      if (distM > radius) return null;
      return { ...store, distanceM: Math.round(distM) };
    })
    .filter(Boolean)
    .sort((a, b) => a!.distanceM - b!.distanceM)
    .slice(0, limit) as (AceAndTateStore & { distanceM: number })[];

  // Static provider — no live availability, so show count=-1
  // ("available but count unknown") for all 3 days
  return nearby.map((store) => ({
    provider: "Ace & Tate",
    storeName: `Ace & Tate ${store.city}${store.address ? ` — ${store.address}` : ""}`,
    address: store.address,
    postcode: "",
    town: store.city,
    phone: "",
    distanceM: store.distanceM,
    slotsAvailable: null,
    nextAvailable: null,
    bookingUrl: `${ACUITY_BASE}?appointmentType=${store.appointmentId}`,
    lat: store.lat,
    lng: store.lng,
    dailySlots: threeDays.map((date) => ({ date, count: -1 })),
  }));
}
