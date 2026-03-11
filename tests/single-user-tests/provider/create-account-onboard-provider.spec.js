import { test, expect } from "@playwright/test";
import { EndUserLicenseAgreementPage } from "../../models/pages/shared/end-user-license-agreement.page.js";
import { BeforeWeGetStartedPage } from "../../models/pages/shared/before-we-get-started.page.js";
import { ROLES, useRole } from "../../utils/auth-helpers.js";

// Test Data Constants
const TEST_DATA = {
  VALIDATION: {
    VALID_NAMES: {
      FIRST: "Cody",
      FIRST_WITH_CHARS: "cody.-cody",
      LAST: "ProviderOne",
      LAST_WITH_CHARS: "ProviderOne.-ProviderOne",
    },
    INVALID_NAMES: {
      FIRST: "@#$%^&*()",
      LAST: "@#$%^&*()",
    },
  },
};

test.describe("Provider - English @regression", () => {
  test.use(useRole(ROLES.PROVIDER));
  let eulaPage;
  let onboardingPage;

  test.beforeEach(async ({ page }) => {
    eulaPage = new EndUserLicenseAgreementPage(page);
    onboardingPage = new BeforeWeGetStartedPage(page);
  });

  test("English - Verify the presence of web elements and texts on the EULA page @[112495] @provider @ui", async ({ page }) => {
    await eulaPage.navigateToEula();

    // Verify EULA page elements using POM
    await expect(eulaPage.pageTitle).toBeVisible();
    await expect(eulaPage.acceptButton).toBeVisible();
    await expect(eulaPage.declineButton).toBeVisible();
  });

  // declining the EULA will log you out and interfere with the saved storage state
  test.skip('Verify the "Decline" button functionality on the EULA page @[112501] @provider @functional', async ({ page }) => {});

  test('Verify the "Accept" Button functionality on "End User License Agreement" @[112500] @provider @functional', async ({ page }) => {
    await eulaPage.navigateToEula();
    await eulaPage.changeLanguageToEnglish();
    await eulaPage.acceptEula();
    await page.waitForURL("**/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("Verify the elements and appearance of the Before we get started form @[112494] @provider @ui", async () => {
    await onboardingPage.navigateToOnboarding();

    // Verify page elements using POM
    await expect(onboardingPage.pageTitle).toBeVisible();
    await expect(onboardingPage.firstNameLabel).toBeVisible();
    await expect(onboardingPage.lastNameLabel).toBeVisible();

    // Verify pre-filled values
    const firstNameValue = await onboardingPage.firstNameInput.inputValue();
    await expect(onboardingPage.firstNameInput).toHaveValue(firstNameValue);

    const lastNameValue = await onboardingPage.lastNameInput.inputValue();
    await expect(onboardingPage.lastNameInput).toHaveValue(lastNameValue);

    // Verify provider-specific elements
    await expect(onboardingPage.languagesSpokenHeading).toBeVisible();
    await expect(onboardingPage.medicalSpecialtyLabel).toBeVisible();
    await expect(onboardingPage.licensesToPracticeHeading).toBeVisible();
    await expect(onboardingPage.timezoneHeading).toBeVisible();
    await expect(onboardingPage.changeTimezoneLink).toBeVisible();
    await expect(onboardingPage.getStartedButton).toBeVisible();
  });

  test("Verify the validation of the First name field on the Before we get started page @[112511] @provider @functional", async () => {
    await onboardingPage.navigateToOnboarding();

    // Verify page elements using POM
    await expect(onboardingPage.pageTitle).toBeVisible();
    await expect(onboardingPage.firstNameLabel).toBeVisible();
    await expect(onboardingPage.lastNameLabel).toBeVisible();

    // Test required field validation
    await onboardingPage.firstNameInput.click();
    await onboardingPage.clearFirstName();

    // Trigger validation by clicking elsewhere
    await onboardingPage.lastNameInput.click();
    await expect(onboardingPage.firstNameRequiredError).toBeVisible();

    // Test invalid characters
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.INVALID_NAMES.FIRST);
    await expect(onboardingPage.firstNameValidationError).toBeVisible();

    // Test valid inputs
    await onboardingPage.clearFirstName();
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.VALID_NAMES.FIRST_WITH_CHARS);
    await expect(onboardingPage.firstNameValidationError).not.toBeVisible();

    await onboardingPage.clearFirstName();
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.VALID_NAMES.FIRST);
    await expect(onboardingPage.firstNameValidationError).not.toBeVisible();
  });

  test("Verify the validation of the Last name field on the Before we get started page @[112513] @provider @functional", async () => {
    await onboardingPage.navigateToOnboarding();

    // Verify page elements using POM
    await expect(onboardingPage.pageTitle).toBeVisible();
    await expect(onboardingPage.firstNameLabel).toBeVisible();
    await expect(onboardingPage.lastNameLabel).toBeVisible();

    // Test last name validation using POM method
    await onboardingPage.validateLastNameField(TEST_DATA.VALIDATION.VALID_NAMES.LAST, TEST_DATA.VALIDATION.INVALID_NAMES.LAST);

    // Verify validation messages
    await expect(onboardingPage.lastNameRequiredError).toBeVisible();
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.INVALID_NAMES.LAST);
    await expect(onboardingPage.lastNameValidationError).toBeVisible();

    // Test valid inputs
    await onboardingPage.clearLastName();
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.VALID_NAMES.LAST_WITH_CHARS);
    await expect(onboardingPage.lastNameValidationError).not.toBeVisible();

    await onboardingPage.clearLastName();
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.VALID_NAMES.LAST);
    await expect(onboardingPage.lastNameValidationError).not.toBeVisible();
  });

  test("Verify the validation of languages spoken dropdown on Before we get started @[112512] @provider @functional", async ({ page }) => {
    await onboardingPage.navigateToOnboarding();

    // click spoken language dropdown
    await page.getByRole("textbox", { name: "Select languages" }).click();
    await expect(page.getByRole("main").getByTestId("custom-dropdown")).toBeVisible();
    await page.getByRole("textbox", { name: "Select languages" }).click();

    // remove english tag
    await page
      .locator("div")
      .filter({ hasText: /^Languages spokenLanguages spokenEnglish$/ })
      .getByRole("button")
      .click();

    // verify error message
    await expect(page.getByText("At least one language is")).toBeVisible();
  });

  test("Verify the validation of licenses to practice section on the Before we get started page @[112514] @provider @functional", async ({
    page,
  }) => {
    await onboardingPage.navigateToOnboarding();

    // remove selected specialties to trigger validation
    await page
      .locator("div")
      .filter({ hasText: /^Angiologist$/ })
      .getByRole("button")
      .click();
    await page
      .locator("div")
      .filter({ hasText: /^Allergologist$/ })
      .getByRole("button")
      .click();

    // verify error message
    await expect(page.getByText("At least one medical")).toBeVisible();
  });

  test("Verify the validation of the Medical specialty drop down list on the Before we get started page @[112515] @provider @functional", async ({
    page,
  }) => {
    await onboardingPage.navigateToOnboarding();

    // select medical specialty
    await page.getByRole("textbox", { name: "Select medical specialities" }).click();
    await page.getByTestId("custom-dropdown-item-Cardiologist").click();
    await expect(page.getByTestId("tag").nth(2)).toBeVisible();

    // remove selected specialty
    await page.getByRole("button", { name: "XClose" }).nth(2).click();
    await page.getByRole("textbox", { name: "Select medical specialities" }).click();
    await expect(page.getByText("Cardiologist")).not.toBeVisible();

    // remove remaining specialties to trigger validation
    await page
      .locator("div")
      .filter({ hasText: /^Angiologist$/ })
      .getByRole("button")
      .click();
    await page.getByRole("button", { name: "XClose" }).first().click();

    // verify error message
    await expect(page.getByText("At least one medical")).toBeVisible();
  });

  test("Verify Functionality of the Timezone section on Before we get started page @[112517] @provider @functional", async ({ page }) => {
    await onboardingPage.navigateToOnboarding();

    // change timezone
    await page.getByRole("link", { name: "Change time zone" }).click();
    await page.getByText("Automatic time zone").click();
    await expect(page.getByRole("button", { name: "Save changes" })).toBeEnabled();
  });

  test("Verify Adding and Discarding Licenses on the Before we get started page @[112516] @provider @functional", async ({ page }) => {
    await onboardingPage.navigateToOnboarding();

    // add license
    await page.getByRole("link", { name: "Plus Add license" }).click();

    await page.getByTestId("custom-select-item-wrapper").nth(5).click();
    await page.getByTestId("custom-dropdown-item-Albania").click();
    await page.getByTestId("custom-select-item-wrapper").nth(6).click();
    await page.getByTestId("custom-dropdown-item-Berat").click();
    await expect(page.getByText("CountryAlbania")).toBeVisible();
    await expect(page.getByText("StateBerat")).toBeVisible();
    await page.getByRole("link", { name: "Remove License" }).click();

    // verify license removed
    await expect(page.getByText("CountryAlbania")).not.toBeVisible();
    await expect(page.getByText("StateBerat")).not.toBeVisible();
  });

  test("[Negative] Verify the validation of the First name field on Before we get started page @[112507] @provider @functional", async ({}) => {
    await onboardingPage.navigateToOnboarding();

    // Test required field validation
    await expect(onboardingPage.firstNameLabel).toBeVisible();

    // Test first name validation with invalid characters
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.INVALID_NAMES.FIRST);
    await expect(onboardingPage.firstNameValidationError).toBeVisible();

    // Test valid input with special characters
    await onboardingPage.clearFirstName();
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.VALID_NAMES.FIRST_WITH_CHARS);
    await expect(onboardingPage.firstNameValidationError).not.toBeVisible();

    // Test invalid input with numbers
    await onboardingPage.clearFirstName();
    await onboardingPage.fillFirstName("123456789");
    await expect(onboardingPage.firstNameValidationError).toBeVisible();

    // Test valid input
    await onboardingPage.clearFirstName();
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.VALID_NAMES.FIRST);
    await expect(onboardingPage.firstNameValidationError).not.toBeVisible();
  });

  test("[Negative] Verify the validation of the Last name field on the Before we get started page @[112508] @provider @functional @e2e", async ({}) => {
    await onboardingPage.navigateToOnboarding();

    // Test required field validation
    await expect(onboardingPage.lastNameLabel).toBeVisible();
    await onboardingPage.lastNameInput.click();
    await onboardingPage.clearLastName();
    await expect(onboardingPage.lastNameRequiredError).toBeVisible();

    // Test invalid characters
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.INVALID_NAMES.LAST);
    await expect(onboardingPage.lastNameValidationError).toBeVisible();

    // Test valid input with special characters
    await onboardingPage.clearLastName();
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.VALID_NAMES.LAST_WITH_CHARS);
    await expect(onboardingPage.lastNameValidationError).not.toBeVisible();

    // Test valid input
    await onboardingPage.clearLastName();
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.VALID_NAMES.LAST);
    await expect(onboardingPage.lastNameValidationError).not.toBeVisible();
  });

  test("[Negative] Verify the validation of Languages spoken drop down list on the Before we get started page @[112509] @provider @functional", async ({
    page,
  }) => {
    await onboardingPage.navigateToOnboarding();

    // click spoken language dropdown
    await page.getByRole("textbox", { name: "Select languages" }).click();
    await expect(page.getByRole("main").getByTestId("custom-dropdown")).toBeVisible();
    await page.getByRole("textbox", { name: "Select languages" }).click();

    // remove english tag
    await page
      .locator("div")
      .filter({ hasText: /^Languages spokenLanguages spokenEnglish$/ })
      .getByRole("button")
      .click();

    // verify error message
    await expect(page.getByText("At least one language is")).toBeVisible();
  });

  test("[Negative] Verify the validation of the Medical specialty drop down list on the Before we get started page @[112510] @provider @functional", async ({
    page,
  }) => {
    await onboardingPage.navigateToOnboarding();

    // remove selected specialties to trigger validation
    await page
      .locator("div")
      .filter({ hasText: /^Angiologist$/ })
      .getByRole("button")
      .click();
    await page
      .locator("div")
      .filter({ hasText: /^Allergologist$/ })
      .getByRole("button")
      .click();

    // verify error message
    await expect(page.getByText("At least one medical")).toBeVisible();
  });

  test("Verify Successful Form Submission and Redirection to Dashboard @[112502] @provider @functional", async ({ page }) => {
    await onboardingPage.navigateToOnboarding();

    // make sure first name is 'Cody'
    await onboardingPage.clearFirstName();
    await onboardingPage.fillFirstName(TEST_DATA.VALIDATION.VALID_NAMES.FIRST);

    // make sure last name is 'ProviderOne'
    await onboardingPage.clearLastName();
    await onboardingPage.fillLastName(TEST_DATA.VALIDATION.VALID_NAMES.LAST);

    // click 'Get Started' button
    await expect(onboardingPage.getStartedButton).toBeVisible();
    await expect(onboardingPage.getStartedButton).toBeEnabled();
    await onboardingPage.getStartedButton.click();

    // verify dashboard
    await page.waitForURL("**/dashboard");
    await expect(page).toHaveURL(/\/dashboard/);
  });
});

