"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";
import {
  countStyles,
  FrameGrid,
  FRAMES_CHECKED,
  pickStyles,
  useFrames,
} from "./FramePreview";

/** NHS England voucher values from April 2026 (NHS.uk and NHSBSA HC12), same as the voucher calculator. */
const BANDS = [
  { band: "A", value: 42.4, lens: "Single vision" },
  { band: "B", value: 64.26, lens: "Single vision" },
  { band: "C", value: 94.14, lens: "Single vision" },
  { band: "D", value: 212.4, lens: "Single vision" },
  { band: "E", value: 73.1, lens: "Bifocal" },
  { band: "F", value: 92.72, lens: "Bifocal" },
  { band: "G", value: 120.48, lens: "Bifocal" },
  { band: "H", value: 233.56, lens: "Bifocal" },
] as const;

const fmt = (n: number) => `£${n.toFixed(2)}`;

export function VoucherFrames() {
  const frames = useFrames();
  const [band, setBand] = useState("");
  const [who, setWho] = useState<"" | "Women" | "Men">("");

  // The voucher calculator links here with ?band=B
  useEffect(() => {
    const b = new URLSearchParams(window.location.search)
      .get("band")
      ?.toUpperCase();
    if (b && BANDS.some((x) => x.band === b)) setBand(b);
  }, []);

  const chosen = BANDS.find((b) => b.band === band);

  const covered = useMemo(() => {
    if (!frames || !chosen) return [];
    return frames.filter(
      (f) =>
        f.t === "Glasses" &&
        f.p <= chosen.value &&
        (!who || f.g === who || f.g === "Unisex"),
    );
  }, [frames, chosen, who]);

  const n = countStyles(covered);
  const shops = [...new Set(covered.map((f) => f.r))];
  const href = chosen
    ? `/glasses?t=Glasses&max=${chosen.value}${who ? `&g=${who}` : ""}`
    : "/glasses";

  return (
    <ToolCard
      title="Which frames does my NHS voucher cover?"
      intro="England voucher values. Nothing you enter is saved or sent anywhere."
    >
      <Step n={1} label="Which voucher band do you have?">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BANDS.map((b) => (
            <Choice
              key={b.band}
              selected={band === b.band}
              onClick={() => setBand(b.band)}
            >
              <span className="block font-bold">Band {b.band}</span>
              <span className="block text-xs opacity-80">
                {fmt(b.value)} · {b.lens}
              </span>
            </Choice>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Not sure? Your optometrist tells you the band after your test, or{" "}
          <Link
            href="/tools/nhs-optical-voucher-calculator"
            className="text-[var(--color-primary)] underline"
          >
            work it out from your prescription
          </Link>
          .
        </p>
      </Step>

      <Step n={2} label="Who are the glasses for?">
        <div className="grid grid-cols-3 gap-2 max-w-md">
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

      {chosen && frames ? (
        n > 0 ? (
          <Result
            tone="good"
            title={`${n} styles cost ${fmt(chosen.value)} or less`}
          >
            <p>
              These frames from{" "}
              {shops.length > 1
                ? `${shops.slice(0, -1).join(", ")} and ${shops[shops.length - 1]}`
                : shops[0]}{" "}
              are priced at or under your band {chosen.band} voucher, so you may
              pay nothing extra.
              {chosen.lens === "Bifocal" &&
                " Bifocal lenses usually cost more than single vision lenses, so check the full price with the optician."}
            </p>
            <div className="pt-2">
              <FrameGrid frames={pickStyles(covered, 8)} />
            </div>
            <div className="flex flex-wrap gap-2 pt-3">
              <a
                href={href}
                className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
              >
                See all {n} frames up to {fmt(chosen.value)} →
              </a>
              <Link
                href="/search"
                className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
              >
                Find an optician near you
              </Link>
            </div>
          </Result>
        ) : (
          <Result
            tone="warn"
            title={`No frames in our search are ${fmt(chosen.value)} or less right now`}
          >
            <p>
              Many opticians keep a range of frames for NHS voucher holders in
              store, so ask when you book. You can also put the voucher towards
              dearer frames and pay the difference.
            </p>
            <a
              href="/glasses?t=Glasses"
              className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold mt-2"
            >
              Browse all frames →
            </a>
          </Result>
        )
      ) : (
        <p className="text-sm text-gray-500">
          {frames
            ? "Choose your voucher band to see frames it covers."
            : "Loading frames…"}
        </p>
      )}

      <Note>
        Frame prices come from each retailer&apos;s website and were checked on{" "}
        {FRAMES_CHECKED}. Vision Express and Ace &amp; Tate say their prices
        include standard single vision lenses. Check what is included with the
        retailer, and ask before ordering online, as vouchers are usually
        handled in store. Scotland, Wales and Northern Ireland set their own
        voucher values. eyetest.co.uk may earn a commission if you buy through
        these links.
      </Note>
    </ToolCard>
  );
}
