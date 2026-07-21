import { haversine } from "../haversine";
import { getStaticThreeDayDates } from "../dates";
import type { StoreResult } from "../types";

/* ------------------------------------------------------------------ */
/*  Jimmy Fairly — Static provider (17 UK stores)                      */
/*  French optician brand with direct booking via their stores page.   */
/*  Booking URL: /en-gb/pages/stores?booking=open&bookingStore=CODE   */
/*  No live availability — deep link to their booking widget.          */
/* ------------------------------------------------------------------ */

interface JimmyFairlyStore {
  name: string;
  address: string;
  postcode: string;
  town: string;
  bookingCode: string;
  lat: number;
  lng: number;
}

export const JIMMY_FAIRLY_STORES: JimmyFairlyStore[] = [
  /* London */
  { name: "Chelsea", address: "170 King's Road", postcode: "SW3 4UP", town: "London", bookingCode: "kgrd", lat: 51.4882, lng: -0.1685 },
  { name: "Covent Garden", address: "24 Neal Street", postcode: "WC2H 9QW", town: "London", bookingCode: "neal", lat: 51.5131, lng: -0.1262 },
  { name: "Battersea", address: "73 Northcote Road", postcode: "SW11 6PJ", town: "London", bookingCode: "clap", lat: 51.4610, lng: -0.1666 },
  { name: "Soho", address: "47 Lexington Street", postcode: "W1F 9AP", town: "London", bookingCode: "soho", lat: 51.5128, lng: -0.1387 },
  { name: "Hampstead", address: "44 Hampstead High Street", postcode: "NW3 1QG", town: "London", bookingCode: "hamp", lat: 51.5563, lng: -0.1774 },
  { name: "Wimbledon", address: "64 High Street Wimbledon", postcode: "SW19 5EE", town: "London", bookingCode: "wimb", lat: 51.4214, lng: -0.2064 },
  { name: "Stoke Newington", address: "47 Stoke Newington Church Street", postcode: "N16 0NX", town: "London", bookingCode: "newi", lat: 51.5615, lng: -0.0782 },
  { name: "Kingston", address: "8a Church Street", postcode: "KT1 1RJ", town: "Kingston upon Thames", bookingCode: "kstn", lat: 51.4103, lng: -0.3065 },
  { name: "Angel", address: "293 Upper Street", postcode: "N1 2TU", town: "London", bookingCode: "isli", lat: 51.5446, lng: -0.1029 },
  { name: "Portobello", address: "166 Portobello Road", postcode: "W11 2EB", town: "London", bookingCode: "port", lat: 51.5134, lng: -0.2045 },
  { name: "Soho Carnaby", address: "10 Foubert's Place", postcode: "W1F 7PF", town: "London", bookingCode: "carn", lat: 51.5133, lng: -0.1394 },
  /* Outside London */
  { name: "Edinburgh", address: "37A George Street", postcode: "EH2 2HN", town: "Edinburgh", bookingCode: "edim", lat: 55.9533, lng: -3.2010 },
  { name: "Bath", address: "4 Burton Street", postcode: "BA1 1BN", town: "Bath", bookingCode: "bath", lat: 51.3823, lng: -2.3607 },
  { name: "Bristol", address: "90 Park Street", postcode: "BS1 5PJ", town: "Bristol", bookingCode: "bris", lat: 51.4545, lng: -2.6023 },
  { name: "Brighton", address: "28 Bond Street", postcode: "BN1 1RD", town: "Brighton", bookingCode: "brig", lat: 50.8225, lng: -0.1390 },
  { name: "Cambridge", address: "6 Rose Crescent", postcode: "CB2 3LL", town: "Cambridge", bookingCode: "camb", lat: 52.2071, lng: 0.1183 },
  { name: "Leeds", address: "3 Queen Victoria Street", postcode: "LS1 6BE", town: "Leeds", bookingCode: "leed", lat: 53.7960, lng: -1.5436 },
];

const BOOKING_BASE =
  "https://www.jimmyfairly.com/en-gb/pages/stores?booking=open&bookingStore=";

export async function fetchJimmyFairly(
  lat: number,
  lng: number,
  radius = 8047,
  limit = 10
): Promise<StoreResult[]> {
  const threeDays = getStaticThreeDayDates();

  const nearby = JIMMY_FAIRLY_STORES
    .map((store) => {
      const distM = haversine(lat, lng, store.lat, store.lng);
      if (distM > radius) return null;
      return { ...store, distanceM: Math.round(distM) };
    })
    .filter(Boolean)
    .sort((a, b) => a!.distanceM - b!.distanceM)
    .slice(0, limit) as (JimmyFairlyStore & { distanceM: number })[];

  return nearby.map((store) => ({
    provider: "Jimmy Fairly",
    storeName: `Jimmy Fairly ${store.name}`,
    address: store.address,
    postcode: store.postcode,
    town: store.town,
    phone: "",
    distanceM: store.distanceM,
    slotsAvailable: null,
    nextAvailable: null,
    bookingUrl: `${BOOKING_BASE}${store.bookingCode}`,
    lat: store.lat,
    lng: store.lng,
    dailySlots: threeDays.map((date) => ({ date, count: -1 })),
  }));
}
