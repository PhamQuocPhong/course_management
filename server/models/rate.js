const Sequelize = require('sequelize');
const db = require('../database/db')

const Rate = db.define('rate', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  point:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },  
  comment:{
    type: Sequelize.STRING,
    allowNull: true,
  }
});

module.exports = db.model('rate', Rate);
