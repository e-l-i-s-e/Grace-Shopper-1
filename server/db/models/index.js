// const db = require('../db')
const User = require('./user')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
const Product = require('./product')
const Review = require('./review')
const Category = require('./category')

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})


User.belongsToMany(Product, {through: Review})
Product.belongsToMany(User, {through: Review})

Category.belongsToMany(Product, {through: 'categoryProduct'})
Product.belongsToMany(Category, {through: 'categoryProduct'})

User.hasMany(Order)
Order.belongsTo(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
 User, Order, OrderProduct, Product, Review, Category
}
