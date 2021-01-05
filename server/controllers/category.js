const {Sequelize, DataTypes } = require('sequelize')
const Op = Sequelize.Op;
const categoryModel = require('../models/category')

let getAllCategory = async (req, res) => {

    const categoryData = await categoryModel.findAll({
        where:{ parentId: {
            [Op.eq]: null
          }},
		include:[{model: categoryModel, as: 'subCategory'}]});

	return res.status(200).json(categoryData)
}


module.exports = {
	getAllCategory: getAllCategory
}