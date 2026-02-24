import { BasePage } from "../../base-page.js";

export class ProviderSessionOverviewPage extends BasePage {
  constructor(page) {
    super(page);

    // Session Scheduling Elements
    this.scheduleSessionButton = page.getByRole("button", { name: "CalendarPlus Schedule session" });
    this.changePatientLink = page.getByRole("link", { name: "Change patient" });
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.firstTimeSlot = page.locator("._container_j891W").first();
    this.scheduleVisitButton = page.getByRole("button", { name: "Schedule visit" });

    // Toast Messages
    this.sessionScheduledToast = page.getByTestId("toast").getByText("Session scheduled", { exact: true });
    this.successToast = page.getByText("Success");
    this.sessionRescheduledMessage = page.getByRole("paragraph").filter({ hasText: "Session rescheduled" });
    this.sessionRequestDeclinedToast = page.getByTestId("toast").getByText("Session request declined", { exact: true });
    this.sessionRequestCanceledToast = page.getByTestId("toast").getByText("Session canceled", { exact: true });
    this.sessionRequestAcceptedMessage = page.getByText("Session request accepted");
    this.invitationLinkCopiedMessage = page.getByText("Invitation link copied");

    // Session Cards and Status
    this.sessionScheduledCard = page.getByText("Session scheduled").first();
    this.sessionCancelledCard = page.getByText("Session canceled").first();
    this.mainCard = page.getByTestId("main-card");
    this.confirmedAppointmentCard = page.locator('div[data-testid="main-card"].sc-hlDTgW.enzraZ');

    // Session Details Modal
    this.sessionDetailsHeader = page.getByText("Session Details");
    this.scheduledDurationText = page.getByText("Scheduled duration");
    this.videoIcon = page.getByRole("img", { name: "Video" }).getByTestId("icon-Video");
    this.clockStopwatchIcon = page.getByTestId("icon-ClockStopwatch");
    this.closeModalButton = page.getByRole("button", { name: "XClose" });

    // Session Tabs
    this.overviewTab = page.getByRole("button", { name: "Overview" });
    this.symptomsTab = page.getByRole("button", { name: "Symptoms" });
    this.summaryTab = page.getByRole("button", { name: "Summary" });
    this.attachmentsTab = page.getByRole("button", { name: "Attachments" });
    this.paymentsTab = page.getByRole("button", { name: "Payments" });

    // Three Dots Menu (DotsV) Actions
    this.dotsVButton = page.getByRole("button", { name: "DotsV" });
    this.rescheduleButton = page.getByRole("button", { name: "CalendarRepeat Reschedule" });
    this.cancelSessionButton = page.getByRole("button", { name: "XCircle Cancel session" });

    // Cancel Session Modal
    this.cancelSessionModal = page.getByTestId("modal");
    this.noCancelButton = page.getByRole("button", { name: "No, don" });
    this.yesDeclineButton = page.getByRole("button", { name: "Yes, decline" });
    this.yesCancelButton = page.getByRole("button", { name: "Yes, cancel" });

    // Reschedule Modal
    this.rescheduleModal = page.getByText("Reschedule session");
    this.rescheduleConfirmButton = page.getByRole("button", { name: "Reschedule" });
    this.rescheduleCancelButton = page.getByRole("button", { name: "Cancel" });

    // Add Participants Elements
    this.addParticipantsDropdown = page.getByRole("link", { name: "Add participant(s) ChevronDown" });
    this.customDropdown = page.getByTestId("custom-dropdown");
    this.addExistingUsersOption = page.getByText("Add existing user(s)");
    this.addExistingUsersDropdownItem = page.getByTestId("custom-dropdown-item-Add existing user(s)");
    this.inviteExternalUserOption = page.getByText("Invite external user");
    this.inviteExternalUserDropdownItem = page.getByTestId("custom-dropdown-item-Invite external user");
    this.copyInvitationLinkOption = page.getByText("Copy invitation link");
    this.copyInvitationLinkDropdownItem = page.getByTestId("custom-dropdown-item-Copy invitation link");

    // Invite External User Modal
    this.inviteExternalUserHeading = page.getByRole("heading", { name: "Invite external user" });
    this.inviteViaEmailButton = page.getByRole("button", { name: "Invite via email" });
    this.inviteViaSMSButton = page.getByRole("button", { name: "Invite via SMS" });
    this.inviteUserButton = page.getByRole("button", { name: "Invite user" });
    this.externalUserInvitedToast = page.getByText("External user invited");

    // Add Existing Users Modal
    this.searchByNameTextbox = page.getByRole("textbox", { name: "Search by name" });
    this.addParticipantButton = page.getByRole("button", { name: "Add participant" });

    // Join Session Elements
    this.joinVideoSessionButton = page.getByRole("button", { name: "Video Join video session" });

    // Navigation Elements
    this.todayScheduleHeading = page.getByRole("heading", { name: "Your schedule for today" });
    this.allSessionsLink = page.getByText("Your schedule all sessions");
    this.dateCard = page.getByTestId("date-card");

    // Patient Profile Elements (for participant viewing)
    this.firstNameField = page.getByText("First name");
    this.lastNameField = page.getByText("Last name");
    this.dobField = page.getByText("DOB");
    this.sexField = page.getByText("Sex assigned at birth");
    this.countryField = page.getByText("Country");
    this.stateField = page.getByText("State");
    this.cityField = page.getByText("City");
    this.zipCodeField = page.getByText("Zip code");
    this.address1Field = page.getByText("Address 1");
    this.address2Field = page.getByText("Address 2");
    this.phoneNumberField = page.getByText("Phone number");
    this.taxIdField = page.getByText("Tax ID");
    this.insuranceField = page.getByText("Insurance", { exact: true });
    this.insurancePolicyNumberField = page.getByText("Insurance policy number");

    // Video Session/Waiting Room Elements
    this.messageChatButton = page.getByRole("button", { name: "MessageChatCircle" });
    this.fileHeartButton = page.getByRole("button", { name: "FileHeart" });
    this.welcomeToWaitingRoomText = page.getByText("Welcome to waiting room!");
    this.whenYouAreReadyText = page.getByText("When you are ready to start");
    this.startSessionButton = page.getByRole("button", { name: "Start session" });
    this.leaveWaitingRoomButton = page.getByRole("button", { name: "LogOut Leave waiting room" });

    // Patient Context Elements (for multi-user tests)
    this.checkButton = page.getByRole("button", { name: "Check" });

    // PDF Export Elements
    this.downloadExportPDFLink = page.getByRole("link", { name: "Download Export PDF" });
    this.exportPDFModal = page.getByTestId("modal");
    this.exportPDFCheckbox = page.getByTestId("modal").locator("label span");
    this.exportPDFButton = page.getByRole("button", { name: "Export PDF" });
    this.exportPDFCancelButton = page.getByRole("button", { name: "Cancel" });
    this.exportPDFCloseButton = page.getByRole("button", { name: "XClose" });

    // Participant Badges
    this.participantsText = page.getByText("Participants");
    this.deviceIdBadgeText = page.getByText("Device ID");
    this.coordinatorBadgeText = page.getByText("Coordinator", { exact: true });

    // Session Status Elements
    this.sessionScheduledParagraph = page.getByRole("paragraph").filter({ hasText: "Session scheduled" });
    this.cardNth1 = page.getByTestId("card").nth(1);

    // Documents Tab
    this.documentsTab = page.getByRole("button", { name: "Documents" });

    // Tab Content - Documents
    this.noDocumentsText = page.getByText("No documents yet");
    this.noDocumentsAttachedText = page.getByText("No documents attached");

    // Tab Content - Symptoms
    this.describedSymptomsHeading = page.getByText("Described symptoms");

    // Tab Content - Summary
    this.visitSummaryReportText = page.getByText("Visit Summary report");
    this.visitNotesText = page.getByText("Visit Notes");
    this.addVisitNoteLink = page.getByRole("link", { name: "Plus Add visit note" });
    this.soapTemplateDropdownItem = page.getByTestId("custom-dropdown-item-SOAP(Optional Fields)");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.addVisitNoteButton = page.getByRole("button", { name: "Add visit note" });
    this.visitNoteAddedSuccessToast = page.getByText("Visit note added successfully");
    this.dischargeInstructionsInput = page.getByRole("textbox", { name: "Type discharge instructions" });
    this.saveChangesButton = page.getByRole("button", { name: "Save changes" });

    // Tab Content - Payments
    this.noInsuranceRequiredText = page.getByText("No insurance or payment information is required to schedule");

    // Attachments Tab Elements
    this.uploadFilesText = page.getByText("Upload files");
    this.chooseFilesLink = page.getByRole("link", { name: "Choose files" });
    this.uploadIcon = page.getByTestId("icon-Upload");
    this.attachmentElement = page.getByTestId("attachment");
    this.submittedOnText = page.getByText("Submitted on");
    this.attachmentMenuButton = page.getByRole("button", { name: "DotsV" }).nth(1);
    this.downloadAttachmentButton = page.getByRole("button", { name: "Download" });
    this.removeAttachmentButton = page.getByRole("button", { name: "Trash Remove attachment" });
    this.confirmRemoveButton = page.getByRole("button", { name: "Yes, remove" });
  }

