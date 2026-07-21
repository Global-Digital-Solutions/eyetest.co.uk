import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// SEO metadata — noindex (private flow page)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Listing Activated — eyetest.co.uk",
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Supabase admin (service role — no auth context on this page)
// ---------------------------------------------------------------------------

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

interface ListingData {
  practice_name: string;
  postcode: string;
  town: string | null;
  address: string | null;
  phone: string;
  website: string | null;
  booking_url: string | null;
  tier: "gold" | "platinum";
  badge_label: string;
  lat: number | null;
  lng: number | null;
  audiology_addon: boolean;
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // Fetch listing data from Stripe session → Supabase
  let listing: ListingData | null = null;

  if (session_id && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const listingId = session.metadata?.listing_id;

      if (listingId) {
        const supabase = getSupabaseAdmin();
        const { data } = await supabase
          .from("optician_listings")
          .select(
            "practice_name, postcode, town, address, phone, website, booking_url, tier, badge_label, lat, lng, audiology_addon"
          )
          .eq("id", listingId)
          .single();

        if (data) listing = data as ListingData;
      }
    } catch (err) {
      console.error("Failed to fetch listing for success page:", err);
    }
  }

  const mapToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const hasMap = listing?.lat && listing?.lng && mapToken;

  // Static map URL (Mapbox)
  const staticMapUrl = hasMap
    ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+0ea5a0(${listing!.lng},${listing!.lat})/${listing!.lng},${listing!.lat},14,0/600x300@2x?access_token=${mapToken}`
    : null;

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* ================================================================ */}
        {/* SUCCESS BANNER — light, clean                                    */}
        {/* ================================================================ */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 text-center">
            {/* Animated checkmark */}
            <div className="w-20 h-20 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-[var(--color-success)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] leading-tight mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              You&rsquo;re all set!
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
              Your listing is now being activated. You&rsquo;ll receive a
              confirmation email shortly.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* LISTING PREVIEW CARD                                             */}
        {/* ================================================================ */}
        <section className="py-10 sm:py-14">
          <div className="max-w-3xl mx-auto px-4">
            {listing ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-8">
                {/* Map preview */}
                {staticMapUrl && (
                  <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={staticMapUrl}
                      alt={`Map showing ${listing.practice_name} near ${listing.postcode}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                {/* Practice details */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h2
                          className="text-xl sm:text-2xl font-bold text-[var(--color-navy)]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {listing.practice_name}
                        </h2>
                        {/* Tier badge */}
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            listing.tier === "platinum"
                              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {listing.badge_label || (listing.tier === "platinum" ? "Top Rated" : "Recommended")}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
                        <svg
                          className="w-4 h-4 text-gray-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        {listing.address && <span>{listing.address}, </span>}
                        {listing.town && <span>{listing.town}, </span>}
                        <span>{listing.postcode}</span>
                      </div>

                      {/* Phone */}
                      {listing.phone && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4 text-gray-400 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                          </svg>
                          {listing.phone}
                        </div>
                      )}
                    </div>

                    {/* Audiology add-on badge */}
                    {listing.audiology_addon && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 8.5a6 6 0 0 1 12 0c0 3-2 4.5-2 7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2c0-1.5-.5-2-1.5-3" />
                        </svg>
                        + hearingtest.co.uk
                      </span>
                    )}
                  </div>

                  {/* Status indicator */}
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-success)]" />
                      </span>
                      <span className="text-sm font-medium text-[var(--color-success)]">
                        Listing activating &mdash; live within 24 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Fallback if no listing data */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 sm:p-10 text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-8 h-8 text-[var(--color-success)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2
                  className="text-xl font-bold text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Payment confirmed
                </h2>
                <p className="text-gray-600">
                  Your listing is being activated. Check your email for
                  confirmation details.
                </p>
              </div>
            )}

            {/* ---- What happens next ---- */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8">
              <h3
                className="text-lg font-bold text-[var(--color-navy)] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What happens next
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    ),
                    title: "Live within 24 hours",
                    desc: "We review and publish your listing to search results",
                  },
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    ),
                    title: "Patients find you",
                    desc: "People searching near your postcode will see your practice",
                  },
                  {
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      />
                    ),
                    title: "Easy to manage",
                    desc: "Email us any time to update your listing details",
                  },
                ].map((item) => (
                  <div key={item.title} className="text-center p-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-5 h-5 text-[var(--color-primary)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <h4
                      className="text-sm font-bold text-[var(--color-navy)] mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- CTA buttons ---- */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Return to homepage
              </a>
              <a
                href="/search"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[var(--color-navy)] font-semibold px-8 py-3 rounded-full border border-gray-200 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                View search results
              </a>
            </div>

            {/* ---- Payment reference ---- */}
            {session_id && (
              <p className="text-center text-xs text-gray-400 mb-4">
                Payment reference: {session_id}
              </p>
            )}

            {/* ---- Contact info ---- */}
            <p className="text-center text-sm text-gray-500">
              Questions about your listing? Email us at{" "}
              <a
                href="mailto:hello@eyetest.co.uk"
                className="text-[var(--color-primary)] hover:underline"
              >
                hello@eyetest.co.uk
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
