const express = require('express');
const categoryController = require('../controllers/category.js')
var router = express.Router()

router.get('/', categoryController.getAllCategory);

module.exports = router