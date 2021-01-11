const express = require('express');
const authController = require('../controllers/auth.js')
var router = express.Router()

router.post('/register', authController.register);
router.post('/verify', authController.verifyOTP);
router.post('/login', authController.login);

module.exports = router