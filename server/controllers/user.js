const userModel = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const watchListModel = require('../models/watch_list');
const courseModel = require('../models/course');
const courseStudentModel = require('../models/course_student');


let changeInfo = async (req, res) => {
    const {name, email} = req.body;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        await userModel.update(
            {name, email},
            {where: {id: userId}}
        );
        return res.status(200).json({message: 'Success!'});
    }
    catch(error) {
		return res.status(500).json(error)
    }
}

let changePassword = async (req, res) => {
    const {oldPassword, newPassword, verifyPassword} = req.body;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        var findUser = await userModel.findOne({
            where: {id: userId}
        })
        
        if(bcrypt.compareSync(oldPassword, findUser.password)){
            if(newPassword == verifyPassword)
            {
                await userModel.update(
                    {password: bcrypt.hashSync(newPassword, 10)},
                    {where: {id: userId}}
                );
            }
            
            else
            {
                return res.status(401).send({message: "New password diffrent verify password" });
            }
      
            return res.status(200).json({message: "Success!"})
            
        }else{
            return res.status(401).send({message: "Mật khẩu cũ không đúng!" })
        }
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let removeElementWatchList = async (req, res) => {
    const courseId = req.params.course_id;
    var decoded = req.decoded;
    var userId = decoded.userId;
  
    try
    {
        var watchList = await watchListModel.findOne({
            where:{
                userId,
                courseId
            }
        })
        console.log(watchList)
        if(watchList)
        
        {
            console.log("yesy")
            await watchListModel.destroy({
                where: {
                    userId,
                    courseId
                }
            })
        }

        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

let getWatchList = async (req, res) => {
    var decoded = req.decoded;
    var userId = decoded.userId;
    console.log("?")
    try
    {
        watchList = await watchListModel.findAll({
            where:{
                userId
            }
        })

        return res.status(200).json({message: 'Success!', data: watchList})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

let getCourseJoin = async (req, res) => {
    var decoded = req.decoded;
    var userId = decoded.userId;
    console.log("tetssss")
    
    try
    {
        var listCourseJoin = await courseStudentModel.findAll({
            where:{
                userId
            }
        })

        return res.status(200).json({message: 'Success!', data: listCourseJoin})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

//(15) api/profile/my-courses


module.exports = {
    changePassword,
    changeInfo,
    removeElementWatchList,
    getWatchList,
    getCourseJoin
}