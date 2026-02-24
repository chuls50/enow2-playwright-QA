import { BasePage } from "../../base-page.js";

export class DeviceMyAccountPage extends BasePage {
  constructor(page) {
    super(page);

    // Navigation elements
    this.profileIconButton = page.getByTestId("popover-trigger").first();
    this.accountSettingsButton = page.getByRole("button", { name: "SettingsGear Account settings" });
    this.notificationsButton = page.getByRole("button", { name: "Notifications" });

    // My Account Text (View Mode)
    this.myAccountHeading = page.getByRole("paragraph").filter({ hasText: "My account" });
    this.nameText = page.getByText("Name");
    this.deviceIdText = page.getByText("Device ID");
    this.phoneNumberText = page.getByText("Phone number");
    this.countryText = page.getByText("Country");
    this.stateText = page.getByText("State");
    this.cityText = page.getByText("City");
    this.zipCodeText = page.getByText("Zip code");
    this.address1Text = page.getByText("Address 1");
    this.address2Text = page.getByText("Address 2");

    // Hidden fields (should NOT be visible for Device users)
    this.firstNameText = page.getByText("First name");
    this.lastNameText = page.getByText("Last name");
    this.dobText = page.getByText("DOB");
    this.sexAssignedText = page.getByText("Sex Assigned at Birth");

    // Edit Profile button and modal
    this.editProfileButton = page.getByRole("button", { name: "Edit Edit" });
    this.editProfileModal = page.getByRole("dialog");
    this.editProfileDetailsHeaderText = page.getByText("Edit profile details");

    // Edit Profile modal inputs
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.deviceIdInput = page.getByRole("textbox", { name: "Device ID" });
    this.cityInput = page.getByRole("textbox", { name: "City" });
    this.zipCodeInput = page.getByRole("textbox", { name: "Zip code" });
    this.addressLine1Input = page.getByRole("textbox", { name: "Address line 1" });
    this.addressLine2Input = page.getByRole("textbox", { name: "Address line 2" });
    this.saveChangesButton = page.getByRole("button", { name: "Save changes" });

    // Edit Profile modal labels (for verification within dialog)
    this.modalNameLabel = page.getByRole("dialog").getByText("Name");
    this.modalDeviceIdLabel = page.getByRole("dialog").getByText("Device ID");
    this.modalCityLabel = page.getByRole("dialog").getByText("City");
    this.modalZipCodeLabel = page.getByRole("dialog").getByText("Zip code");
    this.modalAddressLine1Label = page.getByRole("dialog").getByText("Address line 1");
    this.modalAddressLine2Label = page.getByRole("dialog").getByText("Address line 2");
    this.modalCountryLabel = page.getByRole("dialog").getByText("Country");
    this.modalStateLabel = page.getByRole("dialog").getByText("State");
    this.modalPhoneNumberLabel = page.getByRole("dialog").getByText("Phone number");

    // Hidden modal fields (should NOT be visible)
    this.modalFirstNameLabel = page.getByRole("dialog").getByText("First name");
    this.modalLastNameLabel = page.getByRole("dialog").getByText("Last name");
    this.modalDobLabel = page.getByRole("dialog").getByText("DOB");
    this.modalSexAssignedLabel = page.getByRole("dialog").getByText("Sex Assigned at Birth");

    // Avatar/Photo elements
    this.profilePictureIcon = page.getByTestId("avatar");
    this.uploadPhotoButton = page.getByRole("button", { name: "Download Upload photo" });
    this.deletePhotoButton = page.getByRole("button", { name: "Trash Delete photo" });

    // Toast Messages
    this.profileUpdatedErrorToast = page.getByTestId("toast").getByText("Failed to update profile.");
    this.profileUpdatedSuccessToast = page.getByTestId("toast").getByText("Profile updated successfully!");
    this.timeZoneUpdatedToast = page.getByTestId("toast").getByText("Time zone updated");
    this.notificationPreferencesUpdatedToast = page.getByTestId("toast").getByText("Notification preferences").first();
    this.profilePictureUploadedToast = page.getByTestId("toast").getByText("Profile picture uploaded");
    this.profilePictureDeletedToast = page.getByTestId("toast").getByText("Profile picture deleted");
    this.languageUpdatedToast = page.getByText("Application language updated");
    this.languageUpdatedToastSpanish = page.getByText("Se actualizó el idioma de la");

    // Error Messages
    this.deviceIdExistsError = page.getByText("This Device ID already exists.");
    this.nameRequiredError = page.getByText("Name is required");
    this.deviceIdRequiredError = page.getByText("Device ID is required");

    // Language Settings
    this.applicationLanguageLabel = page.getByText("Application language");
    this.englishText = page.getByText("English");
    this.spanishText = page.getByText("Español");
    this.changeLanguageLink = page.getByRole("link", { name: "Change language" });
    this.changeLanguageDropdown = page.getByTestId("custom-select-item-wrapper");
    this.spanishDropdownItem = page.getByTestId("custom-dropdown-item-Spanish");

    // Time Zone Settings
    this.timeZoneLabel = page.getByText("Time zone", { exact: true });
    this.changeTimeZoneLink = page.getByRole("link", { name: "Change time zone" });
    this.automaticTimeZoneSwitchToggle = page.getByTestId("switch-div");

    // Notifications Section
    this.notificationsHeading = page.getByRole("paragraph").filter({ hasText: "Notifications" });
    this.emailLabel = page.getByText("Email");
    this.smsLabel = page.getByText("SMS");
    this.inAppLabel = page.getByText("In-app");
    this.notificationSwitchToggle = page.getByTestId("switch-div");

    // Delete Account (for negative check)
    this.deleteAccountButton = page.getByRole("button", { name: "Delete Account" });

    // Spanish language elements
    this.changeLanguageSpanishLink = page.getByRole("link", { name: "Cambiar idioma" });
    this.englishDropdownItemSpanish = page.getByTestId("custom-dropdown-item-Inglés");
    this.saveChangesSpanishButton = page.getByRole("button", { name: "Guardar cambios" });
  }

