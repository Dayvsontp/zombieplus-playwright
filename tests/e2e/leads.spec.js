// @ts-check
const { test, expect } = require('../support/');

const { faker } = require('@faker-js/faker');


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  await page.toast.containText(
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

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  await page.toast.containText(
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.")
});

test('deve cadastrar um email incorreto', async ({ page }) => {
 
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Dayvson Tavares', 'dayvsontp.hotmail.com')
  await page.alerta.haveText('.alert', 'Email incorreto')

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'dayvsontp@hotmail.com')
  await page.alerta.haveText('.alert', 'Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Dayvson Tavare', '')
  await page.alerta.haveText('.alert', 'Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')
  await page.alerta.haveText('.alert', ['Campo obrigatório', 'Campo obrigatório'])

});