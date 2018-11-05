const db = require('../db')
const Sequelize = require ('sequelize')

const Review = db.define('review', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 50],
        },
    },
    numStars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
    },
})

module.exports = Review