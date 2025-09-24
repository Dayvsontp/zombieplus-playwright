const { test, expect } = require('../support/');

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database');


test('deve cadastrar um novo filme', async ({ page }) => {

    const movie = data.create
    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.containText('#swal2-html-container',
    "foi adicionado ao catálogo.")
})

test('deve remover um filme', async ({ page, request }) => {

    const movie = data.del
    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

    await request.api.createMovie(movie)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.delete(movie.title)
})

test('não deve cadastrar quando o titulo for duplicado', async ({ page, request }) => {

    const movie = data.duplicate
    await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)
    
    await request.api.createMovie(movie)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.containText('#swal2-html-container',
    "já consta em nosso catálogo.")

})

test('não deve cadastrar um novo filme sem preencher os campos obrigatorios', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()
    await page.movies.submit()
    const text = ['Campo obrigatório', 'Campo obrigatório',
         'Campo obrigatório', 'Campo obrigatório']
    await page.alerta.haveText('.alert', text)

})