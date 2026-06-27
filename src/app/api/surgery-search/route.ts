import { NextRequest, NextResponse } from "next/server";
import { geocodePostcode } from "@/lib/postcodes";
import { getAllClinics } from "@/data/surgery-providers";
import { haversine } from "@/lib/haversine";

const NEARBY_RADIUS_MILES = 30;
const ALSO_AVAILABLE_LIMIT = 20;
const MILES_TO_METRES = 1609.34;

export async function GET(request: NextRequest) {
  const postcode = request.nextUrl.searchParams.get("postcode");

  if (!postcode || !postcode.trim()) {
    return NextResponse.json(
      { error: "Please provide a postcode to search." },
      { status: 400 },
    );
  }

  /* ---- Geocode the user's postcode ---- */
  let geo;
  try {
    geo = await geocodePostcode(postcode);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Invalid postcode.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  /* ---- Get all clinics and compute distances ---- */
  const allClinics = getAllClinics();

  const withDistance = allClinics.map((clinic) => {
    const distanceMetres = haversine(geo.lat, geo.lng, clinic.lat, clinic.lng);
    const distanceMiles = distanceMetres / MILES_TO_METRES;

    return {
      ...clinic,
      distanceMiles: Math.round(distanceMiles * 10) / 10,
    };
  });

  /* ---- Sort by distance ---- */
  withDistance.sort((a, b) => a.distanceMiles - b.distanceMiles);

  /* ---- Split into nearby and also-available ---- */
  const nearby = withDistance.filter(
    (c) => c.distanceMiles <= NEARBY_RADIUS_MILES,
  );
  const alsoAvailable = withDistance
    .filter((c) => c.distanceMiles > NEARBY_RADIUS_MILES)
    .slice(0, ALSO_AVAILABLE_LIMIT);

  return NextResponse.json({
    postcode: geo.postcode,
    lat: geo.lat,
    lng: geo.lng,
    nearby,
    alsoAvailable,
    totalClinics: allClinics.length,
  });
}
