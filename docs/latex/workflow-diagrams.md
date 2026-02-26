# eNow2 Workflow Diagrams

This document contains Mermaid diagrams for all major user workflows in the eNow2 telehealth platform.

---

## 1. Authentication Workflows

### 1.1 Standard Login Flow

```mermaid
flowchart TD
    A[User visits portal.qa-encounterservices.com] --> B[Enter Email Address]
    B --> C[Click Next]
    C --> D{Email Valid?}
    D -->|No| E[Show Error Message]
    E --> B
    D -->|Yes| F[Enter Password]
    F --> G[Click Log In]
    G --> H{Credentials Valid?}
    H -->|No| I[Show Error Message]
    I --> F
    H -->|Yes| J{First Time User?}
    J -->|Yes| K[Show EULA]
    K --> L{Accept EULA?}
    L -->|No| M[Cannot Proceed]
    L -->|Yes| N[Before We Get Started Onboarding]
    N --> O[Dashboard]
    J -->|No| O
```

### 1.2 Device ID Login Flow

```mermaid
flowchart TD
    A[User visits /login/device] --> B[Enter Device ID]
    B --> C[Click Verify Device ID]
    C --> D{Device ID Valid?}
    D -->|No| E[Show Error Message]
    E --> B
    D -->|Yes| F[Welcome Back Screen]
    F --> G[Device Dashboard]
```

### 1.3 Password Reset Flow

```mermaid
flowchart TD
    A[User on Password Entry Screen] --> B[Click Forgot Password]
    B --> C[Confirm Email Address]
    C --> D[Click Send Reset Link]
    D --> E[Email Sent Confirmation]
    E --> F[User Checks Email]
    F --> G[Click Reset Link]
    G --> H[Enter New Password]
    H --> I[Confirm New Password]
    I --> J{Passwords Match?}
    J -->|No| K[Show Error]
    K --> H
    J -->|Yes| L[Password Updated]
    L --> M[Redirect to Login]
```

### 1.4 Account Creation Flow

```mermaid
flowchart TD
    A[User Receives Invitation Email] --> B[Click Sign Up Link]
    B --> C[Email Verification Page]
    C --> D[Enter Verification Code]
    D --> E{Code Valid?}
    E -->|No| F[Show Error / Resend Option]
    F --> D
    E -->|Yes| G[Create Password]
    G --> H[Enter Profile Information]
    H --> I[Accept EULA]
    I --> J[Before We Get Started]
    J --> K[Dashboard]
```

---

## 2. Session Workflows

### 2.1 Scheduled Appointment Flow (Patient Perspective)

> See screenshots: `workflow-scheduled-*.png`

```mermaid
flowchart TD
    A[Patient Dashboard] --> B[Click 'Schedule an appointment']
    B --> C[/dashboard/schedule-appointment/]
    C --> D[Click 'Select service']
    D --> E[Service Selection Modal]
    E --> F[Select 'General Practice' radio]
    F --> G[Click Save]
    G --> H[Click 'Change provider']
    H --> I[Provider Selection List]
    I --> J[Select Provider e.g. Cody ProviderOne]
    J --> K[Click Save]
    K --> L[View Available Time Slots]
    L --> M[Select Time Slot]
    M --> N[Check Notice of Consent]
    N --> O[Click 'Schedule visit']
    O --> P[Appointment Confirmed Screen]
    P --> Q[Click 'Go to my appointments']
    Q --> R[Dashboard with Session Scheduled]
```

### 2.2 On-Demand Session Flow (Patient Perspective)

> See screenshots: `workflow-ondemand-*.png`

```mermaid
flowchart TD
    A[Patient Dashboard] --> B[Click 'See a provider now']
    B --> C[/dashboard/see-provider-now/]
    C --> D[Click 'Select service']
    D --> E[Service Selection Modal]
    E --> F[Select 'General Practice' radio]
    F --> G[Click Save]
    G --> H{Symptom Checker Shown?}
    H -->|Yes| I[My Symptoms Page]
    I --> J[Click Continue to skip]
    H -->|No| K[Check Notice of Consent]
    J --> K
    K --> L[Click 'Request on demand care']
    L --> M[Session Requested Confirmation]
    M --> N[Dashboard with Request Pending]
```

### 2.3 Provider On-Demand Availability

> See screenshots: `workflow-ondemand-01/02/03-*.png`

