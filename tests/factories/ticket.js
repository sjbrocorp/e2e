var Factory = require('rosie').Factory
var faker = require('faker')

module.exports = new Factory()
  .attr('email', () => faker.internet.email())
  .attr('name', () => faker.name.findName())
  .attr('contact', () => faker.name.findName())
  .attr('telephone', () => faker.phone.phoneNumber())
  .attr('extension', () => `+00`)
  .attr('description', () => faker.lorem.paragraph())