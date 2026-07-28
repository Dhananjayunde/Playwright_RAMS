const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');

const calendar =
    TestDataManager.getData('calendarData.json');

class CalendarPage extends BasePage {

    constructor(page) {

        super(page);

        this.page = page;


        this.calendarMenu =
            page.locator('aside')
                .getByText('Calendar', { exact: true });

        this.pageTitle =page.locator(':text-is("Site Calendar")');

        this.addEventBtn =
            page.getByRole('button', {
                name: 'Add Event'
            });

        this.dialogTitle =page.locator(':text-is("Add Calendar Event")');
        this.closeBtn =page.locator('button').filter({has: page.locator('svg')}).first();
        this.cancelBtn =page.getByRole('button', {name: 'Cancel'});
        this.submitBtn =page.getByRole('button', {name: 'Add Event'});
        this.date =page.locator('input[type="date"]').first();
        this.eventType =page.getByRole('combobox', {name: /event type/i});
        this.title =page.getByRole('textbox', {name: /Tc-99m weekly delivery/i});
        this.vendor =page.getByPlaceholder('e.g. Cardinal Health');
        this.destination =page.getByPlaceholder('Destination facility');
        this.activity =page.getByPlaceholder('e.g. 2450 MBq');
        this.assignedTo =page.getByRole('combobox', {name: /personnel/i});
        this.description =page.getByPlaceholder('Additional notes or details');
        this.incomingRAM =page.getByText('Incoming RAM', { exact: true });
        this.outgoingTransfer =page.getByText('Outgoing Transfer', { exact: true });
        this.wastePickup =page.locator('li').filter({ hasText: 'Waste Pickup' });


        this.eventTypeRequired =
            page.getByText(
                'Event type is required'
            );

        this.titleRequired =
            page.getByText(
                'Event Title is required'
            );

        this.successToast =
            page.getByText('Calendar event created');

    }

    async openCalendar() {

        Logger.info('Opening Calendar');

        await this.actions.click(this.calendarMenu);

        await expect(this.pageTitle).toBeVisible();

    }

    async verifyCalendarPage() {

        Logger.info('Verify Calendar Page');

        await expect(this.pageTitle).toBeVisible();

        await expect(this.addEventBtn).toBeVisible();

    }

    async verifyAddEventButton() {

        Logger.info('Verify Add Event Button');

        await expect(this.addEventBtn).toBeEnabled();

    }

    async openAddEvent() {

        Logger.info('Open Add Event Dialog');

        await this.actions.click(this.addEventBtn);

        await expect(this.dialogTitle).toBeVisible();

    }

    async closeDialog() {

        Logger.info('Close Dialog');

        await this.actions.click(this.cancelBtn);

        await expect(this.pageTitle).toBeVisible();

    }

    async verifyMandatoryValidation() {

        Logger.info('Mandatory Validation');

        await this.openAddEvent();

        await this.actions.click(this.submitBtn);

        await expect(this.eventTypeRequired).toBeVisible();

        await expect(this.titleRequired).toBeVisible();

        await this.closeDialog();

    }

    async verifyIncomingRAM() {

        Logger.info('Incoming RAM');

        await this.openAddEvent();

        await this.actions.click(this.eventType);

        await expect(this.incomingRAM).toBeVisible();
        
        await this.actions.click(this.incomingRAM);
 
        await this.closeDialog();

    }

    async verifyOutgoingTransfer() {

        Logger.info('Outgoing Transfer');

        await this.openAddEvent();

        await this.actions.click(this.eventType);

        await expect(this.outgoingTransfer).toBeVisible();

        await this.actions.click(this.outgoingTransfer);
 
        await this.closeDialog();

    }

    async verifyWastePickup() {

        Logger.info('Waste Pickup');

        await this.openAddEvent();

        await this.actions.click(this.eventType);

        await expect(this.wastePickup).toBeVisible();

        await this.actions.click(this.wastePickup);
 
        await this.closeDialog();

    }

    async addIncomingEvent() {

        Logger.info('Add Incoming Event');

        await this.openAddEvent();

        await this.actions.fill(
            this.date,
            calendar.date
        );

        await this.actions.click(this.eventType);

        await this.actions.click(this.incomingRAM);

        await this.actions.fill(
            this.title,
            calendar.incomingTitle
        );

        await this.actions.fill(
            this.vendor,
            calendar.vendor
        );

        await this.actions.fill(
            this.activity,
            calendar.activity
        );

        await this.actions.fill(
            this.description,
            calendar.description
        );

        await this.actions.click(this.submitBtn);

    }

    async verifySuccessMessage() {

        Logger.info('Verify Success Message');

        await expect(this.successToast).toBeVisible();

    }

    async closeToast() {

        Logger.info('Close Success Message');

        await this.page.keyboard.press('Escape');

    }

}

module.exports = {
    CalendarPage
};