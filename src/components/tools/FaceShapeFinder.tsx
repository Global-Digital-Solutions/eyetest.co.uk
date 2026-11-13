"use client";

import { useMemo, useState } from "react";
import { ShapeIcon } from "@/components/glasses/ShapeIcon";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";
import {
  countStyles,
  FrameGrid,
  FRAMES_CHECKED,
  pickStyles,
  useFrames,
} from "./FramePreview";

type Face = "Round" | "Oval" | "Square" | "Heart" | "Long";

/** Outline of each face shape, drawn in a 60 x 76 box. */
const OUTLINE: Record<Face, string> = {
  Round:
    "M30 6 C47 6 54 22 54 38 C54 56 44 70 30 70 C16 70 6 56 6 38 C6 22 13 6 30 6 Z",
  Oval: "M30 4 C45 4 51 18 51 36 C51 56 42 72 30 72 C18 72 9 56 9 36 C9 18 15 4 30 4 Z",
  Square:
    "M10 8 H50 Q53 8 53 12 V56 Q53 70 40 72 H20 Q7 70 7 56 V12 Q7 8 10 8 Z",
  Heart:
    "M8 10 Q30 2 52 10 Q54 30 46 50 Q38 70 30 72 Q22 70 14 50 Q6 30 8 10 Z",
  Long: "M30 2 C42 2 46 14 46 30 V50 C46 64 40 74 30 74 C20 74 14 64 14 50 V30 C14 14 18 2 30 2 Z",
};

const ADVICE: Record<Face, { tip: string; desc: string; shapes: string[] }> = {
  Round: {
    desc: "About as wide as it is long, with soft cheeks and a rounded chin.",
    tip: "Angular frames add definition. Look for frames a little wider than your face, with straight lines and clear corners.",
    shapes: ["Rectangle", "Square", "Geometric", "Browline"],
  },
  Oval: {
    desc: "A little longer than it is wide, with a gently rounded jaw.",
    tip: "Most shapes suit you, so pick on style. Frames about as wide as the widest part of your face look balanced.",
    shapes: ["Square", "Rectangle", "Aviator", "Round", "Cat-eye"],
  },
  Square: {
    desc: "A strong, wide jaw and forehead, with the face about as wide as it is long.",
    tip: "Curved frames soften strong angles. Round, oval and cat-eye shapes work well, and thinner rims keep things light.",
    shapes: ["Round", "Oval", "Cat-eye", "Aviator"],
  },
  Heart: {
    desc: "Wider at the forehead and cheekbones, narrowing to a smaller chin.",
    tip: "Frames that are lighter on top or a little wider at the bottom balance a broader forehead. Rounded and aviator shapes are good choices.",
    shapes: ["Oval", "Round", "Aviator", "Rectangle"],
  },
  Long: {
    desc: "Noticeably longer than it is wide, often with a long straight cheek line.",
    tip: "Deeper frames break up the length of the face. Try bold, larger frames rather than narrow ones.",
    shapes: ["Oversized", "Square", "Round", "Aviator"],
  },
};

export function FaceShapeFinder() {
  const frames = useFrames();
  const [face, setFace] = useState<Face | "">("");
  const [who, setWho] = useState<"" | "Women" | "Men">("");
  const [kind, setKind] = useState<"Glasses" | "Sunglasses">("Glasses");

  const advice = face ? ADVICE[face] : null;
  const matches = useMemo(() => {
    if (!frames || !advice) return [];
    return frames.filter(
      (f) =>
        f.t === kind &&
        f.s &&
        advice.shapes.includes(f.s) &&
        (!who || f.g === who || f.g === "Unisex"),
    );
  }, [frames, advice, kind, who]);
  const href = advice
    ? `/glasses?t=${kind}&s=${advice.shapes.join(",")}${who ? `&g=${who}` : ""}`
    : "/glasses";

  return (
    <ToolCard
      title="Which glasses suit my face shape?"
      intro="Pick the outline closest to your face. Nothing you choose is saved."
    >
      <Step n={1} label="Which shape is closest to your face?">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {(Object.keys(OUTLINE) as Face[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={face === f}
              onClick={() => setFace(f)}
              className={`flex flex-col items-center rounded-2xl border-2 bg-white px-2 py-3 transition ${
                face === f
                  ? "border-[var(--color-primary)] shadow-md"
                  : "border-gray-200 hover:border-[var(--color-primary)]/50"
              }`}
            >
              <svg
                viewBox="0 0 60 76"
                className="h-16 w-12 text-[var(--color-navy)]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d={OUTLINE[f]}
                  fill={face === f ? "rgba(14,165,160,.12)" : "none"}
                />
              </svg>
              <span className="mt-1 text-sm font-semibold text-[var(--color-navy)]">
                {f}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Tip: tie your hair back, look straight into a mirror and compare the
          width of your forehead, cheekbones and jaw with the length of your
          face.
        </p>
        {advice && <p className="text-sm text-gray-600 mt-2">{advice.desc}</p>}
      </Step>

      <Step n={2} label="What are you looking for?">
        <div className="flex flex-wrap gap-2">
          {(["Glasses", "Sunglasses"] as const).map((k) => (
            <Choice key={k} selected={kind === k} onClick={() => setKind(k)}>
              {k === "Glasses" ? "Glasses" : "Sunglasses"}
            </Choice>
          ))}
          <span className="mx-1 hidden sm:inline-block w-px bg-gray-200" />
          {(["Women", "Men", ""] as const).map((w) => (
            <Choice
              key={w || "all"}
              selected={who === w}
              onClick={() => setWho(w)}
            >
              {w || "Show all"}
            </Choice>
          ))}
        </div>
      </Step>

      {advice ? (
        <Result
          tone="info"
          title={`Frame shapes to try for a ${face!.toLowerCase()} face`}
        >
          <div className="flex flex-wrap gap-2 pb-1">
            {advice.shapes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 px-3 py-1.5 text-sm font-medium"
              >
                <ShapeIcon shape={s} className="h-4 w-10" />
                {s}
              </span>
            ))}
          </div>
          <p>{advice.tip}</p>
          {frames && matches.length > 0 && (
            <>
              <div className="pt-2">
                <FrameGrid frames={pickStyles(matches, 8)} />
              </div>
              <div className="pt-3">
                <a
                  href={href}
                  className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
                >
                  See all {countStyles(matches)} matching styles →
                </a>
              </div>
            </>
          )}
          {!frames && <p>Loading frames…</p>}
        </Result>
      ) : (
        <p className="text-sm text-gray-500">
          Choose a face shape to see which frames to try.
        </p>
      )}

      <Note>
        A style guide, not a rule. The best way to choose is to try frames on,
        and an optician can check the fit and size for you. Frame prices come
        from each retailer&apos;s website and were checked on {FRAMES_CHECKED}.
        eyetest.co.uk may earn a commission if you buy through these links.
      </Note>
    </ToolCard>
  );
}
