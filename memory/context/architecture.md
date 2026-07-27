# Architecture Reference

## Directory Structure
```
eyetest.co.uk/
├── CLAUDE.md                    # Working memory (hot cache)
├── AGENTS.md                    # Next.js 16 rules
├── memory/                      # Deep memory
│   ├── projects/eyetest.md      # Full project details
│   └── context/architecture.md  # This file
├── next.config.ts               # Redirects, Next.js config
├── package.json                 # Dependencies
├── public/
│   ├── robots.txt               # Crawl rules
│   ├── llms.txt                 # LLM-readable site summary
│   ├── sitemap.xml              # Empty (superseded by src/app/sitemap.ts)
│   └── images/                  # Static assets
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout (fonts, metadata, analytics)
│   │   ├── page.tsx             # Homepage
│   │   ├── sitemap.ts           # Dynamic sitemap generator
│   │   ├── api/search/route.ts  # NDJSON streaming search API
│   │   ├── api/get-listed/route.ts  # POST: optician signup form → email via Nodemailer
│   │   ├── api/at-home-enquiry/route.ts  # POST: at-home enquiry form → email via Nodemailer
│   │   ├── api/admin/           # Admin API routes
│   │   ├── admin/               # Admin dashboard
│   │   ├── search/page.tsx      # Search results page
│   │   ├── eye-tests/           # page.tsx (listing) + [slug]/page.tsx
│   │   ├── eye-health/          # page.tsx (hub) + conditions/ + guides/
│   │   ├── articles/            # page.tsx (listing) + [slug]/page.tsx
│   │   ├── opticians/           # page.tsx + [slug]/ + [brand]/[location]/
│   │   ├── locations/           # page.tsx + [city]/page.tsx
│   │   ├── find/                # page.tsx + [slug]/page.tsx
│   │   └── ... (about, privacy, terms, offers, etc.)
│   ├── components/              # Shared React components
│   ├── data/                    # Static data files (TS)
│   └── lib/                     # Utilities, providers, Supabase
│       ├── providers/           # boots.ts, asda.ts, vision-express.ts, mysight.ts, mands.ts, aceandtate.ts
│       ├── dates.ts             # Date helpers (getThreeDayDatesFrom, etc.)
│       ├── haversine.ts         # Distance calculation
│       ├── postcodes.ts         # postcodes.io integration
│       ├── types.ts             # Shared types (DailySlot, etc.)
│       └── supabase/            # client.ts, server.ts
└── tailwind.config.ts
```

## Key Architectural Decisions

### Search is Streaming
The search API (`/api/search/route.ts`) uses NDJSON streaming via ReadableStream. Each line is a JSON event:
- `{ type: "meta", postcode, lat, lng, district, activeProviders }` — initial metadata
- `{ type: "store", ...storeData }` — individual store results as they arrive
- `{ type: "done" }` — search complete

The frontend (`SearchResults.tsx`) reads this stream and progressively renders results.

### Static Data, Dynamic Search
Content pages (eye tests, conditions, articles, locations) use static data files in `src/data/`. These are pre-rendered at build time via `generateStaticParams()`.

Search results are the only truly dynamic page — they query live APIs on each request.

### Provider Pattern
Each provider in `src/lib/providers/` exports an async function that:
1. Takes lat/lng coordinates and date range
2. Queries the external API (Ocuco for Boots/ASDA, GraphQL for Vision Express/MySight) OR uses hardcoded stores with haversine filtering (M&S, Ace & Tate, Scrivens)
3. Returns an array of store results with availability data
4. Generates deep-link booking URLs

**Static providers** (M&S, Ace & Tate, Scrivens) set `slotsAvailable: null` and `dailySlots` with `count: -1` (available, count unknown). The `hasAvailability()` helper must check `dailySlots.some(s => s.count !== 0)` before falling back to `Boolean(slotsAvailable)`. This pattern is used in SearchResults.tsx bucketing, StoreCard rendering, and StoreMap.tsx pins/popups.

**Static providers use `getStaticThreeDayDates()`** instead of `getThreeDayDates()`. After 6 PM UK time, this shifts the 3-day window to start from tomorrow, preventing misleading "Available today" badges when stores are closed. Real-time providers (Boots, ASDA, Vision Express, MySight) use `getThreeDayDates()` since their APIs return actual slot data.

### Featured Listings (Search API)
The search API loads `featured_providers` rules from Supabase and matches them to provider results by postcode (primary) or store name (fallback). Matched results get `featured: true`, `featuredLabel`, and `tier` properties. Client-side, `SearchResults.tsx` populates `logoUrl` and `services` from `BRAND_LOGOS` and `BRAND_SERVICES` maps.

**Density cap:** City zones cap organic listing radius (London=1mi, Tier 2=3mi, default=5mi). Featured provider rules are EXEMPT — admin-configured radii are respected as-is. Only `optician_listings` (self-service portal) respect the cap.

### Booking Handoff (DepartureOverlay)
Click "Book Now" → `e.preventDefault()` stops the `<a>` tag → branded interstitial overlay appears with 2.5s progress bar countdown → after countdown, `window.open(url, "_blank")` opens booking page in a new tab → overlay closes → user stays on eyetest.co.uk. If pop-up blocked, falls back to `window.location.href` (same-tab navigation). "Go now →" link lets user skip the countdown.

