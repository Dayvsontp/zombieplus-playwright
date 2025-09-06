const { test: base, expect } = require('@playwright/test')

const { Loginpage } = require('../pages/Loginpage');
const { Alert, Toast } = require ('../pages/Components');
const { Moviespage } = require('../pages/Moviespage');
const { Landingpage } = require('../pages/Landingpage');


const test = base.extend({
    page: async({page}, use) =>{

        const context = page

        context['landing'] = new Landingpage(page)
        context['login'] = new Loginpage(page)
        context['movies'] = new Moviespage(page)
        context['toast'] = new Toast(page)
        context['alerta'] = new Alert(page)

        await use(context)
    }
})

export{ test, expect }

