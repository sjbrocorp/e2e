Feature('Create Ticket Test @acceptance')

Before(async (I) => {
  const token = await I.signIn()
  I.amOnPage('/')
  I.setCookie({ name: 'jwt-token', value: token })
})

After(async (I) => {
  I.signOut()
})

Scenario('a user can create a ticket', async (I) => {
  const data = {
    email: 'test@email.com',
    name: 'Test User',
    contact: 'Test Contact',
    telephone: '01234567890',
    extension: '+00',
    description: 'This is a test ticket.'
  }
  I.refreshPage()
  I.amOnPage('/#!/tickets')
  I.waitForVisible('.tickets', 20)
  I.dontSeeElement('.create-ticket')
  I.click('New Ticket')
  within('.create-ticket', () => {
    I.fillField('email', data.email)
    I.fillField('name', data.name)
    I.fillField('contact', data.contact)
    I.fillField('telephone', data.telephone)
    I.fillField('extension', data.extension)
    I.fillField('description', data.description)
  })
  I.click('Submit Ticket')
  I.waitForInvisible('.create-ticket')
  I.seeInCurrentUrl('/#!/tickets')
  I.see(data.email)
  I.see(data.name)
})