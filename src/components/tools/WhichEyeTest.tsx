"use client";

import Link from "next/link";
import { useState } from "react";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";

type Key =
  | "routine"
  | "child"
  | "contacts"
  | "diabetes"
  | "glaucoma"
  | "driving"
  | "scan"
  | "dry"
  | "problem";

const OPTIONS: { key: Key; label: string }[] = [
  { key: "routine", label: "A routine check, my eyes feel fine" },
  { key: "child", label: "An eye test for my child" },
  { key: "contacts", label: "I wear, or want to try, contact lenses" },
  { key: "diabetes", label: "I have diabetes" },
  { key: "glaucoma", label: "Glaucoma runs in my family" },
  { key: "driving", label: "I need to check my eyesight for driving" },
  { key: "scan", label: "I want a detailed scan of the back of my eye" },
  { key: "dry", label: "My eyes are dry, gritty or watery" },
  { key: "problem", label: "Something has changed or is wrong with my eyes" },
];

type Rec = {
  title: string;
  body: string[];
  links: { label: string; href: string }[];
};

const RECS: Record<Exclude<Key, "problem">, Rec> = {
  routine: {
    title: "A standard eye test",
    body: [
      "A standard sight test checks how well you see and the health of your eyes. The NHS says most people should have one every 2 years, or more often if your optometrist advises.",
      "It is free on the NHS if you qualify, for example if you are 60 or over.",
    ],
    links: [
      { label: "Standard eye test", href: "/eye-tests/standard-eye-test" },
      {
        label: "Do I get a free test?",
        href: "/tools/free-nhs-eye-test-checker",
      },
    ],
  },
  child: {
    title: "A children's eye test",
    body: [
      "NHS sight tests are free for all children under 16, and for 16 to 18 year olds in full-time education. Children do not need to be able to read letters to have their eyes tested.",
    ],
    links: [
      { label: "Children's eye test", href: "/eye-tests/childrens-eye-test" },
      { label: "Book an eye test", href: "/find/book-eye-test" },
    ],
  },
  contacts: {
    title: "A sight test plus a contact lens fitting or check",
    body: [
      "A contact lens fitting or check is a separate appointment from a sight test and is not covered by the NHS. You need a contact lens specification to buy lenses; a glasses prescription is not enough.",
    ],
    links: [
      {
        label: "Contact lens fitting",
        href: "/eye-tests/contact-lens-fitting",
      },
      { label: "Contact lenses guide", href: "/articles/contact-lenses" },
    ],
  },
  diabetes: {
    title: "A free NHS eye test, plus diabetic eye screening",
    body: [
      "If you have diabetes, NHS sight tests are free. NHS diabetic eye screening is a separate check for diabetic retinopathy, so keep going to both.",
    ],
    links: [
      {
        label: "Diabetic eye screening",
        href: "/eye-tests/diabetic-eye-screening",
      },
      {
        label: "Diabetic retinopathy",
        href: "/eye-health/conditions/diabetic-retinopathy",
      },
    ],
  },
  glaucoma: {
    title: "A free NHS eye test with glaucoma checks",
    body: [
      "If you are 40 or over and your parent, brother, sister or child has glaucoma, your NHS sight test is free. Glaucoma often has no symptoms, so regular tests matter.",
    ],
    links: [
      { label: "Glaucoma assessment", href: "/eye-tests/glaucoma-assessment" },
      { label: "About glaucoma", href: "/eye-health/conditions/glaucoma" },
    ],
  },
  driving: {
    title: "Check the DVLA eyesight standard, then have an eye test",
    body: [
      "Car drivers must be able to read a number plate from 20 metres and meet a minimum eyesight standard. An optician can test your vision and field of vision.",
    ],
    links: [
      {
        label: "Driving eyesight check",
        href: "/tools/driving-eyesight-check",
      },
      {
        label: "Eye test for driving",
        href: "/eye-tests/dvla-driving-vision-test",
      },
    ],
  },
  scan: {
    title: "An eye test with an OCT scan",
    body: [
      "An OCT scan takes a detailed 3D image of the back of your eye. Most opticians offer it as an extra on top of a sight test, and some include it in their test price.",
    ],
    links: [
      { label: "OCT scan", href: "/eye-tests/oct-scan" },
      { label: "OCT scan cost", href: "/find/oct-scan-cost" },
    ],
  },
  dry: {
    title: "Start with a pharmacist, then a dry eye assessment if needed",
    body: [
      "A pharmacist can suggest eye drops for dry eyes. If it does not improve, many opticians offer a dry eye assessment.",
    ],
    links: [
      { label: "Dry eye assessment", href: "/eye-tests/dry-eye-assessment" },
      {
        label: "Dry eye syndrome",
        href: "/eye-health/conditions/dry-eye-syndrome",
      },
    ],
  },
};

