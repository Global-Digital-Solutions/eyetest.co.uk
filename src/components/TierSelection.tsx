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

  return (
    <>
      {/* ---- Success banner ---- */}
      <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-2xl p-6 sm:p-8 text-center mb-10">
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
          Application received!
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Thank you, <span className="font-semibold">{practiceName}</span>.
          We&rsquo;ve received your listing application for postcode{" "}
          <span className="font-semibold">{postcode}</span>.
        </p>
      </div>

      {/* ---- Pricing tier cards ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Gold Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col">
          <div className="mb-6">
            <h3
              className="text-xl font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gold Listing
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-3xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &pound;99
              </span>
              <span className="text-gray-500 text-sm">/year</span>
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
                <span>Your practice name, address, phone displayed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Direct handoff to your website or booking link</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Listed as a verified local optician</span>
              </li>
            </ul>
          </div>
          <p className="text-xs text-gray-500 mb-6 mt-auto">
            That&rsquo;s just &pound;8.25/month &mdash; pay for itself with 2
            bookings
          </p>
          <button
            onClick={() => handleChoose("gold")}
            disabled={loading !== null}
            className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
          >
            {loading === "gold" ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Redirecting...
              </>
            ) : (
              "Choose Gold"
            )}
          </button>
        </div>

        {/* Platinum Card */}
        <div className="bg-white rounded-xl border-2 border-[var(--color-primary)] shadow-md p-6 sm:p-8 flex flex-col relative">
          {/* Most Popular badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Most Popular
            </span>
          </div>

          <div className="mb-6 mt-2">
            <h3
              className="text-xl font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Platinum Listing
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="text-3xl font-bold text-[var(--color-navy)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &pound;149
              </span>
              <span className="text-gray-500 text-sm">/year</span>
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
                <span>Enhanced visibility with indigo highlight styling</span>
              </li>
              <li className="flex items-start gap-2">
                <Check />
                <span>Priority display for all searches in your radius</span>
              </li>
            </ul>
          </div>
          <p className="text-xs text-gray-500 mb-6 mt-auto">
            That&rsquo;s just &pound;12.42/month &mdash; pay for itself with 3
            bookings
          </p>
          <button
            onClick={() => handleChoose("platinum")}
            disabled={loading !== null}
            className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-full transition-all cursor-pointer"
          >
            {loading === "platinum" ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Redirecting...
              </>
            ) : (
              "Choose Platinum"
            )}
          </button>
        </div>
      </div>

      {/* ---- ROI section ---- */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8 mb-10">
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
              just 2&ndash;3 bookings per year.
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

      {/* ---- Error message ---- */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">
          {error}
        </div>
      )}
    </>
  );
}
