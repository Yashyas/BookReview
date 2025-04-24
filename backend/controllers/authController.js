import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

const JWT_SECRET =process.env.JWT_SECRET

export const registerUser = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

    const { name, email, password} = req.body

    try {
        const userExists = await User.findOne({email})
        if (userExists) return res.status(400).json({msg:'User already exists'})

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({name,email,password: hashedPassword})

        const token = jwt.sign({userId: newUser._id},JWT_SECRET,{expiresIn:'7d'})

    } catch (error) {
        res.status(500).json({msg:'Server error'})
    }
}

export const loginUser = async (req,res) => {
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({msg:'Invalid credentials'})

        const isMatch = await bycrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'})

        const token = jwt.sign({userId: user._id},JWT_SECRET,{expiresIn:'7d'})
        res.json({token,user:{id:user._id,name:user.name,role:user.role}})
    } catch (error) {
        res.status(500).json({msg:'Server error'})
    }
}