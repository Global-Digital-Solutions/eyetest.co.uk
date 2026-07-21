import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import {
  getTransporter,
  getFromAddress,
  paymentConfirmationEmail,
} from "@/lib/email";

// Use service role for webhooks (no auth context)
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

  const supabase = getSupabaseAdmin();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as {
        metadata?: Record<string, string>;
        customer: string;
        subscription: string;
        customer_email?: string;
      };
      const listingId = session.metadata?.listing_id;
      const tier = session.metadata?.tier as "gold" | "platinum";
      const audiologyAddon = session.metadata?.audiology_addon === "true";

      if (listingId) {
        const activatedAt = new Date();
        const expiresAt = new Date(activatedAt);
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);

        // Activate the listing
        const { error: updateError } = await supabase
          .from("optician_listings")
          .update({
            tier,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            stripe_status: "active",
            active: true,
            activated_at: activatedAt.toISOString(),
            expires_at: expiresAt.toISOString(),
            audiology_addon: audiologyAddon,
            audiology_active: audiologyAddon,
            badge_label: tier === "platinum" ? "Top Rated" : "Recommended",
          })
          .eq("id", listingId);

        if (updateError) {
          console.error("Failed to activate listing:", updateError);
        }

        // Fetch full listing data (needed for email + cross-listing)
        const { data: listing } = await supabase
          .from("optician_listings")
          .select("*")
          .eq("id", listingId)
          .single();

        // Send post-payment confirmation email
        if (listing) {
          try {
            const transporter = getTransporter();
            if (transporter) {
              await transporter.sendMail({
                from: getFromAddress(),
                to: listing.email,
                subject: `Your ${tier === "platinum" ? "Platinum" : "Gold"} listing is live — ${listing.practice_name}`,
                html: paymentConfirmationEmail({
                  contactName: listing.contact_name,
                  practiceName: listing.practice_name,
                  tier,
                  audiologyAddon,
                  postcode: listing.postcode,
                  listingId,
                }),
              });
            }
          } catch (emailErr) {
            console.error("Post-payment confirmation email failed:", emailErr);
          }

          // Cross-list on hearingtest.co.uk if audiology add-on purchased
          if (audiologyAddon) {
            try {
              const { error: crossListError } = await supabase
                .from("audiologist_listings")
                .insert({
                  practice_name: listing.practice_name,
                  contact_name: listing.contact_name,
                  email: listing.email,
                  phone: listing.phone,
                  booking_system: listing.appointment_system || null,
                  location_count: listing.location_count || "1",
                  message: `Cross-listed from eyetest.co.uk (listing ${listingId})`,
                  active: true,
                  source: "eyetest-addon",
                  eyetest_listing_id: listingId,
                });

              if (crossListError) {
                console.error("Hearingtest cross-listing failed:", crossListError);
              } else {
                console.log(`Cross-listed ${listing.practice_name} on hearingtest.co.uk`);
              }
            } catch (crossErr) {
              console.error("Hearingtest cross-listing error:", crossErr);
            }
          }
        }
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as { id: string; status: string; current_period_end?: number };
      const { error: findError, data: listings } = await supabase
        .from("optician_listings")
        .select("id")
        .eq("stripe_subscription_id", subscription.id);

      if (!findError && listings?.length) {
        const status = subscription.status;
        const updateData: Record<string, unknown> = {
          stripe_status: status,
          active: status === "active" || status === "trialing",
        };

        // Update expires_at from Stripe's current_period_end
        if (subscription.current_period_end) {
          updateData.expires_at = new Date(subscription.current_period_end * 1000).toISOString();
        }

        await supabase
          .from("optician_listings")
          .update(updateData)
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as { id: string };

      // Find the listing before deactivating (need ID for cross-listing cleanup)
      const { data: cancelledListings } = await supabase
        .from("optician_listings")
        .select("id, audiology_addon")
        .eq("stripe_subscription_id", subscription.id);

      await supabase
        .from("optician_listings")
        .update({
          stripe_status: "cancelled",
          active: false,
          audiology_active: false,
        })
        .eq("stripe_subscription_id", subscription.id);

      // Deactivate any cross-listed hearingtest entries
      if (cancelledListings?.length) {
        for (const cl of cancelledListings) {
          if (cl.audiology_addon) {
            await supabase
              .from("audiologist_listings")
              .update({ active: false })
              .eq("eyetest_listing_id", cl.id);
          }
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
