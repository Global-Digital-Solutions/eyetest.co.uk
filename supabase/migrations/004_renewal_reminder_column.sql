-- Track when the last renewal reminder email was sent (prevents duplicates)
ALTER TABLE optician_listings ADD COLUMN IF NOT EXISTS last_renewal_reminder_at TIMESTAMPTZ;
