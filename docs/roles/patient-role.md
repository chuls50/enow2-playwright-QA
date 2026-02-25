# Patient Role - User Guide

**Role:** Patient  
**Last Updated:** February 24, 2026  
**Application URL:** https://portal.qa-encounterservices.com

[← Back to Role Index](./README.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Navigation Menu](#navigation-menu)
3. [Dashboard](#dashboard)
4. [Past Visits](#past-visits)
5. [Health Profile](#health-profile)
6. [Vitals Scan](#vitals-scan)
7. [Schedule Appointment](#schedule-appointment)
8. [Session Experience](#session-experience)
9. [Profile Menu](#profile-menu)
10. [Account Settings](#account-settings)
11. [Best Practices](#best-practices)

---

## Overview

The Patient role provides individuals with secure access to schedule appointments, attend virtual visits, view their health information, and monitor vital signs through the eNow2 platform. Patients can manage their own healthcare journey, communicate with providers, and access their medical records.

### Key Capabilities

- Schedule and attend virtual visits
- View and manage upcoming appointments
- Access past visit history and documentation
- Measure and track vital signs
- Manage health profile and medical information
- Communicate with healthcare providers
- Receive appointment reminders and notifications

---

## Navigation Menu

The Patient role has the following left-side navigation menu:

### 1. Dashboard

Main landing page with appointments and quick actions

### 2. Past Visits

Historical record of completed visits (not "Past sessions" like Provider role)

### 3. Health Profile

Personal and medical information management (Patient-specific)

### 4. Vitals Scan

Measure and track vital signs using connected devices (Patient-specific)

---

## Dashboard

The patient's main landing page showing upcoming appointments and quick access to key functions.

### Schedule Summary

**Your Schedule for Today:**

- Displays current date (e.g., "Feb, 24th")
- Shows count of scheduled sessions ("0 sessions", "1 session", "2 sessions")
- Date picker with dropdown to view different dates
- Interactive calendar dialog for date selection

**Status Indicators:**

- Welcome message after login ("Welcome back!")
- Session count for selected date
- Empty state: "You currently have no upcoming appointments"
- Clear messaging when no sessions scheduled

### Quick Actions

Patient dashboard features two prominent action buttons:

#### 1. Schedule an Appointment

- Large button with descriptive text
- Opens full appointment scheduling workflow
- Prompts for health concerns and symptoms
- Collects complete session details
- For non-urgent, planned appointments

#### 2. See a Provider Now

- Immediate consultation request
- For urgent care needs
- On-demand provider matching
- Faster turnaround than scheduled appointments
- May have wait time depending on provider availability

### Upcoming Appointments Section

**Heading:** "Upcoming appointments"

**Empty State:**

- Message: "You currently have no upcoming appointments"
- Clean, clear communication
- Encourages scheduling via quick action buttons

**When Appointments Present:**

- List of scheduled appointments
- Date and time display
- Provider name
- Service type
- "Join" button (becomes active at appointment time)
- Countdown to appointment

### Past Appointments Section

**Table View:**

**Heading:** "Past appointments"

- Year dropdown selector (e.g., "2026" with ChevronDown)
- Filter appointments by year

**Sortable Columns:**

1. **Date** (ChevronSelectorVertical)
   - Format: MM/DD/YYYY (e.g., "02/17/2026")
   - Click to sort chronologically

2. **Service** (ChevronSelectorVertical)
   - Type of care received
   - Examples: "General Practice", "Cardiology"

3. **Specialist** (ChevronSelectorVertical)
   - Provider's full name
   - Example: "Cody ProviderOne", "Alex ProviderOne"

4. **Type** (ChevronSelectorVertical)
   - "Video" for video consultations
   - "Chat" for text-based sessions

5. **Actual Duration** (ChevronSelectorVertical)
   - Session length in minutes
   - Format: "0m", "15m", "30m"

6. **Session ID** (ChevronSelectorVertical)
   - Unique identifier with # prefix
   - Example: "#RR60M7D", "#VHI7YOZ"
   - Use for reference in support inquiries

**Actions:**

- **"View details" link** on each row
  - Opens detailed visit information
  - Access visit notes when published
  - View prescription information
  - See provider's recommendations
  - Access session recording if available

**Sample Data Display:**

```
02/17/2026 | General Practice | Cody ProviderOne | Video | 0m | #RR60M7D | View details
```

---

## Past Visits

Comprehensive history of all completed healthcare visits with full access to documentation and notes.

### Visit History

Access historical records of all completed sessions for review and reference.

**Chronological Listing:**

- Most recent visits displayed first
- Reverse chrological order (newest to oldest)
- Paginated for easy navigation
- Clear date and provider identification

**Visit Information Display:**

- Visit date and time
- Provider name who conducted session
- Duration of visit
- Type of visit (Video, Chat, Phone)
- Service category
- Session ID for reference
- Status (Completed, Cancelled, No-show)

### Search Capability

**Search Functionality:**

- Search bar to find specific past visits
- Search by:
  - Provider name
  - Date range
  - Visit type
  - Service type
- Real-time filtering as you type

### Filtering Options

**Date Range Selection:**

- Start date picker
- End date picker
- Pre-set ranges (Last 30 days, Last 3 months, Last year)
- Custom date range option

**Provider Name Filter:**

- Dropdown of providers you've seen
- Select to filter by specific provider
- View all visits with that provider

**Visit Type Filter:**

- Video sessions
- Chat sessions
- Phone consultations
- In-person (if applicable)

### Visit Documentation

**Accessing Visit Details:**

1. Click "View details" on any past visit
2. Opens detailed visit view

**Available Information:**

- Complete session summary
- Provider's visit notes (when published)
- Diagnosis or assessment
- Treatment plan
- Prescriptions issued
- Lab orders or referrals
- Follow-up recommendations
- Attached documents or images
- Next appointment scheduled (if applicable)

**Visit Notes:**

- Published by provider after session
- May take 24-48 hours for completion
- Notification when notes become available
- Downloadable for personal records

---

## Health Profile

Comprehensive management of personal and medical information. (Patient-specific navigation item)

### Overview

Centralized location for managing all personal health information, emergency contacts, and privacy preferences.

### Personal Information

**Profile Photo:**

- Upload profile picture
- Update existing photo
- Acceptable formats: JPG, PNG
- Recommended size: 400x400px
- Displays as avatar throughout platform

**Contact Information:**

- Full name (First and Last)
- Email address (primary)
- Phone number with country code
- Address (Street, City, State, Zip, Country)
- Secondary contact information (optional)

**Emergency Contact:**

- Full name of emergency contact
- Relationship to patient
- Phone number (primary)
- Secondary phone (optional)
- Email address

**Language Preference:**

- Select preferred language for communications
- Affects UI language
- Provider matching considers language preference
- Interpretation services notation

### Medical Information

**Current Medications:**

- List of active medications
- Medication name
- Dosage and frequency
- Prescribing physician
- Start date
- Purpose/indication
- Add/Edit/Remove functionality

**Known Allergies:**

- Allergen name
- Reaction type (Rash, Anaphylaxis, Swelling, etc.)
- Severity level (Mild, Moderate, Severe)
- Date of first reaction
- Add/Edit/Remove functionality
- Clear "No known allergies" option

**Medical History:**

- Chronic conditions
- Past surgeries or procedures
- Significant illnesses
- Family medical history
- Immunization records

**Current Health Conditions:**

- Diabetes (Type specification)
- Hypertension (BP readings)
- Asthma (severity and triggers)
- Heart Disease (specific condition)
- Other documented conditions

**Insurance Information:**

- Insurance provider
- Policy number
- Group number
- Coverage details
- Upload insurance card images (front and back)

### Privacy Settings

**Data Sharing Preferences:**

- Share data with primary care provider
- Allow access for care coordination
- Participate in research (opt-in)
- Anonymous data aggregation consent

**Communication Preferences:**

- Preferred contact method (Email, SMS, Phone)
- Best time to contact
- Language preference for communications
- Allow appointment reminders
- Allow health tips and education

**Consent Management:**

- View active consents
- Telehealth consent
- Recording consent
- Data sharing consent
- Withdraw consent options
- Download consent forms

---

## Vitals Scan

Measure and track vital signs using connected medical devices and sensors. (Patient-specific feature)

### Overview

The Vitals Scan feature allows patients to measure health metrics using FDA-cleared medical devices, track trends over time, and share data with healthcare providers.

### Available Measurements

**Vital Signs Supported:**

1. **Blood Pressure**
   - Systolic pressure (mmHg)
   - Diastolic pressure (mmHg)
   - Automatic cuff inflation
   - Multiple reading support

2. **Heart Rate**
   - Beats per minute (BPM)
   - Resting heart rate
   - Heart rate variability (if supported by device)

3. **Oxygen Saturation (SpO2)**
   - Percentage (%)
   - Perfusion index
   - Pulse oximeter reading

4. **Temperature**
   - Fahrenheit or Celsius
   - Oral, Temporal, or Tympanic
   - Fever indicators

5. **Weight**
   - Pounds (lbs) or Kilograms (kg)
   - Body Mass Index (BMI) calculation
   - Weight tracking over time

6. **Blood Glucose**
   - mg/dL or mmol/L
   - Fasting or post-meal indicators
   - Diabetic range indicators

### Scan Process

**Step-by-Step Measurement:**

1. **Select Vital Sign Type**
   - Click on desired measurement tile
   - System prepares for connection

2. **Device Connection**
   - System searches for compatible devices
   - Bluetooth pairing if needed
   - Connection status displayed
   - "Searching..." indicator

3. **Follow On-Screen Instructions**
   - Specific guidance for each measurement type
   - Proper sensor placement diagrams
   - Positioning instructions
   - Timing guidance

4. **Real-Time Measurement Display**
   - Live reading as measurement occurs
   - Progress indicator
   - Reading stability indicator
   - Completion notification

5. **Results Saved**
   - Automatic save to patient record
   - Timestamp recorded
   - Device information noted
   - Previous readings comparison

6. **Historical Trends**
   - View past readings
   - Trend graphs (line charts)
   - Date range selection
   - Export data option

### Device Compatibility

**Supported Devices:**

- FDA-cleared medical devices only
- Bluetooth Low Energy (BLE) compatible
- Specific device partnerships vary by institution

**Connection Requirements:**

- Bluetooth enabled on device
- Location services enabled (for Bluetooth on some devices)
- Device powered on and in range
- Latest firmware on medical device

**Device Pairing:**

1. Enable Bluetooth on computer/tablet
2. Power on medical device
3. Put device in pairing mode
4. Select device from list in eNow2
5. Confirm pairing code if prompted
6. Connection established message

**Troubleshooting:**

- Ensure device has fresh batteries
- Check Bluetooth is enabled
- Move closer to computer/tablet
- Restart medical device
- Re-pair device if connection lost
- Contact support for persistent issues

### Historical Data

**Viewing Trends:**

- Graph view of measurements over time
- Date range selector (Week, Month, 3 Months, Year)
- Min/Max/Average indicators
- Trend line showing improvement or decline
- Color-coded ranges (Normal, Borderline, High)

**Exporting Data:**

- Download as CSV or PDF
- Date range selection for export
- Include in provider visits
- Share with healthcare team
- Print for personal records

**Provider Access:**

- Measurements automatically shared with care team
- Providers see trends in patient chart
- Can be reviewed during video visits
- Alerts for out-of-range values (if configured)

---

## Schedule Appointment

Comprehensive booking workflow for scheduling healthcare visits with providers.

### Accessing Scheduling

**From Dashboard:**

- Click "Schedule an appointment" button
- Opens multi-step booking workflow

**From Past Visits:**

- Click "Schedule follow-up" if available
- Pre-fills some information

**From Provider Recommendation:**

- Follow link in visit notes
- Provider-suggested appointment

### Booking Workflow

Multi-step process to gather necessary information and schedule appropriately.

#### Step 1: Health Concerns

**How are you feeling today?**

**Input Field:**

- Large text area for describing concerns
- Placeholder: "Describe your symptoms or reason for visit"
- Character limit: Typically 500-1000 characters
- Required field validation

**Examples of What to Include:**

- Specific symptoms (fever, cough, pain location)
- Duration of symptoms (started 3 days ago)
- Severity level (mild, moderate, severe)
- What prompted seeking care
- Any relevant context

**Tips:**

- Be specific about symptoms
- Mention symptom duration
- Note severity and impact on daily life
- List any home treatments tried
- Mention if condition is worsening

**Continue Button:**

- Validates text has been entered
- Proceeds to Step 2

#### Step 2: Session Details

**Appointment Preferences:**

**Preferred Date and Time:**

- Calendar picker for date selection
- Time slot dropdown
- Shows provider availability
- May show estimated wait time for sooner appointments

**Timezone Selection:**

- Auto-detected from browser
- Option to change if traveling
- Displays as: "(GMT-07:00) Mountain Time"
- Important for appointment accuracy

**Provider Preference:**

- Select specific provider if desired
- Or choose "First available"
- Filter by:
  - Specialty
  - Language spoken
  - Previous providers
- View provider profiles

**Visit Type Selection:**

- **Scheduled Video Visit** (most common)
- **Urgent Care** (same-day, higher priority)
- **Follow-up** (related to previous visit)
- **Consultation** (new issue)
- **Prescription Refill Discussion**

**Insurance Information:**

- Select insurance provider
- Enter policy number if not on file
- Confirm coverage
- Co-pay amount displayed

**Continue Button:**

- Proceeds to Health Assessment or Confirmation

#### Step 3: Health Assessment

**When This Appears:**

- First appointment booking
- Significant time since last visit
- Provider requests updated information
- Change in health status indicated

This step collects comprehensive health background.

##### Current Health Conditions

**Prompt:** "Have you been diagnosed with any of the following?"

**Checkbox Options:**

- ☐ Diabetes
  - If checked: Type 1, Type 2, or Gestational
- ☐ Hypertension (High Blood Pressure)
  - If checked: Current BP medication?
- ☐ Asthma
  - If checked: Severity (Mild, Moderate, Severe)
- ☐ Heart Disease
  - If checked: Specify condition
- ☐ COPD (Chronic Obstructive Pulmonary Disease)
- ☐ Cancer
  - If checked: Type and current treatment status
- ☐ Mental Health Conditions
  - If checked: Specify (Depression, Anxiety, etc.)
- ☐ Other
  - Text input for conditions not listed

**None of the above** option available

##### Current Medications

**Prompt:** "Are you currently taking any medications?"

**Add Medication Interface:**

- **Add medication** button
- Each medication entry includes:
  - **Medication Name:** (e.g., "Lisinopril")
  - **Dosage:** (e.g., "10mg")
  - **Frequency:** Dropdown (Once daily, Twice daily, As needed, etc.)
  - **Prescribing Doctor:** (Optional)
  - **Start Date:** Date picker
  - **Purpose:** Brief description

- Multiple medications can be added
- Edit or Remove buttons for each entry
- Include over-the-counter medications
- Include supplements if relevant

**No medications** checkbox option

##### Allergies

**Prompt:** "Do you have any known allergies?"

**Add Allergy Interface:**

- **Add allergy** button
- Each allergy entry includes:
  - **Allergen Name:** (e.g., "Penicillin", "Peanuts")
  - **Reaction Type:** Dropdown
    - Rash/Hives
    - Anaphylaxis
    - Swelling
    - Difficulty Breathing
    - Nausea/Vomiting
    - Other
  - **Severity Level:** Dropdown
    - Mild
    - Moderate
    - Severe
    - Life-threatening
  - **Date of First Reaction:** (Optional)

- Multiple allergies can be added
- Edit or Remove buttons for each entry
- Critical for safe prescribing

**No known allergies** checkbox option

##### Emergency Contact

**Prompt:** "Who should we contact in case of emergency?"

**Required Fields:**

- **Full Name:** Emergency contact's complete name
- **Relationship:** Dropdown
  - Spouse
  - Parent
  - Sibling
  - Adult Child
  - Friend
  - Other
- **Phone Number:** With country code
  - Format: (+1) XXX-XXX-XXXX
  - Primary contact method

**Optional Fields:**

- **Secondary Phone:** Alternate number
- **Email Address:** For non-urgent contact

**Continue Button:**

- Validates required information completed
- Proceeds to Confirmation step

#### Step 4: Confirmation

**Review All Details:**

**Appointment Summary:**

- Date and Time (with timezone)
- Provider Name
  - Or "First Available Provider"
- Service Type
- Duration (estimated)
- Your health concerns (summary)

**Your Information:**

- Name
- Email
- Phone number
- Insurance details

**Health Information:**

- Conditions noted
- Medications listed (count)
- Allergies listed (count)
- Emergency contact name

**Actions:**

**Edit Button:**

- Return to any previous step
- Modify information as needed
- Doesn't lose entered data

**Confirm Button:**

- Finalizes appointment booking
- Processes request
- Shows loading indicator

**Cancel Button:**

- Abandons booking process
- Confirmation prompt
- Returns to dashboard

**Additional Options:**

- **Add to calendar** checkbox
  - Generates .ics file for download
  - Compatible with Google Calendar, Outlook, Apple Calendar
- **Send reminder** preferences
  - Email reminder
  - SMS reminder
  - Timing (24 hours before, 1 hour before, etc.)

### Post-Booking

**Confirmation Screen:**

**Appointment Confirmed Message:**

- Success checkmark icon
- "Your appointment has been scheduled!"
- Encouragement message

**Appointment Details Card:**

- **Appointment ID:** Reference number (e.g., "APT-123456")
- **Date and Time** prominently displayed
- **Provider Name** (or "Provider to be assigned")
- **Service Type**
- **Video Call Link** (available at appointment time)
- **How to Join** instructions

**Next Steps Information:**

- Join appointment 5 minutes early
- Test your audio and video beforehand
- Have photo ID ready
- Prepare any questions for provider
- Link to pre-appointment checklist

**Confirmation Delivery:**

- **Email Confirmation:**
  - Sent immediately to registered email
  - Includes all appointment details
  - Calendar attachment (.ics file)
  - Link to reschedule or cancel
  - Provider information

- **SMS Confirmation:**
  - Text message sent to phone number on file
  - Brief appointment details
  - Link to full details
  - Reminder that email was also sent

**Reminder Notifications:**

- **24 Hours Before:**
  - Email and/or SMS
  - Reminder to prepare questions
  - Tech check recommendation

- **1 Hour Before:**
  - Email and/or SMS
  - "Your appointment is in 1 hour"
  - Quick link to join

- **5 Minutes Before:**
  - In-app notification
  - "Your appointment is starting soon"
  - **Join Now** button active

**Calendar Integration:**

- **Add to Calendar** button
- Downloads .ics file
- Works with:
  - Google Calendar
  - Microsoft Outlook
  - Apple Calendar
  - Other calendar apps
- Includes:
  - Appointment time (with timezone)
  - Provider name
  - Video call link
  - Pre-appointment reminder

---

## Session Experience

Complete guide to the virtual visit experience from joining to completion.

### Waiting Room

**Joining the Appointment:**

**When to Join:**

- **5 minutes before** scheduled appointment time
- "Join" button becomes active
- Available from:
  - Dashboard (upcoming appointments)
  - Email confirmation link
  - SMS link
  - Calendar event link

**Pre-Call Device Checks:**

Automatic system checks before entering waiting room:

1. **Camera Test:**
   - Webcam detection
   - Video feed preview
   - "Can you see yourself?" confirmation
   - Option to switch cameras if multiple

2. **Microphone Test:**
   - Microphone detection
   - Audio level indicator
   - "Can you hear the test tone?" confirmation
   - Option to select different microphone

3. **Speaker Test:**
   - Speaker/headphones test
   - "Play test sound" button
   - Volumo control
   - "Can you hear this?" confirmation

4. **Browser Compatibility Check:**
   - Supported browser verification
   - Version check
   - Recommendations if issues detected
   - Links to download compatible browser

**Waiting Room Interface:**

**Status Display:**

- "Waiting for provider to join..."
- Estimated wait time if available
- Position in queue if applicable

**Real-Time Updates:**

- Provider status changes
  - "Provider notified"
  - "Provider preparing to join"
  - "Provider will join shortly"
- Dynamic messaging

**While Waiting:**

- Your video feed (can be toggled off)
- Audio settings adjustment
- Chat window (for urgent messages to staff)
- "Leave waiting room" button

**Provider Availability Indicator:**

- Green dot: Provider online and ready
- Yellow dot: Provider will join shortly
- Red dot: Provider delayed (with estimated time)

### During Video Call

Once provider joins, the full video interface activates.

**Video Interface Layout:**

**Main Video Display:**

- Provider's video feed (large view)
- Your video feed (smaller, picture-in-picture)
- Can swap sizes by clicking
- Full-screen mode option

**Control Bar (Bottom):**

1. **Microphone Button:**
   - Toggle mute/unmute
   - Visual indicator when muted
   - Should remain unmuted unless speaking over each other

2. **Camera Button:**
   - Toggle video on/off
   - Turn off if privacy needed briefly
   - Provider can request you turn it back on

3. **Screen Share:**
   - Share your screen with provider
   - Useful for showing:
     - Test results
     - Medication bottles
     - Skin conditions
     - Documents
   - Select which window/tab to share
   - Stop sharing button appears when active

4. **Chat Button:**
   - Opens text chat sidebar
   - Type messages to provider
   - Useful for:
     - Sharing links
     - Spelling out medication names
     - Sharing contact information
   - Messages saved in session record

5. **Settings Button:**
   - Adjust audio input/output devices
   - Change camera if multiple
   - Video quality settings
   - Audio enhancement toggle

6. **End Call Button (Red):**
   - Ends video session
   - Confirmation prompt
   - "Are you sure?" dialog

**Additional Features:**

**File Upload/Share:**

- Upload button (if available)
- Share documents, images, test results
- Drag-and-drop support
- File size limits apply
- Shared files become part of session record

**Full-Screen Mode:**

- Expands video to full screen
- Hides distractions
- Press ESC or click icon to exit
- Controls appear on hover

**Connection Quality Indicator:**

- Bars or dots showing connection strength
- Green: Excellent
- Yellow: Fair (may experience lag)
- Red: Poor (may disconnect)
- Automatic quality adjustment

**Recording Indicator:**

- If session is being recorded
- Red recording dot displayed
- "This session is being recorded" message
- Consent required before recording starts

### Post-Session

What happens after the video call ends.

**Session Summary Display:**

**Immediate Screen:**

- "Session Complete" message
- Duration of session
- Provider name
- Date and time

**What Happens Next:**

- Provider will complete visit notes
- Notes typically available within 24-48 hours
- You'll receive notification when notes published
- Prescriptions sent to pharmacy if applicable

**Actions Available:**

1. **Schedule Follow-Up:**
   - Button to book next appointment
   - Provider may have recommended follow-up timeframe
   - Returns to scheduling workflow

2. **Rate Your Experience:**
   - 5-star rating
   - Optional written feedback
   - Helps improve quality of care
   - Confidential feedback

3. **View Session Details:**
   - Basic session information
   - Notes not yet available
   - Can return later for full documentation

4. **Return to Dashboard:**
   - Default action
   - Session now appears in Past Appointments

**Access Visit Notes:**

**When Published:**

- Notification sent (email, SMS, in-app)
- "Your visit notes are ready"
- Link directly to notes

**Viewing Visit Notes:**

1. Navigate to Past Visits
2. Find the session
3. Click "View details"
4. Review provider's notes

**Visit Notes Content:**

- Chief Complaint (why you visited)
- History of Present Illness
- Assessment (provider's findings)
- Plan (treatment recommendations)
- Prescriptions issued
- Follow-up instructions
- Next appointment if scheduled

**Follow-Up Instructions:**

- Treatment plan details
- Medication instructions
- Activity restrictions if any
- Warning signs to watch for
- When to seek urgent care
- Follow-up appointment timing

**Prescription Information:**

- Medication names and dosages
- Quantity prescribed
- Refills authorized
- Pharmacy sent to
- Instructions for taking medication
- Potential side effects
- What to avoid (food, activities, other meds)

**Download/Print Options:**

- PDF version of visit notes
- Prescription summary
- Treatment plan
- Test orders or referrals
- Save for personal records

**Schedule Follow-Up:**

- Option presented if provider recommended
- Suggested timeframe (2 weeks, 1 month, etc.)
- Quick link to scheduling
- Pre-fills information for continuity

---

## Profile Menu

Located in the top-right corner, the profile menu provides access to account management and platform resources.

### Accessing Profile Menu

**Profile Avatar:**

- Displays user initials (e.g., "CP" for Cody PatientOne)
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

- **Full Name:** Patient's complete name
- **Email Address:** Account email
- Visual identification at top of menu

#### 2. Account Settings (SettingsGear icon)

- Opens Account Settings modal
- Manage profile and notifications
- Two tabs: My Account and Notifications

#### 3. Help (InfoCircle icon)

- Access help documentation
- Patient guides and FAQs
- Video tutorials
- How to use telehealth
- Troubleshooting tips
- Contact support information

#### 4. Privacy Policy (Policy icon)

- View complete privacy policy
- Patient rights and HIPAA information
- Terms of service
- Data handling and security
- How information is protected

#### 5. Log Out (LogOut icon)

- End current session
- Secure logout from platform
- Returns to login screen
- Clears session data

---

## Account Settings

Manage personal profile information and notification preferences through a modal interface.

### Accessing Account Settings

1. Click profile avatar in top-right corner
2. Select "Account settings" from dropdown menu
3. Modal opens with tab navigation

### Account Settings Navigation

Two tabs available for Patients:

- **My Account** - Profile and personal information
- **Notifications** - Notification preferences

---

### My Account Tab

Comprehensive profile management for personal and medical information.

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
- Patient's full name below avatar
- Email address below name

#### Profile Details Section

**Editable Fields:**
Click "Edit" button (Edit icon) to modify:

**Personal Information:**

1. **First Name**
   - Patient's given name
   - Required field
   - Used in all communications

2. **Last Name**
   - Patient's family name
   - Required field

3. **Date of Birth (DOB)** _(Patient-specific field)_
   - Date picker for selection
   - Format: MM/DD/YYYY
   - Example: "05/30/1998"
   - Required for age verification
   - Used for age-appropriate care
   - Cannot be changed after initial entry (contact support if incorrect)

4. **Sex Assigned at Birth** _(Patient-specific field)_
   - Dropdown selection
   - Options: Male, Female, Intersex
   - Medical relevance for certain conditions
   - Different from gender identity
   - Used for appropriate medical screening

**Contact Information:**

5. **Country**
   - Country dropdown selection
   - Used for address formatting
   - Shows "N/A" if not set

6. **State**
   - State/Province selection
   - Dependent on country selected
   - Shows "N/A" if not set

7. **City**
   - Free text field
   - Optional
   - Shows "N/A" if empty

8. **Zip Code**
   - Postal code field
   - Format depends on country
   - Optional
   - Shows "N/A" if empty

9. **Address 1**
   - Primary street address
   - Apartment/unit number can be included
   - Optional
   - Shows "N/A" if empty

10. **Address 2**
    - Secondary address line
    - Building name, floor, etc.
    - Optional
    - Shows "N/A" if empty

11. **Phone Number**
    - Contact phone number
    - Format: (+X) XXXXXXXXXX
    - Used for appointment reminders
    - Shows "N/A" if not provided

**Insurance Information:** _(Patient-specific fields)_

12. **Tax ID**
    - Social Security Number or Tax ID
    - Format: "000" (masked for security)
    - Used for billing and insurance
    - Partially masked when displayed
    - Encrypted in database

13. **Insurance**
    - Insurance provider ID or code
    - Example: "222"
    - Links to insurance company
    - Used for claims processing

14. **Insurance Policy Number**
    - Your specific policy number
    - Example: "111"
    - Required for billing
    - Verify with insurance card

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
  - Affects appointment display times

**Importance:**

- Ensures you see appointments in your local time
- Critical if you travel frequently
- Affects when reminders are sent
- Syncs with provider's calendar

#### Account Deletion

**Delete Account Section:**

- "Delete account" link at bottom of settings
- **Warning:** This action is irreversible
- Opens confirmation dialog with consequences:
  - All medical records removed
  - Appointment history deleted
  - Cannot be recovered
- Requires password confirmation
- Requires typing "DELETE" to confirm
- Alternative: Contact support for account deactivation

---

### Notifications Tab

Configure how and when to receive appointment reminders and health alerts.

#### Overview

**Description:**
"Manage your notification preferences"

Control which notification methods you receive and how you're reminded about appointments.

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

**What You'll Receive:**

- Appointment confirmations
- Appointment reminders (24hr, 1hr before)
- Visit notes published notifications
- Prescription ready alerts
- Test results available
- Provider messages
- Platform updates and tips

**Email Delivery:**

- Sent to patient's registered email
- HTML formatted with actionable links
- Option to manage preferences in each email
- Unsubscribe link for non-critical emails

##### 2. SMS Notifications

**Display:**

- "SMS" heading
- Phone number if added, or "Add phone number" link
- Toggle checkbox (disabled until phone number added)

**Setup Process:**

1. Click "Add phone number" link
2. Enter phone number with country code
3. Click "Send verification code"
4. Check your phone for SMS with 6-digit code
5. Enter verification code in platform
6. Phone number verified and linked
7. Enable SMS notifications toggle

**Settings:**

- **Enabled:** Receive text message notifications
- **Disabled:** No SMS notifications
- Checkbox disabled (grayed out) until phone verified
- Can update phone number anytime

**What You'll Receive:**

- Appointment reminders (configurable timing)
- "Appointment starting in 5 minutes" alerts
- Visit notes ready
- Prescription ready at pharmacy
- Critical health alerts
- Provider trying to reach you

**SMS Content:**

- Concise messages (SMS character limits)
- Essential information only
- Links to full details in platform
- Reply options for some messages

**Carrier Rates:**

- Standard SMS rates may apply from your carrier
- Data rates for links in messages
- No charges from eNow2 platform

##### 3. In-App Notifications

**Display:**

- "In-app" heading
- Toggle checkbox to enable/disable

**Settings:**

- **Enabled (checked):** Show browser/system notifications
- **Disabled (unchecked):** No in-app popups

**In-App Behavior:**

- Browser notification popups
- Desktop notifications when platform not focused
- Notification bell icon badge count
- Sound alerts for urgent notifications (configurable)
- Vibration on mobile devices (if supported)

**Notification Bell:**

- Click to view all in-app notifications
- Chronological list of recent notifications
- Read/unread indicators
- Click notification to navigate to relevant section
- "Clear all" button to mark all as read
- Badge shows unread count

**Browser Permission:**

- First time enabling: browser prompts for permission
- Must click "Allow" in browser notification permission popup
- Can be revoked in browser settings anytime
- Re-enabling requires granting permission again

**Types of In-App Notifications:**

- Appointment starting soon
- Provider has joined waiting room
- Visit notes published
- New message from provider
- Prescription sent to pharmacy
- Test results available

#### Session Reminders Section

Configure advance reminders for scheduled appointments.

**Description:**
"Set the time you'd like to be reminded before the session starts."

**Purpose:**

- Ensure you don't miss appointments
- Give time to prepare
- Test equipment before session
- Gather necessary information

##### Current Reminder Display

**Default Reminder:**

- "Remind me 5 minutes before the session"
- Provides last-minute alert
- Enough time to join and run equipment checks

**Reminder Deliverythrough:**

- All enabled notification methods (Email, SMS, In-app)
- Includes "Join Now" link
- Shows appointment details

**Change Reminder Timing:**

1. Click "Change" link
2. Opens reminder configuration dialog
3. Select reminder time from dropdown:
   - **5 minutes before** (last-minute alert)
   - **10 minutes before**
   - **15 minutes before** (recommended)
   - **30 minutes before**
   - **1 hour before** (time to prepare)
   - **2 hours before**
   - **4 hours before**
   - **1 day before** (advance notice)
4. Click "Save" to apply

**Recommended Settings:**

- 1 day before: Plan your day
- 1 hour before: Prepare materials
- 5-15 minutes before: Equipment check and join

##### Add Additional Reminders

**"Add reminder" Button:**

- Click to configure multiple reminder times
- Different reminders for same appointment
- Each with own delivery preferences

**Multiple Reminders Example:**

- 1 day before: Email reminder
- 1 hour before: SMS reminder
- 5 minutes before: In-app notification

**Managing Multiple Reminders:**

- Each reminder listed separately
- "Change" link to modify timing
- "Remove" link to delete
- Can have up to 5 reminders per appointment

**Reminder Content:**

- Appointment date and time
- Provider name
- Service type
- Your health concerns (summary)
- **"Join Now" button/link** (activates near appointment time)
- Quick actions (Reschedule, Cancel)

---

## Best Practices

Guidelines for optimal telehealth experience and effective healthcare management.

### Appointment Preparation

**Before Scheduling:**

- Review symptoms and their duration
- Note what makes symptoms better or worse
- List questions for provider
- Check insurance coverage
- Verify contact information is current

**Technical Preparation:**

- **Test Equipment Ahead:**
  - Run audio/video test 24 hours before appointment
  - Test again 10 minutes before session
  - Ensure camera and microphone permissions enabled
- **Internet Connection:**
  - Use wired connection if possible (more stable than Wi-Fi)
  - Close unnecessary tabs and applications
  - Ensure nobody else streaming/downloading on same network
  - Minimum 1 Mbps upload/download for video calls
- **Environment Setup:**
  - Choose quiet, private location
  - Good lighting (face camera toward light source)
  - Neutral background
  - Minimize distractions
  - Inform household members of appointment

**Information to Have Ready:**

- Photo ID (may be required for verification)
- Insurance card (front and back)
- Current medication list
  - Include over-the-counter medications
  - Supplements and vitamins
  - Dosages and frequencies
- List of known allergies
- Recent test results or imaging
- Medical history summary
- Questions written down

### During Appointments

**Joining the Session:**

- Join waiting room **5 minutes early**
- Complete equipment checks
- Have materials gathered and nearby
- Be ready when provider joins

**During the Call:**

- **Communication:**
  - Speak clearly and at normal pace
  - Look at camera when speaking (not screen)
  - Allow provider to finish questions before answering
  - Ask for clarification if needed
  - Don't hesitate to ask questions

- **Taking Notes:**
  - Have paper and pen ready
  - Write down key points
  - Note medication names and dosages
  - Record follow-up instructions
  - Ask provider to repeat if you missed something

- **Showing Concerns:**
  - Use camera to show areas of concern (rashes, injuries)
  - Move closer to camera if needed
  - Use good lighting
  - Follow provider's positioning instructions

- **Be Honest and Thorough:**
  - Answer questions completely and honestly
  - Mention all symptoms, even if seem unrelated
  - Share lifestyle factors (diet, exercise,stress)
  - Disclose all medications and supplements

- **Technical Issues:**
  - If connection drops, rejoin immediately
  - Use chat function if audio fails
  - Have phone number to call if complete failure
  - Stay calm and patient

**Confirming Understanding:**

- Repeat back key instructions
- Ask "what if" questions
- Clarify medication names and dosages
- Confirm follow-up plan
- Ask about warning signs to watch for

### After Appointments

**Immediate Actions:**

- **Review Session:**
  - Review notes you took
  - Ensure you understand all instructions
  - Write down any additional questions

- **Prescriptions:**
  - Note when to expect prescription at pharmacy
  - Understand how to take medication
  - Note side effects to watch for
  - Set reminders for medication times

- **Follow-Up Care:**
  - Schedule follow-up appointment if needed
  - Set reminders for any recommended tests
  - Note timeline for expected improvement
  - Know when to seek urgent care

**Within 24-48 Hours:**

- Check for visit notes publication
- Review provider's documentation
- Read assessment and plan carefully
- Download/print notes for records

**Ongoing:**

- Follow prescribed treatment plan
- Take medications as directed
- Complete recommended lifestyle changes
- Track symptoms or improvements
- Attend follow-up appointments

**If Concerns Arise:**

- Message provider through platform if non-urgent
- Follow instructions for urgent issues
- Don't wait if symptoms worsen significantly
- Know when to call 911 (chest pain, breathing trouble, severe bleeding, etc.)

### Health Profile Management

**Keep Information Current:**

- Update medications list when changed
- Add new allergies immediately
- Update contact information when moving
- Verify emergency contact information annually
- Update insurance information whenpolicies change

**Vitals Tracking:**

- Measure vitals regularly for chronic conditions
- Track before and after medication changes
- Consistent timing (e.g., every morning)
- Note any unusual readings
- Share trends with provider at visits

**Documentation:**

- Upload new test results
- Save provider notes from visits
- Keep medication list current
- Document adverse reactions
- Track symptoms in diary for complex issues

### Security & Privacy

**Account Security:**

- **Password Best Practices:**
  - Use strong, unique password
  - Do not reuse passwords from other sites
  - Change password if compromised
  - Don't share password with anyone
  - Enable two-factor authentication if available

- **Secure Access:**
  - Log out when using shared devices
  - Don't save password on public computers
  - Clear browser history on shared devices
  - Don't access from public Wi-Fi without VPN
  - Lock screen when stepping away

- **Recognizing Scams:**
  - eNow2 will never ask for password via email
  - Verify URLs before entering credentials
  - Don't click suspicious links in emails
  - Report phishing attempts to support
  - Contact support if unsure about communication

**Session Privacy:**

- Conduct appointments in private space
- Use headphones if others in household
- Don't discuss appointment details in public
- Close platform when finished
- Don't record sessions without provider consent

**Data Protection:**

- Review privacy settings regularly
- Understand what data is shared and with whom
- Only share information necessary for care
- Know your rights under HIPAA
- Report suspicious activity immediately

### Communication with Providers

**Messaging Guidelines:**

- Use secure platform messaging only
- Be clear and concise
- Include relevant context
- Don't expect immediate responses for non-urgent issues
- Mark urgent issues appropriately

**When to Message vs. Schedule Appointment:**

- **Quick Messages:** Prescription refills, clarifying instructions, simple follow-up questions
- **Schedule Appointment:** New symptoms, complex issues, need examination, regular checkups

**Response Time Expectations:**

- Non-urgent messages: Within 1-2 business days
- Urgent messages: Within 24 hours
- Critical issues: Use "See a Provider Now" or call 911

### Managing Appointments

**Scheduling Strategy:**

- Book appointments well in advance for routine care
- Use "See a Provider Now" only for urgent issues
- Schedule follow-ups before leaving current appointment
- Consider provider availability when scheduling
- Set calendar reminders well before appointment

**If You Need to Reschedule:**

- Do so at least 24 hours in advance
- Use reschedule link in confirmation email
- Or go to dashboard and manage appointments
- Be aware of cancellation policies
- Communicate promptly

**No-Show Policy:**

- Arrive on time (in waiting room)
- Multiple no-shows may affect account
- Communicateif running late - provider may wait a few minutes
- Emergencies are understandable - contact support
- Respect provider's time as they respect yours

### Troubleshooting Common Issues

**Can't Log In:**

- Verify email address is correct
- Check Caps Lock is off
- Use "Forgot Password" to reset
- Check spam folder for reset emails
- Clear browser cache and cookies
- Try different browser
- Contact support if persists

**Equipment Not Working:**

- Check browser permissions
- Ensure correct camera/microphone selected
- Restart browser
- Update browser to latest version
- Check device drivers (Windows)
- Test with different browser
- Contact IT support if needed

**Poor Video/Audio Quality:**

- Check internet connection speed
- Close other applications using bandwidth
- Move closer to Wi-Fi router
- Use wired connection if available
- Reduce video quality in settings
- Ensure others aren't streaming on same network

**Can't Find Visit Notes:**

- Notes can take up to 48 hours
- Check Past Visits section
- Look for email notification
- Check spam folder
- Contact provider if delayed beyond 48 hours

---

## Summary

The Patient role empowers individuals to manage their healthcare journey through:

- **Easy Appointment Scheduling**: Multi-step booking with health assessment
- **Virtual Visits**: High-quality video consultations from home
- **Health Tracking**: Vitals scanning and health profile management
- **Complete Access**: Past visit records and provider notes
- **Flexible Notifications**: Multi-channel reminders and alerts
- **Privacy Controls**: HIPAA-compliant security and data protection

For additional support or questions about using the patient portal, access Help from the profile menu or contact your healthcare provider's support team.

---

[← Back to Role Index](./README.md)
