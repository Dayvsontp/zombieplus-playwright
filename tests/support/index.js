const { test: base, expect } = require('@playwright/test')

import { Loginpage } from '../pages/Loginpage';
import { Alert, Toast } from '../pages/Components';
const { Moviespage } = require('../pages/Moviespage');
import { Landingpage } from '../pages/Landingpage';


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

