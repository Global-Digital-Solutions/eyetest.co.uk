import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/* ------------------------------------------------------------------ */
/*  Bulk-import optician stores from existing provider data            */
/*  POST /api/admin/bulk-import?provider=mands|aceandtate|mysight     */
/*  Inserts stores as inactive listings grouped by brand               */
/* ------------------------------------------------------------------ */

// M&S static store data
const MANDS_STORES = [
  { slug: "argyle", storeId: "664", address: "2-12 Argyle Street, Glasgow, G2 8AA", postcode: "G2 8AA", town: "Glasgow", phone: "0141 260 5226", lat: 55.857745, lng: -4.249795 },
  { slug: "banbury-gateway", storeId: "661", address: "Banbury Gateway Shopping Park, Banbury, OX16 3ER", postcode: "OX16 3ER", town: "Banbury", phone: "01295 234 570", lat: 52.076036, lng: -1.319244 },
  { slug: "bluewater", storeId: "632", address: "Bluewater, Greenhithe, DA9 9SD", postcode: "DA9 9SD", town: "Greenhithe", phone: "01322 918085", lat: 51.43827, lng: 0.274018 },
  { slug: "braehead", storeId: "663", address: "Braehead Shopping Centre, Kings Inch Road, Glasgow, G51 4BP", postcode: "G51 4BP", town: "Glasgow", phone: "0141 260 5225", lat: 55.876062, lng: -4.36521 },
  { slug: "camberley", storeId: "668", address: "The Meadows, Marshall Road, Sandhurst, GU47 0FD", postcode: "GU47 0FD", town: "Sandhurst", phone: "01276 733039", lat: 51.336126, lng: -0.775469 },
  { slug: "canterbury", storeId: "641", address: "4 St Georges Street, Canterbury, CT1 2SR", postcode: "CT1 2SR", town: "Canterbury", phone: "01227 936 464", lat: 51.277718, lng: 1.081707 },
  { slug: "castlepoint", storeId: "640", address: "Yeomans Way, Bournemouth, BH8 9UL", postcode: "BH8 9UL", town: "Bournemouth", phone: "01202 059 316", lat: 50.754005, lng: -1.842247 },
  { slug: "cheshire-oaks", storeId: "662", address: "Cheshire Oaks, Stanney Woods Ave, Cheshire, CH65 9GZ", postcode: "CH65 9GZ", town: "Cheshire", phone: "0151 351 7665", lat: 53.262301, lng: -2.891973 },
  { slug: "cheshunt", storeId: "651", address: "Brookfield Centre, Halfhide Lane, Cheshunt, EN8 0TZ", postcode: "EN8 0TZ", town: "Cheshunt", phone: "01992 660 864", lat: 51.716652, lng: -0.037738 },
  { slug: "colliers-wood", storeId: "659", address: "1 Merton High Street, Colliers Wood, London, SW19 1DD", postcode: "SW19 1DD", town: "London", phone: "020 8016 6465", lat: 51.415189, lng: -0.18153 },
  { slug: "culverhouse-cross", storeId: "635", address: "Copthorne Way, Culverhouse Cross, Cardiff, CF5 6YZ", postcode: "CF5 6YZ", town: "Cardiff", phone: "029 2274 4087", lat: 51.466208, lng: -3.276061 },
  { slug: "derby", storeId: "627", address: "10 London Road, Derby, DE1 2NS", postcode: "DE1 2NS", town: "Derby", phone: "01332 947 603", lat: 52.91865, lng: -1.473275 },
  { slug: "ealing-broadway", storeId: "649", address: "69-79 The Broadway Ealing, London, W5 5JW", postcode: "W5 5JW", town: "London", phone: "020 8016 9602", lat: 51.513021, lng: -0.303973 },
  { slug: "exeter", storeId: "644", address: "211-219 High Street, Exeter, EX4 3QA", postcode: "EX4 3QA", town: "Exeter", phone: "01392 301 019", lat: 50.72381, lng: -3.531249 },
  { slug: "gemini", storeId: "666", address: "Europa Boulevard, Warrington, WA5 7WG", postcode: "WA5 7WG", town: "Warrington", phone: "01925 594239", lat: 53.417035, lng: -2.63157 },
  { slug: "harrogate", storeId: "658", address: "18-20 Cambridge St, Harrogate, HG1 1RX", postcode: "HG1 1RX", town: "Harrogate", phone: "01423 802 696", lat: 53.993351, lng: -1.539671 },
  { slug: "hedge-end", storeId: "633", address: "Tollbar Way, Hedge End, Southampton, SO30 2UH", postcode: "SO30 2UH", town: "Southampton", phone: "01489 358 849", lat: 50.922466, lng: -1.311714 },
  { slug: "high-wycombe-eden", storeId: "660", address: "1 Eden Place, The Eden Centre, High Wycombe, HP11 2DH", postcode: "HP11 2DH", town: "High Wycombe", phone: "01494 321 717", lat: 51.630699, lng: -0.755156 },
  { slug: "kingston", storeId: "656", address: "26 Clarence Street, Kingston Upon Thames, KT1 1NU", postcode: "KT1 1NU", town: "Kingston Upon Thames", phone: "0208 150 0154", lat: 51.410647, lng: -0.303767 },
  { slug: "leeds-white-rose", storeId: "665", address: "White Rose Shopping Centre, Dewsbury Road, Leeds, LS11 8LX", postcode: "LS11 8LX", town: "Leeds", phone: "0113 322 8968", lat: 53.75787, lng: -1.574143 },
  { slug: "llanelli", storeId: "655", address: "Unit 2C and 3 Parc Trostre, Llanelli, SA14 9UY", postcode: "SA14 9UY", town: "Llanelli", phone: "01554 701 450", lat: 51.676314, lng: -4.138921 },
  { slug: "london-colney", storeId: "628", address: "Barnet Road, London Colney, St Albans, AL2 1AB", postcode: "AL2 1AB", town: "St Albans", phone: "01727 638 009", lat: 51.716797, lng: -0.282939 },
  { slug: "longbridge", storeId: "638", address: "20 High Street, Longbridge, Birmingham, B31 2UQ", postcode: "B31 2UQ", town: "Birmingham", phone: "0121 803 7708", lat: 52.395065, lng: -1.985002 },
  { slug: "manchester", storeId: "631", address: "7 Market Street, Manchester, M1 1WT", postcode: "M1 1WT", town: "Manchester", phone: "0161 871 0717", lat: 53.48339, lng: -2.24402 },
  { slug: "meadowhall", storeId: "637", address: "The Arcade, Meadowhall, Sheffield, S91EH", postcode: "S91EH", town: "Sheffield", phone: "0114 553 7678", lat: 53.414616, lng: -1.411206 },
  { slug: "metro-centre", storeId: "636", address: "93-97 Cameron Walk, Gateshead, NE11 9YD", postcode: "NE11 9YD", town: "Gateshead", phone: "0191 933 6993", lat: 54.95577, lng: -1.66535 },
  { slug: "milton-keynes", storeId: "657", address: "2 Sunset Walk Saxon Gate East, Central Milton Keynes, MK9 3PD", postcode: "MK9 3PD", town: "Central Milton Keynes", phone: "01908 012 960", lat: 52.042124, lng: -0.759083 },
  { slug: "newcastle", storeId: "643", address: "77-87 Northumberland Street, Newcastle-Upon-Tyne, NE1 7AS", postcode: "NE1 7AS", town: "Newcastle-Upon-Tyne", phone: "0191 338 5559", lat: 54.976043, lng: -1.613612 },
  { slug: "norwich", storeId: "639", address: "Rampant Horse Street, Norwich, NR2 1QR", postcode: "NR2 1QR", town: "Norwich", phone: "01603 576 344", lat: 52.626173, lng: 1.293155 },
  { slug: "oxford", storeId: "642", address: "13-18 Queen Street, Oxford, OX1 1AB", postcode: "OX1 1AB", town: "Oxford", phone: "01865 419 984", lat: 51.751028, lng: -1.258818 },
  { slug: "plymouth", storeId: "645", address: "1 Cornwall Street, Plymouth, PL1 1DH", postcode: "PL1 1DH", town: "Plymouth", phone: "01752 279 756", lat: 50.372196, lng: -4.140073 },
  { slug: "pudsey", storeId: "647", address: "The Owlcotes Centre, Varley Street, Stanningley, LS28 6AR", postcode: "LS28 6AR", town: "Stanningley", phone: "0113 323 7678", lat: 53.803258, lng: -1.67121 },
  { slug: "shoreham", storeId: "648", address: "Holmbush Centre, Upper Shoreham Road, Shoreham-by-Sea, BN43 6TD", postcode: "BN43 6TD", town: "Shoreham-by-Sea", phone: "01273 007 871", lat: 50.841814, lng: -0.251321 },
  { slug: "stevenage", storeId: "650", address: "5 Roaring Meg Retail Park, Stevenage, SG1 1XN", postcode: "SG1 1XN", town: "Stevenage", phone: "01438 576 301", lat: 51.892511, lng: -0.198179 },
  { slug: "torbay", storeId: "654", address: "The Willows, Scotts Bridge, Torbay, TQ2 7XA", postcode: "TQ2 7XA", town: "Torbay", phone: "01803 220 700", lat: 50.489403, lng: -3.5548 },
  { slug: "wolstanton", storeId: "667", address: "Wolstanton Retail Park, Wolstanton, ST5 0AP", postcode: "ST5 0AP", town: "Wolstanton", phone: "01782 390806", lat: 53.027904, lng: -2.209922 },
  { slug: "york", storeId: "626", address: "Vangarde Retail Park, Monks Cross, York, YO32 9AE", postcode: "YO32 9AE", town: "York", phone: "01904 221 387", lat: 53.982854, lng: -1.049327 },
];

