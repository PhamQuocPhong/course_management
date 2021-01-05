import helperCommon from '@/helpers/common';

export default {

  rootURL: '/category/',

  async fetchAll() {
    try {
      const result = await axios.get(this.rootURL + `category`);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },


};
