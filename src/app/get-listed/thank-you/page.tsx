import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TierSelection } from "@/components/TierSelection";
import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// SEO metadata — noindex (private flow page)
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Choose Your Listing Plan — eyetest.co.uk",
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ listing_id?: string }>;
}) {
  const { listing_id } = await searchParams;

  /* ---- Fetch listing from Supabase ---- */
  let practiceName = "";
  let postcode = "";
  let audiologyAddon = false;

  if (listing_id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("optician_listings")
      .select("practice_name, postcode, audiology_addon")
      .eq("id", listing_id)
      .single();

    if (data) {
      practiceName = data.practice_name;
      postcode = data.postcode;
      audiologyAddon = data.audiology_addon ?? false;
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ================================================================ */}
        {/* HERO                                                             */}
        {/* ================================================================ */}
        <section className="relative bg-gradient-to-br from-[var(--color-navy)] via-[#0f2342] to-[var(--color-navy)] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Choose Your Listing
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Select a plan to get your practice live on eyetest.co.uk and start
              reaching patients in your area
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TIER SELECTION                                                   */}
        {/* ================================================================ */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4">
            {listing_id ? (
              <TierSelection
                listingId={listing_id}
                practiceName={practiceName || "your practice"}
                postcode={postcode || "your area"}
                initialAudiologyAddon={audiologyAddon}
              />
            ) : (
              /* No listing_id — show fallback */
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-8 h-8 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h2
                  className="text-xl font-bold text-[var(--color-navy)] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  No practice submission found
                </h2>
                <p className="text-gray-600 mb-6">
                  It looks like you arrived here without an active submission.
                  Please submit your practice details first and we&rsquo;ll bring you
                  back to choose a plan.
                </p>
                <a
                  href="/get-listed"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold px-8 py-3 rounded-full transition-all"
                >
                  Apply to Get Listed
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================ */}
        {/* CROSS-SELL: hearingtest.co.uk                                    */}
        {/* ================================================================ */}
        <section className="pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-[#1a2744] to-[#243b63] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              {/* Icon + branding */}
              <div className="flex-shrink-0 text-center sm:text-left">
                <div className="w-14 h-14 bg-[#3b7dd8] rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-3">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8.5a6 6 0 0 1 12 0c0 3-2 4.5-2 7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2c0-1.5-.5-2-1.5-3" stroke="currentColor" />
                    <path d="M11 12.5a2 2 0 0 0 2 2" stroke="currentColor" />
                    <path d="M13.5 8.5a2.5 2.5 0 0 0-5 0" stroke="currentColor" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  hearing<span className="text-[#0d9488]">test</span><span className="text-white/40 text-sm">.co.uk</span>
                </span>
              </div>

              {/* Copy */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Also offer audiology services?
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Most optician practices also provide hearing tests. Get listed on our sister site
                  <strong className="text-white"> hearingtest.co.uk</strong> and reach patients looking for
                  hearing tests in your area &mdash; from just &pound;99/year.
                </p>
                <a
                  href="https://www.hearingtest.co.uk/get-listed"
                  className="inline-flex items-center gap-2 bg-[#3b7dd8] hover:bg-[#2c6bbf] text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all"
                >
                  List on hearingtest.co.uk
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
