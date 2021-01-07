const express = require('express');
const courseController = require('../controllers/course.js')
var router = express.Router()

router.get('/guest/:course_id', courseController.getDeatailCourse);
router.post('/search', courseController.searchCourse);
//Top 10 mới
router.get('/new_course', courseController.getNewCourse);

module.exports = router