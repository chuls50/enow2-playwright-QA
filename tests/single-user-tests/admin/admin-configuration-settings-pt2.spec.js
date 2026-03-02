import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsConfigurationPage } from "../../models/pages/admin/institution-settings-configuration.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Admin Configuration Settings pt2 - Total Tests 6 (including 4 skipped)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsConfigurationPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsConfigurationPage = new AdminInstitutionSettingsConfigurationPage(page);
    await adminInstitutionSettingsConfigurationPage.navigateToInstitutionSettingsConfiguration();
    await adminInstitutionSettingsConfigurationPage.ensureWaitingRoomIsOn();
  });

  test("Verify presence and description of waiting room toggle @[117453] @admin @ui", async () => {
    // Verify waiting room toggle and description are visible
    await expect(adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.waitingRoomOptionDescription).toBeVisible();
  });

  test('Verify "Save Changes" Button Enables When "Waiting Room Option" Toggle Is Modified @[117456] @admin @functional', async () => {
    // Toggle waiting room option off to trigger save button
    const isCurrentlyOn = await adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle.isChecked();
    if (isCurrentlyOn) {
      await adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle.click();
    }
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeEnabled();

    await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(1000);

    // Toggle back on to return to original state
    const isCurrentlyOff = await adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle.isChecked();
    if (!isCurrentlyOff) {
      await adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle.click();
    }
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();
  });

  test('Verify "Insurance & Payments" Tab Unaffected @[117593] @admin @ui', async () => {
    // Verify insurance section is initially visible
    await expect(adminInstitutionSettingsConfigurationPage.insurancePaymentsSection).toBeVisible();

    // Toggle waiting room option and save changes
    const isCurrentlyOn = await adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle.isChecked();
    if (isCurrentlyOn) {
      await adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle.click();
    }
    await adminInstitutionSettingsConfigurationPage.saveChangesButton.click();
    await adminInstitutionSettingsConfigurationPage.page.waitForLoadState("networkidle");

    // Verify insurance section remains visible after changes
    await expect(adminInstitutionSettingsConfigurationPage.insurancePaymentsSection).toBeVisible();
  });
});

test.describe("Admin+Coordinator @regression", () => {
  test.use(useRole(ROLES.ADMIN_COORDINATOR));
  let adminInstitutionSettingsConfigurationPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsConfigurationPage = new AdminInstitutionSettingsConfigurationPage(page);
    await adminInstitutionSettingsConfigurationPage.navigateToInstitutionSettingsConfiguration();
    await adminInstitutionSettingsConfigurationPage.ensureWaitingRoomIsOn();
  });

  test.skip("[Negative] Verify Waiting Rooms Do Not Reappear Without Saving Toggle Change @[117457] @multi-user @functional", async () => {});

  test.skip('Verify Coordinator View When "Waiting Room Option" Is Toggled ON @[117618] @multi-user @functional', async () => {});

  test.skip('Verify Coordinator View When "Waiting Room Option" Is Toggled OFF @[117619] @multi-user @functional', async () => {});
});
