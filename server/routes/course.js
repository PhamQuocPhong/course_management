const express = require('express');
const courseController = require('../controllers/course.js')

const courseDocumentController = require('../controllers/course_chapter.js')
var router = express.Router()
const auth = require('../middleware/auth_middleware')
const validate = require('../middleware/validate_middleware');
const course_schema = require('../schemas/course.json');

//Chưa đăng nhập
router.get('/', courseController.getCoursePaging);
router.get('/category/:categoryId', courseController.getCourseByCategory);
router.get('/search', courseController.searchCourse);
router.get('/:id', courseController.getDeatailCourse);

//Teacher
router.post('/store', auth, validate(course_schema), courseController.createCourse);
router.put('/update/:id', auth, courseController.updateCourse);



module.exports = router

