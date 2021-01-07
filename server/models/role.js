const Sequelize = require('sequelize');
const db = require('../database/db')

const Role = db.define('role', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = db.model('role', Role);
