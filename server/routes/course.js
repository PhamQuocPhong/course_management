const express = require('express');
const courseController = require('../controllers/course.js')
var router = express.Router()

router.get('/:course_id', courseController.getDeatailCourse);
router.get('/search/:page', courseController.searchCourse);
router.get('/:category_id/:page', courseController.getCoursePaging);
//Đăng nhập
router.get('/:course_id/like', courseController.addCourseWatchList);
router.get('/:course_id/rating', courseController.ratingCourse);


module.exports = router