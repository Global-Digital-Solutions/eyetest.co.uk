"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Get Listed Application Form — Multi-step wizard                    */
/*  Submits via /api/get-listed → Supabase + Gmail SMTP               */
/* ------------------------------------------------------------------ */

type FormData = {
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  bookingUrl: string;
  address: string;
  postcode: string;
  town: string;
  locationCount: string;
  services: string[];
  nhsTests: boolean;
  privateTests: boolean;
  appointmentSystem: string;
  appointmentSystemOther: string;
  openingHours: string;
  message: string;
  audiologyAddon: boolean;
};

const initialFormData: FormData = {
  practiceName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  bookingUrl: "",
  address: "",
  postcode: "",
  town: "",
  locationCount: "1",
  services: [],
  nhsTests: false,
  privateTests: false,
  appointmentSystem: "",
  appointmentSystemOther: "",
  openingHours: "",
  message: "",
  audiologyAddon: false,
};

const serviceOptions = [
  "NHS Eye Tests",
  "Private Eye Tests",
  "Contact Lenses",
  "Children's Eye Tests",
  "OCT Scan",
  "Hearing Tests",
  "Home Visits",
  "Emergency Eye Care",
];

const appointmentSystems = [
  "Ocuco",
  "MySight",
  "Optix",
  "VisionPlus",
  "Optinet",
  "Raven",
  "Glasson",
  "Other",
  "None",
];

const STEP_COUNT = 4;
const stepTitles = [
  "Practice Details",
  "Location",
  "Services & Systems",
  "Additional Info",
];

