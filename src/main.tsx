import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
<<<<<<< HEAD
=======
import { logger } from "@/lib/logger";

// ── Global Safety Layer ─────────────────────────────────────────────────────
// Catch unhandled promise rejections (browser extensions, network blips, etc.)
// and log them as warnings rather than letting them surface as crashes.
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const msg = reason instanceof Error ? reason.message : String(reason ?? "");

  // Ignore well-known browser-extension noise — these are NOT from our app.
  const ignore = [
    "message channel closed",
    "redefine property",
    "extension context invalidated",
    "receiving end does not exist",
  ];
  if (ignore.some((s) => msg.toLowerCase().includes(s))) {
    event.preventDefault(); // suppress console error
    return;
  }

  logger.warn("Unhandled promise rejection", { reason: msg });
});

// Catch synchronous global errors
window.addEventListener("error", (event) => {
  // Ignore errors from browser extensions (they load from chrome-extension:// etc.)
  if (
    event.filename &&
    (event.filename.includes("extension://") ||
      event.filename.includes("content.js"))
  ) {
    return;
  }
  logger.warn("Global error caught", { message: event.message, filename: event.filename });
});
// ───────────────────────────────────────────────────────────────────────────
>>>>>>> 20a29a9 (Fresh start for dr-smile project)

createRoot(document.getElementById("root")!).render(<App />);
