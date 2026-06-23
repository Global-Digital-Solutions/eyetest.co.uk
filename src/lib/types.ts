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
  tier?: "gold" | "platinum"; // subscription tier (undefined = free)
  logoUrl?: string; // brand logo image URL
  services?: string; // short USP tagline for platinum cards
  dailySlots?: DailySlot[];
  googleRating?: number; // 1.0–5.0
  googleReviewCount?: number;
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

export interface OpticianListing {
  id: string;
  practice_name: string;
  contact_name: string;
  email: string;
  phone: string;
  website: string | null;
  booking_url: string | null;
  address: string | null;
  postcode: string;
  town: string | null;
  lat: number | null;
  lng: number | null;
  services: string[];
  nhs_tests: boolean;
  private_tests: boolean;
  opening_hours: Record<string, string> | null;
  location_count: string;
  appointment_system: string | null;
  appointment_system_other: string | null;
  message: string | null;
  tier: 'gold' | 'platinum';
  radius_km: number;
  badge_label: string;
  active: boolean;
  logo_url: string | null;
  services_tagline: string | null;
  audiology_addon: boolean;
  audiology_active: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_status: string;
  created_at: string;
  updated_at: string;
  activated_at: string | null;
  expires_at: string | null;
}
