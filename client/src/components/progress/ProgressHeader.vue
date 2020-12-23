<template>
  <div>
    <v-progress-linear
      :indeterminate="indeterminate"
      color="cyan"
      v-show="isLoading"
    ></v-progress-linear>
  </div>
</template>

<style scoped>
.v-progress-linear {
  z-index: 1000;
}
</style>

<script>


export default {
  props: {
    indeterminate: {
      type: Boolean,
      default: true
    },

    show: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isLoading(){
      return this.$store.getters["components/progressHeader"];
    }
  }
};
</script>
