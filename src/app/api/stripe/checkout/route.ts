import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { listingId, tier, audiologyAddon } = body as {
      listingId: string;
      tier: "gold" | "platinum";
      audiologyAddon: boolean;
    };

    if (!listingId || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: listing, error } = await supabase
      .from("optician_listings")
      .select("*")
      .eq("id", listingId)
      .single();

    if (error || !listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Build line items
    const line_items: Array<{ price: string; quantity: number }> = [
      {
        price: tier === "platinum" ? PRICES.platinum : PRICES.gold,
        quantity: 1,
      },
    ];

    if (audiologyAddon) {
      line_items.push({
        price: PRICES.audiology,
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: listing.email,
      line_items,
      metadata: {
        listing_id: listingId,
        tier,
        audiology_addon: audiologyAddon ? "true" : "false",
      },
      success_url: `${req.nextUrl.origin}/get-listed/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/get-listed/thank-you?listing_id=${listingId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
