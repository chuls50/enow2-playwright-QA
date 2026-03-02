# Exploration Queue

**Generated:** March 1, 2026  
**Agent Version:** 1.0  
**Total Items:** 27

---

## Queue Status

```
High Priority:    8 items
Medium Priority:  13 items
Low Priority:     6 items
Completed:        0 items
```

---

## High Priority - Missing Critical Workflows

### Admin Role Gaps

- [ ] **admin/institution-settings/white-label** - White Label tab (colors, logo, CSS) - Referenced but no workflow
- [ ] **admin/document-management/create-template** - Template creation process - Mentioned but no steps
- [ ] **admin/visit-notes/template-management** - Visit note template CRUD - Feature exists but undocumented
- [ ] **admin/data-reporting/export-analytics** - Report generation and export - Dashboard visible but workflow missing

### Coordinator Role Gaps

- [ ] **coordinator/command-center/realtime-monitoring** - WebSocket updates and real-time data - Core feature, no diagram
- [ ] **coordinator/command-center/session-assignment** - Assigning providers to waiting patients - Critical workflow gap

### Provider Role Gaps

- [ ] **provider/calendar/external-integration** - Google/Outlook calendar sync setup - Mentioned, no workflow
- [ ] **provider/my-patients/add-patient** - Adding patients to provider list - Button exists, process unknown

---

## Medium Priority - Incomplete Documentation

### Session Management

- [ ] **sessions/error-states** - Network failures, camera/mic issues during sessions
- [ ] **sessions/multi-participant** - Sessions with >2 participants
- [ ] **sessions/recording-workflow** - Session recording start/stop/access
- [ ] **sessions/chat-during-call** - In-session chat functionality

### Patient Role Extensions

- [ ] **patient/health-profile/all-fields** - Complete field mapping (Insurance, Tax ID, etc.)
- [ ] **patient/vitals-scan/error-handling** - Camera permission denied, device not found
- [ ] **patient/appointment-scheduling/insurance-verification** - Insurance validation during booking

### Authentication Extensions

- [ ] **auth/password-complexity** - Password requirements and validation
- [ ] **auth/session-timeout** - Automatic logout behavior
- [ ] **auth/multi-institutional** - Users with multiple institution access

### Combined Roles

- [ ] **combined-roles/provider-admin** - Navigation and feature access for dual roles
- [ ] **combined-roles/admin-coordinator** - Feature intersection documentation
- [ ] **combined-roles/provider-admin-coordinator** - Triple role permissions and UI

### Notification System

- [ ] **notifications/email-sms-setup** - Complete notification preferences workflow
- [ ] **notifications/session-reminders** - Reminder timing and delivery methods

### Device Role Extensions

- [ ] **device/session-experience** - Complete patient session flow on shared devices
- [ ] **device/staff-assistance** - Staff-guided patient workflows

---

## Low Priority - Documentation Refresh

### Screenshot Updates

- [ ] **screenshots/ui-refresh** - Update all screenshots to match current UI (67 screenshots)
- [ ] **screenshots/mobile-responsive** - Capture mobile/tablet views if supported
- [ ] **screenshots/error-states** - Capture error messages and validation states

### Diagram Improvements

- [ ] **diagrams/sequence-charts** - Add sequence diagrams for multi-user workflows
- [ ] **diagrams/navigation-maps** - Role-based navigation overview diagrams

### Cross-Platform Documentation

- [ ] **responsive/mobile-tablet** - Document mobile/tablet interface differences (if supported)

---

## Completed Items

_No items completed yet_

---

## Queue Management

### Adding Items

```bash
# Add new item to queue
# Format: [priority]/[role]/[feature]/[specific-area] - [description]
```

### Priority Definitions

- **High:** Missing core functionality documentation that users need
- **Medium:** Incomplete workflows or edge cases that should be documented
- **Low:** Nice-to-have updates, UI refreshes, diagram improvements

### Assignment Rules

Items are auto-assigned based on:

1. **Missing Mermaid Diagrams** → High Priority
2. **Mentioned but No Workflow** → High Priority
3. **Visible UI Elements No Documentation** → Medium Priority
4. **Error States/Edge Cases** → Medium Priority
5. **Screenshot/Diagram Updates** → Low Priority

---

## Exploration Notes

### Gap Analysis Source

Items identified by analyzing:

- ✅ `docs/latex/workflow-diagrams.md` (466 lines) - Existing diagrams
- ✅ `docs/roles/project-wiki.md` (184 lines) - Role overview
- ✅ `docs/roles/admin-role.md` (2909 lines) - Admin documentation
- ✅ `docs/roles/provider-role.md` (1495 lines) - Provider workflows
- ✅ `docs/roles/coordinator-role.md` (3150 lines) - Coordinator features
- ✅ `docs/roles/patient-role.md` (1931 lines) - Patient capabilities
- ✅ `docs/roles/device-role.md` (1849 lines) - Device limitations
- ✅ `docs/latex/README.md` (368 lines) - LaTeX source analysis
- ✅ Manual review of role documentation for TODOs and gaps

**Analysis Complete:** March 1, 2026 - 27 items identified across 5 priority levels

### Common Gap Patterns

1. **Feature Mentioned, No Workflow:** Institution Settings tabs, Calendar integrations
2. **Button/UI Exists, No Process:** Document templates, Patient management
3. **Error States Missing:** All roles lack error handling documentation
4. **Multi-User Scenarios:** Command Center workflows need sequence diagrams

---

## Agent Execution Plan

### Session 1: High Priority Admin (Estimated: 2 hours)

1. Admin > Institution Settings > White Label tab
2. Admin > Document Management > Template creation
3. Admin > Visit Notes > Template management
4. Admin > Data Reporting > Analytics export

### Session 2: High Priority Coordinator (Estimated: 1.5 hours)

1. Coordinator > Command Center > Real-time monitoring
2. Coordinator > Command Center > Provider assignment

### Session 3: High Priority Provider (Estimated: 1 hour)

1. Provider > Calendar > External integrations
2. Provider > My Patients > Add patient workflow

### Session 4: Medium Priority Items (Estimated: 3 hours)

1. Session error states across all roles
2. Patient health profile complete documentation
3. Authentication edge cases

### Session 5: Low Priority Updates (Estimated: 2 hours)

1. Screenshot refresh
2. Diagram improvements
3. Mobile/responsive documentation

---

## Dependencies

Some queue items depend on others:

- `sessions/recording-workflow` depends on `sessions/basic-flow`
- `auth/multi-institutional` depends on `admin/institution-settings/*`
- `screenshots/ui-refresh` should be done after workflow exploration

---

## Success Metrics

**For each completed item:**

- [ ] Mermaid diagram generated and validated
- [ ] Screenshots captured (2-5 per workflow)
- [ ] Documentation section updated
- [ ] Cross-references added
- [ ] Version/date stamps updated

**Overall completion target:**

- High Priority: 100% (8/8)
- Medium Priority: 85% (11/13)
- Low Priority: 50% (3/6)
