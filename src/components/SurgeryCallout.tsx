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
    ? `Find clinics near ${location}`
    : "Find your nearest clinic";

  return (
    <section
      className={`${compact ? "py-8 sm:py-10" : "py-12 sm:py-16"} relative`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d1b3e 0%, #132d5e 45%, #0f3460 70%, #1a5276 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--color-primary)] opacity-[0.08] blur-[100px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1a5276] opacity-[0.12] blur-[80px] translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-10 left-1/3 w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-30" />
          <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 opacity-40" />
          <div className="absolute top-1/2 right-[15%] w-1 h-1 rounded-full bg-white opacity-20" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className={`relative ${compact ? "p-6 sm:p-8 lg:p-10" : "p-8 sm:p-10 lg:p-14"}`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
              {/* Left: Content */}
              <div className="flex-1 min-w-0">
                {/* Preferred Partner pill */}
                <div className="inline-flex items-center gap-1.5 bg-amber-400/15 border border-amber-400/25 text-amber-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
                  <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                  Our Preferred Partner
                </div>

                <h2
                  className={`${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl lg:text-[2.1rem]"} font-bold text-white mb-3 leading-tight`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {resolvedHeading}
                </h2>

                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-6 sm:mb-8">
                  Our preferred partner <strong className="text-white font-semibold">Newmedica</strong> offers
                  NHS and private eye surgery at 39 clinics across England &mdash; with a
                  99% patient recommendation rate.
                </p>

                {/* CTA */}
                <Link
                  href="/eye-surgery/providers/new-medica"
                  className="group inline-flex items-center gap-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all hover:shadow-xl hover:shadow-[var(--color-primary)]/20 hover:-translate-y-0.5"
                >
                  {linkText}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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

              {/* Right: Stat cards + quote */}
              <div className="flex-shrink-0 w-full lg:w-80 xl:w-[340px]">
                {/* Stat cards grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {/* Rating */}
                  <div className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-3.5 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-lg font-bold text-white">4.8</span>
                    </div>
                    <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Google</p>
                  </div>

                  {/* Clinics */}
                  <div className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-3.5 text-center">
                    <div className="text-lg font-bold text-white mb-1">39</div>
                    <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Clinics</p>
                  </div>

                  {/* NHS */}
                  <div className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-3.5 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <svg className="w-5 h-5 text-[var(--color-primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <p className="text-[10px] text-white/50 font-medium uppercase tracking-wider">NHS</p>
                  </div>
                </div>

                {/* Patient quote card */}
                <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/80 italic leading-relaxed mb-3">
                    &ldquo;The whole experience at Newmedica was excellent. From
                    consultation to surgery day, I felt completely reassured and
                    well looked after.&rdquo;
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white text-xs font-bold flex items-center justify-center">
                      M
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/90">
                        Margaret T.
                      </p>
                      <p className="text-[11px] text-white/40">Bristol</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
