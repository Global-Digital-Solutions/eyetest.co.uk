/* ------------------------------------------------------------------ */
/*  Shared email utilities for eyetest.co.uk                           */
/*  Clean, lightweight HTML templates + nodemailer transporter         */
/*                                                                      */
/*  Requires env vars:                                                  */
/*    GMAIL_USER         — primary Google account                      */
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
  const from = process.env.EMAIL_FROM || "hello@eyetest.co.uk";
  return `"eyetest.co.uk" <${from}>`;
}

/* ---- Brand constants ---- */

const TEAL = "#0ea5a0";
const NAVY = "#0d1b3e";
const BORDER = "#e5e7eb";
const GRAY_TEXT = "#374151";
const MUTED_TEXT = "#6b7280";
const LIGHT_TEXT = "#9ca3af";
const SITE_URL = "https://www.eyetest.co.uk";
const LOGO_URL = "https://www.eyetest.co.uk/favicon-96x96.png";

/* ---- Branded email wrapper ---- */

export function brandedEmail({
  preheader,
  heading,
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
  <style>
    table { border-collapse: collapse; }
    td { font-family: Arial, sans-serif; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; color: ${GRAY_TEXT};">

  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #ffffff;">${preheader}</div>` : ""}

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 32px 16px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width: 560px; width: 100%;">

          <!-- Logo -->
          <tr>
            <td style="padding: 0 0 24px;">
              <a href="${SITE_URL}" style="text-decoration: none;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align: middle; padding-right: 8px;">
                      <img src="${LOGO_URL}" alt="" width="28" height="28" style="display: block; border: 0; border-radius: 6px;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <span style="font-size: 17px; font-weight: 700; color: ${NAVY}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">eyetest<span style="color: ${TEAL};">.</span>co<span style="color: ${TEAL};">.</span>uk</span>
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding: 0 0 24px; border-bottom: 1px solid ${BORDER};">
              <h1 style="font-size: 22px; font-weight: 700; color: ${NAVY}; margin: 0; line-height: 1.3;">${heading}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 24px 0 0;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0; border-top: 1px solid ${BORDER};">
              <p style="font-size: 12px; color: ${LIGHT_TEXT}; margin: 0 0 4px; line-height: 1.5;">
                <a href="${SITE_URL}" style="color: ${LIGHT_TEXT}; text-decoration: none;">eyetest.co.uk</a> &middot;
                <a href="mailto:hello@eyetest.co.uk" style="color: ${LIGHT_TEXT}; text-decoration: none;">hello@eyetest.co.uk</a>
              </p>
              <p style="font-size: 11px; color: #d1d5db; margin: 0;">&copy; ${new Date().getFullYear()} eyetest.co.uk</p>
            </td>
          </tr>

          <!-- Disclaimer -->
          <tr>
            <td style="padding: 16px 0 0;">
              <p style="font-size: 10px; color: #d1d5db; line-height: 1.5; margin: 0;">
                Subject to our <a href="${SITE_URL}/terms" style="color: #d1d5db; text-decoration: underline;">Terms of Service</a>
                including section 16 (Listing Services). Listing visibility is determined by geographic proximity within 0.6&ndash;2.4 miles
                depending on postcode density. We do not guarantee placement for any particular postcode. All services are provided on a
                patient-centric basis. Contact <a href="mailto:hello@eyetest.co.uk" style="color: #d1d5db; text-decoration: underline;">hello@eyetest.co.uk</a>.
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

/** Teal CTA button */
export function ctaButton(href: string, label: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
      <tr>
        <td style="background: ${TEAL}; border-radius: 6px;">
          <a href="${href}" style="display: inline-block; padding: 12px 24px; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none;">${label}</a>
        </td>
      </tr>
    </table>`;
}

/** Light info box */
export function infoBox(content: string): string {
  return `
    <div style="background: #f9fafb; border: 1px solid ${BORDER}; border-radius: 8px; padding: 20px; margin: 20px 0;">
      ${content}
    </div>`;
}

/** Simple section label */
export function sectionHeading(text: string): string {
  return `<p style="font-size: 11px; font-weight: 600; color: ${MUTED_TEXT}; text-transform: uppercase; letter-spacing: 0.5px; margin: 28px 0 12px;">${text}</p>`;
}

/** Detail row */
export function detailRow(label: string, value: string, isAlt = false): string {
  const bg = isAlt ? "#f9fafb" : "#ffffff";
  return `<tr style="background: ${bg};"><td style="padding: 8px 10px; color: ${MUTED_TEXT}; font-size: 13px; width: 130px; vertical-align: top; border-bottom: 1px solid #f3f4f6;">${label}</td><td style="padding: 8px 10px; font-size: 14px; color: ${GRAY_TEXT}; border-bottom: 1px solid #f3f4f6;">${value}</td></tr>`;
}

/** Paragraph */
export function para(text: string): string {
  return `<p style="font-size: 15px; line-height: 1.6; color: ${GRAY_TEXT}; margin: 0 0 14px;">${text}</p>`;
}

/** Badge / pill */
export function badge(text: string, bg: string, color: string): string {
  return `<span style="display: inline-block; background: ${bg}; color: ${color}; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 4px; letter-spacing: 0.3px;">${text}</span>`;
}

/** Divider */
export function divider(): string {
  return `<div style="border-top: 1px solid ${BORDER}; margin: 24px 0;"></div>`;
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
    ? "Other (see notes)"
    : d.appointmentSystem || "Not specified";

  const yes = `<span style="color: #16a34a;">Yes</span>`;
  const no = `<span style="color: ${MUTED_TEXT};">No</span>`;

  const body = `
    ${para(`New listing application from <strong>${d.practiceName}</strong> in <strong>${d.town}</strong>.`)}

    ${sectionHeading("Contact")}
    <table style="width: 100%; border-collapse: collapse;">
      ${detailRow("Practice", `<strong>${d.practiceName}</strong>`)}
      ${detailRow("Contact", d.contactName, true)}
      ${detailRow("Email", `<a href="mailto:${d.email}" style="color: ${TEAL}; text-decoration: none;">${d.email}</a>`)}
      ${detailRow("Phone", `<a href="tel:${d.phone}" style="color: ${TEAL}; text-decoration: none;">${d.phone}</a>`, true)}
      ${detailRow("Website", d.website ? `<a href="${d.website}" style="color: ${TEAL}; text-decoration: none;">${d.website}</a>` : "&mdash;")}
      ${d.bookingUrl ? detailRow("Booking URL", `<a href="${d.bookingUrl}" style="color: ${TEAL}; text-decoration: none; word-break: break-all;">${d.bookingUrl}</a>`, true) : ""}
    </table>

    ${sectionHeading("Location")}
    <table style="width: 100%; border-collapse: collapse;">
      ${detailRow("Address", d.address)}
      ${detailRow("Postcode", d.postcode, true)}
      ${detailRow("Town", d.town)}
      ${detailRow("Coords", d.lat && d.lng ? `${d.lat}, ${d.lng}` : "geocoding failed", true)}
      ${detailRow("Locations", d.locationCount || "1")}
    </table>

    ${sectionHeading("Services")}
    <table style="width: 100%; border-collapse: collapse;">
      ${detailRow("Services", d.services?.length ? d.services.join(", ") : "None specified")}
      ${detailRow("NHS", d.nhsTests ? yes : no, true)}
      ${detailRow("Private", d.privateTests ? yes : no)}
      ${detailRow("System", systemDisplay, true)}
    </table>

    ${d.openingHours ? `
      ${sectionHeading("Opening hours")}
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; white-space: pre-line; line-height: 1.5;">${d.openingHours}</p>
    ` : ""}

    ${d.message ? `
      ${sectionHeading("Notes")}
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; line-height: 1.5;">${d.message}</p>
    ` : ""}

    ${d.audiologyAddon ? `
      ${divider()}
      <p style="font-size: 13px; color: ${TEAL}; margin: 0;">Also interested in hearingtest.co.uk listing (+&pound;49/yr)</p>
    ` : ""}

    ${divider()}
    <p style="font-size: 12px; color: ${MUTED_TEXT}; margin: 0;">Listing ID: <code style="font-family: monospace; color: ${GRAY_TEXT};">${d.listingId}</code></p>

    <!-- Cross-sell -->
    <div style="margin: 24px 0 0; padding: 16px; background: #f9fafb; border: 1px solid ${BORDER}; border-radius: 8px;">
      <p style="font-size: 13px; color: ${MUTED_TEXT}; margin: 0; line-height: 1.5;">
        This practice may also offer audiology. Consider suggesting a listing on
        <a href="https://www.hearingtest.co.uk/get-listed" style="color: ${TEAL}; text-decoration: none; font-weight: 500;">hearingtest.co.uk</a>.
      </p>
    </div>`;

  return brandedEmail({
    heading: `New listing: ${d.practiceName}`,
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
    ${para(`Thanks for applying to list <strong>${data.practiceName}</strong> on eyetest.co.uk. We&rsquo;ve received your details and your application is being reviewed.`)}

    ${infoBox(`
      <p style="font-size: 14px; font-weight: 600; color: ${NAVY}; margin: 0 0 12px;">What happens next</p>
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; line-height: 1.6;">
        1. We review your application (1&ndash;2 business days)<br/>
        2. We verify your details and set up your listing<br/>
        3. Your practice appears in local search results
      </p>
    `)}

    ${para(`Your free standard listing includes your practice name, contact details, and visibility in local search results.`)}

    ${divider()}

    <p style="font-size: 14px; font-weight: 600; color: ${NAVY}; margin: 0 0 8px;">Want to stand out?</p>
    ${para(`Upgrade to <strong>Gold</strong> (&pound;99/yr) or <strong>Platinum</strong> (&pound;149/yr) for priority placement, a trust badge, highlighted card, and your practice logo in search results.`)}

    ${ctaButton(`https://www.eyetest.co.uk/get-listed/thank-you?listing_id=${data.listingId}`, "View upgrade options")}

    ${divider()}

    <div style="padding: 16px; background: #f9fafb; border: 1px solid ${BORDER}; border-radius: 8px; margin: 0 0 20px;">
      <p style="font-size: 14px; font-weight: 600; color: ${NAVY}; margin: 0 0 6px;">Also offer hearing tests?</p>
      <p style="font-size: 13px; color: ${MUTED_TEXT}; margin: 0; line-height: 1.5;">
        Get listed on our sister site <a href="https://www.hearingtest.co.uk/get-listed" style="color: ${TEAL}; text-decoration: none; font-weight: 500;">hearingtest.co.uk</a> from &pound;99/yr.
      </p>
    </div>

    ${para(`Questions? Reply to this email or contact <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL}; text-decoration: none;">hello@eyetest.co.uk</a>.`)}

    ${para(`Best regards,<br/><strong>The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Application received",
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

  const body = `
    ${para(`Hi ${data.contactName},`)}
    ${para(`Your <strong>${tierLabel}</strong> listing for <strong>${data.practiceName}</strong> is now live. Patients searching near <strong>${data.postcode}</strong> will see your practice in their results.`)}

    ${infoBox(`
      <p style="font-size: 14px; font-weight: 600; color: ${NAVY}; margin: 0 0 12px;">${tierLabel} listing &mdash; &pound;${tierPrice}/year</p>
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; line-height: 1.7;">
        &#10003; ${data.tier === "platinum" ? "Featured Partner card" : "Highlighted listing with badge"}<br/>
        &#10003; Your practice logo displayed<br/>
        &#10003; Priority placement in search results<br/>
        ${data.tier === "platinum" ? "&#10003; Services tagline &amp; verified badge<br/>" : ""}
        &#10003; Visible to patients in your coverage area
        ${data.audiologyAddon ? "<br/>&#10003; Cross-listed on hearingtest.co.uk" : ""}
      </p>
    `)}

    ${ctaButton(`https://www.eyetest.co.uk/search?postcode=${encodeURIComponent(data.postcode)}`, "See your listing live")}

    ${para(`Your subscription renews automatically in 12 months. We&rsquo;ll send a reminder 30 days before.`)}

    ${divider()}

    ${para(`Need to update your details or add a logo? Just reply to this email.`)}

    ${para(`Best regards,<br/><strong>The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Your listing is live",
    preheader: `Great news, ${data.contactName} — your ${tierLabel} listing is now live`,
    body,
  });
}

/** Renewal reminder email — sent 30 days before expiry */
export function renewalReminderEmail(data: {
  contactName: string;
  practiceName: string;
  tier: "gold" | "platinum";
  daysUntilExpiry: number;
  expiresAt: string;
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
    ${para(`Your <strong>${tierLabel}</strong> listing for <strong>${data.practiceName}</strong> renews in <strong>${data.daysUntilExpiry} days</strong> (${expiryDate}).`)}

    ${infoBox(`
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; line-height: 1.6;">
        No action needed &mdash; your subscription renews automatically using your payment method on file. Your listing will continue uninterrupted.
      </p>
    `)}

    ${para(`To make changes, upgrade your tier, or update payment details, reply to this email or contact <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL}; text-decoration: none;">hello@eyetest.co.uk</a>.`)}

    ${ctaButton(`https://www.eyetest.co.uk/search?postcode=${encodeURIComponent(data.postcode)}`, "View your listing")}

    ${para(`Best regards,<br/><strong>The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Your listing renews soon",
    preheader: `${data.practiceName}: your listing renews in ${data.daysUntilExpiry} days`,
    body,
  });
}
