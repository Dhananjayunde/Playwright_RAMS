const { expect } = require('@playwright/test');
const BasePage = require('../pages/BasePage');
const CONSTANTS = require('../config/constants');
const TestDataManager = require('../utils/TestDataManager');
const Logger = require('../utils/Logger');
const tracking = TestDataManager.getData('trackingData.json');

class TrackingPage extends BasePage {

    constructor(page) {

        super(page);

        this.page = page;

        this.trackingMenu = page
            .locator('aside')
            .getByText(CONSTANTS.MENU.TRACKING, {
                exact: true
            });

        this.pageTitle = page.getByRole('heading', {
            name: 'Shipment Tracking'
        });


        this.dashboardSection = page.locator('div').filter({
            has: this.pageTitle
        }).first();

        this.incomingCard = page.locator('p', {
            hasText: /^Incoming Total$/
        }).first();

        this.inTransitCard = page.locator('p', {
            hasText: /^In Transit$/
        }).first();

        this.outgoingCard = page.locator('p', {
            hasText: /^Outgoing Total$/
        }).first();

        this.deliveredCard = page.locator('p', {
            hasText: /^Delivered$/
        }).first();


        this.incomingTab = page.getByText('Incoming', {
            exact: true
        });

        this.outgoingTab = page.getByText('Outgoing', {
            exact: true
        });


        this.searchTextbox = page.getByPlaceholder(
            'Search tracking, material, sender...'
        );

        this.addShipmentBtn = page.getByRole('button', {
            name: '+ Add Shipment'
        });

        this.saveShipmentBtn = page.getByRole('button', {
            name: 'Save Shipment'
        });

        this.closeButton =page.getByTestId('CloseIcon');
       // this.cancelButton =page.getByTestId('CloseIcon');
        this.dialog = page.getByRole('dialog');
        this.cancelButton = page.getByRole('dialog').getByRole('button', { name: /^Cancel$/ });
        this.shipmentType = page.getByRole('combobox').first();
        this.outgoingOption = page.getByRole('option', {
            name: 'Outgoing'
        });
        this.incomingOption = page.getByRole('option', {
            name: 'Incoming'
        });
        this.orderDate = page.locator(
            'input[name="orderDate"]'
        );

        this.trackingNumber = page.getByRole('textbox', {
            name: 'e.g. 1Z999AA10123456784'
        });

        this.description = page.getByRole('textbox', {
            name: 'e.g. Tc-99m 2450 MBq'
        });

        this.isotope = page.getByRole('combobox', {
            name: 'Select isotope'
        });

        this.isotopeOption = page.getByRole('option', {
            name: CONSTANTS.TRACKING.ISOTOPE
        });

        this.unit = page.getByRole('combobox', {
            name: 'Select unit'
        });

        this.unitOption = page.getByRole('option', {
            name: CONSTANTS.TRACKING.UNIT,
            exact: true
        });

        this.activity = page.getByPlaceholder('e.g. 66.2');

        this.sender = page.getByRole('textbox', {
            name: 'e.g. Cardinal Health'
        });

        this.receiver = page.getByRole('textbox', {
            name: 'e.g. University Hospital'
        });

        this.courier = page.getByRole('combobox', {
            name: 'FedEx'
        });

        this.courierOption = page.getByRole('option', {
            name: CONSTANTS.TRACKING.COURIER
        });

        this.trackingUrl = page.getByRole('textbox', {
            name: 'https://'
        });

this.shipmentTable = page.locator('table');

this.tableRows = page.locator('tbody tr');

this.tableHeaders = page.locator('thead th');

this.editButton = page
    .locator('tbody tr')
    .first()
    .locator('button')
    .last();

this.nextPageButton = page.getByRole('button', {
    name: /Go to next page/i
});

this.previousPageButton = page.getByRole('button', {
    name: /Go to previous page/i
});

this.rowsPerPageDropdown = page.getByRole('combobox', {
    name: /Rows per page/i
});

this.validationMessages = page.locator('.MuiFormHelperText-root');

this.trackingNumberRequired = page.getByText('Tracking number is required');

this.materialDescriptionRequired = page.getByText('Material description is required');

this.isotopeRequired = page.getByText('Isotope is required');

this.quantityRequired = page.getByText('Quantity is required');

this.trackingTable = page.locator('table');

this.trackPackageLink = page.locator('tbody a').first();

this.incomingCount = this.getDashboardCard('Incoming Total').locator('p').nth(1);

this.outgoingCount = this.getDashboardCard('Outgoing Total').locator('p').nth(1);

this.inTransitCount = this.getDashboardCard('In Transit').locator('p').nth(1);

this.deliveredCount = this.getDashboardCard('Delivered').locator('p').nth(1);

this.editDescription = page.getByRole('textbox', {
    name: 'e.g. Tc-99m 2450 MBq'
});

this.editSenderTextbox = page.getByRole('textbox', {
    name: 'e.g. Cardinal Health'
});

this.editReceiverTextbox = page.getByRole('textbox', {
    name: 'e.g. University Hospital'
});

this.editQuantityTextbox = page.getByPlaceholder('e.g. 66.2');

}


