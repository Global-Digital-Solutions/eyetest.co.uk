"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Adds "is-visible" to its element the first time it scrolls into view. */
export function RevealOnView({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    // Only hide for the animation once script is running, so content is
    // always visible without JavaScript.
    el.classList.add("is-armed");
    // Safety net: never leave content hidden for long.
    const fallback = window.setTimeout(() => el.classList.add("is-visible"), 4000);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          window.clearTimeout(fallback);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => {
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, []);
  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
