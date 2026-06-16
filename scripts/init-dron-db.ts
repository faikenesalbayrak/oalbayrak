import { ensureDronTable } from "../server/dronDb.js";

void ensureDronTable().then(() => {
  console.log("dron_submissions table is ready.");
});
