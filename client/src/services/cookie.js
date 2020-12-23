import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
Vue.$cookies.config(60 * 60, "");

export default {
  get: function(key) {
    return $cookies.get(key) ? $cookies.get(key) : null;
  },

  set: function(key, val) {
    return $cookies.set(key, val);
  },

  remove: function(key) {
    return $cookies.remove(key);
  }
};
