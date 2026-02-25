// models/base-page.js

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    const defaultOptions = {
      waitUntil: "networkidle",
      timeout: 30000,
    };

    await this.page.goto(url, defaultOptions);
    await this.page.waitForLoadState("networkidle", { timeout: 45000 });
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForSpinnerToDisappear(spinnerSelector = '[data-testid="spinner"]', timeout = 120000) {
    try {
      await this.page.waitForSelector(spinnerSelector, { state: "detached", timeout });
    } catch (e) {
      console.log("Spinner did not disappear within timeout or was not found.");
    }
  }

  async performDeviceIdLogin(deviceId) {
    try {
      // Navigate to device ID access page
      await this.page.goto("https://portal.qa-encounterservices.com/login/device");
      await this.page.waitForLoadState("networkidle");

      // Enter device ID
      await this.page.getByRole("textbox", { name: "1234" }).click();
      await this.page.getByRole("textbox", { name: "1234" }).fill(deviceId);
      await this.page.getByRole("button", { name: "Verify Device ID" }).click();

      // Wait for successful verification
      await this.page.getByText("Welcome back!").waitFor({ state: "visible" });
      await this.page.waitForTimeout(2000);
      await this.page.waitForLoadState("networkidle");

      console.log(`✅ Successfully logged in with device ID: ${deviceId}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to login with device ID ${deviceId}:`, error.message);
      throw error;
    }
  }

  async uploadFile(uploadButton, filePath) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await uploadButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  // async _performQALogin(usernameEnv, passwordEnv, userType) {
  //   try {
  //     // Navigate to base URL and wait for login page
  //     await this.page.goto(process.env.QA_URL);
  //     await this.page.waitForURL(/.*\/login/);

  //     // Fill email
  //     await this.page.getByPlaceholder("Enter email").fill(process.env[usernameEnv]);
  //     await this.page.getByRole("button", { name: "Next" }).click();
  //     await this.page.waitForTimeout(500);

  //     // Fill password
  //     await this.page.getByPlaceholder("Enter your password").fill(process.env[passwordEnv]);
  //     await this.page.getByRole("button", { name: "Log In" }).click();
  //     await this.page.waitForURL(/.*\/route-me/);

  //     // Wait for spinner to disappear
  //     await this.waitForSpinnerToDisappear();

  //     console.log(`✅ Successfully logged in as ${userType}`);
  //     return true;
  //   } catch (error) {
  //     console.error(`❌ Failed to login as ${userType}:`, error.message);
  //     throw error;
  //   }
  // }

  // async performQAAdminLogin() {
  //   return this._performQALogin("QA_ADMIN_ONE_USERNAME", "QA_ADMIN_PASSWORD", "admin (QA)");
  // }

  // async performQAProviderLogin() {
  //   return this._performQALogin("QA_PROVIDER_ONE_USERNAME", "QA_PROVIDER_PASSWORD", "provider (QA)");
  // }

  // async performQAPatientLogin() {
  //   return this._performQALogin("QA_PATIENT_ONE_USERNAME", "QA_PATIENT_PASSWORD", "patient (QA)");
  // }

  // async performQACoordinatorLogin() {
  //   return this._performQALogin("QA_COORDINATOR_ONE_USERNAME", "QA_COORDINATOR_PASSWORD", "coordinator (QA)");
  // }

  // async performQASuperAdminLogin() {
  //   return this._performQALogin("QA_SUPERADMIN_USERNAME", "QA_SUPERADMIN_PASSWORD", "superadmin (QA)");
  // }
}
