/* ------------------------------------------------------------------ */
/*  POST /api/get-listed                                               */
/*  1. Geocode postcode via postcodes.io                               */
/*  2. Save to Supabase `optician_listings` table                      */
/*  3. Send notification email to hello@eyetest.co.uk                  */
/*  4. Send thank-you email to applicant                               */
/*                                                                      */
/*  Requires env vars:                                                  */
/*    GMAIL_USER         — e.g. hello@eyetest.co.uk                    */
/*    GMAIL_APP_PASSWORD — Google App Password                         */
/*    NEXT_PUBLIC_SUPABASE_URL                                          */
/*    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY                              */
/* ------------------------------------------------------------------ */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      practiceName,
      contactName,
      email,
      phone,
      website,
      bookingUrl,
      address,
      postcode,
      town,
      locationCount,
      services,
      nhsTests,
      privateTests,
      appointmentSystem,
      appointmentSystemOther,
      openingHours,
      message,
      audiologyAddon,
    } = data;

    /* ---- Validate required fields ---- */
    if (!practiceName || !contactName || !email || !phone || !address || !postcode || !town) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---- Geocode postcode via postcodes.io ---- */
    let lat: number | null = null;
    let lng: number | null = null;

    try {
      const clean = postcode.replace(/\s/g, "").toUpperCase();
      const geoRes = await fetch(`https://api.postcodes.io/postcodes/${clean}`);
      const geoData = await geoRes.json();

      if (geoData.status === 200 && geoData.result) {
        lat = geoData.result.latitude;
        lng = geoData.result.longitude;
      } else if (geoData.terminated?.latitude && geoData.terminated?.longitude) {
        lat = geoData.terminated.latitude;
        lng = geoData.terminated.longitude;
      }
    } catch (geoErr) {
      // Non-fatal: we still save the listing, just without coordinates
      console.warn("Postcode geocoding failed:", geoErr);
    }

    /* ---- Save to Supabase ---- */
    const supabase = await createClient();

    const { data: listing, error: dbError } = await supabase
      .from("optician_listings")
      .insert({
        practice_name: practiceName,
        contact_name: contactName,
        email,
        phone,
        website: website || null,
        booking_url: bookingUrl || null,
        address: address || null,
        postcode,
        town: town || null,
        lat,
        lng,
        services: services || [],
        nhs_tests: nhsTests ?? false,
        private_tests: privateTests ?? false,
        opening_hours: openingHours || null,
        location_count: locationCount || "1",
        appointment_system: appointmentSystem || null,
        appointment_system_other:
          appointmentSystem === "Other" ? (appointmentSystemOther || null) : null,
        message: message || null,
        audiology_addon: audiologyAddon ?? false,
        active: false,
        stripe_status: "none",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save listing" },
        { status: 500 }
      );
    }

    const listingId = listing.id;

    /* ---- Build appointment system display ---- */
    const systemDisplay =
      appointmentSystem === "Other"
        ? `Other — ${appointmentSystemOther || "(not specified)"}`
        : appointmentSystem || "Not specified";

    /* ---- Build notification email body ---- */
    const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #0d1b3e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fff; font-size: 20px; margin: 0;">New Listing Application</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">Submitted via eyetest.co.uk/get-listed</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px; margin-top: 0;">Practice Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 160px;">Practice name:</td><td style="padding: 6px 0; font-weight: 600;">${practiceName}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Contact name:</td><td style="padding: 6px 0;">${contactName}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0ea5a0;">${email}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone:</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #0ea5a0;">${phone}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Website:</td><td style="padding: 6px 0;">${website ? `<a href="${website}" style="color: #0ea5a0;">${website}</a>` : "(not provided)"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Booking URL:</td><td style="padding: 6px 0;">${bookingUrl ? `<a href="${bookingUrl}" style="color: #0ea5a0;">${bookingUrl}</a>` : "(not provided)"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Location</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 160px;">Address:</td><td style="padding: 6px 0;">${address}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Postcode:</td><td style="padding: 6px 0; font-weight: 600;">${postcode}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Town/City:</td><td style="padding: 6px 0;">${town}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Coordinates:</td><td style="padding: 6px 0;">${lat && lng ? `${lat}, ${lng}` : "(geocoding failed)"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Number of locations:</td><td style="padding: 6px 0; font-weight: 600;">${locationCount || "1"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Services & Systems</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 160px;">Services:</td><td style="padding: 6px 0;">${services && services.length > 0 ? services.join(", ") : "(none selected)"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">NHS tests:</td><td style="padding: 6px 0; font-weight: 600;">${nhsTests ? "Yes" : "No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Private tests:</td><td style="padding: 6px 0; font-weight: 600;">${privateTests ? "Yes" : "No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Appointment system:</td><td style="padding: 6px 0; font-weight: 600;">${systemDisplay}</td></tr>
    </table>

    ${openingHours ? `
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Opening Hours</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${openingHours}</p>
    ` : ""}

    ${message ? `
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Additional Information</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${message}</p>
    ` : ""}

    ${audiologyAddon ? `
    <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: 600;">
        &#128266; Also interested in hearingtest.co.uk listing (+&pound;49/year)
      </p>
    </div>
    ` : ""}

    <div style="background: #f0fdfa; border: 1px solid #0ea5a0; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        Listing ID: <strong>${listingId}</strong><br/>
        This application was submitted via <a href="https://www.eyetest.co.uk/get-listed" style="color: #0ea5a0;">eyetest.co.uk/get-listed</a>.
      </p>
    </div>

  </div>
