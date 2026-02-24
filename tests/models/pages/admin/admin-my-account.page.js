import { expect } from "@playwright/test";
import { BasePage } from "../../base-page.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MyAccountPage extends BasePage {
  constructor(page) {
    super(page);

    this.header = page.getByRole("heading", { name: "Account settings" });

    // Test data for admin user
    this.profileEmail = page.getByText("chuls+admincodytest@globalmed");

    // My Account Section
    this.myAccountLabel = page.getByRole("paragraph").filter({ hasText: "My account" });
    this.myAccountText = page.getByText("Update and manage your account");
    this.profileIcon = page.getByTestId("avatar").locator("div").nth(1);
    this.profileName = page.getByText("cody test admin Cody Test Institution");
    this.uploadPhotoButton = page.getByRole("button", { name: "Download Upload photo" });
    this.deletePhotoButton = page.getByRole("button", { name: "Trash Delete photo" });

    // Profile Details Section
    this.profileDetailsSection = page.getByText("Profile details");
    this.profileDetailsFirstName = page.getByText("First name");
    this.profileDetailsLastName = page.getByText("Last name");
    this.profileLanguagesSpoken = page.getByText("Languages spoken");
    this.profileCountry = page.getByText("Country");
    this.profileState = page.getByText("State");
    this.profilePhoneNumber = page.getByText("Phone number");
    this.profileDetailsEditButton = page
      .locator("div")
      .filter({ hasText: /^Profile detailsEdit$/ })
      .getByRole("button");

    // Application Language Section
    this.applicationLanguageSection = page.getByText("Application language");
    this.changeLanguageButton = page.getByRole("link", { name: "Change language" });
    this.changeLanguageModal = page.getByTestId("modal").getByText("Change language");

    // Time Zone Section
    this.timeZoneSection = page.getByText("Time zone", { exact: true });
    this.changeTimeZoneButton = page.getByRole("link", { name: "Change time zone" });
    this.changeTimeZoneModal = page.getByTestId("modal").getByText("Change time zone");

    // Account Deletion Section
    this.accountDeletionSection = page.getByText("Account", { exact: true });
    this.accountDeletionButton = page.getByText("Delete account", { exact: true });
    this.accountDeletionModal = page.getByTestId("modal");
    this.accountDeletionHeader = page.getByText("Delete account?");
    this.accountDeleteText = page.getByText("Deleting your account will");
    this.accountDeletionModalXCloseButton = page.getByRole("button", { name: "XClose" });
    this.accountDeletionNoCancelButton = page.getByRole("button", { name: "No, cancel" });
    this.accountDeletionConfirmButton = page.getByRole("button", { name: "Yes, delete" });

    // Edit Profile Modal
    this.editProfileButton = page.getByRole("button", { name: "Edit Edit" });
    this.editProfileModal = page.getByText("Edit profile detailsFirst");
    this.editProfileHeader = page.getByText("Edit profile details");
    this.editProfileFirstNameLabel = page.getByRole("dialog").getByText("First name");
    this.editProfileLastNameLabel = page.getByRole("dialog").getByText("Last name");
    this.editProfileLanguagesLabel = page.getByRole("dialog").getByText("Languages spoken");
    this.editProfileCountryLabel = page.getByRole("dialog").getByText("Country");
    this.editProfileStateLabel = page.getByRole("dialog").getByText("State");
    this.editProfileFirstNameInput = page.getByRole("textbox", { name: "First name" });
    this.editProfileLastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.editProfilePhoneInput = page.getByRole("textbox", { name: "Phone number" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.saveChangesButton = page.getByRole("button", { name: "Save changes" });

    // Language Dropdown Elements
    this.languagesDropdownWrapper = page
      .getByRole("dialog")
      .locator("div")
      .filter({ hasText: /^Languages spokenEnglish$/ })
      .getByTestId("custom-select-item-wrapper");
    this.languageSpanishOption = page.getByTestId("custom-dropdown-item-Spanish");
    this.languageTag = page.getByTestId("tag");
    this.languageTagCloseButton = page.getByTestId("tag").getByRole("button", { name: "XClose" });
    this.spanishChip = page.locator("div").filter({ hasText: /^Spanish$/ });
    this.closeButtonNth2 = page.getByRole("button", { name: "XClose" }).nth(2);

    // Country/State Dropdown Elements
    this.countryDropdown = page.getByTestId("custom-select-item-wrapper").nth(1);
    this.countryAfghanistanOption = page.getByTestId("custom-dropdown-item-Afghanistan");
    this.stateDropdown = page.getByTestId("custom-select-item-wrapper").nth(2);
    this.stateDropdownMenu = page.getByTestId("custom-dropdown");
    this.stateBadakhshanOption = page.getByText("Badakhshan");

    // Phone Country Code Elements
    this.phoneCountryCodeSelector = page
      .locator("div")
      .filter({ hasText: /^US \(\+1\)$/ })
      .nth(1);

    // Success Messages
    this.profileUpdatedMessage = page.getByText("Profile updated successfully");
    this.profileUpdatedSuccessMessage = page.getByText("SuccessProfile updated");

    // Validation Error Messages
    this.firstNameRequiredError = page.getByText("First name is required");
    this.lastNameRequiredError = page.getByText("Last name is required");
    this.languageRequiredError = page.getByText("At least one language is");

    // Error Messages
    this.invalidImageErrorMessage = page.getByText("Please upload an image file.");
    this.fileSizeExceededMessage = page.getByText("File size should not exceed 5 MB");
    this.profilePictureDeletedMessage = page.getByText("Profile picture deleted successfully.");
  }

  async navigateToMyAccount() {
    await this.page.goto(`${process.env.UAT_URL}/account-settings/my-account`);
    await this.waitForSpinnerToDisappear();
    await this.myAccountLabel.waitFor({ state: "visible" });
  }

  async uploadFile(filePath) {
    // If filePath is a Promise (result of calling getTestImagePath without await), resolve it first
    if (filePath instanceof Promise) {
      filePath = await filePath;
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`Test file not found at: ${filePath}`);
    }

    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.uploadPhotoButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Wait for upload to complete
    await this.page.getByText("Uploading...").waitFor({ state: "hidden" });
  }

  async waitForUploadToComplete() {
    await expect(this.page.getByText("Uploading...")).not.toBeVisible();
  }

  async getTestImagePath() {
    return path.join(__dirname, "../../../images/profile-icon.jpg");
  }

  async getInvalidFilePath() {
    return path.join(__dirname, "../../../images/invalid-image.txt");
  }

  async getLargeImagePath() {
    return path.join(__dirname, "../../../images/large-image.jpg");
  }

  // Edit Profile Modal Methods
  async openEditProfileModal() {
    await this.editProfileButton.click();
    await this.editProfileModal.waitFor({ state: "visible" });
  }

  async closeEditProfileModal() {
    await this.cancelButton.click();
    await this.editProfileModal.waitFor({ state: "hidden" });
  }

  async fillFirstName(name) {
    await this.editProfileFirstNameInput.click();
    await this.editProfileFirstNameInput.fill(name);
  }

  async fillLastName(name) {
    await this.editProfileLastNameInput.click();
    await this.editProfileLastNameInput.fill(name);
  }

  async fillPhoneNumber(phone) {
    await this.editProfilePhoneInput.click();
    await this.editProfilePhoneInput.fill(phone);
  }

  async saveChanges() {
    await this.saveChangesButton.click();
    await this.profileUpdatedMessage.waitFor({ state: "visible" });
  }

  async resetSpanishLanguageIfPresent() {
    const isVisible = await this.spanishChip.isVisible();
    if (isVisible) {
      await this.spanishChip.getByRole("button").click();
      await this.saveChangesButton.click();
      await expect(this.profileUpdatedSuccessMessage).toBeVisible();
      await this.editProfileButton.click();
      await this.editProfileModal.waitFor({ state: "visible" });
    }
  }

  async addSpanishLanguage() {
    await this.languagesDropdownWrapper.click();
    await this.languageSpanishOption.click();
  }

  async selectCountry(countryName) {
    await this.countryDropdown.click();
    await this.page.getByTestId(`custom-dropdown-item-${countryName}`).click();
  }

  async selectState(stateName) {
    await this.stateDropdown.click();
    await this.page.getByText(stateName).click();
  }

  async clearAllRequiredFields() {
    await this.fillFirstName("");
    await this.fillLastName("");
    await this.languageTagCloseButton.click();
  }
}
