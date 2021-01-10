const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.post('/change_password', userController.changePassword);
router.post('/change_info', userController.changeInfo);

module.exports = router