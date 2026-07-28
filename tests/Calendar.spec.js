const { test } = require('@playwright/test');
const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { CalendarPage } = require('../pages/CalendarPage');
const Hooks = require('../hooks/Hooks');

const testData = ExcelUtils.getData('./testData/LoginData.xlsx','Sheet2');
const data = testData[0];

test.describe.serial('Calendar Module - Add Event', () => {

    test.setTimeout(180000);

    let page;
    let calendar;

    test.beforeAll(async ({ browser }) => {

        page = await browser.newPage();

        const login = new LoginPage(page);

        calendar = new CalendarPage(page);

        await login.goTO();

        await login.login(
            data.Email,
            data.Password
        );

        await login.enterOTP();

        await calendar.openCalendar();

    });

    test.beforeEach(async ({}, testInfo) => {

        await Hooks.beforeTest(page,testInfo);

    });

    test.afterEach(async ({}, testInfo) => {

        await Hooks.afterTest(page,testInfo);

    });

    test('TC001 - Verify Calendar Page', async () => {

        await calendar.verifyCalendarPage();

    });

    test('TC002 - Verify Add Event Button', async () => {

        await calendar.verifyAddEventButton();

    });

    test('TC003 - Open Add Event Dialog', async () => {

        await calendar.openAddEvent();

    });

    test('TC004 - Verify Mandatory Validation', async () => {

        await calendar.verifyMandatoryValidation();

    });

    test('TC005 - Verify Incoming RAM Event Type', async () => {

        await calendar.verifyIncomingRAM();

    });

    test('TC006 - Verify Outgoing Transfer Event Type', async () => {

        await calendar.verifyOutgoingTransfer();

    });

    test('TC007 - Verify Waste Pickup Event Type', async () => {

        await calendar.verifyWastePickup();

    });

    test('TC008 - Add Incoming RAM Event', async () => {

        await calendar.addIncomingEvent();

    });

    test('TC009 - Verify Success Message', async () => {

        await calendar.verifySuccessMessage();

    });

    test('TC010 - Close Success Message', async () => {

        await calendar.closeToast();

    });

    test.afterAll(async () => {

        await page.close();

    });

});