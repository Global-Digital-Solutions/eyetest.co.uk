"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Choice, Note, Result, Step, ToolCard } from "./ToolUi";

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const nice = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function buildIcs(due: Date): string {
  const end = new Date(due);
  end.setDate(end.getDate() + 1);
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//eyetest.co.uk//Eye test reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:eyetest-${ymd(due)}-${Math.random().toString(36).slice(2)}@eyetest.co.uk`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(due)}`,
    `DTEND;VALUE=DATE:${ymd(end)}`,
    "SUMMARY:Eye test due",
    "DESCRIPTION:Time to book your eye test. Compare opticians near you: https://www.eyetest.co.uk/find/book-eye-test",
    "URL:https://www.eyetest.co.uk/find/book-eye-test",
    "BEGIN:VALARM",
    "TRIGGER:-P14D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Your eye test is due in 2 weeks",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function EyeTestReminder() {
  const [last, setLast] = useState("");
  const [months, setMonths] = useState<0 | 12 | 24>(0);

  const due = useMemo(() => {
    if (!last || !months) return null;
    const [y, m] = last.split("-").map(Number);
    if (!y || !m) return null;
    return new Date(y, m - 1 + months, 1);
  }, [last, months]);

  const overdue = due ? due.getTime() <= Date.now() : false;

  const download = () => {
    if (!due) return;
    const blob = new Blob([buildIcs(due)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eye-test-reminder.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const googleUrl = due
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Eye test due")}&dates=${ymd(due)}/${ymd(new Date(due.getFullYear(), due.getMonth(), due.getDate() + 1))}&details=${encodeURIComponent("Time to book your eye test: https://www.eyetest.co.uk/find/book-eye-test")}`
    : "";

  return (
    <ToolCard
      title="When is my next eye test due?"
      intro="Add a reminder to your calendar. Nothing you enter is saved or sent anywhere."
    >
      <Step n={1} label="When was your last eye test?">
        <input
          type="month"
          value={last}
          max={`${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}`}
          onChange={(e) => setLast(e.target.value)}
          aria-label="Month and year of your last eye test"
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
        />
        <p className="text-xs text-gray-500 mt-2">
          Not sure? Your optician can tell you, or pick your best guess.
        </p>
      </Step>

      <Step n={2} label="How often should you go?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Choice wide selected={months === 24} onClick={() => setMonths(24)}>
            Every 2 years (NHS advice for most people)
          </Choice>
          <Choice wide selected={months === 12} onClick={() => setMonths(12)}>
            Every year (my optometrist advised this)
          </Choice>
        </div>
      </Step>

      {due && (
        <Result
          tone={overdue ? "warn" : "info"}
          title={
            overdue
              ? `Your eye test was due in ${due.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`
              : `Your next eye test is due in ${due.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`
          }
        >
          {overdue ? (
            <p>
              You are overdue, so it is worth booking now. Many NHS eye tests
              are free.
            </p>
          ) : (
            <p>
              Add it to your calendar and we will remind you 2 weeks before, on{" "}
              {nice(
                new Date(due.getFullYear(), due.getMonth(), due.getDate() - 14),
              )}
              .
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {overdue ? (
              <Link
                href="/find/book-eye-test"
                className="inline-flex items-center rounded-full bg-amber-600 text-white px-4 py-2 text-sm font-semibold"
              >
                Book an eye test
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center rounded-full bg-[var(--color-primary)] text-white px-4 py-2 text-sm font-semibold"
                >
                  Add to calendar (Apple, Outlook)
                </button>
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
                >
                  Add to Google Calendar
                </a>
              </>
            )}
            <Link
              href="/tools/free-nhs-eye-test-checker"
              className="inline-flex items-center rounded-full bg-white border border-gray-200 text-[var(--color-navy)] px-4 py-2 text-sm font-semibold"
            >
              Is my test free?
            </Link>
          </div>
        </Result>
      )}

      <Note>
        The NHS says most people should have an eye test every 2 years, or more
        often if your optometrist recommends it. Book sooner if you notice any
        change in your vision.
      </Note>
    </ToolCard>
  );
}
