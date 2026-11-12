// Simple line drawings of frame shapes, used in the finder and the filter bar.
const LENS: Record<string, string> = {
  Rectangle: "M4 8 H26 V20 H4 Z",
  Square: "M5 5 H26 V22 H5 Z",
  Round: "M15 13.5 m-10.5 0 a10.5 10.5 0 1 0 21 0 a10.5 10.5 0 1 0 -21 0",
  Oval: "M15 14 m-11 0 a11 7.5 0 1 0 22 0 a11 7.5 0 1 0 -22 0",
  Aviator: "M4 7 Q15 4 26 7 Q27 17 19 22 Q12 24 7 19 Q3 14 4 7 Z",
  "Cat-eye": "M3 7 Q15 8 27 9 Q26 20 15 21 Q5 21 4 13 Q3 9 3 7 Z",
  Butterfly: "M3 6 Q15 5 27 8 Q27 19 17 22 Q6 23 4 15 Q3 10 3 6 Z",
  Oversized: "M3 4 H27 Q28 22 15 23 Q2 22 3 4 Z",
  Geometric: "M9 4 H21 L27 10 V18 L21 23 H9 L3 18 V10 Z",
  Browline: "M4 7 H26 V10 Q26 21 15 21 Q4 21 4 10 Z",
};

export function ShapeIcon({ shape, className = "" }: { shape: string; className?: string }) {
  const d = LENS[shape] ?? LENS.Rectangle;
  return (
    <svg viewBox="0 0 66 28" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden>
      <path d={d} />
      <path d={d} transform="translate(36 0)" />
      <path d="M26 11 Q33 7 40 11" />
      {shape === "Browline" && <path d="M4 7 H26 M40 7 H62" strokeWidth={3.2} />}
    </svg>
  );
}

export const SHAPE_ORDER = ["Rectangle", "Square", "Round", "Oval", "Cat-eye", "Aviator", "Butterfly", "Geometric", "Oversized", "Browline"];
