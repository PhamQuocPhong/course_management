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

const slugify = require('slugify');

let getCoursePaging = async(req, res) => {

        var categoryData = await categoryModel.findAll({
            where:{ parentId: {
                [Op.eq]: 1
              }},
            include:[{model: categoryModel, as: 'subCategory'}]});

        var categories = [];
        categoryData.map(item => {
            return categories.push(item.id)
        })

        console.log(categories);

      const data = await courseModel.findAll({
        where: {
            categoryId: {
              [Sequelize.Op.in]: categories
            }
        },

        offset: 5, limit: 10,
      })

      res.json(data);
}

let getDeatailCourse = async (req, res) => {
    const courseId = req.params.course_id;
    console.log("test");

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
                    where: {preview: true},
                    required: false,
                    include: [
                    {
                        model: courseDocument,
                        where: {preview: true},
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

let searchCourse = async (req, res) => {
    const keyword = slugify(req.body.keyword, {
        replacement: ' ',  
        remove: undefined, 
        lower: true,     
        strict: false,    
        locale: 'vi'       
    });
    try
    {
        const courseData = await courseModel.findAll({
            where: {
                [Op.and]: Sequelize.literal(`"course_tsv" @@ plainto_tsquery('${keyword}')`)
            },
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
            ]
        });

        //khác: mặc định, 1: đánh giá giảm, 2: giá tăng
        const filter = req.query.filter;
        console.log(courseData[0].dataValues.rates_avg)
        if(filter == 1)
        {
            courseData.sort((a,b) => (a.dataValues.rates_avg < b.dataValues.rates_avg) ? 1 : ((b.dataValues.rates_avg < a.dataValues.rates_avg) ? -1 : 0)); 
        }
        else if(filter == 2)
        {
            courseData.sort((a,b) => (a.dataValues.promotion_price > b.dataValues.promotion_price) ? 1 : ((b.dataValues.promotion_price > a.dataValues.promotion_price) ? -1 : 0)); 
        }
        

        var itemPerPage = req.query.itemPerPage;
        const counts = Math.ceil(courseData.length / itemPerPage);
        if(counts > 0)
        {
            var page = req.params.page
            var offset = 0
            if(page == 1){
                offset = 0
            }
            else{
                offset = ((page - 1) * itemPerPage) 
            }
            courseData = courseData.slice(offset, page * itemPerPage)
        }
        
        return res.status(200).json({message: 'Success!', data: courseData, pageCounts: counts})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let getNewCourse = async (req, res) => {
    try
    {
        courseData = await courseModel.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
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
        });

        return res.status(200).json({message: 'Success!', data: courseData})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}



module.exports = {
    getDeatailCourse,
    searchCourse,
    getNewCourse,
    getCoursePaging,
}