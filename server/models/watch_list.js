const Sequelize = require('sequelize');
const db = require('../database/db')

const WatchList = db.define('watchList', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = db.model('watchList', WatchList);
