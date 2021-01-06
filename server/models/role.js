const Sequelize = require('sequelize');
const db = require('../database/db')

const Role = db.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = db.model('role', Role);
