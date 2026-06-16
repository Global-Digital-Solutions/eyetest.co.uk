export interface DailySlot {
  date: string; // YYYY-MM-DD
  count: number; // exact count, or -1 for "available but count unknown"
}

export interface StoreResult {
  provider: string;
  storeName: string;
  address: string;
  postcode: string;
  town: string;
  phone: string;
  distanceM: number;
  slotsAvailable: string | null;
  nextAvailable: string | null;
  bookingUrl: string;
  lat?: number;
  lng?: number;
  featured?: boolean;
  featuredLabel?: string;
  dailySlots?: DailySlot[];
}

export interface FeaturedProvider {
  id: string;
  provider: string;
  store_name: string | null;
  store_postcode: string | null;
  postcode: string;
  lat: number;
  lng: number;
  radius_km: number;
  label: string;
  active: boolean;
  created_at: string;
}

export interface SearchResponse {
  postcode: string;
  searchedAt: string;
  results: StoreResult[];
  errors: { provider: string; message: string }[];
}
