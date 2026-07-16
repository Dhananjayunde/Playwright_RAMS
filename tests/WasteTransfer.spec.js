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

test('TC062 - Move Waste High To Low Bin001', async () => {
    await waste.moveWasteToLowLevel();
});

test('TC063 - Move Waste High To Medium Bin', async () => {
    await waste.moveWasteToMediumLevel();
});
test('TC064 - Verify Transfer SC Mandatory', async () => {
    await waste.verifyTransferSCMandatory();
});

test('TC065 - Verify Transfer Reason Mandatory', async () => {
    await waste.verifyTransferReasonMandatory();
});

test('TC066 - Verify Transfer Observation Optional', async () => {
    await waste.verifyTransferObservationOptional();
});

test('TC067 - Verify Transfer Continue Button', async () => {
    await waste.verifyTransferContinueButton();
});

test('TC068 - Verify Cancel Transfer', async () => {
    await waste.verifyCancelTransfer();
});

test('TC069 - Verify Close Transfer Dialog', async () => {
    await waste.verifyCloseTransfer();
});

test('TC070 - Verify Approval Popup During Transfer', async () => {
    await waste.openApprovalPopup();
});

test('TC071 - Transfer Waste Successfully', async () => {
    await waste.transferWasteSuccessfully();
});



            test.afterAll(async () => {

                await page.close();

            });

        });

}