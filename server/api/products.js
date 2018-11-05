const router =  require('express').Router();
const { Product, Category, User, Review } = require('../db/models');
module.exports = router

// GET /api/ all products
router.get("/", async(req,res,next) => {
    try{
        const products = await Product.findAll()
        res.json(products)
    } catch(err){
        next(err)
    }
})

// GET /api/ product by ID (productId)
router.get('/:id', async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id,{
            include: [Category, User]
        })
    res.send(product)
    } catch(err){
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try{
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    }
    catch (err){
        console.error(err)
        next(err)
    }
})

router.put('/:productid', async(req, res, next) => {
    try{
        const editedProduct = await Product.update(req.body, {
            where: {
                id: req.params.productid
            },
            returning: true,
            plain: true
        });
        res.json(editedProduct)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

//Review Routes

//GET reviews related to productId
router.get('/:productId/reviews', async(req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: {
                productId: req.params.productId
            }
        })
        res.json(reviews)
    } catch(err){
        next(err)
    }    
})

//POST a review to a product
router.post('/:productId/reviews', async(req, res, next) => {
    try {
        let product = Product.findById(req.params.productId)
        let review = await Review.create({
            userId: req.user.id,
            productId: req.params.productId,
            numStars: req.body.numStars,
            content: req.body.content
        })
        let reviewProduct = review.setProduct(product)
        if (!product){
            res.sendStatus(404);
        } else {
            res.status(201).json(reviewProduct)
        }
    } catch(err){
        next(err)
    }    
})


