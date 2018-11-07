const router = require('express').Router()
const isAdminMW = (req, res, next) => req.isAdmin ? next() : res.send('Forbidden')
const configStripe = require('stripe')
const stripe = configStripe(process.env.STRIPE_SECRET_KEY)

module.exports = router

//ROUTE: /api/stripe
router.post('/', isAdminMW, (req, res, next) =>{
    const stripeToken = req.body.source;
    
    console.log("req.body", req.body)
    console.log("stripeToken", stripeToken)

    stripe.charges.create({
            amount: req.body.amount,
            customer: req.body.customer,
            currency: "usd",
            description: "Example charge",
            source: stripeToken, 
            receipt_email: 'ScentedShopper@gmail.com'
        }, function(err, charge) {
            if (err) {
                console.log("err", err)
                res.send({
                    success: false,
                    message: 'Error'
                })
            } else {
                res.send({
                    success: true,
                    message: 'Success'
                })
            } 
    });
});
