Feature('Create Ticket Test @acceptance')
const blob = require('../blobs/ticket')

Before(async (I) => {
  const token = await I.signIn()
  I.amOnPage('/')
  I.setCookie({ name: 'jwt-token', value: token })
})

After(async (I) => {
  I.signOut()
})

Scenario('a user can create a ticket', async (I) => {
  I.amOnPage('/#!/tickets')
  I.waitForVisible('.tickets', 20)
  I.dontSeeElement('.create-ticket')
  I.click('New Ticket')
  within('.create-ticket', () => {
    I.fillField('email', blob.email)
    I.fillField('name', blob.name)
    I.fillField('contact', blob.contact)
    I.fillField('telephone', blob.telephone)
    I.fillField('extension', blob.extension)
    I.fillField('description', blob.description)
  })
  I.click('Submit Ticket')
  I.waitForInvisible('.create-ticket')
  I.seeInCurrentUrl('/#!/tickets')
  I.see(blob.email)
  I.see(blob.name)
})