const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router


router.get('/:userId', async(req, res, next) => {
    try{
        
       const orders =  await Order.findOrCreate({
           where: {
               userId : req.params.userId,
               isCart: true,
            },
            include: [ { model: Product } ],
            defaults: { total: 0 }
       })
        res.json(orders[0])
    
    //   console.log('Orders', orders)
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