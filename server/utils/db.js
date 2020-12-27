const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'academy',
    port: 5432
  },
  pool: {
    min: 0,
    max: 50
  }
});

module.exports = knex;
