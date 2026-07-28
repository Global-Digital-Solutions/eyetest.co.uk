import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isAuthenticated } from "@/lib/admin-auth";

// Service-role client bypasses RLS — safe here because every handler checks isAuthenticated()
function adminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET — list all optician listings
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("optician_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST — create a new listing manually (admin)
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = adminClient();

  // Geocode postcode if provided
  let lat = body.lat || null;
  let lng = body.lng || null;
  if (body.postcode && !lat) {
    try {
      const geoRes = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(body.postcode)}`);
      const geoData = await geoRes.json();
      if (geoData.status === 200) {
        lat = geoData.result.latitude;
        lng = geoData.result.longitude;
      }
    } catch { /* non-fatal */ }
  }

  const { data, error } = await supabase
    .from("optician_listings")
    .insert({
      practice_name: body.practice_name,
      contact_name: body.contact_name || "Admin",
      email: body.email || "",
      phone: body.phone || "",
      website: body.website || null,
      booking_url: body.booking_url || null,
      address: body.address || null,
      postcode: body.postcode,
      town: body.town || null,
      lat,
      lng,
      services: body.services || [],
      nhs_tests: body.nhs_tests || false,
      private_tests: body.private_tests || false,
      opening_hours: body.opening_hours || null,
      tier: body.tier || "gold",
      radius_km: body.radius_km || 8,
      badge_label: body.badge_label || (body.tier === "platinum" ? "Top Rated" : "Recommended"),
      active: body.active || false,
      audiology_addon: body.audiology_addon || false,
      audiology_active: body.audiology_active || false,
      stripe_status: body.active ? "manual" : "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PATCH — update a listing
export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // If postcode changed, re-geocode
  if (updates.postcode) {
    try {
      const geoRes = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(updates.postcode)}`);
      const geoData = await geoRes.json();
      if (geoData.status === 200) {
        updates.lat = geoData.result.latitude;
        updates.lng = geoData.result.longitude;
      }
    } catch { /* non-fatal */ }
  }

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("optician_listings")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE — remove a listing
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = adminClient();
  const { error } = await supabase
    .from("optician_listings")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
