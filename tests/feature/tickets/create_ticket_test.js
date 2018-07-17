Feature('Create Ticket Test @feature')
const expect = require('expect')

Before(async (I) => {
  // I.amPreparingDatabase()
})
After(async (I) => {
  // I.clearCookie()
})

Scenario('a signed in user can create a ticket', async (I) => {
  I.signIn()
  const data = {
    email: 'test@email.com',
    name: 'Test User',
    contact: 'Test Contact',
    telephone: '01234567890',
    extension: '+00',
    description: 'This is a test ticket.'
  }
  const ticket = await I.have('ticket', data)
  expect(ticket.email).toEqual(data.email)
  expect(ticket.name).toEqual(data.name)
  expect(ticket.contact).toEqual(data.contact)
  expect(ticket.telephone).toEqual(data.telephone)
  expect(ticket.extension).toEqual(data.extension)
  expect(ticket.description).toEqual(data.description)
  I.signOut()
})