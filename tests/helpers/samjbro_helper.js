const requireg = require('requireg');
const unirest = requireg('unirest');
const expect = require('expect')

class SamJBro extends Helper {

  _before () {
    this.helpers['ApiDataFactory']._requestCreate = function (factory, data) {
      const method = Object.keys(this.factories[factory].create)[0];
      let url = this.factories[factory].create[method];
// change this to grab interior of '{}'
      url = url.split('$').map(str => data[str] || str).join('')
      const request = unirest[method](this.restHelper._url(url)).type('json').send(data);

      return this.restHelper._executeRequest(request).then((resp) => {
        if (resp.body.exception) {
          throw new Error(`${resp.body.exception} - ${resp.body.message}`)
        }
        const id = this._fetchId(resp.body, factory);
        this.created[factory].push(id);
        return resp.body;
      });
    }

    const recorder = require('codeceptjs').recorder
    recorder.retry({
      retries: 40,
      minTimeout: 3000,
      when: err => {
        return err.message.indexOf('Docker not ready') > -1
      }
    })
    this.amPreparingDatabase()

  }

  _after() {
    this.helpers['Nightmare'].clearCookie()

  }

  signIn () {
    const defaultUser = {
      email: 'test@admin.com',
      password: 'secret'
    }
    let rest = this.helpers['REST']
    return new Promise((resolve, reject) => {
      rest.sendPostRequest('/me', defaultUser).then(response => {
        expect(response.body.access_token).not.toBe(undefined)
        rest.haveRequestHeaders({ Authorization: `Bearer ${response.body.access_token}` })
        resolve(response.body.access_token)
      }).catch(error => {
        reject(error)
      })
    })
  }

  signOut () {
    let rest = this.helpers['REST']
    return rest.sendDeleteRequest('/me').then(response => {
      expect(response.body.message).toBe('Successfully logged out')
    })
  }

  amPreparingDatabase (seed = true) {
    let rest = this.helpers['REST']
    return rest.sendPostRequest('/data', {seed}).then(response => {
      if (response.error) {
        throw new Error('Docker not ready')
      }
    }).catch(error => {
      console.log({ error })
    })
  }

}




module.exports = SamJBro;
