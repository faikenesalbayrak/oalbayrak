export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

export function isLikelyValidTrPhone(raw: string): boolean {
  const normalized = normalizePhone(raw);
  return normalized === "" || /^(\+90|90|0)?[2345]\d{9}$/.test(normalized);
}
