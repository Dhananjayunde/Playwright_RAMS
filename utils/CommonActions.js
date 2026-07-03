const { expect } = require('@playwright/test');

class CommonActions {

    constructor(page) {

        this.page = page;

    }

    async click(locator) {

        await locator.waitFor({ state: 'visible' });

        await locator.click();

    }

    async fill(locator, value) {

        await locator.waitFor({
            state: 'visible'

        });

        await locator.fill(value);

    }

    async type(locator, value) {

        await locator.waitFor({

            state: 'visible'

        });

        await locator.clear();

        await locator.type(value);

    }

    async waitForVisible(locator) {

        await locator.waitFor({

            state: 'visible'

        });

    }

    async verifyVisible(locator) {

        await expect(locator).toBeVisible();

    }

    async verifyText(locator, text) {

        await expect(locator).toHaveText(text);

    }

    async selectOption(locator, option) {

        await locator.click();

        await this.page.getByRole('option', {

            name: option

        }).click();

    }

    async wait(seconds = 1) {

        await this.page.waitForTimeout(seconds * 1000);

    }

}

module.exports = CommonActions;