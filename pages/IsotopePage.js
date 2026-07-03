const BasePage = require('./BasePage');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');
const isotope =    TestDataManager.getData('isotopeData.json');

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

        await this.isotopeDatabaseModule.click();

        await this.actions.click(this.addIsotopeBtn);

        await this.actions.fill(this.symbol,isotope.symbol);
        await this.actions.fill(this.name, isotope.name);

        await this.actions.fill(this.weight, isotope.weight);

        await this.actions.fill(this.halfLife, isotope.halfLife);

        await this.actions.fill(this.energy, isotope.energy);

        await this.actions.fill(this.decayMode, isotope.decayMode);

        await this.actions.click(this.category);

        await this.actions.click(this.therapeuticOption);

        await this.actions.click(this.saveBtn);
    }

    async deactivateIsotope() {

        await this.actions.click(this.firstToggle);

        await this.actions.click(this.confirmDeactivateBtn);

       
    }

    async activateIsotope() {

        await this.actions.click(this.inactiveTab);

        await this.actions.click(this.firstToggle);

        await this.activateToast.waitFor({
            state: 'visible'
        });

    }

    async halfLifeFilter() {

        await this.shortHalfLife.click();

        await this.longHalfLife.click();

    }

}

module.exports = {
    IsotopePage
};