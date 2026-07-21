import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthenticated } from "@/lib/admin-auth";

// GET — subscription summary + paid listings
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  // Fetch all listings that have been through Stripe (not just manual/pending)
  const { data: listings, error } = await supabase
    .from("optician_listings")
    .select("id, practice_name, contact_name, email, phone, postcode, town, tier, active, audiology_addon, audiology_active, stripe_status, stripe_customer_id, stripe_subscription_id, activated_at, expires_at, created_at, badge_label")
    .order("activated_at", { ascending: false, nullsFirst: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also fetch cross-listed audiologist entries
  const { data: crossListings } = await supabase
    .from("audiologist_listings")
    .select("id, practice_name, eyetest_listing_id, active, source, created_at")
    .eq("source", "eyetest-addon");

  // Compute summary stats
  const paid = (listings ?? []).filter(
    (l) => l.stripe_status === "active" || l.stripe_status === "trialing"
  );
  const gold = paid.filter((l) => l.tier === "gold");
  const platinum = paid.filter((l) => l.tier === "platinum");
  const withAddon = paid.filter((l) => l.audiology_addon);
  const pending = (listings ?? []).filter(
    (l) => l.stripe_status === "pending" || !l.stripe_status
  );
  const cancelled = (listings ?? []).filter(
    (l) => l.stripe_status === "cancelled"
  );
  const manual = (listings ?? []).filter(
    (l) => l.stripe_status === "manual"
  );

  // Revenue (annual)
  const GOLD_PRICE = 149;
  const PLATINUM_PRICE = 199;
  const ADDON_PRICE = 69;
  const annualRevenue =
    gold.length * GOLD_PRICE +
    platinum.length * PLATINUM_PRICE +
    withAddon.length * ADDON_PRICE;
  const monthlyEquivalent = Math.round((annualRevenue / 12) * 100) / 100;

  return NextResponse.json({
    summary: {
      totalPaid: paid.length,
      gold: gold.length,
      platinum: platinum.length,
      withAddon: withAddon.length,
      pending: pending.length,
      cancelled: cancelled.length,
      manual: manual.length,
      annualRevenue,
      monthlyEquivalent,
    },
    listings: listings ?? [],
    crossListings: crossListings ?? [],
  });
}
