const  BasePage  = require('./BasePage');

class ReceivingLogPage extends BasePage {

    constructor(page) {

        super(page);

        // Left Menu
        this.receivingLogMenu =
            page.locator('aside').getByText('Receiving Log', { exact: true });

        // Buttons
        this.logReceiptBtn =
            page.getByRole('button', { name: /\+ Log Receipt/i });

        this.continueESignBtn =
            page.getByText('Continue to E-Signature', { exact: true });

        this.signCommitBtn =
            page.getByRole('button', { name: 'Sign & Commit' });

        this.cancelBtn =
            page.getByRole('button', { name: 'Cancel' });

        this.closeBtn =
            page.getByLabel('Close');

        // Password
        this.password =
            page.getByPlaceholder('Enter your account password');

        // Dropdowns
        this.isotope =
            page.getByRole('combobox', { name: 'Select isotope' });

        this.manufacturer =
            page.getByRole('combobox', { name: 'Select manufacturer' });

        this.timezone =
            page.getByRole('combobox', { name: 'ET — Eastern Time' });

        this.storageLocation =
            page.getByRole('combobox', {
                name: 'Select storage location'
            });

        // Dates
        this.receiveDate =
            page.locator('input[name="receiveDate"]');

        this.refDate =
            page.locator('input[name="refDate"]');

        this.calibDate =
            page.locator('input[name="calibDate"]');

        // Textboxes
        this.internalLot =
            page.getByRole('textbox', {
                name: 'e.g. INT12345'
            });

        this.externalLot =
            page.getByRole('textbox', {
                name: 'e.g. EXT67890'
            });

        this.quantity =
            page.locator('input[name="qty"]');

        this.concentration =
            page.getByRole('textbox', {
                name: 'e.g. 50 mCi/mL'
            });

        this.referenceActivity =
            page.getByPlaceholder('e.g. 2450 MBq');

        this.surface =
            page.locator('input[name="surface"]');

        this.t1 =
            page.locator('input[name="t1"]');

        this.insideWipe =
            page.locator('input[name="insideWipe"]');

        this.outsideWipe =
            page.locator('input[name="outsideWipe"]');

        this.wipeBG =
            page.locator('input[name="wipeBG"]');

        this.background =
            page.getByPlaceholder('e.g. 0.1');

        this.serialNumber =
            page.getByPlaceholder('Enter serial number');

        this.notes =
            page.getByPlaceholder(
                'Enter package notes, descriptions or exceptions...'
            );
    }

    async fillReceivingEntry() {

        await this.actions.click(this.receivingLogMenu);

       
        await this.actions.click(this.logReceiptBtn);

        await this.actions.wait(2);

        // Isotope
        await this.actions.click(this.isotope);
        await this.actions.click(
            this.page.getByRole('option', {
                name: 'Ag-111 — Silver'
            })
        );

        // Manufacturer
        await this.actions.click(this.manufacturer);
        await this.actions.click(
            this.page.getByRole('option', {
                name: 'Cardinal Health'
            })
        );

        // Timezone
        await this.actions.click(this.timezone);
        await this.actions.click(
            this.page.getByRole('option', {
                name: 'ET — Eastern Time'
            }).first()
        );

        // Dates
        await this.actions.fill(this.receiveDate, '2026-06-24');
        await this.actions.fill(this.refDate, '2026-06-24T15:32');
        await this.actions.fill(this.calibDate, '2026-06-24T15:32');

        // Lot Numbers
        await this.actions.fill(this.internalLot, 'IN12345');
        await this.actions.fill(this.externalLot, 'EXT6789');

        // Quantity
        await this.actions.fill(this.quantity, '0.9');

        // Storage Location
        await this.actions.click(this.storageLocation);
        await this.actions.click(
            this.page.getByRole('option', {
                name: 'Testing'
            })
        );

        // Concentration
        await this.actions.fill(this.concentration, '50');

        // Reference Activity
        await this.actions.fill(this.referenceActivity, '2450');

        // Radiation Survey
        await this.actions.fill(this.surface, '1');
        await this.actions.fill(this.t1, '1');
        await this.actions.fill(this.insideWipe, '1');
        await this.actions.fill(this.outsideWipe, '1');
        await this.actions.fill(this.wipeBG, '1');
        await this.actions.fill(this.background, '1');

        // Serial Number
        await this.actions.fill(this.serialNumber, 'SN12345');

        // Notes
        await this.actions.fill(this.notes, 'Sample notes');
    }

    async continueESign(password) {

        await this.actions.click(this.continueESignBtn);

        await this.actions.wait(2);

        await this.actions.fill(this.password, password);

        await this.actions.click(this.signCommitBtn);

        await this.actions.click(this.closeBtn);

        await this.actions.click(this.cancelBtn);
    }

}

module.exports = {
    ReceivingLogPage
};