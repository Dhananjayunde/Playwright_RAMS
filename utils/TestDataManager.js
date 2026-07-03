const fs = require('fs');
const path = require('path');

class TestDataManager {

    static getData(fileName) {

        const filePath = path.join(
            __dirname,
            '..',
            'testData',
            fileName
        );

        return JSON.parse(
            fs.readFileSync(filePath, 'utf8')
        );

    }

}

module.exports = TestDataManager;