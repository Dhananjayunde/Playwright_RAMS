class WaitUtils {

    static async waitForPage(page) {

        await page.waitForLoadState('domcontentloaded');

    }

    static async waitForNetwork(page) {

        await page.waitForLoadState('networkidle');

    }

    static async wait(locator, timeout = 10000) {

        await locator.waitFor({

            state: 'visible',
            timeout

        });

    }

    static async shortWait(page) {

        await page.waitForTimeout(1000);

    }

    static async mediumWait(page) {

        await page.waitForTimeout(3000);

    }

}

module.exports = WaitUtils;