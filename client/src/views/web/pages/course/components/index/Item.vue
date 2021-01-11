<template>
  <v-card
    :loading="loading"
  >
    <v-row>
      <v-col cols="5">
        <v-img 
          v-if="getItem.image"
          height="270"
          :src="getItem.image"
        >
        </v-img>

        <v-img
          height="270"
          src="@/assets/img/default.jpg"
        >
        </v-img>
      </v-col>
      <v-col cols="7">
        <v-card-title>{{ getItem.title }}</v-card-title>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="getItem.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

            </v-row>

            <div class="text-right">
              <v-btn color="primary"  outlined small @click="viewDetail()">  Xem chi tiết</v-btn>
            </div>
          </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {

    props: {
      item: Object
    },

    data: () => ({
      loading: false,
      selection: 1,
    }),

    computed: {
      getItem: {
        get(){
          return this.item
        }
      },
    },

    methods: {
      viewDetail(){
 
      }
    },


  }
</script>
