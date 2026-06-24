# Glossary

## Acronyms & Terms
| Term | Meaning |
|------|---------|
| NDJSON | Newline-Delimited JSON — streaming format used by /api/search |
| E-E-A-T | Experience, Expertise, Authoritativeness, Trustworthiness — Google ranking signals |
| OCT | Optical Coherence Tomography — retinal imaging scan |
| NHS | National Health Service — free eye tests for eligible UK residents |
| JSON-LD | Linked Data in JSON — structured data for search engines |
| OG | Open Graph — social media metadata tags |
| MySight | Independent optician network — API provides 35 brands |
| Ocuco | Appointment system used by Boots and ASDA opticians |
| DailySlot | `{ date: string; count: number }` — availability type, count=-1 = available but unknown count |
| SSG | Static Site Generation — pages pre-rendered at build time |
| SSR | Server-Side Rendering — pages rendered per request |
| CTA | Call To Action — buttons/links driving user action |
| SE Ranking | SEO audit tool used by Darin for site health checks |
| Vercel | Hosting platform — auto-deploys from GitHub |
| Supabase | Postgres database + auth — used for admin features |

## Project-Specific Terms
| Term | Meaning |
|------|---------|
| trust pill | The badge on the homepage hero showing "2,400+ opticians nationwide" |
| progress panel | The animated panel during search showing which providers are being checked |
| StoreCard | The card component showing an individual optician result with availability |
| deep link | URL that takes users directly to an optician's booking page for a specific store |
| search query pages | 43 `/find/[slug]` pages targeting specific search intents (e.g., "free eye test", "oct scan cost") |
| brand × location pages | ~970 pages like `/opticians/boots-opticians/london` |
| mega menu | The dropdown navigation menus in the header |

## Provider Names
| Internal Name | External Name |
|---------------|---------------|
| boots | Boots Opticians |
| asda | ASDA Opticians |
| vision-express | Vision Express |
| mysight | MySight network (independents) |
| mands | M&S Opticians (static, 37 stores) |
| aceandtate | Ace & Tate (static, 17 stores) |
| scrivens | Scrivens (static, 164 stores) |
| specsavers | Specsavers (listed but no live API integration yet) |
| optical-express | Optical Express (listed but no live API) |

## Featured Listing Terms
| Term | Meaning |
|------|---------|
| Platinum listing | Top-tier featured placement — full-width card, brand logo, badges, services tagline |
| Gold listing | Enhanced card with small logo, priority sort above organic |
| featured_providers | Supabase table for admin-configured featured placement rules |
| optician_listings | Supabase table for subscribed opticians with self-service portal |
| density cap | City-based radius cap to prevent overlap in urban areas (London=1mi, Tier2=3mi, default=5mi) |
| getStaticThreeDayDates() | Date function for static providers — skips "today" after 6 PM UK time to avoid showing "Available today" when stores are closed |
| SearchForm | Client component that dismisses iOS keyboard on submit via blur + delayed router.push |
| overflow-x: clip | CSS property used instead of `hidden` to prevent breaking position:sticky |
