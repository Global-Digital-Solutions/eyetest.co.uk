@AGENTS.md

# Memory

## Owner
Darin Butler (butlerdarin@gmail.com) — Founder, eyetest.co.uk

## Project
**eyetest.co.uk** — The UK's authority on booking eye tests. Aggregates availability from multiple optician chains + independents, lets users compare and book online.

## Stack
| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Inter (body), Outfit (display, `--font-display`) |
| Maps | Mapbox GL |
| Database | Supabase |
| Hosting | Vercel (auto-deploy from GitHub) |
| Repo | github.com/Global-Digital-Solutions/eyetest.co.uk.git |
| Live URL | https://www.eyetest.co.uk |
| Vercel URL | https://eyetest-co-uk.vercel.app |

## Critical Next.js 16 Rules
- `params` and `searchParams` are **Promises** — always `await params`
- Read docs at `node_modules/next/dist/docs/` before writing new patterns
- Domain is `www.eyetest.co.uk` (non-www redirects to www)

## Brand
| Token | Value |
|-------|-------|
| Primary teal | `#0ea5a0` / `var(--color-primary)` |
| Navy | `#0d1b3e` / `var(--color-navy)` |
| Success green | `#22c55e` / `var(--color-success)` |
| NHS blue | `#005eb8` / `var(--color-nhs-blue)` |

## Data Providers (Live Availability)
| Provider | API | Stores |
|----------|-----|--------|
| Boots | Ocuco (siteId deep links) | ~600 |
| ASDA | Ocuco (siteId deep links) | ~200 |
| Vision Express | GraphQL (storeCode) | ~400 |
| MySight | GraphQL | ~35 independent brands |
| M&S Opticians | Static (Magento booking links) | 37 |
| Ace & Tate | Static (Acuity Scheduling links) | 17 |
| Scrivens | Static (branchId deep links) | 164 |

Static providers use `getStaticThreeDayDates()` — suppresses "today" after 6 PM UK time.

## Key Types
- `DailySlot`: `{ date: string; count: number }` — count=-1 means "available but count unknown"
- Search streams NDJSON via `/api/search` route
- postcodes.io for UK postcode geocoding (returns district for area name)

## Eye Surgery Section
- Hub page: `/eye-surgery/`
- 8 condition pages: `/eye-surgery/[slug]` (cataracts, glaucoma-surgery, laser-eye-surgery, etc.)
- 5 provider pages: `/eye-surgery/providers/[slug]` (new-medica, spa-medica, optegra, chec, moorfields-private)
- Postcode search: `/eye-surgery/search` (GET `/api/surgery-search?postcode=XX`, haversine distance)
- Enquiry form: `/eye-surgery/enquiry` (POST `/api/surgery-enquiry`, Nodemailer)
- 156 total clinics with geocoded lat/lng
- Google Review ratings per provider (Apify-scraped)
- Newmedica = preferred partner (4.8★, 39 clinics)
- Data files: `src/data/surgery-providers.ts`, `src/data/surgery-conditions.ts`
- Components: `SurgeryCallout.tsx`, `SurgeryEnquiryForm.tsx`

## Content Scale
| Section | Count |
|---------|-------|
| Eye tests | 18 types |
| Conditions | 15 |
| Guides | 10 |
| Articles | 6 |
| Locations | 97 UK cities |
| Optician brands | 12 |
| Brand × Location pages | ~970 |
| Find/search queries | 43 |
| Eye surgery conditions | 8 |
| Eye surgery providers | 5 |
| **Total pages** | **~1,215** |

## SEO
- JSON-LD schema on all pages (WebSite, Organization, Article, MedicalWebPage, MedicalCondition, LocalBusiness, BreadcrumbList, FAQPage, CollectionPage)
- Author attribution: Organization "eyetest.co.uk"
- Dynamic sitemap via `src/app/sitemap.ts`
- robots.txt blocks /api/ and /admin/
- llms.txt at /llms.txt
- E-E-A-T optimised for medical content

## Active / Next Phase
| Phase | Status |
|-------|--------|
| Core site + search | Done |
| SEO + indexability fixes | Done |
| Internal linking | Done |
| Get-Listed form + email API | Done |
| At-home eye tests page redesign | Done |
| At-home enquiry form + email API | Done |
| Terminated postcodes fix | Done |
| Gmail App Password + Vercel env vars | Done |
| MySight deep-link fix (/recall route) | Done |
| M&S Opticians + Ace & Tate + Scrivens connectors | Done |
| Search results UX: map pins, miles, trust banner | Done |
| SE Ranking audit fixes (score 97→100) | Done |
| Mobile UX: viewport zoom, keyboard dismiss, logo | Done |
| Desktop booking handoff (new tab + interstitial) | Done |
| Static provider after-hours suppression (6 PM cutoff) | Done |
| Featured/Platinum listings (admin → search results) | Done |
| Sticky desktop map (overflow-x: clip fix) | Done |
| Jimmy Fairly added to nav + optician list | Done |
| Nav sub-title: "Book With A Great Optician" | Done |
| Eye Surgery section (8 conditions, 5 providers, 156 clinics) | Done |
| Eye Surgery navigation (Header mega menu + Footer) | Done |
| Eye Surgery search API + results page | Done |
| Eye Surgery enquiry form + email API | Done |
| Google Reviews scraping (Apify) for surgery providers | Done |
| Sitemap + llms.txt updated for surgery pages | Done |
| **Registration process bug fix** | **Next** |
| Eye surgery consultation image needed | Planned |
| Outbound provider communication | Planned |
| Optician subscription + Stripe billing | Planned |

## Preferences
- Git workflow: commit from workspace, push from Mac terminal
- Commit messages: descriptive, multi-line when needed
- Always verify builds before committing
- Mobile-first design approach

Full project details: memory/projects/eyetest.md
Architecture details: memory/context/architecture.md
