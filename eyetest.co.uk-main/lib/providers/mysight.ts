import { haversine } from "../haversine";
import type { StoreResult } from "../types";

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
  "leightonsopticians.mysight.uk",
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

    // Prefer adult eye/sight test
    for (const t of types) {
      const name = String(t.onlineName ?? "").toLowerCase();
      if (!t.isOnlineType) continue;
      if (
        (name.includes("eye test") || name.includes("sight test")) &&
        !name.includes("children") &&
        !name.includes("contact")
      )
        return String(t.id);
    }
    // Fallback: first online type
    for (const t of types) {
      if (t.isOnlineType) return String(t.id);
    }
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
  radius = 25000,
  limit = 10,
  days = 14
): Promise<StoreResult[]> {
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

      if (typeId) {
        const avail = await fetchAvailability(siteHost, branchId, typeId, dates);
        const slots = (avail.availableSlots ?? {}) as Record<string, unknown>;
        const slotKeys = Object.keys(slots);
        if (slotKeys.length > 0) {
          const earliest = slotKeys.sort()[0];
          const dt = new Date(earliest);
          slotStr = `Available — next ${dt.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })} at ${dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
          nextDate = earliest.slice(0, 10);
        }
      }

      const displayName =
        String(b.onlineFriendlyBranchName ?? "") || String(b.branchName ?? "");
      const phone = String(b.telephone1 ?? "") || String(b.telephone2 ?? "");

      results.push({
        provider: siteHost,
        storeName: `${brandName} ${displayName}`,
        address: "",
        postcode: "",
        town: "",
        phone,
        distanceM: b.distanceM,
        slotsAvailable: slotStr,
        nextAvailable: nextDate,
        bookingUrl: `https://${siteHost}/choose-appointment-type`,
        lat: Number(b.latitude) || undefined,
        lng: Number(b.longitude) || undefined,
      });
    })
  );

  results.sort((a, b) => a.distanceM - b.distanceM);
  return results;
}
