import type { StoreResult } from "../types";

const OCUCO_BASE = "https://eu.oh.ocuco.com/api/omni/v303";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-GB,en;q=0.9",
  Origin: "https://omniui-boots-pupz.bootsopticians.com",
  Referer: "https://omniui-boots-pupz.bootsopticians.com/",
};

// Adult 16-59
const VISIT_TYPE_ADULT = "b0a9995e-0332-411d-ad7c-e9aa1590d639";

function formatSlot(isoString: string): string {
  const dt = new Date(isoString);
  return `Available — next ${dt.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })} at ${dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
}

export async function fetchBoots(
  lat: number,
  lng: number,
  radius = 15000,
  limit = 10
): Promise<StoreResult[]> {
  const results: StoreResult[] = [];
  let offset = 0;
  const pageSize = Math.max(limit, 20);

  outer: while (results.length < limit) {
    const url = new URL(`${OCUCO_BASE}/site/availableappointmentslots`);
    url.searchParams.set("originLatitude", String(lat));
    url.searchParams.set("originLongitude", String(lng));
    url.searchParams.set("visitTypeId", VISIT_TYPE_ADULT);
    url.searchParams.set("window", String(pageSize));
    url.searchParams.set("offset", String(offset));

    const res = await fetch(url.toString(), { headers: HEADERS });
    if (!res.ok) throw new Error(`Boots API error: ${res.status}`);
    const json = await res.json();
    const data = (json.data ?? []) as Record<string, unknown>[];
    const hasMore = (json.meta as Record<string, unknown>)?.hasMoreResults as boolean ?? false;
    if (!data.length) break;

    for (const item of data) {
      const site = (item.site ?? {}) as Record<string, unknown>;
      if (!site.siteId) continue;

      // distanceFromOriginKms is on the site object
      const distM = Number(site.distanceFromOriginKms ?? 0) * 1000;
      // API returns results sorted by distance; stop when we exceed radius
      if (distM > radius) break outer;

      const slotFound = item.slotFound as boolean;
      const nextSlot = item.nextAvailableSlot as Record<string, string> | null;
      const nextStart = nextSlot?.startTime ?? "";
      const addressParts = [site.address1, site.address2].filter(Boolean).map(String);

      results.push({
        provider: "Boots Opticians",
        // API already includes "Boots Opticians" in the name
        storeName: String(site.name ?? "Boots Opticians"),
        address: addressParts.join(", "),
        postcode: String(site.postalCode ?? ""),
        town: String(site.city ?? ""),
        phone: String(site.phoneNumber ?? ""),
        distanceM: Math.round(distM),
        slotsAvailable: slotFound && nextStart ? formatSlot(nextStart) : null,
        nextAvailable: nextStart ? nextStart.slice(0, 10) : null,
        bookingUrl: `https://omniui-boots-pupz.bootsopticians.com/en-GB/book-an-appointment?siteId=${site.siteId}`,
        lat: Number(site.latitude) || undefined,
        lng: Number(site.longitude) || undefined,
      });

      if (results.length >= limit) break outer;
    }

    if (!hasMore || data.length < pageSize) break;
    offset += 1;
  }

  results.sort((a, b) => a.distanceM - b.distanceM);
  return results;
}
