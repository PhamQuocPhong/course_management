const Sequelize = require('sequelize');
const db = require('../database/db')

const StateDocument = db.define('stateDocument', {
  state:{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

module.exports = db.model('stateDocument', StateDocument);
