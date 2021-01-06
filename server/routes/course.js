const express = require('express');
const courseController = require('../controllers/course.js')
var router = express.Router()

router.get('/:course_id', courseController.getDeatailCourse);

module.exports = router