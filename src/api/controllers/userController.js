require('dotenv').config()
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {


    const {username, password, email} = req.body

    try {

        const exists = await userModel.findOne({email : email})
        if (exists) {
            return res.status(400).json({ErroMessage: "Email already used"})
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const userDB = await userModel.create({
            username: username,
            password: hashedPassword,
            email: email
        })


        const token = jwt.sign({email : userDB.email, id : userDB._id}, process.env.ACCESS_TOKEN_SECRET)

        res.status(201).json({user: userDB, token: token})
        res.status(201).json({message: "User Created"})


    } catch (err) {

        console.log(err)
        res.status(500).json({ErroMessage: "Something went wrong"})
    }
}

const login = async (req, res) => {

    const {password, email} = req.body

    try {
        const exists = await userModel.findOne({email : email})
        if (!exists) {
            return res.status(404).json({ErroMessage: "User not found"})
        }

        const passCheck = await bcrypt.compare(password, exists.password)

        if(!passCheck) {
            return res.status(400).send('Invalid Password')
        }

        const token = jwt.sign({email : exists.email, id : exists._id}, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).send({user: exists, token: token})
        

    } catch (err) {
        res.status(500).json({ErroMessage: "Something went wrong"});
    }
}

module.exports = {signup, login}