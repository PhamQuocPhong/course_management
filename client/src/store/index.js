import Vue from "vue";
import Vuex from "vuex";
import componentModules from '@/store/modules/component';
import userModules from '@/store/modules/user';
import categoryModules from '@/store/modules/category';
import courseModules from '@/store/modules/course';

import CookieService from '@/services/cookie';
Vue.use(Vuex);

const store = new Vuex.Store({

	modules: {
		components: componentModules,
    users: userModules,
    categories: categoryModules,
    courses: courseModules,
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


// Response interceptors for API
axiosInstance.interceptors.response.use((response) => {

  return response
},
(error) => {

   const originalRequest = error.config;

  // if no login => 
  if(error.response.status === 401 && !CookieService.get('refreshToken')){
      return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {

     originalRequest._retry = true;
     return axiosInstance.post('/auth/token/refresh_token',
         {
             "refreshToken": CookieService.get('refreshToken')
         })
         .then(res => {
             if (res.status === 200) {
                 CookieService.set('accessToken', res.data.accessToken)

                 axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + CookieService.get('accessToken')

                 return axiosInstance(originalRequest);
             }
         })
   }

   return Promise.reject(error);
});




export default store;
