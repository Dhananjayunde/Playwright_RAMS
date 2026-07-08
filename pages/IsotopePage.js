const BasePage = require('./BasePage');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');
const isotope = TestDataManager.getData('isotopeData.json');
const Logger = require('../utils/Logger');
const ScreenshotUtils = require('../utils/ScreenshotUtils');
const DateUtils = require('../utils/DateUtils.js');

class IsotopePage extends BasePage {

    constructor(page) {
        super(page);

        this.lastCreatedIsotope = null;

        this.isotopeDatabaseModule = page.locator(
            '//*[@id="root"]/div/div/aside/div[2]/div[2]/div[2]/div/div/div[1]/p'
        );

        this.addIsotopeBtn = page.getByRole('button', {
            name: CONSTANTS.BUTTONS.ADD_ISOTOPE
        });

        this.saveBtn = page.getByRole('button', {
            name: CONSTANTS.BUTTONS.SAVE_ISOTOPE
        });

        this.confirmDeactivateBtn = page.getByRole('button', {
            name: CONSTANTS.BUTTONS.CONFIRM_DEACTIVATE
        });

        this.symbol = page.getByRole('textbox', {
            name: 'e.g. Lu-177',
            exact: true
        });

        this.name = page.getByRole('textbox', {
            name: CONSTANTS.PLACEHOLDERS.NAME
        });

        this.weight = page.getByRole('textbox', {
            name: '177',
            exact: true
        });

        this.halfLife = page.getByRole('textbox', {
            name: 'e.g. 6.647d'
        });

        this.energy = page.getByRole('textbox', {
            name: '159.5'
        });

        this.decayMode = page.getByRole('textbox', {
            name: 'e.g. β⁻ → Hf-'
        });

        this.category = page.getByRole('combobox', {
            name: 'Diagnostic'
        });

        this.therapeuticOption = page.getByRole('option', {
            name: 'Therapeutic'
        });

        this.inactiveTab = page.getByText('Inactive');

        this.shortHalfLife = page.getByText(/Short T½/i);

        this.longHalfLife = page.getByText(/Long T½/i);

        this.firstToggle = page
            .locator('tbody tr')
            .first()
            .getByRole('checkbox');

        this.deactivateToast = page.getByText(
            'Isotope deactivated',
            { exact: true }
        );

        this.activateToast = page.getByText(
            'Isotope activated',
            { exact: true }
        );
    }

    async addIsotope() {

        Logger.step('Add Isotope');
        Logger.info('Opening Isotope Database Module');
        await this.isotopeDatabaseModule.click();
        Logger.info('Clicking Add Isotope button');
        await this.actions.click(this.addIsotopeBtn);
        Logger.info('Entering Isotope Details');
        await this.actions.fill(this.symbol, isotope.symbol);
        await this.actions.fill(this.name, isotope.name);
        await this.actions.fill(this.weight, isotope.weight);
        await this.actions.fill(this.halfLife, isotope.halfLife);
        await this.actions.fill(this.energy, isotope.energy);
        await this.actions.fill(this.decayMode, isotope.decayMode);

        Logger.info('Selecting Category');
        await this.actions.click(this.category);

        Logger.info('Selecting Therapeutic Option');
        await this.actions.click(this.therapeuticOption);

        Logger.info('Saving Isotope');
        await this.actions.click(this.saveBtn);

        Logger.success('Add Isotope completed successfully');
        await ScreenshotUtils.capture(this.page,'Isotope Saved');
    }

    async deactivateIsotope() {

        Logger.step('Deactivate Isotope');

        Logger.info('Selecting first isotope');

        await this.actions.click(this.firstToggle);

        Logger.info('Confirming deactivation');

        await this.actions.click(this.confirmDeactivateBtn);

        Logger.success('Deactivate request submitted');

    }

    async activateIsotope() {

        Logger.step('Activate Isotope');

        Logger.info('Opening Inactive tab');

        await this.actions.click(this.inactiveTab);

        Logger.info('Selecting first inactive isotope');

        await this.actions.click(this.firstToggle);

        Logger.info('Waiting for activation confirmation');

        await this.activateToast.waitFor({
            state: 'visible'
        });

        Logger.success('Isotope activated successfully');

    }

    async halfLifeFilter() {

        Logger.step('Verify Half Life Filter');

        Logger.info('Selecting Short Half Life');

        await this.shortHalfLife.click();

        Logger.info('Selecting Long Half Life');

        await this.longHalfLife.click();

        Logger.success('Half Life filter verified');

    }

}

module.exports = {
    IsotopePage
};