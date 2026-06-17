"use client";

import { useState, useEffect, useCallback } from "react";
import { logout } from "./login/actions";
import type { FeaturedProvider, StoreResult } from "@/lib/types";

type Config = Record<string, boolean>;

const MYSIGHT_LABEL = (site: string) =>
  site.replace(".mysight.uk", "").replace(/-/g, " ");

const MAIN_PROVIDERS = ["Boots Opticians", "ASDA Opticians", "Vision Express", "M&S Opticians", "Ace & Tate"];

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors";

const labelCls =
  "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

function Toggle({
  enabled,
  onChange,
  disabled,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed ${
        enabled ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function formatDistance(m: number) {
  return m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;
}

function FeaturedSection({ mysightSites }: { mysightSites: string[] }) {
  const [rules, setRules] = useState<FeaturedProvider[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Step 1: pick provider + postcode to search stores
  const [provider, setProvider] = useState(MAIN_PROVIDERS[0]);
  const [searchPostcode, setSearchPostcode] = useState("");
  const [loadingStores, setLoadingStores] = useState(false);
  const [storeError, setStoreError] = useState<string | null>(null);
  const [stores, setStores] = useState<StoreResult[] | null>(null);

  // Step 2: pick a store
  const [selectedStore, setSelectedStore] = useState<StoreResult | null>(null);

  // Step 3: configure rule
  const [radiusKm, setRadiusKm] = useState(10);
  const [label, setLabel] = useState("Recommended");

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const providerOptions = [...MAIN_PROVIDERS, ...mysightSites];

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/featured");
    if (res.ok) {
      const data = await res.json();
      setRules(data.rules ?? []);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setSearchPostcode("");
    setStores(null);
    setSelectedStore(null);
    setStoreError(null);
    setRadiusKm(10);
    setLabel("Recommended");
    setFormError(null);
  }

  async function handleLoadStores(e: React.FormEvent) {
    e.preventDefault();
    setLoadingStores(true);
    setStoreError(null);
    setStores(null);
    setSelectedStore(null);

    const res = await fetch(
      `/api/admin/stores?provider=${encodeURIComponent(provider)}&postcode=${encodeURIComponent(searchPostcode)}`
    );
    const data = await res.json();
    if (!res.ok) {
      setStoreError(data.error ?? "Failed to load stores");
    } else {
      setStores(data.stores ?? []);
    }
    setLoadingStores(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedStore) return;
    setSaving(true);
    setFormError(null);

    const res = await fetch("/api/admin/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider,
        store_name: selectedStore.storeName,
        store_postcode: selectedStore.postcode || null,
        lat: selectedStore.lat,
        lng: selectedStore.lng,
        radius_km: radiusKm,
        label,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setFormError(data.error ?? "Failed to save");
    } else {
      setRules((prev) => [data.rule, ...prev]);
      setShowForm(false);
      resetForm();
    }
    setSaving(false);
  }

  async function toggleRule(id: string, active: boolean) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, active } : r)));
    await fetch("/api/admin/featured", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
  }

  async function deleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    await fetch("/api/admin/featured", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-medium text-gray-900">Featured Locations</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Pin a specific store to the top of results in a region
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            if (showForm) resetForm();
          }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showForm ? "Cancel" : "+ New"}
        </button>
      </div>

      {showForm && (
        <div className="border-b border-gray-100 bg-gray-50">
          {/* Step 1: provider + postcode */}
          <form onSubmit={handleLoadStores} className="px-5 py-5 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Step 1 — Find stores
            </p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className={labelCls}>Provider</label>
                <select
                  value={provider}
                  onChange={(e) => {
                    setProvider(e.target.value);
                    setStores(null);
                    setSelectedStore(null);
                  }}
                  className={inputCls}
                >
                  {providerOptions.map((p) => (
                    <option key={p} value={p}>
                      {p.replace(".mysight.uk", "")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className={labelCls}>Postcode</label>
                <input
                  type="text"
                  value={searchPostcode}
                  onChange={(e) => setSearchPostcode(e.target.value.toUpperCase())}
                  placeholder="e.g. LS1 1BA"
                  maxLength={8}
                  required
                  className={inputCls}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loadingStores || !searchPostcode.trim()}
              className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loadingStores ? "Loading…" : "Search stores"}
            </button>
            {storeError && (
              <p className="text-xs text-red-600 font-medium">{storeError}</p>
            )}
          </form>

          {/* Step 2: pick a store */}
          {stores !== null && (
            <div className="px-5 pb-5 space-y-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Step 2 — Select a location
              </p>
              {stores.length === 0 ? (
                <p className="text-sm text-gray-500">No stores found near that postcode.</p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {stores.map((store, i) => {
                    const isSelected = selectedStore?.storeName === store.storeName && selectedStore?.postcode === store.postcode;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedStore(store)}
                        className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 ring-1 ring-blue-400"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {store.storeName}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {[store.address, store.town, store.postcode].filter(Boolean).join(", ")}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 shrink-0">
                            {formatDistance(store.distanceM)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 3: configure rule */}
          {selectedStore && (
            <form onSubmit={handleSave} className="px-5 pb-5 space-y-4 border-t border-gray-200 pt-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Step 3 — Set region &amp; label
              </p>
              <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                <p className="text-sm font-semibold text-blue-900">{selectedStore.storeName}</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  {[selectedStore.address, selectedStore.town, selectedStore.postcode].filter(Boolean).join(", ")}
                </p>
              </div>
              <div>
                <label className={labelCls}>
                  Feature for users within —{" "}
                  <span className="font-bold text-gray-800">{radiusKm} km</span>{" "}
                  of store
                </label>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  className="w-full mt-1 accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>1 km</span>
                  <span>15 km (provider cap)</span>
                </div>
              </div>
              <div>
                <label className={labelCls}>Badge label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Recommended"
                  className={inputCls}
                />
              </div>
              {formError && (
                <p className="text-xs text-red-600 font-medium">{formError}</p>
              )}
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Saving…" : "Save rule"}
              </button>
            </form>
          )}
        </div>
      )}

      {rules.length === 0 ? (
        <p className="px-5 py-6 text-sm text-gray-400 text-center">No rules yet</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {rules.map((rule) => (
            <li key={rule.id} className="flex items-start justify-between px-5 py-4 gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {rule.store_name ?? rule.provider.replace(".mysight.uk", "")}
                  </span>
                  <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                    ★ {rule.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {rule.provider.replace(".mysight.uk", "")}
                  {rule.store_postcode && ` · ${rule.store_postcode}`}
                  {" · "}featured within {rule.radius_km} km
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Toggle enabled={rule.active} onChange={(v) => toggleRule(rule.id, v)} />
                <button
                  type="button"
                  onClick={() => deleteRule(rule.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function AdminDashboard() {
  const [config, setConfig] = useState<Config>({});
  const [mainProviders, setMainProviders] = useState<string[]>([]);
  const [mysightSites, setMysightSites] = useState<string[]>([]);
  const [toggling, setToggling] = useState<string | null>(null);
  const [showMysight, setShowMysight] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/providers");
    if (res.ok) {
      const data = await res.json();
      setConfig(data.config);
      setMainProviders(data.mainProviders);
      setMysightSites(data.mysightSites);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(provider: string, enabled: boolean) {
    setToggling(provider);
    setConfig((prev) => ({ ...prev, [provider]: enabled }));
    await fetch("/api/admin/providers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, enabled }),
    });
    setToggling(null);
  }

  const mysightEnabled = mysightSites.filter((s) => config[s]).length;
  const mysightTotal = mysightSites.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
            <p className="text-xs text-gray-500">Eye Test Finder</p>
          </div>
          <form>
            <button
              formAction={logout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-medium text-gray-900">Providers</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {mainProviders.map((provider) => (
              <li key={provider} className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-gray-800">{provider}</span>
                <Toggle
                  enabled={config[provider] ?? true}
                  onChange={(v) => toggle(provider, v)}
                  disabled={toggling === provider}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowMysight((v) => !v)}
            className="w-full px-5 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <h2 className="font-medium text-gray-900">MySight Opticians</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {mysightEnabled} of {mysightTotal} active
              </p>
            </div>
            <span className="text-gray-400 text-xs">{showMysight ? "▲" : "▼"}</span>
          </button>

          {showMysight && (
            <ul className="divide-y divide-gray-100 max-h-[32rem] overflow-y-auto">
              {mysightSites.map((site) => (
                <li key={site} className="flex items-center justify-between px-5 py-3">
                  <span className="text-sm text-gray-800 capitalize">
                    {MYSIGHT_LABEL(site)}
                  </span>
                  <Toggle
                    enabled={config[site] ?? true}
                    onChange={(v) => toggle(site, v)}
                    disabled={toggling === site}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <FeaturedSection mysightSites={mysightSites} />
      </main>
    </div>
  );
}
