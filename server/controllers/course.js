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
    
        return res.status(200).json({message: 'Success?!', data: courseData})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

module.exports = {
    getDeatailCourse
}