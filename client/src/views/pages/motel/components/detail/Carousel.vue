<template>
  <v-carousel
          hide-delimiters
  >
    <v-carousel-item 
      v-for="(item,i) in items"
      :key="i"
      :src="item"
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

    mounted(){

    }
  }
</script>