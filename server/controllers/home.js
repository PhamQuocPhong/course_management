const {Sequelize, DataTypes } = require('sequelize')
const Op = Sequelize.Op;
const categoryModel = require('../models/category');
const courseModel = require('../models/course');
const courseTeacherModel = require('../models/course_teacher');
const userModel = require('../models/user');
const rateModel = require('../models/rate');
const promotionModel = require('../models/promotion');
const courseChapter = require('../models/course_chapter');
const courseDocument = require('../models/course_document');
const rateTotalModel = require('../models/rate_total');
const watchListModel = require('../models/watch_list');
const courseStudentModel = require('../models/course_student');


let getNewestCourse = async (req, res) => {
    try
    {
        const courseData = await courseModel.findAll({
            limit: 10, 
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
            ],
            order: [
                ['createdAt', 'DESC'], 
              ]
        });
        return res.status(200).json({message: 'Success!', data: courseData})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let getCourseWithOrderRate = async (req, res) => {
    try
    {
        courseData = await courseModel.findAll({
            limit: 10, 
                include: [
                    {
                        model: courseTeacherModel, 
                        include: [
                        {
                            model: userModel
                        }]
                    },
                    {
                        model: rateModel,
                        
                    },
        
                    {
                        model: promotionModel
                    },
                    {
                        model: rateTotalModel
                        
                    }
                ],
                order: [
                  [rateTotalModel, 'total', 'DESC'], 
                ]
                
        });
        return res.status(200).json({message: 'Success!', data: courseData})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let getCourseWithOrderWatchTotal = async (req, res) => {
    try
    {
        courseData = await courseModel.findAll({
            limit: 10, 
                include: [
                    {
                        model: courseTeacherModel, 
                        include: [
                        {
                            model: userModel
                        }]
                    },
                    {
                        model: rateModel,
                        
                    },
        
                    {
                        model: promotionModel
                    },
                    {
                        model: rateTotalModel
                        
                    }
                ],
                order: [
                  ['watchTotal', 'DESC'], 
                ]
                
        });
        return res.status(200).json({message: 'Success!', data: courseData})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let getCourseWithOrderStudentTotal = async (req, res) => {
    try
    {
        courseData = await courseModel.findAll({
            limit: 10, 
                include: [
                    {
                        model: courseTeacherModel, 
                        include: [
                        {
                            model: userModel
                        }]
                    },
                    {
                        model: rateModel,
                        
                    },
        
                    {
                        model: promotionModel
                    },
                    {
                        model: rateTotalModel
                        
                    }
                ],
                order: [
                  ['studentTotal', 'DESC'], 
                ]
                
        });
        return res.status(200).json({message: 'Success!', data: courseData})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}



module.exports = {
   getNewestCourse,
   getCourseWithOrderRate,
   getCourseWithOrderWatchTotal,
   getCourseWithOrderStudentTotal
}