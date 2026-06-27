"use client";

import { useState, type FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Eye Surgery Enquiry Form                                           */
/*  Collects surgery enquiry details and submits to /api/surgery-      */
/*  enquiry -> Gmail SMTP -> hello@eyetest.co.uk                       */
/* ------------------------------------------------------------------ */

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  condition: string;
  fundingType: string;
  notes: string;
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  postcode: "",
  condition: "",
  fundingType: "",
  notes: "",
};

const CONDITIONS = [
  "Cataracts",
  "Glaucoma",
  "Laser Eye Surgery",
  "Retinal Surgery",
  "Eyelid Surgery",
  "Macular Degeneration",
  "Corneal Conditions",
  "Other",
];

export function SurgeryEnquiryForm() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ---- Submit handler ---- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/surgery-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setSubmitting(false);
      setSubmitError(
        "Sorry, there was a problem submitting your enquiry. Please try again or email us at hello@eyetest.co.uk."
      );
    }
  };

  /* ---- Success state ---- */
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold text-[var(--color-navy)] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Enquiry submitted
        </h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          Your enquiry has been submitted. We&rsquo;ll be in touch within 24
          hours to help connect you with the right eye surgery provider.
        </p>
        <p className="text-sm text-gray-500">
          If you have any questions, email us at{" "}
          <a
            href="mailto:hello@eyetest.co.uk"
            className="text-[var(--color-primary)] hover:underline"
          >
            hello@eyetest.co.uk
          </a>
        </p>
      </div>
    );
  }

  /* ---- Input helpers ---- */
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-[var(--color-navy)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-colors text-sm placeholder:text-gray-400";
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-[var(--color-navy)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-colors text-sm appearance-none cursor-pointer";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden"
    >
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          <div>
            <h3
              className="text-xl font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Eye Surgery Enquiry
            </h3>
            <p className="text-sm text-gray-500">
              Complete the form below and we&rsquo;ll help connect you with the
              right eye surgery provider.
            </p>
          </div>

          {/* Full Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="John Smith"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="email@example.co.uk"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Phone + Postcode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="07700 900123"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.postcode}
                onChange={(e) => set("postcode", e.target.value)}
                placeholder="SW1A 1AA"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Condition/Treatment */}
          <div>
            <label className={labelClass}>
              Condition / Treatment <span className="text-red-500">*</span>
            </label>
            <select
              value={form.condition}
              onChange={(e) => set("condition", e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Select a condition or treatment</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* NHS or Private */}
          <fieldset>
            <legend className={labelClass}>
              NHS or Private? <span className="text-red-500">*</span>
            </legend>
            <div className="flex gap-3 mt-1">
              {[
                { value: "NHS", label: "NHS" },
                { value: "Private", label: "Private" },
                { value: "Not sure", label: "Not sure" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set("fundingType", opt.value)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                    form.fundingType === opt.value
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Additional Notes */}
          <div>
            <label className={labelClass}>
              Additional Notes{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Any additional information about your condition, previous treatments, or preferences..."
              className={inputClass + " resize-none"}
            />
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-gray-400 leading-relaxed">
            By submitting this form, you consent to us sharing your details with
            a suitable eye surgery provider. All data is processed in accordance
            with the Data Protection Act 2018 and UK GDPR. Read our{" "}
            <a href="/privacy" className="underline hover:text-gray-600">
              Privacy Policy
            </a>
            .
          </p>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={
                submitting ||
                !form.fullName ||
                !form.email ||
                !form.phone ||
                !form.postcode ||
                !form.condition ||
                !form.fundingType
              }
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Submit enquiry
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
