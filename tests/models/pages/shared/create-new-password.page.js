import { BasePage } from "../../base-page.js";

export class CreateNewPasswordPage extends BasePage {
  constructor(page) {
    super(page);

    // Page Headings and Labels
    this.pageHeading = this.page.getByRole("heading", { name: "Create a new password" });
    this.rememberText = this.page.getByText("Remember, it must be");
    this.newPasswordLabel = this.page.getByRole("heading", { name: "New password", exact: true });
    this.newPasswordFieldLabel = this.page.getByText("New password", { exact: true }).nth(1);
    this.confirmPasswordLabel = this.page.getByText("Confirm new password");

    // Input Fields
    this.passwordInput = this.page.getByTestId("password-input");
    this.confirmPasswordInput = this.page.getByTestId("confirm-password-input");

    // Password Requirements
    this.requirementMinLength = this.page.getByText("At least 12 characters");
    this.requirementUppercase = this.page.getByText("At least 1 uppercase");
    this.requirementLowercase = this.page.getByText("At least 1 lowercase");
    this.requirementNumber = this.page.getByText("At least 1 number");
    this.requirementSpecialChar = this.page.getByText("At least 1 special character");

    // Password Requirement Icons (X marks for failed requirements)
    this.minLengthFailIcon = this.page
      .locator("div")
      .filter({ hasText: /^At least 12 characters$/ })
      .getByTestId("icon-XClose");
    this.uppercaseFailIcon = this.page
      .locator("div")
      .filter({ hasText: /^At least 1 uppercase$/ })
      .getByTestId("icon-XClose");
    this.lowercaseFailIcon = this.page
      .locator("div")
      .filter({ hasText: /^At least 1 lowercase$/ })
      .getByTestId("icon-XClose");
    this.numberFailIcon = this.page
      .locator("div")
      .filter({ hasText: /^At least 1 number$/ })
      .getByTestId("icon-XClose");
    this.specialCharFailIcon = this.page
      .locator("div")
      .filter({ hasText: /^At least 1 special character$/ })
      .getByTestId("icon-XClose");

    // Buttons
    this.newPasswordButton = this.page.getByTestId("new-password-button");
    this.passwordVisibilityToggle = this.page
      .locator("div")
      .filter({ hasText: /^New password$/ })
      .getByRole("button");
    this.confirmPasswordVisibilityToggle = this.page
      .locator("div")
      .filter({ hasText: /^Confirm new password$/ })
      .getByRole("button");

    // Error Messages
    this.passwordRequirementsError = this.page.getByText("Your password must have:");
    this.passwordMismatchError = this.page.getByText("The password doesn’t match. Please re-enter the right password");

    // Footer
    this.footer = this.page.getByText("© 2002 - 2026 GlobalMed");
  }

  async navigateToChangePassword(resetLink = "https://api.qa-encounterservices.com/redirect/tSazmTkTBPmCVHBlTguemWJGWHnQIolI") {
    if (!resetLink) {
      throw new Error("Password reset link is required. Set QA_CHANGE_PASSWORD_LINK in .env or pass as parameter.");
    }
    await this.page.goto(resetLink);
  }

  async fillBothPasswords(password, confirmPassword) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async createNewPassword(password, confirmPassword) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.newPasswordButton.click();
  }
}
