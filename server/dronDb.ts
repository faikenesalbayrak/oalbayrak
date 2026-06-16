import { neon } from "@neondatabase/serverless";
import type { IncomingMessage, ServerResponse } from "node:http";
import { DRON_QUESTION_COUNT, type DronSubmission, type DronSubmissionInput } from "../shared/dron.js";

type QueryRow = Record<string, unknown>;

const columnNames = Array.from({ length: DRON_QUESTION_COUNT }, (_, index) => `q${index + 1}`);

let tableReady: Promise<void> | null = null;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required.");
  }

  return neon(databaseUrl);
}

export async function ensureDronTable() {
  if (!tableReady) {
    const sql = getSql();
    const answerColumns = columnNames.map((column) => `${column} TEXT NOT NULL DEFAULT ''`).join(",\n");

    tableReady = sql.query(`
      CREATE TABLE IF NOT EXISTS dron_submissions (
        id BIGSERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        ${answerColumns}
      )
    `).then(() => undefined);
  }

  return tableReady;
}

export function normalizeDronSubmissionInput(input: unknown): DronSubmissionInput {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Başvuru verisi alınamadı.");
  }

  const source = input as Record<string, unknown>;

  return Object.fromEntries(
    columnNames.map((column) => {
      const value = source[column];
      return [column, typeof value === "string" ? value.trim() : ""];
    }),
  ) as DronSubmissionInput;
}

export async function createDronSubmission(input: DronSubmissionInput) {
  await ensureDronTable();

  const sql = getSql();
  const placeholders = columnNames.map((_, index) => `$${index + 1}`).join(", ");
  const values = columnNames.map((column) => input[column as keyof DronSubmissionInput]);

  await sql.query(
    `INSERT INTO dron_submissions (${columnNames.join(", ")}) VALUES (${placeholders})`,
    values,
  );
}

export async function listDronSubmissions(): Promise<DronSubmission[]> {
  await ensureDronTable();

  const sql = getSql();
  const rows = await sql.query(
    `SELECT id, created_at, ${columnNames.join(", ")} FROM dron_submissions ORDER BY created_at DESC`,
  );

  return rows.map(mapSubmissionRow);
}

function mapSubmissionRow(row: QueryRow): DronSubmission {
  const item: Record<string, string | number> = {
    id: Number(row.id),
    created_at: new Date(String(row.created_at)).toISOString(),
  };

  for (const column of columnNames) {
    item[column] = typeof row[column] === "string" ? row[column] : "";
  }

  return item as DronSubmission;
}

export function isAdminAuthorized(req: IncomingMessage) {
  const adminPassword = process.env.DRON_ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("DRON_ADMIN_PASSWORD environment variable is required.");
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : "";

  return token === adminPassword;
}

export function sendJson(res: ServerResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");

      if (body.length > 1024 * 1024) {
        reject(new Error("Başvuru verisi çok büyük."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body.trim()) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Geçersiz JSON verisi."));
      }
    });

    req.on("error", reject);
  });
}
