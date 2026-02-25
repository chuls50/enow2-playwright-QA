# eNow2 Application User Manual

**Version:** 1.0  
**Last Updated:** February 24, 2026  
**Application URL:** https://portal.qa-encounterservices.com

---

## Table of Contents

1. [Introduction](#introduction)
2. [User Roles Overview](#user-roles-overview)
3. [Admin Role](#admin-role)
4. [Provider Role](#provider-role)
5. [Patient Role](#patient-role)
6. [Coordinator Role](#coordinator-role)
7. [Device Role](#device-role)

---

## Introduction

eNow2 is a comprehensive telehealth platform that enables virtual care delivery through video calls, chat, and appointment management. The platform supports multiple user roles with specific permissions and capabilities.

### Supported Languages

- English (Default)
- Spanish

---

## User Roles Overview

The eNow2 platform supports the following primary roles:

| Role            | Description                                               |
| --------------- | --------------------------------------------------------- |
| **Admin**       | Full system administration and configuration capabilities |
| **Provider**    | Healthcare providers who deliver care to patients         |
| **Patient**     | Individuals receiving care through the platform           |
| **Coordinator** | Staff who manage appointments and facilitate encounters   |
| **Device**      | Shared device access for clinical locations               |
| **Super Admin** | Elevated administrative access                            |

**Combined Roles:**

- Provider-Admin
- Provider-Coordinator
- Admin-Coordinator
- Provider-Admin-Coordinator

---

## Admin Role

### Overview

Administrators have comprehensive access to manage users, configure institution settings, manage documents, and access reporting capabilities.

### Navigation Menu

#### 1. Users

User management interface for the institution.

**Key Features:**

- **User Table**: View all users with columns for:
  - User Name
  - Email
  - Assigned Roles
  - Institutions
  - Active Status
  - Last Updated (sortable)

**Actions Available:**

- **Create Device ID**: Generate new device IDs for shared devices
- **Invite Users**: Send invitations to new users
- **Export User List**: Download complete user roster
- **Search**: Find users by name
- **Filter**: Filter users by role (All, specific roles)

---

#### 2. Institution Settings

Comprehensive configuration for the institution across 5 tabs.

##### **Profile Tab**

**Institution Information:**

- Institution name (required)
- Institution language selection (English/Spanish)
- Phone number with country code selector
- Institution address (Street, Apt/Suite, ZIP, City, State, Country)

**Access Links:**

- **Patient Registration Link**: Public signup link for new patients
  - Example: `https://portal.qa-encounterservices.com/signup/[TOKEN]`
  - Copy link button provided
- **Device ID Access Link**: Direct login for device users
  - Example: `https://portal.qa-encounterservices.com/login/device`
  - Copy link button provided

**Point of Contact (POC) Details:**

- Name
- Title
- Phone number (required)
- Email (required)

**POC Address:**

- Street address
- Apt/Suite
- ZIP code
- City
- State and Country dropdowns

##### **Configuration Tab**

**Provider Management:**

- **Enforce Country/State Licensing**: Filter provider availability based on patient location and provider licensing
  - When enabled, only shows providers licensed in the patient's state/country during scheduling

**Encounter Now Settings:**

- **Number of Times to Contact Available Providers**: How many contact cycles before alerting user (Default: 5)
- **Number of Minutes Before Re-Try**: Time between contact cycles when requesting immediate encounters (Default: 1 minute)

**Waiting Room Feature:**

- **Enable/Disable Toggle**: When enabled, users join a waiting room before appointments
- **Timer Configuration**: Set minutes before timer turns red (Default: 5 minutes)
- **Features**: Participants can communicate with each other and be monitored by Coordinators

**Dispatcher Feature:**

- **Enable/Disable Toggle**: When enabled, clinicians can view all appointment requests
- **Timer Configuration**: Set minutes before timer turns red (Default: 5 minutes)
- **Functionality**: Clinicians can approve or decline appointment requests

**Chat Appointments:**

- **Enable Chat Appointment Types**: Toggle to enable/disable chat-based appointments
  - When enabled: Both Video Call and Chat appointment types available
  - When disabled: Only Video Call appointments available
  - Note: Ad-hoc chats, in-call chats, and waiting room chats always available

**Required Patient Fields:**
Configure which fields are mandatory for patients:

- Tax ID
- Insurance policy number
- Insurance information

##### **White Label Tab**

Customize the platform's branding to match your organization's identity.

**White Label Configuration:**

- **Enable/Disable Toggle**: Turn white labeling on/off
- **Organization Name**: Display name for your organization
- **Product Name**: Custom name for the platform
- **Subdomain**: Custom URL subdomain

**Logo & Branding Assets:**

- **Organization Logo**: Upload JPG or PNG (max 10 MB)
- **Favicon**: Upload 32x32 transparent PNG recommended (JPG/PNG, max 10 MB)
  - Live preview provided
- **Cover Image**: Login page background image
  - Upload custom or reset to default
  - Preview shown in settings

**Color Customization:**

- **Primary Brand Color**: Main accent color (hex input)
- **Main Button Text Color**: Button text color (hex input)
- **Reset to Default**: Restore original colors

**Preview Components:**

- **Button Preview**: See how buttons will appear
- **Icon Preview**: View navigation link styling
- **Tab Preview**: Check tab appearance

**Patient Booking Button Styles:**
Two button types can be configured:

- **Schedule an Appointment**
- **See a Provider Now**

For each button style:

- Style selection: Default or Solid
- Background color (hex)
- Text color (hex)
- Highlight color 1 (hex)
- Highlight color 2 (hex)
- Reset to default option

##### **Services Tab**

Manage medical services offered by your institution.

**Service Management:**

- **Search**: Find services by name
- **Filter**: Filter by status (active/inactive)

**Each Service Includes:**

- **Service Name**: Name displayed to users
- **Description**: Optional service description
- **Specialty**: Associated medical specialty (searchable dropdown)
  - Examples: General Practitioner, Cardiologist, Pediatrician, Surgeon
- **Duration**: Appointment length (selectable, e.g., 15, 30, 45 minutes)
- **Fee Configuration**:
  - Enable/disable fee toggle
  - Fee price field (activated when enabled)
- **Allow 'See a Provider Now'**: Enable immediate consultation option
- **Service Enabled**: Activate/deactivate service
- **Templates**: Assign document templates to service
- **Provider List**: Manage providers for this service

**Example Services (Pre-configured):**

- General Practice (30 min, no fee)
- Cardiòlogo (15 min, $50 fee)
- Pediatrics (30 min, no fee)
- Toxicology

**Service Actions:**

- Create new services
- Edit existing services (expandable accordion)
- Enable/disable services
- Configure fees per service

##### **Insurance & Payments Tab**

Configure insurance and payment processing for the institution.

**Insurance Setup:**

- **Enable Insurance Selection**: Toggle to activate insurance features
- **Premium Package**: Enable tiered insurance package
  - **Premium Package Name**: Custom name (e.g., "GlobalHealthcare")
  - **Insurance List**: Manage accepted insurance providers
    - Insurance Title (e.g., Cigna, Aetna)
    - Co-pay Amount
    - Add/Delete insurance providers

**Example Insurance Configuration:**

- Cigna: $100 co-pay
- Aetna: $80 co-pay
- Zero: $0 co-pay

**Payments Setup:**

- **Self Payment**: Enable patient self-pay option
- **Payment Processor**: Select payment gateway (dropdown)
- **Currency**: Choose transaction currency
- **Authorization Key**: Payment processor API key
- **Action Buttons**:
  - Edit Account
  - Payment Reporting

**Patient Payment Reminders:**

- **Enable/Disable Toggle**: Activate reminder system
- **Service Reminder**: Select which service triggers reminders
- **Intervals**: Set reminder frequency (e.g., Every 4 hours)

All payment features are disabled until properly configured.

---

#### 3. Document Management

Manage document templates and packets for the institution.

**Two Main Sections:**

- **Templates**: Individual document templates
- **Packets**: Collections of templates

##### **Templates**

Current templates include:

- **Patient Consent** (Active, Patient-type)
- **Provider Consent Required** (Active, Provider-type)

**Table Columns:**

- Name (sortable)
- Status (Active/Inactive, sortable)
- Type (Patient/Provider, sortable)
- Actions menu (three dots)

**Actions Available:**

- **Create Template**: Add new document templates
- **Edit Template**: Modify existing templates
- **Deactivate/Activate**: Toggle template status

---

#### 4. Visit Notes

Manage templates for provider documentation after patient visits.

**Available Templates:**

| Template Name          | Status   | Description                         |
| ---------------------- | -------- | ----------------------------------- |
| SOAP (Deactivated)     | Inactive | Disabled SOAP template              |
| SOAP (Optional Fields) | Active   | SOAP template with optional fields  |
| SOAP (Required Fields) | Active   | SOAP template with mandatory fields |

**SOAP Format:**

- **S**ubjective: Patient's description of symptoms
- **O**bjective: Provider's observations and measurements
- **A**ssessment: Diagnosis and clinical impression
- **P**lan: Treatment plan and follow-up

**Table Features:**

- Name column (sortable)
- Status column (sortable)
- Search functionality
- Actions menu for each template

**Actions Available:**

- **Create Template**: Add new visit note templates
- **Edit Templates**: Modify field requirements
- **Activate/Deactivate**: Toggle template availability

---

#### 5. Data Reporting

Comprehensive analytics and reporting dashboard with 7 report types.

##### **Dashboard View**

**Year to Date (YTD) Metrics:**

- Total Encounters: Number of completed encounters
- Average Length: Average duration of encounters
- Total Participants: Unique participants across encounters

**Month to Date (MTD) Metrics:**

- Same metrics as YTD for current month

**Real-Time Metrics:**

- **Concurrent Usage**: Current number of active sessions

**Visualizations:**

- **Encounters per Month**: Bar chart showing monthly encounter volume
  - X-axis: Months (January, February, etc.)
  - Y-axis: Encounter count
  - Year-to-date view

**Actions:**

- **Download**: Export report data
- **Refresh**: Update dashboard with latest data
- **Info**: View dashboard help information

##### **Total Calls**

Detailed call analytics and statistics with advanced filtering.

**Report Features:**

- **Chart Visualization**: Weekly call trends
  - Date ranges on X-axis
  - Call counts on Y-axis
  - Multiple data series:
    - Calls scheduled (line chart)
    - Calls occurred (line chart)
    - Calls did not occur (line chart)

**Filter Options:**

- **Time Period**: Select date range
- **Reporting Period**: Choose interval (Week, Month, Year)
  - Shows active selection count
- **Reporting Level**: Aggregate level selection
- **Institution**: Filter by specific institution(s)
- **Appointment Type**: Filter by appointment category
- **Request Type**: Filter by request category
- **Service**: Filter by medical service

**Active Filters Display:**

- Shows currently applied filters as chips
- Each filter chip has remove (X) button
- "Clear filters" button to remove all at once

**Report Actions:**

- **Download**: Export report data
- **Refresh**: Update with latest data
- **History** (ClockRewind icon): View previous reports
- **Save Filter Values**: Save current filter configuration for later use

**Data Insights:**
Compare scheduled vs occurred vs cancelled calls across time periods to identify trends and patterns.

##### **Total Encounters**

Comprehensive encounter reporting
(To be explored)

##### **Total Appointments**

Appointment tracking and metrics
(To be explored)

##### **Concurrent Usage**

Real-time usage monitoring
(To be explored)

##### **Appointment Quality**

Quality metrics for appointments
(To be explored)

##### **Provider Quality**

Provider performance analytics
(To be explored)

---

### Admin Workflows

#### Common Tasks

**1. Inviting a New User**

1. Navigate to Users page
2. Click "Invite users" button
3. Enter user email and select role(s)
4. Send invitation
5. User receives email with signup link

**2. Creating a Device ID**

1. Navigate to Users page
2. Click "Create Device ID" button
3. System generates unique device ID
4. Share Device ID Access Link with location
5. Users at that location can log in with device ID

**3. Configuring Waiting Room**

1. Navigate to Institution Settings > Configuration
2. Toggle "Waiting Room Option" on
3. Set "Number of minutes before timer turns red"
4. Click "Save changes"
5. Feature now active for all appointments

**4. Creating Document Templates**

1. Navigate to Document Management
2. Select "Templates" tab
3. Click "Create template"
4. Choose template type (Patient/Provider)
5. Add content and configure fields
6. Set status to Active
7. Save template

**5. Viewing Institution Analytics**

1. Navigate to Data Reporting > Dashboard
2. View YTD and MTD metrics
3. Use Download button to export data
4. Use Refresh to update with latest data

---

## Provider Role

### Overview

Providers are healthcare professionals who deliver care to patients through video consultations, manage their schedule, and document patient encounters.

### Navigation Menu

#### 1. Dashboard

The provider's main landing page showing daily schedule and requests.

**Your Schedule for Today:**

- Current date display
- Number of sessions scheduled
- Expandable to view details
- "Schedule session" button for adding new appointments

**No Upcoming Sessions Message:**

- Displays when no sessions are scheduled for the day
- Provides clear visual feedback

**Scheduled Requests Section:**

- View incoming appointment requests
- Calendar widget for date selection
- Navigate between requests with arrow buttons
- "All requests" link to view complete list

**Top Bar Features:**

- **On Demand Requests** button: View and respond to immediate consultation requests
- Notifications bell
- Profile menu

---

#### 2. Past Sessions

Historical record of all completed patient encounters.

**Table Features:**
Sortable columns:

- **Date**: When the session occurred
- **Patient**: Patient name
- **Type**: Video or Chat
- **Actual Duration**: Length of session (in minutes)
- **Institution**: Facility/organization
- **Service**: Type of care provided (e.g., General Practice)
- **Session ID**: Unique identifier
- **Session Type**: Scheduled vs On-Demand indicator

**Actions:**

- **Search**: Find past sessions by patient name
- **View Details**: Access full session information including:
  - Complete session timeline
  - Participant information
  - Session notes and documentation
  - Recording links (if applicable)

**Typical Session Information:**

- Video sessions with 0m duration indicate quick check-ins
- Each session has a unique ID format (e.g., #RR60M7D)
- Calendar day icon indicates scheduled appointments

---

#### 3. Providers

Directory of all healthcare providers and coordinators in the system.

**Search & Filter:**

- **Search Bar**: Find by name or email
- **Filter Options**:
  - User Type (Provider, Coordinator, Admin)
  - Specialty (General Practitioner, Allergologist, etc.)
  - Spoken Languages (English, Spanish, etc.)
  - Status (Online, Offline, Available, Busy)
- **Clear Filters**: Reset all filter selections

**Provider Table Columns:**

- **Name**: Provider's full name with avatar
- **User Type**: Role designation
- **Specialty**: Medical specialties (can have multiple)
- **Email**: Contact email address
- **Spoken Languages**: Language flags (e.g., EN, ES)
- **Status**: Current availability
  - Offline (gray)
  - Online (green)
  - Available (green with checkmark)
  - Busy (red)

**Quick Actions:**

- **Messages Icon**: Send direct message to provider
- **Video Icon**: Initiate video call with provider

**Use Cases:**

- Consult with specialists
- Coordinate with other providers on patient care
- Find providers by specialty or language
- Check provider availability before referring patients

---

#### 4. My Patients

Provider's patient roster for easy access and scheduling.

**Patient List:**

- **Search**: Find by name, email, or phone number
- **Sortable Columns**:
  - Name (with avatar)
  - Email
  - Phone

**Quick Actions:**

- **Calendar Icon**: Schedule session with patient
  - Opens scheduling interface
  - Pre-fills patient information
  - Select date, time, and service type

**Pagination:**

- Navigate through patient list
- Shows current page number
- Previous/Next navigation

**Patient Information Display:**

- Avatar with initials if no photo
- Full name prominently displayed
- Contact information readily available
- "N/A" shown for missing information

---

### Provider Workflows

#### Common Tasks

**1. Viewing Today's Schedule**

1. Navigate to Dashboard
2. Review "Your schedule for today" section
3. Expand to see session details
4. Click "Schedule session" to add appointments

**2. Responding to On-Demand Requests**

1. Click "On demand requests" button in top bar
2. Review urgent patient consultation requests
3. Accept or decline based on availability
4. System initiates video call when accepted

**3. Reviewing Past Sessions**

1. Navigate to Past Sessions
2. Use search or filters to find specific encounters
3. Click "View details" on any session
4. Review notes, documentation, recordings
5. Complete any pending documentation

**4. Scheduling a Session with Existing Patient**

1. Navigate to My Patients
2. Find patient using search
3. Click calendar icon next to patient name
4. Select date and time
5. Choose service type and duration
6. Send invitation to patient

**5. Consulting with Another Provider**

1. Navigate to Providers
2. Filter by specialty if needed
3. Check provider's status (must be Online/Available)
4. Click Messages icon for text communication
5. Or click Video icon for immediate video consultation

**6. Finding a Specialist for Referral**

1. Navigate to Providers
2. Use Specialty filter to narrow results
3. Check spoken languages if needed
4. Review provider's profile
5. Contact via Messages or Video

---

### Provider Best Practices

**Session Management:**

- Review schedule at start of day
- Respond to on-demand requests promptly
- Complete session notes immediately after encounters
- Keep patient roster up to date

**Communication:**

- Use Messages for non-urgent provider communication
- Use Video for urgent consultations or complex discussions
- Check notification bell regularly
- Maintain professional status (Online when available)

**Documentation:**

- Complete visit notes for all sessions
- Use appropriate SOAP templates
- Document actual session duration accurately
- Attach any relevant files or images

---

## Patient Role

### Overview

The Patient role provides individuals with secure access to schedule appointments, attend virtual visits, view their health information, and monitor vital signs through the eNow2 platform.

### Navigation Menu

**Primary Navigation:**

- **Dashboard** - View upcoming appointments and quick actions
- **Past visits** - Access historical visit records
- **Health profile** - Manage personal and medical information
- **Vitals scan** - Measure and track vital signs using device sensors

### Dashboard

**Schedule Summary:**

- Displays "Your schedule for today" with current date
- Shows count of scheduled sessions
- Date picker to view different dates
- Status indicator: "No upcoming sessions for today"

**Quick Actions:**

- **Schedule Appointment** button (CalendarPlus icon)
  - Opens appointment scheduling workflow
  - Prompts for health concerns
  - Collects session details

**Status Indicators:**

- Welcome message after login
- Session count for selected date
- Empty state messaging when no appointments

### Past Visits

**Visit History:**

- Chronological list of completed sessions
- Search capability to find past visits
- Displays visit date, provider name, duration
- Access to visit notes and documentation

**Filtering Options:**

- Date range selection
- Provider name
- Visit type

### Health Profile

**Personal Information:**

- Profile photo upload/update
- Contact information management
- Emergency contact details
- Preferred language selection

**Medical Information:**

- Current medications list
- Known allergies
- Medical history
- Chronic conditions

**Privacy Settings:**

- Data sharing preferences
- Communication preferences
- Consent management

### Vitals Scan

**Available Measurements:**

- Blood Pressure
- Heart Rate
- Oxygen Saturation (SpO2)
- Temperature
- Weight
- Blood Glucose

**Scan Process:**

1. Select vital sign type to measure
2. Follow on-screen instructions for sensor placement
3. System detects and connects to compatible devices
4. Real-time measurement display
5. Results saved to patient record
6. Historical trend graphs available

**Device Compatibility:**

- Supports FDA-cleared medical devices
- Bluetooth connectivity required
- Device pairing instructions provided

### Schedule Appointment

**Booking Workflow:**

**Step 1: Health Concerns**

- "How are you feeling today?" prompt
- Text area to describe concerns/symptoms
- Character limit enforced
- Required field validation

**Step 2: Session Details**

- Preferred appointment date/time
- Timezone selection
- Provider preference (if applicable)
- Visit type selection

**Step 3: Health Assessment (On-boarding)**

When scheduling first appointment or upon request:

**Current Health Conditions:**

- "Have you been diagnosed with any of the following?" prompt
- Checkboxes for common conditions:
  - Diabetes
  - Hypertension
  - Asthma
  - Heart Disease
  - Other (with text input)

**Medications:**

- "Are you currently taking any medications?" prompt
- Add medication button
- Fields per medication:
  - Medication name
  - Dosage
  - Frequency
  - Prescribing doctor

**Allergies:**

- "Do you have any known allergies?" prompt
- Add allergy button
- Fields per allergy:
  - Allergen name
  - Reaction type
  - Severity level

**Emergency Contact:**

- Full name
- Relationship
- Phone number
- Email (optional)

**Step 4: Confirmation**

- Review appointment details
- Estimated wait time display
- Confirm or Edit options
- Calendar invite option

**Post-Booking:**

- Confirmation screen with appointment ID
- Add to calendar button
- SMS/Email confirmation sent
- Reminder notifications scheduled

### Session Experience

**Waiting Room:**

- Join session 5 minutes before scheduled time
- Real-time status updates
- Provider availability indicator
- Pre-call device checks:
  - Camera test
  - Microphone test
  - Speaker test
  - Browser compatibility check

**During Video Call:**

- Full-screen video interface
- Chat functionality
- Screen sharing capability
- File upload/share
- End call button

**Post-Session:**

- Session summary display
- Access to visit notes (when published by provider)
- Follow-up instructions
- Prescription information (if applicable)
- Option to schedule follow-up

### Notifications

**Bell Icon (Top Right):**

- Appointment reminders
- Session start notifications
- New message alerts
- Visit note availability
- Provider availability changes

**Notification Types:**

- Upcoming appointment (24hrs, 1hr, 5min before)
- Provider requests rescheduling
- New test results available
- Visit notes published
- Follow-up required

### Best Practices

**Appointment Preparation:**

- Test audio/video equipment beforehand
- Have medication list ready
- Prepare list of symptoms/concerns
- Ensure quiet, private location
- Stable internet connection

**During Appointments:**

- Join waiting room 5 minutes early
- Have photo ID ready if required
- Take notes during session
- Ask questions as needed
- Confirm understanding of instructions

**After Appointments:**

- Review visit notes promptly
- Follow prescribed treatment plans
- Schedule recommended follow-ups
- Contact provider for clarifications
- Update health profile as needed

**Security & Privacy:**

- Keep login credentials secure
- Don't share account access
- Log out on shared devices
- Review privacy settings regularly
- Report suspicious activity immediately

---

## Coordinator Role

### Overview

The Coordinator role is designed for staff who manage appointment scheduling, coordinate patient flow, monitor active sessions, and facilitate communication between patients and providers. Coordinators have a central oversight function with access to the Command Center for real-time session monitoring.

### Navigation Menu

**Primary Navigation:**

- **Dashboard** - View daily schedule and quick scheduling
- **Past sessions** - Access historical session records
- **Providers** - Directory of available providers with filtering
- **Patients** - Patient directory with scheduling capabilities
- **Command center** - Real-time monitoring and dispatch hub _(Unique to Coordinator)_

### Dashboard

**Schedule Overview:**

- "Your schedule for today" panel
  - Current date display (e.g., "Feb, 24th")
  - Session count for selected date
  - Expandable date picker (ChevronDown)
  - Calendar dialog for date selection

**Quick Actions:**

- **Schedule session** button (CalendarPlus icon)
  - Opens appointment booking workflow
  - Can schedule for any patient
  - Provider selection
  - Time slot selection

**Date Selection:**

- Interactive calendar dialog
- Month/Year dropdowns for quick navigation
- Previous/Next month navigation
- "Today" quick jump button
- Visual highlighting of selected date
- Shows dates across month boundaries

**Empty State:**

- Checkmark icon with success message
- "You currently have no upcoming sessions for today"
- Encourages scheduling new sessions

### Past Sessions

**Session History:**

- Searchable archive of completed sessions
- Search bar: "Start typing patient name"
- Chronological listing
- Quick filters by date range

**Empty State:**

- "No results found" when no sessions exist
- Clear messaging for coordinators

**Session Details (when populated):**

- Patient name and ID
- Provider name
- Session date and time
- Duration
- Session type
- Outcome/status

### Providers

**Provider Directory:**

**Search & Filters:**

- **Search bar**: "Search by name, email"
- **Filter options**:
  - User type (dropdown)
  - Specialty (dropdown)
  - Spoken languages (dropdown)
  - Status (dropdown)
- **Clear filters** button to reset all filters

**Provider Table:**

**Columns:**

- Name (with avatar icon)
- User type (e.g., "Coordinator")
- Specialty
- Email
- Spoken languages (flag icons for en, es, etc.)
- Status (Offline/Online indicator)
- Actions (Messages, Video icons)

**Sortable Columns:**

- Name (ChevronSelectorVertical)
- User type
- Specialty
- Email
- Status
- Sort by clicking column headers

**Provider Actions:**

- **Messages icon**: Initiate text chat with provider
- **Video icon**: Start video call with provider
- Click provider row for detailed profile

**Example Provider Entry:**

```
Name: Alex Dispatcher
User type: Coordinator
Specialty: [blank]
Email: gmedtester+coordstaging@gmail.com
Languages: en, es
Status: Offline
Actions: Messages, Video
```

### Patients

**Patient Directory:**

**Search Functionality:**

- Search bar: "Search by name, email or phone number"
- Real-time search filtering
- Supports partial matches

**Patient Table:**

**Columns:**

- Name (with avatar icon)
- Email
- Phone
- Actions (CalendarPlus icon)

**Sortable Columns:**

- Name (ChevronSelectorVertical)
- Email
- Phone

**Patient Actions:**

- **CalendarPlus icon**: Schedule appointment for patient
- Click patient row for detailed profile

**Pagination:**

- Previous/Next navigation buttons
- Page number indicator
- Disabled state when on first/last page
- Shows current page (e.g., "1")

**Example Patient Entries:**

```
Name: Cody Device-ID-Two
Email: chuls+device22222staging@globalmed.com
Phone: N/A
Action: Schedule (CalendarPlus)

Name: Ananya PatientONE
Email: amittal+patientonestaging@globalmed.com
Phone: (+1) 3564646848
Action: Schedule (CalendarPlus)
```

**Patient Types Listed:**

- Regular patients
- Device-ID patients (patients associated with shared devices)
- Various test accounts in staging environment

### Command Center

**Overview:**

The Command Center is the central dispatch and monitoring hub, providing real-time visibility into appointment requests, waiting rooms, and active sessions. This is a **Coordinator-exclusive feature**.

**Main Sections:**

#### Requests Panel

- **Counter**: "Requests 0"
- Shows pending appointment requests
- Empty state: "No requests yet"
- Real-time updates when new requests arrive

**When Requests Present:**

- List of pending appointment requests
- Patient name and basic info
- Requested time/date
- Reason for visit
- Accept/Decline actions
- Prioritization indicators

#### Waiting Rooms Panel

- **Counter**: "Waiting rooms 0"
- Shows patients in virtual waiting rooms
- Empty state: "No requests yet"
- Real-time updates when patients join

**When Waiting Rooms Active:**

- List of patients waiting for appointments
- Wait time displayed
- Provider assignment status
- Quick-assign provider capability
- Escalation options for long waits

#### Active Sessions Panel

- **Counter**: "Active Sessions 1" (shows current count)
- Monitoring of ongoing video consultations

**Session Cards:**

Each active session displays:

- **Status Icon**: Check icon for completed/ended sessions
- **Status Message**:
  - "Session is ended. Scheduling required."
  - "Session in progress"
  - "Waiting for provider"
- **Participants**:
  - Patient name and role (e.g., "Cody PatientOne (patient)")
  - Provider name and role (e.g., "Cody ProviderOne (provider)")
- **Session Duration**: Real-time timer (e.g., "7d 6h 24m")
- **Click for Details**: Card is interactive for full session view

**Real-Time Features:**

- Subscription to dispatcher events: "dispatcher:start"
- Live updates without page refresh
- Socket connection for real-time data
- Audio/visual notifications for new activity

**Coordinator Actions from Command Center:**

- Assign provider to waiting patient
- Join session to assist (if capabilities allow)
- End/transfer sessions
- View session details
- Generate reports
- Escalate issues

### Schedule Session Workflow

**Accessible from Dashboard or Patient Directory:**

**Step 1: Patient Selection**

- Search and select patient from directory
- Or enter new patient information
- Verify patient identity

**Step 2: Provider Selection**

- View available providers
- Filter by specialty/availability
- Check provider schedule
- Select preferred provider

**Step 3: Date & Time**

- Interactive calendar picker
- Time slot selection
- Timezone confirmation
- Duration estimation

**Step 4: Session Details**

- Visit type (routine, urgent, follow-up)
- Reason for visit
- Special requirements
- Interpreter needed checkbox
- Equipment/test requirements

**Step 5: Confirmation**

- Review all details
- Send notifications checkbox
- Confirm booking
- Generate appointment ID

**Post-Creation:**

- Confirmation screen
- Email/SMS sent to patient
- Provider notification sent
- Calendar entries created
- Add to Command Center monitoring

### Notifications

**Bell Icon (Top Right):**

- New appointment requests
- Session alerts (starting, ending, issues)
- Provider status changes
- Patient arrivals in waiting room
- System messages

**Real-Time Alerts:**

- Critical: Urgent appointment requests, session issues
- High: Patients waiting beyond threshold time
- Medium: Upcoming scheduled sessions, provider availability
- Low: General notifications, system updates

### Best Practices

**Daily Workflow:**

- Check Command Center at start of shift
- Review daily schedule for all providers
- Monitor waiting room thresholds
- Proactive provider assignment
- End-of-day session reconciliation

**Scheduling:**

- Verify patient identity before booking
- Confirm provider availability
- Allow buffer time between appointments
- Consider patient timezone
- Document special requirements

**Command Center Monitoring:**

- Check every 15-30 minutes
- Respond to requests within 5 minutes
- Escalate long waits immediately
- Track session completion
- Note any issues for follow-up

**Communication:**

- Use Messages for non-urgent provider coordination
- Use Video for urgent consultations
- Keep patients informed of delays
- Document all significant communications
- Professional tone in all interactions

**Provider Coordination:**

- Maintain current provider schedule knowledge
- Balance workload across providers
- Respect provider preferences and specialties
- Quick reassignment when needed
- Track provider availability patterns

**Patient Management:**

- Keep patient records current
- Note patient preferences
- Track no-shows and cancellations
- Follow up on incomplete sessions
- Maintain patient satisfaction focus

**Documentation:**

- Log all scheduling actions
- Document escalations and resolutions
- Note technical issues
- Track metrics (wait times, session counts)
- Generate regular reports for management

**Security & Privacy:**

- Verify patient identity before discussing appointments
- Use secure channels for sensitive information
- Lock workstation when away
- Follow HIPAA compliance protocols
- Report security concerns immediately

---

## Device Role

### Overview

The Device role is designed for shared kiosk devices or tablets deployed in clinical locations such as clinics, pharmacies, or urgent care centers. Unlike other roles, Device users authenticate using a simple numeric Device ID rather than email/password credentials. This role provides a streamlined, patient-facing interface focused on joining scheduled appointments.

### Login Process

**Device ID Authentication:**

1. Navigate to `/login/device` endpoint
2. Enter numeric Device ID (e.g., "33333", "11111", "22222")
3. Click "Verify Device ID" button
4. System validates Device ID and grants access

**Login Screen Elements:**

- **Heading**: "Device ID Access"
- **Welcome Message**: "Welcome to eNOW! Please enter your device ID so that we can verify it."
- **Input Field**: "Device ID\*" (numeric input)
- **Action Button**: "Verify Device ID"

**No Password Required:**

- Device authentication uses only the numeric ID
- No email or password credentials needed
- Simplified for shared device environments

### Navigation Menu

**Primary Navigation:**

- **Dashboard** - View upcoming appointments _(Only navigation item)_

**Key Difference:**

Unlike other roles (Admin, Provider, Patient, Coordinator), the Device role has **no additional navigation menu items**. The interface is intentionally minimal to prevent unauthorized access to sensitive features.

### Dashboard

**Minimal Interface:**

- **Header**: Institution name (e.g., "Globalmed Staging for QA")
- **Upcoming appointments** section
- No quick action buttons
- No scheduling capabilities from dashboard

**Appointment Display:**

- Shows scheduled appointments for the device
- Displays appointment time and provider information
- Join button appears when appointment is ready
- Empty state: "You currently have no upcoming appointments"

**Intended Use:**

- Patients approach the shared device
- Device displays their scheduled appointment
- Patient joins waiting room/session when ready
- No ability to browse or schedule new appointments

### Profile Menu

**Accessible via Avatar (Top Right):**

The profile menu displays:

1. **User Information Card** (non-clickable):
   - Device name (e.g., "Cody Device-ID-Three 33333")
   - Associated email address
   - Device ID displayed in name

2. **Account settings** (SettingsGear icon)
   - My account tab
   - Notifications tab

3. **Help** (InfoCircle icon)
   - Access to help documentation
   - Support resources

4. **Privacy policy** (Policy icon)
   - View privacy policy document
   - Terms of service

5. **Log out** (LogOut icon)
   - End device session
   - Return to Device ID login screen

### Account Settings

**My Account Tab:**

**Profile Photo:**

- Display avatar with device initial
- **Upload photo** button (Download icon)
- **Delete photo** button (Trash icon)
- Circular avatar display

**Profile Details:**

- **Name**: Device name (e.g., "Cody Device-ID-Three")
- **Device ID**: Numeric identifier (e.g., "33333")
- **Phone number**: N/A (not applicable for devices)
- **Country**: N/A
- **State**: N/A
- **City**: N/A
- **Zip code**: N/A
- **Address 1**: N/A
- **Address 2**: N/A
- **Edit button**: Allows updating profile information

**Application Language:**

- Current language display with flag icon
- "Change language" link
- Supports multiple languages (English, Spanish, etc.)
- Useful for multilingual clinic environments

**Time Zone:**

- Displays current timezone setting
- Format: "(GMT-07:00) Mountain Standard Time - Phoenix - 08:03 PM"
- "Change time zone" link
- Important for appointment scheduling accuracy

**Notifications Tab:**

**Notification Methods:**

1. **Email**:
   - Shows device email address
   - Toggle checkbox to enable/disable
   - Useful for device administrators

2. **SMS**:
   - "Add phone number" link
   - Checkbox (disabled until phone number added)
   - Optional for device notifications

3. **In-app**:
   - Toggle checkbox
   - Browser/system notifications
   - Active session alerts

**Session Reminders:**

- Description: "Set the time you'd like to be reminded before the session starts."
- **Add reminder** button
- Configure reminder timing (e.g., 15 minutes, 30 minutes before)
- Helps ensure patients are present for appointments

### Session Experience

**Joining Appointments:**

When an appointment is ready:

1. Appointment card appears on Dashboard
2. "Join" button becomes active at scheduled time
3. Click to enter waiting room
4. Provider initiates session when ready

**During Session:**

- Full-screen video interface
- Microphone and camera controls
- Chat functionality (limited)
- End session button
- Minimal controls to prevent accidental disruption

**Post-Session:**

- Automatic return to Dashboard
- Session summary (if available)
- Ready for next patient/appointment

### Notifications

**Bell Icon (Top Right):**

- Appointment reminders
- Session start notifications
- System alerts
- Empty state: "No notifications received"

**Notification Panel:**

- Heading: "Notifications"
- "Clear all" button (Eraser icon)
- Close button (X)
- Chronological notification list

### Device Management Best Practices

**Initial Setup:**

- Device ID assigned by system administrator
- Configure timezone for device location
- Set appropriate language for patient population
- Test audio/video functionality
- Ensure stable internet connection

**Daily Operations:**

- Power on device at start of clinic hours
- Login with Device ID once per day
- Leave logged in for patient use
- Monitor for scheduled appointments
- Assist patients with joining sessions as needed

**Between Patients:**

- Return to Dashboard after each session
- Do not log out between patients
- Keep device charged/plugged in
- Ensure camera/microphone are functional
- Maintain clean screen and device

**End of Day:**

- Review any missed appointments
- Log out of device
- Power down or lock device
- Report any technical issues
- Clean and sanitize device per clinic protocol

**Security Considerations:**

- Device ID should not be shared publicly
- Position device in supervised area
- Lock or log out when clinic unmanned
- Report lost or stolen devices immediately
- Update Device ID if compromised

**Troubleshooting:**

- **Cannot login**: Verify Device ID with administrator
- **No appointments showing**: Check timezone settings, verify appointments scheduled
- **Audio/Video issues**: Check browser permissions, test hardware
- **Session won't start**: Refresh page, verify internet connection
- **Wrong language**: Use Account Settings > Change language

**Privacy & Compliance:**

- Device placed in private or semi-private area
- Patients cannot access other patients' information
- No browsing capabilities outside scheduled appointments
- Session recordings per institutional policy
- HIPAA-compliant device configuration

**Hardware Recommendations:**

- **Minimum Requirements**:
  - HD webcam (720p or better)
  - USB or built-in microphone
  - Speakers or headphone jack
  - Touchscreen (optional but recommended)
  - 4GB RAM minimum
  - Modern browser (Chrome, Edge, Firefox)

- **Optimal Setup**:
  - Dedicated tablet or all-in-one PC
  - External monitor (for staff assistance)
  - Ethernet connection (for stability)
  - Privacy screen or positioned for patient privacy
  - Adjustable stand for wheelchair accessibility

### Limitations

**Restricted Functionality:**

The Device role **cannot**:

- Schedule new appointments
- Browse patient or provider directories
- Access past session history
- Modify institution settings
- Manage other users
- Access reports or analytics
- Send messages outside of active sessions
- View or edit medical records

**Purpose:**

These limitations ensure:

- Patient privacy protection
- Prevention of unauthorized data access
- Simplified interface for walk-in patients
- Reduced training burden for clinic staff
- Compliance with healthcare regulations

---

## Appendix

### System Information

- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Minimum Screen Resolution**: 1024x768
- **Time Zone**: Configurable per institution

### Support & Resources

- Technical support contact information
- Training resources
- Video tutorials

---

_End of Admin Role Documentation - Document in Progress_