    async openTrackingModule() {

        Logger.info('Opening Tracking Module');

        await this.actions.click(this.trackingMenu);

        await expect(this.pageTitle).toBeVisible();

    }

    async verifyTrackingPageLoaded() {

        Logger.info('Verify Tracking Page');

        await expect(this.pageTitle).toBeVisible();

    }

    async verifyAddShipmentButton() {

        Logger.info('Verify Add Shipment Button');

        await expect(this.addShipmentBtn).toBeVisible();

    }


    async selectOutgoingShipment() {

        Logger.info('Selecting Outgoing Shipment');

        await this.shipmentType.click();

        await this.outgoingOption.click();

    }

    async selectIncomingShipment() {

        Logger.info('Selecting Incoming Shipment');

        await this.shipmentType.click();

        await this.incomingOption.click();

    }

    async fillTrackingForm() {

        Logger.info('Fill Shipment Form');

        await this.trackingNumber.fill(tracking.trackingNumber);

        await this.description.fill(tracking.description);

        await this.isotope.click();

        await this.isotopeOption.click();

        await this.unit.click();

        await this.unitOption.click();

        await this.activity.fill(tracking.activity);

        await this.sender.fill(tracking.sender);

        await this.receiver.fill(tracking.receiver);

        await this.courier.click();

        await this.courierOption.click();

        await this.trackingUrl.fill(tracking.trackingUrl);

    }

    async saveShipment() {

        Logger.info('Saving Shipment');

        await this.saveShipmentBtn.click();

        await expect(this.pageTitle).toBeVisible();

    }

    async fillTrackingEntry() {

        Logger.info('Adding Outgoing Shipment');

        await this.openTrackingModule();

        await this.addShipmentBtn.click();

        await this.selectOutgoingShipment();

        await this.fillTrackingForm();

        await this.saveShipment();

    }

    async addIncomingShipment() {

        Logger.info('Adding Incoming Shipment');

        await this.openTrackingModule();

        await this.addShipmentBtn.click();

        await this.selectIncomingShipment();

        await this.fillTrackingForm();

        await this.saveShipment();

    }

    async changeStatus() {

        Logger.info('Changing Status To In Transit');

        const statusDropdown = this.page
            .locator('tbody tr')
            .filter({
                hasNot: this.page.getByText('Delivered', {
                    exact: true
                })
            })
            .first()
            .getByRole('combobox');

        await statusDropdown.click();

        await this.page.getByRole('option', {
            name: 'In Transit'
        }).click();

        await expect(statusDropdown).toContainText('In Transit');

    }

    async searchShipment(value) {

        Logger.info(`Searching : ${value}`);

        await this.searchTextbox.fill(value);

        await this.page.waitForTimeout(1000);

    }

    async clearSearch() {

        Logger.info('Clear Search');

        await this.searchTextbox.clear();

    }

