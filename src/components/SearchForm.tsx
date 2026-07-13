"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Client-side search form that dismisses the mobile keyboard on submit.
 *
 * Problem: Next.js App Router intercepts <form action="/search"> for
 * client-side navigation. iOS Safari doesn't dismiss the keyboard
 * during a soft navigation because there's no full page reload.
 *
 * Solution: Prevent the default form submit, blur the input first
 * (which tells iOS to close the keyboard), then navigate with
 * router.push() after a short delay so the keyboard animation
 * has time to start before the page re-renders.
 */
export function SearchForm({ defaultPostcode }: { defaultPostcode: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Get the postcode value from the input
      const pc = inputRef.current?.value?.trim() || "";

      // Dismiss the iOS keyboard reliably:
      // Setting readOnly before blur forces iOS Safari to close the
      // keyboard immediately, even during a soft navigation.
      if (inputRef.current) {
        inputRef.current.readOnly = true;
        inputRef.current.blur();
      }
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // Navigate after a short delay so iOS has time to process the
      // keyboard dismiss animation before the page re-renders.
      // Restore readOnly after navigation starts.
      setTimeout(() => {
        if (inputRef.current) inputRef.current.readOnly = false;
        router.push(`/search?postcode=${encodeURIComponent(pc)}`);
      }, 100);
    },
    [router]
  );

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit}
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
