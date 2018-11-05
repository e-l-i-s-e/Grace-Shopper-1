const router =  require('express').Router();
const sendEmail = require('../send-email')


module.exports = router

router.post('/', (req, res, next) => {
  try {
    console.log('req.body', req.body.email )
    sendEmail(req.body.email);
  } catch (err) {
    next(err)
  }
})