export function WhichEyeTest() {
  const [pick, setPick] = useState<Key | "">("");
  const [urgent, setUrgent] = useState<"" | "emergency" | "sudden" | "mild">(
    "",
  );

  return (
    <ToolCard
      title="Which eye test do I need?"
      intro="Pick the option that fits you best. Nothing you enter is saved or sent anywhere."
    >
      <Step n={1} label="What do you need?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OPTIONS.map((o) => (
            <Choice
              key={o.key}
              wide
              selected={pick === o.key}
              onClick={() => {
                setPick(o.key);
                setUrgent("");
              }}
            >
              {o.label}
            </Choice>
          ))}
        </div>
      </Step>

      {pick === "problem" && (
        <Step n={2} label="Which sounds most like you?">
          <div className="grid grid-cols-1 gap-2">
            <Choice
              wide
              selected={urgent === "emergency"}
              onClick={() => setUrgent("emergency")}
            >
              A serious eye injury, a chemical in my eye, or sudden severe pain
              or loss of vision
            </Choice>
            <Choice
              wide
              selected={urgent === "sudden"}
              onClick={() => setUrgent("sudden")}
            >
              A sudden change, such as new flashes or floaters, or a red,
              painful eye
            </Choice>
            <Choice
              wide
              selected={urgent === "mild"}
              onClick={() => setUrgent("mild")}
            >
              A gradual change, such as blurred vision or headaches when reading
            </Choice>
          </div>
        </Step>
      )}

      {pick && pick !== "problem" && (
        <Result tone="info" title={RECS[pick].title}>
          {RECS[pick].body.map((b) => (
            <p key={b}>{b}</p>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {RECS[pick].links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                  i === 0
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white border border-gray-200 text-[var(--color-navy)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </Result>
      )}

      {pick === "problem" && urgent === "emergency" && (
        <Result tone="alert" title="Go to A&E or call 999 now">
          <p>
            For a serious eye injury, a chemical in the eye, or sudden severe
            eye pain or loss of vision, go to A&E or call 999. Do not drive
            yourself.
          </p>
        </Result>
      )}
      {pick === "problem" && urgent === "sudden" && (
        <Result tone="warn" title="Get seen today">
          <p>
            Contact an optician today for an urgent appointment, or call NHS 111
            if you are not sure where to go. Always call 111 for a child under
            5.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/find/emergency-eye-test-near-me"
              className="inline-flex items-center rounded-full bg-amber-600 text-white px-4 py-2 text-sm font-semibold"
            >
              Urgent eye care
            </Link>
            <a
              href="https://111.nhs.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              NHS 111 online
            </a>
          </div>
        </Result>
      )}
      {pick === "problem" && urgent === "mild" && (
        <Result tone="info" title="Book a standard eye test">
          <p>
            Gradual changes are often a sign your prescription has changed. An
            optician can check your vision and the health of your eyes.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/find/book-eye-test"
              className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
            >
              Book an eye test
            </Link>
            <Link
              href="/eye-health/conditions/blurred-vision"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              Blurred vision
            </Link>
          </div>
        </Result>
      )}
      <Note>
        A guide only, based on NHS advice. It does not replace advice from an
        optometrist, pharmacist or doctor.
      </Note>
    </ToolCard>
  );
}
