# Authentication Setup Guide

This project uses Playwright's authentication system to store login states and reuse them across tests, avoiding repeated login steps.

## Quick Start

```javascript
import { test } from "@playwright/test";
import { useRole, ROLES } from "./utils/auth-helpers.js";

// Use a specific role for all tests in this file
test.use(useRole(ROLES.ADMIN));

test("your test", async ({ page }) => {
  await page.goto(process.env.QA_URL);
  // Already authenticated as admin
});
```

**Run tests:** `npx playwright test` (authentication setup runs automatically)

## How It Works

1. **Setup Phase**: Authentication setup projects run first in parallel (5 workers) and store login states in `playwright/.auth/`
2. **Test Phase**: Individual tests can use these stored authentication states as needed
3. **Dependency Management**: The `chrome-desktop` project depends on all 15 auth projects, ensuring authentication completes before tests run

**Performance:** With 5 workers running in parallel, all 15 authentication setups complete efficiently, typically within 30-60 seconds depending on network conditions.

## Setup Files

Located in `tests/setup/`:

- `auth-admin.js` - Logs in as admin and saves state
- `auth-provider.js` - Logs in as provider and saves state
- `auth-patient.js` - Logs in as patient and saves state
- `auth-coordinator.js` - Logs in as coordinator and saves state
- `auth-device.js` - Logs in as device and saves state

- `auth-admin-two.js` - Logs in as admin-two and saves state
- `auth-provider-two.js` - Logs in as provider-two and saves state
- `auth-patient-two.js` - Logs in as patient-two and saves state
- `auth-coordinator-two.js` - Logs in as coordinator-two and saves state
- `auth-device-two.js` - Logs in as device-two and saves state

- `auth-provider-admin.js` - Logs in as provider-admin and saves state
- `auth-provider-admin-coordinator.js` - Logs in as provider-admin-coordinator and saves state
- `auth-admin-coordinator.js` - Logs in as admin-coordinator and saves state
- `auth-provider-coordinator.js` - Logs in as provider-coordinator and saves state
- `auth-super-admin.js` - Logs in as super-admin and saves state

## Helper Utilities

Located in `tests/utils/auth-helpers.js`:

- `useRole(ROLES.ADMIN)` - Clean syntax for test.use()
- `createAuthenticatedContext(browser, role)` - Create context with specific role
- `createMultiRoleContexts(browser, roles)` - Create multiple contexts for multi-role tests
- `verifyAuthFiles()` - Verify all auth files exist

## Usage Patterns

### 1. Single Role for Entire Test File

```javascript
import { test, expect } from "@playwright/test";
import { useRole, ROLES } from "../utils/auth-helpers.js";

// All tests in this file will use admin authentication
test.use(useRole(ROLES.ADMIN));

test("admin can access dashboard", async ({ page }) => {
  await page.goto(process.env.QA_URL);
  // Already logged in as admin
});
```

### 2. Different Roles in Different Test Groups

```javascript
test.describe("Admin Tests", () => {
  test.use(useRole(ROLES.ADMIN));

  test("admin functionality", async ({ page }) => {
    // Uses admin auth
  });
});

test.describe("Patient Tests", () => {
  test.use(useRole(ROLES.PATIENT));

  test("patient functionality", async ({ page }) => {
    // Uses patient auth
  });
});
```

### 3. Multiple Roles in Single Test

```javascript
import { createMultiRoleContexts, ROLES } from "../utils/auth-helpers.js";

test("patient and provider interaction", async ({ browser }) => {
  const contexts = await createMultiRoleContexts(browser, [
    ROLES.PATIENT,
    ROLES.PROVIDER,
  ]);

  const patientPage = await contexts[ROLES.PATIENT].newPage();
  const providerPage = await contexts[ROLES.PROVIDER].newPage();

  try {
    // Patient actions
    await patientPage.goto(process.env.QA_URL);
    // ... patient logic

    // Provider actions
    await providerPage.goto(process.env.QA_URL);
    // ... provider logic
  } finally {
    await contexts[ROLES.PATIENT].close();
    await contexts[ROLES.PROVIDER].close();
  }
});
```

