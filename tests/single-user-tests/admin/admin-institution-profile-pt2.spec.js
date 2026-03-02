import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsProfilePage } from "../../models/pages/admin/institution-settings-profile.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Admin Institution Profile pt2 - Total tests 5
test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsProfilePage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsProfilePage = new AdminInstitutionSettingsProfilePage(page);
    await adminInstitutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
  });

  test("Verify Device ID Access Link Is Displayed on Institution Profile Tab @[115012] @admin @ui", async () => {
    // Verify device ID access link elements are visible and enabled
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLinkLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLink).toBeEnabled();
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton).toBeVisible();
  });

  test("Verify Copy Link button copies Device ID Access URL to Clipboard @[115013] @admin @functional", async ({ context }) => {
    // Grant clipboard permissions for copy functionality
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click copy button for device ID link
    await adminInstitutionSettingsProfilePage.page.waitForTimeout(1000);
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLink).toBeVisible();
    await adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton.click();
    await adminInstitutionSettingsProfilePage.page.waitForTimeout(1000);
    await expect(adminInstitutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();

    // Verify correct device ID URL was copied to clipboard
    const clipboardContent = await adminInstitutionSettingsProfilePage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardContent).toContain("https://portal.qa-encounterservices.com/login/device");
  });

  test("Verify Link Format Includes Proper White-Label Subdomain @[115014] @admin @functional", async ({ context }) => {
    // Grant clipboard permissions for copy functionality
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Copy device ID link and verify success message
    await adminInstitutionSettingsProfilePage.page.waitForTimeout(1000);
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLink).toBeVisible();
    await adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton.click();
    await adminInstitutionSettingsProfilePage.page.waitForTimeout(1000);
    await expect(adminInstitutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();

    // Verify clipboard contains proper white-label subdomain format
    const clipboardContent = await adminInstitutionSettingsProfilePage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardContent).toContain("https://portal.qa-encounterservices.com/login/device");
  });

  test("Verify User Feedback After Copy Link Action @[115015] @admin @ui", async ({ context }) => {
    // Grant clipboard permissions for copy functionality
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click copy button to trigger user feedback
    await adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton.click();

    // Verify success message appears with correct text
    await expect(adminInstitutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.linkCopiedSuccessMessage).toHaveText("Link successfully copied");
  });

  test("Verify Device ID Access Link Is Displayed in the Same Format and Location as the Patient Registration Link @[115347] @admin @ui", async () => {
    // Verify device ID access link elements and format
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLinkLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLink).toHaveText("https://portal.qa-encounterservices.com/login/device");
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton).toBeVisible();

    // Verify patient registration link elements and format for comparison
    await expect(adminInstitutionSettingsProfilePage.registrationLinkLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.registrationLink).toHaveText(
      "https://portal.qa-encounterservices.com/signup/INSOVOKTTWCHHQRXPZTOHIC"
    );
    await expect(adminInstitutionSettingsProfilePage.registrationLinkCopyButton).toBeVisible();
  });
});
