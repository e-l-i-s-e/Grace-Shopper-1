const router =  require('express').Router();
const { Product, Category } = require('../db/models');
module.exports = router

router.get("/", async(req,res,next) => {
    try{
        const products = await Product.findAll()
        res.json(products)
    } catch(err){
        next(err)
    }
})

router.get('/:category', async(req,res,next) => {
    try{
        const categories = await Category.findById(req.params.category,{
            attributes: ['content']
        });
        if(categories) {
            res.send(categories)
        } else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try{
        console.log('req body', req.body)
        const newProduct = await Product.create(req.body)
        console.log("new product", newProduct)
        res.json(newProduct)
    }
    catch (err){
        console.error(err)
        next(err)
    }
})

router.put('/edit/:productid', async(req, res, next) => {
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

