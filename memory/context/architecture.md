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
│       ├── providers/           # boots.ts, asda.ts, vision-express.ts, mysight.ts
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
2. Queries the external API (Ocuco for Boots/ASDA, GraphQL for Vision Express/MySight)
3. Returns an array of store results with availability data
4. Generates deep-link booking URLs

### Supabase Usage
Currently used for:
- Admin authentication (`src/lib/admin-auth.ts`)
- Featured optician management
- Future: subscription/billing data for optician portal

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

## Environment Variables (Expected)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox GL access token
- Future: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` for billing
