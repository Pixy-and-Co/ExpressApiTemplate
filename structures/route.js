class HttpMethod {
    static GET = 'get'
    static POST = 'post'
    static PUT = 'put'
    static DELETE = 'delete'
}

class Route {
    method
    path
    middlewares
    callback

    constructor (method, path, middlewares, callback) {
        this.method = method
        this.path = path
        this.middlewares = middlewares
        this.callback = callback
    }
}

class HttpStatus {
    static OK = 200
    static CREATED = 201
    static ACCEPTED = 202
    static NO_CONTENT = 204
    static PARTIAL_CONTENT = 206
    // Client error
    static BAD_REQUEST = 400
    static UNAUTHORIZED = 401
    static FORBIDDEN = 403
    static NOT_FOUND = 404
    static CONFLICT = 409
    // Server error
    static INTERNAL_ERROR = 500
}

module.exports = {
    HttpMethod,
    HttpStatus,
    Route
}
