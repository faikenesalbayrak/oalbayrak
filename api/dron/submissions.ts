import {
  createDronSubmission,
  isAdminAuthorized,
  listDronSubmissions,
  normalizeDronSubmissionInput,
  readJsonBody,
  sendJson,
} from "../../server/dronDb.js";
import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method === "POST") {
      let input;
      try {
        input = normalizeDronSubmissionInput(await readJsonBody(req));
      } catch (error) {
        sendJson(res, 400, {
          success: false,
          message: error instanceof Error ? error.message : "Geçersiz başvuru verisi.",
        });
        return;
      }

      await createDronSubmission(input);
      sendJson(res, 200, {
        success: true,
        message: "Başvurunuz başarıyla kaydedilmiştir.",
      });
      return;
    }

    if (req.method === "GET") {
      if (!isAdminAuthorized(req)) {
        sendJson(res, 401, { success: false, message: "Yetkisiz erişim." });
        return;
      }

      const submissions = await listDronSubmissions();
      sendJson(res, 200, { success: true, basvurular: submissions });
      return;
    }

    res.setHeader("Allow", "GET, POST");
    sendJson(res, 405, { success: false, message: "Desteklenmeyen istek metodu." });
  } catch (error) {
    sendJson(res, 500, {
      success: false,
      message: error instanceof Error ? error.message : "Sistem hatası.",
    });
  }
}
