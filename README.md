# SauceDemo Login Tests Documentation

## Project Overview

Automated test suite for SauceDemo login functionality using Playwright. This project implements comprehensive testing of the login functionality including various user scenarios, error handling, and state management.

## Prerequisites

* Node.js (v14 or higher)
* npm (comes with Node.js)
* Git
* VS Code (recommended)

## Installation Steps

### System Setup

#### Linux Package Managers

```bash
# Debian/Ubuntu based systems
sudo apt update
sudo apt install nodejs npm git

# RHEL/Fedora based systems
sudo dnf install nodejs npm git

# Arch Linux
sudo pacman -S nodejs npm git

# Verify installation
node --version
npm --version
git --version
```

#### Using Node Version Manager (nvm) - All Distributions

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or source profile
source ~/.bashrc

# Install latest LTS version of Node.js
nvm install --lts
```

### Project Setup

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

### Project Structure

```
saucedemo-tests/
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tests/
│   └── login.spec.ts
├── .gitignore
├── README.md
└── TASK.md
```

## Configuration Files

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

## Test Implementation

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

### Test Cases (login.spec.ts)

#### 1. Basic Page Element Verification

```typescript
test('verify login page elements', async ({ page }) => {
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
});
```

#### 2. Valid User Tests

```typescript
const validUsers = [
  { username: 'standard_user', shouldPass: true },
  { username: 'locked_out_user', shouldPass: false },
  { username: 'problem_user', shouldPass: true },
  { username: 'performance_glitch_user', shouldPass: true },
  { username: 'error_user', shouldPass: true },
  { username: 'visual_user', shouldPass: true }
];

for (const user of validUsers) {
  test(`login attempt with ${user.username}`, async ({ page }) => {
    // Test implementation details
  });
}
```

#### 3. Invalid Credentials Test

```typescript
test('failed login with invalid credentials', async ({ page }) => {
  // Test implementation details
});
```

#### 4. Empty Fields Validation

```typescript
test('error with empty username but filled password', async ({ page }) => {
  // Test implementation details
});

test('error with filled username but empty password', async ({ page }) => {
  // Test implementation details
});

test('error with both empty fields', async ({ page }) => {
  // Test implementation details
});
```

### Key Components

#### BeforeEach Hook

```typescript
test.beforeEach(async ({ page, context }) => {
  // Clear all cookies before each test
  await context.clearCookies();
  
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');
  
  // Clear localStorage and sessionStorage
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});
```

#### Important Locators

* `#user-name`: Username input field
* `#password`: Password input field
* `#login-button`: Login submit button
* `[data-test="error"]`: Error message container
* `.inventory_list`: Inventory page element (success verification)
* `page.title()`: Page title verification

#### Assertions

1. Page Navigation

```typescript
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
```

2. Element Visibility

```typescript
await expect(page.locator('.inventory_list')).toBeVisible();
```

3. Error Messages

```typescript
await expect(errorMessage).toContainText('Username is required');
```

4. Page Title

```typescript
await expect(page).toHaveTitle('Swag Labs');
```

## Running Tests

### Basic Test Execution

```bash
npx playwright test
```

### Generate HTML Report

```bash
npx playwright test --reporter=html
npx playwright show-report
```

### Run Specific Test File

```bash
npx playwright test login.spec.ts
```

### Debug Mode

```bash
npx playwright test --debug
```

### Test Filtering

```bash
# Run tests with specific name
npx playwright test -g "successful login"

# Run tests in specific file
npx playwright test tests/login.spec.ts
```

## Test Report Analysis

The HTML report includes:

1. Test Execution Details
   * Duration
   * Status (passed/failed)
   * Test suite hierarchy
2. Failure Information
   * Error messages
   * Stack traces
   * Screenshots
3. Trace Viewer
   * Timeline of actions
   * Network requests
   * Console logs

## Troubleshooting

### Common Issues and Solutions

1. Timeout Issues
   * Adjust global timeout in playwright.config.ts
   * Modify expect timeout for specific assertions
   * Check network conditions

2. Element Location Problems
   * Verify selector accuracy
   * Check for dynamic content loading
   * Use waitFor functions if needed

3. Browser Issues
   * Reinstall browsers: `npx playwright install`
   * Check system requirements
   * Verify browser dependencies

4. Test Isolation
   * Ensure beforeEach hook runs properly
   * Verify cache/cookie clearing
   * Check for residual state

### Debug Techniques

1. Visual Debugging
   ```bash
   npx playwright test --debug
   ```

2. Trace Recording
   ```bash
   npx playwright test --trace on
   ```

3. Screenshots
   ```typescript
   await page.screenshot({ path: 'screenshot.png' });
   ```

## Best Practices

### 1. Selector Strategy

* Use data-test attributes when possible
* Maintain selector documentation
* Keep selectors specific but resilient

### 2. Test Independence

* Clear state between tests
* Avoid test interdependencies
* Use beforeEach for setup

### 3. Error Handling

* Implement meaningful assertions
* Add custom error messages
* Handle expected failures gracefully

### 4. Code Organization

* Group related tests
* Use descriptive test names
* Maintain test file structure

### 5. Performance

* Optimize waits and timeouts
* Handle dynamic content properly
* Implement parallel execution when possible

### Best Practices for Git

1. Regular commits with meaningful messages
2. Proper .gitignore configuration
3. Branch usage for features/fixes
4. Pull request reviews when applicable

## Maintenance

1. Regular updates of dependencies
2. Periodic review of test coverage
3. Documentation updates
4. Performance optimization
5. Code refactoring as needed