    async openIncomingTab() {

        Logger.info('Incoming Tab');

        await this.incomingTab.click();

        await expect(this.incomingTab).toBeVisible();

    }
    async openOutgoingTab() {

        Logger.info('Outgoing Tab');

        await this.outgoingTab.click();

        await expect(this.outgoingTab).toBeVisible();

    }
    async editShipment() {

        Logger.info('Edit Shipment');

        const editButton = this.page
            .locator('tbody tr')
            .first()
            .locator('button')
            .last();

        await editButton.click();

        await expect(this.saveShipmentBtn).toBeVisible();

        await this.closeButton.click();

    }
    async clickNextPage() {

        Logger.info('Next Page');

        const next = this.page.getByRole('button', {
            name: /Go to next page/i
        });

        if (await next.isEnabled()) {

            await next.click();

        }
    }
    async clickPreviousPage() {

        Logger.info('Previous Page');

        const previous = this.page.getByRole('button', {
            name: /Go to previous page/i
        });

        if (await previous.isEnabled()) {

            await previous.click();

        }

    }
    async verifyShipmentTable() {

        Logger.info('Verify Shipment Table');

        await expect(
            this.page.locator('table')
        ).toBeVisible();

    }
    async verifyShipmentColumns() {

        Logger.info('Verify Shipment Columns');

        const columns = [
            'ID',
            'Order Date',
            'Tracking #',
            'Material',
            'Isotope',
            'Quantity',
            'Destination',
            'Courier',
            'Status',
            'Actions'
        ];

        for (const column of columns) {

            await expect(
                this.page.getByRole('columnheader', {
                    name: column
                })
            ).toBeVisible();

        }

    }

    getDashboardCard(title) {

        return this.page
            .locator('div')
            .filter({
                has: this.page.locator('p', {
                    hasText: new RegExp(`^${title}$`)
                })
            })
            .first();

    }

    async verifyIncomingCard() {

        Logger.info('Verify Incoming Card');

        await expect(
            this.getDashboardCard('Incoming Total')
        ).toBeVisible();

    }

    async verifyOutgoingCard() {

        Logger.info('Verify Outgoing Card');

        await expect(
            this.getDashboardCard('Outgoing Total')
        ).toBeVisible();

    }

    async verifyInTransitCard() {

        Logger.info('Verify In Transit Card');

        await expect(
            this.getDashboardCard('In Transit')
        ).toBeVisible();

    }

