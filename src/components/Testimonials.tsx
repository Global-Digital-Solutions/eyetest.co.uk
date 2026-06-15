import { ScrollReveal, StaggerItem } from "@/components/ScrollReveal";

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

function QuoteMark() {
  return (
    <svg
      className="absolute -top-3 -left-2 w-10 h-10 text-[var(--color-primary)] opacity-15"
      fill="currentColor"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-animated-gradient-warm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Trusted by patients across the UK
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={150} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="relative p-6 bg-white rounded-2xl shadow-sm card-lift">
                <QuoteMark />
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
            </StaggerItem>
          ))}
        </ScrollReveal>

        {/* Trust badge */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[var(--color-navy)]/70">
            <svg
              className="w-5 h-5 text-[var(--color-primary)]"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Based on real patient experiences</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
