# Device Role - User Guide

**Role:** Device  
**Last Updated:** February 24, 2026  
**Application URL:** https://portal.qa-encounterservices.com

[← Back to Role Index](./README.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Login Process](#login-process)
3. [Navigation Menu](#navigation-menu)
4. [Dashboard](#dashboard)
5. [Session Experience](#session-experience)
6. [Notifications](#notifications)
7. [Profile Menu](#profile-menu)
8. [Account Settings](#account-settings)
9. [Device Management Best Practices](#device-management-best-practices)
10. [Limitations](#limitations)

---

## Overview

The Device role is designed for shared kiosk devices or tablets deployed in clinical locations such as clinics, pharmacies, or urgent care centers. Unlike other roles, Device users authenticate using a simple numeric Device ID rather than email/password credentials. This role provides a streamlined, patient-facing interface focused on joining scheduled appointments.

### Key Characteristics

- **Simplified Authentication**: Numeric Device ID only (no email/password)
- **Minimal Interface**: Dashboard only - no additional navigation
- **Shared Device**: Multiple patients use the same device
- **Restricted Access**: Cannot schedule appointments or browse directories
- **Clinical Setting**: Deployed in supervised healthcare locations
- **Patient-Facing**: Designed for walk-in patient use with staff assistance

### Intended Use Cases

- **Clinic Kiosks**: Waiting room check-in stations
- **Pharmacy Video Consults**: On-site telehealth services
- **Urgent Care Centers**: Quick access to remote providers
- **Hospital Departments**: Specialized consult rooms
- **Mobile Health Units**: Portable telehealth capability
- **Community Health Centers**: Serving populations without personal devices

### Device Deployment

**Typical Setup:**
- Tablet, all-in-one PC, or dedicated kiosk hardware
- Mounted or positioned in supervised clinical area
- Logged in once per day with Device ID
- Remains logged in for patient use throughout clinic hours
- Staff assist patients in joining their appointments

**Security Model:**
- No browsing capabilities beyond scheduled appointments
- Limited to viewing own appointment only (no patient directory)
- Cannot access medical records or scheduling functions
- Supervised by clinic staff
- HIPAA-compliant configuration

---

## Login Process

Unique authentication method using numeric Device ID instead of traditional credentials.

### Device ID Authentication

**Step-by-Step Login:**

1. **Navigate to Device Login:**
   - Go to `/login/device` endpoint
   - Or use "Device Login" link from main login page (if available)

2. **Login Screen Appears:**
   - **Heading:** "Device ID Access"
   - **Welcome Message:** "Welcome to eNOW! Please enter your device ID so that we can verify it."

3. **Enter Device ID:**
   - **Input Field:** "Device ID*" (required field)
   - Numeric input only
   - Examples: "11111", "22222", "33333"
   - No letters or special characters

4. **Verify Device:**
   - Click **"Verify Device ID"** button
   - System validates the numeric ID
   - Grants access if valid

5. **Access Granted:**
   - Redirected to Device Dashboard
   - Device name displayed in profile
   - Ready for patient use

### Login Screen Elements

**Visual Components:**

- **eNOW Logo/Branding:** Top of page
- **Welcome Message:** Friendly greeting
- **Input Field:**
  - Label: "Device ID*"
  - Placeholder: Numeric input
  - Required field indicator (asterisk)
  - Single input field (no password)
- **Primary Button:** "Verify Device ID"
  - Large, prominent button
  - Primary action color
- **Error Handling:**
  - Invalid ID: "Device ID not found"
  - Empty field: "Device ID is required"
  - Too many attempts: Temporary lockout with message

### No Password Required

**Key Difference from Other Roles:**

- **Admin, Provider, Patient, Coordinator:** Email + Password
- **Device:** Numeric Device ID only

**Rationale:**
- Simplified for shared device environment
- Reduces login complexity
- Staff can easily assist patients
- No personal credentials exposed
- Faster access for walk-in patients

### Device ID Management

**Device ID Assignment:**
- Assigned by system administrator
- Each physical device has unique numeric ID
- Cannot be changed by device user
- Format: Typically 5-6 digits (e.g., "33333")

**Who Knows the Device ID:**
- Clinic administrative staff
- IT department
- Authorized coordinators
- Posted discreetly at device location (if policy allows)
- Should not be publicly shared

**Security:**
- Device ID should be treated as sensitive
- Do not share publicly or on social media
- Report lost or stolen devices immediately
- Device ID can be changed/disabled by admin if compromised

---

## Navigation Menu

**Unique Characteristic: Minimal Navigation**

Unlike other roles with multiple navigation menu items, the Device role has an intentionally simplified interface.

### Primary Navigation

**Single Menu Item:**

- **Dashboard** - View upcoming appointments *(Only navigation item)*

### What's Missing (By Design)

**Device role does NOT have:**

- ❌ Past Sessions / Past Visits
- ❌ Patient Directory
- ❌ Provider Directory
- ❌ Scheduling / Calendar
- ❌ Health Profile / Medical Records
- ❌ Vitals Scan (launched separately if device equipped)
- ❌ Users Management
- ❌ Institution Settings
- ❌ Document Management
- ❌ Visit Notes
- ❌ Data Reporting
- ❌ Command Center
- ❌ Providers
- ❌ Patients

### Rationale for Minimal Navigation

**Security & Privacy:**
- Prevents unauthorized browsing of patient information
- Protects PHI (Protected Health Information)
- Limits access to only scheduled appointments
- Prevents accidental data exposure in shared environment

**Simplified User Experience:**
- Walk-in patients can easily navigate
- Minimal training required for clinic staff
- Reduces confusion
- Purpose-built for appointment joining only

**Compliance:**
- HIPAA-compliant by limiting data access
- Audit trail limited to appointment joins
- No patient directory browsing

---

## Dashboard

The Device Dashboard provides a streamlined interface focused solely on viewing and joining scheduled appointments.

### Overview

**Purpose:**
- Display upcoming appointments for the device
- Allow patients to join their scheduled sessions
- Simple, clean interface
- Staff-assisted patient interaction

### Header Section

**Institution Branding:**
- Institution name prominently displayed
- Example: "Globalmed Staging for QA"
- May include institution logo
- Branding consistent with organization

**Top-Right Elements:**
- Notification bell icon (with badge if notifications present)
- Profile avatar (device name initials)
- Both are clickable

### Schedule Display

**Your Schedule for Today:**

- **Date Display:** Current date (e.g., "Feb, 24th")
- **Session Counter:** Count of scheduled appointments
  - Format: "0 sessions", "1 session", "2 sessions"
- **Date Picker:** May or may not be available
  - If available: Allows viewing other dates
  - If not: Only shows today (most common for devices)

### Upcoming Appointments Section

**Heading:** "Upcoming appointments"

**When No Appointments:**

**Empty State Display:**
- Icon: Calendar or checkmark
- Message: "You currently have no upcoming appointments"
- Clean, clear visual
- Indicates no patients scheduled on this device

**When Appointments Present:**

Each appointment displays as a card:

**Appointment Card Information:**
- **Time:** Start time and end time (e.g., "10:00 AM - 10:30 AM")
- **Patient Name:** Name of patient with appointment
  - May show as "Patient" or device-associated name
- **Provider Name:** Who will conduct the session
- **Service Type:** General Practice, Urgent Care, etc.
- **Status:** Scheduled, Ready to Join
- **Join Button:** Becomes active at appointment time

**Join Button States:**

1. **Inactive/Disabled (Before Time):**
   - Gray or muted color
   - Text: "Join" with lock icon
   - Tooltip: "Available 5 minutes before appointment"

2. **Active (At Appointment Time):**
   - Bright, prominent color (green or blue)
   - Text: "Join"
   - Pulsing or highlighted to draw attention
   - Clickable

3. **In Session:**
   - Button text changes to "In Progress"
   - May show duration timer
   - Or button disappears if already joined

**Auto-Refresh:**
- Dashboard may auto-refresh to show updated appointment status
- Join button activates automatically when time reached
- Real-time updates for new appointments added

### What's Missing from Dashboard

**Device Dashboard does NOT have:**

- ❌ **Schedule Appointment** button (cannot create appointments)
- ❌ **See a Provider Now** button (no on-demand scheduling)
- ❌ **Quick Actions** section (no self-service features)
- ❌ **Past Appointments** table (no historical access)
- ❌ **Calendar integration** (no personal calendar)
- ❌ **Filtering options** (shows all for device only)

### Intended Workflow

**Typical Patient Interaction:**

1. **Patient Arrives at Clinic:**
   - Checks in with staff
   - Directed to device/kiosk

2. **Device Already Logged In:**
   - Dashboard displays
   - Shows patient's scheduled appointment

3. **Staff Assists:**
   - Confirms patient identity
   - Verifies correct appointment
   - Explains video visit process

4. **Patient Waits:**
   - Appointment card visible
   - Join button appears when ready (5 minutes before)

5. **Joining Session:**
   - Patient (or staff) clicks "Join" button
   - Enters waiting room
   - Provider joins when ready

6. **After Session:**
   - Automatic return to Dashboard
   - Device ready for next patient

### Staff Supervision

**Recommended Practice:**
- Clinic staff stationed near device
- Assist patients with:
  - Finding their appointment
  - Clicking Join button
  - Testing audio/video
  - Troubleshooting issues
- Maintain patient privacy during sessions
- Sanitize device between patients

---

## Session Experience

Complete walkthrough of joining and participating in a video appointment from a shared device.

### Joining Appointments

**When Appointment is Ready:**

**Timing:**
- Join button becomes active **5 minutes before** scheduled time
- Allows time for audio/video checks
- Patient can wait in virtual waiting room

**Clicking Join:**

1. **Patient clicks "Join" button** on dashboard appointment card
2. **Browser Permissions Prompt:**
   - First time: Browser requests camera and microphone permissions
   - Must click "Allow" for both
   - Permissions persist after first grant
3. **Pre-Call Device Checks:**
   - Camera test: "Can you see yourself?"
   - Microphone test: Audio level indicator
   - Speaker test: "Play test sound"
4. **Entering Waiting Room**

### Waiting Room

**While Waiting for Provider:**

**Waiting Room Interface:**

- **Status Message:** "Waiting for provider to join..."
- **Video Preview:** Patient can see themselves
- **Estimated Wait Time:** If available
- **Controls Available:**
  - Toggle camera on/off
  - Toggle microphone on/off
  - Adjust volume
- **Leave Waiting Room button:** Exit before session starts
- **Chat Window:** May be available for urgent messages to staff

**Real-Time Updates:**
- "Provider has been notified"
- "Provider is preparing to join"
- "Provider will join shortly"
- Countdown if applicable

### During Session

**Video Call Interface:**

**Full-Screen Mode:**
- Video takes over entire screen
- Minimizes distractions
- Professional appearance
- Immersive experience

**Main Video Display:**
- **Provider's Video:** Large main view
- **Patient's Video:** Smaller picture-in-picture
- Can swap sizes by clicking
- Full-screen toggle option

**Control Bar (Bottom of Screen):**

**Essential Controls:**

1. **Microphone Button:**
   - Toggle mute/unmute
   - Visual indicator when muted (red icon)
   - Keep unmuted unless instructed otherwise

2. **Camera Button:**
   - Toggle video on/off
   - Turn off for brief privacy if needed
   - Provider may request camera back on

3. **Chat Button (Limited):**
   - Text chat with provider
   - Simplified interface
   - Type messages if audio fails
   - Useful for spelling out information

4. **End Call Button (Red):**
   - Ends video session
   - Confirmation prompt: "Are you sure?"
   - Returns to dashboard after ending

**Minimal Controls:**
- Intentionally simplified
- Prevents accidental disruption
- No screen sharing from patient side (typically)
- No file upload (typically)
- No recording controls (managed by provider)

**Connection Quality Indicator:**
- Bars or dots showing signal strength
- Green: Excellent
- Yellow: Fair
- Red: Poor (may experience lag)

**Session Timer:**
- May display session duration
- Not always visible to patient
- Provider can see duration

### Technical Considerations

**If Issues Occur:**

**Audio Problems:**
- Check microphone is unmuted
- Verify browser permissions granted
- Adjust volume
- Ask provider to check their audio

**Video Problems:**
- Check camera is enabled
- Verify browser permissions
- Ensure camera not covered
- Good lighting on patient's face

**Connection Issues:**
- Video freezes or lags
- Auto-reconnect attempts
- If dropped: Return to dashboard and rejoin
- Staff can assist with troubleshooting

**Clinic Staff Assistance:**
- Staff should remain nearby during session
- Available for technical support
- Can rejoin session if accidentally ended
- Help with any issues

### Post-Session

**After Provider Ends Session:**

**Automatic Return:**
- Video call ends
- **Automatic redirect to Dashboard**
- No manual navigation required
- Device ready for next patient

**Session Summary (If Available):**
- Brief confirmation: "Session Complete"
- Duration displayed
- Provider name
- Date and time
- Typically no detailed notes visible to device role

**No Follow-Up Options:**
- Device role cannot schedule follow-up
- Cannot view session notes
- Cannot download visit summary
- Patient instructed to contact clinic for follow-up

**Dashboard Refresh:**
- Appointment now past
- Removed from upcoming appointments
- Device shows empty state or next appointment
- Ready for staff to assist next patient

### Session Recording

**If Sessions are Recorded:**
- Notification displayed: "This session is being recorded"
- Consent may be required before joining
- Recording indicator (red dot) visible during session
- Recordings managed by institution, not accessible via device

### Privacy & Cleanup

**Between Patients:**

**Staff Responsibilities:**
1. Verify previous patient has left
2. Confirm session ended completely
3. Return device to dashboard
4. Sanitize touchscreen and hardware
5. Ensure camera and microphone functional
6. Device ready for next patient

**No Patient Data Persists:**
- Dashboard shows only upcoming appointments
- Previous patient's information cleared
- No browsing history or cache concerns
- Automatic privacy protection

---

## Notifications

Simple notification system for appointment reminders and session alerts.

### Notification Bell Icon

**Location:**
- Top-right corner of dashboard
- Next to profile avatar
- Always visible

**Bell Icon Display:**
- Bell icon
- Red badge with number if unread notifications
- Example: Bell icon with "2" badge

**Click to Open:**
- Click bell to open notifications dropdown
- Shows recent notifications
- Most recent at top

### Notification Panel Interface

**When Opened:**

**Header:**
- **Heading:** "Notifications"
- **Clear All button:** Eraser icon
  - Marks all as read
  - Clears badge counter
- **Close button:** X icon
  - Closes dropdown

**Notification List:**
- Chronological order (newest first)
- Each notification shows:
  - Type icon
  - Message text
  - Timestamp (e.g., "15 minutes ago", "1 hour ago")
  - Read/unread indicator (bold if unread)

**Empty State:**
- Icon: Bell or checkmark
- Message: "No notifications received"
- Clean, simple message

### Types of Notifications

**Device users receive:**

#### 1. Appointment Reminders

- **Trigger:** Approaching appointment time
- **Timing:** 15 minutes before, 5 minutes before
- **Message:** "Your appointment with [Provider] starts in 15 minutes"
- **Action:** Click to view dashboard

#### 2. Session Start Notifications

- **Trigger:** Appointment time reached
- **Message:** "Your appointment with [Provider] is ready to join"
- **Action:** Click to go to appointment and join
- **Visual:** Join button highlighted on dashboard

#### 3. Session Alerts

- **Provider Joined:** "Provider has joined the waiting room"
- **Technical Issue:** "Connection issue detected, attempting to reconnect"
- **Session Ending Soon:** "Session will end in 5 minutes" (if timed sessions)

#### 4. System Alerts

- **Maintenance:** "System maintenance tonight at 11 PM"
- **Technical Issues:** "Platform experiencing delays"
- **Device Updates:** "Device software update available"

### Notification Delivery

**Methods:**

- **In-App (Primary):** Bell icon badge and dropdown
- **Email (Optional):** If device has email configured
- **SMS (Rare):** Typically not used for devices
- **On-Screen Alert:** May pop up if critical

**Audio Alerts:**
- May play sound for incoming appointment reminders
- Chime or beep to draw attention
- Can be configured in Account Settings

**Desktop Push (If Enabled):**
- Browser notifications even when not focused
- Patient may hear alert sound
- Helpful in busy clinic environment

### Managing Notifications

**Clearing Notifications:**
- **Individual:** Hover and click X on specific notification
- **All at Once:** Click "Clear all" button with eraser icon
- **Automatic:** Very old notifications may auto-clear after days/weeks

**Notification Settings:**
- Configured in Account Settings > Notifications tab
- Typically managed by clinic IT or admin
- Device users may have limited control

---

## Profile Menu

Located in the top-right corner, the profile menu provides access to device account management and help resources.

### Accessing Profile Menu

**Profile Avatar:**
- Displays device initials (e.g., "CD" for "Cody Device-ID-Three")
- Colored circle background
- Located next to notification bell
- Click to open dropdown menu

**Locator for Automation:**
```javascript
await page.locator('._shadow_pdxdk_73').click();
```

### Profile Menu Options

When opened, the profile menu displays:

#### 1. User Information Card (Non-clickable)

**Display:**
- **Device Name:** Full device name
  - Example: "Cody Device-ID-Three 33333"
  - Shows device name and numeric ID
- **Email Address:** Device email (if configured)
  - Example: "chuls+device33333staging@globalmed.com"
  - Used for administrative notifications
- Visual identification at top of menu

**Purpose:**
- Confirms which device you're logged in as
- Shows device identifier
- No personal patient information

#### 2. Account Settings (SettingsGear icon)

- Opens Account Settings modal
- Manage device profile and notification preferences
- Two tabs: My Account and Notifications
- Typically configured by clinic staff

#### 3. Help (InfoCircle icon)

- Access help documentation
- Device user guides
- Video tutorials
- Troubleshooting tips
- How to join appointments
- Audio/video testing instructions
- Contact support information

**Content:**
- Device-specific help articles
- Simplified instructions for patients
- Visual guides
- Staff training materials
- FAQ section

#### 4. Privacy Policy (Policy icon)

- View complete privacy policy
- Patient rights and HIPAA information
- Terms of service
- How telehealth sessions are conducted
- Device usage policies
- Recording and consent information

**Importance:**
- Patients can review before session
- Transparency about data handling
- Compliance with regulations

#### 5. Log Out (LogOut icon)

- End device session
- Returns to Device ID login screen
- Clears session data
- Secure logout

**When to Log Out:**
- End of clinic day
- Device maintenance
- When moving device to unsecured location
- If device will be unattended

**Note:**
- Typically device remains logged in throughout clinic hours
- Staff manages login/logout
- Not logged out between patients

---

## Account Settings

Manage device profile information and notification preferences through a modal interface.

### Accessing Account Settings

1. Click profile avatar in top-right corner
2. Select "Account settings" from dropdown menu
3. Modal opens with tab navigation

### Account Settings Navigation

Two tabs available for Device role:
- **My Account** - Device profile information
- **Notifications** - Notification preferences

---

### My Account Tab

Device profile management with limited editable fields.

#### Profile Photo Section

**Options:**
- **Upload photo button** (Download icon)
  - Select image from computer
  - Supported formats: JPG, PNG, GIF
  - Recommended size: 400x400px minimum
  - May be used to upload device location photo or clinic logo

- **Delete photo button** (Trash icon)
  - Removes current profile photo
  - Reverts to initials avatar
  - Confirmation prompt before deletion

**Current Display:**
- Circular avatar with device initials
- Device name below avatar
- Device email address below name

**Typical Use:**
- Often left as default initials
- Or clinic may upload location-specific image
- Not visible to patients in most interfaces

#### Profile Details Section

**Editable Fields:**
Click "Edit" button (Edit icon) to modify:

**Device Identification:**

1. **Name**
   - Device display name
   - Example: "Cody Device-ID-Three"
   - Format: May include device ID in name
   - Typically set by administrator, not changed

2. **Device ID**
   - Numeric identifier (e.g., "33333")
   - **Read-only field** (cannot be changed)
   - Displayed for reference

**Contact Information:**

3. **Phone Number**
   - Shows "N/A" (not applicable for devices)
   - Devices don't have phone numbers
   - Field not editable

4. **Country**
   - Country selection
   - Shows "N/A" if not set
   - May be configured for regional settings

5. **State**
   - State/Province
   - Shows "N/A" if not set
   - Used for clinic location

6. **City**
   - City name
   - Shows "N/A" if empty
   - Clinic city location

7. **Zip Code**
   - Postal code
   - Shows "N/A" if empty
   - Clinic address zip

8. **Address 1**
   - Primary address
   - Shows "N/A" if empty
   - Clinic street address

9. **Address 2**
   - Secondary address line
   - Shows "N/A" if empty
   - Suite or building info

**Note:**
- Most fields show "N/A" for device role
- Devices don't have personal contact information
- Fields primarily for administrative reference
- Clinic location, not device-specific

**Edit Modal:**
- Opens when clicking Edit button
- Most fields are informational only
- Limited fields actually editable
- **Save changes** button to confirm (if changes allowed)
- **Cancel** button to discard
- Typically only admins edit these fields

#### Application Language

**Language Selector:**
- Current language displayed with flag icon
- **"Change language" link**
  - Opens language selection dialog
  - Available languages: English, Spanish, French, and more
  - Changes UI language immediately
  - User preference saved to device profile

**Language Display:**
- Flag icon representing current language
- Language name in full (e.g., "English", "Español")
- Visual indicator of active language

**Importance for Devices:**
- Critical for multilingual clinic environments
- Patients may speak different languages
- Staff can quickly switch language
- Improves patient experience and comprehension
- Reduces language barriers in healthcare

**Usage:**
- Staff switches language based on patient preference
- May be set to most common patient language
- Can be changed multiple times per day
- Immediate UI translation throughout platform

#### Time Zone

**Timezone Settings:**
- Current timezone with GMT offset
- Format: "(GMT-07:00) Mountain Standard Time - Phoenix - 08:03 PM"
- Shows current local time in selected timezone
- **"Change time zone" link**
  - Opens timezone selection dialog
  - Searchable/scrollable list of timezones
  - Organized by geographic region

**Importance for Devices:**
- **Critical for appointment scheduling accuracy**
- Ensures appointments display in correct local time
- Especially important if institution serves multiple timezones
- Affects when Join button becomes active

**Device Scenario:**
- Timezone should match physical device location (clinic location)
- Set once during initial setup
- Rarely changed unless device relocated
- Affects all appointments shown on device

**What Happens if Wrong:**
- Appointments show at incorrect times
- Join button activates at wrong time
- Patient confusion and potential missed appointments
- Staff must verify timezone during setup

#### Account Deletion

**Delete Account Section:**
- "Delete account" link at bottom of settings
- **Warning:** This action affects clinic operations
- Opens confirmation dialog

**Consequences:**
- Device will be deactivated
- Device ID becomes invalid
- Cannot login anymore
- Scheduled appointments affected
- Clinic loses access via this device

**Typical Workflow:**
- Contact system administrator instead of self-deleting
- Admin can deactivate device
- Device IDs can be reassigned
- Proper decommissioning process

---

### Notifications Tab

Configure how and when the device receives appointment alerts and reminders.

#### Overview

**Description:**
"Manage your notification preferences for device appointments"

Control notification methods and configure appointment reminder timing.

#### Notification Methods Section

Configure which channels receive notifications:

##### 1. Email Notifications

**Display:**
- "Email" heading
- Device's registered email address shown
- Toggle checkbox to enable/disable

**Settings:**
- **Enabled (checked):** Receive notifications via email
- **Disabled (unchecked):** No email notifications
- Click anywhere on row to toggle

**What Devices Receive via Email:**
- Appointment confirmations (for device's scheduled appointments)
- Appointment reminders (15 min, 30 min before)
- Session alerts
- Technical issues
- System maintenance notices
- Administrative messages

**Recipient:**
- Typically clinic email or IT department
- Not patient's personal email
- Used for device monitoring by staff

##### 2. SMS Notifications

**Display:**
- "SMS" heading
- "Add phone number" link (if no phone)
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
- **Enabled:** Receive text message notifications
- **Disabled:** No SMS notifications
- Checkbox disabled (grayed out) until phone verified

**Typical Use:**
- Rarely used for device role
- Devices don't have phone numbers
- May be set to clinic staff phone for critical alerts
- Optional feature

##### 3. In-App Notifications

**Display:**
- "In-app" heading
- Toggle checkbox to enable/disable

**Settings:**
- **Enabled (checked):** Show browser/system notifications
- **Disabled (unchecked):** No in-app popups

**In-App Behavior:**
- Notification bell badge counter
- Desktop notifications when browser not focused
- Sound alerts (configurable)
- Real-time appointment alerts
- Session start notifications

**Browser Permission:**
- First time enabling: browser prompts for permission
- Must click "Allow"
- Permissions persist after first grant
- Can be revoked in browser settings

**Types of In-App Notifications:**
- Appointment starting soon
- Provider has joined waiting room
- Session started
- Session ended
- Technical alerts

#### Session Reminders Section

Configure advance reminders for scheduled appointments.

**Description:**
"Set the time you'd like to be reminded before the session starts."

**Purpose:**
- Ensure patients are present at device when appointment ready
- Alerts clinic staff to prepare patient
- Provides buffer time for audio/video checks

##### Current Reminder Display (If Set)

**Default Reminder:**
- Example: "Remind me 15 minutes before the session"
- Provides advance notice for staff to bring patient to device
- Allows time for any preparation

**Change Reminder Timing:**
1. Click "Change" link (if reminder already set)
2. Opens reminder configuration dialog
3. Select reminder time from dropdown:
   - **5 minutes before** (last-minute alert)
   - **10 minutes before**
   - **15 minutes before** (common for devices)
   - **30 minutes before** (more advance notice)
   - **1 hour before** (for staff planning)
4. Click "Save" to apply

**Recommended for Devices:**
- **15-30 minutes before:** Gives staff time to locate patient, bring to device, prepare
- **5 minutes before:** Reminder that appointment starting very soon

##### Add Reminder Button

**"Add reminder" Button:**
- Click to configure first reminder (if none set)
- Opens reminder configuration dialog
- Select timing from dropdown
- Click "Save"

**Multiple Reminders (If Supported):**
- 30 minutes before: Staff prepares patient
- 5 minutes before: Final check, bring to device
- Each reminder listed separately
- Can modify or remove individual reminders

**Reminder Delivery:**
- Through enabled notification methods (Email, SMS, In-app)
- Prominent alert on device dashboard
- May include audio chime
- Visual badge on notification bell

**Reminder Content:**
- "Upcoming appointment in [X] minutes"
- Patient name (if visible)
- Provider name
- Appointment time
- Quick link to dashboard (if via email)

---

## Device Management Best Practices

Comprehensive guidelines for deploying, operating, and maintaining shared telehealth devices in clinical settings.

### Initial Setup

**Device ID Assignment:**
- Device ID assigned by system administrator
- Unique numeric identifier per physical device
- Example IDs: "11111", "22222", "33333"
- Record Device ID securely
- Keep backup info with device location

**Physical Setup:**
- **Hardware Installation:**
  - Secure mounting or stable placement
  - Positioned for patient comfort (seated, standing, wheelchair-accessible)
  - Privacy screen or positioned away from waiting area
  - Adequate lighting (patient's face visible)
  - Clean, professional appearance

- **Network Connection:**
  - **Ethernet preferred** for stability (wired connection)
  - Wi-Fi as backup (strong signal required)
  - Minimum 1 Mbps up/down (3+ Mbps recommended)
  - Test connection speed
  - Dedicated bandwidth if possible (no sharing with heavy traffic)

**Software Configuration:**

- **Browser Setup:**
  - Install latest Chrome, Edge, or Firefox
  - Set browser to open eNow2 portal on startup
  - Clear cache before first use
  - Enable cookies and local storage

- **Permissions:**
  - Grant camera permission
  - Grant microphone permission
  - Test both before patient use

**System Configuration:**

- **Configure Timezone:**
  - Set to device's physical location timezone
  - Critical for appointment accuracy
  - Verify timezone shows correct local time

- **Set Language:**
  - Default to most common patient language
  - Clinic staff can switch as needed
  - Test UI translation

- **Test Audio/Video:**
  - Run camera test
  - Run microphone test
  - Run speaker test
  - Adjust settings for optimal quality

**Security Setup:**

- **Browser Settings:**
  - Disable browser history (if policy allows)
  - Clear cache on close (if needed)
  - Prevent access to other websites
  - Kiosk mode if available
  - Disable downloads

- **Device Security:**
  - Enable screensaver with timeout
  - Set to lock when idle (optional)
  - Position in supervised area
  - Install virus protection
  - Enable automatic updates

### Daily Operations

**Start of Clinic Day:**

1. **Power On Device:**
   - Turn on tablet/computer
   - Wait for full boot

2. **Login with Device ID:**
   - Navigate to `/login/device`
   - Enter numeric Device ID
   - Click "Verify Device ID"
   - Confirm successful login

3. **Leave Logged In:**
   - Do not log out between patients
   - Device remains on dashboard
   - Staff supervises throughout day

4. **Check Functionality:**
   - Verify internet connection
   - Test camera (quick preview)
   - Test microphone
   - Verify speakers working
   - Check dashboard shows today's appointments

5. **Review Schedule:**
   - Check dashboard for today's appointments
   - Note appointment times
   - Prepare for patient flow
   - Identify any gaps or heavy periods

**During Clinic Hours:**

**Before Each Patient:**
- Confirm patient identity
- Verify correct appointment on dashboard
- Explain video visit process to patient
- Position patient comfortably
- Test audio/video with patient

**Patient Joining:**
- Assist patient with clicking "Join" button
- Wait in waiting room with patient initially
- Ensure patient comfortable
- Step away for privacy once session starts (but remain nearby)

**During Session:**
- Monitor from distance (maintain patient privacy)
- Be available for technical assistance
- Do not interrupt session
- Be ready if patient calls for help

**After Session:**
- Verify session ended properly
- Dashboard automatically returns
- Brief cleanup before next patient

**Between Patients:**

**Cleanup Process:**
1. Return device to Dashboard view
2. Verify no patient information displayed
3. Sanitize touchscreen and hardware per clinic protocol
4. Wipe camera lens (gently)
5. Clean microphone grille
6. Adjust device position if moved
7. Ensure camera/microphone still functional
8. Device ready for next patient

**Monitoring:**
- Keep device charged or plugged in
- Check for overheating
- Verify internet connection stable
- Monitor for any software errors
- Reload page if performance degrades

### End of Day

**Closing Procedures:**

1. **Review Appointments:**
   - Check all scheduled appointments completed
   - Note any missed appointments
   - Document no-shows or cancellations

2. **Log Out:**
   - Click profile avatar
   - Select "Log out"
   - Return to Device ID login screen

3. **Power Down or Lock:**
   - Shut down device completely
   - Or lock device if remaining on overnight
   - Disconnect from power if policy requires

4. **Report Issues:**
   - Document any technical problems experienced
   - Submit support tickets for unresolved issues
   - Inform next shift of any concerns

5. **Physical Cleanup:**
   - Wipe down device thoroughly
   - Disinfect per clinic protocol
   - Cover device if applicable
   - Secure device location overnight

**Logging & Reporting:**
- Number of appointments completed
- Any technical issues encountered
- Patient feedback (if collected)
- Equipment status checklist

### Security Considerations

**Physical Security:**

- **Device Placement:**
  - Position in supervised area
  - Visible to clinic staff
  - Not accessible when clinic closed
  - Prevents theft or tampering

- **Supervision:**
  - Staff member always nearby during clinic hours
  - Monitor who approaches device
  - Assist patients, prevent unauthorized use

**Digital Security:**

- **Device ID Protection:**
  - Do not share Device ID publicly
  - Do not post Device ID on social media
  - Store Device ID securely
  - Change Device ID if compromised

- **Session Security:**
  - Log out when clinic unmanned
  - Lock device when staff on break
  - Clear browser cache if sharing concerns
  - Report suspicious activity immediately

**Privacy Compliance:**

- **HIPAA Considerations:**
  - Device configured to protect PHI
  - No browsing of patient information
  - Session recordings encrypted
  - Audit logs maintained

- **Patient Privacy:**
  - Position device for visual privacy
  - Provide private or semi-private space for sessions
  - Ensure conversations not overheard
  - Use headphones if environment noisy

**Incident Response:**

- **Lost or Stolen Device:**
  - Report immediately to IT/Security
  - Device can be remotely disabled
  - Change/revoke Device ID
  - Assess data exposure risk

- **Unauthorized Access:**
  - Document who, when, what was accessed
  - Report to supervisor and IT
  - May require incident report
  - Review security procedures

### Troubleshooting

**Common Issues and Solutions:**

#### Cannot Login

- **Symptom:** "Device ID not found" error
- **Solutions:**
  - Verify Device ID correct (check documentation)
  - Ensure no typos (numeric only)
  - Contact system administrator to verify device active
  - Check if Device ID was changed or revoked

#### No Appointments Showing

- **Symptom:** Dashboard shows no appointments despite schedule
- **Solutions:**
  - Check timezone settings (may be wrong timezone)
  - Verify appointments were scheduled for this specific device
  - Refresh page (Ctrl+R or F5)
  - Check date selected (may be viewing wrong day)
  - Verify appointments not cancelled
  - Contact coordinator to verify scheduling

#### Audio/Video Issues

- **Symptom:** Can't see self, provider can't hear you
- **Solutions:**
  - **Camera:**
    - Check browser permissions granted
    - Verify camera not covered physically
    - Try closing and reopening browser
    - Restart device
    - Check camera hardware connected
  - **Microphone:**
    - Check browser permissions granted
    - Verify microphone not muted in OS
    - Check microphone volume level
    - Test with different app
    - Check microphone hardware connected
  - **Speakers:**
    - Check volume not at zero
    - Verify speaker output device correct
    - Test with different audio
    - Check speaker hardware connected

#### Session Won't Start

- **Symptom:** Join button clicked but nothing happens
- **Solutions:**
  - Refresh page
  - Verify internet connection active
  - Check browser console for errors
  - Clear browser cache
  - Try different browser
  - Contact technical support

#### Wrong Language Displayed

- **Symptom:** UI in incorrect language for patient
- **Solutions:**
  - Go to Profile > Account Settings > My Account
  - Click "Change language"
  - Select correct language
  - Changes take effect immediately
  - Staff can switch back for next patient

#### Poor Connection Quality

- **Symptom:** Video freezes, lag, choppy audio
- **Solutions:**
  - Check internet connection speed
  - Close other applications using bandwidth
  - Move closer to Wi-Fi router if wireless
  - Switch to Ethernet if available
  - Restart router if persistent
  - Contact IT for network issues

**When to Call Support:**
- Issue persists after basic troubleshooting
- Hardware failure suspected
- Software errors or crashes
- Account/access issues
- Security concerns
- Network problems beyond device

### Privacy & Compliance

**HIPAA-Compliant Device Configuration:**

- **Minimum Necessary Access:**
  - Device can only view scheduled appointments
  - No access to patient directory or medical records
  - Limited to joining video sessions only

- **Audit Trails:**
  - All device logins logged
  - Session joins documented
  - Admin can review device activity

- **Data Encryption:**
  - Video sessions encrypted end-to-end
  - Data in transit protected
  - Secure authentication

**Patient Consent:**
- Patients should be informed of telehealth nature
- Consent forms signed before first visit
- Recording consent if sessions recorded
- Posted notice about video consultations

**Session Recordings (If Applicable):**
- Recordings per institutional policy
- Patients notified if recording
- Recording indicator visible during session
- Recordings stored securely
- Access restricted per policy
- Retention and disposal per regulations

**Environmental Privacy:**
- Device in private or semi-private area
- Not in open waiting room (if possible)
- Curtains or partitions for visual privacy
- Background noise minimized
- Headphones provided if needed

### Hardware Recommendations

**Minimum Requirements:**

- **Camera:**
  - HD webcam (720p or better)
  - 1080p preferred
  - Built-in or USB external

- **Microphone:**
  - USB or built-in microphone
  - Noise-cancelling preferred
  - Test quality before deployment

- **Speakers:**
  - Built-in or external speakers
  - Headphone jack available
  - Volume controls accessible

- **Touchscreen (Recommended):**
  - Easier for patients to use
  - More intuitive interaction
  - Reduces need for mouse

- **Computer Specs:**
  - 4GB RAM minimum (8GB preferred)
  - Modern processor (Intel i3 or equivalent)
  - SSD for faster performance

- **Display:**
  - Minimum 1024x768 resolution
  - 1920x1080 preferred
  - 15-24 inch screen (depending on use case)

- **Browser:**
  - Chrome, Edge, or Firefox
  - Latest version
  - Auto-updates enabled

**Optimal Setup:**

- **Dedicated Device:**
  - Tablet or all-in-one PC
  - Not dual-purpose with other clinic functions
  - Telehealth only

- **Secure Mounting:**
  - Wall mount or secure stand
  - Adjustable for accessibility
  - Stable (won't tip or fall)

- **Network:**
  - Ethernet connection (most stable)
  - Gigabit internet if available
  - QoS priority for video traffic

- **Peripherals:**
  - External monitor for staff (optional)
  - External webcam for better quality
  - USB hub for connections
  - Sanitizable keyboard/mouse (if not touchscreen)

- **Accessibility:**
  - Wheelchair accessible height
  - Adjustable stand height
  - Privacy screen filter
  - Adequate lighting

- **Power:**
  - Always plugged in (not battery only)
  - Surge protector
  - Battery backup (UPS) if possible

---

## Limitations

The Device role has intentional restrictions to ensure security, privacy, and compliance.

### Restricted Functionality

The Device role **cannot** perform the following actions:

#### Scheduling & Appointments

- ❌ **Schedule new appointments**
  - No "Schedule Appointment" button on dashboard
  - Cannot access calendar or scheduling interface
  - Appointments must be scheduled by Coordinator or Patient

- ❌ **Cancel or reschedule appointments**
  - Cannot modify existing appointments
  - Must contact clinic staff to reschedule

- ❌ **View appointment history**
  - No "Past Sessions" or "Past Visits" menu item
  - Cannot view completed appointments
  - No access to session documentation

#### Directory Access

- ❌ **Browse patient directory**
  - Cannot view list of patients
  - Cannot search for patients
  - Cannot access patient profiles or medical records

- ❌ **Browse provider directory**
  - Cannot view list of providers
  - Cannot search for providers
  - Cannot send messages to providers outside sessions

- ❌ **Access contact lists**
  - No address book or contacts
  - Cannot initiate communications

#### Medical Records & Documentation

- ❌ **View or edit medical records**
  - No access to patient health information
  - Cannot view medical history
  - Cannot see visit notes

- ❌ **Upload documents**
  - Cannot upload ID, insurance cards
  - Cannot upload test results or images
  - File uploads disabled

- ❌ **Access vitals or health data**
  - No vitals scanning (unless separate dedicated app)
  - Cannot view historical vital signs
  - No health assessment forms

#### Administrative Functions

- ❌ **Manage institution settings**
  - No access to admin panel
  - Cannot configure system settings
  - Cannot change institution-wide configurations

- ❌ **Manage other users**
  - Cannot create or edit user accounts
  - Cannot view user directory
  - Cannot assign roles or permissions

- ❌ **Access reports or analytics**
  - No data reporting features
  - Cannot generate reports
  - No analytics dashboards

- ❌ **View or manage documents**
  - No document management access
  - Cannot upload/download institutional forms
  - No template management

#### Communication

- ❌ **Send messages outside active sessions**
  - No standalone messaging feature
  - Chat only available during video calls
  - Cannot initiate conversations

- ❌ **Access Command Center**
  - No real-time monitoring capabilities
  - Cannot see waiting rooms or requests
  - Cannot dispatch or coordinate

### Purpose of Limitations

These restrictions are intentional and serve important purposes:

**Security & Privacy:**
- Prevents unauthorized browsing of patient information
- Protects PHI (Protected Health Information)
- Limits potential data exposure in shared device environment
- Reduces attack surface for security threats

**Compliance:**
- HIPAA-compliant by limiting data access
- Meets minimum necessary standard
- Reduces audit logging requirements
- Simplifies compliance documentation

**User Experience:**
- Simplified interface for walk-in patients
- Minimal training required for clinic staff
- Reduces confusion and errors
- Purpose-built for specific use case

**Operational Safety:**
- Prevents accidental scheduling errors
- No unauthorized appointment changes
- No patient record modifications
- Maintains data integrity

### Appropriate Use Cases

**Device Role is Best For:**
- Clinic kiosk for scheduled appointments only
- Supervised patient video consultations
- Locations with staff-assisted telehealth
- Walk-in video visit centers
- Pharmacy telehealth stations
- Hospital department consult rooms

**Device Role is NOT Appropriate For:**
- Personal patient devices (use Patient role instead)
- Provider workstations (use Provider role)
- Administrative workstations (use Admin role)
- Scheduling workstations (use Coordinator role)
- Unsupervised public locations
- Remote or home use

### Workarounds for Limitations

If additional functionality needed:

**Need to Schedule:**
- Patient can schedule from their own Patient role account
- Coordinator can schedule on behalf of patient
- Call clinic to schedule

**Need Historical Records:**
- Patient accesses their own Patient portal
- Request records from clinic
- Visit notes sent via email to patient

**Need to Upload Documents:**
- Patient uploads from their Patient account
- Email documents to clinic
- Bring physical documents to clinic

**Technical Assistance:**
- Clinic staff nearby can assist
- Use separate administrative workstation
- Contact support via phone

---

## Summary

The Device role provides a streamlined, secure telehealth experience for shared clinical devices, offering:

- **Simplified Authentication**: Numeric Device ID only (no email/password)
- **Minimal Interface**: Dashboard only - focused on appointment joining
- **Enhanced Security**: Restricted access protects patient privacy
- **Staff-Supervised**: Designed for assisted patient use in clinical settings
- **HIPAA-Compliant**: Limited access ensures regulatory compliance

**Key Characteristics:**
- **Purpose-Built**: Specifically for kiosk/shared device deployments
- **Patient-Facing**: Enables walk-in telehealth consultations
- **Secure & Private**: Intentional limitations protect sensitive data
- **Easy to Use**: Minimal navigation reduces complexity
- **Supervised Environment**: Staff nearby to assist patients

**Ideal For:**
- Clinic waiting rooms
- Pharmacy telehealth stations
- Urgent care centers
- Hospital consult rooms
- Community health centers
- Mobile health units

For technical support, device configuration, or questions about device deployment, contact your IT department or system administrator.

---

[← Back to Role Index](./README.md)
