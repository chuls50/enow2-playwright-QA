# POM Naming Conventions

Naming conventions for Page Object Model (POM) files in our Playwright test framework.

---

## Page Class Naming

**Format:** `{Role/Context}{PageName}Page`

```javascript
export class DeviceMyAccountPage extends BasePage {}
export class AdminUsersTablePage extends BasePage {}
export class ProviderNotificationsPage extends BasePage {}
```

---

## Variable Naming for POM Instances

Always use the **full POM class name** in camelCase for variable names:

```javascript
// ❌ Bad - ambiguous, loses context
let dashboardPage;
let overviewPage;

// ✅ Good - clear role context
let providerDashboardPage;
let patientDashboardPage;
let sessionOverviewPage;
```

**Multiple POMs in Same Test:**

```javascript
test.beforeEach(async ({ page }) => {
  providerDashboardPage = new ProviderDashboardPage(page);
  sessionOverviewPage = new ProviderSessionOverviewPage(page);
  await providerDashboardPage.navigateToProviderDashboard();
});
```

---

## Locator Type Suffixes

Use **camelCase** with a **type suffix** describing the element.

| Element Type     | Suffix          | Example                      |
| ---------------- | --------------- | ---------------------------- |
| Plain text       | `*Text`         | `deviceIdText`               |
| Input field      | `*Input`        | `zipCodeInput`               |
| Button           | `*Button`       | `saveChangesButton`          |
| Link             | `*Link`         | `changeLanguageLink`         |
| Heading          | `*Heading`      | `myAccountHeading`           |
| Label (in modal) | `*Label`        | `modalNameLabel`             |
| Dropdown wrapper | `*Dropdown`     | `languageSelectDropdown`     |
| Dropdown item    | `*DropdownItem` | `spanishDropdownItem`        |
| Icon/Avatar      | `*Icon`         | `profilePictureIcon`         |
| Toggle/Switch    | `*Toggle`       | `emailNotificationToggle`    |
| Modal container  | `*Modal`        | `editProfileModal`           |
| Error message    | `*Error`        | `nameRequiredError`          |
| Toast (neutral)  | `*Toast`        | `timeZoneUpdatedToast`       |
| Toast (success)  | `*SuccessToast` | `profileUpdatedSuccessToast` |
| Toast (error)    | `*ErrorToast`   | `profileUpdatedErrorToast`   |

### Modal Element Prefix

Locators inside a modal use `modal*` prefix + type suffix:

```javascript
this.modalNameLabel = page.getByRole('dialog').getByText('Name');
this.modalZipCodeLabel = page.getByRole('dialog').getByText('Zip code');
```

---

## When to Keep Locators Inline (Not in POM)

**Not every locator belongs in the POM.** If you cannot come up with a clear, semantic name for a locator, it should remain inline in the test file.

**Keep Inline When:**

| Scenario                            | Example                                              | Reason                            |
| ----------------------------------- | ---------------------------------------------------- | --------------------------------- |
| Dynamic text with test data         | `page.getByText(\`${TEST_DATA.DEVICE_NAME} (you)\`)` | Contains test-specific data       |
| Error messages with dynamic content | `page.getByText('The file "30mb.jpg" exceeds')`      | Test-specific validation          |
| One-time assertions                 | `page.getByText('CCcody test patient Cody Test')`    | Not reused elsewhere              |
| No semantic name possible           | Complex filter chains with `.nth()` or `.first()`    | Would create unclear POM property |
| Parameterized dynamic locators      | `page.getByText(participantName)`                    | Value comes from test             |

**Add to POM When:**

| Scenario               | Example                     | Reason                     |
| ---------------------- | --------------------------- | -------------------------- |
| Reusable element       | `this.deviceIdBadgeText`    | Used across multiple tests |
| Clear semantic meaning | `this.sessionCanceledToast` | Obvious what it represents |
| Part of user workflow  | `this.cancelSessionButton`  | Used in POM methods        |
| Assertion target       | `this.participantsText`     | Verified in multiple tests |

**Example - Keep Inline:**

