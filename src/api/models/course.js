const mongoose = require('mongoose');

 const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    

} , {timestamps: true});


module.exports = mongoose.model("Course", courseSchema)