### 4. Manual Context Creation

```javascript
import { createAuthenticatedContext, ROLES } from "../utils/auth-helpers.js";

test("specific role test", async ({ browser }) => {
  const adminContext = await createAuthenticatedContext(browser, ROLES.ADMIN);
  const page = await adminContext.newPage();

  try {
    await page.goto(process.env.QA_URL);
    // Test logic here
  } finally {
    await adminContext.close();
  }
});
```

## Authentication Verification

The project includes `auth-verification.spec.js` which automatically verifies:

1. **All auth files exist**: Checks that all 15 authentication JSON files were created
2. **Files contain valid storage state**: Validates that each auth file can be loaded and used

This test runs as part of the `chrome-desktop` project and depends on all authentication setup projects completing successfully. It helps catch authentication setup issues early.

## Available Roles

### Primary Roles

- `ROLES.ADMIN` - Administrator access (user 1)
- `ROLES.ADMIN_TWO` - Administrator access (user 2)
- `ROLES.PROVIDER` - Healthcare provider access (user 1)
- `ROLES.PROVIDER_TWO` - Healthcare provider access (user 2)
- `ROLES.PATIENT` - Patient access (user 1)
- `ROLES.PATIENT_TWO` - Patient access (user 2)
- `ROLES.COORDINATOR` - Coordinator access (user 1)
- `ROLES.COORDINATOR_TWO` - Coordinator access (user 2)
- `ROLES.DEVICE_USER` - Device authentication (device 1)
- `ROLES.DEVICE_TWO` - Device authentication (device 2)

### Combined Roles

- `ROLES.ADMIN_COORDINATOR` - Admin + Coordinator combined role
- `ROLES.PROVIDER_COORDINATOR` - Provider + Coordinator combined role
- `ROLES.PROVIDER_ADMIN` - Provider + Admin combined role
- `ROLES.PROVIDER_ADMIN_COORDINATOR` - Provider + Admin + Coordinator (all roles)

### Super Admin

- `ROLES.SUPER_ADMIN` - Super administrator with elevated privileges

## Running Tests

```bash
# Run all tests (setup will run first automatically due to project dependencies)
npx playwright test

# Run only authentication setup projects (to refresh auth states)
npx playwright test --project=auth-*

# Run a specific authentication setup
npx playwright test --project=auth-admin

# Run specific test file with authentication
npx playwright test tests/your-test.spec.js

# List all available tests
npx playwright test --list
```

**Note:** The authentication setup projects run in parallel using 5 workers, completing all 15 authentications efficiently before any test execution.

## File Structure

```
tests/
├── setup/                     # Authentication setup files
│   ├── auth-admin.js
│   ├── auth-admin-two.js
│   ├── auth-provider.js
│   ├── auth-provider-two.js
│   ├── auth-patient.js
│   ├── auth-patient-two.js
│   ├── auth-coordinator.js
│   ├── auth-coordinator-two.js
│   ├── auth-device.js
│   ├── auth-device-two.js
│   ├── auth-admin-coordinator.js
│   ├── auth-provider-coordinator.js
│   ├── auth-provider-admin.js
│   ├── auth-provider-admin-coordinator.js
│   └── auth-super-admin.js
├── utils/                     # Helper utilities
│   └── auth-helpers.js
├── auth-verification.spec.js  # Verifies auth setup completed successfully
└── [your-test-files].spec.js  # Your actual tests

playwright/.auth/              # Generated auth files (gitignored)
├── admin.json
├── admin-two.json
├── provider.json
├── provider-two.json
├── patient.json
├── patient-two.json
├── coordinator.json
├── coordinator-two.json
├── device.json
├── device-two.json
├── admin-coordinator.json
├── provider-coordinator.json
├── provider-admin.json
├── provider-admin-coordinator.json
└── super-admin.json
```

