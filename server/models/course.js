const Sequelize = require('sequelize');
const db = require('../database/db')

const Course = db.define('course', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  description:{
    type: Sequelize.TEXT,
    allowNull: true,
  },
  fullDescription:{
    type: Sequelize.TEXT,
    allowNull: true,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  course_tvs:
  {
    type: Sequelize.VIRTUAL,
    allowNull: true,
  }
});

module.exports = db.model('course', Course);
