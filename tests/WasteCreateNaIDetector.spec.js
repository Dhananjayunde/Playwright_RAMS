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
test('TC037 - Create Waste Entry High Bin001 NaI Detector', async () => {

    await waste.createWasteHighBin001NaIDetector();

});

test('TC038 - Create Waste Entry High Bin002 NaI Detector', async () => {

    await waste.createWasteHighBin002NaIDetector();

});

test('TC039 - Create Waste Entry High Bin003 NaI Detector', async () => {

    await waste.createWasteHighBin003NaIDetector();

});

test('TC040 - Create Waste Entry High Bin004 NaI Detector', async () => {

    await waste.createWasteHighBin004NaIDetector();

});

test('TC041 - Create Waste Entry Medium Bin001 NaI Detector', async () => {

    await waste.createWasteMediumBin001NaIDetector();

});

test('TC042 - Create Waste Entry Medium Bin002 NaI Detector', async () => {

    await waste.createWasteMediumBin002NaIDetector();

});

test('TC043 - Create Waste Entry Medium Bin003 NaI Detector', async () => {

    await waste.createWasteMediumBin003NaIDetector();

});

test('TC044 - Create Waste Entry Medium Bin004 NaI Detector', async () => {

    await waste.createWasteMediumBin004NaIDetector();

});

test('TC045 - Create Waste Entry Low Bin001 NaI Detector', async () => {

    await waste.createWasteLowBin001NaIDetector();

});

test('TC046 - Create Waste Entry Low Bin002 NaI Detector', async () => {

    await waste.createWasteLowBin002NaIDetector();

});

test('TC047 - Create Waste Entry Low Bin003 NaI Detector', async () => {

    await waste.createWasteLowBin003NaIDetector();

});

test('TC048 - Create Waste Entry Low Bin004 NaI Detector', async () => {

    await waste.createWasteLowBin004NaIDetector();

});

test('TC049 - Create Waste Entry Activity Decimal Value', async () => {
    await waste.createWasteActivityDecimal();
});

test('TC050 - Create Waste Entry Activity Integer Value', async () => {
    await waste.createWasteActivityInteger();
});

test('TC051 - Create Waste Entry Minimum Activity', async () => {
    await waste.createWasteMinimumActivity();
});

test('TC052 - Create Waste Entry Maximum Activity', async () => {
    await waste.createWasteMaximumActivity();
});

            test.afterAll(async () => {

                await page.close();

            });

        });

}