const express = require('express');
const homeController = require('../controllers/home.js')
var router = express.Router()

router.get('/newest_course', homeController.getNewestCourse);
router.get('/course_sort_by_rate', homeController.getCourseWithOrderRate);
router.get('/course_sort_by_student_total', homeController.getCourseWithOrderStudentTotal);
router.get('/course_sort_by_watch_total', homeController.getCourseWithOrderWatchTotal);

module.exports = router