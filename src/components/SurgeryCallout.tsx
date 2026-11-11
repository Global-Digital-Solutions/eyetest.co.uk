import Link from "next/link";
import { surgeryProviders } from "@/data/surgery-providers";

type SurgeryCalloutProps = {
  /** Optional: customize the heading */
  heading?: string;
  /** Optional: add location context e.g. "in Manchester" */
  location?: string;
  /** Optional: compact version with less padding */
  compact?: boolean;
};

/**
 * Neutral eye surgery callout. No provider is promoted or ranked: providers
 * are named in alphabetical order and the figures are counts from our own
 * clinic list.
 */
export function SurgeryCallout({
  heading,
  location,
  compact = false,
}: SurgeryCalloutProps) {
  const resolvedHeading =
    heading ?? (location ? `Need eye surgery in ${location}?` : "Need eye surgery?");
  const linkText = location ? `Find clinics near ${location}` : "Find your nearest clinic";

  const providerNames = surgeryProviders.map((p) => p.name).sort((a, b) => a.localeCompare(b));
  const clinicCount = surgeryProviders.reduce((n, p) => n + p.clinics.length, 0);
  const nameList =
    providerNames.length > 1
      ? `${providerNames.slice(0, -1).join(", ")} and ${providerNames[providerNames.length - 1]}`
      : providerNames[0];

  const stats = [
    { value: String(providerNames.length), label: "Providers" },
    { value: String(clinicCount), label: "Clinics" },
    { value: "NHS", label: "& private" },
  ];

  return (
    <section className={`${compact ? "py-8 sm:py-10" : "py-12 sm:py-16"} relative`}>
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d1b3e 0%, #132d5e 45%, #0f3460 70%, #1a5276 100%)",
          }}
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1a5276] opacity-[0.12] blur-[80px] translate-y-1/2 -translate-x-1/4" />

          <div className={`relative ${compact ? "p-6 sm:p-8 lg:p-10" : "p-8 sm:p-10 lg:p-14"}`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
              <div className="flex-1 min-w-0">
                <h2
                  className={`${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl lg:text-[2.1rem]"} font-bold text-white mb-3 leading-tight`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {resolvedHeading}
                </h2>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-6 sm:mb-8">
                  Compare NHS and private eye surgery clinics from {nameList}. Find the clinics
                  nearest to you and contact the provider direct.
                </p>
                <Link
                  href="/eye-surgery/search"
                  className="group inline-flex items-center gap-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all hover:shadow-xl"
                >
                  {linkText}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              <div className="flex-shrink-0 w-full lg:w-80 xl:w-[340px]">
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="bg-white/[0.08] border border-white/[0.08] rounded-2xl p-3.5 text-center"
                    >
                      <div className="text-lg font-bold text-white mb-1">{s.value}</div>
                      <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/40 mt-4">
                  Providers listed in alphabetical order. No provider is ranked or recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
