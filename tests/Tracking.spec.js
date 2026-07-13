const { test, expect } = require('@playwright/test');

const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { TrackingPage } = require('../pages/TrackingPage');
const Hooks = require('../hooks/Hooks');

const testData = ExcelUtils.getData(
    './testData/LoginData.xlsx',
    'Sheet2'
);

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

    test('TC001 - Open Tracking Module', async () => {

        await tracking.verifyTrackingPageLoaded();

    });

    test('TC002 - Verify Tracking Page Loaded', async () => {

        await tracking.verifyTrackingPageLoaded();

    });

    test('TC003 - Verify Add Shipment Button Visible', async () => {

        await tracking.verifyAddShipmentButton();

    });


    test('TC004 - Add Outgoing Shipment', async () => {

        await tracking.fillTrackingEntry();

        await tracking.verifyShipmentTable();

    });

    test('TC005 - Add Incoming Shipment', async () => {

        await tracking.addIncomingShipment();

        await tracking.verifyShipmentTable();

    });

    test('TC006 - Search Shipment', async () => {

        await tracking.openOutgoingTab();

        await tracking.clearSearch();

        await tracking.searchShipment('Tc-9545');

    });

    test('TC007 - Clear Search', async () => {

        await tracking.openOutgoingTab();

        await tracking.clearSearch();

        await expect(
            tracking.searchTextbox
        ).toHaveValue('');

    });


    test('TC008 - Open Incoming Tab', async () => {

        await tracking.openIncomingTab();

        await tracking.verifyShipmentTable();

    });

    test('TC009 - Open Outgoing Tab', async () => {

        await tracking.openOutgoingTab();

        await tracking.verifyShipmentTable();

    });

    test('TC010 - Switch Between Tabs', async () => {

        await tracking.openIncomingTab();

        await tracking.openOutgoingTab();

        await tracking.verifyShipmentTable();

    });


    test('TC011 - Verify Incoming Card', async () => {

        await tracking.openOutgoingTab();

        await tracking.verifyIncomingCard();

    });

    test('TC012 - Verify Outgoing Card', async () => {

        await tracking.openOutgoingTab();

        await tracking.verifyOutgoingCard();

    });

    test('TC013 - Verify Delivered Card', async () => {

        await tracking.openOutgoingTab();

        await tracking.verifyDeliveredCard();

    });

    test('TC014 - Verify In Transit Card', async () => {

        await tracking.openOutgoingTab();

        await tracking.verifyInTransitCard();

    });

    test('TC015 - Change Status To In Transit', async () => {

        await tracking.openOutgoingTab();

        await tracking.changeStatus();

    });

test('TC016 - Verify Shipment Table Visible', async () => {

    await tracking.verifyShipmentTable();

});

test('TC017 - Verify Shipment Table Columns', async () => {

    await tracking.verifyShipmentColumns();

});

test('TC018 - Verify Shipment Records Exist', async () => {

    await tracking.verifyShipmentRecords();

});


test('TC019 - Verify Edit Shipment Opens', async () => {

    await tracking.openOutgoingTab();

    await tracking.editShipment();

});

test('TC020 - Verify Close Edit Shipment Dialog', async () => {

    await tracking.openOutgoingTab();

    await tracking.openEditShipment();

    await tracking.closeEditShipment();

});


test('TC021 - Verify Track Package Link Visible', async () => {

    await tracking.verifyTrackPackageLink();

});

test('TC022 - Verify Track Package URL', async () => {

    await tracking.verifyTrackingURL();

});


test('TC023 - Search By Tracking Number', async () => {

    await tracking.searchShipment('1Z98909999999');

});

test('TC024 - Search By Material', async () => {

    await tracking.searchShipment('Tc-9545');

});

test('TC025 - Search By Isotope', async () => {

    await tracking.searchShipment('Ag-111');

});

test('TC026 - Search By Courier', async () => {

    await tracking.searchShipment('UPS');

});

test('TC027 - Search Invalid Shipment', async () => {

    await tracking.searchShipment('INVALID123456');

    await tracking.verifyNoRecordsFound();
    await tracking.clearSearch();
});


test('TC028 - Verify Next Page', async () => {
await tracking.openIncomingTab();
    await tracking.clickNextPage();

});

test('TC029 - Verify Previous Page', async () => {

    await tracking.clickPreviousPage();

});

test('TC030 - Verify Rows Per Page', async () => {

    await tracking.changeRowsPerPage('25');

});


test('TC031 - Verify Delivered Status Disabled', async () => {

    await tracking.verifyDeliveredStatusDisabled();

});

test('TC032 - Verify Status Dropdown Exists', async () => {

    await tracking.verifyStatusDropdown();

});


test('TC033 - Verify Empty Shipment Validation', async () => {

    await tracking.verifyEmptyShipmentValidation();

});

test('TC034 - Verify Required Field Validation', async () => {

    await tracking.verifyRequiredFieldValidation();

});

test('TC035 - Verify Invalid Tracking URL Validation', async () => {

    await tracking.verifyInvalidTrackingURL();

});
    test.afterAll(async () => {

        await page.close();

    });

});