```mermaid
flowchart TD
    A[Provider Dashboard] --> B[Click 'On demand' button]
    B --> C[On-Demand Panel Opens]
    C --> D{Currently Available?}
    D -->|No| E[Toggle 'Available' switch ON]
    E --> F[Provider in Available Pool]
    D -->|Yes| G[Already Receiving Requests]
    F --> H[Close Panel]
    G --> H
    H --> I[Can Receive On-Demand Requests]
    I --> J[Session Request Notification Appears]
    J --> K[Accept or Decline Request]
```

### 2.4 Session Details View (Provider)

> See screenshots: `workflow-session-*.png`

```mermaid
flowchart TD
    A[Provider Dashboard] --> B[Click 'Past Sessions' nav]
    B --> C[Past Sessions Table]
    C --> D[Click 'View details' on session]
    D --> E[Session Details Modal]
    E --> F[Overview Tab - Participants info]
    F --> G[Symptoms Tab - Described symptoms]
    G --> H[Summary Tab - Visit Notes]
    H --> I[Add Visit Note Option]
    I --> J[Attachments Tab]
    J --> K[Payments Tab]
    K --> L[Export PDF Option]
    L --> M[Close Modal]
```

### 2.3 Session Join Flow

```mermaid
flowchart TD
    A[User Receives Session Notification] --> B[Click Join Session]
    B --> C[Pre-Join Screen]
    C --> D[Test Audio/Video]
    D --> E{Devices Working?}
    E -->|No| F[Troubleshoot]
    F --> D
    E -->|Yes| G[Click Join]
    G --> H[Enter Waiting Room]
    H --> I{Other Party Joined?}
    I -->|No| J[Wait]
    J --> I
    I -->|Yes| K[Video Session Active]
```

---

## 3. Admin Workflows

### 3.1 User Invitation Flow

```mermaid
flowchart TD
    A[Admin Users Page] --> B[Click Invite Users]
    B --> C[Enter First Name]
    C --> D[Enter Last Name]
    D --> E[Enter Email]
    E --> F[Select Institution]
    F --> G[Select Role]
    G --> H[Click Send Invite]
    H --> I{Valid Input?}
    I -->|No| J[Show Validation Errors]
    J --> C
    I -->|Yes| K[Invitation Sent]
    K --> L[User Appears in Table]
```

### 3.2 Device ID Creation Flow

```mermaid
flowchart TD
    A[Admin Users Page] --> B[Click Create Device ID]
    B --> C[Enter Device Name]
    C --> D[Enter Device ID Number]
    D --> E[Enter Email for Notifications]
    E --> F[Select Institution]
    F --> G[Click Create Device ID]
    G --> H{ID Unique?}
    H -->|No| I[Show Device ID Already Exists Error]
    I --> D
    H -->|Yes| J[Device Created]
    J --> K[Device Appears in Users Table]
```

### 3.3 Institution Settings Configuration

```mermaid
flowchart TD
    A[Admin Dashboard] --> B[Click Institution Settings]
    B --> C[Institution Profile Tab]
    C --> D{Edit Profile?}
    D -->|Yes| E[Modify Institution Details]
    E --> F[Save Changes]
    D -->|No| G[Configuration Tab]
    G --> H[Set Session Options]
    H --> I[Services Tab]
    I --> J[Configure Available Services]
    J --> K[White Label Tab]
    K --> L[Upload Logos/Colors]
    L --> M[Insurance Tab]
    M --> N[Configure Insurance Options]
```

---

## 4. Coordinator Workflows

### 4.1 Command Center / Waiting Room Management

```mermaid
flowchart TD
    A[Coordinator Dashboard] --> B[Click Command Center]
    B --> C[View Active Waiting Rooms]
    C --> D{Patient Waiting?}
    D -->|No| E[Monitor Queue]
    E --> D
    D -->|Yes| F[View Patient Details]
    F --> G[Assign to Provider]
    G --> H[Notify Provider]
    H --> I[Monitor Session Status]
```

### 4.2 Session Scheduling (Coordinator)

```mermaid
flowchart TD
    A[Coordinator Dashboard] --> B[Click Schedule Session]
    B --> C[Search/Select Patient]
    C --> D[Search/Select Provider]
    D --> E[Select Date/Time]
    E --> F[Select Session Type]
    F --> G[Add Notes]
    G --> H[Send Invitations]
    H --> I[Both Parties Notified]
```

---

## 5. Provider Workflows

### 5.1 On-Demand Availability Toggle

