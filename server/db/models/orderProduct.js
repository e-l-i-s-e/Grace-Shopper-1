const db = require('../db')
const Sequelize = require ('sequelize')

const OrderProduct = db.define('orderProduct', {
    quantity: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmpty: false
        }
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmpty: false
        }
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        // get() {
        //     return () => this.getDataValue('password')
        // }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
          isEmail: true,
          isEmpty: false
      }
    },
})

module.exports = OrderProduct