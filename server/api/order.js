const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

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
    
    //   console.log('Orders', orders)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

// add an item to the cart - the req.body contains
// order id, user.id , porduct id and comments
router.post('/:userId', async(req, res, next) => {
    try{
        await OrderProduct.create(req.body)
        
    }
    catch(err){
        console.error(err)
    }
})

router.put('/:userId', async(req, res, next) => { //question do we need our userId?
    try{
        const orders =  await Order.find({
            where: {
                userId : req.params.userId,
                isCart: true,
             }
            })
        const orderId = orders[0].id
        console.log('ORDER ID', orderId)
        OrderProduct.update({
            quantity: req.body.quantity //need to send quantity number through req.body in thunk axios request
        },{
            where: {orderId: orderId, productId: req.body.productId} 
            //need to also send product id and order id 
            //order id will be the order of the users that has a status of cart
        })
    }
    catch(err){
        console.error(err)
    }
})

router.delete('/', async(req, res, next)=> {
    try{
        const orders =  await Order.find({
            where: {
                userId : req.params.userId,
                isCart: true,
             }
            })
        const orderId = orders[0].id
        console.log('ORDER ID', orderId)
        OrderProduct.destroy({
            where: {
                orderId: req.body.orderId, productId: req.body.productId
            }
        })
    }
    catch(err){
        console.error(err)
    }
})