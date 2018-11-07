const router = require('express').Router()
const Sequelize = require('sequelize')
const { Order, Product, OrderProduct } = require('../db/models')
const isAdminMW = (req, res, next) => req.isAdmin ? next() : res.send('Forbidden')

module.exports = router

router.get('/history/:userId',  async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        isCart: false,
        userId: req.params.userId
      }, include: [{ model: Product}],
    })
    // need to explore how to get quantity from orderProduct table
    res.json(orders)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})
// api route to get cart items or intialize an empty cart
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
      include: [{ model: Product }],
      defaults: { total: 0, status: 'Created' }
    })
    res.json(orders[0])
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// add an item to the cart - the req.body contains
// order id, user.id , porduct id and comments
router.post('/', async (req, res, next) => {
  try {
    const [response, wasCreated] = await OrderProduct.findOrCreate({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    if (wasCreated) {
      // if 0 quantity of the product has not yet been placed
      // create a new row in orderProduct with the product
      // and update the orders price

      await response.update({
          quantity: req.body.quantity
        },
        { returning: true })

      const orders = await Order.find({
        where: {
          id: req.body.orderId
        },
        include: [{
          model: Product
        }]
      });
      const arrOfProducts = orders.products;
      const newTotal = arrOfProducts.reduce((sum, product) => {
        sum += product.price * product.orderProduct.quantity;
        return sum
      }, 0)

      await Order.update({ total: newTotal }, {
        where: { id: req.body.orderId }
      })
      res.json({
        product: orders.dataValues,
        isCreate: true
      })
    } else {
      // if the product already exists in our cart
      // then update the instance with new quantity
      // and update the orders price
      const currQuantity = response.quantity
      const incomingQuantity = req.body.selectedProductInLocalState.quantity + currQuantity

      await response.update({
        quantity: incomingQuantity
      }, {
          returning: true,
        })

      const orders = await Order.find({
        where: {
          id: req.body.orderId
        },
        include: [{
          model: Product
        }]
      });

      const arrOfProducts = orders.products
      const newTotal = arrOfProducts.reduce((sum, product) => {
        sum += product.price * product.orderProduct.quantity;
        return sum
      }, 0)

      //updating the price in the order
      await Order.update({ total: newTotal }, {
        where: { id: req.body.orderId }
      })

      res.json({
        product: orders.dataValues,
        isCreate: true
      })
    }
  }

  catch (err) {
    console.error(err)
    next(err)

  }
})

router.put('/', async (req, res, next) => {
  try {
    const [response, wasCreated] = await OrderProduct.findOrCreate({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      }
    })
    const updatedQuantity = req.body.quantity
    const newRow = await response.update({
      quantity: updatedQuantity
    }, {
        returning: true,
      })
    const orders = await Order.find({
      where: {
        id: req.body.orderId
      },
      include: [{
        model: Product
      }]
    });

    const arrOfProducts = orders.products
    const newTotal = arrOfProducts.reduce((sum, product) => {
      sum += product.price * product.orderProduct.quantity;
      return sum
    }, 0)

    //updating the price in the order
    await Order.update({ total: newTotal }, {
      where: { id: req.body.orderId }
    })

    res.json({
      product: orders.dataValues,
      isCreate: true
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    const orders = await Order.find({
      where: {
        userId: req.params.userId,
        isCart: true,
      }, include: [{ model: Product }]
    })
    const orderId = orders.dataValues.id
    const productId = req.params.productId
    const deletedRow = await OrderProduct.find({
      where: {
        orderId, productId
      }
    })
    await deletedRow.destroy()

    const arrOfProducts = orders.products
    const newTotal = arrOfProducts.reduce((sum, product) => {
      sum += product.price * product.orderProduct.quantity;
      return sum
    }, 0)
    //updating the price in the order

    await Order.update({ total: newTotal }, {
      where: { id: req.body.orderId }
    })
    res.json(deletedRow)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/price/:orderid', async (req, res, next) => {
  try {
    const response = await Order.findById(req.params.orderid)
    res.json(response)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

router.put('/price/:orderid', async (req, res, next) => {
  try {
    const newTotal = Number(req.body.newTotal) * 100
    const promoCode = req.body.promoCode
    const [num, updatedOrder] = await Order.update({
      total: newTotal,
      promo: promoCode
    }, {
      where: {
        id: req.body.orderId
      },
      returning: true,
      plain: true
    })
    res.json(updatedOrder.dataValues)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Order.update(req.body, {
    where: {
      id: Number(req.params.id)
    }
  })
  }
  catch(err){
    console.error(err)
    next(err)
  }
})