```javascript
// ✅ Keep inline - dynamic test data, no clear name
await expect(page.getByText(`${TEST_DATA.DEVICE_NAME} (you)`)).toBeVisible();
await expect(page.getByText('cody test patient Cody Test Institution')).toBeVisible();

// ✅ Keep inline - error message with filename
await expect(page.getByText('The file "30mb.jpg" exceeds')).toBeVisible();
```

**Example - Add to POM:**

```javascript
// ✅ Add to POM - clear semantic name, reusable
this.deviceIdBadgeText = page.getByText('Device ID');
this.sessionCanceledToast = page.getByText('Session request canceled');
this.participantsText = page.getByText('Participants');
```

---

## Locator Grouping

Group locators with **section comments**, ordered by user flow:

```javascript
constructor(page) {
  super(page);

  // Navigation elements
  this.profileIconButton = page.getByTestId('popover-trigger').first();
  this.accountSettingsButton = page.getByRole('button', { name: 'Account settings' });

  // Profile section (View Mode)
  this.nameText = page.getByText('Name');
  this.emailText = page.getByText('Email');

  // Edit Profile modal
  this.editProfileButton = page.getByRole('button', { name: 'Edit Edit' });
  this.editProfileModal = page.getByRole('dialog');
  this.nameInput = page.getByRole('textbox', { name: 'Name' });

  // Modal labels (for verification)
  this.modalNameLabel = page.getByRole('dialog').getByText('Name');

  // Toast messages
  this.profileUpdatedSuccessToast = page.getByTestId('toast').getByText('Profile updated');

  // Error messages
  this.nameRequiredError = page.getByText('Name is required');
}
```

**Recommended section order:**

1. Navigation elements
2. Page content (view mode)
3. Modal elements and inputs
4. Modal labels (for assertions)
5. Toast messages
6. Error messages
7. Localized/alternate language elements

---

## Method Naming Conventions

Use **verb-first** naming that describes the action.

| Action Type    | Prefix            | Example                           |
| -------------- | ----------------- | --------------------------------- |
| Navigation     | `navigateTo*`     | `navigateToMyAccount()`           |
| Open modal     | `open*`           | `openEditProfileModal()`          |
| Close modal    | `close*`          | `closeEditProfileModal()`         |
| Fill field     | `fill*`           | `fillName(value)`                 |
| Clear fields   | `clear*`          | `clearAddressFields()`            |
| Select option  | `select*`         | `selectCountry(name)`             |
| Toggle state   | `toggle*`         | `toggleTimeZone()`                |
| Save/Submit    | `save*`           | `saveChanges()`                   |
| Delete/Remove  | `delete*`         | `deleteProfilePhoto()`            |
| Upload file    | `upload*`         | `uploadProfilePhoto(path)`        |
| Change setting | `change*To*`      | `changeLanguageToSpanish()`       |
| Reset state    | `reset*IfPresent` | `resetSpanishLanguageIfPresent()` |

---

## Method Grouping

Organize methods with **section headers**. Helper methods go last.

```javascript
// ========================================
// NAVIGATION METHODS
// ========================================

async navigateToMyAccount() { }
async navigateToNotifications() { }

// ========================================
// EDIT PROFILE MODAL METHODS
// ========================================

async openEditProfileModal() { }
async fillName(name) { }
async saveChanges() { }

// ========================================
// PHOTO METHODS
// ========================================

async uploadProfilePhoto(filePath) { }
async deleteProfilePhoto() { }

// ========================================
// HELPER METHODS
// ========================================

getProfilePictureInitial(letter) { }
```

---

## Quick Reference

```
Locator:  {descriptiveName}{TypeSuffix}
Modal:    modal{DescriptiveName}{TypeSuffix}
Method:   {actionVerb}{Target}({parameters})
Variable: {fullPomClassName} in camelCase
Inline:   Keep locators in test when no clear semantic name exists
```

## Example Files

- **POM:** `tests/models/pages/device/device-my-account.page.js`
- **Spec:** `tests/regression/Account-Settings/My-Account-tab/device-id-my-account-and-edit.spec.js`
