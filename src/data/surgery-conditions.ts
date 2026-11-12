// =============================================================================
// Eye Surgery Conditions – eyetest.co.uk
// Comprehensive medical content for the eye surgery section
// =============================================================================

export type SurgeryCondition = {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  symptoms: string[];
  whenSurgeryNeeded: string;
  surgeryTypes: { name: string; description: string }[];
  recovery: string;
  nhsOrPrivate: string;
  faqs: { question: string; answer: string }[];
  relatedConditions: string[];
  providers: string[];
  /** ISO date the page was last checked against its sources. */
  dateModified?: string;
  sources?: { label: string; url: string }[];
};

// ---------------------------------------------------------------------------
// Surgery conditions — comprehensive UK-focused clinical information
// ---------------------------------------------------------------------------

export const surgeryConditions: SurgeryCondition[] = [
  // ─── Cataracts ───────────────────────────────────────────────────────
  {
    name: "Cataracts",
    slug: "cataracts",
    metaTitle: "Cataract Surgery in the UK | Types, Recovery & NHS Options",
    metaDescription:
      "Cataract surgery in the UK: NHS and private options, lens choices, recovery times and how to find a specialist near you.",
    overview: `<p>A cataract is a clouding of the natural crystalline lens inside the eye, causing vision to become progressively blurred, misty, or faded. Cataracts are very common and mostly affect older adults. The condition develops gradually over months or years as proteins in the lens break down and clump together, scattering light instead of focusing it clearly on the retina.</p>
<p>Cataract surgery is one of the most common operations carried out in the UK. The operation involves removing the cloudy natural lens and replacing it with a clear artificial intraocular lens (IOL). Most people notice their vision improving within a few days.</p>
<p>While cataracts are predominantly age-related, they can also develop as a result of eye injuries, prolonged use of corticosteroid medications, diabetes, smoking, excessive UV exposure, and occasionally as a congenital condition. If you notice any gradual changes to your vision, booking an eye test is the essential first step towards diagnosis and treatment.</p>`,
    symptoms: [
      "Blurred, cloudy, or misty vision that worsens gradually",
      "Increased difficulty seeing in dim or very bright light",
      "Colours appearing faded, washed out, or yellowed",
      "Haloes or glare around lights, particularly when driving at night",
      "Frequent changes to your glasses or contact lens prescription",
      "Double vision in one eye (monocular diplopia)",
      "Difficulty reading small print even with reading glasses",
    ],
    whenSurgeryNeeded: `<p>Cataract surgery is recommended when your cataracts begin to <strong>interfere with your daily activities</strong> and your quality of life. In the early stages, updated glasses or stronger lighting may help you manage, but surgery is the only treatment that can remove a cataract.</p>
<p>Your ophthalmologist or optometrist will typically recommend surgery when:</p>
<ul>
<li>Your vision can no longer be adequately corrected with glasses</li>
<li>You have difficulty driving, reading, watching television, or recognising faces</li>
<li>Glare and haloes make night driving unsafe</li>
<li>Your cataracts are affecting your ability to work or enjoy hobbies</li>
<li>A cataract is preventing treatment or monitoring of another eye condition, such as diabetic retinopathy or macular degeneration</li>
</ul>
<p>There is no medical benefit to waiting until a cataract is "ripe" or fully developed. Modern surgical techniques allow cataracts to be removed at any stage, and earlier intervention often leads to a smoother procedure and faster recovery.</p>`,
    surgeryTypes: [
      {
        name: "Phacoemulsification (standard cataract surgery)",
        description:
          "The most common technique in the UK. A tiny incision (2-3mm) is made in the cornea, and an ultrasound probe is used to break up the cloudy lens into small fragments, which are then gently suctioned out. A clear artificial intraocular lens (IOL) is folded and inserted through the same small incision. The procedure typically takes 15-30 minutes under local anaesthetic eye drops, and stitches are rarely needed.",
      },
      {
        name: "Femtosecond laser-assisted cataract surgery",
        description:
          "A laser is used to perform some of the key steps of cataract surgery, including creating the corneal incision, opening the lens capsule, and softening or fragmenting the cataract before removal. This technology may improve precision, particularly for patients requiring toric or premium lenses. It is typically offered as a private upgrade.",
      },
      {
        name: "Extracapsular cataract extraction (ECCE)",
        description:
          "Used less frequently today, this technique involves a larger incision to remove the cloudy lens in one piece. It may be recommended for very dense or advanced cataracts that cannot be easily broken up with ultrasound. Recovery time is longer and stitches are usually required.",
      },
      {
        name: "Refractive lens exchange",
        description:
          "The same surgical procedure as cataract surgery, but performed on a clear lens that has not yet developed a cataract. It is typically a private procedure chosen by patients over 50 who wish to reduce their dependence on glasses or contact lenses and prevent future cataract development.",
      },
    ],
    recovery: `<p>The NHS says most people recover quickly after cataract surgery. You should be able to go home on the same day, but do not drive yourself home.</p>
<p>After the operation your vision may be blurry for a few hours, your eye may hurt for a few days, and it may take several days for your vision to improve. You will usually use eye drops for about 4 weeks to help the eye heal and prevent infection, and you may be asked to wear a plastic shield at night while it heals. You may still need glasses for reading or distance, and your prescription may be different to before.</p>
<p>Until your doctor says otherwise, the NHS advises: do not rub your eye, do not drive until your vision is back to normal, avoid heavy lifting and sport, do not wear eye make-up, keep water out of your eye and do not go swimming, even with goggles.</p>
<p>Serious complications are rare. Sometimes vision becomes cloudy months or years later because of posterior capsule opacification (PCO), which can be treated with a quick laser procedure. Get help from NHS 111 straight away if you notice new floaters, flashes of light, a shadow moving across your vision or sudden blurring, as these can be signs of a detached retina.</p>`,
    nhsOrPrivate: `<p>Cataract surgery is <strong>available on the NHS</strong> if cataracts are affecting your daily life. The NHS says surgery in adults is not always needed straight away, and your optometrist or GP can refer you to a hospital eye clinic when it is. Waiting times vary by area, so ask your referring optician or the hospital what to expect.</p>
<p>You can also pay for cataract surgery privately. Private clinics publish their own prices. When we checked in November 2026, <strong>Optimax</strong> listed standard monofocal cataract surgery at £2,995 per eye, and <strong>Optegra</strong> listed cataract surgery from £2,995 per eye, with higher prices for premium lens packages. Many NHS cataract operations are also carried out by independent providers on behalf of the NHS, at no cost to you.</p>
<p>Whichever route you choose, ask what the price includes, such as the consultation, lens type, follow-up visits and eye drops.</p>`,
    faqs: [
      {
        question: "Is cataract surgery painful?",
        answer:
          "It is usually done under local anaesthetic, given as eye drops, an injection or both, so you are awake but should not feel pain. You may see movement and changes of light during the operation. Your eye may hurt for a few days afterwards, and you can take painkillers such as paracetamol if you need them.",
      },
      {
        question: "How long does cataract surgery take?",
        answer:
          "The NHS says the operation usually takes between 20 and 45 minutes. Allow longer for your whole visit, as you will have eye drops and checks before and after surgery.",
      },
      {
        question: "Will I need glasses after cataract surgery?",
        answer:
          "This depends on the type of intraocular lens implanted. A standard monofocal lens, used in NHS surgery, corrects distance vision, so you will typically still need reading glasses. Premium multifocal or extended depth of focus lenses can reduce or eliminate dependence on glasses for both distance and near vision, though some patients may still prefer glasses for prolonged close work.",
      },
      {
        question: "Can cataracts come back after surgery?",
        answer:
          "No. Once a cataract has been removed and replaced with an artificial lens, it cannot return. Some people later develop posterior capsule opacification (PCO), sometimes called a 'secondary cataract', where the membrane behind the lens becomes cloudy. This is quickly and permanently treated with a painless YAG laser procedure.",
      },
      {
        question: "What is the difference between NHS and private cataract surgery?",
        answer:
          "The operation itself is the same. Paying privately can mean a shorter wait, more choice of lens types and choosing your surgeon, but you pay for it. NHS surgery is free, and is often carried out by independent providers on behalf of the NHS.",
      },
      {
        question: "Can both eyes be done at the same time?",
        answer:
          "The NHS says that if you have cataracts in both eyes, they will be treated on separate days. This lets the first eye heal before the second is done.",
      },
    ],
    relatedConditions: [
      "glaucoma-surgery",
      "macular-degeneration",
      "diabetic-eye-disease",
    ],
    providers: [
      "new-medica",
      "spa-medica",
      "optegra",
      "chec",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Cataract surgery", url: "https://www.nhs.uk/tests-and-treatments/cataract-surgery/" },
      { label: "NHS: Cataracts", url: "https://www.nhs.uk/conditions/cataracts/" },
      { label: "Optimax: Treatment prices", url: "https://www.optimax.co.uk/treatment-cost/" },
      { label: "Optegra: Cataract surgery costs", url: "https://www.optegra.com/cataract-surgery/costs/" },
    ],
  },

  // ─── Glaucoma Surgery ────────────────────────────────────────────────
  {
    name: "Glaucoma Surgery",
    slug: "glaucoma-surgery",
    metaTitle:
      "Glaucoma Surgery UK: Treatments, Costs and Clinics",
    metaDescription:
      "Learn about glaucoma surgery options in the UK including SLT laser, trabeculectomy, and MIGS. Compare NHS and private treatment pathways and find specialist providers.",
    overview: `<p>Glaucoma is a group of eye conditions in which the optic nerve is progressively damaged, usually due to raised pressure inside the eye (intraocular pressure, or IOP).</p>
<p>The most common form, <strong>primary open-angle glaucoma</strong>, develops slowly over many years and typically causes a gradual loss of peripheral vision. Less common but more acute forms, such as angle-closure glaucoma, can cause sudden symptoms including severe eye pain, headache, and rapid vision loss requiring emergency treatment. Once vision is lost to glaucoma, it cannot be restored, which makes early detection through regular eye tests critically important.</p>
<p>Treatment for glaucoma aims to lower the pressure inside the eye to prevent further damage to the optic nerve. While eye drops are usually the first-line treatment, surgery may be recommended when drops are insufficient, poorly tolerated, or when the disease is progressing despite medical therapy. Advances in surgical techniques, including minimally invasive glaucoma surgery (MIGS), have significantly expanded the options available to patients in recent years.</p>`,
    symptoms: [
      "Gradual loss of peripheral (side) vision, often unnoticed until advanced",
      "Tunnel vision in later stages of the disease",
      "Blurred vision that cannot be corrected with glasses",
      "Haloes or rainbow-coloured rings around lights",
      "Difficulty adjusting to dark rooms",
      "In acute angle-closure glaucoma: sudden severe eye pain, headache, nausea, vomiting, and red eye",
      "Eye pressure or aching sensation around the eye",
    ],
    whenSurgeryNeeded: `<p>Surgery for glaucoma is typically recommended when <strong>other treatments have not adequately controlled the intraocular pressure</strong>, or when the disease is progressing despite maximum medical therapy. Your ophthalmologist may recommend surgery when:</p>
<ul>
<li>Eye drops are not sufficiently lowering your eye pressure</li>
<li>You are unable to tolerate the side effects of eye drop medications</li>
<li>You have difficulty using eye drops consistently (adherence problems)</li>
<li>The glaucoma is advanced at diagnosis and requires more aggressive pressure reduction</li>
<li>You have a type of glaucoma that responds better to surgical intervention</li>
</ul>
<p>Recent UK research, including the landmark <strong>LiGHT trial</strong>, has shown that selective laser trabeculoplasty (SLT) can be as effective as eye drops as a first-line treatment. NICE now supports the use of SLT as an initial treatment option, and it is increasingly offered early in the treatment pathway rather than as a last resort.</p>`,
    surgeryTypes: [
      {
        name: "Selective Laser Trabeculoplasty (SLT)",
        description:
          "A quick outpatient laser procedure that improves the drainage of fluid from the eye by targeting the trabecular meshwork. It can be repeated if the effect diminishes over time. Now supported by NICE as a first-line treatment.",
      },
      {
        name: "Trabeculectomy",
        description:
          "The most established surgical procedure for glaucoma. A small flap is created in the sclera (white of the eye) to create a new drainage channel, allowing fluid to drain into a small blister (bleb) under the conjunctiva. It is highly effective at reducing eye pressure but requires careful post-operative monitoring. Recovery takes several weeks.",
      },
      {
        name: "Tube shunt (glaucoma drainage device)",
        description:
          "A tiny silicone tube is implanted in the eye to drain aqueous fluid to a small plate positioned on the outside of the eye. This procedure is often used when trabeculectomy has failed or for complex glaucoma cases. Common devices include the Baerveldt and Ahmed valves.",
      },
      {
        name: "Minimally Invasive Glaucoma Surgery (MIGS)",
        description:
          "A group of newer procedures that use microscopic incisions and tiny implants to improve fluid drainage from the eye. MIGS procedures, including iStent, Hydrus, and Xen gel stent, are less invasive than traditional surgery, have faster recovery times, and are often combined with cataract surgery. They are best suited for mild to moderate glaucoma.",
      },
      {
        name: "Laser Peripheral Iridotomy (LPI)",
        description:
          "A laser is used to create a tiny hole in the peripheral iris, allowing fluid to flow more freely within the eye. This is the standard treatment for angle-closure glaucoma and is also used preventively in eyes at risk of angle closure. The procedure takes a few minutes and is performed as an outpatient.",
      },
    ],
    recovery: `<p>Recovery from glaucoma surgery varies depending on the type of procedure performed. <strong>SLT laser treatment</strong> has minimal recovery time, most patients can return to normal activities the same day, though mild inflammation or discomfort may last a few days.</p>
<p>For <strong>trabeculectomy</strong>, recovery is more involved. You will need to use anti-inflammatory and antibiotic eye drops for several weeks, and your surgeon will see you frequently in the first month to monitor healing and adjust the drainage as needed. You should avoid heavy lifting, bending, and strenuous exercise for 2-4 weeks. Full recovery typically takes <strong>6 to 8 weeks</strong>.</p>
<p><strong>MIGS procedures</strong> generally have a faster recovery, particularly when performed alongside cataract surgery. Most patients return to normal activities within a few days to a week.</p>
<p>Regardless of the procedure, you will require <strong>lifelong monitoring</strong>. Glaucoma is a chronic condition that cannot be cured, only managed. Regular follow-up appointments and, in many cases, continued use of eye drops alongside surgery are essential to protect your remaining vision.</p>`,
    nhsOrPrivate: `<p>Glaucoma treatment, including eye drops, laser treatment and surgery, is <strong>available on the NHS</strong>. You will be referred to a specialist eye doctor (ophthalmologist) if an optometrist finds signs of glaucoma, and you will have regular follow-up appointments to check the treatment is working.</p>
<p>Some private eye hospitals also offer glaucoma laser treatment and surgery. Prices vary by procedure and provider, so ask for a written quote that covers the consultation, the procedure and follow-up care.</p>
<p>If you are aged 40 or over and your parent, brother, sister or child has glaucoma, you can get <strong>free NHS eye tests</strong>. Regular eye tests are the best way to find glaucoma early, because it usually has no symptoms at first.</p>`,
    faqs: [
      {
        question: "Can glaucoma be cured with surgery?",
        answer:
          "No. Glaucoma cannot be cured, but surgery can effectively lower eye pressure and slow or halt further damage to the optic nerve. Any vision already lost to glaucoma cannot be restored, which is why early detection and treatment are so important. Surgery aims to preserve the vision you have.",
      },
      {
        question: "What is SLT and is it better than eye drops?",
        answer:
          "Selective Laser Trabeculoplasty (SLT) is a quick, painless laser procedure that improves fluid drainage from the eye. The UK LiGHT trial showed that SLT is at least as effective as eye drops for newly diagnosed open-angle glaucoma, and NICE now recommends it as an option for first-line treatment. It avoids the daily burden and side effects of eye drops.",
      },
      {
        question: "Is glaucoma surgery painful?",
        answer:
          "Glaucoma surgery is performed under local anaesthesia and is not painful during the procedure itself. You may feel some pressure or mild discomfort. After surgery, some soreness, redness, and watering of the eye is normal and usually settles within a few days. Pain relief with paracetamol is usually sufficient.",
      },
      {
        question: "How successful is glaucoma surgery?",
        answer:
          "Success rates vary by procedure. MIGS procedures have lower complication rates but may achieve more modest pressure reductions. Your surgeon will discuss the expected outcomes for your specific situation.",
      },
      {
        question: "Will I still need eye drops after glaucoma surgery?",
        answer:
          "Some patients can reduce or stop their eye drop medications after surgery, while others will still need drops, possibly at a lower dose. This depends on the type of surgery, the severity of your glaucoma, and how well the surgery controls your eye pressure. Your ophthalmologist will adjust your medications at follow-up appointments.",
      },
    ],
    relatedConditions: [
      "cataracts",
      "diabetic-eye-disease",
      "corneal-conditions",
    ],
    providers: [
      "new-medica",
      "spa-medica",
      "chec",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Glaucoma", url: "https://www.nhs.uk/conditions/glaucoma/" },
      { label: "NHS: Free NHS eye tests and optical vouchers", url: "https://www.nhs.uk/nhs-services/opticians/free-nhs-eye-tests-and-optical-vouchers/" },
    ],
  },

  // ─── Macular Degeneration ────────────────────────────────────────────
  {
    name: "Macular Degeneration",
    slug: "macular-degeneration",
    metaTitle:
      "Macular Degeneration Treatment UK: AMD Injections",
    metaDescription:
      "Macular degeneration (AMD) treatment in the UK: anti-VEGF injections for wet AMD, options for dry AMD, NHS care and specialist providers.",
    overview: `<p>Age-related macular degeneration (AMD) is a progressive eye condition that affects the <strong>macula</strong>, the small central area of the retina responsible for sharp, detailed vision used for reading, driving, and recognising faces.</p>
<p>There are two main forms of AMD. <strong>Dry AMD</strong> (also called atrophic AMD) is the most common type and involves a gradual thinning and deterioration of the macular cells. It progresses slowly over years and currently has limited treatment options, though new therapies are emerging. <strong>Wet AMD</strong> (neovascular AMD) is less common but is responsible for the majority of severe vision loss from the condition. It occurs when abnormal blood vessels grow beneath the retina, leaking fluid and blood that damage the macula.</p>
<p>While AMD does not cause total blindness, peripheral vision is preserved, the loss of central vision can have a profound impact on independence and quality of life. Early detection through regular eye tests, prompt treatment of wet AMD with anti-VEGF injections, and lifestyle modifications can all help to preserve vision for longer.</p>`,
    symptoms: [
      "Blurred or distorted central vision (straight lines may appear wavy or bent)",
      "A dark or empty area in the centre of your vision",
      "Difficulty reading, even with reading glasses",
      "Colours appearing less vivid or harder to distinguish",
      "Difficulty recognising faces",
      "Needing brighter light for close-up tasks",
      "Slow recovery of visual function after exposure to bright light",
      "In wet AMD: rapid onset of visual distortion or sudden worsening of central vision",
    ],
    whenSurgeryNeeded: `<p>Treatment for macular degeneration depends on the type and stage of the disease. Strictly speaking, AMD is treated with <strong>injections rather than conventional surgery</strong>, though the procedure is performed in a clinical or operating theatre setting.</p>
<p><strong>Wet AMD</strong> requires urgent treatment with anti-VEGF (anti-vascular endothelial growth factor) injections. Treatment should start <strong>as soon as possible</strong> after diagnosis to prevent irreversible damage. You should seek treatment urgently if you notice:</p>
<ul>
<li>Sudden distortion of your vision (straight lines appearing wavy)</li>
<li>A rapid deterioration in your central vision</li>
<li>A new dark spot or blank area in the centre of your vision</li>
</ul>
<p>For <strong>dry AMD</strong>, there is currently no widely available surgical treatment on the NHS, though clinical trials are ongoing. New complement inhibitor therapies (such as pegcetacoplan) have recently been approved in some countries and may become available in the UK. Photobiomodulation (PBM) therapy is offered by some private providers for early to intermediate dry AMD.</p>`,
    surgeryTypes: [
      {
        name: "Anti-VEGF intravitreal injections",
        description:
          "The standard treatment for wet AMD. Medications such as ranibizumab (Lucentis), aflibercept (Eylea), faricimab (Vabysmo), or bevacizumab (Avastin) are injected directly into the vitreous cavity of the eye to block the growth factor that drives abnormal blood vessel formation. Treatment typically begins with a loading phase of monthly injections for 3 months, followed by ongoing injections at intervals determined by your response. The injection takes seconds and is performed under local anaesthetic drops.",
      },
      {
        name: "Photobiomodulation (PBM) therapy",
        description:
          "A non-invasive light-based therapy for early to intermediate dry AMD. Low-level light energy is delivered to the retina via a comfortable eye mask device. Clinical studies have shown improvements in visual function and retinal structure. PBM is currently available only as a private treatment in the UK and typically involves a course of 9 sessions.",
      },
      {
        name: "Photodynamic therapy (PDT)",
        description:
          "A light-activated treatment occasionally used for certain subtypes of wet AMD. A photosensitive drug (verteporfin) is injected intravenously and then activated by a non-thermal laser applied to the retina. PDT is less commonly used since the widespread adoption of anti-VEGF therapy but remains an option for specific cases.",
      },
      {
        name: "Vitrectomy surgery (rare cases)",
        description:
          "In rare and severe cases of wet AMD with significant submacular haemorrhage (bleeding beneath the macula), vitrectomy surgery may be performed to remove blood and deliver medication directly beneath the retina. This is typically reserved for emergency situations and is not a routine AMD treatment.",
      },
    ],
    recovery: `<p>Recovery from <strong>anti-VEGF injections</strong> is minimal. The procedure itself takes only a few minutes, and most patients can return home shortly afterwards. You may experience mild discomfort, redness, or a gritty sensation in the eye for a day or two. Your vision may be slightly blurry immediately after the injection due to the anaesthetic drops and the injection itself, but this typically clears within a few hours.</p>
<p>You will be advised to <strong>avoid rubbing your eye</strong> and to use antibiotic eye drops for a few days after each injection. </p>
<p>It is important to understand that anti-VEGF treatment is <strong>ongoing</strong>. Most patients require injections at regular intervals, initially monthly, then potentially less frequently, for months or years. The goal is to stabilise or improve your vision, and regular monitoring with OCT scans is essential to determine when further injections are needed.</p>
<p>For <strong>PBM therapy</strong>, there is no recovery time. Sessions last approximately 35 minutes, and you can resume normal activities immediately afterwards.</p>`,
    nhsOrPrivate: `<p><strong>Treatment for wet AMD is available on the NHS</strong>. It is usually given as injections into the eye at a hospital eye clinic, and needs to start as soon as possible after diagnosis. If you notice sudden changes in your central vision, such as straight lines looking wavy, see an optician or get advice from NHS 111 straight away.</p>
<p>There is currently no NHS treatment that reverses <strong>dry AMD</strong>. The NHS can help with support, low vision aids and monitoring for any change to wet AMD.</p>
<p>Some private eye hospitals offer assessments and treatment for AMD. Prices vary, so ask for a written quote and check whether ongoing injections are included, as treatment often continues for a long time.</p>`,
    faqs: [
      {
        question: "What is the difference between dry and wet AMD?",
        answer:
          "Dry AMD is the more common form and involves a gradual deterioration of the macular cells over years. Wet AMD is less common but more serious and occurs when abnormal blood vessels grow beneath the retina, leaking fluid and blood. Wet AMD can cause rapid vision loss but is treatable with anti-VEGF injections. Dry AMD can sometimes progress to wet AMD.",
      },
      {
        question: "Are anti-VEGF injections painful?",
        answer:
          "The eye is numbed with anaesthetic drops before the injection, so most patients feel only a brief pressure sensation. Some describe a slight stinging from the antiseptic drops used to clean the eye. Any discomfort after the procedure is usually mild and short-lived. Many patients report that the anticipation is worse than the injection itself.",
      },
      {
        question: "How many injections will I need for wet AMD?",
        answer:
          "Treatment typically starts with a loading phase of one injection per month for three months. After that, the frequency depends on how your eye responds. Some patients move to injections every 8-12 weeks, while others may need them more or less frequently. Treatment is usually ongoing for several years, with regular OCT monitoring to guide the schedule.",
      },
      {
        question: "Can I prevent macular degeneration?",
        answer:
          "While you cannot change risk factors such as age, genetics, or ethnicity, you can reduce your risk by not smoking (the single most modifiable risk factor), eating a diet rich in leafy green vegetables and oily fish, maintaining a healthy weight, wearing UV-protective sunglasses, and having regular eye tests. The AREDS2 supplement formula may slow progression in some cases of intermediate dry AMD.",
      },
      {
        question: "Will I go blind from macular degeneration?",
        answer:
          "AMD does not cause total blindness. It affects the central vision used for detailed tasks, but peripheral (side) vision is preserved. With prompt treatment for wet AMD, many patients can maintain useful central vision for years. Low-vision aids and support services can help you adapt and maintain your independence.",
      },
    ],
    relatedConditions: [
      "cataracts",
      "diabetic-eye-disease",
      "retinal-detachment",
    ],
    providers: [
      "new-medica",
      "spa-medica",
      "optegra",
      "chec",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Age-related macular degeneration (AMD)", url: "https://www.nhs.uk/conditions/age-related-macular-degeneration-amd/" },
      { label: "NHS: Treatment for AMD", url: "https://www.nhs.uk/conditions/age-related-macular-degeneration-amd/treatment/" },
    ],
  },

  // ─── Laser Eye Surgery ───────────────────────────────────────────────
  {
    name: "Laser Eye Surgery",
    slug: "laser-eye-surgery",
    metaTitle:
      "Laser Eye Surgery UK: LASIK, LASEK, SMILE and Costs",
    metaDescription:
      "Laser eye surgery in the UK: LASIK, LASEK and SMILE compared, typical costs, who is suitable and how to find a clinic near you.",
    overview: `<p>Laser eye surgery, also known as laser vision correction, is a group of refractive procedures that use precisely controlled laser energy to reshape the cornea, the clear front surface of the eye, to correct common vision problems. The goal is to reduce or eliminate dependence on glasses or contact lenses for short-sightedness (myopia), long-sightedness (hyperopia), astigmatism, and age-related reading difficulty (presbyopia).</p>
<p>Laser eye surgery has been carried out since the 1990s. Many people can see well enough to drive without glasses afterwards, though results vary and some people still need glasses for some tasks, especially reading as they get older.</p>
<p>Laser eye surgery is a private procedure in the UK. It is not available on the NHS except in very rare circumstances. Choosing a reputable clinic with experienced surgeons, advanced technology, and comprehensive pre-operative screening is essential for the safest and best outcomes. A thorough suitability assessment, including detailed measurements of your corneal thickness, shape, and pupil size, will determine which type of laser surgery is most appropriate for your eyes.</p>`,
    symptoms: [
      "Dependence on glasses or contact lenses for distance vision (myopia)",
      "Difficulty seeing objects at arm's length without glasses (hyperopia)",
      "Blurred or distorted vision at all distances (astigmatism)",
      "Difficulty focusing on close-up tasks after age 40 (presbyopia)",
      "Contact lens discomfort or intolerance",
      "Desire for greater freedom from corrective eyewear for sport, travel, or lifestyle reasons",
    ],
    whenSurgeryNeeded: `<p>Laser eye surgery is an <strong>elective procedure</strong>. It is chosen by the patient rather than being medically necessary. However. It can significantly improve quality of life for people who are dependent on glasses or contact lenses. You may be a suitable candidate if:</p>
<ul>
<li>You are <strong>aged 18 or over</strong> (ideally 21+, when your prescription is more likely to have stabilised)</li>
<li>Your glasses or contact lens prescription has been <strong>stable for at least 12 months</strong></li>
<li>You have <strong>healthy eyes</strong> with no active eye diseases such as keratoconus, severe dry eye, glaucoma, or cataracts</li>
<li>Your corneas are <strong>thick enough</strong> for the laser treatment (determined by pre-operative measurements)</li>
<li>You understand the potential risks and have realistic expectations about the outcome</li>
</ul>
<p>Laser eye surgery is <strong>not suitable for everyone</strong>. You may not be eligible if you are pregnant or breastfeeding, have an autoimmune condition affecting healing, have very high prescriptions beyond the treatable range, or have corneas that are too thin. A comprehensive suitability assessment is the essential first step.</p>`,
    surgeryTypes: [
      {
        name: "LASIK (Laser-Assisted in Situ Keratomileusis)",
        description:
          "The most popular type of laser eye surgery worldwide. A thin flap is created on the corneal surface using a femtosecond laser, the flap is lifted, and an excimer laser reshapes the underlying corneal tissue to correct the refractive error. The flap is then repositioned and heals naturally without stitches. LASIK offers rapid visual recovery, most patients see clearly within hours, and minimal discomfort. It corrects myopia up to approximately -10.00D, hyperopia up to +4.00D, and astigmatism up to 6.00D.",
      },
      {
        name: "LASEK/PRK (Photorefractive Keratectomy)",
        description:
          "The surface layer of the cornea (epithelium) is gently removed or loosened, and the excimer laser reshapes the exposed corneal surface. No flap is created, making LASEK/PRK suitable for patients with thinner corneas or those involved in contact sports. Recovery is slower than LASIK, vision typically stabilises over 1 to 3 weeks, and there is more discomfort in the first few days. The final visual outcome is comparable to LASIK.",
      },
      {
        name: "ReLEx SMILE (Small Incision Lenticule Extraction)",
        description:
          "A newer, minimally invasive technique that uses a femtosecond laser to create a small disc of tissue (lenticule) within the cornea, which is then removed through a tiny keyhole incision of just 2-4mm. No flap is created, preserving more corneal biomechanical strength and reducing dry eye risk. SMILE is currently approved for myopia and astigmatism correction. Recovery is faster than LASEK and comparable to LASIK.",
      },
      {
        name: "Presbyond Laser Blended Vision",
        description:
          "A modified LASIK procedure designed for patients over 40 who need reading glasses (presbyopia). The dominant eye is corrected for distance vision while the non-dominant eye is adjusted for near vision, with an overlap zone that the brain blends seamlessly. This avoids the need for both distance and reading glasses. Most suitable patients adapt to blended vision.",
      },
    ],
    recovery: `<p>Recovery from laser eye surgery depends on the technique used. With <strong>LASIK</strong>, most patients notice a dramatic improvement in vision within <strong>a few hours</strong> of the procedure. You may experience some dryness, mild discomfort, and light sensitivity for the first 24-48 hours, but most people return to work within 1-2 days. Vision continues to refine over the following weeks.</p>
<p>With <strong>LASEK/PRK</strong>, recovery is slower. You will wear a bandage contact lens for 4-5 days while the surface epithelium heals. There may be more discomfort, watering, and light sensitivity during this period. Vision typically takes <strong>1 to 3 weeks</strong> to stabilise, and you may need 3-5 days off work. The final visual outcome is comparable to LASIK.</p>
<p>With <strong>SMILE</strong>, recovery is similar to LASIK, with most patients seeing well within <strong>24-48 hours</strong> and returning to normal activities within a day or two.</p>
<p>All patients should use lubricating eye drops for several weeks after surgery and avoid swimming, contact sports, and eye make-up for at least 2-4 weeks. You will have follow-up appointments at 1 day, 1 week, 1 month, and 3 months post-operatively. Most patients achieve their final stable prescription within 3 to 6 months.</p>`,
    nhsOrPrivate: `<p>Laser eye surgery is <strong>usually only available privately</strong>. The NHS says you may be able to get it on the NHS if you have an eye condition that could lead to loss of vision, or sight problems that cannot be corrected with glasses or contact lenses.</p>
<p>Private clinics publish their own prices, and the price you pay can depend on your prescription and the type of treatment. When we checked each clinic's own website in November 2026:</p>
<ul>
<li><strong>Optical Express:</strong> LASEK from £549 per eye and LASIK from £1,295 per eye, depending on prescription</li>
<li><strong>Optimax:</strong> LASIK or LASEK £1,295 per eye</li>
<li><strong>Optegra:</strong> LASEK £1,495, LASIK £2,095 and SMILE £2,695 per eye</li>
<li><strong>Moorfields Private:</strong> £5,682 for both eyes as a package</li>
</ul>
<p>The Royal College of Ophthalmologists suggests checking that your surgeon is on the GMC specialist register for ophthalmology and holds its Certificate in Laser Refractive Surgery. Look at what the price includes, such as consultations, aftercare and any further treatment, not just the headline figure.</p>
<p>See our <a href="/articles/laser-eye-surgery-cost">laser eye surgery cost guide</a> for the full price list from each clinic.</p>`,
    faqs: [
      {
        question: "Am I too old for laser eye surgery?",
        answer:
          "There is no strict upper age limit, but suitability depends on your eye health and prescription. Patients over 40 may be developing presbyopia (difficulty focusing up close) and may benefit from Presbyond Laser Blended Vision rather than standard LASIK. Patients over 50-55 may be better suited to lens replacement surgery, as cataracts may develop in the coming years. A thorough assessment will determine the best option for your age and eyes.",
      },
      {
        question: "Is laser eye surgery permanent?",
        answer:
          "The laser treatment itself permanently reshapes the cornea. However, your eyes can still change over time. A small percentage of patients experience some regression (return of a slight prescription), particularly those with higher initial prescriptions. Age-related changes such as presbyopia and cataracts will still occur. An enhancement (retreatment) can often be performed if needed.",
      },
      {
        question: "What are the risks of laser eye surgery?",
        answer:
          "Serious complications are very rare with modern techniques. The most common side effects include dry eyes (usually temporary), night-time haloes or glare around lights, and minor over- or under-correction. Significant complications are uncommon. Serious problems that threaten sight, such as infection or weakening of the cornea (ectasia), are rare. Ask your surgeon about the risks for your eyes.",
      },
      {
        question: "How do I choose between LASIK and LASEK?",
        answer:
          "Your surgeon will recommend the most appropriate procedure based on your corneal thickness, prescription, pupil size, and lifestyle. LASIK offers faster recovery and less discomfort, while LASEK may be more suitable if your corneas are thinner or you are involved in contact sports. Both achieve comparable final visual outcomes. SMILE offers a newer alternative combining benefits of both.",
      },
      {
        question: "Can laser eye surgery correct reading vision (presbyopia)?",
        answer:
          "Yes, Presbyond Laser Blended Vision is specifically designed to reduce dependence on reading glasses for patients over 40. It adjusts each eye slightly differently so that together they cover both distance and near vision. Most suitable patients adapt to blended vision. However. It is a compromise, some patients may still prefer glasses for prolonged close work or very fine detail.",
      },
    ],
    relatedConditions: [
      "corneal-conditions",
      "cataracts",
      "eyelid-surgery",
    ],
    providers: [
      "optegra",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Laser eye surgery and lens surgery", url: "https://www.nhs.uk/tests-and-treatments/laser-eye-surgery-and-lens-surgery/" },
      { label: "The Royal College of Ophthalmologists: Refractive surgery patient checklist", url: "https://www.rcophth.ac.uk/wp-content/uploads/2020/05/Refractive-Surgery-Patient-Checklist_April2017.pdf" },
      { label: "Optical Express: Laser eye surgery pricing", url: "https://www.opticalexpress.co.uk/laser-eye-surgery/pricing" },
      { label: "Optimax: Treatment prices", url: "https://www.optimax.co.uk/treatment-cost/" },
      { label: "Optegra: Laser eye surgery costs", url: "https://www.optegra.com/laser-eye-surgery/costs/" },
      { label: "Moorfields Private: Laser eye surgery cost", url: "https://www.moorfields.nhs.uk/private/eye-conditions-and-treatments/laser-eye-surgery/laser-eye-surgery-cost" },
    ],
  },

  // ─── Retinal Detachment ──────────────────────────────────────────────
  {
    name: "Retinal Detachment",
    slug: "retinal-detachment",
    metaTitle:
      "Retinal Detachment Surgery UK: Treatment and Recovery",
    metaDescription:
      "Retinal detachment surgery in the UK: the warning signs, emergency treatment, what recovery involves and where to find specialist care.",
    overview: `<p>Retinal detachment is a <strong>sight-threatening emergency</strong> in which the retina, the thin layer of light-sensitive tissue that lines the back of the eye, separates from its underlying supportive tissue. When the retina detaches. It is cut off from its blood supply and oxygen, causing the affected photoreceptor cells to begin dying. Without prompt surgical treatment, retinal detachment can lead to <strong>permanent vision loss</strong> in the affected eye.</p>
<p>The most common type, <strong>rhegmatogenous retinal detachment</strong>, occurs when a tear or hole develops in the retina, allowing fluid from the vitreous cavity to seep underneath and lift the retina away. This is often preceded by a posterior vitreous detachment (PVD), a common age-related change in which the vitreous gel separates from the retina.</p>
<p>Risk factors include <strong>high myopia</strong> (short-sightedness), previous eye surgery (including cataract surgery), a family history of retinal detachment, eye injuries, and certain retinal conditions such as lattice degeneration. Retinal detachment is more common in people over 50, but it can occur at any age. Recognising the warning signs, sudden onset of floaters, flashes of light, or a shadow across your vision, and seeking immediate medical attention is critical for the best outcome.</p>`,
    symptoms: [
      "Sudden increase in floaters (dark spots, strings, or cobwebs drifting across vision)",
      "Flashes of light (photopsia), particularly in peripheral vision",
      "A shadow, curtain, or dark veil spreading across part of your visual field",
      "Sudden blurred or distorted vision",
      "Loss of peripheral vision that progresses towards central vision",
      "A sensation of heaviness in the eye",
    ],
    whenSurgeryNeeded: `<p>Retinal detachment is a <strong>medical emergency</strong> that requires surgery as soon as possible. The timing of surgery is critical:</p>
<ul>
<li>If the <strong>macula is still attached</strong> (macula-on detachment), surgery should ideally be performed within <strong>24 hours</strong> to prevent the detachment from reaching the centre of the retina, which gives the best chance of preserving detailed central vision</li>
<li>If the <strong>macula has already detached</strong> (macula-off detachment), surgery is still urgent and is typically performed within <strong>a few days</strong>. Visual recovery may be more limited, but surgery can still preserve useful vision and prevent total blindness in the affected eye</li>
</ul>
<p>If you experience a <strong>sudden onset of floaters, flashes, or a shadow across your vision</strong>, you should seek immediate medical attention. Contact your nearest eye casualty department (A&E), call NHS 111, or see an emergency optometrist. Do not wait for a routine appointment.</p>
<p>Retinal <strong>tears and holes</strong> that have not yet progressed to a full detachment can often be treated with laser or cryotherapy as an outpatient, preventing the need for more invasive surgery.</p>`,
    surgeryTypes: [
      {
        name: "Vitrectomy",
        description:
          "The most commonly performed surgery for retinal detachment in the UK. The vitreous gel is removed from inside the eye and replaced with a gas bubble or silicone oil that presses the retina back into place. Laser or cryotherapy is used to seal the retinal tear. A gas bubble gradually absorbs over 2-8 weeks; silicone oil may need to be removed in a second operation. Vitrectomy is performed under local or general anaesthesia and takes approximately 1-2 hours.",
      },
      {
        name: "Scleral buckle surgery",
        description:
          "A silicone band or sponge is stitched to the outside of the eye (the sclera), indenting the eye wall inward to bring it closer to the detached retina. This relieves the pulling force (traction) on the retina and allows it to reattach. Cryotherapy is applied to seal the retinal tear. The buckle is usually left in place permanently. This technique is often used for simpler detachments, particularly in younger patients.",
      },
      {
        name: "Pneumatic retinopexy",
        description:
          "A gas bubble is injected into the vitreous cavity of the eye in an outpatient setting. The patient then positions their head so that the bubble presses against the retinal tear, holding the retina in place while laser or cryotherapy seals it. This technique is suitable for specific types of detachment where the tear is in the upper part of the retina. Strict head positioning must be maintained for several days.",
      },
      {
        name: "Laser retinopexy (for retinal tears)",
        description:
          "A laser is used to create small burns around a retinal tear or hole, forming scar tissue that seals the retina to the underlying tissue and prevents fluid from passing through. This is a preventive treatment performed as an outpatient when a tear is detected before a full detachment develops. It takes approximately 15-30 minutes and is performed under local anaesthetic drops.",
      },
      {
        name: "Cryotherapy (for retinal tears)",
        description:
          "A freezing probe is applied to the outside of the eye over the area of a retinal tear, creating an adhesive scar that seals the retina. Like laser retinopexy, this is a preventive treatment for tears or holes detected before a full detachment occurs. It is often used when the tear is in a position difficult to access with a laser.",
      },
    ],
    recovery: `<p>Recovery from retinal detachment surgery varies depending on the type and complexity of the procedure, and whether the macula was detached before surgery.</p>
<p>After <strong>vitrectomy with a gas bubble</strong>, you will need to maintain specific <strong>head positioning</strong> (often face-down) for a period of days to weeks, depending on the location of the detachment. This positioning is essential for the gas bubble to support the retina while it heals. You <strong>must not fly</strong> or travel to high altitudes until the gas has fully absorbed (2-8 weeks), as changes in air pressure can cause the bubble to expand dangerously. Nitrous oxide anaesthesia must also be avoided during this period.</p>
<p>Vision recovery is gradual. If the macula was attached before surgery, most patients regain <strong>good central vision</strong> within weeks to months. If the macula was detached, some degree of central vision loss may be permanent, though peripheral vision is usually preserved and may continue to improve for up to a year.</p>
<p>You will need to use antibiotic and anti-inflammatory eye drops for several weeks and avoid strenuous activity, heavy lifting, and swimming for <strong>4 to 6 weeks</strong>. Follow-up appointments will be frequent in the first few weeks to monitor healing and check that the retina remains attached.</p>
<p></p>`,
    nhsOrPrivate: `<p>A detached retina is <strong>treated as an emergency on the NHS</strong>. If you notice new floaters, flashes of light or a shadow moving across your vision, the NHS advises getting help straight away from NHS 111 or A&E. Surgery is carried out by specialist retinal surgeons in hospital eye departments.</p>
<p>Laser or freezing treatment for a retinal tear, which can stop it becoming a detachment, is also available on the NHS.</p>
<p>Private retinal surgery exists, but because a detached retina needs urgent treatment, the NHS emergency pathway is usually the quickest route. Do not delay treatment to arrange private care.</p>`,
    faqs: [
      {
        question: "What should I do if I think I have a retinal detachment?",
        answer:
          "Seek immediate medical attention. Go to your nearest eye casualty or A&E department, call NHS 111, or see an emergency optometrist. Do not wait for a routine appointment. Time is critical, the sooner you are treated, the better the chance of preserving your vision. Key warning signs are a sudden shower of floaters, flashes of light, and a shadow or curtain across your vision.",
      },
      {
        question: "How successful is retinal detachment surgery?",
        answer:
          "Visual recovery depends on whether the macula was detached before surgery: macula-on detachments have a much better visual prognosis.",
      },
      {
        question: "Will my vision return to normal after retinal detachment surgery?",
        answer:
          "If the macula (central retina) was still attached before surgery, most patients regain good central vision. If the macula was detached, some permanent reduction in central vision is likely, though it often continues to improve gradually over several months. Peripheral vision recovery depends on the extent and duration of the detachment.",
      },
      {
        question: "Can a retinal detachment happen again?",
        answer:
          "Yes, there is a risk of re-detachment, particularly in the first few months after surgery. The risk is higher in patients with high myopia or underlying retinal conditions. You should continue to monitor for symptoms such as new floaters, flashes, or shadows and seek immediate attention if they occur. Regular follow-up appointments are important.",
      },
      {
        question: "Why can I not fly after retinal detachment surgery?",
        answer:
          "If a gas bubble was used during surgery, you must not fly until the gas has fully absorbed (typically 2-8 weeks). At altitude, the reduced cabin pressure causes the gas bubble to expand, which can dangerously increase the pressure inside your eye and cause severe pain and further vision loss. Your surgeon will advise you when it is safe to fly.",
      },
    ],
    relatedConditions: [
      "diabetic-eye-disease",
      "macular-degeneration",
      "laser-eye-surgery",
    ],
    providers: [
      "new-medica",
      "chec",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Detached retina (retinal detachment)", url: "https://www.nhs.uk/conditions/detached-retina-retinal-detachment/" },
    ],
  },

  // ─── Eyelid Surgery ──────────────────────────────────────────────────
  {
    name: "Eyelid Surgery",
    slug: "eyelid-surgery",
    metaTitle:
      "Eyelid Surgery in the UK | Blepharoplasty, Ptosis Repair & Costs",
    metaDescription:
      "Eyelid surgery (blepharoplasty) in the UK: ptosis repair, entropion and ectropion correction, NHS eligibility and private costs.",
    overview: `<p>Eyelid surgery, known medically as <strong>oculoplastic surgery</strong>, encompasses a range of procedures that address conditions affecting the eyelids, tear ducts, and the tissues surrounding the eyes. These procedures may be performed for medical reasons, to improve vision obstructed by drooping or excess eyelid tissue, or for cosmetic purposes to rejuvenate the appearance of the eye area.</p>
<p>The most common eyelid conditions requiring surgery include <strong>ptosis</strong> (a drooping upper eyelid that can obstruct the visual field), <strong>dermatochalasis</strong> (excess, hooded upper eyelid skin), <strong>entropion</strong> (an inward-turning eyelid that causes the lashes to scratch the eye), <strong>ectropion</strong> (an outward-turning eyelid that exposes the inner surface), and <strong>eyelid lumps, cysts, and lesions</strong> such as chalazia and skin cancers.</p>
<p>Oculoplastic surgery is a subspecialty of ophthalmology, and procedures are performed by specialist oculoplastic surgeons who have additional training in both the functional and aesthetic aspects of eyelid and periorbital surgery. Many eyelid procedures are available on the NHS when there is a <strong>functional visual impairment</strong>, while cosmetic procedures are typically self-funded privately. In the UK, eyelid surgery is one of the most commonly performed oculoplastic procedures, with thousands of operations carried out each year.</p>`,
    symptoms: [
      "Drooping upper eyelid(s) partially covering the pupil (ptosis)",
      "Excess hooded skin on the upper eyelids obstructing peripheral vision",
      "Eyelid turning inward, causing eyelashes to rub on the eye (entropion)",
      "Eyelid turning outward, causing dryness, tearing, and exposure (ectropion)",
      "Persistent lumps, cysts, or growths on the eyelid",
      "Watery eyes due to tear duct blockage or eyelid malposition",
      "Tired, heavy-feeling eyelids, particularly towards the end of the day",
      "Skin irritation or infection in the eyelid crease from excess skin folds",
    ],
    whenSurgeryNeeded: `<p>Eyelid surgery is recommended when eyelid conditions are <strong>causing functional problems, discomfort, or a risk to eye health</strong>. Your ophthalmologist or GP may recommend surgery when:</p>
<ul>
<li><strong>Ptosis or dermatochalasis</strong> is obstructing your upper visual field, making it difficult to see above or to the sides. This can be measured with a visual field test</li>
<li><strong>Entropion</strong> is causing the eyelashes to scratch the cornea, leading to pain, redness, infection risk, and potential corneal scarring</li>
<li><strong>Ectropion</strong> is causing persistent watering, dryness, irritation, or exposure of the inner eyelid surface</li>
<li>An <strong>eyelid lump or lesion</strong> needs to be removed for biopsy, is causing discomfort, or is growing</li>
<li><strong>Blocked tear ducts</strong> are causing chronic watering or recurrent infections</li>
</ul>
<p>For <strong>cosmetic concerns</strong>, such as bags under the eyes, wrinkled eyelid skin, or a desire for a more youthful appearance without functional impairment, surgery is available as a private self-pay procedure.</p>`,
    surgeryTypes: [
      {
        name: "Upper blepharoplasty",
        description:
          "Removal of excess skin, and sometimes fat, from the upper eyelids. An incision is made in the natural crease of the eyelid, so the scar is well-hidden. The procedure can be performed under local anaesthesia and takes approximately 30-60 minutes. It can be both functional (improving the visual field obstructed by hooded lids) and cosmetic (creating a more open, refreshed appearance).",
      },
      {
        name: "Lower blepharoplasty",
        description:
          "Addresses bags, puffiness, or excess skin beneath the lower eyelids. Fat may be removed or repositioned, and excess skin tightened. The incision is typically made just below the lash line or inside the eyelid (transconjunctival approach). This is predominantly a cosmetic procedure and is usually self-funded.",
      },
      {
        name: "Ptosis repair",
        description:
          "Tightening or reattachment of the levator muscle that raises the upper eyelid. This restores a more normal eyelid position and improves the obstructed visual field. The technique depends on the severity and cause of the ptosis. In adults, the most common approach is levator advancement through an incision in the eyelid crease. In severe cases, a frontalis sling procedure may be used, connecting the eyelid to the forehead muscle.",
      },
      {
        name: "Entropion and ectropion repair",
        description:
          "Surgical correction of eyelids that turn inward (entropion) or outward (ectropion). Various techniques are used depending on the cause, including horizontal lid tightening, retractor reinsertion, and grafting procedures. These operations restore normal eyelid position, relieve symptoms, and protect the cornea. They are typically performed under local anaesthesia and take 30-60 minutes.",
      },
      {
        name: "Eyelid lesion excision",
        description:
          "Removal of lumps, cysts, or growths from the eyelid. This includes chalazia (meibomian cysts), papillomas, and skin cancers such as basal cell carcinoma (the most common eyelid malignancy). The specimen is sent for histological analysis. Reconstruction of the eyelid after larger excisions may be required to maintain proper eyelid function and appearance.",
      },
    ],
    recovery: `<p>Recovery from eyelid surgery depends on the type and extent of the procedure, but most eyelid operations have a <strong>relatively quick recovery</strong> compared to other surgical procedures.</p>
<p>After <strong>blepharoplasty</strong>, you can expect bruising, swelling, and some discomfort around the eyes for <strong>1 to 2 weeks</strong>. Cold compresses, keeping your head elevated, and using prescribed ointments will help manage swelling. Stitches are usually removed after 5-7 days (or dissolve on their own). Most patients can return to normal activities within <strong>7 to 10 days</strong>, though strenuous exercise should be avoided for 2-3 weeks.</p>
<p>For <strong>ptosis repair</strong>, the recovery timeline is similar to blepharoplasty. There may be some difficulty closing the eye fully in the first few weeks, requiring lubricating drops and ointment to keep the eye moist.</p>
<p>For <strong>entropion and ectropion repair</strong>, recovery is usually <strong>1 to 2 weeks</strong>. A pad may be placed over the eye overnight after surgery, and you will use antibiotic ointment for about a week. Swelling and bruising settle within 2 weeks.</p>
<p>Scarring from eyelid surgery is generally <strong>minimal and well-hidden</strong> in the natural creases of the eyelid. Final results, including any improvement in the visual field, are typically evident within 4 to 6 weeks.</p>`,
    nhsOrPrivate: `<p>Eyelid surgery is <strong>available on the NHS when there is a medical need</strong>, for example when a drooping eyelid blocks your vision, or when an eyelid turning inwards or outwards (entropion or ectropion) is causing problems. Your optometrist or GP can refer you to a hospital eye clinic. Local NHS rules decide who is eligible, so ask your GP what applies in your area.</p>
<p><strong>Cosmetic eyelid surgery</strong> (blepharoplasty to change how your eyes look) is not usually available on the NHS. If you pay privately, the NHS advises checking that the clinic is registered with the Care Quality Commission (CQC) and looking up the surgeon on the General Medical Council (GMC) register. Prices vary, so ask for a written quote that includes follow-up care.</p>`,
    faqs: [
      {
        question: "Will eyelid surgery leave visible scars?",
        answer:
          "Scars from upper blepharoplasty are hidden in the natural crease of the eyelid and are usually very difficult to see once healed. Lower blepharoplasty scars are placed just below the lash line or inside the eyelid and are similarly inconspicuous. All surgical scars fade over time, typically becoming barely noticeable within a few months.",
      },
      {
        question:
          "How do I know if my drooping eyelids qualify for NHS surgery?",
        answer:
          "The NHS will consider funding eyelid surgery if your eyelids are demonstrably impairing your vision. This is usually assessed with a visual field test that shows the upper eyelid is obstructing a significant portion of your field of view. Your GP or optometrist can refer you for assessment. Criteria vary between NHS regions, so eligibility depends on local commissioning policies.",
      },
      {
        question: "How long do the results of blepharoplasty last?",
        answer:
          "The results of upper blepharoplasty are long-lasting, typically 7 to 15 years or more. The ageing process continues, so some skin laxity may gradually return over time, but most patients find the improvement enduring. Lower blepharoplasty results are similarly long-lasting. Ptosis repair results can vary, with some patients requiring revision surgery over time.",
      },
      {
        question: "Can I wear contact lenses after eyelid surgery?",
        answer:
          "You should avoid wearing contact lenses for approximately 2 weeks after eyelid surgery to allow healing. Your surgeon will advise you on when it is safe to resume contact lens wear. Glasses can usually be worn immediately after the procedure without any problems.",
      },
      {
        question: "Is eyelid surgery performed under general anaesthesia?",
        answer:
          "Most eyelid procedures are performed under local anaesthesia, meaning you are awake but the area around the eye is numbed. Sedation may be offered for patient comfort. General anaesthesia is occasionally used for more complex procedures or for patients who prefer it, though this is less common.",
      },
    ],
    relatedConditions: [
      "cataracts",
      "corneal-conditions",
      "laser-eye-surgery",
    ],
    providers: [
      "new-medica",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Eyelid surgery", url: "https://www.nhs.uk/conditions/cosmetic-procedures/eyelid-surgery/" },
      { label: "NHS: Ectropion", url: "https://www.nhs.uk/conditions/ectropion/" },
    ],
  },

  // ─── Corneal Conditions ──────────────────────────────────────────────
  {
    name: "Corneal Conditions",
    slug: "corneal-conditions",
    metaTitle:
      "Corneal Surgery UK: Keratoconus and Transplants",
    metaDescription:
      "Corneal conditions and surgery in the UK: keratoconus, cross-linking and corneal transplants, and how to find a specialist provider.",
    overview: `<p>The cornea is the <strong>clear, dome-shaped front surface of the eye</strong> that plays a critical role in focusing light onto the retina. It accounts for approximately two-thirds of the eye's total focusing power. Corneal conditions encompass a wide range of diseases, injuries, and degenerative changes that affect the clarity, shape, or integrity of the cornea, potentially causing significant visual impairment.</p>
<p><strong>Keratoconus</strong> is one of the most common corneal conditions requiring specialist treatment. It causes the cornea to thin progressively and bulge into a cone-like shape, distorting vision.Other important corneal conditions include <strong>Fuchs' endothelial dystrophy</strong>, <strong>corneal scarring</strong> from infection or injury, <strong>corneal ulcers</strong>, and <strong>corneal ectasia</strong>.</p>
<p>Treatment for corneal conditions ranges from corneal cross-linking (a procedure to strengthen the cornea and halt the progression of keratoconus) to partial or full-thickness corneal transplantation for conditions where the cornea is irreparably damaged.</p>`,
    symptoms: [
      "Progressively blurred or distorted vision that cannot be fully corrected with glasses",
      "Frequent changes in spectacle or contact lens prescription",
      "Increased sensitivity to light and glare",
      "Difficulty with night driving due to haloes and starbursts around lights",
      "Ghost images or multiple images from a single object (monocular diplopia)",
      "Eye irritation, redness, or discomfort",
      "Cloudy, hazy, or milky appearance to the cornea in advanced cases",
      "Eye pain associated with corneal ulcers or infections",
    ],
    whenSurgeryNeeded: `<p>Surgery for corneal conditions is recommended when <strong>non-surgical treatments can no longer adequately correct or manage the condition</strong>. The decision depends on the specific condition and its severity:</p>
<ul>
<li><strong>Corneal cross-linking</strong> is recommended for progressive keratoconus to halt the thinning and prevent the need for a transplant. It is most effective when performed early, before significant corneal damage has occurred. It is now available on the NHS</li>
<li><strong>Corneal transplant surgery</strong> is considered when vision cannot be adequately corrected with glasses or contact lenses, the cornea has become too scarred or opaque for light to pass through, or the corneal structure has deteriorated to the point where contact lenses can no longer be fitted</li>
<li><strong>Specialist contact lens fitting</strong> (rigid gas permeable or scleral lenses) is usually tried before transplant surgery and can provide excellent vision for many patients with keratoconus</li>
</ul>
<p>Your corneal specialist will work with you to explore all conservative options before recommending surgery, as corneal transplants, while highly successful, carry risks including graft rejection and a lengthy visual rehabilitation period.</p>`,
    surgeryTypes: [
      {
        name: "Corneal cross-linking (CXL)",
        description:
          "A treatment designed to strengthen the cornea and halt the progression of keratoconus and other corneal ectatic conditions. Riboflavin (vitamin B2) drops are applied to the cornea, which is then exposed to controlled ultraviolet A (UVA) light for approximately 30 minutes. This creates new cross-links between the collagen fibres in the cornea, stiffening and stabilising it. The procedure takes about an hour and is performed under local anaesthetic drops. It does not reverse existing damage but prevents further deterioration.",
      },
      {
        name: "Penetrating keratoplasty (full-thickness corneal transplant)",
        description:
          "The entire central portion of the diseased cornea is removed and replaced with a healthy donor cornea from a deceased donor. The donor tissue is stitched in place using very fine nylon sutures, which are gradually removed over 12-18 months. Penetrating keratoplasty has a long track record and is used for conditions affecting the full thickness of the cornea. Visual recovery is gradual, often taking up to a year.",
      },
      {
        name: "DALK (Deep Anterior Lamellar Keratoplasty)",
        description:
          "A partial-thickness transplant that replaces the front layers of the cornea while retaining the patient's own innermost layer (endothelium). This significantly reduces the risk of endothelial graft rejection and is the preferred technique for keratoconus and corneal scarring that does not involve the endothelium. Recovery is similar to penetrating keratoplasty.",
      },
      {
        name: "DMEK/DSAEK (Endothelial keratoplasty)",
        description:
          "Selective transplant techniques that replace only the innermost endothelial layer of the cornea. DMEK (Descemet's Membrane Endothelial Keratoplasty) transplants just the endothelial cell layer, while DSAEK (Descemet's Stripping Automated Endothelial Keratoplasty) includes a thin layer of corneal stroma as well. These procedures are used for conditions such as Fuchs' dystrophy and bullous keratopathy. Recovery is faster than full-thickness transplants.",
      },
      {
        name: "Pterygium excision",
        description:
          "Surgical removal of a pterygium, a wing-shaped growth of fleshy tissue that extends from the conjunctiva onto the cornea. If the pterygium grows large enough to distort the corneal surface or obstruct vision, it is removed surgically, often with an autograft (conjunctival tissue from elsewhere on the eye) to reduce the risk of recurrence. The procedure takes about 30-45 minutes.",
      },
    ],
    recovery: `<p>Recovery from corneal procedures varies significantly depending on the type of surgery.</p>
<p>After <strong>corneal cross-linking</strong>, the eye is typically sore and light-sensitive for <strong>3 to 5 days</strong> as the epithelial surface heals. A bandage contact lens is worn for 4-5 days, and antibiotic and anti-inflammatory drops are used for several weeks. Most patients return to work within <strong>1 to 2 weeks</strong>. Vision may temporarily worsen before stabilising over 3-6 months.</p>
<p>After <strong>corneal transplant surgery</strong>, recovery is significantly longer. Steroid eye drops are required for <strong>many months</strong> (often 12 months or longer) to prevent graft rejection. Sutures may remain in place for <strong>12 to 18 months</strong> and are removed gradually as the graft heals. Full visual recovery from a penetrating keratoplasty can take <strong>up to 12-18 months</strong>, and many patients require glasses or contact lenses after the transplant for optimal vision.</p>
<p>With <strong>endothelial transplants</strong> (DMEK/DSAEK), recovery is faster, many patients notice significant visual improvement within <strong>4 to 8 weeks</strong>. However, an air bubble is placed in the eye during surgery, and you will need to lie on your back for the first 24-48 hours to keep the graft in position.</p>
<p>All corneal transplant patients require <strong>long-term follow-up</strong> to monitor for signs of graft rejection, which can occur months or even years after surgery. Prompt treatment with steroid drops can usually reverse early rejection episodes.</p>`,
    nhsOrPrivate: `<p>Treatment for corneal conditions, including <strong>corneal cross-linking for keratoconus</strong> and corneal transplants, is available on the NHS when there is a clinical need. You will usually be referred to a specialist corneal service at a hospital eye department, and donor corneas for transplants come from NHS Blood and Transplant.</p>
<p>Some private eye hospitals also offer cross-linking and corneal surgery. Prices vary, so ask for a written quote that covers the consultation, the procedure and follow-up visits.</p>
<p>Specialist contact lenses for keratoconus can be fitted at hospital eye departments and by some private optometrists who specialise in rigid and scleral lenses.</p>`,
    faqs: [
      {
        question: "What is keratoconus and how is it diagnosed?",
        answer:
          "Keratoconus is a progressive condition in which the cornea thins and bulges into a cone shape, causing increasingly distorted vision. It is diagnosed using corneal topography, a painless imaging scan that maps the shape and curvature of the cornea in detail. Pachymetry, which measures corneal thickness, is also used. Your optometrist or ophthalmologist may suspect keratoconus if you have rapidly changing prescriptions, especially with increasing astigmatism.",
      },
      {
        question: "How long does a corneal transplant last?",
        answer:
          "A corneal transplant can last many years, but it is not necessarily permanent. Grafts for keratoconus tend to have the best long-term outcomes, with many lasting 15-20 years or longer. Endothelial transplants may have a shorter lifespan but can be repeated if needed.",
      },
      {
        question: "Can keratoconus be cured?",
        answer:
          "Keratoconus cannot be cured, but its progression can be halted with corneal cross-linking. Once stabilised, vision can usually be well-corrected with specialist contact lenses. In advanced cases where contact lenses are no longer effective, a corneal transplant can restore functional vision. The condition does not typically worsen after the age of 30-40, even without treatment.",
      },
      {
        question: "What are the risks of corneal transplant rejection?",
        answer:
          "Graft rejection occurs when the body's immune system attacks the donor cornea. It can happen at any time but is most common in the first two years. Warning signs include increasing redness, sensitivity to light, deteriorating vision, and eye pain. Prompt treatment with steroid drops can usually reverse early rejection. ",
      },
      {
        question: "Will I need glasses after a corneal transplant?",
        answer:
          "Most patients require glasses or contact lenses after a corneal transplant for optimal vision. The transplanted cornea may have some astigmatism, which can be corrected with spectacles, rigid contact lenses, or, in some cases, further laser surgery once the graft has fully healed and stabilised. Your corneal specialist will advise on the best option for your individual case.",
      },
    ],
    relatedConditions: [
      "laser-eye-surgery",
      "cataracts",
      "glaucoma-surgery",
    ],
    providers: [
      "new-medica",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "Moorfields Eye Hospital: Keratoconus", url: "https://www.moorfields.nhs.uk/eye-conditions/keratoconus" },
      { label: "Moorfields Eye Hospital: Corneal cross-linking", url: "https://moorfields.nhs.uk/eye-conditions/keratoconus/corneal-cross-linking" },
    ],
  },

  // ─── Diabetic Eye Disease ────────────────────────────────────────────
  {
    name: "Diabetic Eye Disease",
    slug: "diabetic-eye-disease",
    metaTitle:
      "Diabetic Eye Disease Treatment UK: Injections and Surgery",
    metaDescription:
      "Diabetic eye disease treatment in the UK: retinopathy and maculopathy, laser treatment, injections and NHS diabetic eye screening.",
    overview: `<p>Diabetic eye disease refers to a group of eye conditions that affect people with diabetes mellitus. The most important of these is <strong>diabetic retinopathy</strong>, a condition in which high blood sugar levels damage the tiny blood vessels in the retina over time. Diabetic retinopathy is the <strong>leading cause of preventable blindness in working-age adults</strong> in the UK, yet with early detection through screening and timely treatment, the vast majority of severe sight loss can be prevented.</p>
<p>There are approximately <strong>4.9 million people living with diabetes in the UK</strong>, and all of them are at risk of developing diabetic eye disease. Approximately <strong>one in three</strong> people with diabetes will have some degree of diabetic retinopathy, though most cases are mild and do not threaten vision. More advanced stages: <strong>proliferative diabetic retinopathy</strong> (where new, fragile blood vessels grow on the retinal surface) and <strong>diabetic macular oedema</strong> (where fluid leaks into the macula, the part of the retina responsible for detailed central vision): require treatment to prevent vision loss.</p>
<p>The NHS Diabetic Eye Screening Programme invites all people with diabetes aged 12 and over for an <strong>annual retinal photograph</strong>. This free screening is one of the most important steps you can take to protect your sight. Good blood sugar control, blood pressure management, and regular screening are the cornerstones of preventing diabetic eye disease.</p>`,
    symptoms: [
      "Often no symptoms in early stages: diabetic retinopathy is usually detected through screening before you notice any changes",
      "Gradually worsening vision or fluctuating visual clarity",
      "Dark spots or floaters in your vision (from vitreous haemorrhage)",
      "Blurred or patchy vision, particularly affecting central vision (macular oedema)",
      "Difficulty seeing at night or in low light",
      "Sudden loss of vision (from vitreous haemorrhage or tractional retinal detachment)",
      "Colours appearing washed out or faded",
    ],
    whenSurgeryNeeded: `<p>Treatment for diabetic eye disease is required when retinopathy has progressed to a <strong>sight-threatening stage</strong>. Your ophthalmologist will recommend treatment when:</p>
<ul>
<li><strong>Diabetic macular oedema (DMO)</strong> is present: fluid leaking from damaged blood vessels causes the macula to swell, threatening central vision. This is the most common reason for treatment</li>
<li><strong>Proliferative diabetic retinopathy (PDR)</strong> has developed: new, abnormal blood vessels are growing on the retina or optic disc, which are fragile and prone to bleeding</li>
<li><strong>Vitreous haemorrhage</strong> has occurred: bleeding from abnormal blood vessels fills the vitreous cavity, obstructing vision</li>
<li><strong>Tractional retinal detachment</strong> is present or imminent: scar tissue from proliferative retinopathy is pulling the retina away from its underlying tissue</li>
</ul>
<p>The decision to treat is based on the findings of <strong>retinal examination, OCT imaging, and fluorescein angiography</strong>. Treatment is most effective when started early, before significant vision loss has occurred. This underscores the critical importance of attending your annual diabetic eye screening appointments.</p>`,
    surgeryTypes: [
      {
        name: "Anti-VEGF intravitreal injections",
        description:
          "The first-line treatment for diabetic macular oedema (DMO) and an increasingly used treatment for proliferative diabetic retinopathy. Anti-VEGF medications (aflibercept, ranibizumab, or faricimab) are injected into the vitreous cavity of the eye to reduce fluid leakage from damaged blood vessels and inhibit abnormal blood vessel growth. Treatment typically begins with monthly injections for a loading phase, followed by ongoing treatment at intervals guided by OCT imaging and clinical response.",
      },
      {
        name: "Panretinal photocoagulation (PRP) laser treatment",
        description:
          "The established treatment for proliferative diabetic retinopathy. A laser is applied to the peripheral retina in hundreds of small spots, reducing the oxygen demand of the retinal tissue and causing the abnormal new blood vessels to regress. PRP is typically delivered over 2-3 sessions. It is highly effective at preventing severe vision loss from PDR, though it can reduce peripheral and night vision as a side effect.",
      },
      {
        name: "Focal/grid macular laser",
        description:
          "Laser treatment applied directly to leaking blood vessels or areas of thickening in the macula. This was the standard treatment for diabetic macular oedema before anti-VEGF injections became available and is still used in some cases, either alone or in combination with injections. It aims to reduce macular swelling and stabilise vision.",
      },
      {
        name: "Vitrectomy surgery",
        description:
          "Surgical removal of the vitreous gel from inside the eye. Vitrectomy is recommended for persistent vitreous haemorrhage (bleeding that does not clear on its own within a few months), tractional retinal detachment involving or threatening the macula, and combined tractional-rhegmatogenous retinal detachment. The vitreous is replaced with a gas bubble or saline solution. The procedure typically takes 1-3 hours and may be combined with laser treatment.",
      },
      {
        name: "Intravitreal steroid implants",
        description:
          "Sustained-release steroid implants (such as dexamethasone implant, trade name Ozurdex) can be injected into the vitreous cavity to treat diabetic macular oedema, particularly in patients who have not responded adequately to anti-VEGF therapy or in whom anti-VEGF is not suitable. The implant gradually releases steroid medication over several months, reducing inflammation and macular swelling. It may need to be repeated.",
      },
    ],
    recovery: `<p>Recovery from diabetic eye disease treatments varies depending on the type of intervention.</p>
<p><strong>Anti-VEGF injections</strong> have minimal recovery time. The injection takes seconds, and you can usually return to normal activities the same day. Mild discomfort, redness, and blurry vision may last a few hours. You will need to attend regular follow-up appointments for ongoing monitoring and further injections as needed: treatment is typically required for many months or years.</p>
<p><strong>Laser treatment (PRP and macular laser)</strong> is performed as an outpatient. Your vision may be blurred for several hours afterwards, and there may be some aching around the eye. After PRP, you may notice a reduction in peripheral vision and night vision, and some patients experience temporary worsening of macular oedema. These effects typically stabilise over <strong>weeks to months</strong>.</p>
<p><strong>Vitrectomy</strong> requires a longer recovery. If a gas bubble is used, you may need to maintain a specific head position for several days to weeks, and you must not fly until the gas has absorbed (typically 2-8 weeks). Vision recovery is gradual over <strong>weeks to months</strong>. You will need to use eye drops for several weeks and avoid strenuous activity for 4-6 weeks.</p>
<p>Regardless of treatment, <strong>good blood sugar control, blood pressure management, and regular screening</strong> remain essential to prevent further deterioration and protect your remaining vision.</p>`,
    nhsOrPrivate: `<p>Treatment for diabetic eye disease is <strong>available on the NHS</strong>. Everyone with diabetes aged 12 or over is invited to NHS diabetic eye screening every 1 or 2 years, which checks for signs of retinopathy before you notice any change in your sight.</p>
<p>If you need treatment, injections, laser treatment and surgery are given at NHS hospital eye clinics. Treatment often continues over a long period with regular check-ups, which is why most people are treated through the NHS.</p>
<p>If you have diabetes and have not been invited for eye screening, contact your GP practice. Keep going to every screening appointment, even if your sight seems fine.</p>`,
    faqs: [
      {
        question: "Does everyone with diabetes get diabetic retinopathy?",
        answer:
          "Not everyone, but the risk is significant. Approximately one in three people with diabetes will develop some degree of diabetic retinopathy over time. The risk increases with the duration of diabetes and is higher with poorly controlled blood sugar, high blood pressure, and high cholesterol. Good diabetes management significantly reduces the risk and slows progression.",
      },
      {
        question: "Can diabetic retinopathy be reversed?",
        answer:
          "Early, non-proliferative diabetic retinopathy can sometimes improve or stabilise with better blood sugar control. However, more advanced changes, including proliferative retinopathy and macular oedema, require medical treatment to prevent further damage. Vision already lost from diabetic eye disease usually cannot be fully restored, which is why early detection through screening is so important.",
      },
      {
        question: "What is diabetic macular oedema?",
        answer:
          "Diabetic macular oedema (DMO) occurs when fluid leaks from damaged blood vessels in the retina and accumulates in the macula, the central part of the retina responsible for detailed vision. This causes the macula to swell and thicken, leading to blurred or distorted central vision. DMO is the most common cause of vision loss from diabetic retinopathy and is treated with anti-VEGF injections.",
      },
      {
        question: "How often should I have diabetic eye screening?",
        answer:
          "The NHS invites all people with diabetes aged 12 and over for annual retinal screening. If your screening shows no retinopathy, you may be offered screening every two years. If changes are detected, you may be screened more frequently or referred to a hospital eye service. Pregnant women with diabetes should have screening in each trimester, as pregnancy can accelerate retinopathy.",
      },
      {
        question:
          "Can laser treatment for diabetic retinopathy cause vision loss?",
        answer:
          "Panretinal photocoagulation (PRP) laser treatment can cause some reduction in peripheral vision and night vision, as it deliberately treats the outer retina to protect the more important central vision. Some patients notice a mild decrease in overall visual acuity. However, these side effects are generally considered acceptable compared to the severe vision loss that untreated proliferative diabetic retinopathy can cause. Your ophthalmologist will discuss the risks and benefits before treatment.",
      },
      {
        question: "How can I reduce my risk of diabetic eye disease?",
        answer:
          "The most important steps are keeping your blood sugar, blood pressure and cholesterol within the targets agreed with your diabetes team, not smoking, attending all diabetic eye screening appointments, and having regular diabetes check-ups with your GP or diabetologist. These measures can significantly reduce your risk of developing sight-threatening diabetic eye disease.",
      },
    ],
    relatedConditions: [
      "macular-degeneration",
      "retinal-detachment",
      "glaucoma-surgery",
      "cataracts",
    ],
    providers: [
      "spa-medica",
      "chec",
      "moorfields-private",
    ],
    dateModified: "2026-11-12",
    sources: [
      { label: "NHS: Diabetic retinopathy", url: "https://www.nhs.uk/conditions/diabetic-retinopathy/" },
      { label: "NHS: Diabetic retinopathy treatment", url: "https://www.nhs.uk/conditions/diabetic-retinopathy/treatment/" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Returns an array of all surgery condition slugs */
export function getAllConditionSlugs(): string[] {
  return surgeryConditions.map((c) => c.slug);
}

/** Finds a surgery condition by its URL slug */
export function getConditionBySlug(
  slug: string,
): SurgeryCondition | undefined {
  return surgeryConditions.find((c) => c.slug === slug);
}
