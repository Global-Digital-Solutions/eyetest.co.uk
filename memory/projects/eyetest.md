# eyetest.co.uk

**Owner:** Darin Butler (butlerdarin@gmail.com)
**Status:** Live, pre-search-engine-submission
**Domain:** www.eyetest.co.uk (primary), eyetest-co-uk.vercel.app (Vercel preview)
**Repo:** github.com/Global-Digital-Solutions/eyetest.co.uk.git

## What It Is

The UK's authority on booking eye tests. Users enter a postcode, the site queries multiple optician APIs in real-time (streaming NDJSON), and shows available appointment slots from Boots, ASDA, Vision Express, and 35+ independent opticians via MySight. Users can compare prices and availability, then book directly on the optician's site via deep links.

## Business Model (Current)

Free for users. Revenue model TBD — next phase is optician subscription with Stripe billing for featured placement in search results.

## Next Phase: Optician Subscription Model

Planned features (discussed with Darin):
- **Value prop:** Featured placement in search results
- **Pricing:** Flat monthly fee OR annual fee at discounted rate
- **Target:** Any optician, including new ones not yet on the platform
- **Approach:** Full self-service portal (signup, billing, manage listing)
- **Payment:** Stripe integration
- **Scope:** Optician can sign up, enter details, choose plan, pay, get featured

## Technical Architecture

### Framework
- Next.js 16.2.9 with App Router (NOT Pages Router)
- TypeScript throughout
- Tailwind CSS v4 for styling
- Turbopack for dev server

### CRITICAL: Next.js 16 Breaking Changes
- `params` and `searchParams` are Promises — MUST use `await params`
- Always read `node_modules/next/dist/docs/` before writing new code patterns
- AGENTS.md enforces this rule

### Search Flow
1. User enters postcode on homepage (`src/components/Hero.tsx`)
2. Redirects to `/search?postcode=XX`
3. `SearchResults.tsx` component streams from `/api/search` route
4. API route (`src/app/api/search/route.ts`):
   - Geocodes postcode via postcodes.io
   - Queries all providers in parallel (Boots, ASDA, Vision Express, MySight)
   - Streams NDJSON results back: meta event → store events → done event
5. Frontend deduplicates, sorts, and displays results with StoreCards
6. Deep links take users directly to optician booking pages

### Providers
| Provider | File | API Type | Deep Link |
|----------|------|----------|-----------|
| Boots | `src/lib/providers/boots.ts` | Ocuco REST | siteId-based URL |
| ASDA | `src/lib/providers/asda.ts` | Ocuco REST | siteId-based URL |
| Vision Express | `src/lib/providers/vision-express.ts` | GraphQL | storeCode-based URL |
| MySight | `src/lib/providers/mysight.ts` | GraphQL | 35 independent optician brands |
| M&S Opticians | `src/lib/providers/mands.ts` | Static (37 stores) | Magento booking link |
| Ace & Tate | `src/lib/providers/aceandtate.ts` | Static (17 stores) | Acuity Scheduling link |

### Data Files
| File | Contains |
|------|----------|
| `src/data/eye-tests.ts` | 18 eye test types with full clinical content |
| `src/data/eye-health.ts` | 15 conditions + 10 guides, relatedTests per condition |
| `src/data/articles.ts` | 6 editorial articles |
| `src/data/locations.ts` | 97 UK cities with lat/lng, postcodes, nearbyAreas |
| `src/data/opticians.ts` | 12 optician brands with store counts, descriptions |
| `src/data/search-queries.ts` | 43 SEO search query pages |
| `src/data/offers.ts` | Current optician offers/deals |

### Key Components
| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Main nav with mega menus |
| `Footer.tsx` | SEO footer with all links |
| `Hero.tsx` | Homepage hero with postcode search |
| `SearchResults.tsx` | Main search results with streaming, progress panel, store cards |
| `PageHero.tsx` | Reusable hero for content pages with breadcrumbs |
| `ResultCard.tsx` / `StoreCard` | Individual optician result cards |
| `GetListedForm.tsx` | Optician signup form — appointment system dropdown (Ocuco, MySight, Optix, VisionPlus, Optinet, Raven, Glasson, Other), location count ranges, API submission to `/api/get-listed` |
| `AtHomeBookingForm.tsx` | At-home eye test enquiry form — submits to `/api/at-home-enquiry` |

