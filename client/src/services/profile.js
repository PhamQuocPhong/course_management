import helperCommon from '@/helpers/common';

export default {

  rootURL: '/profile/',

  async changePassword()
  {
    try {
      return await axios.post(this.rootURL + `like/${courseId}`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getFavoriteCourse()
  {
    try {
      return await axios.get(this.rootURL + `favorite_courses`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

   async getMyCourse()
  {
    try {
      return await axios.get(this.rootURL + `my_courses`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async joinCourse(courseId)
  {
    try {
      return await axios.post(this.rootURL + `join/${courseId}`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async ratingCourse(courseId, data)
  {
    try {
      return await axios.post(this.rootURL + `rating/${courseId}`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async removeFavoriteCourse(courseId)
  {
    try {
      return await axios.post(this.rootURL + `favorite_courses/${courseId}/unlike`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  }
};
