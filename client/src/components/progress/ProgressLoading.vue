<template>
<v-layout> 
  <div class="overlay" v-show="isLoading"></div>
  <div>
    <v-progress-circular
      :indeterminate="indeterminate"
      color="cyan"
      v-show="isLoading"

    ></v-progress-circular>
  </div>
</v-layout>
</template>

<style scoped>
.v-progress-circular {
  height: 32px;
  position: fixed;
  width: 32px;
  top: 50%;
  left: 50%;
  z-index: 10000;
}

.overlay{
 position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
  cursor: pointer;
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

  mounted() {},


  computed: {
    isLoading(){
      return this.$store.getters["components/progressLoading"];
    }
  }
};
</script>
