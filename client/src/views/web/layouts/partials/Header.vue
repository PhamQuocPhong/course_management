<template>
  <nav id="header-top">
    <v-app-bar app>

    <div style="width: 10%;">
      <v-list-item class="logo" :to="'/'">
          <v-img
            width="50"
            src="@/assets/img/logo.png"
          ></v-img>
        <v-list-item-title>MFIND</v-list-item-title>
      </v-list-item>
    </div>

      <v-spacer></v-spacer>


      <v-col cols="6" lg="4" md="4">
        <search-header
        :data.sync="inputSearch"

        >
        </search-header>
      </v-col>

<!--       <div style="width: 60px;">
        <v-btn icon @click="switchMode()">
          <v-icon>{{ modeIcon }}</v-icon>
        </v-btn>
      </div> -->

      <div>
        <v-btn outlined small color="primary">
          Đăng nhập
        </v-btn>
      </div>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ on: activeMenu }">
         
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

#header-top .v-app-bar {
    background-color: transparent;
    border-radius: 0;
    position: absolute;
}
</style>

<script>

import SearchHeader from "./SearchHeader";

export default {
  components: {
    'search-header': SearchHeader
  },

  data() {
    return {
      mini: false,
      drawer: false,
      menuInfo: [
        { title: "Profile", icon: "mdi-account-circle", link: "/user/profile" },
        { title: "Logout", icon: "mdi-login-variant", link: "/auth/logout" }
      ],
      theme: this.getTheme(),

      inputSearch: "",
    };
  },

  mounted() {

    this.$vuetify.theme.dark = this.getTheme();
  },

  watch: {
    visible() {},
    themeStorage() {}
  },

  methods: {
    isMobile() {
      if (screen.width <= 768) {
        return true;
      } else {
        this.drawer = true;
        return false;
      }
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

  computed: {
    modeIcon() {
      return this.theme ? "mdi-brightness-4" : "mdi-brightness-5";
    },

  }
};
</script>
