const {Sequelize, DataTypes } = require('sequelize')
const Op = Sequelize.Op;
const categoryModel = require('../models/category');
const courseModel = require('../models/course');
const courseTeacherModel = require('../models/course_teacher');
const userModel = require('../models/user');
const rateModel = require('../models/rate');
const promotionModel = require('../models/promotion');
const course = require('../models/course');

let getAllCategory = async (req, res) => {

    try
    {
        const categoryData = await categoryModel.findAll({
            where:{ parentId: {
                [Op.eq]: null
              }},
            include:[{model: categoryModel, as: 'subCategory'}]});
    
        return res.status(200).json({message: 'Success!', data: emplyeeByPosition})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

let getCourseWithCategory = async (req, res) => {
    const categoryId = req.params.category_id;
    try
    {
        const categoryCheck = await categoryModel.findAll({
            where:{id: categoryId,  parentId: {[Op.eq]: null}}});
    
        var courseData =[];
        
        //Trường hợp chọn subCategory
        if(categoryCheck.length == 0)
        {
            courseData = await courseModel.findAll({
                where: {
                    categoryId
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
                        }
                    ],
            });
        }   
        //Trường hợp chọn category
        else
        {
            var category = await categoryModel.findOne({
                where:{id: categoryId},
                include:[{model: categoryModel, as: 'subCategory'}]});
    
            var length = category.subCategory.length;
            for(var i = 0; i < length; i++)
            {
                var course = await courseModel.findAll({
                    where: {
                        categoryId: category.subCategory[i].id
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
                        }
                    ],
                });
                course.forEach(element => {
                    courseData.push(element);
                });
            }
        }
    
    
        for(var i = 0; i < courseData.length; i++)
        {
            if(courseData[i].rates.length == 0)
            {
                courseData[i].dataValues.rates_count = 0;
                courseData[i].dataValues.rates_avg = 0;
        
            }
            else
            {
                var sum = 0;
                courseData[i].rates.forEach(element => {
                    sum += element.point;
                });
               
                courseData[i].dataValues.rates_count = courseData[i].rates.length;
                courseData[i].dataValues.rates_avg = sum / courseData[i].rates.length;
            }
        }

        for(var i = 0; i < courseData.length; i++)
        {
            if(courseData[i].promotions.length == 0)
            {
                courseData[i].dataValues.promotion_price = courseData[i].price;
            }
            else
            {
                var max = 0;
                courseData[i].promotions.forEach(element => {
                    if(max < element.discout)
                        max = element.discout
                });

                courseData[i].dataValues.promotion_price = Math.ceil(courseData[i].price - courseData[i].price * max / 100);
            }
        }

        return res.status(200).json({message: 'Success!', data: courseData})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let pagingCourseWithCategory = async (req, res) => {
    const categoryId = req.params.category_id;
    try
    {
        const categoryCheck = await categoryModel.findAll({
            where:{id: categoryId,  parentId: {[Op.eq]: null}}});
    
        var courseData =[];
        
        //Trường hợp chọn subCategory
        if(categoryCheck.length == 0)
        {
            courseData = await courseModel.findAll({
                where: {
                    categoryId
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
                        }
                    ],
            });
        }   
        //Trường hợp chọn category
        else
        {
            var category = await categoryModel.findOne({
                where:{id: categoryId},
                include:[{model: categoryModel, as: 'subCategory'}]});
    
            var length = category.subCategory.length;
            for(var i = 0; i < length; i++)
            {
                var course = await courseModel.findAll({
                    where: {
                        categoryId: category.subCategory[i].id
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
                        }
                    ],
                });
                course.forEach(element => {
                    courseData.push(element);
                });
            }
        }
    
    
        for(var i = 0; i < courseData.length; i++)
        {
            if(courseData[i].rates.length == 0)
            {
                courseData[i].dataValues.rates_count = 0;
                courseData[i].dataValues.rates_avg = 0;
        
            }
            else
            {
                var sum = 0;
                courseData[i].rates.forEach(element => {
                    sum += element.point;
                });
               
                courseData[i].dataValues.rates_count = courseData[i].rates.length;
                courseData[i].dataValues.rates_avg = sum / courseData[i].rates.length;
            }
        }

        for(var i = 0; i < courseData.length; i++)
        {
            if(courseData[i].promotions.length == 0)
            {
                courseData[i].dataValues.promotion_price = courseData[i].price;
            }
            else
            {
                var max = 0;
                courseData[i].promotions.forEach(element => {
                    if(max < element.discout)
                        max = element.discout
                });

                courseData[i].dataValues.promotion_price = Math.ceil(courseData[i].price - courseData[i].price * max / 100);
            }
        }

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

        var itemPerPage = req.query.itemPerPage
        const counts = Math.ceil(courseData.length / itemPerPage);
        var page = req.params.page
        var offset = 0
        if(page == 1){
            offset = 0
        }
        else{
            offset = ((page - 1) * itemPerPage) 
        }
        courseData = courseData.slice(offset, page * itemPerPage)
        return res.status(200).json({message: 'Success!', data: courseData, pageCounts: counts})
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}



module.exports = {
    getAllCategory,
    getCourseWithCategory,
    pagingCourseWithCategory
}