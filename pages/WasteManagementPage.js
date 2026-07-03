const BasePage = require('./BasePage');
class WasteManagementPage extends BasePage {

    constructor(page) {

        super(page);
        this.wasteManagementMenu =
            page.getByText('Waste Management', { exact: true }).first();

        this.addWasteEntryBtn =
            page.getByText('Add Waste Entry', { exact: true }).first();

        this.receivingLog =
            page.getByText(/Select receiving log entry/i).first();

        this.receivingLogOption =
            page.getByText(/-06-22/i).first();

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
                name: 'Continue to E-Signature'
            });

        this.approveText =
            page.getByText('I approve this record');

        this.approveOption =
            page.getByRole('option', {
                name: 'I approve this record'
            });

        this.password =
            page.getByRole('textbox', {
                name: 'Enter your account password'
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
            page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit').first();

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

        await this.wasteManagementMenu.waitFor({
            state: 'visible',
            timeout: 20000
        });

        await this.actions.click(this.wasteManagementMenu);

        await this.page.waitForTimeout(2000);

        await this.addWasteEntryBtn.waitFor({
            state: 'visible',
            timeout: 20000
        });

    }

    async fillWasteEntry() {

        await this.navigateToWasteManagement();

        await this.actions.click(this.addWasteEntryBtn);

        await this.receivingLog.waitFor({
            state: 'visible',
            timeout: 10000
        });

        await this.waitForAppReady();

        await this.actions.click(this.receivingLog);

        await this.actions.click(this.receivingLogOption);

        await this.actions.click(this.bin);

        await this.actions.click(this.highLevelBin);

        await this.actions.fill(this.entryDate, '2026-06-25');

        await this.actions.fill(this.activity, '87');

        await this.actions.click(this.instrument);

        await this.actions.click(this.instrumentOption);

        await this.actions.click(this.method);

        await this.actions.click(this.methodOption);

        await this.actions.click(this.location);

        await this.actions.click(this.locationOption);

        await this.actions.fill(this.scTextbox, 'SC');

        await this.actions.fill(
            this.observation,
            'No Observation for now'
        );

        await this.actions.click(this.continueBtn);

        await this.page.waitForLoadState('networkidle');

        await this.actions.click(this.approveText);

        await this.actions.click(this.approveOption);

        await this.actions.fill(
            this.password,
            'Futran#3'
        );

        await this.actions.click(this.confirmBtn);

        await this.actions.click(this.signCommit);

        await this.successToast.waitFor({
            state: 'visible',
            timeout: 20000
        });

        await this.actions.click(this.successToast);

        await this.actions.click(this.closeToast);

    }

    async moveWasteToLowLevel() {

        await this.actions.click(this.moveBtn);
        await this.waitForAppReady();
        await this.actions.click(this.bin);
        await this.actions.click(this.lowLevelBin);

        if (await this.transferDate.count()) {

            await this.transferDate.fill('2026-06-25')
                .catch(() => {});

        }
        await this.actions.fill(
            this.scTextbox,
            'SC1'
        );

        await this.actions.click(this.reason);

        await this.actions.click(this.otherReason);

        await this.actions.fill(
            this.transferObservation,
            'No Specific observation for now'
        );

        await this.actions.click(this.continueBtn);

        await this.page.waitForLoadState('networkidle');

        await this.actions.click(this.approveText);

        await this.actions.click(this.approveOption);

        await this.actions.fill(
            this.password,
            'Futran#3'
        );
        await this.actions.click(this.confirmBtn);

        await this.actions.click(this.signCommit);

        await this.transferToast.waitFor({
            state: 'visible',
            timeout: 20000
        });

        await this.actions.click(this.transferToast);

        await this.actions.click(this.closeToast);

    }

}

module.exports = { WasteManagementPage };