/* ------------------------------------------------------------------ */
/*  Step indicator                                                     */
/* ------------------------------------------------------------------ */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
      {Array.from({ length: STEP_COUNT }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isComplete = step < current;
        return (
          <div key={step} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25"
                    : isComplete
                      ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`hidden sm:block text-xs font-medium ${
                  isActive ? "text-[var(--color-primary)]" : isComplete ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {stepTitles[i]}
              </span>
            </div>
            {step < STEP_COUNT && (
              <div
                className={`w-8 sm:w-12 h-0.5 rounded-full mb-5 sm:mb-0 ${
                  isComplete ? "bg-[var(--color-primary)]/30" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toggle component                                                   */
/* ------------------------------------------------------------------ */
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <span className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-navy)] transition-colors">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30 ${
          checked ? "bg-[var(--color-primary)]" : "bg-gray-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Main form component                                                */
/* ------------------------------------------------------------------ */
export function GetListedForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  const set = (key: keyof FormData, value: string | string[] | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (service: string) => {
    setForm((prev) => {
      const removing = prev.services.includes(service);
      return {
        ...prev,
        services: removing
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
        /* Auto-reset audiology addon when Hearing Tests is deselected */
        ...(service === "Hearing Tests" && removing
          ? { audiologyAddon: false }
          : {}),
      };
    });
  };

  /* ---- Validation ---- */
  const validateStep = (s: number): string[] => {
    const errors: string[] = [];
    if (s === 1) {
      if (!form.practiceName.trim()) errors.push("Practice name is required");
      if (!form.contactName.trim()) errors.push("Contact name is required");
      if (!form.email.trim()) errors.push("Email is required");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.push("Please enter a valid email address");
      if (!form.phone.trim()) errors.push("Phone number is required");
    }
    if (s === 2) {
      if (!form.address.trim()) errors.push("Address is required");
      if (!form.postcode.trim()) errors.push("Postcode is required");
      if (!form.town.trim()) errors.push("Town/City is required");
    }
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep(step);
    if (errors.length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors([]);
    setStep((prev) => Math.min(prev + 1, STEP_COUNT));
  };

  const handleBack = () => {
    setStepErrors([]);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    /* Only submit on the final step — prevents accidental Enter-key submission */
    if (step < STEP_COUNT) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/get-listed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSubmitting(false);
      router.push(`/get-listed/thank-you?listing_id=${data.listing_id}`);
    } catch {
      setSubmitting(false);
      setSubmitError(
        "Sorry, there was a problem submitting your application. Please try again or email us at hello@eyetest.co.uk."
      );
    }
  };

  /* ---- Shared classes ---- */
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
        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Step heading */}
        <h3
          className="text-xl font-bold text-[var(--color-navy)] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {stepTitles[step - 1]}
        </h3>

        {/* Validation errors */}
        {stepErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <ul className="text-sm text-red-700 space-y-1">
              {stepErrors.map((err) => (
                <li key={err} className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {err}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---- STEP 1: Practice Details ---- */}
        {step === 1 && (
          <div className="space-y-5">
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
              />
            </div>

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
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="0121 234 5678"
                className={inputClass}
              />
            </div>

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

            <div>
              <label className={labelClass}>
                Booking URL{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                value={form.bookingUrl}
                onChange={(e) => set("bookingUrl", e.target.value)}
                placeholder="https://booking.yourpractice.co.uk"
                className={inputClass}
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Direct link to your appointment booking page
              </p>
            </div>
          </div>
        )}

        {/* ---- STEP 2: Location ---- */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>
                Address line <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="123 High Street"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                />
              </div>
              <div>
                <label className={labelClass}>
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.town}
                  onChange={(e) => set("town", e.target.value)}
                  placeholder="London"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Number of practice locations
              </label>
              <select
                value={form.locationCount}
                onChange={(e) => set("locationCount", e.target.value)}
                className={selectClass}
              >
                <option value="1">1</option>
                <option value="2-5">2-5</option>
                <option value="6-20">6-20</option>
                <option value="21-50">21-50</option>
                <option value="51-100">51-100</option>
                <option value="100+">100+</option>
              </select>
            </div>
          </div>
        )}

        {/* ---- STEP 3: Services & Systems ---- */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Services checkboxes */}
            <fieldset>
              <legend className={labelClass}>Services offered</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center gap-3 text-sm cursor-pointer rounded-xl border px-4 py-3 transition-all ${
                      form.services.includes(service)
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-navy)]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
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

            {/* NHS / Private toggles */}
            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
              <Toggle
                label="NHS tests available"
                checked={form.nhsTests}
                onChange={(v) => set("nhsTests", v)}
              />
              <div className="border-t border-gray-200" />
              <Toggle
                label="Private tests available"
                checked={form.privateTests}
                onChange={(v) => set("privateTests", v)}
              />
            </div>

            {/* hearingtest.co.uk cross-listing — shown when Hearing Tests selected */}
            {form.services.includes("Hearing Tests") && (
              <label className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 cursor-pointer hover:bg-blue-50/80 transition-colors">
                <input
                  type="checkbox"
                  checked={form.audiologyAddon}
                  onChange={(e) => set("audiologyAddon", e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div>
                  <span className="text-sm font-medium text-[var(--color-navy)]">
                    Also list my practice on hearingtest.co.uk
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    Our sister site for hearing tests &mdash; reach patients searching for audiologists too
                  </span>
                </div>
              </label>
            )}

            {/* Appointment system */}
            <div>
              <label className={labelClass}>Appointment system</label>
              <select
                value={form.appointmentSystem}
                onChange={(e) => set("appointmentSystem", e.target.value)}
                className={selectClass}
              >
                <option value="">Select your appointment system</option>
                {appointmentSystems.map((sys) => (
                  <option key={sys} value={sys}>
                    {sys}
                  </option>
                ))}
              </select>

              {form.appointmentSystem === "Other" && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={form.appointmentSystemOther}
                    onChange={(e) => set("appointmentSystemOther", e.target.value)}
                    placeholder="Please specify your appointment system"
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---- STEP 4: Additional Info ---- */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>
                Opening hours{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={form.openingHours}
                onChange={(e) => set("openingHours", e.target.value)}
                rows={3}
                placeholder="e.g. Mon-Fri 9-5:30, Sat 9-1"
                className={inputClass + " resize-none"}
              />
            </div>

            <div>
              <label className={labelClass}>
                Message / additional information{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                rows={4}
                placeholder="Tell us about your practice, anything you'd like to highlight on your listing, or any questions you have..."
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

            {/* Error message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                {submitError}
              </div>
            )}
          </div>
        )}

        {/* ---- Navigation buttons ---- */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--color-navy)] px-5 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step < STEP_COUNT ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-7 py-3 rounded-full transition-all cursor-pointer"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-7 py-3 rounded-full transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
