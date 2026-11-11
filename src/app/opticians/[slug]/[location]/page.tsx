import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  getOpticianBySlug,
  getAllSlugs as getAllOpticianSlugs,
  type OpticianBrand,
} from "@/data/opticians";
import {
  getLocationBySlug,
  getAllSlugs as getAllLocationSlugs,
  nameWithCounty,
  type UKLocation,
} from "@/data/locations";
import {
  brandInTown,
  brandsInTown,
  nearestBrandTowns,
  storesFor,
  SNAPSHOT_DATE,
} from "@/data/store-snapshot";
import { PRICE_DISCLAIMER } from "@/data/search-queries";
import { eyeTests } from "@/data/eye-tests";
import { notFound } from "next/navigation";

const BASE = "https://www.eyetest.co.uk";

// ---------------------------------------------------------------------------
// Static generation: every brand x town combination. Towns without a
// practice get an honest "nearest locations" page rather than a 404, because
// people search "brand + town" whether or not there is a store.
// ---------------------------------------------------------------------------

export function generateStaticParams(): { slug: string; location: string }[] {
  return getAllOpticianSlugs().flatMap((brand) =>
    getAllLocationSlugs().map((location) => ({ slug: brand, location }))
  );
}

/** Tidy store names from booking systems: single spaces, commas not dashes */
function cleanName(name: string): string {
  return name.replace(/\s+[\u2014\u2013-]\s+/g, ", ").replace(/\s{2,}/g, " ").trim();
}

function longDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** The later of the brand's content date and the store snapshot date */
function pageDate(optician: OpticianBrand): string {
  const d = optician.dateModified ?? SNAPSHOT_DATE;
  return d > SNAPSHOT_DATE ? d : SNAPSHOT_DATE;
}

