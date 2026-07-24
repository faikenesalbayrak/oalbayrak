export function hasFilledHoneypot(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  return (
    String((input as Record<string, unknown>).website ?? "").trim().length > 0
  );
}

type FormContent = {
  fullName?: string;
  institution?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const BLOCKED_PATTERNS = [
  /<\s*script/i,
  /javascript:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /\b(viagra|casino|forex|porn|betting|crypto doubling)\b/i,
];

export function hasBlockedContent(payload: FormContent): boolean {
  const merged = Object.values(payload).join(" ");
  const urls = merged.match(/(https?:\/\/|www\.)\S+/gi)?.length ?? 0;
  return (
    BLOCKED_PATTERNS.some(pattern => pattern.test(merged)) ||
    urls > 2 ||
    /(.)\1{5,}/.test(merged)
  );
}

type RateLimitEntry = { count: number; resetAt: number };

export function createRateLimiter() {
  const entries = new Map<string, RateLimitEntry>();
  return (key: string, limit: number, windowMs: number, now = Date.now()) => {
    const entry = entries.get(key);
    if (!entry || now >= entry.resetAt) {
      entries.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, retryAfterSeconds: 0 };
    }
    if (entry.count >= limit) {
      return {
        ok: false,
        retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      };
    }
    entry.count += 1;
    return { ok: true, retryAfterSeconds: 0 };
  };
}

function originOf(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isAllowedFormRequest(headers: {
  origin?: string | null;
  referer?: string | null;
  host?: string | null;
}): boolean {
  if (!headers.origin && !headers.referer) return true;
  if (!headers.host) return true;
  const source = originOf(headers.origin) ?? originOf(headers.referer);
  return (
    source === `https://${headers.host}` || source === `http://${headers.host}`
  );
}
