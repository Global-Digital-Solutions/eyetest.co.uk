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

## Key Types
- `DailySlot`: `{ date: string; count: number }` — count=-1 means "available but count unknown"
- Search streams NDJSON via `/api/search` route
- postcodes.io for UK postcode geocoding (returns district for area name)

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
| **Total pages** | **~1,200** |

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
| M&S Opticians + Ace & Tate connectors | Done |
| **Optician subscription + Stripe billing** | **Next** |
| Apify Google Reviews scraping | Pending |

## Preferences
- Git workflow: commit from workspace, push from Mac terminal
- Commit messages: descriptive, multi-line when needed
- Always verify builds before committing
- Mobile-first design approach

Full project details: memory/projects/eyetest.md
Architecture details: memory/context/architecture.md
