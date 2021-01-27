<template>
   <v-card class="elevation-12 pb-6">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="text-center">
          Verify OTP
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
         <v-text-field
          label="OTP"
          prepend-icon="mdi-account-key"
          type="text"
          v-model="form.otp"
          :rules="[
            $validation.required(form.otp, `OTP`)
          ]"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" block @click="verify" >Submit</v-btn>
    </v-card-actions>
  </v-card>
</v-app>
</template>

<script>
import Auth from "@/services/auth";
export default {

  props: {
    email: String,
  },

  data() {
    return {
      valid: true,
      lazy: false,

      form: {
        email: this.email,
        otp: ""
      }
    };
  },

  mounted() {},

  methods: {
    async verify() {
      if (this.$refs.form.validate()) {

        this.$store.dispatch("components/progressLoading", { option: "show" })
        setTimeout(() => {
          Auth.verify(this.form).then(res => {

            if (res.status === 200) {
              toastr.success(
                "<p> Đăng kí thành công <p>",
                "Success",
                { timeOut: 1000 }
              );

              this.$router.push('/login');
            } else if (res.status === 401) {

              toastr.error(res.data.message, "Error", { timeOut: 1000 });

            } else {

              toastr.error("Verify failed", "Error", {
                timeOut: 1000
              });

              this.$store.dispatch("components/progressLoading", { option: "hide" })
            }
          });
        }, 1000);
      }
    },
  },

};
</script>
