import helperCommon from '@/helpers/common';

export default {

  rootURL: '/course/',

  async fetchAll() {
    try {
      return await axios.get(this.rootURL);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async fetchPaging(condition, currentPage) {
    try {
      return await axios.get(this.rootURL, {
        params: {
          orderBy: "DESC",
          page: currentPage
        }
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
      return await axios.delete(this.rootURL + `update/${id}`);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  }
};
