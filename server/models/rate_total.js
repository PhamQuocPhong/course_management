const Sequelize = require('sequelize');
const db = require('../database/db')

const RateTotal = db.define('rateTotal', {
  // attributes
  total:{
    type: Sequelize.DOUBLE,
    allowNull: false,
  },  
  turn:{
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

module.exports = db.model('rateTotal', RateTotal);
