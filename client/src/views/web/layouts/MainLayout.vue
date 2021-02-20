<template>
  <div id="layout-basic">
    <toolbar-header></toolbar-header>
    <v-main class="pt-0">

      <v-col cols="12" class="d-flex" v-if="isMobile">
        <search-header
        :data.sync="inputSearch"

        >
        </search-header>
        <v-btn small class="primary"  style="border-radius: 0 30px 30px 0; height: auto;" @click="searchCourse()">
          <v-icon>
            mdi-search-web
          </v-icon>
        </v-btn>
      </v-col>

      <div id="page-wrapper">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </v-main>
    <m-footer></m-footer>
  </div>
</template>
<script>
import Header from "./partials/Header";
import Footer from "./partials/Footer";
// component
import SearchHeader from "./partials/SearchHeader";

//mixin
import IsMobile from "@/mixins/is_mobile";

export default {

  mixins: [IsMobile],

  components: { 
    "toolbar-header": Header, 
    "m-footer": Footer,
     'search-header': SearchHeader
  },

  data()
  {
    return {
       inputSearch: this.$route.query.hasOwnProperty("keyword") ? this.$route.query.keyword : "", 
    }
  },

  methods: {

    searchCourse()
    {
      var query = Object.assign({}, this.$route.query);
      query.keyword = this.inputSearch
      this.$router.push({
        name: "courseSearch",
        query: query
      }).catch(err => {});
    },

  }
};
</script>
