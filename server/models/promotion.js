const Sequelize = require('sequelize');
const db = require('../database/db')

const Promotion = db.define('promotion', {
  name:{
    type: Sequelize.STRING,
    allowNull: true,
  },  
  description:{
    type: Sequelize.TEXT,
    allowNull: true,
  },
  discout: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

});

module.exports = db.model('promotion', Promotion);
