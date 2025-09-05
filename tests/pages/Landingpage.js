
import { expect } from '@playwright/test';
export class Landingpage {

    constructor(page) {
        this.page = page
    }

    async visit() {

        await this.page.goto('http://localhost:3000/')

    }

    async openLeadModal() {

        //openLeadModal
        //await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click()
        // ou
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        // ou
        // await page.click('//button[text()="Aperte o play... se tiver coragem"]')

        //Realizando um CheckPoint para garantir.
        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')

    }

    async submitLeadForm(name, email) {

        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)

        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click()

    }

    
}