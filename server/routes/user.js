const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.get('/', userController.getUserPaging);
router.get('/:id', userController.show);
router.post('/store', userController.store);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.remove);


module.exports = router