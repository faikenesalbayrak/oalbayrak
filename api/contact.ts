import type { IncomingMessage, ServerResponse } from "node:http";
import { validateContactPayload } from "../client/src/lib/forms/contact-schema.js";
import {
  createRateLimiter,
  hasBlockedContent,
  hasFilledHoneypot,
  isAllowedFormRequest,
} from "../client/src/lib/forms/security.js";
import {
  getClientIp,
  getRequestHeaders,
  readJsonBody,
  sendJson,
} from "./_lib/http.js";
import { sendContactMail } from "./_lib/mailer.js";

const rateLimit = createRateLimiter();
const GENERIC_ERROR = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { success: false, message: GENERIC_ERROR });
  }
  try {
    const headers = getRequestHeaders(req);
    if (!isAllowedFormRequest(headers))
      return sendJson(res, 403, { success: false, message: GENERIC_ERROR });
    const input = await readJsonBody(req);
    if (hasFilledHoneypot(input)) return sendJson(res, 200, { success: true });
    const payload = validateContactPayload(input);
    if (!payload.ok || hasBlockedContent(payload.data))
      return sendJson(res, 400, { success: false, message: GENERIC_ERROR });
    const ip = getClientIp(req);
    const limit = rateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);
    if (!limit.ok) {
      res.setHeader("Retry-After", String(limit.retryAfterSeconds));
      return sendJson(res, 429, { success: false, message: GENERIC_ERROR });
    }
    const result = await sendContactMail(payload.data, {
      ip,
      userAgent: headers.userAgent,
    });
    return sendJson(
      res,
      result.ok ? 200 : 500,
      result.ok ? { success: true } : { success: false, message: GENERIC_ERROR }
    );
  } catch {
    return sendJson(res, 500, { success: false, message: GENERIC_ERROR });
  }
}
