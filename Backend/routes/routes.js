const { Router} = require('express')
const router = Router()
const {home,register,login, dashboard,profile, verifyToken} = require('../controller');

const User = require('../models/User')

router.get('/',home)

//register route
router.post('/register', register)
router.post('/login', login)
router.get("/dashboard", dashboard)
router.get('/profile',verifyToken, profile)

module.exports = router;