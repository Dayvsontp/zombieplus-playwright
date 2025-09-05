
import { expect, test } from '../support';
import { Loginpage } from '../pages/Loginpage';
import { Alert } from '../pages/Components';
import { Toast } from '../pages/Components';

let loginpage
let alerta
let toast


test.beforeEach(async ({page}) => {

    loginpage = new Loginpage(page)
    alerta = new Alert(page)
    toast = new Toast(page)

})

test('deve logar como administrador', async ({page}) =>{

    await loginpage.visit()
    await loginpage.submit('admin@zombieplus.com', 'pwd123')
    await loginpage.areaLogada()
})

test('não deve logar com senha incorreta', async ({page}) =>{
    const text = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await loginpage.visit()
    await loginpage.submit('admin@zombieplus.com', 'wd123')
    await toast.containText(text)
    
})

test('não deve logar com email incorreto', async ({page}) =>{
    await loginpage.visit()
    await loginpage.submit('teeste.zombieplus.com', 'wd123')
    await alerta.haveText('.email-alert', 'Email incorreto')
    
})

test('não deve logar sem email', async ({page}) =>{

    await loginpage.visit()
    await loginpage.submit('', 'pwd123')
    await alerta.haveText('.email-alert', 'Campo obrigatório')
})

test('não deve logar sem a senha', async ({page}) =>{

    await loginpage.visit()
    await loginpage.submit('admin@zombieplus.com', '')
    await alerta.haveText('.password-alert', 'Campo obrigatório')
})

test('não deve logar sem o email e senha', async ({page}) =>{

    await loginpage.visit()
    await loginpage.submit('', '')
    await alerta.haveText('.email-alert', 'Campo obrigatório')
    await alerta.haveText('.password-alert', 'Campo obrigatório')
})