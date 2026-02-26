/**
 * Appointment Workflow Documentation Audit
 *
 * This test captures screenshots of the patient-provider appointment workflow
 * using two browser contexts to simulate both roles simultaneously.
 *
 * Workflows covered:
 * 1. Scheduled Appointment Flow (General Practice with Cody ProviderOne)
 * 2. On-Demand Appointment Flow (See a Provider Now)
 *
 * Screenshots are saved to: docs/latex/screenshots/
 */

import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const screenshotDir = "docs/latex/screenshots";
const baseUrl = process.env.QA_URL || "https://portal.qa-encounterservices.com";

// Ensure screenshot directory exists
test.beforeAll(async () => {
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
});

// Helper to take a screenshot with consistent naming
async function captureScreenshot(page, prefix, viewName) {
  const filename = `${prefix}-${viewName}.png`;
  const filepath = path.join(screenshotDir, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`📸 Captured: ${filename}`);
}

// Helper to wait for page load
async function waitForPageLoad(page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1000);
}

// Helper to wait for spinner to disappear
async function waitForSpinner(page) {
  try {
    await page.waitForSelector('[data-testid="spinner"]', { state: "detached", timeout: 30000 });
  } catch (e) {
    // Spinner may not appear
  }
}

// ============================================================================
// SCHEDULED APPOINTMENT WORKFLOW
// ============================================================================
test.describe("Scheduled Appointment Workflow Audit", () => {
  test("capture scheduled appointment flow between patient and provider", async ({ browser }) => {
    // Create two browser contexts with different auth states
    const patientContext = await browser.newContext({
      storageState: "playwright/.auth/patient.json",
    });
    const providerContext = await browser.newContext({
      storageState: "playwright/.auth/provider.json",
    });

    const patientPage = await patientContext.newPage();
    const providerPage = await providerContext.newPage();

    try {
      // ========== PATIENT: Navigate to Dashboard ==========
      await patientPage.goto(baseUrl);
      await waitForPageLoad(patientPage);
      await captureScreenshot(patientPage, "workflow-scheduled", "01-patient-dashboard");

      // ========== PATIENT: Click "Schedule an appointment" ==========
      const scheduleAppointmentLink = patientPage.getByText("Schedule an appointment");
      if (await scheduleAppointmentLink.isVisible()) {
        await scheduleAppointmentLink.click();
        await patientPage.waitForURL(/\/dashboard\/schedule-appointment/);
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-scheduled", "02-patient-schedule-page");
      }

      // ========== PATIENT: Select Service (General Practice) ==========
      const selectServiceLink = patientPage.getByRole("link", { name: "Select service" });
      if (await selectServiceLink.isVisible()) {
        await selectServiceLink.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-scheduled", "03-patient-service-modal");

        // Select General Practice radio button
        const generalPracticeRadio = patientPage.getByRole("radio", { name: "General Practice" });
        if (await generalPracticeRadio.isVisible()) {
          await generalPracticeRadio.check();
          await captureScreenshot(patientPage, "workflow-scheduled", "04-patient-service-selected");
        }

        // Save selection
        const saveButton = patientPage.getByRole("button", { name: "Save" });
        if (await saveButton.isVisible()) {
          await saveButton.click();
          await waitForPageLoad(patientPage);
        }
      }

      // ========== PATIENT: Select Provider (Cody ProviderOne) ==========
      const changeProviderLink = patientPage.getByRole("link", { name: "Change provider" });
      if (await changeProviderLink.isVisible()) {
        await changeProviderLink.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-scheduled", "05-patient-provider-list");

        // Select Cody ProviderOne
        const providerOption = patientPage.getByText("Cody ProviderOne").first();
        if (await providerOption.isVisible()) {
          await providerOption.click();
          await captureScreenshot(patientPage, "workflow-scheduled", "06-patient-provider-selected");
        }

        // Save selection
        const saveButton = patientPage.getByRole("button", { name: "Save" });
        if (await saveButton.isVisible()) {
          await saveButton.click();
          await waitForPageLoad(patientPage);
        }
      }

      // ========== PATIENT: Select Time Slot ==========
      await captureScreenshot(patientPage, "workflow-scheduled", "07-patient-time-selection");

      // Select first available time slot
      const firstTimeSlot = patientPage.locator("._container_j891W").first();
      if (await firstTimeSlot.isVisible()) {
        await firstTimeSlot.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-scheduled", "08-patient-time-selected");
      }

      // ========== PATIENT: Accept Consent and Schedule ==========
      const consentCheckbox = patientPage.getByTestId("erroring-text").locator("span").first();
      if (await consentCheckbox.isVisible()) {
        await consentCheckbox.click();
        await captureScreenshot(patientPage, "workflow-scheduled", "09-patient-consent-checked");
      }

      const scheduleVisitButton = patientPage.getByRole("button", { name: "Schedule visit" });
      if (await scheduleVisitButton.isVisible()) {
        await captureScreenshot(patientPage, "workflow-scheduled", "10-patient-ready-to-schedule");
        await scheduleVisitButton.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-scheduled", "11-patient-appointment-confirmed");
      }

      // ========== PATIENT: Check for confirmation ==========
      const appointmentConfirmed = patientPage.getByRole("heading", { name: "Appointment confirmed" });
      if (await appointmentConfirmed.isVisible()) {
        await captureScreenshot(patientPage, "workflow-scheduled", "12-patient-confirmation-message");
      }

      // Go to appointments
      const goToAppointmentsButton = patientPage.getByRole("button", { name: "Go to my appointments" });
      if (await goToAppointmentsButton.isVisible()) {
        await goToAppointmentsButton.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-scheduled", "13-patient-appointments-list");
      }

      // ========== PROVIDER: Check Dashboard for Appointment ==========
      await providerPage.goto(baseUrl);
      await waitForPageLoad(providerPage);
      await captureScreenshot(providerPage, "workflow-scheduled", "14-provider-dashboard");

      // Check schedule section
      const scheduleHeading = providerPage.getByRole("heading", { name: "Your schedule for today" });
      if (await scheduleHeading.isVisible()) {
        await captureScreenshot(providerPage, "workflow-scheduled", "15-provider-schedule-view");
      }

      // Check session requests
      const sessionRequestsSection = providerPage.getByText("Session requests");
      if (await sessionRequestsSection.isVisible()) {
        await captureScreenshot(providerPage, "workflow-scheduled", "16-provider-session-requests");
      }

      // ========== CLEANUP: Cancel the scheduled appointment ==========
      await patientPage.goto(baseUrl);
      await waitForPageLoad(patientPage);

      const sessionScheduledText = patientPage.getByText("Session scheduled").first();
      if (await sessionScheduledText.isVisible()) {
        await sessionScheduledText.click();
        const dotsVButton = patientPage.getByRole("button", { name: "DotsV" });
        if (await dotsVButton.isVisible()) {
          await dotsVButton.click();
          const cancelSessionButton = patientPage.getByRole("button", { name: "XCircle Cancel session" });
          if (await cancelSessionButton.isVisible()) {
            await cancelSessionButton.click();
            const confirmCancelButton = patientPage.getByRole("button", { name: "Yes, cancel" });
            if (await confirmCancelButton.isVisible()) {
              await confirmCancelButton.click();
              await waitForPageLoad(patientPage);
              await captureScreenshot(patientPage, "workflow-scheduled", "17-patient-session-canceled");
            }
          }
        }
      }
    } finally {
      await patientContext.close();
      await providerContext.close();
    }
  });
});

