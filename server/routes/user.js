const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()
const auth = require('../middleware/auth_middleware')


router.post('/like/:courseId', userController.addCourseWatchList);
router.post('/join/:courseId', userController.joinCourse);


router.post('/rating/:courseId', auth, userController.ratingCourse); //Đánh giá khóa học nếu chưa đánh giá
router.get('/learn/:courseId', userController.learnCourse); //Vào học nếu đã join
router.get('/check_joined/:courseId', userController.checkJoin); //Check xem có đã tham gia lớp học chưa: tru, fasle
router.get('/check_rated/:courseId', userController.checkRate); //Check và lấy thông tin nếu đã đánh giá, ko có thì null

router.get('/', userController.getUserPaging);
router.get('/:id', userController.show);
router.post('/store', userController.store);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.remove);



module.exports = router