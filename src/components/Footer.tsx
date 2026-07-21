import Link from "next/link";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------ */
/*  Footer link data                                                  */
/* ------------------------------------------------------------------ */

const footerLinks = {
  "Eye Tests": [
    { label: "Standard Eye Test", href: "/eye-tests/standard-eye-test" },
    { label: "NHS Eye Test", href: "/eye-tests/nhs-eye-test" },
    { label: "Children's Eye Test", href: "/eye-tests/childrens-eye-test" },
    { label: "Contact Lens Fitting", href: "/eye-tests/contact-lens-fitting" },
    { label: "OCT Scan", href: "/eye-tests/oct-scan" },
    { label: "Visual Field Test", href: "/eye-tests/visual-field-test" },
    { label: "Diabetic Eye Screening", href: "/eye-tests/diabetic-eye-screening" },
    { label: "Dry Eye Assessment", href: "/eye-tests/dry-eye-assessment" },
    { label: "DVLA / Driving Test", href: "/eye-tests/dvla-driving-vision-test" },
    { label: "At-Home Eye Tests", href: "/at-home-eye-tests" },
    { label: "View All Eye Tests", href: "/eye-tests" },
  ],
  Opticians: [
    { label: "Boots Opticians", href: "/opticians/boots-opticians" },
    { label: "ASDA Opticians", href: "/opticians/asda-opticians" },
    { label: "M&S Opticians", href: "/opticians/mands-opticians" },
    { label: "Ace & Tate", href: "/opticians/ace-and-tate" },
    { label: "Leightons", href: "/opticians/leightons" },
    { label: "Rawlings", href: "/opticians/rawlings" },
    { label: "Scrivens", href: "/opticians/scrivens" },
    { label: "Bayfields", href: "/opticians/bayfields" },
    { label: "Duncan & Todd", href: "/opticians/duncan-and-todd" },
    { label: "Compare All Opticians", href: "/opticians" },
  ],
  "Eye Health": [
    { label: "Glaucoma", href: "/eye-health/conditions/glaucoma" },
    { label: "Cataracts", href: "/eye-health/conditions/cataracts" },
    { label: "Macular Degeneration", href: "/eye-health/conditions/age-related-macular-degeneration" },
    { label: "Dry Eye Syndrome", href: "/eye-health/conditions/dry-eye-syndrome" },
    { label: "Myopia", href: "/eye-health/conditions/myopia" },
    { label: "Astigmatism", href: "/eye-health/conditions/astigmatism" },
    { label: "How Often to Test", href: "/eye-health/guides/how-often-should-you-have-an-eye-test" },
    { label: "NHS Eligibility", href: "/eye-health/guides/understanding-nhs-eye-test-eligibility" },
    { label: "Eye Health Hub", href: "/eye-health" },
  ],
  "Eye Surgery": [
    { label: "Cataracts", href: "/eye-surgery/cataracts" },
    { label: "Glaucoma Surgery", href: "/eye-surgery/glaucoma-surgery" },
    { label: "Laser Eye Surgery", href: "/eye-surgery/laser-eye-surgery" },
    { label: "Macular Degeneration", href: "/eye-surgery/macular-degeneration" },
    { label: "Retinal Detachment", href: "/eye-surgery/retinal-detachment" },
    { label: "Eyelid Surgery", href: "/eye-surgery/eyelid-surgery" },
    { label: "Newmedica", href: "/eye-surgery/providers/new-medica" },
    { label: "Spa Medica", href: "/eye-surgery/providers/spa-medica" },
    { label: "Optegra", href: "/eye-surgery/providers/optegra" },
    { label: "Find a Surgeon", href: "/eye-surgery/search" },
    { label: "Eye Surgery Hub", href: "/eye-surgery" },
  ],
  "Popular Searches": [
    { label: "Free Eye Test", href: "/find/free-eye-test" },
    { label: "Eye Test Cost", href: "/find/eye-test-cost" },
    { label: "NHS Eye Test", href: "/find/nhs-eye-test" },
    { label: "Same Day Eye Test", href: "/find/same-day-eye-test" },
    { label: "Walk-in Eye Test", href: "/find/walk-in-eye-test" },
    { label: "Eye Test Near Me", href: "/find/eye-test-near-me" },
    { label: "Book Eye Test Online", href: "/find/book-eye-test-online" },
    { label: "Free Eye Test Over 60", href: "/find/free-eye-test-over-60" },
    { label: "OCT Scan Cost", href: "/find/oct-scan-cost" },
    { label: "Weekend Eye Test", href: "/find/weekend-eye-test" },
    { label: "All Search Topics", href: "/find" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Guides & Advice", href: "/articles/how-often-should-you-have-an-eye-test" },
    { label: "Blog", href: "/articles" },
    { label: "Contact", href: "/about" },
    { label: "For Opticians", href: "/get-listed" },
    { label: "Get Listed", href: "/get-listed" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

/* ------------------------------------------------------------------ */
/*  All UK locations by region — comprehensive SEO link grid          */
/* ------------------------------------------------------------------ */

const seoLocations: Record<string, { label: string; href: string }[]> = {
  London: [
    { label: "London", href: "/locations/london" },
    { label: "Croydon", href: "/locations/croydon" },
    { label: "Bromley", href: "/locations/bromley" },
    { label: "Kingston upon Thames", href: "/locations/kingston-upon-thames" },
    { label: "Richmond", href: "/locations/richmond" },
    { label: "Ealing", href: "/locations/ealing" },
  ],
  "South East": [
    { label: "Brighton", href: "/locations/brighton" },
    { label: "Southampton", href: "/locations/southampton" },
    { label: "Portsmouth", href: "/locations/portsmouth" },
    { label: "Reading", href: "/locations/reading" },
    { label: "Oxford", href: "/locations/oxford" },
    { label: "Canterbury", href: "/locations/canterbury" },
    { label: "Guildford", href: "/locations/guildford" },
    { label: "Milton Keynes", href: "/locations/milton-keynes" },
    { label: "Maidstone", href: "/locations/maidstone" },
    { label: "Slough", href: "/locations/slough" },
    { label: "Crawley", href: "/locations/crawley" },
    { label: "Basingstoke", href: "/locations/basingstoke" },
    { label: "Tunbridge Wells", href: "/locations/tunbridge-wells" },
    { label: "Woking", href: "/locations/woking" },
    { label: "Epsom", href: "/locations/epsom" },
  ],
  "South West": [
    { label: "Bristol", href: "/locations/bristol" },
    { label: "Plymouth", href: "/locations/plymouth" },
    { label: "Exeter", href: "/locations/exeter" },
    { label: "Bath", href: "/locations/bath" },
    { label: "Cheltenham", href: "/locations/cheltenham" },
    { label: "Gloucester", href: "/locations/gloucester" },
    { label: "Swindon", href: "/locations/swindon" },
    { label: "Bournemouth", href: "/locations/bournemouth" },
    { label: "Salisbury", href: "/locations/salisbury" },
    { label: "Taunton", href: "/locations/taunton" },
    { label: "Torquay", href: "/locations/torquay" },
  ],
  "East of England": [
    { label: "Norwich", href: "/locations/norwich" },
    { label: "Cambridge", href: "/locations/cambridge" },
    { label: "Ipswich", href: "/locations/ipswich" },
    { label: "Colchester", href: "/locations/colchester" },
    { label: "Chelmsford", href: "/locations/chelmsford" },
    { label: "Luton", href: "/locations/luton" },
    { label: "Southend-on-Sea", href: "/locations/southend-on-sea" },
    { label: "Peterborough", href: "/locations/peterborough" },
    { label: "St Albans", href: "/locations/st-albans" },
    { label: "Watford", href: "/locations/watford" },
  ],
  "West Midlands": [
    { label: "Birmingham", href: "/locations/birmingham" },
    { label: "Coventry", href: "/locations/coventry" },
    { label: "Wolverhampton", href: "/locations/wolverhampton" },
    { label: "Stoke-on-Trent", href: "/locations/stoke-on-trent" },
    { label: "Worcester", href: "/locations/worcester" },
    { label: "Hereford", href: "/locations/hereford" },
  ],
  "East Midlands": [
    { label: "Nottingham", href: "/locations/nottingham" },
    { label: "Leicester", href: "/locations/leicester" },
    { label: "Derby", href: "/locations/derby" },
    { label: "Northampton", href: "/locations/northampton" },
    { label: "Lincoln", href: "/locations/lincoln" },
  ],
  "North West": [
    { label: "Manchester", href: "/locations/manchester" },
    { label: "Liverpool", href: "/locations/liverpool" },
    { label: "Preston", href: "/locations/preston" },
    { label: "Bolton", href: "/locations/bolton" },
    { label: "Blackpool", href: "/locations/blackpool" },
    { label: "Chester", href: "/locations/chester" },
    { label: "Warrington", href: "/locations/warrington" },
    { label: "Wigan", href: "/locations/wigan" },
    { label: "Lancaster", href: "/locations/lancaster" },
  ],
  "North East": [
    { label: "Newcastle", href: "/locations/newcastle" },
    { label: "Sunderland", href: "/locations/sunderland" },
    { label: "Middlesbrough", href: "/locations/middlesbrough" },
    { label: "Durham", href: "/locations/durham" },
    { label: "Darlington", href: "/locations/darlington" },
  ],
  Yorkshire: [
    { label: "Leeds", href: "/locations/leeds" },
    { label: "Sheffield", href: "/locations/sheffield" },
    { label: "Bradford", href: "/locations/bradford" },
    { label: "Hull", href: "/locations/hull" },
    { label: "York", href: "/locations/york" },
    { label: "Huddersfield", href: "/locations/huddersfield" },
    { label: "Doncaster", href: "/locations/doncaster" },
    { label: "Harrogate", href: "/locations/harrogate" },
  ],
  Wales: [
    { label: "Cardiff", href: "/locations/cardiff" },
    { label: "Swansea", href: "/locations/swansea" },
    { label: "Newport", href: "/locations/newport" },
    { label: "Wrexham", href: "/locations/wrexham" },
    { label: "Bangor", href: "/locations/bangor" },
    { label: "Aberystwyth", href: "/locations/aberystwyth" },
  ],
  Scotland: [
    { label: "Glasgow", href: "/locations/glasgow" },
    { label: "Edinburgh", href: "/locations/edinburgh" },
    { label: "Aberdeen", href: "/locations/aberdeen" },
    { label: "Dundee", href: "/locations/dundee" },
    { label: "Inverness", href: "/locations/inverness" },
    { label: "Stirling", href: "/locations/stirling" },
    { label: "Perth", href: "/locations/perth" },
  ],
  "Northern Ireland": [
    { label: "Belfast", href: "/locations/belfast" },
    { label: "Derry", href: "/locations/derry" },
    { label: "Lisburn", href: "/locations/lisburn" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Brand × Location SEO links                                       */
/* ------------------------------------------------------------------ */

const brandLocations = [
  { brand: "Specsavers", slug: "specsavers", cities: ["london", "manchester", "birmingham", "leeds", "glasgow", "liverpool", "edinburgh", "bristol", "cardiff", "sheffield", "newcastle", "brighton"] },
  { brand: "Boots Opticians", slug: "boots-opticians", cities: ["london", "manchester", "birmingham", "leeds", "glasgow", "liverpool", "edinburgh", "bristol", "cardiff", "nottingham", "reading", "southampton"] },
  { brand: "Vision Express", slug: "vision-express", cities: ["london", "manchester", "birmingham", "leeds", "liverpool", "bristol", "sheffield", "newcastle", "cardiff", "leicester"] },
  { brand: "ASDA Opticians", slug: "asda-opticians", cities: ["london", "manchester", "birmingham", "leeds", "liverpool", "bristol", "sheffield", "nottingham"] },
  { brand: "M&S Opticians", slug: "mands-opticians", cities: ["london", "manchester", "glasgow", "birmingham", "leeds", "sheffield", "newcastle", "cardiff", "exeter", "oxford", "york", "derby"] },
  { brand: "Ace & Tate", slug: "ace-and-tate", cities: ["london", "manchester", "bristol", "glasgow", "oxford", "brighton", "leeds", "cardiff"] },
  { brand: "Leightons", slug: "leightons", cities: ["london", "guildford", "reading", "southampton", "brighton", "oxford", "basingstoke", "epsom"] },
];

function cityName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      {/* ── Brand intro + CTA ─────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-lg">
              <Logo className="h-8 w-auto mb-3" variant="horizontal" dark />
              <p className="text-sm text-white/50 leading-relaxed">
                The UK&apos;s most comprehensive eye test comparison service.
                Compare 2,400+ opticians, book same-day appointments, and find
                NHS &amp; private eye care near you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
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
                Find Eye Tests
              </Link>
              <Link
                href="/get-listed"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 text-white font-medium text-sm px-6 py-3 rounded-full transition-all"
              >
                For Opticians
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer links ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-3">
                {category}
              </h3>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/45 hover:text-white transition-colors leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEO locations — collapsible ────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4">
          <details className="group">
            <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 list-none [&::-webkit-details-marker]:hidden select-none">
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[var(--color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3
                  className="text-sm font-bold text-white/70"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Eye Tests Across the UK
                </h3>
                <span className="text-xs text-white/30 hidden sm:inline">
                  — 97 cities &amp; towns
                </span>
              </div>
              <svg
                className="w-4 h-4 text-white/30 group-open:rotate-180 transition-transform duration-200 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="pb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-5">
                {Object.entries(seoLocations).map(([region, cities]) => (
                  <div key={region}>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">
                      {region}
                    </h4>
                    <ul className="space-y-0.5">
                      {cities.map((city) => (
                        <li key={city.href}>
                          <Link
                            href={city.href}
                            className="text-xs text-white/30 hover:text-white/70 transition-colors"
                          >
                            {city.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors"
                >
                  View all UK locations
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* ── Brand × location — collapsible ─────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4">
          <details className="group">
            <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 list-none [&::-webkit-details-marker]:hidden select-none">
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[var(--color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3
                  className="text-sm font-bold text-white/70"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Find Opticians by Location
                </h3>
                <span className="text-xs text-white/30 hidden sm:inline">
                  — 7 brands, major UK cities
                </span>
              </div>
              <svg
                className="w-4 h-4 text-white/30 group-open:rotate-180 transition-transform duration-200 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="pb-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-5 gap-y-5">
                {brandLocations.map((item) => (
                  <div key={item.slug}>
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">
                      {item.brand}
                    </h4>
                    <ul className="space-y-0.5">
                      {item.cities.map((city) => (
                        <li key={city}>
                          <Link
                            href={`/opticians/${item.slug}/${city}`}
                            className="text-xs text-white/30 hover:text-white/70 transition-colors"
                          >
                            {item.brand} {cityName(city)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────── */}
      <div className="border-t border-white/10 bg-[#091530]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25">
            &copy; {new Date().getFullYear()} eyetest.co.uk &mdash; A Global
            Digital Solutions project. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/disclaimer"
              className="text-[11px] text-white/25 hover:text-white/50 transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
