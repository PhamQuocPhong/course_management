<template>
  <v-navigation-drawer
    v-model="initDrawer"
    :mini-variant="initMini"
    width="260"
    app
  >
      <v-list-item class="logo" :to="'/'">
          <v-img
            width="50"
            src="@/assets/img/logo.png"
          ></v-img>
        <v-list-item-title>MFIND</v-list-item-title>
      </v-list-item>
  
    <v-divider></v-divider>
    <v-list dense nav class="py-0 transparent">

      
      <v-list-item
        v-for="(item, index) in listMenu"
        :to="item.link"
        :key="item.title"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style type="text/css"></style>
<script>
export default {
  props: {
    mini: Boolean,
    drawer: Boolean
  },

  data() {
    return {
      initMini: this.mini,
      initDrawer: this.drawer,

      listMenu: [
        {
          title: "Quản lí danh mục",
          link: "/admin/categories",
          icon: "mdi-widgets",
          permission: null,
          
        },
        {
          title: "Quản lí khóa học",
          link: "/admin/courses",
          icon: "mdi-school",
          permission: null,
          
        },

        {
          title: "Quản lí người dùng",
          link: "/admin/users",
          icon: "mdi-home-account",
          permission: null,
        },

      ],
      check: "admin"
    };
  },

  created() {},

  watch: {
    mini: function() {
      this.initMini = this.mini;
    },
    drawer: function(value) {
      if (this.initDrawer == value) {
        value = true;
      }
      this.initDrawer = value;
    }
  },

};
</script>
