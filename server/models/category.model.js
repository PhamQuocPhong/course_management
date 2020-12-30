const db = require('../utils/db');
var knex_populate = require('knex-populate');

module.exports = {
  async single(id) {
    const categorys = await db('category')
      .where('id', id);

    if (categorys.length === 0) {
      return null;
    }
    console.log(categorys[0]);

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
  async all() {
    var listCategory = await db('category').whereNull('parent_id');
    var listSubCategory = await db('category').whereNotNull('parent_id');

    for (var i = 0; i < listCategory.length; i++){
      var list = [];
      for (var j = 0; j < listSubCategory.length; j++){
        if(listSubCategory[j].parent_id == listCategory[i].id)
          list.push(listSubCategory[j]);
      }
      listCategory[i].listSubCategory = list;
      list =[]      
    }
    console.log(listCategory);

    return listCategory;
  },
  async getCourse(id) {
    var isParent = await db('category').where('id', id).select('parent_id');
    var subquery = db('category').where('id', id).select('id');
    if(isParent[0].parent_id != null)
    {
      //var listCourse =
      return db('course').where('category_id', 'in', subquery).andWhere('active', true);
      
      

      //return list;


      /*var listTeacher = db('course_teacher')
      .join('user', 'user.id', '=', 'course_teacher.user_id')
      .select('user.name', 'course_teacher.course_id');*/

      //return listTeacher;


    }
    else
    {
      var listChild = await db('category').where('parent_id', 'in', subquery);
      var listCourse = await db('course');
      var list =[]

      for (var i = 0; i < listChild.length; i++){
        for (var j = 0; j < listCourse.length; j++){
          if(listChild[i].id == listCourse[j].category_id)
            list.push(listCourse[j]);
        }    
      }

      return list;
    }
  },

  async search(keyword) {
    return db('category')
      .whereRaw(`category_tsv @@ plainto_tsquery(?)`,keyword);
  }
};
