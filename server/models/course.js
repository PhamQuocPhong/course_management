const Sequelize = require('sequelize');
const db = require('../database/db')

const Course = db.define('course', {
  // attributes
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
  priceFinal: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  studentTotal: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  watchTotal: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  status: {
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
