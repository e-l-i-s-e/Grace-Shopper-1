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
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
    }
})

module.exports = Order