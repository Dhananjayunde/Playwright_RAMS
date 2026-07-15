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

// test('TC012 - Create Waste Entry Low Bin004 Dose Calibrator', async () => {
//     await waste.createWasteLowBin004();
// });

// ==========================
// GM SURVEY
// ==========================

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

// ==========================
// LIQUID SCINTILLATION
// ==========================

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

// ==========================
// NaI DETECTOR
// ==========================

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

test('TC062 - Create High Bin001 Again', async () => {
    await waste.createWasteHighBin001();
});

test('TC063 - Create Medium Bin001 Again', async () => {
    await waste.createWasteMediumBin001();
});

test('TC064 - Create Low Bin001 Again', async () => {
    await waste.createWasteLowBin001();
});

test('TC065 - Create High Bin002 Again', async () => {
    await waste.createWasteHighBin002();
});

test('TC066 - Create Medium Bin002 Again', async () => {
    await waste.createWasteMediumBin002();
});

test('TC067 - Create Low Bin002 Again', async () => {
    await waste.createWasteLowBin002();
});

test('TC068 - Create Activity Decimal', async () => {
    await waste.createWasteActivityDecimal();
});

test('TC069 - Create Maximum Activity', async () => {
    await waste.createWasteMaximumActivity();
});

test('TC070 - Move Waste High To Low Bin001', async () => {
    await waste.moveWasteToLowLevel();
});

test('TC071 - Move Waste High To Medium Bin', async () => {
    await waste.moveWasteToMediumLevel();
});

test('TC072 - Verify Transfer SC Mandatory', async () => {
    await waste.verifyTransferSCMandatory();
});

test('TC073 - Verify Transfer Reason Mandatory', async () => {
    await waste.verifyTransferReasonMandatory();
});

test('TC074 - Verify Transfer Observation Optional', async () => {
    await waste.verifyTransferObservationOptional();
});

test('TC075 - Verify Transfer Continue Button', async () => {
    await waste.verifyTransferContinueButton();
});

test('TC076 - Verify Cancel Transfer', async () => {
    await waste.verifyCancelTransfer();
});

test('TC077 - Verify Close Transfer Dialog', async () => {
    await waste.verifyCloseTransfer();
});

test('TC078 - Transfer Waste Successfully', async () => {
    await waste.transferWasteSuccessfully();
});

test('TC079 - Verify Waste Entry Exists After Transfer', async () => {
    await waste.verifyTransferredWaste();
});

test('TC080 - Verify Bin Updated After Transfer', async () => {
    await waste.verifyUpdatedBin();
});

test('TC081 - Verify Waste Status After Transfer', async () => {
    await waste.verifyWasteStatus();
});

test('TC082 - Verify Transfer History', async () => {
    await waste.verifyTransferHistory();
});

test('TC083 - Verify Multiple Waste Transfers', async () => {
    await waste.verifyMultipleTransfers();
});

test('TC084 - Verify Move Button Visible', async () => {
    await waste.verifyMoveButton();
});

test('TC085 - Verify Move Dialog Opens', async () => {
    await waste.verifyMoveDialog();
});

test('TC086 - Verify Approval Popup During Transfer', async () => {
    await waste.openApprovalPopup();
});

test('TC087 - End To End Waste Flow', async () => {
    await waste.fillWasteEntry();
    await waste.moveWasteToLowLevel();
});

            test.afterAll(async () => {

                await page.close();

            });

        });

}