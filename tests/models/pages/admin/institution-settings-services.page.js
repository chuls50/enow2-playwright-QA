import { BasePage } from "../../base-page.js";

export class InstitutionSettingsServicesPage extends BasePage {
  constructor(page) {
    super(page);

    // Page Elements
    this.pageHeading = page.getByRole("heading", { name: "Services Settings" });
    this.servicesTab = page.getByRole("button", { name: "Services" });

    // Add Service Section
    this.addServiceButton = page.getByRole("button", { name: "Add Service" });
    this.addNewServiceSection = page.getByText("Service name*DescriptionSpecialtyFee enabledFee priceAllow Encounter nowService");
    this.serviceNameInput = page.getByText("Service name*").first();

    // Form Fields
    this.serviceNameField = (index = 0) => page.locator(`input[name="services.${index}.name"]`);
    this.descriptionField = (index = 0) => page.locator(`input[name="services.${index}.description"]`);
    this.specialtyDropdown = page.getByTestId("dropdown-field").first();

    // Toggles
    this.feeEnabledSwitch = page.getByText("Fee enabled").first();
    this.serviceEnabledSwitch = page.getByText("Service Enabled").first();
    this.allowEncounterNowSwitch = page.getByText("Allow 'See a provider now'").first();

    // Buttons
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.providerListButton = page.getByRole("button", { name: "Provider List" }).first();
    this.providerListButton2 = page.getByRole("button", { name: "Provider List" }).nth(1);
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });

    // Provider List Section
    this.providerListHeading = page.getByRole("heading", { name: "Manage Providers" });
    this.manageProvidersModal = page.getByText("Manage Providers");
    this.searchProviderInput = page.getByRole("textbox", { name: "Search by name" });
    this.selectProviderInput = page.getByRole("textbox", { name: "Select Provider" });
    this.providerDropdownInModal = page.getByTestId("modal").getByTestId("dropdown-field");
    this.addProviderButton = page.getByRole("button", { name: "Add Provider" });
    this.closeModalButton = page.getByRole("button", { name: "XClose" });
    this.trashButton = page.getByRole("button", { name: "Trash" });
    this.itemsWrapper = page.getByTestId("items-wrapper");

    // Specialty Dropdown
    this.specialtyDropdownRequiredText = page.getByText("Specialty required");
    this.specialtyDropdownItemsWrapper = page.getByTestId("items-wrapper");
    this.specialtyGeneralPractitionerItem = page.getByTestId("item General Practitioner");

    // Fee Price Field
    this.feePriceField = page.getByRole("textbox", { name: "Fee price" }).first();

    // Duration Dropdown
    this.durationDropdown = page.getByTestId("custom-select-item-wrapper");
    this.customDropdown = page.getByTestId("custom-dropdown");

    // Provider Table Elements
    this.userNameColumn = page.getByRole("cell", { name: "User Name" });
    this.emailColumn = page.getByRole("cell", { name: "Email" });
    this.removeColumn = page.getByRole("cell", { name: "Remove" });
    this.searchProviderText = page.getByText("Search Provider");
    this.selectProviderText = page.getByText("Select Provider");

    // Messages
    this.successMessage = page.getByText("Info updated successfully");
    this.validationErrorMessage = page.getByText("Text fields can include");
    this.errorMessage = page.getByText("Please fix the errors in the");
    this.errorToast = page.getByText("Please fix the errors in the");
    this.requiredFieldError = page.getByText("This field is required - please provide a value");
    this.feeErrorMessage = page.getByText("Fee must be greater than 0 when enabled");

    // Dynamic elements that appear in specific tests
    this.addNewServiceText = page.getByText("Service nameDescriptionSpecialtySpecialty requiredDuration30 minutesFee");
  }

  // Navigation Methods
  async navigateToServiceSettings() {
    await this.page.goto(`${process.env.QA_URL}/institution-settings`);

    // Wait for spinner to disappear if present
    await this.waitForSpinnerToDisappear();

    await this.servicesTab.click();
    // await this.page.waitForLoadState('networkidle');
    await this.pageHeading.waitFor({ state: "visible" });
  }

  async fillServiceName(serviceName, index = 1, addTimestamp = false) {
    const finalName = addTimestamp ? `${serviceName} ${Date.now()}` : serviceName;
    await this.serviceNameField(index).click();
    await this.serviceNameField(index).fill(finalName);
    return finalName;
  }

  async fillDescription(description, index = 0) {
    await this.descriptionField(index).click();
    await this.descriptionField(index).fill(description);
  }

  async clearField(fieldType, index = 0) {
    const field = fieldType === "name" ? this.serviceNameField(index) : this.descriptionField(index);
    await field.clear();
  }

  async selectSpecialty(specialtyName) {
    await this.specialtyDropdown.click();
    await this.page.getByTestId("items-wrapper").getByTestId(`item ${specialtyName}`).click();
  }

  async openAddServiceSection() {
    await this.addServiceButton.click();
    await this.saveChangesButton.waitFor({ state: "visible", timeout: 60000 });
  }

  async cancelAddService() {
    await this.cancelButton.click();
  }

  async searchProvider(providerName) {
    await this.selectProviderInput.click();
    await this.selectProviderInput.fill(providerName);
  }
}
