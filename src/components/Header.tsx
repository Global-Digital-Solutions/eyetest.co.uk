"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  {
    label: "Eye Tests",
    href: "/eye-tests",
    children: [
      { label: "Book an Eye Test", href: "/eye-tests/book" },
      { label: "Compare Opticians", href: "/eye-tests/compare" },
      { label: "NHS Eye Tests", href: "/eye-tests/nhs" },
      { label: "Private Eye Tests", href: "/eye-tests/private" },
      { label: "Children's Eye Tests", href: "/eye-tests/children" },
      { label: "What Happens in an Eye Test", href: "/eye-tests/what-happens" },
      { label: "Eye Test Cost", href: "/eye-tests/cost" },
      { label: "How Often Should I Get an Eye Test?", href: "/eye-tests/frequency" },
    ],
  },
  {
    label: "Opticians",
    href: "/opticians",
    children: [
      { label: "Specsavers", href: "/opticians/specsavers" },
      { label: "Boots Opticians", href: "/opticians/boots" },
      { label: "Vision Express", href: "/opticians/vision-express" },
      { label: "ASDA Opticians", href: "/opticians/asda" },
      { label: "Scrivens", href: "/opticians/scrivens" },
      { label: "Compare Opticians", href: "/opticians/compare" },
      { label: "Best Rated Opticians", href: "/opticians/best-rated" },
    ],
  },
  {
    label: "Eye Health",
    href: "/eye-health",
    children: [
      { label: "Common Conditions", href: "/eye-health/conditions" },
      { label: "Symptoms Guide", href: "/eye-health/symptoms" },
      { label: "Eye Care Advice", href: "/eye-health/advice" },
    ],
  },
  {
    label: "Offers",
    href: "/offers",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[var(--color-navy)] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Compare 1,000+ UK opticians</span>
            <span className="sm:hidden">1,000+ opticians</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Free to use
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Same-day availability
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo className="h-8 w-auto hidden sm:block" variant="horizontal" />
          <Logo className="h-8 w-auto sm:hidden" variant="icon" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-[var(--color-navy)] hover:text-[var(--color-primary)] transition-colors rounded-lg hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
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

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -mr-2 text-[var(--color-navy)]"
            onClick={() => setMobileOpen(!mobileOpen)}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2.5 text-base font-medium text-[var(--color-navy)] hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
