const db = require('../utils/db');

module.exports = {
  all() {
    return db('sub_category');
  },

  async single(id) {
    const subCategorys = await db('sub_category')
      .where('id', id);

    if (subCategorys.length === 0) {
      return null;
    }

    return subCategorys[0];
  },

  add(subCategory) {
    return db('sub_category').insert(subCategory);
  },

  del(id) {
    return db('sub_category')
      .where('id', id)
      .del();
  },
  async getCourse(id) {
    var subquery = db('sub_category').where('id', id).select('id');
    
    return db('course').where('sub_category_id', 'in', subquery).andWhere('active', true);
  },
  async search(keyword) {
    return db('sub_category')
      .whereRaw(`sub_category_tsv @@ plainto_tsquery(?)`,keyword);
  }
};
