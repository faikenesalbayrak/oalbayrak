import ExcelJS from "exceljs";
import { DRON_QUESTIONS } from "../../../shared/dron";
import { isAdminAuthorized, listDronSubmissions, sendJson } from "../../../server/dronDb";
import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      sendJson(res, 405, { success: false, message: "Desteklenmeyen istek metodu." });
      return;
    }

    if (!isAdminAuthorized(req)) {
      sendJson(res, 401, { success: false, message: "Yetkisiz erişim." });
      return;
    }

    const submissions = await listDronSubmissions();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Dron Başvuruları");
    const headers = ["ID", "Başvuru Tarihi", ...DRON_QUESTIONS.map((question, index) => `${index + 1}- ${question}`)];

    worksheet.addRow(headers);
    worksheet.getRow(1).height = 40;

    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1F497D" },
      };
      cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      cell.border = thinBorder();
    });

    for (const submission of submissions) {
      const createdAt = new Date(submission.created_at).toLocaleString("tr-TR", {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: "Europe/Istanbul",
      });
      const row = worksheet.addRow([
        submission.id,
        createdAt,
        ...DRON_QUESTIONS.map((_, index) => submission[`q${index + 1}`] ?? ""),
      ]);

      row.height = 24;
      row.eachCell((cell, colNumber) => {
        cell.font = { name: "Calibri", size: 10 };
        cell.alignment = {
          horizontal: colNumber <= 2 ? "center" : "left",
          vertical: "middle",
          wrapText: true,
        };
        cell.border = thinBorder();
      });
    }

    worksheet.getColumn(1).width = 8;
    worksheet.getColumn(2).width = 20;
    for (let index = 3; index <= headers.length; index += 1) {
      worksheet.getColumn(index).width = 30;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const timestamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="dron_basvurular_${timestamp}.xlsx"`);
    res.end(Buffer.from(buffer));
  } catch (error) {
    sendJson(res, 500, {
      success: false,
      message: error instanceof Error ? error.message : "Sistem hatası.",
    });
  }
}

function thinBorder(): Partial<ExcelJS.Borders> {
  return {
    top: { style: "thin", color: { argb: "FFCCCCCC" } },
    left: { style: "thin", color: { argb: "FFCCCCCC" } },
    bottom: { style: "thin", color: { argb: "FFCCCCCC" } },
    right: { style: "thin", color: { argb: "FFCCCCCC" } },
  };
}

