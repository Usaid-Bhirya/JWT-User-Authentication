const express = require('express');
const app = express();
const userRouter = require('./api/routes/userRoutes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/JWT')
.then(()=> {
    app.listen(4000 , () => {
        console.log("Server is running on port 4000")
    })

})
.catch((err) => {
    console.log(err)
})

app.use(express.json())

app.use("/users", userRouter)


app.get('/', (req, res) => {
    res.send('Hello World!');
})

