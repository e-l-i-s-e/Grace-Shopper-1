const router =  require('express').Router();
const { Product, Category } = require('../db/models');
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

// GET /api/ product
router.get('/:id', async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id,{
        include: [Category]
    })
    res.send(product)
    } catch(err){
        next(err)
    }
  });

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

