import { z } from "zod";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const NO_LINE_BREAK = /^[^\r\n]*$/;

export function createContactSchema() {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, "Lütfen adınızı ve soyadınızı girin.")
      .max(60)
      .regex(NO_LINE_BREAK),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(100)
      .regex(EMAIL_PATTERN, "Lütfen geçerli bir e-posta adresi girin."),
    subject: z
      .string()
      .trim()
      .min(2, "Lütfen bir konu belirtin.")
      .max(120)
      .regex(NO_LINE_BREAK),
    message: z
      .string()
      .trim()
      .min(5, "Lütfen mesajınızı yazın.")
      .max(1500, "Mesaj çok uzun."),
    consent: z
      .boolean()
      .refine(Boolean, "Devam etmek için onay vermeniz gerekiyor."),
    website: z.string().optional().default(""),
  });
}

export const contactSchema = createContactSchema();
export type ContactPayload = z.infer<typeof contactSchema>;

export function validateContactPayload(
  input: unknown
): { ok: true; data: ContactPayload } | { ok: false } {
  const result = contactSchema.safeParse(input);
  return result.success ? { ok: true, data: result.data } : { ok: false };
}
