const { test, expect } =
require('@playwright/test');

const ExcelUtils =
require('../utils/ExcelUtils');

const {
    LoginPage
} = require('../pages/LoginPage');

const {
    ReceivingLogPage
} = require('../pages/ReceivingLogPage');

const testData =
ExcelUtils.getData(
    './testData/LoginData.xlsx',
    'Sheet2'
);

test.describe('Receiving Log Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  for (const data of testData) {

    test(`Receiving Log - ${data.Email}`,
        { timeout: 60000 },
        async ({ page }) => {

            const login =
                new LoginPage(page);

            const receiving =
                new ReceivingLogPage(page);

            await login.login(
                data.Email,
                data.Password
            );

            await page.waitForLoadState('networkidle');

            await login.enterOTP();

            await page.waitForLoadState('networkidle');

            await receiving.fillReceivingEntry();

            await receiving.continueESign(
                data.Password
            );

            await page.waitForLoadState('networkidle');
            
           }
    );
  }

});