import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { MYSIGHT_SITES } from "@/lib/providers/mysight";

export const MAIN_PROVIDERS = [
  "Boots Opticians",
  "ASDA Opticians",
  "Vision Express",
];

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("providers")
    .select("name, enabled");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const config: Record<string, boolean> = {};
  for (const row of rows ?? []) {
    config[row.name] = row.enabled;
  }

  // Ensure all known providers appear (default true if missing from DB)
  for (const p of [...MAIN_PROVIDERS, ...MYSIGHT_SITES]) {
    if (!(p in config)) config[p] = true;
  }

  return Response.json({
    config,
    mainProviders: MAIN_PROVIDERS,
    mysightSites: MYSIGHT_SITES,
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { provider, enabled } = await req.json();

  const supabase = await createClient();
  const { error } = await supabase
    .from("providers")
    .upsert({ name: provider, enabled: Boolean(enabled) }, { onConflict: "name" });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
