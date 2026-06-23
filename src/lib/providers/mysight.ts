import { haversine } from "../haversine";
import type { StoreResult } from "../types";
import { ukToday, getThreeDayDates, getThreeDayDatesFrom } from "../dates";

const GQL_URL = "https://graphql.mysight.uk/";
const TIMEZONE = "Europe/London";

// Known MySight-powered optician sites (verified working)
export const MYSIGHT_SITES = [
  "2020opticians.mysight.uk",
  "alldersopticians.mysight.uk",
  "barracloughs.mysight.uk",
  "batemanopticians.mysight.uk",
  "bayfieldsopticians.mysight.uk",
  "cameron-davies.mysight.uk",
  "chalmersopticians.mysight.uk",
  "classiceyes.mysight.uk",
  "cranfordopticians.mysight.uk",
  "duncanandtodd.mysight.uk",
  "exmouth-eyecare.mysight.uk",
  "eyecollective.mysight.uk",
  "eyelink.mysight.uk",
  "eyesentials.mysight.uk",
  "eyesite.mysight.uk",
  "harroldopticians.mysight.uk",
  "houghtonopticians.mysight.uk",
  "johnhigheyecare.mysight.uk",
  "johnroseeyecare.mysight.uk",
  "leightons.mysight.uk",
  // "leightonsopticians.mysight.uk", — duplicate of leightons.mysight.uk
  "lynnefernandes.mysight.uk",
  "millicansopticians.mysight.uk",
  "norville-opticians.mysight.uk",
  "oakwoodeyecare.mysight.uk",
  "observatoryopticians.mysight.uk",
  "optimaopticians.mysight.uk",
  "peterbowersopticians.mysight.uk",
  "rawlingsopticians.mysight.uk",
  "reynoldsopticians.mysight.uk",
  "seoptom.mysight.uk",
  "suzannedennisoptometrist.mysight.uk",
  "the-eye-place.mysight.uk",
  "viewpoint.mysight.uk",
  "woodingopticians.mysight.uk",
];

function buildHeaders(siteHost: string) {
  return {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: `https://${siteHost}`,
    Referer: `https://${siteHost}/`,
  };
}

async function gql(
  siteHost: string,
  query: string,
  variables: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const res = await fetch(GQL_URL, {
    method: "POST",
    headers: buildHeaders(siteHost),
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`MySight API error: ${res.status}`);
  return res.json();
}

function makeDates(days = 14): string[] {
  const dates: string[] = [];
  for (let i = 1; i <= days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().slice(0, 10) + "T00:00:00");
  }
  return dates;
}

async function fetchSiteInfo(siteHost: string) {
  const data = await gql(
    siteHost,
    `query site($url: String!) { site(url: $url) { id brandingId homeUrl } }`,
    { url: siteHost }
  );
  const site = (data as Record<string, Record<string, unknown>>).data?.site;
  if (!site) throw new Error(`No site info for ${siteHost}`);
  return site as { id: string; brandingId: string; homeUrl: string };
}

async function fetchBranches(siteHost: string, brandingId: string) {
  const data = await gql(
    siteHost,
    `query branding($brandId: String) {
      branding(id: $brandId) {
        brandName
        brandBranches {
          id branchName latitude longitude
          onlineFriendlyBranchName telephone1 telephone2
        }
      }
    }`,
    { brandId: brandingId }
  );
  const branding = (data as Record<string, Record<string, unknown>>).data
    ?.branding as Record<string, unknown>;
  return {
    brandName: String(branding?.brandName ?? siteHost),
    branches: (branding?.brandBranches ?? []) as Record<string, unknown>[],
  };
}

async function fetchEyeTestTypeId(
  siteHost: string,
  branchId: string,
  dates: string[]
): Promise<string | null> {
  try {
    const data = await gql(
      siteHost,
      `query availableAppointmentTypes($input: AvailableAppointmentTypesRequest!) {
        availableAppointmentTypes(input: $input) {
          id onlineName isOnlineType appLength
        }
      }`,
      { input: { branchId, dates, timeZoneIdentifier: TIMEZONE } }
    );
    const types = (
      (data as Record<string, Record<string, unknown>>).data
        ?.availableAppointmentTypes ?? []
    ) as Record<string, unknown>[];

    // Only consider online-bookable types
    const online = types.filter((t) => t.isOnlineType);

    // Helpers
    const isEyeTest = (name: string) =>
      name.includes("eye test") ||
      name.includes("sight test") ||
      name.includes("eye exam");
    const isChild = (name: string) =>
      name.includes("child");    // covers "child", "children", "childs", "children's"
    const isExcluded = (name: string) =>
      isChild(name) ||
      name.includes("contact") ||
      name.includes("hearing") ||
      name.includes("ear wax") ||
      name.includes("tinnitus") ||
      name.includes("adjustment") ||
      name.includes("dry eye") ||
      name.includes("style consultation");

    // Priority 1: explicit adult eye/sight test (e.g. "Adult NHS Sight Test", "Eye Test - Adult")
    for (const t of online) {
      const name = String(t.onlineName ?? "").toLowerCase();
      if (isEyeTest(name) && name.includes("adult") && !isExcluded(name))
        return String(t.id);
    }
    // Priority 2: private/standard eye test (not child, not contact, not hearing)
    for (const t of online) {
      const name = String(t.onlineName ?? "").toLowerCase();
      if (isEyeTest(name) && !isExcluded(name))
        return String(t.id);
    }
    // Priority 3: any eye examination (e.g. "Enhanced Eye Examination")
    for (const t of online) {
      const name = String(t.onlineName ?? "").toLowerCase();
      if (name.includes("eye") && !isExcluded(name))
        return String(t.id);
    }
    // Fallback: first online type that isn't hearing/ear/child related
    for (const t of online) {
      const name = String(t.onlineName ?? "").toLowerCase();
      if (!isExcluded(name)) return String(t.id);
    }
    // Last resort: first online type
    if (online.length > 0) return String(online[0].id);
  } catch {
    // ignore
  }
  return null;
}

