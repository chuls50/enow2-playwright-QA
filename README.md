# eNow2 Playwright QA

Automated end-to-end testing framework for eNow2 using Playwright.

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
```

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

Create a `.env` file with required credentials:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
PROVIDER_EMAIL=
PROVIDER_PASSWORD=
# ... etc
```
