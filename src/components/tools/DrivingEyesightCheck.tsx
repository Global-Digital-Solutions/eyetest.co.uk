"use client";

import Link from "next/link";
import { useState } from "react";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";

type YN = "" | "yes" | "no";

function YesNo({ value, onChange }: { value: YN; onChange: (v: YN) => void }) {
  return (
    <div className="flex gap-2">
      <Choice selected={value === "yes"} onClick={() => onChange("yes")}>
        Yes
      </Choice>
      <Choice selected={value === "no"} onClick={() => onChange("no")}>
        No
      </Choice>
    </div>
  );
}

/**
 * Based on GOV.UK "Driving eyesight rules", "Eye conditions and driving"
 * and DVLA leaflet INS57P. Car and motorcycle standard: read a number plate
 * (post-2001 style) from 20 metres, visual acuity of at least 6/12
 * (decimal 0.5), adequate field of vision. Lorry and bus drivers have higher
 * standards.
 */
export function DrivingEyesightCheck() {
  const [vehicle, setVehicle] = useState<"" | "car" | "lorry">("");
  const [plate, setPlate] = useState<YN>("");
  const [told, setTold] = useState<YN>("");
  const [double, setDouble] = useState<YN>("");
  const [condition, setCondition] = useState<YN>("");

  const done = vehicle && plate && told && double && condition;
  const fail = plate === "no" || told === "yes";
  const report = condition === "yes" || double === "yes";

  return (
    <ToolCard
      title="Check your eyesight for driving"
      intro="Four quick questions. Nothing you enter is saved or sent anywhere."
    >
      <Step n={1} label="What do you drive?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Choice
            selected={vehicle === "car"}
            onClick={() => setVehicle("car")}
          >
            A car or motorcycle
          </Choice>
          <Choice
            selected={vehicle === "lorry"}
            onClick={() => setVehicle("lorry")}
          >
            A lorry, bus or minibus
          </Choice>
        </div>
      </Step>

      {vehicle && (
        <>
          <Step
            n={2}
            label="Can you read a car number plate from 20 metres in good light, wearing glasses or contact lenses if you need them?"
          >
            <p className="text-xs text-gray-500 mb-2">
              20 metres is about the length of 5 parked cars. Use a plate made
              after September 2001, for example AB51 ABC.
            </p>
            <YesNo value={plate} onChange={setPlate} />
          </Step>
          <Step
            n={3}
            label="Has an optician or doctor told you your eyesight is below the driving standard, or that you should not drive?"
          >
            <p className="text-xs text-gray-500 mb-2">
              The car standard is at least 6/12 (decimal 0.5) on the letter
              chart, with glasses if needed.
            </p>
            <YesNo value={told} onChange={setTold} />
          </Step>
          <Step n={4} label="Do you have double vision?">
            <YesNo value={double} onChange={setDouble} />
          </Step>
          <Step
            n={5}
            label="Do you have an eye condition that affects both eyes, or your only eye with sight?"
          >
            <p className="text-xs text-gray-500 mb-2">
              For example glaucoma, retinitis pigmentosa or night blindness.
              Short or long sight on its own does not count.
            </p>
            <YesNo value={condition} onChange={setCondition} />
          </Step>
        </>
      )}

      {done && fail && (
        <Result
          tone="alert"
          title="Do not drive until you have had your eyes tested"
        >
          <p>
            By law you must meet the eyesight standard every time you drive.
            Book an eye test now, and wear your glasses or contact lenses
            whenever you need them to meet the standard.
          </p>
          <p>
            If an optician or doctor has told you not to drive, or you have an
            eye condition that affects your vision, you must also tell DVLA.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/find/book-eye-test"
              className="inline-flex items-center rounded-full bg-red-600 text-white px-4 py-2 text-sm font-semibold"
            >
              Book an eye test
            </Link>
            <a
              href="https://www.gov.uk/eye-conditions-and-driving"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              Tell DVLA (GOV.UK)
            </a>
          </div>
        </Result>
      )}

      {done && !fail && report && (
        <Result tone="warn" title="You may need to tell DVLA">
          <p>
            You must tell DVLA if you have double vision or an eye condition
            that affects both eyes, or your only eye with sight. You can be
            fined up to £1,000 if you do not tell DVLA about a condition that
            affects your driving.
          </p>
          <p>
            DVLA may ask you to have an eyesight test with one of their
            contracted opticians, which you do not pay for.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="https://www.gov.uk/eye-conditions-and-driving"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-amber-600 text-white px-4 py-2 text-sm font-semibold"
            >
              Eye conditions and driving (GOV.UK)
            </a>
            <Link
              href="/find/book-eye-test"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              Book an eye test
            </Link>
          </div>
        </Result>
      )}

      {done && !fail && !report && (
        <Result
          tone="good"
          title="You appear to meet the basic eyesight standard"
        >
          <p>
            Keep it that way with an eye test at least every 2 years, as DVLA
            advises, and wear your glasses or contact lenses for driving if you
            need them.
          </p>
          {vehicle === "lorry" && (
            <p>
              Lorry and bus drivers have higher standards, including at least
              6/7.5 (decimal 0.8) in the better eye and a wider field of vision.
              These are checked as part of your D4 medical.
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/eye-tests/dvla-driving-vision-test"
              className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
            >
              Eye tests for drivers
            </Link>
            <Link
              href="/tools/eye-test-reminder"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              Set an eye test reminder
            </Link>
          </div>
        </Result>
      )}

      <Note>
        A guide only, based on GOV.UK and DVLA guidance. It cannot test your
        eyesight. Only an eye test, or a DVLA assessment, can confirm you meet
        the standard. Rules for Northern Ireland are set by the DVA.
      </Note>
    </ToolCard>
  );
}
