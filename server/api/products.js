const router =  require('express').Router();
const { Product, Category } = require('../db/models');
module.exports = router

// GET /api/ all products
router.get("/", async(req,res,next) => {
    try{
        const products = await Product.findAll()
        console.log("LOOOKK HERE!!!!!!", products)
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

// // GET /api/products/:category
// router.get('/:category', async(req,res,next) => {
//     try{
//         const category = await Category.findById(req.params.category,{
//             include: [Product]
//         });
//         if(category) {
//             res.send(category)
//         } else {
//             res.sendStatus(404)
//         }
//     }catch(err){
//         next(err)
//     }
// })

// // GET /api/products/:category/productId
// router.get('/:category/:productId', async (req,res,next) => {
//     try{
//         const productId = await Product.findById(req.params.productId, {
//             where: {
//                 categoryId: req.params.category
//             },
//             });
//             res.send(productId)
//             if(productId){
//                 res.send(productId)
//             } else {
//                 res.sendStatus(404)
//             }
//     }catch(err){
//         next(err)
//     }
// })

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
        console.log('EDITED PRODUCT IN API', editedProduct)
        res.json(editedProduct)
    }
    catch(err){
        console.error(err)
        next(err)
    }
})

