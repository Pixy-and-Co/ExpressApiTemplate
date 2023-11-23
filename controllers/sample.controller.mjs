import { HttpStatus } from '#structs/route.mjs'

export function sayHello (req, res) {
    return res.status(HttpStatus.OK).json('Hello World 👋')
}
