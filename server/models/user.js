const Sequelize = require('sequelize');
const db = require('../database/db')

const User = db.define('user', {
  // attributes
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  email:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  info:{
    type: Sequelize.TEXT,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rfToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

module.exports = db.model('user', User);
