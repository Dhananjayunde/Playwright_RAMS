const BasePage = require('../pages/BasePage');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');
const Logger = require('../utils/Logger');

const tracking = TestDataManager.getData('trackingData.json');

class TrackingPage extends BasePage {

    constructor(page) {

        super(page);

        // Navigation
        this.trackingMenu = page
            .locator('aside')
            .getByText(CONSTANTS.MENU.TRACKING, { exact: true });

        // Buttons
        this.addShipmentBtn = page
            .getByRole('button', {
                name: CONSTANTS.TRACKING.ADD_SHIPMENT
            })
            .first();      // <-- Fixed Strict Mode

        this.saveShipmentBtn = page.getByRole('button', {
            name: CONSTANTS.TRACKING.SAVE
        });

        // Shipment Type
        this.shipmentType = page.getByRole('combobox', {
            name: CONSTANTS.TRACKING.INCOMING
        });

        this.outgoingOption = page.getByRole('option', {
            name: CONSTANTS.TRACKING.OUTGOING
        });

        // Date
        this.orderDate = page.locator('input[name="orderDate"]');

        // Fields
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
            name: CONSTANTS.TRACKING.ISOTOPE
        });

        this.unit = page.getByRole('combobox', {
            name: 'Select unit'
        });

        this.unitOption = page.getByRole('option', {
            name: CONSTANTS.TRACKING.UNIT,
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
            name: CONSTANTS.TRACKING.COURIER
        });

        this.trackingUrl = page.getByRole('textbox', {
            name: 'https://'
        });
    }

    async fillTrackingEntry() {

        Logger.info('========== Tracking Module Started ==========');

        await this.page.waitForLoadState('networkidle');

        Logger.info('Opening Tracking Module');
        await this.actions.click(this.trackingMenu);

        await this.page.waitForLoadState('networkidle');

        Logger.info('Clicking Add Shipment');
        await this.actions.click(this.addShipmentBtn);

        await this.page.waitForLoadState('networkidle');

        Logger.info('Selecting Shipment Type');
        await this.actions.click(this.shipmentType);
        await this.actions.click(this.outgoingOption);

        Logger.info('Entering Order Date');
        await this.actions.fill(this.orderDate, tracking.orderDate);

        Logger.info('Entering Tracking Number');
        await this.actions.fill(this.trackingNumber, tracking.trackingNumber);

        Logger.info('Entering Description');
        await this.actions.fill(this.description, tracking.description);

        Logger.info('Selecting Isotope');
        await this.actions.click(this.isotope);
        await this.actions.click(this.isotopeOption);

        Logger.info('Selecting Unit');
        await this.actions.click(this.unit);
        await this.actions.click(this.unitOption);

        Logger.info('Entering Activity');
        await this.actions.fill(this.activity, tracking.activity);

        Logger.info('Entering Sender');
        await this.actions.fill(this.sender, tracking.sender);

        Logger.info('Entering Receiver');
        await this.actions.fill(this.receiver, tracking.receiver);

        Logger.info('Selecting Courier');
        await this.actions.click(this.courier);
        await this.actions.click(this.courierOption);

        Logger.info('Entering Tracking URL');
        await this.actions.fill(this.trackingUrl, tracking.trackingUrl);

        Logger.info('Saving Shipment');
        await this.actions.click(this.saveShipmentBtn);

await this.wait.networkIdle();
        Logger.info('========== Tracking Module Completed ==========');
    }
}

module.exports = { TrackingPage };