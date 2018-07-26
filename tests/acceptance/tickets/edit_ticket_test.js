Feature('Edit Ticket Test @acceptance')
const blob = require('../../blobs/ticket')

Before(async (I) => {
  const token = await I.signIn()
  I.amOnPage('/')
  I.setCookie({ name: 'jwt-token', value: token })
})

After(async (I) => {
  I.signOut()
})

Scenario('a user can set the status on a ticket', async (I) => {
  const ticket = await I.have('ticket', blob)
  const status = 'Investigating'
  I.amOnPage(`#!/tickets/${ticket.id}/edit`)
  I.waitForVisible('.edit-ticket', 20)
  I.selectOption('Status', status)
  I.click('Update')
  I.waitForInvisible('.edit-ticket', 20)
  I.seeInCurrentUrl('/#!/tickets')
  I.see(status)
})
