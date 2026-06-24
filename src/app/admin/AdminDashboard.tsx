"use client";

import { useState, useEffect, useCallback } from "react";
import { logout } from "./login/actions";
import type { FeaturedProvider, StoreResult, OpticianListing } from "@/lib/types";

type Config = Record<string, boolean>;

const MYSIGHT_LABEL = (site: string) =>
  site.replace(".mysight.uk", "").replace(/-/g, " ");

const MAIN_PROVIDERS = ["Boots Opticians", "ASDA Opticians", "Vision Express", "M&S Opticians", "Ace & Tate", "scrivens", "Jimmy Fairly"];

const PROVIDER_DISPLAY: Record<string, string> = {
  scrivens: "Scrivens",
  "Jimmy Fairly": "Jimmy Fairly",
};

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

/* ------------------------------------------------------------------ */
/*  Listings Section                                                   */
/* ------------------------------------------------------------------ */

type ListingFormData = {
  practice_name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  town: string;
  website: string;
  booking_url: string;
  tier: "gold" | "platinum";
  active: boolean;
  audiology_addon: boolean;
  badge_label: string;
  radius_km: number;
};

const emptyForm: ListingFormData = {
  practice_name: "",
  contact_name: "",
  email: "",
  phone: "",
  address: "",
  postcode: "",
  town: "",
  website: "",
  booking_url: "",
  tier: "gold",
  active: false,
  audiology_addon: false,
  badge_label: "Recommended",
  radius_km: 8,
};

function ListingForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: ListingFormData;
  onSave: (data: ListingFormData) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<ListingFormData>(initial);

  function set<K extends keyof ListingFormData>(key: K, val: ListingFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: val };
      // Auto-update badge label when tier changes
      if (key === "tier") {
        if (val === "platinum" && prev.badge_label === "Recommended") {
          next.badge_label = "Top Rated";
        } else if (val === "gold" && prev.badge_label === "Top Rated") {
          next.badge_label = "Recommended";
        }
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4 bg-gray-50 border-b border-gray-100">
      {/* Row 1: Practice name + contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Practice name *</label>
          <input
            type="text"
            value={form.practice_name}
            onChange={(e) => set("practice_name", e.target.value)}
            required
            placeholder="e.g. Smith & Jones Opticians"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Contact name</label>
          <input
            type="text"
            value={form.contact_name}
            onChange={(e) => set("contact_name", e.target.value)}
            placeholder="e.g. John Smith"
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 2: Email + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="info@example.com"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="020 1234 5678"
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 3: Address */}
      <div>
        <label className={labelCls}>Address</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
          placeholder="123 High Street"
          className={inputCls}
        />
      </div>

      {/* Row 4: Postcode + town */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Postcode *</label>
          <input
            type="text"
            value={form.postcode}
            onChange={(e) => set("postcode", e.target.value.toUpperCase())}
            required
            maxLength={8}
            placeholder="SW1A 1AA"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Town</label>
          <input
            type="text"
            value={form.town}
            onChange={(e) => set("town", e.target.value)}
            placeholder="e.g. Manchester"
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 5: Website + booking URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Website</label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="https://example.com"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Booking URL</label>
          <input
            type="url"
            value={form.booking_url}
            onChange={(e) => set("booking_url", e.target.value)}
            placeholder="https://example.com/book"
            className={inputCls}
          />
        </div>
      </div>

      {/* Row 6: Tier selector */}
      <div>
        <label className={labelCls}>Tier</label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="gold"
              checked={form.tier === "gold"}
              onChange={() => set("tier", "gold")}
              className="accent-amber-500"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              Gold
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="platinum"
              checked={form.tier === "platinum"}
              onChange={() => set("tier", "platinum")}
              className="accent-teal-500"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
              Platinum
            </span>
          </label>
        </div>
      </div>

      {/* Row 7: Badge label */}
      <div>
        <label className={labelCls}>Badge label</label>
        <input
          type="text"
          value={form.badge_label}
          onChange={(e) => set("badge_label", e.target.value)}
          placeholder="Recommended"
          className={inputCls}
        />
      </div>

      {/* Row 8: Radius slider */}
      <div>
        <label className={labelCls}>
          Radius — <span className="font-bold text-gray-800">{form.radius_km} km</span>
        </label>
        <input
          type="range"
          min={1}
          max={15}
          step={1}
          value={form.radius_km}
          onChange={(e) => set("radius_km", Number(e.target.value))}
          className="w-full mt-1 accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
          <span>1 km</span>
          <span>15 km</span>
        </div>
      </div>

      {/* Row 9: Toggles */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => set("active", e.target.checked)}
            className="accent-blue-600 h-4 w-4"
          />
          <span className="text-sm text-gray-700">Active</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.audiology_addon}
            onChange={(e) => set("audiology_addon", e.target.checked)}
            className="accent-blue-600 h-4 w-4"
          />
          <span className="text-sm text-gray-700">Audiology addon</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || !form.practice_name.trim() || !form.postcode.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving…" : "Save listing"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function StatusDot({ listing }: { listing: OpticianListing }) {
  if (listing.stripe_status === "pending" && !listing.active) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="text-xs text-yellow-700">Pending</span>
      </span>
    );
  }
  if (listing.active) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-xs text-green-700">Active</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-gray-400" />
      <span className="text-xs text-gray-500">Inactive</span>
    </span>
  );
}

