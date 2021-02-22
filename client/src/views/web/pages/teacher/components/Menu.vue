<template>
<div>
  <v-card tile>
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pt-0" cols="12">
          <v-avatar class="profile" color="white" tile  width="200" height="250">
            <v-img
              src="https://gamek.mediacdn.vn/133514250583805952/2020/3/7/anh-1-1583592253266481895600.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title"
                >
                  {{ userInfo.name }}
                </v-list-item-title
              >
              <v-list-item-subtitle
                >{{ userInfo.email }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>

    <v-list flat class="pa-0">
      <v-list-item-group color="primary">
        <template v-for="(item, index) in menuInfo">
          <v-list-item
          :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="index + 1 < menuInfo.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</div>
</template>

<script type="text/javascript">

import CookieService from "@/services/cookie";
export default {
  data(){
    return {
      menuInfo: [
        { title: "Thông tin", icon: "mdi-account-circle", link: "/teacher/profile/info" },
        { title: "Đăng khóa học", icon: "mdi-plus-box-outline", link: "/teacher/profile/create_course" },
        { title: "Danh sách bài đã đăng", icon: "mdi-playlist-edit", link: "/teacher/profile/my_courses" },
        { title: "Logout", icon: "mdi-login-variant", link: "/logout" }
      ],
    }
  },


   computed: {
    userInfo(){
      return CookieService.get('userInfo');
    }
  }
}
</script>