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

let getAllCategory = async (req, res) => {

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

let store = async (req, res) => {

    var form = req.body

    try{
        var data = await courseModel.create(form);
        return res.status(200).json({message: 'Success', data: data})
 
    }catch(error){
        return res.status(500).json({message: error})
    }
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
    const categoryId = req.query.categoryId;
    var itemPerPage = req.query.itemPerPage;
    var page = req.query.page

    //filter true hoặc false
    var orderPrice = req.query.orderPrice;
    var orderRating = req.query.orderRating;
	
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
    }
    
    try
    {
        var counts = 0;
        
        const categoryCheck = await categoryModel.findAll({
            where:{id: categoryId,  parentId: {[Op.eq]: null}}});
    
        var courseData =[];
        
        //Trường hợp chọn subCategory
        if(categoryCheck.length == 0)
        {
            if(orderRating && orderPrice)
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
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
                          ['priceFinal', 'ASC'] 
                        ]
                        
                });
            }
            else if(orderPrice&&!orderRating)
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
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
                          ['priceFinal', 'ASC'] 
                        ]
                        
                });
            }
            else if(!orderPrice&&orderRating)
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
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
            }
            else
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
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
                                model: rateModel,
                                
                            },
        
                            {
                                model: promotionModel
                            },
                            {
                                model: rateTotalModel
                                
                            }
                        ]
                });
               
            }
            counts = await courseModel.count({
                where: {
                    categoryId
                }
            });
            
        }   
        //Trường hợp chọn category
        else
        {
            var categoryData = await categoryModel.findAll({
            where:{ parentId: categoryId},
            include:[{model: categoryModel, as: 'subCategory'}]});

            var categories = [];
            categoryData.map(item => {
                return categories.push(item.id)
            })

            if(orderRating && orderPrice)
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
                    where: {
                        categoryId: {
                        [Sequelize.Op.in]: categories
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
                        [rateTotalModel, 'total', 'DESC'], //=> cách thường, cai nay la dc roi
                        ['priceFinal', 'ASC'] 
                    ]
                })
            }
            else if(orderRating && !orderPrice)
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
                    where: {
                        categoryId: {
                        [Sequelize.Op.in]: categories
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
                        [rateTotalModel, 'total', 'DESC']
                    ]
                })
            }
            else if(!orderRating && orderPrice)
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
                    where: {
                        categoryId: {
                        [Sequelize.Op.in]: categories
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
                        ['priceFinal', 'ASC'] 
                    ]
                })
                
            }
            else
            {
                courseData = await courseModel.findAll({
                    offset: offset, 
                    limit: itemPerPage, 
                    where: {
                        categoryId: {
                        [Sequelize.Op.in]: categories
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
                            model: rateModel
                        },
    
                        {
                            model: promotionModel
                        },
                        {
                            model: rateTotalModel
                        }
                    ]
                })
            }

            counts = await courseModel.count({
                where: {
                    categoryId: {
                    [Sequelize.Op.in]: categories
                    }
                }
            });
            //console.log(counts);
        }
       
        return res.status(200).json({message: 'Success!', data: courseData, pageCounts: Math.ceil(counts/itemPerPage)})
    
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

        var courseList = await courseModel.findAll({
            limit: 5, 
            where: {categoryId: courseData.categoryId},
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

let learnCourse = async (req, res) => {
    const courseId = req.params.id;

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

let searchCourse = async (req, res) => {
    //console.log("checkkkkkkkkk")
    var itemPerPage = req.query.itemPerPage;
    //filter true hoặc false
    var orderPrice = req.query.orderPrice;
    var orderRating = req.query.orderRating;
    var keyword = req.query.keyword;
    
	var page = req.query.page
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
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
        var courseData  = []
        if(orderRating && orderPrice)
        {
            console.log("1");
            courseData = await courseModel.findAll({
                offset: offset, 
                limit: itemPerPage, 
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
                ],
                order: [
                    [rateTotalModel, 'total', 'DESC'], //=> cách thường, cai nay la dc roi
                    ['priceFinal', 'ASC'] 
                ]
            });
            console.log("?")
        }
        else if(orderRating && !orderPrice)
        {
            console.log("2");
            courseData = await courseModel.findAll({
                offset: offset, 
                limit: itemPerPage, 
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
                ],
                order: [
                    [rateTotalModel, 'total', 'DESC']
                ]
            });

        }
        else if(!orderRating && orderPrice)
        {
            courseData = await courseModel.findAll({
                offset: offset, 
                limit: itemPerPage, 
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
                ],
                order: [
                    ['priceFinal', 'ASC'] 
                ]
            });

        }
        else
        {
            courseData = await courseModel.findAll({
                offset: offset, 
                limit: itemPerPage, 
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
                ],
            });

        }
        var counts = await courseModel.count({
            where: {
                [Op.and]: Sequelize.literal(`"course_tsv" @@ plainto_tsquery('${keyword}')`)
            }
        });
        
        return res.status(200).json({message: 'Success!', data: courseData, pageCounts: Math.ceil(counts/itemPerPage)})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

//student
let addCourseWatchList = async (req, res) => {
    const courseId = req.params.id;
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
    const courseId = req.params.id;
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
    const courseId = req.params.id;
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
    const courseId = req.params.id;
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



//Teacher
let createCourse = async (req, res) => {
    const {avatar, title, description, fullDescription, price} = req.body;

    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        var course = await courseModel.create({
            avatar,
            title,
            description,
            fullDescription,
            price,
            active: false
         }).then(async function(course){
            await courseTeacherModel.create({
                courseId: course.id,
                userId
             })
         });
        return res.status(200).json({message: 'Success!', courseId: course.id})
    }
    catch(error) {
		return res.status(500).json(error)
	}
}

let updateCourse = async (req, res) => {
    const {avatar, title, description, fullDescription, price, active} = req.body;
    const courseId = req.params.id;

    try
    {
        var course = await courseModel.update({
            avatar,
            title,
            description,
            fullDescription,
            price,
            active
         },
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
    getDeatailCourse,
    searchCourse,
    getCoursePaging,
   
    //Student
    checkJoin,
    joinCourse,
    ratingCourse,
    addCourseWatchList,
    learnCourse,
    changeStateDocument,

    //Teacher
    createCourse,
    updateCourse,
    deleteCourse
}