const router =  require('express').Router();
const { Product, Category } = require('../db');
module.exports = router

// router.get("/", async(req,res,next) => {
//     try{
//         const products = await Product.findAll()
//         res.json(products)
//     } catch(err){
//         next(err)
//     }
// })

// router.get('/:category', async(req,res,next) => {
//     try{
//         const categories = await Category.findOne({
//             where: {
//                 category: req.params.category
//             }
//         });
//         if(categories) {
//             res.send(categories)
//         } else {
//             res.sendStatus(404)
//         }
//     }catch(err){
//         next(err)
//     }
// })
