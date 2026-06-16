"use client";

import { useState, type FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Get Listed Application Form                                        */
/*  Sends application details via mailto to butlerdarin@gmail.com.     */
/* ------------------------------------------------------------------ */

type FormData = {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  locationCount: string;
  website: string;
  services: string[];
  message: string;
};

const initialFormData: FormData = {
  practiceName: "",
  contactName: "",
  email: "",
  phone: "",
  locationCount: "1",
  website: "",
  services: [],
  message: "",
};

const serviceOptions = [
  "NHS Eye Tests",
  "Private Eye Tests",
  "Contact Lenses",
  "Children's Tests",
  "OCT Scan",
  "Hearing Tests",
  "Home Visits",
];

export function GetListedForm() {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = encodeURIComponent(
      `Get Listed Application — ${form.practiceName}`
    );
    const body = encodeURIComponent(
      [
        `--- Practice Details ---`,
        `Practice name: ${form.practiceName}`,
        `Contact name: ${form.contactName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Number of locations: ${form.locationCount}`,
        `Website: ${form.website || "(not provided)"}`,
        ``,
        `--- Services Offered ---`,
        form.services.length > 0 ? form.services.join(", ") : "(none selected)",
        ``,
        `--- Additional Information ---`,
        form.message || "(none)",
      ].join("\n")
    );

    window.location.href = `mailto:butlerdarin@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
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
          Application submitted
        </h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          Thank you for your interest in being listed on eyetest.co.uk. Our team
          will review your application and be in touch within 2 business days.
        </p>
        <p className="text-sm text-gray-500">
          If you have any questions, email us at{" "}
          <a
            href="mailto:butlerdarin@gmail.com"
            className="text-[var(--color-primary)] hover:underline"
          >
            butlerdarin@gmail.com
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
      <div className="p-6 sm:p-8 lg:p-10 space-y-6">
        {/* Practice name */}
        <div>
          <label className={labelClass}>
            Practice name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.practiceName}
            onChange={(e) => set("practiceName", e.target.value)}
            placeholder="e.g. Clear Vision Opticians"
            className={inputClass}
            required
          />
        </div>

        {/* Contact name + email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Contact name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.contactName}
              onChange={(e) => set("contactName", e.target.value)}
              placeholder="Full name"
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
              placeholder="you@practice.co.uk"
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Phone + locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="01onal 123 4567"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Number of locations</label>
            <select
              value={form.locationCount}
              onChange={(e) => set("locationCount", e.target.value)}
              className={selectClass}
            >
              <option value="1">1</option>
              <option value="2-5">2-5</option>
              <option value="6-20">6-20</option>
              <option value="20+">20+</option>
            </select>
          </div>
        </div>

        {/* Website */}
        <div>
          <label className={labelClass}>
            Website URL{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="https://www.yourpractice.co.uk"
            className={inputClass}
          />
        </div>

        {/* Services */}
        <fieldset>
          <legend className={labelClass}>Services offered</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
            {serviceOptions.map((service) => (
              <label
                key={service}
                className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.services.includes(service)}
                  onChange={() => toggleService(service)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                {service}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Message */}
        <div>
          <label className={labelClass}>
            Message / additional information{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            rows={4}
            placeholder="Tell us a bit about your practice, anything specific you'd like to highlight on your listing, or any questions you have..."
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Privacy */}
        <p className="text-xs text-gray-400 leading-relaxed">
          By submitting this form, you agree to be contacted by the
          eyetest.co.uk team regarding your listing application. All data is
          processed in accordance with the Data Protection Act 2018 and UK
          GDPR. Read our{" "}
          <a href="/privacy" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
          .
        </p>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={
              submitting ||
              !form.practiceName ||
              !form.contactName ||
              !form.email ||
              !form.phone
            }
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full transition-all cursor-pointer"
          >
            {submitting ? (
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
                Sending...
              </>
            ) : (
              <>
                Submit Application
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
