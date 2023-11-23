import { Route, HttpMethod } from '../structures/route.mjs'
import { sayHello } from '../controllers/sample.controller.mjs'

export default new Route(HttpMethod.GET, '/', [], sayHello)
