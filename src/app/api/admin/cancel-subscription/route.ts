import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId } = (await req.json()) as { listingId?: string };

  if (!listingId) {
    return NextResponse.json(
      { error: "listingId is required" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Fetch the listing
  const { data: listing, error: fetchError } = await supabase
    .from("optician_listings")
    .select(
      "id, practice_name, stripe_subscription_id, audiology_addon, active"
    )
    .eq("id", listingId)
    .single();

  if (fetchError || !listing) {
    return NextResponse.json(
      { error: "Listing not found" },
      { status: 404 }
    );
  }

  // Cancel the Stripe subscription if one exists
  if (listing.stripe_subscription_id && stripe) {
    try {
      await stripe.subscriptions.cancel(listing.stripe_subscription_id);
    } catch (err) {
      // If already cancelled in Stripe, that's fine — continue deactivating
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes("No such subscription") && !msg.includes("already been canceled")) {
        console.error("Stripe cancellation failed:", msg);
        return NextResponse.json(
          { error: `Stripe error: ${msg}` },
          { status: 500 }
        );
      }
    }
  }

  // Deactivate the listing
  const { error: updateError } = await supabase
    .from("optician_listings")
    .update({
      active: false,
      stripe_status: "cancelled",
      audiology_active: false,
    })
    .eq("id", listingId);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  // Deactivate any cross-listed hearingtest entries
  if (listing.audiology_addon) {
    await supabase
      .from("audiologist_listings")
      .update({ active: false })
      .eq("eyetest_listing_id", listingId);
  }

  return NextResponse.json({
    success: true,
    message: `Cancelled subscription and deactivated ${listing.practice_name}`,
  });
}