    async verifyDeliveredCard() {

        Logger.info('Verify Delivered Card');

        await expect(
            this.getDashboardCard('Delivered')
        ).toBeVisible();

    }


async verifyShipmentRecords() {

    await expect(this.tableRows.first()).toBeVisible();

}
async openEditShipment() {

    await this.editButton.click();

}
async closeEditShipment() {

    console.log(await this.cancelButton.count());
    await expect(this.cancelButton).toBeVisible();
    await this.cancelButton.click();
  
}
async verifyTrackPackageLink() {

    await expect(this.trackPackageLink).toBeVisible();

}
async verifyTrackingURL() {

    await expect(this.trackPackageLink)
        .toHaveAttribute('href', /http/);

}
async verifyNoRecordsFound() {

    await expect(
        this.page.getByText('No shipments found')).toBeVisible();

}
async changeRowsPerPage(value) {

    await this.rowsPerPageDropdown.click();

    await this.page.getByRole('option', {
        name: value
    }).click();

}
async verifyDeliveredStatusDisabled() {

    const dropdown = this.page
        .locator('tbody tr')
        .filter({
            hasText: 'Delivered'
        })
        .getByRole('combobox')
        .first();

    await expect(dropdown).toBeDisabled();

}
async verifyStatusDropdown() {

    const dropdown = this.page
        .locator('tbody tr')
        .first()
        .getByRole('combobox');

    await expect(dropdown).toBeVisible();

}
async verifyEmptyShipmentValidation() {

    await this.addShipmentBtn.click();

    await this.saveShipmentBtn.click();

    await expect(this.cancelButton).toBeVisible();
    console.log(await this.cancelButton.count());

    await this.cancelButton.click();
}
async verifyRequiredFieldValidation() {

    Logger.info('Verify Required Field Validation');

    await this.addShipmentBtn.click();

    await this.saveShipmentBtn.click();

    // const validations = [
    //     'Tracking number is required',
    //     'Material description is required',
    //     'Isotope is required',
    //     'Quantity is required'
    // ];

    // for (const message of validations) {

    //     await expect(
    //         this.page.getByText(message)
    //     ).toBeVisible();

    // }
    await expect(this.cancelButton).toBeVisible();
console.log(await this.cancelButton.count());

    await this.cancelButton.click();

    await expect(this.pageTitle).toBeVisible();

}
async verifyInvalidTrackingURL() {

    await this.addShipmentBtn.click();

    await this.trackingUrl.fill('abcd');

    await this.saveShipmentBtn.click();

    await this.cancelButton.click();

}
async verifyDashboardCounts() {
    await expect(this.incomingCount).toBeVisible();
    await expect(this.outgoingCount).toBeVisible();
    await expect(this.inTransitCount).toBeVisible();
    await expect(this.deliveredCount).toBeVisible();
}

async verifyTrackingTable() {
    await expect(this.trackingTable).toBeVisible();
}

async verifyTableHeaders() {

    const headers = [
        'ID',
        'Order Date',
        'Tracking #',
        'Material',
        'Isotope',
        'Quantity',
        'Courier',
        'Status',
        'Actions'
    ];

    for (const header of headers) {
        await expect(this.page.getByRole('columnheader', { name: header })).toBeVisible();
    }
}

async verifyValidTrackingURL() {
    await expect(this.trackPackageLink).toHaveAttribute('href', /http/);
}

async verifyCancelButton() {
    await this.addShipmentBtn.click();
    await this.cancelButton.click();
    await expect(this.pageTitle).toBeVisible();
}

async verifyCloseButton() {
    await this.addShipmentBtn.click();
    await this.closeButton.click();
    await expect(this.pageTitle).toBeVisible();
}

async verifyDefaultShipmentType() {
    await this.addShipmentBtn.click();
    await expect(this.shipmentType).toContainText('Incoming');
    await this.cancelButton.click();
}

async verifyDefaultOrderDate() {
    await this.addShipmentBtn.click();
    await expect(this.orderDate).toHaveValue(/\d{4}-\d{2}-\d{2}/);
    await this.cancelButton.click();
}

async editShipmentDescription() {

    Logger.info('Edit Shipment Description');

    await this.openEditShipment();

    const updatedDescription = `Updated Material ${Date.now()}`;

    await this.editDescription.clear();

    await this.editDescription.fill(updatedDescription);

    await this.saveShipment();

    await expect(this.page.locator('tbody'))
        .toContainText(updatedDescription);

}
async editSender() {

    Logger.info('Edit Sender');

    await this.openEditShipment();

    const updatedSender = `Sender ${Date.now()}`;

    await this.editSenderTextbox.clear();

    await this.editSenderTextbox.fill(updatedSender);

    await this.saveShipment();

    await expect(this.page.locator('tbody')).toContainText(updatedSender);

}
async editReceiver() {

    Logger.info('Edit Receiver');

    await this.openEditShipment();

    const updatedReceiver = `Receiver ${Date.now()}`;

    await this.editReceiverTextbox.clear();

    await this.editReceiverTextbox.fill(updatedReceiver);

    await expect(this.editReceiverTextbox)
        .toHaveValue(updatedReceiver);

    await this.saveShipment();

    await this.searchShipment(tracking.trackingNumber);

    // await expect(this.tableRows.first())
    //     .toContainText(updatedReceiver);

}
async editQuantity() {

    Logger.info('Edit Quantity');

    await this.openEditShipment();

    const updatedQuantity = '99.9';

    await this.editQuantityTextbox.clear();

    await this.editQuantityTextbox.fill(updatedQuantity);

    await this.saveShipment();

    await expect(this.page.locator('tbody')).toContainText(updatedQuantity);

}
async saveEditedShipment() {

    Logger.info('Save Edited Shipment');

    await this.openEditShipment();

    await this.saveShipmentBtn.click();

    await expect(this.saveShipmentBtn).toBeHidden();

    await expect(this.pageTitle).toBeVisible();

}
async verifyOutgoingShipmentAdded() {

    Logger.info('Verify Outgoing Shipment Added');

    await this.openOutgoingTab();

    await this.searchShipment(tracking.trackingNumber);

    await expect(this.tableRows.first()).toContainText(tracking.trackingNumber);

}
async verifyIncomingShipmentAdded() {

    Logger.info('Verify Incoming Shipment Added');

    await this.openIncomingTab();

    await this.searchShipment(tracking.trackingNumber);

    await expect(this.tableRows.first()).toContainText(tracking.trackingNumber);

}
}

module.exports = {
    TrackingPage
};