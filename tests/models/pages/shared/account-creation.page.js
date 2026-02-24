import { BasePage } from "../../base-page.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env", quiet: true });

export class AccountCreationPage extends BasePage {
  constructor(page) {
    super(page);
    this.createAccountHeading = page.getByRole("heading", { name: "Create account" });
    this.createAccountWelcomeMessage = page.getByText("Welcome to eNow! Please set your password.");
    this.createAccountEmail = page.locator('input[type="text"][value="chuls+createaccount@globalmed.com"]');
    this.createAccountButton = page.getByRole("button", { name: "Create account" });
    this.passwordInput = page.getByTestId("password-input");
    this.confirmPasswordInput = page.getByTestId("confirm-password-input");
    this.passwordErrorIcon = page.getByTestId("icon-XClose");
    this.passwordMismatchError = page.getByText(/password.*match/i);
    this.passwordUppercaseError = page
      .locator("div")
      .filter({ hasText: /^At least 1 uppercase$/ })
      .getByTestId("icon");
    this.passwordLowercaseError = page
      .locator("div")
      .filter({ hasText: /^At least 1 lowercase$/ })
      .getByTestId("icon");
    this.passwordNumberError = page
      .locator("div")
      .filter({ hasText: /^At least 1 number$/ })
      .getByTestId("icon");
    this.passwordSpecialCharError = page
      .locator("div")
      .filter({ hasText: /^At least 1 special character$/ })
      .getByTestId("icon");
  }

  async navigateToCreateAccount() {
    await this.page.goto(process.env.UAT_ACTIVATE_ACCOUNT_LINK);
    await this.waitForSpinnerToDisappear();
    await this.page.waitForURL(/.*\/signup/);
  }
}
