import recover from '#handlers/files.handler.mjs'
import { AsciiTable3 } from 'ascii-table3'
import { Model } from '#structs/model.mjs'

export default async function registerModels (sequelize) {
    const files = recover('./database/models', true)
    const table = new AsciiTable3('Models')

    if (files.length === 0) {
        table.addRow('No data!')
        return console.log(table.toString().slice(0, -1))
    }

    let models = []
    const later = []

    for (const file of files) {
        if (file === 'register.mjs') continue

        try {
            let model = await import(`#models/${file}`)
            model = model.default

            if (model.loadLater) later.push(model)
            else models.push(model)
        } catch (e) {
            table.addRow(`"${file}"`, 0, '🔸', e.message)
        }
    }

    models = [...models, ...later]
    if (models.length === 0) {
        table.addRow('Nah!')
        return console.log(table.toString().slice(0, -1))
    }
    models.forEach(model => {
        registerModel(sequelize, model)
        table.addRow(model.name, model.foreignKeys.length, '🔹', '')
    })
    models.forEach(model => model.foreignKeys.forEach(fk => registerForeignKey(fk)))

    table.setHeading('Name', 'Fk count', 'Status', 'Error')
    console.log(table.toString().slice(0, -1))
}

export function registerModel (sequelize, model) {
    if (!model || !(model instanceof Model)) throw new Error(`Unable to load an undefined model!`)
    sequelize.define(model.name, model.attributes, model.options)
}

export function registerForeignKey (foreignKey) {
    const { source, target, options } = foreignKey

    if (!source || !target) throw new Error(`Can't load a foreign key without a source and a target!`)

    switch (foreignKey.method) {
        case 0:
            source.hasOne(target, options)
            break
        case 1:
            source.hasMany(target, options)
            break
        case 2:
            source.belongsTo(target, options)
            break
        case 3:
            source.belongsToMany(target, options)
            break
        default:
            throw new Error(`Invalid foreign key constraint method!`)
    }
}
