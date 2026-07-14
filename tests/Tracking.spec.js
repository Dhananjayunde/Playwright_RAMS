const { test, expect } = require('@playwright/test');
const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { TrackingPage } =require('../pages/TrackingPage');
const Hooks = require('../hooks/Hooks');
const testData = ExcelUtils.getData('./testData/LoginData.xlsx','Sheet2');
const data = testData[0];

test.describe.serial('Tracking Module', () => {

    test.setTimeout(180000);

    let page;
    let tracking;

    test.beforeAll(async ({ browser }) => {

        page = await browser.newPage();

        const login = new LoginPage(page);

        tracking = new TrackingPage(page);

        await page.goto('/login');

        await login.login(
            data.Email,
            data.Password
        );

        await login.enterOTP();

    });

    test.beforeEach(async ({}, testInfo) => {

        await Hooks.beforeTest(page, testInfo);

        await tracking.openTrackingModule();

    });

    test.afterEach(async ({}, testInfo) => {

        await Hooks.afterTest(page, testInfo);

    });

    test('TC001 - Verify Tracking Page Loaded', async () => {

        await tracking.verifyTrackingPageLoaded();

    });

    test('TC002 - Verify Add Shipment Button Visible', async () => {

        await tracking.verifyAddShipmentButton();

    });

    test('TC003 - Verify Shipment Table Visible', async () => {

        await tracking.verifyShipmentTable();

    });

    test('TC004 - Verify Shipment Records Exist', async () => {

        await tracking.verifyShipmentRecords();

    });

    test('TC005 - Verify Dashboard Counts', async () => {

        await tracking.verifyDashboardCounts();

    });

    test('TC006 - Add Outgoing Shipment', async () => {

        await tracking.fillTrackingEntry();

        await tracking.verifyShipmentTable();

    });

    test('TC007 - Add Incoming Shipment', async () => {

        await tracking.addIncomingShipment();

        await tracking.verifyShipmentTable();

    });

    test('TC008 - Verify Default Shipment Type', async () => {

        await tracking.verifyDefaultShipmentType();

    });

    test('TC009 - Verify Default Order Date', async () => {

        await tracking.verifyDefaultOrderDate();

    });

    test('TC010 - Verify Cancel Button', async () => {

        await tracking.verifyCancelButton();

    });

    test('TC011 - Verify Close Button', async () => {

        await tracking.verifyCloseButton();

    });

    test('TC012 - Search By Tracking Number', async () => {

        await tracking.searchShipment('1Z98909999999');

    });

    test('TC013 - Search By Material', async () => {

        await tracking.searchShipment('Tc-9545');

    });

    test('TC014 - Search By Isotope', async () => {

        await tracking.searchShipment('Ag-111');

    });

    test('TC015 - Search By Courier', async () => {

        await tracking.searchShipment('UPS');

    });

    test('TC016 - Search By Sender', async () => {

        await tracking.searchShipment('Cardinal');

    });

    test('TC017 - Search Invalid Shipment', async () => {

        await tracking.searchShipment('INVALID123');

        await tracking.verifyNoRecordsFound();

        await tracking.clearSearch();

    });

    test('TC018 - Clear Search', async () => {

        await tracking.clearSearch();

        await expect(tracking.searchTextbox).toHaveValue('');

    });

    test('TC019 - Open Incoming Tab', async () => {

        await tracking.openIncomingTab();

        await tracking.verifyShipmentTable();

    });

    test('TC020 - Open Outgoing Tab', async () => {

        await tracking.openOutgoingTab();

        await tracking.verifyShipmentTable();

    });

    test('TC021 - Switch Between Tabs', async () => {

        await tracking.openIncomingTab();

        await tracking.openOutgoingTab();

        await tracking.verifyShipmentTable();

    });

    test('TC022 - Verify Incoming Card', async () => {

        await tracking.verifyIncomingCard();

    });

    test('TC023 - Verify Outgoing Card', async () => {

        await tracking.verifyOutgoingCard();

    });

    test('TC024 - Verify In Transit Card', async () => {

        await tracking.verifyInTransitCard();

    });

    test('TC025 - Verify Delivered Card', async () => {

        await tracking.verifyDeliveredCard();

    });

    test('TC026 - Verify Tracking Table', async () => {

        await tracking.verifyTrackingTable();

    });

    test('TC027 - Verify Table Headers', async () => {

        await tracking.verifyTableHeaders();

    });

    test('TC028 - Verify Status Dropdown', async () => {

        await tracking.verifyStatusDropdown();

    });

    test('TC029 - Verify Delivered Status Disabled', async () => {

        await tracking.verifyDeliveredStatusDisabled();

    });

    test('TC030 - Verify Track Package Link', async () => {

        await tracking.verifyTrackPackageLink();

    });

    test('TC031 - Verify Tracking URL', async () => {

        await tracking.verifyValidTrackingURL();

    });

    test('TC032 - Verify Next Page', async () => {

        await tracking.openIncomingTab();

        await tracking.clickNextPage();

    });

    test('TC033 - Verify Previous Page', async () => {

        await tracking.clickPreviousPage();

    });

    test('TC034 - Verify Rows Per Page - 10', async () => {

        await tracking.changeRowsPerPage('10');

    });

    test('TC035 - Verify Rows Per Page - 25', async () => {

        await tracking.changeRowsPerPage('25');

    });

    test('TC036 - Verify Rows Per Page - 50', async () => {

        await tracking.changeRowsPerPage('50');

    });

    test('TC037 - Verify Empty Shipment Validation', async () => {

        await tracking.verifyEmptyShipmentValidation();

    });

    test('TC038 - Verify Required Field Validation', async () => {

        await tracking.verifyRequiredFieldValidation();

    });

    test('TC039 - Verify Invalid Tracking URL Validation', async () => {

        await tracking.verifyInvalidTrackingURL();

    });

    test('TC040 - Change Shipment Status To In Transit', async () => {

        await tracking.openOutgoingTab();

        await tracking.changeStatus();

    });

    test('TC041 - Open Edit Shipment Dialog', async () => {

        await tracking.openOutgoingTab();

        await tracking.openEditShipment();

    });

    test('TC042 - Close Edit Shipment Dialog', async () => {

        await tracking.openOutgoingTab();

        await tracking.openEditShipment();

        await tracking.closeEditShipment();

    });
     
    test('TC043 - Edit Shipment Description', async () => {

        await tracking.editShipmentDescription();

    });

    test('TC044 - Edit Shipment Sender', async () => {

        await tracking.editSender();

    });

    test('TC045 - Edit Shipment Receiver', async () => {

        await tracking.editReceiver();

    });

    test('TC046 - Edit Shipment Quantity', async () => {

        await tracking.editQuantity();

    });

    test('TC047 - Save Edited Shipment', async () => {

           await tracking.saveEditedShipment();

    });

    test('TC048 - Verify Outgoing Shipment Added', async () => {

        await tracking.verifyOutgoingShipmentAdded();

    });

    test('TC049 - Verify Incoming Shipment Added', async () => {
       await tracking.verifyIncomingShipmentAdded();

    });

    test('TC050 - Tracking End To End Flow', async () => {

        await tracking.fillTrackingEntry();
        await tracking.searchShipment('Tc-9545');
        await tracking.changeStatus();

    });

    test.afterAll(async () => {

        await page.close();

    });

});