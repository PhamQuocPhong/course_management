const express = require('express');
const categoryController = require('../controllers/category.js')
var router = express.Router()

router.get('/menu', categoryController.getMenu);
router.get('/', categoryController.getAllCategory);
router.get('/getByCondition', categoryController.getByCondition);
router.get('/paging', categoryController.getCategoryPaging);
router.get('/:id', categoryController.show);
router.post('/store', categoryController.store);
router.put('/update/:id', categoryController.update);
router.delete('/delete/:id', categoryController.remove);

router.get('/', categoryController.getAllCategory);


router.get('/:category_id/course', categoryController.getCourseWithCategory);
router.post('/search', categoryController.searchCategory);

//router.get('/test', categoryController.test);
module.exports = router