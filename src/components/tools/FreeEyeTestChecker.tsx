"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Nation = "england" | "scotland" | "wales" | "ni";
type Age = "" | "under16" | "16to18" | "19to39" | "40to59" | "60plus";

const NATIONS: { value: Nation; label: string }[] = [
  { value: "england", label: "England" },
  { value: "scotland", label: "Scotland" },
  { value: "wales", label: "Wales" },
  { value: "ni", label: "Northern Ireland" },
];

const AGES: { value: Age; label: string }[] = [
  { value: "under16", label: "Under 16" },
  { value: "16to18", label: "16 to 18" },
  { value: "19to39", label: "19 to 39" },
  { value: "40to59", label: "40 to 59" },
  { value: "60plus", label: "60 or over" },
];

type Answers = {
  fullTimeEducation: boolean;
  diabetesOrGlaucoma: boolean;
  familyGlaucoma: boolean;
  atRiskGlaucoma: boolean;
  sightImpaired: boolean;
  complexLenses: boolean;
  benefits: boolean;
  universalCredit: boolean;
  hc2: boolean;
  walesOneEye: boolean;
  walesHearing: boolean;
};

const EMPTY: Answers = {
  fullTimeEducation: false,
  diabetesOrGlaucoma: false,
  familyGlaucoma: false,
  atRiskGlaucoma: false,
  sightImpaired: false,
  complexLenses: false,
  benefits: false,
  universalCredit: false,
  hc2: false,
  walesOneEye: false,
  walesHearing: false,
};

function Check({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-[var(--color-primary)]/50 cursor-pointer transition-colors">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-gray-700 leading-relaxed">{children}</span>
    </label>
  );
}

