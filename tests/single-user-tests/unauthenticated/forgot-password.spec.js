import { test, expect } from "@playwright/test";
import { LoginPage } from "../../models/pages/shared/login.page.js";

// Forgot Password - Total Tests 8

const TEST_DATA = {
  PATIENT_EMAIL: process.env.QA_PATIENT_ONE_USERNAME,
};

test.describe("Unauthenticated @regression", () => {
  let loginPage;

  // Initialize LoginPage before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // Verify all main elements are visible on Forgot Password page
  test("Verify Content on Forgot Password Page @[114517] @unauthenticated @ui", async ({ page }) => {
    await loginPage.navigateToForgotPasswordPage(TEST_DATA.PATIENT_EMAIL);
    await expect(loginPage.forgotPasswordHeading).toBeVisible();
    await expect(page.getByText(TEST_DATA.PATIENT_EMAIL)).toBeVisible();
    await expect(loginPage.sendEmailButton).toBeVisible();
    await expect(loginPage.backToPasswordLink).toBeVisible();
    await expect(loginPage.footer).toBeVisible();
  });

  // Check Forgot Password link is enabled and navigates correctly
  test("Verify Forgot Password Link on Password Page @[111171] @unauthenticated @ui", async ({ page }) => {
    await loginPage.navigateToPasswordStep(TEST_DATA.PATIENT_EMAIL);
    await expect(loginPage.forgotPasswordLink).toBeEnabled();
    await loginPage.forgotPasswordLink.click();
    await loginPage.page.waitForURL(/.*\/forgot-password/);
    await expect(loginPage.forgotPasswordHeading).toBeVisible();
  });

  // Ensure Back to Password link works from Forgot Password page
  test("Verify Back to Password Page Link on Forgot Password Page @[111172] @unauthenticated @functional", async ({ page }) => {
    await loginPage.navigateToForgotPasswordPage(TEST_DATA.PATIENT_EMAIL);
    await expect(loginPage.backToPasswordLink).toBeVisible();
    await loginPage.backToPasswordLink.click();
    await loginPage.page.waitForURL(/.*\/login/);
    await expect(loginPage.passwordInput).toBeVisible();
  });

  // Test submission button functionality on Forgot Password page
  test("Verify the submission button on Forgot Password Page @[111173] @unauthenticated @functional", async ({ page }) => {
    await loginPage.navigateToForgotPasswordPage(TEST_DATA.PATIENT_EMAIL);
    await loginPage.sendEmailButton.click();
    await loginPage.page.waitForURL(/.*\/password-reset-confirmation/);
    await loginPage.confirmationHeading.waitFor();
    await expect(loginPage.confirmationHeading).toBeVisible();
  });

  test("Verify the Resend Link on Forgot Password Page @[111174] @unauthenticated @functional @email", async ({ page }) => {
    await loginPage.navigateToForgotPasswordPage(TEST_DATA.PATIENT_EMAIL);
    await loginPage.sendEmailButton.click();
    await loginPage.page.waitForURL(/.*\/password-reset-confirmation/);
    await expect(loginPage.confirmationHeading).toBeVisible();
    await loginPage.resendLink.click();
    await expect(loginPage.resendLinkConfirmation).toBeVisible();
  });

  test.skip("Verify the Verification Link in Users Email @[111175] @unauthenticated @functional", async ({ page }) => {});

  // Check redirect on Forgot Password link from Password page
  test("Verify redirect on Forgot Password? link click on Password Page @[111184] @unauthenticated @functional", async ({ page }) => {
    await loginPage.navigateToPasswordStep(TEST_DATA.PATIENT_EMAIL);
    await loginPage.forgotPasswordLink.click();
    await loginPage.page.waitForURL(/.*\/forgot-password/);
    await expect(loginPage.forgotPasswordHeading).toBeVisible();
  });

  test.skip("Verify Creation of a New Password that matches old password @[111518] @unauthenticated @functional @email", async () => {});
});
