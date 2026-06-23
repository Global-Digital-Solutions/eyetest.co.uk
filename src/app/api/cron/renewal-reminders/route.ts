/* ------------------------------------------------------------------ */
/*  GET /api/cron/renewal-reminders                                    */
/*  Runs daily via Vercel Cron. Finds active listings expiring within  */
/*  30 days and sends branded renewal reminder emails.                 */
/*                                                                      */
/*  Also sends a second reminder at 7 days before expiry.              */
/*                                                                      */
/*  Uses a `last_renewal_reminder_at` column to avoid duplicate sends. */
/*  Requires CRON_SECRET env var to prevent unauthorized access.       */
/* ------------------------------------------------------------------ */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getTransporter,
  getFromAddress,
  renewalReminderEmail,
} from "@/lib/email";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transporter = getTransporter();
  if (!transporter) {
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();
  const now = new Date();
  const in30Days = new Date(now);
  in30Days.setDate(in30Days.getDate() + 30);

  // Find all active listings with an expiry within the next 30 days
  const { data: listings, error } = await supabase
    .from("optician_listings")
    .select("id, contact_name, practice_name, email, tier, postcode, expires_at, last_renewal_reminder_at")
    .eq("active", true)
    .eq("stripe_status", "active")
    .not("expires_at", "is", null)
    .lte("expires_at", in30Days.toISOString())
    .gt("expires_at", now.toISOString()); // not already expired

  if (error) {
    console.error("Renewal reminder query failed:", error);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }

  let sent = 0;
  let skipped = 0;

  for (const listing of listings ?? []) {
    const expiresAt = new Date(listing.expires_at);
    const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Decide which reminder to send based on days remaining
    // 30-day reminder: send when 25-30 days remain
    // 7-day reminder: send when 5-7 days remain
    const is30DayWindow = daysUntilExpiry >= 25 && daysUntilExpiry <= 30;
    const is7DayWindow = daysUntilExpiry >= 5 && daysUntilExpiry <= 7;

    if (!is30DayWindow && !is7DayWindow) {
      skipped++;
      continue;
    }

    // Check if we already sent a reminder in this window
    const lastReminder = listing.last_renewal_reminder_at
      ? new Date(listing.last_renewal_reminder_at)
      : null;

    if (lastReminder) {
      const daysSinceLastReminder = Math.ceil(
        (now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60 * 24)
      );
      // Don't send more than one reminder per 20-day period
      // (allows 30-day and 7-day reminders but prevents duplicates)
      if (daysSinceLastReminder < 20) {
        skipped++;
        continue;
      }
    }

    try {
      await transporter.sendMail({
        from: getFromAddress(),
        to: listing.email,
        subject: `Your listing renews in ${daysUntilExpiry} days — ${listing.practice_name}`,
        html: renewalReminderEmail({
          contactName: listing.contact_name,
          practiceName: listing.practice_name,
          tier: listing.tier as "gold" | "platinum",
          daysUntilExpiry,
          expiresAt: listing.expires_at,
          postcode: listing.postcode,
        }),
      });

      // Record that we sent a reminder
      await supabase
        .from("optician_listings")
        .update({ last_renewal_reminder_at: now.toISOString() })
        .eq("id", listing.id);

      sent++;
    } catch (emailErr) {
      console.error(`Renewal reminder failed for ${listing.id}:`, emailErr);
    }
  }

  return NextResponse.json({
    success: true,
    checked: listings?.length ?? 0,
    sent,
    skipped,
    timestamp: now.toISOString(),
  });
}
