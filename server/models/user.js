const Sequelize = require('sequelize');
const db = require('../database/db')

const User = db.define('user', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  email:{
    type: Sequelize.STRING,
    allowNull: false,
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
