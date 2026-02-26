/**
 * Documentation Audit Test
 *
 * This test captures screenshots of all major views for each role
 * to verify documentation accuracy and generate assets for LaTeX docs.
 *
 * Screenshots are saved to: docs/latex/screenshots/
 *
 * Run with: npx playwright test documentation-audit.spec.js --project=chromium
 */

import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const screenshotDir = "docs/latex/screenshots";

// Ensure screenshot directory exists
test.beforeAll(async () => {
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
});

// Helper to take a screenshot with consistent naming
async function captureScreenshot(page, role, viewName) {
  const filename = `${role}-${viewName}.png`;
  const filepath = path.join(screenshotDir, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`📸 Captured: ${filename}`);
}

// Helper to wait for page load
async function waitForPageLoad(page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000); // Allow animations to settle
}

// ============================================================================
// ADMIN ROLE AUDIT
// ============================================================================
test.describe("Admin Role Documentation Audit", () => {
  test.use({ storageState: "playwright/.auth/admin.json" });

  test("capture admin navigation and views", async ({ page }) => {
    const role = "admin";

    // Dashboard/Users Table (default landing)
    await page.goto(process.env.QA_URL || "https://portal.qa-encounterservices.com");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "users-table");

    // Verify navigation elements
    const navigation = page.getByTestId("navigation");
    await expect(navigation).toBeVisible();

    // Institution Settings
    const institutionSettingsLink = page.locator("a").filter({ hasText: "Institution Settings" });
    if (await institutionSettingsLink.isVisible()) {
      await institutionSettingsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "institution-settings-profile");

      // Institution Configuration Tab
      const configTab = page.getByRole("button", { name: "Configuration" });
      if (await configTab.isVisible()) {
        await configTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "institution-settings-configuration");
      }

      // Institution Services Tab
      const servicesTab = page.getByRole("button", { name: "Services" });
      if (await servicesTab.isVisible()) {
        await servicesTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "institution-settings-services");
      }

      // Institution White Label Tab
      const whiteLabelTab = page.getByRole("button", { name: "White label" });
      if (await whiteLabelTab.isVisible()) {
        await whiteLabelTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "institution-settings-white-label");
      }

      // Institution Insurance Tab
      const insuranceTab = page.getByRole("button", { name: "Insurance" });
      if (await insuranceTab.isVisible()) {
        await insuranceTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "institution-settings-insurance");
      }
    }

    // Document Management
    const documentManagementLink = page.locator("a").filter({ hasText: "Document Management" });
    if (await documentManagementLink.isVisible()) {
      await documentManagementLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "document-management");
    }

    // Visit Notes
    const visitNotesLink = page.locator("a").filter({ hasText: "Visit Notes" });
    if (await visitNotesLink.isVisible()) {
      await visitNotesLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "visit-notes");
    }

    // Data Reporting
    const dataReportingLink = page.locator("a").filter({ hasText: "Data Reporting" });
    if (await dataReportingLink.isVisible()) {
      await dataReportingLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "data-reporting");
    }

    // Profile Menu
    const profileTrigger = page.getByTestId("popover-trigger").first();
    await profileTrigger.click();
    await page.waitForTimeout(500);
    await captureScreenshot(page, role, "profile-menu");

    // Account Settings
    const accountSettingsLink = page.getByText("Account settings");
    if (await accountSettingsLink.isVisible()) {
      await accountSettingsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "account-settings-my-account");

      // Notifications Tab
      const notificationsTab = page.getByRole("button", { name: "Notifications" });
      if (await notificationsTab.isVisible()) {
        await notificationsTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "account-settings-notifications");
      }
    }
  });
});

