# eNow2 Documentation Screenshots

This folder contains screenshots captured from the live eNow2 application for documentation purposes.

**Captured:** February 25, 2026  
**Source:** Automated Playwright documentation audit  
**Total Screenshots:** 67

---

## Screenshot Inventory

### Login Flow (2 screenshots)

| Screenshot               | Description                         |
| ------------------------ | ----------------------------------- |
| `login-email-step.png`   | Initial login page with email input |
| `login-device-login.png` | Device ID login page                |

### Admin Role (12 screenshots)

| Screenshot                                     | Description                              |
| ---------------------------------------------- | ---------------------------------------- |
| `admin-users-table.png`                        | Users management table                   |
| `admin-institution-settings-profile.png`       | Institution settings - Profile tab       |
| `admin-institution-settings-configuration.png` | Institution settings - Configuration tab |
| `admin-institution-settings-services.png`      | Institution settings - Services tab      |
| `admin-institution-settings-white-label.png`   | Institution settings - White Label tab   |
| `admin-institution-settings-insurance.png`     | Institution settings - Insurance tab     |
| `admin-document-management.png`                | Document management page                 |
| `admin-visit-notes.png`                        | Visit notes management page              |
| `admin-data-reporting.png`                     | Data reporting/analytics page            |
| `admin-profile-menu.png`                       | Profile dropdown menu                    |
| `admin-account-settings-my-account.png`        | Account settings - My Account tab        |
| `admin-account-settings-notifications.png`     | Account settings - Notifications tab     |

### Provider Role (11 screenshots)

| Screenshot                                    | Description                                     |
| --------------------------------------------- | ----------------------------------------------- |
| `provider-dashboard.png`                      | Provider dashboard with schedule                |
| `provider-past-sessions.png`                  | Past sessions table                             |
| `provider-providers-list.png`                 | Providers directory                             |
| `provider-my-patients.png`                    | My patients list                                |
| `provider-profile-menu.png`                   | Profile dropdown menu                           |
| `provider-account-settings-my-account.png`    | Account settings - My Account tab               |
| `provider-account-settings-calendar.png`      | Account settings - Calendar tab (Provider-only) |
| `provider-account-settings-notifications.png` | Account settings - Notifications tab            |
| `provider-ondemand-panel.png`                 | On-demand availability panel                    |

### Patient Role (5 screenshots)

| Screenshot                                   | Description                          |
| -------------------------------------------- | ------------------------------------ |
| `patient-dashboard.png`                      | Patient dashboard                    |
| `patient-vitals-scan.png`                    | Vitals scan feature                  |
| `patient-profile-menu.png`                   | Profile dropdown menu                |
| `patient-account-settings-my-account.png`    | Account settings - My Account tab    |
| `patient-account-settings-notifications.png` | Account settings - Notifications tab |

### Coordinator Role (8 screenshots)

| Screenshot                                       | Description                          |
| ------------------------------------------------ | ------------------------------------ |
| `coordinator-dashboard.png`                      | Coordinator dashboard                |
| `coordinator-past-sessions.png`                  | Past sessions view                   |
| `coordinator-providers-list.png`                 | Providers directory                  |
| `coordinator-patients-list.png`                  | Patients directory                   |
| `coordinator-command-center.png`                 | Command Center / Waiting rooms       |
| `coordinator-profile-menu.png`                   | Profile dropdown menu                |
| `coordinator-account-settings-my-account.png`    | Account settings - My Account tab    |
| `coordinator-account-settings-notifications.png` | Account settings - Notifications tab |

### Device Role (5 screenshots)

| Screenshot                                  | Description                          |
| ------------------------------------------- | ------------------------------------ |
| `device-dashboard.png`                      | Device dashboard (minimal interface) |
| `device-navigation.png`                     | Navigation bar state                 |
| `device-profile-menu.png`                   | Profile dropdown menu                |
| `device-account-settings-my-account.png`    | Account settings - My Account tab    |
| `device-account-settings-notifications.png` | Account settings - Notifications tab |

---

## Workflow Screenshots

### Scheduled Appointment Workflow (5 screenshots)

| Screenshot                                         | Description                               |
| -------------------------------------------------- | ----------------------------------------- |
| `workflow-scheduled-01-patient-dashboard.png`      | Patient dashboard before scheduling       |
| `workflow-scheduled-02-patient-schedule-page.png`  | Schedule appointment page                 |
| `workflow-scheduled-07-patient-time-selection.png` | Time slot selection view                  |
| `workflow-scheduled-14-provider-dashboard.png`     | Provider dashboard with scheduled session |
| `workflow-scheduled-15-provider-schedule-view.png` | Provider schedule view                    |

### On-Demand Appointment Workflow (7 screenshots)

| Screenshot                                               | Description                     |
| -------------------------------------------------------- | ------------------------------- |
| `workflow-ondemand-01-provider-ondemand-panel.png`       | Provider on-demand panel        |
| `workflow-ondemand-02-provider-availability-toggle.png`  | Availability toggle switch      |
| `workflow-ondemand-03-provider-now-available.png`        | Provider marked as available    |
| `workflow-ondemand-04-patient-dashboard.png`             | Patient dashboard               |
| `workflow-ondemand-05-patient-see-provider-now-page.png` | See a provider now page         |
| `workflow-ondemand-14-provider-dashboard-request.png`    | Provider dashboard with request |
| `workflow-ondemand-16-provider-notifications.png`        | Provider notification panel     |

### Session Details Workflow (8 screenshots)

| Screenshot                                         | Description                  |
| -------------------------------------------------- | ---------------------------- |
| `workflow-session-01-past-sessions-list.png`       | Past sessions table          |
| `workflow-session-02-session-details-overview.png` | Session details modal        |
| `workflow-session-03-session-overview-tab.png`     | Overview tab                 |
| `workflow-session-03-session-symptoms-tab.png`     | Symptoms tab                 |
| `workflow-session-03-session-summary-tab.png`      | Summary tab with visit notes |
| `workflow-session-03-session-attachments-tab.png`  | Attachments tab              |
| `workflow-session-03-session-payments-tab.png`     | Payments tab                 |
| `workflow-session-04-schedule-session-modal.png`   | Schedule session modal       |

### Patient Dashboard Features (5 screenshots)

| Screenshot                                              | Description                   |
| ------------------------------------------------------- | ----------------------------- |
| `workflow-patient-01-full-dashboard.png`                | Complete patient dashboard    |
| `workflow-patient-02-upcoming-appointments-section.png` | Upcoming appointments section |
| `workflow-patient-03-past-appointments-section.png`     | Past appointments section     |
| `workflow-patient-04-schedule-appointment-option.png`   | Schedule appointment option   |
| `workflow-patient-05-see-provider-now-option.png`       | See a provider now option     |

---

## Usage in LaTeX

To include these screenshots in LaTeX documents:

```latex
\begin{figure}[h]
    \centering
    \includegraphics[width=0.8\textwidth]{screenshots/admin-dashboard.png}
    \caption{Admin Dashboard View}
    \label{fig:admin-dashboard}
\end{figure}
```

---

## Regenerating Screenshots

To regenerate all screenshots, run:

```bash
npx playwright test --config=playwright.audit.config.js
```

Test scripts:

- `tests/documentation-audit.spec.js` - Role-based navigation screenshots
- `tests/appointment-workflow-audit.spec.js` - Appointment workflow screenshots
