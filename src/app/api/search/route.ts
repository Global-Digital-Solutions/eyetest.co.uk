import { NextRequest } from "next/server";
import { geocodePostcode } from "@/lib/postcodes";
import { fetchBoots } from "@/lib/providers/boots";
import { fetchAsda } from "@/lib/providers/asda";
import { fetchVisionExpress } from "@/lib/providers/vision-express";
import { fetchMysight, MYSIGHT_SITES } from "@/lib/providers/mysight";
import { fetchMandS } from "@/lib/providers/mands";
import { fetchAceAndTate } from "@/lib/providers/aceandtate";
import { fetchScrivens } from "@/lib/providers/scrivens";
import type { StoreResult, FeaturedProvider, OpticianListing } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { haversine } from "@/lib/haversine";

const enc = new TextEncoder();

function line(data: object): Uint8Array {
  return enc.encode(JSON.stringify(data) + "\n");
}

/* ------------------------------------------------------------------ */
/*  Density-aware featured radius                                      */
/*  In dense urban areas the "recommended" radius is capped so that    */
/*  listings don't blanket an entire city from a single store.         */
/*  The cap is applied at query time — the DB value acts as a maximum. */
/* ------------------------------------------------------------------ */

interface CityZone {
  lat: number;
  lng: number;
  /** How far from city centre counts as "in this city" (metres) */
  boundaryM: number;
  /** Max featured/listing radius within this zone (km) */
  maxRadiusKm: number;
}

