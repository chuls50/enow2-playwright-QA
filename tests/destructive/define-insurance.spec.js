import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsInsurancePage } from "../models/pages/admin/institution-settings-insurance.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// Define Insurance - Total Tests 8 (including 1 skipped test)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsInsurancePage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsInsurancePage = new AdminInstitutionSettingsInsurancePage(page);
    await adminInstitutionSettingsInsurancePage.navigateToInsuranceSettings();
  });

  test("Verify Insurance Section Display @[112187] @admin @ui", async () => {
    await expect(adminInstitutionSettingsInsurancePage.heading).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.insuranceSection).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageToggle).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageToggle).toBeEnabled();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageNameInput).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageNameInput).toBeEnabled();
    await expect(adminInstitutionSettingsInsurancePage.insuranceTitle).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.copayAmount).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.deleteButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.addInsuranceButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.addInsuranceButton).toBeDisabled();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeDisabled();
    await expect(adminInstitutionSettingsInsurancePage.cancelButton).toBeVisible();
  });

  test("Verify Premium Package Toggle Functionality @[112188] @admin @functional", async () => {
    await adminInstitutionSettingsInsurancePage.premiumPackageToggle.click();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Premium Package Name Input @[112189] @admin @functional", async () => {
    await adminInstitutionSettingsInsurancePage.enablePremiumPackageIfNeeded();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageNameInput).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.premiumPackageNameInput).toBeEnabled();
    await adminInstitutionSettingsInsurancePage.premiumPackageNameInput.fill("Premium Insured Package");
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Self Payment Toggle Functionality @[112190] @admin @functional", async () => {
    await adminInstitutionSettingsInsurancePage.selfPaymentToggleSwitch.click();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Adding a New Insurance Entry @[112193] @admin @functional", async () => {
    await adminInstitutionSettingsInsurancePage.enablePremiumPackageIfNeeded();
    await adminInstitutionSettingsInsurancePage.addInsuranceEntry();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();

    // Add more explicit assertions for the added insurance
    // For new insurance entry, we'll verify it by checking that the full text pattern exists
    const insuranceRow = adminInstitutionSettingsInsurancePage.page.locator("div").filter({ hasText: /^Test Insurance20Delete$/ });

    await expect(insuranceRow).toBeVisible();

    // Verify the delete button for the new insurance is visible
    const deleteButton = adminInstitutionSettingsInsurancePage.page
      .locator("div")
      .filter({ hasText: /^Test Insurance20Delete$/ })
      .getByRole("button")
      .first();
    await expect(deleteButton).toBeVisible();
  });

  // want to mock API here
  test.skip("Verify Insurance Edit Functionality @[112191] @admin @functional", async () => {});

  test("Verify Insurance Deletion Functionality @[112192] @admin @functional", async () => {
    await adminInstitutionSettingsInsurancePage.enablePremiumPackageIfNeeded();

    // Add insurance using the helper method
    await adminInstitutionSettingsInsurancePage.addInsuranceEntry();

    // Click the delete button for the added insurance using a more stable selector
    const deleteButton = adminInstitutionSettingsInsurancePage.page
      .locator("div")
      .filter({ hasText: /^Test Insurance20Delete$/ })
      .getByRole("button")
      .first();

    await deleteButton.click();
    await adminInstitutionSettingsInsurancePage.page.waitForLoadState("networkidle");
    await adminInstitutionSettingsInsurancePage.page.waitForSelector('div:has-text("Test Insurance")', { state: "detached" });
    await expect(adminInstitutionSettingsInsurancePage.addInsuranceButton).toBeDisabled();
  });

  test("[Negative] Verify Navigation Away Without Saving Changes @[112194] @admin @functional", async () => {
    await adminInstitutionSettingsInsurancePage.enablePremiumPackageIfNeeded();
    await adminInstitutionSettingsInsurancePage.addInsuranceEntry();
    await adminInstitutionSettingsInsurancePage.navigateToInsuranceSettings();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeDisabled();
  });
});
