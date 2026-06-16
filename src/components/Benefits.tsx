import Image from "next/image";
import { ScrollReveal, StaggerItem } from "./ScrollReveal";

const benefits = [
  {
    title: "Discover local independents",
    description:
      "We list hundreds of independent opticians you won't find on the high street — often with shorter wait times and more personal service.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Real-time availability",
    description:
      "No more ringing around. See exactly which opticians have appointments today, tomorrow, or this week — live and accurate.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Compare prices & reviews",
    description:
      "See eye test costs, Google ratings, and what's included side-by-side so you can make the right choice for your eyes and your wallet.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Same-day bookings",
    description:
      "Urgent need? We highlight opticians with same-day and next-day availability so you're never left waiting.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export function Benefits() {
  return (
    <>
      {/* ── Part 1: Full-width parallax image banner ── */}
      <section className="parallax-section relative min-h-[420px] sm:min-h-[480px] flex items-center overflow-hidden">
        {/* Background image via next/image with fill */}
        <Image
          src="/images/oct-scan-lg.jpg"
          alt="Advanced OCT retinal scanning equipment"
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
          style={{ zIndex: 0 }}
        />

        {/* Dark navy overlay at ~80% opacity */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-navy)", opacity: 0.8, zIndex: 1 }}
        />

        {/* Subtle teal accent glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(14,165,160,0.15) 0%, transparent 70%)",
            zIndex: 2,
          }}
        />

        {/* Text overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Advanced eye care technology
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From high-resolution OCT scanners to digital retinal imaging, today's
            independent opticians invest in the same cutting-edge equipment found in
            hospital eye departments — giving you a thorough, modern eye examination
            close to home.
          </p>
        </div>
      </section>

      {/* ── Part 2: Benefits grid ── */}
      <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
        {/* Animated shimmer decorative element */}
        <div
          className="animate-shimmer absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why thousands use eyetest.co.uk
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              The UK has a nationwide shortage of opticians. We help you skip the
              weeks-long wait by finding appointments others miss.
            </p>
          </div>

          <ScrollReveal stagger={120} className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div
                  className="card-lift flex gap-4 p-6 bg-white rounded-xl border border-gray-200 border-l-[3px] border-l-[var(--color-primary)] hover:border-l-[5px] hover:border-[var(--color-primary-light)] hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-teal-50)] text-[var(--color-primary)] flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-[var(--color-navy)] mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
