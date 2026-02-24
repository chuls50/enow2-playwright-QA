import { BasePage } from "../../base-page.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export class AccountSignupPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.verifyEmailButton = page.getByRole("button", { name: "Verify email" });
    this.emptyEmailError = page.getByText("Enter an email");
    this.invalidEmailError = page.getByText("Email fields can only include");
  }

  async navigateToSignup() {
    await this.page.goto(process.env.UAT_INVITE_LINK);

    // Wait for spinner to disappear if present
    await this.waitForSpinnerToDisappear();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForURL(/.*\/signup/);
  }
}
