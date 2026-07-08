class WaitUtils {

    constructor(page) {

        this.page = page;

    }

    async pageReady() {

        await this.page.waitForLoadState('domcontentloaded');

    }

    async networkIdle() {

        await this.page.waitForLoadState('networkidle');

    }

    async visible(locator, timeout = 15000) {

        await locator.waitFor({

            state: 'visible',

            timeout

        });

    }

    async hidden(locator, timeout = 15000) {

        await locator.waitFor({

            state: 'hidden',

            timeout

        });

    }

    async attached(locator, timeout = 15000) {

        await locator.waitFor({

            state: 'attached',

            timeout

        });

    }

    async detached(locator, timeout = 15000) {

        await locator.waitFor({

            state: 'detached',

            timeout

        });

    }

    async wait(seconds = 1) {

        await this.page.waitForTimeout(seconds * 1000);

    }

    async urlContains(text) {

        await this.page.waitForURL(`**${text}**`);

    }

    async titleContains(text) {

        await this.page.waitForFunction(

            expected => document.title.includes(expected),

            text

        );

    }

}

module.exports = WaitUtils;