/* ------------------------------------------------------------------ */
/*  POST /api/get-listed                                               */
/*  1. Geocode postcode via postcodes.io                               */
/*  2. Save to Supabase `optician_listings` table                      */
/*  3. Send branded notification email to hello@eyetest.co.uk          */
/*  4. Send branded thank-you email to applicant                       */
/* ------------------------------------------------------------------ */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getTransporter,
  getFromAddress,
  adminNotificationEmail,
  applicantThankYouEmail,
} from "@/lib/email";

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

    /* ---- Send branded emails via Gmail SMTP ---- */
    const transporter = getTransporter();

    if (transporter) {
      try {
        // Admin notification
        await transporter.sendMail({
          from: getFromAddress(),
          to: "hello@eyetest.co.uk",
          replyTo: email,
          subject: `Listing Application — ${practiceName} (${locationCount || "1"} location${locationCount === "1" ? "" : "s"})`,
          html: adminNotificationEmail({
            practiceName,
            contactName,
            email,
            phone,
            website,
            bookingUrl,
            address,
            postcode,
            town,
            lat,
            lng,
            locationCount: locationCount || "1",
            services: services || [],
            nhsTests: nhsTests ?? false,
            privateTests: privateTests ?? false,
            appointmentSystem: appointmentSystem === "Other"
              ? `Other — ${appointmentSystemOther || "(not specified)"}`
              : appointmentSystem || "Not specified",
            openingHours,
            message,
            audiologyAddon: audiologyAddon ?? false,
            listingId,
          }),
        });

        // Applicant thank-you
        await transporter.sendMail({
          from: getFromAddress(),
          to: email,
          subject: "Thanks for your application — eyetest.co.uk",
          html: applicantThankYouEmail({
            contactName,
            practiceName,
            listingId,
          }),
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
        // Non-fatal — listing is saved
      }
    } else {
      console.warn("GMAIL credentials not set — skipping emails");
    }

    return NextResponse.json({ success: true, listing_id: listingId });
  } catch (error) {
    console.error("Get-listed submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
