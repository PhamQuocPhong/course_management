const Sequelize = require('sequelize');
const db = require('../database/db')

const WatchList = db.define('watchList', {
});

module.exports = db.model('watchList', WatchList);
