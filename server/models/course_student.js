const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseStudent = db.define('courseStudent', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = db.model('courseStudent', CourseStudent);
