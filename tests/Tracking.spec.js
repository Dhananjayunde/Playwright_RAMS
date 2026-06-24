const { test } = require('@playwright/test');

const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { TrackingPage } = require('../pages/TrackingPage');

const testData = ExcelUtils.getData('./testData/LoginData.xlsx', 'Sheet2');

test.describe('Tracking Module Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    for (const data of testData) {
        test(`Tracking Module - ${data.Email}`, { timeout: 60000 }, async ({ page }) => {
            const login = new LoginPage(page);
            const tracking = new TrackingPage(page);

            await login.login(data.Email, data.Password);
            await page.waitForLoadState('networkidle');
            await login.enterOTP();

            await tracking.fillTrackingEntry();
        });
    }
});
