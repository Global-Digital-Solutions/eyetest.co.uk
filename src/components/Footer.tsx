import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = {
  "Eye Tests": [
    { label: "Book an Eye Test", href: "/eye-tests/book" },
    { label: "NHS Eye Tests", href: "/eye-tests/nhs" },
    { label: "Private Eye Tests", href: "/eye-tests/private" },
    { label: "Children's Eye Tests", href: "/eye-tests/children" },
    { label: "Eye Test Cost", href: "/eye-tests/cost" },
    { label: "What Happens", href: "/eye-tests/what-happens" },
  ],
  Opticians: [
    { label: "Boots Opticians", href: "/opticians/boots" },
    { label: "ASDA Opticians", href: "/opticians/asda" },
    { label: "Leightons", href: "/opticians/leightons" },
    { label: "Scrivens", href: "/opticians/scrivens" },
    { label: "Bayfields", href: "/opticians/bayfields" },
    { label: "Compare All", href: "/opticians/compare" },
  ],
  Locations: [
    { label: "London", href: "/locations/london" },
    { label: "Manchester", href: "/locations/manchester" },
    { label: "Birmingham", href: "/locations/birmingham" },
    { label: "Leeds", href: "/locations/leeds" },
    { label: "Glasgow", href: "/locations/glasgow" },
    { label: "All Locations", href: "/locations" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "For Opticians", href: "/partners" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo className="h-7 w-auto" variant="horizontal" dark />
          </div>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} eyetest.co.uk — A Global Digital
            Solutions project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
