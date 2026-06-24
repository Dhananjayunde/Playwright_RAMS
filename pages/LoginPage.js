class LoginPage {

    constructor(page) {

        this.page = page;
        this.email = page.getByRole('textbox', {
            name: 'Email'
        });

        this.password = page.getByRole('textbox', {
            name: 'Password'
        });

        this.signInBtn = page.getByRole('button', {
            name: 'Sign in'
        });

        this.verifyBtn = page.getByRole('button', {
            name: 'Verify & Continue'
        });
    }

    async goTO() {
        await this.page.goto('/login');
        await this.page.waitForLoadState('networkidle');
    }

    async login(email, password) {
        await this.email.waitFor({ state: 'visible', timeout: 15000 });
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async enterOTP(otpCode = '723908') {
        const otpDigits = otpCode.split('');
        const otpLocators = ['_r_3_', '_r_4_', '_r_5_', '_r_6_', '_r_7_', '_r_8_'];
        
        for (let i = 0; i < otpDigits.length; i++) {
            await this.page.locator(`[id="${otpLocators[i]}"]`).fill(otpDigits[i]);
        }
        
        await this.verifyBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };