/* ------------------------------------------------------------------ */
/*  POST /api/surgery-enquiry                                          */
/*  Receives eye surgery enquiry form data and sends an email          */
/*  notification to hello@eyetest.co.uk via Gmail SMTP (Nodemailer).   */
/*                                                                      */
/*  Requires env vars:                                                  */
/*    GMAIL_USER         — e.g. hello@eyetest.co.uk or your Gmail      */
/*    GMAIL_APP_PASSWORD — Google App Password (not your login pwd)     */
/* ------------------------------------------------------------------ */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { fullName, email, phone, postcode, condition, fundingType, notes } =
      data;

    /* ---- Validate required fields ---- */
    if (
      !fullName ||
      !email ||
      !phone ||
      !postcode ||
      !condition ||
      !fundingType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---- Build email body ---- */
    const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #0d1b3e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fff; font-size: 20px; margin: 0;">New Eye Surgery Enquiry</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">Submitted via eyetest.co.uk</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px; margin-top: 0;">Contact Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Name:</td><td style="padding: 6px 0; font-weight: 600;">${fullName}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0ea5a0;">${email}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone:</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #0ea5a0;">${phone}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Postcode:</td><td style="padding: 6px 0; font-weight: 600;">${postcode}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Surgery Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Condition:</td><td style="padding: 6px 0; font-weight: 600;">${condition}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Funding:</td><td style="padding: 6px 0; font-weight: 600;">${fundingType}</td></tr>
    </table>

    ${notes ? `
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Additional Notes</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${notes}</p>
    ` : ""}

    <div style="background: #f0fdfa; border: 1px solid #0ea5a0; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        This enquiry was submitted via the eye surgery enquiry form on <a href="https://www.eyetest.co.uk/eye-surgery/enquiry" style="color: #0ea5a0;">eyetest.co.uk</a>.
        Please follow up with the patient within 24 hours.
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
      subject: `New Eye Surgery Enquiry from ${fullName}`,
      html: htmlBody,
    });

    // TODO: Send copy to preferred partner when email confirmed
    // await transporter.sendMail({
    //   from: `"eyetest.co.uk" <${gmailUser}>`,
    //   to: "partner@example.com",
    //   replyTo: email,
    //   subject: `Eye Surgery Referral — ${fullName}, ${postcode}`,
    //   html: htmlBody,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Surgery enquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
