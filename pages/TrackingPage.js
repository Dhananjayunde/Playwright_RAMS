class TrackingPage {

    constructor(page) {
        this.page = page;
    }

    async fillTrackingEntry() {

        await this.page.waitForLoadState('networkidle');

        await this.page.locator('aside').getByText('Tracking', { exact: true }).click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByRole('button', { name: '+ Add Shipment' }).first().click();
        await this.page.waitForLoadState('networkidle');

        await this.page.getByRole('combobox', { name: 'Incoming' }).click();
        await this.page.getByRole('option', { name: 'Outgoing' }).click();

        await this.page.locator('input[name="orderDate"]').fill('2026-06-25');

        await this.page.getByRole('textbox', { name: 'e.g. 1Z999AA10123456784' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. 1Z999AA10123456784' }).fill('IZ123456789');

        await this.page.getByRole('textbox', { name: 'e.g. Tc-99m 2450 MBq' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. Tc-99m 2450 MBq' }).fill('TC-123456789');

        await this.page.getByRole('combobox', { name: 'Select isotope' }).click();
        await this.page.getByRole('option', { name: 'Ag-111 — Silver' }).click();

        await this.page.getByRole('combobox', { name: 'Select unit' }).click();
        await this.page.getByRole('option', { name: 'Ci', exact: true }).click();

        await this.page.getByPlaceholder('e.g. 66.2').click();
        await this.page.getByPlaceholder('e.g. 66.2').fill('65.1');

        await this.page.getByRole('textbox', { name: 'e.g. Cardinal Health' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. Cardinal Health' }).fill('Cardlian Health');

        await this.page.getByRole('textbox', { name: 'e.g. University Hospital' }).click();
        await this.page.getByRole('textbox', { name: 'e.g. University Hospital' }).fill('Pune Hospital');

        await this.page.getByRole('combobox', { name: 'FedEx' }).click();
        await this.page.getByRole('option', { name: 'BioMedical Courier' }).click();

        await this.page.getByRole('textbox', { name: 'https://' }).click();
        await this.page.getByRole('textbox', { name: 'https://' }).fill('http://dev.com');

        await this.page.getByRole('button', { name: 'Save Shipment' }).click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { TrackingPage };