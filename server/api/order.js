const router = require('express').Router()
const Sequelize = require ('sequelize')
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/history/:userId', async(req, res, next) => {
    try{
        const orders = await Order.findAll({
            where: {
                isCart: false,
                userId: req.params.userId
            }, include: [ { model: Product } ]
        })
        // need to explore how to get quantity from orderProduct table
        res.json(orders)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})
// api route to get cart items or intialize an empty cart
router.get('/:userId', async(req, res, next) => {
    try{
       const orders =  await Order.findOrCreate({
           where: {
               userId : req.params.userId,
               isCart: true,
            },
            include: [ { model: Product } ],
            defaults: { total: 0, status: 'Created' }
       })
        res.json(orders[0])
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

// add an item to the cart - the req.body contains
// order id, user.id , porduct id and comments
router.post('/', async(req, res, next) => {
    try{

       const response = await OrderProduct.find({
            where: {
               orderId: req.body.orderId,
               productId: req.body.productId 
            }
        })
        if (!response){
            // if 0 quantity of the product has not yet been placed
            // create a new row in orderProduct with the product
            // and update the orders price
            const newRow = await OrderProduct.create(req.body)
            const quantity=newRow.quantity
            const newProdId = newRow.productId
            const { price } = await Product.findById(newProdId)
            //updating the price in the order
            await Order.update({total: Sequelize.literal(`total + ${quantity * price}`) },{
                where: {id: req.body.orderId} 
            })
            res.json({
                product: newRow.dataValues,
                isCreate: true
            })
        } else {
            // if the product already exists in our cart
            // then update the instance with new quantity 
            // and update the orders price
            const currQuantity = response.quantity
            const newRow = await response.update({
                quantity: currQuantity + req.body.quantity
            },{
                returning: true,
            })
            const quantity = currQuantity
            const { price } = await Product.findById(req.body.productId)
            //updating the price in the order
            await Order.update({total: Sequelize.literal(`total + (${req.body.quantity * price})`) },{
                where: {id: req.body.orderId} 
            })
            res.json({
                product: newRow.dataValues,
                isCreate: true
            })
        } 
    }
    catch(err){
        console.error(err)
        next(err)
        
    }
})

router.put('/', async(req, res, next) => { 
    try{
        const orders =  await Order.findById(req.body.orderId)
        const orderId = orders.id
        const beforeUpdate = await OrderProduct.findOne({
            where: {
                orderId, productId: req.body.productId
            }
        })
        const beforeUpdateQuantity = beforeUpdate.quantity
        const newRow = await OrderProduct.update({
            quantity: req.body.quantity
        },{
            returning: true,
            where: {
                orderId, productId: req.body.productId
            } 
        })
        const { price } = await Product.findById(req.body.productId)
        // take the quantity of the orderproduct before the update and after
        // and compute the difference so that the correct price
        // is updated (increased or decreased)
        const quantityDiff = newRow[1][0].dataValues.quantity - beforeUpdateQuantity
        await orders.update({
            total: Sequelize.literal(`total + (${quantityDiff * price})`) 
        })
        res.json(newRow[1][0].dataValues)
        
        await OrderProduct.create(req.body)   
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.delete('/:userId/:productId', async(req, res, next)=> {
    try{
        console.log('userId', req.params.userId)
        const orders =  await Order.find({
            where: {
                userId : req.params.userId,
                isCart: true,
             } , include: [ { model: Product } ]
            })
        const orderId = orders.dataValues.id
        const productId = req.params.productId
        const deletedRow = await OrderProduct.find({
            where: {
                orderId, productId
            }
        })
        const removedItemQuantity = deletedRow.dataValues.quantity
        // take the deleted row quantity 
        //and times it by its products price
        // then update orders total price
        const { price } = await Product.findById(productId)
        await orders.update({
            total: Sequelize.literal(`total - (${removedItemQuantity * price})`) 
        })
        await deletedRow.destroy()
        res.json(deletedRow)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.get('/price/:orderid', async(req, res, next) =>{
    try{
        const response = await Order.findById(req.params.orderid)
        res.json(response)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

