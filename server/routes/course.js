const express = require('express');
const courseController = require('../controllers/course.js')
const courseChapterController = require('../controllers/course_chapter.js')
const courseDocumentController = require('../controllers/course_chapter.js')
var router = express.Router()

//Chưa đăng nhập
router.get('/', courseController.getCoursePaging);
router.get('/search', courseController.searchCourse);
router.get('/:id', courseController.getDeatailCourse);

//Teacher
router.post('/create', courseController.createCourse);
router.put('/:id/course_chapter/update/:courseChapterId', courseChapterController.updateChapter);
router.post('/:id/course_document/delete/:courseChapterId', courseChapterController.deleteChapter);

//router.put('/update/:id', courseController.update);

module.exports = router

