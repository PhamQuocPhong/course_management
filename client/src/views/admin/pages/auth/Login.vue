<template>
  <v-app id="admin-login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center v-resize="onResize">
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-center">
                Admin Login
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text style="padding-bottom: 50px;">
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="form.email"
                  :rules="[
                      $validation.required(form.email, `Email`)
                  ]"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="[
                      $validation.required(form.password, `Mật khẩu`)
                  ]"
                  v-model="form.password"
                ></v-text-field>


                <v-btn 
                block 
                color="primary" 
                @click="login()"
                @keyup.enter="login()"
                >
                  Login
                </v-btn>

              </v-form >
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
//mixin
import IsMobile from "@/mixins/is_mobile";


// service
import AuthServices from "@/services/auth";
import CookieServices from "@/services/cookie";


export default {
  mixins: [IsMobile],

  // beforeRouteEnter(to, from, next) {
  //   const tokenUser = $cookies.get("accessToken");
  //   if (!tokenUser) {
  //     return next();
  //   }
  //   return next({ path: "/profile/info" });
  // },

  data() {
    return {
      valid: true,
      lazy: false,

      form: {
        email: "",
        password: "",
      },

      styleBtn: {
        width: '100%',
        marginTop: '10px'
      },
    };
  },


  methods: {


    async login() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("components/progressLoading", { option: "show" })

        setTimeout(async () => {
          const res = await AuthServices.login(this.form);
           // case success
          if(res.status === 200){

            CookieServices.set("accessToken", res.data.accessToken);
            CookieServices.set("userInfo", res.data.findUser);

            if(res.data.findUser && res.data.findUser.roleId === 1)
            {
            	this.$router.push('/admin/users');
            	this.$store.dispatch("components/progressLoading", { option: "hide" })
            }

          // case error
          }else{
            toastr.error(res.data.message, this.$lang.ERROR, { timeOut: 1000 });
            this.$store.dispatch("components/progressLoading", { option: "hide" })

            // login fail -> reset input password
            this.form.password = "";

            // update component & reset validation
            this.$forceUpdate();
            this.$refs.form.resetValidation();
          }

        }, 200);
      }
    },

  },
};
</script>
