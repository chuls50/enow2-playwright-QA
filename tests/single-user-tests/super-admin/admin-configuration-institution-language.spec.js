import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsProfilePage } from "../../models/pages/admin/institution-settings-profile.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

test.describe("Super Admin @regression", () => {
  test.use(useRole(ROLES.SUPER_ADMIN));
  let adminInstitutionSettingsProfilePage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsProfilePage = new AdminInstitutionSettingsProfilePage(page);
    await adminInstitutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
  });

  test("Verify Institution Language selection dropdown functionality @[118727] @super-admin @functional", async ({ page }) => {
    await page.getByTestId("icon-ChevronDown").nth(2).click();
    await expect(page.getByTestId("custom-dropdown")).toBeVisible();
    await expect(page.getByTestId("custom-dropdown-item-English")).toBeVisible();
    await expect(page.getByTestId("custom-dropdown-item-Spanish")).toBeVisible();
    await expect(page.getByTestId("custom-dropdown-item-Portuguese")).toBeVisible();
    await page.getByTestId("custom-dropdown-item-Spanish").click();
    // Verify Save Changes button is enabled after selecting a different language
    await expect(page.getByRole("button", { name: "Save Changes" })).toBeEnabled();
  });

  test("Verify that default Institution Language is set to English for New Institutions @[118728] @super-admin @functional", async ({
    page,
  }) => {
    await page.getByTestId("icon-ChevronDown").nth(1).click();
    await page.getByTestId("custom-dropdown-item-Empty Institution").click();
    await page.locator("a").filter({ hasText: "Institution settings" }).click();
    await expect(page.getByText("Institution languageEnglish")).toBeVisible();
  });

  // creates a new institution every time, so we skip for now to avoid cluttering our environments with test institutions
  test.skip("Verify that Language Selection fields is Mandatory @[118729] @super-admin @functional", async ({ page }) => {});

  // mailanator account
  test.skip("Verify that Invitation Link is sent in Institution Language @[118730] @multi-user @functional", async ({ page }) => {});

  // mailanator account
  test.skip("Verify that Reset Password email is sent in Institution Language @[118731] @multi-user @functional", async ({ page }) => {});
});
