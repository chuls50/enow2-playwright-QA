import { BasePage } from "../../base-page.js";

export class BeforeWeGetStartedPage extends BasePage {
  constructor(page) {
    super(page);

    // Common Elements
    this.pageTitle = this.page.getByRole("heading", { name: "Before we get started" });
    this.descriptionText = this.page.getByText("eNOW needs to know a little");
    this.getStartedButton = this.page.getByRole("button", { name: "Get started" });

    // Name Fields (Common)
    this.firstNameLabel = this.page.getByText("First name");
    this.firstNameInput = this.page.getByRole("textbox", { name: "Enter your first name" });
    this.lastNameLabel = this.page.getByText("Last name");
    this.lastNameInput = this.page.getByRole("textbox", { name: "Enter your last name" });

    // Validation Messages
    this.firstNameRequiredError = this.page.getByText("First name is required");
    this.firstNameValidationError = this.page.getByText("First name must contain at");
    this.lastNameRequiredError = this.page.getByText("Last name is required");
    this.lastNameValidationError = this.page.getByText("Last name must contain at");

    // Patient-Specific Elements
    this.dobLabel = this.page.getByText("DOB");
    this.dobInput = this.page.getByRole("textbox", { name: "MM/DD/YYYY" });
    this.sexAssignedAtBirthLabel = this.page.getByText("Sex assigned at birth");

    // Patient Insurance Fields
    this.insuranceInfoHeading = this.page.getByRole("heading", { name: "Insurance information" });
    this.taxIdLabel = this.page.getByText("Tax ID");
    this.taxIdInput = this.page.getByRole("textbox", { name: "Tax ID" });
    this.insurancePolicyNumberLabel = this.page.getByText("Insurance policy number");
    this.insurancePolicyNumberInput = this.page.getByRole("textbox", { name: "Insurance policy number" });
    this.insuranceLabel = this.page.getByText("Insurance", { exact: true });
    this.insuranceInput = this.page.getByRole("textbox", { name: "Insurance", exact: true });

    // Provider-Specific Elements
    this.languagesSpokenHeading = this.page.getByRole("heading", { name: "Languages spoken" });
    this.medicalSpecialtyLabel = this.page.getByText("Medical speciality");
    this.licensesToPracticeHeading = this.page.getByRole("heading", { name: "Licenses to practice" });

    // Device ID-Specific Elements
    this.profileDetailsHeading = this.page.getByRole("heading", { name: "Profile details" });
    this.nameLabel = this.page.getByText("Name"); // Device ID uses single name field
    this.deviceIdLabel = this.page.getByText("Device ID");
    this.deviceIdInput = this.page.getByRole("textbox", { name: "123" });
    this.nameRequiredError = this.page.getByText("Name is required");
    this.deviceIdRequiredError = this.page.getByText("Device ID is required");

    // Timezone Elements
    this.timezoneHeading = this.page.getByRole("heading", { name: "Time zone" });
    this.changeTimezoneLink = this.page.getByRole("link", { name: "Change time zone" });

    // Spanish Elements
    this.spanishPageTitle = this.page.getByRole("heading", { name: "Antes de empezar" });
  }

  // ========================================
  // NAVIGATION METHODS
  // ========================================

  async navigateToOnboarding() {
    await this.page.goto("https://portal.qa-encounterservices.com/first-login/participant-form");
    await this.page.waitForLoadState("networkidle");
    await this.pageTitle.waitFor({ state: "visible" });
  }

  // ========================================
  // MULTI-STEP METHODS
  // ========================================

  // Common form actions
  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async clearFirstName() {
    await this.firstNameInput.clear();
  }

  async clearLastName() {
    await this.lastNameInput.clear();
  }

  // Device ID-specific actions
  async clearDeviceIdName() {
    await this.firstNameInput.fill("");
  }

  async clearDeviceId() {
    await this.deviceIdInput.fill("");
  }

  // Form validation actions
  async validateLastNameField(validName, invalidName) {
    await this.lastNameInput.click();
    await this.clearLastName();
    await this.fillLastName(invalidName);
    await this.clearLastName();
  }
}
