const router = require('express').Router()
const { User, Order, Product, OrderProduct } = require('../db/models');

module.exports = router

router.post('/login', async (req, res, next) => {
  // save the array of orderProducts from sessionStorage
  const orderProduct = req.body.orderProduct

  try {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // find or Create the logged-in user's cart
      const [order, wasCreated] = await Order.findOrCreate({
        where: {
          userId: user.id,
          isCart: true,
        },
        include: [{ model: Product }],
        defaults: { total: 0, status: 'Created' }
      })
      const orderId = order.id

      if (wasCreated) {
        //if the user did not have a cart, add each item from the sessionStorage cartto the new cart in the database
        orderProduct.forEach(async (product) => {
          //create the Order's associated order Product --
          const [orderProd, wasCreated] = await OrderProduct.findOrCreate({
            where: {
              orderId: orderId,
              productId: product.id
            }
          })
          //add the correct quantity according to the info in session storage
          await orderProd.update({
            quantity: product.quantity
          },
            { returning: true })
        })

        //grab the modified array of products from the order
        const arrOfProducts = order.products;

        //calculate the new total
        const newTotal = arrOfProducts.reduce((sum, product) => {
          sum += product.price * product.orderProduct.quantity;
          return sum
        }, 0)

        // update the order in the database with the new total
        await Order.update({ total: newTotal }, {
          where: { id: orderId }
        })

      } else {
        // console.log('orderProduct in ELSE', orderProduct);
        orderProduct.forEach(async (product) => {
          const [orderProd, wasCreated] = await OrderProduct.findOrCreate({
            where: {
              orderId: orderId,
              productId: product.id
            }
          })

          const currQuantity = product.quantity
          const incomingQuantity = orderProd.quantity + currQuantity

          await orderProd.update({
            quantity: incomingQuantity
          }, {
              returning: true,
            })
        })

        const arrOfProducts = order.products;
        const newTotal = arrOfProducts.reduce((sum, product) => {
          sum += product.price * product.orderProduct.quantity;
          return sum
        }, 0)

        await Order.update({ total: newTotal }, {
          where: { id: orderId }
        })
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.signup(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
