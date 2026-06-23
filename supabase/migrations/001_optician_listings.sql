-- Optician listing applications and subscriptions
CREATE TABLE IF NOT EXISTS optician_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Practice details
  practice_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  booking_url TEXT,
  -- Location
  address TEXT,
  postcode TEXT NOT NULL,
  town TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  -- Services
  services TEXT[] DEFAULT '{}',
  nhs_tests BOOLEAN DEFAULT false,
  private_tests BOOLEAN DEFAULT false,
  -- Business info
  opening_hours JSONB,
  location_count TEXT DEFAULT '1',
  appointment_system TEXT,
  appointment_system_other TEXT,
  message TEXT,
  -- Listing config
  tier TEXT CHECK (tier IN ('gold', 'platinum')) DEFAULT 'gold',
  radius_km NUMERIC DEFAULT 8, -- 4-6 miles ≈ 6.4-9.6km, default ~5 miles
  badge_label TEXT DEFAULT 'Recommended',
  active BOOLEAN DEFAULT false,
  -- Audiology add-on
  audiology_addon BOOLEAN DEFAULT false,
  audiology_active BOOLEAN DEFAULT false,
  -- Stripe
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_status TEXT DEFAULT 'pending', -- pending, active, cancelled, past_due
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  activated_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- Index for search lookups
CREATE INDEX idx_listings_postcode ON optician_listings (postcode);
CREATE INDEX idx_listings_active ON optician_listings (active);
CREATE INDEX idx_listings_stripe_customer ON optician_listings (stripe_customer_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON optician_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS policies
ALTER TABLE optician_listings ENABLE ROW LEVEL SECURITY;

-- Admin can do everything (authenticated users)
CREATE POLICY admin_all ON optician_listings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anonymous can INSERT (form submissions)
CREATE POLICY anon_insert ON optician_listings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role for webhooks
CREATE POLICY service_all ON optician_listings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
