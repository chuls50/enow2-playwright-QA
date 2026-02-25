# Provider Role - User Guide

**Role:** Healthcare Provider  
**Last Updated:** February 24, 2026  
**Application URL:** https://portal.qa-encounterservices.com

[← Back to Role Index](./README.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Navigation Menu](#navigation-menu)
3. [Dashboard](#dashboard)
4. [Past Sessions](#past-sessions)
5. [Providers Directory](#providers-directory)
6. [My Patients](#my-patients)
7. [Profile Menu](#profile-menu)
8. [Account Settings](#account-settings)
9. [Provider Workflows](#provider-workflows)
10. [Best Practices](#best-practices)

---

## Overview

Providers are healthcare professionals who deliver care to patients through video consultations, manage their schedule, and document patient encounters. The Provider role has access to patient management tools, scheduling capabilities, provider collaboration features, and unique calendar management for setting availability.

### Key Capabilities

- Schedule and conduct video consultations
- Respond to on-demand patient requests
- Manage patient roster
- Collaborate with other providers
- Access past session history and documentation
- Configure working hours and availability (**Calendar feature unique to Providers**)
- Document patient encounters

---

## Navigation Menu

The Provider role has the following left-side navigation menu:

### 1. Dashboard

Main landing page with daily schedule and appointment requests

### 2. Past Sessions

Historical record of all completed patient encounters

### 3. Providers

Directory of healthcare providers and coordinators

### 4. My Patients

Provider's patient roster for easy access and scheduling

---

## Dashboard

The provider's main landing page showing daily schedule and requests.

### Your Schedule for Today

**Schedule Display:**

- Current date display (e.g., "Feb, 24th")
- Number of sessions scheduled ("0 sessions", "3 sessions", etc.)
- Expandable dropdown (ChevronDown icon) to view details
- Interactive calendar dialog for date selection

**Quick Actions:**

- **"Schedule session" button** (CalendarPlus icon)
  - Opens appointment booking workflow
  - Can schedule for patients in your roster
  - Select date, time, and service type

**Empty State:**

- Checkmark icon with message
- "You currently have no upcoming sessions for today"
- Encourages adding sessions via Schedule button

### Date Selection Dialog

**Interactive Calendar:**

- Month/Year dropdowns for navigation
- Previous/Next month arrows
- Days of week header (Mo, Tu, We, Th, Fr, Sa, Su)
- Full month view with clickable dates
- "Today" quick-jump button
- Shows dates across month boundaries
- Selected date highlighted

### Scheduled Requests Section

**Request Panel:**

- **Calendar icon** with "Scheduled requests" heading
- Shows incoming appointment requests
- Empty state: "No incoming requests"

**Navigation:**

- "All requests" link with arrow icon
- Previous/Next chevron buttons
- Navigate between pending requests
- Disabled state when no requests available

### Top Bar Features

**On Demand Requests Button:**

- OnDemand icon with text label
- View and respond to immediate consultation requests
- Badge indicator for pending urgent requests
- Opens modal with request details

**Notifications Bell:**

- Icon in top right
- Badge count for unread notifications
- Click to open notification panel

**Profile Menu:**

- Avatar with user initials (e.g., "CP" for Cody ProviderOne)
- Click to open profile dropdown menu
- Access account settings, help, and logout

---

## Past Sessions

Historical record of all completed patient encounters with searchable and sortable table.

### Search Functionality

**Search Bar:**

- Placeholder: "Start typing patient name"
- Real-time search filtering
- Searches across patient names
- Search icon indicator

### Session Table

**Sortable Columns:**

1. **Date** (ChevronSelectorVertical for sorting)
   - Format: MM/DD/YYYY (e.g., "02/17/2026")
   - Click header to sort ascending/descending

2. **Patient**
   - Patient's full name
   - Links to patient profile

3. **Type**
   - "Video" for video consultations
   - "Chat" for text-based sessions

4. **Actual Duration**
   - Displayed in minutes (e.g., "0m", "15m", "30m")
   - "0m" indicates quick check-ins or incomplete sessions

5. **Institution**
   - Facility or organization name
   - Shows "Globalmed Staging for QA" in QA environment

6. **Service**
   - Type of care provided
   - Examples: "General Practice", "Cardiology", "Dermatology"

7. **Session ID**
   - Unique identifier with # prefix
   - Format: #XXXXXXX (e.g., "#RR60M7D", "#VHI7YOZ")
   - Use for support inquiries or record lookup

8. **Session Type**
   - Calendar icon for scheduled appointments
   - Lightning icon for on-demand sessions

**Actions Column:**

- **"View details" link** on each row
  - Opens detailed session view
  - Access to session timeline
  - View participant information
  - Review session notes and documentation
  - Access recording links (if available)

### Session Details View

When clicking "View details", providers can access:

- Complete session timeline with timestamps
- Participant information (patient and provider details)
- Session notes and clinical documentation
- SOAP notes if completed
- Attached files or images
- Recording playback (if recorded and available)
- Prescription information
- Follow-up recommendations

---

## Providers Directory

Comprehensive directory of all healthcare providers and coordinators in the institution for collaboration and consultation.

### Search & Filter Panel

**Search Bar:**

- Placeholder: "Search by name, email"
- Real-time filtering
- Searches provider names and email addresses

**Filter Options:**

1. **User Type** (dropdown)
   - Provider
   - Coordinator
   - Admin
   - Multiple selections allowed

2. **Specialty** (dropdown)
   - General Practitioner
   - Allergologist
   - Angiologist
   - Cardiologist
   - Dermatologist
   - And more...
   - Multiple selections allowed

3. **Spoken Languages** (dropdown)
   - English (en)
   - Spanish (es)
   - And more...
   - Multiple selections allowed

4. **Status** (dropdown)
   - Online
   - Offline
   - Available
   - Busy

**Clear Filters Button:**

- Resets all filter selections
- Returns to full provider list

### Provider Table

**Columns:**

1. **Name**
   - Avatar icon with initials if no photo
   - Full name display
   - Sortable by clicking column header

2. **User Type**
   - Role designation (e.g., "Provider", "Coordinator")
   - Sortable

3. **Specialty**
   - Medical specialties (can show multiple)
   - Comma-separated if multiple specialties
   - Example: "Allergologist, Angiologist"

4. **Email**
   - Full email address
   - Sortable

5. **Spoken Languages**
   - Flag icons representing languages
   - Example: 🇬🇧 (en), 🇪🇸 (es)
   - Visual language indicators

6. **Status**
   - Current availability indicator
   - **Offline** (gray badge)
   - **Online** (green badge)
   - **Available** (green with checkmark)
   - **Busy** (red badge)
   - Real-time status updates

7. **Actions**
   - **Messages icon**: Initiate text chat with provider
   - **Video icon**: Start immediate video call with provider
   - Both icons always visible for quick access

### Use Cases

**Provider Collaboration:**

- Consult with specialists about patient cases
- Coordinate care with other providers
- Seek second opinions
- Refer patients to appropriate specialists

**Finding Providers:**

- Search by specialty for referrals
- Find providers who speak specific languages
- Check provider availability before contact
- View provider contact information

**Quick Communication:**

- Send messages for non-urgent coordination
- Initiate video calls for urgent consultations
- Collaborate on complex patient cases
- Share patient information securely

---

## My Patients

Provider's patient roster for easy access, quick scheduling, and patient management.

### Search Functionality

**Search Bar:**

- Placeholder: "Search by name, email or phone number"
- Real-time search filtering
- Searches across multiple fields simultaneously
- Supports partial matches

### Patient Table

**Sortable Columns:**

1. **Name** (ChevronSelectorVertical)
   - Avatar with initials if no photo uploaded
   - Full patient name
   - Click to sort alphabetically

2. **Email** (ChevronSelectorVertical)
   - Patient's email address
   - Shows actual email or N/A if not provided

3. **Phone** (ChevronSelectorVertical)
   - Full phone number with country code
   - Format: (+1) XXXXXXXXXX
   - Shows "N/A" if not provided

4. **Actions**
   - **Calendar icon** (CalendarPlus)
   - Click to schedule appointment with patient

### Quick Scheduling

**Calendar Icon Action:**

1. Click calendar icon next to patient name
2. Opens scheduling modal
3. Patient information pre-filled
4. Select appointment details:
   - Date and time
   - Service type
   - Duration
   - Special requirements
5. Send invitation to patient

### Pagination

**Navigation Controls:**

- **Previous button** (ArrowNarrowLeft icon)
  - Disabled on first page
  - Navigate to previous page of results
- **Page number indicator**
  - Shows current page (e.g., "1", "2", "3")
  - Click specific page number to jump
- **Next button** (ArrowNarrowRight icon)
  - Disabled on last page
  - Navigate to next page of results

**Patient Display:**

- Multiple patients per page
- Scroll if list extends beyond viewport
- Consistent row height for easy scanning

### Patient Information Display

**Avatar:**

- Profile picture if uploaded
- Initials in colored circle if no photo
- Consistent sizing across all rows

**Contact Information:**

- Email and phone prominently displayed
- "N/A" shown for missing data fields
- Formatted for easy reading

---

## Profile Menu

Located in the top-right corner of the screen, the profile menu provides access to account management and system information.

### Accessing Profile Menu

**Profile Avatar:**

- Displays user initials (e.g., "CP" for Cody ProviderOne)
- Colored circle background
- Located next to notification bell
- Click to open dropdown menu

**Locator for Automation:**

```javascript
await page.locator("._shadow_pdxdk_73").click();
```

### Profile Menu Options

When opened, the profile menu displays:

#### 1. User Information Card (Non-clickable)

- **Full Name**: Provider's complete name
- **Email Address**: Account email
- Visual identification at top of menu

#### 2. Account Settings (SettingsGear icon)

- Opens Account Settings modal
- Manage profile, calendar, and notifications
- Primary configuration interface

#### 3. Help (InfoCircle icon)

- Access help documentation
- User guides and tutorials
- FAQ and support resources
- Contact support information

#### 4. Privacy Policy (Policy icon)

- View complete privacy policy
- Terms of service
- Data handling information
- HIPAA compliance details

#### 5. Log Out (LogOut icon)

- End current session
- Secure logout from platform
- Returns to login screen
- Clears session data

---

## Account Settings

Comprehensive settings modal for managing profile, calendar availability, and notification preferences. **The Calendar tab is unique to the Provider role.**

### Accessing Account Settings

1. Click profile avatar in top-right corner
2. Select "Account settings" from dropdown menu
3. Modal opens with tab navigation

### Account Settings Navigation

Three tabs available for Providers:

- **My Account** - Profile and personal information
- **Calendar** - Working hours and availability (**Provider-only feature**)
- **Notifications** - Notification preferences

---

### My Account Tab

Manage personal profile information, language, and timezone settings.

#### Profile Photo Section

**Options:**

- **Upload photo button** (Download icon)
  - Select image from computer
  - Supported formats: JPG, PNG
  - Recommended size: 400x400px minimum
  - Automatically resizes and crops

- **Delete photo button** (Trash icon)
  - Removes current profile photo
  - Reverts to initials avatar
  - Confirmation prompt before deletion

**Current Display:**

- Circular avatar with initials or photo
- User's full name below avatar
- Email address below name

#### Profile Details Section

**Editable Fields:**
Click "Edit" button (Edit icon) to modify:

1. **First Name**
   - Provider's given name
   - Required field

2. **Last Name**
   - Provider's family name
   - Required field

3. **Medical Specialty**
   - Select from dropdown list
   - Multiple specialties can be selected
   - Example: "Allergologist, Angiologist"

4. **Languages Spoken**
   - Select languages provider speaks
   - Multiple selections allowed
   - Displays as: "English", "English, Spanish", etc.

5. **Country**
   - Country dropdown selection
   - Used for timezone and localization
   - Shows "N/A" if not set

6. **State**
   - State/Province selection
   - Dependent on country selected
   - Shows "N/A" if not set

7. **Phone Number**
   - Contact phone number
   - Format: (+X) XXXXXXXXXX
   - Optional field, shows "N/A" if empty

**Edit Modal:**

- Opens when clicking Edit button
- All fields displayed in form layout
- **Save changes** button to confirm
- **Cancel** button to discard changes
- Real-time validation on required fields

#### License to Practice Section

**Editable Field:**

- Click "Edit" button to modify
- Select countries/states where licensed
- Multiple selections allowed
- Dropdown with country > state hierarchy
- Example: "Afghanistan, Badakhshan"
- Important for provider credentialing

#### Application Language

**Language Selector:**

- Current language displayed with flag icon
- **"Change language" link**
  - Opens language selection dialog
  - Available languages: English, Spanish, and more
  - Changes UI language instantly
  - User preference saved to profile

**Language Display:**

- Flag icon representing current language
- Language name in full (e.g., "English")
- Visual indicator of active language

#### Time Zone

**Timezone Settings:**

- Current timezone with GMT offset
- Format: "(GMT-07:00) Mountain Standard Time - Phoenix - 08:11 PM"
- Shows current local time in selected timezone
- **"Change time zone" link**
  - Opens timezone selection dialog
  - Searchable list of timezones
  - Organized by geographic region
  - Affects appointment scheduling and display times

**Importance:**

- Ensures accurate appointment timing
- Affects notification delivery times
- Critical for multi-timezone institutions
- Syncs with calendar availability

#### Account Deletion

**Delete Account Section:**

- "Delete account" link at bottom
- **Warning:** This action is irreversible
- Opens confirmation dialog
- Requires password confirmation
- Removes all provider data permanently
- Contact administrator if accidental deletion

---

### Calendar Tab (Provider-Only Feature)

**Unique to Provider Role:** Manage working hours and calendar integrations for appointment scheduling.

#### Overview

**Purpose:**

- Set weekly availability schedule
- Configure working hours for each day
- Integrate external calendars
- Control appointment booking windows

**Description:**
"Manage your time zone and daily working hours"

#### Time Zone Configuration

**Display:**

- Current timezone with GMT offset
- Format: "(GMT-07:00) Mountain Standard Time - Phoenix - 08:11 PM"
- Shows real-time local time
- **"Change time zone" link**
  - Same functionality as My Account tab
  - Convenient access from Calendar view

**Use Case:**

- Ensure appointment times display correctly
- Handle providers working across timezones
- Sync with patient scheduling interface

#### Daily Availability Section

**Overview:**

- Set working hours for each day of the week
- Define when patients can book appointments
- Customize schedule per day
- Block out non-working hours

**Weekly Schedule Display:**

Each day shows:

- **Day name**: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
- **Time range**: Start time — End time
  - Format: "12:00 AM — 11:59 PM" (24-hour availability)
  - Format: "9:00 AM — 5:00 PM" (business hours)
  - Format: "Off" or "Unavailable" (non-working day)

**Edit Button:**

- Click "Edit" (Edit icon) to modify schedule
- Opens schedule configuration modal

**Edit Schedule Modal:**

For each day:

1. **Toggle availability** - Working day on/off
2. **Start time picker** - When availability begins
3. **End time picker** - When availability ends
4. **Break times** (optional) - Add lunch or breaks
   - Multiple breaks per day supported
   - Break start and end times

**Time Picker:**

- 15-minute increment selection
- AM/PM or 24-hour format
- Scroll or dropdown selection
- Visual time selection

**Common Configurations:**

1. **Standard Business Hours:**
   - Monday-Friday: 9:00 AM — 5:00 PM
   - Saturday-Sunday: Off

2. **Extended Hours:**
   - Monday-Thursday: 8:00 AM — 6:00 PM
   - Friday: 8:00 AM — 3:00 PM
   - Saturday: 9:00 AM — 1:00 PM
   - Sunday: Off

3. **24/7 Availability:**
   - All days: 12:00 AM — 11:59 PM

4. **Split Shifts:**
   - Morning: 7:00 AM — 12:00 PM
   - Break: 12:00 PM — 1:00 PM
   - Afternoon: 1:00 PM — 7:00 PM

**Save Changes:**

- "Save" button applies schedule
- "Cancel" discards changes
- Real-time validation of time conflicts
- Confirmation message on successful save

**Impact on Scheduling:**

- Patients can only book during available hours
- System blocks appointments outside working hours
- Coordinators see provider availability
- Calendar integrations respect these hours

#### Calendar Integrations Section

**Purpose:**

- Connect external calendar services
- Sync availability across platforms
- Prevent double-booking
- Streamline schedule management

**Display:**

- **Heading:** "Calendar Integrations"
- **Description:** "Connect to an external calendar."
- **"Connect account" button** (Plus icon)

**Supported Calendars:**

- Google Calendar
- Microsoft Outlook/Office 365
- Apple Calendar (iCloud)
- Other CalDAV-compatible services

**Connection Process:**

1. Click "Connect account" button
2. Select calendar service from list
3. Authenticate with calendar provider
   - OAuth login flow
   - Grant eNow2 read/write permissions
4. Configure sync settings:
   - Sync direction (one-way or two-way)
   - Which calendar to sync with
   - How far ahead to sync
5. Save integration settings

**Connected Calendar Display:**

Once connected:

- Calendar service name and icon
- Connected account email
- Sync status indicator
- "Disconnect" button
- "Sync now" button (manual refresh)
- Last sync timestamp

**Sync Behavior:**

**From External Calendar to eNow2:**

- Blocked time appears as unavailable in eNow2
- Personal appointments prevent patient bookings
- Travel time shows as unavailable
- All-day events block entire day

**From eNow2 to External Calendar:**

- Patient appointments appear in external calendar
- Includes patient name (if privacy settings allow)
- Shows appointment duration
- Includes video call link
- Updates when rescheduled or canceled

**Privacy Settings:**

- Choose what information syncs to external calendar
- Option to show "Busy" without patient details
- HIPAA-compliant sync options
- Configure per integration

**Disconnect Calendar:**

- Click "Disconnect" button
- Confirmation prompt
- Removes integration immediately
- Does not delete existing synced events
- Can reconnect anytime

---

### Notifications Tab

Configure how and when to receive notifications about appointments, requests, and system events.

#### Overview

**Description:**
"Manage your notification preferences"

#### Notification Methods Section

Configure which channels receive notifications:

##### 1. Email Notifications

**Display:**

- "Email" heading
- Associated email address shown
- Toggle checkbox to enable/disable

**Settings:**

- **Enabled (checked):** Receive notifications via email
- **Disabled (unchecked):** No email notifications
- Click anywhere on row to toggle

**Email Delivery:**

- Sent to provider's registered email
- Immediate delivery for urgent notifications
- Digest options for non-urgent updates
- HTML formatted emails with action links

**Email Content:**

- Appointment reminders
- New appointment requests
- Schedule changes or cancellations
- System announcements
- Patient messages (if configured)

##### 2. SMS Notifications

**Display:**

- "SMS" heading
- Phone number if added, or "Add phone number" link
- Toggle checkbox (disabled until phone number added)

**Setup Process:**

1. Click "Add phone number" link
2. Enter phone number with country code
3. Verify phone number via SMS code
4. Enable SMS notifications toggle

**Settings:**

- **Enabled:** Receive text message notifications
- **Disabled:** No SMS notifications
- Checkbox disabled (grayed out) until phone verified

**SMS Delivery:**

- Text messages to verified phone number
- Short notification messages with key details
- Links to web app for full information
- Carrier messaging rates may apply

**SMS Content:**

- Appointment reminders (time configurable)
- Urgent patient requests
- Schedule conflicts
- Critical system alerts
- Short format, essential information only

##### 3. In-App Notifications

**Display:**

- "In-app" heading
- Toggle checkbox to enable/disable

**Settings:**

- **Enabled (checked):** Show browser/system notifications
- **Disabled (unchecked):** No in-app popups

**In-App Behavior:**

- Browser notification popups (requires browser permission)
- Desktop notifications when app not focused
- Notification bell badge count
- Sound alerts for urgent notifications (configurable)

**Notification Panel:**

- Click bell icon to view all in-app notifications
- Chronological list of recent notifications
- Read/unread indicators
- Click notification to navigate to relevant page
- "Clear all" button to mark all as read

**Browser Permission:**

- First time enabling: browser prompts for permission
- Must allow notifications in browser settings
- Can be revoked in browser settings anytime

#### Session Reminders Section

Configure advance reminders before scheduled appointments begin.

**Description:**
"Set the time you'd like to be reminded before the session starts."

**Current Reminder Display:**

- Shows active reminder settings
- Format: "Remind me [X minutes/hours] before the session"
- **"Change" link** to modify timing

##### Default Reminder

**QA Environment Default:**

- "Remind me 5 minutes before the session"
- Provides last-minute preparation time
- Ensures provider doesn't miss appointment

**Change Reminder Timing:**

1. Click "Change" link
2. Opens reminder configuration dialog
3. Select reminder time from dropdown:
   - 5 minutes before
   - 10 minutes before
   - 15 minutes before
   - 30 minutes before
   - 1 hour before
   - 2 hours before
   - 1 day before
4. Click "Save" to apply

##### Add Additional Reminders

**"Add reminder" Button:**

- Click to add multiple reminder times
- Configure different reminders for same appointment
- Example: 1 day before + 15 minutes before

**Multiple Reminders:**

- Each reminder listed separately
- Individual "Change" or "Remove" options
- Different delivery methods per reminder
- Useful for complex schedules

**Reminder Delivery:**

- Sent via all enabled notification methods
- Email reminder includes session details
- SMS reminder includes time and patient name
- In-app notification with "Join now" button

**Reminder Content:**

- Patient name
- Appointment time
- Service type
- Duration
- Quick actions (Join, Reschedule, Cancel)
- Deep link to session details

---

## Provider Workflows

Step-by-step guides for common provider tasks and efficient use of the platform.

### 1. Viewing Today's Schedule

**Purpose:** Review daily appointments and prepare for sessions

**Steps:**

1. Login to platform
2. Automatically lands on Dashboard
3. View "Your schedule for today" section
4. Check session count (e.g., "3 sessions")
5. Click ChevronDown icon to expand schedule details
6. Review each appointment:
   - Time
   - Patient name
   - Service type
   - Duration
7. Click any appointment for full details

**Tips:**

- Check schedule first thing each morning
- Note any on-demand requests
- Prepare materials for specialized appointments
- Allow buffer time between sessions

### 2. Adding a New Appointment

**Purpose:** Schedule a session with an existing patient

**Via Dashboard:**

1. Click"Schedule session" button (CalendarPlus icon)
2. Search for patient by name or select from list
3. Choose date from calendar picker
4. Select available time slot
5. Choose service type (General Practice, Specialty, etc.)
6. Set appointment duration
7. Add notes or special instructions (optional)
8. Click "Send invitation" to confirm

**Via My Patients:**

1. Navigate to My Patients
2. Find patient using search or scroll
3. Click calendar icon next to patient name
4. Patient info pre-filled
5. Complete date, time, service type
6. Click "Send invitation"

**After Scheduling:**

- Confirmation message displayed
- Patient receives email/SMS invitation
- Appointment appears in your schedule
- Calendar integration syncs (if connected)

### 3. Responding to On-Demand Requests

**Purpose:** Handle urgent patient consultation requests quickly

**Steps:**

1. Notice "On demand requests" button in top bar
2. Badge indicator shows number of pending requests
3. Click "On demand requests" button
4. Review request details:
   - Patient name and info
   - Reason for visit
   - Urgency level
   - Time waiting
5. Choose action:
   - **Accept:** Start session immediately
   - **Decline:** Reject with optional reason
   - **Delay:** Accept but schedule for later time

**When Accepting:**

- Video call initiates immediately
- Patient notified and joined to waiting room
- Pre-call equipment checks run
- Session timer starts when both parties connected

**Best Practices:**

- Respond within 5 minutes
- Check workload before accepting
- Communicate expected wait time if delayed
- Decline if unable to handle urgency level
- Note patient condition severity

### 4. Reviewing Past Sessions

**Purpose:** Access historical patient encounter records and documentation

**Steps:**

1. Navigate to Past Sessions from left menu
2. Use search to find specific patient encounters
   - Type patient name in search bar
   - Real-time filtering as you type
3. Or use date/session type filters
4. Locate desired session in table
5. Click "View details" link

**In Session Details:**

- Review complete session timeline
- View participant information
- Read clinical notes and documentation
- Access SOAP notes if completed
- Download or review attachments
- Playback session recording (if available)
- Check prescription information
- Review follow-up recommendations

**Use Cases:**

- Prepare for follow-up appointments
- Review past treatments before prescribing
- Document completion if initially incomplete
- Quality assurance and self-review
- Training and continuing education
- Respond to patient inquiries about past care

### 5. Consulting with Another Provider

**Purpose:** Collaborate with colleagues on patient cases or seek specialist input

**Steps:**

1. Navigate to Providers from left menu
2. Search by name if you know the provider
3. Or filter by:
   - **Specialty** (for specialist consultation)
   - **Spoken languages** (for language-concordant care)
   - **Status** (only Online/Available)
4. Review provider profile
5. Choose communication method:
   - **Messages icon** for non-urgent, text-based consultation
   - **Video icon** for immediate video consultation

**For Text Messages:**

- Opens chat interface
- Type your message or question
- Can include attachments or images
- Provider sees notification and responds when available
- Asynchronous conversation thread

**For Video Calls:**

- Initiates immediate video call request
- Other provider receives notification
- They can accept, decline, or ignore
- If accepted, video session starts
- Screen sharing available for reviewing charts

**Best Practices:**

- Check provider status before calling
- Use messages for non-urgent questions
- Provide context: patient age, condition, urgency
- Share relevant test results or images
- Follow institution's consultation protocols
- Document consultation in patient record

### 6. Finding a Specialist for Referral

**Purpose:** Locate appropriate specialist for patient referral

**Steps:**

1. Navigate to Providers
2. Click "Specialty" filter dropdown
3. Select relevant specialty:
   - Cardiology (heart conditions)
   - Dermatology (skin conditions)
   - Allergology (allergies)
   - And more...
4. Optionally add language filter if patient needs specific language
5. Review filtered list of specialists
6. Click on provider name to view detailed profile
7. Check provider's availability status
8. Note provider's contact information
9. Initiate referral through system or contact directly

**Referral Process:**

- Send message to specialist with patient info
- Provide reason for referral
- Attach relevant test results or documentation
- Coordinate with patient for specialist appointment
- Follow up after specialist consultation

### 7. Managing Daily Availability

**Purpose:** Update working hours or block out unavailable time

**Steps:**

1. Click profile avatar in top-right
2. Select "Account settings"
3. Click "Calendar" tab
4. View current weekly schedule
5. Click "Edit" button
6. Modify for each day:
   - Toggle working day on/off
   - Set start time
   - Set end time
   - Add break times
7. Click "Save changes"
8. Confirmation message appears

**Dynamic Changes:**

- Changes apply immediately to scheduling system
- Patients see updated availability
- Coordinators notified of changes
- Calendar integrations sync within minutes
- Existing appointments not affected

**Common Modifications:**

- Add vacation days (toggle off)
- Adjust hours for personal appointments
- Add lunch breaks
- Extend hours for high demand days
- Block early mornings or late evenings

### 8. Setting Up Calendar Integration

**Purpose:** Sync eNow2 schedule with external calendar (Google, Outlook, etc.)

**Steps:**

1. Profile avatar → Account settings
2. Calendar tab
3. Scroll to "Calendar Integrations" section
4. Click "Connect account" button (Plus icon)
5. Select calendar service from list
6. Login to calendar service (OAuth)
7. Grant eNow2 permissions:
   - Read calendar events
   - Create calendar events
   - Update existing events
8. Configure sync settings:
   - Choose which calendar to sync
   - Set sync frequency
   - Choose sync direction (one-way or two-way)
   - Privacy settings (show details or just "busy")
9. Click "Save" to activate integration
10. Verify sync with "Sync now" button

**Post-Setup:**

- Personal appointments block eNow2 availability
- eNow2 appointments appear in external calendar
- Changes sync bidirectionally
- Can connect multiple calendars

### 9. Configuring Notification Preferences

**Purpose:** Control how and when you receive notifications

**Steps:**

1. Profile avatar → Account settings
2. Click "Notifications" tab
3. Configure Notification Methods:
   - **Email:** Toggle on/off
   - **SMS:** Add phone number, then toggle on/off
   - **In-app:** Toggle on/off
4. Set Session Reminders:
   - Click "Change" on existing reminder
   - Select timing (5 min, 15 min, 1 hour, etc.)
   - Or click "Add reminder" for multiple reminders
5. Save changes automatically

**Recommendations:**

- Enable in-app notifications for immediate awareness
- Enable SMS for critical alerts
- Set reminder at least 5 minutes before sessions
- Consider multiple reminders for busy days
- Adjust based on your workflow patterns

### 10. Ending Your Day

**Purpose:** Complete daily tasks and prepare for next day

**Steps:**

1. Review any incomplete session documentation
2. Navigate to Past Sessions
3. Filter by today's date
4. Complete any pending SOAP notes
5. Review tomorrow's schedule on Dashboard
6. Check for overnight on-demand request preferences
7. Set status to "Offline" if needed
8. Log out securely:
   - Profile avatar → Log out

**Daily Wrap-Up Checklist:**

- ☐ All session notes completed
- ☐ All prescriptions issued and documented
- ☐ Follow-up appointments scheduled
- ☐ Urgent messages responded to
- ☐ Tomorrow's schedule reviewed
- ☐ Calendar availability updated for next week
- ☐ Logged out

---

## Best Practices

### Session Management

**Before Sessions:**

- Review schedule at start of each day
- Prepare patient charts before appointments
- Set status to "Available" when ready for sessions
- Test video/audio equipment
- Close unnecessary applications
- Ensure quiet, private location

**During Sessions:**

- Join waiting room 1-2 minutes early
- Greet patient professionally
- Complete session documentation in real-time when possible
- Use screen sharing for patient education
- Record session if clinically appropriate (with consent)
- End session clearly with follow-up plan

**After Sessions:**

- Complete SOAP notes immediately
- Issue prescriptions before next appointment
- Schedule follow-up if needed
- Update patient chart with new information
- Close session properly in system

**Daily Best Practices:**

- Respond to on-demand requests promptly (within 5 minutes)
- Keep patient roster up to date
- Review and respond to messages regularly
- Allow buffer time between appointments
- Take breaks to prevent burnout
- Maintain online status accuracy

### Communication

**With Patients:**

- Professional and empathetic tone
- Use Messages feature for non-urgent follow-ups
- Provide clear instructions and next steps
- Confirm patient understanding
- Document all patient communications

**With Providers:**

- Use Messages for non-urgent collaboration
- Use Video for urgent consultations or complex cases
- Check provider status before initiating contact
- Provide adequate context in consultation requests
- Respond to colleague consultations promptly
- Maintain professional courtesy

**Notifications:**

- Check notification bell regularly throughout day
- Enable multiple notification methods for reliability
- Set appropriate session reminder times
- Respond to system alerts promptly
- Keep notification preferences current

### Documentation

**Clinical Notes:**

- Complete visit notes for all sessions
- Use SOAP format consistently
- Document actual session duration accurately
- Include chief complaint, assessment, and plan
- Note any prescriptions or orders
- Add follow-up recommendations

**Attachments:**

- Attach relevant files, images, or test results
- Use clear, descriptive file names
- Ensure image quality for diagnostic images
- Document source and date of attachments

**Timeliness:**

- Complete documentation immediately after sessions
- Don't let documentation accumulate
- Same-day completion ensures accuracy
- Required for billing and compliance

### Calendar & Scheduling

**Availability Management:**

- Keep Calendar tab schedule current
- Update availability at least weekly
- Block personal time appropriately
- Add vacation/PTO well in advance
- Use calendar integrations to prevent double-booking

**Appointment Scheduling:**

- Schedule appropriate duration for visit type
- Allow buffer time between sessions
- Don't overbook - quality over quantity
- Coordinate with coordinator team for complex cases
- Send reminders to patients day before appointment

### Security & Privacy

**Account Security:**

- Log out when leaving workstation
- Don't share login credentials
- Use strong, unique password
- Enable two-factor authentication if available
- Report suspicious activity immediately

**Patient Privacy:**

- Conduct sessions in private location
- Don't discuss cases in public areas
- Close patient charts when not in use
- Follow HIPAA guidelines strictly
- Use secure messaging only through platform

**Data Protection:**

- Don't screenshot or photograph patient information
- Don't email patient data outside secure system
- Lock screen when away from desk
- Verify patient identity before discussing care
- Report any privacy breaches promptly

### Professional Development

**Self-Improvement:**

- Review past sessions for quality assurance
- Seek feedback from colleagues
- Stay current with platform updates
- Attend training sessions
- Learn new platform features regularly

**Collaboration:**

- Build network of specialist colleagues
- Participate in provider community
- Share knowledge and best practices
- Mentor new providers
- Contribute to quality improvement

### Technical Best Practices

**Equipment:**

- Use wired internet when possible
- Test audio/video before first session of day
- Keep backup equipment available
- Update browser regularly
- Close unnecessary tabs and applications

**Troubleshooting:**

- Know how to quickly restart session if technical issues
- Have IT support contact readily available
- Communicate technical issues to patients proactively
- Document technical problems for support team
- Keep backup communication method with patients

---

## Summary

The Provider role is central to the eNow2 platform, offering comprehensive tools for delivering high-quality telehealth care. Key features include:

- **Unique Calendar Management**: Set working hours and integrate external calendars (Provider-only feature)
- **Patient Management**: Easy access to patient roster with quick scheduling
- **Provider Collaboration**: Directory with real-time status and communication tools
- **Flexible Scheduling**: Handle both scheduled and on-demand requests
- **Complete Documentation**: Access to full session history and documentation tools
- **Customizable Notifications**: Multi-channel notifications with configurable reminders

For additional support or questions about provider features, contact your institution's administrator or access Help from the profile menu.

---

[← Back to Role Index](./README.md)
