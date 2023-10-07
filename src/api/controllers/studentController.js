require('dotenv').config()
const studentModel = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {


    const {username, password, email, SID} = req.body

    try {

        const exists = await studentModel.findOne({email : email})
        if (exists) {
            return res.status(400).json({ErroMessage: "Email already used"})
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const studentDB = await studentModel.create({
            username: username,
            password: hashedPassword,
            email: email,
            SID: SID
        })


        const token = jwt.sign({email : studentDB.email, id : studentDB._id}, process.env.ACCESS_TOKEN_SECRET)

        res.status(201).json({student: studentDB, token: token})


    } catch (err) {

        console.log(err)
        res.status(500).json({ErroMessage: "Something went wrong"})
    }
}

const login = async (req, res) => {

    const {password, email} = req.body

    try {
        const exists = await studentModel.findOne({email : email}).populate('course')
        if (!exists) {
            return res.status(404).send("student not found")
        }

        const passCheck = await bcrypt.compare(password, exists.password)

        if(!passCheck) {
            return res.status(400).send('Invalid Password')
        }

        const token = jwt.sign({email : exists.email, id : exists._id}, process.env.ACCESS_TOKEN_SECRET);
        res.status(201).send({student: exists, token: token})
        

    } catch (err) {
        res.status(500).json({ErroMessage: "Something went wrong"});
    }
}

module.exports = {signup, login}