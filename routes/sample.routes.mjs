import { Route, HttpMethod } from '#structs/route.mjs'
import { sayHello } from '#controllers/sample.controller.mjs'

export default new Route(HttpMethod.GET, '/', [], sayHello)
