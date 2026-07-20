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
await waste.navigateToWasteManagement();

            });
test('TC072 - Verify Waste Entry Exists After Transfer', async () => {
    await waste.verifyTransferredWaste();
});

test('TC073 - Verify Bin Updated After Transfer', async () => {
    await waste.verifyUpdatedBin();
});

test('TC074 - Verify Waste Status After Transfer', async () => {
    await waste.verifyWasteStatus();
});

test('TC075 - Verify Transfer History', async () => {
    await waste.verifyTransferHistory();
});

test('TC076 - Verify Multiple Waste Transfers', async () => {
    await waste.verifyMultipleTransfers();
});

test('TC077 - Verify Move Button Visible', async () => {
    await waste.verifyMoveButton();
});

test('TC078 - Verify Move Dialog Opens', async () => {
    await waste.verifyMoveDialog();
});


            test.afterAll(async () => {

                await page.close();

            });

        });

}