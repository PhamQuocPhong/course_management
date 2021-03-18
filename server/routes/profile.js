const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

const validate = require('../middleware/validate_middleware')
const changepassword_schema = require('../schemas/password.json');

//Student
router.put('/info/update', userController.changeInfo);
router.post('/password/update', validate(changepassword_schema), userController.changePassword);
router.get('/favorite_courses', userController.getWatchList);
router.post('/favorite_courses/:course_id/unlike', userController.removeElementWatchList);
router.get('/my_courses', userController.getCourseJoin);

router.get('/getMyRatingOfCourse/:courseId', userController.getMyRatingOfCourse);

//Teacher
router.get('/my_courses_teach', userController.getTeachList);

module.exports = router