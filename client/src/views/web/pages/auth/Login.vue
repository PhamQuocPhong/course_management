<template>
  <v-app id="login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center v-resize="onResize">
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-center">
                Sign In
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
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

                <div class="pb-4 caption d-flex">
                  <v-flex class="text-right">
                    <router-link to="/forget-password"
                      >Forget password</router-link
                    >
                  </v-flex>
                </div>

                <v-btn 
                block 
                color="primary" 
                @click="login()"
                @keyup.enter="login()"
                >
                  Login
                </v-btn>
<!-- 
                <v-card-text class="text-center horizontal-line">
                  OR Continue
                </v-card-text>
 -->
         <!--        <div class="text-center pb-8">
                  <v-btn
                    v-bind:style="[isMobile ? styleBtn : '']"
                    :class="{ 'mx-2': !isMobile}"
                    dark
                    color="red darken-4"
                    v-on:click="loginGoogle"
                  >
                    <v-icon dark>mdi-google-plus</v-icon>
                    <span class="pl-3">With Google</span>
                  </v-btn>

                  <v-btn
                    v-bind:style="[isMobile ? styleBtn : '']"
                    :class="{ 'mx-2': !isMobile }"
                    dark
                    color="primary"
                    @click.sync="loginFacebook"
                  >
                    <v-icon dark>mdi-facebook</v-icon>
                    <span class="pl-3">With Facebook</span>
                  </v-btn>
                </div> -->

                <hr />

                <v-card-text class="text-center">
                  Bạn chưa có tài khoản?
                  <v-btn
                    text
                    class="light-blue--text pa-0 caption"
                    @click="redirectRegister()"
                  >
                    Đăng kí ngay
                  </v-btn>
                </v-card-text>
              </v-form>
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

  mounted() {
    this.loadFacebookSDK(document, "script", "facebook-jssdk");
    this.initFacebook();
  },

  methods: {

    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: "640448850019915",
          cookie: true,
          xfbml: true,
          version: "v2.8"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },

    redirectRegister() {
      this.$router.push("/register");
    },

    async login() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("components/progressLoading", { option: "show" })

        setTimeout(async () => {
          const res = await AuthServices.login(this.form);
           // case success
          if(res.status === 200){

            CookieServices.set("accessToken", res.data.accessToken);
            CookieServices.set("userInfo", res.data.findUser);


            this.$router.push('/');
            this.$store.dispatch("components/progressLoading", { option: "hide" })

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

    async loginGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        var data = {};

        console.log(googleUser);
        return false;

        googleUser.getBasicProfile().$t || googleUser.getBasicProfile().yu;
        data.password = "";
        data.providerId = googleUser.getId();
        data.providerType = googleUser.getAuthResponse().idpId;
        data.fullName = googleUser.getBasicProfile().Ad; //(FV + GT)
        data.accessToken = googleUser.getAuthResponse().access_token;
        data.expires = googleUser.getAuthResponse().expires_in;

        Auth.loginSocial(data, "google").then(res => {
          if (res.status === 200) {

            // CookieServices.set("userToken", res.data.adminLogin.token);
            // CookieServices.set("userInfo", res.data.adminLogin.info);


            // store user vuex 
            this.$router.push("/");
          }
        });
      } catch (e) {
        console.log(e)
      }
    },

    async loginFacebook() {
      FB.getLoginStatus(res => {
        FB.login(
          res => {
            if (res.authResponse) {
              var data = {};
              var authResponse = res.authResponse;

              FB.api("/me", { fields: "id, name, email" }, res => {
                data.email = res.email;
                data.password = "";
                data.providerId = authResponse.userID;
                data.providerType = authResponse.graphDomain;
                data.fullName = res.name;
                data.accessToken = authResponse.accessToken;
                data.expires = authResponse.expiresIn;

                Auth.loginSocial(data, "facebook").then(res => {
                  if (res.status === 200) {
                    this.$cookies.set("userInfo", res.data.data.userInfo);
                    this.$cookies.set("accessToken", res.data.data.accessToken);
                    this.$cookies.set(
                      "refreshToken",
                      res.data.data.refreshToken
                    );

                    this.$socket.emit(this.$socketEvent.ADD_USER, res.data.data.userInfo);

                    this.$router.push("/dashboard");
                  }
                });
              });
            }
          },
          { scope: "public_profile,email" }
        );
      });
    }
  },
};
</script>
