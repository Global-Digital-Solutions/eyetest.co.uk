"use client";

import { useRef } from "react";

/**
 * Client-side search form that dismisses the mobile keyboard on submit.
 *
 * Next.js App Router intercepts <form action="/search"> for client-side navigation,
 * so iOS doesn't get a full page reload and the keyboard stays visible.
 * This component blurs the active input on submit to dismiss it.
 */
export function SearchForm({ defaultPostcode }: { defaultPostcode: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      action="/search"
      method="GET"
      className="flex items-center gap-2"
      onSubmit={() => {
        // Blur input to dismiss mobile keyboard before navigation
        inputRef.current?.blur();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }}
    >
      <div className="relative flex-1 max-w-sm">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          name="postcode"
          defaultValue={defaultPostcode}
          placeholder="Enter postcode"
          className="w-full pl-9 pr-3 py-2 text-base sm:text-sm text-[var(--color-navy)] bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          aria-label="Change postcode"
          enterKeyHint="search"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Update</span>
      </button>
    </form>
  );
}
