import { NextRequest } from "next/server";
import { geocodePostcode } from "@/lib/postcodes";
import { fetchBoots } from "@/lib/providers/boots";
import { fetchAsda } from "@/lib/providers/asda";
import { fetchVisionExpress } from "@/lib/providers/vision-express";
import { fetchMysight, MYSIGHT_SITES } from "@/lib/providers/mysight";
import type { StoreResult, FeaturedProvider } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { haversine } from "@/lib/haversine";

const enc = new TextEncoder();

function line(data: object): Uint8Array {
  return enc.encode(JSON.stringify(data) + "\n");
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

  const applicableRules = (featuredRows ?? []).filter((rule: FeaturedProvider) => {
    const distM = haversine(lat, lng, rule.lat, rule.lng);
    return distM <= rule.radius_km * 1000;
  });

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
    ...["Boots Opticians", "ASDA Opticians", "Vision Express"].filter(enabled),
    ...MYSIGHT_SITES.filter(enabled),
  ];

  const stream = new ReadableStream({
    async start(controller) {
      // Send postcode + active provider list so the frontend knows what to show
      controller.enqueue(
        line({ type: "meta", postcode: geo.postcode, lat, lng, activeProviders })
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
        ...MYSIGHT_SITES.filter((site) => enabled(site)).map(
          (site) => runProvider(site, () => fetchMysight(site, lat, lng, RADIUS, LIMIT))
        ),
      ];

      await Promise.all(providers);

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
