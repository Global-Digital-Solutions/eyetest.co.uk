/** Get today's date string (YYYY-MM-DD) in UK timezone */
export function ukToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(
    new Date()
  );
}

/** Get date strings for today, tomorrow, and day-after-tomorrow in UK timezone */
export function getThreeDayDates(): string[] {
  const today = ukToday();
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
