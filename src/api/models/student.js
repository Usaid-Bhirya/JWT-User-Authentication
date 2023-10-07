const mongoose = require('mongoose');

 const studentSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    SID: {
        type: Number,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.Array,
        ref: 'Course'
    },
    

} , {timestamps: true});


module.exports = mongoose.model("Student", studentSchema)
