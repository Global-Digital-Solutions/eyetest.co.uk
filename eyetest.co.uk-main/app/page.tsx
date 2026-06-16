"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { StoreResult } from "@/lib/types";

const StoreMap = dynamic(() => import("@/components/StoreMap"), { ssr: false });

const PROVIDER_COLORS: Record<string, string> = {
  "Boots Opticians": "bg-blue-100 text-blue-800",
  "ASDA Opticians": "bg-green-100 text-green-800",
  "Vision Express": "bg-purple-100 text-purple-800",
};

function providerBadge(provider: string) {
  const cls = PROVIDER_COLORS[provider] ?? "bg-gray-100 text-gray-700";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}
    >
      {displayProviderName(provider)}
    </span>
  );
}

function formatDistance(m: number): string {
  if (m < 1000) return `${m} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

function StoreCard({ store }: { store: StoreResult }) {
  const hasSlots = Boolean(store.slotsAvailable);
  return (
    <div
      className={`rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md ${
        store.featured
          ? "border-amber-300 bg-amber-50 ring-1 ring-amber-200"
          : hasSlots
          ? "border-green-200 bg-white"
          : "border-gray-100 bg-gray-50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {store.featured && (
              <span className="inline-block rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-white">
                ★ {store.featuredLabel ?? "Empfohlen"}
              </span>
            )}
            {providerBadge(store.provider)}
            <span className="text-xs text-gray-500">
              {formatDistance(store.distanceM)} away
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 truncate">
            {store.storeName}
          </h3>
          {(store.address || store.town || store.postcode) && (
            <p className="mt-0.5 text-sm text-gray-500">
              {[store.address, store.town, store.postcode]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
          {store.phone && (
            <p className="mt-0.5 text-sm text-gray-400">{store.phone}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          {hasSlots ? (
            <span className="inline-block rounded-lg bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
              ✓ Available
            </span>
          ) : (
            <span className="inline-block rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
              No slots
            </span>
          )}
        </div>
      </div>

      {store.slotsAvailable && (
        <p className="mt-2 text-sm font-medium text-green-700">
          {store.slotsAvailable}
        </p>
      )}

      <div className="mt-3">
        <a
          href={store.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            hasSlots
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Book →
        </a>
      </div>
    </div>
  );
}

interface StreamState {
  postcode: string | null;
  center: [number, number] | null;
  results: StoreResult[];
  errors: { provider: string; message: string }[];
  activeProviders: string[];
  loadingProviders: string[];
  done: boolean;
}


function displayProviderName(p: string): string {
  return p
    .replace(".mysight.uk", "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

export default function Home() {
  const [postcode, setPostcode] = useState("");
  const [searching, setSearching] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [stream, setStream] = useState<StreamState | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = postcode.trim();
    if (!q) return;

    setSearching(true);
    setGlobalError(null);
    setStream({
      postcode: null,
      center: null,
      results: [],
      errors: [],
      activeProviders: [],
      loadingProviders: [],
      done: false,
    });

    try {
      const res = await fetch(`/api/search?postcode=${encodeURIComponent(q)}`);

      if (!res.ok) {
        const json = await res.json();
        setGlobalError(json.error ?? "Search failed");
        setSearching(false);
        setStream(null);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const event = JSON.parse(trimmed) as Record<string, unknown>;

            if (event.type === "meta") {
              const active = event.activeProviders as string[];
              setStream((s) =>
                s ? {
                  ...s,
                  postcode: event.postcode as string,
                  center: [event.lat as number, event.lng as number],
                  activeProviders: active,
                  loadingProviders: active,
                } : s
              );
            } else if (event.type === "results") {
              const provider = event.provider as string;
              const incoming = event.results as StoreResult[];
              setStream((s) =>
                s
                  ? {
                      ...s,
                      results: [...s.results, ...incoming],
                      loadingProviders: s.loadingProviders.filter(
                        (p) => p !== provider
                      ),
                    }
                  : s
              );
            } else if (event.type === "error") {
              const provider = event.provider as string;
              setStream((s) =>
                s
                  ? {
                      ...s,
                      errors: [
                        ...s.errors,
                        {
                          provider,
                          message: event.message as string,
                        },
                      ],
                      loadingProviders: s.loadingProviders.filter(
                        (p) => p !== provider
                      ),
                    }
                  : s
              );
            } else if (event.type === "done") {
              setStream((s) =>
                s ? { ...s, done: true, loadingProviders: [] } : s
              );
            }
          } catch {
            // ignore malformed line
          }
        }
      }
    } catch {
      setGlobalError("Network error — please try again");
      setStream(null);
    } finally {
      setSearching(false);
    }
  }

  const results = stream?.results ?? [];
  const featured = results.filter((r) => r.featured);
  const available = results.filter((r) => !r.featured && r.slotsAvailable);
  const unavailable = results.filter((r) => !r.featured && !r.slotsAvailable);
  const stillLoading = stream && !stream.done;

  const availableWithCoords = [...featured, ...available].filter((s) => s.lat && s.lng);

  return (
    <main className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left panel — search + results */}
      <div className="w-full max-w-xl shrink-0 overflow-y-auto px-4 py-8 md:w-[460px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            👁 Eye Test Finder
          </h1>
          <p className="mt-2 text-gray-500">
            Find available eye test appointments near you across Boots, ASDA,
            Vision Express &amp; independent opticians
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="Enter UK postcode, e.g. EC2R 8AH"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            disabled={searching}
            maxLength={8}
          />
          <button
            type="submit"
            disabled={searching || !postcode.trim()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {searching ? "Searching…" : "Search"}
          </button>
        </form>

        {globalError && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-700">
            {globalError}
          </div>
        )}

        {stream && (
          <div>
            {/* Status bar */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {results.length > 0 && (
                  <>
                    {results.length} stores
                    {stream.postcode && (
                      <>
                        {" "}near{" "}
                        <span className="font-medium text-gray-800">
                          {stream.postcode}
                        </span>
                      </>
                    )}
                  </>
                )}
              </p>
              {(available.length + featured.filter((r) => r.slotsAvailable).length) > 0 && (
                <span className="text-sm font-medium text-green-700">
                  {available.length + featured.filter((r) => r.slotsAvailable).length} with available slots
                </span>
              )}
            </div>

            {/* Loading provider pills — max 3 visible + "+N more" */}
            {stillLoading && stream.loadingProviders.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {stream.loadingProviders.slice(0, 3).map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500"
                  >
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />
                    {displayProviderName(p)}
                  </span>
                ))}
                {stream.loadingProviders.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-400">
                    +{stream.loadingProviders.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            {results.length === 0 && stream.done ? (
              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
                No stores found within 15 km of {stream.postcode ?? postcode}.
              </div>
            ) : (
              <div className="space-y-3">
                {featured
                  .sort((a, b) => {
                    if (a.nextAvailable && b.nextAvailable)
                      return a.nextAvailable.localeCompare(b.nextAvailable);
                    if (a.nextAvailable) return -1;
                    if (b.nextAvailable) return 1;
                    return a.distanceM - b.distanceM;
                  })
                  .map((store, i) => (
                    <StoreCard key={`feat-${i}-${store.storeName}`} store={store} />
                  ))}
                {available
                  .sort((a, b) => {
                    if (a.nextAvailable && b.nextAvailable)
                      return a.nextAvailable.localeCompare(b.nextAvailable);
                    if (a.nextAvailable) return -1;
                    if (b.nextAvailable) return 1;
                    return a.distanceM - b.distanceM;
                  })
                  .map((store, i) => (
                    <StoreCard key={`avail-${i}-${store.storeName}`} store={store} />
                  ))}
                {unavailable.length > 0 && (featured.length > 0 || available.length > 0) && stream.done && (
                  <p className="pt-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    No slots found
                  </p>
                )}
                {stream.done &&
                  unavailable
                    .sort((a, b) => a.distanceM - b.distanceM)
                    .map((store, i) => (
                      <StoreCard key={`unavail-${i}-${store.storeName}`} store={store} />
                    ))}
              </div>
            )}

            {/* Loading skeleton while waiting for more results */}
            {stillLoading && results.length === 0 && (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-200" />
                ))}
              </div>
            )}

            {/* Provider errors */}
            {stream.errors.length > 0 && (
              <details className="mt-6 text-xs text-gray-400">
                <summary className="cursor-pointer">
                  {stream.errors.length} provider error(s)
                </summary>
                <ul className="mt-2 space-y-1 pl-4">
                  {stream.errors.map((e, i) => (
                    <li key={i}>
                      <span className="font-medium">{e.provider}:</span>{" "}
                      {e.message}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Right panel — map */}
      <div className="relative hidden flex-1 md:block">
        {stream?.center ? (
          <StoreMap stores={availableWithCoords} center={stream.center} />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            Search for a postcode to see stores on the map
          </div>
        )}
      </div>
    </main>
  );
}
