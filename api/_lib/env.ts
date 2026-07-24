const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);

function asBoolean(value: string | undefined, fallback: boolean): boolean {
  return value === undefined || value === ""
    ? fallback
    : TRUE_VALUES.has(value.trim().toLowerCase());
}

function asPort(value: string | undefined): number {
  const parsed = Number(value);
  return value && Number.isInteger(parsed) && parsed > 0 && parsed <= 65535
    ? parsed
    : 465;
}

export function getServerEnv() {
  return {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: asPort(process.env.SMTP_PORT),
    smtpSecure: asBoolean(process.env.SMTP_SECURE, true),
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    contactTo: process.env.CONTACT_TO,
    cvRequestTo: process.env.CV_REQUEST_TO,
    dryRun: asBoolean(process.env.MAIL_DRY_RUN, false),
  };
}
