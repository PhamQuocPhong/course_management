<template> </template>

<script>


export default {
  data() {
    return {
      userInfo: this.$cookies.get("userInfo")
    };
  },

  mounted() {
    // remove user in socket


    // clear user in cookies
    this.$cookies.remove("accessToken");
    this.$cookies.remove("userInfo");

    // clear store
    this.$store.dispatch("components/reset");



    this.$router.replace("/login");
  },


};
</script>
