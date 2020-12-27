const db = require('../utils/db');

module.exports = {
  all() {
    return db('subCategory');
  },

  async single(id) {
    const subCategorys = await db('subCategory')
      .where('subCategory_id', id);

    if (subCategorys.length === 0) {
      return null;
    }

    return subCategorys[0];
  },

  add(subCategory) {
    return db('subCategory').insert(subCategory);
  },

  del(id) {
    return db('subCategory')
      .where('subCategory_id', id)
      .del();
  }
};