  // ========================================
  // NAVIGATION METHODS
  // ========================================

  async navigateToMyAccount() {
    await this.profileIconButton.click();
    await this.accountSettingsButton.click();
    await this.myAccountHeading.waitFor({ state: "visible" });
  }

  async navigateToNotifications() {
    await this.navigateToMyAccount();
    await this.notificationsButton.click();
    await this.notificationsHeading.waitFor({ state: "visible" });
  }

  // ========================================
  // EDIT PROFILE MODAL METHODS
  // ========================================

  async openEditProfileModal() {
    await this.editProfileButton.click();
    await this.editProfileModal.waitFor({ state: "visible" });
  }

  async fillName(name) {
    await this.nameInput.click();
    await this.nameInput.fill(name);
  }

  async fillDeviceId(deviceId) {
    await this.deviceIdInput.click();
    await this.deviceIdInput.fill(deviceId);
  }

  async fillCity(city) {
    await this.cityInput.click();
    await this.cityInput.fill(city);
  }

  async fillZipCode(zipCode) {
    await this.zipCodeInput.click();
    await this.zipCodeInput.fill(zipCode);
  }

  async fillAddressLine1(address) {
    await this.addressLine1Input.click();
    await this.addressLine1Input.fill(address);
  }

  async fillAddressLine2(address) {
    await this.addressLine2Input.click();
    await this.addressLine2Input.fill(address);
  }

  async fillAddressFields({ city, zipCode, addressLine1, addressLine2 }) {
    if (city !== undefined) await this.fillCity(city);
    if (zipCode !== undefined) await this.fillZipCode(zipCode);
    if (addressLine1 !== undefined) await this.fillAddressLine1(addressLine1);
    if (addressLine2 !== undefined) await this.fillAddressLine2(addressLine2);
  }

  async clearAddressFields() {
    await this.fillAddressFields({
      city: "",
      zipCode: "",
      addressLine1: "",
      addressLine2: "",
    });
  }

  async saveChanges() {
    await this.saveChangesButton.click();
  }

  // ========================================
  // PHOTO METHODS
  // ========================================

  async uploadProfilePhoto(filePath) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.uploadPhotoButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async deleteProfilePhoto() {
    await this.deletePhotoButton.click();
  }

  // ========================================
  // LANGUAGE METHODS
  // ========================================

  async changeLanguageToSpanish() {
    await this.changeLanguageLink.click();
    await this.changeLanguageDropdown.click();
    await this.spanishDropdownItem.click();
    await this.saveChangesButton.click();
  }

  async changeLanguageToEnglish() {
    await this.changeLanguageSpanishLink.click();
    await this.changeLanguageDropdown.click();
    await this.englishDropdownItemSpanish.click();
    await this.saveChangesSpanishButton.click();
  }

  // ========================================
  // TIME ZONE METHODS
  // ========================================

  async toggleTimeZone() {
    await this.changeTimeZoneLink.click();
    await this.automaticTimeZoneSwitchToggle.click();
    await this.saveChangesButton.click();
  }

  // ========================================
  // NOTIFICATION METHODS
  // ========================================

  async toggleNotificationSwitch(index) {
    await this.notificationSwitchToggle.nth(index).click();
  }

  // ========================================
  // HELPER METHODS
  // ========================================

  getProfilePictureInitial(letter) {
    return this.profilePictureIcon.locator("div").filter({ hasText: letter }).locator("div");
  }
}
