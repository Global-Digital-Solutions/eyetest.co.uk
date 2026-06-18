import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

export function CTABanner() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background image with dark overlay */}
      <Image
        src="/images/eye-test-phoropter-lg.jpg"
        alt="Patient looking through a phoropter during an eye test"
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-[var(--color-navy)]/80" />

      {/* Decorative floating light rays / circles */}
      <div className="absolute top-10 right-[10%] w-48 h-48 rounded-full bg-[var(--color-primary)] opacity-10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-8 left-[5%] w-32 h-32 rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-2xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white opacity-[0.04] blur-3xl animate-float-slow" />

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
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base px-8 py-4 rounded-full transition-all hover:shadow-lg animate-pulse-glow"
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

        {/* Floating stats row */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <p
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                1,000+
              </p>
              <p className="text-sm text-white/50 mt-1">Opticians</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                100%
              </p>
              <p className="text-sm text-white/50 mt-1">Free</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Same-day
              </p>
              <p className="text-sm text-white/50 mt-1">Available</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
