const express = require('express');
const categoryController = require('../controllers/category.js')
var router = express.Router()

router.get('/', categoryController.getAllCategory);
router.get('/:category_id/course', categoryController.getCourseWithCategory);
router.post('/search', categoryController.searchCategory);
//router.get('/test', categoryController.test);
module.exports = router