function checkedLabel(optician: OpticianBrand): string {
  return optician.lastReviewed ?? longDate(pageDate(optician));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}): Promise<Metadata> {
  const { slug: brand, location } = await params;
  const optician = getOpticianBySlug(brand);
  const loc = getLocationBySlug(location);
  if (!optician || !loc) return { title: "Not Found | eyetest.co.uk" };

  const hasStore = brandInTown(optician, loc.slug);
  const title = hasStore
    ? `${optician.name} ${loc.name}: Eye Test Prices & Booking`
    : `${optician.name} ${loc.name}: Nearest Stores & Local Opticians`;
  const description = hasStore
    ? `${optician.shortName} eye tests in ${loc.name}: ${optician.priceRange}, free NHS tests if you qualify. Find your nearest ${optician.shortName} and book direct. Information last checked ${checkedLabel(optician)}.`
    : `We don't have a ${optician.shortName} practice listed in ${loc.name}. See the nearest ${optician.shortName} locations and other opticians in ${loc.name} you can book direct.`;
  const url = `${BASE}/opticians/${optician.slug}/${loc.slug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: "eyetest.co.uk", type: "website" },
    alternates: { canonical: url },
  };
}

// ---------------------------------------------------------------------------
// NHS wording by country (checked against NHS and government sites)
// ---------------------------------------------------------------------------

function nhsLine(loc: UKLocation): string {
  switch (loc.region) {
    case "Scotland":
      return "NHS eye examinations in Scotland are free for everyone who is ordinarily resident in the UK.";
    case "Wales":
      return "In Wales, NHS eye tests are free for eligible groups, including children under 16, young people under 19 in full-time education, people aged 60 or over and people with diabetes or glaucoma. Most optometrists in Wales can also offer a free NHS eye examination if you have an urgent eye problem.";
    case "Northern Ireland":
      return "In Northern Ireland, Health Service sight tests are free for eligible groups, including children under 16, people aged 60 or over and people with diabetes or glaucoma.";
    default:
      return "In England, NHS eye tests are free for eligible groups, including children under 16, young people aged 16 to 18 in full-time education, people aged 60 or over, people with diabetes or glaucoma and people on certain benefits.";
  }
}

const NHS_SOURCE: Record<string, { label: string; url: string }> = {
  Scotland: { label: "NHS Inform: Eye examinations in Scotland", url: "https://www.nhsinform.scot/care-support-and-rights/nhs-services/ophthalmics/your-entitlements-to-nhs-ophthalmic-services" },
  Wales: { label: "GOV.WALES: Get help with NHS eye care costs", url: "https://www.gov.wales/get-help-nhs-eye-care-costs" },
  "Northern Ireland": { label: "nidirect: Free sight tests for over 60s and help with other health costs", url: "https://www.nidirect.gov.uk/articles/free-sight-tests-over-60s-and-help-other-health-costs" },
  England: { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BrandLocationPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>;
}) {
  const { slug: brand, location } = await params;
  const optician = getOpticianBySlug(brand);
  const loc = getLocationBySlug(location);
  if (!optician || !loc) notFound();

  const hasStore = brandInTown(optician, loc.slug);
  const stores = storesFor(optician.slug, loc.slug);
  const nearest = hasStore ? [] : nearestBrandTowns(optician, loc);
  const localBrands = brandsInTown(loc.slug, optician.slug);
  const nearbyWithBrand = loc.nearbyAreas
    .map((s) => getLocationBySlug(s))
    .filter((l): l is UKLocation => !!l && brandInTown(optician, l.slug));
  const checked = checkedLabel(optician);
  const url = `${BASE}/opticians/${optician.slug}/${loc.slug}`;
  const searchHref = `/search?postcode=${encodeURIComponent(loc.postcode)}`;
  const privateTest = optician.detailedServices.find(
    (s) => !s.nhsCovered && /eye (test|exam)/i.test(s.name) && s.duration && s.duration !== "Varies"
  );
  const nhsSource = NHS_SOURCE[loc.region] ?? NHS_SOURCE.England;

  // ── FAQs ───────────────────────────────────────────────────────────────
  const faqItems: { q: string; a: string }[] = [];
  if (!hasStore) {
    faqItems.push({
      q: `Is there a ${optician.shortName} in ${loc.name}?`,
      a: nearest.length
        ? `We don't currently have a ${optician.shortName} practice listed in ${loc.name}. The nearest ${optician.shortName} locations we list are ${nearest.map((n) => `${n.location.name} (about ${n.miles} miles)`).join(", ")}. ${optician.shortName} opens and closes practices from time to time, so check the ${optician.shortName} website for the latest list.`
        : `We don't currently have a ${optician.shortName} practice listed in ${loc.name}. Check the ${optician.shortName} website for the latest list of practices.`,
    });
  }
  faqItems.push(
    {
      q: `How much is an eye test at ${optician.shortName}?`,
      a: `${optician.shortName}'s published eye test prices are ${optician.priceRange}. ${optician.nhsAvailable ? "NHS-funded eye tests are free if you qualify. " : ""}Prices can vary by store and change from time to time, so check with ${optician.shortName} before you book.`,
    },
    {
      q: `Can I get a free NHS eye test in ${loc.name}?`,
      a: `Yes, if you qualify. ${nhsLine(loc)}`,
    },
    {
      q: `How do I book${hasStore ? ` ${optician.shortName} in ${loc.name}` : ` an eye test in ${loc.name}`}?`,
      a: `Find ${hasStore ? optician.shortName + " and other opticians" : "opticians"} near you on eyetest.co.uk and book direct with the optician. Where we can show appointment availability, we do. You can also book on the optician's own website or by contacting the practice.`,
    }
  );
  if (privateTest) {
    faqItems.push({
      q: `How long does an eye test take at ${optician.shortName}?`,
      a: `${optician.shortName} says its ${privateTest.name.toLowerCase()} takes ${privateTest.duration.toLowerCase()}.`,
    });
  }

  // ── Structured data ────────────────────────────────────────────────────
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: hasStore ? `${optician.name} ${loc.name}` : `${optician.name} near ${loc.name}`,
      dateModified: pageDate(optician),
      isPartOf: { "@type": "WebSite", name: "eyetest.co.uk", url: BASE },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Opticians", item: `${BASE}/opticians` },
        { "@type": "ListItem", position: 3, name: optician.name, item: `${BASE}/opticians/${optician.slug}` },
        { "@type": "ListItem", position: 4, name: loc.name, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    // One Optician entry per real practice from the optician's own systems.
    // Only practices with a street address get schema: Google needs one.
    ...stores.filter((s) => s.address).map((s) => ({
      "@type": "Optician",
      name: cleanName(s.name),
      address: {
        "@type": "PostalAddress",
        streetAddress: s.address,
        ...(s.postcode ? { postalCode: s.postcode } : {}),
        addressCountry: "GB",
      },
      ...(s.phone ? { telephone: s.phone } : {}),
      ...(s.lat && s.lng
        ? { geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng } }
        : {}),
      ...(s.hours?.length
        ? {
            openingHoursSpecification: s.hours.map((h) => ({
              "@type": "OpeningHoursSpecification",
              dayOfWeek: h.day,
              opens: h.opens,
              closes: h.closes,
            })),
          }
        : {}),
      parentOrganization: { "@type": "Organization", name: optician.name, url: optician.website },
    })),
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
          }}
        />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <PageHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Opticians", href: "/opticians" },
            { label: optician.name, href: "/opticians/" + optician.slug },
            { label: loc.name },
          ]}
          compact
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: optician.brandColor }} />
            <span className="text-sm font-medium text-white/60">
              {optician.shortName} &middot; {loc.name}, {loc.county}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {optician.name} <span className="text-[var(--color-primary-light)]">{loc.name}</span>
          </h1>
          {hasStore ? (
            <div className="inline-flex items-center gap-2 bg-[var(--color-success)]/15 border border-[var(--color-success)]/30 text-[var(--color-success)] text-sm font-medium px-5 py-2.5 rounded-full mb-4">
              <span className="inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-success)]" />
              {optician.shortName} practices listed in and around {loc.name}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium px-5 py-2.5 rounded-full mb-4">
              No {optician.shortName} practice listed in {loc.name}
            </div>
          )}
          <p className="text-sm text-white/60 mb-4">
            Information last checked against {optician.name}&apos;s own website: {checked}
          </p>
          <p className="text-lg text-white/75 max-w-2xl mx-auto">
            {hasStore
              ? `Find ${optician.shortName} in ${loc.name}, compare it with other opticians nearby and book direct. Where we can show appointment availability, we do, so you can see your options in one place.`
              : `We don't currently have a ${optician.shortName} practice listed in ${loc.name}. The nearest ${optician.shortName} locations we list are below, along with other opticians in ${loc.name} you can book direct.`}
          </p>
        </PageHero>

        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-12">
          {/* ── Practices in town (real data) ─────────────────────── */}
          {hasStore && stores.length > 0 && (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-2">
                {optician.shortName} practices in and around {loc.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                From {optician.shortName}&apos;s own website and booking system, checked {longDate(SNAPSHOT_DATE)}.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {stores.map((s) => (
                  <div key={`${s.name}-${s.postcode}`} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <h3 className="font-semibold text-[var(--color-navy)]">{cleanName(s.name)}</h3>
                    {s.address && (
                      <p className="text-sm text-gray-600 mt-1">
                        {s.address}
                        {s.postcode ? `, ${s.postcode}` : ""}
                      </p>
                    )}
                    {s.phone && <p className="text-sm text-gray-600 mt-1">{s.phone}</p>}
                    {s.hours && s.hours.length > 0 && (
                      <details className="mt-2 text-xs text-gray-600">
                        <summary className="cursor-pointer text-gray-500">Opening hours</summary>
                        <ul className="mt-1 space-y-0.5">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                            const h = s.hours!.find((x) => x.day === day);
                            return (
                              <li key={day} className="flex justify-between gap-4">
                                <span>{day}</span>
                                <span>{h ? `${h.opens} to ${h.closes}` : "Closed"}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      About {Math.max(0.1, Math.round((s.distanceM / 1609.34) * 10) / 10)} miles from {loc.name} centre
                    </p>
                    {s.bookingUrl && (
                      <a
                        href={s.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-block mt-3 text-sm font-semibold text-[var(--color-primary)] hover:underline"
                      >
                        Book direct with {optician.shortName}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Nearest locations (no practice in town) ───────────── */}
          {!hasStore && (
            <section className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)] mb-3">
                Nearest {optician.shortName} locations
              </h2>
              {nearest.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {nearest.map((n) => (
                    <li key={n.location.slug}>
                      <Link
                        href={`/opticians/${optician.slug}/${n.location.slug}`}
                        className="inline-flex items-center rounded-full bg-white border border-amber-200 px-4 py-2 text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-primary)]"
                      >
                        {n.location.name} (about {n.miles} miles)
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700">We don&apos;t list any other {optician.shortName} locations at the moment.</p>
              )}
              <p className="text-sm text-gray-600 mt-4">
                {optician.shortName} opens and closes practices from time to time, so check the{" "}
                <a href={optician.website} target="_blank" rel="noopener noreferrer nofollow" className="text-[var(--color-primary)] hover:underline">
                  {optician.shortName} website
                </a>{" "}
                for the latest list.
              </p>
            </section>
          )}

          {/* ── How to book ───────────────────────────────────────── */}
          <section className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)] mb-2">
              {hasStore ? `How to book ${optician.shortName} in ${loc.name}` : `How to book an eye test in ${loc.name}`}
            </h2>
            <p className="text-gray-600 mb-4">
              Enter your postcode on eyetest.co.uk to find {hasStore ? `${optician.shortName} and other opticians` : "opticians"} near you, then book direct with the optician.{" "}
              {hasStore
                ? `You can also book on the ${optician.shortName} website or by contacting your local practice.`
                : "Where we can show appointment availability, we do."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={searchHref}
                className="inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-6 py-3 rounded-full"
              >
                Find opticians near {loc.postcode}
              </Link>
              <a
                href={optician.website}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center border border-gray-300 bg-white text-[var(--color-navy)] font-semibold text-sm px-6 py-3 rounded-full hover:border-[var(--color-primary)]"
              >
                Visit {optician.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")}
              </a>
            </div>
          </section>

          {/* ── Other opticians in town ───────────────────────────── */}
          {localBrands.length > 0 && (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-2">
                {hasStore ? `Other opticians in ${loc.name}` : `Opticians in ${loc.name}`}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Find them near {loc.postcode} and book direct.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {localBrands.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/opticians/${b.slug}/${loc.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-[var(--color-navy)] hover:border-[var(--color-primary)]/40"
                    >
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: b.brandColor }} />
                      <span>
                        {b.name} {loc.name}
                        <span className="block text-xs font-normal text-gray-500">{b.priceRange}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Prices (verified brand data) ──────────────────────── */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-4">
              Eye test prices at {optician.shortName}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-[var(--color-navy)]">
                    <th className="py-3 px-4 font-semibold">Service</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {optician.detailedServices.map((s) => (
                    <tr key={s.name} className="border-b border-gray-50 align-top">
                      <td className="py-3 px-4">
                        <span className="font-medium text-[var(--color-navy)]">{s.name}</span>
                        <span className="block text-xs text-gray-500 mt-1">{s.description}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-semibold text-[var(--color-navy)]">{s.price}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-600">{s.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Prices are the same as on {optician.shortName}&apos;s own website when we checked in {checked}, and may vary by store.{" "}
              <Link href={`/opticians/${optician.slug}`} className="text-[var(--color-primary)] hover:underline">
                {optician.shortName} eye test price and full details
              </Link>
            </p>
          </section>

          {/* ── What we like ──────────────────────────────────────── */}
          {optician.prosAndCons.pros.length > 0 && (
            <section>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-4">
                What we like about {optician.shortName}
              </h2>
              <ul className="space-y-2">
                {optician.prosAndCons.pros.map((p) => (
                  <li key={p} className="flex gap-3 text-gray-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-success)] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── NHS ───────────────────────────────────────────────── */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-3">
              Free NHS eye tests in {loc.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">{nhsLine(loc)}</p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Your NHS entitlement is the same at any optician that offers NHS sight tests, so you can use it
              {optician.nhsAvailable ? ` at ${optician.shortName} or` : ""} at another optician in {nameWithCounty(loc)}. Tell the
              optician when you book and bring proof of entitlement if you have it.{" "}
              <Link href="/find/free-eye-test" className="text-[var(--color-primary)] hover:underline">
                Who gets a free eye test
              </Link>
            </p>
          </section>

          {/* ── What happens at an eye test ───────────────────────── */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-3">
              What happens at an eye test
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              An eye test checks how well you see and the health of your eyes. The optometrist will usually ask about your
              health and any symptoms, check your vision and prescription, and look at the front and back of your eyes.
              Many opticians also measure the pressure in your eyes and offer extra scans such as OCT.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Bring your current glasses or contact lenses, a list of any medicines you take and proof of NHS entitlement
              if you have it. Afterwards you will be given your prescription, which you can use at any optician.
            </p>
          </section>

          {/* ── FAQs ──────────────────────────────────────────────── */}
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)] mb-4">
              {optician.shortName} {loc.name}: questions
            </h2>
            <div className="space-y-3">
              {faqItems.map((faq) => (
                <details key={faq.q} className="group bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-[var(--color-navy)]">
                    <span>{faq.q}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Explore ───────────────────────────────────────────── */}
          <section className="grid gap-8 sm:grid-cols-3">
            {nearbyWithBrand.length > 0 && (
              <div>
                <h3 className="font-semibold text-[var(--color-navy)] mb-3">{optician.shortName} nearby</h3>
                <ul className="space-y-2 text-sm">
                  {nearbyWithBrand.slice(0, 5).map((n) => (
                    <li key={n.slug}>
                      <Link href={`/opticians/${optician.slug}/${n.slug}`} className="text-[var(--color-primary)] hover:underline">
                        {optician.shortName} {n.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-[var(--color-navy)] mb-3">Types of eye test</h3>
              <ul className="space-y-2 text-sm">
                {eyeTests.slice(0, 5).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/eye-tests/${t.slug}`} className="text-[var(--color-primary)] hover:underline">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-navy)] mb-3">More for {loc.name}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/locations/${loc.slug}`} className="text-[var(--color-primary)] hover:underline">
                    All opticians in {loc.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/opticians/${optician.slug}`} className="text-[var(--color-primary)] hover:underline">
                    {optician.shortName} eye test price
                  </Link>
                </li>
                <li>
                  <Link href="/find/eye-test-cost" className="text-[var(--color-primary)] hover:underline">
                    Eye test prices in the UK
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          {/* ── Disclaimer and sources ────────────────────────────── */}
          <section className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-sm text-amber-900 leading-relaxed">
            <strong className="font-semibold">Please note: </strong>
            The information on this page was last checked against {optician.name}&apos;s own website in {checked}
            {stores.length > 0 ? `, and the practices listed were checked on ${longDate(SNAPSHOT_DATE)}` : ""}. {PRICE_DISCLAIMER}
          </section>
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)] mb-3">Sources</h2>
            <ul className="space-y-1 text-sm">
              {[...(optician.sources ?? [{ label: `${optician.name} website`, url: optician.website }]), nhsSource]
                .filter((s, i, arr) => arr.findIndex((x) => x.url === s.url) === i)
                .map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-[var(--color-primary)] hover:underline">
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
