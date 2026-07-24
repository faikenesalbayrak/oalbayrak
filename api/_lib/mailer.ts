import nodemailer from "nodemailer";
import type { ContactPayload } from "../../client/src/lib/forms/contact-schema.js";
import type { CVRequestPayload } from "../../client/src/lib/forms/cv-request-schema.js";
import { getServerEnv } from "./env.js";

type MailMeta = { ip: string; userAgent: string };
type MailResult = { ok: true; dryRun: boolean } | { ok: false };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(
  title: string,
  rows: Array<[string, string]>,
  message: string,
  meta: MailMeta
): string {
  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#667085">${escapeHtml(label)}</td><td style="padding:8px 12px;font-weight:600">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<!doctype html><html lang="tr"><body style="margin:0;background:#f4f5f7;font-family:Arial,sans-serif;color:#17233a"><div style="max-width:640px;margin:24px auto;background:#fff;border-radius:18px;overflow:hidden;border:1px solid #e4e7ec"><div style="background:#1e3a5f;padding:24px;color:#fff"><div style="font-size:12px;letter-spacing:1.4px;text-transform:uppercase;opacity:.7">Doç. Dr. Orhan Albayrak</div><h1 style="margin:6px 0 0;font-size:24px">${escapeHtml(title)}</h1></div><div style="padding:24px"><table style="width:100%;border-collapse:collapse">${tableRows}</table><div style="margin-top:18px;padding:18px;border-radius:12px;background:#f6f8fb;white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div><p style="margin:20px 0 0;font-size:11px;color:#98a2b3">IP: ${escapeHtml(meta.ip)} · ${escapeHtml(meta.userAgent)}</p></div></div></body></html>`;
}

async function deliver(
  kind: "contact" | "cv-request",
  to: string | undefined,
  replyTo: { name: string; address: string },
  subject: string,
  text: string,
  html: string
): Promise<MailResult> {
  const env = getServerEnv();
  if (env.dryRun) {
    console.info(`[${kind}] dry-run accepted`, { subject });
    return { ok: true, dryRun: true };
  }
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !to) {
    console.error(`[${kind}] SMTP configuration is incomplete`);
    return { ok: false };
  }
  try {
    const transport = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: { user: env.smtpUser, pass: env.smtpPass },
    });
    await transport.sendMail({
      from: { name: "Doç. Dr. Orhan Albayrak — Site", address: env.smtpUser },
      to,
      replyTo,
      subject,
      text,
      html,
    });
    return { ok: true, dryRun: false };
  } catch (error) {
    console.error(
      `[${kind}] mail delivery failed`,
      error instanceof Error ? error.message : "unknown"
    );
    return { ok: false };
  }
}

export async function sendContactMail(
  payload: ContactPayload,
  meta: MailMeta
): Promise<MailResult> {
  const env = getServerEnv();
  const rows: Array<[string, string]> = [
    ["Ad Soyad", payload.fullName],
    ["E-posta", payload.email],
    ["Konu", payload.subject],
  ];
  const subject = `[İletişim] ${payload.subject} · ${payload.fullName}`;
  const text = rows
    .map(([key, value]) => `${key}: ${value}`)
    .concat([`Mesaj: ${payload.message}`])
    .join("\n");
  return deliver(
    "contact",
    env.contactTo || env.cvRequestTo,
    { name: payload.fullName, address: payload.email },
    subject,
    text,
    buildHtml("Yeni iletişim mesajı", rows, payload.message, meta)
  );
}

export async function sendCvRequestMail(
  payload: CVRequestPayload,
  meta: MailMeta
): Promise<MailResult> {
  const env = getServerEnv();
  const rows: Array<[string, string]> = [
    ["Ad Soyad", payload.fullName],
    ["Kurum", payload.institution],
    ["E-posta", payload.email],
    ["Telefon", payload.phone || "-"],
  ];
  const subject = `[CV Talebi] ${payload.fullName} · ${payload.institution}`;
  const text = rows
    .map(([key, value]) => `${key}: ${value}`)
    .concat([`Mesaj: ${payload.message || "-"}`])
    .join("\n");
  return deliver(
    "cv-request",
    env.cvRequestTo || env.contactTo,
    { name: payload.fullName, address: payload.email },
    subject,
    text,
    buildHtml(
      "Yeni CV talebi",
      rows,
      payload.message || "Kullanıcı ek mesaj bırakmadı.",
      meta
    )
  );
}
