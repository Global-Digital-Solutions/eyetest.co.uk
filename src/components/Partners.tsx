const partners = [
  { name: "Boots Opticians", available: true },
  { name: "ASDA Opticians", available: true },
  { name: "Leightons", available: true },
  { name: "Bayfields", available: true },
  { name: "Rawlings", available: true },
  { name: "Scrivens", available: true },
  { name: "Duncan & Todd", available: true },
  { name: "Specsavers", available: false },
  { name: "Vision Express", available: false },
];

export function Partners() {
  return (
    <section className="py-8 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Checking availability across
          </span>
        </div>
        <div className="relative overflow-hidden scroll-mask">
          <div className="partners-track">
            {/* Set 1 */}
            {partners.map((p) => (
              <div
                key={`a-${p.name}`}
                className={`flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-lg ${
                  p.available
                    ? "bg-white border border-gray-200"
                    : "bg-gray-100 border border-gray-100 opacity-50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    p.available ? "bg-[var(--color-success)]" : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-sm font-semibold whitespace-nowrap ${
                    p.available
                      ? "text-[var(--color-navy)]"
                      : "text-gray-400"
                  }`}
                >
                  {p.name}
                </span>
                {!p.available && (
                  <span className="text-[10px] text-gray-400 font-normal">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
            {/* Set 2 (duplicate for seamless loop) */}
            {partners.map((p) => (
              <div
                key={`b-${p.name}`}
                className={`flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-lg ${
                  p.available
                    ? "bg-white border border-gray-200"
                    : "bg-gray-100 border border-gray-100 opacity-50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    p.available ? "bg-[var(--color-success)]" : "bg-gray-300"
                  }`}
                />
                <span
                  className={`text-sm font-semibold whitespace-nowrap ${
                    p.available
                      ? "text-[var(--color-navy)]"
                      : "text-gray-400"
                  }`}
                >
                  {p.name}
                </span>
                {!p.available && (
                  <span className="text-[10px] text-gray-400 font-normal">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
