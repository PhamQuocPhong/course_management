<template>
  <nav id="header-top">
    <v-app-bar app>

    <div style="width: 12%;">
      <v-list-item class="logo" :to="'/'">
          <v-img
            width="50"
            src="@/assets/img/logo.png"
          ></v-img>
        <v-list-item-title>ACADEMY</v-list-item-title>
      </v-list-item>
    </div>

      <div style="width: 60px;">
        <v-btn icon @click="switchMode()">
          <v-icon>{{ modeIcon }}</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>


      <v-col cols="6" lg="4" md="4" class="d-flex" v-if="!isMobile">
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


      <div v-if="!userInfo">
        <v-btn outlined small color="primary"  @click="redirectLogin()">
          Đăng nhập
        </v-btn>
      </div>

      
      <v-menu 
      v-else
      transition="slide-y-transition"
      >
        <template v-slot:activator="{ on: activeMenu }">
          <v-avatar v-on="activeMenu">
            <img src="@/assets/img/avatar_default.png" alt="Avatar" />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuInfo"
            :to="item.link"
            :key="index"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
  </nav>
</template>

<style type="text/css">
.v-avatar,
.v-badge {
  cursor: pointer;
}

#header-top{
  min-height: 70px;

}

#header-top .v-app-bar {
    background-color: transparent;
    border-radius: 0;
    position: absolute;

}
</style>

<script>
// component
import SearchHeader from "./SearchHeader";

// services
import CookieService from "@/services/cookie";

//mixins 
import IsMobile from "@/mixins/is_mobile";
export default {

  mixins: [IsMobile],

  components: {
    'search-header': SearchHeader
  },

  data() {
    return {
      mini: false,
      drawer: false,
       menuInfo: [
      ],
      theme: this.getTheme(),

      inputSearch: this.$route.query.hasOwnProperty("keyword") ? this.$route.query.keyword : "", 
    };
  },

  created(){
    if(this.userInfo)
    {
      if(this.userInfo.roleId === 2)
      {
        this.menuInfo = [
          { title: "Thông tin", icon: "mdi-account-circle", link: "/teacher/profile/info" },
          { title: "Đăng khóa học", icon: "mdi-plus-box-outline", link: "/teacher/profile/create_course" },
          { title: "Danh sách bài đã đăng", icon: "mdi-playlist-edit", link: "/teacher/profile/my_courses" },
          { title: "Logout", icon: "mdi-login-variant", link: "/logout" }
        ];
      }else{
        this.menuInfo = [
          { title: "Thông tin", icon: "mdi-account-circle", link: "/student/profile/info" },
          { title: "Khóa học của tôi", icon: "mdi-plus-box-outline", link: "/student/profile/my_courses" },
          { title: "Khóa học yêu thích", icon: "mdi-playlist-edit", link: "/student/profile/favorite_courses" },
          { title: "Logout", icon: "mdi-login-variant", link: "/logout" }
        ];
      }
    }
  },

  computed: {
    modeIcon() {
      return this.theme ? "mdi-brightness-4" : "mdi-brightness-5";
    },
    userInfo: {
      get(){
        return CookieService.get("userInfo")
      }
    },

  },

  mounted() {

    this.$vuetify.theme.dark = this.getTheme();
  },

  watch: {
    visible() {},
    themeStorage() {}
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

    redirectLogin(){
      this.$router.push('/login');
    },

    switchMode() {
      this.theme = !this.theme;
      this.$vuetify.theme.dark = this.theme;

      this.setTheme(this.theme);
    },

    setTheme(val) {
      localStorage.setItem("mode", JSON.stringify(val));
    },

    getTheme() {
      return JSON.parse(localStorage.getItem("mode"));
    }
  },


};
</script>
