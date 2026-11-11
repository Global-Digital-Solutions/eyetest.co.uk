/**
 * Snapshot of real optician practices in and around each town page.
 *
 * Uses the same live lookups as the site search (each optician's own store
 * and booking systems) and writes src/data/store-snapshot.json. Brand-in-town
 * pages use the snapshot to decide whether a brand has a practice in a town,
 * to list those practices and to output Optician schema for each one.
 *
 * Run:  npx tsx scripts/snapshot-stores.ts
 * Add --resume to carry on from a part-finished run (towns already in the
 * file are skipped), or --towns=leeds,york to re-check particular towns. Then commit src/data/store-snapshot.json.
 * Re-run monthly.
 */
import { writeFileSync, readFileSync, existsSync } from "fs";
import { locations } from "@/data/locations";
import { fetchVisionExpress } from "@/lib/providers/vision-express";
import { fetchMysight } from "@/lib/providers/mysight";
import { fetchMandS } from "@/lib/providers/mands";
import { fetchAceAndTate } from "@/lib/providers/aceandtate";
import { fetchScrivens } from "@/lib/providers/scrivens";
import { fetchJimmyFairly } from "@/lib/providers/jimmyfairly";
import type { StoreResult } from "@/lib/types";
import { haversine } from "@/lib/haversine";

/**
 * Boots and Asda store lists without slot paging. The site search's fetchers
 * page through appointment availability, which takes minutes per town; here
 * we only need the practices, so ask for a few at a time and stop at the radius.
 */
const OCUCO = {
  boots: {
    provider: "Boots Opticians",
    visitType: "b0a9995e-0332-411d-ad7c-e9aa1590d639",
    origin: "https://omniui-boots-pupz.bootsopticians.com",
    booking: (id: unknown) => `https://omniui-boots-pupz.bootsopticians.com/en-GB/book-an-appointment?siteId=${id}`,
  },
  asda: {
    provider: "ASDA Opticians",
    visitType: "bb89cb89-805a-405e-817c-58a430b9585f",
    origin: "https://opticians.asda.com",
    booking: (id: unknown) => `https://opticians.asda.com/book-an-appointment?siteId=${id}`,
  },
};

async function ocucoSites(
  which: keyof typeof OCUCO,
  lat: number,
  lng: number,
  radius: number
): Promise<StoreResult[]> {
  const cfg = OCUCO[which];
  const out: StoreResult[] = [];
  for (let offset = 0; offset < 5; offset++) {
    const url = new URL("https://eu.oh.ocuco.com/api/omni/v303/site/availableappointmentslots");
    url.searchParams.set("originLatitude", String(lat));
    url.searchParams.set("originLongitude", String(lng));
    url.searchParams.set("visitTypeId", cfg.visitType);
    url.searchParams.set("window", "6");
    url.searchParams.set("offset", String(offset));
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        Origin: cfg.origin,
        Referer: cfg.origin + "/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) throw new Error(`${cfg.provider} API error: ${res.status}`);
    const json = await res.json();
    const data = (json.data ?? []) as { site?: Record<string, unknown> }[];
    if (!data.length) break;
    for (const item of data) {
      const site = item.site ?? {};
      const distM = Number(site.distanceFromOriginKms ?? 0) * 1000;
      if (distM > radius) return out;
      out.push({
        provider: cfg.provider,
        storeName: String(site.name ?? cfg.provider),
        address: [site.address1, site.address2].filter(Boolean).map(String).join(", "),
        postcode: String(site.postalCode ?? ""),
        town: String(site.city ?? ""),
        phone: String(site.phoneNumber ?? ""),
        distanceM: Math.round(distM),
        slotsAvailable: null,
        nextAvailable: null,
        bookingUrl: cfg.booking(site.siteId),
        lat: Number(site.latitude) || undefined,
        lng: Number(site.longitude) || undefined,
      });
    }
    if (data.length < 6) break;
  }
  return out;
}

type Fetcher = (lat: number, lng: number, radius: number, limit: number) => Promise<StoreResult[]>;

