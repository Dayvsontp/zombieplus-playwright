
import { expect } from '@playwright/test';
export class Loginpage {

    constructor(page) {
        this.page = page
    }

    async visit() {

        await this.page.goto('http://localhost:3000/admin/login')

        const form = this.page.locator('.login-form')
        await expect(form).toBeVisible()

    }

    async submit(email, senha){

        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(senha)

        await this.page.getByText('Entrar').click()

    }

    async areaLogada(){

        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }


}