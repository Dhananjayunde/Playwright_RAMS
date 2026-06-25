const { test } = require('@playwright/test');

const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { WasteManagementPage } = require('../pages/WasteManagementPage');

const testData = ExcelUtils.getData('./testData/LoginData.xlsx', 'Sheet2');

for (const data of testData) {
    test.describe.serial(`Waste Management - ${data.Email}`, () => {
        let page;
        let login;
        let waste;

        test.beforeAll(async ({ browser }) => {
            const context = await browser.newContext();
            page = await context.newPage();
            login = new LoginPage(page);
            waste = new WasteManagementPage(page);

            await page.goto('/login');
            await login.login(data.Email, data.Password);
            await page.waitForLoadState('networkidle');
            await login.enterOTP();
        });

        test('Waste Management Create', { timeout: 60000 }, async () => {
            await waste.createWasteEntry();
        });

        test('Waste Management Move to Low Level', { timeout: 60000 }, async () => {
            await waste.moveWasteToLowLevel();
        });
    });
}
