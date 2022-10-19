const { Router} = require('express')
const router = Router()
const {home,register,login} = require('../controller');

const User = require('../models/User')

router.get('/',home)

//register route
router.post('/register', register)
router.post('/login', login)

module.exports = router;