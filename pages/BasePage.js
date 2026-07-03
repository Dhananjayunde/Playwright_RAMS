const CommonActions = require('../utils/CommonActions');

class BasePage {

    constructor(page) {

        this.page = page;
        this.actions = new CommonActions(page);

    }

}

module.exports = BasePage;