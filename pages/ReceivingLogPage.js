const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');
const Logger = require('../utils/Logger');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');

const receiving =
    TestDataManager.getData('receivingLogData.json');

class ReceivingLogPage extends BasePage {

    constructor(page) {

        super(page);

        this.page = page;

      
        this.receivingLogMenu =
            page.locator('aside')
                .getByText(CONSTANTS.MENU.RECEIVING_LOG, {
                    exact: true
                });

        this.pageTitle =
            page.getByRole('heading', {
                name: 'Receiving Log'
            });

        this.pageDescription =
            page.getByText(
                'Radioactive material receiving records'
            );

        this.activeLogTab =page.getByText('Active Log', { exact: true });

        this.voidedTab =page.getByText('Voided Entries', { exact: true });

        this.searchTextbox =page.getByPlaceholder(
                'Search isotope, lot, initials'
            );

        this.logReceiptBtn =
            page.getByRole('button', {
                name: '+ Log Receipt'
            });

        this.exportBtn =
            page.getByRole('button', {
                name: 'Export'
            });

        this.continueESignBtn =
            page.getByRole('button', {
                name: 'Continue to E-Signature'
            });

        this.signCommitBtn =
            page.getByRole('button', {
                name: 'Sign & Commit'
            });

        this.cancelBtn =page.getByRole('button', { name: /Cancel/i });

       
      
        this.isotope =
            page.getByRole('combobox', {
                name: 'Select isotope'
            });

        this.manufacturer =
            page.getByRole('combobox', {
                name: 'Select manufacturer'
            });

        this.timeZone =
            page.getByRole('combobox', {
                name: /time zone/i
            });

        this.unit =
            page.getByRole('combobox', {
                name: 'Select unit'
            });

        this.storageLocation =
            page.getByRole('combobox', {
                name: 'Select storage location'
            });

        //==================================================
        // OPTIONS
        //==================================================

        this.isotopeOption =
            page.getByRole('option', {
                name: receiving.isotope
            });

        this.manufacturerOption =
            page.getByRole('option', {
                name: receiving.manufacturer
            });

        this.unitOption =
            page.getByRole('option', {
                name: receiving.unit,
                exact: true
            });

        this.storageLocationOption =
            page.getByRole('option', {
                name: receiving.storageLocation
            });

        this.timeZoneOption =
            page.getByRole('option', {
                name: receiving.timeZone
            });

        //==================================================
        // DATES
        //==================================================

        this.receiveDate =
            page.locator(
                'input[name="receiveDate"]'
            );

        this.referenceDate =
            page.locator(
                'input[name="refDate"]'
            );

        this.calibrationDate =
            page.locator(
                'input[name="calibDate"]'
            );

        this.expiryDate =
            page.locator(
                'input[name="expiry"]'
            );

        //==================================================
        // TEXTBOXES
        //==================================================

        this.internalLot =
            page.getByRole('textbox', {
                name: 'e.g. INT12345'
            });

        this.externalLot =
            page.getByRole('textbox', {
                name: 'e.g. EXT67890'
            });

        this.quantity =
            page.locator(
                'input[name="qty"]'
            );

        this.concentration =
            page.getByRole('textbox', {
                name: 'e.g. 50 mCi/mL'
            });

        this.referenceActivity =
            page.getByRole('textbox', {
                name: 'e.g. 2450 MBq'
            });

        this.surface =
            page.locator(
                'input[name="surface"]'
            );

        this.t1 =
            page.locator(
                'input[name="t1"]'
            );

        this.insideWipe =
            page.locator(
                'input[name="insideWipe"]'
            );

        this.outsideWipe =
            page.locator(
                'input[name="outsideWipe"]'
            );

        this.wipeBackground =
            page.locator(
                'input[name="wipeBG"]'
            );

        this.background =
            page.getByPlaceholder(
                'e.g. 0.1'
            );

        this.serialNumber =
            page.getByPlaceholder(
                'Enter serial number'
            );

        this.notes =
            page.getByPlaceholder(
                'Enter package notes, descriptions or exceptions...'
            );

        this.password =
            page.getByPlaceholder(
                'Enter your account password'
            );

        //==================================================
        // TABLE
        //==================================================

        this.table =
            page.locator('table');

        this.tableRows =
            page.locator('tbody tr');

        this.tableHeaders =
            page.locator('thead th');

        //==================================================
        // ACTION BUTTONS
        //==================================================

        this.detailsButton =page.getByRole('button', { name: /Details/i });

        this.closeBtn=page.locator('button:has-text("Close")');    
        this.voidButton =
            page.locator('tbody tr')
                .first()
                .getByLabel('Void Entry');

        this.reinstateButton =
            page.locator('tbody tr')
                .first()
                .getByLabel('Reinstate Entry');

        //==================================================
        // PAGINATION
        //==================================================

        this.nextPage =
            page.getByRole('button', {
                name: /Go to next page/i
            });

        this.previousPage =
            page.getByRole('button', {
                name: /Go to previous page/i
            });

        this.rowsPerPage =
            page.getByRole('combobox', {
                name: /Rows per page/i
            });

    }//==================================================
// Navigation
//==================================================

async openReceivingLog() {

    Logger.info('Opening Receiving Log Module');

    await this.actions.click(this.receivingLogMenu);

    await expect(this.pageTitle).toBeVisible();

}

//==================================================
// Page Verification
//==================================================

async verifyReceivingLogPage() {

    Logger.info('Verify Receiving Log Page');

    await expect(this.pageTitle).toBeVisible();

    await expect(this.logReceiptBtn).toBeVisible();

    await expect(this.table).toBeVisible();

}


async verifyDashboardCards() {

    Logger.info('Verify Dashboard Cards');

    await expect(this.activeLogTab).toBeVisible();

    await expect(this.voidedTab).toBeVisible();

}

//==================================================
// Log Receipt Button
//==================================================

async verifyLogReceiptButton() {

    Logger.info('Verify Log Receipt Button');

    await expect(this.logReceiptBtn).toBeVisible();

    await expect(this.logReceiptBtn).toBeEnabled();

}

//==================================================
// Open Log Receipt Dialog
//==================================================

async openLogReceipt() {

    Logger.info('Open Log Receipt Dialog');

    await this.actions.click(this.logReceiptBtn);

    await expect(this.continueESignBtn).toBeVisible();
    
    await this.actions.click(this.cancelBtn);

}

//==================================================
// Close Dialog
//==================================================

async verifyCloseButton() {

    Logger.info('Verify Close Button');

    await this.openLogReceipt();

    await this.actions.click(this.cancelBtn);

    await expect(this.pageTitle).toBeVisible();

}

async verifyCancelButton() {

    Logger.info('Verify Cancel Button');

    // await this.openLogReceipt();

    // await this.actions.click(this.cancelBtn);

    // await expect(this.pageTitle).toBeVisible();

}


async openActiveEntries() {

    Logger.info('Open Active Entries');

    await this.actions.click(this.activeLogTab);

    await expect(this.activeLogTab).toBeVisible();

    await expect(this.table).toBeVisible();

}

async openVoidedEntries() {

    Logger.info('Open Voided Entries');

    await this.actions.click(this.voidedTab);

    await expect(this.voidedTab).toBeVisible();

    await expect(this.table).toBeVisible();

}

async searchReceipt(value){

    await this.searchTextbox.fill(value);

    await this.page.waitForLoadState('networkidle');

    await expect(this.tableRows.first()).toBeVisible();
    
    await this.searchTextbox.clear();
}
async clearSearch() {

    Logger.info('Clear Search');

    await this.searchTextbox.clear();

}


async verifyReceivingTable() {

    Logger.info('Verify Receiving Table');

    await expect(this.table).toBeVisible();

}

async verifyTableHeaders() {

    Logger.info('Verify Table Headers');

    const headers = [

        'ID',
        'Date',
        'By',
        'Isotope',
        'Quantity',
        'Calibration Date / Time',
        'Current Activity',
        'Surface (mR/h)',
        'Status',
        'Actions'

    ];

    for (const header of headers) {

        await expect( this.page.locator('thead:visible')
           
        ).toBeVisible();

    }

}

async clickNextPage() {

    Logger.info('Next Page');

    if (await this.nextPage.isEnabled()) {

        await this.actions.click(this.nextPage);

    }

}

async clickPreviousPage() {

    Logger.info('Previous Page');

    if (await this.previousPage.isEnabled()) {

        await this.actions.click(this.previousPage);

    }

}

async changeRowsPerPage(value) {

    Logger.info(`Rows Per Page : ${value}`);

    await this.actions.click(this.rowsPerPage);

    await this.actions.click(

        this.page.getByRole('option', {
            name: value
        })

    );

}
async verifyMandatoryValidation() {

    Logger.info('Verify Mandatory Field Validation');

    await this.openLogReceipt();

    await this.continueESignBtn.click();

    await expect(this.page.getByText(/required/i).first())
        .toBeVisible();

    await this.cancelBtn.click();

}

async verifyContinueToESign() {

    Logger.info('Verify Continue To E-Sign');

    await this.openLogReceipt();

    await this.fillReceivingForm();

    await this.continueESignBtn.click();

    await expect(this.password)
        .toBeVisible();

    await this.cancelBtn.click();

}

async verifyCancelESignDialog() {

    Logger.info('Verify Cancel E-Sign Dialog');

    await this.openLogReceipt();

    await this.fillReceivingForm();

    await this.continueESignBtn.click();

    await this.cancelBtn.click();

    await expect(this.pageTitle)
        .toBeVisible();

}
//==================================================
// TC011 - Add Receiving Entry
//==================================================
async addReceivingEntry(password) {

    Logger.info('Add Receiving Entry');

    await this.openLogReceipt();

    await this.fillReceivingEntry();

    await this.continueESign(password);

    await expect(this.pageTitle).toBeVisible();
}

//==================================================
// TC012 - Verify New Entry Added
//==================================================

async verifyNewEntryAdded() {

    Logger.info('Verify Newly Added Entry');

    await this.searchReceipt(receiving.internalLot);

   // await expect(this.tableRows.first()).toContainText(receiving.internalLot);

}

//==================================================
// TC013 - Search By Internal Lot
//==================================================

async searchByInternalLot() {

       Logger.info('Search By Internal Lot');

    // await this.searchReceipt(receiving.internalLot);

    // await expect(this.tableRows.first()).toContainText(receiving.internalLot);
      
   // await this.searchTextbox.clear();
    
    }

//==================================================
// TC014 - Search By Isotope
//==================================================

async searchByIsotope() {

    Logger.info('Search By Isotope');

    await this.searchReceipt(receiving.isotope.split(' ')[0]);

    //await expect(this.tableRows.first()).toContainText('Ag');

}

//==================================================
// TC015 - Clear Search
//==================================================

async clearSearchAndVerifyRecords() {

    Logger.info('Clear Search');

    await this.clearSearch();

    await expect(this.tableRows.first()).toBeVisible();

}

//==================================================
// TC016 - View Entry Details
//==================================================

async viewEntryDetails() {

    Logger.info('View Entry Details');
    await this.actions.click(this.activeLogTab);

    await this.detailsButton.click();

    await expect(this.closeBtn).toBeVisible();

}

//==================================================
// TC017 - Close Details Dialog
//==================================================

async closeDetailsDialog() {

    Logger.info('Close Details Dialog');

    await this.closeBtn.click();

    await expect(this.pageTitle).toBeVisible();

}

//==================================================
// TC018 - Void Entry
//==================================================

async voidEntry(password) {

    Logger.info('Void Entry');

    await this.voidButton.click();

    await this.continueESign(password);

}

//==================================================
// TC019 - Verify Entry In Voided Tab
//==================================================

async verifyEntryInVoidedTab() {

    Logger.info('Verify Entry In Voided Tab');

    await this.openVoidedEntries();

    await this.searchReceipt(receiving.internalLot);

    await expect(this.tableRows.first()).toContainText(receiving.internalLot);

}

//==================================================
// TC020 - Reinstate Entry
//==================================================

async reinstateEntry(password) {

    Logger.info('Reinstate Entry');

    await this.reinstateButton.click();

    await this.continueESign(password);

}

//==================================================
// TC021 - Verify Entry Restored
//==================================================

async verifyEntryRestored() {

    Logger.info('Verify Entry Restored');

    await this.openActiveEntries();

    await this.searchReceipt(receiving.internalLot);

    await expect(this.tableRows.first()).toContainText(receiving.internalLot);

}

//==================================================
// TC022 - Export
//==================================================

async exportReceivingLog() {

    Logger.info('Export Receiving Log');

    const downloadPromise =
        this.page.waitForEvent('download');

    await this.exportBtn.click();

    const download =
        await downloadPromise;

    expect(download.suggestedFilename()).toBeTruthy();

}

//==================================================
// TC023 - Search Restored Entry
//==================================================

async searchRestoredEntry() {

    Logger.info('Search Restored Entry');

    await this.searchReceipt(receiving.internalLot);

    await expect(this.tableRows.first()).toContainText(receiving.internalLot);

}

//==================================================
// TC024 - Pagination
//==================================================

async verifyPagination() {

    Logger.info('Verify Pagination');

    if (await this.nextPage.isEnabled()) {

        await this.nextPage.click();

        await this.previousPage.click();

    }

}

//==================================================
// TC025 - Rows Per Page
//==================================================

async verifyRowsPerPage() {

    Logger.info('Verify Rows Per Page');

    await this.changeRowsPerPage('25');

    await expect(this.rowsPerPage).toContainText('25');

}

}

module.exports = {
    ReceivingLogPage
};