const db = require('../utils/db');

module.exports = {
  all() {
    return db('category');
  },

  async single(id) {
    const categorys = await db('category')
      .where('id', id);

    if (categorys.length === 0) {
      return null;
    }

    return categorys[0];
  },

  add(category) {
    return db('category').insert(category);
  },

  del(id) {
    return db('category')
      .where('id', id)
      .del();
  },

  async getSubCategory(id) {
    var subquery = db('category').where('id', id).select('id');
    
    return db('sub_category').where('category_id', 'in', subquery);
  }
  ,
  async getWithSubCategory() {
    /*return db('category')
    .join('subCategory', 'category.id', '=', 'subCategory.categoryId')
    .select({ categoryId: 'category.id' }, { categoryName: 'category.name' },{ subCategoryId: 'subCategory.id' }, { subCategoryName: 'subCategory.name' } );*/
    var listCategory = await db('category');
    var listSubCategory = await db('sub_category');

    for (var i = 0; i < listCategory.length; i++){
      var list = [];
      for (var j = 0; j < listSubCategory.length; j++){
        if(listSubCategory[j].category_id == listCategory[i].id)
          list.push(listSubCategory[j]);
      }
      listCategory[i].listSubCategory = list;
      list =[]      
    }
    console.log(listCategory);

    return listCategory;
  },
  async getCourse(id) {
    var subquery = db('category').where('id', id).select('id');
    
    return db('course').where('category_id', 'in', subquery).andWhere('active', true);
  },

  async search(keyword) {
    return db('category')
      .whereRaw(`category_tsv @@ plainto_tsquery(?)`,keyword);
  }
};
