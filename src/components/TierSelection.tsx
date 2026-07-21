"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Tier Selection — interactive pricing cards + Stripe checkout       */
/*  Used on /get-listed/thank-you                                      */
/* ------------------------------------------------------------------ */

interface TierSelectionProps {
  listingId: string;
  practiceName: string;
  postcode: string;
  initialAudiologyAddon: boolean;
}

export function TierSelection({
  listingId,
  practiceName,
  postcode,
  initialAudiologyAddon,
}: TierSelectionProps) {
  const [goldAudiology, setGoldAudiology] = useState(initialAudiologyAddon);
  const [platinumAudiology, setPlatinumAudiology] = useState(initialAudiologyAddon);
  const [loading, setLoading] = useState<"gold" | "platinum" | null>(null);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChoose = async (tier: "gold" | "platinum") => {
    if (!termsAccepted) {
      setError("Please accept the terms and conditions to proceed.");
      return;
    }
    setLoading(tier);
    setError("");
    const audiologyAddon = tier === "gold" ? goldAudiology : platinumAudiology;

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, tier, audiologyAddon }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create checkout session");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setLoading(null);
    }
  };

  /* ---- Checkmark icon ---- */
  const Check = () => (
    <svg
      className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  const faqs = [
    {
      q: "How quickly will my listing go live?",
      a: "Once payment is confirmed, your listing is typically live within 24 hours. We review all submissions to ensure quality and accuracy before publishing.",
    },
    {
      q: "Can I update my listing details after going live?",
      a: "Absolutely. Email us at hello@eyetest.co.uk any time and we’ll update your details — opening hours, booking link, services, anything you need.",
    },
    {
      q: "What happens when my listing expires?",
      a: "We’ll send you a renewal reminder before your listing expires. If you choose not to renew, your listing is simply removed from search results — no extra charges.",
    },
    {
      q: "Can I cancel my listing?",
      a: "Yes. Contact us any time and we’ll remove your listing. We offer a full refund within 30 days of purchase if you’re not satisfied.",
    },
    {
      q: "How do patients find my practice?",
      a: "Patients search by postcode on eyetest.co.uk. Your practice appears in results for searches within your coverage radius, alongside the major chains. Patients click through directly to your website or booking page.",
    },
  ];

  return (
    <>
      {/* ---- Success banner ---- */}
      <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-2xl p-6 sm:p-8 text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-[var(--color-success)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2
          className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Practice submitted successfully!
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Thank you, <span className="font-semibold">{practiceName}</span>.
          We&rsquo;ve received your listing details for{" "}
          <span className="font-semibold">{postcode}</span>.
          Choose a plan below to get listed.
        </p>
      </div>

      {/* ---- Error message (top of page) ---- */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-8">
          {error}
        </div>
      )}

      {/* ---- What happens next ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            step: "1",
            title: "Choose a plan",
            desc: "Select Gold or Platinum below",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            ),
            active: true,
          },
          {
            step: "2",
            title: "We review & publish",
            desc: "Live within 24 hours",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            ),
            active: false,
          },
          {
            step: "3",
            title: "Patients find you",
            desc: "Appear in local search results",
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            ),
            active: false,
          },
        ].map((item) => (
          <div
            key={item.step}
            className={`rounded-xl p-4 sm:p-5 text-center ${
              item.active
                ? "bg-[var(--color-primary)]/5 border-2 border-[var(--color-primary)]/20"
                : "bg-gray-50 border border-gray-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${
                item.active
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <span className="text-sm font-bold">{item.step}</span>
            </div>
            <h4
              className="text-sm font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </h4>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ---- Platform stats bar ---- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {[
          { stat: "2,400+", label: "Opticians compared" },
          { stat: "7", label: "Major chains listed" },
          { stat: "1,200+", label: "Pages indexed" },
          { stat: "100%", label: "Free for patients" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
          >
            <div
              className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.stat}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-500">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* ---- Pricing tier cards ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Gold Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
              </div>
              <h3
                className="text-xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Gold Listing
              </h3>
            </div>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-3xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {goldAudiology ? <>&pound;218</> : <>&pound;149</>}
              </span>
              <span className="text-gray-500 text-sm">/year</span>
              <span className="ml-2 text-xs text-gray-400">
                {goldAudiology ? "(just £18.17/mo)" : "(just £12.42/mo)"}
              </span>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check />
                <span>Standard listing in local search results</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Appear within 5-mile radius of your postcode</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Practice name, address &amp; phone displayed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Direct handoff to your website or booking page</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Listed as a verified local optician</span>
              </li>
            </ul>
          </div>
          {/* Audiology add-on */}
          <div className="border-t border-gray-100 pt-4 mb-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={goldAudiology}
                onChange={(e) => setGoldAudiology(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] mt-0.5 cursor-pointer"
              />
              <div>
                <span className="text-sm font-semibold text-[var(--color-navy)]">
                  Add hearingtest.co.uk
                </span>
                <span className="text-sm text-[var(--color-primary)] font-semibold ml-1">
                  +&pound;69/yr
                </span>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Also appear in hearing test searches on our sister site
                </p>
              </div>
            </label>
          </div>
          <div className="mt-auto">
            <button
              onClick={() => handleChoose("gold")}
              disabled={loading !== null}
              className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
            >
              {loading === "gold" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting to payment...
                </>
              ) : (
                <>Choose Gold &mdash; &pound;{goldAudiology ? "218" : "149"}/yr</>
              )}
            </button>
          </div>
        </div>

        {/* Platinum Card */}
        <div className="bg-white rounded-xl border-2 border-[var(--color-primary)] shadow-md p-6 sm:p-8 flex flex-col relative">
          {/* Most Popular badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Most Popular
            </span>
          </div>

          <div className="mb-6 mt-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
              </div>
              <h3
                className="text-xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Platinum Listing
              </h3>
            </div>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-3xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {platinumAudiology ? <>&pound;268</> : <>&pound;199</>}
              </span>
              <span className="text-gray-500 text-sm">/year</span>
              <span className="ml-2 text-xs text-gray-400">
                {platinumAudiology ? "(just £22.33/mo)" : "(just £16.58/mo)"}
              </span>
            </div>
            <p className="text-xs text-[var(--color-primary)] font-semibold mb-4">
              Everything in Gold, PLUS:
            </p>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check />
                <span>
                  Featured &ldquo;Top Rated&rdquo; badge at the top of results
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Premium placement above standard results</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Enhanced visibility with highlighted card styling</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Priority display for all searches in your radius</span>
              </li>
            </ul>
          </div>
          {/* Audiology add-on */}
          <div className="border-t border-gray-100 pt-4 mb-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={platinumAudiology}
                onChange={(e) => setPlatinumAudiology(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] mt-0.5 cursor-pointer"
              />
              <div>
                <span className="text-sm font-semibold text-[var(--color-navy)]">
                  Add hearingtest.co.uk
                </span>
                <span className="text-sm text-[var(--color-primary)] font-semibold ml-1">
                  +&pound;69/yr
                </span>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Also appear in hearing test searches on our sister site
                </p>
              </div>
            </label>
          </div>
          <div className="mt-auto">
            <button
              onClick={() => handleChoose("platinum")}
              disabled={loading !== null}
              className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
            >
              {loading === "platinum" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting to payment...
                </>
              ) : (
                <>Choose Platinum &mdash; &pound;{platinumAudiology ? "268" : "199"}/yr</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ---- Terms & Conditions (above payment info) ---- */}
      <div className="mb-6">
        <h3
          className="text-sm font-semibold text-[var(--color-navy)] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Terms &amp; Conditions
        </h3>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 max-h-48 overflow-y-auto text-xs text-gray-500 leading-relaxed space-y-2.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <p className="font-semibold text-gray-600">eyetest.co.uk Directory Listing Agreement</p>
          <p>
            eyetest.co.uk is a trading style of Global Digital Solutions Limited. By subscribing to a listing on eyetest.co.uk, you agree to the following terms. Please read them carefully before proceeding.
          </p>
          <p className="font-semibold text-gray-600">1. Service Description</p>
          <p>
            eyetest.co.uk provides a directory listing service that displays your optician practice information, location, and appointment availability to users searching for eye tests in the United Kingdom. Your listing may include your practice name, address, contact details, opening hours, services offered, and links to your booking system.
          </p>
          <p className="font-semibold text-gray-600">2. Subscription &amp; Payment</p>
          <p>
            Subscriptions are billed annually as a single upfront payment for a 12-month period. Payment is processed securely via Stripe. By subscribing, you authorise recurring annual payments until you cancel. All prices are exclusive of VAT where applicable.
          </p>
          <p className="font-semibold text-gray-600">3. Renewal</p>
          <p>
            Your subscription will automatically renew for a further 12-month period. Renewal payment may be taken up to 14 days prior to your subscription expiry date. You will receive an email reminder before renewal. If you do not wish to renew, you must cancel before the renewal payment is processed.
          </p>
          <p className="font-semibold text-gray-600">4. Cancellation</p>
          <p>
            You may cancel your subscription at any time by contacting us at hello@eyetest.co.uk or through your account settings. Cancellation will take effect at the end of your current 12-month billing period. No partial refunds are issued for the remaining portion of a paid subscription term. Upon cancellation, your listing will remain active until the end of the current billing period, after which it will be removed from the directory.
          </p>
          <p className="font-semibold text-gray-600">5. Money-Back Guarantee</p>
          <p>
            New subscribers are entitled to a 30-day money-back guarantee from the date of initial payment. If you are not satisfied with the service within the first 30 days, contact us for a full refund. This guarantee applies to first-time subscriptions only and does not apply to renewals.
          </p>
          <p className="font-semibold text-gray-600">6. Listing Content &amp; Accuracy</p>
          <p>
            You are responsible for ensuring that all information provided for your listing is accurate, up to date, and not misleading. eyetest.co.uk reserves the right to edit or remove listings that contain inaccurate, inappropriate, or misleading content. We may also update listing formats and presentation at our discretion.
          </p>
          <p className="font-semibold text-gray-600">7. Limitation of Liability</p>
          <p>
            eyetest.co.uk is a directory and comparison service only. We do not provide optical, medical, or healthcare services and accept no liability for the services provided by listed opticians. We make no guarantees regarding the volume of traffic, enquiries, or appointments generated by your listing. The platform is provided &ldquo;as is&rdquo; and we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
          </p>
          <p className="font-semibold text-gray-600">8. Intellectual Property</p>
          <p>
            By submitting content for your listing, you grant eyetest.co.uk a non-exclusive licence to display your practice name, logo, and associated information on our platform for the duration of your subscription. All other intellectual property rights remain with their respective owners.
          </p>
          <p className="font-semibold text-gray-600">9. Data Protection</p>
          <p>
            We process your data in accordance with our Privacy Policy and applicable UK data protection legislation, including the UK GDPR. Contact and listing information will be displayed publicly on the directory.
          </p>
          <p className="font-semibold text-gray-600">10. Modifications</p>
          <p>
            eyetest.co.uk reserves the right to modify these terms at any time. We will notify active subscribers of material changes by email at least 30 days in advance. Continued use of the service after notification constitutes acceptance of the updated terms.
          </p>
          <p className="font-semibold text-gray-600">11. Governing Law</p>
          <p>
            These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
          <p className="text-gray-400 mt-3">Last updated: July 2026</p>
        </div>

        {/* Terms acceptance checkbox */}
        <label className="flex items-start gap-3 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] mt-0.5 cursor-pointer"
          />
          <span className="text-sm text-gray-600">
            I have read and agree to the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              Terms of Service
            </a>{" "}
            including the{" "}
            <a
              href="/terms#listing-services"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline font-medium"
            >
              Listing Services
            </a>{" "}
            terms and the Directory Listing Agreement above.
            <span className="text-red-500 ml-0.5">*</span>
          </span>
        </label>

        {!termsAccepted && error === "Please accept the terms and conditions to proceed." && (
          <p className="text-sm text-red-600 mt-2">Please accept the terms and conditions to proceed.</p>
        )}
      </div>

      {/* ---- Stripe payment bar ---- */}
      <div className="flex flex-col items-center gap-2 mb-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Secure checkout powered by
        </div>
        {/* Stripe logo */}
        <svg className="h-7" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Stripe">
          <path fillRule="evenodd" clipRule="evenodd" d="M60 12.835c0-4.247-2.058-7.6-5.994-7.6-3.95 0-6.342 3.353-6.342 7.567 0 4.995 2.822 7.517 6.87 7.517 1.975 0 3.467-.448 4.594-1.078v-3.32c-1.127.563-2.42.912-4.06.912-1.608 0-3.035-.563-3.218-2.52h8.117c0-.215.033-1.078.033-1.478zm-8.2-1.578c0-1.874 1.144-2.653 2.19-2.653 1.01 0 2.09.78 2.09 2.653h-4.28zM41.483 5.235c-1.624 0-2.668.763-3.248 1.294l-.216-1.028h-3.616v19.36l4.11-.872.016-4.697c.596.432 1.474 1.044 2.938 1.044 2.97 0 5.676-2.388 5.676-7.65-.016-4.813-2.755-7.451-5.66-7.451zm-.996 11.465c-.98 0-1.558-.348-1.958-.78l-.016-6.153c.432-.48 1.027-.796 1.974-.796 1.508 0 2.553 1.693 2.553 3.848 0 2.205-1.028 3.881-2.553 3.881zM30.237 4.273l4.127-.88V0l-4.127.863v3.41zM34.364 5.5h-4.127v14.562h4.127V5.5zM25.813 6.926l-.266-1.426h-3.55v14.562h4.11V9.38c.97-1.261 2.613-1.028 3.118-.846V5.5c-.522-.198-2.438-.564-3.412 1.426zM17.73 1.76l-4.012.847-.016 13.319c0 2.454 1.842 4.263 4.296 4.263 1.36 0 2.354-.248 2.904-.547v-3.336c-.533.216-3.168.98-3.168-1.477V8.804h3.168V5.5H17.734l-.004-3.74zM5.994 9.562c0-.647.532-.896 1.41-.896 1.26 0 2.854.38 4.114 1.062V5.947c-1.376-.547-2.738-.763-4.114-.763C3.003 5.184 0 7.572 0 11.27c0 5.74 7.902 4.83 7.902 7.302 0 .763-.664 1.012-1.592 1.012-1.376 0-3.135-.564-4.528-1.327v3.832c1.542.664 3.1.946 4.528.946 4.462 0 7.531-2.205 7.531-5.953C13.825 11.02 5.994 12.115 5.994 9.562z" fill="#635BFF" />
        </svg>
        {/* Payment method icons */}
        <div className="flex items-center gap-3 mt-1">
          {/* Visa */}
          <svg className="h-6 w-9" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
            <rect width="36" height="24" rx="4" fill="#F6F9FC" stroke="#E0E6EB" />
            <path d="M15.39 15.61h-2.2l1.38-8.48h2.2l-1.38 8.48z" fill="#3C58BF" />
            <path d="M24.1 7.32c-.44-.17-1.12-.35-1.97-.35-2.18 0-3.71 1.16-3.72 2.81-.02 1.22 1.1 1.9 1.93 2.31.86.42 1.15.69 1.14 1.06-.01.57-.68.83-1.31.83-.88 0-1.34-.13-2.06-.44l-.28-.13-.31 1.89c.51.24 1.46.44 2.44.45 2.31 0 3.82-1.14 3.83-2.91.01-.97-.58-1.71-1.85-2.32-.77-.39-1.24-.66-1.24-1.06.01-.36.4-.74 1.26-.74.72-.01 1.24.15 1.64.33l.2.1.3-1.83z" fill="#3C58BF" />
            <path d="M27.46 7.13h-1.7c-.53 0-.92.15-1.15.7l-3.27 7.78h2.31s.38-1.04.46-1.27h2.83c.07.3.27 1.27.27 1.27H29l-1.54-8.48zm-2.72 5.47c.18-.49.88-2.38.88-2.38-.01.02.18-.49.29-.81l.15.73s.42 2.05.51 2.46h-1.83z" fill="#3C58BF" />
            <path d="M12.34 7.13l-2.16 5.78-.23-1.18c-.4-1.36-1.66-2.84-3.06-3.58l1.97 7.45h2.33l3.47-8.47h-2.32z" fill="#3C58BF" />
            <path d="M8.42 7.13H4.94l-.03.18c2.76.7 4.59 2.41 5.35 4.46l-.77-3.92c-.13-.54-.52-.7-1.07-.72z" fill="#E6A540" />
          </svg>
          {/* Mastercard */}
          <svg className="h-6 w-9" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
            <rect width="36" height="24" rx="4" fill="#F6F9FC" stroke="#E0E6EB" />
            <circle cx="15" cy="12" r="6" fill="#EB001B" />
            <circle cx="21" cy="12" r="6" fill="#F79E1B" />
            <path d="M18 7.5a5.97 5.97 0 012.12 4.5A5.97 5.97 0 0118 16.5a5.97 5.97 0 01-2.12-4.5A5.97 5.97 0 0118 7.5z" fill="#FF5F00" />
          </svg>
          {/* Amex */}
          <svg className="h-6 w-9" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Amex">
            <rect width="36" height="24" rx="4" fill="#2557D6" />
            <text x="18" y="14" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="system-ui">AMEX</text>
          </svg>
          {/* Apple Pay */}
          <div className="flex items-center justify-center h-6 w-9 rounded border border-gray-200 bg-[#F6F9FC]">
            <svg className="h-3.5" viewBox="0 0 40 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Pay">
              <path d="M7.4 2.2c-.5.6-1.3 1-2 1-.1-.8.3-1.6.7-2.1.5-.6 1.3-1 2-1.1.1.8-.2 1.6-.7 2.2zm.7 1.1c-1.1-.1-2.1.6-2.6.6-.5 0-1.4-.6-2.3-.6C1.9 3.4.5 4.6.5 7.1c0 1.6.6 3.2 1.4 4.3.7 1 1.3 1.8 2.2 1.8.9 0 1.2-.6 2.3-.6 1 0 1.3.6 2.2.6s1.4-.8 2-1.7c.7-1 .9-1.9.9-2 0 0-1.8-.7-1.8-2.7 0-1.7 1.4-2.5 1.4-2.6-.8-1.1-2-1.2-2.4-1.2h-.6z" fill="#000" />
              <path d="M16.8 1.1c2.6 0 4.5 1.8 4.5 4.5 0 2.7-1.9 4.5-4.6 4.5h-2.9v4.6h-2.2V1.1h5.2zm-3 7.2h2.4c1.8 0 2.9-1 2.9-2.7s-1-2.7-2.8-2.7h-2.5v5.4zM22.2 11.4c0-1.8 1.3-2.8 3.7-3l2.7-.1v-.8c0-1.1-.8-1.8-2-1.8-1.1 0-1.9.6-2 1.5h-2c.1-1.9 1.7-3.3 4.1-3.3 2.4 0 4 1.3 4 3.3v6.5h-2v-1.6c-.6 1-1.8 1.8-3.2 1.8-2 0-3.3-1.2-3.3-2.9v.4zm6.4-.8v-.8l-2.4.2c-1.2.1-1.9.6-1.9 1.4 0 .8.7 1.4 1.8 1.4 1.4 0 2.5-1 2.5-2.2zM32 17c-.2 0-.5 0-.6 0v-1.7c.1 0 .5 0 .7 0 1 0 1.5-.4 1.8-1.5l.2-.5-3.7-10h2.3l2.5 8.2h0l2.5-8.2H40l-3.8 10.6c-.9 2.4-1.8 3.1-3.7 3.1h-.5z" fill="#000" />
            </svg>
          </div>
          {/* Google Pay */}
          <div className="flex items-center justify-center h-6 w-9 rounded border border-gray-200 bg-[#F6F9FC]">
            <span className="text-[7px] font-bold text-gray-500">GPay</span>
          </div>
        </div>
      </div>

      {/* ---- Trust badges row ---- */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 py-3">
        {[
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            ),
            text: "Secure payment via Stripe",
          },
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            ),
            text: "30-day money-back guarantee",
          },
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            text: "Live within 24 hours",
          },
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ),
            text: "Cancel anytime",
          },
        ].map((badge) => (
          <div
            key={badge.text}
            className="flex items-center gap-1.5 text-xs text-gray-500"
          >
            <svg
              className="w-4 h-4 text-[var(--color-primary)] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {badge.icon}
            </svg>
            {badge.text}
          </div>
        ))}
      </div>

      {/* ---- ROI section ---- */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-[var(--color-primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
          <div>
            <h3
              className="font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your listing pays for itself
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your listing typically pays for itself in the first few
              appointments &mdash; every appointment after that is pure profit.
            </p>
          </div>
        </div>
      </div>

      {/* ---- FAQ section ---- */}
      <div className="mb-10">
        <h3
          className="text-lg font-bold text-[var(--color-navy)] mb-5 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Frequently asked questions
        </h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
              >
                <span className="text-sm font-medium text-[var(--color-navy)]">
                  {faq.q}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ---- Contact support ---- */}
      <div className="bg-[var(--color-navy)]/5 rounded-2xl p-6 sm:p-8 text-center mb-6">
        <h3
          className="font-bold text-[var(--color-navy)] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Questions? We&rsquo;re here to help
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Our team typically responds within a few hours on business days.
        </p>
        <a
          href="mailto:hello@eyetest.co.uk"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          hello@eyetest.co.uk
        </a>
      </div>

    </>
  );
}
