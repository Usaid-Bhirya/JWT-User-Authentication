require('dotenv').config()
const courseModel = require('../models/course');
const studentModel = require('../models/student');
const addCourse = async (req, res) => {


    const {title, description} = req.body

    try {

        const exists = await courseModel.findOne({title : title})
        if (exists) {
            return res.status(400).json({ErroMessage: "Course already added"})
        }
        
        const courseDB = await courseModel.create({
            title: title,
            description: description,
            student: req.SID
        })
        
        await studentModel.findByIdAndUpdate(req.SID, {$push: {course: courseDB._id}})

        res.status(201).json({course: courseDB})


    } catch (err) {

        console.log(err)
        res.status(500).json({ErroMessage: "Something went wrong"})
    }
}

const viewCourse = async (req, res) => {

    const {title} = req.body

    try {

        // const exists = await courseModel.findOne({title : title})
        // if (!exists) {
        //     return res.status(404).send("Course not found")
        // }
        // res.status(201).send({course: exists})
        const courses = await courseModel.find({student: req.SID}).populate('student');
        res.status(201).send({courses: courses})
        

    } catch (err) {
        res.status(500).json({ErroMessage: "Something went wrong"});
    }
};

const updateCourse = async (req, res) => {

    const {title, description} = req.body

    try {
        const exists = await courseModel.findOne({title : title})
        if (!exists) {
            return res.status(404).send("Course not found")
        }

        if (title) {
            exists.title = title
        }

        if (description) {
            exists.description = description
        }
    } catch (err) {
        res.status(500).json({ErroMessage: "Something went wrong"});
    }


}

const deleteCourse = async (req, res) => {

    const {title} = req.body

    try {
        const exists = await courseModel.findOne({title : title})
        if (!exists) {
            return res.status(404).send("Course not found")
        }
        await studentModel.findByIdAndUpdate(req.SID, {$pull: {course: exists._id}})
        const deleted = await courseModel.deleteOne({title : title})
        res.status(201).send({deleted: deleted})
    } catch (err) {
        res.status(500).json({ErroMessage: "Something went wrong"});
    }

}




module.exports = {addCourse, viewCourse, updateCourse, deleteCourse}