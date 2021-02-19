const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseTeacher = db.define('courseTeacher', {
	courseId: {
	    type: Sequelize.INTEGER,
	},
	userId: {
		type: Sequelize.INTEGER,
	}
});

module.exports = db.model('courseTeacher', CourseTeacher);
