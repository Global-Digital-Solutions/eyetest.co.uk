import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

export function NHSBanner() {
  return (
    <section className="py-14 sm:py-16 relative overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e8f4fd 0%, #f0f4ff 40%, #e8f8f7 70%, #f0f4ff 100%)",
        }}
      />

      {/* Decorative floating shapes */}
      <div className="absolute top-8 right-[10%] w-24 h-24 rounded-full bg-[var(--color-nhs-blue)] opacity-[0.04] blur-xl animate-float" />
      <div className="absolute bottom-4 left-[15%] w-32 h-32 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-xl animate-float-delay" />

      <div className="relative max-w-7xl mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image column */}
            <div className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
              <div className="relative img-zoom rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/elderly-eye-test-md.jpg"
                  alt="Elderly woman receiving a professional eye test at home"
                  width={480}
                  height={320}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 0px, 384px"
                />
                {/* NHS badge overlay */}
                <div className="absolute top-4 left-4 bg-[var(--color-nhs-blue)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  NHS Funded
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-5">
                {/* NHS Logo */}
                <div className="w-16 h-16 bg-[var(--color-nhs-blue)] rounded-xl flex items-center justify-center shadow-md shadow-[var(--color-nhs-blue)]/20">
                  <span
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    NHS
                  </span>
                </div>
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[var(--color-navy)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Are you eligible for a free NHS eye test?
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 mb-5 max-w-2xl leading-relaxed">
                Many people qualify for free NHS-funded eye tests — including
                under-16s, over-60s, people receiving certain benefits, and
                those with specific medical conditions. Check if you&apos;re
                eligible and save on your next eye test.
              </p>

              {/* Quick eligibility badges */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                {[
                  "Over 60",
                  "Under 16",
                  "Diabetes",
                  "Glaucoma risk",
                  "Income support",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 text-xs bg-white border border-[var(--color-nhs-blue)]/20 text-[var(--color-nhs-blue)] px-3 py-1.5 rounded-full font-medium"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>

              <Link
                href="/eye-health/guides/understanding-nhs-eye-test-eligibility"
                className="inline-flex items-center gap-2 bg-[var(--color-nhs-blue)] hover:bg-[#004a93] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
              >
                Check NHS eligibility
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
        </ScrollReveal>
      </div>
    </section>
  );
}
