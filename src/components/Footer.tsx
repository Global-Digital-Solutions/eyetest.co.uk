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
    { label: "Home Visit Eye Test", href: "/eye-tests/home-visit-eye-test" },
    { label: "At-Home Eye Tests", href: "/at-home-eye-tests" },
    { label: "View All Eye Tests", href: "/eye-tests" },
  ],
  Opticians: [
    { label: "Boots Opticians", href: "/opticians/boots-opticians" },
    { label: "ASDA Opticians", href: "/opticians/asda-opticians" },
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
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
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
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      {/* ── Main footer links ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
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

      {/* ── SEO locations grid ─────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h3
            className="text-base font-bold text-white/80 mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Eye Tests Across the UK
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-6">
            {Object.entries(seoLocations).map(([region, cities]) => (
              <div key={region}>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                  {region}
                </h4>
                <ul className="space-y-1">
                  {cities.map((city) => (
                    <li key={city.href}>
                      <Link
                        href={city.href}
                        className="text-xs text-white/40 hover:text-white/80 transition-colors"
                      >
                        {city.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/locations"
              className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-colors"
            >
              View all UK locations &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ── Brand + location SEO links ──────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h3
            className="text-base font-bold text-white/80 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find Opticians by Location
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4">
            {[
              { brand: "Specsavers", slug: "specsavers", cities: ["london", "manchester", "birmingham", "leeds", "glasgow", "liverpool", "edinburgh", "bristol", "cardiff", "sheffield", "newcastle", "brighton"] },
              { brand: "Boots Opticians", slug: "boots-opticians", cities: ["london", "manchester", "birmingham", "leeds", "glasgow", "liverpool", "edinburgh", "bristol", "cardiff", "nottingham", "reading", "southampton"] },
              { brand: "Vision Express", slug: "vision-express", cities: ["london", "manchester", "birmingham", "leeds", "liverpool", "bristol", "sheffield", "newcastle", "cardiff", "leicester"] },
            ].map((item) => (
              <div key={item.slug}>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  {item.brand}
                </h4>
                <ul className="space-y-0.5">
                  {item.cities.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/opticians/${item.slug}/${city}`}
                        className="text-xs text-white/40 hover:text-white/80 transition-colors"
                      >
                        {item.brand} {city.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {[
              { brand: "ASDA Opticians", slug: "asda-opticians", cities: ["london", "manchester", "birmingham", "leeds", "liverpool", "bristol", "sheffield", "nottingham"] },
              { brand: "Leightons", slug: "leightons", cities: ["london", "guildford", "reading", "southampton", "brighton", "oxford", "basingstoke", "epsom"] },
            ].map((item) => (
              <div key={item.slug}>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  {item.brand}
                </h4>
                <ul className="space-y-0.5">
                  {item.cities.map((city) => (
                    <li key={city}>
                      <Link
                        href={`/opticians/${item.slug}/${city}`}
                        className="text-xs text-white/40 hover:text-white/80 transition-colors"
                      >
                        {item.brand} {city.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo className="h-7 w-auto" variant="horizontal" dark />
          </div>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} eyetest.co.uk — A Global Digital
            Solutions project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
