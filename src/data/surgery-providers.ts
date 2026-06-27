// =============================================================================
// Eye Surgery Providers – eyetest.co.uk
// Generated data file: clinics, services, pricing, and coordinates
// =============================================================================

export type SurgeryClinic = {
  name: string;
  slug: string;
  address: string;
  postcode: string | null;
  phone: string | null;
  lat: number;
  lng: number;
  /** Direct URL to this clinic's page on the provider's website */
  clinicUrl?: string;
};

export type SurgeryService = {
  name: string;
  slug: string;
  description: string;
  pricing: string;
};

export type GoogleReview = {
  rating: number;
  reviewCount: number;
  source: string;
};

export type SurgeryProvider = {
  name: string;
  slug: string;
  website: string;
  about: string;
  brandColor: string;
  isPreferredPartner: boolean;
  storeCount: number;
  nhsFunded: boolean;
  privateSelfPay: boolean;
  googleReview: GoogleReview;
  clinics: SurgeryClinic[];
  services: SurgeryService[];
  keyFacts: string[];
  bookingUrl: string;
  /** URL pattern for per-clinic pages — use {slug} as placeholder */
  clinicUrlPattern?: string;
};

/**
 * Get the best URL for a specific clinic.
 * Priority: clinic.clinicUrl > provider.clinicUrlPattern > provider.bookingUrl
 */
export function getClinicUrl(
  provider: SurgeryProvider,
  clinic: SurgeryClinic,
): string {
  if (clinic.clinicUrl) return clinic.clinicUrl;
  if (provider.clinicUrlPattern)
    return provider.clinicUrlPattern.replace("{slug}", clinic.slug);
  return provider.bookingUrl;
}

// ---------------------------------------------------------------------------
// Provider data
// ---------------------------------------------------------------------------

