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

        this.highLevelBin =
            page.getByRole('option', {
                name: /Bin-001-High/i
            });

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

        this.methodOption =
            page.getByRole('option', {
                name: /Dose Calibrator/i
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

        this.lowLevelBin =
            page.getByRole('option')
                .filter({
                    hasText: /Low-Level|Low/i
                }).first();

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
    }

    async waitForAppReady() {

        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);

    }

    async navigateToWasteManagement() {

        Logger.info('Navigating to Waste Management');

        await this.actions.waitForVisible(this.wasteManagementMenu);

        await this.actions.click(this.wasteManagementMenu);

        await this.actions.wait(2);

        await this.actions.waitForVisible(this.addWasteEntryBtn);

    }

    async fillWasteEntry() {

        Logger.info('========== Waste Management Started ==========');

        await this.navigateToWasteManagement();

        Logger.info('Opening Add Waste Entry');

        await this.actions.click(this.addWasteEntryBtn);

        await this.actions.waitForVisible(this.receivingLog);

        await this.waitForAppReady();

        await this.actions.click(this.receivingLog);

        await this.actions.click(this.receivingLogOption);

        await this.actions.click(this.bin);

        await this.actions.click(this.highLevelBin);

        await this.actions.fill(
            this.entryDate,
            waste.entryDate
        );

        await this.actions.fill(
            this.activity,
            waste.activity
        );

        await this.actions.click(this.instrument);

        await this.actions.click(this.instrumentOption);

        await this.actions.click(this.method);

        await this.actions.click(this.methodOption);

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

        Logger.info('Submitting Waste Entry');

        await this.actions.click(this.continueBtn);

await this.wait.networkIdle();
        await this.actions.click(this.approveText);

        await this.actions.click(this.approveOption);

        await this.actions.fill(
            this.password,
            waste.password
        );

        await this.actions.click(this.confirmBtn);

        await this.actions.click(this.signCommit);

        await this.actions.waitForVisible(this.successToast);

        await this.actions.click(this.successToast);

        await this.actions.click(this.closeToast);

        Logger.info('Waste Entry Created Successfully');
        Logger.info('========== Waste Management Completed ==========');

    }

    async moveWasteToLowLevel() {

        Logger.info('Moving Waste to Low Level');

        await this.actions.click(this.moveBtn);

        await this.waitForAppReady();

        await this.actions.click(this.bin);

        await this.actions.click(this.lowLevelBin);

        if (await this.transferDate.count()) {

            await this.transferDate
                .fill(waste.transferDate)
                .catch(() => {});

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

        Logger.info('Submitting Waste Transfer');

        await this.actions.click(this.continueBtn);

        await this.wait.networkIdle();
        await this.actions.click(this.approveText);

        await this.actions.click(this.approveOption);

        await this.actions.fill(
            this.password,
            waste.password
        );

        await this.actions.click(this.confirmBtn);

        await this.actions.click(this.signCommit);

        await this.actions.waitForVisible(this.transferToast);

        await this.actions.click(this.transferToast);

        await this.actions.click(this.closeToast);

        Logger.info('Waste Transfer Completed Successfully');

    }

}

module.exports = { WasteManagementPage };