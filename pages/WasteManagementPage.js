const BasePage = require('./BasePage');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');
const Logger = require('../utils/Logger');

const waste = TestDataManager.getData('wasteManagementData.json');

class WasteManagementPage extends BasePage {

    constructor(page) {

        super(page);

        this.wasteManagementMenu =
            page.getByText(CONSTANTS.WASTE.MENU, { exact: true }).first();

        this.addWasteEntryBtn =
            page.getByText(CONSTANTS.WASTE.ADD_ENTRY, { exact: true }).first();

        this.receivingLog =
            page.getByText(/Select receiving log entry/i).first();

        this.receivingLogOption =
            page.getByText(/07-03/i).first();

        this.bin =
            page.getByText(/Select bin/i).first();

       
        this.entryDate =
            page.locator('input[name="entryDate"]');

        this.activity =
            page.getByPlaceholder('e.g. 85');

        this.instrument =
            page.getByText(/Select instrument/i).first();

        this.instrumentOption =
            page.getByRole('option', {
                name: /sn123/i
            });

        this.method =
            page.getByRole('combobox', {
                name: /Select method/i
            });

        this.doseCalibratorMethod =
page.getByRole('option',{
    name:/Dose Calibrator/i
});

this.gmSurveyMethod =
page.getByRole('option',{
    name:/GM Survey/i
});

this.liquidScintillationMethod =
page.getByRole('option',{
    name:/Liquid Scintillation/i
});

this.naiDetectorMethod =
page.getByRole('option',{
    name:/NaI Detector/i
});
        this.location =
            page.getByText(/Select location/i).first();

        this.locationOption =
            page.getByRole('option', {
                name: /Cold Room/i
            });

        this.scTextbox =
            page.getByRole('textbox', {
                name: 'e.g. SC'
            });

        this.observation =
            page.getByRole('textbox', {
                name: 'Additional observations...'
            });

        this.continueBtn =
            page.getByRole('button', {
                name: CONSTANTS.WASTE.CONTINUE
            });

        this.approveText =
            page.getByText(
                CONSTANTS.WASTE.APPROVE_TEXT,
                { exact: true }
            ).first();

        this.approveOption =
            page.getByRole('option', {
                name: CONSTANTS.WASTE.APPROVE_TEXT
            });

        this.password =
            page.getByRole('textbox', {
                name: CONSTANTS.WASTE.PASSWORD
            });

        this.confirmBtn =
            page.getByRole('button').nth(1);

        this.signCommit =
            page.getByRole('button', {
                name: /Sign & Commit/i
            });

        this.successToast =
            page.getByText(/Waste entry created/i).first();

        this.closeToast =
            page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit')
                .first();

        this.moveBtn =
            page.getByRole('button', {
                name: 'Move'
            }).first();

this.highBin001 = page.getByRole('option', {
    name: /Bin-001-High/i
});

this.highBin002 = page.getByRole('option', {
    name: /Bin_002_High/i
});

this.highBin003 = page.getByRole('option', {
    name: /Bin_003_High/i
});

this.highBin004 = page.getByRole('option', {
    name: /Bin_004_High/i
});

this.mediumBin001 = page.getByRole('option', {
    name: /Bin-001-Medium/i
});

this.mediumBin002 = page.getByRole('option', {
    name: /Bin-002-Medium/i
});

this.mediumBin003 = page.getByRole('option', {
    name: /Bin-003-Medium/i
});

this.mediumBin004 = page.getByRole('option', {
    name: /Bin-004-Medium/i
});

this.lowBin001 = page.getByRole('option', {
    name: /Bin-001-Low/i
});

this.lowBin002 = page.getByRole('option', {
    name: /Bin-002-Low/i
});

this.lowBin003 = page.getByRole('option', {
    name: /Bin-003-Low/i
});

this.lowBin004 = page.getByRole('option', {
    name: /Bin-004-Low/i
});
        this.transferDate =
            page.getByLabel(/Date|Transfer Date|Entry Date/i).first();

        this.reason =
            page.getByText(/Select reason/i);

        this.otherReason =
            page.getByRole('option', {
                name: /other/i
            });

        this.transferObservation =
            page.getByRole('textbox', {
                name: 'Transfer observations...'
            });

        this.transferToast =
            page.getByText(/Waste entry transferred/i).first();

          
this.cancelBtn = page.getByRole('button', {
    name: /Cancel/i
});

this.closeBtn = page.locator('[data-testid="CloseIcon"]').first();

this.receivingLogValidation =
    page.getByText(/Receiving Log.*required/i);

this.binValidation =
    page.getByText(/Bin.*required/i);

this.methodValidation =
    page.getByText(/Method.*required./i);

this.scValidation =
    page.getByText(/Survey Reading.*required./i);

this.observationValidation =
    page.getByText(/Observation.*required./i);

this.addWasteDialog =
    page.getByText('+ Add Waste Entry');
    }

