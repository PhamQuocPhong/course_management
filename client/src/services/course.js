import helperCommon from '@/helpers/common';

export default {

  rootURL: '/courses/',

  async fetchAll() {
    try {
      return await axios.get(this.rootURL);
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },


  async fetchPagingByCategoryId(currentPage, categoryId) {
    try {
      return await axios.get(this.rootURL + `/category/${categoryId}`, {
        params: {
          page: currentPage,
        }
      });
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async fetchPaging(query) {
    try {
      return await axios.get(this.rootURL, {
        params: {
          page: query.page,
          keyword: query.keyword,
          categoryId: query.categoryId,
          teacherId: query.teacherId
        }
      });
    } catch (error) {
       return helperCommon.getError(error) || false; 
    }
  },

  async searchCourse(query)
  {
     try {
      return await axios.get(this.rootURL + 'search/', {
        params: {
          page: query.page,
          keyword: query.keyword,
          itemsPerPage: query.itemsPerPage,
          orderPrice: query.orderPrice,
          orderRating: query.orderRating
        }
      });
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
