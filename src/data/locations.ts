// ---------------------------------------------------------------------------
// UK locations data — every major city and town for SEO location pages
// ---------------------------------------------------------------------------

export type UKLocation = {
  slug: string;
  name: string;
  county: string;
  region: Region;
  population: number;
  lat: number;
  lng: number;
  postcode: string; // representative postcode for search
  description: string;
  nearbyAreas: string[]; // slugs of nearby locations
};

export type Region =
  | "London"
  | "South East"
  | "South West"
  | "East of England"
  | "West Midlands"
  | "East Midlands"
  | "North West"
  | "North East"
  | "Yorkshire and the Humber"
  | "Wales"
  | "Scotland"
  | "Northern Ireland";

export const regions: Region[] = [
  "London",
  "South East",
  "South West",
  "East of England",
  "West Midlands",
  "East Midlands",
  "North West",
  "North East",
  "Yorkshire and the Humber",
  "Wales",
  "Scotland",
  "Northern Ireland",
];

// ---------------------------------------------------------------------------
// Comprehensive UK locations — major cities and towns
// ---------------------------------------------------------------------------

export const locations: UKLocation[] = [
  // ─── London ──────────────────────────────────────────────────────────
  { slug: "london", name: "London", county: "Greater London", region: "London", population: 8982000, lat: 51.5074, lng: -0.1278, postcode: "EC1A 1BB", description: "Find and compare eye test appointments across London. Book with hundreds of opticians from independent practices to high-street chains.", nearbyAreas: ["croydon", "bromley", "kingston-upon-thames", "richmond", "ealing"] },
  { slug: "croydon", name: "Croydon", county: "Greater London", region: "London", population: 386710, lat: 51.3762, lng: -0.0982, postcode: "CR0 1NR", description: "Compare eye test appointments in Croydon. Find opticians in the Whitgift Centre, North End, and across the borough.", nearbyAreas: ["london", "bromley", "sutton", "kingston-upon-thames"] },
  { slug: "bromley", name: "Bromley", county: "Greater London", region: "London", population: 331096, lat: 51.4059, lng: 0.0149, postcode: "BR1 1DD", description: "Book eye tests in Bromley. Compare opticians on the High Street and across the borough.", nearbyAreas: ["london", "croydon", "dartford", "sevenoaks"] },
  { slug: "kingston-upon-thames", name: "Kingston upon Thames", county: "Greater London", region: "London", population: 176107, lat: 51.4123, lng: -0.3007, postcode: "KT1 1BL", description: "Find eye tests in Kingston upon Thames. Compare opticians on Clarence Street, Eden Walk, and the surrounding area.", nearbyAreas: ["london", "richmond", "sutton", "guildford", "epsom"] },
  { slug: "richmond", name: "Richmond", county: "Greater London", region: "London", population: 198019, lat: 51.4613, lng: -0.3037, postcode: "TW9 1BP", description: "Compare eye tests in Richmond upon Thames. Find opticians on George Street and across the borough.", nearbyAreas: ["london", "kingston-upon-thames", "hounslow", "twickenham"] },
  { slug: "ealing", name: "Ealing", county: "Greater London", region: "London", population: 341982, lat: 51.5130, lng: -0.3089, postcode: "W5 2HL", description: "Book eye tests in Ealing. Compare opticians on the Broadway and across West London.", nearbyAreas: ["london", "hounslow", "harrow", "brentford"] },

  // ─── South East ──────────────────────────────────────────────────────
  { slug: "brighton", name: "Brighton", county: "East Sussex", region: "South East", population: 229700, lat: 51.4816, lng: -0.1340, postcode: "BN1 1EE", description: "Find eye tests in Brighton & Hove. Compare opticians on North Street, Western Road, and across the city.", nearbyAreas: ["worthing", "crawley", "eastbourne", "lewes"] },
  { slug: "reading", name: "Reading", county: "Berkshire", region: "South East", population: 174224, lat: 51.4543, lng: -0.9781, postcode: "RG1 1AZ", description: "Compare eye test appointments in Reading. Find opticians in the Oracle, Broad Street, and across Berkshire.", nearbyAreas: ["slough", "basingstoke", "oxford", "newbury", "bracknell"] },
  { slug: "oxford", name: "Oxford", county: "Oxfordshire", region: "South East", population: 152450, lat: 51.7520, lng: -1.2577, postcode: "OX1 1BX", description: "Book eye tests in Oxford. Compare opticians on Cornmarket Street, the Westgate, and across the city.", nearbyAreas: ["reading", "swindon", "banbury", "bicester", "abingdon"] },
  { slug: "guildford", name: "Guildford", county: "Surrey", region: "South East", population: 137183, lat: 51.2362, lng: -0.5704, postcode: "GU1 3EL", description: "Find eye tests in Guildford. Compare opticians on the High Street and across Surrey.", nearbyAreas: ["woking", "farnham", "kingston-upon-thames", "crawley"] },
  { slug: "woking", name: "Woking", county: "Surrey", region: "South East", population: 105367, lat: 51.3162, lng: -0.5600, postcode: "GU21 6YL", description: "Find eye tests in Woking. Compare opticians in the Peacocks Centre, the town centre, and across Surrey.", nearbyAreas: ["guildford", "kingston-upon-thames", "slough", "basingstoke"] },
  { slug: "epsom", name: "Epsom", county: "Surrey", region: "South East", population: 78680, lat: 51.3360, lng: -0.2680, postcode: "KT18 5DB", description: "Book eye tests in Epsom. Compare opticians on the High Street, the Ashley Centre, and across Surrey.", nearbyAreas: ["kingston-upon-thames", "croydon", "guildford", "sutton"] },
  { slug: "watford", name: "Watford", county: "Hertfordshire", region: "South East", population: 96800, lat: 51.6565, lng: -0.3903, postcode: "WD17 2BH", description: "Find eye tests in Watford. Compare opticians in the intu Centre, High Street, and across Hertfordshire.", nearbyAreas: ["st-albans", "london", "luton", "slough"] },
  { slug: "canterbury", name: "Canterbury", county: "Kent", region: "South East", population: 55240, lat: 51.2802, lng: 1.0789, postcode: "CT1 2TF", description: "Compare eye tests in Canterbury. Find opticians in the city centre and across East Kent.", nearbyAreas: ["maidstone", "dover", "margate", "ashford"] },
  { slug: "southampton", name: "Southampton", county: "Hampshire", region: "South East", population: 252796, lat: 50.9097, lng: -1.4044, postcode: "SO14 7DU", description: "Book eye tests in Southampton. Compare opticians in WestQuay, Above Bar, and across the city.", nearbyAreas: ["portsmouth", "bournemouth", "winchester", "salisbury"] },
  { slug: "portsmouth", name: "Portsmouth", county: "Hampshire", region: "South East", population: 238800, lat: 50.8198, lng: -1.0880, postcode: "PO1 2AE", description: "Find eye tests in Portsmouth. Compare opticians in Gunwharf Quays, Commercial Road, and Southsea.", nearbyAreas: ["southampton", "chichester", "fareham", "gosport"] },
  { slug: "maidstone", name: "Maidstone", county: "Kent", region: "South East", population: 113137, lat: 51.2720, lng: 0.5290, postcode: "ME14 1HP", description: "Compare eye tests in Maidstone. Find opticians on the High Street, The Mall, and across Kent.", nearbyAreas: ["canterbury", "tunbridge-wells", "chatham", "sevenoaks"] },
  { slug: "milton-keynes", name: "Milton Keynes", county: "Buckinghamshire", region: "South East", population: 248800, lat: 52.0406, lng: -0.7594, postcode: "MK9 3GA", description: "Book eye tests in Milton Keynes. Compare opticians in Centre:MK, Midsummer Place, and across MK.", nearbyAreas: ["northampton", "bedford", "luton", "oxford", "aylesbury"] },
  { slug: "slough", name: "Slough", county: "Berkshire", region: "South East", population: 164438, lat: 51.5105, lng: -0.5950, postcode: "SL1 1EL", description: "Find eye tests in Slough. Compare opticians on the High Street and across the town.", nearbyAreas: ["reading", "windsor", "london", "uxbridge", "maidenhead"] },
  { slug: "crawley", name: "Crawley", county: "West Sussex", region: "South East", population: 112448, lat: 51.1092, lng: -0.1872, postcode: "RH10 1BN", description: "Compare eye tests in Crawley. Find opticians in County Mall, the Boulevard, and across West Sussex.", nearbyAreas: ["brighton", "horsham", "guildford", "east-grinstead"] },
  { slug: "tunbridge-wells", name: "Tunbridge Wells", county: "Kent", region: "South East", population: 68141, lat: 51.1323, lng: 0.2637, postcode: "TN1 1YB", description: "Book eye tests in Royal Tunbridge Wells. Compare opticians on the High Street and the Pantiles.", nearbyAreas: ["maidstone", "sevenoaks", "tonbridge", "crowborough"] },
  { slug: "basingstoke", name: "Basingstoke", county: "Hampshire", region: "South East", population: 113776, lat: 51.2667, lng: -1.0879, postcode: "RG21 7AA", description: "Find eye tests in Basingstoke. Compare opticians at Festival Place, the town centre, and beyond.", nearbyAreas: ["reading", "winchester", "andover", "newbury"] },
  { slug: "chichester", name: "Chichester", county: "West Sussex", region: "South East", population: 26795, lat: 50.8365, lng: -0.7792, postcode: "PO19 1AX", description: "Compare eye tests in Chichester. Find opticians in the city centre and across West Sussex.", nearbyAreas: ["portsmouth", "bognor-regis", "worthing", "crawley"] },
  { slug: "worthing", name: "Worthing", county: "West Sussex", region: "South East", population: 109000, lat: 50.8147, lng: -0.3714, postcode: "BN11 1AA", description: "Book eye tests in Worthing. Compare opticians along the seafront and town centre.", nearbyAreas: ["brighton", "chichester", "crawley"] },

  // ─── South West ──────────────────────────────────────────────────────
  { slug: "bristol", name: "Bristol", county: "Bristol", region: "South West", population: 463400, lat: 51.4545, lng: -2.5879, postcode: "BS1 3BH", description: "Find eye tests in Bristol. Compare opticians in Broadmead, Cabot Circus, Clifton, and across the city.", nearbyAreas: ["bath", "gloucester", "cardiff", "weston-super-mare", "swindon"] },
  { slug: "bath", name: "Bath", county: "Somerset", region: "South West", population: 88859, lat: 51.3811, lng: -2.3590, postcode: "BA1 1SU", description: "Compare eye tests in Bath. Find opticians in SouthGate, Milsom Street, and across the city.", nearbyAreas: ["bristol", "trowbridge", "frome", "chippenham"] },
  { slug: "exeter", name: "Exeter", county: "Devon", region: "South West", population: 130428, lat: 50.7184, lng: -3.5339, postcode: "EX1 1HS", description: "Book eye tests in Exeter. Compare opticians on the High Street, Princesshay, and across Devon.", nearbyAreas: ["plymouth", "taunton", "torquay", "barnstaple"] },
  { slug: "plymouth", name: "Plymouth", county: "Devon", region: "South West", population: 262100, lat: 50.3755, lng: -4.1427, postcode: "PL1 1EA", description: "Find eye tests in Plymouth. Compare opticians in Drake Circus, the city centre, and across the city.", nearbyAreas: ["exeter", "torquay", "truro", "barnstaple"] },
  { slug: "bournemouth", name: "Bournemouth", county: "Dorset", region: "South West", population: 183491, lat: 50.7192, lng: -1.8808, postcode: "BH1 1BA", description: "Compare eye tests in Bournemouth. Find opticians in the town centre, Castlepoint, and across Dorset.", nearbyAreas: ["poole", "southampton", "salisbury", "dorchester"] },
  { slug: "swindon", name: "Swindon", county: "Wiltshire", region: "South West", population: 209156, lat: 51.5558, lng: -1.7797, postcode: "SN1 1BD", description: "Book eye tests in Swindon. Compare opticians in the Brunel Centre, Regent Street, and across the town.", nearbyAreas: ["oxford", "bristol", "bath", "cheltenham", "reading"] },
  { slug: "salisbury", name: "Salisbury", county: "Wiltshire", region: "South West", population: 40302, lat: 51.0688, lng: -1.7945, postcode: "SP1 1JH", description: "Find eye tests in Salisbury. Compare opticians in the city centre, Old George Mall, and across Wiltshire.", nearbyAreas: ["southampton", "bournemouth", "swindon", "bath"] },
  { slug: "gloucester", name: "Gloucester", county: "Gloucestershire", region: "South West", population: 129128, lat: 51.8642, lng: -2.2382, postcode: "GL1 1PD", description: "Find eye tests in Gloucester. Compare opticians in the Gate Streets, Quays, and across the city.", nearbyAreas: ["cheltenham", "bristol", "worcester", "hereford"] },
  { slug: "cheltenham", name: "Cheltenham", county: "Gloucestershire", region: "South West", population: 118000, lat: 51.8994, lng: -2.0783, postcode: "GL50 1DY", description: "Compare eye tests in Cheltenham. Find opticians on the Promenade, High Street, and across the spa town.", nearbyAreas: ["gloucester", "worcester", "swindon", "oxford"] },
  { slug: "taunton", name: "Taunton", county: "Somerset", region: "South West", population: 66000, lat: 51.0149, lng: -3.1027, postcode: "TA1 3PG", description: "Book eye tests in Taunton. Compare opticians in the town centre and across Somerset.", nearbyAreas: ["exeter", "bristol", "bridgwater", "yeovil"] },
  { slug: "torquay", name: "Torquay", county: "Devon", region: "South West", population: 65245, lat: 50.4619, lng: -3.5253, postcode: "TQ1 3DR", description: "Find eye tests in Torquay. Compare opticians in the harbour area and across Torbay.", nearbyAreas: ["exeter", "plymouth", "newton-abbot", "paignton"] },
  { slug: "truro", name: "Truro", county: "Cornwall", region: "South West", population: 18766, lat: 50.2632, lng: -5.0510, postcode: "TR1 2LL", description: "Compare eye tests in Truro. Find opticians in the city centre and across Cornwall.", nearbyAreas: ["plymouth", "falmouth", "newquay", "penzance"] },

  // ─── East of England ─────────────────────────────────────────────────
  { slug: "cambridge", name: "Cambridge", county: "Cambridgeshire", region: "East of England", population: 145700, lat: 52.2053, lng: 0.1218, postcode: "CB2 3QZ", description: "Book eye tests in Cambridge. Compare opticians on Sidney Street, the Grand Arcade, and across the city.", nearbyAreas: ["peterborough", "ipswich", "norwich", "bedford", "bury-st-edmunds"] },
  { slug: "norwich", name: "Norwich", county: "Norfolk", region: "East of England", population: 144000, lat: 52.6309, lng: 1.2974, postcode: "NR2 1RL", description: "Find eye tests in Norwich. Compare opticians in Castle Mall, Chapelfield, and across Norfolk.", nearbyAreas: ["ipswich", "cambridge", "kings-lynn", "great-yarmouth"] },
  { slug: "ipswich", name: "Ipswich", county: "Suffolk", region: "East of England", population: 133384, lat: 52.0567, lng: 1.1482, postcode: "IP1 1DT", description: "Compare eye tests in Ipswich. Find opticians in the town centre, Buttermarket, and across Suffolk.", nearbyAreas: ["norwich", "colchester", "cambridge", "bury-st-edmunds"] },
  { slug: "colchester", name: "Colchester", county: "Essex", region: "East of England", population: 122000, lat: 51.8959, lng: 0.8919, postcode: "CO1 1PJ", description: "Book eye tests in Colchester. Compare opticians on the High Street, Lion Walk, and across Essex.", nearbyAreas: ["ipswich", "chelmsford", "southend-on-sea", "braintree"] },
  { slug: "chelmsford", name: "Chelmsford", county: "Essex", region: "East of England", population: 111511, lat: 51.7356, lng: 0.4685, postcode: "CM1 1LN", description: "Find eye tests in Chelmsford. Compare opticians in the High Chelmer, town centre, and across Essex.", nearbyAreas: ["colchester", "southend-on-sea", "london", "basildon"] },
  { slug: "luton", name: "Luton", county: "Bedfordshire", region: "East of England", population: 213052, lat: 51.8787, lng: -0.4200, postcode: "LU1 2HN", description: "Compare eye tests in Luton. Find opticians in the Arndale Centre, George Street, and across the town.", nearbyAreas: ["bedford", "st-albans", "milton-keynes", "london"] },
  { slug: "peterborough", name: "Peterborough", county: "Cambridgeshire", region: "East of England", population: 202259, lat: 52.5695, lng: -0.2405, postcode: "PE1 1HF", description: "Book eye tests in Peterborough. Compare opticians in Queensgate, Bridge Street, and the city centre.", nearbyAreas: ["cambridge", "northampton", "lincoln", "stamford"] },
  { slug: "southend-on-sea", name: "Southend-on-Sea", county: "Essex", region: "East of England", population: 183100, lat: 51.5459, lng: 0.7077, postcode: "SS1 1AB", description: "Find eye tests in Southend. Compare opticians on the High Street, the Victoria, and across the town.", nearbyAreas: ["chelmsford", "basildon", "london", "canvey-island"] },
  { slug: "bedford", name: "Bedford", county: "Bedfordshire", region: "East of England", population: 106940, lat: 52.1356, lng: -0.4673, postcode: "MK40 1SL", description: "Compare eye tests in Bedford. Find opticians in the Harpur Centre and across the town.", nearbyAreas: ["milton-keynes", "luton", "cambridge", "northampton"] },
  { slug: "st-albans", name: "St Albans", county: "Hertfordshire", region: "East of England", population: 147373, lat: 51.7519, lng: -0.3441, postcode: "AL1 3JE", description: "Book eye tests in St Albans. Compare opticians on the High Street and across Hertfordshire.", nearbyAreas: ["london", "luton", "watford", "hemel-hempstead"] },

  // ─── West Midlands ───────────────────────────────────────────────────
  { slug: "birmingham", name: "Birmingham", county: "West Midlands", region: "West Midlands", population: 1141816, lat: 52.4862, lng: -1.8904, postcode: "B2 4QA", description: "Find eye tests in Birmingham. Compare opticians in the Bullring, New Street, and across the UK's second city.", nearbyAreas: ["coventry", "wolverhampton", "walsall", "solihull", "dudley"] },
  { slug: "coventry", name: "Coventry", county: "West Midlands", region: "West Midlands", population: 371521, lat: 52.4068, lng: -1.5197, postcode: "CV1 1DD", description: "Compare eye tests in Coventry. Find opticians in the city centre, West Orchards, and across the city.", nearbyAreas: ["birmingham", "warwick", "rugby", "nuneaton", "leicester"] },
  { slug: "wolverhampton", name: "Wolverhampton", county: "West Midlands", region: "West Midlands", population: 254406, lat: 52.5869, lng: -2.1257, postcode: "WV1 1DT", description: "Book eye tests in Wolverhampton. Compare opticians in the Mander Centre and city centre.", nearbyAreas: ["birmingham", "walsall", "dudley", "telford", "stafford"] },
  { slug: "stoke-on-trent", name: "Stoke-on-Trent", county: "Staffordshire", region: "West Midlands", population: 256375, lat: 53.0027, lng: -2.1794, postcode: "ST1 1LQ", description: "Find eye tests in Stoke-on-Trent. Compare opticians in Hanley, the Potteries Centre, and across the city.", nearbyAreas: ["stafford", "crewe", "macclesfield", "derby", "wolverhampton"] },
  { slug: "worcester", name: "Worcester", county: "Worcestershire", region: "West Midlands", population: 101222, lat: 52.1920, lng: -2.2216, postcode: "WR1 2DS", description: "Compare eye tests in Worcester. Find opticians on the High Street, CrownGate, and across the city.", nearbyAreas: ["birmingham", "gloucester", "cheltenham", "hereford"] },
  { slug: "hereford", name: "Hereford", county: "Herefordshire", region: "West Midlands", population: 58896, lat: 52.0565, lng: -2.7160, postcode: "HR1 2AG", description: "Book eye tests in Hereford. Compare opticians in the city centre and across Herefordshire.", nearbyAreas: ["worcester", "gloucester", "abergavenny", "leominster"] },

  // ─── East Midlands ───────────────────────────────────────────────────
  { slug: "nottingham", name: "Nottingham", county: "Nottinghamshire", region: "East Midlands", population: 321500, lat: 52.9548, lng: -1.1581, postcode: "NG1 2GP", description: "Find eye tests in Nottingham. Compare opticians in the Victoria Centre, Broadmarsh, and across the city.", nearbyAreas: ["derby", "leicester", "lincoln", "mansfield", "loughborough"] },
  { slug: "leicester", name: "Leicester", county: "Leicestershire", region: "East Midlands", population: 354224, lat: 52.6369, lng: -1.1398, postcode: "LE1 5YP", description: "Compare eye tests in Leicester. Find opticians in Highcross, the city centre, and across Leicestershire.", nearbyAreas: ["nottingham", "coventry", "derby", "northampton", "loughborough"] },
  { slug: "derby", name: "Derby", county: "Derbyshire", region: "East Midlands", population: 257174, lat: 52.9225, lng: -1.4746, postcode: "DE1 2AZ", description: "Book eye tests in Derby. Compare opticians in the Intu Centre, the city centre, and across Derbyshire.", nearbyAreas: ["nottingham", "birmingham", "stoke-on-trent", "leicester", "sheffield"] },
  { slug: "northampton", name: "Northampton", county: "Northamptonshire", region: "East Midlands", population: 224610, lat: 52.2405, lng: -0.9027, postcode: "NN1 2DP", description: "Find eye tests in Northampton. Compare opticians in the Grosvenor Centre and across the town.", nearbyAreas: ["milton-keynes", "bedford", "leicester", "coventry"] },
  { slug: "lincoln", name: "Lincoln", county: "Lincolnshire", region: "East Midlands", population: 100160, lat: 53.2307, lng: -0.5406, postcode: "LN1 3BH", description: "Compare eye tests in Lincoln. Find opticians on the High Street and across the historic city.", nearbyAreas: ["nottingham", "peterborough", "hull", "grimsby", "boston"] },

  // ─── North West ──────────────────────────────────────────────────────
  { slug: "manchester", name: "Manchester", county: "Greater Manchester", region: "North West", population: 553230, lat: 53.4808, lng: -2.2426, postcode: "M1 1AD", description: "Find eye tests in Manchester. Compare opticians in the Arndale, Market Street, Trafford Centre, and across the city.", nearbyAreas: ["salford", "stockport", "bolton", "oldham", "liverpool"] },
  { slug: "liverpool", name: "Liverpool", county: "Merseyside", region: "North West", population: 496784, lat: 53.4084, lng: -2.9916, postcode: "L1 8JQ", description: "Compare eye tests in Liverpool. Find opticians in Liverpool ONE, Church Street, and across the city.", nearbyAreas: ["manchester", "chester", "wirral", "st-helens", "warrington"] },
  { slug: "chester", name: "Chester", county: "Cheshire", region: "North West", population: 79645, lat: 53.1930, lng: -2.8931, postcode: "CH1 2HJ", description: "Book eye tests in Chester. Compare opticians in the Rows, Foregate Street, and across the historic city.", nearbyAreas: ["liverpool", "wrexham", "warrington", "crewe"] },
  { slug: "warrington", name: "Warrington", county: "Cheshire", region: "North West", population: 209547, lat: 53.3900, lng: -2.5970, postcode: "WA1 1PJ", description: "Find eye tests in Warrington. Compare opticians in Golden Square, the town centre, and across the borough.", nearbyAreas: ["manchester", "liverpool", "chester", "wigan", "st-helens"] },
  { slug: "preston", name: "Preston", county: "Lancashire", region: "North West", population: 114300, lat: 53.7632, lng: -2.7031, postcode: "PR1 2HE", description: "Compare eye tests in Preston. Find opticians in St George's Centre, Fishergate, and across Lancashire.", nearbyAreas: ["blackpool", "blackburn", "lancaster", "bolton", "burnley"] },
  { slug: "blackpool", name: "Blackpool", county: "Lancashire", region: "North West", population: 139720, lat: 53.8142, lng: -3.0503, postcode: "FY1 1AN", description: "Book eye tests in Blackpool. Compare opticians on the promenade, town centre, and across the Fylde Coast.", nearbyAreas: ["preston", "lancaster", "lytham-st-annes", "fleetwood"] },
  { slug: "bolton", name: "Bolton", county: "Greater Manchester", region: "North West", population: 194189, lat: 53.5785, lng: -2.4299, postcode: "BL1 1TJ", description: "Find eye tests in Bolton. Compare opticians in the Market Place, the Crompton Place, and across the town.", nearbyAreas: ["manchester", "wigan", "bury", "blackburn"] },
  { slug: "wigan", name: "Wigan", county: "Greater Manchester", region: "North West", population: 103608, lat: 53.5448, lng: -2.6318, postcode: "WN1 1YB", description: "Find eye tests in Wigan. Compare opticians in the Grand Arcade, Standishgate, and across the borough.", nearbyAreas: ["manchester", "bolton", "warrington", "st-helens", "liverpool"] },
  { slug: "lancaster", name: "Lancaster", county: "Lancashire", region: "North West", population: 52234, lat: 54.0466, lng: -2.7998, postcode: "LA1 1JF", description: "Compare eye tests in Lancaster. Find opticians in the city centre and across North Lancashire.", nearbyAreas: ["preston", "blackpool", "kendal", "morecambe"] },
  { slug: "carlisle", name: "Carlisle", county: "Cumbria", region: "North West", population: 75306, lat: 54.8951, lng: -2.9382, postcode: "CA3 8QG", description: "Book eye tests in Carlisle. Compare opticians in The Lanes and across the border city.", nearbyAreas: ["newcastle", "penrith", "dumfries", "lancaster"] },

  // ─── North East ──────────────────────────────────────────────────────
  { slug: "newcastle", name: "Newcastle upon Tyne", county: "Tyne and Wear", region: "North East", population: 300196, lat: 54.9783, lng: -1.6178, postcode: "NE1 5DW", description: "Find eye tests in Newcastle. Compare opticians in Eldon Square, Northumberland Street, and across the city.", nearbyAreas: ["gateshead", "sunderland", "durham", "south-shields"] },
  { slug: "sunderland", name: "Sunderland", county: "Tyne and Wear", region: "North East", population: 174286, lat: 54.9069, lng: -1.3838, postcode: "SR1 3AA", description: "Compare eye tests in Sunderland. Find opticians in the Bridges, High Street, and across Wearside.", nearbyAreas: ["newcastle", "durham", "south-shields", "hartlepool"] },
  { slug: "durham", name: "Durham", county: "County Durham", region: "North East", population: 48069, lat: 54.7761, lng: -1.5733, postcode: "DH1 3NJ", description: "Book eye tests in Durham. Compare opticians in the city centre and across County Durham.", nearbyAreas: ["newcastle", "sunderland", "darlington", "bishop-auckland"] },
  { slug: "middlesbrough", name: "Middlesbrough", county: "North Yorkshire", region: "North East", population: 140545, lat: 54.5746, lng: -1.2356, postcode: "TS1 1AA", description: "Find eye tests in Middlesbrough. Compare opticians in the Cleveland Centre and across Teesside.", nearbyAreas: ["darlington", "stockton-on-tees", "redcar", "hartlepool"] },
  { slug: "darlington", name: "Darlington", county: "County Durham", region: "North East", population: 92363, lat: 54.5271, lng: -1.5526, postcode: "DL1 1RJ", description: "Compare eye tests in Darlington. Find opticians on Skinnergate, the Cornmill Centre, and across the town.", nearbyAreas: ["durham", "middlesbrough", "stockton-on-tees", "richmond"] },

  // ─── Yorkshire and the Humber ────────────────────────────────────────
  { slug: "leeds", name: "Leeds", county: "West Yorkshire", region: "Yorkshire and the Humber", population: 503388, lat: 53.8008, lng: -1.5491, postcode: "LS1 6AZ", description: "Find eye tests in Leeds. Compare opticians in Trinity Leeds, the Victoria Quarter, and across the city.", nearbyAreas: ["bradford", "wakefield", "harrogate", "york", "huddersfield"] },
  { slug: "sheffield", name: "Sheffield", county: "South Yorkshire", region: "Yorkshire and the Humber", population: 584853, lat: 53.3811, lng: -1.4701, postcode: "S1 2JB", description: "Compare eye tests in Sheffield. Find opticians in Meadowhall, the Moor, and across the Steel City.", nearbyAreas: ["rotherham", "doncaster", "barnsley", "chesterfield", "nottingham"] },
  { slug: "york", name: "York", county: "North Yorkshire", region: "Yorkshire and the Humber", population: 210618, lat: 53.9591, lng: -1.0815, postcode: "YO1 8SG", description: "Book eye tests in York. Compare opticians on Coney Street, the Coppergate Centre, and across the city.", nearbyAreas: ["leeds", "harrogate", "hull", "scarborough", "thirsk"] },
  { slug: "bradford", name: "Bradford", county: "West Yorkshire", region: "Yorkshire and the Humber", population: 349561, lat: 53.7960, lng: -1.7594, postcode: "BD1 1HY", description: "Find eye tests in Bradford. Compare opticians in the Broadway, city centre, and across the district.", nearbyAreas: ["leeds", "huddersfield", "halifax", "keighley"] },
  { slug: "hull", name: "Hull", county: "East Yorkshire", region: "Yorkshire and the Humber", population: 259778, lat: 53.7457, lng: -0.3367, postcode: "HU1 1NQ", description: "Compare eye tests in Hull. Find opticians in Princes Quay, Prospect Centre, and across the city.", nearbyAreas: ["york", "grimsby", "beverley", "scunthorpe", "lincoln"] },
  { slug: "huddersfield", name: "Huddersfield", county: "West Yorkshire", region: "Yorkshire and the Humber", population: 162949, lat: 53.6450, lng: -1.7798, postcode: "HD1 2RS", description: "Book eye tests in Huddersfield. Compare opticians in the Kingsgate Centre and across the town.", nearbyAreas: ["leeds", "bradford", "halifax", "sheffield", "wakefield"] },
  { slug: "doncaster", name: "Doncaster", county: "South Yorkshire", region: "Yorkshire and the Humber", population: 109805, lat: 53.5228, lng: -1.1285, postcode: "DN1 1EE", description: "Find eye tests in Doncaster. Compare opticians in the Frenchgate Centre and across the town.", nearbyAreas: ["sheffield", "rotherham", "barnsley", "scunthorpe", "lincoln"] },
  { slug: "harrogate", name: "Harrogate", county: "North Yorkshire", region: "Yorkshire and the Humber", population: 75070, lat: 53.9920, lng: -1.5378, postcode: "HG1 1QY", description: "Compare eye tests in Harrogate. Find opticians on Parliament Street, the Victoria Centre, and across the spa town.", nearbyAreas: ["leeds", "york", "ripon", "knaresborough"] },

  // ─── Wales ───────────────────────────────────────────────────────────
  { slug: "cardiff", name: "Cardiff", county: "Cardiff", region: "Wales", population: 364248, lat: 51.4816, lng: -3.1791, postcode: "CF10 1BH", description: "Find eye tests in Cardiff. Compare opticians in St David's Centre, Queen Street, and across the Welsh capital.", nearbyAreas: ["swansea", "newport", "bristol", "bridgend"] },
  { slug: "swansea", name: "Swansea", county: "Swansea", region: "Wales", population: 246466, lat: 51.6214, lng: -3.9436, postcode: "SA1 3QW", description: "Compare eye tests in Swansea. Find opticians in the Quadrant Centre, Oxford Street, and across the city.", nearbyAreas: ["cardiff", "neath", "llanelli", "carmarthen"] },
  { slug: "newport", name: "Newport", county: "Newport", region: "Wales", population: 154676, lat: 51.5842, lng: -2.9977, postcode: "NP20 1JR", description: "Book eye tests in Newport. Compare opticians in Friars Walk, Commercial Street, and across the city.", nearbyAreas: ["cardiff", "bristol", "cwmbran", "pontypool"] },
  { slug: "wrexham", name: "Wrexham", county: "Wrexham", region: "Wales", population: 65692, lat: 53.0467, lng: -2.9925, postcode: "LL11 1AR", description: "Find eye tests in Wrexham. Compare opticians in Eagles Meadow and across North Wales.", nearbyAreas: ["chester", "shrewsbury", "oswestry", "mold"] },
  { slug: "aberystwyth", name: "Aberystwyth", county: "Ceredigion", region: "Wales", population: 18093, lat: 52.4153, lng: -4.0829, postcode: "SY23 2AQ", description: "Compare eye tests in Aberystwyth. Find opticians in the town centre and across Mid Wales.", nearbyAreas: ["swansea", "carmarthen", "shrewsbury", "bangor"] },
  { slug: "bangor", name: "Bangor", county: "Gwynedd", region: "Wales", population: 18808, lat: 53.2274, lng: -4.1293, postcode: "LL57 1NW", description: "Book eye tests in Bangor. Compare opticians in the High Street and across North West Wales.", nearbyAreas: ["wrexham", "llandudno", "caernarfon", "holyhead"] },

  // ─── Scotland ────────────────────────────────────────────────────────
  { slug: "edinburgh", name: "Edinburgh", county: "City of Edinburgh", region: "Scotland", population: 524930, lat: 55.9533, lng: -3.1883, postcode: "EH1 1QS", description: "Find eye tests in Edinburgh. Compare opticians on Princes Street, the Royal Mile, and across the Scottish capital.", nearbyAreas: ["glasgow", "dundee", "stirling", "livingston", "dunfermline"] },
  { slug: "glasgow", name: "Glasgow", county: "City of Glasgow", region: "Scotland", population: 633120, lat: 55.8642, lng: -4.2518, postcode: "G1 3SL", description: "Compare eye tests in Glasgow. Find opticians in Buchanan Galleries, Argyle Street, and across the city.", nearbyAreas: ["edinburgh", "paisley", "hamilton", "stirling", "ayr"] },
  { slug: "aberdeen", name: "Aberdeen", county: "City of Aberdeen", region: "Scotland", population: 228920, lat: 57.1497, lng: -2.0943, postcode: "AB10 1BL", description: "Book eye tests in Aberdeen. Compare opticians on Union Street, the Bon Accord Centre, and across the Granite City.", nearbyAreas: ["dundee", "inverness", "perth", "elgin"] },
  { slug: "dundee", name: "Dundee", county: "City of Dundee", region: "Scotland", population: 148210, lat: 56.4620, lng: -2.9707, postcode: "DD1 1DB", description: "Find eye tests in Dundee. Compare opticians in the Overgate Centre, the city centre, and across the city.", nearbyAreas: ["edinburgh", "perth", "aberdeen", "st-andrews"] },
  { slug: "inverness", name: "Inverness", county: "Highland", region: "Scotland", population: 63780, lat: 57.4778, lng: -4.2247, postcode: "IV1 1HB", description: "Compare eye tests in Inverness. Find opticians in Eastgate, the city centre, and across the Highlands.", nearbyAreas: ["aberdeen", "elgin", "fort-william", "aviemore"] },
  { slug: "stirling", name: "Stirling", county: "Stirling", region: "Scotland", population: 37000, lat: 56.1165, lng: -3.9369, postcode: "FK8 2EA", description: "Book eye tests in Stirling. Compare opticians in the Thistles Centre and across the city.", nearbyAreas: ["edinburgh", "glasgow", "perth", "falkirk"] },
  { slug: "perth", name: "Perth", county: "Perth and Kinross", region: "Scotland", population: 47430, lat: 56.3950, lng: -3.4308, postcode: "PH1 5HZ", description: "Find eye tests in Perth. Compare opticians on the High Street, St John's Centre, and across the fair city.", nearbyAreas: ["dundee", "edinburgh", "stirling", "aberdeen"] },

  // ─── Northern Ireland ────────────────────────────────────────────────
  { slug: "belfast", name: "Belfast", county: "County Antrim", region: "Northern Ireland", population: 343542, lat: 54.5973, lng: -5.9301, postcode: "BT1 5GS", description: "Find eye tests in Belfast. Compare opticians in Victoria Square, CastleCourt, and across Northern Ireland's capital.", nearbyAreas: ["lisburn", "bangor-ni", "newry", "derry"] },
  { slug: "derry", name: "Derry/Londonderry", county: "County Londonderry", region: "Northern Ireland", population: 85016, lat: 54.9966, lng: -7.3086, postcode: "BT48 6HQ", description: "Compare eye tests in Derry. Find opticians in the Foyleside Centre and across the Maiden City.", nearbyAreas: ["belfast", "letterkenny", "strabane", "coleraine"] },
  { slug: "newry", name: "Newry", county: "County Down", region: "Northern Ireland", population: 27433, lat: 54.1751, lng: -6.3402, postcode: "BT35 6BJ", description: "Book eye tests in Newry. Compare opticians in the Buttercrane Centre and across the city.", nearbyAreas: ["belfast", "dundalk", "armagh", "banbridge"] },
  { slug: "lisburn", name: "Lisburn", county: "County Antrim", region: "Northern Ireland", population: 71465, lat: 54.5162, lng: -6.0580, postcode: "BT28 1AW", description: "Find eye tests in Lisburn. Compare opticians in Bow Street Mall, the city centre, and across Lisburn & Castlereagh.", nearbyAreas: ["belfast", "banbridge", "newry", "craigavon"] },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getLocationBySlug(slug: string): UKLocation | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationsByRegion(region: Region): UKLocation[] {
  return locations.filter((l) => l.region === region).sort((a, b) => b.population - a.population);
}

export function getTopLocations(count: number = 20): UKLocation[] {
  return [...locations].sort((a, b) => b.population - a.population).slice(0, count);
}

export function getAllSlugs(): string[] {
  return locations.map((l) => l.slug);
}

/** Return "Name, County" but suppress the county when it matches the city name */
export function nameWithCounty(loc: UKLocation): string {
  return loc.name === loc.county ? loc.name : `${loc.name}, ${loc.county}`;
}

/** Return "the County area" but avoid "the Cardiff area" when county = name — use "the wider area" instead */
export function countyArea(loc: UKLocation): string {
  return loc.name === loc.county ? "the wider" : `the ${loc.county}`;
}
