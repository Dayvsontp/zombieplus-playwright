const { test: base } = require('@playwright/test')

import { Loginpage } from '../pages/Loginpage';
import { Toast } from '../pages/Components';
import { Moviespage } from '../pages/Moviespage';
import { Landingpage } from '../pages/Landingpage';

let landinpage
let loginpage
let alerta
let toast
let movies


const test = base.extend({
    page: async({page}, use) =>{
        await use({
            ...page,
            landinpage: new Landingpage(page),
            login: new Loginpage(page),
            movies: new Moviespage(page),
            toast: new Toast(page)

        })
    }
})

export{ test }

