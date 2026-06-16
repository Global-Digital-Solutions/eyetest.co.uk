import Link from "next/link";

export function NHSBanner() {
  return (
    <section className="py-10 sm:py-12 bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* NHS Logo placeholder */}
          <div className="flex-shrink-0 w-20 h-20 bg-[var(--color-nhs-blue)] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              NHS
            </span>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2
              className="text-xl font-bold text-[var(--color-navy)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Are you eligible for a free NHS eye test?
            </h2>
            <p className="text-sm text-gray-600 mb-3 max-w-2xl">
              Many people qualify for free NHS-funded eye tests — including
              under-16s, over-60s, people receiving certain benefits, and those
              with specific medical conditions. Check if you&apos;re eligible.
            </p>
            <Link
              href="/eye-tests/nhs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-nhs-blue)] hover:underline"
            >
              Check NHS eligibility
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
