import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsConfigurationPage } from "../models/pages/admin/institution-settings-configuration.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// Admin Configuration Settings - Total tests 10 (including 3 skipped)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsConfigurationPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsConfigurationPage = new AdminInstitutionSettingsConfigurationPage(page);
    await adminInstitutionSettingsConfigurationPage.navigateToInstitutionSettingsConfiguration();
  });

  test("Verify Default settings in Configuration Tab on Institution Settings Screen @[111331] @admin @ui", async () => {
    // Verify main page elements are visible
    await expect(adminInstitutionSettingsConfigurationPage.heading).toBeVisible();

    // Verify enforce country setting elements
    await expect(adminInstitutionSettingsConfigurationPage.enforceCountryText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.enforceCountryToggle).toBeVisible();

    // Verify provider contacting configuration elements
    await expect(adminInstitutionSettingsConfigurationPage.numberOfTimesToContactText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.numberOfMinutesText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.numberOfMinutesInput).toBeVisible();

    // Verify additional toggle options
    await expect(adminInstitutionSettingsConfigurationPage.waitingRoomOptionText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.dispatcherOptionText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.enableChatAppointmentsText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle).toBeVisible();

    // Verify action buttons are present
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.cancelButton).toBeVisible();
  });

  test("Verify Enabling and Disabling Toggles on Configuration Tab Screen @[111332] @admin @functional", async () => {
    // Capture initial toggle states
    const initialStates = await adminInstitutionSettingsConfigurationPage.getToggleStates();

    // Define toggles to test
    const toggleNames = ["enforceCountry", "waitingRoom", "dispatcher", "chatAppointments"];

    // Test each toggle can be clicked and state changes
    for (const toggleName of toggleNames) {
      const toggleMap = {
        enforceCountry: adminInstitutionSettingsConfigurationPage.enforceCountryToggle,
        waitingRoom: adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle,
        dispatcher: adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle,
        chatAppointments: adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle,
      };

      const toggle = toggleMap[toggleName];
      await toggle.click();
      await expect(toggle).not.toBeChecked({ checked: initialStates[toggleName] });
    }

    // Revert all toggles to original state
    for (const toggleName of toggleNames) {
      const toggleMap = {
        enforceCountry: adminInstitutionSettingsConfigurationPage.enforceCountryToggle,
        waitingRoom: adminInstitutionSettingsConfigurationPage.waitingRoomOptionToggle,
        dispatcher: adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle,
        chatAppointments: adminInstitutionSettingsConfigurationPage.enableChatAppointmentsToggle,
      };

      const toggle = toggleMap[toggleName];
      await toggle.click();
      await expect(toggle).toBeChecked({ checked: initialStates[toggleName] });
    }

    // Verify save button is disabled when no changes remain
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();
  });

  test.skip('Verify "Enforce Country/State Liscensing on Provider Lists Enabled" Toggle @[112108] @multi-user @functional', async () => {});

  test('Check Default Values and Valid Input for "On-Demand Provider Contacting Choices" Fields @[112113] @admin @functional', async () => {
    // Capture and verify current default values
    const defaultValues = await adminInstitutionSettingsConfigurationPage.getInputValues();
    await expect(adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput).toHaveValue(defaultValues.timesToContact);
    await expect(adminInstitutionSettingsConfigurationPage.numberOfMinutesInput).toHaveValue(defaultValues.minutes);

    // Generate new test values by incrementing defaults
    const newTimesToContact = (parseInt(defaultValues.timesToContact, 10) + 1).toString();
    const newMinutes = (parseInt(defaultValues.minutes, 10) + 1).toString();

    // Fill fields with new values and verify save button activates
    await adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput.fill(newTimesToContact);
    await adminInstitutionSettingsConfigurationPage.numberOfMinutesInput.fill(newMinutes);
    await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(500);

    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsConfigurationPage.saveChangesButton.click();
    await adminInstitutionSettingsConfigurationPage.page.waitForLoadState("networkidle");

    // Verify new values persist after save
    await expect(adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput).toHaveValue(newTimesToContact);
    await expect(adminInstitutionSettingsConfigurationPage.numberOfMinutesInput).toHaveValue(newMinutes);
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();

    // Reset to standard default values
    await adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput.fill("5");
    await adminInstitutionSettingsConfigurationPage.numberOfMinutesInput.fill("1");
    await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(500);
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsConfigurationPage.saveChangesButton.click();
    await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(500);
    await adminInstitutionSettingsConfigurationPage.page.waitForLoadState("networkidle");

    // Verify reset to defaults was successful
    await expect(adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput).toHaveValue("5");
    await expect(adminInstitutionSettingsConfigurationPage.numberOfMinutesInput).toHaveValue("1");
  });

  test.skip("[Negative] Verify Input Validation for Retry Fields in Institution Configuration @[112114] @admin @functional", async () => {
    // Trigger zero value validation workflow
    await adminInstitutionSettingsConfigurationPage.performZeroValidationFlow();

    // Verify validation error messages appear
    await expect(adminInstitutionSettingsConfigurationPage.formErrorMessage).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.zeroValueErrorMessage.first()).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.zeroValueErrorMessage.nth(1)).toBeVisible();

    // Reset fields to valid values
    await adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput.fill("5");
    await adminInstitutionSettingsConfigurationPage.numberOfMinutesInput.fill("1");
    await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(500);

    // Save changes if button is enabled
    if (await adminInstitutionSettingsConfigurationPage.saveChangesButton.isEnabled()) {
      await adminInstitutionSettingsConfigurationPage.saveChangesButton.click();
      await adminInstitutionSettingsConfigurationPage.page.waitForTimeout(500);
    }

    // Verify save button returns to disabled state
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();
  });

  test("Validate Save Button Activation Upon Any Setting Change @[112116] @admin @functional", async () => {
    // Modify input field to trigger save button activation
    await adminInstitutionSettingsConfigurationPage.numberOfTimesToContactInput.fill("0");
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeEnabled();
  });

  test("[Negative] Verify Save Button Behavior Without Changes @[112117] @admin @functional", async () => {
    // Verify save button remains disabled without any changes
    await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();
  });

  test("Verify Dispatcher Toggle in Institution Settings @[114051] @admin @functional", async () => {
    // Check current state of dispatcher toggle
    const isInitiallyChecked = await adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle.isChecked();

    // Test toggle functionality based on current state
    if (!isInitiallyChecked) {
      await adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle.click();
      await expect(adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle).toBeChecked();
      await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeEnabled();
    } else {
      // Verify current checked state and disabled save button
      await expect(adminInstitutionSettingsConfigurationPage.dispatcherOptionToggle).toBeChecked();
      await expect(adminInstitutionSettingsConfigurationPage.saveChangesButton).toBeDisabled();
    }
  });
});

test.describe("Super Admin @regression", () => {
  test.use(useRole(ROLES.SUPER_ADMIN));
  let adminInstitutionSettingsConfigurationPage;
  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsConfigurationPage = new AdminInstitutionSettingsConfigurationPage(page);
    await adminInstitutionSettingsConfigurationPage.navigateToInstitutionSettingsConfiguration();
  });

  test("Verify Interactive Triage Toggle is Only Visible to System Admin @[114052] @super-admin @functional", async () => {
    // Verify the interactive triage toggle is visible for super admin
    await expect(adminInstitutionSettingsConfigurationPage.interactiveTriageToggle).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.interactiveTriageText).toBeVisible();
    await expect(adminInstitutionSettingsConfigurationPage.interactiveTriageDescription).toBeVisible();
  });

  // e2e test to verify the functionality of the interactive triage toggle will be added in the future when the feature is fully developed and ready for testing
  test.skip("Verify Functionality of Interactive Triage Toggle @[114053] @super-admin @functional", async () => {});
});