// ============================================================================
// ON-DEMAND APPOINTMENT WORKFLOW
// ============================================================================
test.describe("On-Demand Appointment Workflow Audit", () => {
  test("capture on-demand appointment flow between patient and provider", async ({ browser }) => {
    // Create two browser contexts with different auth states
    const patientContext = await browser.newContext({
      storageState: "playwright/.auth/patient.json",
    });
    const providerContext = await browser.newContext({
      storageState: "playwright/.auth/provider.json",
    });

    const patientPage = await patientContext.newPage();
    const providerPage = await providerContext.newPage();

    try {
      // ========== PROVIDER: Set availability to ON ==========
      await providerPage.goto(baseUrl);
      await waitForPageLoad(providerPage);

      // Open On-Demand panel
      const onDemandButton = providerPage.getByRole("button", { name: /On demand/i });
      if (await onDemandButton.isVisible()) {
        await onDemandButton.click();
        await providerPage.waitForTimeout(500);
        await captureScreenshot(providerPage, "workflow-ondemand", "01-provider-ondemand-panel");

        // Toggle availability ON if not already
        const availabilitySwitch = providerPage.getByTestId("switch-div");

        await captureScreenshot(providerPage, "workflow-ondemand", "02-provider-availability-toggle");

        // Click the switch to toggle ON
        if (await availabilitySwitch.isVisible()) {
          const switchState = await availabilitySwitch.getAttribute("data-state");
          if (switchState !== "checked") {
            await availabilitySwitch.click();
            await providerPage.waitForTimeout(500);
          }
          await captureScreenshot(providerPage, "workflow-ondemand", "03-provider-now-available");
        }

        // Close the panel
        const closeButton = providerPage.getByRole("button", { name: "XClose" }).first();
        if (await closeButton.isVisible()) {
          await closeButton.click();
        }
      }

      // ========== PATIENT: Navigate to Dashboard ==========
      await patientPage.goto(baseUrl);
      await waitForPageLoad(patientPage);
      await captureScreenshot(patientPage, "workflow-ondemand", "04-patient-dashboard");

      // ========== PATIENT: Click "See a provider now" ==========
      const seeProviderNowLink = patientPage.getByText("See a provider now");
      if (await seeProviderNowLink.isVisible()) {
        await seeProviderNowLink.click();
        await patientPage.waitForURL(/\/dashboard\/see-provider-now/);
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-ondemand", "05-patient-see-provider-now-page");
      }

      // ========== PATIENT: Select Service ==========
      const selectServiceLink = patientPage.getByRole("link", { name: "Select service" });
      if (await selectServiceLink.isVisible()) {
        await selectServiceLink.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-ondemand", "06-patient-service-modal");

        // Select General Practice radio button
        const generalPracticeRadio = patientPage.getByRole("radio", { name: "General Practice" });
        if (await generalPracticeRadio.isVisible()) {
          await generalPracticeRadio.check();
          await captureScreenshot(patientPage, "workflow-ondemand", "07-patient-service-selected");
        }

        // Save selection
        const saveButton = patientPage.getByRole("button", { name: "Save" });
        if (await saveButton.isVisible()) {
          await saveButton.click();
          await waitForPageLoad(patientPage);
        }
      }

      // ========== PATIENT: Skip Symptom Checker ==========
      const symptomCheckerHeading = patientPage.getByRole("heading", { name: "My symptoms" });
      if (await symptomCheckerHeading.isVisible()) {
        await captureScreenshot(patientPage, "workflow-ondemand", "08-patient-symptom-checker");
        const continueButton = patientPage.getByRole("button", { name: "Continue" });
        if (await continueButton.isVisible()) {
          await continueButton.click();
          await waitForPageLoad(patientPage);
        }
      }

      // ========== PATIENT: Accept Consent and Request ==========
      const consentCheckbox = patientPage.getByTestId("erroring-text").locator("span").first();
      if (await consentCheckbox.isVisible()) {
        await consentCheckbox.click();
        await captureScreenshot(patientPage, "workflow-ondemand", "09-patient-consent-checked");
      }

      const requestOnDemandButton = patientPage.getByRole("button", { name: "Request on demand care" });
      if (await requestOnDemandButton.isVisible()) {
        await captureScreenshot(patientPage, "workflow-ondemand", "10-patient-ready-to-request");
        await requestOnDemandButton.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-ondemand", "11-patient-session-requested");
      }

      // ========== PATIENT: Check for confirmation message ==========
      const sessionRequestedHeading = patientPage.getByRole("heading", { name: "Session requested" });
      if (await sessionRequestedHeading.isVisible()) {
        await captureScreenshot(patientPage, "workflow-ondemand", "12-patient-confirmation-message");
      }

      // Go to appointments
      const goToAppointmentsButton = patientPage.getByRole("button", { name: "Go to my appointments" });
      if (await goToAppointmentsButton.isVisible()) {
        await goToAppointmentsButton.click();
        await waitForPageLoad(patientPage);
        await captureScreenshot(patientPage, "workflow-ondemand", "13-patient-appointments-list");
      }

      // ========== PROVIDER: Check for incoming request ==========
      await providerPage.goto(baseUrl);
      await waitForPageLoad(providerPage);
      await captureScreenshot(providerPage, "workflow-ondemand", "14-provider-dashboard-request");

      // Check session requests section
      const sessionRequestsSection = providerPage.getByText("Session requests");
      if (await sessionRequestsSection.isVisible()) {
        await captureScreenshot(providerPage, "workflow-ondemand", "15-provider-session-requests");
      }

      // Check notification bell
      const notificationBell = providerPage.getByRole("link", { name: "Bell" });
      if (await notificationBell.isVisible()) {
        await notificationBell.click();
        await providerPage.waitForTimeout(500);
        await captureScreenshot(providerPage, "workflow-ondemand", "16-provider-notifications");

        // Close notifications
        const closeNotifications = providerPage.getByRole("button", { name: "XClose" });
        if (await closeNotifications.isVisible()) {
          await closeNotifications.click();
        }
      }

      // ========== CLEANUP: Cancel the session request ==========
      await patientPage.goto(baseUrl);
      await waitForPageLoad(patientPage);

      // Look for pending session to cancel
      const sessionRequestedText = patientPage.getByText("Session requested").first();
      const sessionScheduledText = patientPage.getByText("Session scheduled").first();

      const sessionToCancel = (await sessionRequestedText.isVisible())
        ? sessionRequestedText
        : (await sessionScheduledText.isVisible())
          ? sessionScheduledText
          : null;

      if (sessionToCancel) {
        await sessionToCancel.click();
        const dotsVButton = patientPage.getByRole("button", { name: "DotsV" });
        if (await dotsVButton.isVisible()) {
          await dotsVButton.click();
          const cancelSessionButton = patientPage.getByRole("button", { name: "XCircle Cancel session" });
          if (await cancelSessionButton.isVisible()) {
            await cancelSessionButton.click();
            const confirmCancelButton = patientPage.getByRole("button", { name: "Yes, cancel" });
            if (await confirmCancelButton.isVisible()) {
              await confirmCancelButton.click();
              await waitForPageLoad(patientPage);
            }
          }
        }
      }
    } finally {
      await patientContext.close();
      await providerContext.close();
    }
  });
});

