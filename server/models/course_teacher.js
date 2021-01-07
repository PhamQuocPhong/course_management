const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseTeacher = db.define('courseTeacher', {
});

module.exports = db.model('courseTeacher', CourseTeacher);
