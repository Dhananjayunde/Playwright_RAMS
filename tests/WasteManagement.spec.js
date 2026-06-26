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
            test.setTimeout(180000);
            const context = await browser.newContext();
            page = await context.newPage();
            login = new LoginPage(page);
            waste = new WasteManagementPage(page);

            await page.goto('/login');
            await login.login(data.Email, data.Password);
            await page.waitForLoadState('networkidle');
            await login.enterOTP();
        });

        test('Waste Management Create', { timeout: 180000 }, async () => {
             
            waste = new WasteManagementPage(page);
            await waste.fillWasteEntry();
        });

        test('Waste Management Move to Low Level', { timeout: 180000 }, async () => {
         
            waste = new WasteManagementPage(page);

            await waste.moveWasteToLowLevel();
        });
    });
}
