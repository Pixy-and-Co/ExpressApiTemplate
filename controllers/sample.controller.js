const { HttpStatus } = require('../structures/route')

function sayHello (req, res) {
    return res.status(HttpStatus.OK).json('Hello World 👋')
}

module.exports = {
    sayHello
}
