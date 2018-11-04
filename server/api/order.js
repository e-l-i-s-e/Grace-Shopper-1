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

       const response = await OrderProduct.find({
            where: {
               orderId: req.body.orderId,
               productId: req.body.productId 
            }
        })
        if (!response){
            const newRow = await OrderProduct.create(req.body)
            res.json({
                product: newRow.dataValues,
                isCreate: true
            })
        } else {
            const currQuantity = response.quantity
            const newRow = await response.update({
                quantity: currQuantity + req.body.quantity
            },{
                returning: true,
            })
            console.log("newRow", newRow.dataValues)
            res.json({
                product: newRow.dataValues,
                isCreate: true
            })
        }
       //if response not found then create an instance
       // if response found then update the instance with new quantity
        
    }
    catch(err){
        console.error(err)
        next(err)
        
    }
})

router.put('/', async(req, res, next) => { 
    try{
        const orders =  await Order.find({
            where: {
               id : req.body.orderId,
             }
            })
        const orderId = orders.id
        console.log(req.body.quantity)
        const newRow = await OrderProduct.update({
            quantity: req.body.quantity//need to send quantity number through req.body in thunk axios request
            
        },{
            returning: true,
            where: {
                orderId, productId: req.body.productId
            } 
            //need to also send product id and order id 
            //order id will be the order of the users that has a status of cart
        })
        res.json(newRow[1][0].dataValues)
        
    }
    catch(err){
        console.error(err)
        next(err)
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
                orderId, productId: req.body.productId
            }
        })
    }
    catch(err){
        console.error(err)
    }
})