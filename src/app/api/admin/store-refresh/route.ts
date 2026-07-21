import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { MANDS_STORES } from "@/lib/providers/mands";
import { SCRIVENS_STORES } from "@/lib/providers/scrivens";
import { ACE_TATE_STORES } from "@/lib/providers/aceandtate";
import { JIMMY_FAIRLY_STORES } from "@/lib/providers/jimmyfairly";

export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------ */
/*  postcodes.io bulk lookup — max 100 per request                     */
/* ------------------------------------------------------------------ */

interface PostcodeResult {
  query: string;
  result: {
    postcode: string;
    latitude: number;
    longitude: number;
    admin_district: string | null;
    parliamentary_constituency: string | null;
  } | null;
}

async function bulkLookup(postcodes: string[]): Promise<PostcodeResult[]> {
  const results: PostcodeResult[] = [];
  // Batch into groups of 100 (postcodes.io limit)
  for (let i = 0; i < postcodes.length; i += 100) {
    const batch = postcodes.slice(i, i + 100);
    const res = await fetch("https://api.postcodes.io/postcodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postcodes: batch }),
    });
    if (!res.ok) continue;
    const data = await res.json();
    results.push(...(data.result ?? []));
  }
  return results;
}

/* ------------------------------------------------------------------ */
/*  Haversine distance (metres) for coordinate drift check             */
/* ------------------------------------------------------------------ */

function haversineDist(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ------------------------------------------------------------------ */
/*  Store health types                                                 */
/* ------------------------------------------------------------------ */

interface StoreHealth {
  name: string;
  postcode: string;
  town: string;
  status: "valid" | "invalid" | "no-postcode";
  storedLat: number;
  storedLng: number;
  actualLat: number | null;
  actualLng: number | null;
  driftMetres: number | null;
  district: string | null;
}

interface ProviderReport {
  total: number;
  valid: number;
  invalid: number;
  noPostcode: number;
  significantDrift: number; // > 500m
  stores: StoreHealth[];
}

/* ------------------------------------------------------------------ */
/*  GET — run postcode validation for all static providers             */
/* ------------------------------------------------------------------ */

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Gather all stores with postcodes
  const allStores: {
    provider: string;
    name: string;
    postcode: string;
    town: string;
    lat: number;
    lng: number;
  }[] = [];

  for (const s of MANDS_STORES) {
    allStores.push({
      provider: "mands",
      name: `M&S ${s.town} (${s.slug})`,
      postcode: s.postcode,
      town: s.town,
      lat: s.lat,
      lng: s.lng,
    });
  }

  for (const s of SCRIVENS_STORES) {
    allStores.push({
      provider: "scrivens",
      name: `Scrivens ${s.town}`,
      postcode: s.postcode,
      town: s.town,
      lat: s.lat,
      lng: s.lng,
    });
  }

  for (const s of JIMMY_FAIRLY_STORES) {
    allStores.push({
      provider: "jimmyfairly",
      name: `Jimmy Fairly ${s.name}`,
      postcode: s.postcode,
      town: s.town,
      lat: s.lat,
      lng: s.lng,
    });
  }

  // Ace & Tate has no postcodes — add with flag
  for (const s of ACE_TATE_STORES) {
    allStores.push({
      provider: "aceandtate",
      name: `Ace & Tate ${s.city} (${s.slug})`,
      postcode: "",
      town: s.city,
      lat: s.lat,
      lng: s.lng,
    });
  }

  // Collect unique postcodes for bulk lookup
  const postcodesWithData = allStores.filter((s) => s.postcode);
  const uniquePostcodes = [
    ...new Set(postcodesWithData.map((s) => s.postcode)),
  ];

  // Bulk lookup
  const lookupResults = await bulkLookup(uniquePostcodes);
  const postcodeMap = new Map<string, PostcodeResult["result"]>();
  for (const r of lookupResults) {
    postcodeMap.set(r.query.toUpperCase().replace(/\s+/g, " "), r.result);
  }

  // Build per-provider reports
  const providers: Record<string, ProviderReport> = {};

  for (const store of allStores) {
    if (!providers[store.provider]) {
      providers[store.provider] = {
        total: 0,
        valid: 0,
        invalid: 0,
        noPostcode: 0,
        significantDrift: 0,
        stores: [],
      };
    }
    const report = providers[store.provider];
    report.total++;

    if (!store.postcode) {
      report.noPostcode++;
      report.stores.push({
        name: store.name,
        postcode: "",
        town: store.town,
        status: "no-postcode",
        storedLat: store.lat,
        storedLng: store.lng,
        actualLat: null,
        actualLng: null,
        driftMetres: null,
        district: null,
      });
      continue;
    }

    const normalised = store.postcode.toUpperCase().replace(/\s+/g, " ");
    const result = postcodeMap.get(normalised);

    if (!result) {
      report.invalid++;
      report.stores.push({
        name: store.name,
        postcode: store.postcode,
        town: store.town,
        status: "invalid",
        storedLat: store.lat,
        storedLng: store.lng,
        actualLat: null,
        actualLng: null,
        driftMetres: null,
        district: null,
      });
    } else {
      report.valid++;
      const drift = haversineDist(
        store.lat,
        store.lng,
        result.latitude,
        result.longitude
      );
      if (drift > 500) report.significantDrift++;
      report.stores.push({
        name: store.name,
        postcode: store.postcode,
        town: store.town,
        status: "valid",
        storedLat: store.lat,
        storedLng: store.lng,
        actualLat: result.latitude,
        actualLng: result.longitude,
        driftMetres: Math.round(drift),
        district: result.admin_district,
      });
    }
  }

  // Sort each provider's stores — issues first
  for (const key of Object.keys(providers)) {
    providers[key].stores.sort((a, b) => {
      const order = { invalid: 0, "no-postcode": 1, valid: 2 };
      const diff = order[a.status] - order[b.status];
      if (diff !== 0) return diff;
      // Within valid, sort by drift desc
      return (b.driftMetres ?? 0) - (a.driftMetres ?? 0);
    });
  }

  const totalStores = allStores.length;
  const totalInvalid = Object.values(providers).reduce(
    (sum, p) => sum + p.invalid,
    0
  );
  const totalDrift = Object.values(providers).reduce(
    (sum, p) => sum + p.significantDrift,
    0
  );

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    summary: {
      totalStores,
      totalValid: totalStores - totalInvalid,
      totalInvalid,
      totalSignificantDrift: totalDrift,
    },
    providers,
  });
}
