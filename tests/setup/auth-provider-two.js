import { test } from "@playwright/test";

test.describe("Provider Authentication Setup @provider2", () => {
  test("setup provider authentication", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseUrl = process.env.QA_URL;
    await page.goto(baseUrl);
    await page.waitForURL(/.*\/login/);

    // Fill email - use QA_PROVIDER_TWO_USERNAME
    await page
      .getByPlaceholder("Enter email")
      .fill(process.env.QA_PROVIDER_TWO_USERNAME);
    await page.getByRole("button", { name: "Next" }).click();

    // Fill password - use QA_PROVIDER_PASSWORD
    await page
      .getByPlaceholder("Enter your password")
      .fill(process.env.QA_PROVIDER_PASSWORD);
    await page.getByRole("button", { name: "Log In" }).click();

    // Wait for successful login
    await page.waitForURL(/.*\/route-me/);
    await page.waitForLoadState("networkidle");

    // Save authentication state
    await context.storageState({ path: "playwright/.auth/provider-two.json" });
    console.log(
      `✅ Provider (Two) authentication state saved. (QA Environment)`,
    );

    await context.close();
  });
});