// ============================================================================
// VIDEO SESSION INTERFACE EXPLORATION
// ============================================================================
test.describe("Session Interface Documentation", () => {
  test("capture session details and past session views", async ({ browser }) => {
    // Use provider context to explore session details
    const providerContext = await browser.newContext({
      storageState: "playwright/.auth/provider.json",
    });
    const providerPage = await providerContext.newPage();

    try {
      // Navigate to Past Sessions
      await providerPage.goto(baseUrl);
      await waitForPageLoad(providerPage);

      const pastSessionsLink = providerPage.locator("a").filter({ hasText: "Past Sessions" });
      if (await pastSessionsLink.isVisible()) {
        await pastSessionsLink.click();
        await waitForPageLoad(providerPage);
        await captureScreenshot(providerPage, "workflow-session", "01-past-sessions-list");

        // Click on first session to see details
        const viewDetailsLink = providerPage.getByRole("link", { name: "View details" }).first();
        if (await viewDetailsLink.isVisible()) {
          await viewDetailsLink.click();
          await waitForPageLoad(providerPage);
          await captureScreenshot(providerPage, "workflow-session", "02-session-details-overview");

          // Explore tabs
          const tabs = ["Overview", "Symptoms", "Summary", "Attachments", "Payments"];
          for (const tabName of tabs) {
            const tab = providerPage.getByRole("button", { name: tabName });
            if (await tab.isVisible()) {
              await tab.click();
              await providerPage.waitForTimeout(500);
              await captureScreenshot(providerPage, "workflow-session", `03-session-${tabName.toLowerCase()}-tab`);
            }
          }

          // Close modal
          const closeButton = providerPage.getByRole("button", { name: "XClose" });
          if (await closeButton.isVisible()) {
            await closeButton.click();
          }
        }
      }

      // Explore Schedule Session modal
      await providerPage.goto(baseUrl);
      await waitForPageLoad(providerPage);

      const scheduleSessionBtn = providerPage.getByRole("button", { name: /Schedule session/i });
      if (await scheduleSessionBtn.isVisible()) {
        await scheduleSessionBtn.click();
        await waitForPageLoad(providerPage);
        await captureScreenshot(providerPage, "workflow-session", "04-schedule-session-modal");

        // Close modal
        const closeButton = providerPage.getByRole("button", { name: "XClose" });
        if (await closeButton.isVisible()) {
          await closeButton.click();
        }
      }
    } finally {
      await providerContext.close();
    }
  });
});

