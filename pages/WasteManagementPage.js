class WasteManagementPage {

    constructor(page) {
        this.page = page;
        this.wasteManagementLink = page.locator('aside').getByText('Waste Management', { exact: true });
        this.addWasteEntryButton = page.getByRole('button', { name: 'Add Waste Entry' }).first();
        this.moveButton = page.getByRole('button', { name: 'Move' }).first();
        this.continueToESignButton = page.getByRole('button', { name: 'Continue to E-Signature' });
        this.approveRecordOption = page.getByText('I approve this record');
        this.passwordField = page.getByRole('textbox', { name: 'Enter your account password' });
        this.signAndCommitButton = page.getByRole('button', { name: 'Sign & Commit' });
        this.closeSnackbarButton = page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit');
    }

    async openWasteManagement() {
        await this.wasteManagementLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async createWasteEntry(options = {}) {
        const {
            entryDate = '2026-06-25',
            quantity = '87',
            instrument = 'sn123',
            method = 'Dose Calibrator',
            location = 'Cold Room',
            serialCode = 'SC',
            observations = 'No Observation for now',
            password = 'Futran#3'
        } = options;

        await this.openWasteManagement();
        await this.addWasteEntryButton.click();
        await this.page.getByText('Select receiving log entry...', { exact: true }).first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Select receiving log entry...', { exact: true }).first().click();
        await this.page.getByText('-06-22').first().click();

        await this.page.getByText('Select bin...', { exact: true }).first().click();
        await this.page.getByRole('option', { name: 'Bin-001-High' }).click();

        await this.page.locator('input[name="entryDate"]').fill(entryDate);
        await this.page.getByPlaceholder('e.g. 85').click();
        await this.page.getByPlaceholder('e.g. 85').fill(quantity);

        await this.page.getByText('Select instrument...', { exact: true }).first().click();
        await this.page.getByRole('option', { name: instrument }).click();

        await this.page.getByRole('combobox', { name: 'Select method...' }).click();
        await this.page.getByRole('option', { name: method }).click();

        await this.page.getByText('Select location...', { exact: true }).first().click();
        await this.page.getByRole('option', { name: location }).click();

        await this.page.getByRole('textbox', { name: 'e.g. SC' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. SC' }).fill(serialCode);

        await this.page.getByRole('textbox', { name: 'Additional observations...' }).click();
        await this.page.getByRole('textbox', { name: 'Additional observations...' }).fill(observations);

        await this.completeESignature(password, 'Waste entry created');
    }

    async moveWasteToLowLevel(options = {}) {
        const {
            targetBin = 'Bin-001-Medium — Medium-Level',
            transferDate = '2026-06-25',
            serialCode = 'SC1',
            reason = 'other',
            observations = 'No Specific observation for now ',
            password = 'Futran#3'
        } = options;

        await this.openWasteManagement();
        await this.moveButton.click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Select bin...').click();
        await this.page.getByText(targetBin).click();

        const transferDateInput = this.page.locator(
            'input[name="transferDate"], input[name="date"], input[placeholder*="date" i], input[aria-label*="date" i]'
        ).first();
        await transferDateInput.waitFor({ state: 'visible', timeout: 10000 });
        await transferDateInput.fill(transferDate);

        await this.page.getByRole('textbox', { name: 'e.g. SC' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. SC' }).fill(serialCode);

        await this.page.getByText('Select reason...').click();
        await this.page.getByRole('option', { name: reason }).click();

        await this.page.getByRole('textbox', { name: 'Transfer observations...' }).click();
        await this.page.getByRole('textbox', { name: 'Transfer observations...' }).fill(observations);

        await this.completeESignature(password, 'Waste entry transferred');
    }

    async completeESignature(password, successMessage) {
        await this.continueToESignButton.click();
        await this.page.waitForLoadState('networkidle');

        await this.approveRecordOption.click();
        await this.page.getByRole('option', { name: 'I approve this record' }).click();

        await this.passwordField.click();
        await this.passwordField.fill(password);

        await this.page.getByRole('button').nth(1).click();
        await this.signAndCommitButton.click();

        await this.page.getByText(successMessage).click();
        await this.closeSnackbarButton.click();
    }
}

module.exports = { WasteManagementPage };