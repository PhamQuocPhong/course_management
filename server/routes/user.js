const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()
const auth = require('../middleware/auth_middleware')
const validate = require('../middleware/validate_middleware');
const rate_schema = require('../schemas/rate.json');

const profile_schema = require('../schemas/profile.json');



router.post('/like/:courseId', userController.addCourseWatchList);
router.post('/join/:courseId', userController.joinCourse);


router.post('/rating/:courseId', validate(rate_schema), userController.ratingCourse); //Đánh giá khóa học nếu chưa đánh giá
router.get('/learn/:courseId', userController.learnCourse); //Vào học nếu đã join
router.get('/check_joined/:courseId', userController.checkJoin); //Check xem có đã tham gia lớp học chưa: tru, fasle
router.get('/check_rated/:courseId', userController.checkRate); //Check và lấy thông tin nếu đã đánh giá, ko có thì null

router.get('/', userController.getUserPaging);
router.get('/:id', userController.show);
router.post('/store', userController.store);
router.put('/update/:id',validate(profile_schema), userController.update);
router.delete('/delete/:id', userController.remove);



module.exports = router