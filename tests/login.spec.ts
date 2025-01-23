import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Login Tests', () => {
    test.beforeEach(async ({ page, context }) => {
        // Clear cookies and localStorage before each test
        await context.clearCookies();
        await page.goto('https://www.saucedemo.com/');
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
    });

    test('verify login page elements', async ({ page }) => {
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();
    });

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
            await page.fill('#user-name', user.username);
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');

            if (user.shouldPass) {
                // Verify successful login
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                await expect(page.locator('.inventory_list')).toBeVisible();
                await expect(page).toHaveTitle('Swag Labs');
            } else {
                // Verify locked out message
                const errorMessage = page.locator('[data-test="error"]');
                await expect(errorMessage).toBeVisible();
                await expect(errorMessage).toContainText('Sorry, this user has been locked out');
            }
        });
    }

    test('failed login with invalid credentials', async ({ page }) => {
        await page.fill('#user-name', 'wrong_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match');
    });

    test('error with empty username but filled password', async ({ page }) => {
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required');
    });

    test('error with filled username but empty password', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Password is required');
    });

    test('error with both empty fields', async ({ page }) => {
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required');
    });
});