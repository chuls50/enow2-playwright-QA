import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsServicesPage } from "../../models/pages/admin/institution-settings-services.page.js";
import { PatientDashboardPage } from "../../models/pages/patient/patient-dashboard.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Admin User Managment pt 5 - Total tests 5

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsServicesPage;
  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsServicesPage = new AdminInstitutionSettingsServicesPage(page);
  });

  test('Verify "Allow Encounter now" Toggle is Displayed for Each Service @[115886] @admin @ui', async ({ page }) => {
    // Admin goto institution settings services page
    await adminInstitutionSettingsServicesPage.navigateToServiceSettings();

    // Verify Active services have "Allow 'See a provider now'" toggle
    await expect(page.getByText("active")).toBeVisible();

    // Verify "Allow 'See a provider now'" toggle is displayed for each service
    await page.getByText("General Practice").click();
    await expect(page.getByText("Allow 'See a provider now'").first()).toBeVisible();
    await page.getByText("General Practice").click();
    await page.getByText("Pediatrics").click();
    await expect(page.getByText("Allow 'See a provider now'").nth(1)).toBeVisible();
    await page.getByText("Pediatrics").click();
    await page.getByText("Toxicology").click();
    await expect(page.getByText("Allow 'See a provider now'").nth(2)).toBeVisible();
    await page.getByText("Toxicology").click();
    await page.getByText("Payment Required").click();
    await expect(page.getByText("Allow 'See a provider now'").nth(3)).toBeVisible();
    await page.getByText("Payment Required").click();
    await page.getByText("Documents Required").click();
    await expect(page.getByText("Allow 'See a provider now'").nth(4)).toBeVisible();
    await page.getByText("Documents Required").click();
  });

  test('Verify Save Changes Button is Activated When "Allow Encounter now" Toggle is Modified @[115889] @admin @ui', async ({ page }) => {
    // Admin goto institution settings services page
    await adminInstitutionSettingsServicesPage.navigateToServiceSettings();

    // Click on the first service's "Allow 'See a provider now'" toggle
    await page.getByText("General Practice").click();
    await page.getByText("Allow 'See a provider now'").first().click();

    // Verify that the "Save changes" button is enabled
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();
  });

  test('Verify Cancel Button Reverts Unsaved Changes to "Allow Encounter now" Toggle @[115890] @admin @functional', async ({ page }) => {
    // Admin goto institution settings services page
    await adminInstitutionSettingsServicesPage.navigateToServiceSettings();

    // verify save changes is disabled initially
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();

    // Click on the first service's "Allow 'See a provider now'" toggle
    await page.getByText("General Practice").click();
    await page.getByText("Allow 'See a provider now'").first().click();

    // Verify that the "Save changes" button is enabled
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();

    // Click the "Cancel" button
    await adminInstitutionSettingsServicesPage.cancelButton.click();

    // Verify that the save changes button is disabled again
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();
  });
});

test.describe("Patient @regression", () => {
  test.use(useRole(ROLES.PATIENT));
  let dashboardPage;
  test.beforeEach(async ({ page }) => {
    dashboardPage = new PatientDashboardPage(page);
    // Patient goto dashboard
    await dashboardPage.navigateToPatientDashboard();

    await dashboardPage.seeProviderNowLink.click();
    await dashboardPage.page.waitForLoadState("networkidle");
    await dashboardPage.page.waitForTimeout(4000); // wait for 4 second to ensure page stability

    // Manual symptom checker
    // if continue is visible, then click it
    const continueButton = page.getByRole("button", { name: "Continue" });
    if (await continueButton.isVisible()) {
      await continueButton.click();
    }

    // Infermetica symptom checker
    // if skip button is visible, then click it
    const skipButton = page.getByRole("button", { name: "Skip" });
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    // Click on Select service link
    await page.getByRole("link", { name: "Select service" }).click();
  });

  test('Verify Services with Toggle ON Are Shown in "See a Provider Now" Flow @[115887] @patient @functional', async ({ page }) => {
    // Verify that services with the toggle ON are displayed
    await expect(page.getByText("General Practice")).toBeVisible();
    await expect(page.getByText("Toxicology")).toBeVisible();
    await expect(page.getByText("Payment Required")).toBeVisible();
    await expect(page.getByText("Documents Required")).toBeVisible();
  });

  test("Verify Services with Toggle OFF Are Not Shown even if Previously Used @[115888] @patient @functional", async ({ page }) => {
    // Verify that services with the toggle OFF are not displayed
    await expect(page.getByText("Pediatrics")).not.toBeVisible();
    await expect(page.getByText("No Providers")).not.toBeVisible();
  });
});
