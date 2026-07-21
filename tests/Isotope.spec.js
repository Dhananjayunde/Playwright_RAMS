const { test, expect } = require('@playwright/test');
const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage} = require('../pages/LoginPage');
const { IsotopePage } = require('../pages/IsotopePage');
const Hooks = require('../hooks/Hooks');
const testData = ExcelUtils.getData('./testData/LoginData.xlsx','Sheet2');
const data = testData[0];

test.describe.serial('Isotope Module', () => {

    test.setTimeout(180000);

    let page;
    let isotope;

    test.beforeAll(async ({ browser }) => {

        page = await browser.newPage();

        const login = new LoginPage(page);
        isotope = new IsotopePage(page);

        await login.goTO();
        await login.login(data.Email, data.Password);
        await login.enterOTP();

    });

    test.beforeEach(async ({}, testInfo) => {
        await Hooks.beforeTest(page, testInfo);
    });

    test.afterEach(async ({}, testInfo) => {
        await Hooks.afterTest(page, testInfo);
    });

    test('TC001 - Add Isotope with Therapeutic Category', async () => {
        await isotope.addIsotope('Therapeutic');
    });

    test('TC002 - Add Isotope with Diagnostic Category', async () => {
        await isotope.addIsotope('Diagnostic');
    });

    test('TC003 - Add Isotope with Research Category', async () => {
        await isotope.addIsotope('Research');
    });

    test('TC004 - Add Isotope with Calibration Category', async () => {
        await isotope.addIsotope('Calibration');
    });

    test('TC005 - Deactivate Isotope', async () => {
        await isotope.deactivateIsotope();
    });

    test('TC006 - Activate Isotope', async () => {
        await isotope.activateIsotope();
    });

    test('TC007 - Verify All Filter in Active Tab', async () => {
        await isotope.openActiveTab();
        await isotope.clickAllFilter();
    });

    test('TC008 - Verify Short Half-Life Filter in Active Tab', async () => {
        await isotope.openActiveTab();
        await isotope.clickShortHalfLife();
    });

    test('TC009 - Verify Long Half-Life Filter in Active Tab', async () => {
        await isotope.openActiveTab();
        await isotope.clickLongHalfLife();
    });

    test('TC010 - Verify All Filter in Inactive Tab', async () => {
        await isotope.openInactiveTab();
        await isotope.clickAllFilter();
    });

    test('TC011 - Verify Short Half-Life Filter in Inactive Tab', async () => {
        await isotope.openInactiveTab();
        await isotope.clickShortHalfLife();
    });

    test('TC012 - Verify Long Half-Life Filter in Inactive Tab', async () => {
        await isotope.openInactiveTab();
        await isotope.clickLongHalfLife();
    });

    test('TC013 - Search Isotope by Symbol', async () => {
        await isotope.searchIsotope('Lu-177');
    });

    test('TC014 - Search Isotope by Name', async () => {
        await isotope.searchIsotope('Lutetium');
    });

    test('TC015 - Search with Invalid Data', async () => {
        await isotope.searchIsotope('InvalidIsotope123');
    });

    test('TC016 - Clear Search', async () => {
        await isotope.searchIsotope('Lu');
        await isotope.clearSearch();
    });

    test('TC017 - Verify Search is Case Insensitive', async () => {
        await isotope.searchIsotope('lutetium');
    });

    test('TC018 - Verify Search Using Partial Symbol', async () => {
        await isotope.searchIsotope('Lu');
    });

    test('TC019 - Search Isotope by Category', async () => {
        await isotope.searchIsotope('Therapeutic');
    });

    test('TC020 - Search Isotope by Decay Mode', async () => {
        await isotope.searchIsotope('Hf');
    });

    test('TC021 - Verify Empty Search Displays All Records', async () => {
        await isotope.clearSearch();
    });

    test('TC022 - Verify Isotope Database Page Loaded', async () => {
        await isotope.verifyPageLoaded();
    });

    test('TC023 - Verify Table Headers', async () => {
        await isotope.verifyTableHeaders();
    });

    test('TC024 - Verify Add Isotope Button Visible', async () => {
        await isotope.actions.verifyVisible(isotope.addIsotopeBtn);
    });

    test('TC025 - Verify Search Textbox Visible', async () => {
        await isotope.actions.verifyVisible(isotope.searchTextbox);
    });

    test('TC026 - Verify Isotope Table Visible', async () => {
        await isotope.actions.verifyVisible(isotope.table);
    });

    test('TC027 - Verify Rows Per Page Visible', async () => {
        await isotope.actions.verifyVisible(isotope.rowsPerPage);
    });

    test('TC028 - Verify Active Tab Visible', async () => {
        await isotope.actions.verifyVisible(isotope.activeTab);
    });

    test('TC029 - Verify Inactive Tab Visible', async () => {
        await isotope.actions.verifyVisible(isotope.inactiveTab);
    });

    test('TC030 - Verify Next Page Navigation', async () => {
        await isotope.clickNextPage();
    });

    test('TC031 - Verify Previous Page Navigation', async () => {
        await isotope.clickPreviousPage();
    });

    test('TC032 - Verify Next Page Button Visible', async () => {
        await isotope.actions.verifyVisible(isotope.nextPage);
    });

    test('TC033 - Verify Previous Page Button Visible', async () => {
        await isotope.actions.verifyVisible(isotope.previousPage);
    });

    test('TC034 - Verify Table Contains Records', async () => {
        await isotope.actions.verifyVisible(isotope.tableRows.first());
    });

    test('TC035 - Verify First Row is Clickable', async () => {
        await isotope.tableRows.first().click();
    });


    test('TC036 - Verify Search After All Filter', async () => {
        await isotope.clickAllFilter();
        await isotope.searchIsotope('Lu');
        await isotope.clearSearch();
    });

    test('TC037 - Verify Search After Short Half-Life Filter', async () => {
        await isotope.clickShortHalfLife();
        await isotope.searchIsotope('Lu');
        await isotope.clearSearch();
    });

    test('TC038 - Verify Search After Long Half-Life Filter', async () => {
        await isotope.clickLongHalfLife();
        await isotope.searchIsotope('Lu');
        await isotope.clearSearch();
    });

    test('TC039 - Verify Search After Opening Active Tab', async () => {
        await isotope.openActiveTab();
        await isotope.searchIsotope('Therapeutic');
        await isotope.clearSearch();
    });

    test('TC040 - Verify Search After Opening Inactive Tab', async () => {
        await isotope.openInactiveTab();
        await isotope.searchIsotope('Therapeutic');
        await isotope.clearSearch();
    });

    test.afterAll(async () => {
        await page.close();
    });

});