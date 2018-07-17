Feature('Sign In Test @feature')

Before(async (I) => {
  // I.amPreparingDatabase()
})
After(async (I) => {
  // I.clearCookie()
})

Scenario('a user can sign in', (I) => {
  I.signIn()
})
Scenario('a user can sign out', (I) => {
  I.signIn()
  I.signOut()
})