const express = require('express')
const verify_token = require('../middleware/verification')

const router = express.Router();


const {register, login, profile, transaction, wishlist} = require('../controllers/userController')


router.post('/register', register)
router.post('/login', login)

router.get('/profile',verify_token, profile)
router.get('/transaction',verify_token, transaction)
router.get('/wishlist',verify_token, wishlist)

module.exports = router;
