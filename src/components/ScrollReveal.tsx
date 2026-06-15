"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ScrollReveal — wraps children in a container that animates into view
 * when it enters the viewport. Uses IntersectionObserver for performance.
 *
 * Animation types:
 * - fade-up (default): fades in + slides up
 * - fade-in: fades in place
 * - fade-left: slides in from right
 * - fade-right: slides in from left
 * - scale-in: scales up from 95%
 * - stagger: children animate one by one (applies to direct children)
 */

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";

type ScrollRevealProps = {
  children: ReactNode;
  animation?: Animation;
  /** Delay in ms before animation starts */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  /** Threshold (0-1) of element visibility to trigger */
  threshold?: number;
  /** Extra class names */
  className?: string;
  /** Render as a different element */
  as?: string;
  /** Stagger children with this delay between each (ms) */
  stagger?: number;
};

const animationStyles: Record<Animation, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-in": {
    from: "opacity-0",
    to: "opacity-100",
  },
  "fade-left": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "scale-in": {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If staggering, animate each child sequentially
          if (stagger) {
            const kids = Array.from(el.children) as HTMLElement[];
            kids.forEach((child, i) => {
              child.style.transitionDelay = `${delay + i * stagger}ms`;
              child.classList.remove("opacity-0", "translate-y-6");
              child.classList.add("opacity-100", "translate-y-0");
            });
          }
          el.classList.add("sr-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, stagger]);

  const anim = animationStyles[animation];

  // For staggered mode, the container is visible but children animate
  if (stagger) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={className}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all ease-out ${anim.from} sr-target ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * StaggerItem — individual child inside a staggered reveal.
 * Starts invisible and animates when parent ScrollReveal triggers.
 */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`opacity-0 translate-y-6 transition-all duration-600 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
