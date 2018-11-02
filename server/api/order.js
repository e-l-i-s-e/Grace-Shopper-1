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
router.post('/', async(req, res, next) => {
    try{
        await OrderProduct.create(req.body)
        
    }
    catch(err){
        console.error(err)
    }
})

router.put('/', async(req, res, next) => { //question do we need our userId?
    try{

        OrderProduct.update({
            quantity: req.body.quantity //need to send quantity number through req.body in thunk axios request
        },{
            where: {orderId: req.body.orderId, productId: req.body.productId} 
            //need to also send product id and order id 
        })
    }
    catch(err){
        console.error(err)
    }
})

router.detle('/', async(req, res, next)=> {
    try{
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