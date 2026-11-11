import Link from "next/link";
import { getOpticianBySlug, type OpticianBrand } from "@/data/opticians";

/**
 * Optician cards shown on content pages, styled like the search result
 * listings. The first brand gets the "Recommended" listing style.
 * Prices come from each brand's own website (see opticians.ts), checked
 * in the month shown in the footnote.
 */
export const RECOMMENDED_OPTICIAN = "boots-opticians";
export const OTHER_OPTICIANS = ["specsavers", "vision-express", "asda-opticians"];
/** Badge on the recommended card. If this becomes a paid placement, change to "Featured partner". */
export const RECOMMENDED_LABEL = "Recommended by eyetest.co.uk";
/** Pages where a booking block would be out of place (urgent care advice) */
export const NO_OPTICIAN_BLOCK = new Set(["emergency-eye-test-near-me", "when-to-get-an-emergency-eye-test"]);

type Box = { label: string; value: string; sub: string; free?: boolean };

const BOXES: Record<string, Box[]> = {
  "boots-opticians": [
    { label: "Eye test", value: "£29.95", sub: "from" },
    { label: "NHS test", value: "Free", sub: "if eligible", free: true },
    { label: "OCT scan", value: "+£25", sub: "from" },
  ],
  specsavers: [
    { label: "Eye test", value: "£20", sub: "to £25" },
    { label: "NHS test", value: "Free", sub: "if eligible", free: true },
    { label: "OCT scan", value: "+£10", sub: "up to" },
  ],
  "vision-express": [
    { label: "Eye test", value: "£30", sub: "OCT included" },
    { label: "NHS test", value: "Free", sub: "if eligible", free: true },
    { label: "NHS + OCT", value: "+£6", sub: "from" },
  ],
  "asda-opticians": [
    { label: "Eye test", value: "£24", sub: "about 30 mins" },
    { label: "NHS test", value: "Free", sub: "if eligible", free: true },
    { label: "Glasses", value: "£15", sub: "from" },
  ],
};

const LOGOS: Record<string, string> = {
  "boots-opticians": "/logos/boots-opticians.jpg",
  "vision-express": "/logos/vision-express.svg",
  "asda-opticians": "/logos/asda-opticians.svg",
};

function Logo({ o, size = 26 }: { o: OpticianBrand; size?: number }) {
  const src = LOGOS[o.slug];
  if (src) {
    return (
      <img
        src={src}
        alt={`${o.name} logo`}
        className="rounded-lg object-contain bg-white border border-gray-100"
        style={{ width: size, height: size, flexShrink: 0 }}
      />
    );
  }
  return (
    <div
      className="rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: o.brandColor }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.42, fontFamily: "var(--font-display)" }}>
        {o.shortName.charAt(0)}
      </span>
    </div>
  );
}

function Boxes({ boxes, large }: { boxes: Box[]; large?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {boxes.map((b) => (
        <div
          key={b.label}
          className={`rounded-lg text-center ${large ? "py-3" : "py-2"} ${
            b.free ? "bg-green-50 border border-green-200" : "bg-white border border-gray-200"
          }`}
        >
          <div className={`text-[9px] font-semibold uppercase tracking-wide ${b.free ? "text-green-600" : "text-gray-500"}`}>
            {b.label}
          </div>
          <div className={`${large ? "text-xl" : "text-base"} font-bold leading-tight mt-0.5 ${b.free ? "text-green-700" : "text-[var(--color-navy)]"}`}>
            {b.value}
          </div>
          <div className={`text-[9px] mt-0.5 ${b.free ? "text-green-500" : "text-gray-400"}`}>{b.sub}</div>
        </div>
      ))}
    </div>
  );
}

function FeaturedCard({ o }: { o: OpticianBrand }) {
  return (
    <div
      className="rounded-xl bg-gradient-to-b from-teal-50/70 to-white shadow-lg overflow-hidden"
      style={{ border: "2px solid #0ea5a0", borderLeft: "6px solid #0d1b3e" }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: "#0d1b3e", color: "#5eead4" }}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {RECOMMENDED_LABEL}
          </span>
          <span className="inline-flex items-center rounded-full bg-white border border-gray-200 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
            {o.storeCount}+ UK stores
          </span>
          <span className="inline-flex items-center rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
            Free NHS eye tests
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Logo o={o} size={56} />
              <h3 className="text-xl font-bold text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>
                {o.name}
              </h3>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {o.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Boxes boxes={BOXES[o.slug] ?? []} large />
            <Link
              href={`/opticians/${o.slug}`}
              className="mt-3 w-full inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-3 rounded-lg bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Find your nearest {o.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ o }: { o: OpticianBrand }) {
  return (
    <div
      className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md ring-1 ring-gray-100 transition-shadow overflow-hidden"
      style={{ borderLeft: `4px solid ${o.brandColor}` }}
    >
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <Logo o={o} size={40} />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-[var(--color-navy)] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
              {o.name}
            </h3>
            <p className="text-[11px] text-gray-500">{o.storeCount}+ UK stores</p>
          </div>
        </div>
        <div className="mb-3">
          <Boxes boxes={BOXES[o.slug] ?? []} />
        </div>
        <Link
          href={`/opticians/${o.slug}`}
          className="mt-auto inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-lg bg-[var(--color-primary)] hover:opacity-90 text-white transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find nearest {o.shortName}
        </Link>
      </div>
    </div>
  );
}

export function OpticianOptions({
  heading = "Book an eye test with a trusted optician",
  intro = "Find your nearest store and book direct with the optician. NHS eye tests are free at all of these opticians if you qualify.",
}: {
  heading?: string;
  intro?: string;
}) {
  const slugs = [RECOMMENDED_OPTICIAN, ...OTHER_OPTICIANS];
  const brands = slugs.map((s) => getOpticianBySlug(s)).filter(Boolean) as OpticianBrand[];
  if (brands.length === 0) return null;
  const checked = brands[0].lastReviewed ?? "November 2026";

  return (
    <section className="py-12 max-w-5xl mx-auto" aria-labelledby="optician-options-heading">
      <div className="text-center mb-8">
        <h2
          id="optician-options-heading"
          className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {heading}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{intro}</p>
      </div>

      <FeaturedCard o={brands[0]} />

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-8 mb-3">Other popular opticians</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {brands.slice(1).map((o) => (
          <Card key={o.slug} o={o} />
        ))}
      </div>

      <p className="text-[11px] text-gray-400 mt-4 text-center">
        Prices as published on each optician&apos;s own website when we checked in {checked}. Prices can vary by store, so check with the optician when you book.
      </p>
    </section>
  );
}
