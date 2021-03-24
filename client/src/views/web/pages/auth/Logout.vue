<template> </template>

<script>
import AuthService from "@/services/auth";

export default {
  data() {
    return {
      userInfo: this.$cookies.get("userInfo")
    };
  },

  async created() {
    // remove user in socket
     var refreshToken = this.$cookies.get("refreshToken");


    const res = await AuthService.logout({refreshToken});
    if(res.status === 200)
    {

      // clear user in cookies
      this.$cookies.remove("refreshToken");
      this.$cookies.remove("accessToken");
      this.$cookies.remove("userInfo");

      // clear store
      this.$store.dispatch("components/reset");



      this.$router.replace("/login");
    }
  },


};
</script>
