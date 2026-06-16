// ---------------------------------------------------------------------------
// UK eye tests data — every type of eye test offered by UK opticians
// ---------------------------------------------------------------------------

export type EyeTest = {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  cost: string;
  whoNeeds: string[];
  whatToExpect: string[];
  frequency: string;
  icon: string;
  relatedTests: string[];
  nhsCovered: boolean;
};

// ---------------------------------------------------------------------------
// Comprehensive UK eye test types
// ---------------------------------------------------------------------------

export const eyeTests: EyeTest[] = [
  // ─── Standard Eye Test ─────────────────────────────────────────────
  {
    slug: "standard-eye-test",
    name: "Standard Eye Test",
    shortDescription:
      "A comprehensive routine sight test to check your vision and the health of your eyes.",
    fullDescription: `A standard eye test — formally known as a sight test — is the foundation of good eye health care in the UK. During this appointment, a qualified optometrist will assess your visual acuity, check your prescription for glasses or contact lenses, and examine the internal and external health of your eyes. The test can detect early signs of conditions such as glaucoma, cataracts, macular degeneration, and even general health issues like diabetes and high blood pressure.

The College of Optometrists recommends that most adults have a routine eye test at least every two years, though your optometrist may advise more frequent visits depending on your age, health, and family history. Even if you feel your eyesight is perfect, regular testing is essential because many eye conditions develop gradually without noticeable symptoms.

In the UK, a standard private eye test typically costs between £20 and £35, though many high-street opticians offer free tests as part of promotional deals. If you qualify for an NHS-funded sight test, you will pay nothing at all. Either way, it is one of the most important health checks you can have — protecting your sight starts with a simple appointment.`,
    duration: "20–30 minutes",
    cost: "£20–£35 privately, or free if you qualify for an NHS-funded sight test",
    whoNeeds: [
      "All adults as part of routine health care",
      "Anyone noticing changes in their vision",
      "People experiencing headaches or eye strain",
      "Contact lens wearers (in addition to contact lens check-ups)",
      "Those with a family history of eye conditions",
      "Anyone who has not had an eye test in over two years",
    ],
    whatToExpect: [
      "Your optometrist will ask about your general health, medications, family history, and any vision concerns",
      "A letter chart test (or similar) measures how clearly you can see at various distances",
      "A refraction test determines whether you need glasses or contact lenses, and your exact prescription",
      "An examination of the front of your eye using a slit lamp microscope",
      "Your optometrist will look at the back of your eye (retina) using an ophthalmoscope or retinal camera",
      "An eye pressure check (tonometry) to screen for glaucoma",
      "Your results and any recommendations are discussed at the end of the appointment",
    ],
    frequency: "Every 2 years for most adults; annually if over 70, diabetic, or at higher risk",
    icon: "eye",
    relatedTests: [
      "nhs-eye-test",
      "oct-scan",
      "visual-field-test",
      "contact-lens-fitting",
    ],
    nhsCovered: false,
  },

  // ─── NHS Eye Test ──────────────────────────────────────────────────
  {
    slug: "nhs-eye-test",
    name: "NHS Eye Test",
    shortDescription:
      "A free NHS-funded sight test for those who qualify, covering the same checks as a standard eye test.",
    fullDescription: `An NHS eye test is clinically identical to a standard private sight test — you receive the same thorough examination of your vision and eye health. The difference is that the cost is covered by the NHS, so you pay nothing. The NHS also provides an optical voucher to help with the cost of glasses or contact lenses if you need them.

You are entitled to a free NHS sight test if you fall into certain groups. These include children under 16 (or under 19 and in full-time education), adults aged 60 and over, people diagnosed with diabetes or glaucoma, those on certain means-tested benefits (such as Universal Credit, Income Support, or Pension Credit), and people who are registered blind or partially sighted. If you are aged 40 or over and have a close relative (parent, sibling, or child) diagnosed with glaucoma, you also qualify for free testing.

If you are unsure whether you qualify, your local optician can check your eligibility when you book. It is worth noting that the NHS sight test is available at almost every optician in the UK — you do not need to go to a hospital or specialist clinic. Simply ask for an NHS sight test when booking your appointment.`,
    duration: "20–30 minutes",
    cost: "Free for eligible patients; an NHS optical voucher may also help towards the cost of glasses",
    whoNeeds: [
      "Children under 16 (or under 19 in full-time education)",
      "Adults aged 60 and over",
      "People with diabetes or glaucoma",
      "Those receiving qualifying means-tested benefits such as Universal Credit or Income Support",
      "People aged 40+ with an immediate family member diagnosed with glaucoma",
      "Registered blind or partially sighted individuals",
      "Prisoners and those on probation",
      "People prescribed complex lenses",
    ],
    whatToExpect: [
      "The same comprehensive examination as a standard private eye test",
      "Your optometrist checks your eligibility by verifying your details",
      "A full assessment of visual acuity, prescription, and eye health",
      "If you need glasses, you may receive an NHS optical voucher towards the cost",
      "Your optometrist will advise when to return for your next test",
    ],
    frequency: "Every 2 years for most eligible groups; annually for those with diabetes or aged over 70",
    icon: "shield",
    relatedTests: [
      "standard-eye-test",
      "childrens-eye-test",
      "diabetic-eye-screening",
      "home-visit-eye-test",
    ],
    nhsCovered: true,
  },

  // ─── Children's Eye Test ───────────────────────────────────────────
  {
    slug: "childrens-eye-test",
    name: "Children's Eye Test",
    shortDescription:
      "A sight test tailored for babies, toddlers, and school-age children to catch vision problems early.",
    fullDescription: `Children's eye tests are specially adapted to suit the age and development stage of your child. Good vision is essential for learning, social development, and overall wellbeing, yet many children do not realise they have a sight problem because they have never known anything different. Detecting and treating conditions such as amblyopia (lazy eye), squint (strabismus), and refractive errors early gives the best chance of successful correction.

All children in the UK are entitled to free NHS-funded sight tests. The NHS recommends that children have their first eye test before they start school — ideally around age three or four — and then regularly throughout their school years. Many areas also have vision screening programmes in Reception year (age 4–5), but this is not a substitute for a full eye test with an optometrist.

You do not need to wait until your child can read to book an eye test. Optometrists use age-appropriate methods such as picture charts, shape-matching games, and objective measurement techniques that do not require any verbal response from your child. If your child is struggling at school, sitting too close to the television, or complaining of headaches, an eye test should be a first step.`,
    duration: "20–40 minutes depending on the child's age and cooperation",
    cost: "Free — all children under 16 (and under 19 in full-time education) qualify for NHS-funded sight tests",
    whoNeeds: [
      "All children, ideally from around age three",
      "Children starting school for the first time",
      "Any child showing signs of squinting, sitting too close to screens, or tilting their head",
      "Children struggling to read or concentrate at school",
      "Children with a family history of squint, lazy eye, or other eye conditions",
      "Babies and toddlers if parents have any concerns about their vision",
    ],
    whatToExpect: [
      "A friendly, child-focused environment to help your child feel relaxed",
      "Age-appropriate vision tests using pictures, shapes, or letters depending on the child's ability",
      "An assessment of how well both eyes work together (binocular vision)",
      "A check for squint or lazy eye",
      "The optometrist may use drops to dilate the pupils for a more thorough examination if needed",
      "Results and any referral recommendations are discussed with the parent or guardian",
    ],
    frequency: "Annually for school-age children; more often if a problem is detected or being monitored",
    icon: "child",
    relatedTests: [
      "nhs-eye-test",
      "standard-eye-test",
      "colour-vision-test",
    ],
    nhsCovered: true,
  },

  // ─── Contact Lens Fitting & Check-up ──────────────────────────────
  {
    slug: "contact-lens-fitting",
    name: "Contact Lens Fitting & Check-up",
    shortDescription:
      "A specialist appointment to fit, assess, or review your contact lenses for comfort, safety, and clear vision.",
    fullDescription: `A contact lens fitting is a separate appointment from your standard sight test and is required for anyone who wants to start wearing contact lenses, change their lens type, or have their existing lenses reviewed. During the fitting, your optometrist or contact lens optician will take detailed measurements of your eyes, assess your tear film quality, and recommend the most suitable lens type and material for your lifestyle and prescription.

If you are a new wearer, the appointment will include a teach session where you learn how to insert, remove, and care for your lenses safely. Your practitioner will check the fit of the lenses on your eyes and ensure they provide clear, comfortable vision. A follow-up appointment is usually booked to confirm everything is working well before your prescription is finalised.

Contact lens check-ups are legally required at least once a year in the UK. Your contact lens prescription (known as a specification) is only valid while your check-ups are up to date. These appointments verify that your lenses remain the right fit, your eyes are healthy, and your prescription has not changed. Skipping check-ups can lead to undetected problems such as corneal infections, dry eye, or oxygen deprivation to the cornea — all of which can affect your long-term eye health.`,
    duration: "30–60 minutes for a first fitting; 15–30 minutes for a routine check-up",
    cost: "£30–£60 for a fitting; check-ups often included in monthly lens plans (typically £15–£40 per month). Not covered by the NHS unless clinically necessary",
    whoNeeds: [
      "Anyone wanting to wear contact lenses for the first time",
      "Current contact lens wearers due for their annual or six-monthly check-up",
      "People wanting to switch from glasses to contacts or try a different lens type",
      "Those experiencing discomfort, dryness, or redness with their current lenses",
      "People interested in specialist lenses such as toric (for astigmatism) or multifocal lenses",
      "Sports players and active individuals looking for an alternative to glasses",
    ],
    whatToExpect: [
      "A discussion about your lifestyle, work, hobbies, and what you want from contact lenses",
      "Detailed measurements of your corneal curvature and eye surface",
      "Assessment of your tear film to determine suitability for lenses",
      "Trial lenses placed on your eyes to check fit, comfort, and vision",
      "A teach session for new wearers covering insertion, removal, and hygiene",
      "A follow-up appointment to confirm the lenses are working well",
      "For check-ups: an assessment of lens condition, fit, and eye health",
    ],
    frequency: "At least once a year; every 6 months for some lens types or if recommended by your optician",
    icon: "contact-lens",
    relatedTests: [
      "standard-eye-test",
      "dry-eye-assessment",
      "oct-scan",
    ],
    nhsCovered: false,
  },

  // ─── OCT Scan ──────────────────────────────────────────────────────
  {
    slug: "oct-scan",
    name: "OCT Scan (Optical Coherence Tomography)",
    shortDescription:
      "An advanced 3D scan of the back of your eye that detects conditions years before symptoms appear.",
    fullDescription: `An OCT (Optical Coherence Tomography) scan is one of the most significant advances in eye care technology. It uses light waves to take highly detailed, cross-sectional images of your retina, optic nerve, and the layers beneath the surface of the eye — areas that cannot be fully examined with a traditional eye test alone. Think of it as the eye equivalent of an MRI scan: it reveals what is happening beneath the surface.

An OCT scan can detect the earliest signs of serious conditions including glaucoma, age-related macular degeneration (AMD), diabetic retinopathy, macular holes, and vitreous detachment — often years before you notice any change in your vision. Because many of these conditions cause irreversible damage if left untreated, early detection through OCT scanning can genuinely save your sight.

Most high-street opticians now offer OCT scanning as an optional add-on to your standard eye test. While not yet routinely funded by the NHS, the scan is quick, painless, and non-invasive. A growing number of eye care professionals recommend it as a baseline scan for all patients over 25, creating a reference image that future scans can be compared against to spot even the smallest changes over time.`,
    duration: "5–10 minutes (usually performed alongside a standard eye test)",
    cost: "£10–£39 as an add-on to a standard eye test. Not routinely available on the NHS but may be used in hospital eye clinics",
    whoNeeds: [
      "Anyone wanting the most thorough possible eye health check",
      "Adults over 25 as a baseline scan for future comparison",
      "People with a family history of glaucoma, macular degeneration, or diabetic eye disease",
      "Those with diabetes, high blood pressure, or other conditions affecting the eyes",
      "Anyone with unexplained changes in vision",
      "Contact lens wearers wanting to monitor corneal health",
      "People already diagnosed with an eye condition who need ongoing monitoring",
    ],
    whatToExpect: [
      "You sit in front of the OCT machine and rest your chin on a support",
      "You look at a fixation target inside the instrument",
      "The scan takes just a few seconds per eye — there is no flash, no puff of air, and no contact with your eye",
      "The machine produces a detailed 3D image of your retina and optic nerve",
      "Your optometrist reviews the images and discusses any findings with you",
      "Results are stored digitally so future scans can be compared side by side",
    ],
    frequency: "Annually, or as recommended by your optometrist based on your risk profile",
    icon: "scan",
    relatedTests: [
      "standard-eye-test",
      "visual-field-test",
      "diabetic-eye-screening",
      "glaucoma-assessment",
    ],
    nhsCovered: false,
  },

  // ─── Visual Field Test ─────────────────────────────────────────────
  {
    slug: "visual-field-test",
    name: "Visual Field Test (Perimetry)",
    shortDescription:
      "A test that maps your peripheral (side) vision to detect blind spots and conditions like glaucoma.",
    fullDescription: `A visual field test — also known as perimetry — measures the full extent of your peripheral (side) vision and identifies any blind spots or areas of reduced sensitivity. It is one of the most important diagnostic tools in ophthalmology and optometry, particularly for detecting and monitoring glaucoma, which often attacks peripheral vision first without any noticeable symptoms.

During the test, you look straight ahead into a bowl-shaped instrument and press a button each time you see a small light flash in your side vision. The test is performed one eye at a time and typically takes a few minutes per eye. It is completely painless and non-invasive. The results are plotted as a map of your visual field, showing any areas where your sensitivity is reduced compared to what is normal for your age.

Visual field testing is a routine part of glaucoma monitoring and is often included in a standard NHS eye test if your optometrist identifies risk factors. It is also used to assess fitness to drive (the DVLA has specific visual field requirements), to investigate neurological conditions affecting the visual pathway, and to monitor patients taking certain medications such as hydroxychloroquine (Plaquenil) that can affect the retina.`,
    duration: "5–15 minutes per eye",
    cost: "Often included as part of a standard eye test at no extra charge; £15–£30 if performed separately. Free on the NHS when clinically indicated",
    whoNeeds: [
      "Anyone being screened or monitored for glaucoma",
      "People with a family history of glaucoma",
      "Drivers who need to meet DVLA visual field standards",
      "Patients with neurological conditions such as stroke, brain tumours, or multiple sclerosis",
      "People taking medications known to affect the retina (e.g. hydroxychloroquine)",
      "Anyone who has noticed gaps or missing areas in their vision",
    ],
    whatToExpect: [
      "You sit in front of a bowl-shaped instrument (perimeter) with one eye covered",
      "You focus on a central fixation light and press a button whenever you see a flash of light appear in your peripheral vision",
      "The test is repeated for the other eye",
      "The machine generates a map of your visual field highlighting any areas of reduced sensitivity",
      "Your optometrist or ophthalmologist discusses the results and any further action needed",
    ],
    frequency: "Annually for glaucoma patients; every 1–2 years for those at risk; as needed for DVLA or neurological assessments",
    icon: "grid",
    relatedTests: [
      "glaucoma-assessment",
      "oct-scan",
      "dvla-driving-vision-test",
      "standard-eye-test",
    ],
    nhsCovered: true,
  },

  // ─── Diabetic Eye Screening ────────────────────────────────────────
  {
    slug: "diabetic-eye-screening",
    name: "Diabetic Eye Screening",
    shortDescription:
      "A specialist screening programme for people with diabetes to detect diabetic retinopathy before it affects your sight.",
    fullDescription: `Diabetic eye screening is a vital NHS programme offered to everyone aged 12 and over who has been diagnosed with diabetes (Type 1 or Type 2). The screening specifically looks for diabetic retinopathy — a complication where high blood sugar levels damage the tiny blood vessels in the retina at the back of the eye. Left undetected and untreated, diabetic retinopathy is one of the leading causes of preventable blindness in working-age adults in the UK.

The screening is different from a standard eye test. A trained screener takes high-resolution photographs of the retina after applying drops to dilate your pupils. These images are then graded by specialists who look for signs of damage to the blood vessels — from the earliest, symptomless stages through to more advanced changes that require treatment. If problems are found, you will be referred to a hospital eye clinic for further assessment and, if necessary, treatment such as laser therapy or injections.

You should receive an invitation for diabetic eye screening automatically once your GP has recorded your diabetes diagnosis. Screening is offered annually, though you may be invited more frequently if previous results have shown changes. It is absolutely essential that you attend every screening appointment — diabetic retinopathy often has no symptoms in its early stages, and early treatment is far more effective than late intervention. This screening is separate from your routine optician's eye test, and you should continue to have both.`,
    duration: "15–30 minutes (including time for pupil dilation drops to take effect)",
    cost: "Free — fully funded by the NHS for all eligible patients with diabetes",
    whoNeeds: [
      "Everyone aged 12 and over diagnosed with Type 1 or Type 2 diabetes",
      "Pregnant women with pre-existing diabetes (screened more frequently during pregnancy)",
      "Anyone with diabetes who has not attended screening in over a year",
    ],
    whatToExpect: [
      "You receive an invitation letter from the local diabetic eye screening programme",
      "Eye drops are applied to dilate your pupils — these take about 20 minutes to work",
      "A screener takes digital photographs of the back of each eye using a specialist camera",
      "The photographs are graded by trained specialists and you receive your results by post",
      "If any changes are detected, you may be invited back sooner or referred to a hospital eye clinic",
      "Your vision will be blurry for a few hours after the drops — do not drive until it clears",
    ],
    frequency: "Annually for most people with diabetes; more frequently if changes are detected or during pregnancy",
    icon: "camera",
    relatedTests: [
      "oct-scan",
      "standard-eye-test",
      "nhs-eye-test",
      "visual-field-test",
    ],
    nhsCovered: true,
  },

  // ─── Dry Eye Assessment ────────────────────────────────────────────
  {
    slug: "dry-eye-assessment",
    name: "Dry Eye Assessment",
    shortDescription:
      "A specialist assessment to diagnose the cause and severity of dry, irritated, or watery eyes.",
    fullDescription: `Dry eye disease is one of the most common eye conditions in the UK, affecting millions of people of all ages. Despite its name, dry eye can cause symptoms ranging from gritty, burning, or stinging sensations to excessive watering, redness, blurred vision, and tired eyes. A specialist dry eye assessment goes far beyond what a standard eye test covers, investigating the root cause of your symptoms so that treatment can be properly targeted.

During a dry eye assessment, your optometrist will evaluate your tear film in detail. This includes measuring tear production (often using the Schirmer test), assessing the quality and stability of your tear film (tear break-up time), and examining the meibomian glands in your eyelids — these glands produce the oily layer that prevents your tears from evaporating too quickly. Many cases of dry eye are caused by meibomian gland dysfunction (MGD) rather than simply not producing enough tears.

Based on the findings, your optometrist will recommend a personalised treatment plan. This may include lubricating eye drops, warm compresses, lid hygiene routines, omega-3 supplements, or more advanced in-practice treatments such as meibomian gland expression, intense pulsed light (IPL) therapy, or punctal plugs. Modern dry eye management has advanced significantly, and most patients can achieve meaningful relief with the right combination of treatments tailored to their specific type of dry eye.`,
    duration: "20–40 minutes",
    cost: "£50–£100 for a specialist dry eye clinic appointment. Not routinely funded by the NHS, though your GP or optometrist may refer you to a hospital eye clinic for severe cases",
    whoNeeds: [
      "Anyone experiencing persistent dry, gritty, burning, or watery eyes",
      "Contact lens wearers with comfort issues",
      "People who spend long hours at a screen",
      "Those taking medications that can cause dry eye (e.g. antihistamines, antidepressants, blood pressure medications)",
      "Post-menopausal women (hormonal changes increase dry eye risk)",
      "Anyone with autoimmune conditions such as Sjogren's syndrome or rheumatoid arthritis",
      "Patients considering or recovering from laser eye surgery",
    ],
    whatToExpect: [
      "A detailed discussion of your symptoms, lifestyle, medications, and health history",
      "Examination of your eyelids and meibomian glands under magnification",
      "Measurement of tear production and tear film quality",
      "Assessment of tear break-up time to see how quickly your tears evaporate",
      "In some clinics, imaging of the meibomian glands (meibography)",
      "A personalised treatment plan based on the type and severity of your dry eye",
      "Advice on environmental changes, screen habits, and ongoing management",
    ],
    frequency: "As needed; follow-up appointments every 4–12 weeks during active treatment, then periodically for ongoing management",
    icon: "droplet",
    relatedTests: [
      "standard-eye-test",
      "contact-lens-fitting",
      "blepharitis-assessment",
    ],
    nhsCovered: false,
  },

  // ─── Colour Vision Test ────────────────────────────────────────────
  {
    slug: "colour-vision-test",
    name: "Colour Vision Test",
    shortDescription:
      "A test to detect colour vision deficiency (colour blindness) using Ishihara plates or more detailed methods.",
    fullDescription: `A colour vision test identifies whether you have any difficulty distinguishing between certain colours — commonly known as colour blindness, although total colour blindness is extremely rare. The most common form is red-green colour vision deficiency, which affects approximately 1 in 12 men and 1 in 200 women in the UK. Many people live with colour vision deficiency without realising it, particularly if they have had it from birth.

The most widely used screening tool is the Ishihara test, which consists of a series of plates covered in coloured dots with numbers or patterns hidden within them. People with normal colour vision will see the numbers clearly, while those with a colour vision deficiency may see different numbers or none at all. For more detailed assessment, tests such as the Farnsworth D-15, the City University Test, or the anomaloscope can determine the exact type and severity of the deficiency.

Knowing your colour vision status is important for certain careers. Roles in the armed forces, police, fire service, aviation, maritime, electrical engineering, and some healthcare positions require specific colour vision standards. A colour vision test is also routinely part of children's eye examinations, as early detection allows teachers and parents to make appropriate adjustments to support the child's learning. While there is currently no cure for inherited colour vision deficiency, awareness of the condition and practical strategies can make a significant difference.`,
    duration: "5–15 minutes",
    cost: "Usually included as part of a standard eye test at no extra cost. If a standalone assessment is needed, expect to pay £15–£30",
    whoNeeds: [
      "Children having their first eye test — early detection helps with learning support",
      "Anyone applying for a career that requires specific colour vision standards (e.g. armed forces, police, fire service, aviation, electrical work)",
      "Adults who suspect they may have difficulty distinguishing certain colours",
      "People with a family history of colour vision deficiency",
      "Workers in industries where accurate colour recognition is safety-critical",
    ],
    whatToExpect: [
      "You are shown a series of Ishihara plates — circular patterns of coloured dots with numbers embedded in them",
      "You are asked to identify the numbers or trace a path through each plate",
      "The test is performed in good lighting conditions",
      "If a deficiency is suspected, further tests may be used to determine the type and severity",
      "Your optometrist will explain the results and any practical implications",
      "A certificate or report can be provided for employers if required",
    ],
    frequency: "Once is usually sufficient if results are normal; re-testing only if there is a clinical reason (e.g. acquired colour vision changes from medication or disease)",
    icon: "palette",
    relatedTests: [
      "standard-eye-test",
      "childrens-eye-test",
      "dvla-driving-vision-test",
    ],
    nhsCovered: true,
  },

  // ─── DVLA / Driving Vision Test ────────────────────────────────────
  {
    slug: "dvla-driving-vision-test",
    name: "DVLA / Driving Vision Test",
    shortDescription:
      "A vision assessment to confirm you meet the legal eyesight standards required for driving in the UK.",
    fullDescription: `In the UK, every driver is legally responsible for ensuring their eyesight meets the minimum standard for driving. The DVLA requires that you must be able to read a number plate from 20 metres away (20.5 metres for older-style plates). In clinical terms, this broadly equates to a visual acuity of 6/12 (or 0.5 on the decimal scale) on the Snellen chart, measured with both eyes open and with glasses or contact lenses if you normally wear them. You must also have an adequate field of vision — at least 120 degrees horizontally with no significant defects within the central 20 degrees.

An optometrist can carry out a driving vision assessment to determine whether you meet these standards. This is particularly important if you are a new driver preparing for your practical test, if you have been advised by the DVLA to have your vision checked, or if you have had any change in your eyesight or a medical condition that might affect your ability to drive safely. During your practical driving test, the examiner will ask you to read a number plate at the start — if you fail this, the test is terminated immediately.

It is worth knowing that the penalty for driving with eyesight below the legal standard is severe: you can be prosecuted, fined up to £1,000, and receive three penalty points. In a worst-case scenario — for example, if you cause an accident because of poor vision — you could face criminal charges for dangerous driving. If in any doubt about your eyesight, book a driving vision assessment with your local optician. It is a quick, straightforward check that could prevent a life-changing situation.`,
    duration: "10–20 minutes",
    cost: "£15–£30 as a standalone test. May be included as part of a standard eye test at no additional cost",
    whoNeeds: [
      "Learner drivers preparing for their practical driving test",
      "Drivers who have received a notice from the DVLA to have their vision checked",
      "Anyone who suspects their eyesight may no longer meet the driving standard",
      "Older drivers wanting reassurance that they still meet the legal requirement",
      "Professional drivers (HGV, bus, taxi, coach) who must meet higher visual standards",
      "Drivers returning to the road after eye surgery or an eye condition",
    ],
    whatToExpect: [
      "A number plate reading test at 20 metres to replicate the DVLA requirement",
      "A visual acuity test using a letter chart to measure your eyesight in clinical terms",
      "A visual field assessment to check your peripheral vision meets the driving standard",
      "If you wear glasses or contact lenses, the tests are carried out with your correction in place",
      "Your optometrist will advise whether you meet the standard and whether any action is needed",
      "A letter or certificate can be provided for the DVLA if requested",
    ],
    frequency: "Before your first driving test and whenever you have concerns about your eyesight. No routine interval required by law, but testing every 2 years as part of a standard eye test is advisable",
    icon: "car",
    relatedTests: [
      "standard-eye-test",
      "visual-field-test",
      "colour-vision-test",
    ],
    nhsCovered: false,
  },

  // ─── Emergency Eye Care ────────────────────────────────────────────
  {
    slug: "emergency-eye-care",
    name: "Emergency Eye Care",
    shortDescription:
      "Urgent same-day assessment for sudden eye problems such as pain, flashes, floaters, vision loss, or injuries.",
    fullDescription: `Emergency eye care — sometimes called urgent eye care or MECS (Minor Eye Conditions Service) — provides same-day or next-day assessment for sudden or worrying eye symptoms that need prompt attention but may not require a trip to A&E. Many optician practices across the UK are now accredited to provide emergency and urgent eye care, often funded by the NHS through local commissioning arrangements.

Common reasons to seek emergency eye care include sudden loss of vision, flashes of light or a sudden increase in floaters, a red or painful eye, something stuck in your eye, a chemical splash, sudden double vision, or a recent eye injury. These symptoms can indicate serious conditions such as retinal detachment, acute glaucoma, uveitis, or corneal ulcers — all of which require prompt diagnosis and treatment to prevent permanent damage to your sight.

If you experience a sudden eye problem, calling your local optician should be your first step — many can see you the same day and have the specialist equipment needed to examine your eyes thoroughly. This is often faster and more appropriate than attending A&E, where you may face long waits and staff may not have access to optometric equipment. If your optician identifies a condition that needs hospital treatment, they can refer you directly to the hospital eye service as an urgent case, often bypassing the usual waiting times.`,
    duration: "15–45 minutes depending on the nature of the problem",
    cost: "Free through NHS-funded MECS/urgent eye care schemes in many areas. Private emergency appointments typically £30–£60",
    whoNeeds: [
      "Anyone experiencing sudden vision loss or a noticeable change in vision",
      "People seeing new flashes of light or a sudden shower of floaters",
      "Anyone with a red, painful, or swollen eye",
      "People who have sustained an eye injury or have something stuck in their eye",
      "Anyone who has had a chemical splash in their eye",
      "People experiencing sudden double vision",
      "Those with a painful, watery eye that is sensitive to light",
    ],
    whatToExpect: [
      "A prompt triage call or assessment when you contact your optician",
      "Detailed questioning about your symptoms, when they started, and any relevant history",
      "A thorough examination using slit lamp, ophthalmoscope, and other specialist instruments",
      "Your optometrist may apply drops to dilate your pupils or numb your eye depending on the condition",
      "Diagnosis and treatment on the spot where possible (e.g. removal of a foreign body, prescription of eye drops)",
      "Urgent referral to a hospital eye clinic if specialist treatment is required",
    ],
    frequency: "As needed — seek help immediately when urgent eye symptoms arise",
    icon: "alert",
    relatedTests: [
      "standard-eye-test",
      "oct-scan",
      "visual-field-test",
    ],
    nhsCovered: true,
  },

  // ─── Home Visit Eye Test ───────────────────────────────────────────
  {
    slug: "home-visit-eye-test",
    name: "Home Visit Eye Test",
    shortDescription:
      "A full NHS-funded sight test carried out in your own home if you cannot visit an optician's practice.",
    fullDescription: `A home visit eye test — also known as a domiciliary eye test — is a full sight test carried out in your own home by a qualified optometrist or ophthalmic medical practitioner. This service is available on the NHS for people who cannot get to an optician's practice unaccompanied due to a physical or mental illness or disability. The clinical standard of the test is the same as you would receive in a high-street practice — portable equipment allows the optometrist to carry out all the necessary checks.

You are eligible for a free NHS home visit if leaving your home to attend an optician is not possible without help. This includes many elderly or housebound patients, people in care homes or nursing homes, those with severe mobility issues, and individuals with conditions such as advanced dementia or agoraphobia. The optometrist will bring all the equipment needed, including portable letter charts, a trial lens set, a slit lamp, and often a portable fundus camera.

To arrange a home visit, you can contact a domiciliary optical practice directly, ask your GP surgery for a recommendation, or call NHS 111 for guidance. Many local opticians also offer this service — it is worth asking when you call to book. The optometrist can dispense glasses during the visit or arrange for them to be delivered, making the entire process as convenient as possible for those who cannot easily leave their home.`,
    duration: "30–45 minutes",
    cost: "Free on the NHS for eligible patients. Private home visits typically £40–£80",
    whoNeeds: [
      "People who cannot leave their home unaccompanied due to physical or mental health conditions",
      "Elderly or housebound individuals",
      "Residents of care homes or nursing homes",
      "People with severe mobility difficulties",
      "Anyone whose condition makes travelling to an optician impractical or unsafe",
      "Carers can request a home visit on behalf of the person they look after",
    ],
    whatToExpect: [
      "You or your carer contacts a domiciliary optical practice to arrange a convenient appointment time",
      "A qualified optometrist visits your home with portable examination equipment",
      "The same clinical tests as a standard eye test are performed, including vision, prescription, and eye health checks",
      "If new glasses are needed, the optometrist can help you choose frames and arrange delivery",
      "You may receive an NHS optical voucher towards the cost of your glasses",
      "The optometrist will advise when your next test is due",
    ],
    frequency: "Every 2 years, or annually if clinically recommended",
    icon: "home",
    relatedTests: [
      "nhs-eye-test",
      "standard-eye-test",
      "emergency-eye-care",
    ],
    nhsCovered: true,
  },

  // ─── Glaucoma Assessment ───────────────────────────────────────────
  {
    slug: "glaucoma-assessment",
    name: "Glaucoma Assessment",
    shortDescription:
      "A focused assessment combining pressure checks, visual field testing, and optic nerve examination to detect or monitor glaucoma.",
    fullDescription: `Glaucoma is a group of eye conditions where damage to the optic nerve — usually caused by elevated pressure inside the eye — leads to gradual, irreversible loss of vision. It is the leading cause of irreversible blindness worldwide and affects around 700,000 people in the UK, with many more undiagnosed. A glaucoma assessment is a targeted evaluation that goes beyond a routine eye test to thoroughly investigate your risk and detect the condition at the earliest possible stage.

A comprehensive glaucoma assessment typically involves three key tests: tonometry (measuring the pressure inside your eyes), visual field testing (checking your peripheral vision for blind spots), and examination of the optic nerve head — either by direct observation through a dilated pupil or, increasingly, by OCT scan. Your optometrist will also consider risk factors such as your age, ethnicity (glaucoma is more common in people of African-Caribbean descent), family history, and the thickness of your corneas.

If you are aged 40 or over and have a parent, brother, sister, or child who has been diagnosed with glaucoma, you are entitled to a free NHS-funded eye test every year — and you should take up this offer. Early detection is critical because glaucoma damage cannot be reversed, only slowed or halted with treatment (usually daily eye drops or, in some cases, laser treatment or surgery). Many people with glaucoma have no symptoms until significant damage has already occurred, which is why regular screening is so important.`,
    duration: "20–40 minutes",
    cost: "Free as part of an NHS-funded eye test for those at risk. Privately, £30–£60 depending on the tests included",
    whoNeeds: [
      "People aged 40 and over with a first-degree relative (parent, sibling, or child) who has glaucoma",
      "Anyone whose optometrist has found raised eye pressure or suspicious optic nerve appearance",
      "People of African-Caribbean descent (higher risk of developing glaucoma)",
      "Those aged 60 and over (risk increases with age)",
      "People with very high myopia (short-sightedness)",
      "Patients already diagnosed with glaucoma who need ongoing monitoring",
      "Anyone using long-term steroid medications (oral or eye drops)",
    ],
    whatToExpect: [
      "Tonometry — measuring the pressure inside your eyes using a small instrument or puff of air",
      "Visual field test — pressing a button when you see lights flash in your peripheral vision",
      "Examination of your optic nerve using an ophthalmoscope or slit lamp with a special lens",
      "An OCT scan of the optic nerve and retinal nerve fibre layer may be performed",
      "Your corneal thickness may be measured (pachymetry) as this affects pressure readings",
      "Your optometrist will explain the results and, if necessary, refer you to a specialist",
    ],
    frequency: "Annually for those at risk; every 6–12 months for diagnosed glaucoma patients under treatment",
    icon: "pressure",
    relatedTests: [
      "visual-field-test",
      "oct-scan",
      "standard-eye-test",
      "nhs-eye-test",
    ],
    nhsCovered: true,
  },

  // ─── Retinal Photography ──────────────────────────────────────────
  {
    slug: "retinal-photography",
    name: "Retinal Photography",
    shortDescription:
      "A high-resolution photograph of the back of your eye to create a permanent record of your retinal health.",
    fullDescription: `Retinal photography — also known as fundus photography — captures a detailed, high-resolution image of the retina, optic nerve, and blood vessels at the back of your eye. These photographs create a permanent visual record that your optometrist can use to monitor changes in your eye health over time. While an optometrist can examine the retina directly during a standard eye test, photographs provide an objective, shareable, and comparable record that is invaluable for long-term monitoring.

Most modern retinal cameras are non-mydriatic, meaning they can take photographs without the need to dilate your pupils with drops — the camera uses a brief flash of light, and the process is over in seconds. Some opticians use ultra-wide-field cameras that can capture up to 200 degrees of the retina in a single image, compared to the 45 degrees visible through a traditional ophthalmoscope. This wider view can reveal peripheral retinal problems that might otherwise be missed.

Retinal photography is widely available as an add-on to a standard eye test at most high-street opticians. While it is not a replacement for a full OCT scan (which shows the layers beneath the retinal surface), it is an excellent complementary tool and is particularly useful for tracking conditions such as diabetic retinopathy, macular changes, and hypertensive retinopathy. Many opticians include it as standard in their enhanced eye test packages.`,
    duration: "2–5 minutes",
    cost: "£5–£15 as an add-on to a standard eye test. Some opticians include it free of charge",
    whoNeeds: [
      "Anyone wanting a visual record of their retinal health for future comparison",
      "People with diabetes, high blood pressure, or other conditions that affect the eyes",
      "Those with a family history of retinal conditions",
      "Patients being monitored for macular degeneration or other retinal changes",
      "Anyone who finds pupil dilation drops inconvenient — non-mydriatic photography is a practical alternative",
    ],
    whatToExpect: [
      "You rest your chin on a support and look into the camera",
      "There is a brief flash of light as each eye is photographed — this may cause temporary dazzle",
      "No drops are usually needed, though some cameras work better with dilated pupils",
      "The photographs are instantly available for your optometrist to review",
      "Images are stored in your patient record for comparison at future visits",
    ],
    frequency: "Annually, or as part of each eye test appointment",
    icon: "camera",
    relatedTests: [
      "oct-scan",
      "standard-eye-test",
      "diabetic-eye-screening",
    ],
    nhsCovered: false,
  },

  // ─── Blepharitis Assessment ────────────────────────────────────────
  {
    slug: "blepharitis-assessment",
    name: "Blepharitis Assessment",
    shortDescription:
      "A specialist examination of the eyelids to diagnose and manage blepharitis — a common cause of sore, red, and crusty eyelids.",
    fullDescription: `Blepharitis is a chronic inflammatory condition affecting the eyelids that is extremely common in the UK. It causes symptoms including red, swollen, or itchy eyelids, crusty or flaky debris at the base of the eyelashes, a gritty or burning sensation, and in many cases contributes to or worsens dry eye disease. Although blepharitis is rarely sight-threatening, it is often uncomfortable and persistent, requiring ongoing management rather than a one-off cure.

A blepharitis assessment involves a detailed examination of the eyelid margins, eyelashes, and meibomian glands under magnification using a slit lamp. Your optometrist will look for signs of bacterial overgrowth, Demodex mite infestation (a surprisingly common contributor), meibomian gland dysfunction, and any associated skin conditions such as rosacea or seborrheic dermatitis. Understanding the specific type of blepharitis you have is essential for choosing the right treatment approach.

Treatment is tailored to the cause and severity and may include a daily lid hygiene routine (warm compresses and lid scrubs), antibiotic ointments or drops, anti-inflammatory treatments, and in-practice procedures such as BlephEx (mechanical lid debridement) or thermal pulsation therapy (LipiFlow). Many opticians now run dedicated blepharitis and lid health clinics as part of their dry eye services, offering a level of specialist care that was previously only available in hospital settings.`,
    duration: "20–30 minutes",
    cost: "£40–£80 for a specialist assessment. In-practice treatments such as BlephEx may cost £100–£250 per session. Not routinely funded by the NHS",
    whoNeeds: [
      "Anyone with persistently sore, red, crusty, or flaky eyelids",
      "People with recurrent styes or chalazia (meibomian cysts)",
      "Those with dry eye symptoms that have not responded to standard lubricants",
      "Contact lens wearers experiencing lid discomfort",
      "People with skin conditions such as rosacea or seborrheic dermatitis",
      "Anyone noticing loss of eyelashes or unusual eyelid appearance",
    ],
    whatToExpect: [
      "A detailed discussion of your symptoms, how long you have had them, and what you have tried so far",
      "Close examination of your eyelid margins and eyelashes under the slit lamp",
      "Assessment of your meibomian glands and tear film",
      "In some cases, a sample of eyelash debris may be examined for Demodex mites",
      "A personalised treatment plan including home care and any in-practice treatments recommended",
      "Guidance on long-term management, as blepharitis is typically a chronic condition",
    ],
    frequency: "Initial assessment followed by review appointments every 4–8 weeks during treatment, then periodically for ongoing management",
    icon: "eyelid",
    relatedTests: [
      "dry-eye-assessment",
      "standard-eye-test",
      "contact-lens-fitting",
    ],
    nhsCovered: false,
  },

  // ─── Myopia Management Consultation ────────────────────────────────
  {
    slug: "myopia-management",
    name: "Myopia Management Consultation",
    shortDescription:
      "A specialist consultation for children and young people with progressing short-sightedness, using evidence-based treatments to slow myopia progression.",
    fullDescription: `Myopia (short-sightedness) is increasing rapidly worldwide, and the UK is no exception. Research suggests that around 30% of the UK population is now myopic, and the prevalence is rising in children. While glasses and contact lenses correct the blurred distance vision caused by myopia, they do not address the underlying problem — the eyeball growing too long. Higher levels of myopia significantly increase the lifetime risk of serious eye conditions including retinal detachment, myopic macular degeneration, glaucoma, and cataracts.

Myopia management is a proactive, evidence-based approach that aims to slow the rate at which a child's myopia progresses. This reduces their final prescription and, crucially, lowers their risk of sight-threatening complications in adulthood. The main treatments currently available in the UK include specially designed spectacle lenses (such as MiYOSMART or Stellest), soft multifocal contact lenses designed for myopia control, orthokeratology (ortho-k) lenses worn overnight to reshape the cornea, and low-dose atropine eye drops.

A myopia management consultation typically begins with a thorough assessment of your child's current prescription, the rate at which their myopia has been changing, their axial length (the length of the eyeball), lifestyle factors such as time spent outdoors and screen time, and family history. Based on this information, your optometrist will recommend the most appropriate treatment strategy. Myopia management is a growing area of optometry in the UK, and an increasing number of practices now offer dedicated clinics.`,
    duration: "30–45 minutes for the initial consultation",
    cost: "£50–£150 for the initial consultation. Ongoing treatment costs vary: specialist spectacle lenses £200–£400, myopia control contact lenses £30–£60 per month, ortho-k lenses £400–£800 for the first year. Not funded by the NHS",
    whoNeeds: [
      "Children and teenagers whose myopia is progressing (prescription getting stronger each year)",
      "Children with one or both parents who are myopic",
      "Young children (under 10) who have already developed myopia — earlier onset tends to lead to higher final prescriptions",
      "Parents concerned about their child's increasing screen time and its effect on their eyesight",
      "Any child or young person with myopia above -1.00 dioptres",
    ],
    whatToExpect: [
      "A full review of your child's prescription history and rate of myopia progression",
      "Measurement of axial length (the length of the eyeball) using optical biometry",
      "Discussion of lifestyle factors including time spent outdoors, near work, and screen time",
      "Assessment of risk factors for further progression",
      "A clear explanation of the available myopia management options, their evidence base, and costs",
      "Agreement on a treatment plan and schedule for monitoring appointments",
    ],
    frequency: "Review appointments every 6 months during active treatment to monitor progression and adjust the management plan",
    icon: "trending",
    relatedTests: [
      "childrens-eye-test",
      "contact-lens-fitting",
      "standard-eye-test",
      "oct-scan",
    ],
    nhsCovered: false,
  },

  // ─── Cataract Assessment ───────────────────────────────────────────
  {
    slug: "cataract-assessment",
    name: "Cataract Assessment",
    shortDescription:
      "An examination to detect, monitor, or assess the impact of cataracts on your vision and determine whether referral for surgery is appropriate.",
    fullDescription: `A cataract is a clouding of the natural lens inside your eye. It is an extremely common age-related change — most people will develop some degree of cataract by the time they reach their 70s. In the early stages, cataracts may cause no noticeable symptoms, but as they develop, you may experience blurred or misty vision, increased glare from headlights or bright lights, colours appearing faded or washed out, and difficulty seeing in low light. A cataract assessment determines the extent of your cataract, how much it is affecting your vision, and whether the time is right for a referral for surgery.

During the assessment, your optometrist will examine the lens of your eye using a slit lamp microscope, often after dilating your pupils with drops to get a clearer view. They will also measure your visual acuity to establish how much your vision is being affected and discuss the impact on your daily life — your ability to read, drive, watch television, and carry out your normal activities. The NHS guidelines for cataract surgery referral are based on the impact on your quality of life, not simply on the clinical appearance of the cataract.

Cataract surgery is one of the most commonly performed operations in the UK, with around 450,000 procedures carried out each year on the NHS. It is a highly successful day-case procedure that typically takes 15–30 minutes under local anaesthetic. Your optometrist will refer you to a hospital eye department or an accredited independent sector treatment centre when your cataracts are significantly affecting your daily life. In the meantime, updating your glasses prescription can often improve your vision while you are waiting.`,
    duration: "20–30 minutes",
    cost: "Free as part of an NHS-funded eye test. Private cataract assessments typically £30–£50. Cataract surgery is free on the NHS",
    whoNeeds: [
      "Anyone experiencing gradually worsening blurred or cloudy vision",
      "People noticing increased glare or haloes around lights, especially when driving at night",
      "Those over 60 who have been told they are developing cataracts",
      "Anyone whose glasses prescription changes are no longer improving their vision",
      "People finding it harder to see in dim lighting or finding colours look faded",
      "Those with a history of eye injuries, steroid use, or diabetes (which can accelerate cataract development)",
    ],
    whatToExpect: [
      "Your optometrist will review your symptoms and how your vision is affecting your daily activities",
      "Visual acuity is tested to measure how clearly you can see at distance and near",
      "Drops may be used to dilate your pupils for a better view of the lens",
      "The lens of each eye is examined under the slit lamp to assess the type and severity of the cataract",
      "Your optometrist will discuss whether referral for surgery is appropriate based on the impact on your quality of life",
      "If referral is needed, the process and what to expect from cataract surgery will be explained",
    ],
    frequency: "As needed, based on symptoms. Once cataracts are detected, monitoring every 6–12 months is typical until referral is appropriate",
    icon: "lens",
    relatedTests: [
      "standard-eye-test",
      "nhs-eye-test",
      "oct-scan",
      "dvla-driving-vision-test",
    ],
    nhsCovered: true,
  },

  // ─── Macular Degeneration Screening ────────────────────────────────
  {
    slug: "macular-degeneration-screening",
    name: "Macular Degeneration Screening",
    shortDescription:
      "An examination focused on detecting age-related macular degeneration (AMD), the leading cause of sight loss in the UK.",
    fullDescription: `Age-related macular degeneration (AMD) is the most common cause of sight loss in the UK, affecting more than 600,000 people. It damages the macula — the tiny area at the centre of the retina responsible for sharp, detailed central vision. AMD does not cause total blindness, but it can make everyday tasks such as reading, recognising faces, and driving extremely difficult. There are two forms: dry AMD (the more common, slower-progressing type) and wet AMD (less common but more rapidly damaging, requiring urgent treatment).

A macular degeneration screening goes beyond a routine eye test to focus specifically on the health of the macula. Your optometrist will use a combination of techniques including an Amsler grid test (to check for distortion in your central vision), a thorough retinal examination (ideally with dilated pupils), OCT scanning to visualise the layers of the macula in cross-section, and retinal photography to create a baseline record. OCT scanning is particularly valuable as it can detect fluid or structural changes in the macula before symptoms become noticeable.

If you are over 50, smoke or have smoked, have a family history of AMD, or have noticed any distortion or missing patches in your central vision, screening is strongly recommended. While there is currently no treatment for dry AMD (other than nutritional supplements that may slow progression), wet AMD can be treated very effectively with anti-VEGF injections — but only if it is caught early. The Amsler grid is a simple home monitoring tool that your optometrist can provide, allowing you to check for changes between appointments.`,
    duration: "15–30 minutes (or included as part of a comprehensive eye test with OCT)",
    cost: "£10–£39 if OCT scanning is included. May be part of a standard eye test at no extra cost. NHS-funded when clinically indicated",
    whoNeeds: [
      "Adults over 50, particularly those over 65",
      "Smokers and former smokers (smoking significantly increases AMD risk)",
      "People with a family history of macular degeneration",
      "Anyone noticing distortion, blurred patches, or difficulty with central vision",
      "People with cardiovascular disease, high blood pressure, or high cholesterol",
      "Those wanting proactive monitoring of their macular health",
    ],
    whatToExpect: [
      "An Amsler grid test — you look at a grid of lines and report any areas that appear wavy, distorted, or missing",
      "A detailed examination of the macula using a slit lamp with a special lens",
      "OCT scan to image the layers of the macula and detect early fluid or structural changes",
      "Retinal photography to create a baseline image for future comparison",
      "Your optometrist will explain the results and, if changes are found, discuss the next steps",
      "You may be given an Amsler grid chart for home monitoring between appointments",
    ],
    frequency: "Annually for those over 50 or with risk factors; urgently if you notice sudden changes in your central vision",
    icon: "target",
    relatedTests: [
      "oct-scan",
      "retinal-photography",
      "standard-eye-test",
      "nhs-eye-test",
    ],
    nhsCovered: true,
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Find a single eye test by its URL-friendly slug.
 * Returns `undefined` if no match is found.
 */
export function getTestBySlug(slug: string): EyeTest | undefined {
  return eyeTests.find((test) => test.slug === slug);
}

/**
 * Return an array of all available eye test slugs.
 * Useful for generating static paths and sitemap entries.
 */
export function getAllSlugs(): string[] {
  return eyeTests.map((test) => test.slug);
}
