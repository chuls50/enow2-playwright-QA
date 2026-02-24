import { BasePage } from "../../base-page.js";

export class PatientDashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.profileIconButton = page.getByTestId("popover-trigger").first();
    this.navigationTestId = page.getByTestId("navigation");
    this.dashboardLink = page.locator("a").filter({ hasText: "Dashboard" });

    this.upcomingAppointmentsHeading = page.getByRole("heading", { name: "Upcoming appointments" });
    this.pastAppointmentsHeading = page.getByRole("heading", { name: "Past appointments" });
    this.pastAppointmentsActionsCell = page.getByTestId("cell-0-actions");
    this.pastAppointmentsViewDetailsLink = page.getByTestId("cell-0-actions").getByRole("link", { name: "View details" });
    this.sessionDetailsHeadingText = page.getByText("Session Details");
    this.yearDropdownLink = page.getByRole("link", { name: "ChevronDown" });
    this.itemsWrapperTestId = page.getByTestId("items-wrapper");

    this.scheduleAppointmentLink = page.getByText("Schedule an appointment");
    this.seeProviderNowLink = page.getByText("See a provider now");

    // Service and Provider Selection
    this.selectServiceLink = page.getByRole("link", { name: "Select service" });
    this.changeProviderLink = page.getByRole("link", { name: "Change provider" });
    this.saveButton = page.getByRole("button", { name: "Save" });

    // Time Slot Selection
    this.firstAvailableTimeSlot = page.locator("._container_j891W").first();

    // Consent and Scheduling
    this.noticeOfConsentCheckbox = page.getByTestId("erroring-text").locator("span").first();
    this.scheduleVisitButton = page.getByRole("button", { name: "Schedule visit" });
    this.requestOnDemandButton = page.getByRole("button", { name: "Request on demand care" });

    this.modalUserProfileSection = page.getByTestId("popover-content");
    this.userProfileAccountSettingsButton = page.getByRole("button", { name: "SettingsGear Account settings" });
    this.userProfileHelpButton = page.getByRole("button", { name: "InfoCircle Help" });
    this.userProfilePrivacyPolicyButton = page.getByRole("button", { name: "Policy Privacy policy" });
    this.userProfileLogoutButton = page.getByRole("button", { name: "LogOut Log out" });

    this.sessionScheduledText = page.getByText("Session scheduled").first();
    this.sessionDeclinedText = page.getByText("Session request declined").first();
    this.dotsVButton = page.getByRole("button", { name: "DotsV" });
    this.cancelSessionButton = page.getByRole("button", { name: "XCircle Cancel session" });
    this.confirmCancelButton = page.getByRole("button", { name: "Yes, cancel" });
    this.confirmDeclineButton = page.getByRole("button", { name: "Yes, decline" });

    this.symptomCheckerHeading = page.getByRole("heading", { name: "My symptoms" });
    this.symptomCheckerContinueButton = page.getByRole("button", { name: "Continue" });

    this.needHelpModal = page.getByTestId("modal");
    this.modalCloseButton = page.getByRole("button", { name: "XClose" });

    this.sessionCanceledText = page.getByText("Session canceled").first();
    this.sessionCanceledToast = page.getByTestId("toast").getByText("Session canceled");

    this.appointmentConfirmedHeading = page.getByRole("heading", { name: "Appointment confirmed" });
    this.appointmentConfirmedText = page.getByText("Appointment confirmed");
    this.goToAppointmentsButton = page.getByRole("button", { name: "Go to my appointments" });
    this.sessionRequestedHeading = page.getByRole("heading", { name: "Session requested" });
    this.appointmentDeclinedHeading = page.getByRole("heading", { name: "Appointment declined" });
  }

  async navigateToPatientDashboard() {
    await this.page.goto(`${process.env.UAT_URL}/dashboard`);
    await this.waitForSpinnerToDisappear();
    await this.upcomingAppointmentsHeading.waitFor({ state: "visible" });
  }

  async navigateToScheduleAppointment() {
    await this.scheduleAppointmentLink.click();
    await this.page.waitForURL(/\/dashboard\/schedule-appointment/);
  }

  async navigateToSeeProviderNow() {
    await this.seeProviderNowLink.click();
    await this.page.waitForURL(/\/dashboard\/see-provider-now/);
  }

  async navigateToAccountSettings() {
    await this.profileIconButton.click();
    await this.userProfileAccountSettingsButton.click();
    await this.page.waitForURL(/\/account-settings\/my-account/);
  }

  async openHelpModal() {
    await this.profileIconButton.click();
    await this.userProfileHelpButton.click();
    await this.needHelpModal.waitFor();
  }

  async logout() {
    await this.profileIconButton.click();
    await this.userProfileLogoutButton.click();
    await this.page.waitForURL(/\/login/);
  }

  async resetStateIfSessionScheduled() {
    if (await this.sessionScheduledText.isVisible()) {
      await this.sessionScheduledText.click();
      await this.dotsVButton.click();
      await this.cancelSessionButton.click();
      await this.confirmCancelButton.click();
      await this.sessionCanceledToast.waitFor({ state: "visible" });
      await this.page.waitForTimeout(3000);
      await this.modalCloseButton.click();
    }
  }

  async skipManualSymptomChecker() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(2000);
    if (await this.symptomCheckerHeading.isVisible()) {
      await this.symptomCheckerContinueButton.click();
    }
  }

  async selectFirstAvailableTimeSlot() {
    await this.firstAvailableTimeSlot.waitFor({ state: "visible" });
    await this.firstAvailableTimeSlot.click();
  }

  async selectService(serviceName) {
    await this.selectServiceLink.click();
    await this.page.getByRole("radio", { name: serviceName }).check();
    await this.saveButton.click();
  }

  async selectProvider(providerName) {
    await this.changeProviderLink.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText(providerName, { exact: false }).first().click();
    await this.saveButton.click();
  }

  async cancelScheduledAppointment() {
    await this.dotsVButton.first().waitFor({ state: "visible" });
    await this.dotsVButton.first().click();
    await this.cancelSessionButton.click();
    await this.confirmCancelButton.click();
  }
}
