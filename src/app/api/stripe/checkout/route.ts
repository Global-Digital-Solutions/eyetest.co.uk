import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    /* Guard: Stripe must be configured */
    if (!stripe) {
      console.error("Stripe checkout error: stripe SDK not initialised (STRIPE_SECRET_KEY missing?)");
      return NextResponse.json(
        { error: "Payment system is not configured. Please contact support." },
        { status: 503 }
      );
    }
    if (!PRICES.gold || !PRICES.platinum) {
      console.error("Stripe checkout error: price IDs missing (STRIPE_PRICE_GOLD / STRIPE_PRICE_PLATINUM env vars)");
      return NextResponse.json(
        { error: "Payment plans are not configured. Please contact support." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { listingId, tier, audiologyAddon } = body as {
      listingId: string;
      tier: "gold" | "platinum";
      audiologyAddon: boolean;
    };

    if (!listingId || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    /* Service role bypasses RLS */
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
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
      allow_promotion_codes: true,
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
