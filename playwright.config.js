import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Load environment variables
dotenv.config({ debug: false, quiet: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure auth directory exists
const authDir = path.resolve(__dirname, "playwright", ".auth");
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

// Shared browser configuration for Desktop Chrome
const desktopChromeConfig = {
  ...devices["Desktop Chrome"],
  launchOptions: {
    args: [
      "--disable-features=VizDisplayCompositor",
      "--disable-features=TranslateUI",
      "--disable-extensions",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-web-security",
      "--disable-ipc-flooding-protection",
    ],
  },
  acceptDownloads: true,
};

// All auth setup project names for dependencies
const authSetupProjects = [
  "auth-admin",
  "auth-admin-two",
  "auth-provider",
  "auth-provider-two",
  "auth-patient",
  "auth-patient-two",
  "auth-coordinator",
  "auth-coordinator-two",
  "auth-admin-coordinator",
  "auth-provider-coordinator",
  "auth-provider-admin",
  "auth-provider-admin-coordinator",
  "auth-device",
  "auth-device-two",
  "auth-super-admin",
];

// All single-user project names for destructive dependencies
const singleUserProjects = [
  "single-admin",
  "single-admin-coordinator",
  "single-coordinator",
  "single-device",
  "single-patient",
  "single-provider",
  "single-provider-admin",
  "single-provider-admin-coordinator",
  "single-provider-coordinator",
  "single-super-admin",
  "single-unauthenticated",
];

export default defineConfig({
  testDir: "./tests",
  testIgnore: ["**/utils/**", "**/example.spec.js", "**/documentation-audit.spec.js", "**/appointment-workflow-audit.spec.js"], // Exclude utilities, example, and audit tests from normal execution
  fullyParallel: false, // Sequential execution within projects by default
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 3,
  workers: 5, // 5 workers to run 15 authentication setup projects in parallel
  timeout: 120000, // Default timeout for each test
  expect: {
    timeout: 15000, // Expect timeout of 15 seconds
  },
  reporter: [
    ["list"],
    ["html", { open: "never" }], // Set to 'never' for CI to avoid hanging
    ["junit", { outputFile: "test-results/results.xml" }],
    ["json", { outputFile: "test-results/results.json" }],
    // [
    //   "@alex_neo/playwright-azure-reporter",
    //   {
    //     orgUrl: "https://dev.azure.com/globalmeddev",
    //     token: process.env.AZURE_TOKEN,
    //     planId: 127655,
    //     projectName: "eNow2",
    //     environment: "QA",
    //     logging: true,
    //     testRunTitle: "Playwright Test Run",
    //     publishTestResultsMode: "testRun",
    //     uploadAttachments: true,
    //     attachmentsType: ["screenshot", "video", "trace"],
    //     testCaseIdMatcher: /@\[(\d+)\]/,
    //     testPointMapper: async (testCase, testPoints) => {
    //       // Map all tests to "Browser Web" configuration since all projects use Desktop Chrome
    //       const filtered = testPoints.filter((testPoint) => testPoint.configuration?.name?.includes("Browser Web"));

    //       // Return filtered results, or first test point as fallback if Browser Web not found
    //       return filtered.length > 0 ? filtered : testPoints.length > 0 ? [testPoints[0]] : [];
    //     },
    //     testRunConfig: {
    //       owner: {
    //         displayName: "Cody Huls",
    //       },
    //       comment: "Playwright Test Run - Desktop Chrome Browser",
    //     },
    //   },
    // ],
  ],

  // Project configurations
  projects: [
    // ============================================
    // PHASE 1: Authentication Setup (15 projects)
    // Runs first with 5 workers in parallel
    // ============================================
    {
      name: "auth-admin",
      testMatch: "**/setup/auth-admin.js",
      fullyParallel: true,
    },
    {
      name: "auth-admin-two",
      testMatch: "**/setup/auth-admin-two.js",
      fullyParallel: true,
    },
    {
      name: "auth-provider",
      testMatch: "**/setup/auth-provider.js",
      fullyParallel: true,
    },
    {
      name: "auth-provider-two",
      testMatch: "**/setup/auth-provider-two.js",
      fullyParallel: true,
    },
    {
      name: "auth-patient",
      testMatch: "**/setup/auth-patient.js",
      fullyParallel: true,
    },
    {
      name: "auth-patient-two",
      testMatch: "**/setup/auth-patient-two.js",
      fullyParallel: true,
    },
    {
      name: "auth-coordinator",
      testMatch: "**/setup/auth-coordinator.js",
      fullyParallel: true,
    },
    {
      name: "auth-coordinator-two",
      testMatch: "**/setup/auth-coordinator-two.js",
      fullyParallel: true,
    },
    {
      name: "auth-admin-coordinator",
      testMatch: "**/setup/auth-admin-coordinator.js",
      fullyParallel: true,
    },
    {
      name: "auth-provider-coordinator",
      testMatch: "**/setup/auth-provider-coordinator.js",
      fullyParallel: true,
    },
    {
      name: "auth-provider-admin",
      testMatch: "**/setup/auth-provider-admin.js",
      fullyParallel: true,
    },
    {
      name: "auth-provider-admin-coordinator",
      testMatch: "**/setup/auth-provider-admin-coordinator.js",
      fullyParallel: true,
    },
    {
      name: "auth-device",
      testMatch: "**/setup/auth-device.js",
      fullyParallel: true,
    },
    {
      name: "auth-device-two",
      testMatch: "**/setup/auth-device-two.js",
      fullyParallel: true,
    },
    {
      name: "auth-super-admin",
      testMatch: "**/setup/auth-super-admin.js",
      fullyParallel: true,
    },

    // ============================================
    // PHASE 2: Smoke Tests
    // Runs after auth setup, verifies auth files
    // ============================================
    {
      name: "smoke",
      testMatch: "**/smoke/**/*.spec.js",
      use: { ...desktopChromeConfig },
      fullyParallel: true,
      dependencies: authSetupProjects,
    },

    // ============================================
    // PHASE 3A: Single-User Tests (11 projects)
    // Each project has 1 worker for role isolation
    // Up to 5 projects run in parallel
    // ============================================
    {
      name: "single-admin",
      testMatch: "**/single-user-tests/admin/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/admin.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-admin-coordinator",
      testMatch: "**/single-user-tests/admin-coordinator/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/admin-coordinator.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-coordinator",
      testMatch: "**/single-user-tests/coordinator/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/coordinator.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-device",
      testMatch: "**/single-user-tests/device/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/device.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-patient",
      testMatch: "**/single-user-tests/patient/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/patient.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-provider",
      testMatch: "**/single-user-tests/provider/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/provider.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-provider-admin",
      testMatch: "**/single-user-tests/provider-admin/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/provider-admin.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-provider-admin-coordinator",
      testMatch: "**/single-user-tests/provider-admin-coordinator/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/provider-admin-coordinator.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-provider-coordinator",
      testMatch: "**/single-user-tests/provider-coordinator/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/provider-coordinator.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-super-admin",
      testMatch: "**/single-user-tests/super-admin/**/*.spec.js",
      use: {
        ...desktopChromeConfig,
        storageState: "playwright/.auth/super-admin.json",
      },
      fullyParallel: false,
      dependencies: ["smoke"],
    },
    {
      name: "single-unauthenticated",
      testMatch: "**/single-user-tests/unauthenticated/**/*.spec.js",
      use: { ...desktopChromeConfig },
      fullyParallel: false,
      dependencies: ["smoke"],
    },

    // ============================================
    // PHASE 3B: Multi-User Tests (1 project)
    // Runs in parallel with single-user tests
    // Uses secondary credentials (*-two)
    // Sequential execution with 1 worker
    // ============================================
    {
      name: "multi-user-tests",
      testMatch: "**/multi-user-tests/**/*.spec.js",
      use: { ...desktopChromeConfig },
      fullyParallel: false,
      dependencies: ["smoke"],
    },

    // ============================================
    // PHASE 4: Destructive Tests
    // Runs last after all other tests complete
    // Modifies global configuration settings
    // Sequential execution with 1 worker
    // ============================================
    {
      name: "destructive",
      testMatch: "**/destructive/**/*.spec.js",
      use: { ...desktopChromeConfig },
      workers: 1, // Force single worker for destructive tests
      fullyParallel: false,
      dependencies: [...singleUserProjects, "multi-user-tests"],
    },
  ],

  // Output directories
  outputDir: "test-results/",
});
