class WasteManagementPage {

    constructor(page) {
        this.page = page;
    }

    async fillWasteEntry() {

        await this.page.locator('aside').getByText('Waste Management', { exact: true }).click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByRole('button', { name: 'Add Waste Entry' }).first().click();
        await this.page.getByText('Select receiving log entry...', { exact: true }).first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Select receiving log entry...', { exact: true }).first().click();
        await this.page.getByText('-06-22').first().click();

        await this.page.getByText('Select bin...', { exact: true }).first().click();
        await this.page.getByRole('option', { name: 'Bin-001-High' }).click();

        await this.page.locator('input[name="entryDate"]').fill('2026-06-25');
        await this.page.getByPlaceholder('e.g. 85').click();
        await this.page.getByPlaceholder('e.g. 85').fill('87');

        await this.page.getByText('Select instrument...', { exact: true }).first().click();
        await this.page.getByRole('option', { name: 'sn123' }).click();

        await this.page.getByRole('combobox', { name: 'Select method...' }).click();
        await this.page.getByRole('option', { name: 'Dose Calibrator' }).click();

        await this.page.getByText('Select location...', { exact: true }).first().click();
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

    async moveWasteToLowLevel() {
        
        await this.page.getByRole('button', { name: 'Move' }).first().click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Select bin...').click();
        await this.page.getByText('Bin-001-Medium — Medium-Level').click();

        await this.page.locator('[id="_r_20_"]').fill('2026-06-25');

        await this.page.getByRole('textbox', { name: 'e.g. SC' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. SC' }).fill('SC1');

        await this.page.getByText('Select reason...').click();
        await this.page.getByRole('option', { name: 'other' }).click();

        await this.page.getByRole('textbox', { name: 'Transfer observations...' }).click();
        await this.page.getByRole('textbox', { name: 'Transfer observations...' }).fill('No Specific observation for now ');

        await this.page.getByRole('button', { name: 'Continue to E-Signature' }).click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('I approve this record').click();
        await this.page.getByRole('option', { name: 'I approve this record' }).click();

        await this.page.getByRole('textbox', { name: 'Enter your account password' }).click();
        await this.page.getByRole('textbox', { name: 'Enter your account password' }).fill('Futran#3');

        await this.page.getByRole('button').nth(1).click();
        await this.page.getByRole('button', { name: 'Sign & Commit' }).click();

        await this.page.getByText('Waste entry transferred').click();
        await this.page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit').click();
    }
}

module.exports = { WasteManagementPage };