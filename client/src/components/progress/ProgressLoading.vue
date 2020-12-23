<template>
  <div>
    <v-progress-circular
      :indeterminate="indeterminate"
      color="cyan"
      v-show="true"
    ></v-progress-circular>
  </div>
</template>


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

  mounted() {},

  computed: {
    isLoading(){
      return this.$store.getters["components/progressLoading"];
    }
  }
};
</script>
