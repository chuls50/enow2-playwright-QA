# GitHub Actions CI/CD Setup

This guide explains how to configure GitHub Actions to run your full Playwright regression test suite.

## Overview

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the complete test suite on every push to `main`/`master` branches and on pull requests. It can also be triggered manually.

## Test Execution Flow

The workflow runs all 4 test phases sequentially:

1. **Phase 1**: Auth Setup (15 projects, 5 workers parallel)
2. **Phase 2**: Smoke Tests (1 project, 5 workers parallel)
3. **Phase 3**: Main Tests (Single-user + Multi-user tests in parallel)
4. **Phase 4**: Destructive Tests (1 project, 1 worker, sequential)

## Required GitHub Secrets

To run tests in CI, you need to configure the following secrets in your GitHub repository:

### Setting Up Secrets

1. Navigate to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

### Secret Configuration

| Secret Name                            | Description                         | Example Value                    |
| -------------------------------------- | ----------------------------------- | -------------------------------- |
| `QA_URL`                               | Base URL of QA environment          | `https://qa.enow2.com`           |
| **Admin Credentials**                  |
| `QA_ADMIN_ONE_USERNAME`                | Primary admin email                 | `admin1@example.com`             |
| `QA_ADMIN_TWO_USERNAME`                | Secondary admin email               | `admin2@example.com`             |
| `QA_ADMIN_PASSWORD`                    | Admin password                      | `SecurePassword123`              |
| **Provider Credentials**               |
| `QA_PROVIDER_ONE_USERNAME`             | Primary provider email              | `provider1@example.com`          |
| `QA_PROVIDER_TWO_USERNAME`             | Secondary provider email            | `provider2@example.com`          |
| `QA_PROVIDER_PASSWORD`                 | Provider password                   | `SecurePassword123`              |
| **Patient Credentials**                |
| `QA_PATIENT_ONE_USERNAME`              | Primary patient email               | `patient1@example.com`           |
| `QA_PATIENT_TWO_USERNAME`              | Secondary patient email             | `patient2@example.com`           |
| `QA_PATIENT_PASSWORD`                  | Patient password                    | `SecurePassword123`              |
| **Coordinator Credentials**            |
| `QA_COORDINATOR_ONE_USERNAME`          | Primary coordinator email           | `coordinator1@example.com`       |
| `QA_COORDINATOR_TWO_USERNAME`          | Secondary coordinator email         | `coordinator2@example.com`       |
| `QA_COORDINATOR_PASSWORD`              | Coordinator password                | `SecurePassword123`              |
| **Device IDs**                         |                                     |                                  |
| `QA_DEVICE_ONE_ID`                     | Primary device unique identifier    | `DEVICE-001-TEST`                |
| `QA_DEVICE_TWO_ID`                     | Secondary device unique identifier  | `DEVICE-002-TEST`                |
| `QA_DEVICE_THREE_ID`                   | Tertiary device unique identifier   | `DEVICE-003-TEST`                |
| **Combined Role Credentials**          |                                     |                                  |
| `QA_ADMINCOORDINATOR_USERNAME`         | Admin-Coordinator email             | `admincoord@example.com`         |
| `QA_ADMINCOORDINATOR_PASSWORD`         | Admin-Coordinator password          | `SecurePassword123`              |
| `QA_PROVIDERADMIN_USERNAME`            | Provider-Admin email                | `provideradmin@example.com`      |
| `QA_PROVIDERADMIN_PASSWORD`            | Provider-Admin password             | `SecurePassword123`              |
| `QA_PROVIDERCOORDINATOR_USERNAME`      | Provider-Coordinator email          | `providercoord@example.com`      |
| `QA_PROVIDERCOORDINATOR_PASSWORD`      | Provider-Coordinator password       | `SecurePassword123`              |
| `QA_PROVIDERADMINCOORDINATOR_USERNAME` | Provider-Admin-Coordinator email    | `provideradmincoord@example.com` |
| `QA_PROVIDERADMINCOORDINATOR_PASSWORD` | Provider-Admin-Coordinator password | `SecurePassword123`              |
| **Super Admin Credentials**            |
| `QA_SUPERADMIN_USERNAME`               | Super admin email                   | `superadmin@example.com`         |
| `QA_SUPERADMIN_PASSWORD`               | Super admin password                | `SecurePassword123`              |

## Workflow Features

### Automatic Triggers

- **Push to main/master**: Runs full regression suite
- **Pull Requests**: Runs full regression suite on PR branches
- **Manual Trigger**: Run via "Actions" tab → "Playwright Tests" → "Run workflow"

### Artifacts

The workflow automatically uploads three types of artifacts (available for 30 days):

1. **playwright-report**: HTML test report (viewable in browser)
2. **test-results**: Raw test results and screenshots/videos of failures
3. **allure-results**: Allure report data (for advanced reporting)

### Viewing Test Results

After a workflow run completes:

1. Go to **Actions** tab in your repository
2. Click on the workflow run
3. Scroll down to **Artifacts** section
4. Download `playwright-report`
5. Extract and open `index.html` in a browser

## Troubleshooting

### Tests Failing Due to Missing Secrets

**Error**: `Cannot read property 'fill' of undefined` or similar

**Solution**: Ensure all required secrets are configured in GitHub repository settings.

### Timeout Issues

**Error**: `Test timeout of 60000ms exceeded`

**Solution**: The workflow has a 60-minute timeout. If tests consistently timeout:

- Check for slow network responses in QA environment
- Consider splitting tests into smaller batches
- Adjust `timeout-minutes` in `.github/workflows/playwright.yml`

### Authentication Failures

**Error**: Tests fail during auth setup phase

**Solution**:

- Verify credentials are correct in GitHub secrets
- Ensure QA environment is accessible from GitHub Actions runners
- Check if accounts need to be reset or passwords updated

### Parallel Execution Issues

If tests are flaky in CI but pass locally:

- Check for race conditions in multi-user tests
- Verify storage states are being created correctly
- Review worker allocation in `playwright.config.js`

## Local Development

To run tests locally with the same environment variables:

1. Copy `.env.example` to `.env`
2. Fill in your actual credentials
3. Run `npm test`

The `.env` file is gitignored and will never be committed to the repository.

## Manual Workflow Trigger

To manually trigger a test run:

1. Go to **Actions** tab
2. Select **Playwright Tests** workflow
3. Click **Run workflow** dropdown
4. Select branch (default: main)
5. Click **Run workflow** button

This is useful for:

- Running tests on-demand
- Testing workflow changes
- Re-running failed tests

## Best Practices

1. **Rotate credentials regularly**: Update secrets every 90 days
2. **Use dedicated test accounts**: Don't use production credentials
3. **Monitor workflow runs**: Set up notifications for failures
4. **Review artifacts**: Check failed test screenshots/videos
5. **Keep secrets minimal**: Only store sensitive data as secrets

## See Also

- [Playwright Documentation](https://playwright.dev/docs/ci)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Project README](../README.md)
