import { HttpStatus } from '../structures/route.mjs'

export function sayHello (req, res) {
    return res.status(HttpStatus.OK).json('Hello World 👋')
}
