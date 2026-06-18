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
2. Queries the external API (Ocuco for Boots/ASDA, GraphQL for Vision Express/MySight) OR uses hardcoded stores with haversine filtering (M&S, Ace & Tate)
3. Returns an array of store results with availability data
4. Generates deep-link booking URLs

**Static providers** (M&S, Ace & Tate) set `slotsAvailable: null` and `dailySlots` with `count: -1` (available, count unknown). The `hasAvailability()` helper must check `dailySlots.some(s => s.count !== 0)` before falling back to `Boolean(slotsAvailable)`. This pattern is used in SearchResults.tsx bucketing, StoreCard rendering, and StoreMap.tsx pins/popups.

### Map (StoreMap.tsx)
Mapbox GL with teardrop SVG pin markers. Pins are coloured: teal (available), gray (unavailable), amber (featured). Store name appears on hover via CSS `group-hover`. Click opens a popup with store details, availability badge, and Book Now CTA. Desktop layout is 5/7 split (results/map).

### Trust Banner
After search completes, shows: local optician count, time saved (distinct brands × 5 min), provider pills, and a value message about independent opticians. Time saving counts unique provider brands, not total stores (searching Boots once covers all their stores).

### Supabase Usage
Currently used for:
- Admin authentication (`src/lib/admin-auth.ts`)
- Featured optician management
- Future: subscription/billing data for optician portal

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
- Future: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` for billing
