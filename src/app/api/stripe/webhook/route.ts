import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

// Use service role for webhooks (no auth context)
// Lazy-init so the build doesn't crash when env vars aren't set locally
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: { type: string; data: { object: any } };

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET) as typeof event;
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as {
        metadata?: Record<string, string>;
        customer: string;
        subscription: string;
      };
      const listingId = session.metadata?.listing_id;
      const tier = session.metadata?.tier as "gold" | "platinum";
      const audiologyAddon = session.metadata?.audiology_addon === "true";

      if (listingId) {
        await getSupabaseAdmin()
          .from("optician_listings")
          .update({
            tier,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            stripe_status: "active",
            active: true,
            activated_at: new Date().toISOString(),
            audiology_addon: audiologyAddon,
            audiology_active: audiologyAddon,
            badge_label: tier === "platinum" ? "Top Rated" : "Recommended",
          })
          .eq("id", listingId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as { id: string; status: string };
      const supabase = getSupabaseAdmin();
      const { error: findError, data: listings } = await supabase
        .from("optician_listings")
        .select("id")
        .eq("stripe_subscription_id", subscription.id);

      if (!findError && listings?.length) {
        const status = subscription.status;
        await getSupabaseAdmin()
          .from("optician_listings")
          .update({
            stripe_status: status,
            active: status === "active" || status === "trialing",
          })
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as { id: string };
      await getSupabaseAdmin()
        .from("optician_listings")
        .update({
          stripe_status: "cancelled",
          active: false,
          audiology_active: false,
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
