import { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { geocodePostcode } from "@/lib/postcodes";
import { fetchBoots } from "@/lib/providers/boots";
import { fetchAsda } from "@/lib/providers/asda";
import { fetchVisionExpress } from "@/lib/providers/vision-express";
import { fetchMysight } from "@/lib/providers/mysight";

// Must match the search route's fetch window, otherwise admins could pin a
// store here that the public search would never return.
// See app/api/search/route.ts
const MAIN_RADIUS = 15000;
const MYSIGHT_RADIUS = 25000;
const LIMIT = 10;

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = req.nextUrl.searchParams.get("provider");
  const postcode = req.nextUrl.searchParams.get("postcode");

  if (!provider || !postcode) {
    return Response.json({ error: "provider and postcode required" }, { status: 400 });
  }

  let geo;
  try {
    geo = await geocodePostcode(postcode);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Invalid postcode" },
      { status: 400 }
    );
  }

  const { lat, lng } = geo;

  try {
    let stores;
    if (provider === "Boots Opticians") {
      stores = await fetchBoots(lat, lng, MAIN_RADIUS, LIMIT);
    } else if (provider === "ASDA Opticians") {
      stores = await fetchAsda(lat, lng, MAIN_RADIUS, LIMIT);
    } else if (provider === "Vision Express") {
      stores = await fetchVisionExpress(lat, lng, MAIN_RADIUS, LIMIT);
    } else if (provider.endsWith(".mysight.uk")) {
      stores = await fetchMysight(provider, lat, lng, MYSIGHT_RADIUS, LIMIT);
    } else {
      return Response.json({ error: "Unknown provider" }, { status: 400 });
    }

    return Response.json({ stores });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to fetch stores" },
      { status: 500 }
    );
  }
}