const CITY_ZONES: CityZone[] = [
  // Tier 1 — Very dense: 1 mile (1.6 km) max featured radius
  { lat: 51.5074, lng: -0.1278, boundaryM: 25000, maxRadiusKm: 1.6 },  // London (within M25)

  // Tier 2 — Major cities: 2 miles (3.2 km)
  { lat: 52.4862, lng: -1.8904, boundaryM: 12000, maxRadiusKm: 3.2 },  // Birmingham
  { lat: 53.4808, lng: -2.2426, boundaryM: 12000, maxRadiusKm: 3.2 },  // Manchester
  { lat: 53.8008, lng: -1.5491, boundaryM: 10000, maxRadiusKm: 3.2 },  // Leeds
  { lat: 55.9533, lng: -3.1883, boundaryM: 10000, maxRadiusKm: 3.2 },  // Edinburgh
  { lat: 55.8642, lng: -4.2518, boundaryM: 12000, maxRadiusKm: 3.2 },  // Glasgow
  { lat: 53.4084, lng: -2.9916, boundaryM: 10000, maxRadiusKm: 3.2 },  // Liverpool
  { lat: 51.4545, lng: -2.5879, boundaryM: 10000, maxRadiusKm: 3.2 },  // Bristol
  { lat: 53.3811, lng: -1.4701, boundaryM: 10000, maxRadiusKm: 3.2 },  // Sheffield
  { lat: 54.9783, lng: -1.6178, boundaryM: 10000, maxRadiusKm: 3.2 },  // Newcastle
  { lat: 52.9548, lng: -1.1581, boundaryM: 10000, maxRadiusKm: 3.2 },  // Nottingham
  { lat: 51.4816, lng: -3.1791, boundaryM: 10000, maxRadiusKm: 3.2 },  // Cardiff

  // Tier 3 — Cities: 3 miles (4.8 km)
  { lat: 52.6369, lng: -1.1398, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Leicester
  { lat: 50.9097, lng: -1.4044, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Southampton
  { lat: 50.3755, lng: -4.1427, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Plymouth
  { lat: 50.7184, lng: -3.5339, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Exeter
  { lat: 51.4545, lng: -0.9781, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Reading
  { lat: 52.2053, lng:  0.1218, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Cambridge
  { lat: 51.7520, lng: -1.2577, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Oxford
  { lat: 50.8225, lng: -0.1372, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Brighton
  { lat: 52.4068, lng: -1.5197, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Coventry
  { lat: 53.0027, lng: -2.1794, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Stoke-on-Trent
  { lat: 50.7956, lng: -1.0880, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Portsmouth
  { lat: 57.1497, lng: -2.0943, boundaryM: 8000,  maxRadiusKm: 4.8 },  // Aberdeen
];

/** Default max radius for non-urban areas (5 miles) */
const DEFAULT_MAX_RADIUS_KM = 8;

/**
 * Returns the maximum featured/listing radius (in km) for a given location.
 * Dense cities get tighter caps to prevent overlap; rural areas keep the default.
 */
function getDensityMaxRadiusKm(lat: number, lng: number): number {
  for (const zone of CITY_ZONES) {
    const distM = haversine(lat, lng, zone.lat, zone.lng);
    if (distM <= zone.boundaryM) return zone.maxRadiusKm;
  }
  return DEFAULT_MAX_RADIUS_KM;
}

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

export async function GET(req: NextRequest) {
  const postcode = req.nextUrl.searchParams.get("postcode");
  if (!postcode) {
    return new Response(JSON.stringify({ error: "postcode is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let geo;
  try {
    geo = await geocodePostcode(postcode);
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Invalid postcode",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { lat, lng } = geo;
  const RADIUS = 8047; // 5 miles in metres
  const LIMIT = 10;
  const TIMEOUT_MS = 20000;

  // Read provider config from Supabase before the stream starts
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("providers")
    .select("name, enabled");
  const cfg: Record<string, boolean> = {};
  for (const row of rows ?? []) cfg[row.name] = row.enabled;
  const enabled = (name: string) => cfg[name] ?? true;

  // Load featured provider rules that cover the searched location
  const { data: featuredRows } = await supabase
    .from("featured_providers")
    .select("*")
    .eq("active", true);

  // Cap the effective radius based on location density — prevents a single
  // store from blanketing a large city like London
  const densityCapKm = getDensityMaxRadiusKm(lat, lng);

  const applicableRules = (featuredRows ?? []).filter((rule: FeaturedProvider) => {
    const distM = haversine(lat, lng, rule.lat, rule.lng);
    const effectiveRadiusKm = Math.min(rule.radius_km, densityCapKm);
    return distM <= effectiveRadiusKm * 1000;
  });

  // Load subscribed/manual optician listings
  const { data: listingRows } = await supabase
    .from("optician_listings")
    .select("*")
    .eq("active", true);

  const listingResults: StoreResult[] = (listingRows ?? [])
    .filter((l: OpticianListing) => l.lat != null && l.lng != null)
    .map((l: OpticianListing) => {
      const distM = haversine(lat, lng, l.lat!, l.lng!);
      return { listing: l, distM };
    })
    .filter(({ listing, distM }) => {
      const effectiveRadiusKm = Math.min(listing.radius_km, densityCapKm);
      return distM <= effectiveRadiusKm * 1000;
    })
    .map(({ listing, distM }) => ({
      provider: listing.practice_name,
      storeName: listing.practice_name,
      address: listing.address || "",
      postcode: listing.postcode,
      town: listing.town || "",
      phone: listing.phone || "",
      distanceM: distM,
      slotsAvailable: null,
      nextAvailable: null,
      bookingUrl: listing.booking_url || listing.website || "",
      lat: listing.lat!,
      lng: listing.lng!,
      featured: true, // all active listings are featured (sorted above free)
      featuredLabel: listing.badge_label || (listing.tier === "platinum" ? "Featured Partner" : "Recommended"),
      tier: listing.tier,
      logoUrl: listing.logo_url || undefined,
      services: listing.services_tagline || undefined,
      dailySlots: [{ date: new Date().toISOString().split("T")[0], count: -1 }],
    }));

  const norm = (s: string) => s.replace(/\s/g, "").toUpperCase();

  function markFeatured(results: StoreResult[]): StoreResult[] {
    return results.map((r) => {
      const rule = applicableRules.find((rule) => {
        if (rule.provider !== r.provider) return false;
        if (rule.store_postcode && r.postcode) {
          // Postcode is the reliable identifier — normalise both before comparing
          return norm(rule.store_postcode) === norm(r.postcode);
        }
        // Fallback: match by name
        if (rule.store_name && rule.store_name !== r.storeName) return false;
        return true;
      });
      if (rule) return { ...r, featured: true, featuredLabel: rule.label };
      return r;
    });
  }

  const activeProviders = [
    ...["Boots Opticians", "ASDA Opticians", "Vision Express", "M&S Opticians", "Ace & Tate"].filter(enabled),
    ...MYSIGHT_SITES.filter(enabled),
  ];

  const stream = new ReadableStream({
    async start(controller) {
      // Send postcode + active provider list so the frontend knows what to show
      controller.enqueue(
        line({ type: "meta", postcode: geo.postcode, lat, lng, district: geo.district, activeProviders })
      );

      async function runProvider(
        providerName: string,
        fn: () => Promise<StoreResult[]>
      ) {
        try {
          const results = markFeatured(await withTimeout(fn(), TIMEOUT_MS, providerName));
          controller.enqueue(
            line({ type: "results", provider: providerName, results })
          );
        } catch (err) {
          controller.enqueue(
            line({
              type: "error",
              provider: providerName,
              message: err instanceof Error ? err.message : String(err),
            })
          );
        }
      }

      const providers = [
        ...(enabled("Boots Opticians")
          ? [runProvider("Boots Opticians", () => fetchBoots(lat, lng, RADIUS, LIMIT))]
          : []),
        ...(enabled("ASDA Opticians")
          ? [runProvider("ASDA Opticians", () => fetchAsda(lat, lng, RADIUS, LIMIT))]
          : []),
        ...(enabled("Vision Express")
          ? [runProvider("Vision Express", () => fetchVisionExpress(lat, lng, RADIUS, LIMIT))]
          : []),
        ...(enabled("M&S Opticians")
          ? [runProvider("M&S Opticians", () => fetchMandS(lat, lng, RADIUS, LIMIT))]
          : []),
        ...(enabled("Ace & Tate")
          ? [runProvider("Ace & Tate", () => fetchAceAndTate(lat, lng, RADIUS, LIMIT))]
          : []),
        ...(enabled("scrivens")
          ? [runProvider("scrivens", () => fetchScrivens(lat, lng, RADIUS, LIMIT))]
          : []),
        ...MYSIGHT_SITES.filter((site) => enabled(site)).map(
          (site) => runProvider(site, () => fetchMysight(site, lat, lng, RADIUS, LIMIT))
        ),
      ];

      await Promise.all(providers);

      // Emit subscribed optician listings as standalone results
      if (listingResults.length > 0) {
        controller.enqueue(
          line({ type: "results", provider: "Optician Listings", results: listingResults })
        );
      }

      controller.enqueue(line({ type: "done" }));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
