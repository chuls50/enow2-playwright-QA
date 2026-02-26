# eNow2 Playwright QA

Automated end-to-end testing framework for eNow2 using Playwright.

## 📊 Test Results & Reports

### 🛡️ **Accessing Reports:**

For security and privacy, test reports are stored as private **GitHub Actions Artifacts**. To view the latest results:

1. Click on one of the **Workflow Status** badges below.
2. Select the most recent successful run.
3. Scroll down to the **Artifacts** section at the bottom of the page.
4. Download the `playwright-report-*` zip file.
5. Extract and open `index.html` in your browser.

### 🚦 **Workflow Status:**

| Test Suite | Current Status |
| :--- | :--- |
| **🚀 Full Regression** | [![Full Regression Tests](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/playwright.yml/badge.svg)](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/playwright.yml) |
| **🔧 Auth Setup** | [![Auth Setup Tests](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/auth-setup.yml/badge.svg)](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/auth-setup.yml) |
| **💨 Smoke Tests** | [![Smoke Tests](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/smoke-tests.yml/badge.svg)](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/smoke-tests.yml) |
| **👤 Single-User** | [![Single-User Tests](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/single-user-tests.yml/badge.svg)](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/single-user-tests.yml) |
| **👥 Multi-User** | [![Multi-User Tests](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/multi-user-tests.yml/badge.svg)](https://github.com/chuls50/enow2-playwright-QA/actions/workflows/multi-user-tests.yml) |

### 📅 **Scheduled Execution:**

Tests run automatically every 3 days using a staggered schedule to prioritize overnight execution:

| Icon | Phase | Start Time (UTC) | Purpose |
| :--- | :--- | :--- | :--- |
| 🔧 | **Auth Setup** | 00:00 (Midnight) | Generate session storage files |
| 💨 | **Smoke Tests** | 01:30 | Basic login & auth verification |
| 👤 | **Single-User** | 03:00 | Comprehensive role-isolated testing |
| 👥 | **Multi-User** | 04:30 | Real-time user interaction (sequential) |
| 🚀 | **Full Regression** | Manual/On-Demand | Full suite verification |

All scheduled tests aim to complete by ~6:30 AM UTC, ensuring fresh results are available before the workday begins.

## Prerequisites

- Node.js 18+
- npm or yarn
- Environment variables configured (see `.env.example`)

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Documentation

📚 **[View Project Wiki & User Manual](docs/roles/project-wiki.md)**

Comprehensive role-based documentation for the eNow2 platform:

- **[Admin Guide](docs/roles/admin-role.md)** - Full system administration and configuration
- **[Provider Guide](docs/roles/provider-role.md)** - Healthcare provider workflows and features
- **[Patient Guide](docs/roles/patient-role.md)** - Patient portal and appointment management
- **[Coordinator Guide](docs/roles/coordinator-role.md)** - Appointment coordination and Command Center
- **[Device Guide](docs/roles/device-role.md)** - Shared device/kiosk setup and management

Each guide includes:

- Navigation and feature descriptions
- Step-by-step workflows
- Best practices
- Profile menu and account settings
- Role-specific capabilities and limitations

### Testing Patterns & Guides

- **[API Route Interception Guide](docs/API-ROUTE-INTERCEPTION.md)** - Network mocking patterns, examples, and best practices

## Completed Test Suites

### 📊 Test Coverage Overview

✅ **22 test spec files** completed across multiple categories

### Smoke Tests (1 spec)

Located in `tests/smoke/`

- [auth-verification.spec.js](tests/smoke/auth-verification.spec.js) - Verifies authentication storage states

### Unauthenticated Tests (5 specs)

Located in `tests/single-user-tests/unauthenticated/`

- [login.spec.js](tests/single-user-tests/unauthenticated/login.spec.js) - User login flows
- [forgot-password.spec.js](tests/single-user-tests/unauthenticated/forgot-password.spec.js) - Password recovery workflow
- [create-new-password.spec.js](tests/single-user-tests/unauthenticated/create-new-password.spec.js) - Password reset flow
- [password.spec.js](tests/single-user-tests/unauthenticated/password.spec.js) - Password field validation
- [device-id-access.spec.js](tests/single-user-tests/unauthenticated/device-id-access.spec.js) - Device ID authentication

### Provider Tests (8 specs)

Located in `tests/single-user-tests/provider/`

- [create-account-onboard-provider.spec.js](tests/single-user-tests/provider/create-account-onboard-provider.spec.js) - Provider account creation
- [provider-my-account.spec.js](tests/single-user-tests/provider/provider-my-account.spec.js) - My Account tab functionality
- [provider-edit-profile.spec.js](tests/single-user-tests/provider/provider-edit-profile.spec.js) - Profile editing
- [provider-edit-license-to-practice.spec.js](tests/single-user-tests/provider/provider-edit-license-to-practice.spec.js) - License management
- [manage-calendar.spec.js](tests/single-user-tests/provider/manage-calendar.spec.js) - Calendar settings and availability
- [change-time-zone.spec.js](tests/single-user-tests/provider/change-time-zone.spec.js) - Time zone configuration
- [manage-notifications.spec.js](tests/single-user-tests/provider/manage-notifications.spec.js) - Notification preferences

### Patient Tests (6 specs)

Located in `tests/single-user-tests/patient/`

- [create-account-onboard-patient.spec.js](tests/single-user-tests/patient/create-account-onboard-patient.spec.js) - Patient account creation (part 1)
- [create-account-onboard-patient-pt2.spec.js](tests/single-user-tests/patient/create-account-onboard-patient-pt2.spec.js) - Patient account creation (part 2)
- [patient-my-account.spec.js](tests/single-user-tests/patient/patient-my-account.spec.js) - My Account tab functionality (part 1)
- [patient-my-account-pt2.spec.js](tests/single-user-tests/patient/patient-my-account-pt2.spec.js) - My Account tab functionality (part 2)
- [patient-edit-profile.spec.js](tests/single-user-tests/patient/patient-edit-profile.spec.js) - Profile editing (part 1)
- [patient-edit-profile-pt2.spec.js](tests/single-user-tests/patient/patient-edit-profile-pt2.spec.js) - Profile editing (part 2)

### Device Tests (2 specs)

Located in `tests/single-user-tests/device/`

- [create-account-onboard-device-id.spec.js](tests/single-user-tests/device/create-account-onboard-device-id.spec.js) - Device account creation
- [device-id-my-account-and-edit.spec.js](tests/single-user-tests/device/device-id-my-account-and-edit.spec.js) - Device account settings

### In Progress

The following role folders are ready for test development:

- `tests/single-user-tests/admin/` - Admin role tests
- `tests/single-user-tests/coordinator/` - Coordinator role tests
- `tests/single-user-tests/super-admin/` - Super admin role tests
- `tests/single-user-tests/admin-coordinator/` - Combined admin-coordinator tests
- `tests/single-user-tests/provider-admin/` - Combined provider-admin tests
- `tests/single-user-tests/provider-coordinator/` - Combined provider-coordinator tests
- `tests/single-user-tests/provider-admin-coordinator/` - Combined provider-admin-coordinator tests
- `tests/multi-user-tests/` - Multi-user interaction tests
- `tests/destructive/` - Global configuration-changing tests

## Test Execution Phases

The test suite runs in 4 sequential phases:

```
┌─────────────────────────────────────────────────────────────────┐
│ Phase 1: Auth Setup (15 projects, 5 workers parallel)          │
│   Authenticates all user roles and saves storage states        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 2: Smoke Tests (1 project, 5 workers parallel)           │
│   Verifies auth setup and basic functionality                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 3: Main Tests (runs in parallel with shared 5 workers)   │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐  │
│  │ Single-User Tests       │  │ Multi-User Tests            │  │
│  │ (11 projects, 1 worker  │  │ (1 project, 1 worker,       │  │
│  │  each, up to 5 parallel)│  │  sequential)                │  │
│  └─────────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ Phase 4: Destructive Tests (1 project, 1 worker, sequential)   │
│   Tests that modify global configuration settings              │
└─────────────────────────────────────────────────────────────────┘
```

## NPM Scripts

```bash
# Run all tests (full suite)
npm test

# Run specific test phases
npm run test:setup        # Auth setup only
npm run test:smoke        # Smoke tests only
npm run test:single       # Single-user tests only
npm run test:multi        # Multi-user tests only
npm run test:destructive  # Destructive tests only

# View test report
npm run report

# Code formatting and linting
npm run format            # Format all test files
npm run format:check      # Check formatting without making changes
npm run lint              # Run ESLint
npm run lint:fix          # Auto-fix ESLint issues
```

## CI/CD with GitHub Actions

This project includes multiple GitHub Actions workflows for comprehensive test automation with Allure reporting deployed to GitHub Pages.

**📖 See [GitHub Actions Setup Guide](docs/GITHUB-ACTIONS-SETUP.md)** for:

- Required GitHub Secrets configuration
- Workflow triggers and features
- How to view test results and artifacts
- Troubleshooting CI/CD issues

### Workflow Features:

**5 Targeted Workflows:**

- 🔧 **Auth Setup** - Validates authentication for all user roles
- 💨 **Smoke Tests** - Quick verification of core functionality
- 👤 **Single-User Tests** - Comprehensive role-isolated testing
- 👥 **Multi-User Tests** - Multi-user interaction scenarios
- 🚀 **Full Regression** - Complete test suite (manual trigger only)

**Each workflow:**

- ✅ Runs on push/pull request (except Full Regression)
- ✅ Scheduled to run every 3 days overnight (6:30 AM UTC completion)
- ✅ Generates and deploys Allure reports to GitHub Pages
- ✅ Uploads test artifacts (reports, results, videos, traces)
- ✅ Configurable via GitHub Secrets (credentials never in code)
- ✅ Supports manual triggering for on-demand testing

## Project Structure

```
tests/
├── setup/                    # Auth setup scripts (15 roles)
│   ├── auth-admin.js
│   ├── auth-provider.js
│   └── ...
├── smoke/                    # Smoke tests (run after setup)
│   └── auth-verification.spec.js
├── single-user-tests/        # Role-isolated tests (5 workers, 1 per role)
│   ├── admin/
│   ├── coordinator/
│   ├── device/
│   ├── patient/
│   ├── provider/
│   ├── provider-admin/
│   ├── provider-coordinator/
│   ├── provider-admin-coordinator/
│   ├── admin-coordinator/
│   ├── super-admin/
│   └── unauthenticated/
├── multi-user-tests/         # Multi-user interaction tests (1 worker)
│   ├── admin2/
│   ├── coordinator2/
│   ├── device2/
│   ├── patient2/
│   └── provider2/
├── destructive/              # Global config-changing tests (1 worker, last)
└── utils/                    # Test utilities and helpers
    └── auth-helpers.js
```

## Test Categories

### Single-User Tests

Tests that can be run with a single authenticated user. Each role folder runs with 1 worker to avoid interference, but multiple roles can run in parallel (up to 5 simultaneously).

### Multi-User Tests

Tests requiring multiple users interacting simultaneously (e.g., video calls). Uses secondary credentials (`*-two`) and runs sequentially with 1 worker.

### Destructive Tests

Tests that modify global application configuration. Run last, sequentially, to prevent interference with other tests.

## Authentication

Storage states are saved to `playwright/.auth/{role}.json`:

| Role                       | Primary Account                   | Secondary Account      |
| -------------------------- | --------------------------------- | ---------------------- |
| Admin                      | `admin.json`                      | `admin-two.json`       |
| Provider                   | `provider.json`                   | `provider-two.json`    |
| Patient                    | `patient.json`                    | `patient-two.json`     |
| Coordinator                | `coordinator.json`                | `coordinator-two.json` |
| Device                     | `device.json`                     | `device-two.json`      |
| Admin-Coordinator          | `admin-coordinator.json`          | -                      |
| Provider-Admin             | `provider-admin.json`             | -                      |
| Provider-Coordinator       | `provider-coordinator.json`       | -                      |
| Provider-Admin-Coordinator | `provider-admin-coordinator.json` | -                      |
| Super Admin                | `super-admin.json`                | -                      |

## Reports

- **HTML Report**: `playwright-report/index.html`
- **Allure Report**: `allure-results/` (generate with `npx allure generate`)
- **JUnit XML**: `test-results/results.xml`
- **JSON**: `test-results/results.json`

## Code Formatting Standards

This project uses Prettier and ESLint to maintain consistent code quality.

### Configuration

- **Prettier**: 140-character line width, double quotes, semicolons required
- **ESLint**: ES2021+ standards, warns on unused variables
- **Auto-format on save**: Enabled in VS Code (see `.vscode/settings.json`)

### Commands

```bash
# Format all test files
npm run format

# Check formatting without making changes
npm run format:check

# Run ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint:fix
```

### Manual Formatting

- **VS Code**: Press `Shift + Alt + F` to format current file
- **On Save**: Files auto-format when saved (if VS Code Prettier extension installed)

### Best Practices

- Remove unused parameters from skipped tests
- Prefix unused parameters with underscore (`_page`) if needed for future use
- Run `npm run format` before committing changes
- ESLint warnings won't block tests but should be addressed

## Configuration

See [playwright.config.js](playwright.config.js) for full configuration details.

### Environment Variables

**Local Development:**

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Fill in your actual credentials in `.env`:

   ```env
   QA_URL=https://your-qa-environment.com
   QA_ADMIN_ONE_USERNAME=admin1@example.com
   QA_ADMIN_PASSWORD=your_password
   # ... etc (see .env.example for complete list)
   ```

3. The `.env` file is gitignored and will never be committed

**CI/CD (GitHub Actions):**

Configure secrets in GitHub repository settings. See [GitHub Actions Setup Guide](docs/GITHUB-ACTIONS-SETUP.md) for detailed instructions.

All required environment variables are documented in [.env.example](.env.example).
