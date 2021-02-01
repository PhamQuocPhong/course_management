const userModel = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const watchListModel = require('../models/watch_list');
const courseModel = require('../models/course');
const courseStudentModel = require('../models/course_student');
const courseTeacherModel = require('../models/course_teacher');
const roleModel = require('../models/role');

const helper = require('../helpers/helper');

let getUserPaging = async (req, res) => {

    var page = req.query.page || 1;
    var itemPerPage = req.query.itemPerPage || 20;
    var offset = helper.calcPaginate(page, itemPerPage);

    try{
        const users = await userModel.findAll({
            offset: offset, 
            limit: itemPerPage, 
            include: [
                {
                    model: roleModel
                }
            ]
        });
        const counts  = Math.ceil( await userModel.count() / itemPerPage ) 
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

        console.log(form.email);
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

    if(userModel.findOne({where: {
        email: form.email,
        id: !id
    }}))
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

module.exports = {

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
    getTeachList
}