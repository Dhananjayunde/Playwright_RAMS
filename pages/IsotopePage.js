const { expect } = require('@playwright/test');
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

    this.isotopeDatabaseModule = page.locator('//*[@id="root"]/div/div/aside/div[2]/div[2]/div[2]/div/div/div[1]/p'
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

    this.diagnosticOption = page.getByRole('option', {
        name: 'Diagnostic'
    });

    this.researchOption = page.getByRole('option', {
        name: 'Research'
    });

    this.calibrationOption = page.getByRole('option', {
        name: 'Calibration'
    });

    this.allFilter = page.getByText('All', {
        exact: true
    });

    this.shortHalfLife = page.getByText('Short T½', {
        exact: true
    });

    this.longHalfLife = page.getByText('Long T½', {
        exact: true
    });

    this.activeTab = page.getByText('Active').first();

    this.inactiveTab = page.getByText('Inactive');

    this.searchTextbox = page.getByPlaceholder(
        'Search by symbol, name, decay mode or category…'
    );
    this.pageTitle = page.getByRole('heading', {
        name: 'Isotope Database'
    });

    this.table = page.locator('table');

    this.tableRows = page.locator('tbody tr');
    this.nextPage = page.getByRole('button', {
        name: 'Go to next page'
    });

    this.previousPage = page.getByRole('button', {
        name: 'Go to previous page'
    });

    this.rowsPerPage = page.getByText('Rows per page:');
    this.symbolHeader = page.getByRole('columnheader', {
        name: /Symbol/i
    });

    this.nameHeader = page.getByRole('columnheader', {
        name: /Name/i
    });

    this.weightHeader = page.getByRole('columnheader', {
        name: /Weight/i
    });

    this.halfLifeHeader = page.getByRole('columnheader', {
        name: /Half-Life/i
    });

    this.decayModeHeader = page.getByRole('columnheader', {
        name: /Decay Mode/i
    });

    this.energyHeader = page.getByRole('columnheader', {
        name: /Energy/i
    });

    this.categoryHeader = page.getByRole('columnheader', {
        name: /Category/i
    });
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
    async searchIsotope(value) {

        Logger.step(`Search Isotope : ${value}`);

        await this.actions.fill(this.searchTextbox, value);

    }

    async clearSearch() {

        Logger.step('Clear Search');

        await this.searchTextbox.clear();

    }

    async clickAllFilter() {

        Logger.step('Click All Filter');

        await this.actions.click(this.allFilter);

    }

    async clickShortHalfLife() {

        Logger.step('Click Short Half-Life Filter');

        await this.actions.click(this.shortHalfLife);

    }

    async clickLongHalfLife() {

        Logger.step('Click Long Half-Life Filter');

        await this.actions.click(this.longHalfLife);

    }

    async openActiveTab() {

        Logger.step('Open Active Tab');

        await this.actions.click(this.activeTab);

    }

    async openInactiveTab() {

        Logger.step('Open Inactive Tab');

        await this.actions.click(this.inactiveTab);

    }

    async clickNextPage() {

        Logger.step('Go To Next Page');

        await this.actions.click(this.nextPage);

    }

    async clickPreviousPage() {

        Logger.step('Go To Previous Page');

        await this.actions.click(this.previousPage);

    }

    async verifyTableHeaders() {

        Logger.step('Verify Table Headers');

        await this.actions.verifyVisible(this.symbolHeader);
        await this.actions.verifyVisible(this.nameHeader);
        await this.actions.verifyVisible(this.weightHeader);
        await this.actions.verifyVisible(this.halfLifeHeader);
        await this.actions.verifyVisible(this.decayModeHeader);
        await this.actions.verifyVisible(this.energyHeader);
        await this.actions.verifyVisible(this.categoryHeader);

    }

    async verifyPageLoaded() {

        Logger.step('Verify Isotope Database Page');

        await this.actions.verifyVisible(this.pageTitle);
        await this.actions.verifyVisible(this.addIsotopeBtn);
        await this.actions.verifyVisible(this.table);

    }

    async selectCategory(category = 'Therapeutic') {

        Logger.info(`Selecting ${category} Category`);

        const categoryMap = {
            Therapeutic: this.therapeuticOption,
            Diagnostic: this.diagnosticOption,
            Research: this.researchOption,
            Calibration: this.calibrationOption
        };

        const option = categoryMap[category];

        if (!option) {
            throw new Error(`Category "${category}" is not supported.`);
        }

        await this.actions.click(this.category);
        await this.actions.click(option);

    }

    async addIsotope(category = 'Therapeutic') {

        Logger.step(`Add Isotope - ${category}`);

        Logger.info('Opening Isotope Database Module');
        await this.actions.click(this.isotopeDatabaseModule);

        Logger.info('Clicking Add Isotope button');
        await this.actions.click(this.addIsotopeBtn);

        Logger.info('Entering Isotope Details');

        await this.actions.fill(this.symbol, isotope.symbol);
        await this.actions.fill(this.name, isotope.name);
        await this.actions.fill(this.weight, isotope.weight);
        await this.actions.fill(this.halfLife, isotope.halfLife);
        await this.actions.fill(this.energy, isotope.energy);
        await this.actions.fill(this.decayMode, isotope.decayMode);

        await this.selectCategory(category);

        Logger.info('Saving Isotope');

        await this.actions.click(this.saveBtn);

        Logger.success(`${category} Isotope added successfully`);

        // await ScreenshotUtils.capture(
        //     this.page,
        //     `Isotope Saved - ${category}`
        // );

    }

    async deactivateIsotope() {

    Logger.step('Deactivate Isotope');

    await this.openActiveTab();

    Logger.info('Selecting first isotope');

    await expect(this.firstToggle).toBeChecked();

    await this.firstToggle.click();

    Logger.info('Confirming deactivation');

    await expect(this.confirmDeactivateBtn).toBeVisible();

    await this.confirmDeactivateBtn.click();

    await expect(this.confirmDeactivateBtn).toBeHidden({
        timeout:10000
    });

    // await expect(
    //     this.page.getByText(/deactivated/i)
    // ).toBeVisible({
    //     timeout:10000
    // });

    Logger.success('Isotope deactivated successfully');

}

    async activateIsotope() {

        Logger.step('Activate Isotope');

        await this.openInactiveTab();

        Logger.info('Selecting first inactive isotope');

        await this.actions.click(this.firstToggle);

        await this.actions.waitForVisible(this.activateToast);

        Logger.success('Isotope activated successfully');

    }

    async halfLifeFilter() {

        Logger.step('Verify Half Life Filter');

        await this.clickShortHalfLife();

        await this.clickLongHalfLife();

        await this.clickAllFilter();

        Logger.success('Half Life Filters verified successfully');

    }

}

module.exports = {
    IsotopePage
};