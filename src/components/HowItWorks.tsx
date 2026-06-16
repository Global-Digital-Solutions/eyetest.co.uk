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
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Book an eye test in 3 steps
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            No more waiting weeks for an appointment. We search hundreds of
            opticians so you don&apos;t have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative text-center group"
            >
              {/* Step icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-teal-50)] text-[var(--color-primary)] mb-5 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                {step.icon}
              </div>
              {/* Step number badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                {step.number}
              </div>
              <h3
                className="text-lg font-bold text-[var(--color-navy)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
