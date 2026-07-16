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

test('TC025 - Create Waste Entry High Bin001 Liquid Scintillation', async () => {

    await waste.createWasteHighBin001LiquidScintillation();

});

test('TC026 - Create Waste Entry High Bin002 Liquid Scintillation', async () => {

    await waste.createWasteHighBin002LiquidScintillation();

});

test('TC027 - Create Waste Entry High Bin003 Liquid Scintillation', async () => {

    await waste.createWasteHighBin003LiquidScintillation();

});

test('TC028 - Create Waste Entry High Bin004 Liquid Scintillation', async () => {

    await waste.createWasteHighBin004LiquidScintillation();

});

test('TC029 - Create Waste Entry Medium Bin001 Liquid Scintillation', async () => {

    await waste.createWasteMediumBin001LiquidScintillation();

});

test('TC030 - Create Waste Entry Medium Bin002 Liquid Scintillation', async () => {

    await waste.createWasteMediumBin002LiquidScintillation();

});

test('TC031 - Create Waste Entry Medium Bin003 Liquid Scintillation', async () => {

    await waste.createWasteMediumBin003LiquidScintillation();

});

test('TC032 - Create Waste Entry Medium Bin004 Liquid Scintillation', async () => {

    await waste.createWasteMediumBin004LiquidScintillation();

});

test('TC033 - Create Waste Entry Low Bin001 Liquid Scintillation', async () => {

    await waste.createWasteLowBin001LiquidScintillation();

});

test('TC034 - Create Waste Entry Low Bin002 Liquid Scintillation', async () => {

    await waste.createWasteLowBin002LiquidScintillation();

});

test('TC035 - Create Waste Entry Low Bin003 Liquid Scintillation', async () => {

    await waste.createWasteLowBin003LiquidScintillation();

});

test('TC036 - Create Waste Entry Low Bin004 Liquid Scintillation', async () => {

    await waste.createWasteLowBin004LiquidScintillation();

});


            test.afterAll(async () => {

                await page.close();

            });

        });

}