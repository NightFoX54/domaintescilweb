/**
 * Parses portal money values from the Laravel API. Amounts are often formatted
 * like "₺1.234,56" (TRY) which `Number()` cannot parse (NaN).
 */
export function parsePortalMoneyAmount(input: unknown): number {
  if (input == null || input === "") return 0;
  if (typeof input === "number") {
    return Number.isFinite(input) ? input : 0;
  }

  const raw = String(input).trim();
  if (raw === "") return 0;

  // Plain ASCII number only
  if (/^-?\d+(\.\d+)?$/.test(raw)) {
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  let s = raw.replace(/[^\d,.\-]/g, "");
  if (s === "" || s === "-") return 0;

  if (s.includes(",") && s.includes(".")) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (s.includes(",")) {
    s = s.replace(",", ".");
  }

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}
