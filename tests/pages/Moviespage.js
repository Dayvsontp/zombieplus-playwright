
import { expect } from '@playwright/test';
export class Moviespage {

    constructor(page) {
        this.page = page
    }

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href$=register]').click()
            //pega pelo nome de cima do campo, se houver label no html
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)
            //pega pelo cssSelector, no caso abaixo combinando o ID(Pai) com a classe do filho
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click()

            //acha o elemento pelo nome
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()

        
    }




}