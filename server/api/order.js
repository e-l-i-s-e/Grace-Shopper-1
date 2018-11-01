const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router


router.get('/:userId', async(req, res, next) => {
    try{
        console.log('req.params', req.params)
       const orders =  await Order.findAll({
           where: {
               userId : req.params.userId,
               isCart: true,
            },
            include: [ { model: Product } ] 
       })
      
       res.json(orders)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})