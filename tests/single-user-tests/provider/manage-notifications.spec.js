import { test, expect } from "@playwright/test";
import { NotificationsPage } from "../../models/pages/provider/provider-notifications.page.js";
import { ROLES, useRole } from "../../utils/auth-helpers.js";

// ========================================
// TEST DATA CONSTANTS
// ========================================
const TEST_DATA = {
  REMINDER: {
    // Valid reminder values
    ADDITIONAL_VALUE: "10",
    // Invalid reminder values for validation tests
    INVALID_ZERO: "0",
    INVALID_MINUTES: "61",
    INVALID_HOURS: "25",
    INVALID_DAYS: "31",
  },
  UNITS: {
    MINUTES: "minutes",
    HOURS: "hours",
    DAYS: "days",
  },
};

// Manage Notifications - Total Tests 12 (including 1 skipped)

test.describe("Provider @regression", () => {
  test.use(useRole(ROLES.PROVIDER));
  let notificationsPage;

  test.beforeEach(async ({ page }) => {
    notificationsPage = new NotificationsPage(page);
    await notificationsPage.navigateToNotificationsPage();
  });

  test('Verify navigation to "Notifications" screen @[111272] @provider @ui', async () => {
    // Wait for the title to be visible
    await notificationsPage.title.waitFor({ state: "visible" });

    // Verify page elements
    await expect(notificationsPage.title).toBeVisible();
    await expect(notificationsPage.header).toBeVisible();
    await expect(notificationsPage.notificationMethods).toBeVisible();
    await expect(notificationsPage.emailNotification).toBeVisible();
    await expect(notificationsPage.emailNotificationSwitch).toBeVisible();
    await expect(notificationsPage.smsNotification).toBeVisible();
    await expect(notificationsPage.smsNotificationSwitch).toBeVisible();
    await expect(notificationsPage.pushNotification).toBeVisible();
    await expect(notificationsPage.pushNotificationSwitch).toBeVisible();
    await expect(notificationsPage.sessionReminder).toBeVisible();
    await expect(notificationsPage.sessionReminderText).toBeVisible();
    await expect(notificationsPage.remindMe).toBeVisible();
    await expect(notificationsPage.changeSessionReminderButton).toBeVisible();
  });

  test("Verify toggle behavior for Notification methods @[111273] @provider @functional", async () => {
    // capture the initial state
    const initialEmailState = await notificationsPage.emailNotificationSwitch.isChecked();
    const initialSmsState = await notificationsPage.smsNotificationSwitch.isChecked();
    const initialPushState = await notificationsPage.pushNotificationSwitch.isChecked();

    // click toggles
    await notificationsPage.toggleNotificationSwitch(notificationsPage.emailNotificationSwitch);
    await notificationsPage.toggleNotificationSwitch(notificationsPage.smsNotificationSwitch);
    await notificationsPage.toggleNotificationSwitch(notificationsPage.pushNotificationSwitch);

    // verify final state is opposite of initial state
    await expect(notificationsPage.emailNotificationSwitch).toBeChecked({ checked: !initialEmailState });
    await expect(notificationsPage.smsNotificationSwitch).toBeChecked({ checked: !initialSmsState });
    await expect(notificationsPage.pushNotificationSwitch).toBeChecked({ checked: !initialPushState });

    // reset
    await notificationsPage.toggleNotificationSwitch(notificationsPage.emailNotificationSwitch);
    await notificationsPage.toggleNotificationSwitch(notificationsPage.smsNotificationSwitch);
    await notificationsPage.toggleNotificationSwitch(notificationsPage.pushNotificationSwitch);
  });

  test("Verify navigation to set Session Reminders screen @[111274] @provider @ui", async () => {
    await notificationsPage.openChangeSessionReminders();
    await expect(notificationsPage.sessionRemindersModal).toBeVisible();
    await expect(notificationsPage.sessionRemindersModalHeader).toBeVisible();
    await expect(notificationsPage.sessionRemindersInput).toBeVisible();
    await expect(notificationsPage.sessionRemindersDropdown).toBeVisible();
    await expect(notificationsPage.sessionRemindersCancelButton).toBeVisible();
    await expect(notificationsPage.sessionRemindersSaveButton).toBeVisible();
    await expect(notificationsPage.sessionRemindersXClose).toBeVisible();
  });

  test("Verify Remind Me dropdown behavior @[111275] @provider @functional", async () => {
    await notificationsPage.openChangeSessionReminders();
    await notificationsPage.sessionRemindersDropdown.click();
    await expect(notificationsPage.sessionRemindersDropdownOption1).toBeVisible();
    await expect(notificationsPage.sessionRemindersDropdownOption2).toBeVisible();
    await expect(notificationsPage.sessionRemindersDropdownOption3).toBeVisible();
    await notificationsPage.sessionRemindersDropdownOption2.click();
    const selectedOption = await notificationsPage.sessionRemindersDropdown.innerText();
    expect(selectedOption).toContain("hours before");
    await expect(notificationsPage.sessionRemindersSaveButton).toBeEnabled();
  });

  test("Verify Cancel button functionality on Session Reminders screen @[111276] @provider @functional", async () => {
    // change the default reminder to 'additional reminder' and then cancel
    await notificationsPage.openChangeSessionReminders();
    await notificationsPage.sessionRemindersDropdown.click();
    await expect(notificationsPage.sessionRemindersDropdownOption1).toBeVisible();
    await expect(notificationsPage.sessionRemindersDropdownOption2).toBeVisible();
    await expect(notificationsPage.sessionRemindersDropdownOption3).toBeVisible();
    await notificationsPage.sessionRemindersDropdownOption2.click();
    const selectedOption = await notificationsPage.sessionRemindersDropdown.innerText();
    expect(selectedOption).toContain("hours before");

    // verify save button is enabled with valid selection
    await expect(notificationsPage.sessionRemindersSaveButton).toBeEnabled();

    // cancel and verify the reminder time is not changed
    await notificationsPage.sessionRemindersCancelButton.click();
    await expect(notificationsPage.sessionRemindersModal).toBeHidden();
    await notificationsPage.openChangeSessionReminders();
    await expect(notificationsPage.sessionRemindersDropdown).toBeVisible();
    await expect(notificationsPage.sessionRemindersDropdownOption2).toBeHidden();
  });

  test("Verify Save changes button with valid values @[111277] @provider @functional", async () => {
    // Remove additional reminder if already present
    await notificationsPage.removeAdditionalReminderIfPresent();

    // Add an additional reminder using POM method
    await notificationsPage.addReminder(TEST_DATA.REMINDER.ADDITIONAL_VALUE, TEST_DATA.UNITS.HOURS);
    await expect(notificationsPage.successMessage).toBeVisible();
    await expect(notificationsPage.additionalReminder).toBeVisible();

    // Clean up - remove the added reminder
    await notificationsPage.remindMeXCloseButton.click();
    await expect(notificationsPage.successMessage).toBeVisible();
  });

  test("Validate Session Reminder Settings @[111278] @provider @functional", async () => {
    await expect(notificationsPage.sessionReminder).toBeVisible();
    await expect(notificationsPage.sessionReminderText).toBeVisible();
    await expect(notificationsPage.remindMe).toBeVisible();
    await expect(notificationsPage.defaultReminder).toBeVisible();
    await expect(notificationsPage.changeSessionReminderButton).toBeVisible();
    await expect(notificationsPage.changeSessionReminderButton).toBeEnabled();
  });

  test("Verify invalid reminder value handling @[111279] @provider @functional", async () => {
    // verify zero value error message
    await notificationsPage.openAddSessionReminders();
    await notificationsPage.fillReminderValue(TEST_DATA.REMINDER.INVALID_ZERO);
    await notificationsPage.sessionRemindersSaveButton.click();
    await expect(notificationsPage.errorMessageGreaterThanZero).toBeVisible();

    // verify out of range value for minutes error message
    await notificationsPage.fillReminderValue(TEST_DATA.REMINDER.INVALID_MINUTES);
    await notificationsPage.selectReminderTimeUnit(TEST_DATA.UNITS.MINUTES);
    await notificationsPage.sessionRemindersSaveButton.click();
    await expect(notificationsPage.errorMessageNumberBetween1And60Minutes).toBeVisible();

    // verify out of range value for hours error message
    await notificationsPage.fillReminderValue(TEST_DATA.REMINDER.INVALID_HOURS);
    await notificationsPage.selectReminderTimeUnit(TEST_DATA.UNITS.HOURS);
    await notificationsPage.sessionRemindersSaveButton.click();
    await expect(notificationsPage.errorMessageNumberBetween1And24Hours).toBeVisible();

    // verify out of range value for days error message
    await notificationsPage.fillReminderValue(TEST_DATA.REMINDER.INVALID_DAYS);
    await notificationsPage.selectReminderTimeUnit(TEST_DATA.UNITS.DAYS);
    await notificationsPage.sessionRemindersSaveButton.click();
    await expect(notificationsPage.errorMessageNumberBetween1And30Days).toBeVisible();
  });

  test("Verify state persistence after page reload @[111280] @provider @functional", async () => {
    // capture the initial state
    const initialEmailState = await notificationsPage.emailNotificationSwitch.isChecked();

    // click toggle
    await notificationsPage.toggleNotificationSwitch(notificationsPage.emailNotificationSwitch);

    // verify state persistence
    await notificationsPage.reloadAndWait();
    const postReloadEmailState = await notificationsPage.emailNotificationSwitch.isChecked();

    // Verify the state has changed
    expect(postReloadEmailState).toBe(!initialEmailState);

    // reset
    await notificationsPage.toggleNotificationSwitch(notificationsPage.emailNotificationSwitch);
  });

  test("Verify default reminder time display @[111281] @provider @ui", async () => {
    await notificationsPage.sessionReminder.waitFor({ state: "visible" });
    await expect(notificationsPage.defaultReminder).toBeVisible();
  });

  test("Verify Notification methods section consistency @[111282] @provider @ui", async () => {
    await notificationsPage.displayedEmail.waitFor({ state: "visible" });
    await expect(notificationsPage.displayedEmail).toBeVisible();
  });

  test.skip("Verify SMS toggle behavior for missing phone number @[111283]", async () => {});
});
