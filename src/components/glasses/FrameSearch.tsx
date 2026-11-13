"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ShapeIcon, SHAPE_ORDER } from "./ShapeIcon";

type Frame = {
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

// A product with its colour options grouped together, like an ecommerce listing.
type Product = { key: string; v: Frame[] };

type Gender = "" | "Women" | "Men";
type Kind = "" | "Glasses" | "Sunglasses";

const SWATCH: Record<string, string> = {
  Black: "#111827",
  Tortoiseshell: "linear-gradient(135deg,#5b3716 0%,#b06d30 45%,#3b230e 100%)",
  Brown: "#7c4a21",
  Gold: "#d4a93c",
  Silver: "#c4c8cd",
  Grey: "#6b7280",
  Clear: "repeating-linear-gradient(45deg,#e5e7eb 0 3px,#fff 3px 6px)",
  Blue: "#1d4ed8",
  Green: "#15803d",
  Red: "#b91c1c",
  Pink: "#ec7fb0",
  Purple: "#7e22ce",
  White: "#ffffff",
  Beige: "#d6c3a3",
  Yellow: "#facc15",
  Orange: "#f97316",
};
const COLOUR_ORDER = [
  "Black",
  "Tortoiseshell",
  "Brown",
  "Grey",
  "Clear",
  "Gold",
  "Silver",
  "Blue",
  "Green",
  "Red",
  "Pink",
  "Purple",
  "Orange",
  "Yellow",
  "Beige",
  "White",
];

const PRICE_BANDS = [
  { id: "u100", label: "Under £100", min: 0, max: 99.99 },
  { id: "100-150", label: "£100 to £150", min: 100, max: 150 },
  { id: "150-250", label: "£150 to £250", min: 150.01, max: 250 },
  { id: "250", label: "£250 and over", min: 250.01, max: 1e9 },
];

const PAGE = 24;
const gbp = (n: number) => (n % 1 === 0 ? `£${n}` : `£${n.toFixed(2)}`);

type Filters = {
  g: Gender;
  t: Kind;
  s: string[];
  c: string[];
  m: string[];
  b: string[];
  r: string[];
  price: string[];
  /** Upper price limit from a tool link, e.g. an NHS voucher value */
  max?: number;
};
const EMPTY: Filters = {
  g: "",
  t: "",
  s: [],
  c: [],
  m: [],
  b: [],
  r: [],
  price: [],
};

function frameMatches(f: Frame, F: Filters, skip?: keyof Filters) {
  // "Women" and "Men" include unisex styles, as most retailers do.
  if (skip !== "g" && F.g && !(f.g === F.g || f.g === "Unisex")) return false;
  if (skip !== "t" && F.t && f.t !== F.t) return false;
  if (skip !== "s" && F.s.length && !F.s.includes(f.s ?? "")) return false;
  if (skip !== "c" && F.c.length && !F.c.includes(f.c ?? "")) return false;
  if (skip !== "m" && F.m.length && !F.m.includes(f.m ?? "")) return false;
  if (skip !== "b" && F.b.length && !F.b.includes(f.b)) return false;
  if (skip !== "r" && F.r.length && !F.r.includes(f.r)) return false;
  if (
    skip !== "price" &&
    F.price.length &&
    !PRICE_BANDS.some(
      (b) => F.price.includes(b.id) && f.p >= b.min && f.p <= b.max,
    )
  )
    return false;
  if (skip !== "max" && F.max && f.p > F.max) return false;
  return true;
}

// Count styles (colour variants grouped), matching the results grid.
function styleCount(frames: Frame[], F: Filters) {
  const keys = new Set<string>();
  frames.forEach((f) => frameMatches(f, F) && keys.add(`${f.r}|${f.n}|${f.t}`));
  return keys.size;
}

/* ---------- Guided finder ---------- */

const STEPS = [
  "Who for",
  "Frames or sunglasses",
  "Frame shape",
  "Colour",
] as const;

function Finder({
  frames,
  F,
  setF,
  onDone,
}: {
  frames: Frame[];
  F: Filters;
  setF: (f: Filters) => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);
  const count = (extra: Partial<Filters>) =>
    styleCount(frames, { ...F, ...extra });
  const total = styleCount(frames, F);
  const next = (patch: Partial<Filters>) => {
    setF({ ...F, ...patch });
    setAnswered((a) => [...a, step]);
    if (step < 3) setStep(step + 1);
  };

  // A clean example image for the "frames or sunglasses" tiles.
  const sample = (t: Kind) =>
    frames.find(
      (f) => f.t === t && f.r === "Vision Express" && (!F.g || f.g === F.g),
    )?.img;

  const Tile = ({
    on,
    onClick,
    children,
    n,
  }: {
    on: boolean;
    onClick: () => void;
    children: React.ReactNode;
    n: number;
  }) => (
    <button
      onClick={onClick}
      disabled={n === 0}
      className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 bg-white px-4 py-5 text-slate-800 transition disabled:opacity-40 ${
        on
          ? "border-[var(--color-primary)] shadow-md"
          : "border-slate-200 hover:border-slate-400 hover:shadow"
      }`}
    >
      {children}
      <span className="mt-1 text-xs text-slate-400">
        {n.toLocaleString()} styles
      </span>
      {on && (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-primary)] text-[11px] text-white">
          ✓
        </span>
      )}
    </button>
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2
          className="text-2xl sm:text-3xl font-bold text-slate-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Find your glasses
        </h2>
        <ol className="flex items-center gap-1 text-xs sm:text-sm">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-1">
              <button
                onClick={() => setStep(i)}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${i === step ? "bg-slate-900 text-white" : i < step ? "text-[var(--color-primary)]" : "text-slate-400"}`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${i === step ? "bg-white text-slate-900" : i < step ? "bg-[var(--color-primary)] text-white" : "bg-slate-100"}`}
                >
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden md:inline">{s}</span>
              </button>
              {i < 3 && <span className="text-slate-300">›</span>}
            </li>
          ))}
        </ol>
      </div>

      {step === 0 && (
        <div>
          <p className="mb-4 text-slate-600">Who are the glasses for?</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
            {(
              [
                ["Women", "Women"],
                ["Men", "Men"],
                ["", "Show all"],
              ] as [Gender, string][]
            ).map(([g, label]) => (
              <Tile
                key={label}
                on={answered.includes(0) && F.g === g}
                onClick={() => next({ g })}
                n={count({ g })}
              >
                <svg
                  viewBox="0 0 40 40"
                  className="h-10 w-10 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  {g === "Women" && (
                    <path d="M20 6c-6 0-9 5-9 11 0 5-2 8-3 10h24c-1-2-3-5-3-10 0-6-3-11-9-11zM10 36c1-5 5-7 10-7s9 2 10 7" />
                  )}
                  {g === "Men" && (
                    <path d="M20 7c-5 0-8 3-8 9 0 5 3 9 8 9s8-4 8-9c0-6-3-9-8-9zM9 36c1-6 6-9 11-9s10 3 11 9" />
                  )}
                  {g === "" && (
                    <path d="M14 10c-4 0-6 3-6 7s2 7 6 7 6-3 6-7-2-7-6-7zM26 10c-4 0-6 3-6 7s2 7 6 7 6-3 6-7-2-7-6-7zM4 35c1-5 5-8 10-8s9 3 10 8M16 35c1-5 5-8 10-8s9 3 10 8" />
                  )}
                </svg>
                <span className="mt-2 font-semibold">{label}</span>
              </Tile>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="mb-4 text-slate-600">
            Prescription frames or sunglasses?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl">
            {(
              [
                ["Glasses", "Frames"],
                ["Sunglasses", "Sunglasses"],
                ["", "Both"],
              ] as [Kind, string][]
            ).map(([t, label]) => (
              <Tile
                key={label}
                on={answered.includes(1) && F.t === t}
                onClick={() => next({ t })}
                n={count({ t })}
              >
                <div className="h-16 w-full flex items-center justify-center">
                  {t ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sample(t)}
                      alt=""
                      className="max-h-16 object-contain"
                    />
                  ) : (
                    <ShapeIcon
                      shape="Round"
                      className="h-9 w-24 text-slate-700"
                    />
                  )}
                </div>
                <span className="mt-2 font-semibold">{label}</span>
              </Tile>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4 text-slate-600">
            Pick one or more frame shapes, or skip.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SHAPE_ORDER.map((s) => {
              const n = count({ s: [s] });
              const on = F.s.includes(s);
              if (!n && !on) return null;
              return (
                <Tile
                  key={s}
                  on={on}
                  n={n}
                  onClick={() =>
                    setF({
                      ...F,
                      s: on ? F.s.filter((x) => x !== s) : [...F.s, s],
                    })
                  }
                >
                  <ShapeIcon shape={s} className="h-9 w-24 text-slate-800" />
                  <span className="mt-2 font-semibold text-sm">{s}</span>
                </Tile>
              );
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="mb-4 text-slate-600">Any colours in mind?</p>
          <div className="flex flex-wrap gap-3">
            {COLOUR_ORDER.map((c) => {
              const n = count({ c: [c] });
              if (!n && !F.c.includes(c)) return null;
              const on = F.c.includes(c);
              return (
                <button
                  key={c}
                  onClick={() =>
                    setF({
                      ...F,
                      c: on ? F.c.filter((x) => x !== c) : [...F.c, c],
                    })
                  }
                  className={`flex w-24 flex-col items-center rounded-2xl border-2 bg-white p-3 transition ${on ? "border-[var(--color-primary)] shadow-md" : "border-slate-200 hover:border-slate-400"}`}
                >
                  <span
                    className="h-10 w-10 rounded-full border border-slate-300 shadow-inner"
                    style={{ background: SWATCH[c] }}
                  />
                  <span className="mt-2 text-sm font-medium text-slate-800">
                    {c}
                  </span>
                  <span className="text-[11px] text-slate-400">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
        <button
          onClick={() =>
            step === 0 ? (setF(EMPTY), setAnswered([])) : setStep(step - 1)
          }
          className="text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          {step === 0 ? "Start again" : "‹ Back"}
        </button>
        <div className="flex items-center gap-3">
          {step < 3 && (
            <button
              onClick={() => setStep(step + 1)}
              className="text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Skip
            </button>
          )}
          <button
            onClick={onDone}
            className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[var(--color-primary-dark)]"
          >
            Show {total.toLocaleString()} styles
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Filter bar dropdowns ---------- */

function Dropdown({
  label,
  active,
  children,
}: {
  label: string;
  active: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
          active
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-300 bg-white text-slate-800 hover:border-slate-500"
        }`}
      >
        {label}
        {active > 0 && (
          <span className="rounded-full bg-white px-1.5 text-[11px] font-semibold text-slate-900">
            {active}
          </span>
        )}
        <svg
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-30 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckList({
  options,
  selected,
  counts,
  onToggle,
  labels = {},
}: {
  options: string[];
  selected: string[];
  counts: Record<string, number>;
  onToggle: (v: string) => void;
  labels?: Record<string, string>;
}) {
  return (
    <ul className="max-h-72 space-y-1 overflow-y-auto">
      {options.map((o) => (
        <li key={o}>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
            <input
              type="checkbox"
              className="h-4 w-4 accent-slate-900"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
            />
            <span className="flex-1">{labels[o] ?? o}</span>
            <span className="text-xs text-slate-400">{counts[o] ?? 0}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Product card ---------- */

function Card({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const f = p.v[i];
  const colours = p.v.filter(
    (v, k, a) => v.c && a.findIndex((x) => x.c === v.c) === k,
  );
  const prices = p.v.map((v) => v.p);
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  return (
    <li className="group flex flex-col rounded-2xl p-2 -m-2 transition hover:bg-white hover:shadow-xl">
      <a
        href={f.u}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="relative block overflow-hidden rounded-xl bg-[#f3f3f3]"
      >
        <div className="aspect-square">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.img}
            alt={`${f.b} ${f.n}${f.c ? `, ${f.c}` : ""}`}
            loading="lazy"
            className={`h-full w-full transition duration-300 group-hover:scale-105 ${f.r === "Vision Express" ? "object-contain p-6 mix-blend-multiply" : "object-cover"}`}
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
          {f.r}
        </span>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-lg bg-slate-900 py-2 text-center text-xs font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          View at {f.r} →
        </span>
        {f.t === "Sunglasses" && (
          <span className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white">
            Sun
          </span>
        )}
      </a>
      <div className="mt-3 flex items-center gap-1.5 min-h-[18px]">
        {colours.slice(0, 5).map((v) => {
          const k = p.v.indexOf(v);
          return (
            <button
              key={v.c}
              onMouseEnter={() => setI(k)}
              onClick={() => setI(k)}
              title={v.c ?? ""}
              aria-label={`Show ${v.c}`}
              className={`h-4 w-4 rounded-full border ${k === i ? "ring-2 ring-slate-900 ring-offset-1" : "border-slate-300"}`}
              style={{ background: SWATCH[v.c!] ?? "#ddd" }}
            />
          );
        })}
        {colours.length > 5 && (
          <span className="text-xs text-slate-500">+{colours.length - 5}</span>
        )}
      </div>
      <p className="mt-2 text-sm font-bold uppercase tracking-wide text-slate-900">
        {f.b}
      </p>
      <p className="text-sm text-slate-600 line-clamp-1">{f.n}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">
        {lo === hi ? gbp(lo) : `From ${gbp(lo)}`}
      </p>
      {hi !== lo && <span className="sr-only">up to {gbp(hi)}</span>}
    </li>
  );
}

/* ---------- Hero ---------- */

function Hero({ frames }: { frames: Frame[] }) {
  const styles = styleCount(frames, EMPTY);
  const retailers = [...new Set(frames.map((f) => f.r))];
  const lo = Math.min(...frames.map((f) => f.p));
  // A loose collage of real frames from different retailers.
  const pick = (r: string, t: string, i = 0) =>
    frames.filter((f) => f.r === r && f.t === t)[i];
  const collage = [
    pick("Vision Express", "Glasses", 3),
    pick("Jimmy Fairly", "Sunglasses", 0),
    pick("Ace & Tate", "Glasses", 2),
    pick("Cubitts", "Glasses", 1),
    pick("Ace & Tate", "Sunglasses", 5),
    pick("Vision Express", "Sunglasses", 4),
  ].filter(Boolean) as Frame[];
  const tilt = [
    "-rotate-6",
    "rotate-3",
    "-rotate-2",
    "rotate-6",
    "-rotate-3",
    "rotate-2",
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 85% 20%, rgba(14,165,160,.45), transparent 60%), radial-gradient(50% 60% at 10% 100%, rgba(95,212,207,.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-28 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-36 lg:pt-14">
        <div>
          <nav className="mb-5 text-xs text-white/60">
            <a href="/" className="hover:text-white">
              Home
            </a>{" "}
            <span className="mx-1">/</span> Glasses
          </nav>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-light)]" />{" "}
            Independent glasses search
          </p>
          <h1
            className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every high street style.
            <br />
            <span className="text-[var(--color-primary-light)]">
              One search.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Stop flicking between optician websites. See glasses and sunglasses
            from opticians with stores across England, Scotland, Wales and
            Northern Ireland side by side, then buy direct from the one you
            like.
          </p>
          <dl className="mt-8 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur">
            {(
              [
                [
                  styles.toLocaleString(),
                  "styles to browse",
                  "M3 7h18M3 12h18M3 17h18",
                ],
                [
                  String(retailers.length),
                  "opticians",
                  "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6",
                ],
                [
                  `£${Math.floor(lo)}`,
                  "frames from",
                  "M12 3v18M17 7.5C17 5.6 14.8 4.5 12 4.5S7 5.6 7 7.5s2.2 3 5 3.5 5 1.6 5 3.5-2.2 3-5 3-5-1.1-5-3",
                ],
              ] as [string, string, string][]
            ).map(([a, b, d], i) => (
              <div
                key={b}
                className={`flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5 ${i ? "border-l border-white/10" : ""}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] ring-1 ring-[var(--color-primary)]/40">
                  {i === 0 ? (
                    <ShapeIcon shape="Round" className="h-4 w-8" />
                  ) : i === 1 ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={d} />
                    </svg>
                  ) : (
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      £
                    </span>
                  )}
                </span>
                <div className="leading-tight">
                  <dd
                    className="text-2xl font-bold tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {b === "frames from" && (
                      <span className="mr-1 text-sm font-medium text-white/60">
                        from
                      </span>
                    )}
                    {a}
                  </dd>
                  <dt className="mt-0.5 text-xs text-white/60">
                    {b === "frames from" ? "per frame" : b}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <span>Shop</span>
            {retailers.map((r) => (
              <span
                key={r}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--color-navy)]"
              >
                {r}
              </span>
            ))}
            <span>in one place</span>
          </div>
        </div>
        <div className="relative hidden h-[360px] lg:block" aria-hidden>
          {collage.map((f, i) => (
            <div
              key={f.id}
              className={`absolute w-52 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 ${tilt[i]}`}
              style={{
                left: `${[2, 50, 26, 66, 0, 40][i]}%`,
                top: `${[4, 0, 34, 42, 62, 70][i]}%`,
                zIndex: [1, 2, 4, 3, 2, 5][i],
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.img}
                alt=""
                className={`aspect-[4/3] w-full ${f.r === "Vision Express" ? "object-contain p-4" : "object-cover"}`}
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-medium text-white">
                {f.r}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why use it ---------- */

function WhyStrip() {
  const items = [
    [
      "M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",
      "Search once",
      "Styles from several opticians in one place, filtered your way.",
    ],
    [
      "M9 12l2 2 4-4M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z",
      "Independent",
      "We don't make or sell glasses. Results are mixed across retailers by default.",
    ],
    [
      "M3 3h2l2.4 12.2a1 1 0 001 .8h9.2a1 1 0 001-.8L20 7H6M9 20a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z",
      "Buy direct",
      "Click through to the retailer's own product page to buy.",
    ],
    [
      "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z",
      "Eye test first",
      "Out of date prescription? Find an eye test near you, NHS or private.",
    ],
  ];
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(([d, t, b], i) => (
        <li key={t} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-primary)] text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={d} />
            </svg>
          </span>
          <div>
            <p className="font-semibold text-slate-900">
              {i === 3 ? (
                <a href="/search" className="hover:underline">
                  {t} →
                </a>
              ) : (
                t
              )}
            </p>
            <p className="text-sm text-slate-600">{b}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Eye test promo tile in the grid ---------- */

function EyeTestTile() {
  return (
    <li className="col-span-2 md:col-span-1">
      <a
        href="/search"
        className="flex h-full min-h-[260px] flex-col justify-between rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-6 text-white shadow-lg transition hover:shadow-xl"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
          Before you buy
        </span>
        <span>
          <span
            className="block text-2xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Is your prescription up to date?
          </span>
          <span className="mt-2 block text-sm text-white/85">
            Most adults should have an eye test every 2 years. Many people get
            one free on the NHS.
          </span>
        </span>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]">
          Find an eye test near you →
        </span>
      </a>
    </li>
  );
}

/* ---------- Main ---------- */

export function FrameSearch() {
  const [frames, setFrames] = useState<Frame[] | null>(null);
  const [F, setF] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState("rel");
  const [shown, setShown] = useState(PAGE);
  const [finder, setFinder] = useState(true);
  const [more, setMore] = useState(false);
  const [fromLink, setFromLink] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/frames.json")
      .then((r) => r.json())
      .then(setFrames);
    // Tools can link straight to a filtered view, e.g. /glasses?t=Glasses&max=64.26&s=Round,Oval
    const q = new URLSearchParams(window.location.search);
    if ([...q.keys()].some((k) => ["g", "t", "s", "c", "max"].includes(k))) {
      const list = (k: string) =>
        q.get(k) ? q.get(k)!.split(",").filter(Boolean) : [];
      const g = q.get("g");
      const t = q.get("t");
      const max = parseFloat(q.get("max") ?? "");
      setF({
        ...EMPTY,
        g: g === "Women" || g === "Men" ? g : "",
        t: t === "Glasses" || t === "Sunglasses" ? t : "",
        s: list("s"),
        c: list("c"),
        max: max > 0 ? max : undefined,
      });
      setFinder(false);
      setFromLink(true);
    }
  }, []);

  // Arriving from a tool link: jump straight to the matching frames.
  useEffect(() => {
    if (frames && fromLink)
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ block: "start" }),
        100,
      );
  }, [frames, fromLink]);

  const set = (f: Filters) => {
    setF(f);
    setShown(PAGE);
  };
  const toggle = (k: "s" | "c" | "m" | "b" | "r" | "price", v: string) =>
    set({
      ...F,
      [k]: F[k].includes(v) ? F[k].filter((x) => x !== v) : [...F[k], v],
    });

  // Group colour variants into one product, then mix retailers for the default order.
  const products = useMemo(() => {
    if (!frames) return [];
    const map = new Map<string, Frame[]>();
    frames.forEach((f) => {
      if (!frameMatches(f, F)) return;
      const key = `${f.r}|${f.n}|${f.t}`;
      map.set(key, [...(map.get(key) ?? []), f]);
    });
    let list: Product[] = [...map.entries()].map(([key, v]) => ({ key, v }));
    if (sort === "rel") {
      const by: Record<string, Product[]> = {};
      list.forEach((p) => (by[p.v[0].r] ||= []).push(p));
      const lanes = Object.values(by);
      list = [];
      for (let i = 0; lanes.some((l) => l[i]); i++)
        lanes.forEach((l) => l[i] && list.push(l[i]));
    } else {
      const min = (p: Product) => Math.min(...p.v.map((v) => v.p));
      list.sort((a, b) => (sort === "lo" ? min(a) - min(b) : min(b) - min(a)));
    }
    return list;
  }, [frames, F, sort]);

  const counts = useMemo(() => {
    const out: Record<string, Record<string, number>> = {
      s: {},
      c: {},
      m: {},
      b: {},
      r: {},
      price: {},
    };
    frames?.forEach((f) => {
      (["s", "c", "m", "b", "r"] as const).forEach((k) => {
        const v = f[k];
        if (v && frameMatches(f, F, k)) out[k][v] = (out[k][v] || 0) + 1;
      });
      if (frameMatches(f, F, "price")) {
        const b = PRICE_BANDS.find((b) => f.p >= b.min && f.p <= b.max);
        if (b) out.price[b.id] = (out.price[b.id] || 0) + 1;
      }
    });
    return out;
  }, [frames, F]);

  const sorted = (k: string) =>
    Object.keys(counts[k]).sort((a, b) => counts[k][b] - counts[k][a]);

  const chips: { label: string; clear: () => void }[] = [
    ...(F.g ? [{ label: F.g, clear: () => set({ ...F, g: "" }) }] : []),
    ...(F.t
      ? [
          {
            label: F.t === "Glasses" ? "Frames" : "Sunglasses",
            clear: () => set({ ...F, t: "" }),
          },
        ]
      : []),
    ...(["s", "c", "m", "b", "r"] as const).flatMap((k) =>
      F[k].map((v) => ({ label: v, clear: () => toggle(k, v) })),
    ),
    ...(F.max
      ? [
          {
            label: `Up to £${F.max.toFixed(2)}`,
            clear: () => set({ ...F, max: undefined }),
          },
        ]
      : []),
    ...F.price.map((id) => ({
      label: PRICE_BANDS.find((b) => b.id === id)!.label,
      clear: () => toggle("price", id),
    })),
  ];

  const done = () => {
    setFinder(false);
    setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      50,
    );
  };

  if (!frames)
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-500">
        Loading frames…
      </div>
    );

  return (
    <>
      <Hero frames={frames} />
      <div className="relative mx-auto -mt-20 max-w-7xl px-4 pb-8 sm:px-6 lg:-mt-24 lg:px-8">
        {finder ? (
          <Finder frames={frames} F={F} setF={set} onDone={done} />
        ) : (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-5 py-4 text-slate-900 shadow-xl ring-1 ring-slate-200">
            <span className="font-semibold">Your search:</span>
            <span className="text-slate-600">
              {chips.length
                ? chips.map((c) => c.label).join(" · ")
                : "All frames"}
            </span>
            <button
              onClick={() => setFinder(true)}
              className="ml-auto rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
            >
              Change answers
            </button>
          </div>
        )}

        <WhyStrip />

        <div ref={resultsRef} className="scroll-mt-24" />

        {/* Filter bar */}
        <div className="lg:sticky top-0 z-20 -mx-4 mt-8 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-slate-300 p-0.5 text-sm">
              {(["Women", "Men", ""] as Gender[]).map((g) => (
                <button
                  key={g || "all"}
                  onClick={() => set({ ...F, g })}
                  className={`rounded-full px-3 py-1.5 ${F.g === g ? "bg-slate-900 text-white" : "text-slate-700"}`}
                >
                  {g || "All"}
                </button>
              ))}
            </div>
            <div className="flex rounded-full border border-slate-300 p-0.5 text-sm">
              {(["Glasses", "Sunglasses", ""] as Kind[]).map((t) => (
                <button
                  key={t || "both"}
                  onClick={() => set({ ...F, t })}
                  className={`rounded-full px-3 py-1.5 whitespace-nowrap ${F.t === t ? "bg-slate-900 text-white" : "text-slate-700"}`}
                >
                  {t === "Glasses" ? "Frames" : t || "Both"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMore(!more)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-800 md:hidden"
            >
              {more
                ? "Fewer filters"
                : `More filters${F.s.length + F.c.length + F.price.length + F.b.length + F.m.length + F.r.length ? ` (${F.s.length + F.c.length + F.price.length + F.b.length + F.m.length + F.r.length})` : ""}`}
            </button>
            <div
              className={`${more ? "flex" : "hidden"} w-full flex-wrap gap-2 md:contents`}
            >
              <Dropdown label="Shape" active={F.s.length}>
                <div className="grid grid-cols-2 gap-2">
                  {SHAPE_ORDER.filter(
                    (s) => counts.s[s] || F.s.includes(s),
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => toggle("s", s)}
                      className={`flex flex-col items-center rounded-xl border p-2 text-xs ${F.s.includes(s) ? "border-slate-900 bg-slate-50" : "border-slate-200 hover:border-slate-400"}`}
                    >
                      <ShapeIcon
                        shape={s}
                        className="h-6 w-16 text-slate-800"
                      />
                      <span className="mt-1 font-medium text-slate-800">
                        {s}
                      </span>
                      <span className="text-slate-400">{counts.s[s] ?? 0}</span>
                    </button>
                  ))}
                </div>
              </Dropdown>
              <Dropdown label="Colour" active={F.c.length}>
                <div className="grid grid-cols-4 gap-2">
                  {COLOUR_ORDER.filter(
                    (c) => counts.c[c] || F.c.includes(c),
                  ).map((c) => (
                    <button
                      key={c}
                      onClick={() => toggle("c", c)}
                      className="flex flex-col items-center gap-1 text-[11px] text-slate-700"
                    >
                      <span
                        className={`h-8 w-8 rounded-full border ${F.c.includes(c) ? "ring-2 ring-slate-900 ring-offset-2" : "border-slate-300"}`}
                        style={{ background: SWATCH[c] }}
                      />
                      {c}
                    </button>
                  ))}
                </div>
              </Dropdown>
              <Dropdown label="Price" active={F.price.length}>
                <CheckList
                  options={PRICE_BANDS.map((b) => b.id)}
                  selected={F.price}
                  counts={counts.price}
                  onToggle={(v) => toggle("price", v)}
                  labels={Object.fromEntries(
                    PRICE_BANDS.map((b) => [b.id, b.label]),
                  )}
                />
              </Dropdown>
              <Dropdown label="Brand" active={F.b.length}>
                <CheckList
                  options={sorted("b")}
                  selected={F.b}
                  counts={counts.b}
                  onToggle={(v) => toggle("b", v)}
                />
              </Dropdown>
              <Dropdown label="Material" active={F.m.length}>
                <CheckList
                  options={sorted("m")}
                  selected={F.m}
                  counts={counts.m}
                  onToggle={(v) => toggle("m", v)}
                />
              </Dropdown>
              <Dropdown label="Retailer" active={F.r.length}>
                <CheckList
                  options={sorted("r")}
                  selected={F.r}
                  counts={counts.r}
                  onToggle={(v) => toggle("r", v)}
                />
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="mt-5 mb-6 flex flex-wrap items-center gap-2">
          <p className="mr-2 text-sm text-slate-600">
            <strong className="text-slate-900">
              {products.length.toLocaleString()}
            </strong>{" "}
            styles
          </p>
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={c.clear}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              {c.label} ✕
            </button>
          ))}
          {chips.length > 0 && (
            <button
              onClick={() => set(EMPTY)}
              className="text-xs font-medium text-slate-500 underline"
            >
              Clear all
            </button>
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-auto rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800"
            aria-label="Sort"
          >
            <option value="rel">Recommended</option>
            <option value="lo">Price: low to high</option>
            <option value="hi">Price: high to low</option>
          </select>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, shown).map((p, i) => (
            <Fragment key={p.key}>
              {i === 7 && <EyeTestTile />}
              <Card p={p} />
            </Fragment>
          ))}
        </ul>

        {products.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
            Nothing matches all of those choices.{" "}
            <button
              onClick={() => set(EMPTY)}
              className="font-medium text-[var(--color-primary)] underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {shown < products.length && (
          <div className="mt-12 text-center">
            <p className="mb-3 text-sm text-slate-500">
              Showing {shown} of {products.length.toLocaleString()} styles
            </p>
            <button
              onClick={() => setShown((s) => s + PAGE)}
              className="rounded-full border-2 border-slate-900 px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              Load more
            </button>
          </div>
        )}

        <p className="mt-12 text-xs leading-relaxed text-slate-500">
          Prices and details come from each retailer&apos;s own website and were
          checked on 12 November 2026. Glasses prices are for the frame and may
          include standard lenses depending on the retailer, so check the final
          price with the retailer before you buy. eyetest.co.uk may earn a
          commission if you buy through these links, at no extra cost to you.
        </p>
      </div>
    </>
  );
}
