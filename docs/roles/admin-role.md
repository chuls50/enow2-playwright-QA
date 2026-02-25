# Admin Role - Complete Guide

**Application:** eNow2 Telehealth Platform  
**Version:** 1.0  
**Last Updated:** February 24, 2026  
**Application URL:** https://portal.qa-encounterservices.com

---

## Table of Contents

1. [Overview](#overview)
2. [Navigation Menu](#navigation-menu)
   - [Users](#1-users)
   - [Institution Settings](#2-institution-settings)
   - [Document Management](#3-document-management)
   - [Visit Notes](#4-visit-notes)
   - [Data Reporting](#5-data-reporting)
3. [Profile Menu](#profile-menu)
4. [Account Settings](#account-settings)
5. [Common Workflows](#common-workflows)
6. [Best Practices](#best-practices)

---

## Overview

The Admin role provides comprehensive access to manage users, configure institution settings, manage documents, and access reporting capabilities across the eNow2 platform. Administrators serve as the primary system configurators and have the highest level of access to institutional settings and user management.

**Key Responsibilities:**

- User and role management
- Institution configuration and branding
- Document template management
- Visit note template administration
- Analytics and reporting oversight
- System-wide settings configuration

**Access Level:** Full administrative access to all institutional features

---

## Navigation Menu

The Admin role has access to five primary navigation sections via the left sidebar:

### 1. Users

User management interface for the institution.

#### Overview

Central hub for managing all users within your institution, including providers, patients, coordinators, and device IDs. The Users section provides comprehensive tools for inviting new users, managing existing accounts, and exporting user data.

#### User Table

**Table Columns:**

- **User Name**: Full name with avatar
- **Email**: Primary contact email
- **Assigned Roles**: One or multiple roles (Admin, Provider, Patient, Coordinator, Device)
- **Institutions**: Associated institution(s)
- **Active Status**: Active or Inactive indicator
- **Last Updated**: Date stamp (sortable for tracking recent changes)

**Table Features:**

- Sortable columns (click column header to sort)
- Pagination for large user lists
- Quick status indicators (active/inactive badges)

#### Actions Available

**Primary Actions:**

1. **Create Device ID**
   - Generates new device IDs for shared kiosk devices
   - System auto-generates unique numeric ID
   - Device can be assigned to specific locations
   - Used for clinic tablets, waiting room kiosks
   - No email/password required for device login

2. **Invite Users**
   - Send email invitations to new users
   - Select role(s) during invitation process
   - Support for multiple role assignments
   - Invitation link expires after timeframe
   - User completes registration via email link

3. **Export User List**
   - Download complete user roster
   - Export formats: CSV, Excel
   - Includes all visible columns
   - Useful for auditing and external reporting
   - Respects current filter selections

#### Search and Filtering

**Search Functionality:**

- Search by name field
- Real-time filtering as you type
- Searches across: first name, last name, full name
- Case-insensitive search

**Filter Options:**

- **Filter by Role**:
  - All (default)
  - Admin
  - Provider
  - Patient
  - Coordinator
  - Device
  - Combined roles
- Multiple filter tags can be active
- Clear filters button resets all selections

#### User Management Actions

**Per-User Actions** (available via actions menu on each row):

- **View Profile**: See complete user details
- **Edit User**: Modify user information and roles
- **Deactivate/Activate**: Toggle user access
- **Resend Invitation**: Re-send invitation email if not completed
- **Reset Password**: Initiate password reset flow
- **Delete User**: Permanently remove user (requires confirmation)

**Bulk Actions:**

- Select multiple users via checkboxes
- Bulk activate/deactivate
- Bulk delete (with confirmation)
- Bulk role assignment

---

### 2. Institution Settings

Comprehensive configuration for your institution across five tabs. This is where you configure everything from basic contact information to advanced white-label branding.

#### Profile Tab

Configure basic institution information and access links.

##### Institution Information

**Basic Details:**

- **Institution Name** (Required)
  - Displayed throughout the platform
  - Appears in email communications
  - Shows in patient-facing interfaces
- **Institution Language**
  - Primary language: English or Spanish
  - Affects default UI language for users
  - Can be overridden by individual user preferences

- **Phone Number**
  - Country code selector dropdown
  - Format validation
  - Displayed for patient support inquiries

##### Institution Address

**Address Fields:**

- **Street**: Primary street address
- **Apt/Suite**: Optional unit number
- **ZIP Code**: Postal code with format validation
- **City**: City name
- **State**: Dropdown selector (US states)
- **Country**: Dropdown selector (all countries)

**Usage:**

- Appears on official documentation
- Used for billing and administrative purposes
- Displayed in patient communications

##### Access Links

Two primary access methods for users:

1. **Patient Registration Link**
   - Format: `https://portal.qa-encounterservices.com/signup/[TOKEN]`
   - Unique token per institution
   - Public link for new patient signups
   - Share via website, email, SMS
   - **Copy Link** button for easy sharing
   - No authentication required to access signup form

2. **Device ID Access Link**
   - Format: `https://portal.qa-encounterservices.com/login/device`
   - Direct login for device users
   - Requires numeric Device ID only (no password)
   - Used for shared kiosks and tablets
   - **Copy Link** button for easy sharing
   - Can be bookmarked on device browsers

##### Point of Contact (POC) Details

Designate institutional contact person for administrative matters.

**POC Information:**

- **Name**: Full name of primary contact
- **Title**: Job title or role
- **Phone Number** (Required): Direct contact number with country code
- **Email** (Required): Primary email for institutional communications

**POC Address:**

- Same fields as institution address
- Can be same or different from main institution address
- Street, Apt/Suite, ZIP, City, State, Country

**Use Cases:**

- Platform support communications
- Billing and payment inquiries
- Legal and compliance matters
- System notifications and alerts

---

#### Configuration Tab

Advanced settings to control platform behavior and feature availability.

##### Provider Management

**Enforce Country/State Licensing:**

- **Purpose**: Filter provider availability based on patient location and provider licensing credentials
- **When Enabled**:
  - System checks provider licenses against patient location
  - Only shows providers licensed in patient's state/country during scheduling
  - Ensures compliance with telemedicine regulations
  - Prevents cross-border practice violations
- **When Disabled**:
  - All providers shown regardless of patient location
  - Institution assumes responsibility for licensing compliance

**Best Practice**: Enable this feature unless you have alternative licensing verification processes.

##### Encounter Now Settings

Controls for on-demand "see a provider now" functionality.

**Number of Times to Contact Available Providers:**

- Default: 5 cycles
- Range: 1-10 cycles
- Determines how many attempts to contact providers before alerting user
- Each cycle contacts all available providers simultaneously
- Recommended: 3-5 for balance of persistence and user experience

**Number of Minutes Before Re-Try:**

- Default: 1 minute
- Range: 1-10 minutes
- Wait time between contact cycles
- Allows providers time to respond before next round
- Shorter intervals = faster response but more interruptions
- Longer intervals = less intrusive but slower response

**Example Flow:**

1. Patient requests "See a Provider Now"
2. System contacts all available providers
3. Waits configured retry interval (e.g., 1 minute)
4. If no response, contacts providers again
5. Repeats for configured number of times (e.g., 5 cycles)
6. After final cycle, notifies patient of no availability

##### Waiting Room Feature

Virtual waiting room where patients wait before provider joins appointment.

**Enable/Disable Toggle:**

- Turn feature on or off institution-wide
- When enabled: All appointments use waiting room
- When disabled: Direct join to video call

**Timer Configuration:**

- **Minutes Before Timer Turns Red**: Default 5 minutes
- Configurable range: 1-30 minutes
- Visual indicator for coordinators/providers
- Alerts when patient has been waiting too long
- Helps prioritize response to long-wait patients

**Waiting Room Features:**

- **Patient-to-Patient Communication**: Optional chat between waiting patients
- **Coordinator Monitoring**: Coordinators can see all waiting rooms
- **Status Updates**: Real-time updates to patients
- **Pre-Call Checks**: Test camera, microphone, speakers before provider joins
- **Session Information**: Display appointment details to patient

**Use Cases:**

- Scheduled appointments with flexible start times
- Group sessions where participants join gradually
- Educational sessions with multiple attendees
- When providers may run slightly behind schedule

##### Dispatcher Feature

Centralized request management for clinicians.

**Enable/Disable Toggle:**

- Turn dispatcher functionality on or off
- When enabled: All appointment requests route through dispatcher
- When disabled: Requests go directly to specified providers

**Timer Configuration:**

- **Minutes Before Timer Turns Red**: Default 5 minutes
- Configurable range: 1-30 minutes
- Visual alert for urgent requests
- Helps prioritize request handling

**Functionality:**

- **Centralized View**: All appointment requests in one interface
- **Request Details**: Patient info, reason for visit, urgency level
- **Provider Selection**: Dispatcher assigns appropriate provider
- **Approve/Decline**: Accept or reject requests with reasons
- **Queue Management**: Prioritize and re-order requests
- **Load Balancing**: Distribute appointments evenly across providers

**Best For:**

- Large institutions with dedicated coordinators
- High-volume appointment settings
- Specialized provider matching requirements
- Urgent care or ED triage workflows

##### Chat Appointments

Enable or disable chat-based appointments as alternative to video.

**Enable Chat Appointment Types:**

- **When Enabled**:
  - Users can choose Video Call OR Chat when scheduling
  - Chat appears as appointment type option
  - Providers receive chat-based appointment notifications
  - Documented in past sessions as "Chat" type
- **When Disabled**:
  - Only Video Call appointments available for scheduling
  - Existing chat appointments remain accessible
  - Ad-hoc chats still available during video calls

**Note on Chat Availability:**
Regardless of this setting, the following remain available:

- **In-Call Chat**: Text chat during video calls
- **Waiting Room Chat**: Communication while waiting
- **Direct Messages**: Provider-to-provider messaging
- **Ad-Hoc Chats**: Direct messaging between users

**Use Cases for Chat Appointments:**

- Follow-up consultations
- Prescription refills
- Simple question answering
- Patients without video capability
- Lower-acuity encounters

##### Required Patient Fields

Configure which fields are mandatory when patients register or update profiles.

**Configurable Required Fields:**

1. **Tax ID**
   - Checkbox to make required
   - Used for billing and insurance purposes
   - May be SSN or Tax Identification Number
   - Recommend: Required for insurance billing

2. **Insurance Policy Number**
   - Checkbox to make required
   - Policy ID from insurance provider
   - Necessary for claims submission
   - Recommend: Required if accepting insurance

3. **Insurance Information**
   - Full insurance details
   - Provider name, group number, etc.
   - Enables insurance verification
   - Recommend: Required for insured patients

**Implementation Notes:**

- Fields marked required will have asterisk (\*)
- Patient cannot complete registration without required fields
- Existing patients prompted to complete missing required fields
- Can make fields optional later without data loss

---

#### White Label Tab

Customize the platform's branding to match your organization's identity. The White Label feature allows you to transform the eNow2 interface into your own branded telehealth solution.

##### White Label Configuration

**Enable/Disable Master Toggle:**

- Turn all white labeling on or off
- When disabled, platform reverts to default eNow2 branding
- All custom settings preserved if disabled temporarily

**Organization Name:**

- Your organization's official name
- Appears in: page titles, emails, communications
- Example: "Global Healthcare Network"

**Product Name:**

- Custom name for the telehealth platform
- Replaces "eNow2" throughout interface
- Example: "HealthConnect" or "CarePortal"

**Subdomain:**

- Custom URL subdomain
- Format: `[your-subdomain].encounterservices.com`
- Example: `globalhealth.encounterservices.com`
- Must be unique across all institutions
- DNS changes may take 24-48 hours to propagate

##### Logo & Branding Assets

**Organization Logo:**

- **Accepted Formats**: JPG, PNG
- **Maximum Size**: 10 MB
- **Recommended Dimensions**: 300x100px (maintains aspect ratio)
- **Usage**:
  - Top-left corner of navigation
  - Email headers
  - Login page
  - Patient-facing documents
- **Upload Button**: Drag-and-drop or click to browse
- **Preview**: Shows immediately after upload

**Favicon:**

- **Purpose**: Browser tab icon
- **Accepted Formats**: JPG, PNG
- **Recommended**: 32x32px transparent PNG
- **Maximum Size**: 10 MB
- **Live Preview**: See how it appears in browser tab
- **Best Practice**: Use simple, recognizable icon at small size

**Cover Image:**

- **Purpose**: Login page background
- **Accepted Formats**: JPG, PNG
- **Maximum Size**: 10 MB (recommend compressed for fast loading)
- **Recommended Dimensions**: 1920x1080px or larger
- **Preview**: Full-size preview shown in settings
- **Upload Options**:
  - Upload custom image
  - Reset to default eNow2 image
- **Design Tips**:
  - Use calming, professional imagery
  - Ensure text contrast for login form overlay
  - Avoid busy patterns that distract from login

##### Color Customization

**Primary Brand Color:**

- **Purpose**: Main accent color throughout platform
- **Input**: Hex color code (e.g., #3B82F6)
- **Color Picker**: Visual hex selector provided
- **Usage**:
  - Buttons (primary actions)
  - Links and hyperlinks
  - Active navigation items
  - Loading indicators
  - Icons and badges
- **Preview**: Live preview of buttons and elements

**Main Button Text Color:**

- **Purpose**: Text color on primary buttons
- **Input**: Hex color code
- **Color Picker**: Visual selector
- **Best Practice**: Ensure sufficient contrast with button background
- **WCAG Compliance**: Aim for AAA contrast ratio (7:1 minimum)

**Reset to Default:**

- Single button to restore original eNow2 colors
- Does not affect logos or cover image
- Instant preview of changes

##### Preview Components

Live previews help you visualize changes before publishing:

**Button Preview:**

- Shows primary and secondary button styles
- Displays hover states
- Validates text color contrast

**Icon Preview:**

- Navigation link styling
- Active/inactive states
- Hover effects

**Tab Preview:**

- Tab component styling
- Active tab highlighting
- Border and background colors

##### Patient Booking Button Styles

Customize the two main patient action buttons on the dashboard.

**Button 1: Schedule an Appointment**

**Style Options:**

- **Default Style**: Outlined button with border
- **Solid Style**: Filled background button

**Color Configuration:**

- **Background Color**: Main button fill (hex input)
- **Text Color**: Button text (hex input)
- **Highlight Color 1**: Hover state or gradient start
- **Highlight Color 2**: Active state or gradient end

**Button 2: See a Provider Now**

Same configuration options as Schedule Appointment button:

- Style selection (Default/Solid)
- Background color
- Text color
- Highlight colors (1 and 2)

**Reset to Default:**

- Per-button reset option
- Restores eNow2 default styling
- Preserves other customizations

**Design Best Practices:**

- Use organization's brand colors
- Ensure high contrast for accessibility
- Test on multiple screen sizes
- Consider color psychology (blue = trust, green = proceed)
- Make "See a Provider Now" more visually prominent (urgent action)

---

#### Services Tab

Manage medical services and specialties offered by your institution.

##### Overview

The Services tab allows you to define appointment types, configure pricing, set durations, and assign providers to specific services. Each service can have unique settings and requirements.

##### Service Management Interface

**Search Functionality:**

- Search by service name
- Real-time filtering
- Clear search button

**Filter Options:**

- **All Services**: Show everything
- **Active Only**: Currently available services
- **Inactive Only**: Disabled services

##### Service Configuration

Each service is presented in an expandable accordion format with the following fields:

**Basic Information:**

1. **Service Name** (Required)
   - Display name shown to patients
   - Example: "General Practice", "Cardiology Consultation", "Pediatric Care"
   - Should be clear and descriptive

2. **Description** (Optional)
   - Detailed explanation of service
   - Displayed when patient selects service
   - Can include what to expect, preparation required
   - Supports multiple lines of text

3. **Specialty** (Searchable Dropdown)
   - Associated medical specialty
   - Options include:
     - General Practitioner
     - Allergologist
     - Angiologist
     - Cardiologist
     - Dermatologist
     - Endocrinologist
     - Gastroenterologist
     - Neurologist
     - Oncologist
     - Pediatrician
     - Psychiatrist
     - Surgeon
     - And many more...
   - Type to search through specialties
   - Can assign multiple specialties per service

**Appointment Configuration:**

4. **Duration** (Required)
   - Appointment length in minutes
   - Common options: 15, 30, 45, 60, 90 minutes
   - Custom durations available
   - Affects scheduling grid and provider availability

5. **Fee Configuration**
   - **Enable Fee** (Toggle Checkbox)
     - When enabled: Fee field becomes active
     - When disabled: Service is free/covered by insurance
   - **Fee Amount** (Number Input)
     - Dollar amount for service
     - Example: $50.00, $150.00
     - Displayed to patient before booking
     - Used in billing and payment processing

6. **Allow 'See a Provider Now'** (Checkbox)
   - Enable for on-demand immediate consultations
   - When enabled: Service appears in "See a Provider Now" flow
   - When disabled: Service only available for scheduled appointments
   - Best for: Urgent care, general practice, triage services
   - Avoid for: Specialized consultations requiring preparation

**Service Status:**

7. **Service Enabled** (Toggle)
   - Active: Service available for booking
   - Inactive: Hidden from patients, preserved in system
   - Deactivating preserves all configuration
   - Past appointments remain accessible

**Advanced Configuration:**

8. **Templates**
   - Assign document templates to service
   - Patients complete before/during appointment
   - Examples: Consent forms, health questionnaires, intake forms
   - Multiple templates can be assigned
   - Templates managed in Document Management section

9. **Provider List**
   - Assign specific providers to this service
   - Only assigned providers can perform this service
   - Affects scheduling availability
   - Use "Manage Providers" button to modify list
   - Supports bulk provider assignment

##### Pre-configured Example Services

**General Practice:**

- Duration: 30 minutes
- Fee: None (free or covered)
- Allow on-demand: Yes
- Status: Enabled
- Common first-line consultations

**Cardiòlogo (Cardiologist):**

- Duration: 15 minutes
- Fee: $50.00
- Allow on-demand: Typically no
- Status: Enabled
- Specialized cardiac consultations

**Pediatrics:**

- Duration: 30 minutes
- Fee: None
- Allow on-demand: Yes
- Status: Enabled
- Child and adolescent care

**Toxicology:**

- Duration: Varies
- Fee: Configured per instance
- Specialized poison/toxin consultations

##### Service Actions

**Primary Actions:**

- **Create New Service**: Add a service from scratch
- **Edit Service**: Click accordion to expand and modify
- **Duplicate Service**: Copy existing service as template
- **Delete Service**: Remove permanently (requires confirmation)
- **Bulk Enable/Disable**: Select multiple and toggle status

**Sort Options:**

- Alphabetically by name
- By specialty
- By enabled status
- By creation date

##### Service Workflow Example

**Creating a New Service:**

1. Click "Create New Service"
2. Enter service name: "Dermatology Consultation"
3. Add description: "Skin condition assessment and treatment planning"
4. Select specialty: "Dermatologist"
5. Set duration: 45 minutes
6. Enable fee: Yes, set amount: $125.00
7. Allow on-demand: No (requires scheduled time)
8. Enable service: Yes
9. Assign document templates: Consent form, skin condition questionnaire
10. Assign providers: Select dermatologists from provider list
11. Save service

Service is now available for patient booking.

---

#### Insurance & Payments Tab

Configure insurance acceptance and payment processing for your institution.

##### Overview

The Insurance & Payments tab handles all financial configuration including insurance provider management, payment processor integration, and patient payment reminder systems.

##### Insurance Setup

**Enable Insurance Selection (Master Toggle):**

- Turn insurance features on/off institution-wide
- When enabled: Insurance fields appear in patient registration
- When disabled: All payment becomes self-pay or free

**Premium Package Configuration:**

1. **Enable Premium Package** (Toggle)
   - Creates tiered insurance offering
   - Allows grouping specific insurance providers
   - Useful for partner networks or preferred providers

2. **Premium Package Name**
   - Custom name for the insurance tier
   - Example: "GlobalHealthcare Plus", "Premium Network"
   - Displayed to patients during insurance selection
   - Helps differentiate from standard insurance options

**Insurance Provider List:**

Configure accepted insurance providers with co-pay amounts:

**Add Insurance Provider:**

- **Insurance Title** (Required)
  - Provider name
  - Examples: Cigna, Aetna, Blue Cross Blue Shield, UnitedHealthcare
  - Displayed in dropdown during patient registration

- **Co-pay Amount** (Required)
  - Fixed co-payment amount in dollars
  - Charged per visit or service
  - Examples: $20, $30, $50, $100
  - Can be $0 for fully covered services

**Management Actions:**

- **Add New**: Button to add insurance provider
- **Edit**: Modify existing provider details
- **Delete**: Remove insurance provider (with confirmation)
- **Reorder**: Drag to change display order

**Example Configuration:**

```
Insurance Provider: Cigna
Co-pay: $100.00

Insurance Provider: Aetna
Co-pay: $80.00

Insurance Provider: Zero
Co-pay: $0.00
```

##### Payments Setup

**Self Payment Option:**

- **Enable Toggle**: Allow patients to pay directly
- When enabled: Patients can pay without insurance
- Credit card processing required
- Payment captured at time of service or booking

**Payment Processor Selection:**

- **Dropdown Menu**: Choose payment gateway
- Supported processors:
  - Stripe
  - Square
  - PayPal
  - Authorize.Net
  - Braintree
  - Others (institution-specific)
- Each processor requires separate account setup

**Currency Selection:**

- **Dropdown Menu**: Choose transaction currency
- Common options:
  - USD (US Dollar)
  - EUR (Euro)
  - GBP (British Pound)
  - CAD (Canadian Dollar)
  - And more...
- Affects all payment displays and processing

**Authorization Key:**

- **Secure Input Field**: Paste API key from payment processor
- Required for payment processing integration
- Obtained from payment processor dashboard
- Encrypted in storage
- Test mode vs Live mode keys

**Configuration Actions:**

1. **Edit Account**
   - Modify payment processor settings
   - Update authorization keys
   - Change currency
   - Switch processors

2. **Payment Reporting**
   - View transaction history
   - Download payment reports
   - Reconcile payments
   - Track refunds and disputes

##### Patient Payment Reminders

Automated system to remind patients of outstanding payments.

**Enable/Disable Toggle:**

- Turn reminder system on or off
- When enabled: Automatic reminders sent to patients
- When disabled: Manual reminder process only

**Service Reminder Configuration:**

- **Select Service**: Choose which service triggers reminders
- Can configure different reminder schedules per service
- High-cost services may have more frequent reminders

**Reminder Intervals:**

- **Frequency Selector**: How often to send reminders
- Options:
  - Every 4 hours
  - Every 12 hours
  - Daily
  - Every 2 days
  - Weekly
  - Custom interval
- **Maximum Attempts**: Stop after certain number of reminders
- **Escalation**: Option to escalate to phone or mail after email attempts

**Reminder Content:**

- Outstanding balance amount
- Service provided
- Payment methods accepted
- Payment portal link
- Contact information for questions

**Best Practices:**

- Start with gentle reminder (24 hours after service)
- Increase frequency for larger balances
- Provide easy payment options (link in email)
- Include contact info for payment plans
- Comply with billing regulations and patient rights

##### Payment Notes

**Important Implementation Steps:**

1. **Payment Processor Account**
   - Must be created before enabling payments
   - Institution responsible for processor fees
   - Bank account required for settlements
   - Compliance and verification required

2. **Security Compliance**
   - PCI DSS compliance required for credit card processing
   - SSL certificate mandatory
   - Secure payment forms
   - Encrypted data transmission

3. **Testing**
   - Use test mode API keys during setup
   - Process test transactions
   - Verify webhooks and confirmations
   - Switch to production keys when ready

4. **Patient Communication**
   - Clear pricing displayed before booking
   - Payment confirmation emails
   - Receipt generation
   - Refund policy clearly stated

**All payment features remain disabled until:**

- Payment processor account created
- Authorization key entered
- Currency selected
- Test transactions successful

---

### 3. Document Management

Manage document templates and packets for patient and provider use throughout the care delivery process.

##### Overview

The Document Management section allows you to create, organize, and deploy document templates that patients and providers must complete. Documents can be individual templates or organized into packets (collections of related documents).

##### Two Main Sections

**1. Templates:** Individual document forms
**2. Packets:** Collections of related templates

##### Templates Section

**Template Table Columns:**

- **Name**:
  - Template title
  - Descriptive name visible to users
  - Sortable alphabetically
  - Example: "Patient Consent", "Health History Questionnaire"

- **Status**:
  - **Active**: Currently in use, available for assignment
  - **Inactive**: Disabled, not shown to users but preserved in system
  - Sortable by status
  - Visual badge indicators (green for active, gray for inactive)

- **Type**:
  - **Patient-type**: Completed by patients
  - **Provider-type**: Completed by providers
  - **Admin-type**: Administrative documents
  - Sortable by type
  - Determines who sees the template

- **Actions Menu** (Three-dot icon):
  - Edit Template
  - Preview Template
  - Duplicate Template
  - Activate/Deactivate
  - Delete Template
  - Assign to Services
  - View Usage Statistics

**Current System Templates:**

1. **Patient Consent**
   - Status: Active
   - Type: Patient
   - Purpose: Legal consent for telehealth services
   - Required: Before first appointment
   - Content: Terms of service, privacy policy, consent to treatment

2. **Provider Consent Required**
   - Status: Active
   - Type: Provider
   - Purpose: Provider agreement to use platform
   - Required: During provider onboarding
   - Content: HIPAA compliance, professional conduct, licensing verification

##### Template Actions

**Create Template:**

Clicking "Create Template" opens template builder:

1. **Basic Information:**
   - Template name (required)
   - Description (optional)
   - Template type (Patient/Provider/Admin)
   - Language (English/Spanish/Both)

2. **Template Content:**
   - Rich text editor for document body
   - Support for:
     - Formatted text (bold, italic, underline)
     - Bulleted and numbered lists
     - Headings and subheadings
     - Hyperlinks
     - Images and logos
   - Variable fields (auto-populate patient/provider data)
   - Signature fields (electronic signature)
   - Date stamps (auto-fill current date)

3. **Form Fields:**
   - Text input fields
   - Dropdown selections
   - Checkboxes
   - Radio buttons
   - Text areas (multi-line)
   - Required vs optional field toggle

4. **Configuration:**
   - **Require Completion**: Must be completed before appointment
   - **Allow Editing**: Can patient edit after submission
   - **Expiration**: Does document expire? How often to re-complete?
   - **Storage**: Where completed documents are stored
   - **Sharing**: Who can view completed documents

**Edit Template:**

- Modify existing template content
- Update form fields
- Change requirements
- Preview changes before publishing
- Version history maintained

**Activate/Deactivate:**

- Toggle template availability
- Deactivating preserves template and completed instances
- Reactivating makes template available again
- Useful for seasonal forms or temporary documents

**Delete Template:**

- Permanently remove template
- **Warning**: Cannot be undone
- Completed instances preserved in patient/provider records
- Confirmation dialog required
- Can only delete templates not currently assigned to services

##### Packets Section

**Purpose**: Group related templates into a single packet that users complete together.

**Packet Use Cases:**

- New patient onboarding (intake forms, consent, insurance)
- Annual wellness packets (health assessment, screening forms)
- Procedure-specific documents (pre-op forms, consent, instructions)
- Provider credentialing (license, insurance, background check)

**Packet Configuration:**

1. **Packet Name**: Descriptive title
2. **Description**: Purpose and contents summary
3. **Template Selection**: Choose templates to include
4. **Template Order**: Arrange templates in completion sequence
5. **Completion Rule**:
   - All templates required
   - Some templates required, others optional
   - Conditional logic (show template B only if template A answered certain way)

**Packet Management:**

- Create new packets
- Edit existing packets
- Add/remove templates from packets
- Reorder templates within packet
- Assign packets to services
- Track packet completion rates

**Packet Assignment:**

- Assign to specific services
- Trigger on first appointment
- Trigger annually
- Trigger before certain service types
- Manual assignment by staff

##### Document Workflow Example

**New Patient Document Flow:**

1. **Admin Action**: Create "New Patient Packet"
2. **Packet Contents**:
   - Welcome & Instructions
   - Patient Consent Form
   - HIPAA Privacy Notice
   - Health History Questionnaire
   - Insurance Information Form
   - Emergency Contact Form
3. **Assignment**: Assign to all services
4. **Trigger**: First appointment booking
5. **Patient Experience**:
   - Books first appointment
   - Receives email: "Complete required documents"
   - Clicks link to document portal
   - Completes packet (30 minutes)
   - Submits packet
   - Documents available to provider before appointment
6. **Provider Benefits**:
   - Reviews completed documents before appointment
   - Has full patient history
   - Appointment time used for care, not paperwork

##### Best Practices

**Template Design:**

- Use clear, simple language
- Group related questions
- Make instructions prominent
- Minimize required fields (only truly necessary)
- Test with real users before deployment
- Provide examples or sample answers

**Version Control:**

- Date all template versions
- Maintain changelog
- Notify users when templates updated
- Require re-signature if significant changes

**Legal Compliance:**

- Consult legal counsel for consent forms
- Ensure HIPAA compliance for health information
- Meet state-specific telehealth requirements
- Electronic signature compliance (ESIGN Act)
- Accessibility compliance (ADA)

**User Experience:**

- Mobile-friendly templates
- Save progress capability
- Clear error messages
- Estimated completion time
- Progress indicator for packets

---

### 4. Visit Notes

Manage templates for provider documentation after patient encounters, primarily using SOAP format.

##### Overview

Visit Notes templates structure how providers document patient encounters. Standardized templates ensure consistent documentation, meet regulatory requirements, and improve care coordination.

##### Available Templates

The system includes SOAP (Subjective, Objective, Assessment, Plan) format templates, the gold standard for medical documentation:

| Template Name          | Status   | Description                         | Field Requirements  |
| ---------------------- | -------- | ----------------------------------- | ------------------- |
| SOAP (Deactivated)     | Inactive | Legacy SOAP template                | N/A (not in use)    |
| SOAP (Optional Fields) | Active   | SOAP with flexible field completion | Fields optional     |
| SOAP (Required Fields) | Active   | SOAP with mandatory fields          | All fields required |

##### SOAP Format Explained

**SOAP** is the standard structure for clinical documentation:

**S - Subjective:**

- Patient's description of symptoms in their own words
- Chief complaint
- History of present illness (HPI)
- Patient-reported symptoms and concerns
- Review of systems (ROS)
- Social history, family history
- Current medications and allergies

**O - Objective:**

- Provider's clinical observations
- Physical examination findings
- Vital signs (blood pressure, heart rate, temperature, etc.)
- Laboratory results
- Imaging findings
- Test results
- Observable clinical signs

**A - Assessment:**

- Provider's diagnosis or clinical impression
- Differential diagnoses considered
- ICD-10 diagnosis codes
- Clinical reasoning
- Problem list
- Risk assessment

**P - Plan:**

- Treatment plan and interventions
- Medications prescribed (with dosage, frequency, duration)
- Therapies recommended
- Follow-up appointments
- Patient education provided
- Referrals to specialists
- Goals of care
- Next steps

##### Template Features

**SOAP (Optional Fields):**

**Configuration:**

- All SOAP sections included
- Fields can be left blank if not applicable
- Flexible for varying encounter types
- Quicker documentation for simple visits

**Best For:**

- Follow-up appointments
- Simple encounters
- When certain sections don't apply
- Experienced providers who understand what to document

**Risks:**

- Potential for incomplete documentation
- Might miss important details
- Compliance issues if fields should have been completed

**SOAP (Required Fields):**

**Configuration:**

- All SOAP sections mandatory
- Cannot save note without completing all fields
- Ensures comprehensive documentation
- Longer documentation time

**Best For:**

- New patient visits
- Complex encounters
- Billing and coding accuracy
- Regulatory compliance
- Teaching environments
- Legal protection

**Benefits:**

- Complete documentation guaranteed
- Meets regulatory requirements
- Better continuity of care
- Improved billing accuracy
- Legal defensibility

##### Template Management

**Table Features:**

- **Name Column**: Sortable alphabetically
- **Status Column**: Sortable by active/inactive
- **Action Menu**: Three-dot icon per template

**Search Functionality:**

- Search templates by name
- Filter by status (Active/Inactive)
- Real-time filtering

**Actions Available:**

**1. Create Template:**

Build custom visit note templates:

**Template Builder Sections:**

- **Template Name**: Descriptive title (e.g., "Pediatric SOAP", "Cardiology Follow-up")
- **Template Type**: Choose format (SOAP, BIRP, DAP, etc.)
- **Field Configuration**:
  - Add custom fields
  - Set required vs optional
  - Field types: text, dropdown, checkbox, multi-select
  - Add prompts or examples
  - Set character limits
- **Section Management**:
  - Add/remove sections
  - Reorder sections
  - Collapse sections for complex templates
- **Specialty-Specific Fields**:
  - Add specialty-relevant documentation
  - Custom assessment criteria
  - Specialty-specific physical exam templates

**2. Edit Template:**

Modify existing templates:

- Update field requirements
- Add or remove sections
- Change field types
- Update prompts and examples
- Adjust conditional logic
- Modify validations

**3. Activate/Deactivate:**

Toggle template availability:

- **Activate**: Make available to providers
- **Deactivate**: Hide from provider selection (preserve existing notes)
- Smooth transitions when updating templates
- Allows A/B testing of templates
- Seasonal template management

**4. Duplicate Template:**

- Copy existing template as starting point
- Modify for different specialty or use case
- Maintains field configurations
- Speeds up template creation

**5. Preview Template:**

- See provider view before publishing
- Test required field validation
- Review flow and usability
- Mobile preview
- Print preview

**6. Delete Template:**

- Permanently remove template
- Requires confirmation
- Cannot delete if in use by active encounters
- Completed notes using template remain accessible

##### Visit Note Workflow

**Provider Documentation Process:**

1. **Complete Patient Encounter** (video call ends)
2. **Visit Note Button** appears in session details
3. **Select Template**:
   - SOAP (Required Fields) - for comprehensive documentation
   - SOAP (Optional Fields) - for simple updates
   - Custom specialty template
4. **Complete Sections**:
   - Fill in Subjective section
   - Document Objective findings
   - Record Assessment/diagnosis
   - Detail Plan of care
5. **Review for Completeness**
6. **Submit Visit Note**
7. **Note Status**:
   - Draft (in progress)
   - Complete (submitted)
   - Signed (electronically signed)
   - Locked (finalized, no edits)

**Note Timeline:**

- Save draft at any time
- Return to complete later
- Deadline for completion (e.g., 24-48 hours after encounter)
- Notifications if note incomplete
- Escalation to supervisor if overdue

##### Visit Note Addendums

**Adding to Completed Notes:**

- Cannot edit original note after signing
- Can add addendum with additional information
- Addendum includes:
  - Date and time of addendum
  - Provider name
  - Additional information or corrections
  - Reason for addendum
- Original note and addendums both visible
- Maintains audit trail

##### Best Practices

**Documentation Quality:**

- Document immediately after encounter (while fresh)
- Be specific and objective
- Use medical terminology appropriately
- Include relevant negative findings
- Document patient education provided
- Record patient understanding and agreement with plan

**Legal Considerations:**

- Document is legal record
- May be used in legal proceedings
- Write as if it will be read in court
- Never alter completed documentation
- Use addendums for corrections
- Be honest and accurate

**Efficiency Tips:**

- Use templates with common phrases
- Create macros for frequently used text
- Document during encounter when appropriate
- Use voice-to-text for efficiency
- Complete notes same day
- Review previous notes for continuity

**Template Selection:**

- Use required fields for complex encounters
- Optional fields for routine follow-ups
- Specialty templates for specialized care
- Ensure template matches encounter complexity

**Compliance:**

- Meet meaningful use requirements
- Satisfy insurance documentation needs
- Support accurate coding and billing
- Provide continuity for other providers
- Meet legal and regulatory standards

---

### 5. Data Reporting

Comprehensive analytics and reporting dashboard with seven distinct report types for institutional oversight and decision-making.

##### Overview

The Data Reporting section provides real-time and historical analytics across all aspects of your telehealth operations. Reports help track utilization, identify trends, monitor quality, and support data-driven decisions.

##### Dashboard View

Central analytics dashboard with key performance indicators (KPIs).

**Year to Date (YTD) Metrics:**

- **Total Encounters**
  - Count: All completed encounters since January 1
  - Includes: Video calls, chat appointments, completed sessions
  - Excludes: Cancelled, no-show, scheduled but not completed
  - Click for detailed breakdown

- **Average Length**
  - Calculation: Total minutes ÷ total encounters
  - Displayed in: Minutes and seconds (e.g., "15m 32s")
  - Breakdown: By service type, provider, appointment type
  - Trendline: Compare to previous periods

- **Total Participants**
  - Count: Unique participants across all encounters
  - Includes: Patients, providers, coordinators who joined sessions
  - Deduplication: Same person counted once per time period
  - Demographics: Age, location, role distribution

**Month to Date (MTD) Metrics:**

Same metrics as YTD but for current month only:

- Total Encounters (MTD)
- Average Length (MTD)
- Total Participants (MTD)

**Comparison Features:**

- YTD vs Prior Year comparison
- MTD vs Prior Month comparison
- Percentage change indicators
- Growth rate calculations

**Real-Time Metrics:**

- **Concurrent Usage**
  - Current number of active sessions RIGHT NOW
  - Live counter (updates every 30 seconds)
  - Breakdown by session type
  - Peak concurrent usage (daily, weekly, monthly records)
  - Capacity utilization percentage

**Visualizations:**

**Encounters per Month (Bar Chart):**

- **X-Axis**: Months (January through December)
- **Y-Axis**: Number of encounters
- **Bar Colors**:
  - Blue: Scheduled appointments
  - Green: On-demand encounters
  - Gray: Cancelled/No-show
- **Hover Details**: Exact counts, percentages
- **Year Selection**: Switch between years
- **Data Points**: Click bar for detailed month view

**Dashboard Actions:**

1. **Download Button**
   - Export dashboard data
   - Formats: PDF (visual report), CSV (raw data), Excel
   - Includes all visible metrics and charts
   - Date range and filters applied

2. **Refresh Button**
   - Update with latest data
   - Auto-refresh options: 30 sec, 1 min, 5 min
   - Last refresh timestamp shown

3. **Info Button**
   - Dashboard help documentation
   - Metric definitions
   - Chart interpretation guide
   - Report generation tips

##### Total Calls Report

Detailed call analytics with advanced filtering and trend visualization.

**Chart Visualization:**

**Line Chart Components:**

- **X-Axis**: Date ranges (weeks, months, quarters)
- **Y-Axis**: Call counts
- **Multiple Data Series**:
  1. **Calls Scheduled** (Blue Line)
     - All appointments scheduled in period
     - Includes completed and incomplete
  2. **Calls Occurred** (Green Line)
     - Appointments that actually happened
     - Both parties joined and call completed
  3. **Calls Did Not Occur** (Red Line)
     - No-shows, cancellations
     - Technical failures
     - Provider unavailable

**Chart Interactions:**

- Hover for exact counts
- Click data point for detailed view
- Zoom into specific date ranges
- Toggle series on/off
- Export chart as image

**Filter Options:**

**1. Time Period**

- Date range selector
- Quick options: Last 7 days, Last month, Last quarter, Last year, YTD
- Custom date range picker (start and end date)
- Applies to all report data and charts

**2. Reporting Period**

- **Week**: Data grouped by week
- **Month**: Data grouped by month
- **Year**: Data grouped by year
- Shows active selection count
- Affects chart granularity

**3. Reporting Level**

- **Institution**: System-wide data (if multi-institution)
- **Department**: Specific department
- **Provider**: Individual provider level
- **Service**: By service type
- Aggregation level for data display

**4. Institution**

- Multi-select dropdown
- Select one or more institutions
- Only visible if system supports multiple institutions
- "All Institutions" option

**5. Appointment Type**

- **Scheduled**: Pre-booked appointments
- **On-Demand**: "See provider now" encounters
- **Both**: All appointment types
- Multi-select capability

**6. Request Type**

- **Video**: Video call appointments
- **Chat**: Text-based appointments
- **Both**: All communication types
- Filter combination options

**7. Service**

- Multi-select dropdown
- Choose specific services
- Example: General Practice, Cardiology, Pediatrics
- "All Services" option
- Dynamically populated from Services configuration

**Active Filters Display:**

- **Filter Chips**: Each active filter shown as removable chip
- **Chip Format**: "Filter: Value" (e.g., "Service: Cardiology")
- **Remove Individual**: Click X on chip to remove that filter
- **Clear All Filters**: Single button to reset all filters
- **Filter Count**: "5 filters active"

**Report Actions:**

**1. Download**

- Export current report view
- Formats: PDF, CSV, Excel, JSON
- Includes applied filters in report header
- Chart images embedded in PDF
- Raw data in CSV/Excel

**2. Refresh**

- Update report with latest data
- Maintains current filters
- Loading indicator during refresh
- Timestamp of last refresh shown

**3. History** (ClockRewind Icon)

- View previously generated reports
- Report archive with dates
- Reapply previous filter sets
- Compare reports over time
- Download historical reports

**4. Save Filter Values**

- Save current filter configuration
- Give saved filter set a name
- Quick-load saved filters later
- Share filter sets with team
- Set default filters for role

**Data Insights:**

**Key Metrics to Monitor:**

- **Scheduled vs Occurred Gap**
  - Large gap indicates high no-show rate
  - Investigate cancellation reasons
  - Consider reminder improvements

- **Trend Analysis**
  - Growth or decline in total calls
  - Seasonal patterns
  - Day-of-week variations
  - Time-of-day peaks

- **Appointment Type Mix**
  - On-demand vs scheduled ratio
  - Shift toward on-demand may indicate patient preference
  - Scheduled growth shows patient engagement

- **Service Popularity**
  - Which services most utilized
  - Underutilized services (consider discontinuing or promoting)
  - Revenue per service type

**Use Cases:**

- **Monthly Board Reports**: YTD and MTD metrics
- **Operations Planning**: Peak time staffing
- **Quality Improvement**: Completion rate analysis
- **Financial Forecasting**: Call volume projections
- **Provider Performance**: Individual provider statistics
- **Marketing ROI**: Growth after marketing campaigns

##### Additional Report Types

**Total Encounters Report:**

- Detailed encounter analytics
- Duration analysis
- Participant breakdowns
- Outcome tracking
- Similar filtering to Total Calls
- (Full details to be documented)

**Total Appointments Report:**

- Appointment scheduling trends
- Lead time analysis (booking to appointment)
- Rescheduling frequency
- Cancellation patterns
- Provider schedule utilization
- (Full details to be documented)

**Concurrent Usage Report:**

- Real-time capacity monitoring
- Peak usage times identification
- Historical concurrent usage trends
- Capacity planning metrics
- Load balancing insights
- (Full details to be documented)

**Appointment Quality Report:**

- Patient satisfaction metrics
- Session completion rates
- Technical quality indicators
- Audio/video quality tracking
- Connection stability
- (Full details to be documented)

**Provider Quality Report:**

- Individual provider performance
- Patient feedback scores
- Visit note completion timeliness
- Average session duration by provider
- Specialty-specific metrics
- Continuing education tracking
- (Full details to be documented)

##### Reporting Best Practices

**Regular Review Schedule:**

- Daily: Concurrent usage, day's call volume
- Weekly: Total calls, appointment quality
- Monthly: All reports for trends and patterns
- Quarterly: Strategic review with leadership
- Annually: Year-over-year comparisons

**Data-Driven Decision Making:**

- Set measurable goals (e.g., 90% call completion rate)
- Monitor progress toward goals
- Identify root causes of issues
- Test interventions and measure impact
- Share insights with team

**Report Sharing:**

- Schedule automated report distribution
- Create role-specific report packages
- Present key findings in team meetings
- Dashboard displays in common areas
- Executive summaries for leadership

**Continuous Improvement:**

- Track intervention effectiveness
- A/B test process changes
- Document lessons learned
- Update reports as needs evolve
- Incorporate user feedback

---

## Profile Menu

The Profile Menu provides access to account settings, help resources, and logout functionality. Access the menu by clicking your avatar in the top-right corner of the screen.

### Accessing Profile Menu

**Profile Avatar:**

- Located in top-right corner of navigation bar
- Displays user initials (e.g., "CA" for Cody AdminOne)
- Click to open dropdown menu
- Colored background based on user theme

### Profile Menu Options

**1. User Information Card** (Non-clickable header)

- **Display Name**: Full name (e.g., "Cody AdminOne")
- **Email Address**: User's email (e.g., "chuls+admin1staging@globalmed.com")
- **Role Indicator**: Shows primary role(s)
- Purpose: Quick reference of current logged-in user

**2. Account Settings** (SettingsGear icon)

- Navigate to account configuration
- Manage profile and preferences
- Opens in slide-over panel
- See [Account Settings](#account-settings) section for full details

**3. Help** (InfoCircle icon)

- Access help documentation
- Tutorial videos
- FAQ section
- Contact support
- Platform updates and announcements

**4. Privacy Policy** (Policy icon)

- View current privacy policy
- Terms of service
- HIPAA compliance information
- Data handling practices
- Updates to policies highlighted

**5. Log Out** (LogOut icon)

- End current session
- Secure logout from all devices option
- Returns to login screen
- Session token invalidated
- Auto-logout after confirmation

### Profile Menu Behavior

**Click Outside to Close:**

- Menu closes when clicking anywhere outside
- Escape key also closes menu
- Navigation maintains current page

**Keyboard Navigation:**

- Tab through menu items
- Enter to select
- Up/Down arrows to navigate
- Accessible for screen readers

---

## Account Settings

Comprehensive account configuration accessible from the Profile Menu. Admin role has full access to profile management and notification preferences.

### Account Settings Interface

**Access:** Profile Menu → Account Settings

**Layout:**

- Slide-over panel from right side
- Tabbed navigation at top
- Close button (X) in top-right
- Auto-saves changes (with confirmation)

**Available Tabs:**

- **My Account**: Profile and personal settings
- **Notifications**: Communication preferences

_Note: Admin role does not have Calendar tab (Provider-specific feature)_

---

### My Account Tab

Manage your profile information, appearance, language, and timezone preferences.

#### Page Header

**Title:** "My account"  
**Subtitle:** "Update and manage your account"

#### Profile Photo Section

**Current Photo Display:**

- Circular avatar with initials if no photo uploaded
- Shows custom photo if uploaded
- Size: Large display (120x120px)

**Photo Actions:**

**1. Upload Photo** (Download icon button)

- Supported formats: JPG, PNG, GIF
- Maximum file size: 10 MB
- Recommended: Square image, at least 300x300px
- Click to open file browser
- Instant preview after selection
- Auto-cropping tool provided
- Option to zoom and reposition

**2. Delete Photo** (Trash icon button)

- Removes current uploaded photo
- Reverts to initials display
- Confirmation dialog: "Are you sure?"
- Cannot undo deletion
- Previous photo not recoverable

**Photo Guidelines:**

- Use professional photo
- Good lighting and clear face
- No inappropriate content
- Visible to: Other providers, coordinators, patients (context-dependent)

#### Profile Details Section

**Section Header:** "Profile details"  
**Edit Button:** Opens edit modal

**Displayed Information:**

**1. First Name**

- Display: Current first name
- Examples: "Cody", "John", "Sarah"
- Edit: Text input in edit modal
- Validation: Required, 1-50 characters

**2. Last Name**

- Display: Current last name
- Examples: "AdminOne", "Smith", "Johnson"
- Edit: Text input in edit modal
- Validation: Required, 1-50 characters

**3. Languages Spoken**

- Display: Selected languages (e.g., "English", "English, Spanish")
- Edit: Multi-select dropdown
- Available: All supported platform languages
- Used for: Patient-provider matching
- Can select multiple

**4. Country**

- Display: Current country or "N/A"
- Edit: Searchable dropdown
- All countries available
- Used for: Timezone, compliance
- Can be left blank

**5. State**

- Display: Current state/province or "N/A"
- Edit: Dropdown (populated based on country)
- US states, Canadian provinces, etc.
- Used for: Licensing compliance
- Required if country selected

**6. Phone Number**

- Display: Phone number with country code or "N/A"
- Format: (+1) 555-123-4567
- Edit: Phone input with country code selector
- Validation: Valid phone format
- Used for: Account recovery, notifications

**Edit Profile Modal:**

**Opening the Modal:**

- Click "Edit" button in Profile Details section
- Modal slides in from right
- Dims background
- Focus locks to modal

**Modal Contents:**

- All profile fields listed above
- Each field individually editable
- Real-time validation
- Error messages below invalid fields
- Character counts for limited fields

**Saving Changes:**

- **Save Button**: Validates and saves all changes
- **Cancel Button**: Discards all changes
- **X Close**: Same as cancel
- Success notification: "Profile updated successfully"
- Changes reflected immediately

**Validation Rules:**

- First name and last name required
- Valid phone format if provided
- State required if country provided
- Languages: at least one required

#### Application Language Section

**Section Header:** "Application language"

**Current Language Display:**

- Language flag icon
- Language name (e.g., "English")
- Visual indicator of active language

**Change Language Link:**

- Opens language selector modal
- Options:
  - English (US)
  - Spanish (ES)
  - Additional languages based on institution
- Select new language
- Confirmation: "Language changed successfully"
- UI updates immediately
- Persists across sessions
- Affects: All UI elements, emails, notifications

**Language Change Impact:**

- Navigation labels
- Button text
- Form labels
- Help documentation
- Email notifications
- SMS messages

#### Time Zone Section

**Section Header:** "Time zone"

**Current Timezone Display:**

- Format: "(GMT-07:00) Mountain Standard Time - Phoenix - 08:13 PM"
- Components:
  - GMT offset
  - Timezone name
  - City/region
  - Current time in that timezone

**Change Time Zone Link:**

- Opens timezone selector modal
- Searchable dropdown
- Organized by:
  - Common timezones (top)
  - All timezones (alphabetical)
  - By region/continent
- Search by: City name, timezone abbreviation, GMT offset

**Timezone Selection:**

- Click preferred timezone
- Confirms change
- Updates: All timestamps, scheduling, appointment times
- Success message: "Time zone updated"
- Affects: Dashboard times, appointment scheduling, reports

**Important Notes:**

- Appointment times display in YOUR timezone
- Provider times automatically converted
- Scheduling respects provider availability in their timezone
- Reports use selected timezone

#### Account Section

**Section Header:** "Account"

**Delete Account Option:**

- Text link: "Delete account"
- Red warning color
- Opens confirmation modal

**Delete Account Modal:**

- **Warning**: "This action cannot be undone"
- **Impact Statement**:
  - All your data will be permanently deleted
  - Active appointments will be cancelled
  - Patients will be notified
  - Cannot recover account
- **Confirmation Required**: Type "DELETE" to confirm
- **Final Confirmation Button**: "Yes, delete my account"
- **Support Link**: "Contact support instead"

**Post-Deletion:**

- Immediate logout
- Email confirmation sent
- Data retention per institution policy (typically 30 days for recovery period)
- Legal/compliance documentation preserved per regulations

---

### Notifications Tab

Manage how and when you receive communications from the eNow2 platform.

#### Page Header

**Title:** "Notifications"  
**Subtitle:** "Manage your notification preferences"

#### Notification Methods Section

**Section Header:** "Notification methods"

Configure delivery channels for receiving notifications:

**1. Email Notifications**

**Display:**

- Label: "Email"
- Shows: Current email address
- Example: "chuls+admin1staging@globalmed.com"

**Toggle Control:**

- Checkbox or toggle switch
- **Enabled** (checked): Receive notification emails
- **Disabled** (unchecked): No notification emails
- Changes save automatically

**Email Types:**

- Appointment confirmations and reminders
- Appointment cancellations
- System announcements
- Security alerts
- Weekly summaries
- Report availability

**2. SMS Notifications**

**Display:**

- Label: "SMS"
- Shows: Phone number if configured, or "Add phone number" link

**Configuration:**

- **If No Phone**: Click "Add phone number" link
  - Opens phone input modal
  - Enter phone with country code
  - Verification code sent via SMS
  - Enter code to confirm
  - Phone saved to profile

- **If Phone Configured**: Toggle checkbox enabled
  - **Enabled**: Receive SMS notifications
  - **Disabled**: No SMS (checkbox active)

**SMS Types:**

- Appointment reminders (24hr, 1hr before)
- Urgent notifications
- Security alerts
- Appointment status changes

**SMS Considerations:**

- Standard SMS rates may apply
- Carrier-dependent delivery
- Opt-out: Reply STOP to any message
- Opt back in: Reply START

**3. In-App Notifications**

**Display:**

- Label: "In-app"
- No secondary text needed

**Toggle Control:**

- Checkbox or toggle switch
- **Enabled** (checked): See in-app notifications
- **Disabled** (unchecked): No in-app notifications

**In-App Delivery:**

- Bell icon in top navigation
- Red badge with unread count
- Notification panel slide-out
- Real-time updates (no page refresh)
- Desktop browser notifications (if browser permissions granted)

**In-App Notification Types:**

- New messages
- Appointment updates
- System alerts
- User actions requiring attention
- Report completions

#### Session Reminders Section

**Section Header:** "Session reminders"  
**Subtitle:** "Set the time you'd like to be reminded before the session starts."

**Current Reminder Display:**

- **Label**: "Remind me"
- **Current Setting**: "5 minutes before the session"
- Display format: "X minutes before the session"

**Change Reminder Link:**

- Opens reminder configuration modal
- Pre-populated with current setting

**Reminder Options:**

- 5 minutes before
- 10 minutes before
- 15 minutes before
- 30 minutes before
- 1 hour before
- 2 hours before
- 24 hours before (day-before reminder)
- Custom: Enter specific number of minutes

**Multiple Reminders:**

- Click "Add reminder" button
- Configure additional reminder times
- Example: 24 hours before AND 15 minutes before
- Each reminder independently configurable
- Can delete individual reminders
- Reorder reminder priority

**Add Reminder Button:**

- Located below current reminders
- Opens same configuration modal
- Can add unlimited reminders
- Each reminder has:
  - Time offset (minutes/hours/days)
  - Delivery method (email/SMS/in-app or all)
  - Enable/disable toggle

**Reminder Delivery:**

- Sent via ALL enabled notification methods (email, SMS, in-app)
- Cannot be missed if multiple methods enabled
- Contains:
  - Appointment date and time
  - Patient/provider name
  - Service type
  - Join link
  - Preparation instructions (if any)

**Smart Reminders:**

- Only sent for confirmed appointments
- Not sent if appointment already completed
- Not sent if appointment cancelled
- Timezone-aware (uses your timezone setting)

#### Notification Testing

**Test Notifications Button:**

- Located at bottom of Notifications tab
- Sends test notification to verify setup
- Delivered via all enabled methods
- Confirms: Email delivery, SMS delivery, in-app display
- Test message clearly labeled: "This is a test notification"

#### Notification Best Practices

**Recommended Settings:**

**For Admins:**

- **Email**: Enabled (for non-urgent communications)
- **SMS**: Enabled (for urgent alerts)
- **In-App**: Enabled (for real-time updates)
- **Session Reminders**: 24 hours and 15 minutes before

**Managing Notification Volume:**

- Enable in-app for frequent updates
- Use email for daily summaries
- Reserve SMS for truly urgent only
- Regular review and adjustment of preferences

**Response Times:**

- Email: Delivered within 5 minutes
- SMS: Delivered within 1-2 minutes
- In-App: Real-time (instant)

**Troubleshooting:**

- **Not receiving emails**: Check spam folder, verify email address
- **Not receiving SMS**: Verify phone number, check carrier settings
- **In-app not showing**: Check browser notification permissions
- **Too many notifications**: Adjust reminder frequency, consolidate where possible

---

## Common Workflows

Step-by-step processes for common administrative tasks.

### 1. Inviting a New User

**Purpose:** Add a new user (provider, patient, coordinator) to the system

**Steps:**

1. **Navigate to Users Page**
   - Click "Users" from left navigation
   - Users table loads

2. **Initiate Invitation**
   - Click "Invite users" button (top right)
   - Invitation modal opens

3. **Enter User Information**
   - **Email**: Enter user's email address (required)
   - **Role Selection**: Choose one or more roles
     - Admin
     - Provider
     - Patient
     - Coordinator
     - Combined roles available
   - **Institution**: Select if multi-institution setup
   - **Custom Message**: Optional welcome message

4. **Configure Role-Specific Settings**
   - **If Provider**: Select specialties, services
   - **If Admin**: Set permissions level
   - **If Coordinator**: Assign territories or areas

5. **Send Invitation**
   - Click "Send Invitation" button
   - System generates secure invitation link
   - Email sent to user immediately

6. **User Receives Invitation**
   - Email with subject: "You're invited to join [Institution Name]"
   - Contains: Welcome message, invitation link, expiration date (typically 7 days)

7. **User Completes Registration**
   - User clicks link in email
   - Directed to registration page
   - Sets password
   - Completes profile information
   - Accepts EULA if required
   - Account activated

8. **Admin Confirmation**
   - Admin receives notification: "New user registered"
   - User appears in Users table with "Active" status
   - Admin can now assign additional roles or configure user settings

**Post-Invitation Actions:**

- Track invitation status (Sent, Viewed, Completed, Expired)
- Resend invitation if expired
- Revoke invitation if sent in error

---

### 2. Creating a Device ID

**Purpose:** Generate a device ID for a shared kiosk or tablet

**Steps:**

1. **Navigate to Users Page**
   - Click "Users" from left navigation

2. **Click "Create Device ID"**
   - Button located next to "Invite users"
   - Device ID creation modal opens

3. **Configure Device Settings**
   - **Device Name**: Descriptive name (e.g., "Lobby Kiosk", "Exam Room 3 Tablet")
   - **Location**: Physical location description
   - **Institution**: Select associated institution
   - **Permissions** (optional):
     - Restrict to certain services
     - Limit appointment types
     - Set operating hours

4. **Generate Device ID**
   - Click "Generate Device ID" button
   - System creates unique numeric ID (e.g., "33333", "11111")
   - ID displayed prominently

5. **Copy Access Information**
   - **Device ID**: Copy numeric ID
   - **Device ID Access Link**: Copy full URL
     - Format: `https://portal.qa-encounterservices.com/login/device`

6. **Document Device Information**
   - Record device ID in your documentation
   - Print setup instructions
   - Create laminated card with ID for device location

7. **Configure Physical Device**
   - Open browser on device
   - Bookmark Device ID Access Link
   - Set as homepage (recommended)
   - Test login with generated device ID
   - Configure auto-refresh if needed
   - Disable browser navigation controls (kiosk mode)

8. **Test Device Functionality**
   - Login with device ID
   - Verify dashboard displays correctly
   - Test joining a session
   - Check camera/microphone permissions
   - Ensure proper timeout/logout behavior

9. **Deploy Device**
   - Place in intended location
   - Train staff on device usage
   - Create quick reference guide
   - Schedule regular checks

**Device Management:**

- Track device usage in reports
- Monitor for inactivity
- Update device ID if compromised
- Deactivate if device removed

---

### 3. Configuring Waiting Room

**Purpose:** Enable and configure virtual waiting room for appointments

**Steps:**

1. **Navigate to Institution Settings**
   - Click "Institution Settings" from left navigation
   - Multiple tabs appear

2. **Select Configuration Tab**
   - Click "Configuration" tab
   - Scroll to "Waiting Room Feature" section

3. **Enable Waiting Room**
   - Toggle "Waiting Room Option" to ON
   - Green enabled indicator appears

4. **Configure Timer Threshold**
   - Find "Number of minutes before timer turns red"
   - Current default: 5 minutes
   - Click to edit
   - Enter desired number (1-30 minutes recommended)
   - **Purpose**: Alerts coordinators/providers when patient waiting too long

5. **Save Changes**
   - Click "Save changes" button at bottom of page
   - Confirmation message: "Configuration updated successfully"

6. **Communicate Changes**
   - Notify all providers of waiting room implementation
   - Train coordinators on monitoring waiting rooms
   - Update patient communication materials

7. **Test Waiting Room**
   - Schedule test appointment
   - Join as patient before scheduled time
   - Verify waiting room displays correctly
   - Test provider side (joining from waiting room)
   - Confirm timer functionality

8. **Monitor Usage**
   - Review waiting room reports
   - Track average wait times
   - Identify bottlenecks
   - Adjust timer threshold if needed

**Ongoing Management:**

- Monitor patient feedback on wait times
- Review provider punctuality
- Adjust threshold seasonally if appointment patterns change
- Consider disabling for certain services (if immediate access preferred)

---

### 4. Creating Document Templates

**Purpose:** Build custom forms for patients or providers to complete

**Steps:**

1. **Navigate to Document Management**
   - Click "Document Management" from left navigation
   - Templates tab selected by default

2. **Click "Create Template"**
   - Button in top right
   - Template builder opens

3. **Configure Basic Template Information**
   - **Template Name**: Descriptive title (e.g., "New Patient Intake Form")
   - **Description**: Purpose and contents (optional but recommended)
   - **Template Type**: Select from dropdown
     - Patient-type (completed by patients)
     - Provider-type (completed by providers)
     - Admin-type (internal use)
   - **Language**: English, Spanish, or Multiple

4. **Design Template Content**
   - **Text Editor**: Rich text for instructions and content
     - Format text (bold, italic, underline)
     - Add headings
     - Insert lists
     - Add images/logos
5. **Add Form Fields**
   - Click "Add Field" button
   - Select field type:
     - **Text Input**: Single-line text entry
     - **Text Area**: Multi-line text entry
     - **Dropdown**: Select from options
     - **Radio Buttons**: Choose one option
     - **Checkboxes**: Select multiple options
     - **Date Picker**: Select date
     - **Signature**: Electronic signature capture
     - **File Upload**: Attach documents
6. **Configure Each Field**
   - **Field Label**: Question or prompt
   - **Help Text**: Additional guidance (optional)
   - **Required**: Toggle if field is mandatory
   - **Default Value**: Pre-populated value (optional)
   - **Validation**: Set rules (e.g., email format, number range)
   - **Conditional Logic**: Show field only if previous answer meets criteria

7. **Organize Field Layout**
   - Drag and drop to reorder fields
   - Group related fields in sections
   - Add section headers
   - Create multi-column layouts

8. **Set Template Configuration**
   - **Require Completion Before Appointment**: Toggle on/off
   - **Allow Editing After Submission**: Toggle
   - **Expiration**:
     - Does not expire
     - Expires after X days
     - Must be renewed annually
   - **Signature Required**: Toggle
   - **Document Visibility**:
     - Who can view completed documents (providers, admins, patient)

9. **Preview Template**
   - Click "Preview" button
   - See patient/provider view
   - Test field validation
   - Check mobile responsiveness
   - Make adjustments as needed

10. **Publish Template**
    - Click "Save and Activate" button
    - Set template status to "Active"
    - Confirmation: "Template created successfully"

11. **Assign Template to Services**
    - Navigate to Institution Settings > Services
    - Select service(s) that should use this template
    - Add template to service configuration
    - Set when template is required (before first appointment, annually, etc.)

12. **Test Template Flow**
    - Book test appointment requiring this template
    - Complete template as patient would
    - Verify submission and storage
    - Check provider can view completed template

**Template Maintenance:**

- Review annually
- Update based on regulatory changes
- Version control: Date major changes
- Archive old versions
- Monitor completion rates and completion times

---

### 5. Viewing Institution Analytics

**Purpose:** Review performance metrics and generate reports

**Steps:**

1. **Navigate to Data Reporting**
   - Click "Data Reporting" from left navigation
   - Dashboard view loads by default

2. **Review Dashboard KPIs**
   - **Year to Date Metrics**:
     - Total Encounters
     - Average Length
     - Total Participants
   - **Month to Date Metrics**: Same metrics, current month
   - **Concurrent Usage**: Real-time active sessions

3. **Analyze Encounters per Month Chart**
   - Review bar chart showing monthly trends
   - Identify growth or decline patterns
   - Note seasonal variations
   - Hover over bars for exact counts

4. **Generate Detailed Reports**
   - Select report type from navigation:
     - **Total Calls**: Scheduled vs occurred analysis
     - **Total Encounters**: Detailed encounter data
     - **Total Appointments**: Scheduling patterns
     - **Provider Quality**: Individual performance
     - Others as needed

5. **Apply Filters (Total Calls Example)**
   - **Time Period**: Select date range
   - **Reporting Period**: Choose Week, Month, or Year
   - **Institution**: Select if applicable
   - **Appointment Type**: Scheduled, On-Demand, or Both
   - **Request Type**: Video, Chat, or Both
   - **Service**: Select specific services
   - Filters apply immediately

6. **Review Report Data**
   - Study line charts showing trends
   - Compare scheduled vs occurred calls
   - Identify patterns:
     - High no-show rates (large gap between scheduled and occurred)
     - Peak usage times
     - Service utilization
     - Provider load distribution

7. **Export Report Data**
   - Click "Download" button
   - Select format:
     - **PDF**: Visual report with charts (for presentations)
     - **CSV**: Raw data (for further analysis)
     - **Excel**: Formatted data with charts (for reports)
   - File downloads immediately
   - Filename includes date range and timestamp

8. **Save Filter Configuration**
   - Click "Save Filter Values" button
   - Name your filter set (e.g., "Monthly Board Report")
   - Filter set saved for quick reuse
   - Share filter set with team members (if permissions allow)

9. **Access Report History**
   - Click "History" (ClockRewind icon)
   - View previously generated reports
   - Rerun historical reports
   - Compare current vs previous periods

10. **Set Up Scheduled Reports** (if available)
    - Configure automatic report generation
    - Select frequency (daily, weekly, monthly)
    - Choose recipients (email distribution)
    - Reports generated and emailed automatically

**Analytics Best Practices:**

- Review dashboard daily for real-time monitoring
- Generate detailed reports weekly for operations
- Create comprehensive reports monthly for management
- Compare quarter-over-quarter for strategic planning
- Share insights with relevant stakeholders
- Set up alerts for metrics outside normal ranges

---

## Best Practices

Guidelines for effective administrative management of the eNow2 platform.

### User Management

**Onboarding:**

- Send invitations promptly upon hiring
- Provide training before first shift
- Assign mentor or buddy for questions
- Schedule check-in after first week
- Collect feedback on onboarding process

**Access Control:**

- Follow principle of least privilege (minimum access needed)
- Regular access reviews (quarterly)
- Immediate deactivation upon termination
- Audit login activity for unusual patterns
- Enforce strong password policies

**Role Assignment:**

- Match roles to job responsibilities precisely
- Document role assignment decisions
- Review role appropriateness annually
- Support combined roles when appropriate
- Restrict device IDs to specific locations

### Configuration Management

**Institution Settings:**

- Backup configuration before major changes
- Test changes in non-production if available
- Document all configuration decisions
- Communicate changes to affected users
- Roll out changes during off-peak hours

**Waiting Room & Dispatcher:**

- Monitor timer thresholds, adjust as needed
- Track utilization rates
- Gather provider feedback
- Consider patient satisfaction surveys
- Balance convenience vs resource utilization

**Services Configuration:**

- Regularly review service offerings
- Discontinue underutilized services (after analysis)
- Update fees to reflect costs
- Keep descriptions current and accurate
- Ensure provider assignments are up-to-date

### Document Templates

**Template Design:**

- Keep forms as short as possible
- Use plain language, avoid jargon
- Group related questions
- Provide examples for complex fields
- Test with real users before deployment

**Template Maintenance:**

- Review annually at minimum
- Update immediately if regulations change
- Track completion rates
- Monitor completion times (optimize if too long)
- Version control all changes

**Legal & Compliance:**

- Legal review of consent forms
- HIPAA compliance for health information
- State-specific telehealth requirements
- Electronic signature compliance
- Accessibility compliance (ADA)

### Reporting & Analytics

**Regular Monitoring:**

- Daily: Concurrent usage, day's volume
- Weekly: Call completion rates, quality metrics
- Monthly: All KPIs, trend analysis
- Quarterly: Strategic review with leadership
- Annually: Year-over-year comparisons

**Data-Driven Decisions:**

- Set measurable goals
- Monitor progress consistently
- Investigate anomalies promptly
- Test interventions, measure impact
- Document lessons learned

**Report Distribution:**

- Right report to right audience
- Executive summaries for leadership
- Detailed reports for operations
- Trend reports for strategic planning
- Setup automated report delivery

### Security & Compliance

**Data Protection:**

- Enable two-factor authentication (if available)
- Regular password changes enforced
- Encrypt sensitive data
- Secure backups
- Incident response plan documented

**HIPAA Compliance:**

- Business Associate Agreements (BAAs) in place
- Staff HIPAA training (annual minimum)
- Access logs reviewed regularly
- Breach notification procedures established
- Patient rights respected (access, amendments, restrictions)

**Audit Trails:**

- Enable comprehensive logging
- Regular audit log review
- Investigate unusual activity
- Maintain logs per retention policy
- Logs secure and tamper-proof

### Communication

**Provider Communication:**

- Regular platform updates (newsletter, meetings)
- Advance notice of changes
- Clear documentation available
- Responsive support
- Feedback channels open

**Patient Communication:**

- Clear platform instructions
- Multiple communication channels (email, SMS, phone)
- Translated materials for non-English speakers
- Accessibility accommodations
- Prompt response to questions

**Internal Communication:**

- Document decisions and rationale
- Knowledge base for common issues
- Regular admin team meetings
- Share best practices across departments
- Celebrate wins and learn from challenges

### Continuous Improvement

**Feedback Collection:**

- Provider satisfaction surveys
- Patient satisfaction surveys
- Staff usability feedback
- Support ticket analysis
- Feature request tracking

**Process Optimization:**

- Regular workflow reviews
- Identify bottlenecks
- Automate repetitive tasks
- Streamline approvals
- Reduce clicks/steps where possible

**Training & Development:**

- Initial comprehensive training
- Ongoing education on new features
- Advanced training for power users
- Cross-training for coverage
- Knowledge sharing sessions

### Disaster Recovery

**Business Continuity:**

- Backup admin credentials (secure location)
- Documented procedures for critical tasks
- Cross-trained staff for key functions
- Contact list for emergencies
- Alternative communication methods

**System Issues:**

- Know how to contact platform support
- Document workaround procedures
- Maintain communication with users during outages
- Post-mortem after incidents
- Update procedures based on lessons learned

---

**End of Admin Role Documentation**

For questions or additional support, contact your platform administrator or eNow2 support team.
