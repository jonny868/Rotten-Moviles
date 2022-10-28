const { Router} = require('express')
const router = Router()
const {home,register,login, dashboard,profile, verifyToken, createComment, getComments} = require('../controller');

const User = require('../models/User')

router.get('/',home)

//register route
router.post('/register', register)
router.post('/login', login)
router.get('/dashboard', dashboard)
router.get('/profile',verifyToken, profile)
router.post('/comment', createComment)
router.get('/comments', getComments)

module.exports = router;