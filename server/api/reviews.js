const router =  require('express').Router();
const { Review, Category, Product } = require('../db/models');
module.exports = router

// GET /api/ all reviews
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

// GET /api/ single review
// exact route: GET /api/reviews/:id
router.get('/:productId', async (req, res, next) => {
    try{
        const review = await Review.findById({
          where: {
            productId: req.params.productId,
          },
          //include: [Product],
    })
    //const review = await Review.findById(req.params.productId)
    res.send(review)
    } catch(err){
        next(err)
    }
})

// //SINGLE Category (products associated)
// // GET /api/categories/:id
// router.get('/:id', async (req, res, next) => {
//   try{
//       const category = await Category.findById(req.params.id,{
//       include: [Product]
//   })
//   res.send(category)
//   } catch(err){
//       next(err)
//   }
// });