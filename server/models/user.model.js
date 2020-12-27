const db = require('../utils/db');

module.exports = {
  all() {
    return db('users');
  },

  async single(id) {
    const users = await db('users')
      .where('id', id);

    if (users.length === 0) {
      return null;
    }

    return users[0];
  },

  async singleByUserName(username) {
    const users = await db('users').where('username', username);
    if (users.length === 0) {
      return null;
    }

    return users[0];
  },

  async add(user) {
    const ids = await db('users').insert(user);
    return ids[0];
  },

  updateRefreshToken(id, refreshToken) {
    return db('users').where('id', id).update('rfToken', refreshToken);
  },

  async isValidRefreshToken(id, refreshToken) {
    const list = await db('users').where('id', id).andWhere('rfToken', refreshToken);
    if (list.length > 0) {
      return true;
    }

    return false;
  }
};