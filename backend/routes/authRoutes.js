import express from 'express'
import {registerUser,loginUser} from '../controllers/authController.js'
import {body} from 'express-validator'

const router = express.Router();

router.post(
    '/register',
    [
        body('name').not().isEmpty(),
        body('email').isEmail(),
        body('password').isLength({min:6})
    ],
    registerUser
)

router.post('/login',loginUser)

export default router