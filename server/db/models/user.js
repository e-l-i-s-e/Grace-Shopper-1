const db = require('../db')
const Sequelize = require ('sequelize')

const User = db.define('user', {
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
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
        notEmpty: true,
        isEmail: true,
      }
    },
})

module.exports = User


User.prototype.correctPassword = function(candidatePwd) {
  if ( candidatePwd === this.password) {
    return true
  }

  // when we add Oauth we need the code below:
  //  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

//   salt: {
//     type: Sequelize.STRING,
//     // Making `.salt` act like a function hides it when serializing to JSON.
//     // This is a hack to get around Sequelize's lack of a "private" option.
//     get() {
//       return () => this.getDataValue('salt')
//     }
//   },
//   googleId: {
//     type: Sequelize.STRING
//   }
// })
