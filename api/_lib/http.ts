import type { IncomingMessage, ServerResponse } from "node:http";

export function sendJson(
  res: ServerResponse,
  statusCode: number,
  body: unknown
) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");
      if (body.length > 200 * 1024) {
        reject(new Error("İstek gövdesi çok büyük."));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body.trim()) return resolve(null);
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Geçersiz JSON verisi."));
      }
    });
    req.on("error", reject);
  });
}

function firstHeaderValue(value: string | string[] | undefined): string | null {
  return Array.isArray(value)
    ? value[0]?.split(",")[0]?.trim() || null
    : value?.split(",")[0]?.trim() || null;
}

export function getClientIp(req: IncomingMessage): string {
  return (
    firstHeaderValue(req.headers["x-real-ip"]) ??
    firstHeaderValue(req.headers["x-forwarded-for"]) ??
    req.socket?.remoteAddress ??
    "unknown"
  );
}

export function getRequestHeaders(req: IncomingMessage) {
  return {
    origin: firstHeaderValue(req.headers.origin),
    referer: firstHeaderValue(req.headers.referer),
    host: firstHeaderValue(req.headers.host),
    userAgent: firstHeaderValue(req.headers["user-agent"]) ?? "unknown",
  };
}
