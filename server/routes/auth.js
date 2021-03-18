const express = require('express');
const authController = require('../controllers/auth.js')
var router = express.Router()

const validate = require('../middleware/validate_middleware');
const login_schema = require('../schemas/login.json');
const register_schema = require('../schemas/register.json');
const verify_schema = require('../schemas/verify.json');

router.post('/register',validate(register_schema), authController.register);
router.post('/verify', validate(verify_schema), authController.verifyOTP);
router.post('/login', validate(login_schema), authController.login);
router.post('/admin/login', authController.adminLogin);


module.exports = router