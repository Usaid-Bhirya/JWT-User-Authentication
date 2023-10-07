const express = require('express');
const { signup, login } = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.post ('/signup', signup)

studentRouter.post ('/login', login)

module.exports = studentRouter;