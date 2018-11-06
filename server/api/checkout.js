// const router = require('express').Router()
// const stripeSecretKey = require('../../secrets')
// const stripe = require('stripe')(stripeSecretKey)
// //const stripe = require("stripe")('pk_test_D80U47WaOQUTquFL44fpdXof')
// module.exports = router

// //ROUTE: /api/stripe
// router.post('/', (req, res, next) =>{
//     const stripeToken = req.body.stripeToken;

//     stripe.charges.create({
//             amount: 1000,
//             currency: "usd",
//             description: "Example charge",
//             source: stripeToken, 
//         }, function(err, charge) {
//             console.log('chagrge', charge)
//             //figure out how to save to Sequelize!!!

//             if (err) {
//                 res.send({
//                     success: false,
//                     message: 'Error'
//                 })
//             } else {
//                 res.send({
//                     success: true,
//                     message: 'Success'
//                 })
//             } 
//     });
// });
