import Vue from 'vue'
import App from '@/App.vue'
import router from "@/router.js";
import vuetify from '@/plugins/vuetify';


import store from '@/store/index'

require('./bootstrap');

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");