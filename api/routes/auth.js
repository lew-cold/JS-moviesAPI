const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()


// signsup
router.post('/auth/register', 
    // (req, resp, next) => {
    //     console.dir(req.body)
    //     next()
    // },
// 1. register a user
    authMiddleware.register,
// 2. create and return a new JWT.
    authMiddleware.signJWTForUser
)


// signin

router.post('/auth',
    // 1.   authorise via usernam/passport
    authMiddleware.signIn,
    // 2. creatr and return a new JWT
    authMiddleware.signJWTForUser

)


module.exports = router