const router =  require('express').Router();
const sendEmail = require('../send-email')
const isAdminMW = (req, res, next) => req.isAdmin ? next() : res.send('Forbidden')

module.exports = router

//router.post('/', isAdminMW, (req, res, next) => {
router.post('/', (req, res, next) => {
  try {
    console.log('req.body', req.body.email )
    sendEmail(req.body.email);
  } catch (err) {
    next(err)
  }
})
