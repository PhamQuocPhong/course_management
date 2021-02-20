import helperCommon from '@/helpers/common';

export default {

  rootURL: '/profile/',

  async changePassword(data)
  {
    try {
      return await axios.post(this.rootURL + `password/update/`, data);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getFavoriteCourse(userId)
  {
    try {
      return await axios.get(this.rootURL + `favorite_courses`, {
        params: {
          userId: userId
        }
      });
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getMyCourse(userId)
  {
    try {
      return await axios.get(this.rootURL + `my_courses`, {
        params: {
          userId: userId
        }
      });
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async getTeacherCourses()
  {
    try {
      return await axios.get(this.rootURL + 'my_courses_teach');
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
