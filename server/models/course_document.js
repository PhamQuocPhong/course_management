const Sequelize = require('sequelize');
const db = require('../database/db')

const CourseDocument = db.define('courseDocument', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  type:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  link:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  preview: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }

});

module.exports = db.model('courseDocument', CourseDocument);
