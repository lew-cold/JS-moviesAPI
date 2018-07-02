const JWT = require('jsonwebtoken')
const User = require('../models/user')
const passport = require('passport')
const passportJWT = require('passport-jwt')

const secret = "thisisnotasecret"
const algorithm = "HS256"

passport.use(User.createStrategy());
passport.use(new passportJWT.Strategy({
    secretOrKey: secret,
    algorithm: [ algorithm ],
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    function(payload, done) {
        const id = payload.sub
        User.findById(id)
        .then(user => {
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        .catch(error => {
            done(error)
        })
    }
))

function register (req, resp, next) {
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    User.register(user, req.body.password, (err) => {
        if (err) {
            next(err)
        }
        req.user = user
        next()
    })


}

function signJWTForUser ( req, resp, next ) {
    console.dir(req.user)
    const token = JWT.sign(
        // payload
        {
            email: req.user.email
        },
        // Secret
        "thisisnotasecret",
        // options
        {
            algorithm: 'HS256',
            expiresIn: '7 days',
            subject: req.user._id.toString()
        }
    )
    resp.json({ token })
    
}

module.exports = {
    register,
    signJWTForUser,
    signIn: passport.authenticate('local', { session: false }),
    requireJWT: passport.authenticate('jwt', { session: false })
}