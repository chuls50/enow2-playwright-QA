import { test, expect } from "@playwright/test";
import { LoginPage } from "../../models/pages/shared/login.page.js";

// Device ID Access - Total tests 11

const TEST_DATA = {
  // Device ID test data
  VALID_DEVICE_ID: "33333",
  INVALID_DEVICE_ID: "12345678",
  INVALID_DEVICE_ID_SHORT: "9",
  INVALID_SPECIAL_CHARS: "!@#$%^&*",
  PRODUCT_NAME: "eNOW",
};

test.describe("Device_ID @regression", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoDeviceIdPage();
  });

  test("Verify Device ID Access Screen Layout and Elements @[115016] @device @ui", async ({ page }) => {
    // verify heading
    await expect(loginPage.deviceIdAccessHeading).toBeVisible();

    // verify instructional text
    await expect(page.getByText(`Welcome to ${TEST_DATA.PRODUCT_NAME}! Please enter`)).toBeVisible();
    await expect(page.getByText("Device ID").nth(2)).toBeVisible();

    // verify input field and button
    await expect(loginPage.deviceIdLabelText).toBeVisible();
    await expect(loginPage.deviceIdInput).toBeVisible();
    await expect(loginPage.verifyDeviceIdButton).toBeVisible();
    await expect(loginPage.verifyDeviceIdButton).toBeEnabled();

    // verify footer
    await expect(loginPage.footer).toBeVisible();
  });

  test("Verify Successful and Failed Device ID Verification @[115017] @device @functional", async ({ page }) => {
    // Failed verification
    await loginPage.fillDeviceId(TEST_DATA.INVALID_DEVICE_ID);
    await loginPage.verifyDeviceIdButton.click();
    await expect(loginPage.deviceIdNotFoundError).toBeVisible();

    // Successful verification
    await loginPage.fillDeviceId(TEST_DATA.VALID_DEVICE_ID);
    await loginPage.verifyDeviceIdButton.click();
    await expect(loginPage.welcomeBackText).toBeVisible();
  });

  test("Verify Language Dropdown Opens @[115018] @device @ui", async ({ page }) => {
    // verify language dropdown
    await loginPage.languageDropdownTrigger.click();
    await expect(loginPage.languageDropdown).toBeVisible();
  });

  test("Verify Language Change Updates UI @[115019] @device @functional", async () => {
    // verify language change
    await loginPage.selectLanguage("Spanish");
    await expect(loginPage.deviceIdAccessHeadingSpanish).toBeVisible();

    //reload the page and verify default language is still spanish
    await loginPage.page.reload();
    await expect(loginPage.deviceIdAccessHeadingSpanish).toBeVisible();

    // reset state
    await loginPage.selectLanguage("EnglishFromSpanish");
    await expect(loginPage.deviceIdAccessHeading).toBeVisible();
  });

  test("[Negative] Verify Error When Submitting Blank Device ID @[115020] @device @functional", async ({ page }) => {
    // submit blank
    await loginPage.verifyDeviceIdButton.click();

    // verify error "Device ID is required"
    await expect(loginPage.deviceIdRequiredError).toBeVisible();
  });

  test("[Negative] Verify Device ID With Invalid Format is Rejected @[115021] @device @functional", async ({ page }) => {
    // submit invalid format
    await loginPage.fillDeviceId(TEST_DATA.INVALID_SPECIAL_CHARS);
    await loginPage.verifyDeviceIdButton.click();

    // verify error message
    await expect(loginPage.deviceIdNotFoundError).toBeVisible();
  });

  test("Verify Device ID Link Opens Correct URL With /device @[115022] @device @ui", async () => {
    // verify URL end with /login/device
    await expect(loginPage.page).toHaveURL(/.*\/login\/device/);
  });

  test("Verify Language Setting Persists Across Reload @[115023] @device @functional", async () => {
    // verify language change
    await loginPage.selectLanguage("Spanish");
    await expect(loginPage.deviceIdAccessHeadingSpanish).toBeVisible();

    //reload the page and verify default language is still spanish
    await loginPage.page.reload();
    await expect(loginPage.deviceIdAccessHeadingSpanish).toBeVisible();

    // reset state
    await loginPage.selectLanguage("EnglishFromSpanish");
    await expect(loginPage.deviceIdAccessHeading).toBeVisible();
  });

  test("Verify Login Access via Device ID Link from Admin Panel @[115405] @device @functional", async ({ page }) => {
    // verify device id page elements
    await expect(loginPage.deviceIdAccessHeading).toBeVisible();
    await expect(page.getByText(`Welcome to ${TEST_DATA.PRODUCT_NAME}! Please enter`)).toBeVisible();
    await expect(page.getByText("Device ID").nth(2)).toBeVisible();

    await loginPage.fillDeviceId(TEST_DATA.VALID_DEVICE_ID);
    await expect(loginPage.verifyDeviceIdButton).toBeVisible();
    await expect(loginPage.verifyDeviceIdButton).toBeEnabled();

    await loginPage.verifyDeviceIdButton.click();
    await expect(loginPage.welcomeBackText).toBeVisible();
  });

  test("[Negative] Verify Error Message When Device ID is Not Found for Insititution @[115406] @device @functional", async ({ page }) => {
    // verify device id page elements
    await expect(loginPage.deviceIdAccessHeading).toBeVisible();
    await expect(page.getByText(`Welcome to ${TEST_DATA.PRODUCT_NAME}! Please enter`)).toBeVisible();
    await expect(page.getByText("Device ID").nth(2)).toBeVisible();

    await loginPage.fillDeviceId(TEST_DATA.INVALID_DEVICE_ID_SHORT);
    await expect(loginPage.verifyDeviceIdButton).toBeVisible();
    await expect(loginPage.verifyDeviceIdButton).toBeEnabled();

    await loginPage.verifyDeviceIdButton.click();

    //verify error
    await expect(loginPage.deviceIdNotFoundError).toBeVisible();
  });

  test("Verify Redirection to Device ID Dashboard Upon Successful Login @[115407] @device @functional", async ({ page }) => {
    // verify device id page elements
    await expect(loginPage.deviceIdAccessHeading).toBeVisible();
    await expect(page.getByText(`Welcome to ${TEST_DATA.PRODUCT_NAME}! Please enter`)).toBeVisible();
    await expect(page.getByText("Device ID").nth(2)).toBeVisible();

    await loginPage.fillDeviceId(TEST_DATA.VALID_DEVICE_ID);
    await expect(loginPage.verifyDeviceIdButton).toBeVisible();
    await expect(loginPage.verifyDeviceIdButton).toBeEnabled();

    await loginPage.verifyDeviceIdButton.click();
    await expect(loginPage.welcomeBackText).toBeVisible();

    //wait for url to go from /route-me to /dashboard
    await page.waitForURL("**/dashboard");
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