export function FreeEyeTestChecker() {
  const [nation, setNation] = useState<Nation | "">("");
  const [age, setAge] = useState<Age>("");
  const [a, setA] = useState<Answers>(EMPTY);
  const set = (k: keyof Answers) => (v: boolean) =>
    setA((p) => ({ ...p, [k]: v }));

  const result = useMemo(() => {
    if (!nation || !age) return null;
    const reasons: string[] = [];
    const voucher: string[] = [];
    if (age === "under16") {
      reasons.push("you are under 16");
      voucher.push("you are under 16");
    }
    if (age === "16to18" && a.fullTimeEducation) {
      reasons.push("you are 16 to 18 and in full-time education");
      voucher.push("you are 16 to 18 and in full-time education");
    }
    if (age === "60plus") reasons.push("you are 60 or over");
    if (a.diabetesOrGlaucoma) reasons.push("you have diabetes or glaucoma");
    if (a.familyGlaucoma && (age === "40to59" || age === "60plus"))
      reasons.push("you are 40 or over and a close family member has glaucoma");
    if (a.atRiskGlaucoma)
      reasons.push("an ophthalmologist has said you are at risk of glaucoma");
    if (a.sightImpaired)
      reasons.push(
        "you are registered as sight impaired or severely sight impaired",
      );
    if (a.complexLenses) {
      reasons.push("you need complex lenses");
      voucher.push("you need complex lenses");
    }
    if (a.benefits) {
      reasons.push("you or your partner get a qualifying benefit");
      voucher.push("you or your partner get a qualifying benefit");
    }
    if (a.universalCredit) {
      reasons.push("you meet the Universal Credit earnings rules");
      voucher.push("you meet the Universal Credit earnings rules");
    }
    if (a.hc2) {
      reasons.push("you are named on an HC2 certificate");
      voucher.push("you are named on an HC2 certificate");
    }
    if (nation === "wales") {
      if (a.walesOneEye) reasons.push("you have sight in one eye only");
      if (a.walesHearing) reasons.push("you have a hearing impairment");
    }
    return { reasons, voucher };
  }, [nation, age, a]);

  const showFamily = age === "40to59" || age === "60plus";

  return (
    <div className="not-prose bg-gradient-to-br from-[var(--color-primary)]/5 to-white border border-[var(--color-primary)]/20 rounded-3xl p-5 sm:p-8 my-8">
      <h2
        className="text-xl sm:text-2xl font-bold text-[var(--color-navy)] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Check if you get a free NHS eye test
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Takes about a minute. Nothing you enter is saved or sent anywhere.
      </p>

      <fieldset className="mb-6">
        <legend className="text-sm font-semibold text-[var(--color-navy)] mb-2">
          1. Where do you live?
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {NATIONS.map((n) => (
            <button
              key={n.value}
              type="button"
              onClick={() => setNation(n.value)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                nation === n.value
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-primary)]/50"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </fieldset>

      {nation === "scotland" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-2">
          <p className="font-semibold text-emerald-900 mb-1">
            Yes. NHS eye examinations are free for everyone in Scotland.
          </p>
          <p className="text-sm text-emerald-900/80">
            This applies to everyone ordinarily resident in the UK. Help with
            the cost of glasses is available for some groups, so ask your
            optician when you book.
          </p>
        </div>
      )}

      {nation && nation !== "scotland" && (
        <>
          <fieldset className="mb-6">
            <legend className="text-sm font-semibold text-[var(--color-navy)] mb-2">
              2. How old are you?
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {AGES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setAge(g.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    age === g.value
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>

          {age && (
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-[var(--color-navy)] mb-2">
                3. Tick anything that applies to you
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {age === "16to18" && (
                  <Check
                    checked={a.fullTimeEducation}
                    onChange={set("fullTimeEducation")}
                  >
                    I am in full-time education
                  </Check>
                )}
                <Check
                  checked={a.diabetesOrGlaucoma}
                  onChange={set("diabetesOrGlaucoma")}
                >
                  I have diabetes or glaucoma
                </Check>
                {showFamily && (
                  <Check
                    checked={a.familyGlaucoma}
                    onChange={set("familyGlaucoma")}
                  >
                    My parent, brother, sister or child has glaucoma
                  </Check>
                )}
                <Check
                  checked={a.atRiskGlaucoma}
                  onChange={set("atRiskGlaucoma")}
                >
                  An eye specialist has told me I am at risk of glaucoma
                </Check>
                <Check
                  checked={a.sightImpaired}
                  onChange={set("sightImpaired")}
                >
                  I am registered as sight impaired or severely sight impaired
                </Check>
                <Check
                  checked={a.complexLenses}
                  onChange={set("complexLenses")}
                >
                  My optician has said I need complex (very strong) lenses
                </Check>
                <Check checked={a.benefits} onChange={set("benefits")}>
                  I or my partner get income-based Jobseeker&apos;s Allowance,
                  income-related ESA or Pension Credit Guarantee Credit
                </Check>
                <Check
                  checked={a.universalCredit}
                  onChange={set("universalCredit")}
                >
                  I or my partner get Universal Credit with no earnings, or
                  take-home pay of £435 or less in the last assessment period
                  (£935 or less with a child element or limited capability for
                  work)
                </Check>
                <Check checked={a.hc2} onChange={set("hc2")}>
                  I am named on a valid HC2 certificate
                </Check>
                {nation === "wales" && (
                  <>
                    <Check
                      checked={a.walesOneEye}
                      onChange={set("walesOneEye")}
                    >
                      I have sight in one eye only
                    </Check>
                    <Check
                      checked={a.walesHearing}
                      onChange={set("walesHearing")}
                    >
                      I have a hearing impairment
                    </Check>
                  </>
                )}
              </div>
            </fieldset>
          )}

          {result && (
            <div
              aria-live="polite"
              className={`rounded-2xl p-5 border ${
                result.reasons.length
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              {result.reasons.length > 0 ? (
                <>
                  <p className="font-semibold text-emerald-900 mb-2">
                    You are likely to get a free NHS sight test.
                  </p>
                  <p className="text-sm text-emerald-900/80 mb-2">
                    This is because {result.reasons.join(", ")}.
                  </p>
                  {result.voucher.length > 0 ? (
                    <p className="text-sm text-emerald-900/80">
                      You are also likely to get an NHS optical voucher towards
                      glasses or contact lenses.
                    </p>
                  ) : (
                    <p className="text-sm text-emerald-900/80">
                      This does not by itself include help with the cost of
                      glasses.
                    </p>
                  )}
                  {nation !== "england" && (
                    <p className="text-xs text-emerald-900/70 mt-2">
                      Rules in{" "}
                      {nation === "wales" ? "Wales" : "Northern Ireland"} are
                      similar to England but not identical, so your optician
                      will confirm.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="font-semibold text-amber-900 mb-2">
                    You may need to pay for your eye test.
                  </p>
                  <p className="text-sm text-amber-900/80">
                    If your income is low, you may still get help through the
                    NHS Low Income Scheme (an HC2 or HC3 certificate). If you
                    use a screen for work, your employer may pay. Many opticians
                    also run offers.
                  </p>
                </>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                <Link
                  href="/find/book-eye-test"
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-primary)] text-white hover:opacity-90"
                >
                  Find an optician near you
                </Link>
                <Link
                  href="/find/free-eye-test"
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-[var(--color-navy)] border border-gray-200 hover:border-[var(--color-primary)]"
                >
                  Full eligibility rules
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-gray-500 mt-5">
        A guide only, based on NHS rules. Your optician makes the final check
        and may ask for proof, such as an award letter or certificate.
      </p>
    </div>
  );
}
