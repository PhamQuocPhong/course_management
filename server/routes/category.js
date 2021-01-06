const express = require('express');
const categoryController = require('../controllers/category.js')
var router = express.Router()

router.get('/', categoryController.getAllCategory);
router.get('/:category_id/course', categoryController.getCourseWithCategory);
router.get('/:category_id/course/:page', categoryController.pagingCourseWithCategory);

module.exports = router