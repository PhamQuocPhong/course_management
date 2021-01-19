import helperCommon from '@/helpers/common';

export default {

  rootURL: '/categories/',

  async fetchAll() {
    try {
      const result = await axios.get(this.rootURL);
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },


};
