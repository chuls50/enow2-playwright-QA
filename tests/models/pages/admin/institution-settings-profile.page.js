import { BasePage } from "../../base-page.js";

export class InstitutionSettingsProfilePage extends BasePage {
  constructor(page) {
    super(page);

    // ========================================
    // MAIN NAVIGATION
    // ========================================
    this.usersTab = page.locator("a").filter({ hasText: "Users" });

    // ========================================
    // INSTITUTION SETTINGS SECTION
    // ========================================
    this.institutionSettingsHeading = page.locator("h2").filter({ hasText: "Institution settings" });
    this.nameLabel = page.getByText("Institution name");
    this.nameInput = page.getByRole("textbox", { name: "Example Name" });
    this.registrationLinkLabel = page.getByText("Patient Registration Link");
    this.registrationLink = page.getByRole("link", {
      name: "https://xj9.sandbox-encounterservices.com/signup/INSFDJUBZOIFOQCIIAUWXPQ",
    });
    this.registrationLinkCopyButton = page.getByRole("button", { name: "Copy link" }).first();
    this.deviceIDAccessLinkLabel = page.getByText("Device ID Access Link");
    this.deviceIDAccessLink = page.getByRole("link", {
      name: "https://xj9.sandbox-encounterservices.com/login/device",
    });
    this.deviceIDAccessLinkCopyButton = page.getByRole("button", { name: "Copy link" }).nth(1);
    // Consolidated success message for both registration link and device ID link copy actions
    this.linkCopiedSuccessMessage = page.getByText("Link successfully copied");
    this.phoneNumberLabel = page.getByText("Phone number").first();
    this.phoneNumberInput = page.locator('input[name="phone\\.number"]');
    this.phoneNumberDropdown = page.getByText("US (+1)").first();

    // ========================================
    // INSTITUTION ADDRESS SECTION
    // ========================================
    this.institutionAddressHeading = page.getByRole("heading", {
      name: "Institution Address",
    });
    this.institutionAddressInput = page.locator('input[name="address1"]');
    this.institutionAptSuiteEtcLabel = page.getByText("Apt, Suite, Etc").first();
    this.institutionAptSuiteEtcInput = page.locator('input[name="address2"]');
    this.institutionAddressZipCodeLabel = page.getByText("ZIP code").first();
    this.institutionAddressZipCodeInput = page.locator('input[name="zip"]');
    this.institutionAddressCityLabel = page.getByText("City").first();
    this.institutionAddressCityInput = page.locator('input[name="city"]');
    this.institutionAddressCountryLabel = page.getByText("Country").first();
    this.institutionAddressCountryDropdown = page.getByTestId("custom-select-item-wrapper").first();
    this.institutionAddressStateLabel = page.getByText("State").first();
    this.institutionAddressStateDropdown = page.getByTestId("custom-select-item-wrapper").nth(1);

    // Institution Address Dropdown Selections (working locators)
    this.countryDropdownAfghanistan = page
      .locator("div")
      .filter({ hasText: /^CountryAfghanistan$/ })
      .getByTestId("custom-select-item-wrapper");
    this.countryDropdownAlbania = page
      .locator("div")
      .filter({ hasText: /^CountryAlbania$/ })
      .getByTestId("custom-select-item-wrapper");
    this.stateDropdownAfterCountrySelection = page.getByTestId("custom-select-item-wrapper").nth(2);
    this.afghanistanCountryOption = page.getByTestId("custom-dropdown-item-Afghanistan");
    this.albaniaCountryOption = page.getByTestId("custom-dropdown-item-Albania");
    this.badakhshanStateOption = page.getByTestId("custom-dropdown-item-Badakhshan");
    this.beratStateOption = page.getByTestId("custom-dropdown-item-Berat");
    this.diberStateOption = page.getByTestId("custom-dropdown-item-Diber");

    // ========================================
    // POC DETAILS SECTION
    // ========================================
    this.pocDetailsHeading = page.getByRole("heading", { name: "POC Details" });
    this.pocNameLabel = page.getByText("Name", { exact: true });
    this.pocNameInput = page.getByRole("textbox", { name: "John Doe" });
    this.pocTitleLabel = page.getByText("Title");
    this.pocTitleInput = page.getByRole("textbox", { name: "Title example" });
    this.pocPhoneNumberLabel = page.getByText("Phone number").first();
    this.pocPhoneNumberInput = page.locator('input[name="pocSettings\\.phone\\.number"]');
    this.pocPhoneNumberDropdown = page.getByText("US (+1)").nth(1);
    this.pocEmailLabel = page.getByText("Email");
    this.pocEmailInput = page.getByRole("textbox", { name: "example@mail.com" });

    // ========================================
    // POC ADDRESS SECTION
    // ========================================
    this.pocAddressHeading = page.getByRole("heading", { name: "POC Address" });
    this.pocAddressInput = page.locator('input[name="pocSettings\\.street"]');
    this.pocAptSuiteEtcLabel = page.getByText("Apt, Suite, Etc").nth(1);
    this.pocAptSuiteEtcInput = page.locator('input[name="pocSettings\\.address"]');
    this.pocZipCodeLabel = page.getByText("ZIP code").nth(1);
    this.pocZipCodeInput = page.locator('input[name="pocSettings\\.zip"]');
    this.pocCityLabel = page.getByText("City").nth(1);
    this.pocCityInput = page.locator('input[name="pocSettings\\.city"]');
    this.pocCountryLabel = page.getByText("Country").nth(1);
    this.pocCountryDropdown = page
      .locator("div")
      .filter({ hasText: /^CountryUnited States of America$/ })
      .getByTestId("custom-select-item-wrapper");
    this.pocCountryDropdownSelection = page
      .getByTestId("custom-dropdown-item-United States of America")
      .getByText("United States of America");
    this.pocStateLabel = page.getByText("State").nth(2);
    this.pocStateDropdown = page.getByTestId("custom-select-item-wrapper").nth(4);
    this.pocStateDropdownSelection = page.getByTestId("custom-dropdown-item-Arizona");

    // ========================================
    // ACTION BUTTONS
    // ========================================
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });

    // ========================================
    // SUCCESS AND ERROR MESSAGES
    // ========================================
    this.successMessage = page.getByText("Info updated successfully");
    this.errorMessage = page.getByText("Please fix the errors in the form");
    this.requiredFieldError = page.getByText("This field is required");
    this.invalidEmailError = page.getByText("Email fields can only include alphanumeric characters");
    this.invalidTextFieldError = page.getByText("Text fields can include alphanumeric characters");
  }

  // ========================================
  // NAVIGATION METHODS
  // ========================================
  async navigateToInstitutionSettingsProfile() {
    await this.page.goto(`${process.env.UAT_URL}/institution-settings`);
    await this.waitForSpinnerToDisappear();
    await this.page.waitForLoadState("networkidle");
    await this.institutionSettingsHeading.waitFor({ state: "visible" });
  }

  // ========================================
  // POC DETAILS METHODS
  // ========================================
  async fillPOCDetails(details, addDelay = false) {
    await this.pocNameInput.fill(details.name);
    await this.pocTitleInput.fill(details.title);
    await this.pocEmailInput.fill(details.email);
    await this.pocPhoneNumberInput.fill(details.phone);
    await this.pocAddressInput.fill(details.address);
    await this.pocZipCodeInput.fill(details.zip);
    await this.pocCityInput.fill(details.city);
    if (addDelay) await this.page.waitForTimeout(500); // Ensure all fields are properly filled
  }

  async selectPOCCountryAndState() {
    await this.pocCountryDropdown.click();
    await this.pocCountryDropdownSelection.click();
    await this.pocStateDropdown.click();
    await this.pocStateDropdownSelection.click();
  }

  async clearPOCDetails(addDelay = false) {
    await this.pocNameInput.fill("");
    await this.pocTitleInput.fill("");
    await this.pocEmailInput.fill("");
    await this.pocPhoneNumberInput.fill("");
    await this.pocAddressInput.fill("");
    await this.pocZipCodeInput.fill("");
    await this.pocCityInput.fill("");
    if (addDelay) await this.page.waitForTimeout(500); // Ensure all fields are properly cleared
  }

  // ========================================
  // WORKFLOW METHODS
  // ========================================
  async fillAndSavePOCDetails(details) {
    await this.fillPOCDetails(details, true);
    await this.selectPOCCountryAndState();
    await this.saveChangesButton.click();
  }

  async saveChangesAndWaitForSuccess() {
    await this.saveChangesButton.click();
    await this.successMessage.waitFor({ state: "visible" });
  }
}
