const { test, expect } = require('@playwright/test');
const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { WasteManagementPage } = require('../pages/WasteManagementPage');

const testData = ExcelUtils.getData(
    './testData/LoginData.xlsx',
    'Sheet2'
);

for (const data of testData) {

    test.describe.serial(
        `Waste Management - ${data.Email}`,
        () => {

            test.setTimeout(180000);

            let page;
            let login;
            let waste;

            test.beforeAll(async ({ browser }) => {

                const context = await browser.newContext();

                page = await context.newPage();

                login = new LoginPage(page);

                waste = new WasteManagementPage(page);

                await page.goto('/login');

                await login.login(
                    data.Email,
                    data.Password
                );

                await page.waitForLoadState('networkidle');

                await login.enterOTP();

            });

test('TC053 - Cancel Add Waste Entry', async () => {
    await waste.cancelWasteEntry();
});

test('TC054 - Close Add Waste Entry', async () => {
    await waste.closeWasteEntry();
});

test('TC055 - Receiving Log Validation', async () => {
    await waste.verifyReceivingLogValidation();
});

test('TC056 - Bin Validation', async () => {
    await waste.verifyBinValidation();
});

test('TC057 - Counting Method Validation', async () => {
    await waste.verifyMethodValidation();
});

test('TC058 - Survey Reading Validation', async () => {
    await waste.verifySurveyReadingValidation();
});

test('TC059 - Verify Default Entry Date', async () => {
    await waste.verifyDefaultEntryDate();
});

test('TC060 - Verify Observation Textbox', async () => {
    await waste.verifyDefaultObservationTextbox();
});

test('TC061 - Verify Continue Button', async () => {
    await waste.verifyContinueButtonVisible();
});

            test.afterAll(async () => {

                await page.close();

            });

        });

}