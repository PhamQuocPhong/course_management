const Sequelize = require('sequelize');
const db = require('../database/db')

const Category = db.define('category', {
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
  }
});

module.exports = db.model('category', Category);
