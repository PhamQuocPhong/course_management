export default {
  data() {
    return {
      isMobile: false
    };
  },

  methods: {
    backToList() {
      var backList = this.$route.matched[1].path;
      this.$router.push(backList);
    }
  }
};
