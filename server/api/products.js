const router =  require('express').Router();
const { Product, Category, User, Review } = require('../db/models');
const isAdminMW = (req, res, next) => req.isAdmin ? next() : res.send('Forbidden')
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
        console.log("product", product.dataValues.categories)
    res.send(product)
    } catch(err){
        next(err)
    }
})

//ADMIN CAN POST
router.post('/', isAdminMW, async(req, res, next) => {
    try{
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    }
    catch (err){
        console.error(err)
        next(err)
    }
})

//ADMIN CAN EDIT
router.put('/:productid', isAdminMW, async(req, res, next) => {
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

//routes to remove and add categories to a product
//ADMIN CAN ADD CATEGORY
router.post('/:productid/:categoryid', isAdminMW, async(req,res,next) => {
    try{
        const category = await Category.findById(req.params.categoryid)
        const product = await Product.findById(req.params.productid)
        product.setCategory([category])
    } catch(err){
        console.error(err)
        next(err)
    }
})

//ADMIN CAN REMOVE CATEGORY
router.delete('/:productid/:categoryid', isAdminMW, async(req,res,next) => {
    try{
        const res = await Product.findById(req.params.id,{
            include: [Category, User]
        })
        console.log("res", res)
        // const category = await Category.findById(req.params.categoryid)
        // const product = await Product.findById(req.params.productid)
        // product.setCategory([])
    } catch(err){
        console.error(err)
        next(err)
    }
})



//Review Routes

//USER can GET reviews related to productId
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

//USER can POST a review to a product
router.post('/:productId/reviews', async(req, res, next) => {
    try {
        console.log("req.body", req.body)
        let product = Product.findById(req.params.productId)
        let review = await Review.create({
            userId: req.user.id,
            productId: req.params.productId,
            numStars: req.body.numStars,
            content: req.body.content
        })
        // let reviewProduct = review.setProduct(product)
        if (!product){
            res.sendStatus(404);
        } else {
            console.log("review", review)
            res.status(201).json(review)
        }
    } catch(err){
        next(err)
    }
})


