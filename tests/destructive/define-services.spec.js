import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsServicesPage } from "../models/pages/admin/institution-settings-services.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

const TEST_DATA = {
  PROVIDERS: {
    PROVIDER_ONE: "Cody ProviderOne",
  },
  SERVICES: {
    GENERAL_PRACTICE: "General Practice",
    GENERAL_DIETICIAN: "General Dietician",
    NO_PROVIDERS: "No Providers",
  },
  VALIDATION: {
    INVALID_SPECIAL_CHARS: "$%^&*()_+",
    INVALID_SYMBOLS: "@#$%^&*",
  },
};

// // Configure file to run tests in serial
// test.describe.configure({ mode: "serial" });

// Define Services - Total tests: 23 (including 3 skipped tests)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsServicesPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsServicesPage = new AdminInstitutionSettingsServicesPage(page);
    await adminInstitutionSettingsServicesPage.navigateToServiceSettings();
  });

  test("Verify Services & Payments page displays correctly @[112159] @admin @ui", async () => {
    // Verify UI elements of Services & Payments page
    await expect(adminInstitutionSettingsServicesPage.pageHeading).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.addServiceButton).toBeVisible();
  });

  test('Verify toggling "Fee Enabled" switch @[111373] @admin @functional', async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Toggle fee enabled and verify save button state
    await adminInstitutionSettingsServicesPage.feeEnabledSwitch.click();
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsServicesPage.feeEnabledSwitch.click();
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();
  });

  test("Verify the add service tab displays correctly @[112160] @admin @ui", async () => {
    // open add service tab
    await adminInstitutionSettingsServicesPage.openAddServiceSection();
    await expect(adminInstitutionSettingsServicesPage.specialtyDropdownRequiredText).toBeVisible();

    // close add service tab
    await adminInstitutionSettingsServicesPage.cancelAddService();
    await expect(adminInstitutionSettingsServicesPage.specialtyDropdownRequiredText).not.toBeVisible();
  });

  test("Verify entering text in Service Name field @[112162] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    await adminInstitutionSettingsServicesPage.fillServiceName(TEST_DATA.VALIDATION.INVALID_SPECIAL_CHARS, 0);
    await adminInstitutionSettingsServicesPage.saveChangesButton.click();
    await expect(adminInstitutionSettingsServicesPage.errorMessage).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.validationErrorMessage).toBeVisible();

    await adminInstitutionSettingsServicesPage.clearField("name", 0);
    await expect(adminInstitutionSettingsServicesPage.requiredFieldError).toBeVisible();

    // // Fill service name with timestamp and save
    // await adminInstitutionSettingsServicesPage.fillServiceName(TEST_DATA.SERVICES.GENERAL_DIETICIAN, 0, true);
    // await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();
    // await adminInstitutionSettingsServicesPage.saveChangesButton.click();
    // await adminInstitutionSettingsServicesPage.successMessage.waitFor({ state: "visible" });
    // await expect(adminInstitutionSettingsServicesPage.successMessage).toBeVisible();

    // // Clear and fill with regular name
    // await adminInstitutionSettingsServicesPage.clearField("name", 0);
    // await adminInstitutionSettingsServicesPage.fillServiceName(TEST_DATA.SERVICES.GENERAL_PRACTICE, 0);
    // await adminInstitutionSettingsServicesPage.saveChangesButton.click();
    // await adminInstitutionSettingsServicesPage.successMessage.waitFor({ state: "visible" });
    // await expect(adminInstitutionSettingsServicesPage.successMessage).toBeVisible();
  });

  test("Verify entering text in Description field @[112163] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Test invalid characters
    await adminInstitutionSettingsServicesPage.fillDescription(TEST_DATA.VALIDATION.INVALID_SYMBOLS, 0);
    await adminInstitutionSettingsServicesPage.saveChangesButton.click();
    await expect(adminInstitutionSettingsServicesPage.errorToast).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.validationErrorMessage).toBeVisible();

    // Clear field and verify save button is disabled
    await adminInstitutionSettingsServicesPage.clearField("description", 0);
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();
  });

  test("Verify specialty dropdown functionality @[112164] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Select first specialty dropdown, verify selection closes dropdown
    await adminInstitutionSettingsServicesPage.specialtyDropdown.click();
    await expect(adminInstitutionSettingsServicesPage.specialtyDropdownItemsWrapper).toBeVisible();
    await adminInstitutionSettingsServicesPage.specialtyGeneralPractitionerItem.click();
    await expect(adminInstitutionSettingsServicesPage.specialtyDropdownItemsWrapper).not.toBeVisible();
  });

  test("Verify toggling Service Enabled switch @[112165] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Toggle service enabled and verify save button state
    await adminInstitutionSettingsServicesPage.serviceEnabledSwitch.click();
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsServicesPage.serviceEnabledSwitch.click();
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();
  });

  test("Verify toggling Allow Encounter Now switch @[114080] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Toggle allow encounter now and verify save button state
    await adminInstitutionSettingsServicesPage.allowEncounterNowSwitch.click();
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsServicesPage.allowEncounterNowSwitch.click();
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();
  });

  test('Validate "Manage Providers" @[112166] @admin @functional', async ({ page }) => {
    // Filter by "Inactive"
    await page.getByText("Active").click();
    await page.getByText("Inactive").click();

    // Open "No Providers" service for editing
    await page.getByText(TEST_DATA.SERVICES.NO_PROVIDERS).click();

    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).last().click();

    // If getByRole('button', { name: 'Trash' }) is visible then click it
    await page.waitForTimeout(1000);
    await adminInstitutionSettingsServicesPage.removeProvider();
    await page.waitForTimeout(1000);

    // Add a provider ('Cody ProviderOne') to the service and verify success message
    await page.getByRole("textbox", { name: "Select Provider" }).click();
    await page.getByTestId(`item ${TEST_DATA.PROVIDERS.PROVIDER_ONE}`).click();
    await page.getByRole("button", { name: "Add Provider" }).click();
    await expect(page.getByTestId("toast").getByText(TEST_DATA.PROVIDERS.PROVIDER_ONE)).toBeVisible();

    // Close Modal and reopen to verify provider is added to the list
    await page.getByRole("button", { name: "XClose" }).click();
    await page.getByRole("button", { name: "Provider List" }).last().click();
    await expect(page.getByTestId("cell-0-name")).toContainText(TEST_DATA.PROVIDERS.PROVIDER_ONE);

    // Reset state by removing provider
    await page.getByRole("button", { name: "Trash" }).click();
    await expect(page.getByTestId("toast").getByText(TEST_DATA.PROVIDERS.PROVIDER_ONE).first()).toBeVisible();
  });

  // one way door
  test.skip('Verify complete "Add service" creation workflow @[112167] @admin @functional', async () => {});

  test("[Negative] Test entering invalid Service Name @[112168] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Test invalid characters in service name
    await adminInstitutionSettingsServicesPage.fillServiceName(TEST_DATA.VALIDATION.INVALID_SPECIAL_CHARS, 0);
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsServicesPage.saveChangesButton.click();
    await expect(adminInstitutionSettingsServicesPage.errorMessage).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.validationErrorMessage).toBeVisible();

    // Test empty field
    await adminInstitutionSettingsServicesPage.clearField("name", 0);
    await expect(adminInstitutionSettingsServicesPage.requiredFieldError).toBeVisible();
  });

  // flaky
  test.skip('[Negative] Test entering invalid "Fee price" @[112169] @admin @functional', async () => {});

  test("[Negative] Verify Duplicate Provider Selection @[112170] @admin @functional", async ({ page }) => {
    // Filter by "Inactive"
    await page.getByText("Active").click();
    await page.getByText("Inactive").click();

    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.NO_PROVIDERS).click();
    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).last().click();

    // remove provider if visible to reset state
    await adminInstitutionSettingsServicesPage.removeProvider();

    // Add a provider ('Cody ProviderOne') to the service and verify success message
    await page.getByRole("textbox", { name: "Select Provider" }).click();
    await page.getByTestId(`item ${TEST_DATA.PROVIDERS.PROVIDER_ONE}`).click();

    await page.getByRole("button", { name: "Add Provider" }).click();
    await expect(page.getByTestId("toast").getByText(TEST_DATA.PROVIDERS.PROVIDER_ONE)).toBeVisible();

    // Attempt to add the same provider again and verify provider does not appear in provider dropdown
    await page.getByRole("textbox", { name: "Select Provider" }).click();
    // Verify provider does not appear in provider dropdown
    await expect(page.getByTestId("items-wrapper")).not.toContainText(TEST_DATA.PROVIDERS.PROVIDER_ONE);

    // Reset state by removing provider
    await page.getByRole("button", { name: "Trash" }).click();
    await expect(page.getByTestId("toast").getByText(TEST_DATA.PROVIDERS.PROVIDER_ONE).first()).toBeVisible();
  });

  // too long, multi-user test
  test.skip("[Negative] Check Disabling Service with Assigned Providers @[112171]", async () => {});

  test("Verify Editing an Existing Service @[112172] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    await adminInstitutionSettingsServicesPage.fillServiceName(TEST_DATA.VALIDATION.INVALID_SPECIAL_CHARS, 0);
    await adminInstitutionSettingsServicesPage.saveChangesButton.click();
    await expect(adminInstitutionSettingsServicesPage.errorMessage).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.validationErrorMessage).toBeVisible();

    await adminInstitutionSettingsServicesPage.clearField("name", 0);
    await expect(adminInstitutionSettingsServicesPage.requiredFieldError).toBeVisible();

    // Clear and fill with regular name
    await adminInstitutionSettingsServicesPage.clearField("name", 0);
    await adminInstitutionSettingsServicesPage.fillServiceName(TEST_DATA.SERVICES.GENERAL_PRACTICE, 0);
    await expect(adminInstitutionSettingsServicesPage.saveChangesButton).toBeDisabled();
  });

  test("Verify Canceling Service Addition @[112173] @admin @functional", async () => {
    // Open add service section
    await adminInstitutionSettingsServicesPage.addServiceButton.click();
    await expect(adminInstitutionSettingsServicesPage.addNewServiceText).toBeVisible();

    // Cancel and verify section closes
    await adminInstitutionSettingsServicesPage.cancelAddService();
    await expect(adminInstitutionSettingsServicesPage.addNewServiceText).not.toBeVisible();
  });

  //flaky
  test.skip('Verify entering number in "Fee price" field @[114085] @admin @functional', async () => {});

  test("Verify Providers button functionality @[114086] @admin @functional", async ({ page }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).first().click();

    // Verify all modal elements are visible - explicit assertions in test
    await expect(adminInstitutionSettingsServicesPage.manageProvidersModal).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.searchProviderText).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.searchProviderInput).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.userNameColumn).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.emailColumn).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.removeColumn).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.selectProviderText).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.providerDropdownInModal).toBeVisible();
  });

  test("Verify (manage providers) provider search functionality @[114088] @admin @functional", async ({ page }) => {
    // Filter by "Inactive"
    await page.getByText("Active").click();
    await page.getByText("Inactive").click();

    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.NO_PROVIDERS).click();

    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).last().click();
    await expect(adminInstitutionSettingsServicesPage.manageProvidersModal).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.searchProviderText).toBeVisible();
    await expect(adminInstitutionSettingsServicesPage.searchProviderInput).toBeVisible();

    // Search for a provider
    await adminInstitutionSettingsServicesPage.searchProvider("john");
    await expect(page.getByText("No items")).toBeVisible();
  });

  test.skip("Verify (manage providers) removing a provider from service @[114089] @admin @functional", async ({ page }) => {
    // Filter by "Inactive"
    await page.getByText("Active").click();
    await page.getByText("Inactive").click();

    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.NO_PROVIDERS).click();

    // remove provider if visible to reset state
    await adminInstitutionSettingsServicesPage.removeProvider();

    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).last().click();

    // Add a provider ('cody prov Cody Test Institution) to the service and verify success message
    await page.getByRole("textbox", { name: "Select Provider" }).click();
    await page.getByTestId(`item ${TEST_DATA.PROVIDERS.PROVIDER_ONE}`).click();
    await page.getByRole("button", { name: "Add Provider" }).click();
    await expect(page.getByTestId("toast").getByText("added to service")).toBeVisible();

    // Close Modal and reopen to verify provider is added to the list
    await page.getByRole("button", { name: "XClose" }).click();
    await page.getByRole("button", { name: "Provider List" }).last().click();
    await expect(page.getByTestId("cell-0-name")).toContainText(TEST_DATA.PROVIDERS.PROVIDER_ONE);

    // Reset state by removing provider
    await page.getByRole("button", { name: "Trash" }).click();
    await expect(page.getByTestId("toast").getByText("removed from service")).toBeVisible();
  });

  test.skip("Verify (manage providers) adding a provider from service @[114090] @admin @functional", async ({ page }) => {
    // Filter by "Inactive"
    await page.getByText("Active").click();
    await page.getByText("Inactive").click();

    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.NO_PROVIDERS).click();

    // remove provider if visible to reset state
    await adminInstitutionSettingsServicesPage.removeProvider();

    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).last().click();

    // Add a provider ('cody prov Cody Test Institution) to the service and verify success message
    await page.getByRole("textbox", { name: "Select Provider" }).click();
    await page.getByTestId(`item ${TEST_DATA.PROVIDERS.PROVIDER_ONE}`).click();
    await page.getByRole("button", { name: "Add Provider" }).click();
    await expect(page.getByTestId("toast").getByText("added to service")).toBeVisible();

    // Close Modal and reopen to verify provider is added to the list
    await page.getByRole("button", { name: "XClose" }).click();
    await page.getByRole("button", { name: "Provider List" }).last().click();
    await expect(page.getByTestId("cell-0-name")).toContainText(TEST_DATA.PROVIDERS.PROVIDER_ONE);

    // Reset state by removing provider
    await page.getByRole("button", { name: "Trash" }).click();
    await expect(page.getByTestId("toast").getByText("removed from service")).toBeVisible();
  });

  test.skip("Verify (manage providers) Select provider dropdown @[114094] @admin @functional", async ({ page }) => {
    // Filter by "Inactive"
    await page.getByText("Active").click();
    await page.getByText("Inactive").click();

    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.NO_PROVIDERS).click();

    // remove provider if visible to reset state
    await adminInstitutionSettingsServicesPage.removeProvider();

    // Open Provider List
    await page.getByRole("button", { name: "Provider List" }).last().click();

    // Add a provider ('cody prov Cody Test Institution) to the service and verify success message
    await page.getByRole("textbox", { name: "Select Provider" }).click();
    await page.getByTestId(`item ${TEST_DATA.PROVIDERS.PROVIDER_ONE}`).click();
    await page.getByRole("button", { name: "Add Provider" }).click();
    await expect(page.getByTestId("toast").getByText("added to service")).toBeVisible();

    // Close Modal and reopen to verify provider is added to the list
    await page.getByRole("button", { name: "XClose" }).click();
    await page.getByRole("button", { name: "Provider List" }).last().click();
    await expect(page.getByTestId("cell-0-name")).toContainText(TEST_DATA.PROVIDERS.PROVIDER_ONE);

    // Reset state by removing provider
    await page.getByRole("button", { name: "Trash" }).click();
    await expect(page.getByTestId("toast").getByText("removed from service")).toBeVisible();
  });

  test("Verify that Institution Administrator can configure multi-select Duration Options in Services tab @[118053] @admin @functional", async ({
    page,
  }) => {
    // Open General Practice Service for editing
    await page.getByText(TEST_DATA.SERVICES.GENERAL_PRACTICE).click();

    // Verify that Default duration option of 30 minutes is selected
    await expect(page.getByTestId("tag").first()).toContainText("30 minutes");

    // Remove the default selected duration option (of 15 minutes) and select two new options of 30 minutes and 45 minutes
    await page.getByRole("button", { name: "XClose" }).first().click();
    await page.getByTestId("custom-select-item-wrapper").nth(1).click();
    await page.getByTestId("custom-dropdown-item-30 minutes").click();
    await page.getByTestId("custom-dropdown-item-45 minutes").click();

    // Save changes and verify success message
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Info updated successfully")).toBeVisible();

    // Remove the current duration options of 30 minutes and 45 minutes
    await page.getByRole("button", { name: "XClose" }).first().click();
    await page.getByRole("button", { name: "XClose" }).first().click();

    // Reset State to default duration option of 15 minutes
    await page.getByRole("textbox", { name: "minutes" }).first().click();
    await page.getByTestId("custom-dropdown-item-30 minutes").click();
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByText("Info updated successfully").first()).toBeVisible();
  });
});
