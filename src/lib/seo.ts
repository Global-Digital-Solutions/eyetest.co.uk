/**
 * Keep meta descriptions within about 160 characters by dropping whole
 * trailing sentences. Text with no usable sentence break is returned as is,
 * so it can be rewritten by hand rather than cut mid-phrase.
 */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.endsWith(".") ? max - 1 : -1);
  if (end >= 70) return cut.slice(0, end + 1);
  return clean;
}
