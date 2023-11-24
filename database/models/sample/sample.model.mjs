import { Model } from '#structs/model.mjs'
import { DataTypes } from 'sequelize'

export default new Model('sample', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
})
