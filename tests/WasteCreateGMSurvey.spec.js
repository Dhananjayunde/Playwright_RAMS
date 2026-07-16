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

test('TC013 - Create Waste Entry High Bin001 GM Survey', async () => {

    await waste.createWasteHighBin001GMSurvey();

});

test('TC014 - Create Waste Entry High Bin002 GM Survey', async () => {

    await waste.createWasteHighBin002GMSurvey();

});

test('TC015 - Create Waste Entry High Bin003 GM Survey', async () => {

    await waste.createWasteHighBin003GMSurvey();

});

test('TC016 - Create Waste Entry High Bin004 GM Survey', async () => {

    await waste.createWasteHighBin004GMSurvey();

});

test('TC017 - Create Waste Entry Medium Bin001 GM Survey', async () => {

    await waste.createWasteMediumBin001GMSurvey();

});

test('TC018 - Create Waste Entry Medium Bin002 GM Survey', async () => {

    await waste.createWasteMediumBin002GMSurvey();

});

test('TC019 - Create Waste Entry Medium Bin003 GM Survey', async () => {

    await waste.createWasteMediumBin003GMSurvey();

});

test('TC020 - Create Waste Entry Medium Bin004 GM Survey', async () => {

    await waste.createWasteMediumBin004GMSurvey();

});

test('TC021 - Create Waste Entry Low Bin001 GM Survey', async () => {

    await waste.createWasteLowBin001GMSurvey();

});

test('TC022 - Create Waste Entry Low Bin002 GM Survey', async () => {

    await waste.createWasteLowBin002GMSurvey();

});

test('TC023 - Create Waste Entry Low Bin003 GM Survey', async () => {

    await waste.createWasteLowBin003GMSurvey();

});

test('TC024 - Create Waste Entry Low Bin004 GM Survey', async () => {

    await waste.createWasteLowBin004GMSurvey();

});
           test.afterAll(async () => {

                await page.close();

            });

        });

}