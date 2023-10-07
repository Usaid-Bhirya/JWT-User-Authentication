// require('dotenv').config()
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

// const app = express();

// app.use (express.json())


// const posts = [
//     {
//         name: "Usaid",
//         title: "post1"
//     },

//     {
//         name: "Usaid",
//         title: "post2"
//     }
// ]

// const users = [

// ]

// app.get('/posts/' , (req, res) => {
//     res.json(posts)
// })

// // app.get('login', (req, res) => {

// // })


// app.get('/users', (req, res) => {

//     res.json(users)
// })

// app.post('/users', async (req, res) => {

//     try {
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(req.body.password, salt)
//         const user = {name: req.body.name, password: hashedPassword}
//         users.push(user)
//         res.status(201).send("User Created")    

//     } catch {
//         res.status(500).send()
//     }
// })

// app.post('/login', async (req, res) => {

//     const user = users.find(user => user.name === req.body.name)
//     let username
//     if (user===null) {
//         return res.status(400).send('Cannot find user')
//     }
//     try {
//         if ( await bcrypt.compare(req.body.password, user.password)) {
//             username = req.body.name
//         }
//         else {
//             res.send('Invalid Password') }
//     }
//     catch {
//         res.status(500).send()
//     }

//     const userT = {name: username}

//     const accessToken = jwt.sign(userT, process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken: accessToken})

    
// })


// app.listen(3000)

const express = require('express');
const mongoose = require('mongoose');
const { Student, Teacher } = require('.api/models/jone');
// import { Student, Teacher } from './api/models/jone';

const app = express();
const uri = "Enter your mongodb connection string";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/insert-dummy', async (req, res) => {
    const teacher1 = new Teacher({
        teacherID: 1,
        name: 'Mr. Smith',
        subject: 'Math'
    });

    const student1 = new Student({
        studentID: 1,
        name: 'Alice',
        age: 20,
        teacher: teacher1._id
    });

    teacher1.students.push(student1._id);

    await student1.save();
    await teacher1.save();

    res.send('Dummy data inserted!');
});

// Add to app.js

app.get('/teachers', async (req, res) => {
    const teachers = await Teacher.find().populate('students');
    res.json(teachers);
});

app.get('/students', async (req, res) => {
    const students = await Student.find().populate('teacher');
    res.json(students);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
