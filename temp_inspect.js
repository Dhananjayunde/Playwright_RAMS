const { chromium } = require('playwright');
const XLSX = require('xlsx');

(async () => {
  const workbook = XLSX.readFile('./testData/LoginData.xlsx');
  const sheet = workbook.Sheets['Sheet2'];
  const rows = XLSX.utils.sheet_to_json(sheet);
  const data = rows[0];

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://dev.marichi.app/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(data.Email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.Password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForLoadState('networkidle');

  const otpDigits = '530972'.split('');
  const otpLocators = ['_r_3_', '_r_4_', '_r_5_', '_r_6_', '_r_7_', '_r_8_'];
  for (let i = 0; i < otpDigits.length; i++) {
    await page.locator(`[id="${otpLocators[i]}"]`).fill(otpDigits[i]);
  }
  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await page.waitForLoadState('networkidle');

  await page.getByText('Waste Management').click();
  await page.waitForLoadState('networkidle');
  await page.getByText('Add Waste Entry').click();
  await page.waitForLoadState('networkidle');

  console.log('URL:', page.url());
  const bodyText = await page.locator('body').innerText();
  console.log(bodyText);
  await page.screenshot({ path: 'temp-waste.png', fullPage: true });
  await browser.close();
})();
