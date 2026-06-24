const { test } = require('@playwright/test');

const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { WasteManagementPage } = require('../pages/WasteManagementPage');

const testData = ExcelUtils.getData('./testData/LoginData.xlsx', 'Sheet2');

test.describe('Waste Management Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    for (const data of testData) {
        test(`Waste Management - ${data.Email}`, { timeout: 60000 }, async ({ page }) => {
            const login = new LoginPage(page);
            const waste = new WasteManagementPage(page);

            await login.login(data.Email, data.Password);
            await page.waitForLoadState('networkidle');
            await login.enterOTP();

            await waste.fillWasteEntry();
        });
    }
});
