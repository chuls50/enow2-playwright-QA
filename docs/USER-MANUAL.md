# eNow2 Application User Manual

## Overview

eNow2 is a comprehensive telehealth platform that enables healthcare providers and institutions to deliver remote care services. The application supports multiple user roles with role-specific capabilities for managing users, appointments, documents, and institutional settings.

**Application URL**: https://portal.qa-encounterservices.com

---

## Table of Contents

1. [Admin Role](#admin-role)
2. [Provider Role](#provider-role) _(Coming soon)_
3. [Patient Role](#patient-role) _(Coming soon)_
4. [Coordinator Role](#coordinator-role) _(Coming soon)_
5. [Device Role](#device-role) _(Coming soon)_

---

## Admin Role

Administrators have full access to manage the institution, users, documents, and reporting capabilities.

### Navigation Overview

The Admin role provides access to five main modules:

- **Users** - User and device management
- **Institution Settings** - Organization configuration
- **Document Management** - Template and packet management
- **Visit Notes** - Clinical documentation templates
- **Data Reporting** - Analytics and insights

---

### 1. Users Management

**Purpose**: Manage all users within the institution, create device IDs, and invite new users.

#### Key Features:

##### User Table

- **Search by Name**: Quickly find users using the search field
- **Filter by Role**: View users by their assigned roles (Admin, Provider, Patient, Coordinator, Device, etc.)
- **User Information Displayed**:
  - User Name
  - Email Address
  - Assigned Roles
  - Institutions
  - Active Status
  - Last Updated timestamp

##### User Actions

- **Create Device ID**: Generate device IDs for institutional equipment/kiosks
- **Invite Users**: Send invitation emails to new users
- **Export User List**: Download user data for reporting or backup

---

### 2. Institution Settings

**Purpose**: Configure institutional profile, registration links, and system behavior.

The Institution Settings module contains 5 tabs:

#### 2.1 Profile Tab

##### Institution Information

- **Institution Name**: Display name for the organization (e.g., "Globalmed Staging for QA")
- **Institution Language**: Default language setting (English supported with language dropdown)
- **Phone Number**: Organization contact number with country code selector (US +1)

##### Key Links

- **Patient Registration Link**: Direct signup URL for new patients
  - Format: `https://portal.qa-encounterservices.com/signup/{INSTITUTION_CODE}`
  - One-click copy functionality
- **Device ID Access Link**: URL for device-based access
  - Format: `https://portal.qa-encounterservices.com/login/device`
  - One-click copy functionality

##### Institution Address

- Street Address
- Apt/Suite/Building number
- ZIP Code
- City (e.g., "Scottsdale")
- Country (Dropdown: "United States of America")
- State (Dropdown: "Arizona")

##### Point of Contact (POC) Details

- Name field (e.g., "John Doe")
- Title field
- Phone Number with country code selector (Required)
- Email Address (Required, e.g., "qa@globalmed.com")

##### POC Address

- Complete address fields mirroring Institution Address structure

#### 2.2 Configuration Tab

##### Provider Licensing

- **Enforce Country/State Licensing on Provider Lists**
  - Toggle to enable/disable
  - When enabled: Filters available providers during scheduling to match patient location
  - Only displays providers with matching "License to Practice" location

##### Encounter Now Settings

- **Number of Times to Contact Available Providers**
  - Configurable retry count (Default: 5)
  - Defines how many contact attempts before alerting user that no providers are available
- **Number of Minutes Before Re-Try to Contact Providers**
  - Configurable retry interval (Default: 1 minute)
  - Wait time between contact attempts
  - Only applies if retry count > 1

##### Waiting Room Configuration

- **Waiting Room Option** (Toggle with checkbox)
  - When enabled: Users join appointments in a waiting room
  - Allows participant communication before provider joins
  - Coordinators can monitor waiting room activity
- **Number of Minutes Before Timer Turns Red**
  - Configurable threshold (Default: 5 minutes)
  - Visual alert for extended wait times

##### Dispatcher Settings

- **Dispatcher Option** (Toggle with checkbox)
  - When enabled: Clinicians can view all appointment requests
  - Ability to approve or decline appointment requests
- **Number of Minutes Before Timer Turns Red**
  - Configurable threshold (Default: 5 minutes)

##### Chat Appointment Types

- **Enable Chat Appointment Types** (Toggle with checkbox)
  - When enabled: Users can schedule both Video Call and Chat appointments
  - When disabled: Only Video Call appointments available
  - Note: Ad-hoc chats, in-video-call chats, and waiting room chats remain available regardless

##### Required Patient Fields

Configure which fields are mandatory during patient registration:

- **Tax ID** (Optional checkbox)
- **Insurance Policy Number** (Optional checkbox)
- **Insurance** (Optional checkbox)

#### 2.3 White Label Tab

_(To be documented)_

#### 2.4 Services Tab

_(To be documented)_

#### 2.5 Insurance & Payments Tab

_(To be documented)_

---

### 3. Document Management

**Purpose**: Create and manage consent forms, documentation templates, and document packets.

#### Navigation

- **Templates Tab**: Individual document templates
- **Packets Tab**: Grouped document collections

#### Templates

##### Current Templates

1. **Patient Consent**
   - Status: Active
   - Type: Patient
   - Purpose: Patient agreement and consent documentation

2. **Provider Consent Required**
   - Status: Active
   - Type: Provider
   - Purpose: Provider agreement and consent documentation

##### Template Management

- **Create Template**: Button to add new document templates
- **Template Actions** (via three-dot menu):
  - Edit template
  - Change status (Active/Inactive)
  - Delete template
- **Sorting**: Click column headers to sort by Name, Status, or Type

---

### 4. Visit Notes

**Purpose**: Manage clinical documentation templates that providers use after patient visits.

#### SOAP Note Templates

The system includes three SOAP (Subjective, Objective, Assessment, Plan) note variations:

1. **SOAP (Deactivated)**
   - Status: Inactive
   - Not available for provider use

2. **SOAP (Optional Fields)**
   - Status: Active
   - More flexible documentation with optional fields

3. **SOAP (Required Fields)**
   - Status: Active
   - Stricter documentation with mandatory field completion

#### Template Management

- **Create Template**: Add new visit note templates
- **Search**: Find templates by name
- **Template Actions** (via three-dot menu):
  - Edit template structure
  - Activate/Deactivate status
  - Configure field requirements

---

### 5. Data Reporting

**Purpose**: Monitor platform usage, performance metrics, and quality indicators.

#### Available Reports

##### 5.1 Dashboard

Provides high-level overview with key metrics:

**Year to Date (YTD) Metrics:**

- Total Encounters: 40
- Average Length: 1 Min
- Total Participants: 83

**Month to Date (MTD) Metrics:**

- Total Encounters: 40
- Average Length: 1 Min
- Total Participants: 83

**Current Usage:**

- Concurrent Usage: 0 active sessions

**Visualization:**

- Encounters per Month chart (January, February)
- Visual representation of encounter trends

**Report Actions:**

- Download report (Export functionality)
- Refresh data
- Info icon for report explanations

##### 5.2 Total Calls

_(To be documented)_

##### 5.3 Total Encounters

_(To be documented)_

##### 5.4 Total Appointments

_(To be documented)_

##### 5.5 Concurrent Usage

_(To be documented)_

##### 5.6 Appointment Quality

_(To be documented)_

##### 5.7 Provider Quality

_(To be documented)_

---

### Common Features

#### Top Navigation Bar

- **Institution Name Display**: Shows currently selected institution
- **Notifications Bell**: Access system notifications
- **User Profile Avatar**: Displays user initials (e.g., "CA")
  - Click to access profile settings
  - Logout option

#### Side Navigation

- **Expandable/Collapsible**: Use the chevron icon to minimize the sidebar
- **Active Indicators**: Current section highlighted
- **Submenu Expansion**: Data Reporting expands to show all report types

---

### Language Support

The application supports multiple languages:

- **English** (Primary)
- **Spanish** (Español)

Language selection available via dropdown in various sections of the application.

---

## Provider Role

_(To be documented after exploration)_

---

## Patient Role

_(To be documented after exploration)_

---

## Coordinator Role

_(To be documented after exploration)_

---

## Device Role

_(To be documented after exploration)_

---

## Common Workflows

### First-Time Login

1. Navigate to institution-specific login URL
2. Enter email address
3. Click "Next"
4. Enter password
5. Click "Log In"
6. Accept End User License Agreement (EULA)
7. Complete any required first-time setup forms
8. Redirected to role-specific dashboard

### User Management Workflow

1. Navigate to **Users** section
2. Use search or filters to find specific users
3. Click on user to view/edit details
4. Use action buttons:
   - Invite new users
   - Create device IDs
   - Export user lists for reporting

### Document Template Creation

1. Navigate to **Document Management** > **Templates**
2. Click "Create Template"
3. Configure template properties:
   - Template name
   - Template type (Patient/Provider)
   - Active status
4. Design template content
5. Save template

---

## Technical Information

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection
- Device with camera and microphone for video appointments

### Support

- For technical issues, contact your institution administrator
- Email support: qa@globalmed.com

---

## Appendix

### Glossary

- **SOAP Notes**: Subjective, Objective, Assessment, Plan - Standard clinical documentation format
- **Encounter**: A clinical interaction between provider and patient
- **Dispatcher**: User role that manages and routes appointment requests
- **Waiting Room**: Virtual staging area for appointment participants
- **Device ID**: Unique identifier for institutional equipment/kiosks

---

_Document Version: 1.0_  
_Last Updated: February 24, 2026_  
_Status: In Progress - Admin Role Complete_
