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
        const newProduct = await Product.create(req.body)
        console("new product", newProduct)
        res.json(newProduct)
    }
    catch (err){
        console.error(err)
        next(err)
    }
})

