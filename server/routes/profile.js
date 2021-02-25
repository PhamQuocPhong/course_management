const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

//Student
router.put('/info/update', userController.changeInfo);
router.post('/password/update', userController.changePassword);
router.get('/favorite_courses', userController.getWatchList);
router.post('/favorite_courses/:course_id/unlike', userController.removeElementWatchList);
router.get('/my_courses', userController.getCourseJoin);

router.get('/getMyRatingOfCourse/:courseId', userController.getMyRatingOfCourse);

//Teacher
router.get('/my_courses_teach', userController.getTeachList);

module.exports = router