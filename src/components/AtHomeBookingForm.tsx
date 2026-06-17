"use client";

import { useState, type FormEvent } from "react";

/* ------------------------------------------------------------------ */
/*  At-Home Eye Test Booking Form                                      */
/*  Provider-agnostic — our team allocates the enquiry to the best    */
/*  suitable at-home eye care provider based on submitted details.     */
/*  Currently submits to hello@eyetest.co.uk via mailto fallback.     */
/*  Will be replaced with a Cloudflare Worker once commercials         */
/*  are agreed.                                                        */
/* ------------------------------------------------------------------ */

type FormData = {
  testType: string;
  eligibleNHS: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  contactIs: string;
  contactRelationship: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  town: string;
  postcode: string;
  country: string;
  furtherDetails: string;
  consentPost: boolean;
  consentText: boolean;
  consentEmail: boolean;
  consentPhone: boolean;
};

const initialFormData: FormData = {
  testType: "eye",
  eligibleNHS: "",
  title: "",
  firstName: "",
  lastName: "",
  dob: "",
  contactIs: "patient",
  contactRelationship: "",
  contactFirstName: "",
  contactLastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  town: "",
  postcode: "",
  country: "England",
  furtherDetails: "",
  consentPost: false,
  consentText: false,
  consentEmail: false,
  consentPhone: false,
};

