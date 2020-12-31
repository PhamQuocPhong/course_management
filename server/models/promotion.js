const Sequelize = require('sequelize');
const db = require('../database/db')

const Promotion = db.define('promotion', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: true,
  },  
  description:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  discout: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

});

module.exports = db.model('promotion', Promotion);
