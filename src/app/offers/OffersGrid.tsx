"use client";

import { useState } from "react";
import type { ProviderOffers, OfferCategoryKey } from "@/data/offers";
import { OFFER_CATEGORIES } from "@/data/offers";

/* ------------------------------------------------------------------ */
/*  Badge colour helper                                                */
/* ------------------------------------------------------------------ */

function badgeStyle(category: string) {
  switch (category) {
    case "glasses":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "eye-test":
      return "bg-green-50 text-green-700 border-green-200";
    case "contact-lenses":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "sunglasses":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "discount":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "membership":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "nhs":
      return "bg-sky-50 text-sky-700 border-sky-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function categoryLabel(key: string): string {
  const cat = OFFER_CATEGORIES.find((c) => c.key === key);
  return cat?.label ?? key;
}

/* ------------------------------------------------------------------ */
/*  Offer card                                                         */
/* ------------------------------------------------------------------ */

function OfferCard({
  offer,
  providerColor,
}: {
  offer: ProviderOffers["offers"][number];
  providerColor: string;
}) {
  const isExpiring =
    offer.expires &&
    new Date(offer.expires).getTime() - Date.now() < 30 * 86_400_000;

  return (
    <div className="rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: providerColor }} />

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Category pill */}
          <span
            className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeStyle(offer.category)}`}
          >
            {categoryLabel(offer.category)}
          </span>

          {/* Value badge */}
          {offer.badge && (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold text-white whitespace-nowrap"
              style={{ backgroundColor: providerColor }}
            >
              {offer.badge}
            </span>
          )}
        </div>

        <h3
          className="text-sm font-bold text-[var(--color-navy)] mb-1.5 leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {offer.title}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {offer.description}
        </p>

        {/* Expiry notice */}
        {offer.expires && (
          <div
            className={`text-[10px] font-medium mb-2 ${isExpiring ? "text-red-500" : "text-gray-400"}`}
          >
            {isExpiring ? "⏰ " : ""}Ends{" "}
            {new Date(offer.expires).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}

        {/* Terms */}
        {offer.terms && (
          <p className="text-[10px] text-gray-400 italic">{offer.terms}</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider section                                                   */
/* ------------------------------------------------------------------ */

function ProviderSection({
  provider,
  filter,
}: {
  provider: ProviderOffers;
  filter: OfferCategoryKey;
}) {
  const filtered =
    filter === "all"
      ? provider.offers
      : provider.offers.filter((o) => o.category === filter);

  if (filtered.length === 0) return null;

  return (
    <div id={provider.slug} className="scroll-mt-24">
      {/* Provider header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: provider.color }}
        >
          {provider.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2
            className="text-lg sm:text-xl font-bold text-[var(--color-navy)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {provider.name}
          </h2>
          <p className="text-xs text-gray-400">{provider.tagline}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-gray-400">
            Eye test: <strong className="text-[var(--color-navy)]">{provider.eyeTestPrice}</strong>
          </span>
          <a
            href={provider.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
          >
            Visit site
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Offers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map((offer, i) => (
          <OfferCard
            key={`${provider.slug}-${i}`}
            offer={offer}
            providerColor={provider.color}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main grid (client component for filtering)                         */
/* ------------------------------------------------------------------ */

export function OffersGrid({
  providers,
}: {
  providers: ProviderOffers[];
}) {
  const [filter, setFilter] = useState<OfferCategoryKey>("all");
  const [search, setSearch] = useState("");

  // Count offers per category
  const allOffers = providers.flatMap((p) => p.offers);
  const counts: Record<string, number> = { all: allOffers.length };
  for (const o of allOffers) {
    counts[o.category] = (counts[o.category] ?? 0) + 1;
  }

  // Provider-level search filter
  const filteredProviders = search
    ? providers.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : providers;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            All Current Offers
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Browse offers by category or jump to a specific optician. Deals are
            verified directly from each provider&apos;s website.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {OFFER_CATEGORIES.map((cat) => {
              const count = counts[cat.key] ?? 0;
              if (cat.key !== "all" && count === 0) return null;
              const active = filter === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-[var(--color-primary)] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-[10px] ${active ? "text-white/70" : "text-gray-400"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Provider search */}
          <div className="relative w-full sm:w-56">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search optician..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] bg-white"
            />
          </div>
        </div>

        {/* Provider sections */}
        <div className="space-y-12">
          {filteredProviders.map((provider) => (
            <ProviderSection
              key={provider.slug}
              provider={provider}
              filter={filter}
            />
          ))}

          {filteredProviders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">
                No opticians match &ldquo;{search}&rdquo;. Try a different
                search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
