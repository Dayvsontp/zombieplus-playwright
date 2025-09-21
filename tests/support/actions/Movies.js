
import { expect } from '@playwright/test';
export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm(){
        await this.page.locator('a[href$=register]').click()
    }
    async submit(){
        //acha o elemento pelo nome
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async create(movie) {

        await this.goForm()
            //pega pelo nome de cima do campo, se houver label no html
        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)
            //pega pelo cssSelector, no caso abaixo combinando o ID(Pai) com a classe do filho
        await this.page.locator('#select_company_id .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year })
            .click()
        
        await this.page.locator('input[type="file"]').setInputFiles('tests/support/fixtures'  + movie.cover)

        if (movie.featured){
            await this.page.locator('.featured .react-switch').click()
        }
        await this.submit()       

    }

}