import Image from "next/image";
import Link from "next/link";

type AtHomeCalloutProps = {
  /** Optional: customize the heading */
  heading?: string;
  /** Optional: add location context e.g. "in Manchester" */
  location?: string;
  /** Optional: compact version with less padding */
  compact?: boolean;
};

export function AtHomeCallout({
  heading,
  location,
  compact = false,
}: AtHomeCalloutProps) {
  const resolvedHeading =
    heading ??
    (location
      ? `Can’t get to an optician in ${location}?`
      : "Can’t get to an optician?");

  const linkText = location
    ? `Find at-home eye tests in ${location}`
    : "Find out more about at-home eye tests";

  return (
    <section
      className={`${compact ? "py-8 sm:py-10" : "py-12 sm:py-16"} relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`relative rounded-2xl border border-[var(--color-primary-light)]/30 shadow-md overflow-hidden ${compact ? "p-6 sm:p-8" : "p-8 sm:p-10 lg:p-12"}`}
          style={{
            background:
              "linear-gradient(135deg, #f0fdfc 0%, #f8fffe 40%, #f0f4ff 100%)",
          }}
        >
          {/* Decorative background circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-[var(--color-nhs-blue)] opacity-[0.04] blur-2xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left side: icon + content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* House icon */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--color-primary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
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
                    At-home eye tests bring professional eye care to your door
                    &mdash; free on the NHS for those who need it.
                  </p>
                </div>
              </div>

              {/* Trust points */}
              <div
                className={`${compact ? "mt-4 gap-2" : "mt-5 sm:mt-6 gap-2.5 sm:gap-3"} flex flex-col`}
              >
                {[
                  "Free NHS-funded for eligible patients",
                  "Same quality as in-practice tests",
                  "Glasses delivered to your door",
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
                  href="/at-home-eye-tests"
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
              {/* Photo of elderly eye test */}
              <div className="img-zoom rounded-2xl overflow-hidden shadow-md w-full">
                <Image
                  src="/images/elderly-eye-test-sm.jpg"
                  alt="Elderly patient receiving a professional eye test at home"
                  width={480}
                  height={261}
                  className="w-full h-auto object-cover"
                  sizes="320px"
                />
              </div>

              {/* Patient quote */}
              <blockquote className="text-center px-2">
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  &ldquo;Mum can&apos;t leave the house easily, so having the
                  optician come to her was a huge relief for the whole
                  family.&rdquo;
                </p>
                <footer className="mt-2 flex items-center justify-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                    R
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-[var(--color-navy)]">
                      Rachel D.
                    </p>
                    <p className="text-xs text-gray-400">Leeds</p>
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
