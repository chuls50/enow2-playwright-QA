# Copilot Instructions for eNow2 Playwright QA

## Project Overview

This is a Playwright-based end-to-end testing framework for the eNow2 application. Tests are organized by user role and execution phase.

## Key Conventions

### File Naming

- Test files: `*.spec.js`
- Setup files: `auth-{role}.js` in `tests/setup/`
- Page objects: `*Page.js` or `*-page.js`
- Utilities: Place in `tests/utils/`

### Authentication Pattern

- Storage states are saved to `playwright/.auth/{role}.json`
- Primary accounts: `{role}.json`
- Secondary accounts (for multi-user tests): `{role}-two.json`
- Use `storageState` in test configuration to load auth

### Role Names

Primary roles:

- `admin`, `provider`, `patient`, `coordinator`, `device`
- Combined roles: `admin-coordinator`, `provider-admin`, `provider-coordinator`, `provider-admin-coordinator`
- `super-admin`

Secondary accounts (for multi-user tests):

- `admin-two`, `provider-two`, `patient-two`, `coordinator-two`, `device-two`

## Test Organization

### Folder Structure

```
tests/
├── setup/              # Auth setup scripts (run first)
├── smoke/              # Quick verification tests
├── single-user-tests/  # Role-isolated tests (1 worker per role folder)
│   ├── admin/
│   ├── coordinator/
│   └── ... (11 folders)
├── multi-user-tests/   # Multi-user interaction tests (1 worker, sequential)
│   ├── admin2/
│   └── ... (5 folders)
├── destructive/        # Config-changing tests (run last)
└── utils/              # Shared utilities
```

### Execution Order

1. **Auth Setup** (15 projects, parallel with 5 workers)
2. **Smoke Tests** (verify auth files exist)
3. **Single-User + Multi-User Tests** (run in parallel)
   - Single-user: 11 projects, 1 worker each
   - Multi-user: 1 project, 1 worker, sequential
4. **Destructive Tests** (1 worker, sequential, runs last)

## Writing Tests

### Single-User Test Example

```javascript
import { test, expect } from "@playwright/test";

test.use({ storageState: "playwright/.auth/admin.json" });

test.describe("Admin Dashboard", () => {
  test("can view dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });
});
```

### Multi-User Test Example

```javascript
import { test, expect } from "@playwright/test";

test.describe("Video Call Between Users", () => {
  test("provider can call patient", async ({ browser }) => {
    // Create two browser contexts with different auth states
    const providerContext = await browser.newContext({
      storageState: "playwright/.auth/provider.json",
    });
    const patientContext = await browser.newContext({
      storageState: "playwright/.auth/patient-two.json",
    });

    const providerPage = await providerContext.newPage();
    const patientPage = await patientContext.newPage();

    // Test multi-user interaction...
  });
});
```

## Configuration Rules

### Worker Allocation

- Global workers: 5
- Single-user projects: 1 worker each (ensures role isolation)
- Multi-user project: 1 worker (tests must run sequentially)
- Destructive project: 1 worker (tests must run sequentially)

### Dependencies

- Smoke tests depend on all 15 auth-setup projects
- Single-user tests depend on smoke
- Multi-user tests depend on smoke
- Destructive tests depend on all single-user and multi-user projects

## Common Patterns

### Auth Helper Usage

```javascript
import { getStorageState, getRoleCredentials } from "../utils/auth-helpers.js";
```

### Environment Variables

- Credentials stored in `.env` file
- Access via `process.env.VARIABLE_NAME`
- Loaded via `dotenv` in playwright.config.js

### Test Timeouts

- Default test timeout: 120 seconds
- Expect timeout: 15 seconds
- Adjust per-test with `test.setTimeout()`

## Do's and Don'ts

### Do

- Place role-specific tests in the appropriate `single-user-tests/{role}/` folder
- Use the correct storage state for each role
- Keep multi-user tests in `multi-user-tests/`
- Put global config changes in `destructive/`
- Use descriptive test names

### Don't

- Don't put tests that modify global config in single-user-tests
- Don't run multi-user tests with multiple workers
- Don't hardcode credentials in test files
- Don't create tests in the `tests/` root (use appropriate subdirectory)
- Don't forget to add new auth roles to both setup and config