  // Navigation Methods
  async navigateToProviderDashboard() {
    await this.page.goto(`${process.env.UAT_URL}/dashboard`);
    await this.waitForSpinnerToDisappear();
    await this.scheduleVisitButton.waitFor({ state: "visible" });
  }

  // Multi-step Session Management Methods
  async scheduleSessionForPatient(patientName) {
    await this.scheduleSessionButton.click();
    await this.changePatientLink.click();
    await this.page.getByText(patientName).click();
    await this.saveButton.click();
    await this.firstTimeSlot.click();
    await this.scheduleVisitButton.click();
    await this.sessionScheduledToast.waitFor({ state: "visible" });
    await this.sessionScheduledToast.waitFor({ state: "hidden" });
  }

  async cancelSession() {
    await this.dotsVButton.click();
    await this.cancelSessionButton.click();
    await this.yesCancelButton.click();
    await this.sessionRequestCanceledToast.waitFor({ state: "visible" });
  }

  async rescheduleSession() {
    await this.dotsVButton.click();
    await this.rescheduleButton.click();
    await this.firstTimeSlot.click();
    await this.rescheduleConfirmButton.click();
  }

  async cancelReschedule() {
    await this.dotsVButton.click();
    await this.rescheduleButton.click();
    await this.firstTimeSlot.click();
    await this.rescheduleCancelButton.click();
  }

