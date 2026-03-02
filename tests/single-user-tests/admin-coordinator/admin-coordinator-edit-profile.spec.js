import { test, expect } from "@playwright/test";
import { AdminMyAccountPage } from "../../models/pages/admin/admin-my-account.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// ========================================
// TEST DATA CONSTANTS
// ========================================
const TEST_DATA = {
  PROFILE: {
    ORIGINAL_FIRST_NAME: "Cody",
    TEST_FIRST_NAME_PREFIX: "Cody test",
  },
  COUNTRY: {
    AFGHANISTAN: "Afghanistan",
    STATE_BADAKHSHAN: "Badakhshan",
  },
  PHONE: {
    FORMATTED: "(223) 654 - 9876_",
  },
};

// Admin Coordinator - Total Tests 10

test.describe("Admin+Coordinator @regression", () => {
  test.use(useRole(ROLES.ADMIN_COORDINATOR));
  let adminMyAccountPage;

  test.beforeEach(async ({ page }) => {
    adminMyAccountPage = new AdminMyAccountPage(page);
    await adminMyAccountPage.navigateToMyAccount();
  });

  test("Verify Edit Profile screen UI elements and field states @[117700] @dual-user @ui", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Verify modal header and all form field labels are visible
    await expect(adminMyAccountPage.editProfileModal).toBeVisible();
    await expect(adminMyAccountPage.editProfileFirstNameLabel).toBeVisible();
    await expect(adminMyAccountPage.editProfileLastNameLabel).toBeVisible();
    await expect(adminMyAccountPage.editProfileLanguagesLabel).toBeVisible();
    await expect(adminMyAccountPage.editProfileCountryLabel).toBeVisible();
    await expect(adminMyAccountPage.editProfileStateLabel).toBeVisible();

    // Verify action buttons are visible and Save button is initially disabled
    await expect(adminMyAccountPage.cancelButton).toBeVisible();
    await expect(adminMyAccountPage.saveChangesButton).toBeVisible();
    await expect(adminMyAccountPage.saveChangesButton).toBeDisabled();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Check Save changes button after editing any field @[117701] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Edit first name field with unique timestamp
    const timestamp = Date.now();
    await adminMyAccountPage.fillFirstName(`${TEST_DATA.PROFILE.TEST_FIRST_NAME_PREFIX} ${timestamp}`);

    // Verify Save button becomes enabled after editing
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Verify multi-select behavior of Languages spoken list @[117702] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Reset state by removing Spanish if present
    await adminMyAccountPage.resetSpanishLanguageIfPresent();

    // Add Spanish language and verify both language chips are visible
    await adminMyAccountPage.addSpanishLanguage();
    await expect(adminMyAccountPage.languageTag.first()).toBeVisible();
    await expect(adminMyAccountPage.languageTag.nth(1)).toBeVisible();
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();

    // Remove newly added language and verify Save button becomes disabled
    await adminMyAccountPage.closeButtonNth2.click();
    await expect(adminMyAccountPage.saveChangesButton).toBeDisabled();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Remove a language chip from Languages spoken list @[117703] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Reset state by removing Spanish if present
    await adminMyAccountPage.resetSpanishLanguageIfPresent();

    // Open languages dropdown
    await adminMyAccountPage.languagesDropdownWrapper.click();

    // Remove last remaining language and verify validation error
    await adminMyAccountPage.languageTagCloseButton.click();
    await expect(adminMyAccountPage.languageRequiredError).toBeVisible();
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Verify Country selection and enabling of State dropdown @[117704] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Select Afghanistan as country
    await adminMyAccountPage.selectCountry(TEST_DATA.COUNTRY.AFGHANISTAN);

    // Verify State dropdown becomes enabled after country selection
    await adminMyAccountPage.stateDropdown.click();
    await expect(adminMyAccountPage.stateDropdownMenu).toBeVisible();
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Verify State selection from enabled dropdown @[117705] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Select Afghanistan as country
    await adminMyAccountPage.selectCountry(TEST_DATA.COUNTRY.AFGHANISTAN);

    // Select Badakhshan state and verify Save button is enabled
    await adminMyAccountPage.selectState(TEST_DATA.COUNTRY.STATE_BADAKHSHAN);
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Verify phone number input and formatting @[117706] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Fill phone number with formatted input
    await adminMyAccountPage.fillPhoneNumber(TEST_DATA.PHONE.FORMATTED);

    // Open country code selector and verify dropdown is visible
    await adminMyAccountPage.phoneCountryCodeSelector.click();
    await expect(adminMyAccountPage.stateDropdownMenu).toBeVisible();
    await adminMyAccountPage.cancelButton.click();
  });

  test("Cancel changes and exit Edit Profile screen @[117707] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Edit first name field with unique timestamp
    const timestamp = Date.now();
    await adminMyAccountPage.fillFirstName(`${TEST_DATA.PROFILE.TEST_FIRST_NAME_PREFIX} ${timestamp}`);
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();

    // Cancel changes and verify modal is closed
    await adminMyAccountPage.cancelButton.click();
    await expect(adminMyAccountPage.editProfileModal).not.toBeVisible();
  });

  test("Verify saving valid changes @[117708] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Edit first name with random string
    const randomString = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substring(0, 6);
    await adminMyAccountPage.fillFirstName(`${TEST_DATA.PROFILE.TEST_FIRST_NAME_PREFIX} ${randomString}`);
    await expect(adminMyAccountPage.saveChangesButton).toBeEnabled();

    // Save changes and verify success message
    await adminMyAccountPage.saveChanges();
    await expect(adminMyAccountPage.profileUpdatedMessage).toBeVisible();
    await expect(adminMyAccountPage.editProfileModal).not.toBeVisible();

    // Reset state to original first name
    await adminMyAccountPage.openEditProfileModal();
    await adminMyAccountPage.fillFirstName(TEST_DATA.PROFILE.ORIGINAL_FIRST_NAME);
    await adminMyAccountPage.saveChanges();
    await expect(adminMyAccountPage.profileUpdatedMessage).toBeVisible();
  });

  test("[Negative] Attempt to save with required fields empty @[117709] @dual-user @functional", async () => {
    // Open edit profile modal
    await adminMyAccountPage.openEditProfileModal();

    // Reset state by removing Spanish if present
    await adminMyAccountPage.resetSpanishLanguageIfPresent();

    // Clear all required fields
    await adminMyAccountPage.clearAllRequiredFields();

    // Submit form and verify all validation errors are displayed
    await adminMyAccountPage.saveChangesButton.click();
    await expect(adminMyAccountPage.firstNameRequiredError).toBeVisible();
    await expect(adminMyAccountPage.lastNameRequiredError).toBeVisible();
    await expect(adminMyAccountPage.languageRequiredError).toBeVisible();
  });
});
