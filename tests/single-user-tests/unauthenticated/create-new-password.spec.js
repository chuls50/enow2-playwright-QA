import { test, expect } from "@playwright/test";
import { CreateNewPasswordPage } from "../../models/pages/shared/create-new-password.page.js";

// Create New Password - Total Tests 10

const TEST_PASSWORDS = {
  // Valid password scenarios
  VALID: "ValidPassword123!",
  MISMATCH: "DifferentPass123!",

  // Invalid password scenarios
  SHORT: "Short1!",
  NO_UPPERCASE: "validpass123!",
  NO_LOWERCASE: "VALIDPASS123!",
  NO_NUMBER: "ValidPassword!",
  NO_SPECIAL_CHAR: "ValidPass123",
};

test.describe("Unauthenticated @regression", () => {
  let createNewPasswordPage;

  test.beforeEach(async ({ page }) => {
    createNewPasswordPage = new CreateNewPasswordPage(page);
    await createNewPasswordPage.navigateToChangePassword();
  });

  test('Verify Content on "Create New Password" Page @[114524] @unauthenticated @ui', async () => {
    // Verify all elements on Create New Password page are visible
    await expect(createNewPasswordPage.pageHeading).toBeVisible();
    await expect(createNewPasswordPage.rememberText).toBeVisible();
    await expect(createNewPasswordPage.newPasswordLabel).toBeVisible();
    await expect(createNewPasswordPage.newPasswordFieldLabel).toBeVisible();
    await expect(createNewPasswordPage.passwordInput).toBeVisible();
    await expect(createNewPasswordPage.requirementMinLength).toBeVisible();
    await expect(createNewPasswordPage.requirementUppercase).toBeVisible();
    await expect(createNewPasswordPage.requirementLowercase).toBeVisible();
    await expect(createNewPasswordPage.requirementNumber).toBeVisible();
    await expect(createNewPasswordPage.requirementSpecialChar).toBeVisible();
    await expect(createNewPasswordPage.confirmPasswordLabel).toBeVisible();
    await expect(createNewPasswordPage.confirmPasswordInput).toBeVisible();
    await expect(createNewPasswordPage.newPasswordButton).toBeVisible();
    await expect(createNewPasswordPage.footer).toBeVisible();
  });

  test('Verify password visibility toggle on "Create New Password" Page @[114526] @unauthenticated @functional', async () => {
    await expect(createNewPasswordPage.passwordInput).toHaveAttribute("type", "password");
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveAttribute("type", "password");

    await createNewPasswordPage.passwordVisibilityToggle.click();
    await expect(createNewPasswordPage.passwordInput).toHaveAttribute("type", "text");

    await createNewPasswordPage.confirmPasswordVisibilityToggle.click();
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveAttribute("type", "text");
  });

  test('Verify functionality on "Create New Password" Page @[114527] @unauthenticated @functional', async () => {
    // Enter a valid new password
    await createNewPasswordPage.passwordInput.fill(TEST_PASSWORDS.VALID);
    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.VALID);

    // Enter a valid confirm password
    await createNewPasswordPage.confirmPasswordInput.fill(TEST_PASSWORDS.VALID);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.VALID);

    // Verify the submit button is enabled
    await expect(createNewPasswordPage.newPasswordButton).toBeEnabled();

    // Verify that all requirement fail icons are not visible (password meets all requirements)
    await expect(createNewPasswordPage.minLengthFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.uppercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.lowercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.numberFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.specialCharFailIcon).not.toBeVisible();
  });

  test("[Negative] Verify change password requirements - (password too short) @[114528] @unauthenticated @functional", async () => {
    // Enter an invalid new password (too short)
    await createNewPasswordPage.fillBothPasswords(TEST_PASSWORDS.SHORT, TEST_PASSWORDS.SHORT);
    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.SHORT);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.SHORT);

    // Verify that only the minimum length requirement fails
    await expect(createNewPasswordPage.minLengthFailIcon).toBeVisible();
    await expect(createNewPasswordPage.uppercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.lowercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.numberFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.specialCharFailIcon).not.toBeVisible();

    // Submit the form
    await createNewPasswordPage.newPasswordButton.click();

    // Verify the error message is displayed
    await expect(createNewPasswordPage.passwordRequirementsError).toBeVisible();
  });

  test("[Negative] Verify change password requirements - (missing uppercase letter) @[114529] @unauthenticated @functional", async () => {
    // Enter an invalid new password (missing uppercase letter)
    await createNewPasswordPage.fillBothPasswords(TEST_PASSWORDS.NO_UPPERCASE, TEST_PASSWORDS.NO_UPPERCASE);
    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.NO_UPPERCASE);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.NO_UPPERCASE);

    // Verify that only the uppercase requirement fails
    await expect(createNewPasswordPage.uppercaseFailIcon).toBeVisible();
    await expect(createNewPasswordPage.minLengthFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.lowercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.numberFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.specialCharFailIcon).not.toBeVisible();

    // Submit the form
    await createNewPasswordPage.newPasswordButton.click();

    // Verify the error message is displayed
    await expect(createNewPasswordPage.passwordRequirementsError).toBeVisible();
  });

  test("[Negative] Verify change password requirements - (missing lowercase letter) @[114530] @unauthenticated @functional", async () => {
    // Enter an invalid new password (missing lowercase letter)
    await createNewPasswordPage.fillBothPasswords(TEST_PASSWORDS.NO_LOWERCASE, TEST_PASSWORDS.NO_LOWERCASE);
    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.NO_LOWERCASE);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.NO_LOWERCASE);

    // Verify that only the lowercase requirement fails
    await expect(createNewPasswordPage.lowercaseFailIcon).toBeVisible();
    await expect(createNewPasswordPage.minLengthFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.uppercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.numberFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.specialCharFailIcon).not.toBeVisible();

    // Submit the form
    await createNewPasswordPage.newPasswordButton.click();

    // Verify the error message is displayed
    await expect(createNewPasswordPage.passwordRequirementsError).toBeVisible();
  });

  test("[Negative] Verify change password requirements - (missing number) @[114531] @unauthenticated @functional", async () => {
    // Enter an invalid new password (missing number)
    await createNewPasswordPage.fillBothPasswords(TEST_PASSWORDS.NO_NUMBER, TEST_PASSWORDS.NO_NUMBER);
    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.NO_NUMBER);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.NO_NUMBER);

    // Verify that only the number requirement fails
    await expect(createNewPasswordPage.numberFailIcon).toBeVisible();
    await expect(createNewPasswordPage.minLengthFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.uppercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.lowercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.specialCharFailIcon).not.toBeVisible();

    // Submit the form
    await createNewPasswordPage.newPasswordButton.click();

    // Verify the error message is displayed
    await expect(createNewPasswordPage.passwordRequirementsError).toBeVisible();
  });

  test("[Negative] Verify change password requirements - (missing special character) @[114532] @unauthenticated @functional", async () => {
    // Enter an invalid new password (missing special character)
    await createNewPasswordPage.fillBothPasswords(TEST_PASSWORDS.NO_SPECIAL_CHAR, TEST_PASSWORDS.NO_SPECIAL_CHAR);
    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.NO_SPECIAL_CHAR);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.NO_SPECIAL_CHAR);

    // Verify that only the special character requirement fails
    await expect(createNewPasswordPage.specialCharFailIcon).toBeVisible();
    await expect(createNewPasswordPage.minLengthFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.uppercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.lowercaseFailIcon).not.toBeVisible();
    await expect(createNewPasswordPage.numberFailIcon).not.toBeVisible();

    // Submit the form
    await createNewPasswordPage.newPasswordButton.click();

    // Verify the error message is displayed
    await expect(createNewPasswordPage.passwordRequirementsError).toBeVisible();
  });

  test('[Negative] Verify password mismatch validation on "Create New Password" Page @[111178] @unauthenticated @functional', async () => {
    // Enter a valid new password but mismatched confirm password
    await createNewPasswordPage.passwordInput.fill(TEST_PASSWORDS.VALID);
    await createNewPasswordPage.confirmPasswordInput.fill(TEST_PASSWORDS.MISMATCH);

    await expect(createNewPasswordPage.passwordInput).toHaveValue(TEST_PASSWORDS.VALID);
    await expect(createNewPasswordPage.confirmPasswordInput).toHaveValue(TEST_PASSWORDS.MISMATCH);

    // Submit the form
    await createNewPasswordPage.newPasswordButton.click();

    // Verify that the mismatch error message is displayed
    await expect(createNewPasswordPage.passwordMismatchError).toBeVisible();
  });

  test.skip("Verify Time Pass Functionality on Password Changed Page @[111177] @unauthenticated @functional @email", async () => {});
});
