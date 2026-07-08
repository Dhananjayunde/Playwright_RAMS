const CommonActions = require('../utils/CommonActions');
const WaitUtils = require('../utils/WaitUtils');
class BasePage {

    constructor(page) {

        this.page = page;
        this.actions = new CommonActions(page);
        this.wait = new WaitUtils(page);
    }

}

module.exports = BasePage;