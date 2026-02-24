import { BasePage } from "../../base-page.js";

export class PatientSessionDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    // ========================================
    // SESSION DETAILS NAVIGATION ELEMENTS
    // ========================================
    this.profileIconButton = page.getByTestId("popover-trigger").first();
    this.backToDashboardButton = page.getByRole("button", { name: "Back to Dashboard" });

    // ========================================
    // SESSION DETAILS CONTENT (VIEW MODE)
    // ========================================
    this.sessionDetailsHeading = page.getByRole("heading", { name: "Session Details" });
    this.sessionDetailsText = page.getByText("Session Details");
    this.sessionDetailsHeaderPattern = page
      .locator("div")
      .filter({ hasText: /^Session Details#[A-Z0-9]+$/ })
      .first();
    this.sessionIdText = page.getByText("Session ID");
    this.patientNameText = page.getByText("Patient Name");
    this.providerNameText = page.getByText("Provider Name");
    this.appointmentDateText = page.getByText("Appointment Date");
    this.appointmentTimeText = page.getByText("Appointment Time");
    this.sessionStatusText = page.getByText("Session Status");

    // ========================================
    // SESSION MANAGEMENT ELEMENTS
    // ========================================
    this.joinSessionButton = page.getByRole("button", { name: "Join Session" });
    this.cancelSessionButton = page.getByRole("button", { name: "Cancel Session" });
    this.rescheduleSessionButton = page.getByRole("button", { name: "Reschedule Session" });
    this.viewSessionNotesButton = page.getByRole("button", { name: "View Session Notes" });

    // ========================================
    // MODAL ELEMENTS
    // ========================================
    this.cancelConfirmationModal = page.getByTestId("modal");
    this.modalCancelSessionButton = page.getByRole("dialog").getByRole("button", { name: "Cancel Session" });
    this.modalKeepSessionButton = page.getByRole("dialog").getByRole("button", { name: "Keep Session" });
    this.modalCloseButton = page.getByRole("button", { name: "XClose" });

    // ========================================
    // TOAST MESSAGES
    // ========================================
    this.sessionCancelledToast = page.getByTestId("toast").getByText("Session cancelled successfully");
    this.sessionJoinedToast = page.getByTestId("toast").getByText("Joining session");
    this.sessionErrorToast = page.getByTestId("toast").getByText("Error occurred");

    // ========================================
    // SYMPTOMS TAB ELEMENTS
    // ========================================
    this.symptomsTabButton = page.getByRole("button", { name: "Symptoms" });
    this.describedSymptomsText = page.getByText("Described symptoms");
    this.reportedSymptomsText = page.getByText("Reported symptoms");
    this.otherSymptomsText = page.getByText("Other symptoms");
    this.presentText = page.getByText("Present");
    this.absentText = page.getByText("Absent");
    this.submittedOnText = page.getByText(/Submitted on/);
    this.riskFactorsText = page.getByText("Risk Factors");
    this.smokingCigarettesText = page.getByText("Smoking cigarettes");
    this.residenceExposureCheckIcon = page
      .getByRole("listitem")
      .filter({ hasText: "Residence or recent travel," })
      .getByTestId("icon-Check");
    this.coldExposureCloseIcon = page.getByRole("listitem").filter({ hasText: "Reported exposure to cold" }).getByTestId("icon-XClose");
  }

  // ========================================
  // NAVIGATION METHODS
  // ========================================
  async navigateToSessionDetails(sessionId) {
    await this.page.goto(`${process.env.UAT_URL}/session-details/${sessionId}`);
    await this.waitForSpinnerToDisappear();
    await this.sessionDetailsHeading.waitFor({ state: "visible" });
  }

  async navigateBackToDashboard() {
    await this.backToDashboardButton.click();
    await this.page.waitForURL(/\/dashboard/);
  }

  // ========================================
  // SESSION MANAGEMENT METHODS
  // ========================================
  async joinSession() {
    await this.joinSessionButton.click();
    await this.sessionJoinedToast.waitFor({ state: "visible" });
  }

  async cancelSession() {
    await this.cancelSessionButton.click();
    await this.cancelConfirmationModal.waitFor({ state: "visible" });
    await this.modalCancelSessionButton.click();
    await this.sessionCancelledToast.waitFor({ state: "visible" });
  }

  async rescheduleSession() {
    await this.rescheduleSessionButton.click();
    // Navigate to reschedule flow
  }

  // ========================================
  // ========================================
  // HELPER METHODS
  // ========================================
  async waitForSessionDetailsToLoad() {
    await this.sessionDetailsHeading.waitFor({ state: "visible" });
  }

  async verifySessionInformation(expectedData) {
    if (expectedData.sessionId) {
      await expect(this.sessionIdText).toContainText(expectedData.sessionId);
    }
    if (expectedData.patientName) {
      await expect(this.patientNameText).toContainText(expectedData.patientName);
    }
    if (expectedData.providerName) {
      await expect(this.providerNameText).toContainText(expectedData.providerName);
    }
  }

  // ========================================
  // SYMPTOMS TAB ACTIONS
  // ========================================

  async navigateToSymptomsTab() {
    await this.symptomsTabButton.click();
  }

  async waitForSymptomsTabElements() {
    await this.describedSymptomsText.waitFor({ state: "visible" });
    await this.reportedSymptomsText.waitFor({ state: "visible" });
    await this.otherSymptomsText.waitFor({ state: "visible" });
  }

  async waitForSymptomsData() {
    await this.submittedOnText.waitFor({ state: "visible" });
    await this.riskFactorsText.waitFor({ state: "visible" });
  }
}