// Ace & Tate static store data
const ACEANDTATE_STORES = [
  { city: "London", address: "Earlham Street 10", slug: "london-earlham-street", universalStoreId: "GBLON01", appointmentId: 4670991, lat: 51.513539692185816, lng: -0.1280083294477663 },
  { city: "Bristol", address: "Park Street 86", slug: "bristol-parkstreet", universalStoreId: "GBBRI01", appointmentId: 6794949, lat: 51.455597685362946, lng: -2.6039087668647865 },
  { city: "Manchester", address: "Oldham Street 21", slug: "manchester-oldham-street", universalStoreId: "GBMAN01", appointmentId: 6794972, lat: 53.48215155138749, lng: -2.2365019441803002 },
  { city: "London", address: "Brewer Street 15", slug: "london-brewer-street", universalStoreId: "GBLON02", appointmentId: 8137383, lat: 51.51217159999999, lng: -0.1340817 },
  { city: "London", address: "Hanbury Street 27", slug: "london-hanbury-street", universalStoreId: "GBLON03", appointmentId: 8137358, lat: 51.52046764221553, lng: -0.07263042883540738 },
  { city: "Glasgow", address: "Byres Road 221", slug: "glasgow-byres-road", universalStoreId: "GBGLA01", appointmentId: 9645446, lat: 55.8749014, lng: -4.294298800000001 },
  { city: "Oxford", address: "High Street 135", slug: "oxford-high-street", universalStoreId: "GBOXF01", appointmentId: 12628065, lat: 51.751967102398346, lng: -1.2569143136408911 },
  { city: "Brighton", address: "Bond Street 12", slug: "brighton-bond-street", universalStoreId: "GBBNH01", appointmentId: 12813111, lat: 50.823860973209214, lng: -0.1402154343586517 },
  { city: "London", address: "Upper Street 140", slug: "london-upper-street", universalStoreId: "GBLON04", appointmentId: 17356360, lat: 51.53977004295945, lng: -0.10267400859832243 },
  { city: "London", address: "Coal Drops Yard Unit 55", slug: "london-coal-drops-yard", universalStoreId: "GBLON06", appointmentId: 27408080, lat: 51.5360471, lng: -0.1269414 },
  { city: "London", address: "Northcote Road 13", slug: "london-northcote-road", universalStoreId: "GBLON07", appointmentId: 36774950, lat: 51.460256471538045, lng: -0.16649950650071021 },
  { city: "London", address: "Portobello Road 327", slug: "london-portobello-road", universalStoreId: "GBLON09", appointmentId: 42403449, lat: 51.52104945187128, lng: -0.2098684625829783 },
  { city: "London", address: "Dirty Lane 7", slug: "london-dirty-lane", universalStoreId: "GBLON10", appointmentId: 43608219, lat: 51.50584610432134, lng: -0.09233200494549007 },
  { city: "London", address: "Duke Street 43", slug: "london-duke-street", universalStoreId: "GBLON11", appointmentId: 45176045, lat: 51.51452361572597, lng: -0.1513688895492571 },
  { city: "Leeds", address: "King Edward Street 7", slug: "leeds-king-edward-street", universalStoreId: "GBLDS01", appointmentId: 49842816, lat: 53.79785915583041, lng: -1.5415844293053937 },
  { city: "Cardiff", address: "The Hayes 4", slug: "cardiff-the-hayes", universalStoreId: "GBCRF01", appointmentId: 51421052, lat: 51.47960769079885, lng: -3.1770140290198956 },
  { city: "London", address: "Broadway Market 74", slug: "london-broadwaymarket", universalStoreId: "GBLON12", appointmentId: 88128556, lat: 51.53742753808535, lng: -0.060993912170219655 },
];

