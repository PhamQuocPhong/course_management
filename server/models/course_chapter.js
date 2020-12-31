const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseChapter = db.define('courseChapter', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  description:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  preview: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = db.model('courseChapter', CourseChapter);
