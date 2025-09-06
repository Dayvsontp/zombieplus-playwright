
import { test } from '../support';


test('deve logar como administrador', async ({page}) =>{

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.areaLogada()
})

test('não deve logar com senha incorreta', async ({page}) =>{
    const text = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'wd123')
    await page.toast.containText(text)
    
})

test('não deve logar com email incorreto', async ({page}) =>{
    await page.login.visit()
    await page.login.submit('teeste.zombieplus.com', 'wd123')
    await page.alerta.haveText('.email-alert', 'Email incorreto')
    
})

test('não deve logar sem email', async ({page}) =>{

    await page.login.visit()
    await page.login.submit('', 'pwd123')
    await page.alerta.haveText('.email-alert', 'Campo obrigatório')
})

test('não deve logar sem a senha', async ({page}) =>{

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    await page.alerta.haveText('.password-alert', 'Campo obrigatório')
})

test('não deve logar sem o email e senha', async ({page}) =>{

    await page.login.visit()
    await page.login.submit('', '')
    await page.alerta.haveText('.email-alert', 'Campo obrigatório')
    await page.alerta.haveText('.password-alert', 'Campo obrigatório')
})