### Pages Structure
```
/ — Homepage (Hero + search + articles + CTA)
/search — Search results (dynamic, streams from API)
/eye-tests — Listing + /eye-tests/[slug] (18 types)
/eye-health — Hub + /conditions/[slug] (15) + /guides/[slug] (10)
/articles — Listing + /articles/[slug] (6)
/opticians — Listing + /opticians/[slug] (10 brands)
/opticians/[brand]/[location] — Brand × city combos (~970)
/locations — Listing + /locations/[city] (97)
/find — Listing + /find/[slug] (43 SEO queries)
/offers — Current deals
/at-home-eye-tests — Home visit info
/about, /privacy, /terms, /disclaimer — Legal/info
/get-listed — Optician signup CTA
/admin — Admin dashboard (protected)
```

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/search` | Main search — streams NDJSON results from all providers |
| `/api/get-listed` | POST: Get-Listed form submissions via Nodemailer + Gmail SMTP → hello@eyetest.co.uk |
| `/api/at-home-enquiry` | POST: At-home eye test enquiry form via Nodemailer + Gmail SMTP → hello@eyetest.co.uk |
| `/api/admin/featured` | Admin: manage featured opticians |
| `/api/admin/providers` | Admin: provider status |
| `/api/admin/stores` | Admin: store management |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Vercel | Hosting, auto-deploy from GitHub main branch |
| Supabase | Database (admin features, future subscriptions) |
| Mapbox | Store location maps |
| postcodes.io | UK postcode geocoding |

### Redirects (next.config.ts)
- `/blog` → `/articles` (301)
- `/blog/:slug` → `/articles/:slug` (301)
- `/contact` → `/about` (301)
- `/eye-tests/home-visit-eye-test` → `/at-home-eye-tests` (301)

## Design System

### Colors
- Primary teal: `#0ea5a0` (`--color-primary`)
- Primary dark: darker teal (`--color-primary-dark`)
- Primary light: lighter teal (`--color-primary-light`)
- Navy: `#0d1b3e` (`--color-navy`)
- Navy light: `--color-navy-light`
- Success green: `#22c55e` (`--color-success`)
- NHS blue: `#005eb8` (`--color-nhs-blue`)

### Typography
- Body: Inter font
- Display/headings: Outfit font (`--font-display`)
- Use `style={{ fontFamily: "var(--font-display)" }}` on headings

### UI Patterns
- Rounded corners: `rounded-2xl` on cards
- Shadows: `shadow-sm` default, `hover:shadow-md` on hover
- Cards: white bg, `border border-gray-100`, hover border teal
- CTAs: teal bg, white text, rounded-full, hover shadow
- PageHero: navy gradient bg, white text, breadcrumbs
- Mobile-first responsive design throughout

## SEO Implementation

### Schema Types Used
WebSite, Organization, AboutPage, WebPage, CollectionPage, FAQPage, MedicalWebPage, MedicalCondition, Article, LocalBusiness, MedicalBusiness, BreadcrumbList

### Author Attribution
All content pages have:
```typescript
author: {
  "@type": "Organization",
  name: "eyetest.co.uk",
  url: "https://www.eyetest.co.uk",
}
```

### Sitemap
Dynamic via `src/app/sitemap.ts` — auto-generates from all data files (~1,200 URLs)

### Domain
Primary: `www.eyetest.co.uk` (non-www redirects via Vercel)
All canonical URLs, OG URLs, and schema URLs use `www.eyetest.co.uk`

## Build History

