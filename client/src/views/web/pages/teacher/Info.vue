<template>
  <div id="profile">
    <v-layout v-resize="onResize">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
            <m-menu></m-menu>
          </v-col>

          <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }" >
            <v-card tile  style="height: 100%;">

               <v-card-title class="border-bottom">Thông tin cá nhân</v-card-title>

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
                        v-model="userInfo.name"
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
                        v-model="userInfo.email"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                   <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Info</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="userInfo.info"
                      ></v-text-field>
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


  data() {
    return {

      edit: false,
      showAvatarDialog: false,
      image: null,
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
      var userId = this.userInfo.id;
      this.$store.dispatch("components/progressLoading", { option: "show" });
      const res = await UserService.update(userId, this.userInfo)
      if(res.status === 200){

         CookieService.set('userInfo', res.data.data);
        this.userInfo = res.data.data;

        toastr.success(
          "<p> Cập nhật thành công <p>",
          "Success",
          { timeOut: 1000 }
        );
        this.edit = false;
        this.$store.dispatch("components/progressLoading", { option: "hide" });
      }else{
        toastr.error(res.data.message, {
              timeOut: 1000
          });
        this.$store.dispatch("components/progressLoading", { option: "hide" });
      }
    },
  },

  computed: {
    userInfo(){
      return CookieService.get('userInfo');
    }
  }
  
};
</script>
