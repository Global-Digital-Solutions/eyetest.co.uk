"use client";

import { useEffect, useState } from "react";

/** One frame from /data/frames.json (built from retailer websites). */
export type Frame = {
  id: number;
  r: string;
  n: string;
  b: string;
  p: number;
  t: string;
  s: string | null;
  g: string;
  c: string | null;
  m: string | null;
  img: string;
  u: string;
};

export const FRAMES_CHECKED = "12 November 2026";

let cache: Promise<Frame[]> | null = null;

/** Loads the frame data once per page, shared by every tool that needs it. */
export function useFrames() {
  const [frames, setFrames] = useState<Frame[] | null>(null);
  useEffect(() => {
    cache ||= fetch("/data/frames.json").then((r) => r.json());
    cache.then(setFrames).catch(() => setFrames([]));
  }, []);
  return frames;
}

/** Groups colour versions of the same frame, then mixes retailers so no one shop dominates. */
export function pickStyles(
  frames: Frame[],
  n: number,
  order: "low" | "high" | "mix" = "mix",
) {
  const seen = new Set<string>();
  const styles = frames.filter((f) => {
    const k = `${f.r}|${f.n}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (order !== "mix")
    return [...styles]
      .sort((a, b) => (order === "low" ? a.p - b.p : b.p - a.p))
      .slice(0, n);
  const lanes: Record<string, Frame[]> = {};
  styles.forEach((f) => (lanes[f.r] ||= []).push(f));
  const out: Frame[] = [];
  const all = Object.values(lanes);
  for (let i = 0; out.length < n && all.some((l) => l[i]); i++)
    all.forEach((l) => l[i] && out.length < n && out.push(l[i]));
  return out;
}

export function countStyles(frames: Frame[]) {
  return new Set(frames.map((f) => `${f.r}|${f.n}`)).size;
}

const gbp = (n: number) => (n % 1 === 0 ? `£${n}` : `£${n.toFixed(2)}`);

export function FrameGrid({ frames }: { frames: Frame[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {frames.map((f) => (
        <li key={f.id}>
          <a
            href={f.u}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group block rounded-2xl border border-gray-100 bg-white p-2 transition hover:border-[var(--color-primary)]/40 hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-[#f3f3f3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.img}
                alt={`${f.b} ${f.n}`}
                loading="lazy"
                className={`h-full w-full transition group-hover:scale-105 ${f.r === "Vision Express" ? "object-contain p-4 mix-blend-multiply" : "object-cover"}`}
              />
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[var(--color-navy)] line-clamp-1">
              {f.b}
            </p>
            <p className="text-xs text-gray-600 line-clamp-1">{f.n}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-navy)]">
              {gbp(f.p)}{" "}
              <span className="font-normal text-gray-400">at {f.r}</span>
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
