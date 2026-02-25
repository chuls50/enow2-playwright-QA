# LaTeX User Manual Source Files

This folder contains all the source documentation files needed to create a comprehensive LaTeX user manual for the eNow2 telehealth platform.

## Files Included

### 1. project-wiki.md

**Purpose:** Main overview and introduction

- Application overview
- User roles summary table
- Common features across all roles
- Getting started guide
- System requirements
- Navigation structure

**Suggested LaTeX Usage:** Front matter, introduction chapter, and quick reference appendix

---

### 2. admin-role.md (Complete Admin Documentation)

**Content:**

- Users management (create, edit, invite, device IDs)
- Institution Settings (5 tabs):
  - General Settings (logo, support contact, timezone)
  - Email Templates (SMTP, appointment notifications)
  - Video Settings (quality, recording, screen sharing)
  - General (institution details, physical address)
  - Integrations (external calendar sync)
- Document Management (templates, packets)
- Visit Notes management
- Data Reporting (analytics, session metrics)
- Profile Menu & Account Settings (2 tabs)

**Suggested LaTeX Usage:** Chapter 3 or dedicated Admin section

---

### 3. provider-role.md (Complete Provider Documentation)

**Content:**

- Dashboard and scheduling
- Past Sessions history
- Providers directory
- My Patients management
- **Calendar tab** (Provider-only feature)
  - Daily availability (Mon-Sun)
  - Calendar integrations (Google, Outlook, iCloud)
  - Time zone settings
- 10 detailed provider workflows
- Profile Menu & Account Settings (3 tabs: My Account, Calendar, Notifications)
- Best practices for healthcare delivery

**Suggested LaTeX Usage:** Chapter 4 or Provider Section

**Note:** Provider role has unique Calendar tab (3 Account Settings tabs vs. 2 for other roles)

---

### 4. patient-role.md (Complete Patient Documentation)

**Content:**

- Dashboard and appointments
- Schedule Appointment workflow (4-step process):
  1. Health Concerns
  2. Session Details
  3. Health Assessment
  4. Confirmation
- Past Visits history
- Health Profile management
- **Vitals Scan** (measure vital signs with connected devices)
- Session Experience (waiting room, during call, post-session)
- Profile Menu & Account Settings (2 tabs)
- **Unique profile fields:** DOB, Sex assigned at birth, Tax ID, Insurance

**Suggested LaTeX Usage:** Chapter 5 or Patient Section

**Note:** Patient role has unique medical/insurance fields in profile

---

### 5. coordinator-role.md (Complete Coordinator Documentation)

**Content:**

- Dashboard and scheduling
- Past Sessions management
- Providers directory
- Patients directory
- **Command Center** (Coordinator-exclusive feature)
  - Real-time monitoring dashboard
  - Requests panel (appointment requests)
  - Waiting Rooms panel (patients waiting)
  - Active Sessions panel (ongoing video calls)
  - WebSocket real-time updates
- Schedule Session workflow (5 steps)
- Notifications system
- Profile Menu & Account Settings (2 tabs)
- Best practices for coordination

**Suggested LaTeX Usage:** Chapter 6 or Coordinator Section

**Note:** Command Center is unique to Coordinator role - critical operational feature

---

### 6. device-role.md (Complete Device Documentation)

**Content:**

- **Device ID authentication** (numeric ID only, no email/password)
- Minimal interface (Dashboard only - no other navigation)
- Session experience for shared devices
- Device management best practices:
  - Initial setup
  - Daily operations
  - Between patients
  - End of day procedures
- Security considerations for shared devices
- Hardware recommendations
- **Limitations** section (what devices cannot do)
- Troubleshooting guide

**Suggested LaTeX Usage:** Chapter 7 or Device/Kiosk Section

**Note:** Device role is intentionally restricted for security in shared clinical settings

---

## Documentation Structure Across All Files

Each role document follows a consistent structure:

1. **Overview** - Role purpose and capabilities
2. **Navigation Menu** - Available menu items (role-specific)
3. **Feature Descriptions** - Detailed functionality breakdown
4. **Workflows** - Step-by-step processes with screenshots references
5. **Profile Menu** - Access to account settings (common across roles)
6. **Account Settings** -
   - My Account tab (profile, language, timezone)
   - Calendar tab (Provider only)
   - Notifications tab (all roles)
7. **Best Practices** - Recommendations and tips
8. **Summary** - Key takeaways

---

## Key Differences Between Roles (Important for LaTeX Structure)

### Account Settings Tabs:

- **Provider:** 3 tabs (My Account, **Calendar**, Notifications)
- **All Others:** 2 tabs (My Account, Notifications)

### Unique Features by Role:

- **Admin:** Institution Settings, Document Management, Visit Notes, Data Reporting
- **Provider:** Calendar tab with daily availability and integrations
- **Patient:** Vitals Scan, Health Profile, unique medical fields (DOB, Sex, Tax ID, Insurance)
- **Coordinator:** Command Center (real-time monitoring - exclusive feature)
- **Device:** Device ID authentication, minimal interface, intentional limitations

### Navigation Complexity:

- **Most Complex:** Admin (5 menu items), Coordinator (5 menu items with Command Center)
- **Standard:** Provider (4 items), Patient (4 items)
- **Most Restricted:** Device (1 item - Dashboard only)

---

## Suggested LaTeX Document Structure

