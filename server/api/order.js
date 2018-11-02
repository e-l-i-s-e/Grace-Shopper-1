const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router


router.get('/:userId', async(req, res, next) => {
    try{
        
       const orders =  await Order.findAll({
           where: {
               userId : req.params.userId,
               isCart: true,
            },
            include: [ { model: Product } ] 
       })
    //   console.log('Orders', orders)
       res.json(orders[0])
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try{
        await OrderProduct.create(req.body)
        
    }
    catch(err){
        console.error(err)
    }
})