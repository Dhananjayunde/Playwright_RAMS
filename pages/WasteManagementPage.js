class WasteManagementPage {

    constructor(page) {
        this.page = page;
    }

    async fillWasteEntry() {

        await this.page.locator('p:has-text("Waste Management")').click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Add Waste Entry').click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Select receiving log entry...').click();
        await this.page.getByText('-06-22').click();

        await this.page.getByText('Select bin...').click();
        await this.page.getByRole('option', { name: 'Bin-001-High' }).click();

        await this.page.locator('input[name="entryDate"]').fill('2026-06-25');
        await this.page.getByPlaceholder('e.g. 85').click();
        await this.page.getByPlaceholder('e.g. 85').fill('87');

        await this.page.getByText('Select instrument...').click();
        await this.page.getByRole('option', { name: 'sn123' }).click();

        await this.page.getByRole('combobox', { name: 'Select method...' }).click();
        await this.page.getByRole('option', { name: 'Dose Calibrator' }).click();

        await this.page.getByText('Select location...').click();
        await this.page.getByRole('option', { name: 'Cold Room' }).click();

        await this.page.getByRole('textbox', { name: 'e.g. SC' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. SC' }).fill('SC');

        await this.page.getByRole('textbox', { name: 'Additional observations...' }).click();
        await this.page.getByRole('textbox', { name: 'Additional observations...' }).fill('No Observation for now');

        await this.page.getByRole('button', { name: 'Continue to E-Signature' }).click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('I approve this record').click();
        await this.page.getByRole('option', { name: 'I approve this record' }).click();

        await this.page.getByRole('textbox', { name: 'Enter your account password' }).click();
        await this.page.getByRole('textbox', { name: 'Enter your account password' }).fill('Futran#3');

        await this.page.getByRole('button').nth(1).click();
        await this.page.getByRole('button', { name: 'Sign & Commit' }).click();

        await this.page.getByText('Waste entry created').click();
        await this.page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit').click();
    }
}

module.exports = { WasteManagementPage };