require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const app = express();

app.use (express.json())


const posts = [
    {
        name: "Usaid",
        title: "post1"
    },

    {
        name: "Usaid",
        title: "post2"
    }
]

const users = [

]

app.get('/posts/' , (req, res) => {
    res.json(posts)
})

// app.get('login', (req, res) => {

// })


app.get('/users', (req, res) => {

    res.json(users)
})

app.post('/users', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send("User Created")    

    } catch {
        res.status(500).send()
    }
})

app.post('/login', async (req, res) => {

    const user = users.find(user => user.name === req.body.name)
    let username
    if (user===null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if ( await bcrypt.compare(req.body.password, user.password)) {
            username = req.body.name
        }
        else {
            res.send('Invalid Password') }
    }
    catch {
        res.status(500).send()
    }

    const userT = {name: username}

    const accessToken = jwt.sign(userT, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})

    
})


app.listen(3000)