import { test, expect } from "@playwright/test";
import { InstitutionSettingsProfilePage } from "../../models/pages/admin/institution-settings-profile.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// Admin Institution Profile - Total tests 10 (including 1 skipped)

// Constants for test data
const generateRandomZip = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const generateRandomPhoneNumber = () => {
  // Generate area code (200-999, avoiding 0 and 1 as first digit)
  const areaCode = Math.floor(200 + Math.random() * 800);
  // Generate exchange code (200-999, avoiding 0 and 1 as first digit)
  const exchangeCode = Math.floor(200 + Math.random() * 800);
  // Generate last 4 digits (0000-9999)
  const lastFour = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${areaCode}${exchangeCode}${lastFour}`;
};

// ========================================
// TEST DATA CONSTANTS
// ========================================
// All test data should be defined here in a centralized manner
// Use this pattern for consistent data management across tests
const TEST_DATA = {
  INSTITUTION: {
    ADDRESS: "516 E. Mars Hill Rd",
    ZIP: generateRandomZip(),
    CITY: "Flagstaff",
    ADDRESS_2: "1234 E. West Rd.",
    ZIP_2: generateRandomZip(),
    CITY_2: "Oatman",
  },
  POC: {
    NAME_1: "John Doe",
    TITLE_1: "Medical Director",
    ADDRESS_1: "123 Main St",
    ZIP_1: generateRandomZip(),
    CITY_1: "Phoenix",
    NAME_2: "Jane Smith",
    TITLE_2: "Associate Director",
    ADDRESS_2: "15023 N 73rd St",
    ZIP_2: generateRandomZip(),
    CITY_2: "Scottsdale",
    PHONE: generateRandomPhoneNumber(),
    PHONE_2: generateRandomPhoneNumber(),
  },
  INVALID: {
    EMAIL: "invalid-email",
    ZIP_WITH_SPECIAL_CHARS: "12345!@#",
  },
};

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let institutionSettingsProfilePage;

  test.beforeEach(async ({ page }) => {
    institutionSettingsProfilePage = new InstitutionSettingsProfilePage(page);
    await institutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
  });

  test('Verify content of "Profile" Tab on "Institution settings" Page @[111328] @admin @ui', async () => {
    // Verify institution settings section elements
    await expect(institutionSettingsProfilePage.institutionSettingsHeading).toBeVisible();
    await expect(institutionSettingsProfilePage.nameLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.nameInput).toBeVisible();

    // Verify registration and device ID access links
    await expect(institutionSettingsProfilePage.registrationLinkLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.registrationLink).toBeVisible();
    await expect(institutionSettingsProfilePage.registrationLinkCopyButton).toBeVisible();
    await expect(institutionSettingsProfilePage.deviceIDAccessLinkLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.deviceIDAccessLink).toBeVisible();
    await expect(institutionSettingsProfilePage.deviceIDAccessLinkCopyButton).toBeVisible();

    // Verify phone number configuration
    await expect(institutionSettingsProfilePage.phoneNumberLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.phoneNumberInput).toBeVisible();
    await expect(institutionSettingsProfilePage.phoneNumberDropdown).toBeVisible();

    // Verify institution address section elements
    await expect(institutionSettingsProfilePage.institutionAddressHeading).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressInput).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAptSuiteEtcLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAptSuiteEtcInput).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressZipCodeLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressZipCodeInput).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressCityLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressCityInput).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressCountryLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressCountryDropdown).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressStateLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.institutionAddressStateDropdown).toBeVisible();

    // Verify POC details section elements
    await expect(institutionSettingsProfilePage.pocDetailsHeading).toBeVisible();
    await expect(institutionSettingsProfilePage.pocNameLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocNameInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocTitleLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocTitleInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocPhoneNumberLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocPhoneNumberInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocPhoneNumberDropdown).toBeVisible();
    await expect(institutionSettingsProfilePage.pocEmailLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocEmailInput).toBeVisible();

    // Verify POC address section elements
    await expect(institutionSettingsProfilePage.pocAddressHeading).toBeVisible();
    await expect(institutionSettingsProfilePage.pocAddressInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocAptSuiteEtcLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocAptSuiteEtcInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocZipCodeLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocZipCodeInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocCityLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocCityInput).toBeVisible();
    await expect(institutionSettingsProfilePage.pocCountryLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocCountryDropdown).toBeVisible();
    await expect(institutionSettingsProfilePage.pocStateLabel).toBeVisible();
    await expect(institutionSettingsProfilePage.pocStateDropdown).toBeVisible();

    // Verify action buttons are present and properly disabled
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeVisible();
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeDisabled();
    await expect(institutionSettingsProfilePage.cancelButton).toBeVisible();
    await expect(institutionSettingsProfilePage.cancelButton).toBeDisabled();
  });

  test('Verify Editing and Saving Institution Information on "Profile" tab @[111329] @admin @functional', async () => {
    // First edit - basic address fields with Afghanistan/Badakhshan
    await institutionSettingsProfilePage.institutionAddressInput.click();
    await institutionSettingsProfilePage.institutionAddressInput.fill(TEST_DATA.INSTITUTION.ADDRESS);
    await institutionSettingsProfilePage.institutionAddressZipCodeInput.click();
    await institutionSettingsProfilePage.institutionAddressZipCodeInput.fill(TEST_DATA.INSTITUTION.ZIP);
    await institutionSettingsProfilePage.institutionAddressCityInput.click();
    await institutionSettingsProfilePage.institutionAddressCityInput.fill(TEST_DATA.INSTITUTION.CITY);
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.successMessage).toBeVisible();

    // Second edit - different address fields with Albania/Berat
    await institutionSettingsProfilePage.institutionAddressInput.click();
    await institutionSettingsProfilePage.institutionAddressInput.fill(TEST_DATA.INSTITUTION.ADDRESS_2);
    await institutionSettingsProfilePage.institutionAddressZipCodeInput.click();
    await institutionSettingsProfilePage.institutionAddressZipCodeInput.fill(TEST_DATA.INSTITUTION.ZIP_2);
    await institutionSettingsProfilePage.institutionAddressCityInput.click();
    await institutionSettingsProfilePage.institutionAddressCityInput.fill(TEST_DATA.INSTITUTION.CITY_2);
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.successMessage).toBeVisible();
  });

  test("Verify Editing and Saving POC (Point of Contact) Details on Profile tab @[112378] @admin @functional", async () => {
    // Clear existing POC details to start with clean state
    await institutionSettingsProfilePage.clearPOCDetails();

    // Generate unique timestamp for test data
    const timestamp = new Date().getTime();

    // Prepare first POC details dataset
    const pocDetails1 = {
      name: TEST_DATA.POC.NAME_1,
      title: TEST_DATA.POC.TITLE_1,
      email: `john.doe${timestamp}@example.com`,
      phone: TEST_DATA.POC.PHONE,
      address: TEST_DATA.POC.ADDRESS_1,
      zip: TEST_DATA.POC.ZIP_1,
      city: TEST_DATA.POC.CITY_1,
    };

    // Fill first POC details and save changes
    await institutionSettingsProfilePage.fillPOCDetails(pocDetails1);
    await institutionSettingsProfilePage.selectPOCCountryAndState();
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.successMessage).toBeVisible();

    // Prepare second POC details dataset
    const pocDetails2 = {
      name: TEST_DATA.POC.NAME_2,
      title: TEST_DATA.POC.TITLE_2,
      email: `jane.smith${timestamp}@careplus.com`,
      phone: TEST_DATA.POC.PHONE_2,
      address: TEST_DATA.POC.ADDRESS_2,
      zip: TEST_DATA.POC.ZIP_2,
      city: TEST_DATA.POC.CITY_2,
    };

    // Clear and fill second POC details then save
    await institutionSettingsProfilePage.clearPOCDetails(true);
    await institutionSettingsProfilePage.fillPOCDetails(pocDetails2, true);
    await institutionSettingsProfilePage.selectPOCCountryAndState();
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.successMessage).toBeVisible();
  });

  test("Verify Save Changes Button is Disabled When No Edits Are Made @[112379] @admin @ui", async () => {
    // Verify buttons are visible but disabled without changes
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeVisible();
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeDisabled();
    await expect(institutionSettingsProfilePage.cancelButton).toBeVisible();
    await expect(institutionSettingsProfilePage.cancelButton).toBeDisabled();
  });

  test("Verify Navigating Away Discards Unsaved Changes @[112380] @admin @functional", async () => {
    const discardedText = "THIS BETTER B DISCARDED";

    // Make unsaved changes to POC fields
    await institutionSettingsProfilePage.pocNameInput.fill(discardedText);
    await institutionSettingsProfilePage.pocTitleInput.fill(discardedText);
    await institutionSettingsProfilePage.pocEmailInput.fill(discardedText);
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();

    // Navigate away without saving changes
    await institutionSettingsProfilePage.usersTab.click();

    // Return to profile tab and verify changes were discarded
    await institutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
    await expect(institutionSettingsProfilePage.pocNameInput).not.toHaveValue(discardedText);
    await expect(institutionSettingsProfilePage.pocTitleInput).not.toHaveValue(discardedText);
    await expect(institutionSettingsProfilePage.pocEmailInput).not.toHaveValue(discardedText);
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeDisabled();
  });

  test.skip("[Negative] Verify Invalid Input in Phone Number Field @[112381] @admin @functional", async () => {
    await institutionSettingsProfilePage.pocPhoneNumberInput.click();
    await institutionSettingsProfilePage.pocPhoneNumberInput.fill("");
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.requiredFieldError).toBeVisible();
    await expect(institutionSettingsProfilePage.errorMessage).toBeVisible();
  });

  test("[Negative] Verify Invalid Email Address Entry @[112382] @admin @functional", async () => {
    // Fill email field with invalid format
    await institutionSettingsProfilePage.pocEmailInput.fill(TEST_DATA.INVALID.EMAIL);
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();

    // Submit form and verify email validation error
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.invalidEmailError).toBeVisible();
    await expect(institutionSettingsProfilePage.errorMessage).toBeVisible();
  });

  test("Verify ZIP Code Field Does Not Accept Special Characters @[112383] @admin @functional", async () => {
    // Fill ZIP code field with invalid special characters
    await institutionSettingsProfilePage.pocZipCodeInput.fill(TEST_DATA.INVALID.ZIP_WITH_SPECIAL_CHARS);
    await expect(institutionSettingsProfilePage.saveChangesButton).toBeEnabled();

    // Submit form and verify ZIP code validation error
    await institutionSettingsProfilePage.saveChangesButton.click();
    await expect(institutionSettingsProfilePage.invalidTextFieldError).toBeVisible();
    await expect(institutionSettingsProfilePage.errorMessage).toBeVisible();
  });

  test("Verify the Patient Registration Link functionality @[112439] @admin @functional", async ({ context }) => {
    // Grant clipboard permissions to the context
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await expect(institutionSettingsProfilePage.registrationLink).toBeVisible();
    await institutionSettingsProfilePage.registrationLinkCopyButton.click();
    await expect(institutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();

    // Use page.evaluate() to access clipboard content
    const clipboardContent = await institutionSettingsProfilePage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardContent).toContain("https://portal.qa-encounterservices.com/signup/INSOVOKTTWCHHQRXPZTOHIC");
  });

  test("Verify the Device ID Link functionality @[118418] @admin @functional", async ({ context }) => {
    // Grant clipboard permissions to the context
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await institutionSettingsProfilePage.page.waitForTimeout(500);
    await expect(institutionSettingsProfilePage.deviceIDAccessLink).toBeVisible();
    await institutionSettingsProfilePage.deviceIDAccessLinkCopyButton.click();
    await expect(institutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();

    // Verify correct device ID URL was copied to clipboard
    const clipboardContent = await institutionSettingsProfilePage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardContent).toContain("https://portal.qa-encounterservices.com/login/device");
  });
});
