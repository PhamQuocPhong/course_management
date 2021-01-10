const express = require('express');
const homeController = require('../controllers/home.js')
var router = express.Router()

router.get('/newest_course', homeController.getNewestCourse);

module.exports = router