  async addExistingUser(userName) {
    await this.addParticipantsDropdown.click();
    await this.addExistingUsersOption.click();
    await this.page.getByText(userName).first().click();
    await this.addParticipantButton.click();
  }

  async copyInvitationLink() {
    await this.addParticipantsDropdown.click();
    await this.copyInvitationLinkOption.click();
  }

  async navigateToAllSessions() {
    await this.todayScheduleHeading.click();
    await this.allSessionsLink.click();
    await this.allSessionsLink.first().click();
  }

  async exportSessionSummaryPDF() {
    // Click Summary tab
    await this.summaryTab.click();

    // Open Export PDF modal
    await this.downloadExportPDFLink.click();

    // Check confirmation checkbox
    await this.exportPDFCheckbox.click();

    // Wait for download and click export
    const downloadPromise = this.page.waitForEvent("download");
    await this.exportPDFButton.click();
    const download = await downloadPromise;

    // Save file to downloads folder
    const path = await import("path");
    const downloadPath = path.join(process.cwd(), "downloads", download.suggestedFilename());
    await download.saveAs(downloadPath);

    return {
      download,
      downloadPath,
      filename: download.suggestedFilename(),
    };
  }

  // Attachment Management Methods
  async uploadAttachment(filePath) {
    const [fileChooser] = await Promise.all([this.page.waitForEvent("filechooser"), this.chooseFilesLink.click()]);
    await fileChooser.setFiles(filePath);
  }

  async removeAttachment() {
    await this.attachmentMenuButton.click();
    await this.removeAttachmentButton.click();
    await this.confirmRemoveButton.click();
    await this.attachmentElement.waitFor({ state: "hidden" });
  }

  async downloadAttachment() {
    await this.attachmentMenuButton.click();
    const [newPage] = await Promise.all([this.page.context().waitForEvent("page"), this.downloadAttachmentButton.click()]);
    return newPage;
  }
}
