import { BasePage } from "../../base-page.js";

export class EndUserLicenseAgreementPage extends BasePage {
  constructor(page) {
    super(page);

    // EULA Page Elements
    this.pageTitle = this.page.getByRole("heading", { name: "End user license agreement" });
    this.chevronDownIcon = this.page.getByTestId("icon-ChevronDown");
    this.acceptButton = this.page.getByRole("button", { name: "Accept" });
    this.declineButton = this.page.getByRole("button", { name: "Decline" });

    // Spanish EULA Elements
    this.spanishPageTitle = this.page.getByRole("heading", { name: "Acuerdo de licencia de usuario final" });

    // Language Dropdown Elements
    this.spanishLanguageOption = this.page.getByTestId("custom-dropdown-item-Spanish");
    this.englishLanguageOptionSpanish = this.page.getByTestId("custom-dropdown-item-Inglés");
    this.englishLanguageOption = this.page.getByTestId("custom-dropdown-item-English");

    // Device ID Elements (for device ID tests only)
    this.deviceIdInput = this.page.getByRole("textbox", { name: "1234" });
    this.verifyDeviceIdButton = this.page.getByRole("button", { name: "Verify Device ID" });
    this.verifyDeviceIdButtonSpanish = this.page.getByRole("button", { name: "Verificar id. de dispositivo" });
  }

  // ========================================
  // NAVIGATION METHODS
  // ========================================

  async navigateToEula() {
    await this.page.goto(`${process.env.QA_URL}/first-login`);
    await this.page.waitForLoadState("networkidle");
  }

  // ========================================
  // MULTI-STEP METHODS
  // ========================================

  async acceptEula() {
    await this.acceptButton.waitFor({ state: "visible" });
    await this.acceptButton.click();
  }

  async changeLanguageToEnglish() {
    // If Upcoming appointments is visible
    if (await this.pageTitle.isVisible()) {
      // Do nothing
    } else {
      await this.chevronDownIcon.click();
      await this.englishLanguageOption.click();
      await this.chevronDownIcon.click();
      await this.acceptEula();
      await this.page.waitForTimeout(1000);
      await this.navigateToEula();
    }
  }
}
