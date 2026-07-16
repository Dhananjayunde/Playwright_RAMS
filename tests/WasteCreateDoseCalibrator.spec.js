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


test('TC001 - Create Waste Entry High Bin001 Dose Calibrator', async () => {
    await waste.createWasteHighBin001();
});

test('TC002 - Create Waste Entry High Bin002 Dose Calibrator', async () => {
    await waste.createWasteHighBin002();
});

test('TC003 - Create Waste Entry High Bin003 Dose Calibrator', async () => {
    await waste.createWasteHighBin003();
});

test('TC004 - Create Waste Entry High Bin004 Dose Calibrator', async () => {
    await waste.createWasteHighBin004();
});

test('TC005 - Create Waste Entry Medium Bin001 Dose Calibrator', async () => {
    await waste.createWasteMediumBin001();
});

test('TC006 - Create Waste Entry Medium Bin002 Dose Calibrator', async () => {
    await waste.createWasteMediumBin002();
});

test('TC007 - Create Waste Entry Medium Bin003 Dose Calibrator', async () => {
    await waste.createWasteMediumBin003();
});

test('TC008 - Create Waste Entry Medium Bin004 Dose Calibrator', async () => {
    await waste.createWasteMediumBin004();
});

test('TC009 - Create Waste Entry Low Bin001 Dose Calibrator', async () => {
    await waste.createWasteLowBin001();
});

test('TC010 - Create Waste Entry Low Bin002 Dose Calibrator', async () => {
    await waste.createWasteLowBin002();
});
test('TC011 - Create Waste Entry Low Bin003 Dose Calibrator', async () => {
    await waste.createWasteLowBin003();
});

test('TC012 - Create Waste Entry Low Bin004 Dose Calibrator', async () => {
    await waste.createWasteLowBin004();
 });

            test.afterAll(async () => {

                await page.close();

            });

        });

}