const router =  require('express').Router();
const { Review, Category, Product } = require('../db/models');
module.exports = router

// USER can GET /api/ all reviews
// exact route: GET /api/reviews
router.get("/", async(req,res,next) => {
    try{
        const reviews = await Review.findAll({
            include: [Product],
        })
        res.json(reviews)
    } catch(err){
        next(err)
    }
})

// USER can GET /api/ single review
// exact route: GET /api/reviews/:id
router.get('/:productId', async (req, res, next) => {
    try{
        const review = await Review.findById({
          where: {
            productId: req.params.productId,
          },
    })
    res.send(review)
    } catch(err){
        next(err)
    }
})
