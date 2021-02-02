const userModel = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const watchListModel = require('../models/watch_list');
const courseModel = require('../models/course');
const courseStudentModel = require('../models/course_student');
const courseTeacherModel = require('../models/course_teacher');



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

//Teacher
let getTeachList = async (req, res) => {
    var decoded = req.decoded;
    var userId = decoded.userId;
  
    try
    {
        var teachList = await courseTeacherModel.findAll({
            where:{
                userId
            }
        })

        return res.status(200).json({message: 'Success!', data: teachList})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

//student
let addCourseWatchList = async (req, res) => {
    const courseId = req.params.courseId;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        if(!await watchListModel.findOne({where:{userId,
            courseId}}))
            
        {
            await watchListModel.create({
                userId,
                courseId
             })
        }
    
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

let ratingCourse = async (req, res) => {
    const {point, comment} = req.body;
    const courseId = req.params.courseId;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        if(await courseStudentModel.findOne({where:{userId}} ))
        {
            if(!await rateModel.findOne({
                where: {
                    userId,
                    courseId
                }
             }))
             {
                var rating = await rateModel.create({
                    userId,
                    courseId,
                    point,
                    comment
                 })
             }
            
        }
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let joinCourse = async (req, res) => {
    const courseId = req.params.courseId;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        if(!await courseStudentModel.findOne({
            where:{
                userId,
                courseId
            }
         }))
         {
            await courseStudentModel.create({
                userId,
                courseId
             })
         }
   
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let checkJoin = async (req, res) => {
    const courseId = req.params.courseId;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        var check = false;
        var courseStudent = await courseStudentModel.findOne({
            where:{
                userId,
                courseId
            }
        })
        if(courseStudent)
            check = true;

        return res.status(200).json({message: 'Success!', data: check})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}


let checkRate = async (req, res) => {
    const courseId = req.params.courseId;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        var rate = await rateModel.findOne({
            where:{
                userId,
                courseId
            }
        })
       
        return res.status(200).json({message: 'Success!', data: rate})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let learnCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try
    {
        const courseData = await courseModel.findOne({
            where: {id: courseId},
            include: [
                {
                    model: courseTeacherModel, 
                    include: [
                    {
                        model: userModel
                    }]
                },
                {
                    model: rateModel
                },

                {
                    model: promotionModel
                },
                {
                    model: rateTotalModel
                }
                ,
                {
                    model: courseChapter,
                    required: false,
                    include: [
                    {
                        model: courseDocument,
                        required: false
                    }]

                }
            ]
        });
    
        return res.status(200).json({message: 'Success!', data: courseData})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

module.exports = {
    changePassword,
    changeInfo,
    removeElementWatchList,
    getWatchList,
    getCourseJoin,
    getTeachList,

    //Student
    checkJoin,
    joinCourse,
    ratingCourse,
    addCourseWatchList,
    learnCourse,
    checkRate
}