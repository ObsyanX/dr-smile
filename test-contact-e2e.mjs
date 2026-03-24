import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on("pageerror", edge => {
    errors.push(edge.message);
  });
  page.on("console", msg => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  console.log("Navigating to Contact page...");
  await page.goto("http://localhost:8080/contact", { waitUntil: "networkidle" });
  
  if (errors.length > 0) {
    console.error("PAGE ERRORS FOUND:");
    errors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log("SUCCESS: No errors found on Contact page.");
    process.exit(0);
  }
})();