</div>`;

    /* ---- Build thank-you email for applicant ---- */
    const thankYouHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #0d1b3e; padding: 24px 32px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #fff; font-size: 22px; margin: 0;">Thank you for your application</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">eyetest.co.uk</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
    <p style="font-size: 15px; line-height: 1.7; margin-top: 0;">
      Hi ${contactName},
    </p>
    <p style="font-size: 15px; line-height: 1.7;">
      Thank you for applying to get <strong>${practiceName}</strong> listed on eyetest.co.uk. We&rsquo;ve received your details and our team is reviewing your application.
    </p>

    <div style="background: #f0fdfa; border-left: 4px solid #0ea5a0; border-radius: 0 8px 8px 0; padding: 20px; margin: 24px 0;">
      <h3 style="font-size: 15px; color: #0d1b3e; margin: 0 0 12px;">What happens next?</h3>
      <ol style="font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px; color: #555;">
        <li>Our team will review your application (usually within 2 business days)</li>
        <li>We&rsquo;ll be in touch to discuss your listing options and choose the right tier for your practice</li>
        <li>Once set up, your listing goes live and patients in your area can find and book with you</li>
      </ol>
    </div>

    <p style="font-size: 15px; line-height: 1.7;">
      You can view your application status any time at:
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="https://www.eyetest.co.uk/get-listed/thank-you?listing_id=${listingId}" style="display: inline-block; background: #0ea5a0; color: #fff; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 999px; text-decoration: none;">
        View Your Application
      </a>
    </p>

    <p style="font-size: 15px; line-height: 1.7;">
      If you have any questions in the meantime, just reply to this email or contact us at
      <a href="mailto:hello@eyetest.co.uk" style="color: #0ea5a0;">hello@eyetest.co.uk</a>.
    </p>

    <p style="font-size: 15px; line-height: 1.7; margin-bottom: 0;">
      Best regards,<br/>
      <strong>The eyetest.co.uk Team</strong>
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
    <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
      eyetest.co.uk &mdash; The UK&rsquo;s Eye Test Comparison Platform<br/>
      <a href="https://www.eyetest.co.uk" style="color: #0ea5a0;">www.eyetest.co.uk</a>
    </p>
  </div>
</div>`;

    /* ---- Send emails via Gmail SMTP ---- */
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error("GMAIL_USER or GMAIL_APP_PASSWORD not set");
      // Still return success since we saved to Supabase
      return NextResponse.json({ success: true, listing_id: listingId });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Send notification email to hello@eyetest.co.uk
    await transporter.sendMail({
      from: `"eyetest.co.uk" <${gmailUser}>`,
      to: "hello@eyetest.co.uk",
      replyTo: email,
      subject: `Listing Application — ${practiceName} (${locationCount || "1"} location${locationCount === "1" ? "" : "s"})`,
      html: htmlBody,
    });

    // Send thank-you email to the applicant
    await transporter.sendMail({
      from: `"eyetest.co.uk" <${gmailUser}>`,
      to: email,
      subject: "Thanks for your application — eyetest.co.uk",
      html: thankYouHtml,
    });

    return NextResponse.json({ success: true, listing_id: listingId });
  } catch (error) {
    console.error("Get-listed submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
