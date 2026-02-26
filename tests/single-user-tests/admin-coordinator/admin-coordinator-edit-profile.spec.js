import { test, expect } from "@playwright/test";
import { MyAccountPage } from "../../models/pages/admin/admin-my-account.page.js";
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
  let myAccountPage;

  test.beforeEach(async ({ page }) => {
    myAccountPage = new MyAccountPage(page);
    await myAccountPage.navigateToMyAccount();
  });

  test("Verify Edit Profile screen UI elements and field states @[117700] @dual-user @ui", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Verify modal header and all form field labels are visible
    await expect(myAccountPage.editProfileModal).toBeVisible();
    await expect(myAccountPage.editProfileFirstNameLabel).toBeVisible();
    await expect(myAccountPage.editProfileLastNameLabel).toBeVisible();
    await expect(myAccountPage.editProfileLanguagesLabel).toBeVisible();
    await expect(myAccountPage.editProfileCountryLabel).toBeVisible();
    await expect(myAccountPage.editProfileStateLabel).toBeVisible();

    // Verify action buttons are visible and Save button is initially disabled
    await expect(myAccountPage.cancelButton).toBeVisible();
    await expect(myAccountPage.saveChangesButton).toBeVisible();
    await expect(myAccountPage.saveChangesButton).toBeDisabled();
    await myAccountPage.cancelButton.click();
  });

  test("Check Save changes button after editing any field @[117701] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Edit first name field with unique timestamp
    const timestamp = Date.now();
    await myAccountPage.fillFirstName(`${TEST_DATA.PROFILE.TEST_FIRST_NAME_PREFIX} ${timestamp}`);

    // Verify Save button becomes enabled after editing
    await expect(myAccountPage.saveChangesButton).toBeEnabled();
    await myAccountPage.cancelButton.click();
  });

  test("Verify multi-select behavior of Languages spoken list @[117702] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Reset state by removing Spanish if present
    await myAccountPage.resetSpanishLanguageIfPresent();

    // Add Spanish language and verify both language chips are visible
    await myAccountPage.addSpanishLanguage();
    await expect(myAccountPage.languageTag.first()).toBeVisible();
    await expect(myAccountPage.languageTag.nth(1)).toBeVisible();
    await expect(myAccountPage.saveChangesButton).toBeEnabled();

    // Remove newly added language and verify Save button becomes disabled
    await myAccountPage.closeButtonNth2.click();
    await expect(myAccountPage.saveChangesButton).toBeDisabled();
    await myAccountPage.cancelButton.click();
  });

  test("Remove a language chip from Languages spoken list @[117703] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Reset state by removing Spanish if present
    await myAccountPage.resetSpanishLanguageIfPresent();

    // Open languages dropdown
    await myAccountPage.languagesDropdownWrapper.click();

    // Remove last remaining language and verify validation error
    await myAccountPage.languageTagCloseButton.click();
    await expect(myAccountPage.languageRequiredError).toBeVisible();
    await expect(myAccountPage.saveChangesButton).toBeEnabled();
    await myAccountPage.cancelButton.click();
  });

  test("Verify Country selection and enabling of State dropdown @[117704] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Select Afghanistan as country
    await myAccountPage.selectCountry(TEST_DATA.COUNTRY.AFGHANISTAN);

    // Verify State dropdown becomes enabled after country selection
    await myAccountPage.stateDropdown.click();
    await expect(myAccountPage.stateDropdownMenu).toBeVisible();
    await expect(myAccountPage.saveChangesButton).toBeEnabled();
    await myAccountPage.cancelButton.click();
  });

  test("Verify State selection from enabled dropdown @[117705] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Select Afghanistan as country
    await myAccountPage.selectCountry(TEST_DATA.COUNTRY.AFGHANISTAN);

    // Select Badakhshan state and verify Save button is enabled
    await myAccountPage.selectState(TEST_DATA.COUNTRY.STATE_BADAKHSHAN);
    await expect(myAccountPage.saveChangesButton).toBeEnabled();
    await myAccountPage.cancelButton.click();
  });

  test("Verify phone number input and formatting @[117706] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Fill phone number with formatted input
    await myAccountPage.fillPhoneNumber(TEST_DATA.PHONE.FORMATTED);

    // Open country code selector and verify dropdown is visible
    await myAccountPage.phoneCountryCodeSelector.click();
    await expect(myAccountPage.stateDropdownMenu).toBeVisible();
    await myAccountPage.cancelButton.click();
  });

  test("Cancel changes and exit Edit Profile screen @[117707] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Edit first name field with unique timestamp
    const timestamp = Date.now();
    await myAccountPage.fillFirstName(`${TEST_DATA.PROFILE.TEST_FIRST_NAME_PREFIX} ${timestamp}`);
    await expect(myAccountPage.saveChangesButton).toBeEnabled();

    // Cancel changes and verify modal is closed
    await myAccountPage.cancelButton.click();
    await expect(myAccountPage.editProfileModal).not.toBeVisible();
  });

  test("Verify saving valid changes @[117708] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Edit first name with random string
    const randomString = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substring(0, 6);
    await myAccountPage.fillFirstName(`${TEST_DATA.PROFILE.TEST_FIRST_NAME_PREFIX} ${randomString}`);
    await expect(myAccountPage.saveChangesButton).toBeEnabled();

    // Save changes and verify success message
    await myAccountPage.saveChanges();
    await expect(myAccountPage.profileUpdatedMessage).toBeVisible();
    await expect(myAccountPage.editProfileModal).not.toBeVisible();

    // Reset state to original first name
    await myAccountPage.openEditProfileModal();
    await myAccountPage.fillFirstName(TEST_DATA.PROFILE.ORIGINAL_FIRST_NAME);
    await myAccountPage.saveChanges();
    await expect(myAccountPage.profileUpdatedMessage).toBeVisible();
  });

  test("[Negative] Attempt to save with required fields empty @[117709] @dual-user @functional", async () => {
    // Open edit profile modal
    await myAccountPage.openEditProfileModal();

    // Reset state by removing Spanish if present
    await myAccountPage.resetSpanishLanguageIfPresent();

    // Clear all required fields
    await myAccountPage.clearAllRequiredFields();

    // Submit form and verify all validation errors are displayed
    await myAccountPage.saveChangesButton.click();
    await expect(myAccountPage.firstNameRequiredError).toBeVisible();
    await expect(myAccountPage.lastNameRequiredError).toBeVisible();
    await expect(myAccountPage.languageRequiredError).toBeVisible();
  });
});
