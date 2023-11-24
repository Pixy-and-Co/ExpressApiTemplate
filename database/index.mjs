import { Sequelize } from 'sequelize'
import registerModels from '#models/register.mjs'

export function createORM () {
    const dialect = process.env.DB_DIALECT?.toLowerCase() || 'sqlite'

    switch (dialect) {
        case 'sqlite':
            return new Sequelize({
                dialect,
                storage: process.env.DB_FILE || 'database.db',
                logging: false
            })
        case 'mariadb': case 'mysql':
            return new Sequelize(process.env.DB_BASE_NAME, process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306'),
                dialect,
                logging: false
            })
        default:
            throw new Error(`Can't load a database without a correct dialect!`)
    }
}

let sequelize
try {
    sequelize = createORM()
} catch (e) {
    console.log(e.message)
}

export default async function initDatabase () {
    if (!sequelize) return console.log('> No database to load!')
    await registerModels(sequelize)

    try {
        await sequelize.sync({ force: process.env.NODE_ENV === 'development' })
        // TODO: seed?
        console.log('> Database synced!')
    } catch (e) {
        console.log(e)
    }
}
