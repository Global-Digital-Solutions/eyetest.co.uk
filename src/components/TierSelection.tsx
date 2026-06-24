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
  const [audiologyAddon, setAudiologyAddon] = useState(initialAudiologyAddon);
  const [loading, setLoading] = useState<"gold" | "platinum" | null>(null);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChoose = async (tier: "gold" | "platinum") => {
    setLoading(tier);
    setError("");

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
                &pound;99
              </span>
              <span className="text-gray-500 text-sm">/year</span>
              <span className="ml-2 text-xs text-gray-400">(just &pound;8.25/mo)</span>
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
                "Choose Gold"
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
                &pound;149
              </span>
              <span className="text-gray-500 text-sm">/year</span>
              <span className="ml-2 text-xs text-gray-400">(just &pound;12.42/mo)</span>
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
                "Choose Platinum"
              )}
            </button>
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
              The average optician earns &pound;50+ per eye test booking from
              test fees, lenses, and frames. Your listing pays for itself with
              just 2&ndash;3 bookings per year &mdash; everything after that is
              pure profit.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Audiology add-on ---- */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-10">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={audiologyAddon}
            onChange={(e) => setAudiologyAddon(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] mt-0.5 cursor-pointer"
          />
          <div>
            <h3
              className="font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Also list on hearingtest.co.uk?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Add your audiology practice at the same address for just{" "}
              <span className="font-semibold">&pound;49/year</span>. Reach
              patients searching for hearing tests near you on our sister site.
            </p>
          </div>
        </label>
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

      {/* ---- Error message ---- */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}
    </>
  );
}
