# eNow2 Documentation

**Purpose:** Comprehensive documentation for the eNow2 Telehealth Platform and its Playwright-based QA framework.

---

## Folder Structure

```
docs/
├── README.md                    # This file - Documentation index
├── API-ROUTE-INTERCEPTION.md    # Playwright network mocking patterns
├── AUTHENTICATION.md            # Authentication setup and role management
├── eNow2-User-Manual.md         # Full user manual (monolithic)
├── GITHUB-ACTIONS-SETUP.md      # CI/CD configuration guide
├── POM-BEST-PRACTICES.md        # Page Object Model patterns
├── POM-NAMING-CONVENTIONS.md    # Naming standards for POM files
├── USER-MANUAL.md               # User manual (summary version)
├── latex/                       # LaTeX source files for documentation
│   ├── README.md                # LaTeX compilation guide
│   ├── project-wiki.md          # Main project overview
│   ├── admin-role.md            # Admin role documentation
│   ├── provider-role.md         # Provider role documentation
│   ├── patient-role.md          # Patient role documentation
│   ├── coordinator-role.md      # Coordinator role documentation
│   ├── device-role.md           # Device role documentation
│   ├── workflow-diagrams.md     # Mermaid workflow diagrams
│   └── screenshots/             # Captured application screenshots
└── roles/                       # Role-based documentation (live)
    ├── project-wiki.md          # Main hub linking all roles
    ├── admin-role.md            # Admin role complete guide
    ├── provider-role.md         # Provider role complete guide
    ├── patient-role.md          # Patient role complete guide
    ├── coordinator-role.md      # Coordinator role complete guide
    └── device-role.md           # Device role complete guide
```

---

## Documentation Categories

### 1. User Documentation (`/roles/`)

Role-based documentation designed for end users and QA testers understanding the application.

| Document                                           | Description                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------ |
| [project-wiki.md](./roles/project-wiki.md)         | Main hub with overview and links to all roles                                  |
| [admin-role.md](./roles/admin-role.md)             | Admin features: Users, Institution Settings, Documents, Visit Notes, Reporting |
| [provider-role.md](./roles/provider-role.md)       | Provider features: Dashboard, Sessions, Calendar (unique), Patients            |
| [patient-role.md](./roles/patient-role.md)         | Patient features: Dashboard, Appointments, Health Profile, Vitals Scan         |
| [coordinator-role.md](./roles/coordinator-role.md) | Coordinator features: Dashboard, Sessions, Command Center (unique)             |
| [device-role.md](./roles/device-role.md)           | Device features: Device ID login, Dashboard only (restricted)                  |

### 2. Testing Framework Documentation

Technical guides for working with the Playwright test framework.

| Document                                                 | Description                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| [AUTHENTICATION.md](./AUTHENTICATION.md)                 | Auth setup, storage states, role helpers, multi-user patterns |
| [API-ROUTE-INTERCEPTION.md](./API-ROUTE-INTERCEPTION.md) | Network mocking, route handlers, testing without backend      |
| [POM-BEST-PRACTICES.md](./POM-BEST-PRACTICES.md)         | Page Object Model implementation patterns                     |
| [POM-NAMING-CONVENTIONS.md](./POM-NAMING-CONVENTIONS.md) | File and method naming standards                              |
| [GITHUB-ACTIONS-SETUP.md](./GITHUB-ACTIONS-SETUP.md)     | CI/CD workflow configuration                                  |

### 3. LaTeX Source Files (`/latex/`)

Source files for generating professional PDF documentation.

| Document                                             | Purpose                                            |
| ---------------------------------------------------- | -------------------------------------------------- |
| [README.md](./latex/README.md)                       | LaTeX compilation instructions and structure guide |
| [workflow-diagrams.md](./latex/workflow-diagrams.md) | All Mermaid diagrams for workflows                 |
| Role files                                           | Parallel copies for LaTeX compilation              |
| [screenshots/](./latex/screenshots/)                 | 67+ captured screenshots for documentation         |

---

## Quick Links

### For Testers

- **Start Here:** [Project Wiki](./roles/project-wiki.md) - Overview of all roles
- **Auth Setup:** [Authentication Guide](./AUTHENTICATION.md) - How to use role-based auth
- **POM Guide:** [Best Practices](./POM-BEST-PRACTICES.md) - Writing maintainable tests

### For Developers

- **API Mocking:** [Route Interception](./API-ROUTE-INTERCEPTION.md) - Network mocking patterns
- **CI/CD:** [GitHub Actions](./GITHUB-ACTIONS-SETUP.md) - Automated test setup

### For Documentation

- **Workflows:** [Mermaid Diagrams](./latex/workflow-diagrams.md) - Visual workflow documentation
- **Screenshots:** [Screenshot Index](./latex/screenshots/README.md) - All captured screenshots

---

## Key Role Differences

| Feature              | Admin                | Provider              | Patient     | Coordinator    | Device          |
| -------------------- | -------------------- | --------------------- | ----------- | -------------- | --------------- |
| **Account Tabs**     | 2                    | 3 (Calendar)          | 2           | 2              | 2               |
| **Navigation Items** | 5                    | 4                     | 4           | 5              | 1               |
| **Unique Feature**   | Institution Settings | Calendar/Availability | Vitals Scan | Command Center | Device ID Login |
| **Can Schedule**     | No                   | Yes                   | Yes         | Yes            | No              |
| **Session History**  | Via Reporting        | Past Sessions         | Past Visits | Past Sessions  | Limited         |

---

## Documentation Maintenance

### Updating Workflows

1. Explore the application to identify workflow changes
2. Update corresponding Mermaid diagrams in [workflow-diagrams.md](./latex/workflow-diagrams.md)
3. Reflect changes in role-specific documentation

### Capturing Screenshots

Use the Playwright documentation audit spec or manual capture:

```bash
npx playwright test documentation-audit.spec.js
```

Screenshots are saved to `latex/screenshots/` with naming convention:

- `{role}-{feature}-{state}.png`
- Example: `admin-users-table.png`

### Building LaTeX Documentation

```bash
cd docs/latex
# Follow instructions in README.md
```

---

## Related Files

- **Root:** [README.md](../README.md) - Project overview
- **Root:** [UAT-README.md](../UAT-README.md) - User acceptance testing guide
- **Config:** [playwright.config.js](../playwright.config.js) - Test configuration
- **Copilot:** [.github/copilot-instructions.md](../.github/copilot-instructions.md) - AI assistant guidelines

---

## Version History

| Version | Date              | Changes                                |
| ------- | ----------------- | -------------------------------------- |
| 1.0     | February 24, 2026 | Initial documentation structure        |
| 1.1     | February 25, 2026 | Added screenshot inventory (67 images) |
| 1.2     | March 1, 2026     | Added documentation index README       |
