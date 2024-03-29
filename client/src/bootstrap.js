import Vue from "vue";
import VueCookies from "vue-cookies";
import colors from "vuetify/lib/util/colors";
import gAuth from "vue-google-oauth2";
import wysiwyg from "vue-wysiwyg";
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(wysiwyg, {}); 
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

//plugin
require("@/plugins/directive");
require("@/plugins/filter");

// helpers
import helperCommon from '@/helpers/common';
import helperValidation from '@/helpers/validation';


// component
import BreadCrumbs from "@/components/BreadCrumbs";
import Pagination from '@/components/Pagination.vue';
import ProgressHeader from "@/components/progress/ProgressHeader.vue";
import ProgressLoading from "@/components/progress/ProgressLoading.vue";
import DropZone from "@/components/DropZone.vue";

import LabelTable from '@/components/label/LabelTable';	
import MenuHeader from "@/components/MenuHeader.vue";

import ButtonCreate from '@/components/button/ButtonCreate';
import ButtonDetail from '@/components/button/ButtonDetail';
import ButtonSave from '@/components/button/ButtonSave';
import ButtonCancel from '@/components/button/ButtonCancel';
import ButtonBackList from '@/components/button/ButtonBackList';
import ButtonRemove from '@/components/button/ButtonRemove';

import CategoryList from '@/components/list/CategoryList';
import TeacherList from '@/components/list/TeacherList';

// config
import constant from '@/config/constant';
import lang from '@/config/lang';


Vue.config.productionTip = false;
Vue.config.devtools = true;

//handle error component
// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }

// // handle warning component
// Vue.config.warnHandler = function(msg, vm, trace) {

// }


global.axios = require("axios");
global.axios.defaults.headers.common = {"X-Requested-With": "XMLHttpRequest"};
global.axios.defaults.baseURL = process.env.VUE_APP_ROOT_API || "http://localhost:3000/api/";

global.toastr = require("toastr");
global.toastr.options.closeButton = true;
global.toastr.options.closeMethod = "fadeOut";
global.toastr.options.closeDuration = 500;
global.toastr.options.closeEasing = "swing";



const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: process.env.VUE_APP_GOOGLE_SCOPE,
  prompt: process.env.VUE_APP_GOOGLE_PROMPT
};

// Vue.use(gAuth, gauthOption);

Vue.prototype.$helper = helperCommon;
Vue.prototype.$validation = helperValidation;
Vue.prototype.$constant = constant;
Vue.prototype.$lang = lang;

Vue.component('btn-create', ButtonCreate);
Vue.component('btn-detail', ButtonDetail);
Vue.component('btn-save', ButtonSave);
Vue.component('btn-cancel', ButtonCancel);
Vue.component('btn-back-list', ButtonBackList);
Vue.component('btn-remove', ButtonRemove);

Vue.component('m-category-list', CategoryList);
Vue.component('m-teacher-list', TeacherList);


Vue.component('breadcrumbs', BreadCrumbs);
Vue.component('pagination-custom', Pagination);
Vue.component('label-table', LabelTable);

Vue.component('progress-header', ProgressHeader);
Vue.component('progress-loading', ProgressLoading);
Vue.component('menu-header', MenuHeader);
Vue.component('m-dropzone', DropZone);


Vue.use(VueCookies);
