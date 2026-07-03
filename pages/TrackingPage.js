const BasePage = require('../pages/BasePage');

class TrackingPage extends BasePage {

    constructor(page) {

        super(page);
      
        // Navigation
        this.trackingMenu = page.locator('aside').getByText('Tracking', { exact: true });

        // Buttons
        this.addShipmentBtn = page.getByRole('button', { name: '+ Add Shipment' });
        this.saveShipmentBtn = page.getByRole('button', { name: 'Save Shipment' });

        // Shipment Type
        this.shipmentType = page.getByRole('combobox', { name: 'Incoming' });
        this.outgoingOption = page.getByRole('option', { name: 'Outgoing' });

        // Fields
        this.orderDate = page.locator('input[name="orderDate"]');

        this.trackingNumber = page.getByRole('textbox', {
            name: 'e.g. 1Z999AA10123456784'
        });

        this.description = page.getByRole('textbox', {
            name: 'e.g. Tc-99m 2450 MBq'
        });

        this.isotope = page.getByRole('combobox', {
            name: 'Select isotope'
        });

        this.isotopeOption = page.getByRole('option', {
            name: 'Ag-111 — Silver'
        });

        this.unit = page.getByRole('combobox', {
            name: 'Select unit'
        });

        this.unitOption = page.getByRole('option', {
            name: 'Ci',
            exact: true
        });

        this.activity = page.getByPlaceholder('e.g. 66.2');

        this.sender = page.getByRole('textbox', {
            name: 'e.g. Cardinal Health'
        });

        this.receiver = page.getByRole('textbox', {
            name: 'e.g. University Hospital'
        });

        this.courier = page.getByRole('combobox', {
            name: 'FedEx'
        });

        this.courierOption = page.getByRole('option', {
            name: 'BioMedical Courier'
        });

        this.trackingUrl = page.getByRole('textbox', {
            name: 'https://'
        });
    }

    async fillTrackingEntry() {

        await this.page.waitForLoadState('networkidle');

        await this.actions.click(this.trackingMenu);

        await this.page.waitForLoadState('networkidle');

        await this.actions.click(this.addShipmentBtn);

        await this.page.waitForLoadState('networkidle');

        await this.actions.click(this.shipmentType);
        await this.actions.click(this.outgoingOption);

        await this.actions.fill(this.orderDate, '2026-06-25');

        await this.actions.fill(this.trackingNumber, 'IZ123456789');

        await this.actions.fill(this.description, 'TC-123456789');

        await this.actions.click(this.isotope);
        await this.actions.click(this.isotopeOption);

        await this.actions.click(this.unit);
        await this.actions.click(this.unitOption);

        await this.actions.fill(this.activity, '65.1');

        await this.actions.fill(this.sender, 'Cardlian Health');

        await this.actions.fill(this.receiver, 'Pune Hospital');

        await this.actions.click(this.courier);
        await this.actions.click(this.courierOption);

        await this.actions.fill(this.trackingUrl, 'http://dev.com');

        await this.actions.click(this.saveShipmentBtn);

        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { TrackingPage };