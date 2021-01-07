const Sequelize = require('sequelize');
const db = require('../database/db')

const ActiveMail = db.define('activeMail', {
  otp:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  active:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  date:
  {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

module.exports = db.model('activeMail', ActiveMail);
