const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.post('/update_password', userController.changePassword);
router.post('/update_info', userController.changeInfo);
router.get('/favorite_courses', userController.getWatchList);
router.get('/favorite_courses/:user_id/unlike', userController.getWatchList);

module.exports = router