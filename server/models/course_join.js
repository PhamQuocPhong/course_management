const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseJoin = db.define('courseJoin', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = db.model('courseJoin', CourseJoin);
