const Sequelize = require('sequelize');
const db = require('../database/db')

const Category = db.define('category', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  description:{
    type: Sequelize.TEXT,
    allowNull: true,
  }
});

module.exports = db.model('category', Category);
