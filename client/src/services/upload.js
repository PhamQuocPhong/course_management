import helperCommon from '@/helpers/common';


export default {

	rootURL: '/upload/',

    async image(data)
    {
	     try {
	      return await axios.post(this.rootURL + `image`, data);
	    } catch (error) {

	       return helperCommon.getError(error) || false; 
	    }
	},
}