```mermaid
flowchart TD
    A[Provider Dashboard] --> B[Click On Demand Button]
    B --> C[Availability Panel Opens]
    C --> D{Currently Available?}
    D -->|No| E[Toggle Available Switch ON]
    E --> F[Provider Enters Available Pool]
    F --> G[Can Receive On-Demand Requests]
    D -->|Yes| H[Toggle Available Switch OFF]
    H --> I[Provider Removed from Pool]
```

### 5.2 Visit Note Creation

```mermaid
flowchart TD
    A[Session Ends] --> B[View Past Sessions]
    B --> C[Click View Details]
    C --> D[Click Summary Tab]
    D --> E[Click Add Visit Note]
    E --> F[Enter Subjective Notes]
    F --> G[Enter Objective Notes]
    G --> H[Enter Assessment]
    H --> I[Enter Plan]
    I --> J[Click Add Visit Note]
    J --> K[Note Saved]
    K --> L[Export PDF Option Available]
```

### 5.3 Calendar Availability Setup

```mermaid
flowchart TD
    A[Provider Profile Menu] --> B[Account Settings]
    B --> C[Calendar Tab]
    C --> D[Set Time Zone]
    D --> E[Configure Monday Hours]
    E --> F[Configure Tuesday Hours]
    F --> G[Continue for Each Day]
    G --> H[Connect External Calendar]
    H --> I[Save Changes]
```

---

## 6. Patient Workflows

### 6.1 Health Profile Management

```mermaid
flowchart TD
    A[Patient Dashboard] --> B[Click Health Profile]
    B --> C[View/Edit Personal Information]
    C --> D[Update DOB]
    D --> E[Update Sex]
    E --> F[Update Tax ID]
    F --> G[Update Insurance Information]
    G --> H[Save Changes]
```

### 6.2 Vitals Scan Flow

```mermaid
flowchart TD
    A[Patient Dashboard] --> B[Click Vitals Scan]
    B --> C[Camera Access Prompt]
    C --> D{Grant Access?}
    D -->|No| E[Cannot Proceed]
    D -->|Yes| F[Position Face in Frame]
    F --> G[Scan In Progress]
    G --> H[Processing Results]
    H --> I[Display Vital Signs]
    I --> J[Save to Health Record]
```

---

## 7. Notification Workflows

### 7.1 Notification Preferences Setup

```mermaid
flowchart TD
    A[Any Role Dashboard] --> B[Profile Menu]
    B --> C[Account Settings]
    C --> D[Notifications Tab]
    D --> E[Configure Email Notifications]
    E --> F[Configure SMS Notifications]
    F --> G[Configure In-App Notifications]
    G --> H[Set Session Reminder Timing]
    H --> I[Save Preferences]
```

---

## 8. Role Navigation Summary

```mermaid
flowchart LR
    subgraph Admin
        A1[Users]
        A2[Institution Settings]
        A3[Document Management]
        A4[Visit Notes]
        A5[Data Reporting]
    end

    subgraph Provider
        P1[Dashboard]
        P2[Past Sessions]
        P3[Providers]
        P4[My Patients]
    end

    subgraph Patient
        PT1[Dashboard]
        PT2[Past Visits]
        PT3[Health Profile]
        PT4[Vitals Scan]
    end

    subgraph Coordinator
        C1[Dashboard]
        C2[Past Sessions]
        C3[Providers]
        C4[Patients]
        C5[Command Center]
    end

    subgraph Device
        D1[Dashboard Only]
    end
```

---

## 9. Account Settings Tabs by Role

```mermaid
flowchart TD
    subgraph All Roles
        MA[My Account Tab]
        NOT[Notifications Tab]
    end

    subgraph Provider Only
        CAL[Calendar Tab]
    end

    MA --> |Contains| MA1[Profile Photo]
    MA --> |Contains| MA2[Profile Details]
    MA --> |Contains| MA3[Language Selection]
    MA --> |Contains| MA4[Time Zone]
    MA --> |Contains| MA5[Delete Account]

    CAL --> |Contains| CAL1[Time Zone]
    CAL --> |Contains| CAL2[Daily Availability]
    CAL --> |Contains| CAL3[Calendar Integrations]

    NOT --> |Contains| NOT1[Email/SMS/In-App Toggle]
    NOT --> |Contains| NOT2[Session Reminders]
```

---

## Usage Notes

These diagrams can be:

1. Rendered in GitHub/GitLab markdown viewers
2. Converted to images using Mermaid CLI
3. Included in LaTeX documents using the `mermaid-filter` package
4. Exported as SVG/PNG for static documentation

To render locally:

```bash
npm install -g @mermaid-js/mermaid-cli
mmdc -i workflow-diagrams.md -o workflow-diagrams.pdf
```
