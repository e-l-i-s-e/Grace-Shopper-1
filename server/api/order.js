const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router


router.get('/:userId', async(req, res, next) => {
    try{
        console.log('req.body', req.params)
       const orders =  await Order.findAll({
           returning: true,
           where: {
               userId : req.params.userId,
               isCart: true,
            //    include: [OrderProduct]
           }
       })
       res.json(orders)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})