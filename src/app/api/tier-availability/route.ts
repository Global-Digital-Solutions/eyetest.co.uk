import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { geocodePostcode } from "@/lib/postcodes";
import { haversine } from "@/lib/haversine";

export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface TierStatus {
  available: boolean;
  takenUntil?: string; // ISO date string of the blocking listing's expiry
  takenBy?: string; // practice name (redacted to first word + area)
}

export async function GET(req: NextRequest) {
  const postcode = req.nextUrl.searchParams.get("postcode");
  const excludeId = req.nextUrl.searchParams.get("exclude"); // the current listing's own ID

  if (!postcode) {
    return NextResponse.json({ error: "postcode is required" }, { status: 400 });
  }

  let geo;
  try {
    geo = await geocodePostcode(postcode);
  } catch {
    return NextResponse.json({ error: "Invalid postcode" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: listings } = await supabase
    .from("optician_listings")
    .select("id, tier, lat, lng, radius_km, expires_at, practice_name, postcode")
    .eq("active", true);

  const result: { gold: TierStatus; platinum: TierStatus } = {
    gold: { available: true },
    platinum: { available: true },
  };

  for (const listing of listings ?? []) {
    // Don't let the user's own listing block them
    if (excludeId && listing.id === excludeId) continue;
    if (listing.lat == null || listing.lng == null) continue;

    const distM = haversine(geo.lat, geo.lng, listing.lat, listing.lng);
    const radiusM = listing.radius_km * 1000;

    // Check both directions: does the existing listing's radius cover the new
    // postcode, OR would the new postcode's default radius overlap with the
    // existing listing? We use the existing listing's radius as the boundary.
    if (distM <= radiusM) {
      const tier = listing.tier as "gold" | "platinum";
      result[tier] = {
        available: false,
        takenUntil: listing.expires_at || undefined,
        takenBy: `${listing.practice_name.split(" ")[0]}*** (${listing.postcode})`,
      };
    }
  }

  return NextResponse.json(result);
}