export const surgeryProviders: SurgeryProvider[] = [
  // =========================================================================
  // NEW MEDICA (PREFERRED PARTNER)
  // =========================================================================
  {
    name: "Newmedica",
    slug: "new-medica",
    website: "https://www.newmedica.co.uk",
    about: "Newmedica is one of the UK's largest providers of specialist NHS and private ophthalmology services. Founded in 2007 by a former eye patient and a leading consultant ophthalmologist, Newmedica operates over 30 eye clinics and surgical centres across England. They care for more than 306,000 NHS and private patients per year, treating advanced eye conditions including cataracts, glaucoma, macular degeneration, and oculoplastics. 99% of patients would recommend them. All clinics are CQC-regulated, and Newmedica offers both NHS-funded and private self-pay/insurance treatment options. Headquartered at Forum 6, the Forum Parkway, Fareham, PO15 7PA.",
    brandColor: "#1a5276",
    isPreferredPartner: true,
    storeCount: 39,
    nhsFunded: true,
    privateSelfPay: true,
    googleReview: { rating: 4.8, reviewCount: 1032, source: "Google" },
    keyFacts: [
      "99% patient recommendation rate",
      "Over 306,000 patients treated per year",
      "All clinics CQC-regulated",
      "Both NHS and private treatment options",
      "Founded by eye patient and consultant ophthalmologist",
    ],
    bookingUrl: "https://www.newmedica.co.uk/clinics/",
    clinicUrlPattern: "https://www.newmedica.co.uk/clinics/{slug}/",
    clinics: [
      { name: "Newmedica Barlborough", slug: "barlborough", address: "Unit 1B and 1C Midland Place, Barlborough Links, Chesterfield, S43 4FR", postcode: "S43 4FR", phone: "01246 739005", lat: 53.282, lng: -1.29235 },
      { name: "Newmedica Birmingham", slug: "birmingham", address: "Aqueous One, Aston Cross Business Village, Rocky Lane, Birmingham, B6 5RQ", postcode: "B6 5RQ", phone: "0121 270 5048", lat: 52.497583, lng: -1.881434 },
      { name: "Newmedica Bracknell", slug: "bracknell", address: "Venture House, 2 Arlington Square, Downshire Way, Bracknell, Berkshire, RG12 1WA", postcode: "RG12 1WA", phone: "01753 291 086", lat: 51.415349, lng: -0.757723 },
      { name: "Newmedica Bradford and Huddersfield", slug: "bradford-huddersfield", address: "Park House, Woodland Park, Bradford Road, Cleckheaton, West Yorkshire, BD19 6BW", postcode: "BD19 6BW", phone: "01274 940 519", lat: 53.739343, lng: -1.731895 },
      { name: "Newmedica Brigg", slug: "brigg", address: "Riverside Surgery, Barnard Avenue, Brigg, DN20 8AS", postcode: "DN20 8AS", phone: "01472 806806", lat: 53.553605, lng: -0.491827 },
      { name: "Newmedica Bristol - Aztec West", slug: "bristol-aztec-west", address: "Building 720, Waterside Drive, Aztec West, Almondsbury, Bristol, BS32 4UD", postcode: "BS32 4UD", phone: "0117 335 0160", lat: 51.538814, lng: -2.574025 },
      { name: "Newmedica Bristol - Litfield House", slug: "bristol-litfield", address: "Litfield House Medical Centre, 1 Litfield Place, Clifton Down, Bristol, BS8 3LS", postcode: "BS8 3LS", phone: "0117 335 0160", lat: 51.457756, lng: -2.623095 },
      { name: "Newmedica Bromsgrove", slug: "bromsgrove", address: "BHI Parkside, Stourbridge Road, Bromsgrove, Worcestershire, B61 0AE", postcode: "B61 0AE", phone: "01905 671637", lat: 52.339644, lng: -2.058454 },
      { name: "Newmedica Bury St Edmunds", slug: "bury-st-edmunds", address: "Newmedica, Clarity House, Kempson Way, Bury St Edmunds, IP32 7AR", postcode: "IP32 7AR", phone: "01284 585018", lat: 52.241356, lng: 0.75109 },
      { name: "Newmedica Cheshire Oaks", slug: "cheshire-oaks", address: "Units 3-4, The Oaks Office Park, Ellesmere Port, Cheshire, CH2 4HY", postcode: "CH2 4HY", phone: "0151 332 9657", lat: 53.264246, lng: -2.874487 },
      { name: "Newmedica Darlington", slug: "darlington", address: "Park Place Health Centre, Park Place, Darlington, DL1 5LW", postcode: "DL1 5LW", phone: "01642 087614", lat: 54.523284, lng: -1.548615 },
      { name: "Newmedica Exeter", slug: "exeter", address: "The Medical Eye Clinic, Sigford Road, Matford Park, Exeter, EX2 8NL", postcode: "EX2 8NL", phone: "01392 797717", lat: 50.696829, lng: -3.517513 },
      { name: "Newmedica Gloucester - Aspen", slug: "gloucester-aspen", address: "Aspen Medical Centre, Horton Road, Gloucester, GL1 3PX", postcode: "GL1 3PX", phone: "01452 223334", lat: 51.865976, lng: -2.225793 },
      { name: "Newmedica Gloucester - Brighouse", slug: "gloucester-brighouse", address: "19D Brighouse Court, Barnwood, Gloucester, GL4 3RT", postcode: "GL4 3RT", phone: "01452 223334", lat: 51.864228, lng: -2.202854 },
      { name: "Newmedica Grimsby", slug: "grimsby", address: "Cromwell Primary Care Centre, 1st Floor, Cromwell Road, Grimsby, DN31 2BH", postcode: "DN31 2BH", phone: "01472 806806", lat: 53.567843, lng: -0.108808 },
      { name: "Newmedica Hampshire", slug: "hampshire", address: "St Andrew's House, 4400 Parkway, Solent Business Park, Whiteley, PO15 7FJ", postcode: "PO15 7FJ", phone: "01489 357465", lat: 50.879278, lng: -1.23845 },
      { name: "Newmedica Harrogate", slug: "harrogate", address: "2 Grove Park Court, Harrogate, HG1 4DP", postcode: "HG1 4DP", phone: "01423 223219", lat: 54.00098, lng: -1.530052 },
      { name: "Newmedica Ipswich", slug: "ipswich", address: "London House, Hadleigh Road, Ipswich, IP2 0EE", postcode: "IP2 0EE", phone: "01473 453463", lat: 52.05784, lng: 1.132169 },
      { name: "Newmedica Keyworth", slug: "keyworth", address: "Village Health Group, Bunny Lane, Keyworth, Nottingham, NG12 5JU", postcode: "NG12 5JU", phone: "01157 733815", lat: 52.871477, lng: -1.093412 },
      { name: "Newmedica Langford", slug: "langford", address: "Mendip Vale Medical Centre, Pudding Pie Lane, Langford, BS40 5EL", postcode: "BS40 5EL", phone: "0117 335 0160", lat: 51.341491, lng: -2.785903 },
      { name: "Newmedica Leeds", slug: "leeds", address: "St Martins House, 210 Chapeltown Road, Leeds, LS7 4HZ", postcode: "LS7 4HZ", phone: "01132 621613", lat: 53.822131, lng: -1.532144 },
      { name: "Newmedica Leicester", slug: "leicester", address: "Grove Park, 1 Barton Close, Leicester, LE19 1SJ", postcode: "LE19 1SJ", phone: "0116 216 3737", lat: 52.596631, lng: -1.189607 },
      { name: "Newmedica Lincoln", slug: "lincoln", address: "North Hykeham Health Centre, Moor Lane, North Hykeham, Lincoln, LN6 9BA", postcode: "LN6 9BA", phone: "01472 806806", lat: 53.187367, lng: -0.596463 },
      { name: "Newmedica Manchester", slug: "manchester", address: "Unit 27 Cobra Court, 2 Blackmore Road, Manchester, M32 0QY", postcode: "M32 0QY", phone: "0161 507 1957", lat: 53.460533, lng: -2.323264 },
      { name: "Newmedica Middlesbrough", slug: "middlesbrough", address: "29-30 Market Place, North Ormesby, Middlesbrough, TS3 6HR", postcode: "TS3 6HR", phone: "01642 087614", lat: 54.571373, lng: -1.214103 },
      { name: "Newmedica Newcastle", slug: "newcastle", address: "Hadrian House, Balliol Business Park, Newcastle Upon Tyne, NE12 8EW", postcode: "NE12 8EW", phone: "0191 4060781", lat: 55.019949, lng: -1.588792 },
      { name: "Newmedica Northampton", slug: "northampton", address: "Unit 2 Westbury Court, Anglia Way, Moulton Park, Northampton, NN3 6JA", postcode: "NN3 6JA", phone: "01604 215232", lat: 52.274249, lng: -0.873974 },
      { name: "Newmedica Norwich", slug: "norwich", address: "Lakeside 200, Old Chapel Way, Broadland Business Park, Norwich, NR7 0WG", postcode: "NR7 0WG", phone: "01603 957020", lat: 52.629383, lng: 1.371779 },
      { name: "Newmedica Nottingham", slug: "nottingham", address: "Tottle Road, Riverside Business Park, Nottingham, NG2 1RT", postcode: "NG2 1RT", phone: "01157 733815", lat: 52.934882, lng: -1.164831 },
      { name: "Newmedica Nuneaton", slug: "nuneaton", address: "GP Led Health Centre, Ramsden Avenue, Camp Hill, Nuneaton, CV10 9EB", postcode: "CV10 9EB", phone: "01926 403319", lat: 52.533046, lng: -1.50695 },
      { name: "Newmedica Oxfordshire", slug: "oxfordshire", address: "Avalon House, Marcham Road, Abingdon, OX14 1TZ", postcode: "OX14 1TZ", phone: "01865 410435", lat: 51.668255, lng: -1.304909 },
      { name: "Newmedica Plymouth", slug: "plymouth", address: "Forder House, 20 William Prance Road, Derriford, Plymouth, PL6 5WR", postcode: "PL6 5WR", phone: "01752 421622", lat: 50.411272, lng: -4.120241 },
      { name: "Newmedica Shrewsbury", slug: "shrewsbury", address: "Unit 2, Anchorage Ave., Shrewsbury Bus. Park, Shrewsbury, SY2 6FG", postcode: "SY2 6FG", phone: "01743 292392", lat: 52.69079, lng: -2.720398 },
      { name: "Newmedica Slough", slug: "slough", address: "Buckland House, Langley Business Park, 10 Waterside Drive, Langley, Slough, Berkshire, SL3 6EZ", postcode: "SL3 6EZ", phone: "01753 291 086", lat: 51.508509, lng: -0.545873 },
      { name: "Newmedica Swindon", slug: "swindon", address: "Unit 10, Dorcan Business Village, 10 Murdock Road, Swindon, SN3 5HY", postcode: "SN3 5HY", phone: "01452 223334", lat: 51.56141, lng: -1.722247 },
      { name: "Newmedica Wakefield", slug: "wakefield", address: "106 Barnsley Road, Wakefield, WF1 5NX", postcode: "WF1 5NX", phone: "01924 252662", lat: 53.666128, lng: -1.486787 },
      { name: "Newmedica Welwyn Garden City", slug: "welwyn-garden-city", address: "3 Falcon Gate, Shire Park, Welwyn Garden City, Hertfordshire, AL7 1TW", postcode: "AL7 1TW", phone: "01707 242038", lat: 51.806922, lng: -0.197982 },
      { name: "Newmedica Worcester", slug: "worcester", address: "Unit 5, Berkeley Business Park, Wainwright Road, Worcester, WR4 9FA", postcode: "WR4 9FA", phone: "01905 671637", lat: 52.21312, lng: -2.171949 },
      { name: "Newmedica Worksop", slug: "worksop", address: "The Dukeries, 31-33 Retford Road, Worksop, S80 2PU", postcode: "S80 2PU", phone: "01246 739005", lat: 53.302602, lng: -1.103912 },
    ],
    services: [
      {
        name: "Cataracts",
        slug: "cataracts",
        description: "Cataracts are a common age-related eye condition where the eye's clear lens develops cloudy or misty patches, making vision seem like looking through a frosty window. Newmedica offers NHS and private cataract surgery with a range of high-quality lens options.",
        pricing: "Standard monofocal lens: £2,295/eye; Premium monofocal: £2,795/eye; Premium monofocal toric: £3,195/eye; Multifocal: £3,595/eye; Multifocal toric: £3,595/eye; Extended depth of focus: £3,595/eye; Extended depth of focus toric: £3,595/eye. Free initial consultation included.",
      },
      {
        name: "Glaucoma",
        slug: "glaucoma",
        description: "Glaucoma is a group of eye conditions that cause gradual damage to the optic nerve, usually due to raised pressure inside the eye. It can ultimately lead to loss of vision, so early management is critical. Newmedica offers SLT laser treatment and glaucoma surgery.",
        pricing: "SLT laser (one eye): £795; SLT laser (bilateral): £995; Glaucoma surgery (trabeculectomy): from £2,995",
      },
      {
        name: "YAG Laser Treatment",
        slug: "yag-laser-treatment",
        description: "YAG laser treatment is used to treat cloudiness after cataract surgery (posterior capsular opacification) and some cases of glaucoma. YAG laser capsulotomy creates a tiny opening in the cloudy capsule behind the lens implant to restore clear vision.",
        pricing: "Laser capsulotomy (one eye): £495; Laser capsulotomy (bilateral): £795; Laser iridotomy (one or both eyes): £795",
      },
      {
        name: "Oculoplastics",
        slug: "oculoplastics",
        description: "Oculoplastic surgery involves procedures on the areas around the eyes, including tear ducts, eyelids, and the orbit. Newmedica treats conditions such as drooping eyelids (ptosis), excess eyelid skin, eyelid lumps and bumps, and watery eyes, for both cosmetic and medical purposes.",
        pricing: "Punctal plugs: £695; 3-snip punctoplasty: £795; Excision of lid lesion/cyst: £795; Biopsy of lid lesion: £995; Electrolysis eyelash removal: £995; Entropion/ectropion surgery: from £1,995; Blepharoplasty (one lid): from £2,495; Blepharoplasty (two lids): from £3,495; Ptosis surgery: from £2,795",
      },
      {
        name: "Age-Related Macular Degeneration (AMD)",
        slug: "age-related-macular-degeneration",
        description: "AMD is a common condition affecting the macula, the small central area of the retina responsible for detailed central vision. It usually affects people over 65 and comes in two forms: dry AMD (gradual vision loss) and wet AMD (more sudden, treatable with injections).",
        pricing: "Injection for macular degeneration: from £800",
      },
      {
        name: "Refractive Lens Exchange",
        slug: "refractive-lens-exchange",
        description: "Refractive lens exchange replaces the eye's natural lens with a synthetic lens to correct vision errors that cannot be tackled with laser eye surgery. Suitable for presbyopia, astigmatism, severe short-sightedness, and severe long-sightedness. The procedure takes about 15 minutes per eye.",
        pricing: "Pricing as per cataract surgery lens options (from £2,295/eye)",
      },
      {
        name: "Epiretinal Membrane",
        slug: "epiretinal-membrane-condition-and-surgery",
        description: "An epiretinal membrane (macular pucker) is a thin layer of tissue that forms over the macula. It commonly develops with age and can cause distorted or blurred central vision. Treatment involves vitrectomy surgery to carefully peel away the membrane.",
        pricing: "Vitrectomy +/- membrane peel: £5,995; Vitrectomy +/- cataract surgery combined: £6,995",
      },
      {
        name: "Macular Hole",
        slug: "macular-hole",
        description: "A macular hole is a gap that forms in the macula, the central part of the retina. It typically develops due to age-related changes in the vitreous gel and causes blurry or distorted central vision. Treatment involves vitrectomy surgery.",
        pricing: "Vitrectomy +/- membrane peel: £5,995; Vitrectomy +/- cataract surgery combined: £6,995",
      },
      {
        name: "Ocular Hypertension",
        slug: "ocular-hypertension",
        description: "Ocular hypertension means higher-than-normal pressure inside the eye. It usually has no symptoms but can develop into glaucoma if left unmanaged. Regular monitoring and treatment with eye drops or SLT laser can help reduce the risk of vision loss.",
        pricing: "SLT laser (one eye): £795; SLT laser (bilateral): £995",
      },
      {
        name: "Vitreoretinal Surgery (VR)",
        slug: "vitreoretinal-surgery-vr",
        description: "Vitreoretinal surgery is a specialised procedure to address issues in the retina and vitreous gel. It treats conditions such as retinal detachment, epiretinal membrane, macular hole, and vitreous floaters, helping to restore vision affected by retinal disorders.",
        pricing: "Vitrectomy +/- membrane peel: £5,995; Vitrectomy +/- cataract surgery combined: £6,995",
      },
      {
        name: "Vitreous Floaters",
        slug: "vitreous-floaters",
        description: "Vitreous floaters are black lines, dots, or squiggles that float in your vision. They are usually harmless and caused by age-related changes in the vitreous gel. When floaters significantly impact daily activities, vitrectomy surgery can be an option.",
        pricing: "Vitrectomy +/- membrane peel: £5,995; Vitrectomy +/- cataract surgery combined: £6,995",
      },
      {
        name: "OCT Scan",
        slug: "oct-scan",
        description: "Optical coherence tomography (OCT) is an advanced imaging technology used to create detailed 3D images of the eye's internal structures. It helps diagnose and monitor conditions like glaucoma, macular degeneration, macular hole, and epiretinal membrane.",
        pricing: "Included as part of consultation/assessment appointments. Initial consultation from £195.",
      },
      {
        name: "Eyelid and Tear Duct",
        slug: "eyelid-and-tear-duct",
        description: "Newmedica treats a range of eyelid and tear duct conditions including dry eye, eyelid lumps and bumps (chalazion, stye), drooping eyelids (ptosis), excess eyelid skin, entropion/ectropion, and watery eyes caused by blocked tear ducts.",
        pricing: "Punctal plugs: £695; 3-snip punctoplasty: £795; Excision of lid lesion/cyst: £795; Biopsy of lid lesion: £995; Entropion/ectropion surgery: from £1,995; Blepharoplasty (one lid): from £2,495; Blepharoplasty (two lids): from £3,495; Ptosis surgery: from £2,795",
      },
      {
        name: "Corneal Cross-Linking",
        slug: "corneal-cross-linking",
        description: "Corneal cross-linking (CXL) is a treatment designed to slow or stop the progression of corneal weakening, most commonly keratoconus. It is currently the only treatment proven to reduce or halt progression of the condition.",
        pricing: "Unilateral: £1,995; Bilateral: £2,495",
      },
    ],
  },

  // =========================================================================
  // SPA MEDICA
  // =========================================================================
  {
    name: "SpaMedica",
    slug: "spa-medica",
    website: "https://www.spamedica.co.uk",
    about: "SpaMedica is the UK's largest independent provider of NHS cataract surgery, established in 2008 in Manchester. With over 60 specialist eye hospitals nationwide and more than 2,000 employees, they partner with the NHS to provide ophthalmic services including cataract surgery, YAG laser capsulotomy, AMD treatment, glaucoma services, oculoplastics, and treatments for retinal vein occlusion and diabetic retinopathy. All inspected hospitals are rated 'Good' or 'Outstanding' by the CQC. SpaMedica is a partner of the Veonet Group, collaborating with leading ophthalmology partners across Europe. They also offer private cataract surgery through their Freedom Vision brand.",
    brandColor: "#00a3e0",
    isPreferredPartner: false,
    storeCount: 67,
    nhsFunded: true,
    privateSelfPay: true,
    googleReview: { rating: 3.4, reviewCount: 66, source: "Google" },
    keyFacts: [
      "UK's largest independent NHS cataract surgery provider",
      "Over 60 specialist eye hospitals",
      "All CQC-inspected hospitals rated Good or Outstanding",
      "More than 2,000 employees",
      "Part of the Veonet Group",
    ],
    bookingUrl: "https://www.spamedica.co.uk/locations/",
    clinicUrlPattern: "https://www.spamedica.co.uk/location/{slug}/",
    clinics: [
      { name: "SpaMedica Bedford", slug: "bedford", address: "Bedford Heights, Ground Floor, Manton Lane, Brickhill Drive Entrance, Bedford, MK41 7PH", postcode: "MK41 7PH", phone: "0330 058 4280", lat: 52.150802, lng: -0.474729 },
      { name: "SpaMedica Bexhill", slug: "bexhill", address: "Ground Floor, High Weald House, Bexhill Enterprise Park, Bexhill, TN39 5ES", postcode: "TN39 5ES", phone: "0330 058 4280", lat: 50.856771, lng: 0.481077 },
      { name: "SpaMedica Birmingham", slug: "birmingham", address: "Apex House, Calthorpe Road, Edgbaston, Birmingham B15 1TR", postcode: "B15 1TR", phone: "0330 058 4280", lat: 52.472091, lng: -1.918026 },
      { name: "SpaMedica Blackpool", slug: "blackpool", address: "Barons Gate, Graceways, Whitehills Business Park, Blackpool, FY4 5PW", postcode: "FY4 5PW", phone: "0330 058 4280", lat: 53.786592, lng: -2.989209 },
      { name: "SpaMedica Bolton", slug: "bolton", address: "43 Churchgate, Bolton BL1 1HU", postcode: "BL1 1HU", phone: "0330 058 4280", lat: 53.579946, lng: -2.425821 },
      { name: "SpaMedica Bradford", slug: "bradford", address: "Standard House, 11 Trevor Foster Way, Bradford, BD5 8HB", postcode: "BD5 8HB", phone: "0330 058 4280", lat: 53.770306, lng: -1.748387 },
      { name: "SpaMedica Brighton", slug: "brighton", address: "Ground Floor, Pavilion House, Kings Business Park, Reeds Lane, Sayers Common, BN6 9LS", postcode: "BN6 9LS", phone: "0330 058 4280", lat: 50.949107, lng: -0.202296 },
      { name: "SpaMedica Bristol", slug: "bristol", address: "Corum 2, Corum Office Park, Crown Way, Warmley, Bristol. BS30 8FJ", postcode: "BS30 8FJ", phone: "0330 058 4280", lat: 51.457851, lng: -2.476056 },
      { name: "SpaMedica Bromley", slug: "bromley", address: "Northside House 69 Tweedy Rd Bromley BR1 3WA", postcode: "BR1 3WA", phone: "0330 058 4280", lat: 51.408423, lng: 0.016606 },
      { name: "SpaMedica Cambridge", slug: "cambridge", address: "Carlyle House, Carlyle Road, Cambridge, CB4 3DH", postcode: "CB4 3DH", phone: "0330 058 4280", lat: 52.21407, lng: 0.116941 },
      { name: "SpaMedica Carlisle", slug: "carlisle", address: "SpaMedica Carlisle, Minerva House, Port Road, Carlisle, CA2 7AF", postcode: "CA2 7AF", phone: "0330 058 4280", lat: 54.896817, lng: -2.953437 },
      { name: "SpaMedica Chelmsford", slug: "chelmsford", address: "Lower Ground And Ground Floor, Buckenham House, 1 Coval Wells, Chelmsford, CM1 1WZ", postcode: "CM1 1WZ", phone: "0330 058 4280", lat: 51.734431, lng: 0.464045 },
      { name: "SpaMedica Chester", slug: "chester", address: "First floor, The Foundation, Heronsway, Chester Business Park, Chester, CH4 9QS", postcode: "CH4 9QS", phone: "0330 058 4280", lat: 53.161261, lng: -2.90642 },
      { name: "SpaMedica Chesterfield", slug: "chesterfield", address: "Spire Walk, Derby Road, Chesterfield, S40 2WG", postcode: "S40 2WG", phone: "0330 058 4280", lat: 53.23092, lng: -1.423734 },
      { name: "SpaMedica Colchester", slug: "colchester", address: "100 The Crescent, Colchester Business Park, CO4 9YQ", postcode: "CO4 9YQ", phone: "0330 058 4280", lat: 51.923804, lng: 0.92162 },
      { name: "SpaMedica Coventry", slug: "coventry", address: "1410 Spring Place, Herald Avenue, Coventry Business Park, Coventry, CV5 6UB", postcode: "CV5 6UB", phone: "0330 058 4280", lat: 52.403256, lng: -1.55239 },
      { name: "SpaMedica Croydon", slug: "croydon", address: "Part Ground Floor, Interchange Building, 81-85 Station Road, Croydon, CR0 2RD", postcode: "CR0 2RD", phone: "0330 058 4280", lat: 51.379541, lng: -0.101436 },
      { name: "SpaMedica Dalston", slug: "dalston", address: "Playle House, Tottenham Road, Dalston, N1 4BZ", postcode: "N1 4BZ", phone: "0330 058 4280", lat: 51.54536, lng: -0.077321 },
      { name: "SpaMedica Derby", slug: "derby", address: "Ground Floor, Quarnmill House, Stores Road, Derby DE21 4XF", postcode: "DE21 4XF", phone: "0330 058 4280", lat: 52.9289, lng: -1.465802 },
      { name: "SpaMedica Doncaster", slug: "doncaster", address: "Block A, Loversall Court, Tickhill Road, Balby, Doncaster, DN4 8QG", postcode: "DN4 8QG", phone: "0330 058 4280", lat: 53.498025, lng: -1.152502 },
      { name: "SpaMedica Dorchester", slug: "dorchester", address: "Grove House, MIllers Close, Dorchester, DT1 1SS", postcode: "DT1 1SS", phone: "0330 058 4280", lat: 50.718491, lng: -2.444027 },
      { name: "SpaMedica Epsom", slug: "epsom", address: "New Plan House, East Street, Epsom, Surrey, KT17 1BL", postcode: "KT17 1BL", phone: "0330 058 4280", lat: 51.335926, lng: -0.262579 },
      { name: "SpaMedica Exeter", slug: "exeter", address: "Lancaster House, Exeter International Office Park, Exeter, EX5 2HL", postcode: "EX5 2HL", phone: "0330 058 4280", lat: 50.729414, lng: -3.413654 },
      { name: "SpaMedica Gateshead", slug: "gateshead", address: "The Edge, Fifth Avenue, Team Valley, Gateshead, NE11 0XA", postcode: "NE11 0XA", phone: "0330 058 4280", lat: 54.933563, lng: -1.615688 },
      { name: "SpaMedica Gloucester", slug: "gloucester", address: "Ground Floor Suite 2, Sanctus House, Olympus Business Park, Quedgeley, Gloucester, GL2 4DH", postcode: "GL2 4DH", phone: "0330 058 4280", lat: 51.835079, lng: -2.273851 },
      { name: "SpaMedica Haydock", slug: "haydock", address: "Unit 2, The Parks, Haydock, WA12 0JQ", postcode: "WA12 0JQ", phone: "0330 058 4280", lat: 53.479795, lng: -2.639795 },
      { name: "SpaMedica Hull", slug: "hull", address: "Building B, Willerby Hill Business Park, Willerby Court, Hull, HU10 6FE", postcode: "HU10 6FE", phone: "0330 058 4280", lat: 53.771067, lng: -0.447309 },
      { name: "SpaMedica Kendal", slug: "kendal", address: "Juniper House, Murley Moss Business Park, Oxenholme Road, Kendal, LA9 7RL", postcode: "LA9 7RL", phone: "0330 058 4280", lat: 54.311117, lng: -2.735475 },
      { name: "SpaMedica Leeds", slug: "leeds", address: "Part First Floor, 1175 Century Way, Thorpe Park, Leeds, LS15 8ZB", postcode: "LS15 8ZB", phone: "0330 058 4280", lat: 53.796838, lng: -1.426444 },
      { name: "SpaMedica Leicester", slug: "leicester", address: "Gateway House, Ground Floor, 4 Penman Way, Grove Park, Enderby, Leicester, LE19 1SY", postcode: "LE19 1SY", phone: "0330 058 4280", lat: 52.595926, lng: -1.186386 },
      { name: "SpaMedica Liverpool", slug: "liverpool", address: "Rathbone Building, Liverpool Innovation Park, 360 Edge Lane, Liverpool L7 9NN", postcode: "L7 9NN", phone: "0330 058 4280", lat: 53.408991, lng: -2.92979 },
      { name: "SpaMedica Luton", slug: "luton", address: "Unit 725, Capability Green, Luton, LU1 3LU", postcode: "LU1 3LU", phone: "0330 058 4280", lat: 51.865325, lng: -0.409297 },
      { name: "SpaMedica Manchester", slug: "manchester", address: "Citygate Central, Blantyre Street, Manchester M15 4SQ", postcode: "M15 4SQ", phone: "0330 058 4280", lat: 53.472978, lng: -2.258726 },
      { name: "SpaMedica Newark", slug: "newark", address: "Loxley House, Balderton Gate, Newark, Nottinghamshire, NG24 1UN", postcode: "NG24 1UN", phone: "0330 058 4280", lat: 53.073394, lng: -0.805622 },
      { name: "SpaMedica Newcastle-under-Lyme", slug: "newcastle-under-lyme", address: "Osprey House, Ore Close, Lymedale Business Park, Newcastle-under-Lyme ST5 9QD", postcode: "ST5 9QD", phone: "0330 058 4280", lat: 53.028747, lng: -2.243922 },
      { name: "SpaMedica North Tyneside", slug: "north-tyneside", address: "Cobalt 3.2, Silver Fox Way, NE27 0QJ", postcode: "NE27 0QJ", phone: "0330 058 4280", lat: 55.020076, lng: -1.506602 },
      { name: "SpaMedica Norwich", slug: "norwich", address: "West Suite Ground Floor, Discovery House, 4 Norwich Business Park, Whiting Road, Norwich, NR4 6DJ", postcode: "NR4 6DJ", phone: "0330 058 4280", lat: 52.607536, lng: 1.292243 },
      { name: "SpaMedica Oldham", slug: "oldham", address: "1st Floor, 48 Sheepfoot Lane, Oldham, OL1 2PD", postcode: "OL1 2PD", phone: "0330 058 4280", lat: 53.554495, lng: -2.122315 },
      { name: "SpaMedica Oxford", slug: "oxford", address: "14 Blenheim Office Park, Long Hanborough, Oxford, OX29 8LN", postcode: "OX29 8LN", phone: "0330 058 4280", lat: 51.824195, lng: -1.36914 },
      { name: "SpaMedica Peterborough", slug: "peterborough", address: "Ashurst, Southgate Park, Bakewell Road, Peterborough, PE2 6YS", postcode: "PE2 6YS", phone: "0330 058 4280", lat: 52.536025, lng: -0.319299 },
      { name: "SpaMedica Poole", slug: "poole", address: "Forelle House, Marshes End, Upton Road, Poole, Dorset, BH17 7AG", postcode: "BH17 7AG", phone: "0330 058 4280", lat: 50.73698, lng: -1.993834 },
      { name: "SpaMedica Portsmouth", slug: "portsmouth", address: "Shore House, North Harbour Business Park, Portsmouth, PO6 4PR", postcode: "PO6 4PR", phone: "0330 058 4280", lat: 50.844407, lng: -1.091667 },
      { name: "SpaMedica Preston", slug: "preston", address: "Number 3, Albert Edward House, The Pavilions, Preston, PR2 2YB", postcode: "PR2 2YB", phone: "0330 058 4280", lat: 53.759726, lng: -2.72419 },
      { name: "SpaMedica Romford", slug: "romford", address: "210 South Street, Romford, Essex, RM1 1TR", postcode: "RM1 1TR", phone: "0330 058 4280", lat: 51.572593, lng: 0.183605 },
      { name: "SpaMedica Sale", slug: "sale", address: "Dovecote House, Old Hall Road, Sale, M33 2GS", postcode: "M33 2GS", phone: "0330 058 4280", lat: 53.424457, lng: -2.294038 },
      { name: "SpaMedica Sheffield", slug: "sheffield", address: "6 Smithy Wood Drive, Chapeltown, Sheffield S35 1QN", postcode: "S35 1QN", phone: "0330 058 4280", lat: 53.453722, lng: -1.456008 },
      { name: "SpaMedica Sittingbourne", slug: "sittingbourne", address: "Denne Court, Hengist Field, Oad Street, Borden, Sittingbourne, Kent, ME9 8LT", postcode: "ME9 8LT", phone: "0330 058 4280", lat: 51.325561, lng: 0.692856 },
      { name: "SpaMedica Skelmersdale", slug: "skelmersdale", address: "Unit B, High Street, Westgate, Skelmersdale, WN8 8AP", postcode: "WN8 8AP", phone: "0330 058 4280", lat: 53.547192, lng: -2.800895 },
      { name: "SpaMedica Solihull", slug: "solihull", address: "Part First Floor, Cornwall House, Blythe Valley Park, Solihull, B90 8AF", postcode: "B90 8AF", phone: "0330 058 4280", lat: 52.373975, lng: -1.798461 },
      { name: "SpaMedica Southampton", slug: "southampton", address: "Ground Floor, Stoneham Place, Stoneham Lane, Southampton, SO50 9NW", postcode: "SO50 9NW", phone: "0330 058 4280", lat: 50.954423, lng: -1.371935 },
      { name: "SpaMedica Stockton-on-Tees", slug: "stockton-on-tees", address: "Birch House, Three Acres, Princeton Drive, Stockton-on-Tees, TS17 6AJ", postcode: "TS17 6AJ", phone: "0330 058 4280", lat: 54.560754, lng: -1.299606 },
      { name: "SpaMedica Swansea", slug: "swansea", address: "Ground Floor, Atlantic Close, Swansea Enterprise Park, Swansea SA7 9FJ", postcode: "SA7 9FJ", phone: "0330 058 4280", lat: 51.649876, lng: -3.916514 },
      { name: "SpaMedica Swindon", slug: "swindon", address: "Ground Floor, Canberra House, Lydiard Fields Business Park, Great Western Way, Swindon, SN5 8UB", postcode: "SN5 8UB", phone: "0330 058 4280", lat: 51.548105, lng: -1.85234 },
      { name: "SpaMedica Taunton", slug: "taunton", address: "Portland House, Deane Gate Avenue, Taunton, TA1 2UH", postcode: "TA1 2UH", phone: "0330 058 4280", lat: 51.019957, lng: -3.066157 },
      { name: "SpaMedica Telford", slug: "telford", address: "First Floor, Titan House, Euston Park, Telford, TF3 4LY", postcode: "TF3 4LY", phone: "0330 058 4280", lat: 52.68088, lng: -2.438113 },
      { name: "SpaMedica Truro", slug: "truro", address: "Ground Floor, High Water House, Malpas Road, Truro, TR1 1QH", postcode: "TR1 1QH", phone: "0330 058 4280", lat: 50.262098, lng: -5.046505 },
      { name: "SpaMedica Wakefield", slug: "wakefield", address: "10 Silkwood Park, Ossett, Wakefield WF5 9TJ", postcode: "WF5 9TJ", phone: "0330 058 4280", lat: 53.682859, lng: -1.548192 },
      { name: "SpaMedica Watford", slug: "watford", address: "Ground Floor, St Andrews, The Belfry, Watford, WD24 4WH", postcode: "WD24 4WH", phone: "0330 058 4280", lat: 51.667325, lng: -0.389072 },
      { name: "SpaMedica Wembley", slug: "wembley", address: "28 and 30 Wembley Park Boulevard, Wembley, HA9 0HP", postcode: "HA9 0HP", phone: "0330 058 4280", lat: 51.557531, lng: -0.281544 },
      { name: "SpaMedica Widnes", slug: "widnes", address: "Teal House, Tan House Lane, Widnes, Cheshire WA8 0RR", postcode: "WA8 0RR", phone: "0330 058 4280", lat: 53.365996, lng: -2.71329 },
      { name: "SpaMedica Wirral", slug: "wirral", address: "St Catherine's Health Centre, Church Road, Birkenhead CH42 0LQ", postcode: "CH42 0LQ", phone: "0330 058 4280", lat: 53.380046, lng: -3.026531 },
      { name: "SpaMedica Wokingham", slug: "wokingham", address: "Quoin House, Fishponds Road, Wokingham, Berkshire. RG41 2QJ", postcode: "RG41 2QJ", phone: "0330 058 4280", lat: 51.403936, lng: -0.849221 },
      { name: "SpaMedica Wolverhampton", slug: "wolverhampton", address: "Pendeford Business Park, Overstrand, Off Wobaston Road, Wolverhampton, WV9 5HA", postcode: "WV9 5HA", phone: "0330 058 4280", lat: 52.628159, lng: -2.151531 },
      { name: "SpaMedica Worcester", slug: "worcester", address: "Ground Floor, Acorn House, 1 Bridgewater Road, Worcester, WR4 9FQ", postcode: "WR4 9FQ", phone: "0330 058 4280", lat: 52.213108, lng: -2.161455 },
      { name: "SpaMedica Barnsley", slug: "barnsley", address: "SpaMedica Barnsley, Oaks Park Primary Care Centre, Barnsley", postcode: null, phone: "0330 058 4280", lat: 53.5529, lng: -1.4793 },
      { name: "SpaMedica Macclesfield", slug: "macclesfield", address: "SpaMedica Macclesfield, Macclesfield", postcode: null, phone: "0330 058 4280", lat: 53.2601, lng: -2.1256 },
      { name: "SpaMedica Stevenage", slug: "stevenage", address: "SpaMedica Stevenage, Stevenage", postcode: null, phone: "0330 058 4280", lat: 51.9033, lng: -0.2017 },
    ],
    services: [
      {
        name: "Cataract Surgery",
        slug: "cataracts",
        description: "NHS cataract surgery - the only reliable treatment for cataracts. A quick procedure taking around 20 minutes where the cloudy lens is removed and replaced with an artificial lens implant under local anaesthetic. Has a 99% success rate and is the most common operation in the UK.",
        pricing: "Free on the NHS",
      },
      {
        name: "Cataract Surgery - See Sooner Package",
        slug: "see-sooner",
        description: "A package for patients who want faster access to NHS cataract surgery, reducing waiting times while still receiving the same high-quality SpaMedica treatment.",
        pricing: "Free on the NHS (expedited pathway)",
      },
      {
        name: "Age-Related Macular Degeneration (AMD) Treatment",
        slug: "age-related-macular-degeneration",
        description: "Treatment for wet AMD using anti-VEGF injections to slow down abnormal blood vessel growth and preserve vision. Wet AMD can be treated if caught early. Dry AMD currently has no approved NHS treatment but progression can be slowed with lifestyle changes.",
        pricing: "Free on the NHS",
      },
      {
        name: "Glaucoma Services",
        slug: "glaucoma",
        description: "Comprehensive glaucoma care including diagnostic clinics, monitoring, and treatment. Treatments include Selective Laser Trabeculoplasty (SLT) for open-angle glaucoma, Laser Peripheral Iridotomy (PI) for angle-closure glaucoma, and eye drop prescriptions.",
        pricing: "Free on the NHS",
      },
      {
        name: "YAG Laser Capsulotomy",
        slug: "yag-laser-capsulotomy",
        description: "Treatment for Posterior Capsule Opacification (PCO), a common complication after cataract surgery where the lens capsule thickens. A quick, non-invasive laser procedure that provides a permanent solution, with most patients seeing improvement shortly after treatment.",
        pricing: "Free on the NHS",
      },
      {
        name: "Oculoplastic Services",
        slug: "oculoplastics",
        description: "Consultant-led specialist care for conditions affecting the eyelids, tear ducts, and surrounding facial structures. Treats ectropion, entropion, eyelid cysts, ptosis, trichiasis, and watery eye (epiphora). Currently offered at Worcester.",
        pricing: "Free on the NHS",
      },
      {
        name: "Retinal Vein Occlusion (RVO) Treatment",
        slug: "retinal-vein-occlusion",
        description: "Treatment for retinal vein occlusion where a vein carrying blood from the retina becomes blocked. First-line treatment uses anti-VEGF injections to reduce swelling and prevent abnormal blood vessel growth, with personalised ongoing treatment plans.",
        pricing: "Free on the NHS",
      },
      {
        name: "Diabetic Retinopathy & Maculopathy Treatment",
        slug: "diabetic-retinopathy-maculopathy",
        description: "Treatment for diabetic macular oedema using anti-VEGF injections to reduce swelling and prevent abnormal blood vessel growth in the retina. Personalised treatment plans with three-phase approach for ongoing management.",
        pricing: "Free on the NHS",
      },
      {
        name: "Freedom Vision (Private Cataract Surgery)",
        slug: "freedom-vision",
        description: "Private cataract surgery service offering rapid access to appointments, premium lens options including AI-designed RayOne Galaxy lenses, free 60-minute consultations, 0% finance plans, 24/7 optometrist helpline, and comprehensive aftercare at 50+ clinics nationwide. Founded in 2008 as part of SpaMedica.",
        pricing: "Private - pricing on consultation. 0% interest payment plans available.",
      },
    ],
  },

  // =========================================================================
  // OPTEGRA
  // =========================================================================
  {
    name: "Optegra",
    slug: "optegra",
    website: "https://www.optegra.com",
    about: "Optegra is a specialist eye hospital group founded in 2007, dedicated exclusively to eye surgery, treatments, and care. Since 2025, Optegra has been part of the EssilorLuxottica Group. They operate 19 UK hospitals and clinics (78 globally including Europe), have treated over 1 million patients, and are rated 5-star on Trustpilot and Doctify. They offer both NHS and private eye treatments including laser eye surgery, cataract surgery, lens replacement, ICL surgery, and treatments for AMD and glaucoma. All consultants are NHS-trained Fellows of the Royal College of Ophthalmologists. CQC regulated. Phone: 0800 086 1064 (Private), 0207 509 4186 (NHS).",
    brandColor: "#003087",
    isPreferredPartner: false,
    storeCount: 19,
    nhsFunded: false,
    privateSelfPay: true,
    googleReview: { rating: 4.5, reviewCount: 583, source: "Google" },
    keyFacts: [
      "Specialist private eye hospital group",
      "LASIK, cataract, and lens replacement surgery",
      "State-of-the-art diagnostic technology",
      "Consultant-led care throughout",
      "Interest-free finance available",
    ],
    bookingUrl: "https://www.optegra.com/hospitals-and-clinics/",
    clinicUrlPattern: "https://www.optegra.com/hospitals-and-clinics/{slug}/",
    clinics: [
      { name: "Bowcliffe Hall Eye Clinic", slug: "bowcliffe-hall-eye-clinic", address: "Bowcliffe Hall, Bramham, Wetherby, Yorkshire", postcode: null, phone: "0800 086 1064", lat: 53.9283, lng: -1.3856 },
      { name: "Optegra Eye Hospital London (Central)", slug: "optegra-eye-hospital-london", address: "Queen Anne Street, Marylebone, London", postcode: null, phone: "0800 086 1064", lat: 51.5155, lng: -0.1418 },
      { name: "Optegra Eye Clinic Leicester", slug: "optegra-eye-clinic-leicester", address: "Ground Floor 6, Dominus Way, Meridian Business Park, Leicester", postcode: "LE19 1RP", phone: "0800 086 1064", lat: 52.611854, lng: -1.191261 },
      { name: "Optegra Eye Hospital North London", slug: "optegra-eye-hospital-north-london", address: "Colin Park Road, Colindale, London", postcode: null, phone: "0800 086 1064", lat: 51.5858, lng: -0.2502 },
      { name: "Optegra Eye Clinic Preston", slug: "optegra-eye-clinic-preston", address: "175-177 Station Road, Bamber Bridge, Preston", postcode: "PR5 6LA", phone: "0800 086 1064", lat: 53.730626, lng: -2.661225 },
      { name: "Optegra Eye Clinic York", slug: "optegra-eye-clinic-york", address: "1 Tudor Court, York Business Park, York", postcode: "YO26 6RS", phone: "0800 086 1064", lat: 53.979014, lng: -1.130976 },
      { name: "Optegra Eye Hospital Birmingham", slug: "optegra-eye-hospital-birmingham", address: "Aston University Campus, Birmingham", postcode: null, phone: "0800 086 1064", lat: 52.4862, lng: -1.8904 },
      { name: "Optegra Eye Hospital Yorkshire (Bradford)", slug: "optegra-eye-hospital-yorkshire", address: "Harrogate Road, Apperley Bridge, Bradford", postcode: "BD10 0RD", phone: "0800 086 1064", lat: 53.832408, lng: -1.710381 },
      { name: "Optegra Eye Clinic Brighton", slug: "optegra-eye-clinic-brighton", address: "Sussex House, Crowhurst Road, Brighton", postcode: "BN1 8AF", phone: "0800 086 1064", lat: 50.867094, lng: -0.123849 },
      { name: "Optegra Eye Hospital Hampshire", slug: "optegra-eye-hospital-hampshire", address: "Whiteley, Hampshire", postcode: "PO15 7AD", phone: "0800 086 1064", lat: 50.878121, lng: -1.244396 },
      { name: "Optegra Eye Clinic Colchester", slug: "optegra-eye-clinic-colchester", address: "Oyster House, Severalls Lane, Colchester", postcode: "CO4 9PD", phone: "0800 086 1064", lat: 51.917835, lng: 0.923312 },
      { name: "Optegra Eye Clinic Maidstone", slug: "optegra-eye-clinic-maidstone", address: "10 Kings Hill Avenue, Kings Hill, West Malling, Kent", postcode: "ME19 4AR", phone: "0800 086 1064", lat: 51.275662, lng: 0.39577 },
      { name: "Optegra Eye Hospital Manchester", slug: "optegra-eye-hospital-manchester", address: "Princess Road, West Didsbury, Manchester", postcode: null, phone: "0800 086 1064", lat: 53.4808, lng: -2.2426 },
      { name: "Optegra Eye Clinic Newcastle", slug: "optegra-eye-clinic-newcastle", address: "Units 1-3 Maingate, Kingsway North, Team Valley Trading Estate, Gateshead", postcode: "NE11 0BE", phone: "0800 086 1064", lat: 54.943286, lng: -1.624414 },
      { name: "Optegra Eye Clinic Nottingham", slug: "optegra-eye-clinic-nottingham", address: "Apex Business Park, Ruddington Lane, Nottingham", postcode: "NG11 7DD", phone: "0800 086 1064", lat: 52.913425, lng: -1.157435 },
      { name: "Optegra Eye Clinic Sheffield", slug: "optegra-eye-clinic-sheffield", address: "Carbrook Triangle, Sheffield", postcode: null, phone: "0800 086 1064", lat: 53.3811, lng: -1.4701 },
      { name: "Optegra Eye Hospital Surrey", slug: "optegra-eye-hospital-surrey", address: "Surrey Research Park, Guildford, Surrey", postcode: "GU2 7YF", phone: "0800 086 1064", lat: 51.241153, lng: -0.613241 },
      { name: "Optegra Eye Clinic Uttoxeter", slug: "optegra-eye-clinic-uttoxeter", address: "Unit 2, Heritage Trade Park, Uttoxeter", postcode: "ST14 8AZ", phone: "0800 086 1064", lat: 52.900287, lng: -1.858192 },
      { name: "Optegra Eye Clinic West London", slug: "optegra-eye-clinic-west-london", address: "High Street, Hounslow, London", postcode: "TW3 1EL", phone: "0800 086 1064", lat: 51.469892, lng: -0.362158 },
    ],
    services: [
      {
        name: "Cataract Surgery",
        slug: "cataract-surgery",
        description: "Quick and effective procedure to restore clear vision by removing the cloudy natural lens and replacing it with a clear, artificial intraocular lens (IOL). Takes around 20 minutes under local anaesthetic eye drops. Options include standard (monofocal), enhanced (toric for astigmatism), and advanced (multifocal) packages.",
        pricing: "Standard: £2,895/eye, Enhanced: £3,595/eye, Advanced: £3,995/eye. 0% finance available for 12-24 months. Private Medical Insurance accepted.",
      },
      {
        name: "LASIK Eye Surgery",
        slug: "laser-eye-surgery/lasik",
        description: "The most popular type of laser eye surgery. Uses advanced computer technology in a fast, painless, completely blade-free procedure to correct short-sightedness, long-sightedness, astigmatism, and wavefront abnormalities. Takes around 15 minutes with results in as little as 24 hours. 96% of patients achieve desired vision.",
        pricing: "£1,995/eye. 0% finance available.",
      },
      {
        name: "LASEK Eye Surgery",
        slug: "laser-eye-surgery/lasek",
        description: "A type of laser eye surgery often used as an alternative for those not suitable for LASIK (e.g. corneas too thin or flat). The surface layer of the cornea is loosened and folded back, then an Excimer laser reshapes the cornea surface. Recovery is slower than LASIK but results are comparable.",
        pricing: "£1,495/eye. 0% finance available.",
      },
      {
        name: "ReLEx SMILE Eye Surgery",
        slug: "treatments/laser-eye-surgery/smile",
        description: "Advanced, minimally invasive, bladeless keyhole laser eye surgery using Carl Zeiss VisuMax laser. No flap is created, making the eye more comfortable post-operatively. Can correct higher degrees of myopia with or without astigmatism. Takes less than 15 minutes with 80% vision improvement within hours.",
        pricing: "£2,595/eye. 0% finance available.",
      },
      {
        name: "Presbyond Laser Blended Vision",
        slug: "presbyond-laser-eye-surgery",
        description: "A laser procedure to eliminate the need for reading glasses, ideal for those over 40 struggling with near focusing (presbyopia). Uses wavefront laser to sculpt corneas for blended vision: dominant eye for distance, non-dominant for near. Painless, 30-minute procedure similar to LASIK.",
        pricing: "£2,895/eye. 0% finance available.",
      },
      {
        name: "Lens Replacement Surgery (Refractive Lens Exchange)",
        slug: "lens-replacement",
        description: "Advanced vision correction procedure replacing the eye's natural lens with a clear, artificial intraocular lens (IOL). Same surgical technique as cataract surgery but for patients with clear lenses seeking long-term correction of age-related vision changes. Ideal for patients over 50. Prevents future cataract development.",
        pricing: "Monofocal Lens Exchange: £3,395/eye (£3,295 at Surrey), Multifocal Lens Replacement: £3,995/eye (£3,895 at Surrey/Birmingham). 0% finance available.",
      },
      {
        name: "Implantable Contact Lens (ICL/EVO) Surgery",
        slug: "laser-eye-surgery/icl-evo",
        description: "A biocompatible Collamer lens implanted between the iris and natural lens to correct myopia, hyperopia, and astigmatism. Does not require removal of corneal tissue or cause dry eye. Provides UV protection. Routine outpatient procedure taking approximately 8 minutes per eye. Excellent alternative to LASIK.",
        pricing: "£3,595/eye. 0% finance available.",
      },
      {
        name: "YAG Laser Capsulotomy",
        slug: "cataract-surgery/yag-laser-eye-surgery",
        description: "Simple laser treatment to restore clear vision after cataract surgery when the lens capsule becomes cloudy (Posterior Capsule Opacification/PCO). Fast, painless, and highly successful with most patients noticing clear improvement soon afterwards.",
        pricing: "£300 consultation fee plus £695 for one eye or £995 for both eyes.",
      },
      {
        name: "Dry AMD Treatment (PBM Therapy)",
        slug: "dry-amd-treatment",
        description: "Photobiomodulation (PBM) therapy for Dry Age-Related Macular Degeneration. Non-invasive light-based treatment using a comfortable eye mask to support retinal cell function. Painless with no recovery time. Available for patients with early to intermediate Dry AMD. Clinical studies show improvements in visual function, retinal structure, and blood flow.",
        pricing: "First treatment cycle: £1,645 (9 sessions). Subsequent cycles: £1,495. Available at Central London and Manchester hospitals.",
      },
      {
        name: "Wet AMD Treatment (Anti-VEGF Injections)",
        slug: "wet-amd",
        description: "Treatment for Wet Age-Related Macular Degeneration using anti-VEGF injection therapies (ranibizumab, bevacizumab, aflibercept, faricimab). Injections block VEGF protein to stop growth and leakage of abnormal blood vessels. Quick procedure (less than 20 seconds). Available on the NHS at Manchester and Yorkshire hospitals.",
        pricing: "Available on the NHS. Private pricing not listed.",
      },
      {
        name: "Glaucoma Treatment",
        slug: "nhs/patient/glaucoma",
        description: "Consultant-led glaucoma diagnosis, monitoring, and treatment through the NHS. Uses advanced techniques including eye drops, iStent treatment, and SLT (Selective Laser Trabeculoplasty) to reduce eye pressure and protect vision. Available at Manchester, Bradford, and North London Eye Hospitals.",
        pricing: "Available on the NHS only.",
      },
      {
        name: "NHS Cataract Surgery",
        slug: "cataract-surgery/nhs-cataract-surgery",
        description: "Cataract surgery available through NHS partnership at most Optegra clinics. Now offered as drop-free cataract surgery. Patients can request referral from their GP or optician to Optegra. Typically treated within 2-4 weeks of referral.",
        pricing: "Free on the NHS via GP/optician referral.",
      },
    ],
  },

  // =========================================================================
  // CHEC
  // =========================================================================
  {
    name: "CHEC",
    slug: "chec",
    website: "https://www.chec.uk",
    about: "CHEC (Community Health and Eyecare) is one of the UK's leading providers of community healthcare, founded in 2012. For more than a decade, CHEC has worked in partnership with the NHS to increase patient choice and provide access to timely care and treatment locally. Through 35+ community hospitals nationwide, CHEC delivers specialist ophthalmology, gastroenterology, ENT, and dermatology services, with over 390,000 ophthalmology consultations per year. They also operate Clarity, a private healthcare brand offering self-pay cataract surgery with finance options. Headquartered at 1-6 Star Building, Broughton Business Park, Fulwood, Preston, PR2 9WT.",
    brandColor: "#1f3b76",
    isPreferredPartner: false,
    storeCount: 29,
    nhsFunded: true,
    privateSelfPay: false,
    googleReview: { rating: 3.7, reviewCount: 200, source: "Google" },
    keyFacts: [
      "Community-based NHS ophthalmology provider",
      "Rapidly expanding across England",
      "Convenient high street locations",
      "Specialist cataract and glaucoma services",
      "Shorter waiting times than hospital",
    ],
    bookingUrl: "https://chec.uk/our-locations/",
    clinicUrlPattern: "https://chec.uk/location/{slug}/",
    clinics: [
      { name: "CHEC Accrington", slug: "accrington", address: "Accrington, Lancashire", postcode: null, phone: "0344 264 4160", lat: 53.7536, lng: -2.3641 },
      { name: "CHEC Blackpool", slug: "blackpool", address: "Progress House, Avroe Court, Avroe Crescent, Blackpool", postcode: "FY4 2DP", phone: "0344 264 4160", lat: 53.777146, lng: -3.035043 },
      { name: "CHEC Macclesfield", slug: "macclesfield", address: "Pickford Street, Macclesfield", postcode: null, phone: "0344 264 4160", lat: 53.2601, lng: -2.1256 },
      { name: "CHEC Newcastle Gateshead", slug: "newcastle-gateshead", address: "11-13 & 65-67 Russell Way, Upper Blue Mall, Metrocentre, Gateshead", postcode: "NE11 9YZ", phone: "0344 264 4160", lat: 54.957636, lng: -1.667443 },
      { name: "CHEC Leeds", slug: "leeds", address: "Wira Business Park, West Park, 250 Ring Road, Middleton, Leeds", postcode: "LS16 6EB", phone: "0344 264 4160", lat: 53.83884, lng: -1.610585 },
      { name: "CHEC Sheffield", slug: "sheffield", address: "12 Europa View, Sheffield Business Park, Sheffield", postcode: "S9 1XH", phone: "0344 264 4160", lat: 53.395637, lng: -1.385466 },
      { name: "CHEC Stockport", slug: "stockport", address: "11 Railway Road, Stockport", postcode: "SK1 3SW", phone: "0344 264 4160", lat: 53.405852, lng: -2.161734 },
      { name: "CHEC Trafford Park", slug: "trafford-park", address: "Ground Floor, Venus Building, 1 Old Park Lane, Trafford City", postcode: "M41 7HA", phone: "0344 264 4160", lat: 53.468576, lng: -2.355606 },
      { name: "CHEC Canterbury", slug: "canterbury", address: "Kingsmead Road, Canterbury", postcode: null, phone: "0344 264 4160", lat: 51.2802, lng: 1.0789 },
      { name: "CHEC Chesterfield", slug: "chesterfield", address: "Rowland Hill House, Boythorpe Road, Chesterfield", postcode: "S40 2NF", phone: "0344 264 4160", lat: 53.233428, lng: -1.436989 },
      { name: "CHEC Basingstoke", slug: "basingstoke", address: "Chineham Business Park, Basingstoke", postcode: null, phone: "0344 264 4160", lat: 51.2667, lng: -1.0875 },
      { name: "CHEC Coventry", slug: "coventry", address: "Orchard Court, 3 Binley Business Park, Binley, Coventry", postcode: "CV3 2TQ", phone: "0344 264 4160", lat: 52.400762, lng: -1.442961 },
      { name: "CHEC Leicester", slug: "leicester", address: "33 St. Matthews Way, Leicester", postcode: "LE1 2BU", phone: "0344 264 4160", lat: 52.639724, lng: -1.126861 },
      { name: "CHEC Ilford", slug: "ilford", address: "Unit 2, The Horizon Building, 51-59 Ilford Hill", postcode: "IG1 2DG", phone: "0344 264 4160", lat: 51.558296, lng: 0.068298 },
      { name: "CHEC Kings Norton", slug: "kings-norton", address: "Kingsgate House, Kings Norton Business Centre, Birmingham", postcode: "B30 3EP", phone: "0344 264 4160", lat: 52.411739, lng: -1.928824 },
      { name: "CHEC Loughborough", slug: "loughborough", address: "The Rushes Shopping Centre, Unit 3, Loughborough", postcode: "LE11 1UQ", phone: "0344 264 4160", lat: 52.773988, lng: -1.205901 },
      { name: "CHEC Milton Keynes", slug: "milton-keynes", address: "1 Pitfield, Kiln Farm, Milton Keynes", postcode: "MK11 3LW", phone: "0344 264 4160", lat: 52.045175, lng: -0.823334 },
      { name: "CHEC New Cross", slug: "new-cross", address: "Unit B & C, Ewan Henderson Court, Goodwood Road, Greater London", postcode: "SE14 6BL", phone: "0344 264 4160", lat: 51.476724, lng: -0.039642 },
      { name: "CHEC Northampton", slug: "northampton", address: "Units 1A & 1B, Sol Centre, Mare Fair, Northampton", postcode: "NN1 1SR", phone: "0344 264 4160", lat: 52.23666, lng: -0.901871 },
      { name: "CHEC Nottingham", slug: "nottingham", address: "Commodore Court, Bar Lane / Nuthall Road, Nottingham", postcode: null, phone: "0344 264 4160", lat: 52.9548, lng: -1.1581 },
      { name: "CHEC Stevenage", slug: "stevenage", address: "85 Queensway, Stevenage", postcode: "SG1 1EA", phone: "0344 264 4160", lat: 51.903526, lng: -0.201693 },
      { name: "CHEC Stoke", slug: "stoke", address: "2 Lyme Drive, Parklands, Stoke-on-Trent", postcode: "ST4 6NW", phone: "0330 100 4730", lat: 52.996906, lng: -2.211991 },
      { name: "CHEC Wandsworth", slug: "wandsworth", address: "Merton Road, Wandsworth, London", postcode: null, phone: "0344 264 4160", lat: 51.4558, lng: -0.1885 },
      { name: "CHEC Watford", slug: "watford", address: "Harlequin Watford Shopping Centre, Lower Mall, Queens Road, Watford", postcode: "WD17 2UB", phone: "0344 264 4160", lat: 51.654122, lng: -0.392836 },
      { name: "CHEC Westbourne", slug: "westbourne", address: "97 Poole Road, Westbourne, Bournemouth, Dorset", postcode: "BH4 9BB", phone: "0344 264 4160", lat: 50.722973, lng: -1.903365 },
      { name: "CHEC Worthing", slug: "worthing", address: "105-109 Montague Street, Worthing", postcode: "BN11 3BN", phone: "0344 264 4160", lat: 50.809981, lng: -0.373532 },
      { name: "CHEC West Bromwich", slug: "west-bromwich", address: "Unit 2, Farley Centre, High Street, West Bromwich, West Midlands", postcode: "B70 7QU", phone: "0344 264 4160", lat: 52.51653, lng: -1.991168 },
      { name: "CHEC Lewisham", slug: "lewisham", address: "Lewisham, London", postcode: null, phone: "0344 264 4160", lat: 51.4571, lng: -0.0132 },
      { name: "CHEC Mid South Essex", slug: "mid-south-essex", address: "Multiple locations across Mid and South Essex", postcode: null, phone: "0344 264 4160", lat: 51.5459, lng: 0.7077 },
    ],
    services: [
      {
        name: "Cataract Surgery (NHS)",
        slug: "cataracts",
        description: "NHS cataract treatment including diagnosis, surgery, and follow-up care. Cataract surgery is a quick, straightforward, painless procedure taking around 10 minutes with a 99% success rate. Approximately 30% of adults aged 65+ will develop cataracts requiring treatment.",
        pricing: "Free (NHS funded)",
      },
      {
        name: "Glaucoma & Ocular Hypertension",
        slug: "glaucoma-ocular-hypertension",
        description: "Diagnosis, monitoring, and treatment of glaucoma, a group of eye conditions that gradually damage the optic nerve due to elevated intraocular pressure. Treatment may involve monitoring, eye drops, or surgery. Over 1,300 glaucoma consultations per week.",
        pricing: "Free (NHS funded)",
      },
      {
        name: "Macular Degeneration (AMD)",
        slug: "macular-degeneration",
        description: "Diagnosis and treatment of age-related macular degeneration, one of the leading causes of sight loss affecting over 600,000 people in the UK. Wet AMD treated with anti-VEGF injections; dry AMD managed with lifestyle interventions. Available at CHEC Watford and Coventry.",
        pricing: "Free (NHS funded)",
      },
      {
        name: "General Ophthalmology",
        slug: "general-ophthalmology",
        description: "Primary care eye services consulting over 150,000 patients per year across 35+ UK locations. General ophthalmologists manage clinics providing specialist advice, assessment and treatments for patients who may have multiple conditions including cataracts, glaucoma and AMD.",
        pricing: "Free (NHS funded)",
      },
      {
        name: "Minor Eye Conditions Service (MECS)",
        slug: "minor-eye-conditions-mecs",
        description: "Community optometrist-delivered service for minor eye conditions including sudden blurred vision, red eye, foreign body removal, dry/painful eye, watery eye, flashes/floaters, and retinal lesions. Aims to manage conditions in primary care, minimising unnecessary hospital referrals.",
        pricing: "Free (NHS funded)",
      },
      {
        name: "Vitreoretinal Surgery",
        slug: "vitreoretinal-surgery",
        description: "Specialised surgery addressing conditions affecting the retina and vitreous of the eye, including epiretinal membranes, vitreomacular traction, and macular holes. Vitrectomy procedure typically lasts 40-80 minutes under local anaesthesia.",
        pricing: "Free (NHS funded)",
      },
      {
        name: "Minimally Invasive Glaucoma Surgery (MIGS)",
        slug: "minimally-invasive-glaucoma-surgery-migs",
        description: "Innovative surgical techniques to control intraocular pressure in glaucoma patients, typically combined with cataract surgery. Uses tiny incisions and microscopic equipment, minimising risks and facilitating speedier recovery compared to traditional glaucoma surgery. Suitable for mild to moderate glaucoma.",
        pricing: "Free (NHS funded, performed alongside cataract surgery)",
      },
      {
        name: "Private Cataract Surgery (Clarity)",
        slug: "private-healthcare-with-clarity",
        description: "Private self-pay cataract surgery through CHEC's Clarity brand, offering greater choice of consultants, treatment, and lens options including standard monofocal, premium extended monofocal, trifocal, and toric lenses. Finance available through Chrysalis Finance with interest-free options over 6-12 months.",
        pricing: "Private self-pay, finance available (6 months to 5 years, interest-free options over 6/10/12 months)",
      },
    ],
  },

  // =========================================================================
  // MOORFIELDS PRIVATE
  // =========================================================================
  {
    name: "Moorfields Private",
    slug: "moorfields-private",
    website: "https://www.moorfields.nhs.uk/private",
    about: "Moorfields Private is the private patient division of Moorfields Eye Hospital NHS Foundation Trust, the oldest and largest eye hospital in the world. With a history spanning over 200 years, Moorfields is a world-renowned centre of excellence for ophthalmic research, education, and clinical care. The private service provides access to the same consultant specialists who lead NHS care, covering every sub-specialty of ophthalmology. Patients benefit from cutting-edge research, the latest treatments, and two convenient central London locations.",
    brandColor: "#003865",
    isPreferredPartner: false,
    storeCount: 2,
    nhsFunded: false,
    privateSelfPay: true,
    googleReview: { rating: 3.8, reviewCount: 143, source: "Google" },
    keyFacts: [
      "Part of Moorfields Eye Hospital NHS Foundation Trust",
      "World-renowned centre of excellence",
      "Access to cutting-edge research and treatments",
      "Consultant specialists in every sub-specialty",
      "Two central London locations",
    ],
    bookingUrl: "https://www.moorfields.nhs.uk/private/locations",
    clinics: [
      { name: "Moorfields Private Eye Hospital", slug: "city-road", address: "9-11 Bath Street, London, EC1V 9LF", postcode: "EC1V 9LF", phone: "020 7566 2803", lat: 51.5265, lng: -0.0888, clinicUrl: "https://www.moorfields.nhs.uk/private/locations/moorfields-private-bath-street" },
      { name: "Moorfields Private Eye Centre", slug: "harley-street", address: "50-52 New Cavendish Street, London, W1G 8TL", postcode: "W1G 8TL", phone: "020 7566 2803", lat: 51.5199, lng: -0.1448, clinicUrl: "https://www.moorfields.nhs.uk/private/locations/moorfields-private-new-cavendish-street" },
    ],
    services: [
      {
        name: "Cataract Surgery",
        slug: "cataract-surgery",
        description: "Premium cataract surgery with access to the latest lens implant technology, including multifocal, toric, and extended depth of focus lenses. Performed by world-leading consultant ophthalmologists at Moorfields' state-of-the-art surgical suites. Comprehensive pre-operative assessment and post-operative care included.",
        pricing: "From £3,500 per eye",
      },
      {
        name: "Laser Eye Surgery",
        slug: "laser-eye-surgery",
        description: "LASIK and PRK laser vision correction performed by experienced refractive surgeons using the latest excimer laser technology. Suitable for short-sightedness, long-sightedness, and astigmatism. Thorough pre-operative screening ensures suitability and optimal outcomes.",
        pricing: "From £2,500 per eye",
      },
      {
        name: "Glaucoma Treatment",
        slug: "glaucoma-treatment",
        description: "Comprehensive glaucoma management from diagnosis through to advanced surgical intervention. Includes medical therapy, laser treatments (SLT, YAG PI), trabeculectomy, tube shunt surgery, and minimally invasive glaucoma surgery (MIGS). Access to clinical trials and the latest research.",
        pricing: "Consultation from £250",
      },
      {
        name: "Retinal Surgery",
        slug: "retinal-surgery",
        description: "Expert vitreoretinal surgery for conditions including retinal detachment, macular hole, epiretinal membrane, diabetic retinopathy, and vitreous haemorrhage. Performed by subspecialist vitreoretinal surgeons with access to the most advanced surgical equipment.",
        pricing: "From £4,000",
      },
      {
        name: "Corneal Treatment",
        slug: "corneal-treatment",
        description: "Specialist corneal services including corneal transplantation (penetrating and lamellar keratoplasty), corneal cross-linking for keratoconus, pterygium surgery, and management of corneal infections and dystrophies. One of the world's leading corneal units.",
        pricing: "From £3,000",
      },
      {
        name: "Oculoplastics",
        slug: "oculoplastics",
        description: "Eyelid and orbital surgery including blepharoplasty, ptosis repair, entropion/ectropion correction, eyelid reconstruction, orbital decompression for thyroid eye disease, and lacrimal (tear duct) surgery. Performed by specialist oculoplastic surgeons.",
        pricing: "From £2,000",
      },
      {
        name: "Macular Degeneration Treatment",
        slug: "macular-degeneration",
        description: "AMD treatment including anti-VEGF injections (ranibizumab, aflibercept, faricimab) for wet macular degeneration. Access to the latest clinical trials and emerging therapies. Comprehensive retinal imaging and monitoring with OCT and OCT angiography.",
        pricing: "From £800 per injection",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Returns an array of all provider slugs */
export function getAllProviderSlugs(): string[] {
  return surgeryProviders.map((p) => p.slug);
}

/** Finds a provider by its URL slug */
export function getProviderBySlug(slug: string): SurgeryProvider | undefined {
  return surgeryProviders.find((p) => p.slug === slug);
}

/** Returns the preferred partner provider */
export function getPreferredPartner(): SurgeryProvider {
  return surgeryProviders.find((p) => p.isPreferredPartner)!;
}

/** Returns all clinics across all providers, with provider metadata attached */
export function getAllClinics(): (SurgeryClinic & {
  providerName: string;
  providerSlug: string;
})[] {
  return surgeryProviders.flatMap((provider) =>
    provider.clinics.map((clinic) => ({
      ...clinic,
      providerName: provider.name,
      providerSlug: provider.slug,
    })),
  );
}
