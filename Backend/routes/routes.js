const { Router} = require('express')
const router = Router()
const {home,register,login, dashboard,profile, verifyToken, createComment, getComments, rateMovie, getRates, getCommentsByMovie, getRatesByMovie} = require('../controller');

const User = require('../models/User')

router.get('/',home)

//register route
router.post('/register', register)
router.post('/login', login)
router.get('/profile',verifyToken, profile)
router.post('/comment', createComment)
router.get('/comments', getComments)
router.get('/rates', getRates)
router.post('/rate', rateMovie)
router.get('/comments/:id',getCommentsByMovie)
router.get('/rates/:id',getRatesByMovie)
router.post('/home', home)

module.exports = router;