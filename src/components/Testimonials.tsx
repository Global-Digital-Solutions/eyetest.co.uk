const testimonials = [
  {
    quote:
      "I couldn't get an appointment at Specsavers for 3 weeks. Found a brilliant independent optician through eyetest.co.uk with a slot the next day.",
    name: "Sarah M.",
    location: "Manchester",
    rating: 5,
  },
  {
    quote:
      "Didn't even know there was an optician 5 minutes from my house. The eye test was thorough and half the price I expected.",
    name: "James T.",
    location: "Bristol",
    rating: 5,
  },
  {
    quote:
      "My son needed an urgent eye test for his DVLA application. Found same-day availability that saved us weeks of waiting.",
    name: "Priya K.",
    location: "Birmingham",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Trusted by patients across the UK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 bg-gray-50 rounded-xl border border-gray-100"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 text-sm text-gray-700 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-navy)]">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
