"use client";

import { useMemo, useState } from "react";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";
import {
  countStyles,
  FrameGrid,
  FRAMES_CHECKED,
  pickStyles,
  useFrames,
} from "./FramePreview";

type Fit = "right" | "small" | "big";

/** How far a frame can be from your size and still count as a close match (mm). */
const TOL = 2;

function sizeName(lw: number) {
  if (lw <= 50) return "small";
  if (lw <= 54) return "medium";
  return "large";
}

function NumberBox({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          inputMode="numeric"
          placeholder={hint}
          value={value}
          onChange={(e) =>
            onChange(e.target.value.replace(/[^\d]/g, "").slice(0, 3))
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
        />
        <span className="absolute right-3 top-2.5 text-sm text-gray-400">
          mm
        </span>
      </div>
    </label>
  );
}

/** Diagram of the three measurements and where they are printed. */
function SizeDiagram() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <svg
        viewBox="0 0 360 150"
        className="w-full max-w-md mx-auto text-[var(--color-navy)]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <rect x="40" y="30" width="110" height="70" rx="22" />
        <rect x="210" y="30" width="110" height="70" rx="22" />
        <path d="M150 50 Q180 34 210 50" />
        <path d="M320 45 L350 40" />
        <path d="M40 45 L10 40" />
        <g stroke="var(--color-primary)" strokeWidth={1.5}>
          <path d="M40 118 H150 M40 112 V124 M150 112 V124" />
          <path d="M150 20 H210 M150 14 V26 M210 14 V26" />
        </g>
        <g
          fill="var(--color-primary)"
          stroke="none"
          fontSize="12"
          fontWeight="700"
          fontFamily="inherit"
          textAnchor="middle"
        >
          <text x="95" y="140">
            Lens width · 52
          </text>
          <text x="180" y="11">
            Bridge · 18
          </text>
        </g>
      </svg>
      <div className="mt-3 flex flex-col items-start gap-2 rounded-xl bg-gray-50 px-3 py-2 sm:flex-row sm:items-center sm:gap-3">
        <svg
          viewBox="0 0 160 24"
          className="h-6 w-40 shrink-0 text-gray-400"
          aria-hidden
        >
          <rect
            x="1"
            y="4"
            width="158"
            height="16"
            rx="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="16.5"
            textAnchor="middle"
            fontSize="10"
            fill="#334155"
            fontFamily="monospace"
          >
            52□18 140
          </text>
        </svg>
        <p className="text-xs text-gray-600">
          Look on the inside of an arm. The numbers are lens width, bridge and
          arm (temple) length, in millimetres. The box between the first two is
          normal.
        </p>
      </div>
    </div>
  );
}

export function FrameSizeChecker() {
  const frames = useFrames();
  const [lw, setLw] = useState("");
  const [br, setBr] = useState("");
  const [tl, setTl] = useState("");
  const [fit, setFit] = useState<Fit>("right");
  const [kind, setKind] = useState<"Glasses" | "Sunglasses">("Glasses");
  const [who, setWho] = useState<"" | "Women" | "Men">("");

  const L = parseInt(lw, 10);
  const B = parseInt(br, 10);
  const T = parseInt(tl, 10);
  const valid = L >= 38 && L <= 66 && B >= 12 && B <= 26;
  const odd =
    (lw && (L < 38 || L > 66)) ||
    (br && (B < 12 || B > 26)) ||
    (tl && (T < 120 || T > 160));

  // Adjust the target if their current pair feels too small or too big.
  const target = valid ? L + (fit === "small" ? 2 : fit === "big" ? -2 : 0) : 0;

  const matches = useMemo(() => {
    if (!frames || !valid) return [];
    return frames.filter(
      (f) =>
        f.t === kind &&
        f.lw &&
        f.br &&
        Math.abs(f.lw - target) <= TOL &&
        Math.abs(f.br - B) <= TOL &&
        (!who || f.g === who || f.g === "Unisex"),
    );
  }, [frames, valid, target, B, kind, who]);

  const n = countStyles(matches);
  const href = `/glasses?t=${kind}&lw=${target}&br=${B}${who ? `&g=${who}` : ""}`;

  return (
    <ToolCard
      title="Find frames in your size"
      intro="Use the numbers on your current glasses. Nothing you enter is saved or sent anywhere."
    >
      <Step n={1} label="Find the size numbers on your current glasses">
        <SizeDiagram />
        <div className="grid grid-cols-3 gap-3 mt-4">
          <NumberBox
            id="fs-lw"
            label="Lens width"
            hint="52"
            value={lw}
            onChange={setLw}
          />
          <NumberBox
            id="fs-br"
            label="Bridge"
            hint="18"
            value={br}
            onChange={setBr}
          />
          <NumberBox
            id="fs-tl"
            label="Arm length"
            hint="140"
            value={tl}
            onChange={setTl}
          />
        </div>
        {odd && (
          <p className="text-xs font-semibold text-amber-700 mt-2">
            One of those numbers looks unusual. Check you have copied it in the
            right order.
          </p>
        )}
      </Step>

      <Step n={2} label="How do your current glasses fit?">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Choice selected={fit === "right"} onClick={() => setFit("right")}>
            They fit well
          </Choice>
          <Choice selected={fit === "small"} onClick={() => setFit("small")}>
            A little too small
          </Choice>
          <Choice selected={fit === "big"} onClick={() => setFit("big")}>
            A little too big
          </Choice>
        </div>
      </Step>

      <Step n={3} label="What are you looking for?">
        <div className="flex flex-wrap gap-2">
          {(["Glasses", "Sunglasses"] as const).map((k) => (
            <Choice key={k} selected={kind === k} onClick={() => setKind(k)}>
              {k}
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

      {valid ? (
        <Result
          tone="info"
          title={`You wear a ${sizeName(L)} frame: ${L}mm lens, ${B}mm bridge${T ? `, ${T}mm arms` : ""}`}
        >
          <p>
            {fit === "right"
              ? `We looked for frames within ${TOL}mm of your lens width and bridge.`
              : `As your current pair feels ${fit === "small" ? "small" : "big"}, we looked for lenses around ${target}mm instead, with a bridge within ${TOL}mm of yours.`}{" "}
            A difference of a millimetre or two is hard to notice, but the
            bridge matters most for comfort on your nose. Arm lengths vary less,
            and an optician can bend the ends to sit comfortably behind your
            ears, so we have not filtered on them.
          </p>
          {frames ? (
            n > 0 ? (
              <>
                <p className="font-semibold">{n} styles match your size.</p>
                <div className="pt-1">
                  <FrameGrid frames={pickStyles(matches, 8)} />
                </div>
                <div className="pt-3">
                  <a
                    href={href}
                    className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
                  >
                    See all {n} styles in your size →
                  </a>
                </div>
              </>
            ) : (
              <p className="font-semibold">
                No frames in our search match that size closely. Try another
                option above, or ask an optician to measure you.
              </p>
            )
          ) : (
            <p>Loading frames…</p>
          )}
        </Result>
      ) : (
        <p className="text-sm text-gray-500">
          Enter at least the lens width and bridge to see frames in your size.
        </p>
      )}

      <Note>
        A guide only. Sizes come from Vision Express and Ace &amp; Tate product
        pages, which list measurements, and were checked on {FRAMES_CHECKED}.
        The same numbers can fit differently depending on the frame shape and
        nose pads, so an optician is the best person to check the fit,
        especially for strong or varifocal prescriptions. eyetest.co.uk may earn
        a commission if you buy through these links.
      </Note>
    </ToolCard>
  );
}
