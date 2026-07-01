const {
    test
} = require('@playwright/test');

const ExcelUtils =
    require('../utils/ExcelUtils');

const {
    LoginPage
} = require('../pages/LoginPage');

const {
    IsotopePage
} = require('../pages/IsotopePage');

const testData =
    ExcelUtils.getData(
        './testData/LoginData.xlsx',
        'Sheet2'
    );

const data = testData[0];

test.describe.serial('Isotope Module', () => {

    test.setTimeout(180000);

    let page;

    let isotope;

    test.beforeAll(async ({ browser }) => {

        page =
            await browser.newPage();

        const login =
            new LoginPage(page);

        isotope =
            new IsotopePage(page);

        await login.goTO();

        await login.login(
            data.Email,
            data.Password
        );

        await login.enterOTP();
      
    });

    test('TC001 - Add Isotope', async () => {
  isotope =
            new IsotopePage(page);

        await isotope.addIsotope();

    });

    test('TC002 - Deactivate Isotope', async () => {
  isotope =
            new IsotopePage(page);

        await isotope.deactivateIsotope();

    });

    test('TC003 - Activate Isotope', async () => {
  isotope =
            new IsotopePage(page);

        await isotope.activateIsotope();

    });

       test('TC004 - Half Life Filter', async () => {
  isotope =
            new IsotopePage(page);

        await isotope.halfLifeFilter();

    });

    test.afterAll(async () => {

        await page.close();

    });

});