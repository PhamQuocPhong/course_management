const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseTeacher = db.define('courseTeacher', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = db.model('courseTeacher', CourseTeacher);
