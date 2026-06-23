/** Get today's date string (YYYY-MM-DD) in UK timezone */
export function ukToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(
    new Date()
  );
}

/** Get the current hour (0-23) in UK timezone */
export function ukHour(): number {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
}

/** Get date strings for today, tomorrow, and day-after-tomorrow in UK timezone */
export function getThreeDayDates(): string[] {
  const today = ukToday();
  return getThreeDayDatesFrom(today);
}

/**
 * Get 3-day date window for static providers (no live availability data).
 *
 * Static providers return count=-1 ("available but count unknown") for every
 * day, so showing "Available today" at e.g. 10 PM is misleading because
 * stores are closed. After the cutoff hour (default 18:00 / 6 PM UK time)
 * we shift the window to start from tomorrow instead.
 */
export function getStaticThreeDayDates(cutoffHour = 18): string[] {
  const hour = ukHour();
  const today = ukToday();
  if (hour >= cutoffHour) {
    // Past cutoff — start from tomorrow
    const [y, m, d] = today.split("-").map(Number);
    const tomorrow = new Date(y, m - 1, d + 1);
    return getThreeDayDatesFrom(tomorrow.toISOString().slice(0, 10));
  }
  return getThreeDayDatesFrom(today);
}

/** Get date strings for 3 consecutive days starting from a given YYYY-MM-DD date */
export function getThreeDayDatesFrom(startDate: string): string[] {
  const [y, m, d] = startDate.split("-").map(Number);
  return [0, 1, 2].map((offset) => {
    const dt = new Date(y, m - 1, d + offset);
    return dt.toISOString().slice(0, 10);
  });
}
