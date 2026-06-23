class IsotopePage {

    constructor(page) {

        this.page = page;

        this.isotopeDatabaseModule =
            page.locator('//*[@id="root"]/div/div/aside/div[2]/div[2]/div[2]/div/div/div[1]/p');
        
        this.addIsotopeBtn =
            page.getByRole('button', {
                name: 'Add isotope'
            });

        this.saveBtn =
            page.getByRole('button', {
                name: 'Save Isotope'
            });
    }

    async addIsotope() {
        await this.isotopeDatabaseModule.click();
        
        await this.addIsotopeBtn.click();

        await this.page.getByRole('textbox', {
            name: 'e.g. Lu-177',
            exact: true
        }).fill('Lu-77');

        await this.page.getByRole('textbox', {
            name: 'e.g. Lutetium-'
        }).fill('Lu-77');

        await this.page.getByRole('textbox', {
            name: '177',
            exact: true
        }).fill('77');

        await this.page.getByRole('textbox', {
            name: 'e.g. 6.647d'
        }).fill('7.7');

        await this.page.getByRole('textbox', {
            name: '159.5'
        }).fill('177.7');

        await this.page.getByRole('textbox', {
            name: 'e.g. β⁻ → Hf-'
        }).fill('Hf-77');

        await this.page.getByRole('combobox', {
            name: 'Diagnostic'
        }).click();

        await this.page.getByRole('option', {
            name: 'Therapeutic'
        }).click();

        await this.saveBtn.click();
    }
}

module.exports = { IsotopePage };