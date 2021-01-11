<template>
  <v-app id="login">
    <v-container fluid fill-height>
      <v-row>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title class="text-center">
                  Sign Up
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">


                   <v-text-field
                    label="Họ tên"
                    prepend-icon="mdi-account-plus"
                    type="text"
                    v-model="form.name"
                    :rules="[
                      $validation.required(form.name, `Họ tên`)
                    ]"
                  ></v-text-field>

                   <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="form.email"
                    :rules="[
                      $validation.required(form.email, `Email`),
                      $validation.email(form.email, `Email`)
                    ]"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.password"
                    :rules="[
                      $validation.required(form.password, `Mật khẩu`)
                    ]"
                  ></v-text-field>


                  <v-btn
                    text
                    class="light-blue--text"
                    link
                    @click="redirectLogin"
                  >
                    Back to Login
                    <v-icon>mdi-login-variant</v-icon>
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Auth from "@/services/auth";
export default {

  data() {
    return {
      valid: true,
      lazy: false,

      form: {
        password: "",
        name: "",
        email: "",
      }
    };
  },

  mounted() {},

  methods: {
    async register() {
      if (this.$refs.form.validate()) {

        this.$store.dispatch("components/progressLoading", { option: "show" })

        setTimeout(() => {
          Auth.register(this.form).then(res => {

            if (res.status === 201) {
              toastr.success(
                "<p> Đăng kí thành công <p>",
                "Success",
                { timeOut: false }
              );

              this.$store.dispatch("components/progressLoading", { option: "hide" })

              this.$refs.form.reset();
            } else if (res.status === 401) {

              toastr.error(res.data.message, "Error", { timeOut: 1000 });
              this.$store.dispatch("components/progressLoading", { option: "hide" })

            } else {

              toastr.error("Internal Server Error", "Error", {
                timeOut: 1000
              });

              this.$store.dispatch("components/progressLoading", { option: "hide" })
            }
          });
        }, 1000);
      }
    },

    redirectLogin() {
      this.$router.push("/auth/login");
    }
  },

};
</script>
