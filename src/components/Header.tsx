"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------ */
/*  Mega-menu data                                                    */
/* ------------------------------------------------------------------ */

const eyeTestLinks = [
  { label: "Standard Eye Test", href: "/eye-tests/standard-eye-test" },
  { label: "NHS Eye Test", href: "/eye-tests/nhs-eye-test" },
  { label: "Children's Eye Test", href: "/eye-tests/childrens-eye-test" },
  { label: "Contact Lens Fitting", href: "/eye-tests/contact-lens-fitting" },
  { label: "OCT Scan", href: "/eye-tests/oct-scan" },
  { label: "Visual Field Test", href: "/eye-tests/visual-field-test" },
  { label: "Diabetic Eye Screening", href: "/eye-tests/diabetic-eye-screening" },
  { label: "Dry Eye Assessment", href: "/eye-tests/dry-eye-assessment" },
  { label: "Colour Vision Test", href: "/eye-tests/colour-vision-test" },
  { label: "DVLA / Driving Test", href: "/eye-tests/dvla-driving-vision-test" },
  { label: "Emergency Eye Care", href: "/eye-tests/emergency-eye-care" },
  { label: "Home Visit Eye Test", href: "/at-home-eye-tests" },
  { label: "Glaucoma Assessment", href: "/eye-tests/glaucoma-assessment" },
  { label: "Retinal Photography", href: "/eye-tests/retinal-photography" },
  { label: "Blepharitis Assessment", href: "/eye-tests/blepharitis-assessment" },
  { label: "Myopia Management", href: "/eye-tests/myopia-management" },
  { label: "Cataract Assessment", href: "/eye-tests/cataract-assessment" },
  { label: "Macular Degeneration", href: "/eye-tests/macular-degeneration-screening" },
];

const opticianLinks = {
  available: [
    { label: "Boots Opticians", href: "/opticians/boots-opticians" },
    { label: "ASDA Opticians", href: "/opticians/asda-opticians" },
    { label: "Leightons", href: "/opticians/leightons" },
    { label: "Rawlings", href: "/opticians/rawlings" },
    { label: "Scrivens", href: "/opticians/scrivens" },
    { label: "Bayfields", href: "/opticians/bayfields" },
    { label: "Duncan & Todd", href: "/opticians/duncan-and-todd" },
  ],
  comingSoon: [
    { label: "Specsavers", href: "/opticians/specsavers" },
    { label: "Vision Express", href: "/opticians/vision-express" },
    { label: "Optical Express", href: "/opticians/optical-express" },
  ],
};

const eyeHealthLinks = {
  conditions: [
    { label: "Glaucoma", href: "/eye-health/conditions/glaucoma" },
    { label: "Cataracts", href: "/eye-health/conditions/cataracts" },
    { label: "Macular Degeneration", href: "/eye-health/conditions/age-related-macular-degeneration" },
    { label: "Diabetic Retinopathy", href: "/eye-health/conditions/diabetic-retinopathy" },
    { label: "Dry Eye Syndrome", href: "/eye-health/conditions/dry-eye-syndrome" },
    { label: "Conjunctivitis", href: "/eye-health/conditions/conjunctivitis" },
    { label: "Myopia", href: "/eye-health/conditions/myopia" },
    { label: "Astigmatism", href: "/eye-health/conditions/astigmatism" },
    { label: "Presbyopia", href: "/eye-health/conditions/presbyopia" },
    { label: "Keratoconus", href: "/eye-health/conditions/keratoconus" },
  ],
  guides: [
    { label: "How Often to Have an Eye Test", href: "/eye-health/guides/how-often-should-you-have-an-eye-test" },
    { label: "Read Your Prescription", href: "/eye-health/guides/how-to-read-your-prescription" },
    { label: "What Happens in an Eye Test", href: "/eye-health/guides/what-happens-during-an-eye-test" },
    { label: "Healthy Eyes Tips", href: "/eye-health/guides/tips-for-healthy-eyes" },
    { label: "Screen Time & Eyes", href: "/eye-health/guides/screen-time-and-eye-health" },
    { label: "NHS Eligibility", href: "/eye-health/guides/understanding-nhs-eye-test-eligibility" },
    { label: "Choosing an Optician", href: "/eye-health/guides/choosing-the-right-optician" },
  ],
};

