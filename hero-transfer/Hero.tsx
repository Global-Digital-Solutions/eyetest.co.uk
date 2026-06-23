"use client";

import { useState } from "react";

export default function Hero() {
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      window.location.href = `/search?postcode=${encodeURIComponent(postcode.trim())}`;
    }
  };

  return (
    <section
      id="search"
      className="relative overflow-hidden"
    >
      {/* Hero background image — WebP with JPG fallback */}
      <picture className="absolute inset-0">
        <source srcSet="/images/heroes/hero-home.webp" type="image/webp" />
        <img
          src="/images/heroes/hero-home.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      </picture>
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/60 via-[var(--color-navy)]/40 to-[var(--color-navy)]/70" />

      {/* Glowing orb accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse" />
            <span>
              <strong className="text-white">2,500+</strong> audiologists nationwide
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Find &amp; Book Hearing Tests{" "}
            <span className="text-[var(--color-primary)]">Near You</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-lg mx-auto">
            Compare thousands of audiologists across the UK. Check availability
            and book your hearing test online in seconds.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:bg-white sm:rounded-full sm:p-1.5 sm:shadow-xl sm:shadow-black/10">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter your postcode, e.g. SW1A 1AA"
                  className="w-full pl-12 pr-4 py-4 sm:py-3 text-base sm:text-lg text-[var(--color-navy)] bg-white sm:bg-transparent rounded-xl sm:rounded-full border border-gray-200 sm:border-none focus:outline-none placeholder:text-gray-400"
                  aria-label="Enter your postcode"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-blue-700 text-white font-semibold text-base px-8 py-4 sm:py-3 rounded-xl sm:rounded-full transition-all hover:shadow-lg cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>

            {/* Geolocation shortcut */}
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors cursor-pointer"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    () => {
                      setPostcode("Using your location...");
                    },
                    () => {
                      alert("Unable to get your location. Please enter a postcode.");
                    }
                  );
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Use my current location
            </button>
          </form>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <p
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                2,500+
              </p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">Audiologists</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Free
              </p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">NHS Tests</p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Online
              </p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">Book Instantly</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              100% free to use
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              NHS &amp; private tests
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Same-day appointments
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[var(--color-success)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              All major brands
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
