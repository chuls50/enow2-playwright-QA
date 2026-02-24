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

| Role | Primary Account | Secondary Account |
|------|-----------------|-------------------|
| Admin | `admin.json` | `admin-two.json` |
| Provider | `provider.json` | `provider-two.json` |
| Patient | `patient.json` | `patient-two.json` |
| Coordinator | `coordinator.json` | `coordinator-two.json` |
| Device | `device.json` | `device-two.json` |
| Admin-Coordinator | `admin-coordinator.json` | - |
| Provider-Admin | `provider-admin.json` | - |
| Provider-Coordinator | `provider-coordinator.json` | - |
| Provider-Admin-Coordinator | `provider-admin-coordinator.json` | - |
| Super Admin | `super-admin.json` | - |

## Reports

- **HTML Report**: `playwright-report/index.html`
- **Allure Report**: `allure-results/` (generate with `npx allure generate`)
- **JUnit XML**: `test-results/results.xml`
- **JSON**: `test-results/results.json`

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
