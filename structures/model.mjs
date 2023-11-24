export class Model {
    name
    attributes
    options
    foreignKeys
    loadLater

    constructor (name, attributes, options, foreignKeys = [], loadLater = false) {
        this.name = name
        this.attributes = attributes
        this.options = options
        this.foreignKeys = foreignKeys
        this.loadLater = loadLater
    }
}

export class ForeignKey {
    method
    source
    target
    options

    constructor (method, source, target, options) {
        this.method = method
        this.source = source
        this.target = target
        this.options = options
    }
}

export class FkConstraintMethod {
    static HAS_ONE = 0
    static HAS_MANY = 1
    static BELONGS_TO = 2
    static BELONGS_TO_MANY = 3
}
