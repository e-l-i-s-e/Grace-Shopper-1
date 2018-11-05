const router =  require('express').Router();
const { Category, Product } = require('../db/models');
module.exports = router

// GET /api/ all categories
// exact route: GET /api/categories
router.get('/', (req, res, next) => {
    Category.findAll()
      .then(categories => res.json(categories))
      .catch(next)
})

//SINGLE Category (products associated)
// GET /api/categories/:id
router.get('/:id', async (req, res, next) => {
  try{
      const category = await Category.findById(req.params.id,{
      include: [Product]
  })
  res.send(category)
  } catch(err){
      next(err)
  }
});
