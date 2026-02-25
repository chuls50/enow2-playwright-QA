### GitHub Copilot Context for Playwright POM

This guide provides a structured approach to using Playwright with the Page Object Model (POM). Use these guidelines to generate maintainable and readable test code.

---

### Locators

**Prioritize User-Facing Locators**

- `getByRole()`: Preferred for buttons, links, etc.
- `getByText()`: Use for static text.
- `getByLabel()`: Ideal for form inputs with labels.
- `getByPlaceholder()`: Use for inputs with placeholder text.
- `getByTestId()`: Best for custom test IDs (`data-testid`).

**Avoid**

- **CSS** and **XPath** selectors. Use them only as a last resort.

---

### Page Object Model (POM)

**What Goes in the Page Object**

- The **Page Object class** should represent a single page or a distinct component.
- **Selectors** for all elements should be defined as properties in the constructor.
- **Methods** should perform multi-step, user-level actions (e.g., `login(user, pass)`).
- **Keep it clean** - Remove unused locators and methods. Dead code clutters the POM and makes maintenance harder.

Basically, I want to keep the POM focused on essential multi-step actions while maintaining clarity in the spec files. Regularly review and remove elements that are no longer referenced in any tests.

**Example: `LoginPage.js`**

```javascript
import { BasePage } from "../base-page.js"; // Don't import Page from @playwright/test

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Define locators as properties in the constructor
    this.usernameInput = this.page.getByLabel("Username");
    this.passwordInput = this.page.getByLabel("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

### When to Keep Locators Inline in Tests

**Not every locator belongs in the POM.** If you cannot come up with a clear, semantic name for a locator, it should remain inline in the test file.

**Keep Inline When:**

| Scenario                            | Example                                               | Reason                            |
| ----------------------------------- | ----------------------------------------------------- | --------------------------------- |
| Dynamic text with test data         | `page.getByText(\`${TEST_DATA.NAME} (you)\`)`         | Contains test-specific data       |
| Error messages with dynamic content | `page.getByText('The file "30mb.jpg" exceeds')`       | Test-specific validation          |
| One-time assertions                 | `page.getByText('CCcody test patient Cody Test')`     | Not reused elsewhere              |
| No semantic name possible           | Complex compound locators with `.nth()` or `.first()` | Would create unclear POM property |
| Parameterized dynamic locators      | `page.getByText(participantName)`                     | Value comes from test             |

**Add to POM When:**

| Scenario               | Example                     | Reason                     |
| ---------------------- | --------------------------- | -------------------------- |
| Reusable element       | `this.deviceIdBadgeText`    | Used across multiple tests |
| Clear semantic meaning | `this.sessionCanceledToast` | Obvious what it represents |
| Part of user workflow  | `this.cancelSessionButton`  | Used in POM methods        |
| Assertion target       | `this.participantsText`     | Verified in multiple tests |

**Example - Inline vs POM:**

```javascript
// ✅ Keep inline - dynamic test data, no clear name
await expect(page.getByText(`${TEST_DATA.DEVICE_NAME} (you)`)).toBeVisible();
await expect(page.getByText("cody test patient Cody Test Institution")).toBeVisible();

// ✅ Add to POM - clear semantic name, reusable
this.deviceIdBadgeText = page.getByText("Device ID");
this.sessionCanceledToast = page.getByText("Session request canceled");
```

---

### Accessing `page` in Tests - Best Practices

When you need to use inline locators, include `{ page }` in the test signature rather than accessing through the POM:

```javascript
// ⚠️ Works but verbose - avoid this pattern
test("example", async () => {
  await expect(sessionOverviewPage.page.getByText("error")).toBeVisible();
});

// ✅ Cleaner - include { page } in test signature when needed
test("example", async ({ page }) => {
  await expect(page.getByText("error")).toBeVisible();
});

// ✅ Remove { page } when only using POM locators
test("example", async () => {
  await expect(sessionOverviewPage.deviceIdBadgeText).toBeVisible();
});
```

**Rule of thumb:** If you need even one inline locator, include `{ page }` in the test signature for consistency.

---

### POM Responsibility Split - Multi-Page Workflows

When tests span multiple pages or components, each POM should own its scope. Use multiple POMs in tests that cross boundaries.

**Example: Dashboard → Session Details Workflow**

| Action                | POM                           | Reason                      |
| --------------------- | ----------------------------- | --------------------------- |
| Navigate to dashboard | `ProviderDashboardPage`       | Dashboard scope             |
| Schedule appointment  | `ProviderDashboardPage`       | Dashboard action            |
| Click session card    | `ProviderDashboardPage`       | Dashboard element           |
| Session tabs/content  | `ProviderSessionOverviewPage` | Session details scope       |
| Upload attachment     | `ProviderSessionOverviewPage` | Attachments tab             |
| Cancel appointment    | `ProviderDashboardPage`       | Dashboard method with modal |

**Implementation:**

```javascript
test.describe("Session Details @regression", () => {
  let providerDashboardPage;
  let sessionOverviewPage;

  test.beforeEach(async ({ page }) => {
    providerDashboardPage = new ProviderDashboardPage(page);
    sessionOverviewPage = new ProviderSessionOverviewPage(page);
    await providerDashboardPage.navigateToProviderDashboard();
  });

  test("Upload attachment", async ({ page }) => {
    // Dashboard actions
    await providerDashboardPage.scheduleAppointmentWithPatient(TEST_DATA.PATIENT_NAME);
    await providerDashboardPage.sessionScheduledText.first().click();

    // Session overview actions
    await sessionOverviewPage.attachmentsTab.click();
    await sessionOverviewPage.uploadAttachment("./tests/images/test.jpg");
    await expect(sessionOverviewPage.attachmentElement).toBeVisible();

    // Cleanup via dashboard
    await providerDashboardPage.cancelAppointmentFromSessionDetails();
  });
});
```

**Rules for POM Ownership:**

1. **Ask:** "Where does this action originate?"
2. **Navigation elements** belong to the page they're on
3. **Tab content** belongs to the detail/overview POM
4. **Modal actions** belong to the POM that triggers them
5. **Avoid duplicate locators** across POMs when possible

---

### Test Data Management

**Centralized TEST_DATA Constants**

All test data should be defined in a centralized `TEST_DATA` object immediately after imports and before the `test.describe` block. This ensures consistency, maintainability, and reduces duplication across tests.

**TEST_DATA Structure Guidelines:**

- **Location**: Place after imports, before `test.describe()`
- **Format**: Use UPPER_CASE for constant names
- **Organization**: Group related data logically
- **Comments**: Add section headers for clarity
- **No Inline Data**: Avoid defining test data within individual tests

**Example: Complete TEST_DATA Structure**

```javascript
import { test, expect } from "@playwright/test";
import { UsersTablePage } from "../../models/pages/admin/admin-users-table.page.js";

// Use stored auth
test.use({ storageState: "playwright/.auth/admin.json" });

// ========================================
// TEST DATA CONSTANTS
// ========================================
// All test data should be defined here in a centralized manner
// Use this pattern for consistent data management across tests
const TEST_DATA = {
  // User invitation test data
  USER: {
    FIRST_NAME: "John",
    LAST_NAME: "Doe",
    EMAIL_PREFIX: "john.doe",
    ROLE: "Patient",
    INSTITUTION: "Cody Test",
  },
  // Search and filter test data
  SEARCH: {
    USER_SEARCH_TERM: "cody test provider-",
  },
  // Form validation test data
  VALIDATION: {
    VALID_FIRST_NAME: "John",
    VALID_LAST_NAME: "Doe",
    VALID_EMAIL: "example@domain.com",
    INVALID_CHARACTERS: "%^&*",
  },
  // Dropdown options and selections
  ROLES: {
    ADMIN: "Admin",
    PATIENT: "Patient",
    PROVIDER: "Provider",
    COORDINATOR: "Coordinator",
  },
  INSTITUTIONS: {
    CODY_TEST: "Cody Test",
    GLOBAL_MED: "GlobalMed",
  },
};

test.describe("Admin User Management @regression", () => {
  // Test implementation here...
});
```

**Benefits of Centralized TEST_DATA:**

- **Single Source of Truth**: All test data in one location
- **Easy Maintenance**: Update data in one place affects all tests
- **Consistency**: Same data values used across related tests
- **Readability**: Clear organization shows what data is available
- **Reusability**: Data can be shared across multiple test methods

**❌ Avoid Inline Test Data:**

```javascript
// Wrong - data scattered throughout tests
test("example test", async () => {
  const firstName = "John"; // Don't define here
  const email = "test@example.com"; // Don't define here
});
```

**✅ Use Centralized TEST_DATA:**

```javascript
// Correct - reference centralized data directly
test("example test", async () => {
  // Use TEST_DATA directly when no transformation needed
  await userTablePage.fillForm(TEST_DATA.USER.FIRST_NAME, TEST_DATA.USER.LAST_NAME);

  // Only create variables when transformation is required
  const email = `${TEST_DATA.USER.EMAIL_PREFIX}.${Date.now()}@example.com`;
  await userTablePage.submitForm(email);
});
```

**Clean vs. Cluttered Examples:**

```javascript
// ❌ Cluttered - Unnecessary const declarations
test("invite user", async () => {
  const firstName = TEST_DATA.USER.FIRST_NAME; // Unnecessary
  const lastName = TEST_DATA.USER.LAST_NAME; // Unnecessary
  const role = TEST_DATA.USER.ROLE; // Unnecessary

  await userTablePage.inviteUser(firstName, lastName, email, role);
});

// ✅ Clean - Direct references
test("invite user", async () => {
  const email = `${TEST_DATA.USER.EMAIL_PREFIX}.${Date.now()}@example.com`; // Only when needed

  await userTablePage.inviteUser(TEST_DATA.USER.FIRST_NAME, TEST_DATA.USER.LAST_NAME, email, TEST_DATA.USER.ROLE);
});
```

---

### Test Files

**What Goes in the Test File**

- **Test Data.** Define constants for test data at the top of the test file.
- **Explicit, readable test steps.** The test file should clearly show the intent of the test.
- **Assertions.** All `expect()` assertions should be in the test file, not hidden within a Page Object method.
- **Inline locators** for dynamic, one-time, or test-specific assertions that don't have clear semantic names.

**Example: `login.spec.js`**

```javascript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";

test("should log in successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new ProviderDashboardPage(page);

  await loginPage.navigate();
  await loginPage.login("testuser@example.com", "password123");

  // Explicit assertions make the test's purpose clear
  await expect(page).toHaveURL("/dashboard");
  await expect(dashboardPage.welcomeMessage).toBeVisible();
});
```

**Example: `users-table.spec.js`**

```javascript
import { test, expect } from "@playwright/test";
import { UsersTablePage } from "../../models/pages/admin/admin-users-table.page.js";

// ========================================
// TEST DATA CONSTANTS
// ========================================
const TEST_DATA = {
  USER: {
    FIRST_NAME: "John",
    LAST_NAME: "Doe",
    EMAIL_PREFIX: "john.doe",
    ROLE: "Patient",
  },
};

test("Validate Successful invite Submission on Invite Users Modal @[111700]", async ({ page }) => {
  const userTablePage = new UsersTablePage(page);
  await userTablePage.navigate();

  // Only create variables when transformation is needed
  const email = `${TEST_DATA.USER.EMAIL_PREFIX}.${Date.now()}@example.com`;

  // Use helper methods from POM with direct TEST_DATA references
  await userTablePage.inviteUser(TEST_DATA.USER.FIRST_NAME, TEST_DATA.USER.LAST_NAME, email, TEST_DATA.USER.ROLE);

  // Explicit assertions make the test's purpose clear
  await expect(userTablePage.invitationSentMessage).toBeVisible();
});
```

**The inviteUser Method within UsersTablePage.js**

To keep the test file clean and focused on user intent, all the individual steps for inviting a user should be encapsulated in a single method within the UsersTablePage class. This aligns with the principle of abstracting multi-step actions into a POM method.

**Example `UsersTablePage.js` (simplified)**

```javascript
import { BasePage } from "../../base-page.js";

export class UsersTablePage extends BasePage {
  constructor(page) {
    super(page);

    // Define locators as properties in the constructor
    this.inviteUsersButton = this.page.getByRole("button", {
      name: "Invite Users",
    });
    this.firstNameInput = this.page.getByLabel("First Name");
    // ... other locators for the modal
    this.inviteUsersSendInviteButton = this.page.getByRole("button", {
      name: "Send Invite",
    });
    this.invitationSentMessage = this.page.getByText("Invitation sent successfully!");
  }

  async navigate() {
    await this.page.goto("/admin/users-table");
  }

  async inviteUser(firstName, lastName, email, role) {
    await this.inviteUsersButton.click();
    await this.firstNameInput.fill(firstName);
    // ... fill other fields
    // ... select institution and role
    await this.inviteUsersSendInviteButton.click();
  }
}
```

---

### Before/After Refactoring Example

This example shows how to refactor a test from using direct page calls to proper POM patterns:

**❌ Before - Direct page calls scattered throughout test:**

```javascript
test("Verify Edit Profile screen UI elements @[117700]", async ({ page }) => {
  // Open edit profile modal
  await page.getByRole("button", { name: "Edit Edit" }).click();

  // Verify modal header and all form field labels are visible
  await expect(page.getByText("Edit profile detailsFirst")).toBeVisible();
  await expect(page.getByRole("dialog").getByText("First name")).toBeVisible();
  await expect(page.getByRole("dialog").getByText("Last name")).toBeVisible();
  await expect(page.getByRole("dialog").getByText("Languages spoken")).toBeVisible();

  // Verify action buttons are visible and Save button is initially disabled
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save changes" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save changes" })).toBeDisabled();
  await page.getByRole("button", { name: "Cancel" }).click();
});
```

**✅ After - Clean POM-based test:**

```javascript
test("Verify Edit Profile screen UI elements @[117700]", async () => {
  // Open edit profile modal
  await myAccountPage.openEditProfileModal();

  // Verify modal header and all form field labels are visible
  await expect(myAccountPage.editProfileModal).toBeVisible();
  await expect(myAccountPage.editProfileFirstNameLabel).toBeVisible();
  await expect(myAccountPage.editProfileLastNameLabel).toBeVisible();
  await expect(myAccountPage.editProfileLanguagesLabel).toBeVisible();

  // Verify action buttons are visible and Save button is initially disabled
  await expect(myAccountPage.cancelButton).toBeVisible();
  await expect(myAccountPage.saveChangesButton).toBeVisible();
  await expect(myAccountPage.saveChangesButton).toBeDisabled();
  await myAccountPage.cancelButton.click();
});
```

**Key Improvements:**

- Removed `{ page }` from test signature (not needed when using only POM)
- Replaced inline locators with POM properties
- Used `openEditProfileModal()` method instead of direct click
- All locators now defined once in the page object constructor

---

### Advanced POM Patterns

**Inheritance and Base Classes**

- Always extend `BasePage` instead of importing `Page` from `@playwright/test`
- Use inheritance to share common functionality across page objects
- Keep the base class focused on universal page operations (navigation, waiting, etc.)

**Complex Multi-Step Methods (3+ Steps)**

When a user action requires 3 or more steps, encapsulate it in a POM method:

```javascript
// ❌ Bad - Repetitive code in test files
await page.getByRole("link", { name: "Reporting Period ChevronDown" }).click();
await page.getByTestId("item Week").click();
await page.getByRole("button", { name: "Apply Filter" }).click();

// ✅ Good - Encapsulated in POM method
await adminDataReportingPage.applyReportingPeriodFilter("Week");
```

**Method Naming Conventions**

- **Navigation methods**: `navigateTo...()` - e.g., `navigateToTotalCalls()`
- **Action methods**: `apply...()`, `clear...()`, `remove...()` - e.g., `applyFilter()`, `clearAllFilters()`
- **Multi-selection methods**: `applyMultiple...()` - e.g., `applyMultipleServices(['A', 'B'])`
- **URL-based navigation**: `navigateTo...Details()` - e.g., `navigateToTotalCallsDetails()`
- **Modal methods**: `open...Modal()`, `close...Modal()` - e.g., `openEditProfileModal()`
- **Form field methods**: `fill...()` - e.g., `fillFirstName()`, `fillPhoneNumber()`
- **State reset methods**: `reset...IfPresent()` - e.g., `resetSpanishLanguageIfPresent()`
- **Dropdown methods**: `select...()` - e.g., `selectCountry()`, `selectState()`

**Grouping Related Elements**

Group related locators logically in the constructor:

```javascript
constructor(page) {
  super(page);

  // Navigation Links
  this.dataReportingLink = this.page.getByText('Data reporting');
  this.totalCallsTab = this.page.locator('a').filter({ hasText: 'Total Calls' });

  // Filter Elements
  this.clearFiltersButton = this.page.getByRole('button', { name: 'Clear filters' });
  this.applyFilterButton = this.page.getByRole('button', { name: 'Apply Filter' });

  // Filter Dropdowns
  this.reportingPeriodFilter = this.page.getByRole('link', { name: 'Reporting Period ChevronDown' });
  this.serviceFilter = this.page.getByRole('link', { name: 'Service ChevronDown' });
}
```

**Error Handling and Reliability**

- Add proper waits and state checks in POM methods
- Use `waitFor({ state: 'visible' })` for critical elements
- Include timeouts for flaky operations
- Handle conditional elements gracefully

```javascript
async clearAllFilters() {
  // Check if button exists before clicking
  if (await this.clearFiltersButton.isVisible()) {
    await this.clearFiltersButton.click();
  }
  await this.page.waitForLoadState('networkidle');
}
```

**Modal Interaction Patterns**

When working with modals, always include proper wait states to ensure reliability:

```javascript
// Opening a modal - wait for visibility after click
async openEditProfileModal() {
  await this.editProfileButton.click();
  await this.editProfileModal.waitFor({ state: 'visible' });
}

// Closing a modal - wait for hidden state after close
async closeEditProfileModal() {
  await this.cancelButton.click();
  await this.editProfileModal.waitFor({ state: 'hidden' });
}
```

**Form Field Methods**

Combine click and fill operations into single methods for form fields:

```javascript
// Form field fill methods - combine click + fill for reliability
async fillFirstName(name) {
  await this.editProfileFirstNameInput.click();
  await this.editProfileFirstNameInput.fill(name);
}

async fillLastName(name) {
  await this.editProfileLastNameInput.click();
  await this.editProfileLastNameInput.fill(name);
}

// Composite method for clearing multiple required fields
async clearAllRequiredFields() {
  await this.fillFirstName('');
  await this.fillLastName('');
  await this.languageTagCloseButton.click();
}
```

**Dropdown Selection Methods**

Use parameterized methods for dropdown interactions:

```javascript
// Parameterized dropdown selection with dynamic locator
async selectCountry(countryName) {
  await this.countryDropdown.click();
  await this.page.getByTestId(`custom-dropdown-item-${countryName}`).click();
}

async selectState(stateName) {
  await this.stateDropdown.click();
  await this.page.getByText(stateName).click();
}
```

**State Reset Methods**

Create methods to handle conditional cleanup of test state. These are useful when tests may leave data in different states:

```javascript
// Conditional state reset - useful for test isolation
async resetSpanishLanguageIfPresent() {
  const isVisible = await this.spanishChip.isVisible();
  if (isVisible) {
    await this.spanishChip.getByRole('button').click();
    await this.saveChangesButton.click();
    await expect(this.profileUpdatedSuccessMessage).toBeVisible();
    await this.editProfileButton.click();
    await this.editProfileModal.waitFor({ state: 'visible' });
  }
}
```

---

### Test File Best Practices

**Multiple Page Objects in Tests**

When tests span multiple pages or components, instantiate all needed page objects in `beforeEach`:

```javascript
test.describe("Admin Reporting @regression", () => {
  let usersTablePage;
  let adminDataReportingPage;

  test.beforeEach(async ({ page }) => {
    usersTablePage = new UsersTablePage(page);
    adminDataReportingPage = new AdminDataReportingPage(page);

    // Use appropriate page object for navigation
    await usersTablePage.gotoUsersTable();
    await adminDataReportingPage.navigateToDataReporting();
  });
});
```

**Avoiding Direct Page Access Through POM**

When using inline locators, access `page` directly from the test signature rather than through the POM:

- ❌ **Don't**: `sessionOverviewPage.page.getByText('error message').click()`
- ✅ **Do**: `page.getByText('error message').click()` (with `{ page }` in test signature)
- ✅ **Do**: `sessionOverviewPage.errorMessage.click()` (when locator is in POM)

Keep page object responsibilities clear. Use inline locators for dynamic/one-time assertions, and POM locators for reusable elements.

**Test Signatures - When to Include `{ page }`**

Include `{ page }` when you need inline locators or direct page access. Remove it when only using POM locators:

```javascript
// ✅ Include { page } - inline locator needed for dynamic assertion
test("Verify file upload error", async ({ page }) => {
  await sessionOverviewPage.uploadAttachment("./tests/images/30mb.jpg");
  await expect(page.getByText('The file "30mb.jpg" exceeds')).toBeVisible();
});

// ✅ Remove { page } - only POM locators used
test("Verify Edit Profile screen UI elements @[117700]", async () => {
  await myAccountPage.openEditProfileModal();
  await expect(myAccountPage.editProfileModal).toBeVisible();
});

// ✅ Include { page } - direct page access needed
test("Verify page URL after save", async ({ page }) => {
  await myAccountPage.saveChanges();
  await expect(page).toHaveURL("/dashboard");
});
```

**Cross-Page Test Data Sharing**

When tests span multiple pages, organize TEST_DATA by functional area rather than by page:

```javascript
const TEST_DATA = {
  // Organize by feature/workflow, not by page
  REPORTING_FILTERS: {
    PERIODS: ["Week", "Day", "Month"],
    APPOINTMENT_TYPES: ["Video", "Chat", "All"],
    SERVICES: ["Pediatrics", "Toxicology Report"],
  },
  USER_MANAGEMENT: {
    ADMIN_USER: { name: "Test Admin", role: "Admin" },
    PATIENT_USER: { name: "Test Patient", role: "Patient" },
  },
};

test("Verify multi-select filters", async ({ page }) => {
  await adminDataReportingPage.applyMultipleServices(TEST_DATA.REPORTING_FILTERS.SERVICES);
  // assertions...
});
```

---

### Common Anti-Patterns to Avoid

**❌ Don't Import `Page` from `@playwright/test`**

```javascript
// Wrong
import { Page } from "@playwright/test";
```

**❌ Don't Access `page` Through POM for Inline Locators**

```javascript
// Wrong - verbose and inconsistent
await expect(sessionOverviewPage.page.getByText("error")).toBeVisible();

// Correct - include { page } in test signature
test("example", async ({ page }) => {
  await expect(page.getByText("error")).toBeVisible();
});
```

**❌ Don't Define Locators Inside Methods**

```javascript
// Wrong - locators should be in constructor
async clickButton() {
  const button = this.page.getByRole('button');
  await button.click();
}
```

**❌ Don't Create Single-Step POM Methods**

```javascript
// Wrong - this should just be used directly in test
async clickClearButton() {
  await this.clearFiltersButton.click();
}
```

**❌ Don't Add Poorly Named or Non-Semantic Locators to POM**

```javascript
// Wrong - unclear names, keep these inline in tests
this.modal = page.getByTestId("modal"); // Too generic
this.text1 = page.getByText("Some text"); // Non-descriptive
this.span = page.locator("span").first(); // Not semantic

// Correct - keep in test file as inline locators
test("example", async ({ page }) => {
  await expect(page.getByTestId("modal")).toBeVisible();
  await expect(page.getByText("cody test patient Cody Test")).toBeVisible();
});
```

**❌ Don't Keep Dead Code or Unused Locators**

```javascript
// Wrong - unused locators clutter the POM
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.forgotPasswordLink = page.getByRole("link", { name: "Forgot" }); // ❌ Never used!
    this.rememberMeCheckbox = page.getByLabel("Remember me"); // ❌ Never used!
  }

  // ❌ Method never called anywhere
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}

// Correct - only keep what's actively used
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

**Regular Maintenance:**

- Periodically search for unused locators and methods across your test suite
- When removing tests, clean up any POM elements that are no longer referenced
- If a feature is deprecated, remove its associated POM locators and methods
- Use your IDE's "Find Usages" feature to verify if elements are referenced before removing

**❌ Don't Create Unnecessary Variable Assignments**

```javascript
// Wrong - unnecessary const declarations for static data
test("example test", async () => {
  const firstName = TEST_DATA.USER.FIRST_NAME; // Unnecessary
  const lastName = TEST_DATA.USER.LAST_NAME; // Unnecessary
  const role = TEST_DATA.USER.ROLE; // Unnecessary

  await userTablePage.inviteUser(firstName, lastName, email, role);
});
```

**❌ Don't Hide Assertions in POM Methods**

```javascript
// Wrong - assertions belong in test files
async verifyLoginSuccess() {
  await expect(this.welcomeMessage).toBeVisible(); // Don't do this
}
```

**✅ Do Keep Assertions in Test Files**

```javascript
// Correct - assertions stay in test file
await loginPage.performLogin(username, password);
await expect(loginPage.welcomeMessage).toBeVisible();
```

**✅ Do Use Direct TEST_DATA References**

```javascript
// Correct - direct references for static data, variables only when needed
test("example test", async () => {
  // Only create variables when transformation is required
  const email = `${TEST_DATA.USER.EMAIL_PREFIX}.${Date.now()}@example.com`;

  // Use TEST_DATA directly for static values
  await userTablePage.inviteUser(TEST_DATA.USER.FIRST_NAME, TEST_DATA.USER.LAST_NAME, email, TEST_DATA.USER.ROLE);
});
```

**✅ Do Name Indexed Locators Descriptively**

When using `.nth()` for indexed locators, give them descriptive names:

```javascript
// ❌ Bad - unclear what nth(2) represents
this.closeButton2 = this.page.getByRole("button", { name: "XClose" }).nth(2);

// ✅ Better - describes the element's purpose or position
this.languageCloseButton = this.page.getByRole("button", { name: "XClose" }).nth(2);
this.countryDropdown = this.page.getByTestId("custom-select-item-wrapper").nth(1);
this.stateDropdown = this.page.getByTestId("custom-select-item-wrapper").nth(2);
```

---

### Quick Reference Checklist

Use this checklist when writing or reviewing test code:

**Page Object:**

- [ ] All locators defined in constructor (not in methods)
- [ ] Methods perform 3+ step user actions
- [ ] No assertions hidden in POM methods
- [ ] Extends `BasePage`, not importing `Page`
- [ ] Locators grouped logically with comments
- [ ] Modal methods include proper `waitFor()` states
- [ ] Conditional reset methods handle cleanup gracefully
- [ ] Only add locators with clear, semantic names
- [ ] No unused locators or dead code
- [ ] All elements are actively referenced in tests

**Test File:**

- [ ] TEST_DATA defined after imports, before `test.describe`
- [ ] No inline test data in individual tests
- [ ] Direct TEST_DATA references (no unnecessary variables)
- [ ] `{ page }` included when using inline locators
- [ ] `{ page }` removed when only using POM locators
- [ ] All assertions in test file (explicit and visible)
- [ ] POM initialized in `beforeEach`, not per-test
- [ ] Inline locators used for dynamic/one-time assertions
- [ ] Access `page` directly, not through POM (`page.getBy*`, not `pom.page.getBy*`)
