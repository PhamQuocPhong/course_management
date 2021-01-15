import helperCommon from '@/helpers/common';

export default {

  rootURL: '/home/',

  async getNewestCourses(data) {
    try {
      const result = await axios.get(this.rootURL + `newest_course`);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getMostRatingCourses(data) {
    try {
      const result = await axios.get(this.rootURL + `course_sort_by_rate`);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getMostWatchingCourses(data) {
    try {
      const result = await axios.get(this.rootURL + `course_sort_by_watch_total`);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getMostJoinCourses(data) {
    try {
      const result = await axios.get(this.rootURL + `course_sort_by_student_total`);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

};
