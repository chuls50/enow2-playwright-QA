import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsInsurancePage } from "../models/pages/admin/institution-settings-insurance.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// Define Payments - Total Tests 11 (including 1 skipped test)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsInsurancePage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsInsurancePage = new AdminInstitutionSettingsInsurancePage(page);
    await adminInstitutionSettingsInsurancePage.navigateToInsuranceSettings();
  });

  test("Verify Payments Section Display @[112175] @admin @ui", async ({ page }) => {
    // Enable self payment to reveal all fields
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();

    // Verify Payments Setup section fields are visible
    await expect(adminInstitutionSettingsInsurancePage.paymentSetupSection).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.selfPaymentLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.selectPaymentProcessorLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.currencyLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.authorizationKeyLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.editAccountButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.paymentReportingButton).toBeVisible();

    // Verify Patient Payment Reminders section and buttons
    await expect(adminInstitutionSettingsInsurancePage.patientPaymentRemindersLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.serviceRemindersLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.intervalsLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.cancelButton).toBeVisible();
  });

  test("Verify Payment Processor Selection @[112176] @admin @functional", async ({ page }) => {
    // Enable self payment and open payment processor dropdown
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();

    // open payment processor dropdown
    await adminInstitutionSettingsInsurancePage.selectPaymentProcessorDropdown.click();

    // Verify dropdown items are visible
    await expect(page.getByTestId("items-wrapper")).toBeVisible();

    // Select Stripe processor and verify selection
    await adminInstitutionSettingsInsurancePage.stripeProcessorItem.click();

    // Verify save is enabled
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Currency Selection @[112177] @admin @functional", async ({ page }) => {
    // Enable self payment and open currency dropdown
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();

    // open currency dropdown
    await adminInstitutionSettingsInsurancePage.currencyDropdown.click();
    await expect(adminInstitutionSettingsInsurancePage.itemsWrapper).toBeVisible();

    // Select payment processor dropdown and verify selection
    await adminInstitutionSettingsInsurancePage.azulProcessorItem.click();
    await adminInstitutionSettingsInsurancePage.stripeProcessorItem.click();

    // Open currency dropdown again
    await adminInstitutionSettingsInsurancePage.currencyDropdown.click();

    // Verify dropdown items are visible
    await expect(adminInstitutionSettingsInsurancePage.itemsWrapper).toBeVisible();
  });

  test("Verify Merchant ID and Authorization Key Fields @[112178] @admin @functional", async ({ page }) => {
    // Enable self payment and open currency dropdown
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();

    // Verify all required Azul fields are visible and save button is enabled
    await expect(adminInstitutionSettingsInsurancePage.merchantIdLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.merchantIdInput).toBeVisible();
    await adminInstitutionSettingsInsurancePage.merchantIdInput.fill("123-456-789");
    await expect(adminInstitutionSettingsInsurancePage.merchantNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.merchantNameInput).toBeVisible();
    await adminInstitutionSettingsInsurancePage.merchantNameInput.fill("Test Merchant Name");
    await expect(adminInstitutionSettingsInsurancePage.authorizationKeyLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.authorizationKeyInput).toBeVisible();
    await adminInstitutionSettingsInsurancePage.authorizationKeyInput.fill("AB-CD-EF-GH");
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Edit Account and Payment Reporting buttons @[112179] @admin @functional", async ({ page }) => {
    // Verify Edit Account and Payment Reporting buttons are visible and enabled
    await expect(adminInstitutionSettingsInsurancePage.editAccountButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.editAccountButton).toBeEnabled();
    await expect(adminInstitutionSettingsInsurancePage.paymentReportingButton).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.paymentReportingButton).toBeEnabled();

    // Click the edit button
    await adminInstitutionSettingsInsurancePage.editAccountButton.click();

    //verify the new tab URL contains https://www.azul.com.do/
    const [newPage] = await Promise.all([page.context().waitForEvent("page")]);
    await expect(newPage).toHaveURL(/https:\/\/www\.azul\.com\.do\//);
    await newPage.close();

    // Click the payment reporting button
    await adminInstitutionSettingsInsurancePage.paymentReportingButton.click();

    // Verify the new tab URL contains https://www.azul.com.do/
    const [reportingPage] = await Promise.all([page.context().waitForEvent("page")]);
    await expect(reportingPage).toHaveURL(/https:\/\/www\.azul\.com\.do\//);
    await reportingPage.close();
  });

  test("Verify Patient Payment Reminders Toggle Functionality @[112180] @admin @functional", async ({ page }) => {
    // Verify payment reminders toggle is visible and enabled
    await expect(adminInstitutionSettingsInsurancePage.patientPaymentRemindersLabel).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.patientPaymentRemindersToggle).toBeVisible();
    await expect(adminInstitutionSettingsInsurancePage.patientPaymentRemindersToggle).toBeEnabled();

    // Toggle payment reminders and verify save button is enabled
    await adminInstitutionSettingsInsurancePage.patientPaymentRemindersToggle.click();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Service Reminder Selection @[112181] @admin @functional", async ({ page }) => {
    // Enable 'Patient Payment Reminders' if not already enabled
    await adminInstitutionSettingsInsurancePage.enablePatientPaymentRemindersIfNeeded();
    await expect(adminInstitutionSettingsInsurancePage.serviceRemindersLabel).toBeVisible();
    await adminInstitutionSettingsInsurancePage.serviceReminderDropdown.click();
    await expect(adminInstitutionSettingsInsurancePage.itemsWrapper).toBeVisible();
    await adminInstitutionSettingsInsurancePage.serviceReminderDropdownSelection.click();
  });

  test("Verify Intervals Selection @[112182] @admin @functional", async ({ page }) => {
    // Enable 'Patient Payment Reminders' if not already enabled
    await adminInstitutionSettingsInsurancePage.enablePatientPaymentRemindersIfNeeded();
    await expect(adminInstitutionSettingsInsurancePage.intervalsLabel).toBeVisible();
    await adminInstitutionSettingsInsurancePage.intervalsDropdown.click();
    await expect(adminInstitutionSettingsInsurancePage.itemsWrapper).toBeVisible();
    await adminInstitutionSettingsInsurancePage.intervalsDropdownSelection.click();
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
  });

  test("Verify Saving Valid Payment Configuration @[112183] @admin @functional", async ({ page }) => {
    // Enable self payment and open currency dropdown
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();

    // switch to stripe processor
    await adminInstitutionSettingsInsurancePage.selectPaymentProcessor("Stripe");

    // Verify save is enabled and click save
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsInsurancePage.saveChangesButton.click();

    await page.waitForTimeout(5000); // Wait for save to process

    // change bnack to azul processor
    await adminInstitutionSettingsInsurancePage.selectPaymentProcessor("Azul");

    // Verify save is enabled and click save
    await expect(adminInstitutionSettingsInsurancePage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsInsurancePage.saveChangesButton.click();
    await page.waitForTimeout(5000); // Wait for save to process
  });

  test("[Negative] Verify Invalid Merchant ID and Authorization Key Fields @[112184]", async ({ page }) => {
    // Test empty Merchant ID validation
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();
    await adminInstitutionSettingsInsurancePage.merchantIdInput.fill("");
    await adminInstitutionSettingsInsurancePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsInsurancePage.errorMessage).toBeVisible();

    // Test empty Authorization Key validation
    await adminInstitutionSettingsInsurancePage.authorizationKeyInput.fill("");
    await expect(adminInstitutionSettingsInsurancePage.errorMessage).toBeVisible();

    // Test empty Merchant Name validation
    await adminInstitutionSettingsInsurancePage.merchantNameInput.fill("");
    await expect(adminInstitutionSettingsInsurancePage.errorMessage).toBeVisible();
  });

  test("[Negative] Verify Save changes with empty required fields @[112185]", async ({ page }) => {
    // Test empty Merchant ID validation
    await adminInstitutionSettingsInsurancePage.enableSelfPaymentIfNeeded();
    await adminInstitutionSettingsInsurancePage.merchantIdInput.fill("");
    await adminInstitutionSettingsInsurancePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsInsurancePage.errorMessage).toBeVisible();

    // Test empty Authorization Key validation
    await adminInstitutionSettingsInsurancePage.authorizationKeyInput.fill("");
    await expect(adminInstitutionSettingsInsurancePage.errorMessage).toBeVisible();

    // Test empty Merchant Name validation
    await adminInstitutionSettingsInsurancePage.merchantNameInput.fill("");
    await expect(adminInstitutionSettingsInsurancePage.errorMessage).toBeVisible();
    await adminInstitutionSettingsInsurancePage.authorizationKeyInput.fill("");

    // Attempt to save and verify error message is displayed
    await adminInstitutionSettingsInsurancePage.saveChangesButton.click();
    await expect(adminInstitutionSettingsInsurancePage.errorMessageToast).toBeVisible();
  });
});
