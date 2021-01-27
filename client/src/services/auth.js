import helperCommon from '@/helpers/common';

export default {

  rootURL: '/auth/',

  async login(data) {
    try {
      const result = await axios.post(this.rootURL + `login`, data);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async register(data) {
    try {
      const result = await axios.post(this.rootURL + `register`, data);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async verify(data) {
    try {
      const result = await axios.post(this.rootURL + `verify`, data);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async socialLogin(social, data)
  {
    try {
      return await axios.post(`/auth/${social}`, data);
      
    } catch (error) {
      return helperCommon.getError(error) || false; 
    }
  },  

  async logout(){
    try {
      

    } catch(error) {
       return helperCommon.getError(error) || false;
    }
  }

};
