import Image from "next/image";
import Link from "next/link";

type SurgeryCalloutProps = {
  /** Optional: customize the heading */
  heading?: string;
  /** Optional: add location context e.g. "in Manchester" */
  location?: string;
  /** Optional: compact version with less padding */
  compact?: boolean;
};

export function SurgeryCallout({
  heading,
  location,
  compact = false,
}: SurgeryCalloutProps) {
  const resolvedHeading =
    heading ??
    (location
      ? `Need eye surgery in ${location}?`
      : "Need eye surgery?");

  const linkText = location
    ? `Find Newmedica clinics near ${location}`
    : "Find your nearest Newmedica clinic";

  return (
    <section
      className={`${compact ? "py-8 sm:py-10" : "py-12 sm:py-16"} relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`relative rounded-2xl border border-[var(--color-primary-light)]/30 shadow-md overflow-hidden ${compact ? "p-6 sm:p-8" : "p-8 sm:p-10 lg:p-12"}`}
          style={{
            background:
              "linear-gradient(135deg, #f0f7ff 0%, #f8fffe 40%, #f0fdfc 100%)",
          }}
        >
          {/* Decorative background circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#1a5276] opacity-[0.04] blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-2xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left side: icon + content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Medical/surgical icon */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1a5276]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[#1a5276]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v-1.5m0 7.5v-1.5m-3-1.5h1.5m4.5 0H13.5"
                    />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <h2
                    className={`${compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl lg:text-[1.7rem]"} font-bold text-[var(--color-navy)] mb-2 leading-tight`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {resolvedHeading}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                    Our preferred partner Newmedica offers NHS and private eye
                    surgery at 39 clinics across England &mdash; with a 99%
                    patient recommendation rate.
                  </p>
                </div>
              </div>

              {/* Trust points */}
              <div
                className={`${compact ? "mt-4 gap-2" : "mt-5 sm:mt-6 gap-2.5 sm:gap-3"} flex flex-col`}
              >
                {[
                  "NHS-funded and private options available",
                  "4.8★ Google rating from 1,000+ reviews",
                  "39 specialist clinics across England",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5">
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-[var(--color-success)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA link */}
              <div className={compact ? "mt-5" : "mt-6 sm:mt-8"}>
                <Link
                  href="/eye-surgery/providers/new-medica"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 rounded-full transition-all hover:shadow-lg"
                >
                  {linkText}
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
                </Link>
              </div>
            </div>

            {/* Right side: photo + patient quote (desktop) */}
            <div className="hidden lg:flex flex-shrink-0 w-72 xl:w-80 flex-col items-center gap-4">
              {/* Photo of eye surgery consultation */}
              <div className="img-zoom rounded-2xl overflow-hidden shadow-md w-full">
                <Image
                  src="/images/eye-surgery-consultation-sm.jpg"
                  alt="Patient having a consultation before eye surgery at a Newmedica clinic"
                  width={480}
                  height={261}
                  className="w-full h-auto object-cover"
                  sizes="320px"
                />
              </div>

              {/* Patient quote */}
              <blockquote className="text-center px-2">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;The whole experience at Newmedica was excellent. From
                  consultation to surgery day, I felt completely reassured and
                  well looked after.&rdquo;
                </p>
                <footer className="mt-2 flex items-center justify-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1a5276] text-white text-xs font-bold flex items-center justify-center">
                    M
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-[var(--color-navy)]">
                      Margaret T.
                    </p>
                    <p className="text-xs text-gray-400">Bristol</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
