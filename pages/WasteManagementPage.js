class WasteManagementPage {

    constructor(page) {
        this.page = page;
    }

    async waitForAppReady() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
    }

    async navigateToWasteManagement() {
        const menuItem = this.page.getByText('Waste Management', { exact: true }).first();
        await menuItem.waitFor({ state: 'visible', timeout: 20000 });
        await menuItem.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByText('Add Waste Entry', { exact: true }).first().waitFor({ state: 'visible', timeout: 20000 });
    }

    async fillWasteEntry() {
        await this.navigateToWasteManagement();

        await this.page.getByText('Add Waste Entry', { exact: true }).first().click();
        await this.page.getByText(/Select receiving log entry/i).first().waitFor({ state: 'visible', timeout: 10000 });
        await this.waitForAppReady();

        await this.page.getByText(/Select receiving log entry/i).first().click();
        await this.page.getByText(/-06-22/i).first().click();

        await this.page.getByText(/Select bin/i).first().click();
        await this.page.getByRole('option', { name: /Bin-001-High/i }).click();

        await this.page.locator('input[name="entryDate"]').fill('2026-06-25');
        await this.page.getByPlaceholder('e.g. 85').click();
        await this.page.getByPlaceholder('e.g. 85').fill('87');

        await this.page.getByText(/Select instrument/i).first().click();
        await this.page.getByRole('option', { name: /sn123/i }).click();

        await this.page.getByRole('combobox', { name: /Select method/i }).click();
        await this.page.getByRole('option', { name: /Dose Calibrator/i }).click();

        await this.page.getByText(/Select location/i).first().click();
        await this.page.getByRole('option', { name: /Cold Room/i }).click();

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
        await this.page.getByRole('button', { name: /Sign & Commit/i }).click();

        await this.page.getByText(/Waste entry created/i).first().waitFor({ state: 'visible', timeout: 20000 });
        await this.page.getByText(/Waste entry created/i).first().click();
        await this.page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit').first().click();
    }

    async moveWasteToLowLevel() {
        
        await this.page.getByRole('button', { name: 'Move' }).first().click();
        await this.waitForAppReady();

        await this.page.getByText(/Select bin/i).click();
        await this.page.getByRole('option').filter({ hasText: /Low-Level|Low/i }).first().click();

        const dateInput = this.page.getByLabel(/Date|Transfer Date|Entry Date/i).first();
        await dateInput.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        if (await dateInput.count()) {
            await dateInput.fill('2026-06-25').catch(() => {});
        }

        await this.page.getByRole('textbox', { name: 'e.g. SC' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. SC' }).fill('SC1');

        await this.page.getByText(/Select reason/i).click();
        await this.page.getByRole('option', { name: /other/i }).click();

        await this.page.getByRole('textbox', { name: 'Transfer observations...' }).click();
        await this.page.getByRole('textbox', { name: 'Transfer observations...' }).fill('No Specific observation for now ');

        await this.page.getByRole('button', { name: 'Continue to E-Signature' }).click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('I approve this record').click();
        await this.page.getByRole('option', { name: 'I approve this record' }).click();

        await this.page.getByRole('textbox', { name: 'Enter your account password' }).click();
        await this.page.getByRole('textbox', { name: 'Enter your account password' }).fill('Futran#3');

        await this.page.getByRole('button').nth(1).click();
        await this.page.getByRole('button', { name: /Sign & Commit/i }).click();

        await this.page.getByText(/Waste entry transferred/i).first().waitFor({ state: 'visible', timeout: 20000 });
        await this.page.getByText(/Waste entry transferred/i).first().click();
        await this.page.locator('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit').first().click();
    }
}

module.exports = { WasteManagementPage };