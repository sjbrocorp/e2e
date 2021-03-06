Feature('Create Ticket Test @feature')
const expect = require('expect')
const blob = require('../../blobs/ticket')

Scenario('a signed in user can create a ticket', async (I) => {
  I.signIn()
  const ticket = await I.have('ticket', blob)
  expect(ticket.email).toEqual(blob.email)
  expect(ticket.name).toEqual(blob.name)
  expect(ticket.contact).toEqual(blob.contact)
  expect(ticket.telephone).toEqual(blob.telephone)
  expect(ticket.extension).toEqual(blob.extension)
  expect(ticket.description).toEqual(blob.description)
  expect(ticket.status).toEqual('Pending')
  expect(ticket.source).toEqual(blob.source)
  expect(ticket.productType).toEqual(blob.productType)
  expect(ticket.problemType).toEqual(blob.problemType)
  I.signOut()
})