const fs = require('fs');
const path = require('path');

class ScreenshotUtils {

    static async capture(page, fileName = 'Screenshot') {

        const screenshotDir = path.join(process.cwd(), 'screenshots');

        if (!fs.existsSync(screenshotDir)) {

            fs.mkdirSync(screenshotDir, {
                recursive: true
            });

        }

        const timestamp = new Date()
            .toISOString()
            .replace(/:/g, '-')
            .replace(/\./g, '-');

        const screenshotPath = path.join(
            screenshotDir,
            `${fileName}_${timestamp}.png`
        );

        await page.screenshot({

            path: screenshotPath,

            fullPage: true

        });

        console.log(`Screenshot saved : ${screenshotPath}`);

        return screenshotPath;

    }

}

module.exports = ScreenshotUtils;