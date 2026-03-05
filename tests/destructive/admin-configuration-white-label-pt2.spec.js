import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsProfilePage } from "../models/pages/admin/institution-settings-profile.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// Admin Configuration White Label pt2 - Total Tests 7
test.describe("Super Admin @regression", () => {
  test.use(useRole(ROLES.SUPER_ADMIN));
  let adminInstitutionSettingsProfilePage;
  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsProfilePage = new AdminInstitutionSettingsProfilePage(page);
    await adminInstitutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
  });

  test.skip("Verify new Institution is created with White Label OFF and empty subdomain @[118733] @super-admin @functional", async ({
    page,
  }) => {
    // This test creates a new institution so we skip for now to avoid cluttering our environments with test institutions
  });

  test("Verify default “portal” subdomain is used when White Label is OFF @[118734] @super-admin @functional", async ({ page }) => {
    await page.locator("a").filter({ hasText: "Institution settings" }).click();
    // verify url contains portal subdomain (https://portal.qa-encounterservices.com/institution-settings)
    await expect(page).toHaveURL(/.*portal\.qa-encounterservices\.com\/institution-settings/);
  });

  // skip for now, will come back to automate as part of a separate white label specific test suite - this is destructive as it impacts the entire site and will affect other tests running in parallel
  test.skip("[Negative] Verify error is shown if White label is toggled on without subdomain @[118735] @super-admin @functional", async ({
    page,
  }) => {});

  // skip for now, will come back to automate as part of a separate white label specific test suite - this is destructive as it impacts the entire site and will affect other tests running in parallel
  test.skip("[Negative] Verify error is shown if entered subdomain already exists @[118736] @super-admin @functional", async ({
    page,
  }) => {});

  // skip for now, will come back to automate as part of a separate white label specific test suite - this is destructive as it impacts the entire site and will affect other tests running in parallel
  test.skip("Check successfully enabling White Label with unique subdomain @[118737] @super-admin @functional", async ({ page }) => {});

  // skip for now, will come back to automate as part of a separate white label specific test suite - this is destructive as it impacts the entire site and will affect other tests running in parallel
  test.skip('Verify "Register as a Patient" link appears on login page when White Label is ON @[118738] @super-admin @functional', async ({
    page,
  }) => {});

  // skip for now, will come back to automate as part of a separate white label specific test suite - this is destructive as it impacts the entire site and will affect other tests running in parallel
  test.skip("Verify default login page is used when White Label is OFF @[118739] @super-admin @functional", async ({ page }) => {});
});
