const Logger = require('../utils/Logger');
const ScreenshotUtils = require('../utils/ScreenshotUtils');

class Hooks {

    static async beforeTest(page, testInfo) {

        Logger.info('======================================');
        Logger.info(`Starting Test : ${testInfo.title}`);
        Logger.info('======================================');

    }

    static async afterTest(page, testInfo) {

        if (testInfo.status !== testInfo.expectedStatus) {

            Logger.error(`Test Failed : ${testInfo.title}`);

            await ScreenshotUtils.capture(
                page,
                testInfo.title.replace(/[^a-zA-Z0-9]/g, '_')
            );

        } else {

            Logger.info(`Test Passed : ${testInfo.title}`);

        }

        Logger.info('======================================');

    }

}

module.exports = Hooks;