// ============================================================================
// PROVIDER ROLE AUDIT
// ============================================================================
test.describe("Provider Role Documentation Audit", () => {
  test.use({ storageState: "playwright/.auth/provider.json" });

  test("capture provider navigation and views", async ({ page }) => {
    const role = "provider";

    // Dashboard
    await page.goto(process.env.QA_URL || "https://portal.qa-encounterservices.com");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "dashboard");

    // Verify navigation elements
    const navigation = page.getByTestId("navigation");
    await expect(navigation).toBeVisible();

    // Past Sessions
    const pastSessionsLink = page.locator("a").filter({ hasText: "Past Sessions" });
    if (await pastSessionsLink.isVisible()) {
      await pastSessionsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "past-sessions");
    }

    // Providers List
    const providersLink = page.locator("a").filter({ hasText: "Providers" });
    if (await providersLink.isVisible()) {
      await providersLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "providers-list");
    }

    // My Patients
    const myPatientsLink = page.locator("a").filter({ hasText: "My Patients" });
    if (await myPatientsLink.isVisible()) {
      await myPatientsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "my-patients");
    }

    // Profile Menu
    const profileTrigger = page.getByTestId("popover-trigger").first();
    await profileTrigger.click();
    await page.waitForTimeout(500);
    await captureScreenshot(page, role, "profile-menu");

    // Account Settings
    const accountSettingsLink = page.getByText("Account settings");
    if (await accountSettingsLink.isVisible()) {
      await accountSettingsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "account-settings-my-account");

      // Calendar Tab (Provider-specific)
      const calendarTab = page.getByRole("button", { name: "Calendar" });
      if (await calendarTab.isVisible()) {
        await calendarTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "account-settings-calendar");
      }

      // Notifications Tab
      const notificationsTab = page.getByRole("button", { name: "Notifications" });
      if (await notificationsTab.isVisible()) {
        await notificationsTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "account-settings-notifications");
      }
    }

    // OnDemand Availability Panel (if available from dashboard)
    await page.goto(process.env.QA_URL || "https://portal.qa-encounterservices.com");
    await waitForPageLoad(page);
    const onDemandButton = page.getByRole("button", { name: /On demand/i });
    if (await onDemandButton.isVisible()) {
      await onDemandButton.click();
      await page.waitForTimeout(500);
      await captureScreenshot(page, role, "ondemand-panel");
    }
  });
});

// ============================================================================
// PATIENT ROLE AUDIT
// ============================================================================
test.describe("Patient Role Documentation Audit", () => {
  test.use({ storageState: "playwright/.auth/patient.json" });

  test("capture patient navigation and views", async ({ page }) => {
    const role = "patient";

    // Dashboard
    await page.goto(process.env.QA_URL || "https://portal.qa-encounterservices.com");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "dashboard");

    // Verify navigation elements
    const navigation = page.getByTestId("navigation");
    await expect(navigation).toBeVisible();

    // Past Visits
    const pastVisitsLink = page.locator("a").filter({ hasText: /Past Visits|Past sessions/i });
    if (await pastVisitsLink.isVisible()) {
      await pastVisitsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "past-visits");
    }

    // Health Profile
    const healthProfileLink = page.locator("a").filter({ hasText: "Health Profile" });
    if (await healthProfileLink.isVisible()) {
      await healthProfileLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "health-profile");
    }

    // Vitals Scan
    const vitalsScanLink = page.locator("a").filter({ hasText: "Vitals Scan" });
    if (await vitalsScanLink.isVisible()) {
      await vitalsScanLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "vitals-scan");
    }

    // Profile Menu
    const profileTrigger = page.getByTestId("popover-trigger").first();
    await profileTrigger.click();
    await page.waitForTimeout(500);
    await captureScreenshot(page, role, "profile-menu");

    // Account Settings
    const accountSettingsLink = page.getByText("Account settings");
    if (await accountSettingsLink.isVisible()) {
      await accountSettingsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "account-settings-my-account");

      // Notifications Tab
      const notificationsTab = page.getByRole("button", { name: "Notifications" });
      if (await notificationsTab.isVisible()) {
        await notificationsTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "account-settings-notifications");
      }
    }
  });
});

