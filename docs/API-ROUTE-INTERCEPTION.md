# API Route Interception in Playwright

## Overview

**Is this API testing?** Not exactly. This is **route interception** (also called network mocking), where you intercept browser network requests during E2E tests and return mock responses. This differs from pure API testing, which uses Playwright's `request` fixture to directly test APIs without a browser.

Route interception is useful for:

- Testing UI behavior without hitting real backend services
- Simulating edge cases (errors, slow responses, specific data states)
- Making tests faster and more reliable
- Isolating frontend logic from backend dependencies

## Pattern: Basic Route Interception

### Example from manage-calendar.spec.js

```javascript
test("Verify Save Changes with All Times Populated", async ({ page }) => {
  // 1. Set up a flag to track if the API was called
  let requestIntercepted = false;

  // 2. Intercept requests matching the pattern
  await page.route("**/api/v2/users/**", async (route) => {
    requestIntercepted = true;

    // 3. Return a mock response
    await route.fulfill({
      status: 201,
      body: JSON.stringify({
        success: true,
        data: {
          id: "test-id",
          calendar_settings: {
            weekly_availability: [{}, {}, {}, {}, {}, {}, {}],
          },
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
  });

  // 4. Perform actions that trigger the API call
  await calendarPage.editDailyAvailabilityButton.click();
  await calendarPage.availabilityToggleMonday.click();
  await calendarPage.availabilitySaveChangesButton.click();

  // 5. Verify the API was called and UI responded correctly
  expect(requestIntercepted).toBe(true);
  await expect(calendarPage.availabilitySuccessMessage).toBeVisible();
});
```

## Key Concepts

### 1. URL Pattern Matching

```javascript
// Match exact endpoint
await page.route("https://app.example.com/api/v2/users/123", handler);

// Use wildcards
await page.route("**/api/v2/users/**", handler);

// Use regex
await page.route(/api\/v2\/(users|profiles)/, handler);

// Match by predicate function
await page.route((url) => url.pathname.includes("/api/"), handler);
```

### 2. Route Handler Options

**Continue with modifications:**

```javascript
await page.route("**/api/data", async (route) => {
  await route.continue({
    headers: {
      ...route.request().headers(),
      Authorization: "Bearer mock-token",
    },
  });
});
```

**Abort the request:**

```javascript
await page.route("**/analytics/**", (route) => route.abort());
```

**Return mock response:**

```javascript
await page.route("**/api/data", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ data: [] }),
  });
});
```

### 3. Inspecting Requests

```javascript
await page.route("**/api/users/**", async (route) => {
  const request = route.request();

  console.log("Method:", request.method());
  console.log("Headers:", request.headers());
  console.log("Post Data:", request.postData());

  await route.fulfill({ status: 200, body: "{}" });
});
```

### 4. Conditional Responses

```javascript
await page.route("**/api/users/**", async (route) => {
  const request = route.request();

  if (request.method() === "POST") {
    await route.fulfill({ status: 201, body: '{"created": true}' });
  } else if (request.method() === "DELETE") {
    await route.fulfill({ status: 204 });
  } else {
    await route.continue(); // Let other methods pass through
  }
});
```

## Advanced Patterns

### Simulating Network Errors

```javascript
await page.route("**/api/data", (route) => route.abort("failed"));
```

### Simulating Slow Responses

```javascript
await page.route("**/api/slow", async (route) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await route.fulfill({ status: 200, body: '{"delayed": true}' });
});
```

### Multiple Route Handlers

```javascript
// More specific routes should be registered first
await page.route("**/api/users/me", async (route) => {
  await route.fulfill({ status: 200, body: '{"id":"current-user"}' });
});

await page.route("**/api/users/**", async (route) => {
  await route.fulfill({ status: 200, body: '{"id":"other-user"}' });
});
```

### Unrouting

```javascript
const handler = (route) => route.fulfill({ status: 200, body: "{}" });
await page.route("**/api/**", handler);

// Later, remove the route
await page.unroute("**/api/**", handler);
```

## Route Interception vs API Testing

### Route Interception (this pattern)

- Uses `page.route()` during browser tests
- Mocks network requests made by the browser
- Tests UI behavior with controlled backend responses
- Part of E2E tests

### Pure API Testing

- Uses `request` fixture (no browser)
- Directly tests API endpoints
- Validates API contracts, status codes, response schemas
- Standalone API tests

### API Testing Example

```javascript
import { test, expect } from "@playwright/test";

test("API endpoint returns correct data", async ({ request }) => {
  const response = await request.get("https://api.example.com/users");

  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.users).toHaveLength(10);
});
```

## Best Practices

1. **Register routes before navigation**: Set up `page.route()` before the page loads or triggers the request

2. **Use specific patterns**: Avoid overly broad patterns that might catch unintended requests

3. **Track interception**: Use flags to verify expected requests were actually made

4. **Clean up**: Routes persist until the page is closed, so be mindful of test isolation

5. **Match real responses**: Make mock responses realistic to catch integration issues

6. **Consider HAR files**: For complex scenarios, record and replay network traffic with HAR files

## Official Playwright Documentation

- **Network Mocking**: https://playwright.dev/docs/network
- **Route API**: https://playwright.dev/docs/api/class-route
- **Page.route()**: https://playwright.dev/docs/api/class-page#page-route
- **API Testing**: https://playwright.dev/docs/api-testing
- **Request fixture**: https://playwright.dev/docs/api/class-apirequestcontext
- **HAR Recording**: https://playwright.dev/docs/network#record-and-replay-har-files

## When to Use Each Approach

| Scenario                        | Use Route Interception | Use API Testing |
| ------------------------------- | ---------------------- | --------------- |
| Test UI with known data states  | ✅                     | ❌              |
| Test error handling in UI       | ✅                     | ❌              |
| Validate API response schema    | ❌                     | ✅              |
| Test without backend dependency | ✅                     | ❌              |
| Test API authentication         | ❌                     | ✅              |
| Verify API contracts            | ❌                     | ✅              |
| Speed up E2E tests              | ✅                     | N/A             |

## Related Patterns

- [HAR Recording and Replay](https://playwright.dev/docs/mock#mocking-with-har-files)
- [Service Worker Interception](https://playwright.dev/docs/service-workers-experimental)
- [WebSocket Mocking](https://playwright.dev/docs/network#websockets)