/** Brand slug (as used in src/data/opticians.ts) -> live lookup */
const FETCHERS: Record<string, Fetcher> = {
  "boots-opticians": (lat, lng, r) => ocucoSites("boots", lat, lng, r),
  "asda-opticians": (lat, lng, r) => ocucoSites("asda", lat, lng, r),
  "vision-express": fetchVisionExpress,
  "mands-opticians": fetchMandS,
  "ace-and-tate": fetchAceAndTate,
  scrivens: fetchScrivens,
  "jimmy-fairly": fetchJimmyFairly,
  leightons: (lat, lng, r, l) => fetchMysight("leightons.mysight.uk", lat, lng, r, l),
  rawlings: (lat, lng, r, l) => fetchMysight("rawlingsopticians.mysight.uk", lat, lng, r, l),
  bayfields: (lat, lng, r, l) => fetchMysight("bayfieldsopticians.mysight.uk", lat, lng, r, l),
  "duncan-and-todd": (lat, lng, r, l) => fetchMysight("duncanandtodd.mysight.uk", lat, lng, r, l),
};

export type SnapshotStore = {
  name: string;
  address: string;
  postcode: string;
  phone: string;
  lat?: number;
  lng?: number;
  bookingUrl: string;
  distanceM: number;
};

export type StoreSnapshot = {
  generated: string;
  /** brands the snapshot covers; other brands fall back to hand-checked lists */
  brands: string[];
  towns: Record<string, Record<string, SnapshotStore[]>>;
};

/** How far from the town centre counts as "in and around" the town */
function radiusFor(population: number): number {
  if (population >= 1_000_000) return 12_000;
  if (population >= 300_000) return 8_000;
  return 6_000;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`timed out after ${ms / 1000}s`)), ms)),
  ]);
}

async function withRetry<T>(fn: () => Promise<T>, tries = 2): Promise<T> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await withTimeout(fn(), 150_000);
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  throw last;
}

async function main() {
  const out = "src/data/store-snapshot.json";
  const previous: StoreSnapshot | null = existsSync(out)
    ? JSON.parse(readFileSync(out, "utf8"))
    : null;

  const resume = process.argv.includes("--resume");
  const snapshot: StoreSnapshot = {
    generated: new Date().toISOString().slice(0, 10),
    brands: Object.keys(FETCHERS),
    towns: resume && previous ? { ...previous.towns } : {},
  };
  const done = new Set(resume && previous ? Object.keys(previous.towns) : []);
  const failures: string[] = [];
  const save = () => writeFileSync(out, JSON.stringify(snapshot, null, 1) + "\n");

  async function doTown(loc: (typeof locations)[number]) {
    const radius = radiusFor(loc.population);
    const town: Record<string, SnapshotStore[]> = {};
    await Promise.all(
      Object.entries(FETCHERS).map(async ([brand, fetcher]) => {
        try {
          const raw = await withRetry(() => fetcher(loc.lat, loc.lng, radius, 25));
          // Some lookups return 0 or approximate distances, so measure from
          // each practice's own map position where we have it
          const res = raw.map((s) =>
            s.lat && s.lng ? { ...s, distanceM: haversine(loc.lat, loc.lng, s.lat, s.lng) } : s
          );
          const seen = new Set<string>();
          town[brand] = res
            .filter((s) => s.distanceM <= radius)
            .filter((s) => {
              const k = `${s.storeName}|${s.postcode}`;
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            })
            .sort((a, b) => a.distanceM - b.distanceM)
            .map((s) => ({
              name: s.storeName,
              address: s.address,
              postcode: s.postcode,
              phone: s.phone,
              lat: s.lat,
              lng: s.lng,
              bookingUrl: s.bookingUrl,
              distanceM: Math.round(s.distanceM),
            }));
        } catch (e) {
          // Keep the last good result rather than dropping a brand from a town
          failures.push(`${brand}/${loc.slug}: ${(e as Error).message}`);
          const prev = previous?.towns?.[loc.slug]?.[brand];
          if (prev) town[brand] = prev;
        }
      })
    );
    snapshot.towns[loc.slug] = town;
    save();
    const count = Object.values(town).reduce((n, s) => n + s.length, 0);
    console.log(`${loc.slug}: ${count} practices`);
  }

  // --towns=a,b re-checks just those towns (other towns are kept as they are)
  const only = process.argv.find((a) => a.startsWith("--towns="))?.slice(8).split(",");
  if (only && previous) Object.assign(snapshot.towns, previous.towns);
  const queue = only
    ? locations.filter((l) => only.includes(l.slug))
    : locations.filter((l) => !done.has(l.slug));
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) await doTown(queue.shift()!);
  });
  await Promise.all(workers);

  writeFileSync(out, JSON.stringify(snapshot, null, 1) + "\n");
  console.log(`\nWrote ${out}`);
  if (failures.length) {
    console.log(`\n${failures.length} lookups failed (previous data kept where available):`);
    for (const f of failures) console.log("  " + f);
  }
}

main();
