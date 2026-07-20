/* ------------------------------------------------------------------ */
/*  Shared email utilities for eyetest.co.uk                           */
/*  Branded HTML templates + nodemailer transporter                    */
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
  return `"eyetest.co.uk" <${process.env.GMAIL_USER}>`;
}

/* ---- Brand constants ---- */

const TEAL = "#0ea5a0";
const TEAL_DARK = "#0c8a86";
const NAVY = "#0d1b3e";
const LIGHT_TEAL_BG = "#f0fdfa";
const BORDER = "#e2e8f0";
const GRAY_TEXT = "#4a5568";
const MUTED_TEXT = "#94a3b8";
const LOGO_URL = "https://www.eyetest.co.uk/favicon-96x96.png";
const SITE_URL = "https://www.eyetest.co.uk";

/* ---- Branded email wrapper ---- */

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
  <style>
    table { border-collapse: collapse; }
    td { font-family: Arial, sans-serif; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">

  ${preheader ? `<div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f1f5f9;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ""}

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px 32px;">

        <!-- Inner card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- Logo bar -->
          <tr>
            <td style="padding: 0 0 20px; text-align: center;">
              <a href="${SITE_URL}" style="text-decoration: none;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                  <tr>
                    <td style="vertical-align: middle; padding-right: 10px;">
                      <img src="${LOGO_URL}" alt="eyetest.co.uk" width="36" height="36" style="display: block; border: 0; border-radius: 8px;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <span style="font-size: 20px; font-weight: 700; color: ${NAVY}; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">eyetest<span style="color: ${TEAL};">.</span>co<span style="color: ${TEAL};">.</span>uk</span>
                    </td>
                  </tr>
                </table>
              </a>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${NAVY} 0%, #1a2f5a 50%, ${TEAL_DARK} 100%); padding: 40px 44px 36px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 4px; line-height: 1.3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">${heading}</h1>
              ${subheading ? `<p style="color: rgba(255,255,255,0.65); font-size: 14px; margin: 8px 0 0; line-height: 1.4;">${subheading}</p>` : ""}
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background: #ffffff; padding: 40px 44px; border-left: 1px solid ${BORDER}; border-right: 1px solid ${BORDER};">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f8fafc; padding: 32px 44px; border: 1px solid ${BORDER}; border-top: none; border-radius: 0 0 16px 16px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px;">
                <tr>
                  <td style="vertical-align: middle; padding-right: 8px;">
                    <img src="${LOGO_URL}" alt="" width="20" height="20" style="display: block; border: 0; border-radius: 4px;" />
                  </td>
                  <td style="vertical-align: middle;">
                    <span style="font-size: 14px; font-weight: 600; color: ${NAVY};">eyetest.co.uk</span>
                  </td>
                </tr>
              </table>
              <p style="font-size: 13px; color: ${MUTED_TEXT}; margin: 0 0 6px; line-height: 1.5;">
                The UK&rsquo;s Eye Test Comparison &amp; Booking Platform
              </p>
              <p style="font-size: 13px; margin: 0 0 16px;">
                <a href="${SITE_URL}" style="color: ${TEAL}; text-decoration: none; font-weight: 500;">www.eyetest.co.uk</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL}; text-decoration: none; font-weight: 500;">hello@eyetest.co.uk</a>
              </p>
              <div style="border-top: 1px solid ${BORDER}; padding-top: 16px; margin-top: 4px;">
                <p style="font-size: 11px; color: #cbd5e1; margin: 0;">
                  &copy; ${new Date().getFullYear()} eyetest.co.uk &middot; All rights reserved
                </p>
              </div>
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
        <td style="background: linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%); border-radius: 999px; box-shadow: 0 2px 8px rgba(14,165,160,0.3);">
          <a href="${href}" style="display: inline-block; padding: 14px 36px; color: #fff; font-size: 15px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">${label}</a>
        </td>
      </tr>
    </table>`;
}

/** Highlighted info box (teal left border) */
export function infoBox(content: string): string {
  return `
    <div style="background: ${LIGHT_TEAL_BG}; border-left: 4px solid ${TEAL}; border-radius: 0 12px 12px 0; padding: 24px; margin: 24px 0;">
      ${content}
    </div>`;
}

/** Navy section heading with teal underline */
export function sectionHeading(text: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 32px 0 16px;">
      <tr>
        <td style="padding-bottom: 10px; border-bottom: 2px solid ${TEAL};">
          <h2 style="font-size: 15px; font-weight: 700; color: ${NAVY}; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">${text}</h2>
        </td>
      </tr>
    </table>`;
}

/** Detail row for tables */
export function detailRow(label: string, value: string, isAlt = false): string {
  const bg = isAlt ? "#f8fafc" : "#ffffff";
  return `<tr style="background: ${bg};"><td style="padding: 10px 12px; color: ${MUTED_TEXT}; font-size: 13px; width: 140px; vertical-align: top; border-bottom: 1px solid #f1f5f9;">${label}</td><td style="padding: 10px 12px; font-size: 14px; font-weight: 500; color: ${NAVY}; border-bottom: 1px solid #f1f5f9;">${value}</td></tr>`;
}

/** Paragraph */
export function para(text: string): string {
  return `<p style="font-size: 15px; line-height: 1.7; color: ${GRAY_TEXT}; margin: 0 0 16px;">${text}</p>`;
}

/** Badge / pill */
export function badge(text: string, bg: string, color: string): string {
  return `<span style="display: inline-block; background: ${bg}; color: ${color}; font-size: 12px; font-weight: 700; padding: 5px 16px; border-radius: 999px; letter-spacing: 0.3px;">${text}</span>`;
}

/** Divider */
export function divider(): string {
  return `<div style="border-top: 1px solid ${BORDER}; margin: 28px 0;"></div>`;
}

/** Feature row for comparison tables */
function featureRow(feature: string, standard: string, gold: string, platinum: string): string {
  return `
    <tr>
      <td style="padding: 10px 12px; font-size: 13px; color: ${GRAY_TEXT}; border-bottom: 1px solid #f1f5f9;">${feature}</td>
      <td style="padding: 10px 8px; font-size: 13px; text-align: center; border-bottom: 1px solid #f1f5f9;">${standard}</td>
      <td style="padding: 10px 8px; font-size: 13px; text-align: center; border-bottom: 1px solid #f1f5f9; background: #fffbeb;">${gold}</td>
      <td style="padding: 10px 8px; font-size: 13px; text-align: center; border-bottom: 1px solid #f1f5f9; background: ${LIGHT_TEAL_BG};">${platinum}</td>
    </tr>`;
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
    <!-- Status badge -->
    <div style="text-align: center; margin-bottom: 28px;">
      ${badge("NEW APPLICATION", TEAL, "#fff")}
    </div>

    ${sectionHeading("Practice Details")}
    <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #f1f5f9;">
      ${detailRow("Practice", `<strong>${d.practiceName}</strong>`)}
      ${detailRow("Contact", d.contactName, true)}
      ${detailRow("Email", `<a href="mailto:${d.email}" style="color: ${TEAL}; text-decoration: none;">${d.email}</a>`)}
      ${detailRow("Phone", `<a href="tel:${d.phone}" style="color: ${TEAL}; text-decoration: none;">${d.phone}</a>`, true)}
      ${detailRow("Website", d.website ? `<a href="${d.website}" style="color: ${TEAL}; text-decoration: none;">${d.website}</a>` : "&mdash;")}
      ${detailRow("Booking URL", d.bookingUrl ? `<a href="${d.bookingUrl}" style="color: ${TEAL}; text-decoration: none; word-break: break-all;">${d.bookingUrl}</a>` : "&mdash;", true)}
    </table>

    ${sectionHeading("Location")}
    <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #f1f5f9;">
      ${detailRow("Address", d.address)}
      ${detailRow("Postcode", `<strong>${d.postcode}</strong>`, true)}
      ${detailRow("Town/City", d.town)}
      ${detailRow("Coordinates", d.lat && d.lng ? `${d.lat}, ${d.lng}` : "<em style='color: ${MUTED_TEXT};'>geocoding failed</em>", true)}
      ${detailRow("Total locations", `<strong>${d.locationCount || "1"}</strong>`)}
    </table>

    ${sectionHeading("Services &amp; Systems")}
    <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #f1f5f9;">
      ${detailRow("Services", d.services?.length ? d.services.join(", ") : "<em>None specified</em>")}
      ${detailRow("NHS tests", d.nhsTests ? `<span style="color: #16a34a; font-weight: 600;">&#10003; Yes</span>` : "No", true)}
      ${detailRow("Private tests", d.privateTests ? `<span style="color: #16a34a; font-weight: 600;">&#10003; Yes</span>` : "No")}
      ${detailRow("Booking system", systemDisplay, true)}
    </table>

    ${d.openingHours ? `
      ${sectionHeading("Opening Hours")}
      <div style="background: #f8fafc; padding: 16px 20px; border-radius: 8px; border: 1px solid #f1f5f9; font-size: 14px; line-height: 1.6; color: ${GRAY_TEXT}; margin: 0; white-space: pre-line;">${d.openingHours}</div>
    ` : ""}

    ${d.message ? `
      ${sectionHeading("Additional Notes")}
      <div style="background: #f8fafc; padding: 16px 20px; border-radius: 8px; border: 1px solid #f1f5f9; font-size: 14px; line-height: 1.6; color: ${GRAY_TEXT}; margin: 0;">${d.message}</div>
    ` : ""}

    ${d.audiologyAddon ? `
      <div style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 10px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: 600;">&#128266; Also interested in hearingtest.co.uk listing (+&pound;49/year)</p>
      </div>` : ""}

    ${divider()}

    <div style="background: ${LIGHT_TEAL_BG}; border: 1px solid ${TEAL}40; border-radius: 10px; padding: 16px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
        <tr>
          <td style="font-size: 12px; color: ${MUTED_TEXT};">Listing ID</td>
          <td style="font-size: 13px; color: ${NAVY}; font-weight: 600; text-align: right; font-family: monospace;">${d.listingId}</td>
        </tr>
      </table>
    </div>

    <!-- Cross-sell: hearingtest.co.uk -->
    <div style="background: linear-gradient(135deg, #1a2744 0%, #243b63 100%); border-radius: 14px; padding: 24px; margin: 24px 0; text-align: center;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 10px;">
        <tr>
          <td style="vertical-align: middle; padding-right: 8px;">
            <img src="https://www.hearingtest.co.uk/favicon-96x96.png" alt="" width="24" height="24" style="display: block; border: 0; border-radius: 5px;" />
          </td>
          <td style="vertical-align: middle;">
            <span style="font-size: 14px; font-weight: 700; color: #fff;">hearingtest.co.uk</span>
          </td>
        </tr>
      </table>
      <p style="color: rgba(255,255,255,0.75); font-size: 13px; margin: 0 0 12px; line-height: 1.5;">This practice may also offer audiology. Consider suggesting a listing on <strong style="color: #fff;">hearingtest.co.uk</strong> for additional reach.</p>
      <a href="https://www.hearingtest.co.uk/get-listed" style="color: #93c5fd; font-size: 13px; font-weight: 600; text-decoration: none;">View hearingtest.co.uk listing options &rarr;</a>
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
  const tick = `<span style="color: #16a34a; font-weight: 700;">&#10003;</span>`;
  const cross = `<span style="color: #cbd5e1;">&mdash;</span>`;

  const body = `
    ${para(`Hi ${data.contactName},`)}
    ${para(`Thank you for applying to get <strong>${data.practiceName}</strong> listed on eyetest.co.uk. We&rsquo;ve received your details and your application is now being reviewed.`)}

    ${infoBox(`
      <h3 style="font-size: 15px; font-weight: 700; color: ${NAVY}; margin: 0 0 16px;">Your standard listing includes:</h3>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: ${GRAY_TEXT};">
        <tr><td style="padding: 5px 0;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Listed on eyetest.co.uk search results</td></tr>
        <tr><td style="padding: 5px 0;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Practice name &amp; contact details shown</td></tr>
        <tr><td style="padding: 5px 0;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Visible to patients searching in your area</td></tr>
      </table>
    `)}

    ${divider()}

    <!-- Upgrade teaser -->
    <div style="text-align: center; margin-bottom: 20px;">
      ${badge("RECOMMENDED", TEAL, "#fff")}
    </div>

    <h3 style="font-size: 18px; font-weight: 700; color: ${NAVY}; margin: 0 0 8px; text-align: center;">Stand out with a premium listing</h3>
    ${para(`<span style="text-align: center; display: block;">Upgrade to <strong>Gold</strong> or <strong>Platinum</strong> to get priority placement, a verified badge, and more patients finding your practice.</span>`)}

    <!-- Comparison table -->
    <table style="width: 100%; border-collapse: collapse; border: 1px solid ${BORDER}; border-radius: 10px; overflow: hidden; margin: 24px 0;">
      <thead>
        <tr>
          <th style="padding: 14px 12px; font-size: 12px; font-weight: 600; color: ${MUTED_TEXT}; text-align: left; background: #f8fafc; border-bottom: 2px solid ${BORDER}; width: 40%;">Feature</th>
          <th style="padding: 14px 8px; font-size: 12px; font-weight: 600; color: ${MUTED_TEXT}; text-align: center; background: #f8fafc; border-bottom: 2px solid ${BORDER}; width: 20%;">Standard</th>
          <th style="padding: 14px 8px; font-size: 12px; font-weight: 700; color: #b45309; text-align: center; background: #fffbeb; border-bottom: 2px solid #f59e0b; width: 20%;">&#11088; Gold</th>
          <th style="padding: 14px 8px; font-size: 12px; font-weight: 700; color: ${TEAL}; text-align: center; background: ${LIGHT_TEAL_BG}; border-bottom: 2px solid ${TEAL}; width: 20%;">&#128142; Platinum</th>
        </tr>
      </thead>
      <tbody>
        ${featureRow("Search results listing", tick, tick, tick)}
        ${featureRow("Practice name &amp; details", tick, tick, tick)}
        ${featureRow("Highlighted card", cross, tick, tick)}
        ${featureRow("Trust badge", cross, tick, tick)}
        ${featureRow("Priority placement", cross, tick, tick)}
        ${featureRow("Practice logo", cross, tick, tick)}
        ${featureRow("Services tagline", cross, cross, tick)}
        ${featureRow("Verified partner status", cross, cross, tick)}
        ${featureRow("Featured Partner card", cross, cross, tick)}
      </tbody>
      <tfoot>
        <tr>
          <td style="padding: 16px 12px; font-size: 14px; font-weight: 700; color: ${NAVY}; border-top: 2px solid ${BORDER};">Price</td>
          <td style="padding: 16px 8px; font-size: 15px; font-weight: 700; color: ${NAVY}; text-align: center; border-top: 2px solid ${BORDER};">Free</td>
          <td style="padding: 16px 8px; font-size: 15px; font-weight: 800; color: #b45309; text-align: center; border-top: 2px solid #f59e0b; background: #fffbeb;">&pound;99<span style="font-size: 11px; font-weight: 400; color: ${MUTED_TEXT};">/yr</span></td>
          <td style="padding: 16px 8px; font-size: 15px; font-weight: 800; color: ${TEAL}; text-align: center; border-top: 2px solid ${TEAL}; background: ${LIGHT_TEAL_BG};">&pound;149<span style="font-size: 11px; font-weight: 400; color: ${MUTED_TEXT};">/yr</span></td>
        </tr>
      </tfoot>
    </table>

    ${ctaButton(`https://www.eyetest.co.uk/get-listed/thank-you?listing_id=${data.listingId}`, "Choose Your Plan &rarr;")}

    <p style="font-size: 12px; color: ${MUTED_TEXT}; text-align: center; margin: 0 0 8px;">No commitment &mdash; upgrade any time. Cancel within 14 days for a full refund.</p>

    ${divider()}

    <!-- Cross-sell: hearingtest.co.uk -->
    <div style="background: linear-gradient(135deg, #1a2744 0%, #243b63 100%); border-radius: 14px; padding: 28px; margin: 0 0 28px; text-align: center;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 12px;">
        <tr>
          <td style="vertical-align: middle; padding-right: 8px;">
            <img src="https://www.hearingtest.co.uk/favicon-96x96.png" alt="" width="28" height="28" style="display: block; border: 0; border-radius: 6px;" />
          </td>
          <td style="vertical-align: middle;">
            <span style="font-size: 16px; font-weight: 700; color: #fff;">hearingtest.co.uk</span>
          </td>
        </tr>
      </table>
      <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 8px;">Also offer audiology services?</h3>
      <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 0 0 16px; line-height: 1.5;">Most optician practices also provide hearing tests. Get listed on our sister site <strong style="color: #fff;">hearingtest.co.uk</strong> and reach even more patients &mdash; from just &pound;99/year.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
        <tr>
          <td style="background: #3b7dd8; border-radius: 999px;">
            <a href="https://www.hearingtest.co.uk/get-listed" style="display: inline-block; padding: 12px 28px; color: #fff; font-size: 14px; font-weight: 700; text-decoration: none;">List on hearingtest.co.uk &rarr;</a>
          </td>
        </tr>
      </table>
    </div>

    ${para(`If you have any questions, just reply to this email or contact us at <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL}; text-decoration: none; font-weight: 500;">hello@eyetest.co.uk</a>.`)}

    ${para(`Best regards,<br/><strong style="color: ${NAVY};">The eyetest.co.uk Team</strong>`)}`;

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

    <div style="text-align: center; margin: 8px 0 32px;">
      <div style="display: inline-block; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 50%; width: 68px; height: 68px; line-height: 68px; text-align: center; margin-bottom: 16px;">
        <span style="font-size: 34px;">&#9989;</span>
      </div>
      <h2 style="font-size: 22px; color: ${NAVY}; margin: 0; font-weight: 700;">Your listing is live!</h2>
    </div>

    ${para(`<strong>${data.practiceName}</strong> is now listed on eyetest.co.uk and visible to patients searching in the <strong>${data.postcode}</strong> area.`)}

    <!-- Tier card -->
    <div style="background: ${tierBg}; border: 1px solid ${tierColor}30; border-radius: 14px; padding: 28px; margin: 28px 0; text-align: center;">
      ${badge(`&#11088; ${tierLabel} Listing`, tierColor, "#fff")}
      <p style="font-size: 28px; font-weight: 800; color: ${NAVY}; margin: 16px 0 4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">&pound;${tierPrice}<span style="font-size: 14px; font-weight: 400; color: ${MUTED_TEXT};">/year</span></p>
      ${data.audiologyAddon ? `<p style="font-size: 13px; color: ${TEAL}; margin: 4px 0 0; font-weight: 500;">+ hearingtest.co.uk listing (&pound;49/year)</p>` : ""}
    </div>

    ${infoBox(`
      <h3 style="font-size: 15px; font-weight: 700; color: ${NAVY}; margin: 0 0 16px;">What&rsquo;s included</h3>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: ${GRAY_TEXT};">
        <tr><td style="padding: 5px 0; vertical-align: middle;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> ${data.tier === "platinum" ? "Premium Featured Partner card" : "Highlighted listing with badge"}</td></tr>
        <tr><td style="padding: 5px 0; vertical-align: middle;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Your practice logo displayed</td></tr>
        <tr><td style="padding: 5px 0; vertical-align: middle;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Priority placement in search results</td></tr>
        ${data.tier === "platinum" ? `<tr><td style="padding: 5px 0; vertical-align: middle;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Services tagline &amp; verified badge</td></tr>` : ""}
        <tr><td style="padding: 5px 0; vertical-align: middle;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Visible to patients within your coverage area</td></tr>
        ${data.audiologyAddon ? `<tr><td style="padding: 5px 0; vertical-align: middle;"><span style="color: #16a34a; font-weight: 700; margin-right: 8px;">&#10003;</span> Cross-listed on hearingtest.co.uk</td></tr>` : ""}
      </table>
    `)}

    ${sectionHeading("What happens now")}
    ${para(`Your listing is <strong>active immediately</strong>. Patients searching near ${data.postcode} will see your practice in their results with your ${tierLabel} listing treatment.`)}
    ${para(`Your subscription renews automatically in 12 months. We&rsquo;ll send you a reminder 30 days before renewal so there are no surprises.`)}

    ${ctaButton(`https://www.eyetest.co.uk/search?postcode=${encodeURIComponent(data.postcode)}`, "See Your Listing Live &rarr;")}

    ${divider()}

    ${para(`Need to update your listing details, add a logo, or change anything? Just reply to this email and we&rsquo;ll take care of it.`)}

    ${para(`Thank you for choosing eyetest.co.uk &mdash; we&rsquo;re excited to help more patients find your practice.`)}

    ${para(`Best regards,<br/><strong style="color: ${NAVY};">The eyetest.co.uk Team</strong>`)}`;

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

    ${para(`Just a friendly heads-up &mdash; your <strong>${tierLabel}</strong> listing for <strong>${data.practiceName}</strong> on eyetest.co.uk is due to renew in <strong>${data.daysUntilExpiry} days</strong>.`)}

    <!-- Renewal summary -->
    <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 14px; padding: 28px; margin: 28px 0; text-align: center;">
      <p style="font-size: 13px; color: #92400e; margin: 0 0 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Renewal date</p>
      <p style="font-size: 24px; font-weight: 800; color: ${NAVY}; margin: 0;">${expiryDate}</p>
      <p style="font-size: 13px; color: ${MUTED_TEXT}; margin: 10px 0 0;">${tierLabel} listing &mdash; renews automatically</p>
    </div>

    ${infoBox(`
      <h3 style="font-size: 15px; font-weight: 700; color: ${NAVY}; margin: 0 0 10px;">No action needed</h3>
      <p style="font-size: 14px; color: ${GRAY_TEXT}; margin: 0; line-height: 1.6;">
        Your subscription will renew automatically using your payment method on file. Your listing will continue uninterrupted.
      </p>
    `)}

    ${para(`If you&rsquo;d like to make any changes to your listing, upgrade your tier, or have any questions about your renewal, just reply to this email.`)}

    ${para(`To manage your subscription or update your payment details, contact us at <a href="mailto:hello@eyetest.co.uk" style="color: ${TEAL}; text-decoration: none; font-weight: 500;">hello@eyetest.co.uk</a>.`)}

    ${ctaButton(`https://www.eyetest.co.uk/search?postcode=${encodeURIComponent(data.postcode)}`, "View Your Listing &rarr;")}

    ${divider()}

    ${para(`Thanks for being part of eyetest.co.uk &mdash; your listing has been helping patients find your practice since you joined.`)}

    ${para(`Best regards,<br/><strong style="color: ${NAVY};">The eyetest.co.uk Team</strong>`)}`;

  return brandedEmail({
    heading: "Your listing renews soon",
    subheading: `${data.practiceName} &mdash; ${tierLabel} Listing`,
    preheader: `${data.practiceName}: your eyetest.co.uk listing renews in ${data.daysUntilExpiry} days`,
    body,
  });
}
