import { test, expect } from "@playwright/test";
import { DeviceMyAccountPage } from "../../models/pages/device/device-my-account.page.js";
import { useRole, ROLES } from "../../utils/auth-helpers.js";

// ========================================
// TEST DATA CONSTANTS
// ========================================
const TEST_DATA = {
  // User info
  USER: {
    NAME: "Cody Device-ID-One",
    DEVICE_ID: "11111",
    EMAIL: "chuls",
    AVATAR_INITIAL: "C",
  },
  // Address fields
  ADDRESS: {
    CITY_1: "Scottsdale",
    CITY_2: "Phoenix",
    ZIP_CODE: "85032",
    ADDRESS_LINE_1: "3325 e waltann ln",
    ADDRESS_LINE_2: "5416 e emile zola",
  },
  // Validation - existing IDs that should fail
  EXISTING_DEVICE_IDS: {
    DUPLICATE_1: "22222",
    DUPLICATE_2: "33333",
  },
  // File paths
  FILES: {
    PROFILE_PHOTO: "tests/images/profile-icon.jpg",
  },
};

test.describe("Device_ID @regression", () => {
  let deviceMyAccountPage;

  test.use(useRole(ROLES.DEVICE_USER));

  test.beforeEach(async ({ page }) => {
    deviceMyAccountPage = new DeviceMyAccountPage(page);
    await page.goto(`${process.env.QA_URL}/dashboard`);
    await page.waitForLoadState("networkidle");
  });

  test("Verify My Account View for Device ID User Displays Correct Fields @[115333] @device @ui", async () => {
    // open my account
    await deviceMyAccountPage.navigateToMyAccount();

    // verify fields
    await expect(deviceMyAccountPage.myAccountHeading).toBeVisible();
    await expect(deviceMyAccountPage.nameText).toBeVisible();
    await expect(deviceMyAccountPage.deviceIdText).toBeVisible();
    await expect(deviceMyAccountPage.phoneNumberText).toBeVisible();
    await expect(deviceMyAccountPage.countryText).toBeVisible();
    await expect(deviceMyAccountPage.stateText).toBeVisible();
    await expect(deviceMyAccountPage.cityText).toBeVisible();
    await expect(deviceMyAccountPage.zipCodeText).toBeVisible();
    await expect(deviceMyAccountPage.address1Text).toBeVisible();
    await expect(deviceMyAccountPage.address2Text).toBeVisible();

    // confirm absence of fields
    await expect(deviceMyAccountPage.firstNameText).not.toBeVisible();
    await expect(deviceMyAccountPage.lastNameText).not.toBeVisible();
    await expect(deviceMyAccountPage.dobText).not.toBeVisible();
    await expect(deviceMyAccountPage.sexAssignedText).not.toBeVisible();
  });

  test("Verify Edit Profile View for Device ID User Displays Correct Fields @[115334] @device @ui", async () => {
    // open my account and edit profile modal
    await deviceMyAccountPage.navigateToMyAccount();
    await deviceMyAccountPage.openEditProfileModal();
    await expect(deviceMyAccountPage.editProfileDetailsHeaderText).toBeVisible();

    // verify fields
    await expect(deviceMyAccountPage.modalNameLabel).toBeVisible();
    await expect(deviceMyAccountPage.modalDeviceIdLabel).toBeVisible();
    await expect(deviceMyAccountPage.modalCityLabel).toBeVisible();
    await expect(deviceMyAccountPage.modalZipCodeLabel).toBeVisible();
    await expect(deviceMyAccountPage.modalAddressLine1Label).toBeVisible();
    await expect(deviceMyAccountPage.modalAddressLine2Label).toBeVisible();
    await expect(deviceMyAccountPage.modalCountryLabel).toBeVisible();
    await expect(deviceMyAccountPage.modalStateLabel).toBeVisible();
    await expect(deviceMyAccountPage.modalPhoneNumberLabel).toBeVisible();

    // confirm absence of fields
    await expect(deviceMyAccountPage.modalFirstNameLabel).not.toBeVisible();
    await expect(deviceMyAccountPage.modalLastNameLabel).not.toBeVisible();
    await expect(deviceMyAccountPage.modalDobLabel).not.toBeVisible();
    await expect(deviceMyAccountPage.modalSexAssignedLabel).not.toBeVisible();
  });

  test("Verify Default Avatar Displays First Letter of Device ID Name When No Photo Is Uploaded @[115335] @device @functional", async () => {
    // open my account
    await deviceMyAccountPage.navigateToMyAccount();

    // verify avatar displays first letter of device name
    await expect(deviceMyAccountPage.getProfilePictureInitial(TEST_DATA.USER.AVATAR_INITIAL)).toBeVisible();
  });

  test("Verify Validation for Name and Device ID in Edit Profile View @[115336]", async () => {
    // open my account and edit profile
    await deviceMyAccountPage.navigateToMyAccount();
    await deviceMyAccountPage.openEditProfileModal();
    await expect(deviceMyAccountPage.editProfileDetailsHeaderText).toBeVisible();

    // clear fields and verify validation errors
    await deviceMyAccountPage.fillName("");
    await deviceMyAccountPage.fillDeviceId("");
    await expect(deviceMyAccountPage.nameRequiredError).toBeVisible();
    await expect(deviceMyAccountPage.deviceIdRequiredError).toBeVisible();

    // try to save with duplicate device ID
    await deviceMyAccountPage.fillDeviceId(TEST_DATA.EXISTING_DEVICE_IDS.DUPLICATE_1);
    await deviceMyAccountPage.fillName(TEST_DATA.USER.NAME);
    await deviceMyAccountPage.saveChanges();
    await expect(deviceMyAccountPage.profileUpdatedErrorToast).toBeVisible();
    await expect(deviceMyAccountPage.deviceIdExistsError).toBeVisible();
  });

  test("Verify Optional Address Fields Are Displayed and Editable @[115337] @device @functional", async ({ page }) => {
    // open my account and edit profile
    await deviceMyAccountPage.navigateToMyAccount();
    await deviceMyAccountPage.openEditProfileModal();
    await expect(deviceMyAccountPage.editProfileDetailsHeaderText).toBeVisible();

    // Check current city value and toggle between Scottsdale and Phoenix
    const currentCity = await deviceMyAccountPage.cityInput.inputValue();
    const newCity = currentCity === TEST_DATA.ADDRESS.CITY_1 ? TEST_DATA.ADDRESS.CITY_2 : TEST_DATA.ADDRESS.CITY_1;

    // Fill address fields
    await deviceMyAccountPage.fillAddressFields({
      city: newCity,
      zipCode: TEST_DATA.ADDRESS.ZIP_CODE,
      addressLine1: TEST_DATA.ADDRESS.ADDRESS_LINE_1,
      addressLine2: TEST_DATA.ADDRESS.ADDRESS_LINE_2,
    });
    await deviceMyAccountPage.saveChanges();
    await expect(deviceMyAccountPage.profileUpdatedSuccessToast).toBeVisible();

    // Verify updated values display
    await expect(page.getByText(newCity)).toBeVisible();
    await expect(page.getByText(TEST_DATA.ADDRESS.ZIP_CODE)).toBeVisible();
    await expect(page.getByText(TEST_DATA.ADDRESS.ADDRESS_LINE_1)).toBeVisible();
    await expect(page.getByText(TEST_DATA.ADDRESS.ADDRESS_LINE_2)).toBeVisible();

    // Reset state
    await deviceMyAccountPage.openEditProfileModal();
    await deviceMyAccountPage.clearAddressFields();
    await deviceMyAccountPage.saveChanges();
    await expect(deviceMyAccountPage.profileUpdatedSuccessToast).toBeVisible();
  });

  test("Verify Time Zone and Application Language Are Displayed and Editable @[115338] @device @functional", async () => {
    // open my account
    await deviceMyAccountPage.navigateToMyAccount();

    // verify and change application language to Spanish
    await expect(deviceMyAccountPage.applicationLanguageLabel).toBeVisible();
    await expect(deviceMyAccountPage.englishText).toBeVisible();
    await deviceMyAccountPage.changeLanguageToSpanish();
    await expect(deviceMyAccountPage.languageUpdatedToastSpanish).toBeVisible();
    await expect(deviceMyAccountPage.spanishText).toBeVisible();

    // change back to English
    await deviceMyAccountPage.changeLanguageToEnglish();
    await expect(deviceMyAccountPage.languageUpdatedToast).toBeVisible();

    // verify and toggle time zone
    await expect(deviceMyAccountPage.timeZoneLabel).toBeVisible();
    await expect(deviceMyAccountPage.changeTimeZoneLink).toBeVisible();
    await deviceMyAccountPage.toggleTimeZone();
    await expect(deviceMyAccountPage.timeZoneUpdatedToast).toBeVisible();

    // toggle time zone back
    await deviceMyAccountPage.toggleTimeZone();
    await expect(deviceMyAccountPage.timeZoneUpdatedToast).toBeVisible();
  });

  test('[Negative] Verify "Delete Account" Option Is Not Available for Device ID Users @[115339] @device @ui', async () => {
    // open my account
    await deviceMyAccountPage.navigateToMyAccount();

    // verify absence of delete account option
    await expect(deviceMyAccountPage.deleteAccountButton).not.toBeVisible();
  });

  test("Verify Notifications Section Displays for Device ID Users @[115340] @device @ui", async () => {
    // open my account and navigate to notifications
    await deviceMyAccountPage.navigateToNotifications();

    // verify notification section labels
    await expect(deviceMyAccountPage.notificationsHeading).toBeVisible();
    await expect(deviceMyAccountPage.emailLabel).toBeVisible();
    await expect(deviceMyAccountPage.smsLabel).toBeVisible();
    await expect(deviceMyAccountPage.inAppLabel).toBeVisible();

    // toggle notifications and verify toast messages
    await deviceMyAccountPage.toggleNotificationSwitch(0);
    await expect(deviceMyAccountPage.notificationPreferencesUpdatedToast).toBeVisible();
    await deviceMyAccountPage.toggleNotificationSwitch(2);
    await expect(deviceMyAccountPage.notificationPreferencesUpdatedToast).toBeVisible();

    // reset toggles
    await deviceMyAccountPage.toggleNotificationSwitch(0);
    await expect(deviceMyAccountPage.notificationPreferencesUpdatedToast).toBeVisible();
    await deviceMyAccountPage.toggleNotificationSwitch(2);
    await expect(deviceMyAccountPage.notificationPreferencesUpdatedToast).toBeVisible();
  });

  test("Verify Avatar Dropdown Displays Device ID Name and ID @[115539] @device @ui", async ({ page }) => {
    // open avatar dropdown
    await deviceMyAccountPage.profileIconButton.click();

    // verify avatar dropdown displays device name and ID
    await expect(page.getByText(`${TEST_DATA.USER.NAME} ${TEST_DATA.USER.DEVICE_ID}`)).toBeVisible();
    await expect(page.getByText(TEST_DATA.USER.EMAIL)).toBeVisible();
  });

  test("Verify Device ID User Can Upload Profile Photo from My Account Screen @[115540] @device @functional", async () => {
    // open my account
    await deviceMyAccountPage.navigateToMyAccount();

    // upload photo and verify success
    await deviceMyAccountPage.uploadProfilePhoto(TEST_DATA.FILES.PROFILE_PHOTO);
    await expect(deviceMyAccountPage.profilePictureUploadedToast).toBeVisible();

    // cleanup - delete photo
    await deviceMyAccountPage.deleteProfilePhoto();
    await expect(deviceMyAccountPage.profilePictureDeletedToast).toBeVisible();
  });

  test("Verify Device ID User Can Delete Profile Photo from My Account Screen @[115541] @device @functional", async () => {
    // open my account
    await deviceMyAccountPage.navigateToMyAccount();

    // upload photo first
    await deviceMyAccountPage.uploadProfilePhoto(TEST_DATA.FILES.PROFILE_PHOTO);
    await expect(deviceMyAccountPage.profilePictureUploadedToast).toBeVisible();

    // delete photo and verify success
    await deviceMyAccountPage.deleteProfilePhoto();
    await expect(deviceMyAccountPage.profilePictureDeletedToast).toBeVisible();
  });

  test("[Negative] Verify Error When Device ID Already Exists @[115542] @device @functional", async () => {
    // open my account and edit profile
    await deviceMyAccountPage.navigateToMyAccount();
    await deviceMyAccountPage.openEditProfileModal();
    await expect(deviceMyAccountPage.editProfileDetailsHeaderText).toBeVisible();

    // clear fields and verify validation errors
    await deviceMyAccountPage.fillName("");
    await deviceMyAccountPage.fillDeviceId("");
    await expect(deviceMyAccountPage.nameRequiredError).toBeVisible();
    await expect(deviceMyAccountPage.deviceIdRequiredError).toBeVisible();

    // try to save with duplicate device ID (different from test @[115336])
    await deviceMyAccountPage.fillDeviceId(TEST_DATA.EXISTING_DEVICE_IDS.DUPLICATE_2);
    await deviceMyAccountPage.fillName(TEST_DATA.USER.NAME);
    await deviceMyAccountPage.saveChanges();
    await expect(deviceMyAccountPage.profileUpdatedErrorToast).toBeVisible();
    await expect(deviceMyAccountPage.deviceIdExistsError).toBeVisible();
  });
});