// MySight sites
const MYSIGHT_SITES = [
  "2020opticians.mysight.uk", "alldersopticians.mysight.uk", "barracloughs.mysight.uk",
  "batemanopticians.mysight.uk", "bayfieldsopticians.mysight.uk", "cameron-davies.mysight.uk",
  "chalmersopticians.mysight.uk", "classiceyes.mysight.uk", "cranfordopticians.mysight.uk",
  "duncanandtodd.mysight.uk", "exmouth-eyecare.mysight.uk", "eyecollective.mysight.uk",
  "eyelink.mysight.uk", "eyesentials.mysight.uk", "eyesite.mysight.uk",
  "harroldopticians.mysight.uk", "houghtonopticians.mysight.uk", "johnhigheyecare.mysight.uk",
  "johnroseeyecare.mysight.uk", "leightons.mysight.uk", "lynnefernandes.mysight.uk",
  "millicansopticians.mysight.uk", "norville-opticians.mysight.uk", "oakwoodeyecare.mysight.uk",
  "observatoryopticians.mysight.uk", "optimaopticians.mysight.uk", "peterbowersopticians.mysight.uk",
  "rawlingsopticians.mysight.uk", "reynoldsopticians.mysight.uk", "seoptom.mysight.uk",
  "suzannedennisoptometrist.mysight.uk", "the-eye-place.mysight.uk", "viewpoint.mysight.uk",
  "woodingopticians.mysight.uk",
];

