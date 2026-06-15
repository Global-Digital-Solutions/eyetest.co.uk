import Image from "next/image";
import { ScrollReveal, StaggerItem } from "@/components/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Enter your postcode",
    description:
      "Tell us where you are and we'll find opticians with real-time availability near you.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Compare opticians",
    description:
      "See prices, ratings, next available slots and distance — all in one place. Including independents you never knew existed.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Book instantly",
    description:
      "Choose your preferred time and book directly — no phone calls needed. Same-day appointments often available.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-28 bg-animated-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">
              How it works
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-navy)] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book an eye test in 3 steps
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
              No more waiting weeks for an appointment. We search hundreds of
              opticians so you don&apos;t have to.
            </p>
          </div>
        </ScrollReveal>

        {/* Split layout: image left, steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — Optician shop image (hidden on mobile) */}
          <ScrollReveal animation="fade-right" className="hidden lg:block">
            <div className="relative">
              {/* Floating decorative circle */}
              <svg
                className="absolute -top-10 -left-10 w-72 h-72 animate-float pointer-events-none"
                viewBox="0 0 288 288"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="144"
                  cy="144"
                  r="144"
                  fill="var(--color-primary)"
                  fillOpacity="0.08"
                  filter="url(#blur-circle)"
                />
                <defs>
                  <filter id="blur-circle">
                    <feGaussianBlur stdDeviation="32" />
                  </filter>
                </defs>
              </svg>

              {/* Image container */}
              <div className="relative img-zoom rounded-3xl shadow-2xl shadow-[var(--color-navy)]/10 overflow-hidden">
                <Image
                  src="/images/optician-shop-md.jpg"
                  alt="Interior of a modern optician shop with glasses on display"
                  width={640}
                  height={480}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Small floating accent circle, bottom-right */}
              <svg
                className="absolute -bottom-6 -right-6 w-32 h-32 animate-float-delay pointer-events-none"
                viewBox="0 0 128 128"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="64"
                  cy="64"
                  r="64"
                  fill="var(--color-primary)"
                  fillOpacity="0.06"
                  filter="url(#blur-circle-sm)"
                />
                <defs>
                  <filter id="blur-circle-sm">
                    <feGaussianBlur stdDeviation="20" />
                  </filter>
                </defs>
              </svg>
            </div>
          </ScrollReveal>

          {/* RIGHT — 3 Step cards */}
          <ScrollReveal stagger={150} className="flex flex-col gap-6">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="card-lift relative flex items-start gap-5 rounded-2xl bg-white/80 backdrop-blur-sm p-6 sm:p-7 border border-white/60 shadow-sm">
                  {/* Step number — large teal gradient badge */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl text-white text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      background:
                        "linear-gradient(135deg, var(--color-primary) 0%, #0b8a86 100%)",
                      boxShadow: "0 4px 14px rgba(14, 165, 160, 0.3)",
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-lg sm:text-xl font-bold text-[var(--color-navy)] mb-1.5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon accent — top-right */}
                  <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-teal-50)] text-[var(--color-primary)]">
                    {step.icon}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
