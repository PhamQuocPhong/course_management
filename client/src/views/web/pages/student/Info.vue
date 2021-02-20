<template>
  <div id="profile">
    <v-layout v-resize="onResize">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
            <m-menu></m-menu>
          </v-col>

          <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }">
            <v-card tile  style="height: 100%;">

              <v-card-title class="border-bottom">Thông tin cá nhân</v-card-title>

              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Họ tên</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="userInfo.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Email</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="userInfo.email"
                      ></v-text-field>
                    </v-col>
                  </v-row>


                  <v-row>
                    <v-spacer></v-spacer>

                    <v-btn 
                    v-show="!edit"
                    @click="edit = true" 
                    color="success" 
                    small
                    >
                      Edit
                    </v-btn>

                    <v-divider  v-show="!edit" class="mx-2" vertical> </v-divider>

                    <v-btn 
                    v-show="edit"
                    color="primary" 
                    small
                    @click="handleUpdateUserInfo()"
                    >
                      Save
                    </v-btn>

                    <v-divider  v-show="edit" class="mx-2" vertical> </v-divider>

                    <v-btn
                     v-show="edit"
                      @click="edit = false"
                      color="warning"
                      class="mr-4"
                      small
                    >
                      Cancel
                    </v-btn>


                    <v-btn 
                    color="primary" 
                    small
                     class="mr-4"
                     @click="isChangePassword = true"
                    >
                      Đổi mật khẩu
                    </v-btn>
                  </v-row>
                </v-container>
              </v-form>

              <v-form ref="form1" v-show="isChangePassword">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Mật khẩu cũ</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        class="font-weight-bold"
                        v-model="userInfo.oldPassword"
                        type="password"
                         :rules="[
                        $validation.required(userInfo.oldPassword, 'Mật khẩu cũ')
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Mật khẩu mới</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        class="font-weight-bold"
                        v-model="userInfo.newPassword"
                        type="password"
                         :rules="[
                        $validation.required(userInfo.newPassword, 'Mật khẩu mới')
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Xác nhận mật khẩu mới</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        class="font-weight-bold"
                        v-model="userInfo.verifyPassword"
                        type="password"
                        :rules="[
                        $validation.required(userInfo.verifyPassword, 'Xác nhận mật khẩu')
                        ]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn 
                    v-show="isChangePassword"
                    color="primary" 
                    small
                    v-on:click="handleChangePassword()"
                    >
                      Save
                    </v-btn>

                    <v-divider  v-show="isChangePassword" class="mx-2" vertical> </v-divider>

                    <v-btn
                     v-show="isChangePassword"
                      @click="isChangePassword = false"
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
import ProfileService from "@/services/profile";

// component
import Menu from './components/Menu.vue';

// mixins
import IsMobile from "@/mixins/is_mobile";
export default {

  components: {
    'm-menu': Menu
  },


  mixins: [IsMobile],

  data() {
    return {
     
      edit: false,
      isMobile: false,
      showAvatarDialog: false,
      image: null,
      isSelecting: false,

      isChangePassword: false,
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
      var userId = this.userInfo.id;
       this.$store.dispatch("components/progressLoading", { option: "show" });
      const res = await UserService.update(userId, this.userInfo);
      if(res.status === 200)
      {
        CookieService.set('userInfo', res.data.data);
        this.userInfo = res.data.data;
        this.edit = false;
         this.$store.dispatch("components/progressLoading", { option: "hide" });
      }else{
         this.$store.dispatch("components/progressLoading", { option: "hide" });
      }
    },

     async handleChangePassword()
     {
        if (this.$refs.form1.validate()) {
                 this.$store.dispatch("components/progressLoading", { option: "show" });
           const res = await  ProfileService.changePassword(this.userInfo);
           if(res.status === 200)
           {
             toastr.success(
              "<p> Cập nhật thành công <p>",
              "Success",
              { timeOut: 3000 }
             );

             this.isChangePassword = false;
              this.$store.dispatch("components/progressLoading", { option: "hide" });
           }else if(res.status === 422){
             toastr.error(
              "<p>"+ res.data.message +"<p>",
              "Error",
              { timeOut: 3000 }
            );

              this.$store.dispatch("components/progressLoading", { option: "hide" });
          }else{
             toastr.error(
              "<p> Thêm thất bại <p>",
              "Error",
              { timeOut: 3000 }
            );
              this.$store.dispatch("components/progressLoading", { option: "hide" });
          }
        }
       
     }

  },

  computed: {
    userInfo(){
      var userInfo = CookieService.get('userInfo');
      userInfo.newPassword = "";
      userInfo.oldPassword = "";
      userInfo.verifyPassword = "";
      return userInfo;
    }
  }
  
};
</script>
