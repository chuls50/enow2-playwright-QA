# Agent Configuration

**Document Workflow Agent v1.0**  
**Created:** March 1, 2026  
**Purpose:** Autonomous exploration and documentation of eNow2 application workflows

---

## Application Settings

```yaml
app:
  url: "https://portal.qa-encounterservices.com"
  auth_directory: "playwright/.auth/"
  timeout: 30000
  retries: 3
```

## Authentication

**Available Storage States:**
- `admin.json` - Full administrative access
- `provider.json` - Healthcare provider role  
- `patient.json` - Patient role
- `coordinator.json` - Coordinator role with Command Center
- `device.json` - Device ID authentication

**Combined Roles:**
- `admin-coordinator.json`
- `provider-admin.json` 
- `provider-coordinator.json`
- `provider-admin-coordinator.json`
- `super-admin.json`

**Secondary Accounts (for multi-user testing):**
- `admin-two.json`, `provider-two.json`, `patient-two.json`, etc.

---

## Exploration Settings

```yaml
exploration:
  max_steps_per_feature: 20
  max_depth: 5
  screenshot_on_state_change: true
  snapshot_interval: "after_click"
  wait_after_navigation: 2000
  wait_after_click: 1000
  
  # Elements to avoid clicking
  avoid_selectors:
    - "[data-testid='logout']"
    - "button[type='submit'][class*='delete']"
    - "a[href='/logout']"
    
  # Safe elements to always explore
  safe_selectors:
    - "nav a"
    - "button[type='button']"
    - ".tab-button"
    - "[role='tab']"
```

---

## Roles Priority

```yaml
roles:
  primary:
    - admin      # 5 nav items: Users, Institution Settings, Documents, Visit Notes, Data Reporting
    - coordinator # 5 nav items: Dashboard, Past Sessions, Providers, Patients, Command Center
    - provider   # 4 nav items: Dashboard, Past Sessions, Providers, My Patients  
    - patient    # 4 nav items: Dashboard, Past Visits, Health Profile, Vitals Scan
    - device     # 1 nav item: Dashboard (most restricted)
    
  combined:
    - provider-admin
    - admin-coordinator
    - provider-coordinator
    - provider-admin-coordinator
    
  secondary:
    - super-admin
```

---

## Output Configuration

```yaml
output:
  # Documentation files to update
  workflow_diagrams: "docs/latex/workflow-diagrams.md"
  project_wiki: "docs/latex/project-wiki.md"
  
  # Role documentation files  
  admin_docs: "docs/latex/admin-role.md"
  provider_docs: "docs/latex/provider-role.md"
  patient_docs: "docs/latex/patient-role.md"
  coordinator_docs: "docs/latex/coordinator-role.md"
  device_docs: "docs/latex/device-role.md"
  
  # Agent files
  exploration_log: "docs/agent/exploration-log.md"
  exploration_queue: "docs/agent/exploration-queue.md"
  screenshots_dir: "docs/agent/screenshots/"
  
  # Version updates
  update_versions: true
  update_last_modified: true
```

---

## Mermaid Generation Rules

```yaml
mermaid:
  default_orientation: "TD"  # Top Down
  max_nodes: 15
  node_naming: "descriptive"  # vs "short" 
  
  # Diagram types by scenario
  types:
    navigation: "flowchart LR"     # Left to Right for menus
    workflows: "flowchart TD"      # Top Down for processes  
    multi_user: "sequenceDiagram"  # For role interactions
    states: "stateDiagram-v2"      # For state changes
    
  # Naming conventions
  naming:
    files: "workflow-{role}-{feature}-{step}.png"
    sections: "{category_number}.{sub_number} {workflow_name}"
```

---

## Feature Categories

**For organizing exploration queue and documentation:**

```yaml
categories:
  authentication:
    - login_flow
    - password_reset
    - account_creation
    - device_id_login
    
  session_management:
    - scheduled_appointments
    - on_demand_sessions
    - session_join_flow
    - session_details
    
  admin_workflows:
    - user_invitation
    - institution_settings
    - document_management
    - visit_notes
    - data_reporting
    
  provider_workflows:
    - dashboard_overview
    - past_sessions
    - calendar_availability
    - patient_management
    
  patient_workflows:
    - appointment_scheduling
    - health_profile
    - vitals_scan
    - past_visits
    
  coordinator_workflows:
    - command_center
    - session_monitoring
    - provider_assignment
    
  device_workflows:
    - device_setup
    - session_access
    - logout_flow
```

---

## Validation Rules

```yaml
validation:
  # Before updating documentation
  mermaid_syntax_check: true
  markdown_lint: true
  screenshot_size_limit: "2MB"
  
  # Quality checks
  min_workflow_steps: 3
  max_workflow_steps: 20
  require_start_end_nodes: true
  
  # Cross-references
  validate_screenshot_refs: true
  validate_internal_links: true
```

---

## Execution Modes

```yaml
modes:
  # Full exploration of all roles and features
  full_audit:
    roles: "all"
    max_duration: "4_hours"
    
  # Focus on specific role  
  role_focused:
    target_role: "admin"  # Override in command
    max_duration: "1_hour"
    
  # Update existing documentation only
  refresh_mode:
    skip_exploration: false
    update_existing_only: true
    max_duration: "30_minutes"
    
  # Gap filling - only explore undocumented features
  gap_mode:
    explore_missing_only: true
    max_duration: "2_hours"
```

---

## Error Handling

```yaml
error_handling:
  # Network issues
  retry_navigation: 3
  retry_delay: 5000
  
  # Element interaction
  retry_clicks: 2  
  wait_for_element: 10000
  
  # Screenshot failures
  skip_on_screenshot_fail: true
  
  # Documentation errors
  skip_invalid_mermaid: false  # Stop and fix
  backup_before_edit: true
```

---

## Execution Status

```yaml
status:
  last_run: null
  next_scheduled: null
  total_runs: 0
  
  completion_stats:
    workflows_documented: 0
    diagrams_generated: 0
    screenshots_captured: 0
    documentation_updated: 0
```

---

## Usage

```bash
# Start agent with default settings
npm run agent:start

# Run specific mode  
npm run agent:role-focused --role=admin
npm run agent:gap-mode
npm run agent:refresh-mode

# Manual queue management
npm run agent:queue:list
npm run agent:queue:add --feature="admin/users/bulk-actions"
npm run agent:queue:priority --feature="coordinator/command-center" --level="high"
```