// Will need separate accounts for Spanish Provider
// Skip for now
test.describe("Provider - Spanish @regression", () => {
  let eulaPage;
  let onboardingPage;

  test.beforeEach(async ({ page }) => {
    eulaPage = new EndUserLicenseAgreementPage(page);
    onboardingPage = new BeforeWeGetStartedPage(page);
  });

  test.skip('[Spanish] Verify the elements and appearence of the "Antes de empezar" form @[112496] @provider @functional', async ({
    page,
  }) => {});

  test.skip("Spanish - Verify the presence of web elements and texts on the Acuerdo de licencia de usuario final page @[112497] @provider @functional", async ({
    page,
  }) => {});

  test.skip('[Negative] [Spanish] Verify the validation of the "Apellido" field on the "Antes de empezar" page @[112518] @provider @functional', async ({
    page,
  }) => {});

  test.skip('[Negative] [Spanish] Verify the validation of the "Nombre" field on the "Antes de empezar" page @[112519] @provider @functional', async ({
    page,
  }) => {});

  test.skip('Spanish - Verify Clicking the "Aceptar" Button on the "Acuerdo de Licencia de Usuario Final" Page @[112520] @provider @functional', async ({
    page,
  }) => {});

  test.skip('Spanish_Verify the positive scenario of filling all the fields in and redirecting to the "Dashboard" page @[112522] @provider @functional', async ({
    page,
  }) => {});

  test.skip('Spanish - Verify the "Rechazar" button functionality on the "Acuerdo de licencia de usuario final" page @[112521] @provider @functional', async ({
    page,
  }) => {});
});
