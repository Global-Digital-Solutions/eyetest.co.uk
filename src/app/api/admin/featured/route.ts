import { NextRequest } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isAuthenticated } from "@/lib/admin-auth";

// Service-role client bypasses RLS — safe here because every handler checks isAuthenticated()
function adminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("featured_providers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ rules: data });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { provider, store_name, store_postcode, lat, lng, radius_km, label, tier } = body;

  if (
    !provider ||
    !radius_km ||
    typeof lat !== "number" ||
    typeof lng !== "number"
  ) {
    return Response.json(
      { error: "provider, lat, lng, radius_km required" },
      { status: 400 }
    );
  }

  const supabase = adminClient();
  const { data, error } = await supabase
    .from("featured_providers")
    .insert({
      provider,
      store_name: store_name ?? null,
      store_postcode: store_postcode ?? null,
      postcode: store_postcode ?? "",
      lat,
      lng,
      radius_km: Number(radius_km),
      label: label || "Recommended",
      tier: tier === "gold" ? "gold" : "platinum",
      active: true,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ rule: data });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, active, tier, label } = await req.json();
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (typeof active === "boolean") updates.active = active;
  if (tier === "gold" || tier === "platinum") updates.tier = tier;
  if (typeof label === "string") updates.label = label;

  const supabase = adminClient();
  const { error } = await supabase
    .from("featured_providers")
    .update(updates)
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) return Response.json({ error: "id required" }, { status: 400 });

  const supabase = adminClient();
  const { error } = await supabase
    .from("featured_providers")
    .delete()
    .eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
