const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseDocument = db.define('courseDocument', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  type:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: true,
  },
  link:{
    type: Sequelize.TEXT,
    allowNull: false,
  },
  preview: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = db.model('courseDocument', CourseDocument);
