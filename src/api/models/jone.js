// models.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentID: Number,
    name: String,
    age: Number,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
});

const teacherSchema = new mongoose.Schema({
    teacherID: Number,
    name: String,
    subject: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Student, Teacher };
