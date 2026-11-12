import { PARTNERS, PARTNER_LABEL, type Partner } from "@/data/partners";
import { haversine } from "@/lib/haversine";

/** Paid partners whose radius covers this location */
export function partnersNear(lat: number, lng: number): (Partner & { distanceKm: number })[] {
  return PARTNERS.map((p) => ({ ...p, distanceKm: haversine(lat, lng, p.lat, p.lng) / 1000 }))
    .filter((p) => p.distanceKm <= p.radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

function miles(km: number): string {
  const m = km / 1.60934;
  return m < 0.3 ? "Nearby" : `${m.toFixed(1)} miles away`;
}

export function PartnerSpotlight({ lat, lng, townName }: { lat: number; lng: number; townName: string }) {
  const partners = partnersNear(lat, lng);
  if (partners.length === 0) return null;

  return (
    <section className="py-10 sm:py-12" aria-label={`Featured optician near ${townName}`}>
      <div className="max-w-5xl mx-auto px-4">
        {partners.map((p) => (
          <div
            key={p.listingId}
            className="rounded-2xl bg-gradient-to-b from-teal-50/70 to-white shadow-lg overflow-hidden"
            style={{ border: "2px solid #0ea5a0", borderLeft: "6px solid #0d1b3e" }}
          >
            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  style={{ backgroundColor: "#0d1b3e", color: "#5eead4" }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {PARTNER_LABEL}
                </span>
                <span className="inline-flex items-center rounded-full bg-white border border-gray-200 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
                  Independent optician
                </span>
                <span className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                  NHS eye tests
                </span>
                <span className="text-[11px] text-gray-500 ml-auto">{miles(p.distanceKm)}</span>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
                <div>
                  {p.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo} alt={`${p.name} logo`} width={180} height={86} className="h-20 w-auto mb-3 rounded-xl bg-white border border-gray-100 px-3 py-2 shadow-sm" loading="lazy" />
                  )}
                  <h2 className={p.logo ? "sr-only" : "text-2xl font-bold text-[var(--color-navy)] mb-1"} style={{ fontFamily: "var(--font-display)" }}>
                    {p.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    {p.address}, {p.postcode}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{p.summary}</p>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-white border border-gray-100 p-4 space-y-3">
                  {p.priceFrom && <p className="text-sm font-semibold text-[var(--color-navy)]">{p.priceFrom}</p>}
                  <p className="text-xs text-gray-500">NHS eye tests are free if you qualify.</p>
                  {p.hours && <p className="text-xs text-gray-600">{p.hours}</p>}
                  <a
                    href={p.bookingUrl}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-center rounded-lg bg-[var(--color-navy)] text-white text-sm font-semibold py-2.5 hover:opacity-90"
                  >
                    Book with {p.name}
                  </a>
                  <a
                    href={`tel:${p.phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-[var(--color-navy)] py-2.5 hover:bg-gray-50"
                  >
                    Call {p.phone}
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                {PARTNER_LABEL}: {p.name} pays to be featured on eyetest.co.uk. Details and prices from {p.source}, checked {p.checked}. Book direct with the practice.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
