import helperCommon from '@/helpers/common';


export default {

  async login(email, password) {
    try {
      const result = await axios.post();
      return result;
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
