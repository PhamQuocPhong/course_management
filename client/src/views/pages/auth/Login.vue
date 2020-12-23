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
                  v-model="userInfo.email"
                  :rules="emailRules"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :rules="passwordRules"
                  v-model="userInfo.password"
                ></v-text-field>

                <div class="pb-4 caption d-flex">
                  <v-flex class="text-right">
                    <router-link to="/forget-password"
                      >Forget password</router-link
                    >
                  </v-flex>
                </div>

                <v-btn block color="primary" @click="login">Login</v-btn>

                <v-card-text class="text-center horizontal-line">
                  OR Continue
                </v-card-text>

                <div class="text-center pb-8">
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
                </div>

                <hr />

                <v-card-text class="text-center">
                  Don't have account?
                  <v-btn
                    text
                    class="light-blue--text pa-0 caption"
                    @click="redirectRegister()"
                  >
                    Sign up now
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

  beforeRouteEnter(to, from, next) {
    const tokenUser = $cookies.get("accessToken");
    if (!tokenUser) {
      return next();
    }
    return next({ path: "/dashboard" });
  },

  data() {
    return {
      valid: true,
      lazy: false,
      emailRules: [v => !!v || "Email is required!"],
      passwordRules: [v => !!v || "Password is required!"],

      userInfo: {
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
    // SocialAuth.loadFacebookSDK(document, "script", "facebook-jssdk");
    // SocialAuth.initFacebook();
  },

  methods: {
    redirectRegister() {
      this.$router.push("/auth/register");
    },

    async login() {
      if (this.$refs.form.validate()) {
        var loader = this.$loading.show();
        const { email, password } = this.userLogin;
        const res = await AuthServices.login(email, password);

        // case success
        if(res.data){
          CookieServices.set("userToken", res.data.adminLogin.token);
          CookieServices.set("userInfo", res.data.adminLogin.info);

          this.$router.push('/users');
          loader.hide();

        // case error
        }else{
          toastr.error(res.message, this.$lang.ERROR, { timeOut: 1000 });
          loader.hide();

          // login fail -> reset input password
          this.userLogin.password = "";

          // update component & reset validation
          this.$forceUpdate();
          this.$refs.form.resetValidation();
        }
      }
    },

    async loginGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        var data = {};

        data.email =
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
      } catch (e) {}
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
                    this.$cookies.set("dataUser", res.data.data.userInfo);
                    this.$cookies.set("accessToken", res.data.data.accessToken);
                    this.$cookies.set(
                      "refreshToken",
                      res.data.data.refreshToken
                    );

                    this.$socket.emit(this.$socketEvent.ADD_USER, res.data.data.userInfo);

                    // store user vuex 
                    User.dispatch('updateUser', res.data.data.userInfo);

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
