const db = require('../utils/db');

module.exports = {
  all() {
    return db('course');
  },

  async single(id) {
    const courses = await db('course')
      .where('id', id);

    if (courses.length === 0) {
      return null;
    }

    return courses[0];
  },

  add(course) {
    return db('course').insert(course);
  },

  del(id) {
    return db('course')
      .where('id', id)
      .del();
  }
};
