import helperCommon from '@/helpers/common';

export default {

  rootURL: '/users/',

  async fetchAll() {
    try {
      return await axios.get(this.rootURL);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async fetchAllTeacher()
  {
    const roleTeacher = 2;
    try {
      return await axios.get(this.rootURL, {
        params: {
           role: roleTeacher
        }
      });
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async updateProfile(id, data)
  {
    try {
      return await axios.put(this.rootURL + `update/${id}`, data);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async fetchPaging(query) {
    try {
      return await axios.get(this.rootURL, {
        params: query
      });
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async store(data){
    try {
      return await axios.post(this.rootURL + `store`, data);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async update(id, data)
  {
    try {
      return await axios.put(this.rootURL + `update/${id}`, data);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async delete(id)
  {
    try {
      return await axios.delete(this.rootURL + `delete/${id}`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async changePassword()
  {
    try {
      return await axios.post(this.rootURL + `like/${courseId}`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async handleFavoriteCourse(courseId)
  {
    try {
      return await axios.post(this.rootURL + `like/${courseId}`);
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
      return await axios.post(this.rootURL + `rating/${courseId}`, data);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },


};
