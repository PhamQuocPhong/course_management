const courseChapterController = require('../controllers/course_chapter.js')
const express = require('express');
const courseController = require('../controllers/course.js')

var router = express.Router()
const auth = require('../middleware/auth_middleware')

router.post('/store', auth, courseChapterController.store);
router.put('/update/:id', auth, courseChapterController.update);
router.delete('/delete/:id', auth, courseChapterController.remove);

module.exports = router;