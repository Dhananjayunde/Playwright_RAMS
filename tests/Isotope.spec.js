const { test } = require('@playwright/test');

const ExcelUtils =
    require('../utils/ExcelUtils');

const {
    LoginPage
} = require('../pages/LoginPage');

const {
    IsotopePage
} = require('../pages/IsotopePage');

const testData = ExcelUtils.getData(
    './testData/LoginData.xlsx',
    'Sheet2'
);

for (const data of testData) {

    test(`Login Test - ${data.Email}`,
        async ({ page }) => {

            const login =
                new LoginPage(page);

            const isotope =
                new IsotopePage(page);

            await login.goTO();

            await login.login(
                data.Email,
                data.Password
            );

            await login.enterOTP();

          
            await isotope.addIsotope();
        }
    );
}

