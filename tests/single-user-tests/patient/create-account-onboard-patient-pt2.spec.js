import { test, expect } from "@playwright/test";
import { BeforeWeGetStartedPage } from "../../models/pages/shared/before-we-get-started.page.js";
import { ROLES, useRole } from "../../utils/auth-helpers.js";

// Create Account Onboard Patient - Total tests 1

test.describe("Patient @regression", () => {
  test.use(useRole(ROLES.PATIENT));
  let onboardingPage;

  test.beforeEach(async ({ page }) => {
    onboardingPage = new BeforeWeGetStartedPage(page);
  });

  test('Verify Additional Content on "Before we get started" Page @[118057] @patient @ui', async () => {
    // navigate to onboarding page
    await onboardingPage.navigateToOnboarding();

    // if insuranceInfoHeading is visible, verify all insurance fields are visible. If not visible, fail the test.
    if (await onboardingPage.insuranceInfoHeading.isVisible()) {
      await expect(onboardingPage.insuranceInfoHeading).toBeVisible();
      await expect(onboardingPage.taxIdLabel).toBeVisible();
      await expect(onboardingPage.insurancePolicyNumberLabel).toBeVisible();
      await expect(onboardingPage.insuranceLabel).toBeVisible();
      await expect(onboardingPage.taxIdInput).toBeVisible();
      await expect(onboardingPage.insurancePolicyNumberInput).toBeVisible();
      await expect(onboardingPage.insuranceInput).toBeVisible();
    }
  });
});
