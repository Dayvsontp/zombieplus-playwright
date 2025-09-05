import { expect } from '@playwright/test';

export class Toast {

    constructor(page) {
        this.page = page
    }

    async containText(msg) {
        // Tive que fazer isso...
        // await page.getByText('seus dados conosco').click()
        // const content = await page.content()
        // console.log(content)

        //pra validar o toast
        // const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipeentrará em contato!'
        // await expect(page.locator('.toast')).toHaveText(message)

        const toast = this.page.locator('.toast');

        // espera o toast aparecer
        await expect(toast).toContainText(msg);
        await expect(toast).not.toBeVisible({ timeout: 5000 })

    }

}

export class Alert {

    constructor(page) {
        this.page = page
    }

    async haveText(prop, textAlert) {

        await expect(this.page.locator(prop)).toHaveText(textAlert)

    }

}