**Critical: do NOT pass `"noopener,noreferrer"` as the third arg to `window.open()`** — per spec, `noopener` forces a `null` return value even when the tab opens successfully. This breaks the pop-up-blocked detection (`if (newTab)`), causing a double navigation (new tab AND current tab both navigate to the booking URL). Instead, open without features and set `newTab.opener = null` manually for security.

**Critical: do NOT call `window.open()` synchronously in the click handler** — the browser immediately switches focus to the new tab and the user never sees the interstitial. The 2.5s `setTimeout` delay works because Chrome's user activation window lasts ~5 seconds after a click, so `window.open()` at 2.5s is still within the allowed gesture window.

### iOS Mobile Fixes
- **Viewport zoom:** `font-size: 16px !important` on all inputs at `max-width: 767px` prevents iOS auto-zoom
- **Keyboard dismissal:** `SearchForm.tsx` client component prevents default form submit, blurs input, then navigates via `router.push()` after 50ms delay
- **Horizontal overflow:** `overflow-x: clip` on html/body (NOT `hidden`, which breaks position:sticky)

### Map (StoreMap.tsx)
Mapbox GL with teardrop SVG pin markers. Pins are coloured: teal (available), gray (unavailable), amber (featured). Store name appears on hover via CSS `group-hover`. Click opens a popup with store details, availability badge, and Book Now CTA. Desktop layout is 5/7 split (results/map).

### Trust Banner
After search completes, shows: local optician count, time saved (distinct brands × 5 min), provider pills, and a value message about independent opticians. Time saving counts unique provider brands, not total stores (searching Boots once covers all their stores).

### SEO Fixes (June 18 SE Ranking Audit)
- Footer links updated: `/blog` → `/articles`, `/contact` → `/about` (was causing 1,247 redirect chain warnings)
- `home-visit-eye-test` excluded from `sitemap.ts` (redirects to `/at-home-eye-tests`)
- Article title differentiated from guide: added "— Age-by-Age Advice" suffix to avoid duplicate `<title>` tags
- Visually-hidden `<h1>` added to `/search` page
- Alt text added to CTABanner background image on homepage
- Brand/location page link updated: `/eye-tests/home-visit-eye-test` → `/at-home-eye-tests`
- `llms.txt` link updated for home-visit-eye-test

### Supabase Usage
Tables (all have RLS enabled):
- `optician_listings` — paid subscription listings (Gold/Platinum)
- `featured_providers` — admin-configured featured badges on provider results
- `providers` — provider enable/disable toggle
- `audiologist_listings` — cross-listed hearing test entries (from audiology add-on)

RLS policies: "Admin full access" (authenticated) on all 4 tables + "Public can submit listings" (INSERT) on optician_listings. All public reads go through server-side API routes using SUPABASE_SERVICE_ROLE_KEY.

### Listing Subscription System
- Registration: `/get-listed` form → `/api/get-listed` (INSERT) → `/get-listed/thank-you` (tier selection)
- Tier exclusivity: `/api/tier-availability` checks gold/platinum availability per postcode area (haversine overlap). One gold + one platinum per coverage area.
- Payment: `/api/stripe/checkout` (creates Stripe session, validates tier availability server-side)
- Activation: `/api/stripe/webhook` handles `checkout.session.completed` → sets `active: true`, badge_label, expiry
- Cancellation: webhook handles `customer.subscription.deleted` → sets `active: false`
- Success page: `/get-listed/success` fetches listing from Stripe session, shows Mapbox map preview
- Pricing: Gold £149/yr, Platinum £199/yr, Audiology add-on £69/yr
- Badge defaults: Platinum → "Top Rated", Gold → "Recommended" (editable in admin Listings tab)
- Cross-listing: audiology add-on auto-creates entry in `audiologist_listings` for hearingtest.co.uk

### Email Submission (Nodemailer)
Form submissions (Get-Listed, At-Home Enquiry) use Nodemailer with Gmail SMTP (`smtp.gmail.com:465`). Both API routes follow the same pattern:
1. Validate required fields from POST body
2. Create transporter with `GMAIL_USER` / `GMAIL_APP_PASSWORD` env vars
3. Send formatted HTML email to hello@eyetest.co.uk
4. Return JSON success/error response

### MapBox
Used in `StoreMap.tsx` and `ResultsMap.tsx` for displaying optician locations on maps.

## Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.9 | Framework |
| react | 19.2.4 | UI library |
| @supabase/supabase-js | ^2.108 | Database |
| @supabase/ssr | ^0.12 | Supabase SSR helpers |
| mapbox-gl | ^3.9 | Maps |
| react-map-gl | ^8.1 | React Mapbox wrapper |
| tailwindcss | ^4 | Styling |
| typescript | ^5 | Type safety |
| nodemailer | ^9.0.1 | Email sending (Gmail SMTP) |
| @types/nodemailer | ^6 | Nodemailer type definitions |

## Environment Variables (Expected)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox GL access token
- `GMAIL_USER` — Gmail address for SMTP sending (e.g. hello@eyetest.co.uk)
- `GMAIL_APP_PASSWORD` — Google App Password for SMTP auth (NOT the Gmail login password; user must generate via Google Account → Security → App Passwords)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role (server-side only, bypasses RLS)
- `STRIPE_SECRET_KEY` — Stripe API key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
- `STRIPE_PRICE_GOLD` — Stripe price ID for Gold tier
- `STRIPE_PRICE_PLATINUM` — Stripe price ID for Platinum tier
- `STRIPE_PRICE_AUDIOLOGY` — Stripe price ID for audiology add-on
