export default {

  rootURL: '/categories/',

   async fetch(id){
    try {
      return await axios.get(this.rootURL + `${id}`);
    } catch (error) {
      return error.response;
    }
   },

   async fetchMenu()
   {
      try {
        return  await axios.get(this.rootURL + 'menu');
        return result;
      } catch (error) {
         return helperCommon.getError(error) || false; 
      }
   },

   async fetchByCondition(condition)
   {
      try {
        return  await axios.get(this.rootURL, {
          params: condition
        });
        return result;
      } catch (error) {
         return helperCommon.getError(error) || false; 
      }
   },

   async fetchAll()
   {
      try {
        return  await axios.get(this.rootURL);
        return result;
      } catch (error) {
         return helperCommon.getError(error) || false; 
      }
   },

   async fetchPaging(query) {

    try {
      return  await axios.get(this.rootURL + `paging`, {
        params: {
          page: query.currentPage,
          searchkey: query.searchkey,
        }
      });
      return result;
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async store(data){
    try {
      return await axios.post(this.rootURL + 'store', data);
    } catch (error) {
      return error.response;
    }
  },


  async update(id, data){
    try {
      return await axios.put(this.rootURL + `update/${id}`, data);
    } catch (error) {
      return error.response;
    }
  },

   async remove(id){
    try {
      return await axios.delete(this.rootURL + `remove/${id}`);
    } catch (error) {
      return error.response;
    }
  },


};
