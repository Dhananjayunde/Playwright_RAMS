class ReceivingLogPage {

    constructor(page) {

        this.page = page;

        // Left menu
        this.receivingLogMenu =
            page.locator('aside').getByText('Receiving Log', { exact: true });
        
         // Buttons
        
        this.logReceiptBtn =
            page.getByRole('button', { name: /\+ Log Receipt/i });
            
        this.continueESignBtn = page.getByText('Continue to E-Signature', { exact: true });
            
        // Password
        this.password =
            this.page.getByPlaceholder('Enter your account password');
    }
    
    async fillReceivingEntry() {
   
        
        await this.receivingLogMenu.click();
        await this.page.waitForLoadState('networkidle');
    
        await this.logReceiptBtn.click();
       
        await this.page.waitForLoadState('networkidle');
     //isotop selection
        await this.page.getByRole('combobox', { name: 'Select isotope' }).click();
        await this.page.getByRole('option', { name: 'Ag-111 — Silver' }).click();
     //vendor selection
     
      await this.page.getByRole('combobox', { name: 'Select manufacturer' }).click();
      await this.page.getByRole('option', { name: 'Cardinal Health' }).click();
     //Timezone selection
     
       await this.page.getByRole('combobox', { name: 'ET — Eastern Time' }).click();
       await this.page.getByRole('option', { name: 'ET — Eastern Time' }).first().click();
    
    //date selection   
        await this.page.locator(
            'input[name="receiveDate"]'
        ).fill('2026-06-24');

        await this.page.locator(
            'input[name="refDate"]'
        ).fill('2026-06-24T15:32');

        await this.page.locator(
            'input[name="calibDate"]'
        ).fill('2026-06-24T15:32');

        // Lot Numbers

        await this.page.getByRole(
            'textbox',
            {
                name: 'e.g. INT12345'
            }
        ).fill('IN12345');

        await this.page.getByRole(
            'textbox',
            {
                name: 'e.g. EXT67890'
            }
        ).fill('EXT6789');

        // Quantity

        await this.page.locator(
            'input[name="qty"]'
        ).fill('0.9');
        // Storage Location

  await this.page.getByRole('combobox', { name: 'Select storage location' }).click();
  await this.page.getByRole('option', { name: 'Testing' }).click();
        // Concentration

        await this.page.getByRole(
            'textbox',
            {
                name: 'e.g. 50 mCi/mL'
            }
        ).fill('50');

        // Reference Activity

        await this.page.getByPlaceholder('e.g. 2450 MBq').fill('2450');

        // Radiation Survey

        await this.page.locator('input[name="surface"]').fill('1');

        await this.page.locator('input[name="t1"]').fill('1');

        await this.page.locator('input[name="insideWipe"]').fill('1');
      
        await this.page.locator('input[name="wipeBG"]').fill('1');
        await this.page.getByPlaceholder('e.g. 0.1').fill('1');


        // Serial Number
        await this.page.getByPlaceholder('Enter serial number').fill('SN12345');
        await this.page.locator('input[name="outsideWipe"]').fill('1');
        // Notes
        await this.page.getByPlaceholder('Enter package notes, descriptions or exceptions...').fill('Sample notes');
        
        
  }

    async continueESign(password) {
        await this.continueESignBtn.click();
        await this.page.waitForLoadState('networkidle');
        
        await this.password.fill(password);
                await this.page.getByRole('button', { name: 'Sign & Commit' }).click();
               await this.page.getByLabel('Close').click();
  await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
    
}

module.exports = {
    ReceivingLogPage
};