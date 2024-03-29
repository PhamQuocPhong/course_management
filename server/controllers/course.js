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

const slugify = require('slugify');
const helper = require('../helpers/helper');

let getAllCourse = async (req, res) => {

    var condition = req.query;
    try
    {
        const data = await courseModel.findAll({
            where: condition
        });
    
        return res.status(200).json({message: 'Success!', data: data})
    }
    catch(error) {
        return res.status(500).json(error)
    }
}

let show = async (req, res) => {

    var id = req.params.id;
    const data = await courseModel.findOne({where: {
        id: id
    }});

    return res.status(200).json({message: 'Success', data: data})
}

let update = async (req, res) => {

    var form = req.body;
    var id = req.params.id;
    try{
        var data = await courseModel.update(form, {
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
        const data = await courseModel.destroy({
            where: {
                id: id
            },
        });

        return res.status(200).json({message: 'Success', data: data})
    }catch(error){
        return res.status(500).json({message: error})
    }
}

let getCoursePaging = async (req, res) => {

    var query = req.query;
    var itemPerPage = req.query.itemPerPage;
    var page = req.query.page

    var page = req.query.page || 1;
    var itemPerPage = req.query.itemPerPage || 20;
    var offset = helper.calcPaginate(page, itemPerPage);

    
    
    try
    {
        var counts = 0;
        var courseData = [];
        var condition = {};
        var order = [];
        if(query.categoryId)
        {
            condition.categoryId = query.categoryId;
        }

        if(query.orderPrice)
        {
            order.push(['priceFinal', query.orderPrice])
        }

        if(query.orderRating)
        {
           order.push([rateTotalModel, 'total', query.orderRating])
        }

        var conditionTeacher = {}
        if(query.teacherId)
        {
            conditionTeacher.userId = query.teacherId
        }


        courseData = await courseModel.findAll({
            offset: offset, 
            limit: itemPerPage, 
            where: condition,
            order: order,
            include: [
                {
                    model: courseTeacherModel, 
                    include: [
                    {
                        model: userModel
                    }],
                    where: conditionTeacher
                },
                {
                    model: rateModel,
                    
                },

                {
                    model: promotionModel
                },
                {
                    model: rateTotalModel
                },
            ],

        });

        return res.status(200).json({message: 'Success!', data: courseData, pageCounts: Math.ceil(await courseModel.count({ where: condition} ) / itemPerPage ) })
    
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let getCourseByCategory = async (req, res) => {

    var query = req.query;
    var page = req.query.page || 1;
    var itemPerPage = req.query.itemPerPage || 20;
    var categoryId = req.params.categoryId;

    var offset = helper.calcPaginate(page, itemPerPage);
    
    try
    {
        //
        var listTopCourse = await courseModel.findAll({
            limit: 3, 
                include: [
                    {
                        model: rateModel,
                        
                    },
                    {
                        model: rateTotalModel
                        
                    }
                ],
                order: [
                  ['studentTotal', 'DESC'], 
                  ['watchTotal', 'DESC'], 
                  [rateTotalModel, 'total', 'DESC']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: Sequelize.literal('NOW() - INTERVAL \'7d\'')
                    }
                }
                
        }).
        then(courses => courses.map(course => course.id));

        var counts = 0;
        var courseData = [];
        var condition = {
            categoryId: categoryId
        };
        var order = [];
        if(query.orderPrice)
        {
            order.push(['priceFinal', query.orderPrice])
        }

        if(query.orderRating)
        {
           order.push([rateTotalModel, 'total', query.orderRating])
        }


        courseData = await courseModel.findAll({
            offset: offset, 
            limit: itemPerPage, 
            where: condition,
            order: order,
            include: [
                {
                    model: courseTeacherModel, 
                    include: [
                    {
                        model: userModel
                    }]
                },
                {
                    model: rateTotalModel
                },
                 {
                    model: promotionModel
                },
            ],
        });

        return res.status(200).json({
            message: 'Success!', 
            data: courseData, 
            pageCounts: Math.ceil(await courseModel.count({ where: condition} ) / itemPerPage ),
            listTopCourse: listTopCourse
        })
    
    }
    catch(error) {
        return res.status(500).json(error)
    }
}


let getDeatailCourse = async (req, res) => {
    const courseId = req.params.id;
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
                    model: rateModel,
                    
                    include: [
                    {
                        model: userModel
                    }]
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

        var courseList = await courseModel.findAll({
            limit: 5, 

            where: {
                categoryId: courseData.categoryId,
                id: {
                    [Op.ne]: courseId
                }
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
    
        return res.status(200).json({message: 'Success!', data: courseData, courseList: courseList})
    }
    catch(error) {
		return res.status(500).json(error)
	}
   
}

let searchCourse = async (req, res) => {

    var itemPerPage = req.query.itemPerPage || 20;
    //filter true hoặc false
    var orderPrice = req.query.orderPrice;
    var orderRating = req.query.orderRating;
    var keyword = req.query.keyword;
    
	var page = req.query.page
	var offset = 0;
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
    }

    // order by
    var order = [];
    if(orderPrice)
    {
        order.push(
            ['priceFinal', orderPrice] 
        )
    }
    if(orderRating)
    {
        order.push([
            { model: rateTotalModel }, 'total', orderRating 
            ]
        )
    }

    keyword = slugify(keyword, {
        replacement: ' ',  
        remove: undefined, 
        lower: true,     
        strict: false,    
        locale: 'vi'       
    });

    try
    {
        const categoryData = await categoryModel.findAll({
            where: {
                [Op.and]: Sequelize.literal(`"category_tsv" @@ plainto_tsquery('${keyword}')`)
            }
        }).then(categories => categories.map(category => category.id));
        

        var courseData1 = await courseModel.findAll({
            offset: offset, 
            limit: itemPerPage, 
            where: {
                categoryId: {
                [Sequelize.Op.in]: categoryData
                }
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
                    model: rateTotalModel
                }
            ],
            order: order
        });
      
        var courseIdList = [];
        courseData1.map(item => {return courseIdList.push(item.id)});
        console.log(courseIdList)

        var listTopCourse = await courseModel.findAll({
            limit: 3, 
                include: [
                    {
                        model: rateModel,
                        
                    },
    
                    {
                        model: rateTotalModel
                        
                    }
                ],
                order: [
                  ['studentTotal', 'DESC'], 
                  ['watchTotal', 'DESC'], 
                  [rateTotalModel, 'total', 'DESC']
                ],
                where: {
                    createdAt: {
                        [Op.gte]: Sequelize.literal('NOW() - INTERVAL \'7d\'')
                    }
                }
                
        }).
        then(courses => courses.map(course => course.id));

        var courseData  = []
        courseData = await courseModel.findAll({
            offset: offset, 
            limit: itemPerPage, 
            where: {
                [Op.and]: Sequelize.literal(`"course_tsv" @@ plainto_tsquery('${keyword}')`),
                id: {
                    [Sequelize.Op.notIn]: courseIdList
                }
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
                    model: rateTotalModel
                }
            ],
            order: order
        });
        
        courseData = courseData.concat(courseData1);
        var counts = courseData.length;
        
        return res.status(200).json({message: 'Success!', data: courseData, pageCounts: Math.ceil(counts/itemPerPage), listTopCourse})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}


//Teacher
let createCourse = async (req, res) => {
    const data = req.body;
    console.log(data);
    var chapters = data.chapters;
    var decoded = req.decoded;
    var userId = decoded.userId;
    console.log("data");
    try
    {
        var course = await courseModel.create(data);
        await courseTeacherModel.create({
            courseId: course.id,
            userId: userId
        })

        if(course && chapters.length)
        {
            for(var i = 0; i < chapters.length; i++)
            {
                await courseChapter.create({

                    name: chapters[i].name,
                    preview: chapters[i].preview,
                    courseId: course.id
                })
            }
        }

        return res.status(201).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let updateCourse = async (req, res) => {
    const data = req.body;
    const courseId = req.params.id;

    try
    {
        var course = await courseModel.update(data,
         {where: {id: courseId}}
         );
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try
    {
        await createDocument.destroy({
            where: {id: courseDocumentId}
            
        })
        return res.status(200).json({message: 'Success!'})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}


module.exports = {

    update,

    getAllCourse,
    getDeatailCourse,
    searchCourse,
    getCoursePaging,
    getCourseByCategory,
   
    //Teacher
    createCourse,
    updateCourse,
    deleteCourse
}