const GQL_URL = "https://graphql.mysight.uk/";

function mysightHeaders(siteHost: string) {
  return {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: `https://${siteHost}`,
    Referer: `https://${siteHost}/`,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function mysightGql(siteHost: string, query: string, variables: Record<string, unknown>): Promise<any> {
  const res = await fetch(GQL_URL, {
    method: "POST",
    headers: mysightHeaders(siteHost),
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`MySight API ${res.status}`);
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ListingRow = Record<string, any>;

function buildMandsListings(): ListingRow[] {
  return MANDS_STORES.map((s) => ({
    practice_name: `M&S Opticians ${s.town}`,
    contact_name: "",
    email: "",
    phone: s.phone,
    website: "https://mandsopticians.com",
    booking_url: `https://mandsopticians.com/book-appointment?store_id=${s.storeId}`,
    address: s.address,
    postcode: s.postcode,
    town: s.town,
    lat: s.lat,
    lng: s.lng,
    tier: "gold",
    radius_km: 8,
    badge_label: "Recommended",
    active: false,
    brand: "M&S Opticians",
    source: "bulk_import",
    store_code: s.storeId,
    stripe_status: "pending",
  }));
}

function buildAceAndTateListings(): ListingRow[] {
  return ACEANDTATE_STORES.map((s) => ({
    practice_name: `Ace & Tate ${s.city}${s.address ? " — " + s.address : ""}`,
    contact_name: "",
    email: "",
    phone: "",
    website: "https://www.aceandtate.com",
    booking_url: `https://aceandtate-en.as.me/?appointmentType=${s.appointmentId}`,
    address: s.address,
    postcode: "",
    town: s.city,
    lat: s.lat,
    lng: s.lng,
    tier: "gold",
    radius_km: 8,
    badge_label: "Recommended",
    active: false,
    brand: "Ace & Tate",
    source: "bulk_import",
    store_code: s.universalStoreId,
    stripe_status: "pending",
  }));
}

async function buildMySightListings(): Promise<{ listings: ListingRow[]; errors: string[] }> {
  const listings: ListingRow[] = [];
  const errors: string[] = [];

  for (const siteHost of MYSIGHT_SITES) {
    try {
      // Fetch site info
      const siteData = await mysightGql(
        siteHost,
        `query site($url: String!) { site(url: $url) { id brandingId homeUrl } }`,
        { url: siteHost }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const site = (siteData as any).data?.site;
      if (!site?.brandingId) {
        errors.push(`${siteHost}: no brandingId`);
        continue;
      }

      // Fetch branches
      const branchData = await mysightGql(
        siteHost,
        `query branding($brandId: String) {
          branding(id: $brandId) {
            brandName
            brandBranches { id branchName latitude longitude onlineFriendlyBranchName telephone1 }
          }
        }`,
        { brandId: site.brandingId }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const branding = (branchData as any).data?.branding;
      const brandName = String(branding?.brandName ?? siteHost.replace(".mysight.uk", ""));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const branches = (branding?.brandBranches ?? []) as any[];

      for (const b of branches) {
        if (!b.latitude || !b.longitude) continue;
        const friendlyName = b.onlineFriendlyBranchName || b.branchName || brandName;
        listings.push({
          practice_name: friendlyName,
          contact_name: "",
          email: "",
          phone: b.telephone1 || "",
          website: `https://${siteHost}`,
          booking_url: `https://${siteHost}/recall?branchId=${b.id}`,
          address: "",
          postcode: "",
          town: "",
          lat: Number(b.latitude),
          lng: Number(b.longitude),
          tier: "gold",
          radius_km: 8,
          badge_label: "Recommended",
          active: false,
          brand: brandName,
          source: "bulk_import",
          store_code: `mysight:${siteHost}:${b.id}`,
          stripe_status: "pending",
        });
      }
    } catch (err) {
      errors.push(`${siteHost}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { listings, errors };
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const url = new URL(req.url);
  const provider = url.searchParams.get("provider");

  if (!provider) {
    return NextResponse.json({ error: "Missing provider parameter" }, { status: 400 });
  }

  let listings: ListingRow[] = [];
  let errors: string[] = [];

  switch (provider) {
    case "mands": {
      listings = buildMandsListings();
      break;
    }
    case "aceandtate": {
      listings = buildAceAndTateListings();
      break;
    }
    case "mysight": {
      const result = await buildMySightListings();
      listings = result.listings;
      errors = result.errors;
      break;
    }
    default:
      return NextResponse.json({ error: `Unknown provider: ${provider}` }, { status: 400 });
  }

  if (listings.length === 0) {
    return NextResponse.json({ error: "No stores found", errors }, { status: 404 });
  }

  // Check for existing store_codes to avoid duplicates
  const storeCodes = listings.map((l) => l.store_code).filter(Boolean);
  const { data: existing } = await supabase
    .from("optician_listings")
    .select("store_code")
    .in("store_code", storeCodes);

  const existingCodes = new Set((existing ?? []).map((e: { store_code: string }) => e.store_code));
  const newListings = listings.filter((l) => !existingCodes.has(l.store_code));

  if (newListings.length === 0) {
    return NextResponse.json({
      message: "All stores already imported",
      total: listings.length,
      skipped: listings.length,
      inserted: 0,
      errors,
    });
  }

  // Insert in batches of 50
  let inserted = 0;
  const insertErrors: string[] = [];

  for (let i = 0; i < newListings.length; i += 50) {
    const batch = newListings.slice(i, i + 50);
    const { error } = await supabase.from("optician_listings").insert(batch);
    if (error) {
      insertErrors.push(`Batch ${Math.floor(i / 50) + 1}: ${error.message}`);
    } else {
      inserted += batch.length;
    }
  }

  return NextResponse.json({
    message: `Imported ${inserted} stores for ${provider}`,
    total: listings.length,
    skipped: listings.length - newListings.length,
    inserted,
    errors: [...errors, ...insertErrors],
  });
}

// GET: list brands and counts from existing imports
export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("optician_listings")
    .select("brand, active, source")
    .order("brand");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group by brand
  const brands: Record<string, { total: number; active: number; source: string }> = {};
  for (const row of data ?? []) {
    const b = row.brand || "Unknown";
    if (!brands[b]) brands[b] = { total: 0, active: 0, source: row.source || "unknown" };
    brands[b].total++;
    if (row.active) brands[b].active++;
  }

  return NextResponse.json({ brands });
}

// PATCH: bulk activate/deactivate by brand
export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { brand, active, tier } = await req.json() as {
    brand: string;
    active: boolean;
    tier?: "gold" | "platinum";
  };

  if (!brand) {
    return NextResponse.json({ error: "Missing brand" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update: Record<string, any> = { active };
  if (tier) update.tier = tier;
  if (active) {
    update.badge_label = tier === "platinum" ? "Top Rated" : "Recommended";
    update.activated_at = new Date().toISOString();
  }

  const { error, count } = await supabase
    .from("optician_listings")
    .update(update)
    .eq("brand", brand);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: `Updated ${count ?? "all"} ${brand} listings`, active, tier });
}
