const express = require('express');
const promotionController = require('../controllers/promotion.js')
var router = express.Router()

router.post('/store', promotionController.store);
router.put('/update/:id', promotionController.update);
router.delete('/delete/:id', promotionController.remove);

module.exports = router;