import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('verify login page elements', async ({ page }) => {
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();
    });

    test('successful login with valid credentials', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Verify successful login
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('failed login with invalid credentials', async ({ page }) => {
        await page.fill('#user-name', 'wrong_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match');
    });

    test('error with empty fields', async ({ page }) => {
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required');
    });
});