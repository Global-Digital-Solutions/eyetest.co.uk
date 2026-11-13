"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";

/**
 * NHS optical voucher values in England, from NHS.uk
 * "NHS voucher values for glasses and lenses" (values from April 2026,
 * matching the NHSBSA HC12 guide). Bands are set by the stronger eye.
 */
const SINGLE = { A: 42.4, B: 64.26, C: 94.14, D: 212.4 } as const;
const BIFOCAL = { E: 73.1, F: 92.72, G: 120.48, H: 233.56 } as const;

type Level = 0 | 1 | 2 | 3;

/** 0 = A/E, 1 = B/F, 2 = C/G, 3 = D/H, using the NHS sphere and cylinder rules */
function level(sphRaw: string, cylRaw: string): Level | null {
  if (sphRaw.trim() === "" && cylRaw.trim() === "") return null;
  const s = Math.abs(parseFloat(sphRaw) || 0);
  const c = Math.abs(parseFloat(cylRaw) || 0);
  if (s > 14 || c > 6) return 3;
  if (s >= 10) return 2;
  if (s <= 6 && c <= 2) return 0;
  return 1;
}

const fmt = (n: number) => `£${n.toFixed(2)}`;

function PowerInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
      </span>
      <input
        id={id}
        inputMode="decimal"
        placeholder="e.g. -2.50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
      />
    </label>
  );
}

export function VoucherCalculator() {
  const [type, setType] = useState<"" | "single" | "bifocal">("");
  const [prism, setPrism] = useState(false);
  const [rs, setRs] = useState("");
  const [rc, setRc] = useState("");
  const [ls, setLs] = useState("");
  const [lc, setLc] = useState("");

  const result = useMemo(() => {
    if (!type) return null;
    const r = level(rs, rc);
    const l = level(ls, lc);
    if (r === null && l === null) return null;
    let lv = Math.max(r ?? 0, l ?? 0) as Level;
    if (type === "bifocal" && prism) lv = 3;
    const bands =
      type === "single" ? Object.entries(SINGLE) : Object.entries(BIFOCAL);
    const [band, value] = bands[lv];
    return {
      band,
      value,
      bad: [rs, rc, ls, lc].some(
        (v) => v.trim() !== "" && isNaN(parseFloat(v)),
      ),
    };
  }, [type, prism, rs, rc, ls, lc]);

  return (
    <ToolCard
      title="Work out your NHS optical voucher"
      intro="For England. Nothing you enter is saved or sent anywhere."
    >
      <Step n={1} label="What type of glasses do you need?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Choice
            selected={type === "single"}
            onClick={() => setType("single")}
          >
            Single vision (one power per lens)
          </Choice>
          <Choice
            selected={type === "bifocal"}
            onClick={() => setType("bifocal")}
          >
            Bifocals (two powers per lens)
          </Choice>
        </div>
        {type === "bifocal" && (
          <label className="flex items-center gap-2 mt-3 text-sm text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--color-primary)]"
              checked={prism}
              onChange={(e) => setPrism(e.target.checked)}
            />
            My optician says I need prism-controlled bifocals
          </label>
        )}
      </Step>

      <Step n={2} label="Copy the SPH and CYL numbers from your prescription">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <p className="text-sm font-semibold text-[var(--color-navy)] mb-3">
              Right eye (R)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <PowerInput id="v-rs" label="SPH" value={rs} onChange={setRs} />
              <PowerInput id="v-rc" label="CYL" value={rc} onChange={setRc} />
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <p className="text-sm font-semibold text-[var(--color-navy)] mb-3">
              Left eye (L)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <PowerInput id="v-ls" label="SPH" value={ls} onChange={setLs} />
              <PowerInput id="v-lc" label="CYL" value={lc} onChange={setLc} />
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Leave CYL blank if it is empty on your prescription. Plus and minus
          signs do not change the band.
        </p>
      </Step>

      {result ? (
        <Result
          tone="info"
          title={`Likely voucher: band ${result.band}, worth ${fmt(result.value)}`}
        >
          <p>
            This is based on the stronger of your two eyes. You can put the
            voucher towards {type === "single" ? "glasses" : "bifocal glasses"}{" "}
            or contact lenses at any optician. If your glasses cost more, you
            pay the difference.
          </p>
          <p>
            Some prescriptions add a supplement, for example for prisms or
            tints. Your optician works out the final value and band.
          </p>
          {result.bad && (
            <p className="font-semibold">
              One of the numbers does not look right. Check you have copied it
              exactly.
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href={`/tools/frames-nhs-voucher-covers?band=${result.band}`}
              className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
            >
              See frames this voucher covers
            </Link>
            <Link
              href="/tools/free-nhs-eye-test-checker"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              Check if you get a voucher
            </Link>
            <Link
              href="/find/nhs-optical-voucher"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              All voucher bands
            </Link>
          </div>
        </Result>
      ) : (
        <p className="text-sm text-gray-500">
          Choose a lens type and enter at least one SPH or CYL number to see
          your band.
        </p>
      )}
      <Note>
        A guide only, using NHS England voucher values. You only get a voucher
        if you qualify, for example if you are under 16, on certain benefits or
        need complex lenses. Scotland, Wales and Northern Ireland set their own
        values.
      </Note>
    </ToolCard>
  );
}
