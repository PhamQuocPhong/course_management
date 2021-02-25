import helperCommon from '@/helpers/common';

export default {

  rootURL: '/chapters/',

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
  }

};
