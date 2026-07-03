const BasePage = require('./BasePage');
const CONSTANTS = require('../config/constants');

class LoginPage extends BasePage {

    constructor(page) {

       super(page);
    this.emailTxt = page.getByRole('textbox', {
        name: 'Email'
    });

    this.passwordTxt = page.getByRole('textbox', {
        name: 'Password'
    });

    this.signInBtn = page.getByRole('button', {
            name: CONSTANTS.BUTTONS.SIGN_IN
        });

    this.verifyBtn = page.getByRole('button', {
            name: CONSTANTS.BUTTONS.VERIFY_CONTINUE
        });

    }

    async goTO() {

        await this.page.goto('/login');
        await this.page.waitForLoadState('networkidle');

    }

    async login(email, password) {

await this.actions.fill(this.emailTxt, email);
await this.actions.fill(this.passwordTxt, password);
        await this.actions.click(this.signInBtn);

        await this.page.waitForLoadState('domcontentloaded');

        await this.actions.wait(2);

    }

    async enterOTP(otpCode = '631613') {

        await this.actions.waitForVisible(this.verifyBtn);

        const otpDigits = (otpCode || '321735').split('');

        const otpLocators = [
            '_r_3_',
            '_r_4_',
            '_r_5_',
            '_r_6_',
            '_r_7_',
            '_r_8_'
        ];

        for (let i = 0; i < otpDigits.length; i++) {

            const input = this.page.locator(`[id="${otpLocators[i]}"]`);

            if (await input.isVisible().catch(() => false)) {

                await input.fill(otpDigits[i]);

            }

        }

        await this.actions.click(this.verifyBtn);

        await this.page.waitForLoadState('domcontentloaded');

        await this.actions.wait(2);

    }

}

module.exports = { LoginPage };