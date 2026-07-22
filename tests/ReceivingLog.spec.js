const { test, expect } =require('@playwright/test');
const ExcelUtils =require('../utils/ExcelUtils');
const {LoginPage} = require('../pages/LoginPage');
const { ReceivingLogPage} = require('../pages/ReceivingLogPage');
const Hooks = require('../hooks/Hooks');
const testData = ExcelUtils.getData('./testData/LoginData.xlsx','Sheet2');
const data = testData[0];

test.describe.serial('Receiving Module', () => {

    test.setTimeout(180000);

    let page;
    let receiving;
    
    test.beforeAll(async ({ browser }) => {

        page = await browser.newPage();

        const login = new LoginPage(page);
        receiving = new ReceivingLogPage(page);

        await login.goTO();
        await login.login(data.Email, data.Password);
        await login.enterOTP();
        await receiving.openReceivingLog();

        await receiving.verifyReceivingLogPage();
    });

    test.beforeEach(async ({}, testInfo) => {
        await Hooks.beforeTest(page, testInfo);
    });

    test.afterEach(async ({}, testInfo) => {
        await Hooks.afterTest(page, testInfo);
    });

    test('TC001 - Verify Receiving Log Page', async () => {
        await receiving.verifyReceivingLogPage();
    });

    test('TC002 - Verify Log Receipt Button', async () => {
        await receiving.verifyLogReceiptButton();
    });

    test('TC003 - Verify Dashboard Cards', async () => {
        await receiving.verifyDashboardCards();
    });

    test('TC004 - Verify Receiving Table', async () => {
        await receiving.verifyReceivingTable();
    });

    test('TC005 - Verify Table Headers', async () => {
        await receiving.verifyTableHeaders();
    });

    test('TC006 - Verify Active Entries Tab', async () => {
        await receiving.openActiveEntries();
    });

    test('TC007 - Verify Voided Entries Tab', async () => {
        await receiving.openVoidedEntries();
    });

    test('TC008 - Verify Log Receipt Dialog', async () => {
        await receiving.openLogReceipt();
    });

    test('TC009 - Verify Close Button', async () => {
        await receiving.verifyCloseButton();
    });

    test('TC010 - Verify Cancel Button', async () => {
        await receiving.verifyCancelButton();
    });
    
test('TC011 - Add New Receiving Log Entry', async () => {
    //await receiving.addReceivingEntry(data.Password);
});

test('TC012 - Verify Newly Added Entry Appears In Grid', async () => {
    await receiving.verifyNewEntryAdded();
});

test('TC013 - Search Receiving Entry By Internal Lot', async () => {
    await receiving.searchByInternalLot();
});

test('TC014 - Search Receiving Entry By Isotope', async () => {
    await receiving.searchByIsotope();
});

test('TC015 - Clear Search Results', async () => {
    await receiving.clearSearchAndVerifyRecords();
});

test('TC016 - View Receiving Entry Details', async () => {
    await receiving.viewEntryDetails();
});

test('TC017 - Close Details Dialog', async () => {
    await receiving.closeDetailsDialog();
});

test('TC018 - Void Receiving Entry', async () => {
    await receiving.voidEntry(data.Password);
});

test('TC019 - Verify Entry Moved To Voided Entries', async () => {
    await receiving.detailVoidEntry();
});

test('TC020 - Reinstate Voided Entry', async () => {
    await receiving.reinstateEntry(data.Password);
});

test('TC021 - Verify Entry Restored To Active Log', async () => {
    await receiving.verifyEntryRestored();
});

test('TC022 - Export Receiving Log', async () => {
    await receiving.exportReceivingLog();
});

test('TC023 - Verify Search After Reinstate', async () => {
    await receiving.searchRestoredEntry();
});

test('TC024 - Verify Active Log Pagination', async () => {
    await receiving.verifyPagination();
});

test('TC025 - Verify Rows Per Page Functionality', async () => {
    await receiving.verifyRowsPerPage();
});
test.afterAll(async () => {
        await page.close();
    });

});