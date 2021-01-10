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

const slugify = require('slugify');

let getCoursePaging = async (req, res) => {
    const categoryId = req.params.category_id;
    var itemPerPage = req.query.itemPerPage;
    //filter true hoặc false
    var filterPriceASC = req.query.filterPriceASC;
    var filterRateDESC = req.query.filterRateDESC;
    
    
	var page = req.params.page
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
            if(filterRateDESC && filterPriceASC)
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
            else if(filterPriceASC&&!filterRateDESC)
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
            else if(!filterPriceASC&&filterRateDESC)
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

            if(filterRateDESC && filterPriceASC)
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
            else if(filterRateDESC && !filterPriceASC)
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
            else if(!filterRateDESC && filterPriceASC)
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
    var itemPerPage = req.query.itemPerPage;
    //filter true hoặc false
    var filterPriceASC = req.query.filterPriceASC;
    var filterRateDESC = req.query.filterRateDESC;
    var keyword = req.query.keyword;
    
	var page = req.params.page
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
        if(filterRateDESC && filterPriceASC)
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
        else if(filterRateDESC && !filterPriceASC)
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
        else if(!filterRateDESC && filterPriceASC)
        {
            console.log("3");
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


let addCourseWatchList = async (req, res) => {
    const courseId = req.params.course_id;
    var decoded = req.decoded;
    var userId = decoded.userId;

    try
    {
        await watchListModel.create({
           userId,
           courseId
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
    getNewCourse,
    getCoursePaging,
    addCourseWatchList
}