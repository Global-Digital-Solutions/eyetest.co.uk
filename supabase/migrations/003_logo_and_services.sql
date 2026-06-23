-- Add logo and services tagline columns for tiered listing display
ALTER TABLE optician_listings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE optician_listings ADD COLUMN IF NOT EXISTS services_tagline TEXT;
