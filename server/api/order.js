const router = require('express').Router()
const Sequelize = require ('sequelize')
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
        // take the deleted row quantity 
        //and times it by its products price
        // then update orders total price
        console.log("ProductId", productId)
           const index = orders.products.findIndex(product => {
                return product.dataValues.id === productId
            })

            const filteredProd = orders.products.filter((arrVal) => {
                console.log("arrValIds",arrVal.dataValues.id)
                return Number(arrVal.id) === Number(productId)
            }) 
            const reduceTotalBy = filteredProd[0].dataValues.price
            console.log(orders, orders.total)
            //must reduce the orders.total with reduce totalby 
            //and update it to the db
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