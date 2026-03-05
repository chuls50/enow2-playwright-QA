import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsServicesPage } from "../models/pages/admin/institution-settings-services.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// Define Services pt2 - Total tests 3

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsServicesPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsServicesPage = new AdminInstitutionSettingsServicesPage(page);
    await adminInstitutionSettingsServicesPage.navigateToServiceSettings();
  });

  test('Verify "Duration" dropdown functionality @[118058] @admin @functional', async ({ page }) => {
    // Open Toxicology Service for editing
    await page.getByText("Toxicology").click();

    await page.getByRole("button", { name: "XClose" }).nth(3).click();
    await page.getByTestId("custom-select-item-wrapper").nth(4).click();
    await page.getByTestId("custom-dropdown-item-15 minutes").click();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Info updated successfully")).toBeVisible();
    await page.getByRole("button", { name: "XClose" }).nth(3).click();
    await page.getByTestId("custom-select-item-wrapper").nth(4).click();
    await page.getByTestId("custom-dropdown-item-30 minutes").click();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Info updated successfully")).toBeVisible();
  });

  test('Verify error message for missing "Duration" selection @[118064] @admin @functional', async ({ page }) => {
    // Open Toxicology Service for editing
    await page.getByText("Toxicology").click();

    await page.getByRole("button", { name: "XClose" }).nth(3).click();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Please fix the errors in the")).toBeVisible();
    await expect(page.getByText("This field is required -")).toBeVisible();
  });

  test('Verify selecting more than one time for the "Duration" dropdown @[118065] @admin @functional', async ({ page }) => {
    // Open Toxicology Service for editing
    await page.getByText("Toxicology").click();

    await page.getByRole("button", { name: "XClose" }).nth(3).click();
    await page.getByTestId("custom-select-item-wrapper").nth(4).click();
    await page.getByTestId("custom-dropdown-item-15 minutes").click();
    await page.getByTestId("custom-dropdown-item-30 minutes").click();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Info updated successfully")).toBeVisible();
    await page.getByRole("button", { name: "XClose" }).nth(3).click();
    await page.getByRole("button", { name: "XClose" }).nth(3).click();
    await page.getByTestId("custom-select-item-wrapper").nth(4).click();
    await page.getByTestId("custom-dropdown-item-30 minutes").click();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Info updated successfully")).toBeVisible();
  });
});
