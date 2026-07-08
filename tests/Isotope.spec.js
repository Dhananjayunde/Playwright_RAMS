const { test } = require('@playwright/test');

const ExcelUtils = require('../utils/ExcelUtils');

const { LoginPage } = require('../pages/LoginPage');
const { IsotopePage } = require('../pages/IsotopePage');

const Hooks = require('../hooks/Hooks');

const testData = ExcelUtils.getData(
    './testData/LoginData.xlsx',
    'Sheet2'
);

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

        await login.login(
            data.Email,
            data.Password
        );

        await login.enterOTP();

    });

    test.beforeEach(async ({}, testInfo) => {

        await Hooks.beforeTest(page, testInfo);

    });

    test.afterEach(async ({}, testInfo) => {

        await Hooks.afterTest(page, testInfo);

    });

    test('TC001 - Add Isotope', async () => {

        await isotope.addIsotope();

    });

    test('TC002 - Deactivate Isotope', async () => {

        await isotope.deactivateIsotope();

    });

    test('TC003 - Activate Isotope', async () => {

        await isotope.activateIsotope();

    });

    test('TC004 - Half Life Filter', async () => {

        await isotope.halfLifeFilter();

    });

    test.afterAll(async () => {

        await page.close();

    });

});