import type { StoreResult } from "../types";
import { ukToday, getThreeDayDates } from "../dates";

const GQL_URL = "https://api.visionexpress.com/graphql";
const APPOINTMENT_TYPE_ID = "22622"; // Eye Test

const QUERY = `
query GetAvailabilityStoresNearby(
  $appointmentTypeId: ID!
  $longitude: Longitude!
  $latitude: Latitude!
  $startDate: Date!
  $endDate: Date
) {
  availabilityStoresNearby(
    appointmentTypeId: $appointmentTypeId
    longitude: $longitude
    latitude: $latitude
    startDate: $startDate
    endDate: $endDate
  ) {
    availability {
      storeCode
      slotsAvailable
      nextAvailableBookingDate
      store {
        code
        name
        streetName
        streetNumber
        postalCode
        town
        lat
        lon
        phone
        distance
      }
    }
  }
}
`;

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function fetchVisionExpress(
  lat: number,
  lng: number,
  radius = 8047,
  limit = 10,
  days = 28
): Promise<StoreResult[]> {
  const todayStr = ukToday();
  const threeDays = getThreeDayDates();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);

  const res = await fetch(GQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://www.visionexpress.com",
      Referer: "https://www.visionexpress.com/book-appointment",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        appointmentTypeId: APPOINTMENT_TYPE_ID,
        longitude: lng,
        latitude: lat,
        startDate: isoDate(tomorrow),
        endDate: isoDate(endDate),
      },
    }),
  });

  if (!res.ok) throw new Error(`Vision Express API error: ${res.status}`);
  const json = await res.json();
  const availability: unknown[] =
    json.data?.availabilityStoresNearby?.availability ?? [];

  const results: StoreResult[] = [];

  for (const item of availability as Record<string, unknown>[]) {
    const store = (item.store ?? {}) as Record<string, unknown>;
    const distM = Number(store.distance ?? 0); // distance is in meters
    if (distM > radius) continue;

    const slotsAvailable = Number(item.slotsAvailable ?? 0);
    const nextDate = String(item.nextAvailableBookingDate ?? "");
    const nextDateStr = nextDate ? nextDate.slice(0, 10) : "";
    const isFuture = nextDateStr >= todayStr;

    let slotStr: string | null = null;
    if (slotsAvailable > 0 && nextDate && isFuture) {
      const dt = new Date(nextDate);
      slotStr = `Available — next ${dt.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })}`;
    }

    // Build 3-day availability calendar
    const dailySlots = threeDays.map((date) => ({
      date,
      count: slotsAvailable > 0 && isFuture && nextDateStr === date ? -1 : 0,
    }));

    const streetNum = String(store.streetNumber ?? "").trim();
    const streetName = String(store.streetName ?? "").trim();
    const address = [streetNum, streetName].filter(Boolean).join(" ");

    results.push({
      provider: "Vision Express",
      storeName: String(store.name ?? "Vision Express"),
      address,
      postcode: String(store.postalCode ?? ""),
      town: String(store.town ?? ""),
      phone: String(store.phone ?? ""),
      distanceM: Math.round(distM),
      slotsAvailable: slotStr,
      nextAvailable: isFuture ? nextDateStr || null : null,
      bookingUrl: "https://www.visionexpress.com/book-appointment",
      lat: Number(store.lat) || undefined,
      lng: Number(store.lon) || undefined,
      dailySlots,
    });

    if (results.length >= limit) break;
  }

  results.sort((a, b) => a.distanceM - b.distanceM);
  return results;
}
