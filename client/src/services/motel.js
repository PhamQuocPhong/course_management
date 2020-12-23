import helperCommon from '@/helpers/common';


export default {

  rootURL: '/motels/',

  async fetchPaging(currentPage) {
    try {
      return  await axios.get(this.rootURL, {
        params: {
          page: currentPage,
        }
      });
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async fetch(id) {
    try {
      return await axios.get(this.rootURL + `${id}`);
    } catch (error) {

       return helperCommon.getError(error) || false; 
    }
  },

};