## Configuration

The setup runs automatically before your tests due to the `dependencies` configuration in `playwright.config.js`. All 15 authentication setup projects run in parallel using 5 workers for efficiency. The auth files are stored in `playwright/.auth/` and are excluded from version control via `.gitignore`.

**Environment Variables Required:**

- `QA_URL` - Base URL for the QA environment
- `QA_ADMIN_ONE_USERNAME` / `QA_ADMIN_TWO_USERNAME` - Admin credentials
- `QA_PROVIDER_ONE_USERNAME` / `QA_PROVIDER_TWO_USERNAME` - Provider credentials
- `QA_PATIENT_ONE_USERNAME` / `QA_PATIENT_TWO_USERNAME` - Patient credentials
- `QA_COORDINATOR_ONE_USERNAME` / `QA_COORDINATOR_TWO_USERNAME` - Coordinator credentials
- `QA_DEVICE_ONE_ID` / `QA_DEVICE_TWO_ID` - Device IDs
- `QA_ADMINCOORDINATOR_USERNAME` - Admin+Coordinator credentials
- `QA_PROVIDERCOORDINATOR_USERNAME` - Provider+Coordinator credentials
- `QA_PROVIDERADMIN_USERNAME` - Provider+Admin credentials
- `QA_PROVIDERADMINCOORDINATOR_USERNAME` - All roles credentials
- `QA_SUPERADMIN_USERNAME` - Super admin credentials
- Corresponding `*_PASSWORD` variables for each role

**Tip:** Store these in a `.env` file at the project root (already gitignored).

## Troubleshooting

If you get "Authentication file not found" errors:

1. **Check environment variables**: Make sure your `.env` file has the correct credentials with `QA_` prefix
2. **Run setup manually**: `npx playwright test --project=auth-*`
3. **Verify auth files**: Check that the auth files were created in `playwright/.auth/`
4. **Check file permissions**: Ensure the `playwright/.auth/` directory is writable
5. **Verify network access**: Ensure you can reach the QA environment URL

If authentication setup fails:

1. **Check credentials**: Verify all credentials in `.env` are correct and active
2. **Check environment**: Ensure `QA_URL` is accessible and the login page loads
3. **Review setup logs**: Run `npx playwright test --project=auth-admin --debug` to see detailed output
4. **Check for rate limiting**: If multiple setups fail, the authentication service may be rate limiting

If you need to force refresh all authentication:

```bash
# Delete existing auth files
rm -rf playwright/.auth/*.json

# Re-run all authentication setups
npx playwright test --project=auth-*
```

## Best Practices

### 1. Choose the Right Pattern

- **Single role per file**: Use `test.use(useRole(ROLES.ADMIN))` when all tests need the same role
- **Multiple contexts**: Use `createMultiRoleContexts()` for tests requiring interaction between different roles
- **Role switching**: Create separate test suites with different `test.use()` calls for different roles

### 2. Use TWO Accounts for Interaction Tests

When testing features that require two users of the same role (e.g., patient-to-patient messaging):

```javascript
const contexts = await createMultiRoleContexts(browser, [
  ROLES.PATIENT,
  ROLES.PATIENT_TWO,
]);
```

### 3. Clean Up Contexts

Always close contexts in a `finally` block to prevent memory leaks:

```javascript
try {
  // Test logic
} finally {
  await context.close();
}
```

### 4. Verify Authentication

Use the `auth-verification.spec.js` test to ensure all authentication files are created correctly before running your test suite.

### 5. Environment-Specific Configuration

- Use `.env` files for environment-specific credentials
- Never commit `.env` files to version control
- Document required environment variables for your team

### 6. Debugging Authentication Issues

```bash
# Run a single auth setup with debugging
npx playwright test --project=auth-admin --debug

# Run with headed browser to see the login process
npx playwright test --project=auth-admin --headed

# View detailed reporter output
npx playwright show-report
```
