const courseModel = require('../models/course');

let getNewestCourse = async (req, res) => {
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
   getNewestCourse
}