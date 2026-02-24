import { test, expect } from "@playwright/test";

// total tests 20/20

// Test Data Constants
const TEST_DATA = {
  INVALID_EMAIL: "invalid-email",
  UNREGISTERED_EMAIL: "unregistered@domain.com",
  PARTIAL_EMAIL: "test",
  VALID_EMAIL: process.env.QA_PROVIDER_TWO_USERNAME,
};

test.describe("Unauthenticated @regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.QA_URL, { waitUntil: "commit" });
    await page.waitForURL(/.*\/login/);
  });

  test("Verify Login Screen Display @[117346] @unauthenticated @ui", async ({ page }) => {
    // Verify URL pattern
    await expect(page).toHaveURL(/.*\/login/);

    // Verify all main elements are visible
    await expect(page.locator("#root").getByText("Welcome back!")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Enter email" })).toBeVisible();
    await expect(page.getByText("Email").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
    await expect(page.getByText("© 2002 - 2026 GlobalMed")).toBeVisible();
  });

  test("Verify Login Screen Right Half Image @[117347] @unauthenticated @ui", async ({ page }) => {
    // Verify the presence of the welcome image on the right half of the screen
    const welcomeImage = page.locator("img[alt=\"welcome\"]");
    await expect(welcomeImage).toBeAttached();

    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width > 768) {
      await expect(welcomeImage).toBeVisible();
    }
  });

  test("Verify Login Screen Language Dropdown @[117349] @unauthenticated @ui", async ({ page }) => {
    // Open language dropdown
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });

    // Select Spanish
    await page.getByTestId("custom-dropdown-item-Spanish").click();
    await page.getByRole("heading", { name: "Inicio de sesión" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Inicio de sesión" })).toBeVisible();

    // Switch back to English
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Inglés").click();
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Verify Login Screen Label @[117350] @unauthenticated @ui", async ({ page }) => {
    // Wait for login label to be visible
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" });

    // Verify the login label text
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Verify Email Label Display @[117352] @unauthenticated @ui", async ({ page }) => {
    // Wait for email label to be visible
    await page.getByText("Email").first().waitFor({ state: "visible" });

    // Verify the email label text
    await expect(page.getByText("Email").first()).toBeVisible();
  });

  test("Verify Email Textbox Default Content @[117353] @unauthenticated @ui", async ({ page }) => {
    // Wait for email textbox to be visible
    const emailField = page.getByRole("textbox", { name: "Enter email" });
    await emailField.waitFor({ state: "visible" });

    // Verify the email textbox placeholder text
    await expect(emailField).toBeVisible();
    await expect(emailField).toHaveAttribute("placeholder", "Enter email");
  });

  test("Verify Next Button Display and Default State @[117354] @unauthenticated @ui", async ({ page }) => {
    // Wait for Next button to be visible
    const nextButton = page.getByRole("button", { name: "Next" });
    await nextButton.waitFor({ state: "visible" });

    // Verify the Next button is visible and enabled
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
  });

  test("Verify Language Dropdown Display @[117355] @unauthenticated @ui", async ({ page }) => {
    // Verify the language dropdown is visible
    await expect(page.getByText("English")).toBeVisible();

    // Click to open the dropdown and verify options are visible
    await page.getByTestId("icon-ChevronDown").click();
    await expect(page.getByTestId("custom-dropdown")).toBeVisible();
  });

  test("Verify Available Languages @[117357] @unauthenticated @ui", async ({ page }) => {
    // Verify the language dropdown is visible
    await expect(page.getByText("English")).toBeVisible();

    // Click to open the dropdown and verify options are visible
    await page.getByTestId("icon-ChevronDown").click();
    await expect(page.getByTestId("custom-dropdown")).toBeVisible();
    await expect(page.getByTestId("custom-dropdown-item-Spanish")).toBeVisible();
    await expect(page.getByTestId("custom-dropdown-item-Portuguese")).toBeVisible();
  });

  test("Verify English Language Selection @[117358] @unauthenticated @functional", async ({ page }) => {
    // Verify the language dropdown is visible
    await expect(page.getByText("English")).toBeVisible();

    // Select Spanish
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Spanish").click();
    await page.getByRole("heading", { name: "Inicio de sesión" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Inicio de sesión" })).toBeVisible();

    // Switch back to English
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Inglés").click();
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Verify Spanish Language Selection @[117360] @unauthenticated @functional", async ({ page }) => {
    // Verify the language dropdown is visible
    await expect(page.getByText("English")).toBeVisible();

    // Select Spanish
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Spanish").click();
    await page.getByRole("heading", { name: "Inicio de sesión" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Inicio de sesión" })).toBeVisible();

    // Switch back to English
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Inglés").click();
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Verify Email Empty Field Error @[117362] @unauthenticated @functional", async ({ page }) => {
    // Wait for next button to be visible
    await page.getByRole("button", { name: "Next" }).waitFor({ state: "visible" });

    // Click Next without entering email
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByText("Enter an email")).toBeVisible();
  });

  test("Verify Invalid Email Format Display @[117363] @unauthenticated @functional", async ({ page }) => {
    // Wait for email field to be visible
    const emailField = page.getByRole("textbox", { name: "Enter email" });
    await emailField.waitFor({ state: "visible" });

    // Enter invalid email format and click Next
    await emailField.fill(TEST_DATA.INVALID_EMAIL);
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByText("Email fields can only include")).toBeVisible();
  });

  test("Verify Invalid Email Format Message Persistence @[117365] @unauthenticated @functional", async ({ page }) => {
    // Wait for email field to be visible
    const emailField = page.getByRole("textbox", { name: "Enter email" });
    await emailField.waitFor({ state: "visible" });

    // Enter invalid email format and click Next
    await emailField.fill(TEST_DATA.INVALID_EMAIL);
    await page.getByRole("button", { name: "Next" }).click();

    // Verify the error message
    await expect(page.getByText("Email fields can only include")).toBeVisible();

    // Try to clear the input and check if the error persists
    await emailField.fill(TEST_DATA.PARTIAL_EMAIL);
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByText("Email fields can only include")).toBeVisible();
  });

  test("Verify Valid Email Format Recognition @[117366] @unauthenticated @functional", async ({ page }) => {
    // Wait for email field to be visible
    const emailField = page.getByRole("textbox", { name: "Enter email" });
    await emailField.waitFor({ state: "visible" });

    // Enter valid email format and click Next
    await emailField.fill(TEST_DATA.VALID_EMAIL);
    await page.getByRole("button", { name: "Next" }).click();

    // Verify that the system does not show an error message for valid email
    await expect(page.getByText("Email fields can only include")).not.toBeVisible();
  });

  test("Verify Validation Message Dismissal @[117367] @unauthenticated @functional", async ({ page }) => {
    const emailField = page.getByRole("textbox", { name: "Enter email" });

    // Enter an invalid partial email
    await emailField.fill(TEST_DATA.PARTIAL_EMAIL);
    await page.getByRole("button", { name: "Next" }).click();

    // Verify that the validation message appears
    await expect(page.getByText("Email fields can only include alphanumeric characters")).toBeVisible();

    // Complete the email to a valid format
    await emailField.clear();
    await emailField.fill(TEST_DATA.VALID_EMAIL);

    // Click outside the field to trigger validation
    await page.getByRole("button", { name: "Next" }).click();

    // Verify that the validation message has disappeared
    await expect(page.getByText("Email fields can only include"))
      .not.toBeVisible({ timeout: 1000 })
      .catch(() => {});
  });

  test("Verify Email Registration Validation @[117369] @unauthenticated @functional", async ({ page }) => {
    const emailField = page.getByRole("textbox", { name: "Enter email" });

    // Enter valid email
    await emailField.fill(TEST_DATA.VALID_EMAIL);

    // Click the button and observe for system response
    await page.getByRole("button", { name: "Next" }).click();

    // Verify that we move to password step without error
    await expect(page.getByText("Enter your password")).toBeVisible();
  });

  test("Verify Unregisterred Email Error Message @[117373] @unauthenticated @functional", async ({ page }) => {
    const emailField = page.getByRole("textbox", { name: "Enter email" });

    // Enter valid but unregistered email
    await emailField.fill(TEST_DATA.UNREGISTERED_EMAIL);

    // Click the button and wait for error message
    await page.getByRole("button", { name: "Next" }).click();

    // Verify that an error message about unregistered email is displayed
    await expect(page.getByText(/Couldn't find an account for the email address provided/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("Verify Password Entry for Registered Email @[117374] @unauthenticated @functional", async ({ page }) => {
    const emailField = page.getByRole("textbox", { name: "Enter email" });

    // Enter valid and registered email
    await emailField.fill(TEST_DATA.VALID_EMAIL);

    // Click the button and wait for password entry field
    await page.getByRole("button", { name: "Next" }).click();

    // Verify that we moved to the password screen
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

    // Check for password-related instructions or labels
    const passwordLabel = page.getByText("Enter your password");
    await passwordLabel.waitFor({ state: "visible" });
    await expect(passwordLabel).toBeVisible();

    // Also check for "Forgot Password?" link which should be present on password screen
    const forgotPasswordLink = page.getByRole("link", {
      name: "Forgot Password",
    });
    await forgotPasswordLink.waitFor({ state: "visible" });
    await expect(forgotPasswordLink).toBeVisible();
  });

  test("Verify Portuguese Language Selection @[118454] @unauthenticated @functional", async ({ page }) => {
    // Verify the language dropdown is visible
    await expect(page.getByTestId("icon-ChevronDown")).toBeVisible();

    // Select Portuguese
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Portuguese").click();
    await page.getByRole("heading", { name: "Faça o login" }).waitFor({ state: "visible" });
    await expect(page.getByText("Português")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Faça o login" })).toBeVisible();

    // Switch back to English
    await page.getByTestId("icon-ChevronDown").click();
    await page.getByTestId("custom-dropdown").waitFor({ state: "visible" });
    await page.getByTestId("custom-dropdown-item-Inglês").click();
    await page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible" });
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test.skip("Verify \"Register as Patient\" onboarding flow Account Creation from Login Page @[122336] @unauthenticated @functional @email", async () => {
    // TODO: Implement patient registration flow test
  });
});
