const userModel = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const watchListModel = require('../models/watch_list');
const courseModel = require('../models/course');
const courseStudentModel = require('../models/course_student');
const courseTeacherModel = require('../models/course_teacher');
const roleModel = require('../models/role');
const rateModel = require('../models/rate');
const helper = require('../helpers/helper');

const { Op } = require("sequelize");

let getUserPaging = async (req, res) => {

    var page = req.query.page || 1;
    var itemPerPage = req.query.itemPerPage || 20;
    var offset = helper.calcPaginate(page, itemPerPage);
    var condition = {};
    if(req.query.role)
    {
        condition.roleId = req.query.role
    }

    try{
        const users = await userModel.findAll({
            offset: offset, 
            limit: itemPerPage, 
            include: [
                {
                    model: roleModel
                }
            ],
            order: [
                ['id', 'DESC'],
            ],
            where: condition
        });
        const counts  = Math.ceil( await userModel.count({where: condition}) / itemPerPage ) 
        return res.status(200).json({message: 'Success', data: users, pageCounts: counts })
    }
    catch(error)
    {
        return res.status(500).json(error)
    }
}


let show = async (req, res) => {

    var id = req.params.id;
    const data = await userModel.findOne({where: {
        id: id
    }});

    return res.status(200).json({message: 'Success', data: data})
}

let store = async (req, res) => {

    var form = req.body;
    try
    {   

        if(userModel.count({where: {
            email: form.email
        }}) > 0 )
        {
            return res.status(422).json({message: "This email existed"});
        }

        var newUser = userModel.create(form);
        return res.status(200).json({message: 'Success', data: newUser})
 
    }catch(error){
        return res.status(500).json({message: error})
    }
}

let update = async (req, res) => {

    var form = req.body;
    var id = req.params.id;

    const findUser = await userModel.findOne({where: {
        email: form.email,
        id: {
            [Op.ne]: id
        }
    }});


    if(findUser)
    {
        return res.status(422).json({message: "This email existed"});
    }

    try{
        var data = await userModel.update(form, {
            where: {
                id: id
            },
            returning: true,
            plain: true
        });
        return res.status(200).json({message: 'Success', data: data[1]})
 
    }catch(error){
        return res.status(500).json({message: error})
    }
}

let remove = async (req, res) => {
    var id = req.params.id;
    try{
        const data = await userModel.destroy({
            where: {
                id: id
            },
        });

        return res.status(200).json({message: 'Success', data: data})
    }catch(error){
        return res.status(500).json({message: error})
    }
}


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
                return res.status(422).send({message: "New password diffrent verify password" });
            }
      
            return res.status(200).json({message: "Success!"})
            
        }else{
            return res.status(422).send({message: "Mật khẩu cũ không đúng!" })
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

        if(watchList)  
        {
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
            },
            include: [
                {
                model: courseModel
                }
            ]
        })

        return res.status(200).json({message: 'Success!', data: watchList})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

let getCourseJoin = async (req, res) => {
    var decoded = req.decoded;
    var userId = decoded.userId || req.query.userId;
    
    try
    {
        var listCourseJoin = await courseStudentModel.findAll({
            where:{
                userId
            },
            include: [
                {
                model: courseModel
                }
            ]
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
            },
             include: [
                {
                model: courseModel
                }
            ]
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
    const courseId = req.body.courseId;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        if(await courseStudentModel.findOne({where:{userId}} ))
        {
            var find = await rateModel.findOne({
                where: {
                    userId,
                    courseId
                }
             })

            if(!find)
             {
                var newRating = await rateModel.create({
                    userId,
                    courseId,
                    point,
                    comment
                 })

                 var findRating = await rateModel.findOne({
                    where: {
                        id: newRating.id
                    },
                    include: [
                        {
                            model: userModel
                        }
                    ]
                });

                 return res.status(200).json({message: 'Success!', data: findRating})
             }else{
                // case update rating

                await rateModel.update(
                    {
                        userId,
                        courseId,
                        point,
                        comment
                    },
                    {
                        where: {
                            id: find.id
                        },
                        returning: true,
                        plain: true
                })

                var findRating = await rateModel.findOne({
                    where: {
                        id: find.id
                    },
                    include: [
                        {
                            model: userModel
                        }
                    ]
                });


                return res.status(200).json({message: 'Success!', data: findRating})
             }
        }
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

let getMyRatingOfCourse = async (req, res) => {

    const userId = req.decoded.userId;
    const courseId = req.params.courseId;
    const data = await rateModel.findOne({
        where: {
            courseId: req.params.courseId,
            userId: userId
        }
    })

    return res.status(200).json({message: "Success", data: data})
}


module.exports = {
    getMyRatingOfCourse,
    getUserPaging,
    show,
    store,
    update,
    remove,

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