function TierBadge({ tier }: { tier: "gold" | "platinum" }) {
  if (tier === "platinum") {
    return (
      <span className="inline-block rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-800">
        Platinum
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
      Gold
    </span>
  );
}

function ListingsSection() {
  const [listings, setListings] = useState<OpticianListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/listings");
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(form: ListingFormData) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to create listing");
        return;
      }
      setListings((prev) => [data, ...prev]);
      setShowAddForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit(form: ListingFormData) {
    if (!editingId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to update listing");
        return;
      }
      setListings((prev) => prev.map((l) => (l.id === editingId ? data : l)));
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(listing: OpticianListing) {
    const newActive = !listing.active;
    setListings((prev) =>
      prev.map((l) => (l.id === listing.id ? { ...l, active: newActive } : l))
    );
    try {
      await fetch("/api/admin/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: listing.id, active: newActive }),
      });
    } catch {
      // revert on error
      setListings((prev) =>
        prev.map((l) => (l.id === listing.id ? { ...l, active: listing.active } : l))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setListings((prev) => prev.filter((l) => l.id !== id));
    try {
      await fetch("/api/admin/listings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // reload on error
      load();
    }
  }

  function formDataFromListing(l: OpticianListing): ListingFormData {
    return {
      practice_name: l.practice_name,
      contact_name: l.contact_name,
      email: l.email,
      phone: l.phone,
      address: l.address || "",
      postcode: l.postcode,
      town: l.town || "",
      website: l.website || "",
      booking_url: l.booking_url || "",
      tier: l.tier,
      active: l.active,
      audiology_addon: l.audiology_addon,
      badge_label: l.badge_label,
      radius_km: l.radius_km,
    };
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-medium text-gray-900">Optician Listings</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {listings.length} listing{listings.length !== 1 ? "s" : ""}{" "}
            ({listings.filter((l) => l.active).length} active)
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowAddForm((v) => !v);
            setEditingId(null);
            setError(null);
          }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAddForm ? "Cancel" : "+ Add Listing"}
        </button>
      </div>

      {error && (
        <div className="px-5 py-3 bg-red-50 border-b border-red-100">
          <p className="text-xs text-red-600 font-medium">{error}</p>
        </div>
      )}

      {showAddForm && (
        <ListingForm
          initial={emptyForm}
          onSave={handleAdd}
          onCancel={() => {
            setShowAddForm(false);
            setError(null);
          }}
          saving={saving}
        />
      )}

      {loading ? (
        <p className="px-5 py-6 text-sm text-gray-400 text-center">Loading listings…</p>
      ) : listings.length === 0 ? (
        <p className="px-5 py-6 text-sm text-gray-400 text-center">No listings yet</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {listings.map((listing) => (
            <div key={listing.id}>
              {editingId === listing.id ? (
                <ListingForm
                  initial={formDataFromListing(listing)}
                  onSave={handleEdit}
                  onCancel={() => {
                    setEditingId(null);
                    setError(null);
                  }}
                  saving={saving}
                />
              ) : (
                <div className="px-5 py-4">
                  {/* Main row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {listing.practice_name}
                        </span>
                        <TierBadge tier={listing.tier} />
                        {listing.audiology_addon && (
                          <span className="inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                            Audiology
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {listing.postcode}
                        {listing.town && ` · ${listing.town}`}
                        {" · "}
                        {listing.radius_km} km radius
                        {listing.stripe_status && listing.stripe_status !== "pending" && (
                          <> &middot; Stripe: {listing.stripe_status}</>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Created {new Date(listing.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleActive(listing)}
                        className="cursor-pointer"
                        title={listing.active ? "Click to deactivate" : "Click to activate"}
                      >
                        <StatusDot listing={listing} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(listing.id);
                          setShowAddForm(false);
                          setError(null);
                        }}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(listing.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Section (unchanged)                                       */
/* ------------------------------------------------------------------ */

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
  const [tier, setTier] = useState<"gold" | "platinum">("platinum");

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
    setTier("platinum");
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
        tier,
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
                      {PROVIDER_DISPLAY[p] ?? p.replace(".mysight.uk", "")}
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
                <label className={labelCls}>Listing tier</label>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setTier("platinum")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      tier === "platinum"
                        ? "border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-400"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    ★ Platinum
                  </button>
                  <button
                    type="button"
                    onClick={() => setTier("gold")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      tier === "gold"
                        ? "border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-400"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    ★ Gold
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Platinum = premium card with logo &amp; services · Gold = highlighted in results
                </p>
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
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    rule.tier === "platinum"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    ★ {rule.tier === "platinum" ? "Platinum" : "Gold"} · {rule.label}
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

/* ------------------------------------------------------------------ */
/*  Bulk Import Section                                                */
/* ------------------------------------------------------------------ */

const IMPORT_PROVIDERS = [
  { key: "mands", label: "M&S Opticians", stores: 37, static: true },
  { key: "aceandtate", label: "Ace & Tate", stores: 17, static: true },
  { key: "scrivens", label: "Scrivens", stores: 164, static: true },
  { key: "jimmyfairly", label: "Jimmy Fairly", stores: 17, static: true },
  { key: "mysight", label: "MySight Independents", stores: 34, static: false, note: "34 brands — fetches branches from API" },
];

function BulkImportSection() {
  const [importing, setImporting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, { message: string; inserted: number; skipped: number; errors: string[] }>>({});
  const [brands, setBrands] = useState<Record<string, { total: number; active: number; source: string }>>({});
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState<string | null>(null);

  const loadBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bulk-import");
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands || {});
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadBrands(); }, [loadBrands]);

  async function runImport(provider: string) {
    setImporting(provider);
    try {
      const res = await fetch(`/api/admin/bulk-import?provider=${provider}`, { method: "POST" });
      const data = await res.json();
      setResults((prev) => ({ ...prev, [provider]: data }));
      loadBrands();
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [provider]: { message: `Error: ${err}`, inserted: 0, skipped: 0, errors: [] },
      }));
    } finally {
      setImporting(null);
    }
  }

  async function toggleBrand(brand: string, active: boolean, tier?: "gold" | "platinum") {
    setActivating(brand);
    try {
      await fetch("/api/admin/bulk-import", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, active, tier: tier || "gold" }),
      });
      loadBrands();
    } finally {
      setActivating(null);
    }
  }

  const brandList = Object.entries(brands).sort((a, b) => b[1].total - a[1].total);

  return (
    <>
      {/* Import buttons */}
      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-medium text-gray-900">Import Providers</h2>
          <p className="text-xs text-gray-500 mt-0.5">Pull existing optician stores into the listings system</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {IMPORT_PROVIDERS.map((p) => (
            <li key={p.key} className="px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-800">{p.label}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {p.static ? `${p.stores} stores (static)` : p.note}
                  </span>
                </div>
                <button
                  onClick={() => runImport(p.key)}
                  disabled={importing !== null}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {importing === p.key ? "Importing…" : "Import"}
                </button>
              </div>
              {results[p.key] && (
                <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
                  <p>{results[p.key].message}</p>
                  {results[p.key].inserted > 0 && (
                    <p className="text-green-700 font-medium">✓ {results[p.key].inserted} new stores imported</p>
                  )}
                  {results[p.key].skipped > 0 && (
                    <p className="text-yellow-700">↳ {results[p.key].skipped} already existed (skipped)</p>
                  )}
                  {results[p.key].errors.length > 0 && (
                    <details className="mt-1">
                      <summary className="text-red-600 cursor-pointer">{results[p.key].errors.length} errors</summary>
                      <ul className="mt-1 space-y-0.5 text-red-500">
                        {results[p.key].errors.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Imported brands */}
      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-medium text-gray-900">Imported Brands</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {brandList.length} brands — {brandList.reduce((s, [, v]) => s + v.total, 0)} total stores
          </p>
        </div>
        {loading ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">Loading…</div>
        ) : brandList.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">No imports yet. Use the buttons above to import providers.</div>
        ) : (
          <ul className="divide-y divide-gray-100 max-h-[32rem] overflow-y-auto">
            {brandList.map(([brand, info]) => (
              <li key={brand} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 truncate">{brand}</span>
                    <span className="text-[10px] text-gray-400">{info.total} stores</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${info.active > 0 ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className="text-[10px] text-gray-500">
                      {info.active > 0 ? `${info.active} active` : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {info.active > 0 ? (
                    <button
                      onClick={() => toggleBrand(brand, false)}
                      disabled={activating === brand}
                      className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 transition-colors"
                    >
                      {activating === brand ? "…" : "Deactivate"}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleBrand(brand, true, "gold")}
                        disabled={activating === brand}
                        className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-200 disabled:opacity-50 transition-colors"
                      >
                        {activating === brand ? "…" : "Gold"}
                      </button>
                      <button
                        onClick={() => toggleBrand(brand, true, "platinum")}
                        disabled={activating === brand}
                        className="rounded-lg bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-800 hover:bg-teal-200 disabled:opacity-50 transition-colors"
                      >
                        {activating === brand ? "…" : "Platinum"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard                                                     */
/* ------------------------------------------------------------------ */

type Tab = "listings" | "providers" | "featured" | "bulk-import";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("listings");
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

  const tabs: { key: Tab; label: string }[] = [
    { key: "listings", label: "Listings" },
    { key: "bulk-import", label: "Bulk Import" },
    { key: "providers", label: "Providers" },
    { key: "featured", label: "Featured" },
  ];

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
        {/* Tab bar */}
        <div className="max-w-2xl mx-auto px-4">
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {activeTab === "listings" && <ListingsSection />}

        {activeTab === "bulk-import" && <BulkImportSection />}

        {activeTab === "providers" && (
          <>
            <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-medium text-gray-900">Providers</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {mainProviders.map((provider) => (
                  <li key={provider} className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm text-gray-800">{PROVIDER_DISPLAY[provider] ?? provider}</span>
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
          </>
        )}

        {activeTab === "featured" && <FeaturedSection mysightSites={mysightSites} />}
      </main>
    </div>
  );
}