```latex
\documentclass[12pt,a4paper]{book}

% Front Matter
- Title Page
- Table of Contents
- List of Figures (if screenshots included)
- Preface/Introduction (from project-wiki.md)

% Part I: Getting Started
\part{Getting Started}
\chapter{Introduction}
  - Overview (from project-wiki.md)
  - System Requirements
  - Browser Support
  - First-Time Login

\chapter{Common Features}
  - Profile Menu (all roles)
  - Account Settings (2-tab vs 3-tab differences)
  - Navigation Basics
  - Notification System

% Part II: User Roles
\part{User Roles and Capabilities}

\chapter{Administrator Role}
  - Content from admin-role.md
  - Users Management
  - Institution Settings (5 tabs)
  - Document Management
  - Visit Notes
  - Data Reporting

\chapter{Provider Role}
  - Content from provider-role.md
  - Dashboard and Scheduling
  - Past Sessions
  - Provider Directory
  - My Patients
  - Calendar Management (unique feature)
  - 10 Provider Workflows

\chapter{Patient Role}
  - Content from patient-role.md
  - Dashboard
  - Scheduling Appointments (4-step workflow)
  - Vitals Scan
  - Health Profile
  - Session Experience

\chapter{Coordinator Role}
  - Content from coordinator-role.md
  - Dashboard
  - Provider and Patient Directories
  - Command Center (exclusive feature)
  - Real-time Monitoring
  - Scheduling Workflow

\chapter{Device Role}
  - Content from device-role.md
  - Device ID Authentication
  - Kiosk Configuration
  - Session Management
  - Security and Limitations

% Part III: Appendices
\part{Appendices}
\appendix
\chapter{Troubleshooting}
\chapter{Best Practices by Role}
\chapter{Keyboard Shortcuts}
\chapter{Quick Reference Guide}
\chapter{Glossary}
```

---

## Content Statistics

- **Total Pages:** ~500+ pages of comprehensive documentation
- **Total Words:** ~150,000+ words
- **Roles Covered:** 5 primary roles + combined roles
- **Workflows Documented:** 20+ detailed workflows
- **Features Described:** 50+ major features
- **Screenshots Referenced:** Multiple per role

---

## Conversion Tips for LaTeX

### Markdown to LaTeX Considerations:

1. **Headings:**
   - `#` → `\chapter{}`
   - `##` → `\section{}`
   - `###` → `\subsection{}`
   - `####` → `\subsubsection{}`

2. **Lists:**
   - Bulleted lists → `\begin{itemize}...\end{itemize}`
   - Numbered lists → `\begin{enumerate}...\end{enumerate}`

3. **Code Blocks:**
   - Use `\begin{verbatim}` or `listings` package
   - JavaScript locators → `\texttt{}` for inline code

4. **Tables:**
   - Convert markdown tables to `tabular` environment
   - Consider `longtable` for multi-page tables

5. **Emphasis:**
   - `**bold**` → `\textbf{}`
   - `*italic*` → `\textit{}`
   - `` `code` `` → `\texttt{}`

6. **Links:**
   - Internal references → `\ref{}` and `\label{}`
   - External URLs → `\href{}{}` with `hyperref` package

7. **Special Characters:**
   - Watch for: `&`, `%`, `$`, `#`, `_`, `{`, `}`, `~`, `^`, `\`
   - Escape appropriately in LaTeX

8. **Screenshots Placeholders:**
   - Currently text descriptions
   - Replace with `\includegraphics{}` if adding actual screenshots

---

## Recommended LaTeX Packages

```latex
\usepackage{graphicx}      % For images/logos
\usepackage{hyperref}      % For clickable links and references
\usepackage{listings}      % For code blocks
\usepackage{xcolor}        % For colored text/boxes
\usepackage{longtable}     % For multi-page tables
\usepackage{booktabs}      % For professional tables
\usepackage{geometry}      % For page layout
\usepackage{fancyhdr}      % For headers/footers
\usepackage{tocloft}       % For TOC customization
\usepackage{titlesec}      % For section formatting
\usepackage{enumitem}      % For list customization
\usepackage{caption}       % For figure captions
\usepackage{subcaption}    % For subfigures
\usepackage{appendix}      % For appendices
\usepackage{glossaries}    % For glossary
\usepackage{index}         % For index
```

---

## Additional Notes

- All files are in **Markdown format** (`.md`)
- Files contain **comprehensive functional documentation** (no technical/developer content)
- **Screenshots folder** exists but currently empty - you may want to add actual screenshots
- **Links between documents** use relative paths - will need to be converted to LaTeX cross-references
- **Profile menu locator** for automation is included (can be omitted in user manual)
- **Date references:** Last updated February 24-25, 2026 (adjust as needed)

---

## What's NOT Included (Developer Documentation)

These files are **NOT copied** as they are technical/developer-focused:

- `AUTHENTICATION.md` - Technical guide for developers on Playwright authentication
- `POM-BEST-PRACTICES.md` - Page Object Model patterns for test automation
- `POM-NAMING-CONVENTIONS.md` - Naming conventions for test code
- `eNow2-User-Manual.md` - Original monolithic version (superseded by role-specific docs)
- `USER-MANUAL.md` - Incomplete/old version

If you need any of these for reference, they're available in the parent `docs/` folder.

---

## Contact & Support

For questions about the documentation or LaTeX conversion, refer to:

- **Application URL:** https://portal.qa-encounterservices.com
- **Project Repository:** (add if applicable)

---

**Ready for LaTeX Conversion:** All files in this folder are ready to be uploaded to Claude or another tool for LaTeX document generation.

**Estimated LaTeX Document Size:** 400-600 pages depending on layout, screenshots, and formatting choices.
