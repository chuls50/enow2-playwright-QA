import { test, expect } from "@playwright/test";
import { AdminMyAccountPage } from "../../models/pages/admin/admin-my-account.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Admin My Account - Total tests 10 (including 1 skipped)

const TEST_DATA = {
  ADMIN_ONE_NAME: "Cody AdminOne",
  ADMIN_ONE_EMAIL: "chuls+admin1staging@globalmed.com",
};

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminMyAccountPage;

  test.beforeEach(async ({ page }) => {
    adminMyAccountPage = new AdminMyAccountPage(page);
    await adminMyAccountPage.navigateToMyAccount();
  });

  test("Verify UI elements of the 'My account' screen @[117690] @admin @ui", async ({ page }) => {
    // Verify main page structure
    await expect(adminMyAccountPage.header).toBeVisible();

    // Verify My Account section
    await expect(adminMyAccountPage.myAccountLabel).toBeVisible();
    await expect(adminMyAccountPage.myAccountText).toBeVisible();
    await expect(adminMyAccountPage.profileIcon).toBeVisible();
    await expect(page.getByText(TEST_DATA.ADMIN_ONE_NAME)).toBeVisible();
    await expect(page.getByText(TEST_DATA.ADMIN_ONE_EMAIL)).toBeVisible();
    await expect(adminMyAccountPage.uploadPhotoButton).toBeVisible();
    await expect(adminMyAccountPage.deletePhotoButton).toBeVisible();

    // Verify Profile Details section
    await expect(adminMyAccountPage.profileDetailsSection).toBeVisible();
    await expect(adminMyAccountPage.profileDetailsFirstName).toBeVisible();
    await expect(adminMyAccountPage.profileDetailsLastName).toBeVisible();
    await expect(adminMyAccountPage.profileLanguagesSpoken).toBeVisible();
    await expect(adminMyAccountPage.profileCountry).toBeVisible();
    await expect(adminMyAccountPage.profileState).toBeVisible();
    await expect(adminMyAccountPage.profilePhoneNumber).toBeVisible();
    await expect(adminMyAccountPage.profileDetailsEditButton).toBeVisible();

    // Verify other sections
    await expect(adminMyAccountPage.applicationLanguageSection).toBeVisible();
    await expect(adminMyAccountPage.changeLanguageButton).toBeVisible();
    await expect(adminMyAccountPage.timeZoneSection).toBeVisible();
    await expect(adminMyAccountPage.changeTimeZoneButton).toBeVisible();
    await expect(adminMyAccountPage.accountDeletionSection).toBeVisible();
    await expect(adminMyAccountPage.accountDeletionButton).toBeVisible();
  });

  test("Verify uploading a valid profile photo @[117691] @admin @functional", async () => {
    // Upload a valid image file
    const imagePath = await adminMyAccountPage.getTestImagePath();
    await adminMyAccountPage.uploadFile(imagePath);
    await adminMyAccountPage.waitForUploadToComplete();

    // Verify upload was successful by checking delete button is still available
    await expect(adminMyAccountPage.deletePhotoButton).toBeVisible();

    // Clean up - delete the uploaded photo
    await adminMyAccountPage.deletePhotoButton.click();
  });

  test("[Negative] Verify upload of an unsupported or large file fails @[117692] @admin @functional", async () => {
    // Test invalid file type
    await adminMyAccountPage.uploadFile(adminMyAccountPage.getInvalidFilePath());
    await expect(adminMyAccountPage.invalidImageErrorMessage).toBeVisible();

    // Test large file size
    await adminMyAccountPage.uploadFile(adminMyAccountPage.getLargeImagePath());
    await expect(adminMyAccountPage.fileSizeExceededMessage).toBeVisible();
  });

  test("Verify deleting the uploaded photo @[117693] @admin @functional", async () => {
    // First upload a photo
    await adminMyAccountPage.uploadFile(adminMyAccountPage.getTestImagePath());
    await adminMyAccountPage.waitForUploadToComplete();

    // Delete the photo
    await adminMyAccountPage.deletePhotoButton.click();

    // Expect Profile picture deleted successfully message
    await expect(adminMyAccountPage.profilePictureDeletedMessage).toBeVisible();
  });

  test("Verify navigation to the Edit Profile screen @[117694] @admin @functional", async () => {
    // Click edit profile button
    await adminMyAccountPage.profileDetailsEditButton.click();

    // Verify edit profile modal opens - explicit assertions
    await expect(adminMyAccountPage.editProfileModal).toBeVisible();
    await expect(adminMyAccountPage.editProfileHeader).toBeVisible();
  });

  test("Verify navigation to the Change Language screen @[117695] @admin @functional", async () => {
    // Click change language button
    await adminMyAccountPage.changeLanguageButton.click();

    // Verify change language modal opens - explicit assertion using POM locator
    await expect(adminMyAccountPage.changeLanguageModal).toBeVisible();
  });

  test("Verify navigation to Change time zone screen @[118488] @admin @functional", async () => {
    // Click change time zone button
    await adminMyAccountPage.changeTimeZoneButton.click();

    // Verify change time zone modal opens - explicit assertion using POM locator
    await expect(adminMyAccountPage.changeTimeZoneModal).toBeVisible();
  });

  test("Verify the Delete Account confirmation dialog @[117697] @admin @ui", async () => {
    // Open delete account modal - simple action
    await adminMyAccountPage.accountDeletionButton.click();

    // Verify modal content - explicit assertions
    await expect(adminMyAccountPage.accountDeletionModal).toBeVisible();
    await expect(adminMyAccountPage.accountDeletionHeader).toBeVisible();
    await expect(adminMyAccountPage.accountDeleteText).toBeVisible();

    // Close modal using X button - simple action
    await adminMyAccountPage.accountDeletionModalXCloseButton.click();

    // Verify modal is closed - explicit assertion
    await expect(adminMyAccountPage.accountDeletionModal).not.toBeVisible();
  });

  test("Verify canceling account deletion @[117698] @admin @functional", async () => {
    // Open delete account modal - simple action
    await adminMyAccountPage.accountDeletionButton.click();

    // Verify modal is open - explicit assertions
    await expect(adminMyAccountPage.accountDeletionModal).toBeVisible();
    await expect(adminMyAccountPage.accountDeletionHeader).toBeVisible();
    await expect(adminMyAccountPage.accountDeleteText).toBeVisible();

    // Cancel deletion - simple action
    await adminMyAccountPage.accountDeletionNoCancelButton.click();

    // Verify modal is closed - explicit assertion
    await expect(adminMyAccountPage.accountDeletionModal).not.toBeVisible();
  });

  // multi-user test
  test.skip("Verify confirming account deletion @[117699] @multi-user @functional", async () => {});
});
