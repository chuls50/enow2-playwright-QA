import { test, expect } from "@playwright/test";
import { AdminInstitutionSettingsWhiteLabelPage } from "../models/pages/admin/institution-settings-white-label.page.js";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// Admin Configuration White Label - Total tests 25 (including 2 skipped)

test.describe("Admin @regression", () => {
  test.use(useRole(ROLES.ADMIN));
  let adminInstitutionSettingsWhiteLabelPage;

  test.beforeEach(async ({ page }) => {
    adminInstitutionSettingsWhiteLabelPage = new AdminInstitutionSettingsWhiteLabelPage(page);
    await adminInstitutionSettingsWhiteLabelPage.navigateToInstitutionSettingsWhiteLabel();
  });

  test('Verify "White Label Configuration" Page Display @[112119] @admin @ui', async () => {
    // Verify white label configuration section elements
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelEnabledText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelEnabledToggle).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelDescription).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelHeader).toBeVisible();

    // Verify basic configuration input fields
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationNameInput).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.productNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.productNameInput).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.subdomainLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.subdomainInput).toBeVisible();

    // Verify organization logo section elements
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationLogoHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationLogoAvatar).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.uploadPhotoButtonOrganizationLogo).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.uploadPhotoDescription).toBeVisible();

    // Verify favicon section elements
    await expect(adminInstitutionSettingsWhiteLabelPage.faviconHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.faviconAvatar).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.uploadPhotoButtonFavicon).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.uploadPhotoDescriptionFavicon).toBeVisible();

    // Verify cover image section elements
    await expect(adminInstitutionSettingsWhiteLabelPage.coverImageHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.coverImageAvatar).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.uploadPhotoButtonCoverImage).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.resetPhotoButtonCoverImage).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.uploadPhotoDescriptionCoverImage).toBeVisible();

    // Verify branding customization section elements
    await expect(adminInstitutionSettingsWhiteLabelPage.brandingHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.primaryBrandColorLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.mainButtonTextColorLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.resetToDefaultBrandingButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.brandingCard).toBeVisible();

    // Verify patient booking customization elements
    await expect(adminInstitutionSettingsWhiteLabelPage.patientBookingHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.patientBookingDescription).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentCard).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.seeProviderNowText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.seeProviderNowCard).toBeVisible();

    // Verify action buttons are visible and properly disabled
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeDisabled();
    await expect(adminInstitutionSettingsWhiteLabelPage.cancelButton).toBeVisible();
  });

  test('Verify label and placeholder text on "White Label Configuration" Page @[111333] @admin @ui', async () => {
    // Verify white label toggle and description elements
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelEnabledText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelEnabledToggle).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelDescription).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.whiteLabelHeader).toBeVisible();

    // Verify configuration input labels and fields
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationNameInput).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.productNameLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.productNameInput).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.subdomainLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.subdomainInput).toBeVisible();
  });

  test('Verify "Organization Name" Field Functionality @[112121] @admin @functional', async () => {
    // Fill organization name field and verify save button activates
    await adminInstitutionSettingsWhiteLabelPage.organizationNameInput.fill("GlobalMed Day Spa");
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeEnabled();
  });

  test('Verify "Product Name" Field Functionality @[112122] @admin @functional', async () => {
    // Fill product name field and verify save button activates
    await adminInstitutionSettingsWhiteLabelPage.productNameInput.fill("GlobalMed Product");
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeEnabled();
  });

  test('Verify "Subdomain" Field Functionality @[115381] @admin @functional', async () => {
    // Fill subdomain field and verify save button activates
    await adminInstitutionSettingsWhiteLabelPage.subdomainInput.fill("mysubdomain");
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeEnabled();
  });

  test('Verify Image Upload for "Organization logo" on White Label Tab Screen @[111334] @admin @functional', async () => {
    // Upload organization logo image and save changes
    await adminInstitutionSettingsWhiteLabelPage.uploadOrganizationLogo(adminInstitutionSettingsWhiteLabelPage.getOrganizationLogoPath());
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();
    await adminInstitutionSettingsWhiteLabelPage.successMessage.waitFor({ state: "visible" });
    await expect(adminInstitutionSettingsWhiteLabelPage.successMessage).toBeVisible();
  });

  test('Verify Image Upload for "Favicon" on White Label Tab Screen @[115385] @admin @functional', async () => {
    // Upload favicon image and save changes
    await adminInstitutionSettingsWhiteLabelPage.uploadFavicon(adminInstitutionSettingsWhiteLabelPage.getFaviconPath());
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();
    await adminInstitutionSettingsWhiteLabelPage.successMessage.waitFor({ state: "visible" });
    await expect(adminInstitutionSettingsWhiteLabelPage.successMessage).toBeVisible();
  });

  test('Verify Image Upload for "Cover Image" on White Label Tab Screen @[115386] @admin @functional', async () => {
    // Upload cover image and save changes
    await adminInstitutionSettingsWhiteLabelPage.uploadCoverImage(adminInstitutionSettingsWhiteLabelPage.getCoverImagePath());
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();
    await adminInstitutionSettingsWhiteLabelPage.successMessage.waitFor({ state: "visible" });
    await expect(adminInstitutionSettingsWhiteLabelPage.successMessage).toBeVisible();
  });

  test('Verify "Branding" customization Functionality @[115390] @admin @functional', async () => {
    // Verify branding section elements are visible
    await expect(adminInstitutionSettingsWhiteLabelPage.brandingHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.primaryBrandColorLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.mainButtonTextColorLabel).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.resetToDefaultBrandingButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.brandingCard).toBeVisible();

    // Open primary color picker and verify modal elements
    await adminInstitutionSettingsWhiteLabelPage.primaryColorButton.click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.modalCancelButton.click();

    // Open text color picker and verify modal elements
    await adminInstitutionSettingsWhiteLabelPage.mainButtonTextColorButton.click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.modalCancelButton.click();
  });

  test('Verify "Schedule an Appointment" customization Functionality @[115388] @admin @functional', async () => {
    await expect(adminInstitutionSettingsWhiteLabelPage.patientBookingHeader).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.patientBookingDescription).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentCard).toBeVisible();

    await adminInstitutionSettingsWhiteLabelPage.solidButton.first().click();
    await adminInstitutionSettingsWhiteLabelPage.defaultButton.first().click();

    // Background color
    await adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentColorPickers.first().click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    // Text color
    await adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentColorPickers.nth(1).click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    // Highlight 1
    await adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentColorPickers.nth(2).click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    // Highlight 2
    await adminInstitutionSettingsWhiteLabelPage.scheduleAppointmentColorPickers.nth(2).click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    await expect(adminInstitutionSettingsWhiteLabelPage.resetToDefaultPatientBooking).toBeVisible();
  });

  test('Verify "See a Provider Now" customization Functionality @[115389] @admin @functional', async () => {
    await expect(adminInstitutionSettingsWhiteLabelPage.seeProviderNowText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.seeProviderNowCard).toBeVisible();

    await adminInstitutionSettingsWhiteLabelPage.solidButton.nth(1).click();
    await adminInstitutionSettingsWhiteLabelPage.defaultButton.nth(1).click();

    // Background color
    await adminInstitutionSettingsWhiteLabelPage.seeProviderNowColorPickers.first().click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    // Text color
    await adminInstitutionSettingsWhiteLabelPage.seeProviderNowColorPickers.nth(1).click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    // Highlight 1
    await adminInstitutionSettingsWhiteLabelPage.seeProviderNowColorPickers.nth(2).click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    // Highlight 2
    await adminInstitutionSettingsWhiteLabelPage.seeProviderNowColorPickers.nth(2).click();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorModalText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hueSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.colorSlider).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.hexInputText).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalCancelButton).toBeVisible();
    await expect(adminInstitutionSettingsWhiteLabelPage.modalSelectButton).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.tooltipCancelButton.click();

    await expect(adminInstitutionSettingsWhiteLabelPage.resetToDefaultSeeProviderNow).toBeVisible();
  });

  test('Verify "Save Changes" button @[112124] @admin @functional', async () => {
    // Upload cover image to trigger changes and verify save button
    await adminInstitutionSettingsWhiteLabelPage.uploadCoverImage(adminInstitutionSettingsWhiteLabelPage.getCoverImagePath());
    await adminInstitutionSettingsWhiteLabelPage.page.waitForTimeout(5000); // Wait for upload to process
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeEnabled();
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();
  });

  test('Verify "Cancel" button @[115387] @admin @functional', async () => {
    // Make changes and click cancel button
    await adminInstitutionSettingsWhiteLabelPage.organizationNameInput.fill("GlobalMed Day Spa");
    await adminInstitutionSettingsWhiteLabelPage.cancelButton.click();

    // Refresh page and verify changes were not saved
    await adminInstitutionSettingsWhiteLabelPage.navigateToInstitutionSettingsWhiteLabel();
    await expect(adminInstitutionSettingsWhiteLabelPage.organizationNameInput).not.toHaveValue("GlobalMed Day Spa");
  });

  test('[Negative] Verify "White Label Configuration" @[112123] @admin @functional', async () => {
    // Test invalid organization name with special characters
    await adminInstitutionSettingsWhiteLabelPage.organizationNameInput.fill("!@#$%^&*()");
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();

    // Test invalid product name with special characters
    await adminInstitutionSettingsWhiteLabelPage.productNameInput.fill("!@#$%^&*()");
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();

    // Test invalid subdomain with special characters
    await adminInstitutionSettingsWhiteLabelPage.subdomainInput.fill("!@#$%^&*()");
    await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();

    // Clear all input fields to test empty value validation
    await adminInstitutionSettingsWhiteLabelPage.organizationNameInput.fill("");
    await adminInstitutionSettingsWhiteLabelPage.productNameInput.fill("");
    await adminInstitutionSettingsWhiteLabelPage.subdomainInput.fill("");

    // Test invalid file type upload for organization logo
    await adminInstitutionSettingsWhiteLabelPage.uploadOrganizationLogo(adminInstitutionSettingsWhiteLabelPage.getInvalidImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.invalidImageErrorMessage).toBeVisible();

    // Test invalid file type upload for favicon
    await adminInstitutionSettingsWhiteLabelPage.uploadFavicon(adminInstitutionSettingsWhiteLabelPage.getInvalidImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.invalidImageErrorMessage).toBeVisible();

    // Test invalid file type upload for cover image
    await adminInstitutionSettingsWhiteLabelPage.uploadCoverImage(adminInstitutionSettingsWhiteLabelPage.getInvalidImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.invalidImageErrorMessage).toBeVisible();
  });

  test('[Negative] Verify Clicking "Save Changes" without any modifications @[112125] @admin @functional', async () => {
    // Verify save button remains disabled without any changes
    await expect(adminInstitutionSettingsWhiteLabelPage.saveChangesButton).toBeDisabled();
  });

  test("[Negative] Verify Invalid Image Upload for Institution Logo on White Label Tab Screen @[112425] @admin @functional", async () => {
    // Upload invalid image file and verify error message appears
    await adminInstitutionSettingsWhiteLabelPage.uploadOrganizationLogo(adminInstitutionSettingsWhiteLabelPage.getInvalidImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.invalidImageErrorMessage).toBeVisible();
  });

  test.skip("Verify Reset to Default Button for Branding Colors @[116877]", async () => {
    await adminInstitutionSettingsWhiteLabelPage.clickPrimaryColorButton();
    await adminInstitutionSettingsWhiteLabelPage.hueSlider.locator("div").first().click();
    await adminInstitutionSettingsWhiteLabelPage.colorSlider.click();
    await adminInstitutionSettingsWhiteLabelPage.modalSelectButton.click();
    await expect(adminInstitutionSettingsWhiteLabelPage.primaryColorHex).toBeVisible();
    await adminInstitutionSettingsWhiteLabelPage.resetToDefaultBrandingButton.click();
    await expect(adminInstitutionSettingsWhiteLabelPage.defaultColorHex).toBeVisible();
  });

  test("[Negative] Verify Invalid Favicon File Format Upload @[116878] @admin @functional", async () => {
    // Upload invalid favicon file and verify error message appears
    await adminInstitutionSettingsWhiteLabelPage.uploadFavicon(adminInstitutionSettingsWhiteLabelPage.getInvalidImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.invalidImageErrorMessage).toBeVisible();
  });

  // destructive, as this requires white label to be turned ON and will impact other tests running in parallel - can be automated as part of a separate white label specific test suite
  test.skip("Verify Field Validation for Organization Name @[116879] @admin @destructive", async () => {});

  // destructive, as this requires white label to be turned ON and will impact other tests running in parallel - can be automated as part of a separate white label specific test suite
  test.skip("Verify Field Validation for Subdomain @[116880] @admin @destructive", async () => {});

  // destructive, as this requires white label to be turned ON and will impact other tests running in parallel - can be automated as part of a separate white label specific test suite
  test.skip("Verify Field Validation for Product Name @[116881] @admin @functional", async () => {});

  test("Verify Reset to Default for Cover Image @[116882] @admin @functional", async () => {
    // Upload cover image then reset to default
    await adminInstitutionSettingsWhiteLabelPage.uploadCoverImage(adminInstitutionSettingsWhiteLabelPage.getCoverImagePath());
    await adminInstitutionSettingsWhiteLabelPage.page.waitForTimeout(4000); // Wait for upload to process
    await expect(adminInstitutionSettingsWhiteLabelPage.resetPhotoButtonCoverImage).toBeEnabled();
    await adminInstitutionSettingsWhiteLabelPage.resetPhotoButtonCoverImage.click();
    await adminInstitutionSettingsWhiteLabelPage.page.waitForTimeout(2000); // Wait for reset to process

    // if save changes is enabled, click it
    if (await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.isEnabled()) {
      await adminInstitutionSettingsWhiteLabelPage.saveChangesButton.click();
      await adminInstitutionSettingsWhiteLabelPage.successMessage.waitFor({ state: "visible" });
      await expect(adminInstitutionSettingsWhiteLabelPage.successMessage).toBeVisible();
    }

    // Verify cover image src attribute is reset to default
    await expect(adminInstitutionSettingsWhiteLabelPage.coverImageElement).toHaveAttribute("src", "/images/auth_bg.png");
  });

  test("[Negative] Verify Large File for Cover Image Upload @[116883] @admin @functional", async () => {
    // Upload large/invalid cover image file and verify error message
    await adminInstitutionSettingsWhiteLabelPage.uploadCoverImage(adminInstitutionSettingsWhiteLabelPage.getLargeImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.coverImageSizeError).toBeVisible();
  });

  test("[Negative] Verify Large File for Favicon Upload @[116884] @admin @functional", async () => {
    // Upload large/invalid favicon file and verify error message
    await adminInstitutionSettingsWhiteLabelPage.uploadFavicon(adminInstitutionSettingsWhiteLabelPage.getLargeImagePath());
    await expect(adminInstitutionSettingsWhiteLabelPage.faviconSizeError).toBeVisible();
  });

  // skip for now, will come back to automate as part of a separate white label specific test suite - this is destructive as it impacts the entire site and will affect other tests running in parallel
  test.skip('Verify "White Label Enabled" Toggle @[112115] @admin @functional', async () => {});
});
