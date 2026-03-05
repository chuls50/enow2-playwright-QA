import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsProfilePage } from "../../models/pages/admin/institution-settings-profile.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Super Admin - Total tests 4 (including 3 skipped)

test.describe("Super Admin @regression @super-admin", () => {
  test.use(useRole(ROLES.SUPER_ADMIN));
  let adminInstitutionSettingsProfilePage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsProfilePage = new AdminInstitutionSettingsProfilePage(page);
    await adminInstitutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
  });

  test("Verify Super Admin Dashboard and Institution Dropdown Access @[114439] @functional", async ({ page }) => {
    // Select 'Empty Institution' Institution
    await page.getByTestId("icon-ChevronDown").nth(1).click();
    await page.getByTestId("custom-dropdown-item-Empty Institution").click();

    // Navigate to Institution Settings
    await page.waitForLoadState("networkidle");

    // Verify that the institution is selected
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Empty Institution$/ })
        .nth(2)
    ).toBeVisible();
  });

  // one way doors
  test.skip('Verify Visibility and Functionality of "New Institution" Button for Super Admin @[114440] @functional', async ({}) => {});

  test.skip("Verify Default Values on Profile Tab After Creating a New Institution @[114441] @functional", async ({}) => {});

  test.skip("[Negative] Verify Save is Not Allowed Without Required Fields POC Fields in New Institution @[114444] @functional", async ({}) => {});
});
