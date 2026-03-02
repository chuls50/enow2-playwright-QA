import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsConfigurationPage } from "../../models/pages/admin/institution-settings-configuration.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Admin Configuration Settings pt3 - Total Tests 8 (including 6 skipped)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsConfigurationPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsConfigurationPage = new AdminInstitutionSettingsConfigurationPage(page);
    await adminInstitutionSettingsConfigurationPage.navigateToInstitutionSettingsConfiguration();
    await adminInstitutionSettingsConfigurationPage.ensureChatAppointmentsAreOn();
  });

  test("Verify Presence and Description of 'Enable Chat Appointment Types' Toggle @[115706] @admin @ui", async () => {
    // Verify chat appointments toggle is visible
    await expect(adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle).toBeVisible();

    // Verify toggle description text is visible
    await expect(adminInstitutionSettingsConfigurationPage.enableChatAppointmentsDescription).toBeVisible();
  });

  test("Verify 'Save Changes' Button Enables When Toggle Is Modified @[115707] @admin @functional", async () => {
    // Toggle chat appointments off to trigger save button
    const isCurrentlyOn = await adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle.isChecked();
    if (isCurrentlyOn) {
      await adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle.click();
    }
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeEnabled();

    await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(1000);

    // Toggle back on to return to original state
    const isCurrentlyOff = await adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle.isChecked();
    if (!isCurrentlyOff) {
      await adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle.click();
    }
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();
  });

  // @patient
  test.skip("Verify Chat Option Is Hidden for Patient When Toggle is OFF @[115708] @multi-user @functional", async () => {});

  // @patient
  test.skip("Verify Chat Option Is Hidden in On-Demand Flow for Patient When Toggle is OFF @[115709] @multi-user @functional", async () => {});

  // @provider-coordinator
  test.skip("Verify Chat Option Is Hidden for Provider/Coordinator When Scheduling Appointments @[115711] @multi-user @functional", async () => {});

  // @provider-coordinator
  test.skip("Verify Ad-Hoc Chat Remains Available Regardless of Toggle State @[115713] @multi-user @functional", async () => {});

  // @patient
  test.skip("Verify Chat Remains Available in Video Calls and Waiting Rooms @[115714] @multi-user @functional", async () => {});

  // @patient
  test.skip("[Negative] Verify Chat Option Does Not Reappear Without Saving Toggle Change @[115715] @multi-user @functional", async () => {});
});