// ============================================================================
// COORDINATOR ROLE AUDIT
// ============================================================================
test.describe("Coordinator Role Documentation Audit", () => {
  test.use({ storageState: "playwright/.auth/coordinator.json" });

  test("capture coordinator navigation and views", async ({ page }) => {
    const role = "coordinator";

    // Dashboard
    await page.goto(process.env.QA_URL || "https://portal.qa-encounterservices.com");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "dashboard");

    // Verify navigation elements
    const navigation = page.getByTestId("navigation");
    await expect(navigation).toBeVisible();

    // Past Sessions
    const pastSessionsLink = page.locator("a").filter({ hasText: "Past Sessions" });
    if (await pastSessionsLink.isVisible()) {
      await pastSessionsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "past-sessions");
    }

    // Providers
    const providersLink = page.locator("a").filter({ hasText: "Providers" });
    if (await providersLink.isVisible()) {
      await providersLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "providers-list");
    }

    // Patients
    const patientsLink = page.locator("a").filter({ hasText: "Patients" });
    if (await patientsLink.isVisible()) {
      await patientsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "patients-list");
    }

    // Command Center (Coordinator-specific)
    const commandCenterLink = page.locator("a").filter({ hasText: /Command Center|Waiting rooms/i });
    if (await commandCenterLink.isVisible()) {
      await commandCenterLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "command-center");
    }

    // Profile Menu
    const profileTrigger = page.getByTestId("popover-trigger").first();
    await profileTrigger.click();
    await page.waitForTimeout(500);
    await captureScreenshot(page, role, "profile-menu");

    // Account Settings
    const accountSettingsLink = page.getByText("Account settings");
    if (await accountSettingsLink.isVisible()) {
      await accountSettingsLink.click();
      await waitForPageLoad(page);
      await captureScreenshot(page, role, "account-settings-my-account");

      // Notifications Tab
      const notificationsTab = page.getByRole("button", { name: "Notifications" });
      if (await notificationsTab.isVisible()) {
        await notificationsTab.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "account-settings-notifications");
      }
    }
  });
});

// ============================================================================
// DEVICE ROLE AUDIT
// ============================================================================
test.describe("Device Role Documentation Audit", () => {
  test.use({ storageState: "playwright/.auth/device.json" });

  test("capture device navigation and views", async ({ page }) => {
    const role = "device";

    // Dashboard (minimal interface)
    await page.goto(process.env.QA_URL || "https://portal.qa-encounterservices.com");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "dashboard");

    // Verify navigation elements
    const navigation = page.getByTestId("navigation");
    if (await navigation.isVisible()) {
      // Capture full navigation state
      await captureScreenshot(page, role, "navigation");
    }

    // Profile Menu
    const profileTrigger = page.getByTestId("popover-trigger").first();
    if (await profileTrigger.isVisible()) {
      await profileTrigger.click();
      await page.waitForTimeout(500);
      await captureScreenshot(page, role, "profile-menu");

      // Account Settings
      const accountSettingsLink = page.getByText("Account settings");
      if (await accountSettingsLink.isVisible()) {
        await accountSettingsLink.click();
        await waitForPageLoad(page);
        await captureScreenshot(page, role, "account-settings-my-account");

        // Notifications Tab
        const notificationsTab = page.getByRole("button", { name: "Notifications" });
        if (await notificationsTab.isVisible()) {
          await notificationsTab.click();
          await waitForPageLoad(page);
          await captureScreenshot(page, role, "account-settings-notifications");
        }
      }
    }
  });
});

// ============================================================================
// LOGIN FLOW AUDIT (Unauthenticated)
// ============================================================================
test.describe("Login Flow Documentation Audit", () => {
  test("capture login page views", async ({ page }) => {
    const role = "login";

    // Login Page - Email Step
    await page.goto("https://portal.qa-encounterservices.com/login");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "email-step");

    // Device Login Page
    await page.goto("https://portal.qa-encounterservices.com/login/device");
    await waitForPageLoad(page);
    await captureScreenshot(page, role, "device-login");
  });
});
