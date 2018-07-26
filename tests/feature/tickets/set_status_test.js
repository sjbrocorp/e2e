Feature('Set Status Test @feature')
const blob = require('../../blobs/ticket')
const expect = require('expect')

Before(async (I) => {
  I.signIn()
})

After(async (I) => {
  I.signOut()
})

Scenario('a created ticket has the default status even if a status is submitted', async (I) => {
  blob.status = 'Hello World'
  const ticket = await I.have('ticket', blob)
  expect(ticket.status).toEqual('Pending')
})
Scenario('a signed in user can set the status on a ticket', async (I) => {
  const ticket = await I.have('ticket', blob)
  const status = 'Investigating'
  await I.sendPutRequest(`/tickets/${ticket.id}`, { status })
  const response = await I.sendGetRequest(`/tickets/${ticket.id}`)
  expect(response.body.status).toEqual(status)
})