import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to find an eye test?
        </h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Join thousands of people who&apos;ve found faster, more affordable eye
          tests through local opticians.
        </p>
        <Link
          href="/#search"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Find Eye Tests Near Me
        </Link>
      </div>
    </section>
  );
}