| Date | Milestone |
|------|-----------|
| 2026-06 | Initial site build: homepage, search, all content pages |
| 2026-06 | Search integration: Boots, ASDA, Vision Express, MySight APIs |
| 2026-06 | Mobile UX redesign: compact StoreCards, responsive progress panel |
| 2026-06 | SEO audit: author schema, dynamic sitemap, internal linking |
| 2026-06-17 | Indexability fix: www domain refs, 404 fixes, 6 new locations |
| 2026-06-17 | Get-Listed form rewrite: appointment system dropdown, API submission via Nodemailer |
| 2026-06-17 | At-home eye tests page redesign: comparison table, OutsideClinic as recommended provider |
| 2026-06-17 | Email API routes: `/api/get-listed` and `/api/at-home-enquiry` (Nodemailer + Gmail SMTP) |
| 2026-06-17 | Terminated postcodes fix in `src/lib/postcodes.ts`; Watford postcode updated (WD17 2BH → WD17 2NW) |
| 2026-06-17 | Redirect: `/eye-tests/home-visit-eye-test` → `/at-home-eye-tests` (301) |
| 2026-06-18 | M&S Opticians provider (37 stores, static, Magento booking links) |
| 2026-06-18 | Ace & Tate provider (17 stores, static, Acuity Scheduling links) |
| 2026-06-18 | Both brands added to opticians.ts, Header, Footer, admin panel, llms.txt |
| 2026-06-18 | Fixed static provider bucketing — `hasAvailability()` checks dailySlots before slotsAvailable |
| 2026-06-18 | Map redesign — teardrop SVG pins, hover labels, rich popups with Book Now CTA |
| 2026-06-18 | Desktop layout flipped to 5/7 (results/map) for wider map |
| 2026-06-18 | Distance display changed from km to miles (UK audience) |
| 2026-06-18 | Trust banner — shows local optician count, time saved (distinct brands × 5 min), independents value message |
| 2026-06-18 | SE Ranking audit fixes — duplicate titles, 1,247 redirect links, sitemap cleanup, H1/alt text |
| 2026-06-18 | Scrivens provider (164 stores, static, branchId booking links) |
| 2026-06-23 | Mobile UX: iOS viewport zoom fix (16px min font), keyboard dismissal (SearchForm client component with blur+router.push), logo text on mobile header |
| 2026-06-23 | Desktop booking handoff: new tab via window.open + interstitial overlay; mobile keeps same-tab navigation |
| 2026-06-23 | Static provider after-hours fix: `getStaticThreeDayDates()` skips "today" after 6 PM UK time (M&S, Scrivens, Ace & Tate) |
| 2026-06-23 | Featured/Platinum listings: density cap exemption for admin-configured featured rules; brand logos + services populated from BRAND_LOGOS mapping |
| 2026-06-23 | Sticky desktop map: `overflow-x: clip` replaces `overflow-x: hidden` to avoid breaking position:sticky |
| Next | Outbound provider communication + Stripe billing |

## Featured Listings System

### Tiers
- **Platinum** — Full-width card at top of results with brand logo, "Recommended" + "Verified" badges, dark navy accent border, services tagline
- **Gold** — Enhanced standard card with small logo, badge, priority sort above organic results

### Admin Panel
- `/admin` → Featured tab → manage featured_providers rules
- Each rule: provider name, store name/postcode, lat/lng, radius_km, label, tier, active toggle

### Density Cap (Search API)
- City zones cap organic listing radius to prevent overlap (London = 1 mi, Tier 2 cities = 3 mi, rural = 5 mi)
- **Featured provider rules are exempt** from the density cap — admin sets the radius intentionally for paid placements
- Organic optician_listings still respect the density cap

### Brand Assets
Logos stored in `/public/logos/` — `boots-opticians.jpg`, `asda-opticians.svg`, `vision-express.svg`, `mands-opticians.webp`, `ace-and-tate.png`, `leightons.png`, `rawlings.svg`, `duncan-and-todd.svg`
`BRAND_LOGOS` mapping in SearchResults.tsx auto-populates `logoUrl` for featured results

## Pending Work
1. **Outbound provider communication** — Draft outreach to optician chains about featured listing subscriptions
2. **Optician subscription + Stripe** — Featured placement, self-service portal, monthly/annual billing
3. **Apify Google Reviews** — Scrape and display optician reviews
