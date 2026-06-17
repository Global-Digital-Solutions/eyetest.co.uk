/* ------------------------------------------------------------------ */
/*  POST /api/at-home-enquiry                                          */
/*  Receives at-home eye test form data and sends an email             */
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

    const {
      testType,
      eligibleNHS,
      title,
      firstName,
      lastName,
      dob,
      contactIs,
      contactRelationship,
      contactFirstName,
      contactLastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      town,
      postcode,
      country,
      furtherDetails,
      consentPost,
      consentText,
      consentEmail,
      consentPhone,
    } = data;

    /* ---- Validate required fields ---- */
    if (!firstName || !lastName || !email || !phone || !addressLine1 || !town || !postcode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---- Build email body ---- */
    const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #0d1b3e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fff; font-size: 20px; margin: 0;">New At-Home Eye Test Enquiry</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">Submitted via eyetest.co.uk</p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px; margin-top: 0;">Test Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Test type:</td><td style="padding: 6px 0; font-weight: 600;">${testType || "Eye test"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">NHS eligible:</td><td style="padding: 6px 0; font-weight: 600;">${eligibleNHS || "—"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Patient Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Name:</td><td style="padding: 6px 0; font-weight: 600;">${title} ${firstName} ${lastName}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Date of birth:</td><td style="padding: 6px 0;">${dob || "—"}</td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Contact is:</td><td style="padding: 6px 0;">${contactIs === "someone-else" ? "Someone else" : "The patient"}</td></tr>
      ${contactIs === "someone-else" ? `
      <tr><td style="padding: 6px 0; color: #666;">Relationship:</td><td style="padding: 6px 0;">${contactRelationship || "—"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Contact name:</td><td style="padding: 6px 0;">${contactFirstName || ""} ${contactLastName || ""}</td></tr>
      ` : ""}
      <tr><td style="padding: 6px 0; color: #666;">Email:</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0ea5a0;">${email}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone:</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #0ea5a0;">${phone}</a></td></tr>
    </table>

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Address</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6;">
      ${addressLine1}<br>
      ${addressLine2 ? `${addressLine2}<br>` : ""}
      ${town}<br>
      ${postcode}<br>
      ${country || "United Kingdom"}
    </p>

    ${furtherDetails ? `
    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Additional Information</h2>
    <p style="margin: 12px 0 24px; line-height: 1.6; background: #f9fafb; padding: 16px; border-radius: 8px;">${furtherDetails}</p>
    ` : ""}

    <h2 style="font-size: 16px; color: #0d1b3e; border-bottom: 2px solid #0ea5a0; padding-bottom: 8px;">Marketing Consent</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Post:</td><td style="padding: 6px 0;">${consentPost ? "Yes" : "No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Text:</td><td style="padding: 6px 0;">${consentText ? "Yes" : "No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email:</td><td style="padding: 6px 0;">${consentEmail ? "Yes" : "No"}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Phone:</td><td style="padding: 6px 0;">${consentPhone ? "Yes" : "No"}</td></tr>
    </table>

    <div style="background: #f0fdfa; border: 1px solid #0ea5a0; border-radius: 8px; padding: 16px; margin-top: 16px;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        This enquiry was submitted via the at-home eye test form on <a href="https://www.eyetest.co.uk/at-home-eye-tests" style="color: #0ea5a0;">eyetest.co.uk</a>.
        Please allocate to the most suitable at-home provider based on the patient's location and needs.
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
      subject: `At-Home Eye Test Enquiry — ${title} ${firstName} ${lastName}, ${postcode}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
