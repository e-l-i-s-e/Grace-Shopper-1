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

module.exports = {
 User, Order, OrderProduct, Product, Review, Category
}