// ============================================================================
// PATIENT DASHBOARD EXPLORATION
// ============================================================================
test.describe("Patient Dashboard Features", () => {
  test("capture all patient dashboard features and options", async ({ browser }) => {
    const patientContext = await browser.newContext({
      storageState: "playwright/.auth/patient.json",
    });
    const patientPage = await patientContext.newPage();

    try {
      await patientPage.goto(baseUrl);
      await waitForPageLoad(patientPage);

      // Capture full dashboard
      await captureScreenshot(patientPage, "workflow-patient", "01-full-dashboard");

      // Capture upcoming appointments heading (specific locator)
      const upcomingHeading = patientPage.getByRole("heading", { name: "Upcoming appointments" });
      if (await upcomingHeading.isVisible()) {
        await captureScreenshot(patientPage, "workflow-patient", "02-upcoming-appointments-section");
      }

      // Capture past appointments heading
      const pastHeading = patientPage.getByRole("heading", { name: "Past appointments" });
      if (await pastHeading.isVisible()) {
        await captureScreenshot(patientPage, "workflow-patient", "03-past-appointments-section");
      }

      // Capture "Schedule an appointment" option
      const scheduleAppointmentLink = patientPage.getByText("Schedule an appointment");
      if (await scheduleAppointmentLink.isVisible()) {
        await captureScreenshot(patientPage, "workflow-patient", "04-schedule-appointment-option");
      }

      // Capture "See a provider now" option
      const seeProviderNowLink = patientPage.getByText("See a provider now");
      if (await seeProviderNowLink.isVisible()) {
        await captureScreenshot(patientPage, "workflow-patient", "05-see-provider-now-option");
      }
    } finally {
      await patientContext.close();
    }
  });
});
