# Coordinator Role - User Guide

**Role:** Coordinator  
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
6. [Patients Directory](#patients-directory)
7. [Command Center](#command-center)
8. [Schedule Session Workflow](#schedule-session-workflow)
9. [Notifications](#notifications)
10. [Profile Menu](#profile-menu)
11. [Account Settings](#account-settings)
12. [Best Practices](#best-practices)

---

## Overview

The Coordinator role is designed for staff who manage appointment scheduling, coordinate patient flow, monitor active sessions, and facilitate communication between patients and providers. Coordinators have a central oversight function with access to the Command Center for real-time session monitoring.

### Key Responsibilities

- Schedule and manage appointments for all patients
- Monitor patient flow and waiting rooms
- Coordinate provider assignments
- Track active and past sessions
- Facilitate communication between patients and providers
- Respond to appointment requests
- Manage the Command Center dispatch hub
- Generate reports and track metrics

### Role-Specific Features

- **Command Center**: Real-time monitoring dashboard (Coordinator-exclusive)
- **Full Patient Directory**: Schedule appointments for any patient
- **Provider Directory**: View availability and coordinate assignments
- **Dispatch Capabilities**: Assign providers to waiting patients
- **Session Oversight**: Monitor all active sessions across the platform

---

## Navigation Menu

The Coordinator role has the following left-side navigation menu:

### 1. Dashboard

Main landing page with daily schedule and quick scheduling actions

### 2. Past Sessions

Historical archive of all completed sessions with search and filtering

### 3. Providers

Directory of all providers with availability status, specialties, and contact options

### 4. Patients

Complete patient directory with scheduling capabilities and contact information

### 5. Command Center ⭐

Real-time monitoring and dispatch hub - **unique to Coordinator role**

- Monitor appointment requests
- Track waiting rooms
- Oversee active sessions
- Dispatch and assign providers

---

## Dashboard

The coordinator's main landing page for viewing today's schedule and quick access to scheduling functions.

### Schedule Overview

**Your Schedule for Today Panel:**

- **Date Display:** Current date (e.g., "Feb, 24th")
- **Session Counter:** Count of all scheduled sessions for selected date
  - Format: "0 sessions", "1 session", "5 sessions"
- **Date Picker:** Expandable dropdown with ChevronDown icon
  - Click to open calendar dialog
  - Jump to any date
  - View different days' schedules

**Calendar Dialog Features:**

- **Month/Year Dropdowns:** Quick navigation to specific month and year
- **Previous/Next Arrows:** Navigate month by month
- **Today Button:** Instant jump to current date
- **Visual Date Selection:** Click any date to view its schedule
- **Cross-Month Display:** Shows dates from previous and next months
- **Selected Date Highlighting:** Chosen date prominently highlighted

### Quick Actions

**Schedule Session Button:**

- Large prominent button with CalendarPlus icon
- Opens full appointment booking workflow
- Can schedule for any patient in the system
- Quick one-click access to most common task

**Capabilities:**

- Search and select patient
- Choose provider based on availability
- Pick date and time slot
- Enter session details
- Confirm and send notifications

### Empty State Display

When no sessions scheduled for selected date:

- **Success Checkmark Icon:** Visual confirmation
- **Message:** "You currently have no upcoming sessions for today"
- **Clean Interface:** Encourages new session scheduling
- **Persistent Quick Actions:** Schedule session button always available

### Upcoming Sessions (When Present)

When sessions are scheduled for selected date:

**Session List Display:**

- Chronologically ordered by start time
- Each session card shows:
  - Time (e.g., "09:00 AM - 09:30 AM")
  - Patient name and ID
  - Provider assigned
  - Session type (Video, Chat, Phone)
  - Status (Scheduled, Confirmed, Checked In)
  - Quick actions menu

**Session Cards:**

- Hover for additional options
- Click for full details
- Quick actions: View, Edit, Cancel, Reschedule
- Visual indicators for session status

---

## Past Sessions

Comprehensive searchable archive of all historical session records across all patients and providers.

### Overview

Access complete history of healthcare sessions for reporting, reference, and follow-up purposes.

### Search Functionality

**Search Bar:**

- Placeholder: "Start typing patient name"
- Real-time search filtering
- Search by:
  - Patient name (first or last)
  - Patient ID
  - Session ID
  - Provider name
- Partial match support
- Instant results as you type

**Search Behavior:**

- Minimum 2-3 characters to begin search
- Clear "X" button to reset search
- Results update in real-time
- Highlights matching text

### Quick Filters

**Date Range Filter:**

- Start date picker
- End date picker
- Pre-set ranges:
  - Today
  - Yesterday
  - Last 7 days
  - Last 30 days
  - Last 90 days
  - Custom range

**Session Status Filter:**

- Completed
- Cancelled
- No-show
- In Progress
- All statuses

**Provider Filter:**

- Dropdown of all providers
- Select specific provider to filter
- "All Providers" option

**Session Type Filter:**

- Video consultations
- Chat sessions
- Phone calls
- All types

**Apply/Clear Filters:**

- **Apply button:** Execute filtering
- **Clear filters button:** Reset all filters to default
- Filter count indicator

### Session History Display

**When Results Present:**

**Sortable Table Columns:**

1. **Date & Time** (ChevronSelectorVertical)
   - Session date and start time
   - Format: MM/DD/YYYY HH:MM AM/PM
   - Click to sort chronologically

2. **Patient Name** (ChevronSelectorVertical)
   - Full patient name
   - Patient ID in parentheses
   - Clickable for patient profile

3. **Provider Name** (ChevronSelectorVertical)
   - Assigned provider
   - Provider specialty
   - Clickable for provider profile

4. **Duration** (ChevronSelectorVertical)
   - Actual session length
   - Format: Xh Ym or Ym
   - Scheduled vs. actual comparison

5. **Session Type** (ChevronSelectorVertical)
   - Video, Chat, Phone
   - Icon indicator
   - Color-coded

6. **Status** (ChevronSelectorVertical)
   - Completed (green)
   - Cancelled (gray)
   - No-show (red)
   - Status badge

7. **Session ID** (ChevronSelectorVertical)
   - Unique identifier with # prefix
   - Copy to clipboard option
   - Used for support inquiries

8. **Actions**
   - **"View details" link** on each row
   - Opens comprehensive session view
   - Access to all session documentation

**Sorting:**

- Click any column header to sort
- Click again to reverse sort order
- Visual indicator (up/down arrow) of current sort
- Default: Most recent first

### Empty State

When no sessions match search or filters:

- **Icon:** Magnifying glass or empty folder
- **Message:** "No results found"
- **Suggestions:**
  - Adjust search terms
  - Clear filters to broaden results
  - Check date range

### Session Details View

Clicking "View details" opens comprehensive session information:

**Session Overview:**

- Complete timestamp (start and end times)
- Total duration
- Session ID
- Session type

**Participants:**

- Patient information (name, ID, contact)
- Provider information (name, specialty)
- Coordinator who scheduled (if applicable)

**Session Documentation:**

- Provider's visit notes (when published)
- Chief complaint/reason for visit
- Assessment and diagnosis
- Treatment plan
- Prescriptions issued
- Follow-up recommendations
- Lab orders or referrals

**Technical Details:**

- Connection quality metrics
- Duration of actual video time
- Any technical issues reported
- Recording status (if recorded)

**Actions:**

- Download session report (PDF)
- Generate billing information
- Schedule follow-up
- Message participants
- Flag for review

---

## Providers Directory

Comprehensive directory of all healthcare providers with real-time availability status and communication capabilities.

### Overview

Central hub for viewing provider information, checking availability, filtering by specialty, and initiating communications with providers.

### Search & Filter Bar

**Search Functionality:**

**Search Bar:**

- Placeholder: "Search by name, email"
- Searches across:
  - Provider first name
  - Provider last name
  - Email address
  - Employee ID (if visible)
- Real-time filtering as you type
- Partial match support

**Filter Options:**

1. **User Type Dropdown**
   - Filter by role
   - Options:
     - Provider
     - Specialist
     - Coordinator (will show coordinators with provider capabilities)
     - Admin
     - All types
   - Useful for finding specific role types

2. **Specialty Dropdown**
   - Filter by medical specialty
   - Options include:
     - General Practice
     - Cardiology
     - Dermatology
     - Pediatrics
     - Mental Health
     - Urgent Care
     - And more
   - "All Specialties" option

3. **Spoken Languages Dropdown**
   - Filter by languages provider speaks
   - Options:
     - English (en)
     - Spanish (es)
     - French (fr)
     - And more
   - "All Languages" option
   - Important for patient-provider matching

4. **Status Dropdown**
   - Filter by current availability
   - Options:
     - Online (currently available)
     - Offline (not available)
     - Busy (in session)
     - Away (idle/break)
     - All statuses

**Clear Filters Button:**

- Resets all filters to default "All" options
- Clears search text
- Returns to full provider list
- Useful for starting fresh search

### Provider Table

**Table Layout:**

Comprehensive table with sortable columns and provider information:

#### Column 1: Name (ChevronSelectorVertical)

**Display:**

- Avatar icon or profile photo
- Provider full name
- Format: First Last

**Sorting:**

- Click to sort alphabetically
- Default: A-Z
- Click again: Z-A

**Interaction:**

- Click provider name/row for detailed profile
- Opens provider profile view

#### Column 2: User Type (ChevronSelectorVertical)

**Display:**

- Role designation
- Examples:
  - "Provider"
  - "Coordinator"
  - "Admin-Provider" (combined roles)

**Purpose:**

- Identifies provider's role in system
- Important for understanding capabilities

#### Column 3: Specialty (ChevronSelectorVertical)

**Display:**

- Medical specialty or specialties
- Examples:
  - "General Practice"
  - "Cardiology"
  - Multiple specialties comma-separated
- **[blank]** if no specialty set (e.g., Coordinators)

**Sorting:**

- Alphabetical by specialty
- Blank entries grouped

#### Column 4: Email (ChevronSelectorVertical)

**Display:**

- Provider's email address
- Full email shown or truncated with ellipsis

**Interaction:**

- Click to copy to clipboard (if enabled)
- Hover to see full email if truncated

#### Column 5: Spoken Languages

**Display:**

- Flag icons representing languages
- Common flags:
  - 🇺🇸 en (English)
  - 🇪🇸 es (Spanish)
  - 🇫🇷 fr (French)
  - And more
- Multiple flags displayed if multilingual
- Tooltip on hover showing language name

**Purpose:**

- Critical for matching patients with language needs
- Ensures effective communication
- Improves patient care quality

#### Column 6: Status (ChevronSelectorVertical)

**Real-Time Status Display:**

**Online:**

- Green dot indicator
- "Online" text
- Provider available for assignment

**Offline:**

- Gray dot indicator
- "Offline" text
- Provider not logged in or unavailable

**Busy:**

- Red/Orange dot indicator
- "Busy" text
- Provider currently in session

**Away:**

- Yellow dot indicator
- "Away" text
- Provider idle or on break

**Sorting:**

- Sort by status
- Groups by availability status

#### Column 7: Actions

**Communication Icons:**

**Messages Icon (Chat bubble):**

- Click to initiate text chat with provider
- Opens real-time messaging interface
- Useful for:
  - Quick questions
  - Non-urgent coordination
  - Scheduling discussions
  - Sharing patient information
- Shows unread message badge if applicable

**Video Icon (Camera):**

- Click to start video call with provider
- Instant video consultation
- Useful for:
  - Urgent coordination
  - Complex discussions
  - Quick face-to-face check-ins
  - Collaborative decision-making
- Only available if provider is Online

**Icon States:**

- **Enabled:** Provider available, icons clickable
- **Disabled:** Provider offline, icons grayed out
- **Tooltip:** Hover shows "Send message" or "Start video call"

### Provider Profile View

Clicking on a provider row opens detailed profile:

**Profile Information:**

- Full name and credentials
- Profile photo
- Contact information (email, phone)
- Specialty and sub-specialties
- Languages spoken
- Biography/About section
- Education and certifications

**Availability:**

- Current status
- Weekly schedule (calendar view)
- Available time slots
- Upcoming appointments
- Capacity and workload

**Performance Metrics:**

- Patient satisfaction rating
- Number of consultations completed
- Average session duration
- Specializations and focus areas

**Quick Actions:**

- Send message
- Start video call
- Schedule appointment with this provider
- View provider's past sessions
- Assign to waiting patient

### Example Provider Entries

**Sample Display:**

```
Name             | User Type   | Specialty        | Email                                  | Languages | Status  | Actions
-----------------|-------------|------------------|----------------------------------------|-----------|---------|----------------
Alex Dispatcher  | Coordinator | [blank]          | gmedtester+coordstaging@gmail.com      | en, es    | Offline | 💬 📹
Dr. Sarah Jones  | Provider    | General Practice | sjones@example.com                     | en        | Online  | 💬 📹
Dr. John Smith   | Provider    | Cardiology       | jsmith@example.com                     | en, es, fr| Busy    | 💬 📹(disabled)
```

### Pagination

When provider list exceeds page limit:

- **Previous/Next buttons:** Navigate pages
- **Page number indicator:** Current page (e.g., "Page 1 of 5")
- **Rows per page:** Dropdown to select (10, 25, 50, 100)
- **Total count:** "Showing 1-25 of 123 providers"
- **Disabled states:** Previous disabled on first page, Next disabled on last page

---

## Patients Directory

Complete patient directory with scheduling capabilities and comprehensive search.

### Overview

Central location for accessing all patient information, viewing contact details, and initiating appointment scheduling for any patient in the system.

### Search Functionality

**Search Bar:**

- Placeholder: "Search by name, email or phone number"
- **Multi-field search** capability:
  - Patient first name
  - Patient last name
  - Email address
  - Phone number (formats: XXX-XXX-XXXX, (XXX) XXX-XXXX, +X XXXXXXXXXX)
- Real-time filtering
- Partial match support
- Minimum 2 characters to begin search

**Search Behavior:**

- Results update as you type
- Clear "X" button to reset
- Highlights matching text
- Case-insensitive
- Special character handling for phone numbers

### Patient Table

**Table Layout:**

Sortable table displaying patient information and quick actions:

#### Column 1: Name (ChevronSelectorVertical)

**Display:**

- Avatar icon or profile photo
- Patient full name
- Format: First Last
- Patient types indicated:
  - Regular patients
  - Device-ID patients (patients using shared device login)

**Sorting:**

- Click to sort alphabetically by last name
- Click again to reverse order
- Default: A-Z

**Interaction:**

- Click patient name/row for detailed profile
- Opens patient record view

#### Column 2: Email (ChevronSelectorVertical)

**Display:**

- Patient's primary email address
- Full email or truncated with ellipsis
- Shows "N/A" if no email on file

**Sorting:**

- Alphabetical by email domain, then username
- N/A entries grouped at end

**Use Cases:**

- Contact for appointment reminders
- Send visit notes and prescriptions
- Patient portal registration verification

#### Column 3: Phone (ChevronSelectorVertical)

**Display:**

- Patient's phone number
- Format: (+CountryCode) XXX-XXX-XXXX
- Example: "(+1) 3564646848"
- Shows "N/A" if no phone on file

**Sorting:**

- Numerical by area code then number
- N/A entries grouped at end

**Use Cases:**

- SMS appointment reminders
- Phone call for urgent matters
- Two-factor authentication

#### Column 4: Actions

**CalendarPlus Icon (Schedule):**

**Functionality:**

- Click to initiate appointment scheduling for patient
- Opens schedule session workflow
- Pre-fills patient information
- Most common coordinator action

**Tooltip:**

- Hover shows "Schedule appointment"
- Always available
- Direct path to booking workflow

**Icon Appearance:**

- CalendarPlus icon (calendar with + symbol)
- Consistent color (primary action color)
- Clickable button style

### Example Patient Entries

**Sample Display:**

```
Name                  | Email                                        | Phone            | Action
----------------------|----------------------------------------------|------------------|--------
Cody Device-ID-Two    | chuls+device22222staging@globalmed.com       | N/A              | 📅+
Ananya PatientONE     | amittal+patientonestaging@globalmed.com      | (+1) 3564646848  | 📅+
John Doe              | jdoe@example.com                             | (+1) 5551234567  | 📅+
Jane Smith            | jsmith@example.com                           | N/A              | 📅+
```

### Patient Types Listed

**Regular Patients:**

- Standard patient accounts
- Full patient portal access
- Individual login credentials

**Device-ID Patients:**

- Patients associated with shared device accounts
- Hospital/clinic kiosk access
- May share device login but have individual records
- Naming convention often includes "Device-ID"

**Test Accounts:**

- Environment-specific test accounts
- Staging/QA accounts for testing
- May have special naming conventions

### Pagination

When patient list exceeds page limit:

**Navigation Controls:**

- **Previous Button:** Navigate to previous page
  - Disabled when on first page
  - Arrow icon pointing left
- **Next Button:** Navigate to next page
  - Disabled when on last page
  - Arrow icon pointing right

**Page Indicator:**

- **Current Page Number:** Displays page number (e.g., "1", "2", "3")
- **Total Pages:** Some implementations show "1 of 10"

**Additional Options:**

- **Rows per page dropdown:** Select items per page (10, 25, 50, 100)
- **Total count display:** "Showing 1-25 of 253 patients"
- **Jump to page:** Direct page number input (if available)

### Patient Profile View

Clicking on a patient row opens detailed patient record:

**Patient Demographics:**

- Full name and preferred name
- Date of birth and age
- Sex assigned at birth
- Contact information (email, phone, address)
- Emergency contact information
- Language preference

**Medical Information:**

- Current medications
- Known allergies
- Medical history
- Chronic conditions
- Insurance information (provider, policy number)

**Appointment History:**

- Past appointments list
- Upcoming scheduled appointments
- Cancelled appointments
- No-show history

**Health Data:**

- Recent vital signs
- Health assessment submissions
- Uploaded documents (ID, insurance cards, test results)

**Quick Actions:**

- Schedule appointment (CalendarPlus)
- Send message
- Update patient information
- View full medical record
- Generate reports

---

## Command Center

The central dispatch and real-time monitoring hub providing comprehensive visibility into appointment requests, waiting rooms, and active sessions across the entire platform.

### Overview

The Command Center is a **Coordinator-exclusive feature** that serves as the nerve center for healthcare coordination. It provides real-time updates on:

- Incoming appointment requests
- Patients waiting in virtual waiting rooms
- Currently active video consultation sessions
- Provider availability and assignments
- Session metrics and duration tracking

**Purpose:**

- Centralized session monitoring
- Rapid response to requests
- Queue management
- Provider dispatch and assignment
- Real-time coordination

**Technology:**

- WebSocket real-time updates
- Subscription to "dispatcher:start" events
- Live data without page refresh
- Audio/visual notification alerts
- Automatic counter updates

### Main Interface Layout

The Command Center is divided into three main panels:

---

### 1. Requests Panel

**Header:**

- **Counter Display:** "Requests 0" (updates in real-time)
- Badge showing current count of pending requests
- Blue/accent color for visibility

**Purpose:**

- Display incoming appointment requests
- Prioritize and triage requests
- Accept or decline appointments
- Queue management

**Empty State:**

- Icon: Calendar or request icon
- Message: "No requests yet"
- Clean, clear visual
- Indicates no action needed

**When Requests Present:**

Each request card displays:

**Patient Information:**

- Patient full name
- Patient ID
- Contact information (phone, email)
- Patient avatar or initials

**Request Details:**

- **Requested Date & Time:** When patient wants appointment
- **Service Type:** General Practice, Urgent Care, Specialty, etc.
- **Urgency Indicator:**
  - 🔴 Urgent/Same-day
  - 🟡 Soon (within 1-3 days)
  - 🟢 Routine (flexible timing)
- **Reason for Visit:** Patient's stated concerns/symptoms
- **Preferred Provider:** If patient selected specific provider
- **Language Needs:** If interpreter required

**Request Actions:**

**Accept Button (Green):**

- Accept the appointment request
- Opens scheduling workflow
- Pre-fills request details
- Assign provider and finalize time

**Decline Button (Red):**

- Decline the appointment request
- Requires reason selection:
  - No availability for requested time
  - Service not offered
  - Need more information
  - Duplicate request
  - Other (free text)
- Sends notification to patient
- Option to suggest alternative

**Contact Patient Button:**

- Message patient for clarification
- Call patient if urgent
- Request additional information

**Prioritization Features:**

- Requests sorted by urgency and time received
- Visual urgency indicators
- Time stamp showing how long request pending
- Escalation alerts for requests pending > 30 minutes

**Workflow:**

1. New request appears in real-time
2. Coordinator reviews details
3. Checks provider availability
4. Accepts request
5. Opens schedule workflow
6. Assigns provider and confirms time
7. Request moves out of queue
8. Patient receives confirmation

---

### 2. Waiting Rooms Panel

**Header:**

- **Counter Display:** "Waiting rooms 0" (updates in real-time)
- Badge showing count of patients currently waiting
- Amber/yellow color for attention

**Purpose:**

- Monitor patients who have joined waiting rooms
- Track wait times
- Assign providers to waiting patients
- Escalate long waits
- Ensure no patient waits too long

**Empty State:**

- Icon: Clock or waiting room icon
- Message: "No requests yet"
- Indicates no patients currently waiting

**When Waiting Rooms Active:**

Each waiting patient card displays:

**Patient Information:**

- Patient full name and ID
- Avatar or initials
- Contact information

**Waiting Room Details:**

- **Check-In Time:** When patient joined waiting room
- **Wait Duration:** Live timer showing how long waiting
  - Format: "5m", "12m", "1h 3m"
  - Color-coded:
    - Green: 0-5 minutes (acceptable)
    - Yellow: 5-15 minutes (monitor)
    - Orange: 15-30 minutes (take action)
    - Red: 30+ minutes (escalate)
- **Appointment Type:** Scheduled vs. Walk-in/On-demand
- **Service Requested:** General, Urgent Care, Specialty

**Provider Assignment Status:**

**Unassigned:**

- "No provider assigned" indicator
- Requires coordinator action
- **Assign Provider** button prominently displayed

**Assigned:**

- "Assigned to: Dr. [Name]" display
- Provider status (Joining soon, Preparing, En route)
- **Reassign** option if needed

**Actions:**

**Assign Provider Button (Primary Action):**

- Opens provider selection interface
- Shows available providers
- Filters by specialty if needed
- One-click assignment
- Provider immediately notified

**Provider Selection Interface:**

- List of online providers
- Availability status
- Current workload indication
- Specialty match highlighting
- Click to assign

**Message Patient Button:**

- Send message to waiting patient
- Update on wait time
- Request additional information
- Apologize for delay

**Escalate Button:**

- Flag for supervisor attention
- Indicate urgent assignment needed
- Triggers alerts to available providers

**Priority Indicators:**

- Urgent appointments highlighted
- Long-wait patients flagged
- Multiple waiting patients from same account

**Automatic Alerts:**

- Browser notification when patient waits > 10 minutes
- Audio alert for waits > 15 minutes
- Escalation email for waits > 30 minutes

**Best Practices:**

- Check every 5-10 minutes
- Target: Patients wait < 5 minutes for scheduled appointments
- Target: Patients wait < 15 minutes for on-demand
- Proactive provider assignment
- Communicate delays to patients

---

### 3. Active Sessions Panel

**Header:**

- **Counter Display:** "Active Sessions 1" (shows real-time count)
- Badge with current number of ongoing sessions
- Green color indicating active status

**Purpose:**

- Monitor all video consultations in progress
- Track session duration
- Identify completed sessions requiring follow-up
- Oversight of platform usage
- Technical issue identification

**Session Cards:**

Each active session displays as an interactive card:

**Status Indicator:**

**Visual Icon:**

- ✅ Check icon (green) for ended/completed sessions
- 🟢 Green dot for ongoing sessions
- ⏸️ Pause icon for temporarily held sessions

**Status Messages:**

**Session Ended:**

- Message: "Session is ended. Scheduling required."
- Indicates provider finished, but follow-up needed
- May need to schedule next appointment
- Transition state before full completion

**Session In Progress:**

- Message: "Session in progress"
- Normal active consultation state
- Provider and patient connected
- Video call ongoing

**Waiting for Provider:**

- Message: "Waiting for provider"
- Patient in session room
- Provider has not yet joined
- Coordinator may need to check provider status

**Participants Section:**

**Patient Details:**

- Patient full name
- Role designation: "(patient)"
- Patient avatar or initials
- Example: "Cody PatientOne (patient)"

**Provider Details:**

- Provider full name
- Role designation: "(provider)"
- Provider avatar or initials
- Example: "Cody ProviderOne (provider)"

**Additional Participants (if applicable):**

- Coordinator assisting
- Specialist consulted
- Interpreter present
- Family member (with consent)

**Session Duration Timer:**

**Real-Time Counter:**

- Format: "7d 6h 24m" (days, hours, minutes)
- Or: "45m" for shorter sessions
- Or: "2h 15m" for typical lengths
- Live updating (increments every minute)
- Starts when session begins
- Continues until session officially ended

**Duration Alerts:**

- Green: 0-30 minutes (normal)
- Blue: 30-60 minutes (extended)
- Amber: 60+ minutes (long session, may need follow-up)
- Red: Unusually long (technical issue? abandoned session?)

**Session Metrics:**

- Average session duration displayed
- Comparison to typical length for service type
- Billable time tracking

**Card Interaction:**

**Click for Details:**

- Card is interactive/clickable
- Click anywhere on card to expand full session view
- Opens session detail overlay or panel

**Session Detail View:**

Once clicked, expanded view shows:

**Full Session Information:**

- Session ID (unique identifier)
- Start time (timestamp)
- Current duration
- Service type
- Scheduled duration vs. actual
- Location metadata (timezones)

**Participant Details:**

- Full patient profile link
- Full provider profile link
- Contact methods
- Session history between these users

**Technical Status:**

- **Connection Quality:**
  - Excellent (green)
  - Good (blue)
  - Fair (yellow)
  - Poor (red)
- **Audio/Video Status:** Both participants connected
- **Bandwidth Usage:** Current utilizations
- **Device Information:** Browser, OS, device type

**Session Actions (Coordinator Capabilities):**

**Join Session (if enabled):**

- Coordinator can join to assist
- Technical support
- Resolve issues
- Escort/facilitate
- Requires provider permission

**Message Participants:**

- Send message to provider
- Send message to patient
- Coordinate assistance
- Share information

**End/Transfer Session:**

- Emergency end session if needed
- Transfer to different provider
- Escalate to supervisor
- Technical intervention

**Flag for Review:**

- Mark session for quality review
- Indicate technical issues
- Note for follow-up
- Compliance monitoring

**Generate Report:**

- Export session details
- Billing information
- Duration tracking
- Technical logs

### Real-Time Features

**WebSocket Connection:**

- Persistent connection to server
- Event subscription: "dispatcher:start"
- Instant updates without polling
- Reduces server load

**Live Updates:**

- New requests appear instantly
- Waiting rooms update in real-time
- Active sessions counter live
- Status changes immediate
- No page refresh required

**Notifications:**

**Visual Notifications:**

- Flashing badge on relevant panel
- Color change to draw attention
- Card animations when added
- Count increments visually

**Audio Notifications:**

- **New Request:** Chime or alert sound
- **Long Wait:** Escalating alert tone
- **Session Issue:** Attention sound
- **Configurable:** Can mute or adjust volume

**Browser Push Notifications:**

- Even when not focused on Command Center tab
- Desktop notifications
- "New appointment request"
- "Patient waiting 15+ minutes"
- Click notification to focus Command Center

**Coordinator Actions from Command Center:**

Beyond what's visible in each panel, coordinators can:

**Direct Actions:**

- Assign provider to waiting patient (one-click)
- Accept/reject appointment requests
- Message any participant
- Join sessions for assistance (if enabled)
- End or transfer sessions
- Flag issues for escalation

**Analytical Actions:**

- View session statistics
- Generate reports:
  - Sessions per day/week
  - Average wait times
  - Provider utilization
  - Patient satisfaction metrics
- Export data for analysis
- Identify trends and bottlenecks

**Administrative Actions:**

- Escalate to supervisor
- Contact technical support for platform issues
- Override assignments if needed
- Emergency protocols

---

## Schedule Session Workflow

Comprehensive multi-step process for scheduling appointments for any patient in the system.

### Overview

Coordinators can schedule appointments from:

- Dashboard "Schedule session" button
- Patient Directory (CalendarPlus icon)
- Command Center (when accepting requests)
- Provider Directory
- Past Sessions (schedule follow-up)

### Accessing Workflow

**Entry Points:**

1. **From Dashboard:**
   - Click "Schedule session" button
   - Opens workflow with blank form

2. **From Patient Directory:**
   - Click CalendarPlus icon on patient row
   - Opens workflow with patient pre-filled

3. **From Command Center:**
   - Accept appointment request
   - Opens workflow with request details pre-filled

4. **From Provider Directory:**
   - Schedule with specific provider
   - Opens workflow with provider pre-filled

5. **From Past Sessions:**
   - Click "Schedule follow-up" in session details
   - Opens workflow with patient and context pre-filled

### Step-by-Step Workflow

---

#### Step 1: Patient Selection

**If Not Pre-Filled:**

**Patient Search:**

- Search bar: "Search patient by name, email, phone"
- Autocomplete dropdown with matching patients
- Shows patient avatar, name, and ID
- Click to select patient

**Patient Not Found:**

- "Patient not found" message
- **Add New Patient** button
  - Opens patient registration form
  - Collect: Name, DOB, Email, Phone, Address
  - Create account and proceed
  - Send invitation email to patient

**Selected Patient Display:**

- Patient name and ID prominently displayed
- Patient avatar
- Contact information shown
- **Change Patient** button to reselect

**Patient Information Review:**

- Verify contact information current
- Check insurance on file
- Review any special needs or notes
- Language preference
- Accessibility requirements

**Continue Button:**

- Validates patient selected
- Proceeds to Step 2

---

#### Step 2: Provider Selection

**Search & Filter Interface:**

**Search Providers:**

- Search bar: "Search providers"
- Real-time filtering
- Search by name, specialty, languages

**Filter Options:**

- **Specialty Dropdown:**
  - Match provider to patient needs
  - Filter by relevant specialties
  - "All Specialties" option
- **Language Filter:**
  - Match patient language preference
  - Ensure effective communication
- **Availability Filter:**
  - Only show providers with availability
  - For selected date/time range

**Provider List Display:**

Each provider card shows:

- Provider name and photo
- Specialty
- Languages spoken
- Availability status (Online, Offline, Busy)
- **View Schedule** link
- **Select** button

**View Provider Schedule:**

- Opens calendar view for provider
- Shows existing appointments
- Available time slots highlighted
- Block-out times shown
- Can select time directly from this view

**Select Provider:**

- Click "Select" button on provider card
- Provider added to appointment
- Provider details displayed
- **Change Provider** option remains

**"First Available" Option:**

- Checkbox to assign first available provider
- System auto-assigns based on:
  - Specialty match
  - Language match
  - Earliest availability
  - Provider preferences
- Coordinator doesn't manually select

**Continue Button:**

- Validates provider selected or "First Available" checked
- Proceeds to Step 3

---

#### Step 3: Date & Time Selection

**Calendar Interface:**

**Date Picker:**

- Interactive monthly calendar
- Month/Year dropdowns
- Previous/Next navigation
- "Today" quick button
- Visual highlighting of selected date
- Dates with availability highlighted
- Unavailable dates crossed out or grayed

**Time Slot Selection:**

**Available Times Display:**

- Slots shown in 15 or 30-minute increments
- Morning/Afternoon/Evening groupings
- Each slot shows:
  - Time (e.g., "09:00 AM - 09:30 AM")
  - Provider availability confirmation
  - Conflict indicators if any

**Time Slot Appearance:**

- **Available:** Green/clickable
- **Not Available:** Gray/disabled
- **Preferred:** Blue outline (patient's stated preference)
- **Selected:** Highlighted/checked

**Duration Selection:**

- Dropdown or radio buttons
- Standard durations:
  - 15 minutes (quick follow-up)
  - 30 minutes (standard consultation)
  - 45 minutes (complex issue)
  - 60 minutes (comprehensive visit)
  - Custom (specify minutes)
- Affects time slot display and conflicts

**Timezone Confirmation:**

**Timezone Display:**

- Shows detected coordinator timezone
- Format: "(GMT-07:00) Mountain Standard Time - Phoenix"
- Shows current time in that timezone

**Patient Timezone:**

- Displays patient's timezone if different
- Format: "(GMT-05:00) Eastern Standard Time"
- Appointment time shown in both timezones
- Confirmation: "Patient will see: 12:00 PM EST"

**Change Timezone Option:**

- If patient traveling
- If scheduling for different location
- Dropdown to select alternate timezone
- Important for accuracy

**Conflict Detection:**

If selected time conflicts:

- Visual warning indicator
- Message: "Provider has another appointment"
- Or: "Outside provider's working hours"
- Or: "Patient has conflicting appointment"
- Suggest alternative times nearby

**Continue Button:**

- Validates date, time, and duration selected
- Confirms no conflicts
- Proceeds to Step 4

---

#### Step 4: Session Details

**Visit Type Selection:**

**Dropdown or Radio Buttons:**

- **Routine Visit:** Standard consultation
- **Urgent Care:** Same-day need, higher priority
- **Follow-up:** Related to previous visit
- **Consultation:** New issue, may need specialist
- **Prescription Refill Discussion:** Medication management
- **Lab Review:** Discuss test results
- **Second Opinion:** Seeking additional input
- **Therapy Session:** Mental health appointment
- **Other:** Free text description

**Visual Icon** for each visit type for quick recognition

**Reason for Visit:**

**Text Area:**

- Label: "Reason for visit" or "Chief complaint"
- Placeholder: "Describe the reason for this appointment"
- Character limit: 500-1000 characters
- Required field

**What to Include:**

- Patient's stated symptoms or concerns
- Duration of symptoms
- Relevant context
- What prompted scheduling
- Patient's goals for visit

**Examples:**

- "Patient reports persistent headaches for 3 days"
- "Follow-up on hypertension medication adjustment"
- "Routine annual physical examination"
- "Rash on forearm, appeared 2 days ago"

**Special Requirements:**

**Interpreter Needed:**

- Checkbox: "Interpreter required"
- If checked:
  - Language dropdown
  - Dialect if applicable
  - Arrange interpreter service
  - Additional time may be needed

**Accessibility Needs:**

- Checkbox: "Patient has accessibility needs"
- If checked:
  - Free text description
  - Examples: Hearing-impaired, requires captions, sign language
  - Arrange accommodations

**Equipment/Test Requirements:**

- Checkbox: "Tests or equipment needed"
- If checked:
  - Specify tests (e.g., "Blood pressure check via remote Vitals device")
  - Equipment needs
  - Coordinator arranges in advance

**Family Member/Caregiver Present:**

- Checkbox: "Family member will join session"
- Note name of person joining
- Ensure patient consent documented

**Insurance Information:**

**Insurance Verification:**

- Display insurance on file for patient
- Confirm coverage for service type
- Copay amount displayed
- **Verify Insurance** button:
  - Real-time eligibility check (if integrated)
  - Confirm active coverage
  - Identify any authorization needs

**No Insurance:**

- "Patient self-paying" option
- Indicate payment method if required upfront
- Fee schedule displayed

**Notes/Comments (Optional):**

**Free Text Area:**

- "Additional notes for provider"
- Coordinator can add context
- Information that doesn't fit other fields
- Special considerations
- Patient preferences

**Internal Notes:**

- Not visible to patient
- Visible to provider and coordinators
- Administrative notes
- Cautions or alerts

**Continue Button:**

- Validates required fields completed
- insurance verified
- Proceeds to Step 5

---

#### Step 5: Confirmation & Review

**Summary of All Details:**

**Appointment Summary Card:**

**Date & Time:**

- Full date: Day, Month Date, Year
- Start time
- End time
- Duration
- Timezone confirmation

**Patient Information:**

- Patient name and ID
- Email address
- Phone number
- Insurance provider

**Provider Information:**

- Provider name
- Specialty
- Or "First Available Provider" if applicable

**Visit Details:**

- Visit type
- Reason for visit summary
- Special requirements:
  - Interpreter (if needed)
  - Accessibility accommodations
  - Equipment/tests arranged

**Confirmation Options:**

**Send Notifications:**

- **Email Confirmation:** Checkbox (checked by default)
  - Sends to patient email
  - Full appointment details
  - Calendar file (.ics) attached
  - How to join instructions

- **SMS Confirmation:** Checkbox (checked by default if phone on file)
  - Text message with appointment details
  - Link to full details
  - Reminder that email also sent

- **Provider Notification:** Checkbox (checked by default)
  - Email to provider
  - New appointment on calendar
  - Patient information summary
  - Reason for visit

**Actions:**

**Edit Button:**

- Return to any previous step
- Modify information
- All entered data preserved
- Navigation breadcrumbs show current step

**Confirm Button (Primary Action):**

- Large, prominent green button
- Label: "Confirm Appointment" or "Schedule Session"
- Click to finalize booking
- Processing indicator appears

**Cancel Button:**

- Secondary button
- "Cancel" or "Abandon Booking"
- Confirmation dialog:
  - "Are you sure you want to cancel?"
  - "All entered information will be lost"
  - "Yes, Cancel" / "No, Continue Booking"
- Returns to dashboard or previous page

**Add to Calendar:**

- Checkbox: "Add to my coordinator calendar"
- Adds appointment to coordinator's own schedule
- Useful for tracking or follow-up

**Processing:**

- Loading spinner "Scheduling appointment..."
- Behind the scenes:
  - Appointment created in database
  - Provider's calendar updated
  - Patient's calendar updated
  - Notifications queued for sending
  - Command Center updated (removed from requests if applicable)
  - Unique appointment ID generated

---

### Post-Creation Confirmation

**Confirmation Screen:**

**Success Message:**

- ✅ Large checkmark icon
- "Appointment Successfully Scheduled!"
- Encouragement message

**Appointment Details Card:**

Displays finalized information:

- **Appointment ID:** Reference number (e.g., "APT-789456")
- **Date & Time:** With timezone
- **Patient Name:** With ID
- **Provider Name:** (or "To be assigned")
- **Service Type**
- **Duration**

**Next Steps Information:**

**For Patient:**

- "The patient will receive a confirmation email shortly"
- "Patient should join 5 minutes early"
- "Patient will receive reminders 24 hours and 1 hour before"

**For Provider:**

- "Provider has been notified"
- "Appointment added to provider's calendar"

**Actions:**

**Print Appointment Details:**

- Print button (printer icon)
- Generates printer-friendly format
- Can provide to patient if in clinic

**Email Details to Coordinator:**

- Send copy to self
- Keep in your records

**Schedule Another Appointment:**

- Quick button to repeat workflow
- Returns to Step 1
- Patient field may be pre-filled if scheduling for same patient

**Return to Dashboard:**

- Default action
- Go back to main coordinator dashboard
- New appointment appears in today's schedule (if scheduled for today)

**View in Command Center:**

- Link to Command Center
- See appointment in monitoring system
- Especially useful if appointment starting soon

### Notification Delivery

**Email Confirmation (Patient):**

Sent immediately to patient's email:

- **Subject:** "Appointment Confirmed - [Date]"
- Full appointment details
- Provider information
- How to join instructions:
  - "Click the Join button on your dashboard at appointment time"
  - "You can join up to 5 minutes early"
- Tech check link
- Reschedule/Cancel link
- .ics calendar attachment

**SMS Confirmation (Patient):**

Text message sent:

- "Appointment confirmed for [Date] at [Time] with [Provider]"
- "We'll send you a reminder 1 hour before"
- Link to full details
- Short link to patient portal

**Provider Notification:**

Email to provider:

- **Subject:** "New Appointment Scheduled - [Date]"
- Patient name and brief background
- Reason for visit
- Date, time, duration
- Link to patient chart
- Calendar invitation (.ics)

**Reminder Schedule:**

**For Patient:**

- **24 Hours Before:**
  - Email: "Your appointment is tomorrow"
  - Include preparation tips
  - Tech check reminder
- **1 Hour Before:**
  - Email and SMS: "Your appointment is in 1 hour"
  - Quick-join link
- **5 Minutes Before:**
  - In-app notification (if patient logged in)
  - "Your appointment is starting soon - Join Now"

**For Provider:**

- **1 Hour Before:**
  - Email: "Upcoming appointment in 1 hour"
  - Patient name and reason for visit
  - Quick link to review patient chart
- **5 Minutes Before:**
  - In-app notification
  - Sound alert
  - "Patient may be joining soon"

### Calendar Integration

**Patient Calendar:**

- Appointment added to patient's in-app calendar
- Visible on patient dashboard
- Patient can download .ics for personal calendar

**Provider Calendar:**

- Automatically added to provider's schedule
- Blocks time on availability
- Prevents double-booking
- Provider calendar sync (Google/Outlook if configured)

**Coordinator Records:**

- If "Add to my calendar" checkmarks, added to coordinator's view
- Visible in daily schedule on dashboard
- Can track all appointments scheduled by self

**Command Center Update:**

- If scheduled from a Request, request removed from queue
- Appointment added to monitoring system
- Visible when time approaches
- Will appear in Active Sessions when patient/provider join

---

## Notifications

Real-time alerting system keeping coordinators informed of important events and activities.

### Notification Bell Icon

**Location:**

- Top-right corner of interface
- Next to profile avatar
- Always visible across all pages

**Bell Icon Display:**

- Bell icon
- If unread notifications: Red badge with count
- Example: Bell icon with "5" badge

**Click Behavior:**

- Click bell to open notifications dropdown
- Shows recent notifications in chronological order
- Most recent at top

### Notification Types

Coordinators receive notifications for various events:

#### 1. New Appointment Requests

- **Trigger:** Patient submits new appointment request
- **Priority:** High
- **Message:** "New appointment request from [Patient Name]"
- **Action:** Click to view in Command Center Requests panel
- **Alert:** Audio chime if coordinator has sound enabled
- **Frequency:** Real-time, immediate

#### 2. Session Alerts

**Session Starting:**

- **15 Minutes Before:** "Session starting soon: [Patient] and [Provider] at [Time]"
- **At Start Time:** "Session started: [Patient] and [Provider]"
- Helps coordinator ensure sessions begin smoothly

**Session Ending:**

- "Session ended: [Patient] and [Provider], duration [X minutes]"
- May require follow-up actions
- Billing/documentation prompts

**Session Issues:**

- **Technical Problems:** "Technical issue reported in session [Session ID]"
- **Extended Time:** "Session has exceeded expected duration: [Session ID]"
- **Provider No-Show:** "Provider has not joined session [Session ID], patient waiting"
- **Patient Disconnected:** "Patient disconnected from session [Session ID]"

#### 3. Provider Status Changes

- **Online:** "[Provider Name] is now online"
- **Offline:** "[Provider Name] has gone offline"
- **Busy:** "[Provider Name] entered a session"
- **Available Again:** "[Provider Name] is available"

**Usefulness:**

- Track provider availability
- Know who to assign to waiting patients
- Staffing level awareness

#### 4. Patient Arrivals in Waiting Room

- **Trigger:** Patient joins waiting room
- **Priority:** High
- **Message:** "[Patient Name] has entered the waiting room"
- **Action:** Click to view in Command Center Waiting Rooms panel
- **Alert:** Audio alert after 5 minutes if unassigned

**Escalating Alerts:**

- **5 Minutes:** Gentle chime
- **10 Minutes:** Moderate alert sound
- **15+ Minutes:** Louder, attention alert
- **Visual:** Waiting room counter flashes

#### 5. System Messages

- Platform updates
- Scheduled maintenance notices
- New features announced
- Policy changes
- Important announcements from administration

### Notification Priority Levels

**Critical (Red):**

- Urgent appointment requests
- Session issues requiring immediate attention
- Security alerts
- System errors affecting service

**Characteristics:**

- Red badge color
- Persistent alert (doesn't auto-dismiss)
- Audio alert
- Desktop push notification
- Requires acknowledgment

**High (Orange):**

- Patients waiting beyond threshold (15+ minutes)
- Provider no-show for scheduled appointment
- Appointment cancellations
- Important provider status changes

**Characteristics:**

- Orange badge color
- Stays until read
- Audio notification
- Desktop push notification

**Medium (Blue):**

- Upcoming scheduled sessions (15 minutes out)
- Provider availability changes
- Appointment requests (non-urgent)
- Session completions

**Characteristics:**

- Blue badge color
- Stays in list until read
- Optional audio
- May appear as desktop notification

**Low (Gray):**

- General notifications
- System updates
- Educational content
- Platform tips

**Characteristics:**

- Gray badge color
- May auto-dismiss after period
- No audio
- Doesn't trigger desktop notification

### Notification Panel Interface

**Opening the Panel:**

- Click bell icon in top-right
- Dropdown appears below bell
- Overlay dims background slightly

**Panel Display:**

**Header:**

- "Notifications" title
- **Mark all as read** button (clears badges)
- **Settings icon** to configure preferences
- **Close button (X)** to dismiss panel

**Notification List:**

- Chronological order (newest first)
- Each notification shows:
  - Type icon (request, waiting room, session, provider, system)
  - Title/summary
  - Timestamp (e.g., "5 minutes ago", "1 hour ago", "Yesterday")
  - Read/unread indicator (bold if unread)
- Click notification to navigate to relevant section

**Actions:**

- Click notification: Navigate to source (Command Center, Dashboard, etc.)
- Hover: **X icon** appears to dismiss individual notification
- Mark as read individually or all at once

**Empty State:**

- When no notifications:
  - Icon (checkmark or inbox)
  - Message: "You're all caught up!"
  - Encouraging message

**Pagination:**

- Shows recent 20-50 notifications
- **View All** link to see full history
- **Clear All** button to dismiss all

### Real-Time Alert Behavior

**Audio Notifications:**

- **Chime:** New appointment request
- **Beep:** Patient joins waiting room
- **Bell tone:** Upcoming session reminder
- **Alert sound:** Escalation (patient waiting 15+ minutes)
- **Urgent alarm:** Critical issue

**Volume Control:**

- Adjustable in notification settings
- Mute option
- Different volumes for different priorities

**Desktop/Browser Push Notifications:**

- **Even when Command Center not in focus:**
  - Notifications appear as OS-level alerts
  - Windows notification drawer
  - macOS notification center
  - Browser push notifications

- **Clicking Notification:**
  - Brings platform to focus
  - Navigates to relevant section automatically

- **Permission Required:**
  - First time: Browser prompts for notification permission
  - Must click "Allow"
  - Can be revoked in browser settings

**Visual Alerts:**

- **Badge Counter:** Red badge on bell icon with unread count
- **Flashing Indicator:** Command Center panel counters flash on new items
- **Color Changes:** Panel background briefly highlights when new notification
- **Animation:** Subtle animations draw eye to new items

### Notification Settings

**Accessing Settings:**

- Click bell icon → Settings icon
- Or: Profile menu → Account Settings → Notifications tab

**Configuration Options:**

**Enable/Disable Channels:**

- ☑️ Email notifications
- ☑️ SMS notifications
- ☑️ In-app notifications
- ☑️ Desktop push notifications
- ☑️ Audio alerts

**Customize Per Event Type:**

- Choose which events trigger which channels
- Example:
  - Appointment Requests: All channels
  - Session Alerts: In-app + Desktop only
  - Provider Status: In-app only
  - System Messages: Email only

**Quiet Hours:**

- Set time range for reduced notifications
- Example: 10:00 PM - 7:00 AM
- Only critical alerts during quiet hours
- Useful for coordinators with flexible schedules

**Frequency:**

- Instant: As events occur
- Digest: Batch notifications every 30 mins, hour, etc.
- Daily summary: Once per day email

---

## Profile Menu

Located in the top-right corner, the profile menu provides access to account management and platform resources.

### Accessing Profile Menu

**Profile Avatar:**

- Displays user initials (e.g., "CC" for Coordinator)
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

- **Full Name:** Coordinator's complete name
- **Email Address:** Account email
- Visual identification at top of menu

#### 2. Account Settings (SettingsGear icon)

- Opens Account Settings modal
- Manage profile and notifications
- Two tabs: My Account and Notifications

#### 3. Help (InfoCircle icon)

- Access help documentation
- Coordinator guides and training materials
- Command Center usage tutorials
- Scheduling best practices
- FAQ section
- Contact support information

#### 4. Privacy Policy (Policy icon)

- View complete privacy policy
- HIPAA compliance information
- Terms of service
- Data handling and security
- Staff confidentiality requirements

#### 5. Log Out (LogOut icon)

- End current session
- Secure logout from platform
- Returns to login screen
- Clears session data
- Important: Always log out on shared workstations

---

## Account Settings

Manage personal profile information and notification preferences through a modal interface.

### Accessing Account Settings

1. Click profile avatar in top-right corner
2. Select "Account settings" from dropdown menu
3. Modal opens with tab navigation

### Account Settings Navigation

Two tabs available for Coordinators:

- **My Account** - Profile and personal information
- **Notifications** - Notification preferences

---

### My Account Tab

Comprehensive profile management for coordinator account.

#### Profile Photo Section

**Options:**

- **Upload photo button** (Download icon)
  - Select image from computer
  - Supported formats: JPG, PNG, GIF
  - Recommended size: 400x400px minimum
  - Square images work best
  - Automatically resizes and crops

- **Delete photo button** (Trash icon)
  - Removes current profile photo
  - Reverts to initials avatar
  - Confirmation prompt before deletion

**Current Display:**

- Circular avatar with initials or photo
- Coordinator's full name below avatar
- Email address below name

#### Profile Details Section

**Editable Fields:**
Click "Edit" button (Edit icon) to modify:

**Personal Information:**

1. **First Name**
   - Coordinator's given name
   - Required field
   - Used in system communications

2. **Last Name**
   - Coordinator's family name
   - Required field

**Contact Information:**

3. **Country**
   - Country dropdown selection
   - Used for address formatting
   - Shows "N/A" if not set

4. **State**
   - State/Province selection
   - Dependent on country selected
   - Shows "N/A" if not set

5. **City**
   - Free text field
   - Optional
   - Shows "N/A" if empty

6. **Zip Code**
   - Postal code field
   - Format depends on country
   - Optional
   - Shows "N/A" if empty

7. **Address 1**
   - Primary street address
   - Optional
   - Shows "N/A" if empty

8. **Address 2**
   - Secondary address line
   - Optional
   - Shows "N/A" if empty

9. **Phone Number**
   - Contact phone number
   - Format: (+X) XXXXXXXXXX
   - Used for internal communications
   - Shows "N/A" if not provided

**Edit Modal:**

- Opens when clicking Edit button
- All fields displayed in form layout
- **Save changes** button to confirm
  - Validates required fields
  - Shows success message
  - Updates profile immediately
- **Cancel** button to discard changes
  - Confirmation if changes made
  - Returns to view mode
- Real-time validation on required fields
- Error messages for invalid formats

#### Application Language

**Language Selector:**

- Current language displayed with flag icon
- **"Change language" link**
  - Opens language selection dialog
  - Available languages: English, Spanish, and more
  - Changes UI language instantly
  - User preference saved to profile
  - Affects all communications

**Language Display:**

- Flag icon representing current language
- Language name in full (e.g., "English")
- Visual indicator of active language

#### Time Zone

**Timezone Settings:**

- Current timezone with GMT offset
- Format: "(GMT-07:00) Mountain Standard Time - Phoenix - 08:14 PM"
- Shows current local time in selected timezone
- **"Change time zone" link**
  - Opens timezone selection dialog
  - Searchable/scrollable list of timezones
  - Organized by geographic region
  - Critical for scheduling accuracy

**Importance:**

- Ensures appointments displayed in correct local time
- Affects when notifications are sent
- Important for coordinating across timezones
- Especially critical when scheduling for patients in different zones

#### Account Deletion

**Delete Account Section:**

- "Delete account" link at bottom of settings
- **Warning:** This action impacts patient care operations
- Opens confirmation dialog with consequences:
  - Access to coordination tools removed
  - Cannot be assigned to sessions
  - Cannot be recovered
- Requires administrative approval typically
- Alternative: Contact admin for account deactivation

---

### Notifications Tab

Configure how and when to receive alerts about appointments, sessions, and platform events.

#### Overview

**Description:**
"Manage your notification preferences for coordination activities"

Control which notification methods you receive, configure alert types, and set thresholds for escalations.

#### Notification Methods Section

Configure which channels receive notifications:

##### 1. Email Notifications

**Display:**

- "Email" heading
- Your registered email address shown
- Toggle checkbox to enable/disable

**Settings:**

- **Enabled (checked):** Receive notifications via email
- **Disabled (unchecked):** No email notifications
- Click anywhere on row to toggle

**What Coordinators Receive:**

- New appointment requests
- Patient waiting room alerts
- Session status updates
- Provider availability changes
- System announcements
- Daily schedule summaries
- Reports and analytics

**Email Delivery:**

- Sent to coordinator's registered email
- HTML formatted with actionable links
- Quick links to Command Center
- Summary digests available

##### 2. SMS Notifications

**Display:**

- "SMS" heading
- Phone number if added, or "Add phone number" link
- Toggle checkbox (disabled until phone number added)

**Setup Process:**

1. Click "Add phone number" link
2. Enter phone number with country code
3. Click "Send verification code"
4. Check phone for SMS with 6-digit code
5. Enter verification code in platform
6. Phone number verified and linked
7. Enable SMS notifications toggle

**Settings:**

- **Enabled:** Receive text message alerts
- **Disabled:** No SMS notifications
- Checkbox disabled (grayed out) until phone verified
- Can update phone number anytime

**What Coordinators Receive:**

- Critical alerts (patients waiting 15+ minutes)
- Urgent appointment requests
- Session issues requiring attention
- Provider no-show alerts
- Emergency notifications

**SMS Content:**

- Concise messages (character limits)
- Essential information only
- Links to Command Center or relevant section
- Quick action options

##### 3. In-App Notifications

**Display:**

- "In-app" heading
- Toggle checkbox to enable/disable

**Settings:**

- **Enabled (checked):** Show browser/system notifications
- **Disabled (unchecked):** No in-app popups

**In-App Behavior:**

- Notification bell badge counter
- Desktop notifications when platform not focused
- Sound alerts (configurable by priority)
- Real-time updates in Command Center
- Vibration on mobile devices (if supported)

**Notification Bell:**

- Click to view all in-app notifications
- Chronological list of recent alerts
- Read/unread indicators
- Click notification to navigate to source
- "Clear all" button to mark all as read
- Badge shows unread count

**Browser Permission:**

- First time enabling: browser prompts for permission
- Must click "Allow" in browser notification permission popup
- Can be revoked in browser settings anytime
- Re-enabling requires granting permission again

**Types of In-App Notifications:**

- New appointment requests
- Patients entering waiting rooms
- Session status changes
- Provider availability updates
- Long wait time alerts
- Session completion notices

#### Notification Categories Section

**Customize Which Events Trigger Notifications:**

##### Appointment Requests

**Settings:**

- **Email:** ☑️ Enabled
- **SMS:** ☑️ Enabled (for urgent)
- **In-App:** ☑️ Enabled
- **Desktop Push:** ☑️ Enabled

**Threshold:**

- Instant notification for all new requests
- Escalation reminder if not handled within 10 minutes

##### Waiting Room Alerts

**Settings:**

- **Email:** ☐ Disabled (too frequent)
- **SMS:** ☑️ Enabled (for escalations)
- **In-App:** ☑️ Enabled
- **Desktop Push:** ☑️ Enabled
- **Audio:** ☑️ Enabled

**Thresholds:**

- **5 Minutes:** In-app notification
- **10 Minutes:** Desktop push + audio alert
- **15 Minutes:** SMS + louder audio alert
- **20+ Minutes:** Critical alert + escalation

##### Session Alerts

**Settings:**

- **Email:** ☑️ Enabled (for summaries)
- **SMS:** ☑️ Enabled (for critical only)
- **In-App:** ☑️ Enabled
- **Desktop Push:** ☑️ Enabled

**Alert Types:**

- Session starting soon (15 minutes)
- Provider hasn't joined (patient waiting)
- Session ended
- Technical issues reported
- Extended session duration

##### Provider Status Changes

**Settings:**

- **Email:** ☐ Disabled
- **SMS:** ☐ Disabled
- **In-App:** ☑️ Enabled
- **Desktop Push:** ☐ Disabled

**Notifications:**

- Provider goes online
- Provider goes offline
- Provider becomes available after session

##### System Messages

**Settings:**

- **Email:** ☑️ Enabled
- **SMS:** ☐ Disabled
- **In-App:** ☑️ Enabled
- **Desktop Push:** ☐ Disabled

**Content:**

- Platform updates
- Scheduled maintenance
- New features
- Policy changes

#### Audio Alert Settings

**Configure Sound Notifications:**

**Enable Audio Alerts:**

- Master toggle: ☑️ Enabled / ☐ Disabled

**Volume Control:**

- Slider from 0% to 100%
- Test button to hear sample
- Recommended: 70-80%

**Alert Sounds by Priority:**

- **Critical:** Loud, urgent alarm
- **High:** Attention chime
- **Medium:** Soft notification sound
- **Low:** Muted or disabled

**Custom Sounds (if available):**

- Choose from sound library
- Upload custom alert sounds
- Different sounds for different event types

**Quiet Hours:**

- Set time range for muted audio
- Example: 10:00 PM - 7:00 AM
- Visual notifications still appear
- Critical alerts may override

#### Digest Settings

**Email Digest Configuration:**

**Send Daily Summary:**

- Toggle: ☑️ Enabled
- **Time:** Dropdown (e.g., "8:00 AM" daily)
- **Content:**
  - Number of appointment requests handled
  - Total sessions coordinated
  - Average wait times
  - Provider utilization
  - Issues flagged
  - Action items for next day

**Weekly Report:**

- Toggle to enable/disable
- Sent every Monday morning
- Comprehensive week-in-review

#### Do Not Disturb Mode

**Enable DND:**

- Toggle: ☐ Off / ☑️ On
- **When Enabled:**
  - All non-critical notifications muted
  - Only emergency alerts allowed
  - Visual indicator in app that DND is on
- **Use Cases:**
  - During focused work
  - In meetings
  - Off-duty hours
- **Critical Override:**
  - Critical alerts still come through
  - Configurable: Allow escalations even in DND

**Schedule DND:**

- Automatically enable during set hours
- Example: Weekdays 6:00 PM - 8:00 AM, All day weekends

---

## Best Practices

Guidelines for effective coordination, optimal patient care, and efficient platform usage.

### Daily Workflow

**Start of Shift:**

**Check Command Center:**

- Open Command Center first thing
- Review current state:
  - Any pending requests overnight
  - Patients in waiting rooms
  - Active sessions status
- Prioritize any urgent items

**Review Daily Schedule:**

- Check schedule for all providers under your coordination
- Identify peak times
- Note any scheduled breaks or provider unavailability
- Anticipate busy periods

**Monitor Waiting Room Thresholds:**

- Set personal target: No patient waits > 5 minutes for scheduled
- No patient waits > 15 minutes for on-demand
- Check Command Center every 15-30 minutes minimum
- During busy periods: check every 5-10 minutes

**Proactive Provider Assignment:**

- Assign providers to waiting patients immediately
- Don't wait for alerts
- Balance workload across providers
- Consider provider specialties and patient needs

**End-of-Day Session Reconciliation:**

- Review all sessions completed during shift
- Ensure all ended properly
- Check for unfinished documentation
- Note any issues for follow-up
- Generate end-of-day report
- Hand off outstanding items to next shift

### Scheduling Best Practices

**Verify Patient Identity:**

- Always confirm patient identity before booking
- Check:
  - Full name
  - Date of birth
  - Email or phone number
- Distinguish between similar names
- Use patient ID for confirmation

**Confirm Provider Availability:**

- Double-check provider's schedule
- Look for conflicts
- Confirm provider hasn't blocked time
- Check provider preferences:
  - Specialty match
  - Language capabilities
  - Workload balance

**Allow Buffer Time:**

- Don't schedule back-to-back appointments
- Leave at least 5-minute buffer between sessions
- Allows provider to:
  - Complete documentation
  - Take brief break
  - Handle overruns
- Reduces patient wait times

**Consider Patient Timezone:**

- Always verify patient's timezone
- Confirm appointment time in patient's local time
- Use timezone-aware scheduling
- Double-check for daylight saving time differences

**Document Special Requirements:**

- Note in appointment details:
  - Interpreter needed
  - Specific equipment required
  - Family member joining
  - Accessibility accommodations
- Ensure arrangements made in advance
- Follow up to confirm accommodations ready

### Command Center Monitoring

**Check Frequency:**

- Minimum: Every 15-30 minutes
- During busy periods: Every 5-10 minutes
- Set reminders if needed
- Use audio alerts to supplement

**Respond to Requests Within 5 Minutes:**

- Aim to accept/decline requests within 5 minutes
- Shows respect for patient time
- Improves patient satisfaction
- Prevents request backlog

**Escalate Long Waits Immediately:**

- If patient waiting exceeds threshold:
  - 15 minutes: Immediate action
  - 20 minutes: Escalate to supervisor
  - 30 minutes: Critical escalation
- Message patient with updates
- Apologize for delay
- Provide estimated time
- Consider reassigning to different provider

**Track Session Completion:**

- Monitor active sessions
- Note unusually long sessions (may indicate issues)
- Check when sessions end:
  - Was follow-up scheduled?
  - Are notes being completed?
  - Any billing issues?

**Note Issues for Follow-Up:**

- Document any problems:
  - Technical difficulties
  - Patient or provider no-shows
  - Incomplete sessions
  - Complaints or concerns
- Create tickets or reports
- Ensure issues are resolved
- Track patterns and trends

### Communication

**Use Messages for Non-Urgent Provider Coordination:**

- Text chat for:
  - Quick questions
  - Schedule adjustments
  - Information sharing
  - Follow-up reminders
- Avoids interrupting provider's work
- Creates written record

**Use Video for Urgent Consultations:**

- Video call when:
  - Immediate response needed
  - Complex discussion required
  - Collaborative decision-making
  - Quick face-to-face preferable
- More efficient than back-and-forth messaging

**Keep Patients Informed of Delays:**

- Proactive communication is key
- If provider running late:
  - Message patient before delay significant
  - Provide realistic estimate
  - Offer to reschedule if delay too long
  - Apologize for inconvenience
- Sets expectations
- Reduces frustration

**Document All Significant Communications:**

- Log important conversations:
  - Patient complaints
  - Provider concerns
  - Schedule changes
  - Special arrangements
- Provides audit trail
- Protects all parties
- Aids in quality improvement

**Professional Tone in All Interactions:**

- Always courteous and respectful
- Clear and concise messaging
- Avoid medical jargon with patients
- Professional even under stress
- Represent organization well

### Provider Coordination

**Maintain Current Provider Schedule Knowledge:**

- Know each provider's schedule
- Aware of vacations, days off, breaks
- Understand working hours and timezone
- Track patterns of availability

**Balance Workload Across Providers:**

- Distribute appointments fairly
- Don't overburden any single provider
- Consider provider stamina (breaks needed)
- Monitor session counts per provider
- Rotate difficult cases

**Respect Provider Preferences and Specialties:**

- Match patient needs to provider expertise
- Honor provider's specialty areas
- Consider provider's stated preferences
- Don't assign outside scope unless necessary
- Communicate if assignment is unusual

**Quick Reassignment When Needed:**

- If provider unavailable or delayed:
  - Identify alternate provider quickly
  - Reassign smoothly
  - Notify patient of change
  - Provide reason if appropriate
- Minimize patient wait time

**Track Provider Availability Patterns:**

- Note when providers are typically available
- Identify busy and slow periods
- Anticipate staffing needs
- Report understaffing to management
- Suggest schedule adjustments if helpful

### Patient Management

**Keep Patient Records Current:**

- Update contact information when patient provides changes
- Note communication preferences
- Document special needs or accommodations
- Ensure demographics accurate

**Note Patient Preferences:**

- Preferred provider (if any)
- Preferred times or days
- Language preference
- Accessibility needs
- Cultural considerations

**Track No-Shows and Cancellations:**

- Document when patient doesn't show up
- Track patterns (frequent no-shows)
- Follow no-show policies:
  - Contact patient to reschedule
  - Send reminder about cancellation policy
  - Escalate if chronic issue
- May affect scheduling privileges

**Follow Up on Incomplete Sessions:**

- If session ends unexpectedly:
  - Contact patient and provider
  - Determine what happened
  - Reschedule if needed
  - Ensure care continuity
- Technical issues vs. deliberate disconnection

**Maintain Patient Satisfaction Focus:**

- Patient experience is priority
- Minimize wait times
- Communicate proactively
- Resolve issues quickly
- Solicit feedback
- Act on complaints constructively

### Documentation

**Log All Scheduling Actions:**

- Record every appointment scheduled
- Note changes and cancellations
- Document reasons for changes
- Maintain audit trail

**Document Escalations and Resolutions:**

- When escalating issues:
  - Describe problem clearly
  - Steps taken before escalation
  - Outcome and resolution
  - Lessons learned
- Helps prevent future occurrences

**Note Technical Issues:**

- When tech problems occur:
  - Description of issue
  - Which users affected
  - Workarounds attempted
  - Final resolution
- Report to IT or support
- Track recurring issues

**Track Metrics:**

- Important coordination metrics:
  - **Wait Times:** Average and maximum
  - **Session Counts:** Daily, weekly
  - **Provider Utilization:** Sessions per provider
  - **Patient Satisfaction:** Ratings and feedback
  - **No-Show Rate:** Percentage
  - **Cancellation Rate:** Last-minute cancellations
- Use for quality improvement
- Report to management

**Generate Regular Reports for Management:**

- Daily summaries
- Weekly reports
- Monthly analytics
- Include:
  - Volume metrics
  - Performance indicators
  - Issues and resolutions
  - Recommendations for improvement

### Security & Privacy

**Verify Patient Identity Before Discussing Appointments:**

- HIPAA compliance critical
- Confirm identity using:
  - Full name and DOB
  - Patient ID
  - Last four of SSN (if used)
  - Other verification questions
- Never discuss patient info with unverified callers

**Use Secure Channels for Sensitive Information:**

- Always use platform's secure messaging
- Don't email or text sensitive health information
- No discussing patient info in public areas
- Use encrypted communications

**Lock Workstation When Away:**

- Always lock computer when leaving desk
- Windows: Win + L
- macOS: Ctrl + Cmd + Q
- Prevents unauthorized access
- Required by HIPAA

**Follow HIPAA Compliance Protocols:**

- Complete regular HIPAA training
- Understand patient rights
- Know breach reporting procedures
- Only access information needed for your role
- Minimum necessary standard

**Report Security Concerns Immediately:**

- Suspected breaches
- Unauthorized access attempts
- Lost/stolen devices
- Suspicious activity
- Don't investigate alone—report to security team

---

## Summary

The Coordinator role serves as the backbone of healthcare operations within eNow2, providing:

- **Centralized Scheduling**: Appointment booking for all patients
- **Real-Time Monitoring**: Command Center for session oversight
- **Patient Flow Management**: Waiting room coordination and provider assignment
- **Provider Coordination**: Workload balancing and availability tracking
- **Communication Hub**: Facilitating interactions between patients and providers
- **Quality Assurance**: Tracking metrics and ensuring patient satisfaction

**Key Success Factors:**

- Proactive monitoring of Command Center
- Timely response to requests and alerts
- Effective communication with all parties
- Attention to detail in scheduling
- Strong organizational skills
- Patient-centered focus

For additional support, training materials, or questions about coordinator responsibilities, access Help from the profile menu or contact your administrative team.

---

[← Back to Role Index](./README.md)
