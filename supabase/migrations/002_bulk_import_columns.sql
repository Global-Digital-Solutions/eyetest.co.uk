-- Add columns for bulk import and demo mode
ALTER TABLE optician_listings ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE optician_listings ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'form';
ALTER TABLE optician_listings ADD COLUMN IF NOT EXISTS store_code TEXT;

-- Index for brand-level operations (bulk activate/deactivate)
CREATE INDEX IF NOT EXISTS idx_listings_brand ON optician_listings (brand);
CREATE INDEX IF NOT EXISTS idx_listings_source ON optician_listings (source);

-- Allow anon SELECT on active listings (needed for search API)
CREATE POLICY IF NOT EXISTS anon_select_active ON optician_listings
  FOR SELECT
  TO anon
  USING (active = true);