const locationLinks = {
  "Top Cities": [
    { label: "London", href: "/locations/london" },
    { label: "Manchester", href: "/locations/manchester" },
    { label: "Birmingham", href: "/locations/birmingham" },
    { label: "Leeds", href: "/locations/leeds" },
    { label: "Glasgow", href: "/locations/glasgow" },
    { label: "Liverpool", href: "/locations/liverpool" },
    { label: "Edinburgh", href: "/locations/edinburgh" },
    { label: "Bristol", href: "/locations/bristol" },
    { label: "Cardiff", href: "/locations/cardiff" },
    { label: "Belfast", href: "/locations/belfast" },
    { label: "Sheffield", href: "/locations/sheffield" },
    { label: "Newcastle", href: "/locations/newcastle" },
  ],
};

type MegaMenuKey = "eye-tests" | "opticians" | "eye-health" | "locations" | null;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MegaMenuKey>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const openMega = (key: MegaMenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(key);
  };

  const closeMega = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  const keepOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top USP bar */}
      <div className="bg-gradient-to-r from-[var(--color-navy)] via-[#0f2342] to-[var(--color-navy)]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 sm:gap-6 overflow-hidden">
          <span className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/90 whitespace-nowrap">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-primary)]/20">
              <svg className="w-3 h-3 text-[var(--color-primary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <span className="hidden sm:inline"><strong className="text-white">1,000+</strong> opticians compared</span>
            <span className="sm:hidden"><strong className="text-white">1,000+</strong> opticians</span>
          </span>
          <span className="w-px h-3.5 bg-white/20 hidden sm:block" />
          <span className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/90 whitespace-nowrap">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-success)]/20">
              <svg className="w-3 h-3 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <strong className="text-white">100% free</strong> to use
          </span>
          <span className="w-px h-3.5 bg-white/20 hidden sm:block" />
          <span className="hidden sm:flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/90 whitespace-nowrap">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20">
              <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <strong className="text-white">Same-day</strong> appointments
          </span>
          <span className="w-px h-3.5 bg-white/20 hidden md:block" />
          <span className="hidden md:flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-white/90 whitespace-nowrap">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-nhs-blue)]/20">
              <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </span>
            <strong className="text-white">NHS</strong> &amp; private tests
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" onClick={() => { setActiveMega(null); setMobileOpen(false); }}>
          <Logo className="h-8 w-auto hidden sm:block" variant="horizontal" />
          <Logo className="h-8 w-auto sm:hidden" variant="icon" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Eye Tests */}
          <div
            className="relative"
            onMouseEnter={() => openMega("eye-tests")}
            onMouseLeave={closeMega}
          >
            <Link
              href="/eye-tests"
              className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeMega === "eye-tests"
                  ? "text-[var(--color-primary)] bg-gray-50"
                  : "text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50"
              }`}
            >
              Eye Tests
              <svg className={`w-3.5 h-3.5 transition-transform ${activeMega === "eye-tests" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Opticians */}
          <div
            className="relative"
            onMouseEnter={() => openMega("opticians")}
            onMouseLeave={closeMega}
          >
            <Link
              href="/opticians"
              className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeMega === "opticians"
                  ? "text-[var(--color-primary)] bg-gray-50"
                  : "text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50"
              }`}
            >
              Opticians
              <svg className={`w-3.5 h-3.5 transition-transform ${activeMega === "opticians" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Eye Health */}
          <div
            className="relative"
            onMouseEnter={() => openMega("eye-health")}
            onMouseLeave={closeMega}
          >
            <Link
              href="/eye-health"
              className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeMega === "eye-health"
                  ? "text-[var(--color-primary)] bg-gray-50"
                  : "text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50"
              }`}
            >
              Eye Health
              <svg className={`w-3.5 h-3.5 transition-transform ${activeMega === "eye-health" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Locations */}
          <div
            className="relative"
            onMouseEnter={() => openMega("locations")}
            onMouseLeave={closeMega}
          >
            <Link
              href="/locations"
              className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeMega === "locations"
                  ? "text-[var(--color-primary)] bg-gray-50"
                  : "text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50"
              }`}
            >
              Locations
              <svg className={`w-3.5 h-3.5 transition-transform ${activeMega === "locations" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Simple links */}
          <Link href="/offers" className="px-3 py-2 text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] rounded-lg hover:bg-gray-50 transition-colors">
            Offers
          </Link>
        </nav>

        {/* CTA + mobile menu button */}
        <div className="flex items-center gap-3">
          <Link
            href="/#search"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Find Eye Tests</span>
            <span className="sm:hidden">Search</span>
          </Link>

          <button
            className="lg:hidden p-2 -mr-2 text-[var(--color-navy)] cursor-pointer"
            onClick={() => { setMobileOpen(!mobileOpen); setActiveMega(null); }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Desktop mega menus ──────────────────────────────────────── */}
      {activeMega && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-40"
          onMouseEnter={keepOpen}
          onMouseLeave={closeMega}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Eye Tests mega menu */}
            {activeMega === "eye-tests" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>Types of Eye Tests</h3>
                  <Link href="/eye-tests" className="text-sm font-medium text-[var(--color-primary)] hover:underline">View all eye tests &rarr;</Link>
                </div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                  {eyeTestLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 py-2 px-3 text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setActiveMega(null)}
                    >
                      <svg className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Opticians mega menu */}
            {activeMega === "opticians" && (
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <h3 className="text-lg font-bold text-[var(--color-navy)] mb-4" style={{ fontFamily: "var(--font-display)" }}>Book With Our Partners</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {opticianLinks.available.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 py-2.5 px-3 text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Coming Soon</h4>
                  <div className="space-y-2">
                    {opticianLinks.comingSoon.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 py-2 px-3 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setActiveMega(null)}
                      >
                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-2">Are you an optician?</p>
                    <Link href="/get-listed" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                      Get Listed &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Eye Health mega menu */}
            {activeMega === "eye-health" && (
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>Eye Conditions</h3>
                    <Link href="/eye-health" className="text-sm font-medium text-[var(--color-primary)] hover:underline">View all &rarr;</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    {eyeHealthLinks.conditions.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="py-2 px-2 text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setActiveMega(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-navy)] mb-4" style={{ fontFamily: "var(--font-display)" }}>Guides & Advice</h3>
                  <div className="space-y-1">
                    {eyeHealthLinks.guides.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 py-2 px-2 text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setActiveMega(null)}
                      >
                        <svg className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Locations mega menu */}
            {activeMega === "locations" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[var(--color-navy)]" style={{ fontFamily: "var(--font-display)" }}>Eye Tests by Location</h3>
                  <Link href="/locations" className="text-sm font-medium text-[var(--color-primary)] hover:underline">View all locations &rarr;</Link>
                </div>
                <div className="grid grid-cols-4 gap-x-8 gap-y-2">
                  {locationLinks["Top Cities"].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 py-2 px-3 text-sm text-[var(--color-navy)] hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setActiveMega(null)}
                    >
                      <svg className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Eye tests in {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">

            {/* Eye Tests accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-[var(--color-navy)] hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setMobileExpanded(mobileExpanded === "eye-tests" ? null : "eye-tests")}
              >
                Eye Tests
                <svg className={`w-4 h-4 transition-transform ${mobileExpanded === "eye-tests" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "eye-tests" && (
                <div className="pl-4 pb-2 space-y-0.5">
                  <Link href="/eye-tests" className="block px-3 py-2 text-sm font-medium text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                    View All Eye Tests
                  </Link>
                  {eyeTestLinks.slice(0, 8).map((link) => (
                    <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Opticians accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-[var(--color-navy)] hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setMobileExpanded(mobileExpanded === "opticians" ? null : "opticians")}
              >
                Opticians
                <svg className={`w-4 h-4 transition-transform ${mobileExpanded === "opticians" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "opticians" && (
                <div className="pl-4 pb-2 space-y-0.5">
                  <Link href="/opticians" className="block px-3 py-2 text-sm font-medium text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                    Compare All Opticians
                  </Link>
                  {opticianLinks.available.map((link) => (
                    <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Eye Health accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-[var(--color-navy)] hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setMobileExpanded(mobileExpanded === "eye-health" ? null : "eye-health")}
              >
                Eye Health
                <svg className={`w-4 h-4 transition-transform ${mobileExpanded === "eye-health" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "eye-health" && (
                <div className="pl-4 pb-2 space-y-0.5">
                  <Link href="/eye-health" className="block px-3 py-2 text-sm font-medium text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                    Eye Health Hub
                  </Link>
                  {eyeHealthLinks.conditions.slice(0, 5).map((link) => (
                    <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations accordion */}
            <div>
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-[var(--color-navy)] hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setMobileExpanded(mobileExpanded === "locations" ? null : "locations")}
              >
                Locations
                <svg className={`w-4 h-4 transition-transform ${mobileExpanded === "locations" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "locations" && (
                <div className="pl-4 pb-2 space-y-0.5">
                  <Link href="/locations" className="block px-3 py-2 text-sm font-medium text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                    All UK Locations
                  </Link>
                  {locationLinks["Top Cities"].map((link) => (
                    <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-[var(--color-navy)]/70 hover:text-[var(--color-primary)]" onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Simple links */}
            <Link href="/offers" className="block px-3 py-2.5 text-base font-medium text-[var(--color-navy)] hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>
              Offers
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