   // ===========================
// COMMON HELPER METHODS
// ===========================

async waitForAppReady() {

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await this.actions.wait(1);

}

async navigateToWasteManagement() {

    Logger.info('Navigating to Waste Management');

    // Already on Waste Management page
    if (await this.addWasteEntryBtn.isVisible().catch(() => false)) {
        return;
    }

    // Close any dialog blocking clicks
    await this.page.keyboard.press('Escape').catch(() => {});

    // Close any visible dialog using Close icon
    if (await this.closeBtn.isVisible().catch(() => false)) {
        await this.closeBtn.click().catch(() => {});
    }

    await this.actions.waitForVisible(this.wasteManagementMenu);

    await this.wasteManagementMenu.click({ force: true });

    await this.waitForAppReady();

    await this.actions.waitForVisible(this.addWasteEntryBtn);

}

async openAddWasteEntry() {

    await this.navigateToWasteManagement();

    await this.actions.click(this.addWasteEntryBtn);

    await this.actions.waitForVisible(this.receivingLog);

}

async selectBin(binLocator) {

    Logger.info('Selecting Waste Bin');

    await this.actions.click(this.bin);

    await this.actions.click(binLocator);

}

async selectCountingMethod(methodLocator) {

    Logger.info('Selecting Counting Method');

    await this.actions.click(this.method);

    await this.actions.click(methodLocator);

}

async approveRecord() {

    await this.actions.click(this.approveText);

    await this.actions.click(this.approveOption);

    await this.actions.fill(
        this.password,
        waste.password
    );

    await this.actions.click(this.confirmBtn);

    await this.actions.click(this.signCommit);

}

async closeSuccessToast() {

    if (await this.successToast.isVisible().catch(() => false)) {

        await this.actions.click(this.closeToast).catch(() => {});

    }

}

async openTransferDialog() {

    Logger.info('Opening Transfer Dialog');

    await this.navigateToWasteManagement();

    await this.actions.waitForVisible(this.moveBtn);

    await this.actions.click(this.moveBtn);

    await this.waitForAppReady();

}

async createWasteEntry(
    binLocator,
    methodLocator,
    activity = waste.activity
) {

    Logger.info('Creating Waste Entry');

    await this.openAddWasteEntry();

    await this.actions.click(this.receivingLog);

    await this.actions.click(this.receivingLogOption);

    await this.selectBin(binLocator);

    await this.actions.fill(
        this.entryDate,
        waste.entryDate
    );

    await this.actions.fill(
        this.activity,
        activity
    );

    await this.actions.click(this.instrument);

    await this.actions.click(this.instrumentOption);

    await this.selectCountingMethod(methodLocator);

    await this.actions.click(this.location);

    await this.actions.click(this.locationOption);

    await this.actions.fill(
        this.scTextbox,
        waste.sc
    );

    await this.actions.fill(
        this.observation,
        waste.observation
    );

    await this.actions.click(this.continueBtn);

    await this.approveRecord();

    await this.actions.waitForVisible(this.successToast);

    await this.closeSuccessToast();

    Logger.info('Waste Entry Created');

}

async fillWasteEntry() {

    await this.createWasteEntry(
        this.highBin001,
        this.doseCalibratorMethod,
        '87'
    );

}
// ======================================
// WASTE ENTRY WRAPPER METHODS
// ======================================

async createWasteHighBin001() {

    await this.createWasteEntry(
        this.highBin001,
        this.doseCalibratorMethod,
        '87'
    );

}

async createWasteHighBin002() {

    await this.createWasteEntry(
        this.highBin002,
        this.doseCalibratorMethod,
        '87'
    );

}

async createWasteHighBin003() {

    await this.createWasteEntry(
        this.highBin003,
        this.doseCalibratorMethod,
        '87'
    );

}

async createWasteHighBin004() {

    await this.createWasteEntry(
        this.highBin004,
        this.doseCalibratorMethod,
        '87'
    );

}

async createWasteMediumBin001() {

    await this.createWasteEntry(
        this.mediumBin001,
        this.doseCalibratorMethod,
        '70'
    );

}

async createWasteMediumBin002() {

    await this.createWasteEntry(
        this.mediumBin002,
        this.doseCalibratorMethod,
        '70'
    );

}

async createWasteMediumBin003() {

    await this.createWasteEntry(
        this.mediumBin003,
        this.doseCalibratorMethod,
        '70'
    );

}

async createWasteMediumBin004() {

    await this.createWasteEntry(
        this.mediumBin004,
        this.doseCalibratorMethod,
        '70'
    );

}

async createWasteLowBin001() {

    await this.createWasteEntry(
        this.lowBin001,
        this.doseCalibratorMethod,
        '45'
    );

}

async createWasteLowBin002() {

    await this.createWasteEntry(
        this.lowBin002,
        this.doseCalibratorMethod,
        '45'
    );

}

async createWasteLowBin003() {

    await this.createWasteEntry(
        this.lowBin003,
        this.doseCalibratorMethod,
        '45'
    );

}

async createWasteLowBin004() {

    await this.createWasteEntry(
        this.lowBin004,
        this.doseCalibratorMethod,
        '45'
    );

}

async createWasteHighBin001GMSurvey() {

    await this.createWasteEntry(
        this.highBin001,
        this.gmSurveyMethod,
        '87'
    );

}

async createWasteHighBin001LiquidScintillation() {

    await this.createWasteEntry(
        this.highBin001,
        this.liquidScintillationMethod,
        '87'
    );

}

async createWasteHighBin001NaIDetector() {

    await this.createWasteEntry(
        this.highBin001,
        this.naiDetectorMethod,
        '87'
    );

}

async createWasteMediumBin001GMSurvey() {

    await this.createWasteEntry(
        this.mediumBin001,
        this.gmSurveyMethod,
        '70'
    );

}

async createWasteActivityDecimal() {

    await this.createWasteEntry(
        this.highBin001,
        this.doseCalibratorMethod,
        '87.45'
    );

}

async createWasteActivityInteger() {

    await this.createWasteEntry(
        this.highBin001,
        this.doseCalibratorMethod,
        '100'
    );

}

async createWasteMinimumActivity() {

    await this.createWasteEntry(
        this.highBin001,
        this.doseCalibratorMethod,
        '1'
    );

}

async createWasteMaximumActivity() {

    await this.createWasteEntry(
        this.highBin001,
        this.doseCalibratorMethod,
        '99999'
    );

}
// ==========================================
// VALIDATION METHODS
// ==========================================

async clickContinueOnly() {

    await this.actions.click(this.continueBtn);

}

async cancelWasteEntry() {

    await this.openAddWasteEntry();

    await this.actions.click(this.cancelBtn);

}

async closeWasteEntry() {

    await this.openAddWasteEntry();

    await this.actions.click(this.closeBtn);

}

async verifyReceivingLogValidation() {

    await this.openAddWasteEntry();

    await this.clickContinueOnly();

    await this.actions.waitForVisible(
        this.receivingLogValidation
    );

    await this.actions.click(this.cancelBtn);

}

async verifyBinValidation() {

    await this.openAddWasteEntry();

    await this.actions.click(this.receivingLog);

    await this.actions.click(this.receivingLogOption);

    await this.clickContinueOnly();

    await this.actions.waitForVisible(
        this.binValidation
    );

    await this.actions.click(this.cancelBtn);

}

async verifyMethodValidation() {

    await this.openAddWasteEntry();

    await this.actions.click(this.receivingLog);

    await this.actions.click(this.receivingLogOption);

    await this.selectBin(this.highBin001);

    await this.actions.fill(this.activity, '87');

    await this.actions.click(this.instrument);

    await this.actions.click(this.instrumentOption);

    await this.clickContinueOnly();

    await this.actions.waitForVisible(
        this.methodValidation
    );

    await this.actions.click(this.cancelBtn);

}

async verifySurveyReadingValidation() {

    await this.openAddWasteEntry();

    await this.actions.click(this.receivingLog);

    await this.actions.click(this.receivingLogOption);

    await this.selectBin(this.highBin001);

    await this.actions.fill(this.activity, '87');

    await this.actions.click(this.instrument);

    await this.actions.click(this.instrumentOption);

    await this.selectCountingMethod(
        this.doseCalibratorMethod
    );

    await this.actions.click(this.location);

    await this.actions.click(this.locationOption);

    await this.clickContinueOnly();

    await this.actions.waitForVisible(
        this.scValidation
    );

    await this.actions.click(this.cancelBtn);

}

async verifyDefaultEntryDate() {

    await this.openAddWasteEntry();

    await this.actions.waitForVisible(this.entryDate);

    await this.actions.click(this.cancelBtn);

}

async verifyDefaultObservationTextbox() {

    await this.openAddWasteEntry();

    await this.actions.waitForVisible(this.observation);

    await this.actions.click(this.cancelBtn);

}

async verifyContinueButtonVisible() {

    await this.openAddWasteEntry();

    await this.actions.waitForVisible(this.continueBtn);

    await this.actions.click(this.cancelBtn);

}

// ==========================================
// TRANSFER METHODS
// ==========================================

async moveWasteToLowLevel() {

    Logger.info('Move Waste To Low Bin');

    await this.openTransferDialog();

    await this.selectBin(this.lowBin001);

    if (await this.transferDate.count()) {

        await this.transferDate.fill(
            waste.transferDate
        ).catch(() => {});

    }

    await this.actions.fill(
        this.scTextbox,
        waste.transferSC
    );

    await this.actions.click(this.reason);

    await this.actions.click(this.otherReason);

    await this.actions.fill(
        this.transferObservation,
        waste.transferObservation
    );

    await this.actions.click(this.continueBtn);

    await this.approveRecord();

    await this.actions.waitForVisible(
        this.transferToast
    );

    await this.actions.click(this.closeToast);

}

async moveWasteToMediumLevel() {

    await this.openTransferDialog();

    await this.selectBin(this.mediumBin001);

    await this.actions.click(this.cancelBtn);

}

async verifyTransferSCMandatory() {

    await this.openTransferDialog();

    await this.actions.click(this.continueBtn);

    await this.actions.click(this.cancelBtn);

}

async verifyTransferReasonMandatory() {

    await this.openTransferDialog();

    await this.actions.fill(
        this.scTextbox,
        waste.transferSC
    );

    await this.actions.click(this.continueBtn);

    await this.actions.click(this.cancelBtn);

}

async verifyTransferObservationOptional() {

    await this.openTransferDialog();

    await this.actions.fill(
        this.scTextbox,
        waste.transferSC
    );

    await this.actions.click(this.cancelBtn);

}

async verifyTransferContinueButton() {

    await this.openTransferDialog();

    await this.actions.waitForVisible(
        this.continueBtn
    );

    await this.actions.click(this.cancelBtn);

}

async verifyCancelTransfer() {

    await this.openTransferDialog();

    await this.actions.click(this.cancelBtn);

}

async verifyCloseTransfer() {

    await this.openTransferDialog();

    await this.page.keyboard.press('Escape');

}

async transferWasteSuccessfully() {

    await this.moveWasteToLowLevel();

}

async verifyTransferredWaste() {

    await this.actions.waitForVisible(this.moveBtn);

}

async verifyUpdatedBin() {

    Logger.info('Verify Updated Bin');

}

async verifyWasteStatus() {

    Logger.info('Verify Waste Status');

}

async verifyTransferHistory() {

    Logger.info('Verify Transfer History');

}

async verifyMultipleTransfers() {

    Logger.info('Verify Multiple Transfers');

}

async verifyMoveButton() {

    await this.actions.waitForVisible(
        this.moveBtn
    );

}

async verifyMoveDialog() {

    await this.openTransferDialog();

    await this.actions.click(this.cancelBtn);

}

async openApprovalPopup() {

    await this.openTransferDialog();

    await this.selectBin(this.lowBin001);

    await this.actions.fill(
        this.scTextbox,
        waste.transferSC
    );

    await this.actions.click(this.reason);

    await this.actions.click(this.otherReason);

    await this.actions.fill(
        this.transferObservation,
        waste.transferObservation
    );

    await this.actions.click(this.continueBtn);

    await this.actions.waitForVisible(
        this.approveText
    );
await this.actions.click(this.cancelBtn);
await this.actions.click(this.cancelBtn);

}

async verifyTransferApprovalPopup() {

    await this.openApprovalPopup();

}
// =======================================================
// GM SURVEY
// =======================================================

async createWasteHighBin002GMSurvey() {

    await this.createWasteEntry(
        this.highBin002,
        this.gmSurveyMethod,
        '87'
    );

}

async createWasteHighBin003GMSurvey() {

    await this.createWasteEntry(
        this.highBin003,
        this.gmSurveyMethod,
        '87'
    );

}

async createWasteHighBin004GMSurvey() {

    await this.createWasteEntry(
        this.highBin004,
        this.gmSurveyMethod,
        '87'
    );

}

async createWasteMediumBin002GMSurvey() {

    await this.createWasteEntry(
        this.mediumBin002,
        this.gmSurveyMethod,
        '70'
    );

}

async createWasteMediumBin003GMSurvey() {

    await this.createWasteEntry(
        this.mediumBin003,
        this.gmSurveyMethod,
        '70'
    );

}

async createWasteMediumBin004GMSurvey() {

    await this.createWasteEntry(
        this.mediumBin004,
        this.gmSurveyMethod,
        '70'
    );

}

async createWasteLowBin001GMSurvey() {

    await this.createWasteEntry(
        this.lowBin001,
        this.gmSurveyMethod,
        '45'
    );

}

async createWasteLowBin002GMSurvey() {

    await this.createWasteEntry(
        this.lowBin002,
        this.gmSurveyMethod,
        '45'
    );

}

async createWasteLowBin003GMSurvey() {

    await this.createWasteEntry(
        this.lowBin003,
        this.gmSurveyMethod,
        '45'
    );

}

async createWasteLowBin004GMSurvey() {

    await this.createWasteEntry(
        this.lowBin004,
        this.gmSurveyMethod,
        '45'
    );

}

// =======================================================
// LIQUID SCINTILLATION
// =======================================================

async createWasteHighBin002LiquidScintillation() {

    await this.createWasteEntry(
        this.highBin002,
        this.liquidScintillationMethod,
        '87'
    );

}

async createWasteHighBin003LiquidScintillation() {

    await this.createWasteEntry(
        this.highBin003,
        this.liquidScintillationMethod,
        '87'
    );

}

async createWasteHighBin004LiquidScintillation() {

    await this.createWasteEntry(
        this.highBin004,
        this.liquidScintillationMethod,
        '87'
    );

}

async createWasteMediumBin001LiquidScintillation() {

    await this.createWasteEntry(
        this.mediumBin001,
        this.liquidScintillationMethod,
        '70'
    );

}

async createWasteMediumBin002LiquidScintillation() {

    await this.createWasteEntry(
        this.mediumBin002,
        this.liquidScintillationMethod,
        '70'
    );

}

async createWasteMediumBin003LiquidScintillation() {

    await this.createWasteEntry(
        this.mediumBin003,
        this.liquidScintillationMethod,
        '70'
    );

}

async createWasteMediumBin004LiquidScintillation() {

    await this.createWasteEntry(
        this.mediumBin004,
        this.liquidScintillationMethod,
        '70'
    );

}

async createWasteLowBin001LiquidScintillation() {

    await this.createWasteEntry(
        this.lowBin001,
        this.liquidScintillationMethod,
        '45'
    );

}

async createWasteLowBin002LiquidScintillation() {

    await this.createWasteEntry(
        this.lowBin002,
        this.liquidScintillationMethod,
        '45'
    );

}

async createWasteLowBin003LiquidScintillation() {

    await this.createWasteEntry(
        this.lowBin003,
        this.liquidScintillationMethod,
        '45'
    );

}

async createWasteLowBin004LiquidScintillation() {

    await this.createWasteEntry(
        this.lowBin004,
        this.liquidScintillationMethod,
        '45'
    );

}

// =======================================================
// NaI DETECTOR
// =======================================================

async createWasteHighBin002NaIDetector() {

    await this.createWasteEntry(
        this.highBin002,
        this.naiDetectorMethod,
        '87'
    );

}

async createWasteHighBin003NaIDetector() {

    await this.createWasteEntry(
        this.highBin003,
        this.naiDetectorMethod,
        '87'
    );

}

async createWasteHighBin004NaIDetector() {

    await this.createWasteEntry(
        this.highBin004,
        this.naiDetectorMethod,
        '87'
    );

}

async createWasteMediumBin001NaIDetector() {

    await this.createWasteEntry(
        this.mediumBin001,
        this.naiDetectorMethod,
        '70'
    );

}

async createWasteMediumBin002NaIDetector() {

    await this.createWasteEntry(
        this.mediumBin002,
        this.naiDetectorMethod,
        '70'
    );

}

async createWasteMediumBin003NaIDetector() {

    await this.createWasteEntry(
        this.mediumBin003,
        this.naiDetectorMethod,
        '70'
    );

}

async createWasteMediumBin004NaIDetector() {

    await this.createWasteEntry(
        this.mediumBin004,
        this.naiDetectorMethod,
        '70'
    );

}

async createWasteLowBin001NaIDetector() {

    await this.createWasteEntry(
        this.lowBin001,
        this.naiDetectorMethod,
        '45'
    );

}

async createWasteLowBin002NaIDetector() {

    await this.createWasteEntry(
        this.lowBin002,
        this.naiDetectorMethod,
        '45'
    );

}

async createWasteLowBin003NaIDetector() {

    await this.createWasteEntry(
        this.lowBin003,
        this.naiDetectorMethod,
        '45'
    );

}

async createWasteLowBin004NaIDetector() {

    await this.createWasteEntry(
        this.lowBin004,
        this.naiDetectorMethod,
        '45'
    );

}
}
module.exports = { WasteManagementPage };