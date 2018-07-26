Feature('Sign In Test @acceptance')

Scenario('an unauthenticated user is shown the login page', async (I) => {
  I.amOnPage('/')
  I.seeElement('.app__login')
  I.dontSeeElement('.app__main')
  I.amOnPage('/#!/some_url')
  I.seeElement('.app__login')
  I.dontSeeElement('.app__main')
})

Scenario('a user can log in using the login page', (I) => {
  I.amOnPage('/')
  I.fillField('email', 'test@admin.com')
  I.fillField('password', 'secret')
  I.click('Login')
  I.waitForVisible('.app__main', 20)
  I.dontSeeElement('.app__login')
})