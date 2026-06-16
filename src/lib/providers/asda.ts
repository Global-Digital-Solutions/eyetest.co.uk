import type { StoreResult } from "../types";
import { ukToday, getThreeDayDates } from "../dates";

const OCUCO_BASE = "https://eu.oh.ocuco.com/api/omni/v303";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Referer: "https://opticians.asda.com/store-finder",
  Origin: "https://opticians.asda.com",
  Accept: "application/json",
};
const BOOKING_BASE = "https://opticians.asda.com/book-an-appointment";
const VISIT_TYPE_EYE_EXAM = "bb89cb89-805a-405e-817c-58a430b9585f";

function formatSlot(isoString: string): string {
  const dt = new Date(isoString);
  return `Available — next ${dt.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })} at ${dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
}

export async function fetchAsda(
  lat: number,
  lng: number,
  radius = 8047,
  limit = 10
): Promise<StoreResult[]> {
  const todayStr = ukToday();
  const threeDays = getThreeDayDates();
  const results: StoreResult[] = [];
  let offset = 0;
  const pageSize = Math.max(limit, 20);
  const seen = new Set<string>();

  outer: while (results.length < limit) {
    const url = new URL(`${OCUCO_BASE}/site/availableappointmentslots`);
    url.searchParams.set("originLatitude", String(lat));
    url.searchParams.set("originLongitude", String(lng));
    url.searchParams.set("visitTypeId", VISIT_TYPE_EYE_EXAM);
    url.searchParams.set("window", String(pageSize));
    url.searchParams.set("offset", String(offset));

    const res = await fetch(url.toString(), { headers: HEADERS });
    if (!res.ok) throw new Error(`ASDA API error: ${res.status}`);
    const json = await res.json();
    const data = (json.data ?? []) as Record<string, unknown>[];
    const hasMore = (json.meta as Record<string, unknown>)?.hasMoreResults as boolean ?? false;
    if (!data.length) break;

    for (const item of data) {
      const site = (item.site ?? {}) as Record<string, unknown>;
      const siteId = String(site.siteId ?? "");
      if (!siteId || seen.has(siteId)) continue;

      // Use server-calculated distance (results sorted by distance — stop when over radius)
      const distM = Number(site.distanceFromOriginKms ?? 0) * 1000;
      if (distM > radius) break outer;

      seen.add(siteId);

      const slotFound = item.slotFound as boolean;
      const nextSlot = item.nextAvailableSlot as Record<string, string> | null;
      const nextStart = nextSlot?.startTime ?? "";
      const nextDateStr = nextStart ? nextStart.slice(0, 10) : "";
      const isFuture = nextDateStr >= todayStr;

      // Build 3-day availability calendar
      const dailySlots = threeDays.map((date) => ({
        date,
        count: slotFound && isFuture && nextDateStr === date ? -1 : 0,
      }));

      results.push({
        provider: "ASDA Opticians",
        storeName: `ASDA Opticians ${site.name ?? ""}`,
        address: String(site.address1 ?? ""),
        postcode: String(site.postalCode ?? ""),
        town: String(site.city ?? ""),
        phone: String(site.phoneNumber ?? ""),
        distanceM: Math.round(distM),
        slotsAvailable: slotFound && isFuture && nextStart ? formatSlot(nextStart) : null,
        nextAvailable: isFuture && nextStart ? nextDateStr : null,
        bookingUrl: `${BOOKING_BASE}?siteId=${siteId}`,
        lat: Number(site.latitude) || undefined,
        lng: Number(site.longitude) || undefined,
        dailySlots,
      });

      if (results.length >= limit) break outer;
    }

    if (!hasMore || data.length < pageSize) break;
    offset += 1;
  }

  results.sort((a, b) => a.distanceM - b.distanceM);
  return results;
}
