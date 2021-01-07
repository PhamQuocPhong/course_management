const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseChapter = db.define('courseChapter', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  description:{
    type: Sequelize.TEXT,
    allowNull: true,
  },
  preview: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = db.model('courseChapter', CourseChapter);
