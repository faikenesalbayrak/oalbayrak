import { ensureDronTable } from "../server/dronDb";

void ensureDronTable().then(() => {
  console.log("dron_submissions table is ready.");
});

