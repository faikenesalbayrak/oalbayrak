import { z } from "zod";
import { isLikelyValidTrPhone } from "./phone";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const NO_LINE_BREAK = /^[^\r\n]*$/;

export function createCVRequestSchema() {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, "Lütfen adınızı ve soyadınızı girin.")
      .max(60)
      .regex(NO_LINE_BREAK),
    institution: z
      .string()
      .trim()
      .min(2, "Lütfen kurum adını girin.")
      .max(100)
      .regex(NO_LINE_BREAK),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(100)
      .regex(EMAIL_PATTERN, "Lütfen geçerli bir e-posta adresi girin."),
    phone: z
      .string()
      .trim()
      .max(20)
      .regex(NO_LINE_BREAK)
      .refine(
        isLikelyValidTrPhone,
        "Lütfen geçerli bir telefon numarası girin."
      )
      .optional()
      .default(""),
    message: z
      .string()
      .trim()
      .max(500, "Mesaj çok uzun.")
      .optional()
      .default(""),
    consent: z
      .boolean()
      .refine(Boolean, "Devam etmek için onay vermeniz gerekiyor."),
    website: z.string().optional().default(""),
  });
}

export const cvRequestSchema = createCVRequestSchema();
export type CVRequestPayload = z.infer<typeof cvRequestSchema>;

export function validateCVRequestPayload(
  input: unknown
): { ok: true; data: CVRequestPayload } | { ok: false } {
  const result = cvRequestSchema.safeParse(input);
  return result.success ? { ok: true, data: result.data } : { ok: false };
}
