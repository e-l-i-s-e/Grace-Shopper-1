const db = require('../db')
const Sequelize = require ('sequelize')

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isEmpty: false
        }
    },
})

module.exports = Order