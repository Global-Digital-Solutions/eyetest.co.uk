"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Eye = {
  sph: string;
  cyl: string;
  axis: string;
  add: string;
  prism: string;
};
const BLANK: Eye = { sph: "", cyl: "", axis: "", add: "", prism: "" };

/** Parse a lens power such as "-2.25", "+1.00", "1", "plano", "pl" or "0". */
function power(v: string): number | null {
  const s = v.trim().toLowerCase().replace(/\s+/g, "").replace(/d$/, "");
  if (!s) return null;
  if (
    ["pl", "plano", "0", "0.00", "+0.00", "-0.00", "∞", "infinity"].includes(s)
  )
    return 0;
  const n = Number(s.replace("+", ""));
  return Number.isFinite(n) ? n : NaN;
}

function fmt(n: number): string {
  const s = Math.abs(n).toFixed(2);
  return n > 0 ? `+${s}` : n < 0 ? `-${s}` : "0.00";
}

function explainEye(e: Eye): {
  lines: string[];
  warnings: string[];
  near: number | null;
} {
  const lines: string[] = [];
  const warnings: string[] = [];
  const sph = power(e.sph);
  const cyl = power(e.cyl);
  const add = power(e.add);
  const axisText = e.axis.trim();
  const axis = axisText ? Number(axisText) : null;

  if (sph === null) {
    // nothing entered
  } else if (Number.isNaN(sph)) {
    warnings.push(
      "The sphere (SPH) value does not look like a number, for example -2.25 or +1.50.",
    );
  } else if (sph < 0) {
    lines.push(
      `Sphere ${fmt(sph)}: a minus number means short-sightedness (myopia). Things in the distance look blurred, and the lens helps you see far away.`,
    );
  } else if (sph > 0) {
    lines.push(
      `Sphere ${fmt(sph)}: a plus number means long-sightedness (hyperopia). The lens helps your eyes focus, especially on things close up.`,
    );
  } else {
    lines.push(
      "Sphere plano (0.00): no correction is needed for short or long sight in this eye.",
    );
  }

  if (cyl !== null && !Number.isNaN(cyl) && cyl !== 0) {
    lines.push(
      `Cylinder ${fmt(cyl)}: this corrects astigmatism, where the front of the eye is shaped more like a rugby ball than a football.`,
    );
    if (axis === null) {
      warnings.push(
        "A cylinder value should come with an axis between 1 and 180. Check your prescription.",
      );
    } else if (!Number.isFinite(axis) || axis < 0 || axis > 180) {
      warnings.push("The axis should be a number between 1 and 180 degrees.");
    } else {
      lines.push(
        `Axis ${axis}°: this shows the direction of the astigmatism correction in the lens. It is measured in degrees from 1 to 180.`,
      );
    }
  } else if (cyl !== null && Number.isNaN(cyl)) {
    warnings.push("The cylinder (CYL) value does not look like a number.");
  }

  let near: number | null = null;
  if (add !== null && !Number.isNaN(add) && add !== 0) {
    if (add < 0) warnings.push("An add (ADD) value is normally a plus number.");
    lines.push(
      `Add ${fmt(add)}: extra magnifying power for reading and close work, used for reading glasses, bifocals or varifocals. Most people start to need this from their forties.`,
    );
    if (sph !== null && !Number.isNaN(sph)) near = sph + add;
  } else if (add !== null && Number.isNaN(add)) {
    warnings.push("The add (ADD) value does not look like a number.");
  }

  if (e.prism.trim()) {
    lines.push(
      "Prism: this helps your eyes work together, for example if you have double vision or a slight squint. It is written with a direction, such as up, down, in or out.",
    );
  }
  return { lines, warnings, near };
}

const FIELDS: { key: keyof Eye; label: string; placeholder: string }[] = [
  { key: "sph", label: "SPH", placeholder: "-2.25" },
  { key: "cyl", label: "CYL", placeholder: "-0.75" },
  { key: "axis", label: "Axis", placeholder: "180" },
  { key: "add", label: "ADD", placeholder: "+2.00" },
  { key: "prism", label: "Prism", placeholder: "" },
];

export function PrescriptionDecoder() {
  const [right, setRight] = useState<Eye>(BLANK);
  const [left, setLeft] = useState<Eye>(BLANK);
  const r = useMemo(() => explainEye(right), [right]);
  const l = useMemo(() => explainEye(left), [left]);
  const anything =
    r.lines.length + l.lines.length + r.warnings.length + l.warnings.length > 0;

  const row = (name: string, eye: Eye, setEye: (e: Eye) => void) => (
    <div className="bg-white border border-gray-100 rounded-2xl p-4">
      <p className="text-sm font-semibold text-[var(--color-navy)] mb-3">
        {name}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="block text-xs font-semibold text-gray-500 mb-1 text-center">
              {f.label}
            </span>
            <input
              aria-label={`${name} ${f.label}`}
              inputMode={f.key === "prism" ? "text" : "decimal"}
              placeholder={f.placeholder ? `e.g. ${f.placeholder}` : ""}
              value={eye[f.key]}
              onChange={(ev) => setEye({ ...eye, [f.key]: ev.target.value })}
              className="w-full min-w-0 rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-center placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
            />
          </label>
        ))}
      </div>
    </div>
  );

  const panel = (name: string, res: ReturnType<typeof explainEye>) =>
    res.lines.length + res.warnings.length > 0 && (
      <div className="bg-white border border-gray-100 rounded-2xl p-4">
        <p className="font-semibold text-[var(--color-navy)] mb-2">{name}</p>
        <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
          {res.lines.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-[var(--color-primary)]">●</span>
              <span>{t}</span>
            </li>
          ))}
          {res.near !== null && (
            <li className="flex gap-2">
              <span className="text-[var(--color-primary)]">●</span>
              <span>
                For reading only, the sphere and add are combined:{" "}
                {fmt(res.near)}. Ask your optician before buying ready-made
                reading glasses, as they cannot correct astigmatism or different
                strengths in each eye.
              </span>
            </li>
          )}
          {res.warnings.map((t) => (
            <li key={t} className="flex gap-2 text-amber-800">
              <span>!</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="not-prose bg-gradient-to-br from-[var(--color-primary)]/5 to-white border border-[var(--color-primary)]/20 rounded-3xl p-5 sm:p-8 my-8">
      <h2
        className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Decode your glasses prescription
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Copy the numbers from your prescription. Leave boxes blank if they are
        empty on yours. Nothing you enter is saved or sent anywhere.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {row("Right eye (R)", right, setRight)}
        {row("Left eye (L)", left, setLeft)}
      </div>

      <div
        aria-live="polite"
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {panel("Right eye", r)}
        {panel("Left eye", l)}
      </div>

      {anything && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/find/book-eye-test"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:opacity-90"
          >
            Find an optician near you
          </Link>
          <Link
            href="/articles/varifocals"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-[var(--color-navy)] border border-gray-200 hover:border-[var(--color-primary)]"
          >
            Varifocals guide
          </Link>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-5">
        This explains what the numbers mean. It cannot check whether your
        prescription is right for you, and a glasses prescription cannot be used
        to buy contact lenses.
      </p>
    </div>
  );
}
