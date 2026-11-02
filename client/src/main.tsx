import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

inject();
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
