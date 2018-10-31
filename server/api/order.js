const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router


router.get('/', async(req, res, next) => {
    try{
       const orders =  await Order.findAll({
           where: {
               userId : req.userId,
               isCart: true
           }
       })
       res.json(orders)

    }
    catch(err){
        console.error(err)
        next(err)
    }
})