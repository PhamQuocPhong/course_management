const express = require('express');
const authController = require('../controllers/auth.js')
var router = express.Router()

router.post('/register', authController.register);
router.post('/verify', authController.verifyOTP)

module.exports = router