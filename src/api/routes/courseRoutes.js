const express = require('express');
const { addCourse, viewCourse, deleteCourse, updateCourse } = require('../controllers/courseController');
const auth = require('../middlewares/auth');

const courseRouter = express.Router();

courseRouter.post ('/addCourse', auth, addCourse)

courseRouter.get ('/viewCourse', auth, viewCourse)

courseRouter.delete ("/deleteCourse",auth, deleteCourse)

courseRouter.put ("/updateCourse", auth, updateCourse)

module.exports = courseRouter;