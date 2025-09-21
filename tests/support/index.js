const { test: base, expect } = require('@playwright/test')

const { Login } = require('./actions/Login');
const { Alert, Toast } = require('./actions/Components');
const { Movies } = require('./actions/Movies');
const { Leads } = require('./actions/Leads');

const { API } = require('./api/');


const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)
        context['alerta'] = new Alert(page)

        await use(context)
    },
    request: async ({ request }, use) => {

        const context = request

        context['api'] = new API(request)
        // chamando o setToken para já iniciar com o token sem precisar chamar toda hora
        await context['api'].setToken()

        await use(context)
    }
})

export { test, expect }

