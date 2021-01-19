<template>
  <v-carousel
    hide-delimiters
  >
    <v-carousel-item 
      v-for="(item,i) in items"
      :key="i"
      :src="getImage(item.src)"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>


<script>
  export default {

  	props: {
  		items: Array
  	},

    methods: {
      getImage(image) {
        return require(`@/assets/img/slider/${image}`);
      }
    }
  }
</script>