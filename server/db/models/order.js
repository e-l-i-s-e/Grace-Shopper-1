const db = require('../db')
const Sequelize = require ('sequelize')

const Order = db.define('order', {
    total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            isEmpty: false
        }
    },
})

module.exports = Order