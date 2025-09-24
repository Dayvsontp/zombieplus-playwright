
const { test, expect } = require('../support/');
const { executeSQL } = require('../support/database');
const { faker } = require('@faker-js/faker');

test.beforeAll(async () => {
  await executeSQL('DELETE FROM public.leads;')
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  await page.popup.containText('#swal2-html-container',
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.")
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

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  await page.popup.containText('#swal2-html-container',
    "Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.")
});

test('deve cadastrar um email incorreto', async ({ page }) => {
 
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Dayvson Tavares', 'dayvsontp.hotmail.com')
  await page.alerta.haveText('.alert', 'Email incorreto')

});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'dayvsontp@hotmail.com')
  await page.alerta.haveText('.alert', 'Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Dayvson Tavare', '')
  await page.alerta.haveText('.alert', 'Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')
  await page.alerta.haveText('.alert', ['Campo obrigatório', 'Campo obrigatório'])

});