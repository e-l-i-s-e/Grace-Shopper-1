const db = require('../db')
const Sequelize = require ('sequelize')

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    promo: {
      type: Sequelize.STRING,
      defaultValue: 'none'
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    status: {
        type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
    }
})

module.exports = Order
