import Vue from "vue";
import Vuex from "vuex";
import componentModules from '@/store/modules/component';
import motelModules from '@/store/modules/motel';
import CookieService from '@/services/cookie';
Vue.use(Vuex);

const store = new Vuex.Store({

	modules: {
		components: componentModules,
    motels: motelModules,
	}

});


global.axiosInstance = require('axios')
global.axiosInstance.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest"
};
global.axiosInstance.defaults.baseURL = process.env.VUE_APP_ROOT_API || "http://localhost:3000/api/";

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    config.headers = { 
      'Authorization': 'Bearer ' + CookieService.get('accessToken'),
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
});





export default store;
