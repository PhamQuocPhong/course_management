const courseDocumentController = require('../controllers/course_document.js')
const express = require('express');
const courseController = require('../controllers/course.js')

var router = express.Router()
const auth = require('../middleware/auth_middleware')

router.post('/store', auth, courseDocumentController.store);
router.put('/update/:id', auth, courseDocumentController.update);
router.delete('/delete/:id', auth, courseDocumentController.remove);

module.exports = router;