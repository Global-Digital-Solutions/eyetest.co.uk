/* ------------------------------------------------------------------ */
/*  Shared email utilities for eyetest.co.uk                           */
/*  Branded HTML templates + nodemailer transporter                    */
/*                                                                      */
/*  Requires env vars:                                                  */
/*    GMAIL_USER         — e.g. hello@eyetest.co.uk                    */
/*    GMAIL_APP_PASSWORD — Google App Password                         */
/* ------------------------------------------------------------------ */

import nodemailer from "nodemailer";

/* ---- Transporter (singleton) ---- */

let _transporter: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return _transporter;
}

export function getFromAddress(): string {
  return `"eyetest.co.uk" <${process.env.GMAIL_USER}>`;
}

/* ---- Brand constants ---- */

const TEAL = "#0ea5a0";
const NAVY = "#0d1b3e";
const LIGHT_TEAL_BG = "#f0fdfa";
const BORDER = "#e5e7eb";
const GRAY_TEXT = "#555";
const MUTED_TEXT = "#999";

/* ---- Branded email wrapper ---- */

/**
 * Wraps body content in the branded eyetest.co.uk email layout.
 * Includes header with logo text, body area, and branded footer.
 */
export function brandedEmail({
  preheader,
  heading,
  subheading,
  body,
}: {
  preheader?: string;
  heading: string;
  subheading?: string;
  body: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${heading}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f4f5f7;">${preheader}</div>` : ""}

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Inner card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${NAVY} 0%, #162d5a 100%); padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <!-- Logo text -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px;">
                <tr>
                  <td style="background: ${TEAL}; width: 40px; height: 40px; border-radius: 10px; text-align: center; vertical-align: middle;">
                    <span style="color: #fff; font-size: 20px; font-weight: 800; line-height: 40px;">e</span>
                  </td>
                  <td style="padding-left: 12px;">
                    <span style="color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">eyetest.co.uk</span>
                  </td>
                </tr>
              </table>
              <h1 style="color: #fff; font-size: 22px; font-weight: 700; margin: 0; line-height: 1.3;">${heading}</h1>
              ${subheading ? `<p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0; line-height: 1.4;">${subheading}</p>` : ""}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background: #ffffff; padding: 36px 40px; border-left: 1px solid ${BORDER}; border-right: 1px solid ${BORDER};">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #fafafa; padding: 28px 40px; border: 1px solid ${BORDER}; border-top: none; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="font-size: 13px; color: ${MUTED_TEXT}; margin: 0 0 8px; line-height: 1.5;">
                eyetest.co.uk &mdash; The UK&rsquo;s Eye Test Comparison Platform
              </p>
              <p style="font-size: 13px; margin: 0 0 12px;">
                <a href="https://www.eyetest.co.uk" style="color: ${TEAL}; text-decoration: none;">www.eyetest.co.uk</a>
              </p>
              <p style="font-size: 11px; color: #bbb; margin: 0;">
                &copy; ${new Date().getFullYear()} eyetest.co.uk. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---- Reusable components ---- */

/** Teal CTA button (centered) */
export function ctaButton(href: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px auto;">
      <tr>
        <td style="background: ${TEAL}; border-radius: 999px;">
          <a href="${href}" style="display: inline-block; padding: 14px 32px; color: #fff; font-size: 15px; font-weight: 700; text-decoration: none; letter-spacing: 0.2px;">${label}</a>
        </td>
      </tr>
    </table>`;
}

/** Highlighted info box (teal left border) */
export function infoBox(content: string): string {
  return `
    <div style="background: ${LIGHT_TEAL_BG}; border-left: 4px solid ${TEAL}; border-radius: 0 8px 8px 0; padding: 20px; margin: 24px 0;">
      ${content}
    </div>`;
}

/** Navy section heading with teal underline */
export function sectionHeading(text: string): string {
  return `<h2 style="font-size: 16px; color: ${NAVY}; border-bottom: 2px solid ${TEAL}; padding-bottom: 8px; margin: 28px 0 16px;">${text}</h2>`;
}

/** Detail row for tables */
export function detailRow(label: string, value: string): string {
  return `<tr><td style="padding: 6px 0; color: #666; width: 160px; vertical-align: top;">${label}</td><td style="padding: 6px 0; font-weight: 500;">${value}</td></tr>`;
}

/** Paragraph */
export function para(text: string): string {
  return `<p style="font-size: 15px; line-height: 1.7; color: ${GRAY_TEXT}; margin: 0 0 16px;">${text}</p>`;
}

/** Badge / pill */
export function badge(text: string, bg: string, color: string): string {
  return `<span style="display: inline-block; background: ${bg}; color: ${color}; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 999px; letter-spacing: 0.3px;">${text}</span>`;
}

/* ---- Pre-built email templates ---- */

/** Admin notification email — new listing application */
export function adminNotificationEmail(data: {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  bookingUrl?: string;
  address: string;
  postcode: string;
  town: string;
  lat?: number | null;
  lng?: number | null;
  locationCount: string;
  services: string[];
  nhsTests: boolean;
  privateTests: boolean;
  appointmentSystem: string;
  openingHours?: string;
  message?: string;
  audiologyAddon: boolean;
  listingId: string;
}): string {
  const d = data;
  const systemDisplay = d.appointmentSystem === "Other"
    ? `Other &mdash; (see notes)`
    : d.appointmentSystem || "Not specified";

  const body = `
    ${sectionHeading("Practice Details")}
    <table style="width: 100%; border-collapse: collapse;">
      ${detailRow("Practice name", `<strong>${d.practiceName}</strong>`)}
      ${detailRow("Contact name", d.contactName)}
      ${detailRow("Email", `<a href="mailto:${d.email}" style="color: ${TEAL};">${d.email}</a>`)}
      ${detailRow("Phone", `<a href="tel:${d.phone}" style="color: ${TEAL};">${d.phone}</a>`)}
      ${detailRow("Website", d.website ? `<a href="${d.website}" style="color: ${TEAL};">${d.website}</a>` : "&mdash;")}
      ${detailRow("Booking URL", d.bookingUrl ? `<a href="${d.bookingUrl}" style="color: ${TEAL};">${d.bookingUrl}</a>` : "&mdash;")}
    </table>

    ${sectionHeading("Location")}
    <table style="width: 100%; border-collapse: collapse;">
      ${detailRow("Address", d.address)}
      ${detailRow("Postcode", `<strong>${d.postcode}</strong>`)}
      ${detailRow("Town/City", d.town)}
      ${detailRow("Coordinates", d.lat && d.lng ? `${d.lat}, ${d.lng}` : "(geocoding failed)")}
      ${detailRow("Locations", `<strong>${d.locationCount || "1"}</strong>`)}
    </table>

    ${sectionHeading("Services &amp; Systems")}
    <table style="width: 100%; border-collapse: collapse;">
      ${detailRow("Services", d.services?.length ? d.services.join(", ") : "(none)")}
      ${detailRow("NHS tests", d.nhsTests ? "&#9989; Yes" : "No")}
      ${detailRow("Private tests", d.privateTests ? "&#9989; Yes" : "No")}
      ${detailRow("Appointment system", systemDisplay)}
    </table>

    ${d.openingHours ? sectionHeading("Opening Hours") + `<p style="background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; margin: 0;">${d.openingHours}</p>` : ""}

    ${d.message ? sectionHeading("Additional Information") + `<p style="background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; margin: 0;">${d.message}</p>` : ""}

    ${d.audiologyAddon ? `
      <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: 600;">&#128266; Also interested in hearingtest.co.uk listing (+&pound;49/year)</p>
      </div>` : ""}

    <div style="background: ${LIGHT_TEAL_BG}; border: 1px solid ${TEAL}; border-radius: 8px; padding: 16px; margin-top: 24px;">
      <p style="margin: 0; font-size: 13px; color: #666;">
        Listing ID: <strong>${d.listingId}</strong>
      </p>
    </div>`;

  return brandedEmail({
    heading: "New Listing Application",
    subheading: `${d.practiceName} &mdash; ${d.postcode}`,
    preheader: `New listing: ${d.practiceName} in ${d.town}`,
    body,
  });
}

/** Thank-you email to applicant after form submission */
export function applicantThankYouEmail(data: {
  contactName: string;
  practiceName: string;
  listingId: string;
}): string {
  const body = `
    ${para(`Hi ${data.contactName},`)}
    ${para(`Thank you for applying to get <strong>${data.practiceName}</strong> listed on eyetest.co.uk. We&rsquo;ve received your details and your application is being reviewed.`)}

    ${infoBox(`
      <h3 style="font-size: 15px; color: ${NAVY}; margin: 0 0 12px;">What happens next?</h3>
      <ol style="font-size: 14px; line-height: 2; margin: 0; padding-left: 20px; color: ${GRAY_TEXT};">
        <li>Choose your listing tier on the next page (Gold or Platinum)</li>
        <li>Complete payment via our secure checkout</li>
        <li>Your listing goes live and patients in your area can find you</li>
      </ol>
    `)}

    ${ctaButton(`https://www.eyetest.co.uk/get-listed/thank-you?listing_id=${data.listingId}`, "Choose Your Plan &rarr;")}

    ${para(`If you have any questions, just reply to this email or contact us at <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL};">hello@eyetest.co.uk</a>.`)}

    ${para(`Best regards,<br/><strong>The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Thank you for your application",
    subheading: data.practiceName,
    preheader: `Thanks for applying, ${data.contactName} — here's what happens next`,
    body,
  });
}

/** Post-payment confirmation email — "You're live!" */
export function paymentConfirmationEmail(data: {
  contactName: string;
  practiceName: string;
  tier: "gold" | "platinum";
  audiologyAddon: boolean;
  postcode: string;
  listingId: string;
}): string {
  const tierLabel = data.tier === "platinum" ? "Platinum" : "Gold";
  const tierPrice = data.tier === "platinum" ? "149" : "99";
  const tierColor = data.tier === "platinum" ? NAVY : "#b45309";
  const tierBg = data.tier === "platinum" ? "#eef2ff" : "#fffbeb";

  const body = `
    ${para(`Hi ${data.contactName},`)}

    <div style="text-align: center; margin: 8px 0 28px;">
      <div style="display: inline-block; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 50%; width: 64px; height: 64px; line-height: 64px; text-align: center; margin-bottom: 12px;">
        <span style="font-size: 32px;">&#9989;</span>
      </div>
      <h2 style="font-size: 20px; color: ${NAVY}; margin: 0;">Your listing is live!</h2>
    </div>

    ${para(`<strong>${data.practiceName}</strong> is now listed on eyetest.co.uk and visible to patients searching in the <strong>${data.postcode}</strong> area.`)}

    <!-- Tier badge -->
    <div style="background: ${tierBg}; border: 1px solid ${tierColor}33; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
      ${badge(`&#11088; ${tierLabel} Listing`, tierColor, "#fff")}
      <p style="font-size: 24px; font-weight: 800; color: ${NAVY}; margin: 12px 0 4px;">&pound;${tierPrice}<span style="font-size: 14px; font-weight: 400; color: #999;">/year</span></p>
      ${data.audiologyAddon ? `<p style="font-size: 13px; color: ${TEAL}; margin: 4px 0 0;">+ hearingtest.co.uk listing (&pound;49/year)</p>` : ""}
    </div>

    ${infoBox(`
      <h3 style="font-size: 15px; color: ${NAVY}; margin: 0 0 12px;">What&rsquo;s included</h3>
      <table style="width: 100%; font-size: 14px; color: ${GRAY_TEXT};">
        <tr><td style="padding: 4px 0;">&#9989; ${data.tier === "platinum" ? "Premium Featured Partner card" : "Highlighted listing with badge"}</td></tr>
        <tr><td style="padding: 4px 0;">&#9989; Your practice logo displayed</td></tr>
        <tr><td style="padding: 4px 0;">&#9989; Priority placement in search results</td></tr>
        ${data.tier === "platinum" ? `<tr><td style="padding: 4px 0;">&#9989; Services tagline &amp; verified badge</td></tr>` : ""}
        <tr><td style="padding: 4px 0;">&#9989; Visible to patients within your coverage area</td></tr>
        ${data.audiologyAddon ? `<tr><td style="padding: 4px 0;">&#9989; Cross-listed on hearingtest.co.uk</td></tr>` : ""}
      </table>
    `)}

    ${sectionHeading("What happens now")}
    ${para(`Your listing is <strong>active immediately</strong>. Patients searching near ${data.postcode} will see your practice in their results with your ${tierLabel} listing treatment.`)}
    ${para(`Your subscription renews automatically in 12 months. We&rsquo;ll send you a reminder 30 days before renewal so there are no surprises.`)}

    ${ctaButton(`https://www.eyetest.co.uk/search?postcode=${encodeURIComponent(data.postcode)}`, "See Your Listing Live &rarr;")}

    ${para(`Need to update your listing details, add a logo, or change anything? Just reply to this email and we&rsquo;ll take care of it.`)}

    ${para(`Thank you for choosing eyetest.co.uk &mdash; we&rsquo;re excited to help more patients find your practice.`)}

    ${para(`Best regards,<br/><strong>The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Your listing is live! &#127881;",
    subheading: `${data.practiceName} &mdash; ${tierLabel} Listing`,
    preheader: `Great news, ${data.contactName} — your ${tierLabel} listing on eyetest.co.uk is now live`,
    body,
  });
}

/** Renewal reminder email — sent 30 days before expiry */
export function renewalReminderEmail(data: {
  contactName: string;
  practiceName: string;
  tier: "gold" | "platinum";
  daysUntilExpiry: number;
  expiresAt: string; // ISO date string
  postcode: string;
}): string {
  const tierLabel = data.tier === "platinum" ? "Platinum" : "Gold";
  const expiryDate = new Date(data.expiresAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const body = `
    ${para(`Hi ${data.contactName},`)}

    ${para(`Just a friendly heads-up &mdash; your <strong>${tierLabel}</strong> listing for <strong>${data.practiceName}</strong> on eyetest.co.uk is due to renew in <strong>${data.daysUntilExpiry} days</strong>.`)}

    <!-- Renewal summary -->
    <div style="background: #fffbeb; border: 1px solid #f59e0b33; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
      <p style="font-size: 14px; color: #92400e; margin: 0 0 8px; font-weight: 600;">Renewal date</p>
      <p style="font-size: 22px; font-weight: 800; color: ${NAVY}; margin: 0;">${expiryDate}</p>
      <p style="font-size: 13px; color: ${MUTED_TEXT}; margin: 8px 0 0;">${tierLabel} listing &mdash; renews automatically</p>
    </div>

    ${infoBox(`
      <h3 style="font-size: 15px; color: ${NAVY}; margin: 0 0 8px;">No action needed</h3>
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; line-height: 1.6;">
        Your subscription will renew automatically using your payment method on file. Your listing will continue uninterrupted.
      </p>
    `)}

    ${para(`If you&rsquo;d like to make any changes to your listing, upgrade your tier, or have any questions about your renewal, just reply to this email.`)}

    ${para(`To manage your subscription or update your payment details, contact us at <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL};">hello@eyetest.co.uk</a>.`)}

    ${ctaButton(`https://www.eyetest.co.uk/search?postcode=${encodeURIComponent(data.postcode)}`, "View Your Listing &rarr;")}

    ${para(`Thanks for being part of eyetest.co.uk &mdash; your listing has been helping patients find your practice since you joined.`)}

    ${para(`Best regards,<br/><strong>The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Your listing renews soon",
    subheading: `${data.practiceName} &mdash; ${tierLabel} Listing`,
    preheader: `${data.practiceName}: your eyetest.co.uk listing renews in ${data.daysUntilExpiry} days`,
    body,
  });
}
