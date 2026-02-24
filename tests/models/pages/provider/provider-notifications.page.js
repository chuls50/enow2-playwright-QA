import { BasePage } from "../../base-page.js";

export class NotificationsPage extends BasePage {
  constructor(page) {
    super(page);

    // Test data for provider user
    this.displayedEmail = page.getByText("chuls+prov1codytest@globalmed.com");

    // Main page elements
    this.title = page.locator("div").filter({ hasText: /^Account settings$/ });
    this.navbar = page.getByRole("navigation");
    this.header = page.getByRole("paragraph").filter({ hasText: "Notifications" });
    this.headerText = page.getByText("Manage your notification");
    this.notificationMethods = page.getByText("Notification methods");
    this.emailNotification = page.getByText("Email");
    this.emailNotificationSwitch = page.getByTestId("switch-div").first();
    this.smsNotification = page.getByText("SMS");
    this.smsNotificationSwitch = page.getByTestId("switch-div").nth(1);
    this.pushNotification = page.getByText("In-app");
    this.pushNotificationSwitch = page.getByTestId("switch-div").nth(2);
    this.displayedPhone = page.getByText("US (+1)");
    this.sessionReminder = page.getByText("Session reminder");
    this.sessionReminderText = page.getByText("Set the time you'd like to be");
    this.remindMe = page.getByText("Remind me");
    this.changeSessionReminderButton = page.locator('a:has-text("Change")').first();
    this.addSessionReminderButton = page.getByRole("button", { name: "Add reminder" });
    this.defaultReminder = page.getByText("5 minutes before the session");

    // Set Session Reminders Modal elements
    this.sessionRemindersModal = page.getByTestId("modal");
    this.sessionRemindersModalHeader = page.getByText("Set session reminders");
    this.sessionRemindersInput = page.getByRole("textbox", { name: "Time value" });
    this.sessionRemindersDropdown = page.getByTestId("custom-select-item-wrapper");
    this.sessionRemindersDropdownOption1 = page.getByTestId("custom-dropdown-item-minutes before");
    this.sessionRemindersDropdownOption2 = page.getByTestId("custom-dropdown-item-hours before");
    this.sessionRemindersDropdownOption3 = page.getByTestId("custom-dropdown-item-days before");
    this.sessionRemindersCancelButton = page.getByRole("button", { name: "Cancel" });
    this.sessionRemindersSaveButton = page.getByRole("button", { name: "Save" });
    this.sessionRemindersXClose = page.getByRole("button", { name: "XClose" });

    // Extra reminder added in test
    this.additionalReminder = page.getByText("10 hours before the session");

    // Close button for the additional reminder
    this.remindMeXCloseButton = page.getByRole("link", { name: "XClose" }).nth(2);

    // Success message after saving changes
    this.successMessage = page.getByText("Notification preferences updated successfully.");

    // Error message for invalid input
    this.errorMessageGreaterThanZero = page.getByText("Number must be greater than 0");
    this.errorMessageNumberBetween1And60Minutes = page.getByText("Value must be between 1 and 60 minutes");
    this.errorMessageNumberBetween1And24Hours = page.getByText("Value must be between 1 and 24 hours");
    this.errorMessageNumberBetween1And30Days = page.getByText("Value must be between 1 and 30 days");
  }

  async navigateToNotificationsPage() {
    await this.page.goto(`${process.env.UAT_URL}/account-settings/notifications`);

    // Wait for spinner to disappear if present
    await this.waitForSpinnerToDisappear();

    // Wait for Notifications page to load
    await this.header.waitFor({ state: "visible" });
  }

  async openChangeSessionReminders() {
    await this.changeSessionReminderButton.click();
    await this.sessionRemindersModal.waitFor({ state: "visible" });
  }

  async openAddSessionReminders() {
    await this.addSessionReminderButton.click();
    await this.sessionRemindersModal.waitFor({ state: "visible" });
  }

  async closeSessionRemindersModal() {
    await this.sessionRemindersCancelButton.click();
    await this.sessionRemindersModal.waitFor({ state: "hidden" });
  }

  async selectReminderTimeUnit(unit) {
    await this.sessionRemindersDropdown.click();
    const unitMap = {
      minutes: this.sessionRemindersDropdownOption1,
      hours: this.sessionRemindersDropdownOption2,
      days: this.sessionRemindersDropdownOption3,
    };
    await unitMap[unit].click();
  }

  async fillReminderValue(value) {
    await this.sessionRemindersInput.clear();
    await this.sessionRemindersInput.type(value);
  }

  async addReminder(value, unit) {
    await this.openAddSessionReminders();
    await this.fillReminderValue(value);
    await this.selectReminderTimeUnit(unit);
    await this.sessionRemindersSaveButton.click();
  }

  async removeAdditionalReminderIfPresent() {
    if (await this.additionalReminder.isVisible()) {
      await this.remindMeXCloseButton.click();
      await this.successMessage.waitFor({ state: "visible" });
    }
  }

  async toggleNotificationSwitch(switchLocator) {
    await switchLocator.click();
    await this.page.waitForTimeout(500);
  }

  async reloadAndWait() {
    await this.page.reload();
    await this.waitForSpinnerToDisappear();
    await this.header.waitFor({ state: "visible" });
  }
}
