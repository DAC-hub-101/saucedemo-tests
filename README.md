# SauceDemo Login Tests Documentation

## Project Overview

Automated test suite for SauceDemo login functionality using Playwright.

## Prerequisites

* Node.js (v14 or higher)
* npm (comes with Node.js)
* Git

## Installation Steps

### 1. System Setup (Arch Linux)

```bash
# Install Node.js and npm
sudo pacman -S nodejs npm

# Verify installation
node --version
npm --version
```

### 2. Project Setup

```bash
# Create project directory
mkdir saucedemo-tests
cd saucedemo-tests

# Initialize npm project
npm init -y

# Install Playwright
npm install @playwright/test

# Install browser drivers
npx playwright install
```

### 3. Project Structure

```
saucedemo-tests/
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tests/
│   └── login.spec.ts
└── .gitignore
```

## Configuration Files

### .gitignore

```
node_modules/
test-results/
playwright-report/
playwright/.cache/
```

### package.json

```json
{
  "name": "saucedemo-tests",
  "version": "1.0.0",
  "description": "Automated tests for SauceDemo login",
  "scripts": {
    "test": "playwright test",
    "test:report": "playwright test --reporter=html && playwright show-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.41.0"
  }
}
```

## Code Documentation

### playwright.config.ts

```typescript
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',           // Directory containing test files
  timeout: 30000,               // Global timeout for tests
  expect: {
    timeout: 5000              // Timeout for expect assertions
  },
  use: {
    actionTimeout: 0,          // Timeout for actions like click
    trace: 'on-first-retry',   // Trace recording settings
  },
};

export default config;
```

### login.spec.ts

File contains four test cases:

1. **Verify Login Page Elements**

```typescript
test('verify login page elements', async ({ page }) => {
  // Verifies presence of username, password fields and login button
});
```

2. **Successful Login**

```typescript
test('successful login with valid credentials', async ({ page }) => {
  // Tests login with valid credentials
  // Verifies redirect to inventory page
});
```

3. **Failed Login**

```typescript
test('failed login with invalid credentials', async ({ page }) => {
  // Tests login with invalid credentials
  // Verifies error message
});
```

4. **Empty Fields**

```typescript
test('error with empty fields', async ({ page }) => {
  // Tests submission with empty fields
  // Verifies validation message
});
```

### Key Components

#### BeforeEach Hook

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});
```

* Runs before each test
* Navigates to the login page
* Ensures fresh state for each test

#### Locators

* `#user-name`: Username input field
* `#password`: Password input field
* `#login-button`: Login submit button
* `[data-test="error"]`: Error message container
* `.inventory_list`: Inventory page element (success verification)

## Running Tests

### Basic Test Run

```bash
npx playwright test
```

### Generate HTML Report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

### Run Specific Test

```bash
npx playwright test login.spec.ts
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## Test Report Analysis

* View detailed test results with `npx playwright show-report`
* Reports include:
  * Test execution time
  * Pass/fail status
  * Error messages
  * Screenshots (on failure)
  * Trace viewer (when enabled)

## Troubleshooting

* **Test Timeouts**: Adjust timeouts in `playwright.config.ts`
* **Element Not Found**: Check selectors and wait conditions
* **Browser Issues**: Run `npx playwright install` to reinstall browsers

## Best Practices

1. Use data-test attributes for stable selectors
2. Keep tests independent
3. Clean up test data in afterEach hooks
4. Use meaningful test descriptions
5. Handle timeouts appropriately
