export class Model {
    name
    attributes
    options
    foreignKeys

    constructor (name, attributes, options, foreignKeys) {
        this.name = name
        this.attributes = attributes
        this.options = options
        this.foreignKeys = foreignKeys
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
