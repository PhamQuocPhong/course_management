const express = require('express');
const courseController = require('../controllers/course.js')
var router = express.Router()

router.get('/guest/:course_id', courseController.getDeatailCourse);
router.get('/search/:page', courseController.searchCourse);
//Top 10 mới
router.get('/new_course', courseController.getNewCourse);

router.get('/:category_id/:page', courseController.getCoursePaging);

module.exports = router