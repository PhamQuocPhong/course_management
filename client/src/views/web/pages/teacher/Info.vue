<template>
  <div id="profile">
    <v-layout v-resize="onResize">
      <v-container>
        <v-row>
          <label-table title="Profile"> </label-table>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
            <m-menu></m-menu>
          </v-col>

          <v-col cols="12" md="8" :class="{ 'pa-0': isMobile }" v-if="!isLoading">
            <v-card tile  style="height: 100%;">
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Full name</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="getUser.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Phone number</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="getUser.phone"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Address</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="getUser.address"
                        :disabled="!edit"
                        class="font-weight-bold"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>


                  <v-row>
                    <v-spacer></v-spacer>

                    <v-btn @click="edit = true" color="success" small v-show="!edit">
                      Edit
                    </v-btn>

                    <v-divider class="mx-2" vertical  v-show="edit"> </v-divider>

                    <v-btn color="primary" small
                      v-show="edit"
                      v-on:click="handleUpdateUserInfo()"
                    >
                      Save
                    </v-btn>

                    <v-divider class="mx-2" vertical> </v-divider>

                    <v-btn
                      @click="edit = false"
                      v-show="edit"
                      color="warning"
                      class="mr-4"
                      small
                    >
                      Cancel
                    </v-btn>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script>

// service
import CookieService from "@/services/cookie";
import UserService from "@/services/user";

// component
import Menu from './components/Menu.vue';

// mixins
import IsMobile from "@/mixins/is_mobile";
export default {

  components: {
    'm-menu': Menu
  },


  mixins: [IsMobile],

  created(){
    this.retrieveData();
  },

  data() {
    return {
      menuInfo: [
        { title: "Thông tin", icon: "mdi-account-circle", link: "/profile/info" },
        { title: "Đăng khóa học", icon: "mdi-plus-box-outline", link: "/profile/create_course" },
        { title: "Danh sách khóa học", icon: "mdi-playlist-edit", link: "/profile/list_course" },
        { title: "Logout", icon: "mdi-login-variant", link: "/auth/login" }
      ],
      edit: false,
      isMobile: false,
      showAvatarDialog: false,
      image: null,
      isSelecting: false,
      isLoading: true,
    };
  },


  methods: {
  
    onSelectedFile() {

      this.$refs.inputAvatar.click()
    },

    onFilePicked(event){

      const files = event.target.files[0]

      if (!files.type.includes('image/')) {
        alert('Please select an image file');
        return;
      }
      this.image = {data: files}
      this.showAvatarDialog = true
    },

    async handleUpdateUserInfo(){
      var userId = this.userInfo._id;
      const res = await UserService.update(userId, this.getUser)
      if(res.status === 200){
        toastr.success(
          "<p> Cập nhật thành công <p>",
          "Success",
          { timeOut: 1000 }
        );
                  this.edit = false;
      }else{
        toastr.error("Internal Server Error", "Error", {
              timeOut: 1000
          });
      }
    },

    async retrieveData()
    {
      var userId = this.userInfo._id;
      const res = await UserService.fetch(userId);

      if(res.status === 200){
        this.getUser = res.data[0];
        this.isLoading = false;
      }
    }

  },

  computed: {
    userInfo(){
      return CookieService.get('userInfo');
    }
  }
  
};
</script>
