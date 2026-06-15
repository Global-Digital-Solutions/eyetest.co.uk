const offers = [
  {
    brand: "Boots Opticians",
    title: "Free Eye Test",
    description: "Book your free NHS eye test at Boots Opticians",
    tag: "NHS",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    brand: "ASDA Opticians",
    title: "Eye Tests from £20",
    description: "Affordable private eye tests at your local ASDA",
    tag: "Value",
    color: "bg-green-50 border-green-200 text-green-700",
  },
  {
    brand: "Leightons",
    title: "Advanced OCT Scan",
    description: "Comprehensive eye health check with 3D imaging",
    tag: "Premium",
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    brand: "Bayfields",
    title: "Free Contact Lens Trial",
    description: "Try contact lenses free with any eye test booking",
    tag: "Offer",
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    brand: "Scrivens",
    title: "Home Visits Available",
    description: "Eye tests in the comfort of your own home",
    tag: "Convenient",
    color: "bg-teal-50 border-teal-200 text-teal-700",
  },
  {
    brand: "Rawlings",
    title: "Same-Day Appointments",
    description: "Last-minute availability at Rawlings branches",
    tag: "Urgent",
    color: "bg-rose-50 border-rose-200 text-rose-700",
  },
];

export function OffersTicker() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <h2
          className="text-lg font-bold text-[var(--color-navy)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Current offers
        </h2>
      </div>
      <div className="relative overflow-hidden scroll-mask">
        <div className="offers-ticker">
          {/* Set 1 */}
          {offers.map((offer, i) => (
            <div
              key={`a-${i}`}
              className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {offer.brand}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${offer.color}`}
                >
                  {offer.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--color-navy)] mb-1">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-500 leading-snug">
                {offer.description}
              </p>
            </div>
          ))}
          {/* Set 2 (duplicate for seamless loop) */}
          {offers.map((offer, i) => (
            <div
              key={`b-${i}`}
              className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {offer.brand}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${offer.color}`}
                >
                  {offer.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--color-navy)] mb-1">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-500 leading-snug">
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
