import {  test } from '../support/';

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database');   
import { Loginpage } from '../pages/Loginpage';
import { Alert } from '../pages/Components';
import { Toast } from '../pages/Components';
import { Moviespage } from '../pages/Moviespage';
import { create } from 'domain';

let loginpage
let alerta
let toast
let movies


test.beforeEach(async ({page}) => {

    loginpage = new Loginpage(page)
    alerta = new Alert(page)
    toast = new Toast(page)
    movies = new Moviespage(page)

})

test('deve cadastrar um novo filme', async ({page, request}) =>{

    
    const movie =  data.create

    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)


    await loginpage.visit()
    await loginpage.submit('admin@zombieplus.com', 'pwd123')
    await loginpage.areaLogada()

    await movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await toast.containText('Cadastro realizado com sucesso!')

    
})