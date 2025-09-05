// @ts-check
import { test, expect } from '@playwright/test'
import { Landingpage } from '../pages/Landingpage'
import { Toast } from '../pages/Components'
import { Alert } from '../pages/Components'
import { faker } from '@faker-js/faker'

let landinpage
let toast
let alerta

test.beforeEach(async ({page}) => {

  landinpage = new Landingpage(page)
  toast = new Toast(page)
  alerta = new Alert(page)

})


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

  await landinpage.visit()
  await landinpage.openLeadModal()
  await landinpage.submitLeadForm(leadName, leadEmail)
  await toast.containText(
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!")
});

test('não deve cadastrar quando um email já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

  const reqLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(reqLead.ok()).toBeTruthy()

  await landinpage.visit()
  await landinpage.openLeadModal()
  await landinpage.submitLeadForm(leadName, leadEmail)
  await toast.containText(
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.")
});

test('deve cadastrar um email incorreto', async ({ page }) => {
 
  await landinpage.visit()
  await landinpage.openLeadModal()
  await landinpage.submitLeadForm('Dayvson Tavares', 'dayvsontp.hotmail.com')
  await alerta.haveText('.alert', 'Email incorreto')

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  
  await landinpage.visit()
  await landinpage.openLeadModal()
  await landinpage.submitLeadForm('', 'dayvsontp@hotmail.com')
  await alerta.haveText('.alert', 'Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  
  await landinpage.visit()
  await landinpage.openLeadModal()
  await landinpage.submitLeadForm('Dayvson Tavare', '')
  await alerta.haveText('.alert', 'Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  
  await landinpage.visit()
  await landinpage.openLeadModal()
  await landinpage.submitLeadForm('', '')
  await alerta.haveText('.alert', ['Campo obrigatório', 'Campo obrigatório'])

});