async function fetchAvailability(
  siteHost: string,
  branchId: string,
  appointmentTypeId: string,
  dates: string[]
): Promise<Record<string, unknown>> {
  try {
    const data = await gql(
      siteHost,
      `query Availability($input: AvailabilityRequest!) {
        availability(input: $input) {
          availableSlots
          availabilityStartDate
        }
      }`,
      {
        input: {
          branchId,
          appointmentTypeId,
          timeZoneIdentifier: TIMEZONE,
          dates,
        },
      }
    );
    return (
      ((data as Record<string, Record<string, unknown>>).data
        ?.availability as Record<string, unknown>) ?? {}
    );
  } catch {
    return {};
  }
}

export async function fetchMysight(
  siteHost: string,
  lat: number,
  lng: number,
  radius = 8047,
  limit = 10,
  days = 14
): Promise<StoreResult[]> {
  const todayStr = ukToday();
  const threeDays = getThreeDayDates();

  const site = await fetchSiteInfo(siteHost);
  const { brandName, branches } = await fetchBranches(siteHost, site.brandingId);
  const dates = makeDates(days);

  // Filter by distance
  const nearby = branches
    .map((b) => {
      const blat = Number(b.latitude ?? 0);
      const blng = Number(b.longitude ?? 0);
      if (!blat || !blng) return null;
      const distM = haversine(lat, lng, blat, blng);
      if (distM > radius) return null;
      return { ...b, distanceM: Math.round(distM) };
    })
    .filter(Boolean)
    .sort((a, b) => (a!.distanceM as number) - (b!.distanceM as number))
    .slice(0, limit) as (Record<string, unknown> & { distanceM: number })[];

  const results: StoreResult[] = [];

  await Promise.all(
    nearby.map(async (b) => {
      const branchId = String(b.id);
      const typeId = await fetchEyeTestTypeId(siteHost, branchId, dates);
      let slotStr: string | null = null;
      let nextDate: string | null = null;

      // Count slots per day for the 3-day calendar
      const dailyCounts: Record<string, number> = {};

      if (typeId) {
        const avail = await fetchAvailability(siteHost, branchId, typeId, dates);
        const slots = (avail.availableSlots ?? {}) as Record<string, unknown>;
        const slotKeys = Object.keys(slots)
          .filter((k) => k.slice(0, 10) >= todayStr)
          .sort();

        for (const key of slotKeys) {
          const dateStr = key.slice(0, 10);
          const val = slots[key];
          if (Array.isArray(val)) {
            dailyCounts[dateStr] = (dailyCounts[dateStr] ?? 0) + val.length;
          } else {
            dailyCounts[dateStr] = (dailyCounts[dateStr] ?? 0) + 1;
          }
        }

        if (slotKeys.length > 0) {
          const earliest = slotKeys[0];
          const dt = new Date(earliest);
          slotStr = `Available — next ${dt.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })} at ${dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
          nextDate = earliest.slice(0, 10);
        }
      }

      let dailySlots = threeDays.map((date) => ({
        date,
        count: dailyCounts[date] ?? 0,
      }));

      // If no slots in initial 3-day window, find earliest available date
      // and shift the window to show 3 days starting from that date
      if (dailySlots.every((s) => s.count === 0) && Object.keys(dailyCounts).length > 0) {
        const earliestDate = Object.keys(dailyCounts)
          .sort()
          .find((d) => (dailyCounts[d] ?? 0) > 0);
        if (earliestDate) {
          const shiftedDays = getThreeDayDatesFrom(earliestDate);
          dailySlots = shiftedDays.map((date) => ({
            date,
            count: dailyCounts[date] ?? 0,
          }));
        }
      }

      const branchLabel =
        String(b.onlineFriendlyBranchName ?? "") || String(b.branchName ?? "");
      const phone = String(b.telephone1 ?? "") || String(b.telephone2 ?? "");

      // Avoid duplicated names like "Cranford Opticians Cranford Opticians"
      // when the branch label already contains the brand name
      const storeName = branchLabel.toLowerCase().startsWith(brandName.toLowerCase())
        ? branchLabel
        : `${brandName} ${branchLabel}`;

      // Deep-link via /recall route — the only MySight SPA route that reads
      // branchId from URL params and auto-selects the branch in app state.
      // This bypasses the branch-selection step for multi-branch sites.
      const bookingParams = new URLSearchParams();
      bookingParams.set("branchId", branchId);
      if (typeId) bookingParams.set("appointmentTypeId", typeId);

      results.push({
        provider: siteHost,
        storeName,
        address: "",
        postcode: "",
        town: "",
        phone,
        distanceM: b.distanceM,
        slotsAvailable: slotStr,
        nextAvailable: nextDate,
        bookingUrl: `https://${siteHost}/recall?${bookingParams.toString()}`,
        lat: Number(b.latitude) || undefined,
        lng: Number(b.longitude) || undefined,
        dailySlots,
      });
    })
  );

  results.sort((a, b) => a.distanceM - b.distanceM);
  return results;
}
