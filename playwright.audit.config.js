import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ debug: false, quiet: true });

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/documentation-audit.spec.js", "**/appointment-workflow-audit.spec.js"],
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  timeout: 120000,
  expect: { timeout: 15000 },
  reporter: [["list"]],
  use: {
    baseURL: process.env.QA_URL || "https://portal.qa-encounterservices.com",
    trace: "off",
    screenshot: "off",
    video: "off",
    ...devices["Desktop Chrome"],
    headless: true,
    launchOptions: {
      args: ["--disable-features=VizDisplayCompositor", "--disable-features=TranslateUI", "--disable-extensions", "--no-sandbox"],
    },
  },
});
