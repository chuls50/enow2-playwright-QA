import { test, expect } from "@playwright/test";

// Password - Total Tests 10 (including 1 skipped)

// Test Data Constants
const TEST_DATA = {
  TEST_PASSWORD: "TestPassword123",
  WRONG_PASSWORD: "WrongPassword123",
  CASE_SENSITIVE_PASSWORD: "TESTPASSWORD123!",
};

test.describe("Unauthenticated @regression", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto(process.env.UAT_URL, { waitUntil: "commit" });
    await page.waitForURL(/.*\/login/);

    // Navigate to password step
    const emailField = page.getByRole("textbox", { name: "Enter email" });
    await emailField.fill(process.env.UAT_PATIENT_USERNAME);
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByText("Enter your password").waitFor();
  });

  test("Verify Content on Password Page @[111164] @unauthenticated @ui", async ({ page }) => {
    // Verify all password page elements are visible
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByText("Enter your password")).toBeVisible();
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");
    await expect(passwordInput).toBeVisible();
    await expect(page.getByRole("button", { name: "Eye" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Forgot Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
    await expect(page.getByText("© 2002 - 2026 GlobalMed")).toBeVisible();

    // Test password masking functionality
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Enter a test password
    await passwordInput.fill(TEST_DATA.TEST_PASSWORD);

    // Test eye button toggle
    await page.getByRole("button", { name: "Eye" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await page.getByRole("button", { name: "Eye" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Test forgot password link
    await page.getByRole("link", { name: "Forgot Password" }).click();
    const backToPasswordLink = page.getByText("Back to password page");
    await expect(backToPasswordLink).toBeVisible();
    await backToPasswordLink.click();
  });

  test("Verify Password masking and visibility toggle on Password Page @[111165] @unauthenticated @functional", async ({ page }) => {
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");

    // Verify the password is masked by default
    await expect(passwordInput).toHaveAttribute("type", "password");

    // Enter a test password
    await passwordInput.fill(TEST_DATA.TEST_PASSWORD);

    // Verify password is still masked
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(passwordInput).toHaveValue(TEST_DATA.TEST_PASSWORD);

    // Toggle password visibility and verify it's visible
    await page.getByRole("button", { name: "Eye" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle visibility again and verify it's masked
    await page.getByRole("button", { name: "Eye" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("Verify Log In click with no password on Password Page @[111166] @unauthenticated @functional", async ({ page }) => {
    // Click login without entering password
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify error message
    await expect(page.getByText("Enter a password")).toBeVisible();

    // Verify login button remains enabled
    await expect(page.getByRole("button", { name: "Log In" })).toBeEnabled();
  });

  test("Validate Password complexity on Password Page @[111167] @unauthenticated @functional", async ({ page }) => {
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");

    // Enter valid password and login
    await passwordInput.fill(process.env.UAT_PATIENT_PASSWORD);
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify successful login by checking URL change
    await expect(page).toHaveURL(/.*\/route-me/);
  });

  test("[Negative] Validate Password Complexity on Password Page @[111168] @unauthenticated @functional", async ({ page }) => {
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");

    // Enter invalid password and attempt login
    await passwordInput.fill(TEST_DATA.WRONG_PASSWORD);
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify error message
    const errorMessage = page.getByText("Wrong password. Try again or");
    await errorMessage.waitFor({ state: "visible" });
    await expect(errorMessage).toBeVisible();
  });

  test("Process Log In with Valid Password on Password Page @[111169] @unauthenticated @functional", async ({ page }) => {
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");

    // Login with valid password
    await passwordInput.fill(process.env.UAT_PATIENT_PASSWORD);
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify redirect to expected page
    await expect(page).toHaveURL(/.*\/route-me/);
  });

  test("[Negative] Verify password mismatch on Password Page @[111170] @unauthenticated @functional", async ({ page }) => {
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");

    // Enter invalid password and attempt login
    await passwordInput.fill(TEST_DATA.WRONG_PASSWORD);
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify error message
    await expect(page.getByText("Wrong password. Try again or")).toBeVisible();
  });

  test("[Negative] Verify Case Sensitivity in Passwords on Password Page @[111194] @unauthenticated @functional", async ({ page }) => {
    const passwordInput = page.locator("input[name=\"password\"], input[type=\"password\"]");

    // Try password with different case
    await passwordInput.fill(TEST_DATA.CASE_SENSITIVE_PASSWORD);
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify error message
    await expect(page.getByText("Wrong password. Try again or")).toBeVisible();
  });

  test("Verify Password page updates depending on \"Language\" selected from \"Language dropdown\" @[115394] @unauthenticated @functional", async ({
    page,
  }) => {
    // Verify English is initially selected
    await expect(page.getByText("English")).toBeVisible();

    // Select Spanish
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByText("Spanish").click();
    await page.getByRole("heading", { name: "Inicio de sesión" }).waitFor({ state: "visible" });
    await expect(page.getByText("Español")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Inicio de sesión" })).toBeVisible();
    await page.waitForTimeout(3000); // Wait for UI to update

    // Switch back to English
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Inglés").click();
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" });
    await expect(page.getByText("English")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test.skip("Verify Password page updates to reflect the White Label Configuration settings @[115395] @unauthenticated @functional", async () => {
    // TODO: Implement white label configuration verification
  });
});
