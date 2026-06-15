import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchResults } from "@/components/SearchResults";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { postcode } = await searchParams;
  const pc = typeof postcode === "string" ? postcode.toUpperCase() : "";

  return {
    title: pc
      ? `Eye Tests near ${pc} — eyetest.co.uk`
      : "Search Eye Tests — eyetest.co.uk",
    description: pc
      ? `Compare opticians and book eye test appointments near ${pc}. Find NHS and private eye tests with same-day availability.`
      : "Search for eye test appointments near you. Compare opticians across the UK.",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { postcode } = await searchParams;
  const pc = typeof postcode === "string" ? postcode.trim().toUpperCase() : "";

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Search refinement bar */}
        <div className="sticky top-[calc(var(--header-height,6.5rem))] z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <form
              action="/search"
              method="GET"
              className="flex items-center gap-2"
            >
              <div className="relative flex-1 max-w-sm">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="postcode"
                  defaultValue={pc}
                  placeholder="Enter postcode"
                  className="w-full pl-9 pr-3 py-2 text-sm text-[var(--color-navy)] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  aria-label="Change postcode"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
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
                <span className="hidden sm:inline">Update</span>
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        <SearchResults postcode={pc} />
      </main>
      <Footer />
    </>
  );
}
