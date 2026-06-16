// ---------------------------------------------------------------------------
// UK eye health data — conditions, guides, and advisory content
// ---------------------------------------------------------------------------

export type EyeConditionCategory = "common" | "age-related" | "refractive" | "urgent";

export type EyeCondition = {
  slug: string;
  name: string;
  category: EyeConditionCategory;
  overview: string;
  symptoms: string[];
  causes: string[];
  treatment: string;
  prevention: string[];
  whenToSeeOptician: string;
  relatedConditions: string[];
  relatedTests: string[];
  affectedAge: string;
};

export type EyeHealthGuideCategory = "how-to" | "advice" | "nhs" | "lifestyle";

export type EyeHealthGuide = {
  slug: string;
  title: string;
  category: EyeHealthGuideCategory;
  summary: string;
  content: string;
  relatedTests: string[];
  relatedConditions: string[];
};

// ---------------------------------------------------------------------------
// Eye conditions — comprehensive UK-focused clinical information
// ---------------------------------------------------------------------------

export const eyeConditions: EyeCondition[] = [
  // ─── Glaucoma ──────────────────────────────────────────────────────
  {
    slug: "glaucoma",
    name: "Glaucoma",
    category: "age-related",
    overview:
      "Glaucoma is a group of eye conditions in which the optic nerve is progressively damaged, usually due to raised pressure inside the eye. It is the leading cause of irreversible blindness worldwide, affecting around 700,000 people in the UK. Because it typically develops slowly and without noticeable early symptoms, regular eye tests are the most reliable way to catch it before significant vision is lost.",
    symptoms: [
      "Gradual loss of peripheral (side) vision, often unnoticed until advanced",
      "Tunnel vision in later stages",
      "Blurred vision",
      "Haloes or rainbow-coloured rings around lights",
      "In acute angle-closure glaucoma: sudden severe eye pain, headache, nausea, vomiting, red eye, and rapid vision loss",
    ],
    causes: [
      "Raised intraocular pressure (IOP) due to impaired drainage of aqueous humour",
      "Family history — risk is four to nine times higher if a close relative has glaucoma",
      "Age — risk increases significantly after 40",
      "Ethnicity — people of African-Caribbean descent are at higher risk of open-angle glaucoma",
      "High myopia (short-sightedness)",
      "Long-term use of corticosteroid medications",
      "Thin corneas or reduced corneal hysteresis",
      "Previous eye injuries or surgery",
    ],
    treatment: `Treatment for glaucoma in the UK aims to lower the pressure inside the eye to prevent further optic nerve damage. The most common first-line treatment is prescription eye drops, usually prostaglandin analogues such as latanoprost, which are used once daily and are highly effective at reducing eye pressure. Your ophthalmologist will monitor your response and may add or change medications if a single drop is not sufficient.

If eye drops do not adequately control the pressure, or if you have difficulty using them, your consultant may recommend selective laser trabeculoplasty (SLT). This is a quick outpatient procedure available on the NHS that uses a laser to improve the drainage of fluid from the eye. Recent UK research (the LiGHT trial) has shown that SLT can be as effective as eye drops as a first treatment, and NICE now supports its use as an initial option.

In more advanced or difficult-to-control cases, surgical options include trabeculectomy (creating a new drainage channel) and drainage tube implants. Minimally invasive glaucoma surgery (MIGS) procedures are also increasingly available in the UK for suitable patients. Whatever the treatment, lifelong monitoring is essential — glaucoma cannot be cured, only managed, and any vision already lost cannot be restored.`,
    prevention: [
      "Attend regular eye tests — at least every two years, or annually if you are over 40 with a family history of glaucoma",
      "Take advantage of free NHS eye tests if you have a first-degree relative with glaucoma and are aged 40 or over",
      "If prescribed eye drops, use them consistently as directed — even when you feel fine",
      "Maintain a healthy lifestyle with regular exercise, as moderate physical activity may help lower eye pressure",
      "Inform your optometrist of any family history of glaucoma",
      "Attend all follow-up appointments if you are being monitored or treated",
    ],
    whenToSeeOptician:
      "Book an eye test immediately if you notice any loss of peripheral vision, see haloes around lights, or have a family history of glaucoma — early detection through regular eye tests is the single most important step in preventing sight loss from this condition.",
    relatedConditions: [
      "cataracts",
      "myopia",
      "diabetic-retinopathy",
    ],
    relatedTests: [
      "glaucoma-assessment",
      "oct-scan",
      "visual-field-test",
      "standard-eye-test",
    ],
    affectedAge: "Over 40 (risk increases with age)",
  },

  // ─── Cataracts ─────────────────────────────────────────────────────
  {
    slug: "cataracts",
    name: "Cataracts",
    category: "age-related",
    overview:
      "A cataract is a clouding of the natural crystalline lens inside the eye, causing vision to become progressively blurred, misty, or faded. Cataracts are the most common cause of treatable sight loss in the UK, and most people will develop some degree of lens clouding by their 70s. Cataract surgery is one of the most frequently performed and successful operations on the NHS, with around 450,000 procedures carried out each year.",
    symptoms: [
      "Blurred, cloudy, or misty vision that worsens gradually",
      "Colours appearing faded, washed out, or yellowish",
      "Increased sensitivity to glare from headlights, sunlight, or bright lamps",
      "Haloes around lights, particularly when driving at night",
      "Difficulty seeing in dim or low-contrast lighting",
      "Frequent changes in glasses or contact lens prescription",
      "Double vision in one eye (in some types of cataract)",
    ],
    causes: [
      "Ageing — the most common cause, as lens proteins gradually break down over decades",
      "Prolonged exposure to ultraviolet (UV) light from the sun",
      "Diabetes — people with diabetes are more likely to develop cataracts at a younger age",
      "Long-term use of corticosteroid medications (oral, inhaled, or eye drops)",
      "Previous eye injuries, surgery, or inflammation (e.g. uveitis)",
      "Smoking — a significant modifiable risk factor",
      "Excessive alcohol consumption",
      "Family history of early-onset cataracts",
    ],
    treatment: `In the early stages of cataract development, updating your glasses prescription can often improve your vision sufficiently to continue with daily activities. Your optometrist will monitor the cataract at each eye test and advise you when it is starting to have a meaningful impact on your quality of life. There is no proven medication, eye drop, or lifestyle change that can reverse a cataract once it has formed.

When cataracts significantly affect your ability to read, drive, work, or enjoy your usual activities, your optometrist will refer you for cataract surgery. Under the NHS, referral is based on the functional impact on your life rather than the clinical severity alone. The operation is a day-case procedure, usually performed under local anaesthetic, and takes around 15 to 30 minutes. The cloudy lens is broken up using ultrasound (phacoemulsification) and replaced with a clear artificial intraocular lens (IOL).

Modern cataract surgery is one of the safest and most effective operations available, with a success rate of over 95%. Most patients notice a significant improvement in vision within a few days. You will need to use antibiotic and anti-inflammatory eye drops for several weeks after the procedure, and your optometrist will check your eyes and update your prescription around four to six weeks after surgery.`,
    prevention: [
      "Wear sunglasses that block 100% of UV-A and UV-B rays, especially in bright conditions",
      "Stop smoking — smoking roughly doubles the risk of cataract development",
      "Manage diabetes effectively with good blood sugar control",
      "Eat a diet rich in antioxidants, including leafy greens, colourful fruits, and oily fish",
      "Limit alcohol consumption",
      "Protect your eyes from injury during sport or manual work with appropriate eyewear",
      "Attend regular eye tests so cataracts can be monitored from the earliest stages",
    ],
    whenToSeeOptician:
      "Book an eye test if you notice your vision becoming gradually blurred, misty, or if glare is increasingly troublesome — your optometrist can assess whether cataracts are developing and advise on the right time for referral.",
    relatedConditions: [
      "glaucoma",
      "age-related-macular-degeneration",
      "diabetic-retinopathy",
      "presbyopia",
    ],
    relatedTests: [
      "cataract-assessment",
      "standard-eye-test",
      "oct-scan",
    ],
    affectedAge: "Over 60 (most common), but can occur at any age",
  },

  // ─── Age-Related Macular Degeneration (AMD) ────────────────────────
  {
    slug: "age-related-macular-degeneration",
    name: "Age-Related Macular Degeneration (AMD)",
    category: "age-related",
    overview:
      "Age-related macular degeneration (AMD) is the leading cause of sight loss in the UK, affecting over 600,000 people. It damages the macula — the small central area of the retina responsible for sharp, detailed vision used for reading, recognising faces, and driving. AMD does not cause total blindness, but it can severely affect central vision and independence, particularly in its wet (neovascular) form.",
    symptoms: [
      "Distortion of straight lines — for example, door frames or text may appear wavy or bent",
      "A blurred or missing patch in the centre of your vision",
      "Difficulty reading, even with glasses",
      "Colours appearing less vivid than before",
      "Difficulty recognising faces",
      "Needing brighter light for close work",
      "Slow adjustment when moving between bright and dim environments",
    ],
    causes: [
      "Ageing — the strongest risk factor; AMD is rare before age 55 and common after 75",
      "Smoking — the most significant modifiable risk factor, roughly tripling the risk",
      "Family history — having a close relative with AMD substantially increases your risk",
      "Ethnicity — AMD is more common in white European populations",
      "Cardiovascular risk factors including high blood pressure, high cholesterol, and obesity",
      "Prolonged exposure to UV light and blue light",
      "Diet low in antioxidants, leafy greens, and omega-3 fatty acids",
    ],
    treatment: `Dry AMD, which accounts for about 90% of cases, currently has no medical treatment. Management focuses on monitoring, lifestyle modifications, and nutritional supplementation. The AREDS2 formulation — a specific combination of vitamins C and E, zinc, copper, lutein, and zeaxanthin — has been shown to reduce the risk of progression to advanced AMD in some patients. Your ophthalmologist or optometrist can advise whether this supplement is appropriate for your stage of AMD.

Wet AMD, though less common, can cause rapid and severe vision loss if not treated promptly. The standard treatment in the UK is anti-VEGF injections (such as ranibizumab, aflibercept, or faricimab), which are given directly into the eye under local anaesthetic. These injections block the growth of abnormal, leaky blood vessels beneath the macula. Treatment is provided through hospital eye departments and is fully funded by the NHS. Most patients require a series of injections over months or years, with the frequency guided by regular OCT scans.

Low-vision rehabilitation services are available through the NHS and charities such as the Macular Society and RNIB. These services provide magnifying devices, adaptive technology, emotional support, and practical advice to help people with AMD maintain their independence and quality of life. If you notice any sudden changes in your central vision — particularly distortion or a dark patch — treat it as urgent and contact your optician or eye casualty department the same day.`,
    prevention: [
      "Stop smoking — it is the single most impactful thing you can do to reduce your risk of AMD",
      "Eat a diet rich in leafy green vegetables (spinach, kale), colourful fruit, and oily fish",
      "Maintain a healthy weight and stay physically active",
      "Wear sunglasses with UV protection in bright conditions",
      "Control blood pressure, cholesterol, and blood sugar levels",
      "Use an Amsler grid at home to monitor for early changes in your central vision",
      "Attend regular eye tests, especially after age 50, and request an OCT scan if available",
    ],
    whenToSeeOptician:
      "Book an urgent eye test immediately if you notice distortion of straight lines, a dark or blurred patch in your central vision, or any sudden change — early detection of wet AMD is critical for effective treatment.",
    relatedConditions: [
      "cataracts",
      "diabetic-retinopathy",
      "floaters-and-flashes",
    ],
    relatedTests: [
      "macular-degeneration-screening",
      "oct-scan",
      "retinal-photography",
      "standard-eye-test",
    ],
    affectedAge: "Over 55 (risk increases sharply after 75)",
  },

  // ─── Diabetic Retinopathy ──────────────────────────────────────────
  {
    slug: "diabetic-retinopathy",
    name: "Diabetic Retinopathy",
    category: "urgent",
    overview:
      "Diabetic retinopathy is a complication of diabetes (Type 1 and Type 2) in which high blood sugar levels damage the tiny blood vessels in the retina. It is one of the leading causes of preventable blindness in working-age adults in the UK. The condition often develops without any noticeable symptoms in its early stages, making the NHS Diabetic Eye Screening Programme — which invites everyone with diabetes for annual retinal photography — an essential safeguard.",
    symptoms: [
      "Often no symptoms in the early stages — damage can be occurring without your knowledge",
      "Gradually worsening vision",
      "Floaters (dark spots or strings drifting across your vision)",
      "Blurred or patchy vision",
      "Sudden vision loss (in advanced stages due to vitreous haemorrhage or retinal detachment)",
      "Difficulty seeing in the dark",
      "Colours appearing washed out",
    ],
    causes: [
      "Prolonged high blood sugar levels damaging the retinal blood vessels",
      "Long duration of diabetes — the longer you have had diabetes, the higher the risk",
      "Poorly controlled blood glucose (high HbA1c)",
      "High blood pressure",
      "High cholesterol",
      "Pregnancy (can accelerate progression in women with pre-existing diabetes)",
      "Smoking",
      "Kidney disease (diabetic nephropathy)",
    ],
    treatment: `In the early stages (background or non-proliferative diabetic retinopathy), the most effective treatment is not an eye treatment at all — it is optimising your diabetes management. Keeping your blood sugar, blood pressure, and cholesterol well controlled can significantly slow or prevent progression. Your GP, diabetic nurse, or endocrinologist will work with you on this, and the NHS Diabetic Eye Screening Programme will monitor your retina with annual photographs.

If the condition progresses to clinically significant diabetic macular oedema (DMO) — where fluid leaks into the central retina and threatens your reading vision — the standard treatment in the UK is anti-VEGF injections, the same type used for wet AMD. These injections are given in hospital eye departments and are funded by the NHS. Laser treatment (focal or grid laser) may also be used in some cases, often alongside injections.

For proliferative diabetic retinopathy — the most advanced stage, where fragile new blood vessels grow on the retina's surface and risk bleeding — pan-retinal photocoagulation (PRP) laser treatment is the established intervention. This laser is applied to the peripheral retina to reduce the drive for new vessel growth. In cases of vitreous haemorrhage or tractional retinal detachment, vitrectomy surgery may be required. The key message is that attending every diabetic eye screening appointment gives you the best possible chance of catching changes early, when treatment is most effective.`,
    prevention: [
      "Maintain excellent blood sugar control — aim for the HbA1c target agreed with your diabetes team",
      "Keep blood pressure below 140/80 mmHg (or the target set by your GP)",
      "Manage cholesterol levels through diet, exercise, and medication if prescribed",
      "Attend every NHS Diabetic Eye Screening appointment — do not skip or delay them",
      "Continue to have regular eye tests with your optometrist in addition to diabetic screening",
      "Stop smoking — smoking worsens diabetic eye disease",
      "Report any changes in your vision to your optometrist or GP promptly",
    ],
    whenToSeeOptician:
      "Book an eye test without delay if you have diabetes and notice any change in your vision, new floaters, or blurred patches — and always attend your annual NHS Diabetic Eye Screening appointment.",
    relatedConditions: [
      "glaucoma",
      "cataracts",
      "age-related-macular-degeneration",
    ],
    relatedTests: [
      "diabetic-eye-screening",
      "oct-scan",
      "retinal-photography",
      "standard-eye-test",
    ],
    affectedAge: "All ages with diabetes (risk increases with duration of diabetes)",
  },

  // ─── Dry Eye Syndrome ──────────────────────────────────────────────
  {
    slug: "dry-eye-syndrome",
    name: "Dry Eye Syndrome",
    category: "common",
    overview:
      "Dry eye syndrome is one of the most common eye conditions in the UK, affecting millions of people. It occurs when your eyes do not produce enough tears, or when the tears evaporate too quickly due to a poor-quality tear film. Despite its name, dry eye can cause watering as well as dryness, along with irritation, grittiness, and tired eyes. It is particularly prevalent among screen users, contact lens wearers, and post-menopausal women.",
    symptoms: [
      "Gritty, sandy, or scratchy sensation in the eyes",
      "Burning or stinging",
      "Red, irritated eyes",
      "Excessive watering (a reflex response to surface dryness)",
      "Blurred vision that clears temporarily when you blink",
      "Tired or heavy-feeling eyes, especially later in the day",
      "Sensitivity to wind, air conditioning, or central heating",
      "Discomfort with contact lens wear",
    ],
    causes: [
      "Meibomian gland dysfunction (MGD) — the most common cause, where the oil-producing glands in the eyelids become blocked",
      "Prolonged screen use — reduced blink rate leads to faster tear evaporation",
      "Ageing and hormonal changes, particularly in post-menopausal women",
      "Central heating, air conditioning, and dry or windy environments",
      "Contact lens wear, especially if lenses are worn for long hours",
      "Medications including antihistamines, antidepressants, beta-blockers, and the oral contraceptive pill",
      "Autoimmune conditions such as Sjogren's syndrome, rheumatoid arthritis, and lupus",
      "Previous laser eye surgery (LASIK/LASEK)",
      "Blepharitis (eyelid inflammation)",
    ],
    treatment: `For most people with mild to moderate dry eye, management begins with over-the-counter lubricating eye drops (artificial tears). Preservative-free drops are recommended for frequent use, as preservatives can irritate the eye surface over time. Your pharmacist or optometrist can recommend the most suitable formulation for your type of dry eye — watery drops for mild symptoms, thicker gel drops for moderate dryness, and ointments for overnight use.

If your dry eye is caused by meibomian gland dysfunction — which accounts for the majority of cases — targeted lid care is essential. This involves daily warm compresses applied to the closed eyelids for 10 minutes, followed by gentle lid massage to express blocked glands, and lid hygiene wipes or solutions to keep the lid margins clean. Many optician practices now offer in-practice treatments such as meibomian gland expression, intense pulsed light (IPL) therapy, and thermal pulsation (LipiFlow) for stubborn MGD.

For more severe or resistant dry eye, your optometrist or ophthalmologist may prescribe anti-inflammatory drops (such as ciclosporin, available on the NHS under the brand name Ikervis), short courses of steroid drops, or recommend punctal plugs — tiny devices inserted into the tear drainage channels to help tears stay on the eye surface longer. Omega-3 fatty acid supplements (from oily fish or flaxseed) may also provide additional benefit. A specialist dry eye assessment is advisable if your symptoms are significantly affecting your quality of life or not improving with first-line treatments.`,
    prevention: [
      "Follow the 20-20-20 rule when using screens: every 20 minutes, look at something 20 feet away for 20 seconds",
      "Make a conscious effort to blink fully and regularly, especially during screen use",
      "Use a humidifier in centrally heated or air-conditioned rooms",
      "Position your screen below eye level so your eyes are slightly closed, reducing tear evaporation",
      "Maintain good eyelid hygiene with daily warm compresses if prone to MGD or blepharitis",
      "Stay well hydrated throughout the day",
      "Wear wraparound sunglasses or glasses in windy conditions",
      "Take regular breaks from contact lenses and ensure they are properly fitted",
    ],
    whenToSeeOptician:
      "Book an eye test if you have persistent dry, gritty, or watery eyes that do not improve with over-the-counter drops — your optometrist can investigate the underlying cause and recommend a targeted treatment plan.",
    relatedConditions: [
      "blepharitis",
      "conjunctivitis",
      "keratoconus",
    ],
    relatedTests: [
      "dry-eye-assessment",
      "standard-eye-test",
      "contact-lens-fitting",
    ],
    affectedAge: "All ages (more common over 50 and in post-menopausal women)",
  },

  // ─── Conjunctivitis ────────────────────────────────────────────────
  {
    slug: "conjunctivitis",
    name: "Conjunctivitis",
    category: "common",
    overview:
      "Conjunctivitis is an inflammation or infection of the conjunctiva — the thin, transparent membrane that covers the white of the eye and lines the inside of the eyelids. It is extremely common in the UK, affecting adults and children alike. Conjunctivitis can be caused by a viral or bacterial infection, an allergic reaction, or an irritant, and while it is usually not serious, it can be uncomfortable and highly contagious in its infective forms.",
    symptoms: [
      "Red or pink appearance to the white of one or both eyes",
      "Watery or mucous discharge from the eye",
      "Thick yellow or green discharge (more common in bacterial conjunctivitis)",
      "Itchy, gritty, or burning sensation",
      "Eyelids stuck together upon waking, especially in the morning",
      "Swollen eyelids",
      "Sensitivity to light in some cases",
      "A feeling that something is in the eye",
    ],
    causes: [
      "Viral infection — the most common cause in adults, often associated with a cold or upper respiratory infection",
      "Bacterial infection — more common in children, caused by organisms such as Staphylococcus, Streptococcus, or Haemophilus",
      "Allergic reaction — triggered by pollen (hay fever), dust mites, pet dander, or cosmetics",
      "Irritants such as chlorine from swimming pools, smoke, shampoo, or contact lens solutions",
      "Contact lens overwear or poor lens hygiene",
      "Sexually transmitted infections such as chlamydia or gonorrhoea (less common but important to recognise)",
    ],
    treatment: `Most cases of infective conjunctivitis are self-limiting and will resolve on their own within one to two weeks without treatment. The NHS advises using clean cotton wool pads soaked in cooled boiled water to gently wipe away any discharge from the eyelids and lashes, cleaning from the inner corner outward. Lubricating eye drops (available from any pharmacy) can help soothe irritation. You should wash your hands frequently, avoid touching or rubbing your eyes, and use separate towels and flannels to prevent spreading the infection to others.

Your GP or pharmacist may prescribe antibiotic eye drops (such as chloramphenicol, available over the counter in the UK for adults and children over 2) if symptoms are particularly severe, if there is significant discharge, or if the infection is not improving after a few days. Antibiotic drops are more effective against bacterial conjunctivitis than viral, but they may be offered to reduce the duration of symptoms and limit contagion. For allergic conjunctivitis, antihistamine eye drops (such as sodium cromoglicate or olopatadine) are the first-line treatment, often combined with oral antihistamines during hay fever season.

If conjunctivitis is recurrent, persistent, painful, or associated with vision changes, you should see your optometrist or GP to rule out more serious conditions such as iritis, keratitis, or scleritis. Contact lens wearers who develop a red eye should stop wearing their lenses immediately and seek urgent advice, as the symptoms could indicate a corneal infection requiring prompt treatment.`,
    prevention: [
      "Wash your hands regularly, especially after touching your eyes or face",
      "Avoid sharing towels, flannels, pillows, and eye make-up with others",
      "Do not rub your eyes — this can spread infection and worsen irritation",
      "Replace eye make-up regularly and never use products past their expiry date",
      "Follow proper contact lens hygiene: clean, disinfect, and replace lenses as directed",
      "Wear goggles when swimming in chlorinated pools",
      "During hay fever season, wear wraparound sunglasses and use antihistamine drops preventively",
    ],
    whenToSeeOptician:
      "Book an eye test if conjunctivitis is not improving after two weeks, is very painful, affects your vision, or recurs frequently — your optometrist can distinguish between infective, allergic, and more serious causes.",
    relatedConditions: [
      "blepharitis",
      "dry-eye-syndrome",
      "keratoconus",
    ],
    relatedTests: [
      "standard-eye-test",
      "emergency-eye-care",
    ],
    affectedAge: "All ages",
  },

  // ─── Blepharitis ───────────────────────────────────────────────────
  {
    slug: "blepharitis",
    name: "Blepharitis",
    category: "common",
    overview:
      "Blepharitis is a chronic inflammation of the eyelid margins that causes sore, red, itchy, and crusty eyelids. It is one of the most common eye conditions managed by UK optometrists and GPs. While it is rarely sight-threatening, blepharitis is frequently uncomfortable and persistent, and it is a major contributing factor to dry eye syndrome. It tends to be a long-term condition that requires ongoing management rather than a one-off cure.",
    symptoms: [
      "Sore, red, or swollen eyelid margins",
      "Itchy or irritated eyelids",
      "Crusty or flaky debris at the base of the eyelashes, particularly on waking",
      "A gritty or burning sensation in the eyes",
      "Watery or sticky eyes",
      "Eyelids that stick together in the morning",
      "Loss of eyelashes or misdirected lashes in severe cases",
      "Recurrent styes (hordeola) or meibomian cysts (chalazia)",
    ],
    causes: [
      "Bacterial overgrowth on the eyelid margins, particularly Staphylococcus species",
      "Meibomian gland dysfunction (MGD) — blockage of the oil-producing glands in the eyelids",
      "Demodex mite infestation — microscopic mites that live in eyelash follicles",
      "Seborrheic dermatitis (a skin condition also associated with dandruff)",
      "Rosacea — a common skin condition that frequently affects the eyes (ocular rosacea)",
      "Allergic reactions to cosmetics, contact lens solutions, or environmental allergens",
      "Poor eyelid hygiene",
    ],
    treatment: `The cornerstone of blepharitis management is a daily lid hygiene routine, which should become as habitual as brushing your teeth. This involves three steps: first, apply a warm compress to your closed eyelids for 5 to 10 minutes to soften any crusts and melt the oils in blocked meibomian glands. A microwaveable eye mask (such as the Thera-Pearl Eye Mask or MGDRx EyeBag, widely available from UK pharmacies) is more effective and convenient than a flannel. Second, gently massage the eyelids in a downward motion on the upper lids and upward on the lower lids to express the gland contents. Third, clean the lid margins with a lid scrub solution or pre-soaked lid wipes.

If the daily routine alone does not bring adequate relief, your optometrist or GP may prescribe a short course of antibiotic ointment (such as fusidic acid or chloramphenicol) applied to the lid margins, or an oral antibiotic such as doxycycline for several weeks, which has anti-inflammatory as well as antibacterial properties. For Demodex-related blepharitis, tea tree oil-based lid wipes (such as Blephaclean or Blephagel) or the newer prescription treatment Xdemvy (lotilaner) may be recommended. Some optometry practices now offer in-practice treatments including BlephEx (mechanical debridement of the lid margins) and thermal pulsation therapy.

Because blepharitis is a chronic condition that tends to flare up if lid hygiene lapses, ongoing daily maintenance is the key to long-term comfort. Your optometrist can help you find the most effective and practical routine for your particular type of blepharitis and will monitor your eyelids and meibomian glands at regular review appointments.`,
    prevention: [
      "Maintain a daily lid hygiene routine with warm compresses, lid massage, and lid cleansing",
      "Remove all eye make-up thoroughly before bed using an oil-free remover",
      "Replace mascara and eyeliner every three months to prevent bacterial contamination",
      "Avoid rubbing or touching your eyelids excessively",
      "Keep your general skin conditions (rosacea, seborrheic dermatitis) well managed",
      "Stay well hydrated and eat a diet rich in omega-3 fatty acids",
      "Clean your pillowcases regularly",
    ],
    whenToSeeOptician:
      "Book an eye test if you have persistently sore, red, or crusty eyelids that do not improve with basic hygiene measures — your optometrist can identify the type of blepharitis and recommend targeted treatment.",
    relatedConditions: [
      "dry-eye-syndrome",
      "conjunctivitis",
      "strabismus",
    ],
    relatedTests: [
      "blepharitis-assessment",
      "dry-eye-assessment",
      "standard-eye-test",
    ],
    affectedAge: "All ages (more common in middle-aged and older adults)",
  },

  // ─── Astigmatism ───────────────────────────────────────────────────
  {
    slug: "astigmatism",
    name: "Astigmatism",
    category: "refractive",
    overview:
      "Astigmatism is a very common refractive error caused by an irregularly shaped cornea or lens, which prevents light from focusing evenly on the retina. Instead of being round like a football, the eye is shaped more like a rugby ball, causing vision to be blurred or distorted at all distances. Most people have some degree of astigmatism, and it is easily corrected with glasses, contact lenses, or laser eye surgery.",
    symptoms: [
      "Blurred or distorted vision at both distance and near",
      "Difficulty seeing fine detail, such as small print or distant signs",
      "Eye strain and discomfort, especially after prolonged reading or screen use",
      "Headaches, particularly after visual tasks",
      "Squinting to try to see more clearly",
      "Difficulty with night driving due to glare and streaked lights",
    ],
    causes: [
      "Irregular curvature of the cornea (corneal astigmatism) — the most common cause",
      "Irregular shape of the internal crystalline lens (lenticular astigmatism)",
      "Genetics — astigmatism often runs in families and is usually present from birth",
      "Keratoconus — a progressive thinning and steepening of the cornea",
      "Previous eye surgery or corneal injury",
      "Chalazion (meibomian cyst) pressing on the cornea",
    ],
    treatment: `Astigmatism is corrected by using lenses that compensate for the uneven curvature of the eye. Glasses with cylindrical or toric lens elements are the simplest and most common correction. Your prescription will include a cylinder value and an axis number, which describe the amount and direction of the astigmatism. Your optometrist will explain these numbers when discussing your results.

Toric contact lenses are specifically designed for astigmatism and are available in daily disposable, monthly, and extended-wear options from all major UK lens manufacturers. Modern toric lenses are very stable on the eye and provide excellent vision for most levels of astigmatism. For people who prefer not to wear glasses or contact lenses, laser eye surgery (LASIK or LASEK) can permanently correct astigmatism in suitable candidates, and is widely available from specialist clinics across the UK.

In most cases, astigmatism remains stable throughout adulthood, though your overall prescription may change with age. Regular eye tests ensure your correction stays up to date. If your astigmatism is increasing progressively, particularly in younger patients, your optometrist may investigate for keratoconus — a condition that requires specialist management.`,
    prevention: [
      "Astigmatism is largely genetic and cannot be prevented",
      "Attend regular eye tests so any changes in astigmatism are detected and your prescription is kept up to date",
      "Avoid rubbing your eyes forcefully, as this may contribute to corneal changes over time",
      "If you have keratoconus or a family history of it, ensure regular monitoring by your optometrist",
    ],
    whenToSeeOptician:
      "Book an eye test if you experience blurred vision at any distance, headaches after reading, or difficulty with night driving — astigmatism is easily detected during a routine eye test and simply corrected.",
    relatedConditions: [
      "myopia",
      "hyperopia",
      "keratoconus",
      "presbyopia",
    ],
    relatedTests: [
      "standard-eye-test",
      "contact-lens-fitting",
      "dvla-driving-vision-test",
    ],
    affectedAge: "All ages (usually present from birth)",
  },

  // ─── Myopia (Short-sightedness) ────────────────────────────────────
  {
    slug: "myopia",
    name: "Myopia (Short-sightedness)",
    category: "refractive",
    overview:
      "Myopia, commonly known as short-sightedness, is a refractive error in which distant objects appear blurred while near objects remain clear. It is the most common refractive condition worldwide and its prevalence is rising rapidly in the UK, now affecting approximately 30% of the population. Myopia typically develops during childhood and tends to worsen through the teenage years before stabilising in early adulthood.",
    symptoms: [
      "Distant objects appear blurred while near vision is clear",
      "Squinting or partially closing the eyes to see distant objects more clearly",
      "Headaches caused by eye strain",
      "Difficulty seeing the whiteboard or projector at school (in children)",
      "Sitting very close to the television or holding books and devices very close",
      "Excessive blinking or rubbing of the eyes (in children)",
      "Difficulty seeing road signs or recognising faces at a distance",
    ],
    causes: [
      "The eyeball growing too long from front to back, so that light focuses in front of the retina",
      "Genetics — a child with two myopic parents has a significantly higher chance of developing myopia",
      "Excessive close work and screen time during childhood and adolescence",
      "Insufficient time spent outdoors during childhood — research strongly links this to myopia development",
      "Rapid growth during childhood and puberty",
      "Environmental and educational factors — myopia is more prevalent in populations with intensive education systems",
    ],
    treatment: `Myopia is most commonly corrected with glasses or contact lenses that use concave (minus-powered) lenses to refocus light onto the retina. Glasses remain the simplest and most widely used correction for all ages. For those who prefer contact lenses, daily disposable soft lenses are the most popular option in the UK, offering convenience and good eye health. Toric contact lenses are available for those with myopia combined with astigmatism.

For adults who wish to reduce their dependence on glasses or contact lenses, laser eye surgery (LASIK, LASEK, or SMILE) is a well-established option available from specialist clinics across the UK. Eligibility depends on your prescription, corneal thickness, and overall eye health. Implantable contact lenses (ICL) are an alternative for those with very high prescriptions who may not be suitable for laser surgery. These procedures are not available on the NHS for standard myopia.

For children with progressing myopia, myopia management is a rapidly growing area of UK optometry. Evidence-based treatments — including specially designed spectacle lenses (such as MiYOSMART and Stellest), myopia-control soft contact lenses, orthokeratology (overnight rigid lenses), and low-dose atropine eye drops — aim to slow the rate of myopia progression during childhood. This is important because higher myopia carries a greater lifetime risk of retinal detachment, glaucoma, and myopic macular degeneration.`,
    prevention: [
      "Encourage children to spend at least two hours per day outdoors — this is one of the strongest protective factors against developing myopia",
      "Limit prolonged close work and screen time, and encourage regular breaks using the 20-20-20 rule",
      "Ensure good lighting when reading or working at near distances",
      "Have children's eyes tested regularly from around age three, and annually once at school",
      "If myopia is detected in a child, discuss myopia management options with your optometrist to slow progression",
      "Adults should attend regular eye tests to keep their prescription up to date",
    ],
    whenToSeeOptician:
      "Book an eye test if you or your child are having difficulty seeing distant objects clearly, squinting, or experiencing headaches — myopia is easily diagnosed and corrected, and early detection in children allows for proactive management.",
    relatedConditions: [
      "astigmatism",
      "hyperopia",
      "keratoconus",
      "floaters-and-flashes",
      "glaucoma",
    ],
    relatedTests: [
      "myopia-management",
      "childrens-eye-test",
      "standard-eye-test",
      "contact-lens-fitting",
    ],
    affectedAge: "Usually develops between ages 6 and 13; can progress into early adulthood",
  },

  // ─── Hyperopia (Long-sightedness) ──────────────────────────────────
  {
    slug: "hyperopia",
    name: "Hyperopia (Long-sightedness)",
    category: "refractive",
    overview:
      "Hyperopia, commonly known as long-sightedness or far-sightedness, is a refractive error in which nearby objects appear blurred while distant objects may initially remain clearer. It occurs when the eyeball is slightly shorter than normal, or when the cornea or lens has insufficient focusing power. Many young people with mild hyperopia can compensate through the eye's natural focusing ability (accommodation), but this becomes more difficult with age, and symptoms may gradually become apparent.",
    symptoms: [
      "Difficulty focusing on close-up objects such as books, phones, or computer screens",
      "Eye strain and fatigue, particularly after prolonged near work",
      "Headaches, especially after reading or screen use",
      "Blurred vision at near distances, and in higher prescriptions, at distance too",
      "Aching or tired eyes by the end of the day",
      "Children with hyperopia may have difficulty reading or concentrating at school",
      "Squinting or frowning to try to focus",
    ],
    causes: [
      "The eyeball being shorter than normal from front to back",
      "The cornea or crystalline lens having insufficient focusing power",
      "Genetics — hyperopia tends to run in families",
      "Certain medical conditions, including diabetes (which can cause temporary hyperopic shifts)",
      "Previous eye surgery",
    ],
    treatment: `Mild hyperopia in young people often requires no treatment, as the eye's natural accommodation can compensate. However, if symptoms such as eye strain, headaches, or difficulty concentrating at near distances are present, glasses with convex (plus-powered) lenses are prescribed. In children, uncorrected hyperopia can contribute to the development of squint (strabismus) and lazy eye (amblyopia), so early detection and correction are important.

Contact lenses are a practical alternative to glasses for many people with hyperopia. Both soft daily disposable and reusable monthly lenses are available in plus powers, and multifocal contact lenses can address hyperopia combined with presbyopia in older adults. Your optometrist or contact lens practitioner will advise on the most suitable lens type for your prescription and lifestyle.

Laser eye surgery (LASIK or LASEK) can correct hyperopia in suitable adults, though the range of treatable prescriptions is somewhat narrower than for myopia. Refractive lens exchange (RLE) — in which the natural lens is replaced with an artificial one — may be recommended for older patients with higher hyperopia, particularly if early cataracts are also developing. All refractive surgery options in the UK are privately funded.`,
    prevention: [
      "Hyperopia is predominantly genetic and cannot be prevented",
      "Have children's eyes tested from age three onwards, as uncorrected hyperopia can affect learning and development",
      "If your child has been prescribed glasses for hyperopia, ensure they wear them as directed to prevent amblyopia",
      "Attend regular eye tests so your prescription stays up to date — symptoms can change with age",
    ],
    whenToSeeOptician:
      "Book an eye test if you or your child experience difficulty with close-up tasks, headaches after reading, or if a child is struggling at school — hyperopia is straightforward to diagnose and correct with an eye test.",
    relatedConditions: [
      "astigmatism",
      "myopia",
      "presbyopia",
      "strabismus",
    ],
    relatedTests: [
      "standard-eye-test",
      "childrens-eye-test",
      "contact-lens-fitting",
    ],
    affectedAge: "All ages (often present from birth; symptoms may increase with age)",
  },

  // ─── Presbyopia ────────────────────────────────────────────────────
  {
    slug: "presbyopia",
    name: "Presbyopia",
    category: "age-related",
    overview:
      "Presbyopia is the natural, age-related loss of the eye's ability to focus on close objects. It is not a disease but a universal part of ageing that affects virtually everyone, typically becoming noticeable in the early to mid-forties. Presbyopia occurs because the crystalline lens inside the eye gradually loses its flexibility, making it harder to change shape and focus at near distances. It is the reason many people need reading glasses or varifocals for the first time in middle age.",
    symptoms: [
      "Difficulty reading small print, especially in dim lighting",
      "Needing to hold reading material at arm's length to focus",
      "Eye strain or tired eyes after prolonged close work",
      "Headaches after reading, sewing, or other near tasks",
      "Difficulty seeing your phone screen clearly at a normal distance",
      "Blurred near vision that seems to worsen gradually over months and years",
    ],
    causes: [
      "Age-related loss of flexibility in the crystalline lens of the eye",
      "Weakening of the ciliary muscles that control the lens shape",
      "A completely natural and inevitable process — not a sign of disease",
    ],
    treatment: `The most common correction for presbyopia is reading glasses, which provide the extra focusing power needed for close work. Over-the-counter ready-made readers are available from pharmacies and supermarkets and can be a convenient short-term solution, but a prescription pair from your optometrist will be tailored to your exact needs and is recommended for regular use.

If you already wear glasses for distance vision (for example, for myopia or hyperopia), your optometrist will likely recommend varifocal (progressive) lenses, which seamlessly combine distance, intermediate, and near correction in a single pair of glasses. Bifocal lenses are an alternative that provide two distinct zones. For contact lens wearers, multifocal contact lenses or a monovision approach (one eye corrected for distance, the other for near) are effective options that are widely available in the UK.

Surgical options for presbyopia are evolving. Refractive lens exchange (RLE) replaces the natural lens with a multifocal or extended-depth-of-focus artificial lens, effectively treating presbyopia and preventing future cataracts. Corneal inlays and presbyopia-correcting LASIK are also available at some UK clinics, though long-term outcomes are still being evaluated. Your optometrist can discuss all the available options during your eye test and help you choose the most practical solution for your lifestyle.`,
    prevention: [
      "Presbyopia cannot be prevented — it is a natural consequence of ageing",
      "Good lighting for close work can reduce strain as presbyopia develops",
      "Regular eye tests ensure your near correction stays up to date as presbyopia progresses",
      "Taking regular breaks from prolonged near work helps reduce fatigue",
    ],
    whenToSeeOptician:
      "Book an eye test if you are finding it harder to read small print, need to hold things further away to focus, or are getting headaches after close work — presbyopia is easily corrected, and your optometrist will find the best solution for you.",
    relatedConditions: [
      "hyperopia",
      "astigmatism",
      "cataracts",
    ],
    relatedTests: [
      "standard-eye-test",
      "home-visit-eye-test",
      "nhs-eye-test",
    ],
    affectedAge: "Over 40 (universal, progresses gradually through the 50s and 60s)",
  },

  // ─── Floaters and Flashes ──────────────────────────────────────────
  {
    slug: "floaters-and-flashes",
    name: "Floaters and Flashes",
    category: "urgent",
    overview:
      "Floaters are small shapes — dots, threads, cobwebs, or rings — that drift across your field of vision. Flashes are brief sparks or streaks of light, usually in the edge of your vision. Both are usually caused by age-related changes in the vitreous gel that fills the inside of the eye. While they are common and often harmless, a sudden increase in floaters or new flashes of light can be a warning sign of a retinal tear or detachment, which requires urgent attention.",
    symptoms: [
      "Small dark shapes drifting across your vision — spots, threads, squiggly lines, or cobwebs",
      "Floaters that are most noticeable against bright, plain backgrounds such as a white wall or blue sky",
      "Brief flashes or streaks of light, especially at the edge of your vision",
      "Flashes may be more noticeable in the dark or in dim lighting",
      "A sudden shower of new floaters, sometimes described as a spider's web or curtain of spots",
      "A shadow, curtain, or veil across part of your vision (a warning sign of retinal detachment)",
    ],
    causes: [
      "Posterior vitreous detachment (PVD) — the most common cause, where the vitreous gel naturally shrinks and separates from the retina with age",
      "Age-related liquefaction and condensation of the vitreous gel",
      "Retinal tear — the vitreous can pull on the retina as it detaches, creating a tear",
      "Retinal detachment — a medical emergency where the retina peels away from the back of the eye",
      "Bleeding inside the eye (vitreous haemorrhage) from diabetic retinopathy or other causes",
      "Inflammation inside the eye (uveitis)",
      "Myopia — short-sighted people are at higher risk of PVD and retinal problems",
      "Previous eye surgery or trauma",
    ],
    treatment: `Most floaters are harmless and are caused by age-related changes in the vitreous gel. They usually become less noticeable over weeks or months as the brain adapts to them. No treatment is required for typical age-related floaters, and most ophthalmologists advise a conservative approach. However, if a sudden onset of floaters is found to be associated with a retinal tear, urgent laser treatment (laser retinopexy) or cryotherapy (freezing treatment) can be used to seal the tear and prevent it from progressing to a retinal detachment.

A retinal detachment is a medical emergency that requires prompt surgical repair to prevent permanent vision loss. Surgery may involve a vitrectomy (removing the vitreous gel and replacing it with gas or silicone oil), scleral buckling (placing a band around the eye), or pneumatic retinopexy (injecting a gas bubble to push the retina back into place). Outcomes are generally good when treatment is carried out promptly, but delayed treatment can result in significant and irreversible sight loss.

In rare cases where persistent floaters are severely debilitating and affecting quality of life, vitrectomy surgery or YAG laser vitreolysis may be considered. These are not routine treatments and carry risks, so they are reserved for the most troublesome cases. The most important action you can take is to seek urgent assessment whenever you notice new symptoms.`,
    prevention: [
      "Floaters from normal ageing cannot be prevented",
      "Attend regular eye tests, especially if you are short-sighted, as myopia increases the risk of retinal problems",
      "Protect your eyes from injury during sports and manual work",
      "If you have diabetes, maintain good blood sugar control to reduce the risk of vitreous haemorrhage",
      "Know the warning signs: a sudden shower of floaters, new flashes, or a shadow across your vision requires immediate attention",
    ],
    whenToSeeOptician:
      "Seek an urgent eye assessment the same day if you experience a sudden shower of new floaters, flashes of light, or a shadow across your vision — these may indicate a retinal tear or detachment that requires emergency treatment.",
    relatedConditions: [
      "age-related-macular-degeneration",
      "diabetic-retinopathy",
      "myopia",
    ],
    relatedTests: [
      "emergency-eye-care",
      "oct-scan",
      "retinal-photography",
      "standard-eye-test",
    ],
    affectedAge: "Over 50 (most common), but can occur at any age, especially in myopic individuals",
  },

  // ─── Keratoconus ───────────────────────────────────────────────────
  {
    slug: "keratoconus",
    name: "Keratoconus",
    category: "common",
    overview:
      "Keratoconus is a progressive condition in which the cornea — the clear, dome-shaped front surface of the eye — gradually thins and bulges outward into a cone shape. This distortion causes increasingly blurred and distorted vision that cannot be fully corrected with standard glasses. It typically begins during the teenage years or early twenties and may progress for 10 to 20 years before stabilising. Keratoconus affects approximately 1 in 450 people in the UK.",
    symptoms: [
      "Progressively worsening blurred and distorted vision",
      "Frequent changes in glasses or contact lens prescription",
      "Increased sensitivity to glare and bright lights",
      "Ghosting or multiple images (monocular diplopia), especially at night",
      "Difficulty with night driving",
      "Vision that is no longer fully correctable with glasses",
      "Eye strain and headaches",
    ],
    causes: [
      "Weakening and thinning of the collagen fibres in the cornea — the exact underlying cause is not fully understood",
      "Genetics — keratoconus can run in families, though many cases have no family history",
      "Eye rubbing — vigorous and habitual rubbing is a significant and modifiable risk factor",
      "Allergic eye disease, eczema, and hay fever — the itching associated with these conditions may lead to eye rubbing",
      "Down syndrome and certain connective tissue disorders are associated with higher prevalence",
    ],
    treatment: `In the early stages, keratoconus can often be managed with glasses or standard soft contact lenses. As the condition progresses, however, the irregular corneal shape means that standard lenses can no longer provide clear vision. Rigid gas-permeable (RGP) contact lenses are the mainstay of optical correction for moderate keratoconus, as they create a smooth, regular refracting surface over the cone. Scleral lenses — large-diameter rigid lenses that vault over the entire cornea — have become increasingly popular in the UK, offering excellent vision and comfort even in advanced cases.

Corneal collagen cross-linking (CXL) is a treatment that strengthens the cornea and halts the progression of keratoconus. It involves applying riboflavin (vitamin B2) drops to the cornea and then exposing it to controlled ultraviolet light. Cross-linking was first approved in the UK and is now available on the NHS for patients with progressive keratoconus. It is most effective when performed early, which is why regular monitoring and early detection are so important.

For advanced cases where contact lenses can no longer provide adequate vision and cross-linking has not been performed in time, corneal transplant surgery (keratoplasty) may be necessary. The UK has a well-established corneal transplant service, and modern techniques — particularly deep anterior lamellar keratoplasty (DALK) — have excellent outcomes with lower rejection rates than full-thickness grafts. Intrastromal corneal ring segments (ICRS, such as Intacs or Kerarings) are another option that can improve the corneal shape and vision in some patients, either as a standalone treatment or as a bridge to better contact lens fitting.`,
    prevention: [
      "Avoid rubbing your eyes — this is the single most important modifiable risk factor for keratoconus progression",
      "If you have allergies or eczema that cause itchy eyes, use antihistamine drops rather than rubbing",
      "Have regular eye tests during your teenage and young adult years, when keratoconus typically develops",
      "If keratoconus is diagnosed, attend monitoring appointments faithfully so progression can be detected and cross-linking can be offered in time",
      "Inform your optometrist if you have a family history of keratoconus",
    ],
    whenToSeeOptician:
      "Book an eye test if your vision is becoming increasingly blurred or distorted, if your glasses prescription is changing frequently, or if there is keratoconus in your family — early detection allows for timely cross-linking treatment that can prevent progression.",
    relatedConditions: [
      "astigmatism",
      "myopia",
      "dry-eye-syndrome",
    ],
    relatedTests: [
      "standard-eye-test",
      "oct-scan",
      "contact-lens-fitting",
    ],
    affectedAge: "Usually develops between ages 10 and 25; may progress until the 30s or 40s",
  },

  // ─── Colour Blindness ─────────────────────────────────────────────
  {
    slug: "colour-blindness",
    name: "Colour Blindness (Colour Vision Deficiency)",
    category: "common",
    overview:
      "Colour blindness — more accurately called colour vision deficiency (CVD) — is a condition in which a person has difficulty distinguishing between certain colours. The most common form is red-green colour deficiency, which affects approximately 1 in 12 men and 1 in 200 women in the UK. Total colour blindness (achromatopsia) is extremely rare. Colour vision deficiency is usually inherited and present from birth, though it can occasionally be acquired due to eye disease, medication, or ageing.",
    symptoms: [
      "Difficulty distinguishing between red and green shades — they may appear similar or muted",
      "Confusion between colours such as brown and green, or blue and purple",
      "Difficulty identifying colours in dim lighting",
      "Colours appearing less vivid or saturated than others perceive them",
      "Problems with colour-coded information such as charts, maps, or traffic lights (though the position of lights is typically used as a cue)",
      "May not be aware of the deficiency — many people learn to compensate and do not realise their perception differs",
    ],
    causes: [
      "Inherited genetic mutations affecting the cone photoreceptors in the retina — the most common cause",
      "X-linked inheritance pattern, which is why the condition is much more common in males",
      "Acquired colour vision changes due to eye conditions such as glaucoma, macular degeneration, cataracts, or diabetic retinopathy",
      "Certain medications including some anti-epileptics, antibiotics, and heart medications",
      "Ageing — colour discrimination naturally declines slightly with age",
      "Optic nerve disease or damage",
    ],
    treatment: `Inherited colour vision deficiency cannot be cured or treated with medication or surgery. However, awareness of the condition is the most important first step, as many practical strategies can make daily life easier. Colour vision testing — usually with Ishihara plates — is quick and simple and should be included in every child's first eye test.

For those who find their colour deficiency affects daily tasks, tinted lenses and filters (such as EnChroma glasses or Colorlite lenses) may enhance colour contrast for some individuals, though they do not provide normal colour vision and results vary. Smartphone apps that identify colours from the camera can be helpful for matching clothes, interpreting colour-coded labels, or identifying wiring colours in practical tasks.

In terms of career implications, certain professions in the UK require specific colour vision standards. These include the armed forces, police, fire and rescue services, aviation (pilots and air traffic controllers), maritime roles, electrical engineering, and some healthcare positions. Your optometrist can provide a detailed colour vision assessment and, if needed, a report for employers. For children, early identification allows parents and teachers to make simple adjustments — such as labelling coloured pencils and avoiding colour-only instructions — to support learning without disadvantage.`,
    prevention: [
      "Inherited colour vision deficiency cannot be prevented",
      "Have children's colour vision tested as part of their first eye test to ensure early awareness",
      "If you have a family history of colour blindness, mention this to your optometrist",
      "Protect your eye health generally to reduce the risk of acquired colour vision changes",
      "Attend regular eye tests as you age, since some colour discrimination changes can be linked to treatable conditions",
    ],
    whenToSeeOptician:
      "Book an eye test that includes colour vision assessment if you suspect you or your child has difficulty with colours, or if accurate colour vision is required for your career — early diagnosis helps with practical adaptation and career planning.",
    relatedConditions: [
      "cataracts",
      "glaucoma",
      "age-related-macular-degeneration",
    ],
    relatedTests: [
      "colour-vision-test",
      "standard-eye-test",
      "childrens-eye-test",
    ],
    affectedAge: "All ages (usually present from birth if inherited)",
  },

  // ─── Strabismus (Squint) ───────────────────────────────────────────
  {
    slug: "strabismus",
    name: "Strabismus (Squint)",
    category: "common",
    overview:
      "Strabismus, commonly known as a squint or crossed eyes, is a condition in which the eyes do not align properly — one eye may turn inward, outward, upward, or downward while the other looks straight ahead. Squint is relatively common in children, affecting approximately 2-3% of the UK population. If left untreated in childhood, it can lead to amblyopia (lazy eye) and permanent loss of binocular vision. However, squint can also develop in adults, sometimes as a sign of an underlying condition requiring investigation.",
    symptoms: [
      "One eye turning inward (convergent or esotropia), outward (divergent or exotropia), upward, or downward",
      "The turn may be constant or intermittent — appearing only when the child is tired, unwell, or focusing at near distances",
      "Double vision (more common in adults who develop a new squint)",
      "Closing or covering one eye in bright sunlight or when concentrating",
      "Abnormal head posture — tilting or turning the head to compensate",
      "In children: poor depth perception and difficulty with hand-eye coordination",
      "An infant whose eyes are not straight after 3 months of age",
    ],
    causes: [
      "Imbalance in the muscles controlling eye movement",
      "Uncorrected refractive error, particularly hyperopia (long-sightedness) — the effort of focusing can trigger the eyes to turn inward",
      "Family history of squint or amblyopia",
      "Premature birth or low birth weight",
      "Conditions affecting the brain or nerves controlling eye muscles — such as cerebral palsy, Down syndrome, or head injury",
      "In adults: cranial nerve palsy, stroke, thyroid eye disease, diabetes, or myasthenia gravis",
    ],
    treatment: `Treatment for childhood squint depends on the cause and severity and should begin as early as possible for the best outcome. If an uncorrected refractive error is contributing, glasses are the first step — in many cases of accommodative esotropia (where hyperopia is pulling the eyes inward), glasses alone can straighten the eyes. If amblyopia (lazy eye) has developed, patching therapy — covering the stronger eye to strengthen the weaker one — is the standard NHS treatment, usually for several hours a day over weeks or months.

If glasses and patching do not fully correct the squint, surgery on the eye muscles may be recommended. Squint surgery is performed under general anaesthetic in children and is available on the NHS. The operation adjusts the tension or position of one or more of the muscles that control eye movement. In many cases, one operation is sufficient, but some children require further adjustment. Botulinum toxin (Botox) injections into the eye muscles are an alternative used in some types of squint, particularly in adults.

In adults, a new squint always warrants investigation to rule out underlying conditions such as cranial nerve palsy, stroke, thyroid eye disease, or intracranial pathology. Treatment depends on the cause: prisms in glasses can compensate for double vision, and squint surgery or botulinum toxin injections may be appropriate once the underlying condition is stable. Orthoptic exercises may help in certain types of intermittent squint. If you or your child has a squint, prompt assessment by an optometrist is essential — early treatment gives the best chance of achieving good vision in both eyes.`,
    prevention: [
      "Have children's eyes tested from age three — earlier if you notice a squint or have a family history",
      "Ensure children wear their prescribed glasses consistently, especially if prescribed for hyperopia",
      "Attend all follow-up and patching appointments to prevent amblyopia",
      "In adults, manage underlying conditions (diabetes, thyroid disease) that may contribute to squint",
      "If a new squint develops suddenly in an adult, seek urgent medical attention",
    ],
    whenToSeeOptician:
      "Book an eye test urgently if you notice a child's eye turning in any direction, or if an adult develops new double vision or a squint — early assessment and treatment are critical for the best visual outcome.",
    relatedConditions: [
      "hyperopia",
      "myopia",
      "astigmatism",
    ],
    relatedTests: [
      "childrens-eye-test",
      "standard-eye-test",
      "visual-field-test",
    ],
    affectedAge: "Most commonly diagnosed in children under 5, but can develop at any age",
  },
];

