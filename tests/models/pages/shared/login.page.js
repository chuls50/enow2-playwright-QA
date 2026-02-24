import { BasePage } from "../../base-page.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Email Step Elements
    this.emailLabel = page.getByText("Email").first();
    this.emailField = page.getByRole("textbox", { name: "Enter email" });
    this.nextButton = page.getByRole("button", { name: "Next" });
    this.welcomeMessage = page.locator("#root").getByText("Welcome back!");
    this.errorMessage = page.getByText("Enter an email");
    this.errorMessageInvalidEmail = page.getByText("Email fields can only include");
    this.errorMessageValidUnregisteredEmail = page.getByText("Couldn't find an account for the email address provided");

    // Password Step Elements
    this.passwordLabel = page.getByText("Enter your password");
    this.passwordField = page.getByRole("textbox", { name: "Enter your password" });
    this.passwordInput = page.locator('input[name="password"], input[type="password"]');
    this.eyeButton = page.getByRole("button", { name: "Eye" });
    this.loginButton = page.getByRole("button", { name: "Log In" });
    this.forgotPasswordLink = page.getByRole("link", { name: "Forgot Password" });
    this.backToPasswordLink = page.getByText("Back to password page");
    this.errorMessageEmptyPassword = page.getByText("Enter a password");
    this.errorMessageWrongPassword = page.getByText("Wrong password. Try again or");

    // Forgot Password Elements
    this.forgotPasswordHeading = page.getByRole("heading", { name: "Forgot Password?" });
    this.passwordResetHeading = page.getByRole("heading", { name: "Your reset password link was" });
    this.sendEmailButton = page.getByRole("button", { name: "Send email" });
    this.confirmationHeading = page.getByRole("heading", { name: "Your reset password link was sent" });
    this.resendLink = page.getByRole("link", { name: "Resend link" });
    this.resendLinkConfirmation = page.getByText("We've resent the link to");

    // Shared Elements
    this.loginHeading = page.getByRole("heading", { name: "Login" });
    this.footer = page.getByText("© 2002 - 2026 GlobalMed");

    // Language Elements
    this.languageDropdownTrigger = page.getByTestId("icon-ChevronDown");
    this.languageDropdown = page.getByTestId("custom-dropdown");
    this.englishLanguageText = page.getByText("English");
    this.portugueseLanguageText = page.getByText("Português");
    this.spanishLanguageText = page.getByText("Español");

    // Language Options (both testid and text versions)
    this.spanishLanguageOption = page.getByTestId("custom-dropdown-item-Spanish");
    this.spanishLanguageTextOption = page.getByText("Spanish");
    this.portugueseLanguageOption = page.getByTestId("custom-dropdown-item-Portuguese");
    this.englishLanguageOption = page.getByTestId("custom-dropdown-item-English");
    this.englishLanguageOptionSpanish = page.getByTestId("custom-dropdown-item-Inglés");
    this.englishLanguageOptionPortuguese = page.getByTestId("custom-dropdown-item-Inglês");

    // Language-specific headings
    this.loginHeadingSpanish = page.getByRole("heading", { name: "Inicio de sesión" });
    this.loginHeadingPortuguese = page.getByRole("heading", { name: "Faça o login" });

    // Welcome Image
    this.welcomeImage = page.locator('img[alt="welcome"]');

    // Device ID Elements
    this.deviceIdAccessHeading = page.getByRole("heading", { name: "Device ID Access" });
    this.deviceIdAccessHeadingSpanish = page.getByRole("heading", { name: "Acceso por id. de dispositivo" });
    this.deviceIdLabelText = page.getByText("Device ID").nth(2);
    this.deviceIdInput = page.getByRole("textbox", { name: "1234" });
    this.verifyDeviceIdButton = page.getByRole("button", { name: "Verify Device ID" });
    this.welcomeBackText = page.getByText("Welcome back!");

    // Device ID Error Messages
    this.deviceIdRequiredError = page.getByText("Device ID is required");
    this.deviceIdNotFoundError = page.getByText(
      "The Device ID you specified is not found for this Institution. Please confirm that you have entered the created value."
    );
  }

  // Navigation Methods
  async goto(baseURL = process.env.QA_URL) {
    await this.page.goto(baseURL, { waitUntil: "commit" });
    await this.page.waitForURL(/.*\/login/);
  }

  async navigateToPasswordStep(email) {
    await this.goto();
    await this.emailField.fill(email);
    await this.nextButton.click();
    await this.passwordLabel.waitFor();
  }

  async navigateToForgotPasswordPage(email) {
    await this.goto();
    await this.emailField.fill(email);
    await this.nextButton.click();
    await this.forgotPasswordLink.click();
    await this.page.waitForURL(/.*\/forgot-password/);
    await this.forgotPasswordHeading.waitFor();
  }

  // Language Selection Method
  async selectLanguage(language) {
    const languageMap = {
      Spanish: {
        option: this.spanishLanguageOption,
        headingText: "Inicio de sesión",
      },
      SpanishText: {
        option: this.spanishLanguageTextOption,
        headingText: "Inicio de sesión",
      },
      Portuguese: {
        option: this.portugueseLanguageOption,
        headingText: "Faça o login",
      },
      English: {
        option: this.englishLanguageOption,
        headingText: "Login",
      },
      EnglishFromSpanish: {
        option: this.englishLanguageOptionSpanish,
        headingText: "Login",
      },
      EnglishFromPortuguese: {
        option: this.englishLanguageOptionPortuguese,
        headingText: "Login",
      },
    };

    if (!languageMap[language]) {
      throw new Error(`Unsupported language: ${language}. Supported languages: ${Object.keys(languageMap).join(", ")}`);
    }

    // Open the language dropdown
    await this.languageDropdownTrigger.click();
    await this.languageDropdown.waitFor({ state: "visible" });

    // Select the language
    await languageMap[language].option.click();

    // Wait for the page to update with new language
    await this.page.waitForTimeout(500); // Small wait to allow UI to update
  }

  // Device ID Authentication Methods
  async gotoDeviceIdPage(baseURL = process.env.QA_URL) {
    await this.page.goto(`${baseURL}/device`, { waitUntil: "networkidle" });
  }

  async fillDeviceId(deviceId) {
    await this.deviceIdInput.click();
    await this.deviceIdInput.fill(deviceId);
  }

  async performDeviceIdLogin(deviceId) {
    await this.fillDeviceId(deviceId);
    await this.verifyDeviceIdButton.click();
    await this.welcomeBackText.waitFor({ state: "visible" });
  }
}
