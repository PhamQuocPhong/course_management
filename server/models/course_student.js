const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseStudent = db.define('courseStudent', {
});

module.exports = db.model('courseStudent', CourseStudent);
