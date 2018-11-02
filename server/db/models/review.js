const db = require('../db')
const Sequelize = require ('sequelize')

const Review = db.define('review', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 50],
        }
    },
})

module.exports = Review