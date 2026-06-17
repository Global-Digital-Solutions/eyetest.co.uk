/* ------------------------------------------------------------------ */
/*  POST /api/get-listed                                               */
/*  Receives optician listing application and sends a formatted email  */
/*  to hello@eyetest.co.uk via Gmail SMTP (Nodemailer).                */
/*                                                                      */
/*  Requires env vars:                                                  */
/*    GMAIL_USER         — e.g. hello@eyetest.co.uk                    */
/*    GMAIL_APP_PASSWORD — Google App Password                         */
/* ------------------------------------------------------------------ */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      practiceName,
      contactName,
      email,
      phone,
      locationCount,
      website,
      appointmentSystem,
      appointmentSystemOther,
      services,
      message,
    } = data;

    /* ---- Validate required fields ---- */
    if (!practiceName || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---- Build appointment system display ---- */
    const systemDisplay =
      appointmentSystem === "Other"
        ? `Other — ${appointmentSystemOther || "(not specified)"}`
        : appointmentSystem || "Not specified";

    /* ---- Build email body ---- */
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
      <tr><td style="padding: 6px 0; color: #666;">Number of locations:</td><td style="padding: 6px 0; font-weight: 600;">${locationCount || "1"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Website:</td><td style="padding: 6px 0;">${website ? `<a href="${website}" style="color: #0ea5a0;">${website}</a>` : "(not provided)"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Appointment System</h2>
    <p style="margin: 12px 0 24px; font-weight: 600;">${systemDisplay}</p>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Services Offered</h2>
    <p style="margin: 12px 0 24px;">${services && services.length > 0 ? services.join(", ") : "(none selected)"}</p>

    ${message ? `
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Additional Information</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${message}</p>
    ` : ""}

    <div style="background: #f0fdfa; border: 1px solid #0ea5a0; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        This application was submitted via <a href="https://www.eyetest.co.uk/get-listed" style="color: #0ea5a0;">eyetest.co.uk/get-listed</a>.
      </p>
    </div>

  </div>
</div>`;

    /* ---- Send via Gmail SMTP ---- */
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error("GMAIL_USER or GMAIL_APP_PASSWORD not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"eyetest.co.uk" <${gmailUser}>`,
      to: "hello@eyetest.co.uk",
      replyTo: email,
      subject: `Listing Application — ${practiceName} (${locationCount || "1"} location${locationCount === "1" ? "" : "s"})`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Get-listed submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
