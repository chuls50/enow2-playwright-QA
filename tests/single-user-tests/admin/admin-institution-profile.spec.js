import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsProfilePage } from "../../models/pages/admin/institution-settings-profile.page.js";
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
  let adminInstitutionSettingsProfilePage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsProfilePage = new AdminInstitutionSettingsProfilePage(page);
    await adminInstitutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
  });

  test('Verify content of "Profile" Tab on "Institution settings" Page @[111328] @admin @ui', async () => {
    // Verify institution settings section elements
    await expect(adminInstitutionSettingsProfilePage.institutionSettingsHeading).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.nameLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.nameInput).toBeVisible();

    // Verify registration and device ID access links
    await expect(adminInstitutionSettingsProfilePage.registrationLinkLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.registrationLink).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.registrationLinkCopyButton).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLinkLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLink).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton).toBeVisible();

    // Verify phone number configuration
    await expect(adminInstitutionSettingsProfilePage.phoneNumberLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.phoneNumberInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.phoneNumberDropdown).toBeVisible();

    // Verify institution address section elements
    await expect(adminInstitutionSettingsProfilePage.institutionAddressHeading).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAptSuiteEtcLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAptSuiteEtcInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressZipCodeLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressZipCodeInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressCityLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressCityInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressCountryLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressCountryDropdown).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressStateLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.institutionAddressStateDropdown).toBeVisible();

    // Verify POC details section elements
    await expect(adminInstitutionSettingsProfilePage.pocDetailsHeading).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocNameInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocTitleLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocTitleInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocPhoneNumberLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocPhoneNumberInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocPhoneNumberDropdown).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocEmailLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocEmailInput).toBeVisible();

    // Verify POC address section elements
    await expect(adminInstitutionSettingsProfilePage.pocAddressHeading).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocAddressInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocAptSuiteEtcLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocAptSuiteEtcInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocZipCodeLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocZipCodeInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocCityLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocCityInput).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocCountryLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocCountryDropdown).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocStateLabel).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.pocStateDropdown).toBeVisible();

    // Verify action buttons are present and properly disabled
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeDisabled();
    await expect(adminInstitutionSettingsProfilePage.cancelButton).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.cancelButton).toBeDisabled();
  });

  test('Verify Editing and Saving Institution Information on "Profile" tab @[111329] @admin @functional', async () => {
    // First edit - basic address fields with Afghanistan/Badakhshan
    await adminInstitutionSettingsProfilePage.institutionAddressInput.click();
    await adminInstitutionSettingsProfilePage.institutionAddressInput.fill(TEST_DATA.INSTITUTION.ADDRESS);
    await adminInstitutionSettingsProfilePage.institutionAddressZipCodeInput.click();
    await adminInstitutionSettingsProfilePage.institutionAddressZipCodeInput.fill(TEST_DATA.INSTITUTION.ZIP);
    await adminInstitutionSettingsProfilePage.institutionAddressCityInput.click();
    await adminInstitutionSettingsProfilePage.institutionAddressCityInput.fill(TEST_DATA.INSTITUTION.CITY);
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.successMessage).toBeVisible();

    // Second edit - different address fields with Albania/Berat
    await adminInstitutionSettingsProfilePage.institutionAddressInput.click();
    await adminInstitutionSettingsProfilePage.institutionAddressInput.fill(TEST_DATA.INSTITUTION.ADDRESS_2);
    await adminInstitutionSettingsProfilePage.institutionAddressZipCodeInput.click();
    await adminInstitutionSettingsProfilePage.institutionAddressZipCodeInput.fill(TEST_DATA.INSTITUTION.ZIP_2);
    await adminInstitutionSettingsProfilePage.institutionAddressCityInput.click();
    await adminInstitutionSettingsProfilePage.institutionAddressCityInput.fill(TEST_DATA.INSTITUTION.CITY_2);
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.successMessage).toBeVisible();
  });

  test("Verify Editing and Saving POC (Point of Contact) Details on Profile tab @[112378] @admin @functional", async () => {
    // Clear existing POC details to start with clean state
    await adminInstitutionSettingsProfilePage.clearPOCDetails();

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
    await adminInstitutionSettingsProfilePage.fillPOCDetails(pocDetails1);
    await adminInstitutionSettingsProfilePage.selectPOCCountryAndState();
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.successMessage).toBeVisible();

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
    await adminInstitutionSettingsProfilePage.clearPOCDetails(true);
    await adminInstitutionSettingsProfilePage.fillPOCDetails(pocDetails2, true);
    await adminInstitutionSettingsProfilePage.selectPOCCountryAndState();
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.successMessage).toBeVisible();
  });

  test("Verify Save Changes Button is Disabled When No Edits Are Made @[112379] @admin @ui", async () => {
    // Verify buttons are visible but disabled without changes
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeDisabled();
    await expect(adminInstitutionSettingsProfilePage.cancelButton).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.cancelButton).toBeDisabled();
  });

  test("Verify Navigating Away Discards Unsaved Changes @[112380] @admin @functional", async () => {
    const discardedText = "THIS BETTER B DISCARDED";

    // Make unsaved changes to POC fields
    await adminInstitutionSettingsProfilePage.pocNameInput.fill(discardedText);
    await adminInstitutionSettingsProfilePage.pocTitleInput.fill(discardedText);
    await adminInstitutionSettingsProfilePage.pocEmailInput.fill(discardedText);
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();

    // Navigate away without saving changes
    await adminInstitutionSettingsProfilePage.usersTab.click();

    // Return to profile tab and verify changes were discarded
    await adminInstitutionSettingsProfilePage.navigateToInstitutionSettingsProfile();
    await expect(adminInstitutionSettingsProfilePage.pocNameInput).not.toHaveValue(discardedText);
    await expect(adminInstitutionSettingsProfilePage.pocTitleInput).not.toHaveValue(discardedText);
    await expect(adminInstitutionSettingsProfilePage.pocEmailInput).not.toHaveValue(discardedText);
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeDisabled();
  });

  test.skip("[Negative] Verify Invalid Input in Phone Number Field @[112381] @admin @functional", async () => {
    await adminInstitutionSettingsProfilePage.pocPhoneNumberInput.click();
    await adminInstitutionSettingsProfilePage.pocPhoneNumberInput.fill("");
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.requiredFieldError).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.errorMessage).toBeVisible();
  });

  test("[Negative] Verify Invalid Email Address Entry @[112382] @admin @functional", async () => {
    // Fill email field with invalid format
    await adminInstitutionSettingsProfilePage.pocEmailInput.fill(TEST_DATA.INVALID.EMAIL);
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();

    // Submit form and verify email validation error
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.invalidEmailError).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.errorMessage).toBeVisible();
  });

  test("Verify ZIP Code Field Does Not Accept Special Characters @[112383] @admin @functional", async () => {
    // Fill ZIP code field with invalid special characters
    await adminInstitutionSettingsProfilePage.pocZipCodeInput.fill(TEST_DATA.INVALID.ZIP_WITH_SPECIAL_CHARS);
    await expect(adminInstitutionSettingsProfilePage.saveChangesButton).toBeEnabled();

    // Submit form and verify ZIP code validation error
    await adminInstitutionSettingsProfilePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsProfilePage.invalidTextFieldError).toBeVisible();
    await expect(adminInstitutionSettingsProfilePage.errorMessage).toBeVisible();
  });

  test("Verify the Patient Registration Link functionality @[112439] @admin @functional", async ({ context }) => {
    // Grant clipboard permissions to the context
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await expect(adminInstitutionSettingsProfilePage.registrationLink).toBeVisible();
    await adminInstitutionSettingsProfilePage.registrationLinkCopyButton.click();
    await expect(adminInstitutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();

    // Use page.evaluate() to access clipboard content
    const clipboardContent = await adminInstitutionSettingsProfilePage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardContent).toContain("https://portal.qa-encounterservices.com/signup/INSOVOKTTWCHHQRXPZTOHIC");
  });

  test("Verify the Device ID Link functionality @[118418] @admin @functional", async ({ context }) => {
    // Grant clipboard permissions to the context
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await adminInstitutionSettingsProfilePage.page.waitForTimeout(500);
    await expect(adminInstitutionSettingsProfilePage.deviceIDAccessLink).toBeVisible();
    await adminInstitutionSettingsProfilePage.deviceIDAccessLinkCopyButton.click();
    await expect(adminInstitutionSettingsProfilePage.linkCopiedSuccessMessage).toBeVisible();

    // Verify correct device ID URL was copied to clipboard
    const clipboardContent = await adminInstitutionSettingsProfilePage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardContent).toContain("https://portal.qa-encounterservices.com/login/device");
  });
});
