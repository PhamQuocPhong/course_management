const db = require('../utils/db');

module.exports = {
  all() {
    return db('subCategory');
  },

  async single(id) {
    const subCategorys = await db('subCategory')
      .where('id', id);

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
      .where('id', id)
      .del();
  },
  async getCourse(id) {
    var subquery = db('subCategory').where('id', id).select('id');
    
    return db('course').where('subCategoryId', 'in', subquery).andWhere('active', true);
  },
  async search(keyword) {
    return db('subCategory')
      .whereRaw(`subCategory_tsv @@ plainto_tsquery(?)`,keyword);
  }
};
