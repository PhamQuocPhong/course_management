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

const slugify = require('slugify');

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


        if(courseData.rates.length == 0)
        {
            courseData.dataValues.rates_count = 0;
            courseData.dataValues.rates_avg = 0;
        }
        else
        {
            var sum = 0;
            courseData.rates.forEach(element => {
                sum += element.point;
            });
               
            courseData.dataValues.rates_count = courseData.rates.length;
            courseData.dataValues.rates_avg = sum / courseData.rates.length;
        }

        

        if(courseData.promotions.length == 0)
        {
            courseData.dataValues.promotion_price = courseData.price;
        }
        else
        {
            var max = 0;
            courseData.promotions.forEach(element => {
                if(max < element.discout)
                    max = element.discout
            });

            courseData.dataValues.promotion_price = Math.ceil(courseData.price - courseData.price * max / 100);
        }
    
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



module.exports = {
    getDeatailCourse,
    searchCourse
}