// ---------------------------------------------------------------------------
// Eye health guides — informational articles and advice
// ---------------------------------------------------------------------------

export const eyeHealthGuides: EyeHealthGuide[] = [
  // ─── How Often Should You Have an Eye Test? ────────────────────────
  {
    slug: "how-often-should-you-have-an-eye-test",
    title: "How Often Should You Have an Eye Test?",
    category: "advice",
    summary:
      "A clear guide to how frequently you should book an eye test based on your age, health, and risk factors, following UK College of Optometrists recommendations.",
    content: `The College of Optometrists recommends that most adults have a routine eye test at least every two years. However, this is a general guideline, and many people need more frequent testing. If you are over 70, have diabetes, glaucoma, or a family history of eye disease, annual eye tests are strongly recommended. Children should have their first eye test before starting school and then annually throughout their school years, as undetected vision problems can significantly affect learning and development.

Certain groups are entitled to more frequent free NHS eye tests. If you are aged 40 or over with a first-degree relative (parent, sibling, or child) diagnosed with glaucoma, you qualify for a free annual NHS sight test. People with diabetes should attend both their annual NHS Diabetic Eye Screening and a separate routine eye test with their optometrist. Those taking medications that can affect the eyes — such as hydroxychloroquine, corticosteroids, or certain psychiatric medications — may also need more frequent monitoring.

Even if your vision seems fine, regular eye tests are important because many serious eye conditions, including glaucoma and diabetic retinopathy, develop gradually without any symptoms you would notice. An eye test is not just about checking whether you need glasses — it is a comprehensive health check that can detect signs of high blood pressure, diabetes, raised cholesterol, and even brain tumours. Your optometrist examines the blood vessels and nerves at the back of your eye, which are the only place in the body where these structures can be observed directly and non-invasively.

Do not wait for a problem before booking. If you are unsure when your last eye test was, or if it was more than two years ago, book one now. Many high-street opticians offer online booking and free eye tests as part of promotional offers, so cost and convenience should not be barriers. If you notice any sudden changes in your vision — such as flashes, floaters, blurred patches, or pain — do not wait for your next routine appointment. Contact your optician for an urgent assessment the same day.

Your optometrist will advise you on the ideal interval between your appointments based on your individual circumstances. Following their recommendation is one of the simplest and most effective things you can do to protect your long-term sight and overall health.`,
    relatedTests: [
      "standard-eye-test",
      "nhs-eye-test",
      "childrens-eye-test",
      "glaucoma-assessment",
    ],
    relatedConditions: [
      "glaucoma",
      "diabetic-retinopathy",
      "age-related-macular-degeneration",
      "cataracts",
    ],
  },

  // ─── How to Read Your Prescription ─────────────────────────────────
  {
    slug: "how-to-read-your-prescription",
    title: "How to Read Your Glasses Prescription",
    category: "how-to",
    summary:
      "A plain-English explanation of every term on your glasses or contact lens prescription, including SPH, CYL, Axis, Add, and prism.",
    content: `After your eye test, your optometrist will give you a written prescription if you need glasses or a change to your existing pair. This prescription uses standardised abbreviations that can look confusing at first glance, but each term has a straightforward meaning. Understanding your prescription empowers you to shop confidently — whether you buy from your local optician, an online retailer, or a different provider.

The key terms on your prescription are: OD (or R) for your right eye and OS (or L) for your left eye. SPH (sphere) indicates the lens power needed to correct short-sightedness (a minus sign, e.g. -2.00) or long-sightedness (a plus sign, e.g. +1.50). CYL (cylinder) and Axis are used together to correct astigmatism — CYL measures the degree of astigmatism, and Axis (a number between 1 and 180) indicates its orientation. If these boxes are blank, you have no significant astigmatism. Add (addition) is the extra magnifying power needed for reading or close work, typically prescribed for people over 40 with presbyopia. Prism and Base are less common and are used to correct double vision or eye alignment problems.

Your prescription will also include a date and an expiry period. In the UK, a glasses prescription is typically valid for two years (one year for children under 16), though your optometrist may specify a shorter validity if your eyes are changing rapidly. You are legally entitled to a copy of your prescription after your eye test, free of charge, and you are not obliged to buy your glasses from the practice that tested your eyes — you are free to take your prescription to any optician or online retailer.

It is worth noting that a glasses prescription and a contact lens prescription (known as a specification) are not the same. Contact lenses sit directly on the eye rather than in front of it, so the powers may differ, and additional measurements such as base curve and diameter are required. You need a separate contact lens fitting to obtain a contact lens specification, and this must be issued by the practitioner who fitted your lenses.

If any part of your prescription is unclear, ask your optometrist to explain it. They are happy to help, and understanding your prescription means you can make better-informed choices about your eyewear. Keep a copy of your prescription in a safe place — it is useful if you need to order replacement glasses quickly, for example while travelling.`,
    relatedTests: [
      "standard-eye-test",
      "nhs-eye-test",
      "contact-lens-fitting",
    ],
    relatedConditions: [
      "myopia",
      "hyperopia",
      "astigmatism",
      "presbyopia",
    ],
  },

  // ─── What Happens During an Eye Test? ──────────────────────────────
  {
    slug: "what-happens-during-an-eye-test",
    title: "What Happens During an Eye Test?",
    category: "how-to",
    summary:
      "A step-by-step walkthrough of what to expect during a UK eye test, from booking your appointment to receiving your results.",
    content: `An eye test (formally known as a sight test) is a straightforward, painless appointment that typically lasts 20 to 30 minutes. Knowing what to expect can help you feel at ease, especially if it has been a while since your last visit or if you are attending for the first time. Here is what happens at each stage.

When you arrive, you will be asked to fill in or confirm some basic details: your name, address, date of birth, GP details, any medications you take, your general health history, and your family history of eye conditions. This information helps your optometrist tailor the examination to your needs. If you currently wear glasses or contact lenses, bring them along — your optometrist will check your existing prescription as a starting point.

The clinical part of the examination begins with a series of tests. Your optometrist will measure your visual acuity (how clearly you can see) using a letter chart — you will be asked to read letters of decreasing size, first without and then with any correction. A refraction test determines your precise prescription: you look through a series of lenses in a trial frame or phoropter and tell the optometrist which options give the clearest view. You may also be asked to look at a point of light while the optometrist uses a retinoscope to objectively assess your prescription.

Your optometrist will then examine the health of your eyes. Using a slit lamp (a microscope with a bright light), they inspect the front of your eyes — the lids, lashes, cornea, iris, and lens. They will check the pressure inside your eyes (tonometry), which is an important screen for glaucoma. This is usually done with a non-contact puff of air or a gentle probe after numbing drops. Finally, the optometrist examines the back of your eye (the retina and optic nerve) using an ophthalmoscope or retinal camera, often in a dimmed room. Some practices offer an OCT scan as an optional add-on for a more detailed 3D view of the retina.

At the end of the appointment, your optometrist will discuss the results with you, explain any findings, and let you know whether you need glasses, a change to your prescription, or further investigation. If any referral is needed — for example, to a hospital eye clinic — they will arrange this directly. You will receive a copy of your prescription, and the receptionist or dispensing optician can help you choose frames and lenses if needed.`,
    relatedTests: [
      "standard-eye-test",
      "nhs-eye-test",
      "oct-scan",
      "visual-field-test",
    ],
    relatedConditions: [
      "glaucoma",
      "cataracts",
      "myopia",
      "hyperopia",
    ],
  },

  // ─── Tips for Healthy Eyes ─────────────────────────────────────────
  {
    slug: "tips-for-healthy-eyes",
    title: "Tips for Healthy Eyes",
    category: "lifestyle",
    summary:
      "Practical, evidence-based advice for maintaining good eye health throughout your life, from diet and exercise to screen habits and sun protection.",
    content: `Looking after your eyes is one of the most important investments you can make in your long-term health. Many serious eye conditions are preventable or manageable if caught early, and a few simple daily habits can significantly reduce your risk. Here are the key steps recommended by UK eye care professionals.

Attend regular eye tests. This is the single most important action for protecting your sight. Many conditions — including glaucoma, diabetic retinopathy, and macular degeneration — develop without symptoms until significant damage has occurred. A routine eye test can detect these problems years before you notice anything wrong. The College of Optometrists recommends testing at least every two years for most adults, and annually if you are over 70, have diabetes, or have a family history of eye disease.

Protect your eyes from ultraviolet light. UV exposure is linked to an increased risk of cataracts, macular degeneration, and growths on the eye surface. Wear sunglasses that carry the CE or UKCA mark and offer 100% UV-A and UV-B protection whenever you are in bright sunlight. A wide-brimmed hat provides additional protection. This is important year-round, not just in summer — UV levels can be significant on overcast days and at altitude.

Eat a diet that supports eye health. Research consistently links a diet rich in leafy green vegetables (spinach, kale, broccoli), colourful fruits (berries, oranges), oily fish (salmon, mackerel, sardines), nuts, and seeds with a reduced risk of age-related eye conditions. The antioxidants lutein and zeaxanthin, found in high concentrations in leafy greens and eggs, are particularly important for protecting the macula. Omega-3 fatty acids from oily fish support healthy tear film and may help with dry eye.

Stop smoking. Smoking is one of the most significant modifiable risk factors for both cataracts and macular degeneration. Smokers are up to four times more likely to develop AMD than non-smokers. It also worsens diabetic retinopathy and dry eye. Quitting at any age reduces your risk — your GP can provide support through NHS Stop Smoking services.

Manage screen time wisely. Prolonged screen use reduces your blink rate by up to 60%, contributing to dry, tired eyes. Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet (6 metres) away for at least 20 seconds. Ensure your screen is positioned slightly below eye level, adjust brightness to match your surroundings, and consider using a blue light filter in the evening to support healthy sleep patterns.`,
    relatedTests: [
      "standard-eye-test",
      "oct-scan",
      "dry-eye-assessment",
    ],
    relatedConditions: [
      "dry-eye-syndrome",
      "age-related-macular-degeneration",
      "cataracts",
      "glaucoma",
    ],
  },

  // ─── Screen Time and Eye Health ────────────────────────────────────
  {
    slug: "screen-time-and-eye-health",
    title: "Screen Time and Eye Health",
    category: "lifestyle",
    summary:
      "How prolonged screen use affects your eyes, the evidence on blue light, and practical steps to reduce digital eye strain.",
    content: `In the UK, the average adult now spends over 10 hours a day looking at screens — computers, phones, tablets, and televisions combined. While screens do not cause permanent damage to healthy adult eyes, prolonged use is strongly linked to digital eye strain (also known as computer vision syndrome), which causes symptoms such as tired eyes, dryness, headaches, blurred vision, and neck or shoulder pain. Understanding the mechanisms and practical solutions makes a real difference.

The primary cause of screen-related eye discomfort is reduced blinking. Studies show that our blink rate drops by up to 60% during concentrated screen use, and the blinks that do occur are often incomplete — the eyelids do not fully close. This leads to faster tear film evaporation and the gritty, dry, tired sensation that millions of screen workers experience daily. The 20-20-20 rule is the simplest evidence-based countermeasure: every 20 minutes, look at something 20 feet away for 20 seconds, and consciously blink several times.

Blue light from screens has received considerable attention in recent years, but the evidence should be kept in perspective. The amount of blue light emitted by screens is a fraction of what the sun produces, and no robust clinical evidence shows that blue light from screens causes damage to the retina. The College of Optometrists and the American Academy of Ophthalmology both state that blue light blocking lenses are not necessary for preventing eye disease. However, reducing blue light exposure in the evening — using your device's built-in night mode — may help with sleep quality, as blue light can suppress melatonin production.

For children, the relationship between screen time and eye health has an additional dimension. Emerging research suggests that increased near work and insufficient time outdoors are contributing to the rising prevalence of myopia (short-sightedness) in children. While it is difficult to isolate screen use from other near-work activities, encouraging children to spend at least two hours outdoors every day is one of the strongest evidence-based recommendations for reducing myopia risk.

Practical steps for comfortable screen use include: positioning your monitor at arm's length with the top of the screen at or slightly below eye level; adjusting screen brightness to match the ambient lighting; using a desk lamp to illuminate documents rather than relying on screen brightness alone; ensuring your glasses prescription is up to date (a small uncorrected error causes disproportionate strain during screen work); and considering occupational lenses designed for intermediate and near distances if you spend your working day at a computer. If symptoms of digital eye strain persist despite these adjustments, book an eye test — your optometrist can check for underlying dry eye or refractive issues that may need treatment.`,
    relatedTests: [
      "standard-eye-test",
      "dry-eye-assessment",
      "myopia-management",
    ],
    relatedConditions: [
      "dry-eye-syndrome",
      "myopia",
      "presbyopia",
    ],
  },

  // ─── Eye Health for Children ───────────────────────────────────────
  {
    slug: "eye-health-for-children",
    title: "Eye Health for Children",
    category: "advice",
    summary:
      "Everything parents need to know about children's eye health in the UK, from first eye tests and vision screening to spotting problems and NHS entitlements.",
    content: `Good vision is essential for a child's learning, social development, and confidence. Yet many children do not realise they have a sight problem because they have never known anything different. This is why proactive eye testing in childhood is so important — most vision problems are highly treatable if caught early, but some become much harder to correct after the age of seven or eight.

The NHS recommends that all children have a vision screening test in their first year of school (Reception, age 4 to 5). This screening is carried out by the local orthoptist service and typically checks visual acuity in each eye. However, school screening is not a substitute for a comprehensive eye test with an optometrist, which is more thorough and can detect a wider range of conditions including refractive errors, squint, lazy eye (amblyopia), and colour vision deficiency. The College of Optometrists recommends that children have their first full eye test around age three, or earlier if parents have any concerns.

All children under 16 (and those under 19 in full-time education) are entitled to free NHS-funded sight tests and an NHS optical voucher towards the cost of glasses if needed. This means there is no financial barrier to getting your child's eyes tested. You do not need a GP referral — simply call any optician and book an appointment. Children do not need to be able to read to have an eye test; optometrists use picture charts, shape-matching, and objective measurement techniques for younger children.

Signs that a child may have a vision problem include: sitting very close to the television or holding books and devices very close; squinting or tilting their head to see; rubbing their eyes frequently; struggling to read or concentrate at school; one eye turning in or out (squint); clumsiness or poor hand-eye coordination; and complaints of headaches or tired eyes. If you notice any of these signs, book an eye test promptly. It is also worth noting that children of parents who are short-sighted have a higher risk of developing myopia, so proactive testing and myopia management should be discussed with your optometrist.

If your child is prescribed glasses, consistency of wear is key — especially if the glasses are being used to treat a squint, prevent amblyopia, or control myopia progression. Modern children's frames are durable, lightweight, and come in a wide range of styles that children enjoy choosing. Your dispensing optician can help select frames that fit well and are suitable for your child's age and activity level.`,
    relatedTests: [
      "childrens-eye-test",
      "nhs-eye-test",
      "colour-vision-test",
      "myopia-management",
    ],
    relatedConditions: [
      "myopia",
      "strabismus",
      "hyperopia",
      "colour-blindness",
      "astigmatism",
    ],
  },

  // ─── Understanding NHS Eye Test Eligibility ────────────────────────
  {
    slug: "understanding-nhs-eye-test-eligibility",
    title: "Understanding NHS Eye Test Eligibility",
    category: "nhs",
    summary:
      "A comprehensive guide to who qualifies for a free NHS-funded sight test and optical vouchers in the UK, with current eligibility criteria.",
    content: `The NHS provides free sight tests and financial help with the cost of glasses or contact lenses for a wide range of people. If you are eligible, your eye test is identical to a private appointment — the same thorough examination of your vision and eye health — but the cost is covered by the NHS. Many people who qualify for a free test do not realise it, so it is well worth checking the criteria below.

You are entitled to a free NHS sight test if you fall into any of the following groups: you are under 16, or under 19 and in full-time education; you are aged 60 or over; you have been diagnosed with diabetes or glaucoma; you are aged 40 or over and have a first-degree relative (parent, sibling, or child) who has been diagnosed with glaucoma; you are registered blind or partially sighted; you are a prisoner or on probation; you have been prescribed complex lenses; or you receive a qualifying means-tested benefit. Qualifying benefits include Income Support, income-based Jobseeker's Allowance, income-related Employment and Support Allowance, Pension Credit Guarantee Credit, Universal Credit (meeting certain income thresholds), and being named on a valid NHS tax credit exemption certificate (HC2 or HC3).

In addition to a free sight test, eligible patients may receive an NHS optical voucher to help with the cost of glasses or contact lenses. The voucher value depends on the complexity of your prescription — ranging from around £40 for a basic prescription to significantly more for complex lenses. You can use the voucher towards any frames and lenses, though if you choose more expensive options the voucher will cover part of the cost and you pay the difference.

Scotland, Wales, and Northern Ireland have extended NHS eye care entitlements beyond those available in England. In Scotland, free NHS eye tests are available to all residents, regardless of age or income. Wales offers free eye tests through the Eye Health Examination Wales (EHEW) scheme for those with eye conditions or risk factors. Northern Ireland provides free sight tests to all residents. If you live outside England, check with your local health service for the full details of your entitlement.

If you are unsure whether you qualify, your optician can check your eligibility when you book or arrive for your appointment. You may need to bring proof of your qualifying benefit or medical condition. If you are not eligible for a free NHS sight test, many high-street opticians offer competitive private test prices, and some offer free tests as part of promotional deals. Either way, the cost of an eye test is a small price for the reassurance and early detection it provides.`,
    relatedTests: [
      "nhs-eye-test",
      "standard-eye-test",
      "childrens-eye-test",
      "home-visit-eye-test",
    ],
    relatedConditions: [
      "glaucoma",
      "diabetic-retinopathy",
      "cataracts",
    ],
  },

  // ─── Choosing the Right Optician ───────────────────────────────────
  {
    slug: "choosing-the-right-optician",
    title: "Choosing the Right Optician",
    category: "advice",
    summary:
      "How to choose an optician in the UK, what to look for in a practice, and the difference between optometrists, dispensing opticians, and ophthalmologists.",
    content: `Choosing an optician is an important decision, and understanding the differences between the professionals who work in eye care will help you make an informed choice. In the UK, three main titles are used: an optometrist (formerly known as an ophthalmic optician) is a qualified healthcare professional who carries out eye tests, diagnoses eye conditions, and prescribes glasses and contact lenses; a dispensing optician is trained to fit and supply glasses and contact lenses based on a prescription; and an ophthalmologist is a medically qualified doctor who specialises in eye surgery and the treatment of eye diseases, usually based in a hospital or specialist clinic.

When choosing a high-street optician, consider several factors. First, check that the practice is registered with the General Optical Council (GOC) — all optometrists and dispensing opticians in the UK must be registered. Second, consider the range of services offered: does the practice have OCT scanning, visual field testing, or a dry eye clinic? Modern practices investing in advanced equipment can detect problems at an earlier stage. Third, read reviews and ask for recommendations from friends, family, or your GP — patient experience is a strong indicator of quality.

It is also worth considering the practice's approach to patient care. A good optician will take time to listen to your concerns, explain findings clearly, and never pressure you to buy products. They should offer a range of frames and lenses at different price points and be transparent about costs. If you qualify for an NHS-funded eye test, any registered optician can provide this — you are not limited to a particular chain or independent practice.

Accessibility and convenience matter too. Check appointment availability, opening hours (including weekends), online booking options, and whether the practice offers emergency or urgent eye care. If you or a family member has mobility issues, ask whether home visit eye tests are available. For contact lens wearers, look for a practice with a qualified contact lens optician and a good range of lens options, including specialist lenses for astigmatism, presbyopia, and myopia management.

Finally, remember that you are never obliged to buy your glasses from the optician who tested your eyes. By law, you must be given a copy of your prescription at the end of your eye test, and you are free to take it to any optician, online retailer, or spectacle supplier. However, buying from a practice that tested your eyes does offer the advantage of aftercare, adjustments, and the convenience of having all your records in one place. Whatever you decide, the priority is to find a practice where you feel comfortable and confident in the care you receive.`,
    relatedTests: [
      "standard-eye-test",
      "nhs-eye-test",
      "contact-lens-fitting",
      "oct-scan",
    ],
    relatedConditions: [
      "glaucoma",
      "cataracts",
      "dry-eye-syndrome",
    ],
  },

  // ─── When to Get an Emergency Eye Test ─────────────────────────────
  {
    slug: "when-to-get-an-emergency-eye-test",
    title: "When to Get an Emergency Eye Test",
    category: "advice",
    summary:
      "A guide to recognising eye symptoms that require urgent or emergency attention, and where to go for help in the UK.",
    content: `Some eye symptoms require urgent attention — waiting even a few days can mean the difference between saving and losing your sight. Knowing when to act quickly and where to seek help is essential. In many cases, your local optician is the fastest and most appropriate first point of contact, as they have the specialist equipment needed to examine your eyes and can refer you directly to hospital if necessary.

Seek an urgent same-day eye assessment if you experience any of the following: a sudden increase in floaters (especially a shower of small dots or a large new floater); new flashes of light in your vision; a shadow, curtain, or dark area spreading across your field of vision (a warning sign of retinal detachment); sudden loss of vision in one or both eyes; sudden severe eye pain, especially if accompanied by a red eye, nausea, or vomiting (possible acute angle-closure glaucoma); a red, painful eye with sensitivity to light and blurred vision (possible iritis or uveitis); or a chemical splash in the eye (irrigate with clean water immediately and then seek help).

Many optician practices across the UK now offer emergency and urgent eye care services, sometimes funded through NHS commissioning arrangements such as the Minor Eye Conditions Service (MECS) or Community Optometrist Urgent Eyecare Service (CUES). These services allow you to be seen the same day or next day without a GP referral. Call your local optician first — they can triage your symptoms over the phone and advise whether you need to come in immediately, go to A&E, or can be seen the next day.

If your optician cannot see you urgently, or if you experience symptoms outside their opening hours, go to your nearest eye casualty department (sometimes called an emergency eye clinic) at a hospital. Major NHS hospitals with ophthalmology departments run dedicated eye casualty services with shorter waiting times than general A&E. You can also call NHS 111 for advice on where to go. For chemical injuries, call 999 if the substance is particularly hazardous.

It is important not to dismiss sudden eye symptoms as trivial, even if they are painless. Retinal detachment, for example, is painless but causes permanent vision loss if not treated within hours or days. Acute glaucoma can cause irreversible optic nerve damage within hours. If in doubt, always err on the side of caution and seek professional help immediately. Keeping your optician's contact number saved in your phone means you can reach them quickly when it matters most.`,
    relatedTests: [
      "emergency-eye-care",
      "standard-eye-test",
      "oct-scan",
      "visual-field-test",
    ],
    relatedConditions: [
      "floaters-and-flashes",
      "glaucoma",
      "diabetic-retinopathy",
      "conjunctivitis",
    ],
  },

  // ─── Eye Health and Driving ────────────────────────────────────────
  {
    slug: "eye-health-and-driving",
    title: "Eye Health and Driving",
    category: "lifestyle",
    summary:
      "The legal eyesight requirements for driving in the UK, how to check your vision meets the standard, and what to do if you are concerned.",
    content: `In the UK, every driver is legally responsible for ensuring their eyesight meets the minimum standard for driving. The law states that you must be able to read a standard number plate from a distance of 20 metres (approximately five car lengths). In clinical terms, this equates to a visual acuity of approximately 6/12 on the Snellen chart, measured with both eyes open and with glasses or contact lenses if you normally wear them. You must also have an adequate field of vision — at least 120 degrees horizontally — with no significant defects within the central 20 degrees.

Many drivers are unaware that their vision has deteriorated below the legal standard, because changes often occur gradually. The DVLA estimates that as many as one in six motorists on UK roads may have vision that falls below the legal requirement. This is a serious road safety issue: poor vision contributes to an estimated 2,900 casualties on UK roads each year. A simple check is to stand 20 metres from a parked car and try to read its number plate — if you cannot do this comfortably with your usual correction, you should not drive until you have had your eyes tested and, if necessary, updated your glasses.

If you hold a driving licence and develop an eye condition that could affect your ability to drive safely, you are legally required to notify the DVLA. Conditions that must be reported include glaucoma, diabetic retinopathy (if treated with laser or injections), macular degeneration, visual field loss from any cause, double vision, and cataracts that significantly affect your vision. Your optometrist can advise whether your condition is notifiable. Failure to notify the DVLA can invalidate your motor insurance and, in the event of an accident, could result in prosecution.

Professional drivers — including HGV, bus, coach, and taxi drivers — are required to meet higher visual standards than ordinary car drivers. Group 2 licence holders must have a visual acuity of at least 6/7.5 in their better eye and at least 6/60 in the other, along with a wider field of vision requirement. Regular eye testing is particularly important for professional drivers, and your optometrist can carry out a driving vision assessment and provide any required documentation for the DVLA or licensing authority.

Night driving presents additional visual challenges, even for people whose daytime vision meets the standard. Pupil dilation, increased glare from oncoming headlights, and reduced contrast sensitivity all make night driving more demanding. If you notice increased difficulty with night driving, haloes around lights, or glare that was not present before, book an eye test — these symptoms can be caused by early cataracts, uncorrected astigmatism, or dry eye, all of which are treatable. Anti-reflection coatings on your glasses can reduce glare significantly and are well worth considering if you drive regularly after dark.`,
    relatedTests: [
      "dvla-driving-vision-test",
      "standard-eye-test",
      "visual-field-test",
      "cataract-assessment",
    ],
    relatedConditions: [
      "cataracts",
      "glaucoma",
      "age-related-macular-degeneration",
      "myopia",
      "astigmatism",
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Find a single eye condition by its URL-friendly slug.
 * Returns `undefined` if no match is found.
 */
export function getConditionBySlug(slug: string): EyeCondition | undefined {
  return eyeConditions.find((condition) => condition.slug === slug);
}

/**
 * Find a single eye health guide by its URL-friendly slug.
 * Returns `undefined` if no match is found.
 */
export function getGuideBySlug(slug: string): EyeHealthGuide | undefined {
  return eyeHealthGuides.find((guide) => guide.slug === slug);
}

/**
 * Return an array of all available eye condition slugs.
 * Useful for generating static paths and sitemap entries.
 */
export function getAllConditionSlugs(): string[] {
  return eyeConditions.map((condition) => condition.slug);
}

/**
 * Return an array of all available eye health guide slugs.
 * Useful for generating static paths and sitemap entries.
 */
export function getAllGuideSlugs(): string[] {
  return eyeHealthGuides.map((guide) => guide.slug);
}

/**
 * Return all eye conditions that belong to a given category.
 */
export function getConditionsByCategory(
  category: EyeConditionCategory,
): EyeCondition[] {
  return eyeConditions.filter((condition) => condition.category === category);
}

/**
 * Return all eye health guides that belong to a given category.
 */
export function getGuidesByCategory(
  category: EyeHealthGuideCategory,
): EyeHealthGuide[] {
  return eyeHealthGuides.filter((guide) => guide.category === category);
}