export function AtHomeBookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* ---- Submit handler ---- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Build a mailto fallback — this will be replaced by a Worker
    const subject = encodeURIComponent(
      `At-Home Eye Test Booking — ${form.firstName} ${form.lastName}`
    );
    const body = encodeURIComponent(
      [
        `Test type: ${form.testType}`,
        `NHS eligible: ${form.eligibleNHS}`,
        ``,
        `--- Patient Details ---`,
        `Title: ${form.title}`,
        `Name: ${form.firstName} ${form.lastName}`,
        `Date of birth: ${form.dob}`,
        ``,
        `--- Contact ---`,
        `Contact is: ${form.contactIs}`,
        form.contactIs === "someone-else"
          ? `Relationship: ${form.contactRelationship}\nContact name: ${form.contactFirstName} ${form.contactLastName}`
          : "",
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        ``,
        `--- Address ---`,
        `${form.addressLine1}`,
        form.addressLine2 ? `${form.addressLine2}` : "",
        `${form.town}`,
        `${form.postcode}`,
        `${form.country}`,
        ``,
        `--- Additional info ---`,
        form.furtherDetails || "(none)",
        ``,
        `--- Marketing consent ---`,
        `Post: ${form.consentPost ? "Yes" : "No"}`,
        `Text: ${form.consentText ? "Yes" : "No"}`,
        `Email: ${form.consentEmail ? "Yes" : "No"}`,
        `Phone: ${form.consentPhone ? "Yes" : "No"}`,
      ]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:hello@eyetest.co.uk?subject=${subject}&body=${body}`;

    // Show success after a short delay
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
          Enquiry submitted
        </h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          Thank you for your enquiry. Our team will review your details and
          match you with the most suitable at-home eye care provider in your
          area. We&rsquo;ll be in touch shortly.
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
      {/* ---- Progress bar ---- */}
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-[var(--color-primary)] transition-all duration-500 rounded-r-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        {/* ============================================================ */}
        {/* STEP 1: Test type & eligibility                              */}
        {/* ============================================================ */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h3
                className="text-xl font-bold text-[var(--color-navy)] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Request an at-home eye test
              </h3>
              <p className="text-sm text-gray-500">
                Step 1 of 3 — Test type &amp; eligibility
              </p>
            </div>

            {/* Test type */}
            <fieldset>
              <legend className={labelClass}>
                What appointment would you like to book?
              </legend>
              <div className="flex gap-3 mt-1">
                {[
                  { value: "eye", label: "Eye test", icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                  { value: "hearing", label: "Hearing test", icon: "M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" },
                  { value: "both", label: "Both", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("testType", opt.value)}
                    className={`flex-1 flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all cursor-pointer ${
                      form.testType === opt.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300 text-gray-500"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={opt.icon} />
                    </svg>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* NHS eligibility question */}
            <fieldset>
              <legend className={labelClass}>
                Does the person you are booking for struggle to get to an
                optician on their own, for example due to mobility or health
                reasons? <span className="text-red-500">*</span>
              </legend>
              <div className="flex gap-3 mt-1">
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("eligibleNHS", opt.value)}
                    className={`flex-1 px-6 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                      form.eligibleNHS === opt.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Private fee notice */}
              {form.eligibleNHS === "no" && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                  <p>
                    Based on the information provided, they may not currently be
                    eligible for an NHS-funded eye test at home. A private home
                    visit can still be arranged with a <strong>£60 call-out fee</strong>.
                    By continuing, you confirm that you understand and accept
                    this charge.
                  </p>
                  <a
                    href="/at-home-eye-tests#eligibility"
                    className="text-amber-700 underline hover:text-amber-900 mt-1 inline-block"
                  >
                    View the full NHS eligibility guidelines
                  </a>
                </div>
              )}
            </fieldset>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={!form.eligibleNHS}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full transition-all cursor-pointer"
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: Patient details                                      */}
        {/* ============================================================ */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3
                className="text-xl font-bold text-[var(--color-navy)] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Who will be taking the test?
              </h3>
              <p className="text-sm text-gray-500">
                Step 2 of 3 — Patient details
              </p>
            </div>

            {/* Title + name row */}
            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className={labelClass}>
                  Title <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Mx">Mx</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="col-span-3 sm:col-span-1">
                <label className={labelClass}>
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className={labelClass}>
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className={labelClass}>
                  Date of birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => set("dob", e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Contact person */}
            <fieldset>
              <legend className={labelClass}>
                Who is the point of contact for this appointment?
              </legend>
              <div className="flex gap-3 mt-1">
                {[
                  { value: "patient", label: "The patient" },
                  { value: "someone-else", label: "Someone else" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("contactIs", opt.value)}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                      form.contactIs === opt.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* If someone else is the contact */}
            {form.contactIs === "someone-else" && (
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div>
                  <label className={labelClass}>
                    Relationship to patient <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.contactRelationship}
                    onChange={(e) => set("contactRelationship", e.target.value)}
                    className={selectClass}
                    required
                  >
                    <option value="">Please choose</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Child">Son/Daughter</option>
                    <option value="Carer">Carer</option>
                    <option value="Friend">Friend</option>
                    <option value="Care home manager">Care home manager</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      Your first name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.contactFirstName}
                      onChange={(e) => set("contactFirstName", e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Your last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.contactLastName}
                      onChange={(e) => set("contactLastName", e.target.value)}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium px-4 py-3 rounded-full transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!form.firstName || !form.lastName || !form.email || !form.phone}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full transition-all cursor-pointer"
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: Address & submit                                     */}
        {/* ============================================================ */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3
                className="text-xl font-bold text-[var(--color-navy)] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Address &amp; final details
              </h3>
              <p className="text-sm text-gray-500">
                Step 3 of 3 — Where the test will take place
              </p>
            </div>

            {/* Address fields */}
            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  Address line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.addressLine1}
                  onChange={(e) => set("addressLine1", e.target.value)}
                  placeholder="House number and street name"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Address line 2</label>
                <input
                  type="text"
                  value={form.addressLine2}
                  onChange={(e) => set("addressLine2", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Town/City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.town}
                    onChange={(e) => set("town", e.target.value)}
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
              <div>
                <label className={labelClass}>
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.country}
                  onChange={(e) => set("country", e.target.value)}
                  className={selectClass}
                  required
                >
                  <option value="England">England</option>
                  <option value="Scotland">Scotland</option>
                  <option value="Wales">Wales</option>
                </select>
              </div>
            </div>

            {/* Further details */}
            <div>
              <label className={labelClass}>
                Further details{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={form.furtherDetails}
                onChange={(e) => set("furtherDetails", e.target.value)}
                rows={3}
                placeholder="House directions, parking restrictions, when your last eye test was, or anything else we should know..."
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Marketing consent */}
            <fieldset className="bg-gray-50 rounded-xl p-5">
              <legend className="text-sm font-medium text-gray-700 mb-3">
                We&rsquo;d like to keep you informed about at-home eye care
                services and offers. Tick the channels you&rsquo;re happy
                to be contacted on:
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ["consentPost", "Post"],
                    ["consentText", "Text messages"],
                    ["consentEmail", "Email"],
                    ["consentPhone", "Phone calls"],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form[key] as boolean}
                      onChange={(e) => set(key, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    {label}
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                You can opt out at any time. We will never sell your details to
                third parties.
              </p>
            </fieldset>

            {/* Privacy notice */}
            <p className="text-xs text-gray-400 leading-relaxed">
              By submitting this form, you confirm that you have permission to
              share these contact details and that the patient is aware of this
              enquiry. Your details will be shared with a suitable at-home eye
              care provider in your area. All data is processed in accordance
              with the Data Protection Act 2018 and UK GDPR. Read our{" "}
              <a href="/privacy" className="underline hover:text-gray-600">
                Privacy Policy
              </a>
              .
            </p>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium px-4 py-3 rounded-full transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
              </button>
              <button
                type="submit"
                disabled={submitting || !form.addressLine1 || !form.town || !form.postcode}
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
        )}
      </div>
    </form>
  );
}
