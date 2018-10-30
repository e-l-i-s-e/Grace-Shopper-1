const db = require('../db')
const Sequelize = require ('sequelize')

const OrderProduct = db.define('orderProduct', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            isEmpty: false
        }
    },
})

module.exports = OrderProduct