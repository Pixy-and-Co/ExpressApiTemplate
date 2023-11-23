const { Route, HttpMethod } = require('../structures/route')
const { sayHello } = require('../controllers/sample.controller')

module.exports = new Route(HttpMethod.GET, '/', [], sayHello)
